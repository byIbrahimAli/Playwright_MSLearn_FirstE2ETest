import { test, expect } from '@playwright/test'

test.describe('New todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/')
  })

  test('add two tasks, mark one as completed', async ({ page }) => {
    await page
      .getByPlaceholder('What needs to be done?')
      .fill('water the plants')
    await page.getByPlaceholder('What needs to be done?').press('Enter')

    await page.getByPlaceholder('What needs to be done?').fill('feed the dog')
    await page.getByPlaceholder('What needs to be done?').press('Enter')

    await page
      .locator('li')
      .filter({ hasText: 'water the plants' })
      .getByLabel('Toggle Todo')
      .check()

    await page.getByRole('link', { name: 'Active' }).click()
    await expect(page.getByTestId('todo-title')).toContainText('feed the dog')

    await page.getByRole('link', { name: 'Completed' }).click()
    await expect(page.getByTestId('todo-title')).toContainText(
      'water the plants'
    )
  })

  test('text field is cleared when item is added', async ({ page }) => {
    await page
      .getByPlaceholder('What needs to be done?')
      .fill('saturate with rain water')
    await page.getByPlaceholder('What needs to be done?').press('Enter')

    await expect(page.getByPlaceholder('What needs to be done?')).toBeEmpty()
  })
})
