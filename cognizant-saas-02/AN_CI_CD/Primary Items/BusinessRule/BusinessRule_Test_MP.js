/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Test_MP",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "Test_MP",
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
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,step) {
var assetName = node.getValue("asset.filename").getSimpleValue();
log.info("Initial :"+assetName)
var index = assetName.indexOf("_");
var objectKey = assetName.substring(0,index);
var variant = step.getNodeHome().getObjectByKey("COE_Key",objectKey);
if(variant){
	variant.createReference(node,"COE_Variant_Image_Reference");
	assetName = assetName.substring(index+1,assetName.indexOf(".")) //+ "" + assetName.substring(index + 1);
	log.info("assetName: "+assetName);
	node.setName(assetName);
}
function fileCopy(node) {

	var changedAssetName = null;

	var assetName = node.getValue("asset.filename").getSimpleValue();

	assetName = changeExtension(assetName);

	var createdDate = node.getValue("Created_Date").getSimpleValue();

	if(createdDate) {

		libAudit.setDateTime(node, "Last_Updated_DateTime");

	} else {

		libAudit.setDateTime(node, "Created_Date");

	} 

	var index = assetName.indexOf("_");

	assetName = assetName.substring(0, index) //+ "" + assetName.substring(index + 1);
	var destfolderPath = "/shared/upload/outbound/assets/out/";

	var destFilename = destfolderPath + assetName;

	var destFile = new java.io.File(destFilename);

	var createFile = destFile.createNewFile();

	var fileoutput = new java.io.FileOutputStream(destFilename);

	node.download(fileoutput);

	fileoutput.close(); 

}
 
//fileCopy(node);

node.approve();
 
}