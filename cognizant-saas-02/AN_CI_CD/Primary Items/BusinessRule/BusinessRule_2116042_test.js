/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2116042_test",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2116042_test",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {

var Sub1=node.getValue("2116042_Mark1").getSimpleValue();
var Sub2=node.getValue("2116042_Mark2").getSimpleValue();
var Sub3=node.getValue("2116042_Mark3").getSimpleValue();
var sum=parseInt(Sub1)+parseInt(Sub2)+parseInt(Sub3);
log.info(sum);
var avg=sum/3;
log.info(avg);

if(avg >= 90)
{
	node.getValue("2116042_Grade").setSimpleValue("A");
}
else if(avg>=70 && avg<=89){
	node.getValue("2116042_Grade").setSimpleValue("B");
}
else if(avg>=40 && avg<=69){
	node.getValue("2116042_Grade").setSimpleValue("C");
}
else{
	node.getValue("2116042_Grade").setSimpleValue("Fail");
}

}