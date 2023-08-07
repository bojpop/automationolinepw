import { test, expect } from '@playwright/test';
import { AuthenticationApi } from '../apis/AuthenticationApi';
import { CreateRoomApi } from '../apis/CreateRoomApi';
import { faker } from '@faker-js/faker';
import { EditRoom } from '../pages/EditRoomPage';
import { Authentication } from '../pages/AuthenticationPage';
import userData from '../data/users.json';
import { HomePage } from '../pages/HomePage';

test.describe("Create (API) and edit (UI) room test", async () => {
    const username = 'admin';
    const password = 'password'

    const roomName = faker.name.fullName();
    const roomPrice = 230;
    const roomType = 'Single';
    let roomAccessible = true;
    let roomFeatures = ['Wifi', 'TV', 'Radio'];

    test.beforeEach(async ({request}) => {

        const login = new AuthenticationApi(request)
        const response = await login.loginApi(username, password)
        
        expect(response.status()).toBe(200)
    });

    test('Create and book room', async ({request, page})=> {
        const createRoom = new CreateRoomApi(request)
        const responseRoom = await createRoom.createRoomApi(roomName, roomPrice, roomType, roomAccessible, roomFeatures);

        expect(responseRoom.status()).toBe(201);

        const roomNameEdit = faker.name.fullName();
        const typeEdit = "Family";
        const accessibleEdit = "true";
        const priceEdit = "200";
        const wifiEdit = false;
        const refreshmentsEdit = false;
        const tvEdit = true;
        const safeEdit = true;
        const radioEdit = true;
        const viewsEdit = true;

        const homePage = new HomePage(page);
        await 
        const loginForm = new Authentication(page);
        await loginForm.login(userData.User.username, userData.User.password)

        await expect(loginForm.loginSuccess).toContainText(loginForm.loginSuccesText)

        const editRoom = new EditRoom(page);
        await editRoom.roomNameToEdit.click();

        await editRoom.editRoomUpdate(roomNameEdit,typeEdit,accessibleEdit,priceEdit,editRoom.imageAfterEdit,editRoom.descriptionTextAfterEdit,
            wifiEdit,refreshmentsEdit,tvEdit,safeEdit,radioEdit,viewsEdit)

    })
})