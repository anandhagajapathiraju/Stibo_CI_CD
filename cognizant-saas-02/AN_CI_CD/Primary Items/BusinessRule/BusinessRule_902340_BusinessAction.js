/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "902340_BusinessAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "902340_Business Action",
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
var Disc = node.getValue("TopVar_Disc").getSimpleValue();
var Ram = node.getValue("TopRAM").getSimpleValue();
var flag = 0;
if (Ram == '6 GB'&& Disc == null) {
	logger.info("Disc is 5%");
	flag = 1
	
}
else{
	logger.info("Please enter the Discount");
}
if (flag == 1){
	node.getValue("TopVar_Disc").setSimpleValue(5);
	logger.info("ok");

}
}