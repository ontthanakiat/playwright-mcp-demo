import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInfoPage extends BasePage {
  private firstNameField = this.page.locator('[data-test="firstName"]');
  private lastNameField = this.page.locator('[data-test="lastName"]');
  private postalCodeField = this.page.locator('[data-test="postalCode"]');
  private continueButton = this.page.locator('[data-test="continue"]');
  private cancelButton = this.page.locator('[data-test="cancel"]');
  
  constructor(page: Page) {
    super(page);
  }
  
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }
  
  async continue() {
    await this.continueButton.click();
  }
  
  async cancel() {
    await this.cancelButton.click();
  }
}