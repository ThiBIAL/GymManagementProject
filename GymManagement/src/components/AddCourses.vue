<template>
  <div class="add-course-container">
    <h2>Add New Course</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="courseName">Course Name</label>
        <input
          type="text"
          id="courseName"
          v-model="course.courseName"
          required
        />
      </div>

      <div class="form-group">
        <label for="startCourse">Start Date</label>
        <input
          type="datetime-local"
          id="startCourse"
          v-model="course.startCourse"
          required
        />
      </div>

      <div class="form-group">
        <label for="endCourse">End Date</label>
        <input
          type="datetime-local"
          id="endCourse"
          v-model="course.endCourse"
          required
        />
      </div>

      <div class="form-group">
        <label for="courseDifficulty">Course Difficulty</label>
        <select
          id="courseDifficulty"
          v-model="course.courseDifficulty"
          required
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <button type="submit">Add Course</button>
    </form>
    <p v-if="message" :class="messageType">{{ message }}</p>
  </div>
</template>

<script>
import axios from '@/config/axiosInstance'; // Adjust the path if needed

export default {
  data() {
    return {
      course: {
        courseName: '',
        startCourse: '',
        endCourse: '',
        courseDifficulty: '',
      },
      message: '',
      messageType: '',
      missingFields: {},
    };
  },
  methods: {
    getUsername() {
      const token = localStorage.getItem('token');
      if (token) {
        return JSON.parse(atob(token.split('.')[1])).username; // Extract username from token
      }
      return null;
    },
    async submitForm() {
      try {
        const coachName = this.getUsername(); // Automatically retrieve the coach's username
        if (!coachName) {
          this.message = 'Failed to identify the coach. Please log in again.';
          this.messageType = 'error';
          return;
        }

        const courseData = { ...this.course, coachName }; // Include the coach's name in the request

        // Send a POST request to the backend to add the course
        const response = await axios.post('/courses/add', courseData);

        // Success response handling
        this.message = 'Course added successfully!';
        this.messageType = 'success';
        this.$router.push('/Home'); // Optionally redirect after success
      } catch (error) {
        if (error.response) {
          // Handle validation errors from the backend
          const { error: errMsg, missingFields } = error.response.data;
          if (errMsg) {
            this.message = errMsg;
            this.messageType = 'error';
          }
          this.missingFields = missingFields || {}; // Store missing fields
        } else {
          this.message = 'Failed to add course. Please try again.';
          this.messageType = 'error';
        }
        console.error('Error adding course:', error);
      }
    },
  },
};
</script>

<style scoped>
.add-course-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 1rem;
}

input,
select,
button {
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.2rem;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p.success {
  color: green;
}

p.error {
  color: red;
}
</style>
