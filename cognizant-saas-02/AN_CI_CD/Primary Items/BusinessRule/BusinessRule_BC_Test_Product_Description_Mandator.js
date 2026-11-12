/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "BC_Test_Product_Description_Mandator",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "BC_Test_Product_Description_Mandatory",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "CTHDW032116_2107533_l4", "TEST_PRODUCTS" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "ValidateBefore",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "AttributeComparatorCondition",
  "parameters" : [ {
    "id" : "Attribute1",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "CTHDW032116_2107533_pd"
  }, {
    "id" : "Attribute2",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : null
  }, {
    "id" : "Constant",
    "type" : "java.lang.String",
    "value" : ""
  }, {
    "id" : "Operator",
    "type" : "java.lang.String",
    "value" : "<>"
  } ],
  "pluginType" : "Operation"
}
*/
