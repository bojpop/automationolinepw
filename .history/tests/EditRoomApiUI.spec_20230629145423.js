import { test, expect } from '@playwright/test';
import { AuthenticationApi } from '../apis/AuthenticationApi';
import { CreateRoomApi } from '../apis/CreateRoomApi';
import { faker } from '@faker-js/faker';

test.describe("Create (API) and edit (UI) room test", async () => {
    const username = 'admin';
    const password = 'password'

    const roomName = faker.name.fullName();
    const roomPrice = 230;
    const roomType = 'Single';
    let roomAccessible = true;
    let roomFeatures = ['Wifi', 'TV', 'Radio'];
    
}