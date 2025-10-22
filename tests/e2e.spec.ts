import { test, expect } from '@playwright/test';

test('full user flow', async ({ page }) => {
  const randomEmail = `test-${Date.now()}@example.com`;

  // Signup
  await page.goto('http://localhost:5173/signup');
  await page.getByPlaceholder('Email').fill(randomEmail);
  await page.getByPlaceholder('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.waitForURL('http://localhost:5173/');

  // Logout
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.waitForURL('http://localhost:5173/login');

  // Login
  await page.getByPlaceholder('Email').fill(randomEmail);
  await page.getByPlaceholder('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:5173/');

  // Create a dummy file to upload
  await page.evaluate(() => {
    const data = "dummy";
    const blob = new Blob([data], { type: 'image/png' });
    const file = new File([blob], 'dummy.png', { type: 'image/png' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    const input = document.querySelector('input[type="file"]');
    if (input) {
      input.files = dataTransfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  // Perform generation
  await page.getByLabel('Prompt').fill('a test prompt');
  await page.getByLabel('Style').selectOption('style1');
  await page.getByRole('button', { name: 'Generate' }).click();

  // Wait for the generation to complete
  await page.waitForSelector('text=Recent Generations');

  // Check that the new generation is in the history
  const history = await page.locator('ul');
  await expect(history).toContainText('a test prompt');

  // Restore the generation
  await page.getByRole('button', { name: 'Restore' }).click();
  await expect(page.getByLabel('Prompt')).toHaveValue('a test prompt');
});
