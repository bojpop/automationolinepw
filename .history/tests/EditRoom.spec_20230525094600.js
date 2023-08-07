import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {POManager} from '../pageObjects/POmanager';
import userData from '../data/users.json';

test.describe("Edit room test", async () => {
    test('Edit room', async ({page})=>
    {
        const roomName = faker.name.fullName();
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
        poManager.goToApp()
        const homePage = poManager.getHomePage()
        homePage.goToAdminPanel()

        const loginForm = poManager.getLoginForm()
        await loginForm.login(userData.User.username, userData.User.password)

        await expect(loginForm.loginSuccess).toContainText(loginForm.loginSuccesText)

        const createRoom = poManager.getCreateRoom()
        await createRoom.createRoom(roomName,type,accessible,price,wifi,refreshments,tv,safe,radio,views)

        const roomNameEdit = faker.name.fullName();
        const typeEdit = "Family";
        const accessibleEdit = "true"
        const priceEdit = "200"
        const wifiEdit = false
        const refreshmentsEdit = false
        const tvEdit = true
        const safeEdit = true
        const radioEdit = true
        const viewsEdit = true

        const editRoom = poManager.getEditRoom()
        await editRoom.roomNameToEdit.click()

        expect(await editRoom.checkRoomNameEdit(roomName)).toEqual("Room: "+ roomName)
        expect(await editRoom.checkRoomTypeEdit(type)).toEqual(type)
        expect(await editRoom.checkRoomAccessibleEdit(accessible)).toEqual(accessible)
        expect(await editRoom.checkRoomPriceEdit(price)).toEqual(price)
        expect(await editRoom.checkRoomDescriptionEdit(editRoom.descriptionTextBeforeEdit)).toEqual(editRoom.descriptionTextBeforeEdit)
        expect(await editRoom.checkRoomImageEdit(roomName)).toEqual(editRoom.imageBeforeEdit)

        await editRoom.editRoomUpdate(roomNameEdit,typeEdit,accessibleEdit,priceEdit,editRoom.imageAfterEdit,editRoom.descriptionTextAfterEdit,wifiEdit,refreshmentsEdit,tvEdit,safeEdit,radioEdit,viewsEdit)

        expect(await editRoom.checkRoomNameEdit(roomNameEdit)).toEqual("Room: "+ roomNameEdit)
        expect(await editRoom.checkRoomTypeEdit(typeEdit)).toEqual(typeEdit)
        expect(await editRoom.checkRoomAccessibleEdit(accessibleEdit)).toEqual(accessibleEdit)
        expect(await editRoom.checkRoomPriceEdit(priceEdit)).toEqual(priceEdit)
        expect(await editRoom.checkRoomDescriptionEdit(editRoom.descriptionTextAfterEdit)).toEqual(editRoom.descriptionTextAfterEdit)
        expect(await editRoom.checkRoomImageEdit(roomNameEdit)).toEqual(editRoom.imageAfterEdit)


    });
})