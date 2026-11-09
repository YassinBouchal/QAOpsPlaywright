# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UIBasicstest.spec.js >> UI Controls
- Location: tests\UIBasicstest.spec.js:55:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#terms')
    - locator resolved to <input id="terms" name="terms" type="checkbox"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    62 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e4] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [checked] [ref=e27]
      - combobox [ref=e30]:
        - option "Student"
        - option "Teacher"
        - option "Consultant" [selected]
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
  - generic [ref=e43]:
    - paragraph [ref=e45]: You will be limited to only fewer functionalities of the app. Proceed?
    - generic [ref=e46]:
      - button "Cancel" [ref=e47] [cursor=pointer]
      - button "Okay" [active] [ref=e48] [cursor=pointer]
```

# Test source

```ts
  1   | const {test, expect} = require('@playwright/test');
  2   | const { request } = require('node:http');
  3   | 
  4   | test('Browser Context Playwright test', async ({browser})=>
  5   | {
  6   |     const context = await browser.newContext(); // if you don't provide any context, no need to use this
  7   |     const page = await context.newPage(); // same here, given by default if no context set
  8   |     //page.route("**/*.{jpg, png, jpeg}", route => route.abort());
  9   | 
  10  |     const userName = page.locator('#username');
  11  |     const password = page.locator('[type="password"]');
  12  |     const signIn = page.locator('#signInBtn');
  13  |     const cardTitles = page.locator(".card-body a");
  14  |     
  15  |     /* page.on('request', request => console.log(request.url()));
  16  |     page.on('response', response => console.log(response.url(), response.status())); */
  17  | 
  18  |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  19  |     console.log(await page.title());
  20  | 
  21  |     await userName.fill("rahulshetty");
  22  |     await password.fill("Learning@830$3mK2");
  23  |     await signIn.click();
  24  |     console.log(await page.locator('[style*="block"]').textContent());
  25  |     await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
  26  | 
  27  |     // fill correct username
  28  |     await userName.fill(""); // to empty the field
  29  |     await userName.fill("rahulshettyacademy");
  30  |     await signIn.click();
  31  | 
  32  |     console.log(await cardTitles.first().textContent()); // or .nth(0)
  33  |     console.log(await cardTitles.nth(1).textContent()); // or .frst()
  34  | 
  35  |     /**
  36  |      * allTextContents() does not auto-wait for elements. It immediately returns the text of all matched elements
  37  |      * (or an empty array [] if none are found). Methods like textContent(), innerText(), or click() 
  38  |      * benefit from Playwright's auto-waiting mechanism.
  39  |      */
  40  |     const allTitles = await cardTitles.allTextContents(); 
  41  |     
  42  |     console.log(allTitles);
  43  | 
  44  | });
  45  | 
  46  | test('Page Playwright test', async ({page})=>
  47  | {
  48  |     await page.goto("https://google.com")
  49  |     // Get title and print it in console
  50  |     console.log("Title is " + await page.title());
  51  |     await expect(page).toHaveTitle("Google");
  52  | 
  53  | });
  54  | 
  55  | test('UI Controls', async ({page}) =>
  56  | {
  57  |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  58  | 
  59  |     const userName = page.locator('#username');
  60  |     const password = page.locator('[type="password"]');
  61  |     const signIn = page.locator('#signInBtn');
  62  |     const dropdown = page.locator("select.form-control");
  63  |     const userRadio = page.locator(".radiotextsty").last();
  64  |     const okBtn = page.locator("#okayBtn");
  65  |     const terms = page.locator("#terms");
  66  |     const documentLink = page.locator("[href*='documents-request']");
  67  | 
  68  |     await dropdown.selectOption("consult");
  69  |     await userRadio.click();
  70  |     await okBtn.click();
  71  | 
  72  |     // assert that the User radio button has been correctly checked
  73  |     console.log("User radiobutton is checked: " + await userRadio.isChecked());
  74  |     expect(userRadio).toBeChecked();
> 75  |     await terms.click();
      |                 ^ Error: locator.click: Test timeout of 30000ms exceeded.
  76  |     await expect(terms).toBeChecked();
  77  |     await terms.uncheck();
  78  |     expect(await terms.isChecked()).toBeFalsy();
  79  |     //or
  80  |     expect (terms).not.toBeChecked();
  81  | 
  82  |     await expect(documentLink).toHaveAttribute('class', 'blinkingText');
  83  |     
  84  | 
  85  |     //await page.pause();
  86  | }
  87  | );
  88  | 
  89  | test("Child windows handling", async({browser})=>
  90  | {
  91  | 
  92  |     const context = await browser.newContext(); 
  93  |     const page = await context.newPage();
  94  |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  95  | 
  96  |     const documentLink = page.locator("[href*='documents-request']");
  97  |     const userName = page.locator('#username');
  98  |     
  99  | 
  100 |     const [newPage] = await Promise.all(
  101 |         [
  102 |             context.waitForEvent('page'),//listen for any new page pending, rejected, fulfilled
  103 |             // this listener has to happen before the click because it has to listen for an event before it happened
  104 |             documentLink.click() // new page is opened
  105 |         ]
  106 |     );
  107 | 
  108 |     const textInRed = await newPage.locator(".red").textContent();
  109 |     console.log(textInRed);
  110 | 
  111 |     const arrayText = textInRed.split("@");
  112 |     const text = arrayText[1].split(" ")[0];
  113 |     console.log(text);
  114 | 
  115 | 
  116 |     /* const emailFromText = await newPage.locator(".red strong").textContent();
  117 |     console.log(emailFromText); */
  118 |     
  119 |     // Fill the email input with the extracted email address from the second page
  120 |     await userName.fill(text);
  121 |     console.log(await userName.inputValue());
  122 | 
  123 | }
  124 | );
  125 | 
  126 | 
  127 | 
  128 | 
```