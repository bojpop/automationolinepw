 export class Authentication{
    constructor(page){
        this.page = page;
        this.loginButton = page.getByTestId('submit');
        this.userName = page.getByTestId('username');
        this.password = page.getByTestId('password');
        this.loginSuccess = page.getByRole('link', { name: 'Logout' })
        this.errorRedBorder = "border: 1px solid red;"
        this.loginSuccesText = "Logout"
    }

    async login(username, password){
        await this.userName.type(username);
        await this.password.type(password);
        await this.loginButton.click()
    }

    // async loginApi(request, username, password){
    //     const response = await request.post('/'+'auth/login/',{
    //         data: {
    //             username: username,
    //             password: password
    //         }
    //     })
    //     return response;
    // }
}