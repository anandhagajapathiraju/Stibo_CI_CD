/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Aplple_cond",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "Aplple_cond",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
var appleID = node.getValue("apple_id").getSimpleValue();

// Check if the value is empty or doesn't start with 'APP-'
if (!appleID || !appleID.startsWith("APP-")) {
    return true; // Condition is met (meaning the ID is invalid)
}
return false;
}