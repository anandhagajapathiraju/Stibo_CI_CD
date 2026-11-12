/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ProfileCheck",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ProfileCheck",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
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
    "value" : "2114376_ATR_ProductNumber"
  }, {
    "id" : "Attribute2",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : null
  }, {
    "id" : "Constant",
    "type" : "java.lang.String",
    "value" : "1212"
  }, {
    "id" : "Operator",
    "type" : "java.lang.String",
    "value" : "="
  } ],
  "pluginType" : "Operation"
}
*/
