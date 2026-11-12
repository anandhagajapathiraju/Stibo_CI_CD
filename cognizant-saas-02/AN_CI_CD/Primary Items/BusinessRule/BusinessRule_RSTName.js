/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "RSTName",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "RST Name",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "RS _Resort", "SHU_Resort", "SLPhysicalLoaction" ],
  "allObjectTypesValid" : true,
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
var fname=node.getValue("Firstname").getSimpleValue();
var lname=node.getValue("Lastname").getSimpleValue();
node.getValue("ShortDescription").setSimpleValue(fname+lname);
logger.info(fname);
logger.info(node.getValue("ShortDescription").getSimpleValue());
}