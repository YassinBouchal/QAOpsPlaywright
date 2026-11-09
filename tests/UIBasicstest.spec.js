const {test, expect} = require('@playwright/test');
const { request } = require('node:http');

test('Browser Context Playwright test', async ({browser})=>
{
    const context = await browser.newContext(); // if you don't provide any context, no need to use this
    const page = await context.newPage(); // same here, given by default if no context set
    //page.route("**/*.{jpg, png, jpeg}", route => route.abort());

    const userName = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    
    /* page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status())); */

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());

    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    // fill correct username
    await userName.fill(""); // to empty the field
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    console.log(await cardTitles.first().textContent()); // or .nth(0)
    console.log(await cardTitles.nth(1).textContent()); // or .frst()

    /**
     * allTextContents() does not auto-wait for elements. It immediately returns the text of all matched elements
     * (or an empty array [] if none are found). Methods like textContent(), innerText(), or click() 
     * benefit from Playwright's auto-waiting mechanism.
     */
    const allTitles = await cardTitles.allTextContents(); 
    
    console.log(allTitles);

});

test('Page Playwright test', async ({page})=>
{
    await page.goto("https://google.com")
    // Get title and print it in console
    console.log("Title is " + await page.title());
    await expect(page).toHaveTitle("Google");

});

test('UI Controls', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const userRadio = page.locator(".radiotextsty").last();
    const okBtn = page.locator("#okayBtn");
    const terms = page.locator("#terms");
    const documentLink = page.locator("[href*='documents-request']");

    await dropdown.selectOption("consult");
    await userRadio.click();
    await okBtn.click();

    // assert that the User radio button has been correctly checked
    console.log("User radiobutton is checked: " + await userRadio.isChecked());
    expect(userRadio).toBeChecked();
    await terms.click();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    //or
    expect (terms).not.toBeChecked();

    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    

    //await page.pause();
}
);

test("Child windows handling", async({browser})=>
{

    const context = await browser.newContext(); 
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),//listen for any new page pending, rejected, fulfilled
            // this listener has to happen before the click because it has to listen for an event before it happened
            documentLink.click() // new page is opened
        ]
    );

    const textInRed = await newPage.locator(".red").textContent();
    console.log(textInRed);

    const arrayText = textInRed.split("@");
    const text = arrayText[1].split(" ")[0];
    console.log(text);


    /* const emailFromText = await newPage.locator(".red strong").textContent();
    console.log(emailFromText); */
    
    // Fill the email input with the extracted email address from the second page
    await userName.fill(text);
    console.log(await userName.inputValue());

}
);



