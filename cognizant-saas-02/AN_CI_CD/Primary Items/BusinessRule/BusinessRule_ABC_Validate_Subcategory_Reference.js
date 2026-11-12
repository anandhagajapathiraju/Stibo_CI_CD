/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ABC_Validate_Subcategory_Reference",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ABC Validate Subcategory Reference",
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
  }, {
    "contract" : "ClassificationProductLinkTypeBindContract",
    "alias" : "refType",
    "parameterClass" : "com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl",
    "value" : "ABC_Product_To_Subcategor",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,refType) {
var referenceLink = node.getClassificationProductLinks().get(refType);

if (referenceLink == null) {
    return "Validation Error: You must link this product to a Web Subcategory in the references section before approving base information.";
}

// --- NEW STYLE & TAX CODE VALIDATION ---
var styleNum = node.getValue("ABC_Product_Style_Number").getSimpleValue();
var taxCode = node.getValue("ABC_Product_Tax_Code").getSimpleValue();

if (!styleNum || styleNum.trim() == "") {
    throw "Validation Failed: Product Style Number is required.";
}
if (!taxCode || taxCode.trim() == "") {
    throw "Validation Failed: Product Tax Code is required.";
}



return true;
}