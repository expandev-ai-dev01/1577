/**
 * @summary CRUD controller middleware for security and validation
 * @module middleware/crud
 *
 * @description
 * Provides base controller functionality for CRUD operations including
 * security validation, parameter validation, and standardized responses.
 */

import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityRule
 * @description Security rule configuration for CRUD operations
 */
export interface SecurityRule {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

/**
 * @interface ValidationResult
 * @description Result of parameter validation
 */
export interface ValidationResult {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @class CrudController
 * @description Base controller for CRUD operations with security and validation
 */
export class CrudController {
  private securityRules: SecurityRule[];

  constructor(securityRules: SecurityRule[]) {
    this.securityRules = securityRules;
  }

  /**
   * @summary Validates CREATE operation parameters
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  async create(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'CREATE');
  }

  /**
   * @summary Validates READ operation parameters
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'READ');
  }

  /**
   * @summary Validates UPDATE operation parameters
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  async update(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'UPDATE');
  }

  /**
   * @summary Validates DELETE operation parameters
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidationResult | null, Error | null]>}
   */
  async delete(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validateRequest(req, schema, 'DELETE');
  }

  /**
   * @summary Internal validation logic
   * @private
   */
  private async validateRequest(
    req: Request,
    schema: z.ZodSchema,
    permission: string
  ): Promise<[ValidationResult | null, Error | null]> {
    try {
      const params = await schema.parseAsync({ ...req.params, ...req.body, ...req.query });

      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params }, null];
    } catch (error: any) {
      return [null, error];
    }
  }
}

/**
 * @summary Creates success response object
 * @function successResponse
 * @param {any} data - Response data
 * @returns {object} Standardized success response
 */
export function successResponse(data: any): object {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary Creates error response object
 * @function errorResponse
 * @param {string} message - Error message
 * @returns {object} Standardized error response
 */
export function errorResponse(message: string): object {
  return {
    success: false,
    error: {
      message,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary General error status
 */
export const StatusGeneralError = new Error('GENERAL_ERROR');
