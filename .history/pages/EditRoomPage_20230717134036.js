export class EditRoom {
    constructor(page,roomName){
        this.page = page;
        this.roomName = page.locator('#roomName');
        this.type = page.getByRole('combobox', { name: 'Type: Accessible:' })
        this.accessible = page.locator('#accessible');
        this.roomPrice = page.locator('#roomPrice');
        this.description = page.getByRole('textbox', { name: 'Description' });
        this.detailsWifi = page.locator('#wifiCheckbox');
        this.detailsTv = page.locator('#tvCheckbox');
        this.detailsRadio = page.locator('#radioCheckbox');
        this.detailsRefreshments = page.locator('#refreshCheckbox');
        this.detailsViews = page.locator('#viewsCheckbox');
        this.detailsSafe = page.locator('#safeCheckbox');
        this.image = page.locator('#image');
        this.roomNameToEdit = page.getByText(`${roomName}`);
        this.updateButton = page.locator('#update');
        this.editButton = page.locator('.room-details > .row > .col-sm-2 > .btn');
        this.imageBeforeEdit = 'https://www.mwtestconsultancy.co.uk/img/room1.jpg';
        this.imageAfterEdit = 'https://www.mwtestconsultancy.co.uk/img/room2.jpg';
        this.descriptionTextBeforeEdit = "Please enter a description for this room";
        this.descriptionTextAfterEdit = "This is edited description";
        this.roomImageCheckEdit = page.locator(`//img[@alt='Room: ${roomName} preview image']`);
    }

    async hasWifi(wifi){
        if (wifi != null){
            await this.detailsWifi.click()
        }
    }

    async hasRefreshements(refreshments){
        if (refreshments != null){
            await this.detailsRefreshments.click()
        }
    }

    async hasTv(tv){
        if (tv != null){
            await this.detailsTv.click()
        }
    }

    async hasSafe(safe){
        if (safe != null){
            await this.detailsSafe.click()
        }
    }

    async hasRadio(radio){
        if (radio != null){
            await this.detailsRadio.click()
        }
    }

    async hasViews(views){
        if (views != null){
            await this.detailsViews.click()
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

    async editRoomUpdate(roomname,type,accessible,price,image,description,wifi,refreshments,tv,safe,radio,views){
        await this.editButton.click()
        await this.page.waitForLoadState('networkidle')
        await this.roomName.fill(roomname)
        await this.type.selectOption(type)
        await this.accessible.selectOption(accessible)
        await this.roomPrice.fill(price)
        // await this.image.clear()
        // await this.image.type(image)
        await this.image.fill(image)
        // await this.description.clear()
        // await this.description.type(description)
        await this.description.fill(description)
        await this.setAmenities(wifi,refreshments,tv,safe,radio,views)
        await this.updateButton.click()
    }

    async checkRoomNameEdit(name){
        const nameCheck = this.page.locator(`//h2[normalize-space()='Room: ${name}']`).textContent()
        return nameCheck
    }

    async checkRoomTypeEdit(type){
        const typeCheck = this.page.locator(`//span[normalize-space()='${type}']`).textContent()
        return typeCheck
    }

    async checkRoomAccessibleEdit(accessible){
        const accessibleCheck = this.page.locator(`//span[normalize-space()='${accessible}']`).textContent()
        return accessibleCheck
    }

    async checkRoomPriceEdit(price){
        const priceCheck = this.page.locator(`//span[normalize-space()='${price}']`).textContent()
        return priceCheck
    }

    async checkRoomDescriptionEdit(description){
        const descriptionCheck = this.page.locator(`//span[normalize-space()='${description}']`).textContent()
        return descriptionCheck
    }

    async checkRoomImageEdit(name){
        const imageCheck = this.page.locator(`//img[@alt='Room: ${name} preview image']`).getAttribute('src')
        return imageCheck
    }
}