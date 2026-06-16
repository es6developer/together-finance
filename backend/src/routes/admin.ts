import { Router } from 'express';
import { login, getSubmissions, exportCSV } from '../controllers/adminController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/api/admin/login', login);
router.get('/api/admin/submissions', authenticateToken, getSubmissions);
router.get('/api/admin/export', authenticateToken, exportCSV);

export default router;
