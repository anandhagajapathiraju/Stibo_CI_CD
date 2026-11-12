/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "noyeed_test",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "noyeed_test",
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
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
exports.operation0 = function (log,node) {
var GTIN = node.getValue("a_GTIN").getSimpleValue();
var isTradeItemRegulationCompliant = node.getValue("a_isTradeItemRegulationCompliant").getSimpleValue();
var regulationRestrictionsAndDescriptors = node.getValue("a_regulationRestrictionsAndDescriptors").getSimpleValue();
log.info(isTradeItemRegulationCompliant);
log.info(regulationRestrictionsAndDescriptors);
log.info(GTIN);
log.info(GTIN.length());

var errors = [];

// Check if GTIN has a length of 14 digits
if (GTIN.length() != 14) {
    errors.push("GTIN length should be 14 digits");
}

// Check if GTIN starts with zero
if (!GTIN.toString().startsWith('0')) {
    log.info("GTIN should start with zero");
    errors.push("GTIN should start with zero");
}

// Check regulation compliance
if (isTradeItemRegulationCompliant == "Yes") {
    if (!regulationRestrictionsAndDescriptors || regulationRestrictionsAndDescriptors.trim() === "") {
        errors.push("Regulation Restrictions And Descriptors should be mandatory");
    }
} else if (isTradeItemRegulationCompliant == "No") {
    if (regulationRestrictionsAndDescriptors && regulationRestrictionsAndDescriptors.trim() !== "") {
        // Save the value without sending an error
        log.info("Regulation Restrictions And Descriptors is set to blank as required");
    }
}

// If there are any errors, return them
if (errors.length > 0) {
    var eText = errors.join("\n");
    errors = [];
    return eText;
}

// Existing rules
if (GTIN.length == 14) {
    log.info("inside 1st if");
    if (GTIN.toString().startsWith('0')) {
        log.info("inside 2nd if");
        return true;
    }
}

}