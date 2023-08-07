import {Authentication} from './AuthenticationPage'
import {CreateRoom} from './CreateRoomPage'
import {EditRoom} from './EditRoomPage'
import {HomePage} from './HomePage';

export class POManager{
    constructor(page, roomName){
        this.page = page;
        this.roomName = roomName;
        this.homePage = new HomePage(this.page);
        this.loginForm = new Authentication(this.page);
        this.createRoom = new CreateRoom(this.page, this.roomName);
        this.editRoom = new EditRoom(this.page, this.roomName);
    }

    async goToApp(){
        await this.page.goto('/', {waitUntil: 'domcontentloaded'})
    }

    getHomePage(){
        return this.homePage;
    }

    getLoginForm(){
        return this.loginForm;
    }

    getCreateRoom(){
        return this.createRoom;
    }

    getEditRoom(){
        return this.editRoom;
    }
}