/**
 * @summary V1 API router configuration
 * @module routes/v1
 *
 * @description
 * Configures version 1 API routes, separating external (public) and internal (authenticated) endpoints.
 */

import { Router } from 'express';
import externalRoutes from './externalRoutes';
import internalRoutes from './internalRoutes';

const router = Router();

/**
 * @api {all} /external/* External API endpoints
 * @apiDescription Public endpoints accessible without authentication
 */
router.use('/external', externalRoutes);

/**
 * @api {all} /internal/* Internal API endpoints
 * @apiDescription Authenticated endpoints requiring valid user session
 */
router.use('/internal', internalRoutes);

export default router;
