export class HomePage {
    constructor(page){
        this.getAdminLink = page.getByRole('link', { name: 'Admin panel', exact: true });
    }

    async goToApp(){
        await this.page.goo('/', {waitUntil: 'domcontentloaded'})
    }

    async goToAdminPanel(){
        await this.getAdminLink.click();
    }
}