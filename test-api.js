const axios = require('axios');

async function testAPI() {
    try {
        console.log('Testing API endpoints...\n');

        // Test main endpoint
        const mainResponse = await axios.get('http://localhost:5000/');
        console.log('Main endpoint:', mainResponse.data);


        const registerData = {
            name: "Test User 2",
            email: "test2@example.com",
            password: "password123",
            phone: "1234567891",
            role: "CUSTOMER"
        };

        const registerResponse = await axios.post('http://localhost:5000/api/auth/register', registerData);
        console.log('Register successful:', registerResponse.data);


        const loginData = {
            email: "test@example.com",
            password: "password123"
        };

        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', loginData);
        console.log('Login successful:', loginResponse.data);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testAPI();