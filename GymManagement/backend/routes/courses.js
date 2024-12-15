import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';


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

// Route to delete a course created by the coach
router.delete('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;

    // Find the course by ID
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Delete the course
    await course.destroy();

    res.status(200).json({ message: 'Course deleted successfully!' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      error: 'An error occurred while deleting the course.',
      details: error.message,
    });
  }
});



// Delete a course
router.delete('/:courseId', async (req, res) => {
  try {
    // Récupérer le token du header Authorization
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing.' });
    }

    // Décoder le token pour obtenir l'ID de l'utilisateur
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // `id` dépend de la structure du token

    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ error: 'Course ID is missing.' });
    }

    // Rechercher l'utilisateur et le cours
    const user = await User.findByPk(userId);
    const course = await Course.findByPk(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: 'User or course not found.' });
    }

    // Supprimer l'association dans la table pivot UserCourses
    await user.removeCourse(course); // Méthode Sequelize pour la relation Many-to-Many

    res.status(200).json({ message: 'User has been removed from the course successfully.' });
  } catch (err) {
    console.error('Error deleting course:', err); // Log de l'erreur détaillée
    res.status(500).json({ error: 'An internal server error occurred.', details: err.message });
  }
});

router.post('/book/:id', async (req, res) => {
  try {
    const { username } = req.body;
    const courseId = req.params.id;

    if (!username || !courseId) {
      return res.status(400).json({ error: 'Missing username or courseId.' });
    }

    // Find the user and course
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Add the user to the course
    await user.addCourse(course);

    res.status(200).json({ message: 'Course successfully booked!' });
  } catch (error) {
    console.error('Error booking course:', error);
    res.status(500).json({
      error: 'An error occurred while booking the course.',
      details: error.message,
    });
  }
});


  

router.get('/booked/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Course,
          through: { attributes: [] },
          attributes: ['id', 'courseName', 'startCourse', 'coachName', 'courseDifficulty'], // Include 'id'
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user.Courses);
  } catch (error) {
    console.error('Error fetching booked courses:', error);
    res.status(500).json({ error: 'An error occurred while fetching courses.', details: error.message });
  }
});


router.get('/coach-schedule/:coachName', async (req, res) => {
  try {
      const { coachName } = req.params;

      // Récupérer les cours du coach et inclure les membres inscrits
      const courses = await Course.findAll({
          where: { coachName },
          include: [
              {
                  model: User,
                  through: { attributes: [] }, // Exclure les attributs de la table de jonction
                  attributes: ['id', 'username', 'email'], // Champs nécessaires
              },
          ],
      });

      if (!courses.length) {
          return res.status(404).json({ error: 'No courses found for this coach.' });
      }

      res.status(200).json(courses);
  } catch (error) {
      console.error('Error fetching coach schedule:', error);
      res.status(500).json({ error: 'An error occurred while fetching the schedule.', details: error.message });
  }
});

router.delete('/book/:id', async (req, res) => {
  try {
    const { username } = req.body; // Récupérer le username depuis le corps de la requête
    const courseId = req.params.id; // Récupérer l'ID du cours depuis les paramètres

    // Validation des entrées
    if (!username || !courseId) {
      return res.status(400).json({ error: 'Missing username or courseId.' });
    }

    // Trouver l'utilisateur par son username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Trouver le cours par son ID
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Supprimer l'association utilisateur-cours
    await user.removeCourse(course);

    // Répondre avec succès
    res.status(200).json({ message: 'Successfully unsubscribed from the course.' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      error: 'An error occurred while unsubscribing from the course.',
      details: error.message,
    });
  }
});




export default router;