/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "121835_VibeCoding1",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "121835_VibeCoding1",
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
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,step) {
//121835 - Vibe Coding - Product Validation Script
var productStyleNumber = node.getValue("2093249_ATR_ProductStyleNumber").getSimpleValue();
var productTaxCode = node.getValue("2093249_ATR_ProductTaxCode").getSimpleValue();
var errormsg = "";
if((productStyleNumber.trim()==null) ||(productStyleNumber.trim()=="")){
	errormsg = "Product Style Number is mandatory field, Please populate it and submit."
}
if((productTaxCode.trim()==null) ||(productTaxCode.trim()=="")){
	errormsg = errormsg +"\n"+ "Product Tax Code is mandatory field, Please populate it and submit."
}

if(errormsg != ""){
	return errormsg;
}
return true;
}