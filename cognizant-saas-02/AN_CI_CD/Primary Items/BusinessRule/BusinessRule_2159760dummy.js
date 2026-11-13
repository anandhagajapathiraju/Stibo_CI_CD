/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2159760dummy",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "2159760dummy",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "2236687_CurrentDate",
    "libraryAlias" : "mylab"
  } ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "LOVCrossValidationBusinessCondition",
  "parameters" : [ {
    "id" : "Config",
    "type" : "com.stibo.core.domain.parameter.LOVCrossValidationConfig",
    "value" : "<map>\n  <entry>\n    <key LOVID=\"Blood Group\">lov3839735</key>\n    <value>\n      <set>\n        <element LOVID=\"Gender\">gen3839736</element>\n        <element LOVID=\"Gender\">gen3839737</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"Blood Group\">lov3839733</key>\n    <value>\n      <set>\n        <element LOVID=\"Gender\">gen3839736</element>\n        <element LOVID=\"Gender\">gen3839737</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"Blood Group\">lov3839732</key>\n    <value>\n      <set>\n        <element LOVID=\"Gender\">gen3839736</element>\n        <element LOVID=\"Gender\">gen3839737</element>\n      </set>\n    </value>\n  </entry>\n</map>"
  }, {
    "id" : "DefiningAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "Blood_Group"
  }, {
    "id" : "DependentAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "Gender"
  } ],
  "pluginType" : "Operation"
}
*/

/*===== business rule plugin definition =====
{
  "pluginId" : "FunctionBusinessCondition",
  "parameters" : [ {
    "id" : "Formula",
    "type" : "com.stibo.util.basictypes.FormulaParameter",
    "value" : "Exact('santhosh','Santhosh')"
  }, {
    "id" : "MessageWhenFalse",
    "type" : "java.lang.String",
    "value" : "Incorrect "
  } ],
  "pluginType" : "Operation"
}
*/
