/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2138401_InitiateWF",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2138401 Initiate Product into WF",
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
    "contract" : "ManagerBindContract",
    "alias" : "step",
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
exports.operation0 = function (node,step,web) {
if(!node.isInWorkflow("2138401_ABZOfficeInc_Workflow")){
	node.startWorkflowByID("2138401_ABZOfficeInc_Workflow", "ghoeiqhro");
	logger.info("Product intiated");
	web.showAlert("SUCCESS", "Success", "Product has been initiated into Enrichment Proccess!");
	web.navigate("homepage", null);
	node.getTaskByID("2138401_ABZOfficeInc_Workflow", "2138401_Initial").triggerByID("Proceed", "");
	logger.info("Product into Enrichment State");
}else{
	logger.info("Already in workflow");
	web.showAlert("ACKNOWLEDGEMENT", "Info!", "The product is already in the enrichment process!");	
}
}