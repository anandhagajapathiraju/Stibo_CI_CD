/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "bc_cross_validation",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "bc_cross_validation",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "ValidateBefore",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "LOVCrossValidationBusinessCondition",
  "parameters" : [ {
    "id" : "Config",
    "type" : "com.stibo.core.domain.parameter.LOVCrossValidationConfig",
    "value" : "<map>\n  <entry>\n    <key LOVID=\"PMDM.LOV.20002638\">30002515</key>\n    <value>\n      <set>\n        <element LOVID=\"Material_lov\">3</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"PMDM.LOV.20002638\">30002518</key>\n    <value>\n      <set>\n        <element LOVID=\"Material_lov\">2</element>\n        <element LOVID=\"Material_lov\">1</element>\n        <element LOVID=\"Material_lov\">3</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"PMDM.LOV.20002638\">30013400</key>\n    <value>\n      <set>\n        <element LOVID=\"Material_lov\">2</element>\n        <element LOVID=\"Material_lov\">1</element>\n        <element LOVID=\"Material_lov\">3</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"PMDM.LOV.20002638\">30013396</key>\n    <value>\n      <set>\n        <element LOVID=\"Material_lov\">2</element>\n        <element LOVID=\"Material_lov\">1</element>\n        <element LOVID=\"Material_lov\">3</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"PMDM.LOV.20002638\">30013395</key>\n    <value>\n      <set>\n        <element LOVID=\"Material_lov\">3</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"PMDM.LOV.20002638\">30013398</key>\n    <value>\n      <set>\n        <element LOVID=\"Material_lov\">2</element>\n        <element LOVID=\"Material_lov\">1</element>\n        <element LOVID=\"Material_lov\">3</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"PMDM.LOV.20002638\">30013397</key>\n    <value>\n      <set>\n        <element LOVID=\"Material_lov\">2</element>\n        <element LOVID=\"Material_lov\">1</element>\n        <element LOVID=\"Material_lov\">3</element>\n      </set>\n    </value>\n  </entry>\n</map>"
  }, {
    "id" : "DefiningAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "a_mm_type_of_object"
  }, {
    "id" : "DependentAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "Material"
  } ],
  "pluginType" : "Operation"
}
*/
