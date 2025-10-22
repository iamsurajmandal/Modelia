const axios = require('axios');

async function signup() {
  try {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await axios.post('http://localhost:3001/auth/signup', {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

signup();
