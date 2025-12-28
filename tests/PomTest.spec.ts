import { test, expect } from '@playwright/test'
import { SignupPage } from '../Pages/SignupPage';
import { loginPage } from '../Pages/loginPage';
import { ProductPage } from '../Pages/ProductPage';
import { CheckoutPages } from '../Pages/CheckoutPages';
import { PaymentPage } from '../Pages/PaymentPage';


let Signup;
let login;
let product;
let checkout;
let Payment;

// test.beforeEach(async({page})=>{
//     Signup= new SignupPage(page);
//     await Signup.goto();
//     await page.waitForLoadState('networkidle')
// })

test('E2E_Functionality', async({page})=>{
    Signup= new SignupPage(page);
    await Signup.goto();
    await page.waitForLoadState('networkidle')
    await Signup.click_Signup_login();
    await expect(page.getByRole('heading',{name:'Login to your account'})).toBeVisible()
    login= new loginPage(page);
    await login.EnteremailAndpassword('Sr211@gmail.com','rock');
    await login.CLickLoginBtn();
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible({timeout:2000});
    await page.waitForTimeout(2000);
    product= new ProductPage(page);
    await product.ClickBrandHM();
    await product.clickTShirtBrand();
    await product.clickAddToCart();
    await product.click_View_Cart();
    checkout= new CheckoutPages(page);
    await checkout.ProceedToCheckout();
    await checkout.PlaceToOrder();
    Payment= new PaymentPage(page);
    await Payment.verify_PaymentPage();
    await Payment.EnterPaymentInformation('Sri','1234561234561234','211', '10','2031');
    await Payment.Click_Pay_Confirm();
    await Payment.confirm_Order_Continue();
    await expect(page.getByRole('heading', { name: 'AutomationExercise' })).toBeVisible();
       await Signup.click_logout();
   })
test("Signup_Functionality", async({page})=>{
    Signup= new SignupPage(page);
    await Signup.click_Signup_login();
    await page.waitForLoadState();
    await Signup.EnterNameAndEmail('Sr', 'Sr211@gmail.com');
    await Signup.Click_SignupButton();
    await page.waitForTimeout(2000); 
    await Signup.select_title();
    await Signup.Enter_BasicDetails('rock','15','8','1987');
    await Signup.Newsletter();
    await Signup.Enter_AddressDetails('Sr','Rs','XXX', '54/36 A Vinayaka Apts Luz Street', 'Pallavaram', 'India','TamilNadu','Chennai','600043','1234567812');
    await Signup.click_createAccount();
    await page.waitForTimeout(3000);
    await page.locator('h2[data-qa="account-created"]').isVisible({timeout:3000});
    await Signup.click_continue();
})



// test.afterEach(async({page})=>{
//      Signup= new SignupPage(page);
//      await Signup.click_logout();
// })