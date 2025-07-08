import { Client, Account, ID } from 'appwrite';
import conf from '../conf/conf.js';

export class Auth {
  client = new Client();
  account;

  // constructor() {
  //   this.client
  //     .setEndpoint(conf.appwriteUrl)
  //     .setProject(conf.appwriteProjectId);
  //   this.account = new Account(this.client);
  // }

  async createAccount({ email, password, name }) {
    try {
      const userId = ID.unique();
      const userAccount = await this.account.create(userId, email, password, name);
      return await this.login({ email, password });
    } catch (error) {
      if (error.code === 409) {
        throw new Error('Account already exists with this email.');
      }
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }

  async UpdatePrefs(prefs) {
    if (typeof prefs !== "object" || prefs === null) {
      throw new Error("Preferences must be a non-null object.");
    }

    try {
      await this.account.updatePrefs(prefs);
      return await this.getCurrentUser();
    } catch (error) {
      console.error("Appwrite service :: UpdatePrefs :: error", error);
      throw error;
    }
  }
}

export default new Auth();
