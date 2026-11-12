/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "cognizant_action",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "cognizant_action",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
/**
 * Generates a CSV string formatted for Stibo STEP Import Manager
 */
function generateStiboCSV() {
    // 1. Define your Headers (STEP Attribute IDs / Column Names)
    const headers = ["ProductID", "ParentID", "ObjectType", "ProductName", "Color", "Brand", "Price"];

    // 2. Define your Data Rows
    const data = [
        ["PRD_1001", "NODE_Electronics", "Product", "SuperBlast Headphones", "Black", "AudioPhonic", "149.99"],
        ["PRD_1002", "NODE_Electronics", "Product", "ClearView Monitor", "Silver", "VisionTech", "299.00"],
        ["PRD_1003", "NODE_Appliances", "Product", 'QuickBrew "Deluxe" Maker', "White", "HomeEase", "89.50"] 
    ];

    // 3. Helper to handle escaping (quotes/commas)
    const escapeCSV = (val) => {
        let stringVal = String(val);
        // If value contains quotes, commas, or newlines, wrap in quotes and escape internal quotes
        if (/[",\n\r]/.test(stringVal)) {
            stringVal = `"${stringVal.replace(/"/g, '""')}"`;
        }
        return stringVal;
    };

    // 4. Build the CSV content
    const csvRows = [
        headers.join(','), 
        ...data.map(row => row.map(escapeCSV).join(','))
    ];

    return csvRows.join('\n');
}

// EXECUTION
const csvOutput = generateStiboCSV();
console.log("--- Generated CSV Content ---");
console.log(csvOutput);

/**
 * OPTIONAL: Trigger a download if running in a browser
 */
function downloadCSV(content, fileName) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Uncomment to download in browser:
// downloadCSV(csvOutput, 'stibo_import.csv');
}