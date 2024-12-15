<template>
    <div class="coach-planning">
      <h1>Coach Schedule</h1>
  
      <!-- Dropdown to select sorting criteria -->
      <div class="sorting">
        <label for="sortBy">Sort By:</label>
        <select id="sortBy" v-model="sortBy" @change="sortCourses">
          <option value="startCourse">Start Date</option>
          <option value="courseName">Course Name</option>
        </select>
      </div>
  
      <!-- Schedule Table -->
      <table class="schedule-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Difficulty</th>
            <th>Members</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in sortedCourses" :key="course.id">
            <td>{{ course.courseName }}</td>
            <td>{{ formatDate(course.startCourse) }}</td>
            <td>{{ formatDate(course.endCourse) }}</td>
            <td>{{ course.courseDifficulty }}</td>
            <td>
              <ul class="member-list">
                <li v-for="member in course.Users" :key="member.id">
                  {{ member.username }} ({{ member.email }})
                </li>
              </ul>
            </td>
            <td>
              <button @click="deleteCourse(course.id)" class="delete-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from '@/config/axiosInstance';
  
  export default {
    data() {
      return {
        courses: [], // Stores the coach's courses
        sortBy: 'startCourse', // Default sorting criteria
      };
    },
    computed: {
      sortedCourses() {
        if (this.sortBy === 'courseName') {
          // Group by courseName and sort alphabetically
          return [...this.courses].sort((a, b) => {
            if (a.courseName < b.courseName) return -1;
            if (a.courseName > b.courseName) return 1;
            return new Date(a.startCourse) - new Date(b.startCourse);
          });
        } else {
          // Sort by startCourse date
          return [...this.courses].sort((a, b) => new Date(a.startCourse) - new Date(b.startCourse));
        }
      },
    },
    async created() {
      await this.fetchCourses();
    },
    methods: {
      async fetchCourses() {
        try {
          const token = localStorage.getItem('token');
          const coachName = this.getUsername();
          const response = await axios.get(`/courses/coach-schedule/${coachName}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.courses = response.data;
        } catch (error) {
          console.error('Error fetching coach schedule:', error);
          alert('Failed to fetch coach schedule. Please try again.');
        }
      },
      getUsername() {
        const token = localStorage.getItem('token');
        if (token) {
          return JSON.parse(atob(token.split('.')[1])).username; // Extract username from token
        }
        return null;
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleDateString('en-US', options);
      },
      sortCourses() {
        // Trigger the computed property to re-sort
        this.sortedCourses;
      },
      async deleteCourse(courseId) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`/courses/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          // Remove the deleted course from the list
          this.courses = this.courses.filter((course) => course.id !== courseId);
  
          alert('Course deleted successfully!');
        } catch (error) {
          console.error('Error deleting course:', error);
          alert('Failed to delete the course. Please try again.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .coach-planning {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .coach-planning h1 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }
  
  .sorting {
    margin-bottom: 20px;
  }
  
  .sorting label {
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .sorting select {
    padding: 5px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .schedule-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .schedule-table th,
  .schedule-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .schedule-table th {
    background-color: #ffa500;
    color: white;
    text-transform: uppercase;
  }
  
  .schedule-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .schedule-table tr:hover {
    background-color: #f1f1f1;
  }
  
  .member-list {
    list-style: none; /* Removes the bullets */
    padding: 0; /* Removes default padding */
    margin: 0; /* Removes default margin */
  }
  
  .member-list li {
    margin: 5px 0; /* Adds spacing between member names */
    font-size: 0.9rem;
    color: #555;
  }
  
  .delete-button {
    background-color: #ff0000;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 0.9rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #d40000;
  }
  </style>
  