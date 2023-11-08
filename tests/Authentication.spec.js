import { test, expect } from '@playwright/test';
import {POManager} from '../pages/POmanager';
import userData from '../data/users.json';

test.describe("Authentication page", async () => {
    // test.describe.configure({mode:'parallel'});
    let loginForm;

    test.beforeEach(async ({page}) => {
        const poManager = new POManager(page)
        const homePage = poManager.getHomePage()
        homePage.goToApp()
        homePage.goToAdminPanel()
        loginForm = poManager.getLoginForm()
    });

    test.describe.configure({mode:'parallel'});
    test('Login with wrong username', async ()=>
        {
            await loginForm.login(userData.UserWrongUsername.username, userData.UserWrongUsername.password)
            await expect(loginForm.password).toHaveAttribute('style',loginForm.errorRedBorder)
            await expect(loginForm.userName).toHaveAttribute('style',loginForm.errorRedBorder)
        });

    test('Login with wrong password', async ()=>
        {
            await loginForm.login(userData.UserWrongPassword.username, userData.UserWrongPassword.password)
            await expect(loginForm.password).toHaveAttribute('style',loginForm.errorRedBorder)
            await expect(loginForm.userName).toHaveAttribute('style',loginForm.errorRedBorder)
        });

    test('Successfull login', async ()=>
        {
            test.step(`Step at the Test Level ${userData.User.username}`, async () => {
                await loginForm.login(userData.User.username, userData.User.password)
            })
            await expect(loginForm.loginSuccess).toContainText(loginForm.loginSuccesText)
        });
})