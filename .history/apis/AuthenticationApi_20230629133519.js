export class AuthenticationApi{
    constructor(request){
        this.request = request
    }
    async loginApi(request, username, password){
        const response = await request.post('/'+'auth/login/',{
            data: {
                username: username,
                password: password
            }
        })
        return response;
    }
}