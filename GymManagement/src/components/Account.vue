<template>
  <div id="content">
    <div class="profile-container">
      <!-- Profile Picture -->
      <div class="profile-picture">
        <img :src="profilePicture" alt="Profile Picture" />
      </div>

      <!-- Username -->
      <h2>{{ user.username }}</h2>

      <!-- Buttons -->
      <div class="buttons-container">
        <button class="btn-view" @click="editProfile"><strong>Edit Profile</strong></button>
        <button class="btn-view" @click="viewReservations"><RouterLink to="/home">Reserved Classes</RouterLink></button>
        <button class="btn-view" @click="viewDietPlan"><strong>View Diet Plan</strong></button>
        <button class="btn-logout" @click="logout"><strong>Logout</strong></button>
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

          <label for="phone">Phone</label>
          <input type="tel" v-model="user.phoneNumber" id="phone"/>

          <label for="password">New Password</label>
          <input type="password" v-model="password" id="password" placeholder="Enter new password (optional)" />

          <div class="modal-actions">
            <button type="button" @click="closeModal">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Diet Plan Popup -->
    <div v-if="isDietPlanVisible" class="diet-plan-overlay" @click="closeDietPlan">
      <div class="diet-plan-popup" @click.stop>
        <h3>Select a Diet Plan</h3>
        <ul>
          <li><button @click="selectDietPlan('Mass Gain')">Mass Gain</button></li>
          <li><button @click="selectDietPlan('Weight Loss')">Weight Loss</button></li>
          <li><button @click="selectDietPlan('Maintenance')">Maintenance</button></li>
        </ul>
        <div class="modal-actions">
          <button @click="closeDietPlan">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from '../config/axiosInstance';

export default {
  data() {
    return {
      isModalVisible: false,
      isDietPlanVisible: false,
      profilePicture: '/avatar/avatar1.jpg', // Default profile picture path
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      password: '', // Stores the new password to be updated
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = response.data.user;
      this.profilePicture = this.user.profilePicture || '/avatar/avatar1.jpg';
    } catch (error) {
      console.error('Error fetching profile data:', error);
      alert('Failed to load profile data. Please log in again.');
      this.$router.push('/SignIn');
    }
  },
  methods: {
    editProfile() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.password = ''; // Clear the password field when modal is closed
    },
    async saveChanges() {
      try {
        const token = localStorage.getItem('token');
        const updatedData = {
          ...this.user,
        };

        // Include the password only if it is provided
        if (this.password) {
          updatedData.password = this.password;
        }

        await axios.put(`/members/${this.user.id}`, updatedData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert('Profile updated successfully!');
        this.closeModal();
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again later.');
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/SignIn');
    },
    viewReservations() {
      console.log('View reservations');
    },
    viewDietPlan() {
      this.isDietPlanVisible = true; // Show the diet plan popup
    },
    closeDietPlan() {
      this.isDietPlanVisible = false; // Hide the diet plan popup
    },
    selectDietPlan(plan) {
      console.log(`Selected diet plan: ${plan}`);
      this.closeDietPlan(); // Close the popup after selection
    }
  },
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

.diet-plan-overlay {
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

.diet-plan-popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.diet-plan-popup h3 {
  margin-bottom: 20px;
}

.diet-plan-popup ul {
  list-style: none;
  padding: 0;
}

.diet-plan-popup li {
  margin: 10px 0;
}

.diet-plan-popup button {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #333;
  color: #fff;
}

.diet-plan-popup button:hover {
  background-color: #555;
}

.modal-actions button {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ccc;
}

.modal-actions button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}

</style>
