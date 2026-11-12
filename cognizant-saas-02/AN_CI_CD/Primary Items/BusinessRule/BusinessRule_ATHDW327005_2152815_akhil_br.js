/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ATHDW327005_2152815_akhil_br",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ATHDW327005_2152815_akhil_br",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
var PSN = node.getValue("2152815_Product Style Number").getSimpleValue();
var PTC = node.getValue("2152815_product Tax Code").getSimpleValue();

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