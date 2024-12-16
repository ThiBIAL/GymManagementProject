<template>
  <div id="content">
    <h1>
      Welcome back <div id="username">{{ username || "Guest" }}</div>!
    </h1>
    <h3>Ready to crush your fitness goal today?</h3><br><br>
    <h2>Your courses:</h2>
    <div v-if="bookedCourses.length">
      <div v-for="course in bookedCourses" :key="course.id" class="course-item">
        <p><strong>Course Name:</strong> {{ course.courseName || 'N/A' }}</p>
        <p><strong>Start Time:</strong> {{ new Date(course.startCourse).toLocaleString() || 'N/A' }}</p>
        <p><strong>Coach:</strong> {{ course.coachName || 'N/A' }}</p>
        <p><strong>Difficulty:</strong> {{ course.courseDifficulty || 'N/A' }}</p>
        <button @click="deleteCourse(course.id)">Delete</button>
      </div>
    </div>
    <div v-else>
      <p>No courses booked yet.</p>
    </div>

    <h2>Your personal food monitoring:</h2>
    <div v-if="foodMonitoring.length">
      <div v-for="(item, index) in foodMonitoring" :key="index" class="food-monitoring-item">
        <p><strong>Type:</strong> {{ item.type }}</p>
        <p><strong>Duration:</strong> {{ item.duration }}</p>
        <p><strong>Allergy:</strong> {{ item.allergy }}</p>
      </div>
    </div>
    <div v-else>
      <p>No food monitoring data available.</p>
    </div>
  </div>
</template>

<script>
import axios from "../config/axiosInstance";

export default {
  data() {
    return {
      username: null,
      bookedCourses: [],
      foodMonitoring: [],
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.username = response.data.user.username;

      // Fetch the booked courses
      await this.fetchBookedCourses();

      // Fetch food monitoring data
      await this.fetchFoodMonitoring();
    } catch (error) {
      console.error('Failed to fetch profile:', error.response?.data || error.message);
      alert('Session expired or error occurred. Please log in again.');
      this.$router.push('/SignIn');
    }
  },

  methods: {
    // Fetch booked courses
    async fetchBookedCourses() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/courses/booked/${this.username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.bookedCourses = response.data;
      } catch (error) {
        console.error('Error fetching booked courses:', error);
        alert('Failed to load booked courses.');
      }
    },

    // Fetch food monitoring data
    async fetchFoodMonitoring() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/food-monitoring/${this.username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.foodMonitoring = response.data;
      } catch (error) {
        console.error('Error fetching food monitoring data:', error);
      }
    },

    // Delete a course
    async deleteCourse(courseId) {
      try {
        if (!courseId) {
          alert("Course ID is missing.");
          return;
        }

        const token = localStorage.getItem("token");

        // Use DELETE with username in the body
        await axios.delete(`/courses/book/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
          data: { username: this.username }, // Pass the username in the body
        });

        // Update the booked courses list
        this.bookedCourses = this.bookedCourses.filter(
          (course) => course.id !== courseId
        );

        alert("Course has been deleted successfully!");
      } catch (error) {
        console.error("Error deleting course:", error.response?.data || error.message);
        alert("Failed to delete course. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
  /* Styles remain unchanged */
  #content > * {
    color: #333333;
    text-align: center;
    padding-top: 10px;
  }

  #username {
    color: #FFA500;
    display: inline;
  }

  #content {
    align-items: center;
    height: 100vh;
    width: 80%;
    margin: 0 auto;
    background-color: #f9f9f9;
    border: solid 1px rgb(217, 217, 217);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .course-item {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 15px;
    background-color: #f9f9f9;
    width: 90%;
    margin-left: 5%;
  }

  .food-monitoring-item {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 15px;
    background-color: #f9f9f9;
    width: 90%;
    margin-left: 5%;
  }

  button {
    background-color: #FF0000;
    color: white;
    border: none;
    padding: 5px 15px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #D40000;
  }
</style>
