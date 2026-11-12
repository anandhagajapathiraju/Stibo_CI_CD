/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2160152 Business Condition PSN",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2160152 Business Condition PSN",
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
var productStyleNumber = node.getValue("2160152_ProductStleNumber").getSimpleValue();
var productTaxCode = node.getValue("2160152_ProductTaxCode").getSimpleValue();
var errormsg = "";
if((productStyleNumber.trim()==null) || (productStyleNumber.trim()=="")){
	errormsg = errormsg + "\n" + "Please enter Product Tax Code"
}

if(errormsg != ""){
	return errormsg;
}
return true;

}