import { Locator, Page, expect } from "@playwright/test";

export class ProductPage{

    page:Page;
    Product_HM:Locator;
    Product_Tshirt:Locator;
    AddCart:Locator;
    View_Cart:Locator;

    constructor(page:Page)
    {
        this.page= page;
        this.Product_HM= page.getByRole('link', { name: '(5) H&M' });
        this.Product_Tshirt= page.getByRole('link', { name: ' View Product' }).nth(3);
        this.AddCart= page.getByRole('button', { name: ' Add to cart' });
        this.View_Cart= page.getByRole('link', { name: 'View Cart' });
    }

    async ClickBrandHM()
    {
        await expect(this.page.getByRole('heading', { name: 'Brands' })).toBeVisible({timeout:2000});
        await this.Product_HM.click();
        await expect(this.page.getByRole('heading', { name: 'Brand - H&M Products' })).toBeVisible({timeout:2000});
    }

    async clickTShirtBrand()
    {
       await this.Product_Tshirt.click();
       await expect(this.page.getByRole('heading', { name: 'Pure Cotton Neon Green Tshirt' })).toContainText('Cotton Neon Green')
    }

    async clickAddToCart()
    {
        await this.AddCart.click();
        await expect(this.page.getByText('Your product has been added')).toBeVisible({timeout:2000});
     }

     async click_View_Cart()
     {
        await this.View_Cart.click();
     } 
}