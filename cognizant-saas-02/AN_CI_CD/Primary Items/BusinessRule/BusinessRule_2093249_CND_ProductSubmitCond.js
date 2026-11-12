/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2093249_CND_ProductSubmitCond",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2093249 - Product Submit Condition",
  "description" : "Business Condition to Validate Product Style Number and Product Tax Code shoulb not be blank before Submit.",
  "scope" : "Global",
  "validObjectTypes" : [ "2093249_Level4_Product" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
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

//2093249- Product Submit Condition
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