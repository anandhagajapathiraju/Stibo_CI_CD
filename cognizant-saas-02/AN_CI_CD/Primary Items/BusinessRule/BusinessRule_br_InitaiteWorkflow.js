/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "br_InitaiteWorkflow",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "br_InitaiteWorkflow",
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
  "pluginId" : "BulkUpdateInitiateMultipleItemsInWorkflow",
  "parameters" : [ {
    "id" : "processNote",
    "type" : "java.lang.String",
    "value" : "Workflow Initiated Successfully"
  }, {
    "id" : "stateFlowID",
    "type" : "java.lang.String",
    "value" : "2133010_parallel_cluster"
  } ],
  "pluginType" : "Operation"
}
*/
