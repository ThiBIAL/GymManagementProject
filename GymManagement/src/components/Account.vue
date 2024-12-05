<template>
  <div id="content">
    <div class="profile-container">
      <!-- Profile Picture -->
      <div class="profile-picture" @click="changeProfilePicture">
        <img src="@/assets/avatar.jpg" alt="Profile Picture" />
      </div>

      <!-- Username -->
      <h2>{{ username }}</h2>

      <!-- Buttons -->
      <div class="buttons-container">
        <button class="btn-view" @click="editProfile">Edit Profile</button>
        <button class="btn-view" @click="viewReservations">View Reserved Classes</button>
        <button class="btn-view" @click="viewDietPlan">View Diet Plan</button>
        <button class="btn-logout" @click="logout">Logout</button>
      </div>
    </div>

    <!-- Modal for Edit Profile -->
    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>Edit Profile</h3>
        <form @submit.prevent="saveChanges">
          <label for="firstName">First Name</label>
          <input type="text" v-model="user.firstName" id="firstName" required />

          <label for="lastName">Last Name</label>
          <input type="text" v-model="user.lastName" id="lastName" required />

          <label for="email">Email</label>
          <input type="email" v-model="user.email" id="email" required />

          <label for="password">Password</label>
          <input type="password" v-model="user.password" id="password" required />

          <label for="phone">Phone</label>
          <input type="tel" v-model="user.phone" id="phone"/>

          <label for="address">Address</label>
          <input type="text" v-model="user.address" id="address"/>

          <div class="modal-actions">
            
            <button type="button" @click="closeModal">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      isModalVisible: false,
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
      }
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.username = user.username;
      this.profilePicture = user.profilePicture || this.profilePicture;
      this.user = { ...user }; // Copy user data into local object
    }
  },
  methods: {
    editProfile() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    saveChanges() {
      // Save the changes, here you could save them to localStorage or a backend
      localStorage.setItem('user', JSON.stringify(this.user));
      this.closeModal();
    },
    logout() {
      localStorage.removeItem('user');
      this.$emit('logout');
      this.$router.push('/');
    },
    changeProfilePicture() {
      // Handle profile picture change
      console.log('Change profile picture');
    },
    viewReservations() {
      console.log('View reservations');
    },
    viewDietPlan() {
      console.log('View diet plan');
    }
  }
};
</script>

<style scoped>
#content {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.profile-container {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.profile-picture {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #333;
  cursor: pointer;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-logout {
  background-color: #ffa500;
  color: #fff;
}

.btn-logout:hover {
  background-color: #e59400;
}

.btn-view {
  background-color: #333;
  color: #fff;
}

.btn-view:hover {
  background-color: #555;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.modal h3 {
  margin-bottom: 20px;
}

.modal input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.modal-actions button {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.modal-actions button[type="button"] {
  background-color: #ccc;
}

.modal-actions button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}
</style>