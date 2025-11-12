/**
 * @summary Database utility functions
 * @module utils/database
 *
 * @description
 * Provides database connection management and query execution utilities.
 * Implements connection pooling and transaction support.
 */

import sql from 'mssql';
import { config } from '@/config';

/**
 * @enum ExpectedReturn
 * @description Expected return type from stored procedures
 */
export enum ExpectedReturn {
  None = 'None',
  Single = 'Single',
  Multi = 'Multi',
}

/**
 * @interface IRecordSet
 * @description Generic record set interface
 */
export interface IRecordSet<T = any> {
  recordset: T[];
  rowsAffected: number[];
}

let pool: sql.ConnectionPool | null = null;

/**
 * @summary Gets or creates database connection pool
 * @function getPool
 * @returns {Promise<sql.ConnectionPool>} Database connection pool
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect({
      server: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      options: config.database.options,
    });
  }
  return pool;
}

/**
 * @summary Executes stored procedure with parameters
 * @function dbRequest
 *
 * @param {string} routine - Stored procedure name
 * @param {object} parameters - Procedure parameters
 * @param {ExpectedReturn} expectedReturn - Expected return type
 * @param {sql.Transaction} transaction - Optional transaction
 * @param {string[]} resultSetNames - Optional result set names
 * @returns {Promise<any>} Query results
 */
export async function dbRequest(
  routine: string,
  parameters: any = {},
  expectedReturn: ExpectedReturn = ExpectedReturn.Single,
  transaction?: sql.Transaction,
  resultSetNames?: string[]
): Promise<any> {
  const pool = await getPool();
  const request = transaction ? new sql.Request(transaction) : pool.request();

  Object.keys(parameters).forEach((key) => {
    request.input(key, parameters[key]);
  });

  const result = await request.execute(routine);

  if (expectedReturn === ExpectedReturn.None) {
    return null;
  }

  if (expectedReturn === ExpectedReturn.Single) {
    return result.recordset[0];
  }

  if (expectedReturn === ExpectedReturn.Multi) {
    if (resultSetNames && resultSetNames.length > 0) {
      const namedResults: any = {};
      resultSetNames.forEach((name, index) => {
        namedResults[name] = result.recordsets[index];
      });
      return namedResults;
    }
    return result.recordsets;
  }

  return result;
}

/**
 * @summary Begins database transaction
 * @function beginTransaction
 * @returns {Promise<sql.Transaction>} Transaction object
 */
export async function beginTransaction(): Promise<sql.Transaction> {
  const pool = await getPool();
  const transaction = new sql.Transaction(pool);
  await transaction.begin();
  return transaction;
}

/**
 * @summary Commits database transaction
 * @function commitTransaction
 * @param {sql.Transaction} transaction - Transaction to commit
 */
export async function commitTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.commit();
}

/**
 * @summary Rolls back database transaction
 * @function rollbackTransaction
 * @param {sql.Transaction} transaction - Transaction to rollback
 */
export async function rollbackTransaction(transaction: sql.Transaction): Promise<void> {
  await transaction.rollback();
}
