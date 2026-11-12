/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "ATHDW327005_2314064_B_Cond",
  "type" : "BusinessCondition",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "ATHDW327005_2314064_B_Cond",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ATHDW327005_2314064_Prod" ],
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
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger) {
var prodStyleNo = node.getValue("2314064_Product_Style_No").getSimpleValue();
var prodTaxCode = node.getValue("2314064_Product_Tax_Code").getSimpleValue();

var condition = true;

if(prodStyleNo!= null){
   logger.info("Product Style Number attribute is not empty");
   }else{
        logger.info("Product Style Number attribute is empty");
		condition = false;
		}
		
if(prodTaxCode!= null){
   logger.info("Product Tax Code attribute is not empty");
   }else{
        logger.info("Product Tax Code attribute is empty");
		condition = false;
		}
		
return condition;
}