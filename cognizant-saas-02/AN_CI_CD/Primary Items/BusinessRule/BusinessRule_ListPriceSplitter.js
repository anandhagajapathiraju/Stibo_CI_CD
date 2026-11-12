/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ListPriceSplitter",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ListPriceSplitter",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "InboundBusinessProcessorSplitterSourceBindContract",
    "alias" : "splitterSource",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "InboundBusinessProcessorSplitterResultBindContract",
    "alias" : "splitterResult",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (splitterSource,splitterResult) {
// Splitter source bound to splitterSource
// Splitter Result bound to splitterResult

var ite = splitterSource.lines();
while (ite.hasNext()) {
  splitterResult.addMessage(ite.next());

}
}