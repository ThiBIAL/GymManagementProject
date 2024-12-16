<template>
    <div id="coach-schedule">
      <h1>Your Schedule</h1>
      <div v-if="courses.length">
        <div v-for="course in courses" :key="course.id" class="course-item">
          <p><strong>Course Name:</strong> {{ course.courseName }}</p>
          <p><strong>Start Time:</strong> {{ formatDate(course.startCourse) }}</p>
          <p><strong>End Time:</strong> {{ formatDate(course.endCourse) }}</p>
          <p><strong>Difficulty:</strong> {{ course.courseDifficulty }}</p>
          <p><strong>Registered Users:</strong></p>
          <ul>
            <li v-for="user in course.Users" :key="user.id">{{ user.username }}</li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p>No courses found where you are the coach.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../config/axiosInstance';
  
  export default {
    data() {
      return {
        courses: [], // Liste des cours donnés par le coach
      };
    },
    async mounted() {
      await this.fetchCoachSchedule();
    },
    methods: {
      async fetchCoachSchedule() {
        const token = localStorage.getItem('token');
        const coachName = localStorage.getItem('username'); // Supposons que le nom du coach soit stocké dans le localStorage
  
        if (!coachName) {
          console.error('Coach name not found.');
          return;
        }
  
        try {
          const response = await axios.get(`/courses/coach/${coachName}/schedule`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          this.courses = response.data;
        } catch (error) {
          console.error('Error fetching coach schedule:', error);
          alert('Failed to load your schedule.');
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleString(); // Formater la date pour un affichage lisible
      },
    },
  };
  </script>
  
  <style scoped>
  #coach-schedule {
    text-align: center;
  }
  
  .course-item {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .course-item p {
    margin: 5px 0;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  </style>
  