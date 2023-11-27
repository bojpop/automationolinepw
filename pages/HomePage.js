export class HomePage {
    constructor(page){
        this.page = page;
        this.getAdminLink = page.getByRole('link', { name: 'Admin panel', exact: true });
        this.nameContactForm = page.getByTestId('ContactName');
        this.emailContactForm = page.getByTestId('ContactEmail');
        this.phoneContactForm = page.getByTestId('ContactPhone');
        this.subjectContactForm = page.getByTestId('ContactSubject');
        this.messageContactForm = page.getByTestId('ContactDescription');
        this.submitContactForm = page.getByRole('button', { name: 'Submit' });
        this.successfullySubmited = page.getByText('We\'ll get back to you about');
        this.invalidPhoneNumberError = page.getByText('Phone must be between 11 and 21 characters.');
        this.invalidSubjectError = page.getByText('Subject must be between 5 and 100 characters.');
        this.invalidMessageError = page.getByText('Message must be between 20 and 2000 characters.');
        this.emptyNameError = page.getByText('Name may not be blank');
        this.emptyEmailError = page.getByText('Email may not be blank');
        this.emptyPhoneError = page.getByText('Phone may not be blank');
        this.emptySubjectError = page.getByText('Subject may not be blank');
        this.emptyMessageError = page.getByText('Message may not be blank');
    }

    async goToApp(){
        await this.page.goto('/', {waitUntil: 'domcontentloaded'})
    }

    async goToAdminPanel(){
        await this.getAdminLink.click();
    }

    async fillAndSubmitContactForm(name, email, phone, subject, message){
        await this.nameContactForm.type(name)
        await this.emailContactForm.type(email)
        await this.phoneContactForm.type(phone)
        await this.subjectContactForm.type(subject)
        await this.messageContactForm.type(message)
        await this.submitContactForm.click()
    }
}