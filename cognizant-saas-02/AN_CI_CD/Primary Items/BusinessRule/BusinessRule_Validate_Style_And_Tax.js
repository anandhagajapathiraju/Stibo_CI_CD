/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Validate_Style_And_Tax",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ABC Validate Style and Tax Code",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
// 1. Fetch the values of both attributes from the product
var styleNum = node.getValue("ABC_Product_Style_Number").getSimpleValue();
var taxCode = node.getValue("ABC_Product_Tax_Code").getSimpleValue();

var errorMessages = [];

// 2. Check if Style Number is missing
if (!styleNum || styleNum.trim() == "") {
    errorMessages.push("Product Style Number is required.");
}

// 3. Check if Tax Code is missing
if (!taxCode || taxCode.trim() == "") {
    errorMessages.push("Product Tax Code is required.");
}

// 4. If anything is missing, block the user and show the error
if (errorMessages.length > 0) {
    return errorMessages.join(" and ");
}

// 5. If everything looks good, let them pass!
return null;
}