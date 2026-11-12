/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2159760-business condition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2159760-business condition",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "2159760_L4_Product" ],
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
    "alias" : "Node",
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
exports.operation0 = function (Node,logger) {
var PSN = node.getValue("2159760_Product Style Number").getSimpleValue();
var PTC = node.getValue("2159760_product Tax Code").getSimpleValue();

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