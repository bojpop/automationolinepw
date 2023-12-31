import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { AuthenticationApi } from '../apis/AuthenticationApi';
import { CreateRoomApi } from '../apis/CreateRoomApi';
import userData from '../data/users.json';
import { POManager } from '../pages/POmanager';

test.describe("Create (API) and edit (UI) room test", async () => {
    const username = 'admin';
    const password = 'password'

    const roomName = faker.person.fullName();
    const roomPrice = 230;
    const roomType = 'Single';
    let roomAccessible = true;
    let roomFeatures = ['Wifi', 'TV', 'Radio'];

    test.beforeEach(async ({request}) => {

        const login = new AuthenticationApi(request)
        const response = await login.loginApi(username, password)
        
        expect(response.status()).toBe(200)
    });

    test('Create and edit room', async ({request, page})=> {
        const createRoom = new CreateRoomApi(request)
        const responseRoom = await createRoom.createRoomApi(roomName, roomPrice, roomType, roomAccessible, roomFeatures);

        expect(responseRoom.status()).toBe(201);

        const roomNameEdit = faker.person.fullName();
        const typeEdit = "Family";
        const accessibleEdit = "true";
        const priceEdit = "200";
        const wifiEdit = false;
        const refreshmentsEdit = false;
        const tvEdit = true;
        const safeEdit = true;
        const radioEdit = true;
        const viewsEdit = true;

        const poManager = new POManager(page);
        const homePage = poManager.getHomePage();
        await homePage.goToApp();
        await homePage.goToAdminPanel();
        const loginForm = poManager.getLoginForm();
        await loginForm.login(userData.User.username, userData.User.password);

        await expect(loginForm.loginSuccess).toContainText(loginForm.loginSuccesText);

        const editRoom = poManager.getEditRoom(roomName);
        await editRoom.roomNameToEdit.click();

        await editRoom.editRoomUpdate(roomNameEdit,typeEdit,accessibleEdit,priceEdit,editRoom.imageAfterEdit,editRoom.descriptionTextAfterEdit,
            wifiEdit,refreshmentsEdit,tvEdit,safeEdit,radioEdit,viewsEdit)

        expect(await editRoom.checkRoomNameEdit(roomNameEdit)).toEqual("Room: "+ roomNameEdit)
        expect(await editRoom.checkRoomTypeEdit(typeEdit)).toEqual(typeEdit)
        expect(await editRoom.checkRoomAccessibleEdit(accessibleEdit)).toEqual(accessibleEdit)
        expect(await editRoom.checkRoomPriceEdit(priceEdit)).toEqual(priceEdit)
        expect(await editRoom.checkRoomDescriptionEdit(editRoom.descriptionTextAfterEdit)).toEqual(editRoom.descriptionTextAfterEdit)
        expect(await editRoom.checkRoomImageEdit(roomNameEdit)).toEqual(editRoom.imageAfterEdit)

    })
})