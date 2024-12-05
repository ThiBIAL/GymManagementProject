<template>
    <div id="content">
        <header>
            <h1>Welcome to <strong>Easy Fit</strong></h1>
            <h3>Your Partner for a Healthier Lifestyle!</h3>
        </header>

        <section id="intro-image">
            <img src="../assets/Fitnessgym.jpg" alt="Gym Image" class="intro-image">
        </section>

        <section id="subscriptions">
            <h2>Our Membership Plans</h2>
            <div class="subscription-card" v-for="plan in subscriptions" :key="plan.id">
                <h3>{{ plan.name }}</h3>
                <p>{{ plan.description }}</p>
                <span class="price">{{ plan.price }}</span>
            </div>
        </section>



        <section id="faq">
            <h2>Frequently Asked Questions</h2>
            <ul>
                <li>
                    <strong>What are your operating hours?</strong>
                    <p>Our fitness centers are open from 6:00 AM to 10:00 PM every day.</p>
                </li>
                <li>
                    <strong>Can I try before subscribing?</strong>
                    <p>Yes, we offer a free trial session for all new members.</p>
                </li>
                <li>
                    <strong>Are there any cancellation fees?</strong>
                    <p>No, you can cancel anytime without any extra fees.</p>
                </li>
            </ul>
        </section>

        <section id="contact">
            <h2>Contact Us</h2>
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" placeholder="Your name" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="Your email" required>
                
                <label for="message">Message:</label>
                <textarea id="message" placeholder="Your message" required></textarea>
                
                <button type="submit">Send</button>
            </form>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            subscriptions: [
                {
                    id: 1,
                    name: 'Normal Subscription',
                    description: 'Access to 1 fitness center. Choose the one nearest to you.',
                    price: '$20 / month',
                },
                {
                    id: 2,
                    name: 'Premium Subscription',
                    description: 'Access to all fitness centers. No reservations required.',
                    price: '$30 / month',
                },
                {
                    id: 3,
                    name: 'Student Subscription',
                    description: 'Access to 1 fitness center for students.',
                    price: '$15 / month',
                },
                {
                    id: 4,
                    name: 'Family Subscription',
                    description: 'Access to 1 fitness center for 3 members. Each member must complete their profile.',
                    price: '$40 / month',
                },
            ],
        };
    },
};
</script>



<style scoped>


* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

header {
    text-align: center;
    background-color: #FFA500;
    color: white;
    padding: 20px;
}

h1 {
    margin-bottom: 10px;
}

strong {
    color: #333333;
}

#subscriptions, #faq, #contact {
    margin: 20px auto;
    width: 90%;
    max-width: 800px;
    border: black 2px solid;
    padding:50px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #FFA500;
}

.subscription-card {
    background: #fff;
    padding: 15px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.subscription-card h3 {
    margin-bottom: 10px;
    color: #333333;
}

.subscription-card .price {
    color: #FFA500;
    font-weight: bold;
}

#faq ul {
    list-style-type: none;
}

#faq li {
    margin-bottom: 15px;
}

#faq strong {
    display: block;
    margin-bottom: 5px;
    color: #333333;
}

#contact form {
    display: flex;
    flex-direction: column;
}

#contact label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #333333;
}

#contact input, #contact textarea {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

#contact button {
    padding: 10px;
    background-color: #FFA500;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

#contact button:hover {
    background-color: #e69500;
}

.intro-image {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    margin: 20px 0;
}

</style>
