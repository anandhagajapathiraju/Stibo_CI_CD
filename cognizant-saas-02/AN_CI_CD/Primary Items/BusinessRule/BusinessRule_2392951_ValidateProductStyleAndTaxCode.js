/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2392951_ValidateProductStyleAndTaxCode",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2392951 Validate Product Style Number and Product Tax Code",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "2392951_Product" ],
  "allObjectTypesValid" : false,
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
    "alias" : "currentObject",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (currentObject) {
var styleNumber = currentObject
    .getValue("2392951_ProductStyleNumber")
    .getSimpleValue();

var taxCode = currentObject
    .getValue("2392951_ProductTaxCode")
    .getSimpleValue();

var styleMissing =
    styleNumber == null || String(styleNumber).trim() == "";

var taxCodeMissing =
    taxCode == null || String(taxCode).trim() == "";

if (styleMissing && taxCodeMissing) {
    return "Product Style Number and Product Tax Code must not be empty.";
}

if (styleMissing) {
    return "Product Style Number must not be empty.";
}

if (taxCodeMissing) {
    return "Product Tax Code must not be empty.";
}

return true;
``
}