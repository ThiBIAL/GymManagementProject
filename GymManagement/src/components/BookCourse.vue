<template>
  <div class="book-course">
    <h1>Book a Sport Course</h1>
    <p class="description">Select one of the available courses below and confirm your booking.</p>

    <div class="course-list">
      <div class="course" v-for="course in courses" :key="course.id">
        <h2>{{ course.name }}</h2>
        <p><strong>Coach:</strong> {{ course.coach }}</p>
        <p><strong>Day:</strong> {{ course.day }}</p>
        <p><strong>Time:</strong> {{ course.time }}</p>
        <button @click="bookCourse(course)">Book Now</button>
      </div>
    </div>

    <div v-if="selectedCourse" class="confirmation">
      <h3>Confirmation</h3>
      <p>You have selected: <strong>{{ selectedCourse.name }}</strong></p>
      <p><strong>Coach:</strong> {{ selectedCourse.coach }}</p>
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
          { id: 1, name: "Yoga Class", coach:"Samuel Doyen", day: "Monday", time: "4:00 PM" },
          { id: 2, name: "Pilates Class", coach:"Thibault Bial", day: "Wednesday", time: "10:00 AM" },
          { id: 3, name: "Zumba Class", coach:"Ethan Guingand", day: "Friday", time: "2:00 PM" },
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
    display: flex;
    flex-direction: column;
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
    padding: 10px;
    border-radius: 8px;
    width: 80%;
    box-sizing: border-box; 
  }
  .course > * {
    margin: 10px;
  }
  button {
    background-color: #FFA500;
    color: #FFFFFF;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px
  }
  button:hover {
    background-color: #FF8C00;
  }
  .confirmation {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #007bff;
    border-radius: 5px;
    background-color: #f0f8ff;
  }
  .description {
    margin: 15px;
  }
</style>
  