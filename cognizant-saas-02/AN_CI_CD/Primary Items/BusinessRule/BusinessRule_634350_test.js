/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "634350_test",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "634350_test",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "refType",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,refType) {
v/*ar abc= node.getParent().queryClassificationProductLinks(refType).asList(100).iterator();
log.info(abc);

var attribute= node.getValue("Test_LOV").getID();
var classification = abc.hasNext() ? abc.next().getClassification():null;
log.info(classification);
while(classification!=null){
	if("Log_H_104824" == classification.getParent.getID(){
		break;
	}
	classification=classification.getParent();
	log.info(classification);
}
log.info(classification.getID());

if(classification!=null && classification.getID() == "" && (attribute == "yes")){
	return true;
	}
	return false;
	*/

	if(!prod instanceof com.stibo.core.domain.Product) throw "Function only works with Products";
   if(checkProdID == "Product hierarchy root") return true;
   if(prod.getID() == "Product hierarchy root") throw "The top level Product is never below another Product.";
		 
   var currentParentId;
   var currentProd = prod;
   while(true) {
	currentParentId = currentProd.getParent().getID();
	if(currentParentId == "Product hierarchy root") return false;
	else if (currentParentId == checkProdID) return true;
	else currentProd = currentProd.getParent();
   }
}

}