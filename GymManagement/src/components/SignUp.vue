<template>
    <div>
      <form @submit.prevent="signup">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="password" v-model="confirmPassword" placeholder="Confirm password" required />
        <button type="submit">Sign Up</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      error: null,
    };
  },
  methods: {
    signup() {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = storedUsers.some(user => user.username === this.username);

      if (userExists) {
        this.error = 'Username already taken';
      } else if (this.password !== this.confirmPassword) {
        this.error = 'Both passwords must be the same';
      } else {
        const newUser = { username: this.username, password: this.password };
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', true);
        this.$router.push('/');
      }
    },
  },
};
</script>
