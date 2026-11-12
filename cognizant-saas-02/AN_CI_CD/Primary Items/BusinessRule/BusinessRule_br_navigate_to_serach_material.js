/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "br_navigate_to_serach_material",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "Navigate to Material Search",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
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
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "web",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,web) {
/*childNode = node.createProduct("", "2138401_ABZOfficeIncSalesItem");
childNode.setName(name);
childNode.startWorkflowByID("2138401_ABZOfficeInc_Workflow", "");
childNode.getTaskByID("2138401_ABZOfficeInc_Workflow", "2138401_Initial").triggerByID("Proceed", "");*/
//web.navigate("homepage", null);
web.navigate("Product Edit Screen", node);
//web.showAlert("SUCCESS", "Success", "The new Sales Item has been initiated into 'Approve Product Information' state");
}