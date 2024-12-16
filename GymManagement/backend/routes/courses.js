import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';


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
router.delete('/:courseId', async (req, res) => {
    try {
        const { userId } = req.body; // ID de l'utilisateur envoyé dans le corps de la requête
        const { courseId } = req.params; // ID du cours depuis les paramètres

        // Valider les données
        if (!userId || !courseId) {
            return res.status(400).json({ error: 'Missing userId or courseId.' });
        }

        // Rechercher l'utilisateur et le cours
        const user = await User.findByPk(userId);
        const course = await Course.findByPk(courseId);

        if (!user || !course) {
            return res.status(404).json({ error: 'User or course not found.' });
        }

        // Supprimer l'association dans la table pivot
        await user.removeCourse(course); // Sequelize helper

        res.status(200).json({ message: 'User has been removed from the course successfully.' });
    } catch (err) {
        console.error('Error removing user from course:', err);
        res.status(500).json({ error: err.message });
    }
});



router.post('/book/:id', async (req, res) => {
    try {
      const { username } = req.body; // Récupérer le username depuis le corps de la requête
      const courseId = req.params.id;
  
      // Validation des entrées
      if (!username || !courseId) {
        return res.status(400).json({ error: 'Missing username or courseId.' });
      }
  
      // Recherche de l'utilisateur par username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Recherche du cours par ID
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found.' });
      }
  
      // Ajouter l'utilisateur au cours (association many-to-many)
      await user.addCourse(course); // Sequelize association helper
  
      // Réponse en cas de succès
      res.status(200).json({ message: 'Course successfully booked!' });
    } catch (error) {
      console.error('Error booking course:', error); // Log détaillé de l'erreur
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
          through: { attributes: [] }, // Exclut les attributs de la table de jonction si nécessaire
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Map des cours de l'utilisateur avec seulement les informations nécessaires
    const courses = user.Courses.map(course => ({
      courseName: course.courseName,
      startCourse: course.startCourse,
      coachName: course.coachName,
      courseDifficulty: course.courseDifficulty,
    }));

    res.json(courses);
  } catch (error) {
    console.error('Error fetching booked courses:', error);
    res.status(500).json({ error: 'An error occurred while fetching courses.', details: error.message });
  }
});

  
export default router;

