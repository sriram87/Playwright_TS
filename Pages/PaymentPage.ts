import { Locator, Page, expect } from "@playwright/test";

export class PaymentPage{

     page:Page;
     Name_On_Card:Locator;
     Card_Number: Locator
     CVC_Number: Locator;
     Expiration_Month:Locator;
     Expiration_Year: Locator;
     PayAndConfirm:Locator;
     confirmation_Order:Locator;
     Btn_Continue:Locator;

     constructor(page:Page)
     {
        this.page= page;
        this.Name_On_Card= page.locator('input[name="name_on_card"]');
        this.Card_Number= page.locator('input[name="card_number"]');
        this.CVC_Number= page.getByRole('textbox', { name: 'ex.' });
        this.Expiration_Month= page.getByRole('textbox', { name: 'MM' });
        this.Expiration_Year= page.getByRole('textbox', { name: 'YYYY' });
        this.PayAndConfirm= page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.confirmation_Order= page.getByText('Congratulations! Your order');
        this.Btn_Continue= page.getByRole('link', { name: 'Continue' });
     }

     async verify_PaymentPage()
     {
         await expect(this.page.getByRole('heading', { name: 'Payment' })).toBeVisible();
     }

     async EnterPaymentInformation(card_name: string, cardnum:any, cvc: any, exp_month: any, exp_year: any)
     {
       
        await this.Name_On_Card.fill(card_name);
        await this.Card_Number.fill(cardnum);
        await this.CVC_Number.fill(cvc);
        await this.Expiration_Month.fill(exp_month);
        await this.Expiration_Year.fill(exp_year);
     }

     async Click_Pay_Confirm()
     {
        await this.PayAndConfirm.click();
     }

     async confirm_Order_Continue()
     {
        await expect(this.confirmation_Order).toBeVisible({timeout:2000});
        await this.Btn_Continue.click();
     }



}    