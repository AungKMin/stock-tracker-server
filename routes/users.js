import express from 'express';

import { preferences, signin, signup, changePreferences } from '../controllers/users.js'; 
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/preferences', auth, preferences);
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/changePreferences', auth, changePreferences);


export default router;