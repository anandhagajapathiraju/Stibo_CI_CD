/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "XYZBA",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "XYZBA",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "XYZSalesItem" ],
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
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "Log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "mgr",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,Log,mgr) {
    //var name = node.getValue("5041819").getSimpleValue();
//Log.info("Result"+name);
//var name1 = node.getValue("xyzsize").getSimpleValue();
//Log.info("Result"+name1);
//var A = node.getValue("90324").getSimpleValue();
//Log.info("Result"+A);
//var B = node.getValue("XYZDiscount").getSimpleValue();
//Log.info("Result"+B);
//var C = node.getValue("XYZPrice").getSimpleValue();
//Log.info("Result"+C);
//var C = node.getValue().getAttributeGroups();
 //var d = mgr.getAttributeHome().getAttributeByID("XYZPrice");
 // Log.info("attribute" +d);

 /*var e =  mgr.getAttributeHome().getAttributeByID("XYZPrice");
Log.info("Result" +e);
 
 var f = e.getAttributeGroups();
 f.forEach(function (item){
 	Log.info("AttributeGroup" +item)
 	}); 
 	*/

/*var a = mgr.getReferenceTypeHome().getReferenceTypeByID("PMDM.PRT.INT2EXT");  
Log.info("Result is :-" +a);
*/
var a = mgr.getAttributeHome().getAttributeByID("2046204_LOVs  ");
Log.info(a);
/*var a = mgr.getAttributeHome().getAttributeByID("xyzsize");
var b = a.getDefaultUnit();
Log.info("Result is:-"+a);
Log.info("Result is:-" +b);
*/
/*
var a =  mgr.getAttributeHome().getAttributeByID("XYZPrice");
var z=a.setValue("Rana")
var b = a.getID();
var c = a.getName();
var d = a.getTitle();
var e = a.isNameDimensionPointInherited();



Log.info("Result getAttributeByID:-" +b);
Log.info("Result geIDt:-" +a);
Log.info("Result getName:-" +c);
Log.info("Result geTitlee:-" +d);
Log.info("Result getdimention:-" +e);  //true / false
/*var b = a.getDimensionDependencies();
 b.forEach(function (item){
 	Log.info("Dependencies are:-"+item.getID());ask pr
 	}); 
*/  
//var a = mgr.getListOfValuesHome().getListOfValuesByID("Colours");
//Log.info("Result:-" +a);

                                                             








 
}