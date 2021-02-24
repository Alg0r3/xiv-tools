import express from 'express';

import { getRegions, getRegion, getRegionMaps } from '../controllers/region.js';

const router = express.Router();

router.get('/', getRegions);
router.get('/:regionId', getRegion);
router.get('/:regionId/maps', getRegionMaps);

export default router;
