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
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

nav {
  display: flex;
  margin: 0;
  gap: 20px;
  padding: 10px;
  justify-content: center;
  background-color: #212121;
  margin-bottom: 20px;
}

a {
  color: #FFFFFF;
  font-size: 18px;
  padding: 10px 20px; 
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
  height: 100%;
}

nav a:hover{
  background-color: rgb(140, 139, 139);
  color: #FFA500;
}
</style>
