import express, { Request, Response } from 'express';
import z from 'zod';
import { Note } from '../models/note.model';
import { authMiddleware } from '../middleware/auth.middleware';
import validate from '../middleware/validate.middlware';
import { idSchema } from './index.routes';

const router = express.Router();

const getNoteSchema = z.object({
    params: z.object(idSchema)
});

// @route   GET /api/note/get/:id
router.get('/get/:id', authMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params as z.infer<typeof getNoteSchema>['params'];
    try {
        const note = await Note.findOne({ _id: id, user: req.user.id });
        res.json({ note, message: 'Note fetched successfully', status: 'success' });
        console.table(note);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all notes of a user from database
// @route   GET /api/note/getAll
router.get('/getAll', authMiddleware, async (req: Request, res: Response) => {
    try {
        const notes = await Note.aggregate([
            { $match: { userId: req.user.id } },
            { $project: { title: 1, content: { $substrCP: ['$content', 0, 255] } } }
        ]);
        console.table(notes);
        res.json({ notes, message: 'Notes fetched successfully', status: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

const createNoteSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' }).min(2).max(128),
        content: z.string({ required_error: 'Content is required' }),
    }),
});

// @route   POST /api/note/create
router.post('/create', authMiddleware, validate(createNoteSchema), async (req: Request, res: Response) => {
    const { title, content } = req.body as z.infer<typeof createNoteSchema>['body'];
    try {
        const note = await new Note({ userId: req.user?.id, title, content }).save();
        res.json({ note, message: 'Note created successfully', status: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    };
});

const updateNoteSchema = z.object({
    body: z.object({
        title: z.string().min(2).max(128),
        content: z.string()
    }),
    params: z.object(idSchema)
});

// Update a note in database by id and user id
router.put('/update/:id', authMiddleware, validate(updateNoteSchema), async (req: Request, res: Response) => {
    const { id } = req.params as z.infer<typeof updateNoteSchema>['params'];
    const { title, content } = req.body as z.infer<typeof updateNoteSchema>['body'];
    try {
        const note = await Note.findOneAndUpdate({ _id: id, userId: req.user?.id }, { title, content }, { new: false });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ note, message: 'Note updated successfully', status: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

const deleteNoteSchema = z.object({
    params: z.object({
        id: z.string().min(12).max(24)
    })
});

// Delete a note in database by id and user id
router.delete('/delete/:id', authMiddleware, validate(deleteNoteSchema), async (req: Request, res: Response) => {
    const { id } = req.params as z.infer<typeof deleteNoteSchema>['params'];
    try {
        const note = await Note.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted successfully', status: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export const noteRouter = router;