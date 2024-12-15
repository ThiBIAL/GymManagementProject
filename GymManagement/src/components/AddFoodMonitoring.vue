<template>
    <div class="add-food-monitoring">
      <h1>Food Monitoring Management</h1>
  
      <!-- Section: Member List -->
      <div class="member-list">
        <h2>Members</h2>
        <ul>
          <li v-for="member in members" :key="member.id">
            <span>{{ member.username }}</span>
            <button @click="selectMember(member)">Add</button>
          </li>
        </ul>
      </div>
  
      <!-- Section: Add Food Monitoring Form -->
      <div v-if="selectedMember" class="food-monitoring-form">
        <h2>Add Food Monitoring for {{ selectedMember.username }}</h2>
        <form @submit.prevent="submitFoodMonitoring">
          <div class="form-group">
            <label for="type">Type</label>
            <input type="text" id="type" v-model="foodMonitoring.type" required />
          </div>
  
          <div class="form-group">
            <label for="duration">Duration</label>
            <input type="text" id="duration" v-model="foodMonitoring.duration" required />
          </div>
  
          <div class="form-group">
            <label for="allergy">Allergy</label>
            <input type="text" id="allergy" v-model="foodMonitoring.allergy" />
          </div>
  
          <button type="submit">Submit</button>
          <button type="button" @click="cancelForm">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../config/axiosInstance';
  
  export default {
    data() {
      return {
        members: [], // List of members
        selectedMember: null, // The member selected for food monitoring
        foodMonitoring: {
          type: '',
          duration: '',
          allergy: '',
        },
      };
    },
    created() {
      this.fetchMembers();
    },
    methods: {
      // Fetch the list of members from the database
      async fetchMembers() {
        try {
          const response = await axios.get('/members');
          this.members = response.data;
        } catch (error) {
          console.error('Error fetching members:', error);
        }
      },
  
      // Select a member to add food monitoring
      selectMember(member) {
        this.selectedMember = member;
      },
  
      // Submit the food monitoring program
      async submitFoodMonitoring() {
        try {
          // Send the selected member's username instead of memberId
          const response = await axios.post('/food-monitoring/add', {
            username: this.selectedMember.username,  // Use 'username' instead of 'memberId'
            ...this.foodMonitoring,
          });
          alert('Food Monitoring added successfully!');
  
          // Reset the form and selected member
          this.resetForm();
        } catch (error) {
          console.error('Error adding food monitoring:', error);
          alert('Failed to add food monitoring. Please try again.');
        }
      },
  
      // Reset the form and cancel the operation
      cancelForm() {
        this.resetForm();
      },
  
      resetForm() {
        this.selectedMember = null;
        this.foodMonitoring = {
          type: '',
          duration: '',
          allergy: '',
        };
      },
    },
  };
  </script>
  
  
  <style scoped>
.add-food-monitoring {
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 30px auto;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

.member-list {
  margin-bottom: 30px;
}

.member-list h2 {
  color: #555;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.member-list ul {
  list-style-type: none;
  padding: 0;
}

.member-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.member-list li:hover {
  background-color: #f0f0f0;
}

.member-list button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.member-list button:hover {
  background-color: #45a049;
}

.food-monitoring-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.food-monitoring-form h2 {
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #4CAF50;
  outline: none;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

button[type="button"]:hover {
  background-color: #e53935;
}

@media (min-width: 600px) {
  .food-monitoring-form {
    width: 80%;
    margin: 0 auto;
  }

  button[type="submit"], button[type="button"] {
    width: auto;
    margin-top: 20px;
  }
}
</style>

  