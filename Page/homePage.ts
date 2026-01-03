import { Locator, Page, expect } from "@playwright/test";

export class homePage{

    page:Page;
    products: Locator;
    add_to_cart: Locator;
    checkout_button:Locator;
    
    constructor(page:Page)
    {
        this.page= page;
        this.products= page.locator(".card-body");
        this.add_to_cart= page.locator("[routerlink*='cart']");
        this.checkout_button= page.getByRole('button', { name: 'Checkout❯' });
   }

   async searchProducts(productName:string)
   {
    await this.products.last().waitFor()

    const countofProducts= await this.products.count();

    for ( let i=0; i<countofProducts;i++)
    {
        const productText= await this.products.nth(i).locator('b').textContent();
        if (productText == productName)
        {
            await this.products.nth(i).locator('button').last().click();
            break;
        }
    }
   }

    async click_addToCart()
   {
        await this.add_to_cart.click();
   }
   

   async click_checkoutButton()
   {
    await this.checkout_button.click();
   }

}