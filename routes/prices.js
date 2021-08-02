
import express from 'Express';

import { getPrices } from '../controllers/prices.js';

const router = express.Router();

router.get('/search', getPrices);

export default router;