import { Locator, Page, expect } from '@playwright/test'

export class Loginpage{

    page: Page;
    email:Locator;
    password:Locator;
    login: Locator;

    constructor (page:Page)
    {
        this.page= page;
        this.email= page.locator('#userEmail')
        this.password= page.locator('#userPassword')
        this.login= page.locator('#login');
    }


    async goto(url:string)
    {
        await this.page.goto(url);
    }

    async Enter_email_and_password(useremail:string, userpassword: string)
    {
        await this.email.fill(useremail);
        await this.password.fill(userpassword);
    }

    async Click_login()
    {
        await this.login.click();
    }


}