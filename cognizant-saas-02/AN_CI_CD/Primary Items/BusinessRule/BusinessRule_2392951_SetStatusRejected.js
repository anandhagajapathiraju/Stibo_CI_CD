/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2392951_SetStatusRejected",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2392951_SetStatusRejected",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "2392951_Product" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "SetAttributeValueBusinessAction",
  "parameters" : [ {
    "id" : "FromAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : null
  }, {
    "id" : "FromWorkflow",
    "type" : "com.stibo.core.domain.state.unstable.stateflow.StateFlow",
    "value" : null
  }, {
    "id" : "FromWorkflowVariableName",
    "type" : "java.lang.String",
    "value" : ""
  }, {
    "id" : "TextValue",
    "type" : "java.lang.String",
    "value" : "Rejected"
  }, {
    "id" : "ToAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "2392951_ProductReviewStatus"
  } ],
  "pluginType" : "Operation"
}
*/
