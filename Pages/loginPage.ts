import { Locator, Page} from '@playwright/test';

export class loginPage{

    page:Page;
    login_email:Locator;
    login_password:Locator;
    login_btn:Locator;
   

    constructor(page:Page)
    {
        this.page= page;
        this.login_email= page.locator('input[data-qa="login-email"]');
        this.login_password= page.locator('input[data-qa="login-password"]');
        this.login_btn= page.getByRole('button', {name:'Login'})
   }

    async EnteremailAndpassword(email:any,password:any)
    {
        await this.login_email.fill(email);
        await this.login_password.fill(password);
    }

    async CLickLoginBtn()
    {
        await this.login_btn.click();
    }

    // async Title()
    // {
    //     await this.h2_title.isVisible({timeout:3000})
    // }

} 