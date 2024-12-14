import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/add', async (req, res) => {
    const { courseName, startCourse, endCourse, courseDifficulty, coachName } = req.body;

    if (!courseName || !startCourse || !endCourse || !courseDifficulty || !coachName) {
        return res.status(400).json({
            error: 'All fields are required',
            missingFields: {
                courseName: !courseName,
                startCourse: !startCourse,
                endCourse: !endCourse,
                courseDifficulty: !courseDifficulty,
                coachName: !coachName
            }
        });
    }

    try {
        const newCourse = await Course.create({ courseName, startCourse, endCourse, courseDifficulty, coachName });
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update a course
router.put('/:id', async (req, res) => {
    const { courseName, startCourse, endCourse, courseDifficulty, coachName } = req.body;

    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Mise à jour des champs
        await course.update({ courseName, startCourse, endCourse, courseDifficulty, coachName });

        res.status(200).json({ message: 'Course updated successfully', course });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete a course
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        await course.destroy();
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
