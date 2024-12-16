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
          <input
            type="text"
            id="type"
            v-model="foodMonitoring.type"
            placeholder="Enter Food Type"
            required
          />
        </div>

        <div class="form-group">
          <label for="duration">Duration</label>
          <input
            type="text"
            id="duration"
            v-model="foodMonitoring.duration"
            placeholder="Enter Duration (e.g., 1 week)"
            required
          />
        </div>

        <div class="form-group">
          <label for="allergy">Allergy</label>
          <input
            type="text"
            id="allergy"
            v-model="foodMonitoring.allergy"
            placeholder="Specify Allergy (optional)"
          />
        </div>

        <div class="button-group">
          <button type="submit" class="submit-btn">Submit</button>
          <button type="button" class="cancel-btn" @click="cancelForm">Cancel</button>
        </div>
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
    // Fetch the list of members
    async fetchMembers() {
      try {
        const response = await axios.get('/members');
        this.members = response.data;
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    },

    // Select a member
    selectMember(member) {
      this.selectedMember = member;
    },

    // Submit food monitoring form
    async submitFoodMonitoring() {
      try {
        const response = await axios.post('/food-monitoring/add', {
          username: this.selectedMember.username, // Sending username instead of ID
          ...this.foodMonitoring,
        });
        alert('Food Monitoring added successfully!');
        this.resetForm();
      } catch (error) {
        console.error('Error adding food monitoring:', error);
        alert('Failed to add food monitoring. Please try again.');
      }
    },

    // Reset and cancel form
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
/* Main container */
.add-food-monitoring {
  padding: 30px;
  max-width: 800px;
  margin: 30px auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Member List Section */
.member-list h2 {
  color: #555;
  margin-bottom: 15px;
}

.member-list ul {
  padding: 0;
  list-style: none;
}

.member-list li {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.member-list button {
  background-color: #ffa500;;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.member-list button:hover {
  background-color: #e69500;;
}

/* Form Section */
.food-monitoring-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.food-monitoring-form h2 {
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #555;
  margin-bottom: 8px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.submit-btn {
  background-color: #ffa500;;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.submit-btn:hover {
  background-color: #e69500;;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.cancel-btn:hover {
  background-color: #e53935;
}

@media (min-width: 600px) {
  .button-group {
    justify-content: flex-start;
  }

  .submit-btn,
  .cancel-btn {
    width: auto;
    margin-top: 0;
  }
}
</style>
