/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2407785",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2407785",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "2407785_Dish" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "AttributeComparatorCondition",
  "parameters" : [ {
    "id" : "Attribute1",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "2407785_ProductStyleNumber"
  }, {
    "id" : "Attribute2",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : null
  }, {
    "id" : "Constant",
    "type" : "java.lang.String",
    "value" : "0"
  }, {
    "id" : "Operator",
    "type" : "java.lang.String",
    "value" : ">"
  } ],
  "pluginType" : "Operation"
}
*/
