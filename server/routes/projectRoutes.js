import { Router } from 'express';
import Project from '../models/Project.js';
const router = Router();
const admin = (req, res, next) => req.headers['x-admin-key'] === process.env.ADMIN_KEY ? next() : res.status(401).json({ message: 'Unauthorized' });
router.get('/', async (req, res) => res.json(await Project.find().sort({ featured: -1, createdAt: -1 })));
router.post('/', admin, async (req, res) => res.status(201).json(await Project.create(req.body)));
router.delete('/:id', admin, async (req, res) => { await Project.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }) });
export default router;
