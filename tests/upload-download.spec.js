import { Workbook } from 'exceljs';
import { expect, test } from "@playwright/test";


async function writeExcel(searchText, replaceText, change, filePath) {

    const workbook = new Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const cellZone = await readExcel(worksheet, searchText);
    console.log('Search:', searchText);
    console.log('Result:', cellZone);

    if (cellZone.row === -1 || cellZone.column === -1) {
        throw new Error(`"${searchText}" not found in worksheet`);
    }

    const cell = worksheet.getCell(cellZone.row, cellZone.column + change.changeCol);
    cell.value = replaceText;
    // Save the file
    await workbook.xlsx.writeFile(filePath);

    //console.log("Text '" + searchText + "' has been replaced by '" + replaceText + "' at coordinates [" + cellZone.row + "," + cellZone.column + "].")

};

function readExcel(worksheet, searchText) {
    const cellZone = {
        row: -1,
        column: -1
    };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log("FOUND");
                cellZone.row = rowNumber;
                cellZone.column = colNumber;
            }
        })
    });

    return cellZone;
}

// Update Mango price to 350
//writeExcel("Mango", 350, {changeRow: 0, changeCol: 2}, "./excelDownloadTest.xlsx");

test("Upload download excel validation", async ({ page }) => {
    const textSearch = "Mango";
    const updateValue = "350";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    // Download file
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", { name: "Download" }).click();
    const download = await downloadPromise; // waits until the file is fully downloaded
    /*const filePath = await download.path();
    console.log(filePath);*/
    const downloadPath = `./downloads/${await download.suggestedFilename()}`;
    await download.saveAs(downloadPath);
    console.log(downloadPath);  
    // Update file
    writeExcel(textSearch, updateValue, { changeRow: 0, changeCol: 2 }, downloadPath);
    // Upload updated file
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath); // only if type="file"
    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);


});


