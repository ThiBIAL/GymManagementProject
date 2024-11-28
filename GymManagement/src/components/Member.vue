<template>
  <div id="content">
    <h1>Manage Member</h1>
    <div class="user" v-if="admins.length">
      <h2 class="subTitle">Admins:</h2>
      <ul>
        <li v-for="user in admins" :key="user.username" class="admin">
          {{ user.username }}
          <div class="divSelect">
            <select :value="user.state" @change="(event) => updateUserRole(user, event)">
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
        <li v-for="user in coaches" :key="user.username" class="coach">
          {{ user.username }}
          <div class="divSelect">
            <select :value="user.state" @change="(event) => updateUserRole(user, event)">
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
        <li v-for="user in members" :key="user.username" class="member">
          {{ user.username }}
          <div class="divSelect">
            <select :value="user.state" @change="(event) => updateUserRole(user, event)">
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
        <h2>Confirmer le changement</h2>
        <p>
          Voulez-vous vraiment changer le rôle de <strong>{{ selectedUser?.username }}</strong> en
          <strong>{{ tempRole }}</strong> ?
        </p>
        <button @click="confirmChange">Confirmer</button>
        <button @click="cancelChange">Annuler</button>
      </div>
    </div>
    <div v-if="showUserInfoModal" class="modal-overlay">
      <div class="modal">
        <h2>Informations sur l'utilisateur</h2>
        <p><strong>Nom d'utilisateur :</strong> {{ selectedUser?.username }}</p>
        <p><strong>Email :</strong> {{ selectedUser?.email }}</p>
        <p><strong>Rôle actuel :</strong> {{ selectedUser?.state }}</p>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';

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
      tempRole: ''
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      this.users = storedUsers;
      this.sortUsers();
    },
    sortUsers() {
      this.admins = this.users.filter(user => user.state === 'admin');
      this.coaches = this.users.filter(user => user.state === 'coach');
      this.members = this.users.filter(user => user.state === 'member');
    },
    updateUserRole(user, event) {
      this.selectedUser = user;
      this.tempRole = event.target.value;
      this.showModal = true;
    },
    confirmChange() {
      if (this.selectedUser) {
        const userIndex = this.users.findIndex(user => user.username === this.selectedUser.username);
        if (userIndex !== -1) {
          this.users[userIndex].state = this.tempRole;
          localStorage.setItem('users', JSON.stringify(this.users));
          this.sortUsers();

          const currentUser = JSON.parse(localStorage.getItem('user'));
          if (currentUser.username === this.selectedUser.username) {
            currentUser.state = this.tempRole;
            localStorage.setItem('user', JSON.stringify(currentUser));

            if (currentUser.state !== 'admin') {
              nextTick(() => {
                this.$router.push('/Home');
              });
            }
          }
        }
      }
      this.showModal = false;
    },
    cancelChange() {
      this.selectedUser = null;
      this.tempRole = '';
      this.showModal = false;
    },
    viewUserDetails(user) {
      this.selectedUser = user;
      this.showUserInfoModal = true;
    },
    closeModal() {
      this.selectedUser = null;
      this.showUserInfoModal = false;
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#content {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
}

.infoButton {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #007bff;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
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
}

.modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 40%;
  text-align: center;
}

.modal h2 {
  margin-bottom: 20px;
}

.modal p {
  margin-bottom: 20px;
}

.modal button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:first-of-type {
  background-color: #4caf50;
  color: white;
}

.modal button:last-of-type {
  background-color: #f44336;
  color: white;
}
</style>
