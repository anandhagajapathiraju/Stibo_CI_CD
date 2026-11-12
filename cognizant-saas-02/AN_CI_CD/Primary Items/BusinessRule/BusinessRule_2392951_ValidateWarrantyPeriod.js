/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2392951_ValidateWarrantyPeriod",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2392951_ValidateWarrantyPeriod",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "currentObject",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (currentObject) {
var warrantyApplicable = currentObject
    .getValue("2392951_WarrantyApplicable")
    .getSimpleValue();

var warrantyPeriod = currentObject
    .getValue("2392951_WarrantyPeriod")
    .getSimpleValue();

var warrantyIsYes =
    warrantyApplicable != null &&
    String(warrantyApplicable).trim() == "Yes";

var warrantyPeriodMissing =
    warrantyPeriod == null ||
    String(warrantyPeriod).trim() == "";

if (warrantyIsYes && warrantyPeriodMissing) {
    return "Warranty Period must be entered when Warranty Applicable is Yes.";
}

return true;
}