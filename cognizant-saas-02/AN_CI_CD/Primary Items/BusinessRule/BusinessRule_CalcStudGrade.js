/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "CalcStudGrade",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "CalcStudGrade",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Students_Satya" ],
  "allObjectTypesValid" : false,
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



var avg = node.getValue("Average_StudentMark").getSimpleValue();

var resultGrade = "";


if(avg <20) {
    resultGrade = "Fail";
}
else if (avg >= 40 && avg <= 50) {
    resultGrade = "A";
} else if (avg >= 30 && avg < 40) {
    resultGrade = "B";
} else if (avg >= 20 && avg < 30) {
    resultGrade = "C";
} 
node.getValue("Student_Grade").setSimpleValue(resultGrade);
}