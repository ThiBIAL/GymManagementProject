<template>
  <div class="add-course-container">
    <h2>Add New Course</h2>
    <form @submit.prevent="submitForm" class="form-card">
      <div class="form-group">
        <label for="courseName">Course Name</label>
        <input
          type="text"
          id="courseName"
          v-model="course.courseName"
          placeholder="Enter Course Name"
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
        <select id="courseDifficulty" v-model="course.courseDifficulty" required>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div class="form-group">
        <label for="coachName">Coach Name</label>
        <input
          type="text"
          id="coachName"
          v-model="course.coachName"
          placeholder="Enter Coach Name"
          required
        />
      </div>

      <button type="submit" class="submit-button">Add Course</button>
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
          coachName: '',
        },
        message: '',
        messageType: '',
        missingFields: {},
      };
    },
    methods: {
      async submitForm() {
        try {
          // Send a POST request to the backend to add the course
          const response = await axios.post('/courses/add', this.course);
  
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
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    padding: 2rem;
    max-width: 800px;
  }
  
  h2 {
    font-size: 2rem;
    color: #000;
    margin-bottom: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  
  .form-card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem 2rem;
    width: 100%;
    box-sizing: border-box;
  }
  
  .form-group {
    margin-bottom: 1.2rem;
  }
  
  label {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  input,
  select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 1rem;
  }
  
  input:focus,
  select:focus {
    border-color: #ffa500;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 165, 0, 0.5);
  }
  
  button.submit-button {
    background-color: #ffa500;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.8rem;
    width: 100%;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button.submit-button:hover {
    background-color: #e69500;
  }
  
  p.success {
    color: green;
    font-weight: bold;
    text-align: center;
  }
  
  p.error {
    color: red;
    font-weight: bold;
    text-align: center;
  }
</style>