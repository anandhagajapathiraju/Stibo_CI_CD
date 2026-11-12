/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ListPriceNodeHandler",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ListPriceNodeHandler",
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
    "contract" : "OutboundBusinessProcessorNodeHandlerSourceBindContract",
    "alias" : "nodeHandlerSource",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorNodeHandlerResultBindContract",
    "alias" : "nodeHandlerResult",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorExecutionReportLoggerBindContract",
    "alias" : "executionReportLogger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (nodeHandlerSource,nodeHandlerResult,executionReportLogger) {
var node = nodeHandlerSource.getNode();
if (node != null && node instanceof com.stibo.core.domain.Product) {
  executionReportLogger.logInfo("Node handler handling product with URL: " + node.getURL());
  var document = builder.newDocument();
}
}