<template>
    <div class="subscription-management">
      <h1>Subscription Management</h1>
  
      <!-- Form to Create/Update Subscription -->
      <div class="subscription-form">
        <h2>{{ isEditing ? 'Update Subscription' : 'Create Subscription' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
  
          <div class="form-group">
            <label for="description">Description</label>
            <input type="text" id="description" v-model="form.description" required />
          </div>
  
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" id="price" v-model="form.price" required />
          </div>
  
          <button type="submit">{{ isEditing ? 'Update' : 'Create' }}</button>
          <button type="button" @click="resetForm">Cancel</button>
        </form>
      </div>
  
      <!-- List of Subscriptions -->
      <div class="subscription-list">
        <h2>Subscriptions</h2>
        <ul>
          <li v-for="subscription in subscriptions" :key="subscription.id">
            <div>
              <strong>{{ subscription.name }}</strong> - {{ subscription.description }} (${{ subscription.price }})
            </div>
            <div>
              <button @click="editSubscription(subscription)">Edit</button>
              <button @click="deleteSubscription(subscription.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../config/axiosInstance'; // Import axios instance with your baseURL
  
  export default {
    data() {
      return {
        subscriptions: [], // List of subscriptions
        form: {
          id: null,
          name: '',
          description: '',
          price: '',
        },
        isEditing: false, // Flag for edit mode
      };
    },
    created() {
      this.fetchSubscriptions();
    },
    methods: {
      // Fetch all subscription types
      async fetchSubscriptions() {
        try {
          const response = await axios.get('/subscription-types');
          this.subscriptions = response.data;
        } catch (error) {
          console.error('Error fetching subscriptions:', error);
        }
      },
  
      // Create or Update a subscription type
      async handleSubmit() {
        try {
          if (this.isEditing) {
            // Update
            await axios.put(`/subscription-types/${this.form.id}`, {
              name: this.form.name,
              description: this.form.description,
              price: this.form.price,
            });
            alert('Subscription updated successfully!');
          } else {
            // Create
            await axios.post('/subscription-types', {
              name: this.form.name,
              description: this.form.description,
              price: this.form.price,
            });
            alert('Subscription created successfully!');
          }
  
          // Reset form and refresh list
          this.resetForm();
          this.fetchSubscriptions();
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      },
  
      // Edit a subscription
      editSubscription(subscription) {
        this.isEditing = true;
        this.form = { ...subscription };
      },
  
      // Delete a subscription
      async deleteSubscription(id) {
        if (confirm('Are you sure you want to delete this subscription?')) {
          try {
            await axios.delete(`/subscription-types/${id}`);
            alert('Subscription deleted successfully!');
            this.fetchSubscriptions();
          } catch (error) {
            console.error('Error deleting subscription:', error);
          }
        }
      },
  
      // Reset form
      resetForm() {
        this.isEditing = false;
        this.form = {
          id: null,
          name: '',
          description: '',
          price: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .subscription-management {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1,
  h2 {
    text-align: center;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    margin-right: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type='submit'] {
    background-color: #ffa500;
    color: white;
  }
  
  button[type='button'] {
    background-color: #f44336;
    color: white;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  .subscription-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .subscription-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  </style>
  