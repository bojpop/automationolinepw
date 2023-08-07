export class HomePage {
    constructor(page){
        this.getAdminLink = page.getByRole('link', { name: 'Admin panel', exact: true });
    }

    

    async goToAdminPanel(){
        await this.getAdminLink.click();
    }
}