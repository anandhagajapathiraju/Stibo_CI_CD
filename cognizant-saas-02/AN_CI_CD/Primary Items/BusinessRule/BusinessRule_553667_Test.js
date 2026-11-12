/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "553667_Test",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "553667_Validate Style Number and Tax Code",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "553667_Level4" ],
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
var styleNumber=node.getValue("553667_ProductStyleNumber");
var taxCode=node.getValue("553667_ProductTaxCode");
if(!styleNumber || !styleNumber.getSimpleValue() || !taxcode || !taxCode.getSimpleValue())
{
	return "Product Style Number and Product Tax Code must not be empty."
}
return true;

}