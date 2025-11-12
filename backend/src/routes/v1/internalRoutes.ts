/**
 * @summary Internal (authenticated) API routes configuration
 * @module routes/v1/internalRoutes
 *
 * @description
 * Configures all authenticated API endpoints that require valid user session.
 * All routes in this module are protected by authentication middleware.
 */

import { Router } from 'express';

const router = Router();

/**
 * @remarks
 * Internal routes will be added here as features are implemented.
 * Examples:
 * - /course (course management)
 * - /enrollment (course enrollment)
 * - /progress (progress tracking)
 * - /certificate (certificate generation)
 */

export default router;
