import { Page, Locator, expect } from '@playwright/test';
import { count } from 'node:console';

export class checkoutPage{

    page:Page;
    title_productName: Locator;
    CreditcardNumber: Locator;
    expiry_month:Locator;
    expiry_day:Locator;
    cvv_code:Locator;
    name_card:Locator;
    select_country:Locator;
    place_order:Locator;
    heading_confirmation:Locator;
    btn_signOut:Locator;



    constructor(page:Page)
    {
        this.page= page;
        this.title_productName= page.locator("//div[@class='item__title']");
        this.CreditcardNumber= page.getByRole('textbox').first();
        this.expiry_month= page.getByRole('combobox').first();
        this.expiry_day= page.getByRole('combobox').nth(1);
        this.cvv_code= page.getByRole('textbox').nth(1);
        this.name_card= page.getByRole('textbox').nth(2);
        this.select_country= page.locator("input[placeholder='Select Country']");
        this.place_order= page.getByText('Place Order');
        this.heading_confirmation = page.getByRole('heading', { name: 'Thankyou for the order.' });
        this.btn_signOut= page.getByRole('button', { name: 'Sign Out' });
    }

    async check_title(productName:string)
    {
        await expect(this.title_productName).toContainText(productName);
    }

    async check_cardNumber()
    {
        await expect(this.CreditcardNumber).toBeVisible();
    }

    async enter_month_year(month:string, day:number, cvv:number, cardname: string)
    {
        await this.expiry_month.selectOption(month);
        await this.expiry_day.selectOption(day.toString());
        await this.cvv_code.fill(cvv.toString());
        await this.name_card.fill(cardname);
    }

    async select_count(country:string, details:string )
    {
        await this.select_country.pressSequentially(details,{delay:150});
        const dropdown = this.page.locator(".ta-results")
        await dropdown.waitFor();
        const optionCount= await dropdown.locator("button").count();
        for(let i=0;i< optionCount; ++i)
        {
        const text= await dropdown.locator("button").nth(i).textContent();
        if(text === country)
        {
            await dropdown.locator('button').nth(i).click();
            break;
        }
        }
    }

    async click_placeOrder()
    {
        await this.place_order.click();
    }

    async checking_heading()
    {
        await expect(this.heading_confirmation).toBeVisible()
    }

    async click_logout()
    {
        await this.btn_signOut.click();
    }
}