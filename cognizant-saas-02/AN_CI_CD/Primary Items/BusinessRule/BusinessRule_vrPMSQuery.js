/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "vrPMSQuery",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "vrPMSQuery",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "vrHotel" ],
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
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "attr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "vrMappingEffectiveDate",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "effdate",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">vrMappingEffectiveDate</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">effdate</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "objtype",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,step,attr,effdate,objtype) {
var c = com.stibo.query.condition.Conditions;
var h = step.getHome(com.stibo.query.home.QueryHome);
var s = h.queryFor(com.stibo.core.domain.entity.Entity).where(
	c.valueOf(attr).eq(effdate)
	.and(c.objectType(objtype))
);
var q = s.execute();

q.forEach(function(e){
	node.createReference(e,"vrPropertyChargeCodeQueryResults");
	return true;
});

}