import { test, expect } from '@playwright/test';
import { AuthenticationApi } from '../apis/AuthenticationApi';
import { CreateRoom } from '../pages/CreateRoomPage';
import { BookingRoom } from '../pages/BookingRoomPage';
import { faker } from '@faker-js/faker';

test.describe("Create and book room API test", async () => {
    const username = 'admin';
    const password = 'password'

    const roomName = faker.name.fullName();
    const roomPrice = 230;
    const roomType = 'Single';
    let roomAccessible = true;
    let roomFeatures = ['Wifi', 'TV', 'Radio']
    
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    let email = faker.internet.email();
    let phone = '123456789012';
    let checkin = '2022-12-13'
    let checkout = '2022-12-14'

    test.beforeEach(async ({request}) => {

        const login = new AuthenticationApi(request)
        const response = await login.loginApi(username, password)
        
        expect(response.status()).toBe(200)
    });

    test('Create and book room', async ({request, page})=> {
        const createRoom = new CreateRoomApi(request)
        const responseRoom = await createRoom.createRoomApi(request, roomName, roomPrice, roomType, roomAccessible, roomFeatures)

        expect(responseRoom.status()).toBe(201)
        const responseRoomJSON = JSON.parse(await responseRoom.text())
        expect(responseRoomJSON.roomName).toEqual(roomName)
        expect(responseRoomJSON.type).toEqual(roomType)
        expect(responseRoomJSON.accessible).toEqual(roomAccessible)
        expect(responseRoomJSON.features).toEqual(roomFeatures)
        expect(responseRoomJSON.roomPrice).toEqual(roomPrice)

        let roomId = responseRoomJSON.roomid

        const bookRoom = new BookingRoom(page)
        const responseBooking = await bookRoom.bookRoomApi(request, firstname, lastname, roomId, email, phone, checkin, checkout)
        
        expect(responseBooking.status()).toBe(201)
        const response2body = JSON.parse(await responseBooking.text())
        console.log(response2body.bookingid)
        expect(response2body.booking.firstname).toEqual(firstname)
        expect(response2body.booking.lastname).toEqual(lastname)
        
    })
})