<template>
    <div id="content">
      <h1>Welcome back <div id="username">{{ username }}</div>!</h1>
      <h3>Ready to crush your fitness goal today?</h3><br><br>
      <h2>Your courses:</h2>
      <div v-if="bookedCourses.length">
        <div v-for="course in bookedCourses" :key="course.id" class="course-item">
          <p><strong>{{ course.name }}</strong></p>
          <p><strong>Coach:</strong> {{ course.coach }}</p>
          <p><strong>Day:</strong> {{ course.day }}</p>
          <p><strong>Time:</strong> {{ course.time }}</p>
          <button @click="deleteCourse(course.id)">Delete</button>
        </div>
      </div>
      <div v-else>
        <p>No courses booked yet.</p>
      </div>
      <h2>Your personal food monitoring:</h2>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: JSON.parse(localStorage.getItem('user')).username,
        bookedCourses: JSON.parse(localStorage.getItem('bookedCourses')) || [],
      };
    },
    methods: {
      deleteCourse(courseId) {
        this.bookedCourses = this.bookedCourses.filter(course => course.id !== courseId);
  
        localStorage.setItem('bookedCourses', JSON.stringify(this.bookedCourses));
  
        alert('Course has been deleted successfully!');
      },
    },
  };
  </script>

<style scoped>
    *{
        box-sizing: border-box;
    }

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