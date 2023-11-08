import {Authentication} from './AuthenticationPage'
import {CreateRoom} from './CreateRoomPage'
import {EditRoom} from './EditRoomPage'
import {HomePage} from './HomePage';

export class POManager{
    constructor(page){
        this.page = page;
    }

    getHomePage(){
        return new HomePage(this.page);
    }

    getLoginForm(){
        return new Authentication(this.page);
    }

    getCreateRoom(roomName){
        return new CreateRoom(this.page, roomName);
    }

    getEditRoom(roomName){
        return new EditRoom(this.page, roomName);
    }
}