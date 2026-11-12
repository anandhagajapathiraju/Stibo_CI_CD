/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "XMLTester",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "XMLTester",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationProductLinkTypeBindContract",
    "alias" : "productToRegion",
    "parameterClass" : "com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl",
    "value" : "ProductToRegion",
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "assetRoot",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "AssetsRoot",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,productToRegion,assetRoot) {
var attrTagStart = "<Value AttributeID=";
var valuesTagStart = "<Values>";
var valueTagEnd = "</Value>";
var xmlStartTag = '<?xml version="1.0" encoding="UTF-8"?><STEP-ProductInformation xmlns="http://www.stibosystems.com/step" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.stibosystems.com/step PIM.xsd"><Products>';
var productEndTag = "</Values></Product>";
var prodStartTag = "<Product><Values>";
var xmlEndTag = " </Products></STEP-ProductInformation>";
var attrValueBody = "";
attrValueBody =  attrValueBody + xmlStartTag;
var queryChild = node.queryChildren();
queryChild.forEach(function(classChild){
	var query = classChild.queryClassificationProductLinks();
	//logger.info(query.asList(10));
	//logger.info(node.getChildren());
	
	query.forEach(function(prodRef){
		//var refs = prod.getClassificationProductLinks(productToRegion);
		//logger.info(prod);
		//for (var ref = 0; ref < refs.size(); ref++){
			var classLink = prodRef;
			attrValueBody = attrValueBody + prodStartTag;
			var regionCode = classLink.getClassification().getName();
			var effCost = classLink.getValue("EffectivePrice").getSimpleValue();
			var effDate = classLink.getValue("EffectiveDate").getSimpleValue();
			attrValueBody = attrValueBody + attrTagStart + "EffectivePrice_" + regionCode + ">" + effCost + valueTagEnd;
			attrValueBody = attrValueBody + attrTagStart + "EffectiveDate_" + regionCode + ">" + effDate + valueTagEnd;
			attrValueBody = attrValueBody + productEndTag;
		//}
		return true;
	});
	return true;
});

attrValueBody = attrValueBody + xmlEndTag;
logger.info(attrValueBody);
var newXML = assetRoot.createAsset("ListPriceExport3", "XML");
var baos = new java.io.ByteArrayOutputStream();
var oos = new java.io.ObjectOutputStream(baos);
oos.writeObject(attrValueBody);
// Flush the stream
oos.flush();

// Close the ObjectOutputStream
oos.close();

var inputStream = new java.io.ByteArrayInputStream(baos.toByteArray());
//var inputStream = new java.io.ByteArrayInputStream(toString(attrValueBody).getBytes(StandardCharsets.UTF_8));
newXML.upload(inputStream, "ListPriceExport.xml");

/*try {
      var myObj = new java.io.File("listPrice.xml");
      if (myObj.createNewFile()) {
        //logger.info("File created: " + myObj.getName());
      } else {
        //logger.info("File already exists.");
      }
} catch (e) {
 logger.info("An error occurred.");
 
    }
try {
      var myWriter = new java.io.FileWriter("listPrice.xml");
      myWriter.write(attrValueBody);
      myWriter.close();
      //logger.info("Successfully wrote to the file.");
} catch (e) {
 logger.info("An error occurred.");
 
}*/

//challenges
/**
 * 1. Getting all regions from one productclass ref - Means once we get the product link, get the product
 * get all class links, put in one product tag, then close tag. Also needs to monitor if a particular class has already
 * generated all products xml. Use map to track it.
 * 2. Alternate approach- Iterate the PPH itself to get all products and generate XML or use a querySpecification
 * to fetch all products with the ref and build xml.
 */
}