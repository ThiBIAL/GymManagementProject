<template>
  <div id="content">
    <h1>Account</h1>
    <div v-if="isEditing">
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username" disabled />

      <label for="lastName">Last Name:</label>
      <input type="text" v-model="lastName" id="lastName" disabled />

      <label for="firstName">First Name:</label>
      <input type="text" v-model="firstName" id="firstName" disabled/>

      <label for="email">Email:</label>
      <input type="email" v-model="email" id="email" />

      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" />

      <label for="numberTel">Phone Number:</label>
      <input type="text" v-model="numberTel" id="numberTel" />

      <label for="address">Address:</label>
      <input type="text" v-model="address" id="address" />

      
      <div id="subscription">
        <label for="subscription">Subscription:</label>
        {{ subscription }}
      </div>


      <button @click="saveProfile">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
    <div id="info" v-else>
      <p><strong>Username:</strong> {{ username }}</p>
      <p><strong>Last Name:</strong> {{ lastName }}</p>
      <p><strong>First Name:</strong> {{ firstName }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Password:</strong> {{ password }}</p>
      <p><strong>Phone Number:</strong> {{ numberTel }}</p>
      <p><strong>Address:</strong> {{ address }}</p>
      <p><strong>Subscription:</strong> {{ subscription }}</p>
      <button id="edit" @click="editProfile">Edit Profile</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      lastName: '',
      firstName: '',
      password: '',
      email: '',
      numberTel: '',
      address: '',
      subscription: '',
      isEditing: false
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.username = user.username || '';
      this.password = user.password || '';
      this.lastName = user.lastName || '';
      this.firstName = user.firstName || '';
      this.email = user.email || '';
      this.numberTel = user.numberTel || '';
      this.address = user.address || '';
      this.subscription = user.subscription || '';
    }
  },
  methods: {
    saveProfile() {
      const updatedUser = {
        username: this.username,
        lastName: this.lastName,
        firstName: this.firstName,
        password: this.password,
        email: this.email,
        numberTel: this.numberTel,
        address: this.address,
        subscription: this.subscription
      };

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const index = users.findIndex((u) => u.username === this.username);

      if (index !== -1) {
        users[index] = updatedUser;
      } else {
        users.push(updatedUser);
      }

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Update the current user in localStorage
      console.log('Updated Users:', users);

      this.isEditing = false;
    },
    editProfile() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    }
  }
};
</script>


  
<style scoped>
#content {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

#info{
  text-align: center;
  padding: 20px;
  width: 40%;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

div p {
  font-size: 18px;
  margin-bottom: 5px;
}

h1 {
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

#edit{
  border: none;
  border-radius: 3px;
  margin: 0;
  cursor: pointer;
  font-size: 16px;
  color: #FFFFFF;
  background-color: #FFA500;
  transition: background-color 0.3s ease;
}

button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:first-of-type {
  background-color: #4CAF50;
  color: white;
}

button:last-of-type {
  background-color: #f44336;
  color: white;
}

#subscription {
  margin-bottom: 10px;
  white-space: nowrap;
}

</style>