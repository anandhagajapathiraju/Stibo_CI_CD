/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Santhosh_Action",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "Santhosh_Action",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "2159760_L4_Product" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "TriggerAndApproveNewParts",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "SendEmailBusinessAction",
  "parameters" : [ {
    "id" : "Body",
    "type" : "java.lang.String",
    "value" : "Hi user,\n\nOne of the object is approved. Please log in to step portal UI to know about more details.\n\n\nRegards,\nsanthosh."
  }, {
    "id" : "Recipients",
    "type" : "java.util.List",
    "values" : [ "@kumarmoturi993@gmail.com" ]
  }, {
    "id" : "Sender",
    "type" : "com.stibo.util.basictypes.EmailRecipient",
    "value" : "@santhoshmoturi143@gmail.com"
  }, {
    "id" : "Subject",
    "type" : "java.lang.String",
    "value" : "regarding approval"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "AttributeComparatorCondition",
  "parameters" : [ {
    "id" : "Attribute1",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "2159760_discount"
  }, {
    "id" : "Attribute2",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : null
  }, {
    "id" : "Constant",
    "type" : "java.lang.String",
    "value" : "30"
  }, {
    "id" : "Operator",
    "type" : "java.lang.String",
    "value" : "<"
  } ],
  "pluginType" : "Precondition"
}
*/
