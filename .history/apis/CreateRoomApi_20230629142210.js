export class CreateRoomApi {
    constructor(request){
        this.request = request;
    }
    async createRoomApi(request, roomname, roomprice, roomtype, roomaccessible, features){
        const response = await this.request.post('/'+'room/',{
            data: {
                roomName: roomname,
                roomPrice: roomprice,
                type: roomtype,
                accessible: roomaccessible,
                features: features
            }
        })
        return response;
    }
}