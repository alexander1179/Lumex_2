// src/services/storage/storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  saveUser: async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.log("Error saving user:", error);
      return false;
    }
  },

  getUser: async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.log("Error getting user:", error);
      return null;
    }
  },

  removeUser: async () => {
    try {
      await AsyncStorage.removeItem("user");
      return true;
    } catch (error) {
      console.log("Error removing user:", error);
      return false;
    }
  },

  checkLogin: async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.log("Error checking login:", error);
      return null;
    }
  }
};