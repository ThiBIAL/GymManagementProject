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

  <!-- Modal for Student Subscription -->
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <h2>Student Subscription Requirements</h2>
      <p>Please bring a certificate of enrollment to the fitness hall for identity verification.</p>
      <label>
        <input type="checkbox" v-model="isChecked" /> I agree to this rule.
      </label>
      <div class="modal-buttons">
        <button @click="confirmSubscription" :disabled="!isChecked">Confirm</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Modal for Payment Information -->
  <div v-if="showPaymentModal" class="modal">
    <div class="modal-content">
      <h2>Enter Payment Information</h2>
      <form @submit.prevent="processPayment">
        <div>
          <label>Card Number</label>
          <input v-model="cardNumber" type="text" placeholder="Card Number" required />
        </div>
        <div>
          <label>Expiration Date</label>
          <input v-model="expiryDate" type="text" placeholder="MM/YY" required />
        </div>
        <div>
          <label>CVC</label>
          <input v-model="cvc" type="text" placeholder="CVC" required />
        </div>
        <div class="modal-buttons">
          <button type="submit" :disabled="!isPaymentValid">Confirm Payment</button><br><br>
          <button @click="closePaymentModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>


  
<script>
export default {
  data() {
    return {
      subscription: '',
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
      showModal: false,
      isChecked: false,
      showPaymentModal: false,
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    };
  },
  computed: {
    isPaymentValid() {
      // Basic validation to check if card details are valid
      return (
        this.cardNumber.length === 16 &&
        /^[0-9]{2}\/[0-9]{2}$/.test(this.expiryDate) &&
        /^[0-9]{3}$/.test(this.cvc)
      );
    },
  },
  methods: {
    selectSubscription(option) {
      if (option.name === 'Student Subscription') {
        this.showModal = true; // Show the modal for the student subscription
      } else {
        this.showPaymentModal = true; // Show payment modal for other subscriptions
        this.saveSubscription(option); // Save subscription directly
      }
    },
    confirmSubscription() {
      this.showPaymentModal = true; // After agreeing, show the payment modal for students
      this.saveSubscription(this.subscriptions.find(sub => sub.name === 'Student Subscription'));
      this.closeModal(); // Close the modal after confirmation
    },
    saveSubscription(option) {
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
    processPayment() {
      // Here, you can integrate the payment API. For now, just saving the info.
      if (this.isPaymentValid) {
        alert('Payment processed successfully!');
        this.closePaymentModal();
      } else {
        alert('Invalid payment details. Please check your information.');
      }
    },
    closeModal() {
      this.showModal = false; // Close the student subscription modal
      this.isChecked = false; // Reset checkbox state
    },
    closePaymentModal() {
      this.showPaymentModal = false; // Close the payment modal
      this.cardNumber = ''; // Clear payment fields
      this.expiryDate = '';
      this.cvc = '';
    },
  },
};
</script>


  
<style scoped>
.subscription-page {
      width: 70%;
      text-align: center;
      margin: 0 auto;
      padding-top: 20px;
      padding-bottom: 20px;
      background-color: rgb(236, 234, 234);
      border: solid 1px rgb(217, 217, 217);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.subscription-page h1 {
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
}

/* Subscription Options Layout */
.subscription-options {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px 0;
}

/* Individual Subscription Cards */
.subscription-card {
  background-color: white;
  width: 250px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 30px;
  transition: transform 0.3s ease;
}

.subscription-card:hover {
  transform: scale(1.05);
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

/* Button Styles */
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

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.modal p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}

.modal-buttons {
  margin-top: 20px;
}

.modal-buttons button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
}

.modal-buttons button:disabled {
  background-color: #ccc;
}

.modal-buttons button:hover:not(:disabled) {
  background-color: #ffa500;
}

/* Payment Form Styles */
form div {
  margin-bottom: 25px; /* Augmenter l'espacement entre les champs */
}

form label {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #333;
}

form input {
  width: 100%;
  padding: 14px 20px; /* Augmenter le padding pour plus d'espace */
  margin-top: 8px;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 12px; /* Rendre les bords plus arrondis */
  background-color: #f9f9f9; /* Fond léger pour un contraste doux */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Ajouter une ombre douce pour donner de la profondeur */
  transition: all 0.3s ease; /* Ajouter une transition douce lors du focus */
}

form input:focus {
  border-color: #ffa500; /* Changer la couleur du bord au focus */
  background-color: #fff; /* Passer le fond en blanc pour le focus */
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.5); /* Ajouter une ombre autour du champ */
}

form button {
  width: 100%;
  padding: 14px;
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 12px; /* Rendre les bords du bouton arrondis */
  font-size: 1.2rem;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease; /* Ajouter un effet de transition */
}

form button:disabled {
  background-color: #ccc;
}

form button:hover:not(:disabled) {
  background-color: #ff8c00;
  transform: scale(1.05); /* Légère augmentation de la taille du bouton au survol */
}

form .input-group {
  display: flex;
  gap: 15px; /* Espacement entre les champs pour le numéro de carte et la date */
}

form .input-group input {
  flex: 1; /* Les champs s'étendront pour remplir l'espace */
}

form .input-group input:first-child {
  margin-right: 15px; /* Ajouter un peu d'espace entre le numéro de carte et la date */
}
</style>



  