import express from 'express';
import {
	logoutUser,
	requestNonce,
	verifySignature,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/nonce', requestNonce);
router.post('/verify', verifySignature);
router.post('/logout', logoutUser);

export default router;
