import { test, expect, request } from '@playwright/test';
import { fakerSR_RS_latin as faker } from '@faker-js/faker';
import { POManager } from '../pages/POmanager';
import userData from '../data/users.json';

test.describe("Create room test", async () => {
    test('Create room', async ({page})=>
    {
        const roomName = faker.person.fullName();
        const type = "Twin";
        const accessible = "true"
        const price = "50"
        const wifi = true
        const refreshments = true
        const tv = false
        const safe = false
        const radio = false
        const views = false
        
        const poManager = new POManager(page, roomName)
        // page.on('request', request=>console.log(request.url()));
        const homePage = poManager.getHomePage()
        homePage.goToApp()
        homePage.goToAdminPanel()

        const loginForm = poManager.getLoginForm()
        await loginForm.login(userData.User.username, userData.User.password)

        await expect(loginForm.loginSuccess).toContainText(loginForm.loginSuccesText)

        const createRoom = poManager.getCreateRoom()
        createRoom.createRoom(roomName,type,accessible,price,wifi,refreshments,tv,safe,radio,views)

        await expect(createRoom.roomNameCheck).toHaveText(roomName)
        expect(await createRoom.roomTypeCheck()).toEqual(type)
        expect(await createRoom.roomAccessibleCheck()).toEqual(accessible)
        expect(await createRoom.roomPriceCheck()).toEqual(price)
        expect(await createRoom.roomCheckBoxesCheck()).toEqual(createRoom.checkBoxText1)
    });
})