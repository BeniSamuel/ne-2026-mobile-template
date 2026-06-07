import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleUsers } from '../constants/mockData';
import { LoginPayload, SignupPayload, User } from '../types/auth.types';

const USER_KEY = '@finance_tracker_user';
let users = [...sampleUsers];

function wait() {
  return new Promise((resolve) => setTimeout(resolve, 700));
}

function withoutPassword(user: User & { password: string }): User {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };
}

export const authService = {
  async login(payload: LoginPayload) {
    await wait();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === payload.email.toLowerCase().trim() &&
        item.password === payload.password,
    );

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const authenticatedUser = withoutPassword(user);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
    return authenticatedUser;
  },

  async signup(payload: SignupPayload) {
    await wait();

    const exists = users.some(
      (item) => item.email.toLowerCase() === payload.email.toLowerCase().trim(),
    );

    if (exists) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      fullName: payload.fullName.trim(),
      email: payload.email.toLowerCase().trim(),
      password: payload.password,
    };

    users = [...users, newUser];
    const authenticatedUser = withoutPassword(newUser);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(authenticatedUser));
    return authenticatedUser;
  },

  async getSavedUser() {
    const savedUser = await AsyncStorage.getItem(USER_KEY);
    return savedUser ? (JSON.parse(savedUser) as User) : null;
  },

  async logout() {
    await AsyncStorage.removeItem(USER_KEY);
  },
};
