export class CreateRoom {
    constructor(page,roomName){
        this.page = page;
        this.roomName = page.getByTestId('roomName');
        this.type = page.locator('#type');
        this.accessible = page.locator('#accessible');
        this.price = page.locator('#roomPrice');
        this.wifi = page.getByLabel('WiFi')
        this.refreshments = page.getByLabel('Refreshments');
        this.tv = page.getByLabel('TV');
        this.safe = page.getByLabel('Safe');
        this.radio = page.getByLabel('Radio');
        this.views = page.getByLabel('Views');
        this.createButton = page.locator('#createRoom');
        this.roomNameCheck = page.getByText(`${roomName}`)
        this.getRoom = page.locator("div", { has : page.getByText(roomName)});
        this.checkBoxText0 = 'No features added to the room';
        this.checkBoxText1 = 'WiFi, Radio, Refreshments';
        this.checkBoxText2 = 'WiFi, Radio, Refreshments, Safe';
        this.checkBoxText3 = 'WiFi, TV, Radio, Refreshments, Safe, Views';
        this.checkBoxText4 = 'WiFi, TV, Radio, Refreshments, Safe, Views';
        this.errorMessages = page.locator('.alert.alert-danger');
        this.roomNameEmptyError = page.getByText('Room name must be set');
        this.priceEmptyOrEqualZeroError = page.getByText('must be greater than or equal to 1');
    }

    async hasWifi(wifi){
        if (wifi != null && wifi){
            await this.wifi.check()
        }
    }

    async hasRefreshements(refreshments){
        if (refreshments != null && refreshments){
            await this.refreshments.click()
        }
    }

    async hasTv(tv){
        if (tv != null && tv){
            await this.tv.click()
        }
    }

    async hasSafe(safe){
        if (safe != null && safe){
            await this.safe.click()
        }
    }

    async hasRadio(radio){
        if (radio != null && radio){
            await this.radio.click()
        }
    }

    async hasViews(views){
        if (views != null && views){
            await this.views.click()
        }
    }

    async setAmenities(wifi,refreshments,tv,safe,radio,views){
        await this.hasWifi(wifi)
        await this.hasRefreshements(refreshments)
        await this.hasTv(tv)
        await this.hasSafe(safe)
        await this.hasRadio(radio)
        await this.hasViews(views)
    }

    async createRoom(roomname,type,accessible,price,wifi,refreshments,tv,safe,radio,views){
        await this.roomName.type(roomname)
        await this.type.selectOption(type)
        await this.accessible.selectOption(accessible)
        await this.price.type(price)
        await this.setAmenities(wifi,refreshments,tv,safe,radio,views)
        await this.createButton.click()
    }

    async getRoomId(){
        return await this.getRoom.nth(7).getAttribute('id');
    }

    async roomTypeCheck(){
        const roomId = await this.getRoomId()
        const type = await this.page.locator(`#${roomId}`).locator('.col-sm-2').nth(0).textContent()
        return type;
    }

    async roomAccessibleCheck(){
        const roomId = await this.getRoomId()
        const accessible = await this.page.locator(`#${roomId}`).locator('.col-sm-2').nth(1).textContent()
        return accessible;
    }

    async roomPriceCheck(){
        const roomId = await this.getRoomId()
        const price = await this.page.locator(`#${roomId}`).locator('.col-sm-1').nth(1).textContent()
        return price;
    }

    async roomCheckBoxesCheck(){
        const roomId = await this.getRoomId()
        const checkBoxes = await this.page.locator(`#${roomId}`).locator('.col-sm-5').textContent()
        return checkBoxes;
    }
}

export const RoomType = {
    SINGLE: 'Single',
    TWIN: 'Twin',
    DOUBLE: 'Double',
    FAMILY: 'Family',
    SUITE: 'Suite'
  }