import { test, expect } from '@playwright/test';
import { fakerSR_RS_latin as faker } from '@faker-js/faker';
import { POManager } from '../pages/POmanager';

test.describe("Room management", async () => {
    test('Fill and submit contact form successfully @sanity', async ({page})=>
        {

            const name = "Bojan Testerovic";
            const email = "bojan@email.com"
            const phone = "069111111234"
            const subject = "Pitanje"
            const message = "Da li je ova forma uspesno submit-ovana?"
            
            let poManager = new POManager(page)

            const homePage = poManager.getHomePage()
            homePage.goToApp()
            homePage.fillAndSubmitContactForm(name, email, phone, subject, message)
            await expect(homePage.successfullySubmited).toBeVisible()
        });
})