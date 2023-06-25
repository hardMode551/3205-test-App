import express from 'express';
import {cancelSearch, search}  from '../controllers/searchController';

const router = express.Router();

router.post('/search', search, cancelSearch);

export default router;
