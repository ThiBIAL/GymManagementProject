<template>
  <div id="content">
    <h1>Manage Member</h1>
    <div class="user" v-if="admins.length">
      <h2 class="subTitle">Admins:</h2>
      <ul>
        <li v-for="user in admins" :key="user.id" class="admin">
          {{ user.username }}
          <div class="divSelect">
            <select :value="user.role" @change="(event) => updateUserRole(user, event)">
              <option value="admin">Admin</option>
              <option value="coach">Coach</option>
              <option value="member">Member</option>
            </select>
            <button @click="viewUserDetails(user)" class="infoButton">Info</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="user" v-if="coaches.length">
      <h2 class="subTitle">Coaches:</h2>
      <ul>
        <li v-for="user in coaches" :key="user.id" class="coach">
          {{ user.username }}
          <div class="divSelect">
            <select :value="user.role" @change="(event) => updateUserRole(user, event)">
              <option value="admin">Admin</option>
              <option value="coach">Coach</option>
              <option value="member">Member</option>
            </select>
            <button @click="viewUserDetails(user)" class="infoButton">Info</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="user" v-if="members.length">
      <h2 class="subTitle">Members:</h2>
      <ul>
        <li v-for="user in members" :key="user.id" class="member">
          {{ user.username }}
          <div class="divSelect">
            <select :value="user.role" @change="(event) => updateUserRole(user, event)">
              <option value="admin">Admin</option>
              <option value="coach">Coach</option>
              <option value="member">Member</option>
            </select>
            <button @click="viewUserDetails(user)" class="infoButton">Info</button>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Confirm Change</h2>
        <p>
          Are you sure you want to change the role of <strong>{{ selectedUser?.username }}</strong> to
          <strong>{{ tempRole }}</strong>?
        </p>
        <button @click="cancelChange">Cancel</button>
        <button @click="confirmChange">Confirm</button>
      </div>
    </div>
    <div v-if="showUserInfoModal" class="modal-overlay">
      <div class="modal">
        <h2>User Information</h2>
        <div
          v-for="(value, key) in userDetails"
          :key="key"
          class="user-info-row"
        >
          <p><strong>{{ formatKey(key) }}:</strong> {{ value }}</p>
        </div>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axiosInstance';

export default {
  data() {
    return {
      users: [],
      admins: [],
      coaches: [],
      members: [],
      showModal: false,
      showUserInfoModal: false,
      selectedUser: null,
      userDetails: {},
      tempRole: '',
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/members');
        this.users = response.data;
        this.sortUsers();
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
        alert('Failed to fetch users. Please try again later.');
      }
    },
    sortUsers() {
      this.admins = this.users.filter((user) => user.role === 'admin');
      this.coaches = this.users.filter((user) => user.role === 'coach');
      this.members = this.users.filter((user) => user.role === 'member');
    },
    updateUserRole(user, event) {
      this.selectedUser = user;
      this.tempRole = event.target.value;
      this.showModal = true;
    },
    async confirmChange() {
      if (this.selectedUser) {
        try {
          await axios.put(`/members/${this.selectedUser.id}`, {
            role: this.tempRole,
          });
          this.selectedUser.role = this.tempRole;
          this.sortUsers();
          this.showModal = false;
        } catch (error) {
          console.error('Error updating user role:', error.response?.data || error.message);
          alert('Failed to update user role. Please try again.');
        }
      }
    },
    cancelChange() {
      this.selectedUser = null;
      this.tempRole = '';
      this.showModal = false;
    },
    viewUserDetails(user) {
      this.selectedUser = user;
      this.userDetails = { ...user }; // Clone user details
      delete this.userDetails.password;
      delete this.userDetails.id;
      delete this.userDetails.createdAt;
      delete this.userDetails.updatedAt; // Remove the password field
      this.showUserInfoModal = true;
    },
    formatKey(key) {
      return key
        .replace(/([A-Z])/g, ' $1') // Add a space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
    },
    closeModal() {
      this.selectedUser = null;
      this.userDetails = {};
      this.showUserInfoModal = false;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#content {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1,
h2 {
  color: #333333;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.subTitle {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  height: 50px;
  font-size: 15px;
}

.admin {
  border-bottom: 1px solid #ffcccb;
  background-color: #ffe6e6;
}

.coach {
  border-bottom: 1px solid #cce5ff;
  background-color: #e6f0ff;
}

.member {
  border-bottom: 1px solid #d4edda;
  background-color: #e6ffed;
}

.divSelect {
  text-align: right;
  display: flex;
  gap: 10px;
}

select {
  border-radius: 4px;
  padding: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  height: 35px;
  width: 90px;
  font-size: 15px;
}

.infoButton {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #007bff;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  height: 35px;
  width: 60px;
  font-size: 15px;
}

.infoButton:hover {
  background-color: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  margin: auto;
}

.modal h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

.modal p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

.modal button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.modal button:first-of-type {
  background-color: #f44336;
  color: white;
}

.modal button:last-of-type {
  background-color: #4caf50;
  color: white;
}
</style>
