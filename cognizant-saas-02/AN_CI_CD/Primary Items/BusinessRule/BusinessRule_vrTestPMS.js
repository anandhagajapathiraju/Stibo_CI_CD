/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "vrTestPMS",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "vrTestPMS",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "vrHotel" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "ManagerBindContract",
    "alias" : "step",
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
exports.operation0 = function (step,node) {
var root = step.getEntityHome().getEntityByID("PropertyChargeCodeMappings");
for (i = 0; i < 5000; i++){
	var child = root.createEntity("","vrChargeCodeMappingTest");
	child.getValue("vrCTACEligible").setLOVValueByID("Y");
	child.getValue("vrPSAccountCode").setSimpleValue("396101");
	child.getValue("vrPSAccountName").setSimpleValue("Transient Sales");
	child.getValue("vrPMSChargeCode").setSimpleValue(10000+i);
	child.getValue("vrPMSChargeCodeDesc").setSimpleValue("dummy description");
	child.getValue("vrPSDepartmentCode").setSimpleValue("0010");
	child.getValue("vrPSDepartmentName").setSimpleValue("Rooms");
	child.getValue("vrLoyaltyEligible").setLOVValueByID("Y");
	child.getValue("vrIncidentalFlag").setLOVValueByID("Y");
	child.getValue("vrMappingEffectiveDate").setSimpleValue("2024-05-01");
	node.createReference(child, "vrPropertyChargeCodeMappingsTest");
}

}