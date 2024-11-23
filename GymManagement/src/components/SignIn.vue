<template>
    <div id="content">
      <h1>Sign In</h1>
      <form @submit.prevent="login">
        <InputField v-model="username" placeholder="Username" required/>
        <InputField type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
      <div id="hr">
        <div class="line-text">Or sign in with</div>
      </div>
      <div id="img">
        <img src="../assets/alipay.png" alt="Alypay" width="50px" height="50px">
        <img src="../assets/wechat.png" alt="Wechat" width="52px" height="52px">
      </div>
      <p>Don't have an account ? <router-link id="signup" to="/SignUp">Sign Up</router-link></p>
    </div>
</template>
 
<script>
import InputField from './InputField.vue';

  export default {
    components: { InputField },
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

<style>
    *{
        box-sizing: border-box;
    }

    h1 {
    color: #333333;
    font-weight: bold;
    margin-bottom: 20px;
    }


    #content{
        width: 50%;
        text-align: center;
        margin: 0 auto;
        padding-top: 20px;
        padding-bottom: 20px;
        background-color: rgb(236, 234, 234);
        border: solid 1px rgb(217, 217, 217);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    }

    button {
    border: none;
    border-radius: 3px;
    cursor: pointer;
    width: 75%;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    color: #FFFFFF;
    background-color: #FFA500;
    transition: background-color 0.3s ease;
    }

    button:hover {
    background-color: #FF8C00;
    }

    #img {
        display: flex;
        justify-content: center;
        gap: 10px; /* Ajuste la valeur selon le besoin */
    }


    p, #signup{
        color: #a1a0a0;
        font-size: 14px;
        padding: 0px;
        margin-top: 5px;
    }

    #hr {
    text-align: center;
    position: relative;
    margin: 20px 0;
    }

    .line-text {
    display: inline-block;
    position: relative;
    color: #a1a0a0;
    background-color: rgb(236, 234, 234);
    padding: 0 10px;
    z-index: 1;
    }

    #hr::before,
    #hr::after {
    content: "";
    position: absolute;
    top: 50%;
    height: 1px;
    background-color: #a1a0a0;
    transform: translateY(-50%);
    width: 45%;
    }

    #hr::before {
    left: 12%;
    }

    #hr::after {
    right: 12%;
    }
</style>