import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameField = this.page.locator('[data-test="username"]');
  private passwordField = this.page.locator('[data-test="password"]');
  private loginButton = this.page.locator('[data-test="login-button"]');
  
  constructor(page: Page) {
    super(page);
  }
  
  async navigate() {
    await this.goto('https://www.saucedemo.com/');
  }
  
  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}