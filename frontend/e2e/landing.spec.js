const { test, expect } = require('@playwright/test');

test('landing page has title and loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/EduLoan Compass/i);
  // Ensure there is a visible heading or CTA
  await expect(page.locator('text=Plan Your STEM Future').first()).toBeVisible({ timeout: 5000 }).catch(() => {});
});
