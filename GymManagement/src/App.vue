<template>
  <div>
    <nav>
      <router-link class="logo" to="/">
        <img src="/src/assets/logo.jpg" alt="logo" width="60px" height="60px" />
      </router-link>
      <router-link v-if="!isLoggedIn" to="/">Welcome</router-link>
      <router-link v-if="isLoggedIn" to="/Home">Home</router-link>
      <router-link v-if="isLoggedIn" to="/BookCourse">Book a course</router-link>
      <router-link v-if="!isLoggedIn" to="/SignIn">Sign In</router-link>
      <router-link v-if="!isLoggedIn" to="/SignUp">Sign Up</router-link>
      
      <div
        v-if="isLoggedIn"
        class="dropdown"
        @mouseover="showDropdown = true"
        @mouseleave="showDropdown = false"
      >
        <router-link>Account</router-link>
        <ul v-show="showDropdown" class="dropdown-menu">
          <li>
            <router-link to="/Account">Modify Profile</router-link>
          </li>
          <li v-if="isAdmin">
            <router-link to="/Member">Manage Member</router-link>
          </li>
          <li>
            <router-link to="/Subscription">Subscription</router-link>
          </li>
          <li id="liButton">
            <button v-if="isLoggedIn" @click="logout" id="logout1">Logout</button>
          </li>
        </ul>
      </div>
      
    </nav>
    <router-view @userLoggedIn="updateLoginState" @logout="logout"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      showDropdown: false
    };
  },
  created() {
    this.checkLoginState();
  },
  methods: {
    checkLoginState() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.isLoggedIn = true;
        this.isAdmin = user.state === 'admin';
      } else {
        this.isLoggedIn = false;
        this.isAdmin = false;
      }
    },
    updateLoginState(loggedIn) {
      this.isLoggedIn = loggedIn;
      this.checkLoginState();
    },
    logout() {
      localStorage.setItem('isLoggedIn', false);
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.$router.push('/');
      this.updateLoginState(false); // Met à jour l'état après la déconnexion
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

nav {
  text-align: center;
  display: flex;
  align-items: center;
  margin: 0;
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
  min-width: 160px;
}

a.logo {
  padding: 0 0;
}

nav a:not(.logo):hover {
  background-color: rgb(140, 139, 139);
  color: #FFA500;
}

#logout {
  background-color: #FFA500;
  color: #FFFFFF;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#liButton button {
  background: none;
  border: none;
  background-color: #FFA500;
  color: #FFFFFF;
  font-size: 14px;
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
  text-align: center;
}

#liButton button:hover {
  background-color: #FF8C00;
}
#logout:hover {
  background-color: #FF8C00;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  padding: 10px 0;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: none;
  z-index: 1000;
  min-width: 160px;
  
}

.dropdown-menu li {
  font-size: 12px;
}

.dropdown-menu li:hover {
  background-color: #444;
}

.dropdown-menu a {
  font-size: 14px;
  color: #FFFFFF;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
