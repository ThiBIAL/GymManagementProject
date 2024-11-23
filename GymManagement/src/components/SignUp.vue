<template>
    <div id="content">
        <h1>Sign Up</h1>
        <form @submit.prevent="signup">
            <InputField v-model="username" placeholder="Username" required/>
            <div v-if="error1" class="error">{{ error1 }}</div>
            <InputField type="password" v-model="password" placeholder="Password" required />
            <div v-if="error2" class="error">{{ error2 }}</div>
            <InputField type="password" v-model="confirmPassword" placeholder="Confirm password" required />
            <div v-if="error2" class="error">{{ error2 }}</div>
            <button type="submit">Sign Up</button>
        </form>
        <div v-if="error" class="error">{{ error }}</div>
        <div id="hr">
            <div class="line-text">Or sign up with</div>
        </div>
        <div id="img">
            <img src="../assets/alipay.png" alt="Alypay" width="50px" height="50px">
            <img src="../assets/wechat.png" alt="Wechat" width="52px" height="52px">
        </div>
        <p>Already have an account ? <router-link id="signin" to="/SignIn">Sign In</router-link></p>
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
      confirmPassword: '',
      error: null,
    };
  },
  methods: {
    signup() {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = storedUsers.some(user => user.username === this.username);

      if (userExists) {
        this.error1 = 'Username already taken';
      } else if (this.password !== this.confirmPassword) {
        this.error2 = 'Both passwords must be the same';
      } else {
        const newUser = { username: this.username, password: this.password };
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('isLoggedIn', true);
        this.$router.push('/');
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


    p, #signin{
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