/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "StockCheckAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "StockCheckAction",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Kurtis", "Leggings", "Pants", "Shirts_All" ],
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
var objectType=node.getObjectType().getID();
if (objectType == "Leggings") {
	var size=node.getValue("Legging Length").getSimpleValue();
	var price=0;
	if(size=="Knee"){
		price=800;
	}
	if(size=="Ankle"){
		price=900;
	}
	if(size=="Full"){
		price=1000;
	}
	node.getValue("Legging_Price").setSimpleValue(price);
}

if (objectType == "Pants" || objectType == "Shirts_All" || objectType == "Kurtis") {
	var price = 0;
	if (objectType == "Pants") {
		var pSize = node.getValue("Pant Size").getSimpleValue();
		if (pSize == "S") price = 1200;
		if (pSize == "M") price = 1300;
		if (pSize == "L") price = 1400;
		node.getValue("Pant_Price").setValue(price);
	} 
	else if (objectType == "Shirts_All") {
		var sSize = node.getValue("Shirt Size").getSimpleValue();
		if (sSize == "S") price = 1500;
		if (sSize == "M") price = 1600;
		if (sSize == "L") price = 1700;
		node.getValue("Shirt_Price").setValue(price);
	} 
	else if (objectType == "Kurtis") {
		var kSize = node.getValue("Kurti Size").getSimpleValue();
		if (kSize == "S") price = 1100;
		if (kSize == "M") price = 1200;
		if (kSize == "L") price = 1300;
		node.getValue("Kurti_Price").setValue(price);
	}
}

}