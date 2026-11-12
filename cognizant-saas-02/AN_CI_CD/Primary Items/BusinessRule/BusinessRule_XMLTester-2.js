/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "XMLTester-2",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "XMLTester-2",
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

//Function to convert string to array of bytes
function strToBytes(str) {
    var byteStr = new java.lang.String(str);
    var byteArr = byteStr.getBytes(java.nio.charset.StandardCharsets.UTF_16);
    return byteArr;
}

queryChild.forEach(function(classChild){
	var query = classChild.queryClassificationProductLinks();
	query.forEach(function(prodRef){
			var classLink = prodRef;
			attrValueBody = attrValueBody + prodStartTag;
			var regionCode = classLink.getClassification().getName();
			var effCost = classLink.getValue("EffectivePrice").getSimpleValue();
			var effDate = classLink.getValue("EffectiveDate").getSimpleValue();
			attrValueBody = attrValueBody + attrTagStart + "EffectivePrice_" + regionCode + ">" + effCost + valueTagEnd;
			attrValueBody = attrValueBody + attrTagStart + "EffectiveDate_" + regionCode + ">" + effDate + valueTagEnd;
			attrValueBody = attrValueBody + productEndTag;
		return true;
	});
	return true;
});

attrValueBody = attrValueBody + xmlEndTag;
logger.info(attrValueBody);

var today = new Date();
var date = today.getMonth()+1+'-'+today.getDate()+'-'+today.getFullYear();
var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
var dateTime = date+'-'+time;
	
var filePath = "/opt/stibo/ListPriceInfo_"+dateTime+".xml";
tempFileOnServer = new java.io.File(filePath);
fileOutputStream = new java.io.FileOutputStream(tempFileOnServer);
fileOutputStream.write(strToBytes(attrValueBody));

var fileInputStream = new java.io.FileInputStream(filePath);
var assetObj = assetRoot.createAsset("ListPrice10","XML");


var dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
assetObj.upload(fileInputStream, "ListPriceInfo_"+dateTime+".xml");
assetObj.setName("ListPriceInfo_"+dateTime);

fileOutputStream.flush();
fileOutputStream.close();
tempFileOnServer.delete();

//challenges
/**
 * 1. Getting all regions from one productclass ref - Means once we get the product link, get the product
 * get all class links, put in one product tag, then close tag. Also needs to monitor if a particular class has already
 * generated all products xml. Use map to track it.
 * 2. Alternate approach- Iterate the PPH itself to get all products and generate XML or use a querySpecification
 * to fetch all products with the ref and build xml.
 */
}