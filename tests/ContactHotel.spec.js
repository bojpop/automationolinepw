import { test, expect } from '@playwright/test';
import { fakerSR_RS_latin as faker } from '@faker-js/faker';
import { POManager } from '../pages/POmanager';

test.describe("Room management", async () => {
    let poManager;
    let homePage;

    const name = `${faker.person.firstName()} ${faker.person.lastName()}`;
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const subject = faker.lorem.sentence(3);
    const message = faker.lorem.lines(5);

    test.beforeEach(async ({ page }) => {
        poManager = new POManager(page)
        homePage = poManager.getHomePage()
        await homePage.goToApp()
    });

    test('Fill and submit contact form successfully @sanity', async ({page})=>
        {
            await homePage.fillAndSubmitContactForm(name, email, phone, subject, message)
            await expect(homePage.successfullySubmited).toBeVisible()
        });
    
    test('Empty name field', async ()=>
        {
            await homePage.fillAndSubmitContactForm('', email, phone, subject, message)
            await expect(homePage.emptyNameError).toBeVisible()
        });
        
    test('Empty email field', async ()=>
        {
            await homePage.fillAndSubmitContactForm(name, '', phone, subject, message)
            await expect(homePage.emptyEmailError).toBeVisible()
        });

    test('Empty phone field', async ()=>
        {
            await homePage.fillAndSubmitContactForm(name, email, '', subject, message)
            await expect(homePage.emptyPhoneError).toBeVisible()
            await expect(homePage.invalidPhoneNumberError).toBeVisible()
        });

    test('Empty subject field', async ()=>
        {
            await homePage.fillAndSubmitContactForm(name, email, phone, '', message)
            await expect(homePage.emptySubjectError).toBeVisible()
            await expect(homePage.invalidSubjectError).toBeVisible()
        });

    test('Empty message field', async ()=>
        {
            await homePage.fillAndSubmitContactForm(name, email, phone, subject, '')
            await expect(homePage.emptyMessageError).toBeVisible()
            await expect(homePage.invalidMessageError).toBeVisible()
        }); 
    
    for (const invalidPhone of ['1234567890', '1234567890123456789012']) {
        test(`Phone with invalid length, less than 11 and more than 21 characters (limit values 10 and 22): ${invalidPhone}`, async ()=>
            {
                await homePage.fillAndSubmitContactForm(name, email, invalidPhone, subject, message)
                await expect(homePage.invalidPhoneNumberError).toBeVisible();
            });
        }

    for (const validPhone of ['12345678901', '123456789012345678901']) {
        test(`Phone with valid length, (limit values 11 and 21): ${validPhone}`, async ()=>
            {
                await homePage.fillAndSubmitContactForm(name, email, validPhone, subject, message)
                await expect(homePage.successfullySubmited).toBeVisible()
            });
    }

    for (const invalidSubjectLength of [4, 101]) {
        test(`Filling up the subject with invalid length value of ${invalidSubjectLength}, one of the limit invalid values`, async () => 
        {
            let invalidSubject = faker.string.alphanumeric(invalidSubjectLength);
            await homePage.fillAndSubmitContactForm(name, email, phone, invalidSubject, message)
            await expect(homePage.invalidSubjectError).toBeVisible()
        });
    }
    
    for (const validSubjectLength of [5, 100]) {
        test(`Filling up the subject with valid length value of ${validSubjectLength}, one of the limit values`, async () => 
        {
            let validSubject = faker.string.alphanumeric(validSubjectLength);
            await homePage.fillAndSubmitContactForm(name, email, phone, validSubject, message)
            await expect(homePage.successfullySubmited).toBeVisible()
        });
    }

    for (const invalidMessageLength of [19, 2001]) {
        test(`Filling up the message with invalid length value of ${invalidMessageLength}, one of the limit invalid values`, async () => {
            let invalidMessage = faker.string.alphanumeric(invalidMessageLength);
            await homePage.fillAndSubmitContactForm(name, email, phone, subject, invalidMessage);
            await expect(homePage.invalidMessageError).toBeVisible()
        });
    }

    for (const validMessageLength of [20, 2000]) {
        test(`Filling up the message with invalid length value of ${validMessageLength}, one of the limit invalid values`, async () => {
            let validMessage = faker.string.alphanumeric(validMessageLength);
            await homePage.fillAndSubmitContactForm(name, email, phone, subject, validMessage);
            await expect(homePage.successfullySubmited).toBeVisible()
        });
    }
})