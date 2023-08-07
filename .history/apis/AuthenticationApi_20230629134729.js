export class AuthenticationApi{
    constructor(request){
        this.request = request;
    }
    async loginApi(username, password){
        const response = await this.request.post('/'+'auth/login/',{
            data: {
                username: username,
                password: password
            }
        })
        return response;
    }
}