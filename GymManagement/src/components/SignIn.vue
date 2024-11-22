<template>
    <div>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
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
        error: null,
      };
    },
    methods: {
      login() {
        const storedUser = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUser.find(user => user.username === this.username);
  
        if (user) {
          if (user.password === this.password) {
            // Mettre l'utilisateur dans le localStorage et définir isLoggedIn à true
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', true);
            
            // Émettre un événement pour mettre à jour le menu
            this.$emit('userLoggedIn', true);
  
            this.$router.push('/');
          } else {
            this.error = 'Incorrect password';
          }
        } else {
          this.error = 'Username not found';
        }
      },
    },
  };
  </script>
  