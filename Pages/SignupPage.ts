import { Locator, Page} from '@playwright/test';

export class SignupPage{

    page: Page;
    Signup_login: Locator;
    text_name: Locator;
    text_email: Locator;
    button_Signup: Locator;
    Account_Information: Locator;
    Radio_title: Locator;
    text_password: Locator;
    select_days:Locator;
    select_months:Locator;
    select_years:Locator;
    news_letter:Locator;
    text_first:Locator;
    text_last:Locator;
    text_company:Locator;
    text_address1:Locator;
    text_address2:Locator;
    select_country:Locator;
    text_state:Locator;
    text_city:Locator;
    text_Zipcode:Locator;
    text_mobile:Locator;
    btn_CreateAccount:Locator;
    Continue_Button:Locator;
    logout_Button:Locator
   

    constructor(page:Page){
        this.page= page;
        this.Signup_login = page.getByRole('link', { name: ' Signup / Login' });
        this.text_name= page.getByRole('textbox', { name: 'Name' });
        this.text_email= page.locator('input[data-qa="signup-email"]');
        this.button_Signup= page.getByRole('button', { name: 'Signup' });
        this.Account_Information= page.locator('#form');
        this.Radio_title= page.locator('input[id="id_gender1"]')
        this.text_password= page.locator('input#password')
        this.select_days= page.locator('#days');
        this.select_months=page.locator('#months');
        this.select_years= page.locator('#years');
        this.news_letter= page.getByRole('checkbox', {name:'Sign up for our newsletter!'});
        this.text_first= page.locator('input[id="first_name"]');
        this.text_last= page.locator('input[id="last_name"]');
        this.text_company= page.getByRole('textbox', { name: 'Company', exact: true })
        this.text_address1= page.locator('#address1');
        this.text_address2= page.locator('#address2')
        this.select_country= page.getByLabel('Country * ',{exact: true});
        this.text_state= page.locator('#state');
        this.text_city= page.locator('#city');
        this.text_Zipcode= page.locator('#zipcode');
        this.text_mobile= page.locator('#mobile_number')
        this.btn_CreateAccount= page.getByRole('button', {name:'Create Account'});
        this.Continue_Button= page.locator('a[data-qa="continue-button"]')
        this.logout_Button= page.getByRole('link', {name: 'Logout'});
     }

     async goto(){
        await this.page.goto("https://automationexercise.com/")
     }

     async click_Signup_login()
     {
        await this.Signup_login.click()
     }

    async EnterNameAndEmail(name: string , email: string)
    {
        await this.text_name.fill(name);
        await this.text_email.fill(email);
    } 

    async Click_SignupButton()
    {
        await this.button_Signup.click();
        await this.Account_Information.isVisible({timeout:2000})
    }

    async select_title()
    {
        await this.Radio_title.check();
    }

    async Enter_BasicDetails(pass: any,days: any, months: any ,years: any)
    {
        await this.text_password.fill(pass);
        await this.select_days.selectOption(days);
        await this.select_months.selectOption(months);
        await this.select_years.selectOption(years);
    }

    async Newsletter()
    {
        await this.news_letter.check();
    }

    async Enter_AddressDetails(fname : any, lname: string, company: string, add1: string , add2: string , country: any, city: string, state: string, pincode: any, mobilenumber: any)
    {
        await this.text_first.fill(fname);
        await this.text_last.fill(lname);
        await this.text_company.fill(company);
        await this.text_address1.fill(add1);
        await this.text_address2.fill(add2);
        await this.select_country.selectOption(country);
        await this.text_state.fill(state);
        await this.text_city.fill(city);
        await this.text_Zipcode.fill(pincode);
        await this.text_mobile.fill(mobilenumber);
    }

        async click_createAccount()
        {
            await this.btn_CreateAccount.click()
        }

        async click_continue()
        {
            await this.Continue_Button.click();

        }

        async click_logout()
        {
            await this.logout_Button.click();
        }
}