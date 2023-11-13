export class BookingRoomAPI {
    constructor(page){
        this.page = page;
    }
    async bookRoomApi(request, firstname, lastname, roomid, email, phone, checkin, checkout){
        const response = await request.post('/'+'booking/',{
            data: {
                firstname: firstname,
                lastname: lastname,
                roomid: roomid,
                email: email,
                phone: phone,
                bookingdates: {
                    checkin: checkin,
                    checkout: checkout
                }
            }
        })
        return response;
    }
}