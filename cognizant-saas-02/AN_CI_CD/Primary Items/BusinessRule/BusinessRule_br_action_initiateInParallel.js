/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "br_action_initiateInParallel",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "br_action_initiateInParallel",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Each", "sell_item" ],
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
    "contract" : "WebUiContextBind",
    "alias" : "portal",
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
exports.operation0 = function (portal,step) {
var itmSelectedNodes = portal.getSelection();

step.executeWritePrivileged(function() {
for( var a = 0; a < itmSelectedNodes.size() ;a++){
	var node =itmSelectedNodes.get(a);
	node.startWorkflowByID("2133010_parallel_cluster","Item Initiated in workflow Successfully");
}});
}