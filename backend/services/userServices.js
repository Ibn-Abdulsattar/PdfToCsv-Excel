// services/userService.js
import fs from "fs/promises";
import path from "path";

class UserService {
  constructor() {
    this.usersFilePath = path.join("data", "users.json");
    this.initializeUsersFile();
  }

  // Initialize users file if doesn't exist
  async initializeUsersFile() {
    try {
      await fs.access(this.usersFilePath);
    } catch (error) {
      // File doesn't exist, create it
      await fs.writeFile(this.usersFilePath, JSON.stringify({}), "utf8");
      console.log("Users file created");
    }
  }

  // Get all users data
  async getAllUsers() {
    try {
      const data = await fs.readFile(this.usersFilePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  // Get user by identifier (IP or email)
  async getUser(identifier) {
    const users = await this.getAllUsers();
    return users[identifier] || null;
  }

  // Create or update user
  async saveUser(identifier, userData) {
    const users = await this.getAllUsers();
    users[identifier] = {
      ...users[identifier],
      ...userData,
      lastUpdated: new Date().toISOString(),
    };

    await fs.writeFile(this.usersFilePath, JSON.stringify(users, null, 2));
    return users[identifier];
  }

  // Check if user has free conversion left
  async hasFreeTrial(identifier) {
    const user = await this.getUser(identifier);

    if (!user) {
      // New user, create with free trial
      await this.saveUser(identifier, {
        freeConversionsUsed: 0,
        isPaid: false,
        createdAt: new Date().toISOString(),
      });
      return true;
    }

    return user.freeConversionsUsed < 1; // Free limit is 1
  }

  // Use free conversion
  async useFreeConversion(identifier) {
    const user = await this.getUser(identifier);
    const currentUsed = user ? user.freeConversionsUsed : 0;

    await this.saveUser(identifier, {
      freeConversionsUsed: currentUsed + 1,
      lastConversionAt: new Date().toISOString(),
    });
  }

  // Check if user is paid
  async isPaidUser(identifier) {
    const user = await this.getUser(identifier);
    return user && user.isPaid === true;
  }

  // Mark user as paid
  async markAsPaid(identifier, paymentDetails = {}) {
    await this.saveUser(identifier, {
      isPaid: true,
      paidAt: new Date().toISOString(),
      paymentDetails: paymentDetails,
    });
  }

  // Get user stats
  async getUserStats(identifier) {
    const user = await this.getUser(identifier);

    if (!user) {
      return {
        freeConversionsUsed: 0,
        freeConversionsRemaining: 1,
        isPaid: false,
        canConvert: true,
      };
    }

    const freeConversionsRemaining = Math.max(0, 1 - user.freeConversionsUsed);
    const canConvert = user.isPaid || freeConversionsRemaining > 0;

    return {
      freeConversionsUsed: user.freeConversionsUsed || 0,
      freeConversionsRemaining,
      isPaid: user.isPaid || false,
      canConvert,
      createdAt: user.createdAt,
      paidAt: user.paidAt,
    };
  }

  // services/userServices.js
  async resetUser(userIdentifier) {
    const users = await this.getUsers();
    users[userIdentifier] = {
      conversions: 0,
      isPaid: false,
      createdAt: new Date().toISOString(),
    };
    await this.saveUsers(users);
    return users[userIdentifier];
  }
}

const userService = new UserService();
export default userService;
