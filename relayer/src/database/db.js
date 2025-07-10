import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import logger from '../utils/logger.js';

class Database {
  constructor() {
    this.db = null;
    this.dbPath = process.env.DATABASE_PATH || './data/relayer.db';
  }

  async initialize() {
    try {
      // Ensure data directory exists
      const dataDir = path.dirname(this.dbPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      this.db = new sqlite3.Database(this.dbPath);
      
      // Promisify database methods
      this.db.run = promisify(this.db.run.bind(this.db));
      this.db.get = promisify(this.db.get.bind(this.db));
      this.db.all = promisify(this.db.all.bind(this.db));

      await this.createTables();
      logger.info('Database initialized successfully');
    } catch (error) {
      logger.error('Database initialization failed:', error);
      throw error;
    }
  }

  async createTables() {
    const createBridgeEventsTable = `
      CREATE TABLE IF NOT EXISTS bridge_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tx_id TEXT UNIQUE NOT NULL,
        event_type TEXT NOT NULL,
        source_chain INTEGER NOT NULL,
        target_chain INTEGER NOT NULL,
        user_address TEXT NOT NULL,
        token_address TEXT NOT NULL,
        amount TEXT NOT NULL,
        target_address TEXT NOT NULL,
        block_number INTEGER NOT NULL,
        transaction_hash TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        confirmations INTEGER DEFAULT 0,
        relay_tx_hash TEXT,
        error_message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createProcessedBlocksTable = `
      CREATE TABLE IF NOT EXISTS processed_blocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chain_id INTEGER NOT NULL,
        block_number INTEGER NOT NULL,
        processed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(chain_id, block_number)
      )
    `;

    const createRelayerStatsTable = `
      CREATE TABLE IF NOT EXISTS relayer_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        chain_id INTEGER NOT NULL,
        events_processed INTEGER DEFAULT 0,
        successful_relays INTEGER DEFAULT 0,
        failed_relays INTEGER DEFAULT 0,
        total_volume TEXT DEFAULT '0',
        UNIQUE(date, chain_id)
      )
    `;

    await this.db.run(createBridgeEventsTable);
    await this.db.run(createProcessedBlocksTable);
    await this.db.run(createRelayerStatsTable);

    // Create indexes for better performance
    await this.db.run('CREATE INDEX IF NOT EXISTS idx_bridge_events_status ON bridge_events(status)');
    await this.db.run('CREATE INDEX IF NOT EXISTS idx_bridge_events_chains ON bridge_events(source_chain, target_chain)');
    await this.db.run('CREATE INDEX IF NOT EXISTS idx_processed_blocks_chain ON processed_blocks(chain_id)');
  }

  async saveBridgeEvent(eventData) {
    const query = `
      INSERT OR REPLACE INTO bridge_events 
      (tx_id, event_type, source_chain, target_chain, user_address, token_address, 
       amount, target_address, block_number, transaction_hash, confirmations)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      eventData.txId,
      eventData.eventType,
      eventData.sourceChain,
      eventData.targetChain,
      eventData.userAddress,
      eventData.tokenAddress,
      eventData.amount,
      eventData.targetAddress,
      eventData.blockNumber,
      eventData.transactionHash,
      eventData.confirmations || 0
    ];

    await this.db.run(query, params);
    logger.info(`Bridge event saved: ${eventData.txId}`);
  }

  async updateEventStatus(txId, status, relayTxHash = null, errorMessage = null) {
    const query = `
      UPDATE bridge_events 
      SET status = ?, relay_tx_hash = ?, error_message = ?, updated_at = CURRENT_TIMESTAMP
      WHERE tx_id = ?
    `;

    await this.db.run(query, [status, relayTxHash, errorMessage, txId]);
    logger.info(`Event status updated: ${txId} -> ${status}`);
  }

  async updateEventConfirmations(txId, confirmations) {
    const query = `
      UPDATE bridge_events 
      SET confirmations = ?, updated_at = CURRENT_TIMESTAMP
      WHERE tx_id = ?
    `;

    await this.db.run(query, [confirmations, txId]);
  }

  async getPendingEvents() {
    const query = `
      SELECT * FROM bridge_events 
      WHERE status IN ('pending', 'confirmed') 
      ORDER BY created_at ASC
    `;

    return await this.db.all(query);
  }

  async getEventByTxId(txId) {
    const query = 'SELECT * FROM bridge_events WHERE tx_id = ?';
    return await this.db.get(query, [txId]);
  }

  async isEventProcessed(txId) {
    const event = await this.getEventByTxId(txId);
    return event && event.status === 'completed';
  }

  async saveProcessedBlock(chainId, blockNumber) {
    const query = `
      INSERT OR REPLACE INTO processed_blocks (chain_id, block_number)
      VALUES (?, ?)
    `;

    await this.db.run(query, [chainId, blockNumber]);
  }

  async getLastProcessedBlock(chainId) {
    const query = `
      SELECT MAX(block_number) as block_number 
      FROM processed_blocks 
      WHERE chain_id = ?
    `;

    const result = await this.db.get(query, [chainId]);
    return result?.block_number || 0;
  }

  async getBridgeStats(days = 7) {
    const query = `
      SELECT 
        source_chain,
        target_chain,
        COUNT(*) as total_events,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as successful,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
        SUM(CAST(amount AS REAL)) as total_volume
      FROM bridge_events 
      WHERE created_at >= datetime('now', '-' || ? || ' days')
      GROUP BY source_chain, target_chain
    `;

    return await this.db.all(query, [days]);
  }

  async getRecentEvents(limit = 50) {
    const query = `
      SELECT * FROM bridge_events 
      ORDER BY created_at DESC 
      LIMIT ?
    `;

    return await this.db.all(query, [limit]);
  }

  async close() {
    if (this.db) {
      await new Promise((resolve) => {
        this.db.close(resolve);
      });
      logger.info('Database connection closed');
    }
  }
}

export default new Database();