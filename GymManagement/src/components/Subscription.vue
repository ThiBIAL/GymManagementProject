<template>
  <div class="subscription-page">
    <h1>Choose Your Subscription</h1>
    <div class="subscription-options">
      <div class="subscription-card" v-for="option in subscriptions" :key="option.id">
        <h2>{{ option.name }}</h2>
        <p>{{ option.description }}</p>
        <p class="price">${{ option.price }}</p>
        <button class="select-button" @click="selectSubscription(option)">Select</button>
      </div>
    </div>

    <!-- Modal for Payment Options -->
    <div v-if="showPaymentModal" class="modal">
      <div class="modal-content">
        <h2>Choose Payment Method</h2>
        <div class="payment-options">
          <button @click="payWithCash" class="payment-button cash">
            💵 Pay with Cash
          </button>
          <button @click="payWithCard" class="payment-button card">
            💳 Pay with Card
          </button>
          <button @click="payWithBankTransfer" class="payment-button transfer">
            🏦 Bank Transfer
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for Card Payment -->
    <div v-if="showCardPaymentModal" class="modal">
      <div class="modal-content">
        <h2>Enter Payment Information</h2>
        <form @submit.prevent="processCardPayment">
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
            <button type="submit" :disabled="!isPaymentValid">Confirm Payment</button>
            <button @click="closeCardPaymentModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal for Bank Transfer -->
    <div v-if="showBankTransferModal" class="modal">
      <div class="modal-content">
        <h2>Bank Transfer Details</h2>
        <p>Please transfer the subscription fee to the following account:</p>
        <p><strong>Account Name:</strong> FitnessGym</p>
        <p><strong>IBAN:</strong> FR76 1234 5678 9012 3456 7890 123</p>
        <p><strong>BIC:</strong> ABCD1234</p>
        <div class="modal-buttons">
          <button @click="confirmBankTransfer">OK</button>
        </div>
      </div>
    </div>

    <!-- Modal for Cash Payment -->
    <div v-if="showCashPaymentModal" class="modal">
      <div class="modal-content">
        <h2>Pay with Cash</h2>
        <p>Subscription confirmed successfully!</p>
        <div class="modal-buttons">
          <button @click="confirmCashPayment">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axiosInstance';

export default {
  data() {
    return {
      subscriptions: [],
      showPaymentModal: false,
      showCardPaymentModal: false,
      showBankTransferModal: false,
      showCashPaymentModal: false,
      selectedSubscription: null,
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    };
  },
  computed: {
    isPaymentValid() {
      return (
        this.cardNumber.length === 16 &&
        /^[0-9]{2}\/\d{2}$/.test(this.expiryDate) &&
        /^[0-9]{3}$/.test(this.cvc)
      );
    },
  },
  mounted() {
    this.fetchSubscriptions();
  },
  methods: {
    async fetchSubscriptions() {
      try {
        const response = await axios.get('/subscription-types');
        this.subscriptions = response.data;
      } catch (error) {
        console.error('Error fetching subscriptions:', error.response || error.message);
        alert('An error occurred while fetching subscriptions.');
      }
    },
    selectSubscription(option) {
      this.selectedSubscription = option;
      this.showPaymentModal = true;
    },
    payWithCash() {
      this.showPaymentModal = false;
      this.showCashPaymentModal = true;
    },
    async confirmCashPayment() {
      try {
        await this.finalizeSubscription();
        alert('Subscription confirmed successfully!');
        this.showCashPaymentModal = false;
      } catch (error) {
        console.error('Error confirming subscription:', error.response || error.message);
        alert('An error occurred while confirming the subscription.');
      }
    },
    payWithCard() {
      this.showPaymentModal = false;
      this.showCardPaymentModal = true;
    },
    async processCardPayment() {
      try {
        await this.finalizeSubscription();
        alert('Subscription confirmed successfully!');
        this.closeCardPaymentModal();
      } catch (error) {
        console.error('Error confirming subscription:', error.response || error.message);
        alert('An error occurred while confirming the subscription.');
      }
    },
    closeCardPaymentModal() {
      this.showCardPaymentModal = false;
      this.cardNumber = '';
      this.expiryDate = '';
      this.cvc = '';
    },
    payWithBankTransfer() {
      this.showPaymentModal = false;
      this.showBankTransferModal = true;
    },
    async confirmBankTransfer() {
      try {
        await this.finalizeSubscription();
        alert('Subscription confirmed successfully!');
        this.showBankTransferModal = false;
      } catch (error) {
        console.error('Error confirming subscription:', error.response || error.message);
        alert('An error occurred while confirming the subscription.');
      }
    },
    async finalizeSubscription() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to be logged in to confirm a subscription.');
          return this.$router.push('/SignIn');
        }

        const userId = JSON.parse(atob(token.split('.')[1])).id; // Decode the user ID from the token

        await axios.post(
          '/user-subscriptions',
          {
            userId,
            subscriptionTypeId: this.selectedSubscription.id,
            startDate: new Date().toISOString(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>

<style scoped>
.subscription-page {
  width: 75%;
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

.subscription-options {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px 0;
}

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

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.payment-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: 1.1rem;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.payment-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
.payment-button.cash {
  background-color: #2ecc71;
}
.payment-button.card {
  background-color: #3498db;
}
.payment-button.transfer {
  background-color: #f39c12;
}

.modal-content label {
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
  text-align: left;
}

.modal-content input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.modal-content input:focus {
  border-color: #3498db;
}

.modal-buttons {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
}

.modal-buttons button {
  padding: 12px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;
}

.modal-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.modal-buttons button:not(:disabled):hover {
  transform: scale(1.05);
}

.modal-buttons button[type="submit"] {
  background-color: #3498db;
}

.modal-buttons button[type="submit"]:hover {
  background-color: #308cc9;
}

.modal-buttons button.cancel {
  background-color: #e74c3c;
}

.modal-buttons button.cancel:hover {
  background-color: #c0392b;
}

</style>
