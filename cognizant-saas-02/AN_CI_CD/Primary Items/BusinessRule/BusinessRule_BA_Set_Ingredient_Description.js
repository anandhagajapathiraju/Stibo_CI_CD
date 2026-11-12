/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "BA_Set_Ingredient_Description",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "BA_Set_Ingredient_Description",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "CTHDW032116_2107533_l4" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Trigger",
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
    "value" : "Auto Updated"
  }, {
    "id" : "ToAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "WB_2017533_id"
  } ],
  "pluginType" : "Operation"
}
*/
