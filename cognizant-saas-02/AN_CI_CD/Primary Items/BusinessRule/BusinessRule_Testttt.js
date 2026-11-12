/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Testttt",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "Testttt",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "CT",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ColorTyp1",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,log,CT) {
//var a = node.getValue("ColorTyp1").getSimpleValue();
var a = node.getValues();
//log.info(a.getName());
//var b = node.getValue("ColorTyp1").addValue("Green");

//log.info(b.getSimpleValue());
log.info(a);
//var c = a.asList[].iterator();
//
//while(a.hashNext()){
//	
//	var d = a.next();
//	log.info(d);

//if(a=="White<multisep/>Black<multisep/>Green"){
////	log.info("hiiiii");
//}else{
////	log.info("helloo");
//}
//}
}