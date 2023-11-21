import { test, expect, request } from '@playwright/test';
import { fakerSR_RS_latin as faker } from '@faker-js/faker';
import { randFullName } from '@ngneat/falso';
import { POManager } from '../pages/POmanager';
import userData from '../data/users.json';
import { RoomType } from '../pages/CreateRoomPage';

test.describe("Room management", async () => {
    let poManager;

    test.beforeEach(async({page}) => {
        poManager = new POManager(page)

        const homePage = poManager.getHomePage()
        homePage.goToApp()
        homePage.goToAdminPanel()

        const loginForm = poManager.getLoginForm()
        await loginForm.login(userData.User.username, userData.User.password)

        await expect(loginForm.loginSuccess).toContainText(loginForm.loginSuccesText)
        
        // global.rooms = await fetchData();
    });

    const rooms = [
        ['114', RoomType.SINGLE, "false", "80", false, false, false, false, false, false],
        ['115', RoomType.TWIN, "false", "150", true, true, false, false, true, false],
        ['116', RoomType.DOUBLE, "true", "200", true, true, false, true, true, false],
        ['117', RoomType.FAMILY, "true", "250", true, true, true, true, true, true],
        ['118', RoomType.SUITE, "true", "300", true, true, true, true, true, true]
    ]

    for (let i = 0; i < rooms.length; i++) {
        test(`Create room of type ${rooms[i][1]} and name ${rooms[i][0]} successfully @sanity`, async ()=>
        {
            const roomName = rooms[i][0];
            const type = rooms[i][1];
            const accessible = rooms[i][2];
            const price = rooms[i][3];
            const wifi = rooms[i][4];
            const refreshments = rooms[i][5];
            const tv = rooms[i][6];
            const safe = rooms[i][7];
            const radio = rooms[i][8];
            const views = rooms[i][9];

            const createRoom = poManager.getCreateRoom(roomName)
            createRoom.createRoom(roomName,type,accessible,price,wifi,refreshments,tv,safe,radio,views)

            await expect(createRoom.roomNameCheck).toHaveText(roomName)
            expect(await createRoom.roomTypeCheck()).toEqual(type)
            expect(await createRoom.roomAccessibleCheck()).toEqual(accessible)
            expect(await createRoom.roomPriceCheck()).toEqual(price)
            expect(await createRoom.roomCheckBoxesCheck()).toEqual(createRoom[`checkBoxText${i}`])
        });
    }

    // async function fetchData() {
    //     // Replace this with your actual asynchronous data fetching logic
    //     return [
    //         [randFullName(), RoomType.SINGLE, "false", "80", false, false, false, false, false, false],
    //         [randFullName(), RoomType.TWIN, "false", "150", true, true, false, false, true, false],
    //         [randFullName(), RoomType.DOUBLE, "true", "200", true, true, false, true, true, false],
    //         [randFullName(), RoomType.FAMILY, "true", "250", true, true, true, true, true, true],
    //         [randFullName(), RoomType.SUITE, "true", "300", true, true, true, true, true, true]
    //       ];
    //   }
    // test('Create room successfully @sanity', async ({page})=>
    // {
    //     const roomName = faker.person.fullName();
    //     const type = "Twin";
    //     const accessible = "true"
    //     const price = "50"
    //     const wifi = true
    //     const refreshments = true
    //     const tv = false
    //     const safe = false
    //     const radio = false
    //     const views = false

    //     const createRoom = poManager.getCreateRoom(roomName)
    //     createRoom.createRoom(roomName,type,accessible,price,wifi,refreshments,tv,safe,radio,views)

    //     await expect(createRoom.roomNameCheck).toHaveText(roomName)
    //     expect(await createRoom.roomTypeCheck()).toEqual(type)
    //     expect(await createRoom.roomAccessibleCheck()).toEqual(accessible)
    //     expect(await createRoom.roomPriceCheck()).toEqual(price)
    //     expect(await createRoom.roomCheckBoxesCheck()).toEqual(createRoom.checkBoxText1)
    // });

    test('Cant create room successfully with empty room name @sanity', async ({page})=>
    {
        const type = "Twin";
        const accessible = "true"
        const price = "50"
        const wifi = true
        const refreshments = true
        const tv = false
        const safe = false
        const radio = false
        const views = false
        
        const createRoom = poManager.getCreateRoom('')
        createRoom.createRoom('',type,accessible,price,wifi,refreshments,tv,safe,radio,views)
        await expect(createRoom.errorMessages, 'Error messages are displayed').toBeVisible();
    });
})