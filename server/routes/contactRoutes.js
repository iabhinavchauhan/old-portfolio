import { Router } from 'express';
import Message from '../models/Message.js';
const router = Router();
const admin = (req, res, next) => req.headers['x-admin-key'] === process.env.ADMIN_KEY ? next() : res.status(401).json({ message: 'Unauthorized' });
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields are required' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Enter a valid email' });
    await Message.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully' });
});
router.get('/', admin, async (req, res) => res.json(await Message.find().sort({ createdAt: -1 }).limit(100)));
export default router;
