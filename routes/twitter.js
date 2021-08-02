
import express from 'express';

import { getTweets } from '../controllers/twitter.js';

const router = express.Router();

router.get('/search', getTweets);

export default router;