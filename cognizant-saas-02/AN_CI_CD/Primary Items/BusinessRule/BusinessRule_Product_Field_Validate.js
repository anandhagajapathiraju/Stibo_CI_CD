/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Product_Field_Validate",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2416138_Validate Style Number and Tax Code",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "2416138_Level4" ],
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
var styleNumber=node.getValue("2416138_Product_Style_Number");
var taxCode=node.getValue("2416138_Product_Tax_Code");
if(!styleNumber || !styleNumber.getSimpleValue() || !taxcode || !taxCode.getSimpleValue())
{
	return "Product Style Number and Product Tax Code must not be empty."
}
return true;
}