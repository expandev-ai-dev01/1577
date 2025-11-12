/**
 * @summary Main API router with version management
 * @module routes
 *
 * @description
 * Configures API versioning and routes all requests to appropriate version handlers.
 * Supports multiple API versions for backward compatibility.
 */

import { Router } from 'express';
import v1Routes from './v1';

const router = Router();

/**
 * @api {all} /v1/* Version 1 API
 * @apiVersion 1.0.0
 * @apiDescription Current stable API version
 */
router.use('/v1', v1Routes);

export default router;
