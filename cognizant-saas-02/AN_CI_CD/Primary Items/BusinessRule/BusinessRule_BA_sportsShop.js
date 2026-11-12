/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "BA_sportsShop",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "sportsShop",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "05_LawnTennis", "05_bat", "05_cricket" ],
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



logger.info("ID--> "+node.getID());
}
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
exports.operation1 = function (node) {
var vendorCity = node.getValue("ATTR_vendorCity").getSimpleValue();
logger.info("vendorCity--> "+vendorCity);
node.getValue("ATTR_vendorCity").setSimpleValue("Chennai");
vendorCity = node.getValue("ATTR_vendorCity").getSimpleValue();
logger.info(" New vendorCity--> "+vendorCity);
}