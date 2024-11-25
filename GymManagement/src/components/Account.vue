<template>
    <div>
      <h1>Welcome, {{ username }}</h1>
      <!-- Your account details here -->
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      username() {
        return this.$route.params.username;
      }
    }
  };
  </script>