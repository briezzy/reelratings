class User {
  static accounts = []; 

  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = this.hashPassword(password); 
    this.isLoggedIn = false;
  }

  // Helper function to hash passwords 
    hashPassword(password) {
    return password.split('').reverse().join(''); 
  }

  // Method to create a new account/register 
  static createAccount(username, email, password) {
    const existingUser = User.accounts.find((user) => user.email === email);
    if (existingUser) {
      console.log("Account with this email already exists.");
      return null;
    }
    const newUser = new User(username, email, password);
    User.accounts.push(newUser);
    console.log(`Account created for ${username}.`);
    return newUser;
  }

  // Method to delete an account
  deleteAccount() {
    const index = User.accounts.indexOf(this);
    if (index > -1) {
      User.accounts.splice(index, 1);
      console.log(`Account for ${this.username} has been deleted.`);
    } else {
      console.log("Account not found.");
    }
  }

  // Method to login user 
  static login(email, inputPassword) {
    const user = User.accounts.find(
      (account) => account.email === email && account.password === account.hashPassword(inputPassword)
    );

    if (user) {
      user.isLoggedIn = true;
      console.log(`${user.username} logged in successfully.`);
      return user;
    } else {
      console.log("Invalid email or password. Login failed.");
      return null;
    }
  }

  // Method to update user profile information
  updateProfile(newUsername, newEmail) {
    this.username = newUsername || this.username;
    this.email = newEmail || this.email;
    console.log("Profile updated successfully.");
  }

  // Method to reset password
  resetPassword(newPassword) {
    this.password = this.hashPassword(newPassword);
    console.log("Password reset successful.");
  }

  // Log out method
  logout() {
    this.isLoggedIn = false;
    console.log(`${this.username} logged out.`);
  }
}
