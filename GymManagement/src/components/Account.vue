<template>
    <div>
      <h1>Account</h1>
      <div id="block">
        <h3 id="profil">Profile</h3>
  
        <div v-if="isEditing">
          <label>
            Username:
            <input type="text" v-model="editedUser.username" />
          </label>
          <label>
            Password:
            <input type="password" v-model="editedUser.password" />
          </label>
          <label>
            Email:
            <input type="email" v-model="editedUser.email" />
          </label>
          <label>
            Telephone Number:
            <input type="text" v-model="editedUser.numberTel" />
          </label>
          <label>
            Address: 
            <input type="text" v-model="editedUser.address" />
          </label>
          <button class="buttonAccount" @click="saveProfile">Confirm</button>
        </div>
  
        <div v-else>
          <p>Username: {{ username }}</p>
          <p>Password: {{ password }}</p>
          <p>Email: {{ email }}</p>
          <p>Telephone Number: {{ numberTel }}</p>
          <p>Address: {{ address }}</p>
          <button class="buttonAccount" @click="editProfile">Modify Profile</button>
        </div>
      </div>
  
      <button class="buttonAccount">
        Choose a Subscription
      </button>
    </div>
  </template>
  

  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        email: '',
        numberTel: '',
        address: '',
        isEditing: false, // Pour basculer entre mode édition et affichage
        editedUser: {
          username: '',
          password: '',
          email: '',
          numberTel: '',
          address: '',
        },
      };
    },
    mounted() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.username = user.username;
        this.password = user.password;
        this.email = user.email || ''; // Préserve les valeurs vides
        this.numberTel = user.numberTel || '';
        this.address = user.address || '';
      }
    },
    methods: {
      editProfile() {
        // Active le mode édition et copie les données actuelles dans `editedUser`
        this.isEditing = true;
        this.editedUser = {
          username: this.username,
          password: this.password,
          email: this.email,
          numberTel: this.numberTel,
          address: this.address,
        };
      },
      saveProfile() {
        // Met à jour les données utilisateur
        this.username = this.editedUser.username;
        this.password = this.editedUser.password;
        this.email = this.editedUser.email;
        this.numberTel = this.editedUser.numberTel;
        this.address = this.editedUser.address;
  
        // Sauvegarde dans localStorage
        const updatedUser = {
          username: this.username,
          password: this.password,
          email: this.email,
          numberTel: this.numberTel,
          address: this.address,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        // Désactive le mode édition
        this.isEditing = false;
      },
    },
  };
  </script>
  

<style scoped>
    h1{
        text-align: center;
    }

    #block{
        border:2px black solid;
        border-radius: 3px;
        width: 500px;
        margin: 20px;
        padding: 20px;
    }

    p{
        color: black;
    }

    #profil{
        text-align: center;
    }

    label {
    display: block;
    margin: 10px 0;
    font-weight: bold;
    }

    input {
    display: block;
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    }

    .buttonAccount{
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #FFA500;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    }

    .buttonAccount:hover {
    background-color: #FF8C00;
    }
</style>