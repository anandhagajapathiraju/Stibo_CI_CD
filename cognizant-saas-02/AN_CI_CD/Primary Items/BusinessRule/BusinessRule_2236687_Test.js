/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "2236687_Test",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ATHDW327005_2236687_Test",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
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
    "alias" : "log",
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
exports.operation0 = function (node,log,step) {
/*function strToDate(strDate){
    var sdf = new java.text.SimpleDateFormat('yyyy-MM-dd');
    try
    {
        return sdf.parse(strDate);
    }
    catch(log){
        return null;
    }
}
var strDate = node.getValue("a_app_startdate").getSimpleValue();
log.info("Start Date "+strDate);
var cDate = new Date();
var day = cDate.getDate();
var month = cDate.getMonth() + 1;
var year = cDate.getFullYear();
if(day<10) {
    day="0"+day;
}
if(month<10) {
    month="0"+month;
}
var currentDate=year+"-"+month+"-"+day;
log.info("Current Date "+currentDate);
if(currentDate>strDate){
    log.info("Please choose a product start date greater than today");
}
else
{
	log.info("Else");
	return true;
}*/
/*
var entity = step.getEntityHome().getEntityByID("ReqRoot_H_104864");
newEntity = entity.createEntity(null, "2236687_ProductShotRequest");
node.createReference(newEntity, "2236687_ProdToProdShotReq");
var prodshotreq = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("2236687_ProdToProdShotReq")).toArray();
for(var i=0; i<prodshotreq.length;i++)
{
	log.info("Ref "+prodshotreq[i].getTarget().getID());
	//var num = prodshotreq[i].getTarget().getValue("a_app_prodnum").getSimpleValue();
	//log.info("Product Num = "+num);
}
*/

/*var id = node.getID();
log.info("ID: "+id);
var str = id.substring(4, 10);
log.info("Substring: "+str);
node.getValue("a_app_prodnum").setSimpleValue(str);
var test = node.getValue("a_app_prodnum").getSimpleValue();
log.info("test: "+test);*/
var references = node.getReferencedBy().toArray();

for (var i = 0; i < references.length; i++)
                {
                        if ((references[i].getReferenceType() == "2236687_ProdToProdShotReq"))
                        {
                        caseRef=references[i].getSource();
					log.info("Ref "+caseRef);
					attr=references[i].getSource().getValue("a_app_prodnum").getSimpleValue();
					log.info("attr "+attr);

}
}
}