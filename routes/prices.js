
import express from 'express';

import { getPrices } from '../controllers/prices.js';

const router = express.Router();

router.get('/search', getPrices);

export default router;