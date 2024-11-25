<template>
    <div class="book-course">
      <h1>Book a Sport Course</h1>
      <p>Select one of the available courses below and confirm your booking.</p>
  
      <div class="course-list">
        <div class="course" v-for="course in courses" :key="course.id">
          <h2>{{ course.name }}</h2>
          <p><strong>Day:</strong> {{ course.day }}</p>
          <p><strong>Time:</strong> {{ course.time }}</p>
          <button @click="bookCourse(course)">Book Now</button>
        </div>
      </div>
  
      <div v-if="selectedCourse" class="confirmation">
        <h3>Confirmation</h3>
        <p>You have selected: <strong>{{ selectedCourse.name }}</strong></p>
        <p><strong>Day:</strong> {{ selectedCourse.day }}</p>
        <p><strong>Time:</strong> {{ selectedCourse.time }}</p>
        <button @click="confirmBooking">Confirm Booking</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        courses: [
          { id: 1, name: "Yoga Class", day: "Monday", time: "4:00 PM" },
          { id: 2, name: "Pilates Class", day: "Wednesday", time: "10:00 AM" },
          { id: 3, name: "Zumba Class", day: "Friday", time: "2:00 PM" },
        ],
        selectedCourse: null,
      };
    },
    methods: {
      bookCourse(course) {
        this.selectedCourse = course;
      },
      confirmBooking() {
        alert(`You have successfully booked the ${this.selectedCourse.name}!`);
        this.selectedCourse = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .book-course {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  .course-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .course {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  button:hover {
    background-color: #0056b3;
  }
  .confirmation {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #007bff;
    border-radius: 5px;
    background-color: #f0f8ff;
  }
  </style>
  