/**
 * @summary Zod validation utilities
 * @module utils/zodValidation
 *
 * @description
 * Provides reusable Zod validation schemas for common data types.
 * All validators follow the pattern of applying constraints before nullable/optional.
 */

import { z } from 'zod';

/**
 * @summary String validation with maximum length
 */
export const zString = z.string().min(1);

/**
 * @summary Nullable string with maximum length
 */
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

/**
 * @summary Name field validation (1-200 characters)
 */
export const zName = z.string().min(1).max(200);

/**
 * @summary Description field validation (max 500 characters, nullable)
 */
export const zNullableDescription = z.string().max(500).nullable();

/**
 * @summary Foreign key validation (positive integer)
 */
export const zFK = z.number().int().positive();

/**
 * @summary Nullable foreign key validation
 */
export const zNullableFK = z.number().int().positive().nullable();

/**
 * @summary Bit/Boolean validation (0 or 1)
 */
export const zBit = z.number().int().min(0).max(1);

/**
 * @summary Date string validation (ISO format)
 */
export const zDateString = z.string().datetime();

/**
 * @summary Email validation
 */
export const zEmail = z.string().email().max(255);

/**
 * @summary Nullable email validation
 */
export const zNullableEmail = z.string().email().max(255).nullable();

/**
 * @summary Numeric validation with precision
 */
export const zNumeric = (precision: number = 15, scale: number = 2) => {
  return z.number();
};

/**
 * @summary Nullable numeric validation
 */
export const zNullableNumeric = (precision: number = 15, scale: number = 2) => {
  return z.number().nullable();
};
