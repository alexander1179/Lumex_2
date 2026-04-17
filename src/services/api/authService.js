// src/services/api/authService.js
import { API_URL, endpoints } from './apiConfig';

export const authService = {
  login: async (usuario, password) => {
    try {
      const response = await fetch(`${API_URL}${endpoints.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password })
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}${endpoints.register}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (data) => {
    try {
      const response = await fetch(`${API_URL}${endpoints.forgotPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  verifyToken: async (userId, token) => {
    try {
      const response = await fetch(`${API_URL}${endpoints.verifyToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token })
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (userId, token, newPassword) => {
    try {
      const response = await fetch(`${API_URL}${endpoints.resetPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, token, newPassword })
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
};