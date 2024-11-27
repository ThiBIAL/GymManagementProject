<template>
    <div class="subscription-page">
      <h1>Choose Your Subscription</h1>
      <div class="subscription-options">
        <div class="subscription-card" v-for="option in subscriptions" :key="option.id">
          <h2>{{ option.name }}</h2>
          <p>{{ option.description }}</p>
          <p class="price">{{ option.price }}</p>
          <button class="select-button" @click="selectSubscription(option)">Select</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        subscription:'',
        subscriptions: [
          {
            id: 1,
            name: 'Normal Subscription',
            description: 'Access to 1 fitness hall. Choose the one nearest you.',
            price: '$20 / month ',
          },
          {
            id: 2,
            name: 'Premium Subscription',
            description: 'Access to all fitness halls. No need to call us.',
            price: '$30 / month',
          },
          {
            id: 3,
            name: 'Student Subscription',
            description: 'Access to 1 fitness hall for students',
            price: '$15 / month',
          },
          {
            id: 4,
            name: 'Family Subscription',
            description: 'Access to 1 fitness hall for 3 members. All 3 members need to complete their profile.',
            price: '$40 / month',
          },
        ],
      };
    },
    methods: {
    selectSubscription(option) {
      const user = JSON.parse(localStorage.getItem('user')); 
      if (user) {
        user.subscription = option.name; 
        localStorage.setItem('user', JSON.stringify(user)); 
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const index = users.findIndex((u) => u.username === user.username);
      if (index !== -1) {
        users[index] = user; 
        localStorage.setItem('users', JSON.stringify(users)); 
      }

    },
  },
};
  </script>
  
  <style>
  .subscription-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f7f7f7;
    margin-top: 50px;
  }
  
  .subscription-page h1 {
    margin-bottom: 30px;
    font-size: 2rem;
    color: #333;
  }
  
  .subscription-options {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 50px;
    
  }
  
  .subscription-card {
    background-color: white;
    width: 250px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .subscription-card h2 {
    font-size: 1.5rem;
    color: #222;
    margin-bottom: 10px;
  }
  
  .subscription-card p {
    font-size: 1rem;
    color: #555;
    margin: 10px 0;
  }
  
  .subscription-card .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ff6b00;
  }
  
  .select-button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #ffa500;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .select-button:hover {
    background-color: #ff8c00;
  }
  </style>
  