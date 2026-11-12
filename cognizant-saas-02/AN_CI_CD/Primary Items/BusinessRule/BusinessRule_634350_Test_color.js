/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "634350_Test_color",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "634350_Test_color",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "634350_TEST", "634350_TEST_L1", "634350_TEST_L2" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "currentProduct",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationProductLinkTypeBindContract",
    "alias" : "linkType",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "targetClassification",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (currentProduct,manager,logger,linkType,targetClassification) {
/*/*var lovcheck= node.getValue("Test_LOV").getSimpleValue();
//return(lovcheck);
var idname=node.getID();
var attrHome=manager.getAttributeHome();
var attrname=attrHome.getId();
logger.info(attrname);
if(lovcheck=="True"){
var final=node.getObjectType();
var finalID= node.getID();

}else
	{
		/*var attrHome=manager.getAttributeHome();
		hidden.setHidden(node,attrHome.getAttributeByID("Test_LOV"));
		*/
		//node.getParent();
		
	//}

	/*var attribute= node.getValue("Test_LOV").getID();
	while(attribute=="True" && node.getObjectType().getID()!="Product"){
	node= node.getParent();
	}
	return (node!=null && node.getID()!="634350_TEST_tree" &&  node.getID() != "634350_TEST_L1_tree");
*/
//var abc= node.getChildren();
//logger.info(abc);
/*
var parent= node.getParent();
var children = parent.getChildren();
var variants = node.getParent().getChildren();
var itr= variants.iterator();
while(itr.hasNext()){
	var newobj= itr.next();
	//var newobj1= newobj.getValue()
}*/
	//var parent= node.getParent();
	/*var children = node.getChildren();
	logger.info(children)*/
//var variants = node.getParent().getChildren();*/

/*try {
	removeNavigationReferences(node,step);
	
	}catch(e){

		throw("Exception on navigation reference removal : " +e);
		
		}

	function removeNavigationReferences(node, step){
		node.queryClassificationProductLinks().forEach(function (reference){
		var navRefID = reference.getClassification().getID();
		var productID=	 reference.getProduct().getID();
		reference.delete();
		logger.info("navigation reference :"+navRefID+" is removed from product : "+productID);
		return true;
			
			
			
			
			})
		
		
		
		
		}*/

		try {
	currentProduct.createClassificationProductLink(targetClassification, linkType);
} catch (e) {
if (e.javaException instanceof com.stibo.core.domain.UniqueConstraintException) {
		logger.warning("Link between product with ID '" + currentProduct.getID() + "' and classification with ID '" + targetClassification.getID() + "' already exists.");
	} else {
throw e;
	}
}
	
	
	

}