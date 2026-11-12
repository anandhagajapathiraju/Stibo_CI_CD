/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ATHDW327005_2159760_Businesscond",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ATHDW327005_2159760_Businesscond",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "2159760_Level-4" ],
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
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger) {
var PSN = node.getValue("2159760_productStyleNumber").getSimpleValue();
var PTC = node.getValue("2159760_productTaxCode").getSimpleValue();

var condition = true;

if(PSN!= null)
{
	logger.info("Product Style Number attribute is not empty");
}
else
{
	logger.info("Product Style Number attribute is empty");
	condition = false;
}

if(PTC!= null)
{
	logger.info("Product Tax Code attribute is not empty");
}
else
{
	logger.info("Product Tax Code attribute is empty");
	condition = false;
}
return condition;

}