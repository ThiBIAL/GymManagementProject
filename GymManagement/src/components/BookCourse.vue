<template>
  <div class="book-course">
    <h1>Book a Sport Course</h1>
    <p class="description">Select one of the available courses below and confirm your booking.</p>
    <br>

    <div class="course-list">
      <div class="course" v-for="course in courses" :key="course.id">
        <h2>{{ course.courseName }}</h2>
        <p><strong>Coach:</strong> {{ course.coachName }}</p>
        <p><strong>Difficulty:</strong> {{ course.courseDifficulty }}</p>
        <p><strong>Start Date:</strong> {{ new Date(course.startCourse).toLocaleDateString() }}</p>
        <p><strong>End Date:</strong> {{ new Date(course.endCourse).toLocaleDateString() }}</p>
        <button @click="bookCourse(course)">Book Now</button>

        <div v-if="selectedCourse && selectedCourse.id === course.id" class="confirmation">
          <h3>Confirmation</h3>
          <p>You have selected: <strong>{{ selectedCourse.courseName }}</strong></p>
          <p><strong>Coach:</strong> {{ selectedCourse.coachName }}</p>
          <p><strong>Difficulty:</strong> {{ selectedCourse.courseDifficulty }}</p>
          <p><strong>Start Date:</strong> {{ new Date(selectedCourse.startCourse).toLocaleDateString() }}</p>
          <p><strong>End Date:</strong> {{ new Date(selectedCourse.endCourse).toLocaleDateString() }}</p>
          <button @click="confirmBooking">Confirm Booking</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

function decodeToken(token) {
  const payload = token.split('.')[1]; // Extraire la partie payload du token
  const decodedPayload = JSON.parse(atob(payload)); // Décoder le payload (Base64)
  return decodedPayload;
}


import axios from '../config/axiosInstance';

export default {
  data() {
    return {
      courses: [], // Store available courses
      selectedCourse: null, // Store the course that the user wants to book
    };
  },
  mounted() {
    this.fetchCourses(); // Fetch courses when the component is mounted
  },
  methods: {
    // Fetch courses from the backend
    async fetchCourses() {
      try {
        const response = await axios.get('/courses');
        this.courses = response.data; // Update the courses data
      } catch (error) {
        console.error('Error fetching courses:', error);
        alert('An error occurred while fetching courses.');
      }
    },

    // Set the selected course when the user clicks "Book Now"
    bookCourse(course) {
      this.selectedCourse = course; // Store the selected course
    },

    // Confirm the booking and send the request to the backend
    async confirmBooking() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to log in to book a course.');
          return this.$router.push('/SignIn');
        }

        const decodedToken = decodeToken(token);
        const username = decodedToken.username;

        if (!username) {
          alert('User information is missing.');
          return;
        }

        await axios.post(
          `/courses/book/${this.selectedCourse.id}`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(`You have successfully booked ${this.selectedCourse.courseName}!`);
        this.selectedCourse = null;
        this.fetchCourses();
      } catch (error) {
        console.error('Error booking course:', error);
        alert('An error occurred while booking the course.');
      }
    },
  },
};
</script>


<style scoped>
.book-course {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.course-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.course {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  position: relative;
  background-color: #ffffff;
  transition: transform 0.2s;
}

.course:hover {
  transform: scale(1.02);
}

.course h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.course p {
  margin: 5px 0;
  color: #555;
}

button {
  background-color: #ffa500;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff8c00;
}

.confirmation {
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 8px;
  background-color: #e7f3ff;
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  text-align: left;
}

.confirmation h3 {
  font-size: 20px;
  margin-bottom: 15px;
}
</style>