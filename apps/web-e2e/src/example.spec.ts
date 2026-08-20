import { test, expect } from '@playwright/test';

test('searches and displays matching flights on the same page', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByLabel('Origin')).toBeVisible();
  await expect(page.getByLabel('Destination')).toBeVisible();
  await expect(page.getByLabel('Departure date')).toBeVisible();

  await page.getByRole('combobox', { name: 'Destination' }).click();
  await page
    .getByRole('option', { name: /Madeira \(Funchal\) \(FNC\)/ })
    .click();
  await page.getByLabel('Departure date').click();
  await page
    .getByRole('button', { name: 'Thursday, November 10th, 2022' })
    .click();
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText('Available flights')).toBeVisible();
  await expect(
    page
      .getByText('Amsterdam (Schiphol) (AMS) to Madeira (Funchal) (FNC)')
      .first(),
  ).toBeVisible();
  await expect(page.getByText(/58[,.]70/).first()).toBeVisible();
});
