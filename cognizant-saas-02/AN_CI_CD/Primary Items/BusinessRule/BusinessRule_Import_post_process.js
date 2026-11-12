/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Import_post_process",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "Import_post_process",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Office_product" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
// 1. Make the product name Uppercase
var currentName = node.getName();
if (currentName) {
    node.setName(currentName.toUpperCase());
}

// 2. Automatically Approve the product
node.approve();
}