/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "SampleUpdates",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "Sample Updates",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "PoC_SKU", "Web_Category" ],
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
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "attrObj",
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
exports.operation0 = function (node,log,attrObj,step) {
var parentObj = node.getParent().getID();
log.info(parentObj);

//var publishDateValue = node.getValue(attrObj).getSimpleValue();
var publishDateValue = node.getValue("Publish_Date").getSimpleValue();

var club = node.getValue("Club_LOV").getSimpleValue();

if(club == "India"){

node.getValue("Club_Height").setSimpleValue("6");
	
}else{
	node.getValue("Club_Height").setSimpleValue("5");'
	
}


}