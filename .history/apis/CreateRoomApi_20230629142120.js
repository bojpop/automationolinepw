export class CreateRoomApi {
    async createRoomApi(request, roomname, roomprice, roomtype, roomaccessible, features){
        const response = await request.post('/'+'room/',{
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
