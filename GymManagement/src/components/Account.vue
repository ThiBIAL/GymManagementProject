<template>
  <div>
    <h1>Account</h1>
    <div id="block">
      <h3 id="profil">Profile</h3>

      <div v-if="isEditing">
        <label>
          Username: {{ username }}
        </label>
        <label>
          Password:
          <input type="password" v-model="password" />
        </label>
        <label>
          Email:
          <input type="email" v-model="email" />
        </label>
        <label>
          Telephone Number:
          <input type="text" v-model="numberTel" />
        </label>
        <label>
          Address:
          <input type="text" v-model="address" />
        </label>
        <button class="buttonAccount" @click="saveProfile">Confirm</button>
      </div>

      <div v-else id="block2">
        <p>Username: {{ username }}</p>
        <p>Password: {{ password }}</p>
        <p>Email: {{ email }}</p>
        <p>Telephone Number: {{ numberTel }}</p>
        <p>Address: {{ address }}</p>
        <button class="buttonAccount" @click="editProfile">Modify Profile</button>
      </div>
    </div>

    <button class="buttonAccount" @click="logOut">
      Log Out
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
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Loaded User:', user); 
    if (user) {
      this.username = user.username || '';
      this.password = user.password || '';
      this.email = user.email || '';
      this.numberTel = user.numberTel || '';
      this.address = user.address || '';
    }
  },
  methods: {
    saveProfile() {
      // Mise à jour des informations de l'utilisateur
      const updatedUser = {
        username: this.username || '',
        password: this.password || '',
        email: this.email || '',
        numberTel: this.numberTel || '',
        address: this.address || '',
      };


      const users = JSON.parse(localStorage.getItem('users')) || [];
      const index = users.findIndex((u) => u.username === this.username);

      if (index !== -1) {
        // Mise à jour si l'utilisateur existe
        users[index] = updatedUser;
      } else {
        // Ajouter l'utilisateur si absent
        users.push(updatedUser);
      }

      localStorage.setItem('users', JSON.stringify(users));
      console.log('Updated Users:', users); // Debug pour vérifier la liste mise à jour

      this.isEditing = false;
    },
    editProfile() {
      this.isEditing = true;
    },
  },
};

</script>


  

<style >
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