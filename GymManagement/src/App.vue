<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link v-if="isLoggedIn" to="/BookCourse">Book a course</router-link>
      <router-link v-if="!isLoggedIn" to="/SignIn">Sign In</router-link>
      <router-link v-if="!isLoggedIn" to="/SignUp">Sign Up</router-link>
      <router-link v-if="isLoggedIn" to="/Account">Account</router-link>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </nav>
    <router-view @userLoggedIn="updateLoginState"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    };
  },
  methods: {
    updateLoginState(loggedIn) {
      this.isLoggedIn = loggedIn;
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      this.isLoggedIn = false;
      this.$router.push('/SignIn');
    },
  },
};
</script>

<style>
nav {
  display: flex;
  gap: 20px;
  padding: 10px;
  justify-content: center;
}

a {
  text-decoration: none;
  color: black;
}
</style>
