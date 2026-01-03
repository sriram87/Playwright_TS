import { test, expect } from '@playwright/test';
import { Excelutils } from '../Utils/Excelutils';
import path from 'path';
import { Loginpage } from '../Page/Loginpage';
import { homePage } from '../Page/homePage';
import { checkoutPage } from '../Page/checkoutPage';

const filepath= path.join(__dirname, "../TestData/excel.xlsx")
const sheetname = "Login";

test.describe("Excel-driven tests", ()=>{
let products: any[]
let login;
let homepage;
let checkout;

test.beforeAll( async()=> { 
  products = await Excelutils.getExcelData(filepath,sheetname);
});

test('Run Excel parameterized tests', async({page})=>{

    for (const data of products)
    {
        login= new Loginpage(page);
        await login.goto('https://rahulshettyacademy.com/client');
        await login.Enter_email_and_password(data.email,data.password);
        await login.Click_login();
        // await login.product_name_visible();
        homepage = new homePage(page);
        await homepage.searchProducts(data.productName);
        await homepage.click_addToCart();
        await homepage.click_checkoutButton();
        checkout= new checkoutPage(page);
        await checkout.check_title(data.productName);
        await checkout.check_cardNumber();
        await checkout.enter_month_year(data.month,data.day, data.cvv, data.cardname)
        await checkout.select_count( data.country,data.details)
        await checkout.click_placeOrder();
        await checkout.checking_heading();
        await checkout.click_logout();
    }   
    });        

});