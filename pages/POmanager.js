import {Authentication} from './AuthenticationPage'
import {CreateRoom} from './CreateRoomPage'
import {EditRoom} from './EditRoomPage'
import {HomePage} from './HomePage';

export class POManager{
    constructor(page, roomName){
        this.page = page;
        this.roomName = roomName;
    }

    getHomePage(){
        return new HomePage(this.page);
    }

    getLoginForm(){
        return new Authentication(this.page);
    }

    getCreateRoom(){
        return new CreateRoom(this.page, this.roomName);
    }

    getEditRoom(){
        return new EditRoom(this.page, this.roomName);
    }
}