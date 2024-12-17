<template>
  <div id="content">
    <div class="profile-container">
      <!-- Photo de profil -->
      <div class="profile-picture" @click="openAvatarModal">
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

    <!-- Modal pour sélectionner un avatar -->
    <div v-if="isAvatarModalVisible" class="modal-overlay" @click="closeAvatarModal">
      <div class="modal" @click.stop>
        <h3>Select an Avatar</h3>
        <div class="avatar-grid">
          <div
            v-for="avatar in avatars"
            :key="avatar"
            class="avatar-item"
            @click="selectAvatar(avatar)"
          >
            <img :src="avatar" :alt="avatar" />
          </div>
        </div>
        <div class="modal-actions">
          <button @click="closeAvatarModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Modal pour éditer le profil -->
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
          <input type="tel" v-model="user.phoneNumber" id="phone" @input="validatePhone" />
          <div v-if="phoneError" class="error">{{ phoneError }}</div>

          <label for="password">New Password</label>
          <input type="password" v-model="password" id="password" placeholder="Enter new password (optional)" @input="validatePassword" />
          <div v-if="passwordError" class="error">{{ passwordError }}</div>

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
        <h3>Diet Plans</h3>
        <div class="diet-plan-description">
          <p>
            <strong>Mass Gain:</strong> To gain mass, focus on consuming a calorie surplus with high-protein meals. Combine strength training with a balanced diet rich in complex carbohydrates, healthy fats, and lean proteins.
          </p>
          <p>
            <strong>Weight Loss:</strong> For weight loss, aim for a calorie deficit by consuming nutrient-dense, low-calorie foods. Incorporate regular cardio and strength training into your routine.
          </p>
          <p>
            <strong>Maintenance:</strong> To maintain your current weight, balance your calorie intake with your energy expenditure. Focus on a varied diet with adequate macro- and micronutrients.
          </p>
        </div>
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
      isAvatarModalVisible: false,
      profilePicture: require('@/assets/avatars/avatar1.png'), // Utiliser une seule fois
      avatars: [
        require('@/assets/avatars/avatar1.png'),
        require('@/assets/avatars/avatar2.png'),
        require('@/assets/avatars/avatar3.png'),
        require('@/assets/avatars/avatar4.png'),
        require('@/assets/avatars/avatar5.png'),
        require('@/assets/avatars/avatar6.png'),
        require('@/assets/avatars/avatar7.png'),
        require('@/assets/avatars/default-avatar.png'),
      ],
      profilePicture: '@/assets/avatars/default-avatar.png',
      isModalVisible: false,
      isDietPlanVisible: false,
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      password: '', // Stores the new password to be updated
      phoneError: null,
      passwordError: null,
    };
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.user = response.data.user;

      // Récupérer l'avatar depuis le localStorage s'il existe
      const savedAvatar = localStorage.getItem('selectedAvatar');
      this.profilePicture = savedAvatar || this.user.profilePicture || require('@/assets/avatars/avatar1.png');
    } catch (error) {
      console.error('Error fetching profile data:', error);
      alert('Failed to load profile data. Please log in again.');
      this.$router.push('/SignIn');
    }
  },
  methods: {
    openAvatarModal() {
      this.isAvatarModalVisible = true;
    },
    closeAvatarModal() {
      this.isAvatarModalVisible = false;
    },
    selectAvatar(avatar) {
      this.profilePicture = avatar; // Met à jour l'image de profil localement

      // Sauvegarder l'avatar sélectionné dans le localStorage
      localStorage.setItem('selectedAvatar', avatar);

      alert('Avatar updated successfully!');
      this.closeAvatarModal();
    },
    editProfile() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.password = ''; // Clear the password field when modal is closed
      this.phoneError = null;
      this.passwordError = null;
    },
    validatePhone() {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(this.user.phoneNumber)) {
        this.phoneError = 'Phone number must be exactly 10 digits.';
      } else {
        this.phoneError = null;
      }
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
      if (this.password && !passwordRegex.test(this.password)) {
        this.passwordError = 'Password must be at least 6 characters, include one number and one special character.';
      } else {
        this.passwordError = null;
      }
    },
    async saveChanges() {
      if (this.phoneError || this.passwordError) {
        alert('Please fix the errors before submitting.');
        return;
      }

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
      localStorage.removeItem('selectedAvatar');
      this.$router.push('/SignIn');
    },
    viewReservations() {
      console.log('View reservations');
    },
    viewDietPlan() {
      this.isDietPlanVisible = true;
    },
    closeDietPlan() {
      this.isDietPlanVisible = false;
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

.error {
  color: red;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 10px;
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

.avatar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.avatar-item {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: border 0.3s ease;
}

.avatar-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-item:hover {
  border-color: #ffa500;
}

/* Diet Plan Popup Styles */
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
  width: 400px;
}

.diet-plan-popup h3 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.diet-plan-description {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
}

.diet-plan-description strong {
  font-weight: bold;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
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

.diet-plan-popup button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.diet-plan-popup button:hover {
  background-color: #45a049;
}
</style>

