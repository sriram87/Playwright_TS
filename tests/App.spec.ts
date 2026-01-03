import { test, expect } from '@playwright/test';
import { Excelutils } from '../Utils/Excelutils';
import path from 'path';

const filepath= path.join(__dirname, "../TestData/excel.xlsx")
const sheetname = "Login";

test.describe("Excel-driven tests", ()=>{
let product: any[]
test.beforeAll( async()=> { 
  product = await Excelutils.getExcelData(filepath,sheetname);
});
{
test('Run Excel parameterized tests', async({page})=>{

    for (const data of product)
    {
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill(data.email);
    await page.locator('#userPassword').fill(data.password)
    await page.locator('#login').click();    
    await page.locator('.card-body').last().waitFor();
    const products= page.locator(".card-body");
    const countofproduct= await products.count();
    for(let i=0;i<countofproduct;i++)
    {
         const productText= await products.nth(i).locator('b').textContent();
         if(productText === data.productName)
         {
            await products.nth(i).locator('button').last().click();
            break;
         }

    } 
    await page.locator("[routerlink*='cart']").click();
    await page.getByRole('heading', {name:data.productName}).waitFor();
    await expect(page.getByRole('heading', {name:data.productName})).toBeVisible();
    await page.getByRole('button', { name: 'Checkout❯' }).click();
    await expect(page.getByRole('textbox').first()).toBeVisible()
    let months= page.getByRole('combobox').first()
    await months.selectOption("04")
    let dates = page.getByRole('combobox').nth(1)
    await dates.selectOption("18")
    await page.getByRole('textbox').nth(1).fill('1234')
    await page.getByRole('textbox').nth(2).fill('Sr');
    await page.locator("input[placeholder='Select Country']").pressSequentially('ind',{delay:150});
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor();
    const optionCount= await dropdown.locator("button").count();
    for(let i=0;i< optionCount; ++i)
    {
        const text= await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(1000);
    await page.getByText('Place Order').click();
    await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();
    await page.getByRole('button', { name: 'Sign Out' }).click();
}
});
}
});

