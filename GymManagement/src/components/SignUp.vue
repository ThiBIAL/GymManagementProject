<template>
  <div id="content">
    <h1>Sign Up</h1>
    <form @submit.prevent="signup">
      <InputField v-model="username" placeholder="Username" required />
      <div v-if="error1" class="error">{{ error1 }}</div>
      
      <InputField v-model="firstName" placeholder="First Name" required />
      <div v-if="error2" class="error">{{ error2 }}</div>
      
      <InputField v-model="lastName" placeholder="Last Name" required />
      <div v-if="error3" class="error">{{ error3 }}</div>
      
      <InputField v-model="email" type="email" placeholder="Email" required />
      <div v-if="error4" class="error">{{ error4 }}</div>
      
      <InputField v-model="phoneNumber" type="text" placeholder="Phone Number" required />
      <div v-if="error5" class="error">{{ error5 }}</div>
      
      <InputField type="password" v-model="password" placeholder="Password" required />
      <div v-if="error6" class="error">{{ error6 }}</div>
      
      <InputField type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
      <div v-if="error7" class="error">{{ error7 }}</div>
      
      <button class="button" type="submit">Sign Up</button>
    </form>
    <div id="hr">
      <div class="line-text">Or sign up with</div>
    </div>
    <div id="img">
      <img src="../assets/alipay.png" alt="Alypay" width="50px" height="50px">
      <img src="../assets/wechat.png" alt="Wechat" width="52px" height="52px">
    </div>
    <p>Already have an account? <router-link id="signin" to="/SignIn">Sign In</router-link></p>
  </div>
</template>

<script>
import InputField from './InputField.vue';
import axios from '../config/axiosInstance';

export default {
  components: { InputField },
  data() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      error1: null,
      error2: null,
      error3: null,
      error4: null,
      error5: null,
      error6: null,
      error7: null,
    };
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        this.error7 = '*Both passwords must be the same';
        return;
      }

      const role = this.username === 'root' ? 'admin' : 'member';

      const requestData = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        role,
      };

      try {
        const response = await axios.post('/auth/register', requestData);
        console.log('Registration response:', response);

        // Login automatically after registration
        const loginResponse = await axios.post('/auth/login', {
          username: this.username,
          password: this.password,
        });

        console.log('Login response:', loginResponse);

        // Store the token
        localStorage.setItem('token', loginResponse.data.token);

        // Emit the event to inform the parent that the user is logged in
        this.$emit('userLoggedIn', true);

        // Redirect to the Home page
        this.$router.push('/Home');
      } catch (error) {
        console.error('Error during signup or login:', error.response?.data || error.message);
        if (error.response && error.response.status === 409) {
          if (error.response.data.field === 'username') {
            this.error1 = '*Username already taken';
          } else if (error.response.data.field === 'email') {
            this.error4 = '*Email already taken';
          }
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    }
  },
  mounted() {
    this.$watch('username', () => {
      this.error1 = null;
    });
    this.$watch('email', () => {
      this.error4 = null;
    });
    this.$watch('phoneNumber', () => {
      this.error5 = null;
    });
    this.$watch('password', () => {
      if (this.password === this.confirmPassword) {
        this.error7 = null;
      }
    });
    this.$watch('confirmPassword', () => {
      if (this.password === this.confirmPassword) {
        this.error7 = null;
      }
    });
  },
};
</script>

<style scoped>
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

    form{
      width: 75%;
      margin: 0 auto;
      text-align: left;
    }

    .button {
      border: none;
      border-radius: 3px;
      cursor: pointer;
      width: 100%;
      height: 40px;
      cursor: pointer;
      font-size: 16px;
      color: #FFFFFF;
      background-color: #FFA500;
      transition: background-color 0.3s ease;
    }

    .button:hover {
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

    .error{
        color: red;
        font-size: 12px;
        margin-bottom: 10px;
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
