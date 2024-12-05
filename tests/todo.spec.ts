import { test, expect } from '@playwright/test'

test.describe('New todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('')
  })

  test('add two tasks, mark one as completed', async ({ page }) => {
    const todoInput = page.getByPlaceholder('What needs to be done?')

    await todoInput.fill('water the plants')
    await todoInput.press('Enter')

    await todoInput.fill('feed the dog')
    await todoInput.press('Enter')

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
    const todoInput = page.getByPlaceholder('What needs to be done?')

    await todoInput.fill('saturate with rain water')
    await todoInput.press('Enter')

    await expect(todoInput).toBeEmpty()
  })
})
