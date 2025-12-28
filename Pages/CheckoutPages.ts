import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPages{

     page:Page;
     Proceed_Checkout:Locator;
     Item_place: Locator
     place_Order: Locator;

     constructor(page:Page)
     {
        this.page= page;
        this.Proceed_Checkout= page.getByText('Proceed To Checkout');
        this.Item_place= page.getByRole('link', { name: 'Pure Cotton Neon Green Tshirt' });
        this.place_Order= page.getByRole('link', { name: 'Place Order' });
     }

     async ProceedToCheckout()
     {
        await this.Proceed_Checkout.click();
        await expect(this.Item_place).toBeVisible({timeout:2000});
    }

    async PlaceToOrder()
    {
        await this.place_Order.click();
    }

}