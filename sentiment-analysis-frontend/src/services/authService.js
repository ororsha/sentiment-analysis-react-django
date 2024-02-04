import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      username,
      password,
    });

    const token = response.data.token;
    localStorage.setItem('token', token);

    return true;
  } catch (error) {
    console.error('Login failed', error);
    return false;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/registration/`, {
      username,
      password,
    });

    const token = response.data.token;
    localStorage.setItem('token', token);

    return true;
  } catch (error) {
    console.error('Registration failed', error);
    return false;
  }
};

export const logout = () => {
  // Remove the token from localStorage or any other storage mechanism
  localStorage.removeItem('token');
};
