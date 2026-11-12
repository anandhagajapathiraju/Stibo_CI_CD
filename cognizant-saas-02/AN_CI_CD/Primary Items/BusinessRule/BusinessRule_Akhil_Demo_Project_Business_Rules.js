/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "Akhil_Demo_Project_Business_Rules",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "Akhil_Demo_Project_Business_Rules",
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
node.getWorkflowInstances(step.getWorkflowHome().getWorkflowByID("AK_Mobiles_Onboarding_WF")).;
/// below code is for getting SFD data from reference attributes
var finalOutput = "";

var temp = "";

var collectionObj = manager.getNodeCollectionHome()
                           .getNodeCollectionByID("158859958");

collectionObj.queryNodes().forEach(function(element) {

    temp = "";
    temp = getTheData(element, manager);
    temp = temp.join("#");

    if (temp !== "") {
        if (finalOutput !== "") {
            finalOutput += "#";
        }
        finalOutput += temp;
    }

    return true;
});
logger.info(finalOutput);


//var temp = "";
//    temp = getTheData(element, manager);
//    temp = temp.join("#");
//
//    if (temp !== "") {
//        if (finalOutput !== "") {
//            finalOutput += "#";
//        }
//        finalOutput += temp;
//    }
//logger.info(finalOutput);	
	
function getTheData(node, manager) {

    var output = [];
    var wrinNumber = "";

    try {
        wrinNumber = node.getValue("WRINNUMBER").getSimpleValue();
    } catch (e) {}

    // Get Facility Details
    var facilityRefType = manager.getReferenceTypeHome()
                                 .getReferenceTypeByID("ItemToFacility");

    node.queryReferences(facilityRefType).forEach(function(ref) {

        var facilityID = "";
        var supplierID = "";
        var wsi = "";
        var sfd = "";
        var sfdApprovalStatus = "";

        try {
            facilityID = ref.getValue("SIM_Identifier").getSimpleValue();
        } catch (e) {}

        try {
            supplierID = ref.getValue("SupplierID").getSimpleValue();
        } catch (e) {}

        try {
            wsi = ref.getValue("AdditionalPartyIdentification").getSimpleValue();
        } catch (e) {}

        try {
            sfd = ref.getValue("SIMSFDNumber").getSimpleValue();
        } catch (e) {}

        try {
            sfdApprovalStatus = ref.getValue("SIMSFDNumberApprovalStatus")
                                   .getSimpleValue();
        } catch (e) {}

        // Skip records where SFD is blank
        if (!sfd || String(sfd).trim() === "") {
            return true;
        }

        if (sfdApprovalStatus && String(sfdApprovalStatus).trim() !== "") {

            // Example:
            // 100822|Ireland|Work In Progress<multisep/>
            // 100822|United Kingdom|Work In Progress
            var approvalRecords = String(sfdApprovalStatus).split("<multisep/>");

            approvalRecords.forEach(function(record) {

                var marketName = "";
                var status = "";

                var parts = record.split("|");

                // Format: SFDNumber|MarketName|Status
                if (parts.length >= 3) {
                    marketName = parts[1];
                    status = parts[2];
                }

                output.push(
                    wrinNumber + "|" +
                    supplierID + "|" +
                    facilityID + "|" +
                    wsi + "|" +
                    sfd + "|" +
                    marketName + "|" +
                    status
                );
            });

        } else {

            // If approval status is blank, still output the record
            output.push(
                wrinNumber + "|" +
                supplierID + "|" +
                facilityID + "|" +
                wsi + "|" +
                sfd + "||"
            );
        }

        return true;
    });

    return output;
}
//var collectionObj = manager.getNodeCollectionHome().getNodeCollectionByID("158859958");
//var eidsarr =[];
//collectionObj.queryNodes().forEach(function(element) {
//
//   var Eid = element.getRevision().getUserID();
//	if(Eid != "E7756174")
//		eidsarr.push(element.getID());
//
//    return true;
//});
//log.info(eidsarr.join("|"));

/////////////////////////////////////////////////////////////////////////////////////////////////
/****************************************************************************************************************
Business Library Id 	: BR_LIB_ITEM_MNT_MRKT_WSI_CONTINGENT
Business Library Name	: Contingent Flag Processing
Rule Name				: Cont
Developed				: Jawaid Khan/Sourav Tamli / Suresh Maddule
Summary					: Various methods for Contingency Flage processing
Creation Date 			: 22 August 2020
****************************************************************************************************************/
//processContingencyFlag(node,step,logger);

/*=================================================================
				1. Perform Validations.
				2. Copy all the Market Objects in a Hash Map
				3. Copy Wrins in a hashMAP(optional)
				4. Copy Category in a hashMAP(optional)
				5. Fetch Supplier Wise WSI 
				  (as One supplier can be associated more than one WSI)
				6. For each Supplier get All the associated Suppllier Item
				7. for each Supplier Item check if it is matches with Wrin or category
				8. For the Supplier Item create ItemToContingentMarkets_Bulk reference
				                             
	=================================================================*/
	
pushBulkInputParametersToSupplierItem();
function pushBulkInputParametersToSupplierItem()
{
	var result = validateInput();
	var unqWSI={};
	var supWiseWSI={}
	var marketMap={};
	var unqWrin={};
	var unqCtg={};
	var optionalParam={}
	var paramGiven;//WRIN or Category
	var WRINList="";
	var markets="";
	var category="";
	var theSupplier;
	var oneLine="";
	var supplierItem;
	var contingencyListForFac="";
	var recPresent;
	var flag;
	var WSIList;
	var marketMap={};
	if(result!=true)
		throw result;
	unqWSI = getUniqueValues(node.getValue("ItemWSI").getSimpleValue());
	flag = node.getValue("SIM_Contingency_Flag").getSimpleValue()
	for(WSI in unqWSI)
	{
		logger.info("WSI = "+WSI);
	}
	marketMap=getTheMarketObject(step,node,logger)
	paramGiven=null;
	
	if(node.getValue("WRINList").getSimpleValue()!=null)
		{
			unqWrin = getUniqueValues(node.getValue("WRINList").getSimpleValue());
			optionalParam = unqWrin;
			paramGiven="W";
			showInfo(logger,"Wrin Provided");	
		}
	
	else if(node.getValue("SIM_Contingency_CTG_Bulk").getValues().size()>0)
	{
		   unqCtg= getUniqueValues(getMultiValuedAttributewithComma(node.getValue("SIM_Contingency_CTG_Bulk").getValues()));
		   optionalParam = unqCtg;
		   paramGiven="C";
		   showInfo(logger,"Category Provided");
	}
	
	//Faetch Facility from WSI
	for(WSI in unqWSI)
	{
		theSupplier = getSupplierFromWSI(WSI)
		if(!theSupplier)
			continue;
		
		
		//For each supplier its associated WSI is added
		if(supWiseWSI[theSupplier.getID()])
		{
			supWiseWSI[theSupplier.getID()]=supWiseWSI[theSupplier.getID()]+","+WSI;
		}
		else
		{
			supWiseWSI[theSupplier.getID()]=WSI;
		}	
		showInfo(logger,"Supplier is "+theSupplier.getID()+" WSI = "+supWiseWSI[theSupplier.getID()]);
	}
	
	//Run the Supplier Collection
	for(var supID in supWiseWSI)
	{
		theSupplier = step.getEntityHome().getEntityByID(supID)
		WSIList = supWiseWSI[supID];
		
			var references = theSupplier.getReferencedByProducts().toArray();
			
			for (var j = 0; j < references.length; j++)
			{
				if ((references[j].getReferenceType() == "ItemToSupplier"))
				{
					if (references[j].getSource().getObjectType().getID() == "McDonaldItem")
					{
						//Calling Set Contingency for cases
						//Filter the record based on Wrin Or Category
						supplierItem=references[j].getSource();
						//Check if the Given WSI is present under Facility_MFG_SSP
						//then only add the reference 
						if (isWSIPresent(unqWSI,references[j].getValue("Facility_MFG_SSP").getValues())==false)
							continue;
						else
							logger.info("This is Item "+supplierItem.getID());
						showInfo(logger,"supplierItem = "+supplierItem.getID()+" "+supplierItem.getValue("WRINNUMBER").getSimpleValue()+"   "+supplierItem.getValue("ProductCategory").getSimpleValue());
						if(paramGiven=="W")
						{
							//IF Wrin number is not present in UniqueWrin Map 
							if(!unqWrin[supplierItem.getValue("WRINNUMBER").getSimpleValue()])
								continue;//Skip this Item
						}
						if(paramGiven=="C")
						{
							//IF Wrin number is not present in UniqueWrin Map 
							if(!unqCtg[supplierItem.getValue("ProductCategory").getSimpleValue()])
								continue;//Skip this Item
						}
						//Now Set it to the reference	
						addTheSupplierItemToBulkRef(supplierItem,theSupplier,marketMap,WSIList,flag)
					}
				}
			}
		
	}
	
}

function addTheSupplierItemToBulkRef(SupplierItem,theSupplier,marketMap,WSIList,flag)
{
	var mktObject;
	var ref;
	for(var mkt=0;mkt<node.getValue("SIM_Search_Markets").getValues().size();mkt++)
	{
		mktObject = marketMap[node.getValue("SIM_Search_Markets").getValues().get(mkt).getSimpleValue()];
		if(mktObject==null)
		{
			continue;
		}
		try
		{
			ref= SupplierItem.createReference(mktObject,'ItemToContingentMarkets_Bulk');
			ref.getValue("ItemWSIList").setSimpleValue(WSIList);
			ref.getValue("SIM_Contingency_Flag").setSimpleValue(flag);
			showInfo(logger,"Ref Created for " + mktObject.getID()+" "+SupplierItem.getName());
		}
		catch(err)
		{
			//in case the reference is alredy established then
			//This Item will not be created any other reference
		
			updateWSiForExistingRef(node,SupplierItem,mktObject,step,logger,'ItemToContingentMarkets_Bulk',WSIList);
		}
	}
}

function validateInput()
	{
		var result;
		if(node.getValue("ItemWSI").getSimpleValue()==null)
			{
				
				return "<br/><br/><b>Please provide WSI<b/><br/>"
			}
		if(node.getValue("SIM_Search_Markets").getValues().size()<1)
			{
				return "<br/><br/><b>Please Select at least One market <b/><br/>"
			}
		/*
		Both can be empty
		if(node.getValue("WRINList").getSimpleValue()==null &&
		   node.getValue("SIM_Contingency_CTG_Bulk").getValues().size()<1
		  )
			{
				return "<br/><br/><b>Please Provide Either WRIN or Category <b/><br/>"
			}
		*/
	if(node.getValue("WRINList").getSimpleValue()!=null &&
		   node.getValue("SIM_Contingency_CTG_Bulk").getValues().size()>0)
			{
				return "<br/><br/><b>Please Provide Either WRIN or Category, Not Both</b><br/><br/>"
			}
	if (node.getValue("SIM_Contingency_Flag").getSimpleValue()==""||node.getValue("SIM_Contingency_Flag").getSimpleValue()==null) 
	{
		return "<br/><br/><b>Select Contingency Flag as Yes/No</b><br/><br/>"
	}
	if(node.getValue("WRINList").getSimpleValue()!=null)
	{
			result = validateWrinWSI(node.getValue("WRINList").getSimpleValue(),8,true)
			if(result!=true)
				return result;
	}
	result = validateWrinWSI(node.getValue("ItemWSI").getSimpleValue(),5,true)
	if(result!=true)
	return result;
	//Check if WRIN/WSI is a numeric values
	
		return true;
	}
function getUniqueValues(value)
{
	var data = value.split(',')
	var result="";
	var uniqueValues={}
	for(var i=0;i<data.length;i++)
	{
		if(data[i]==null)
			continue;
		if(!uniqueValues[data[i]])
		{
			uniqueValues[data[i]]=data[i];
		}
	}
	return uniqueValues;
}


function getMultiValuedAttributewithComma(values)
{
	var result ="";
	for (var i=0;i<values.size();i++)
	{
		result = result + values.get(i).getSimpleValue()+",";
	}
	return result;
}


function getSupplierFromWSI(WSI)
{
	var searchAdditionalPartyIdentification = step.getAttributeHome().getAttributeByID("SearchAdditionalPartyIdentification");
	var searchQuery = new com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification(com.stibo.core.domain.entity.Entity, searchAdditionalPartyIdentification, WSI);
	var resultSet = step.getHome(com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome).querySingleAttribute(searchQuery).asList(50);
	var theFacility=null;
	//Supplier Found, now Search the 
	logger.info("Total SUp is "+resultSet.size());
	return resultSet.size()>0?resultSet.get(0):null;
	
		
}

function getTheMarketObject(step,node,logger)
{
	var marketMap={}
	var markets = step.getEntityHome().getEntityByID("SIM_Market_Category_Details").getChildren();
	var marketName;
	for(var mkt=0;mkt<node.getValue("SIM_Search_Markets").getValues().size();mkt++)
	{
		marketName=node.getValue("SIM_Search_Markets").getValues().get(mkt).getSimpleValue();
		for(var i=0;i<markets.size();i++)
		{
			if(marketName==markets.get(i).getName())
			{
				marketMap[marketName]=markets.get(i);
				break;
			}
		}
	}
	return marketMap;
}
	

function showInfo(logger,msg)
{
	var flag='N';
	if(flag=='Y')
	{
		logger.info(msg);
	}
}

function updateWSiForExistingRef(node,supplierItem,mktObject,step,logger,refID,WSIList)
{
	var contingentArray = supplierItem.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(refID)).toArray();
	var oldWSI;
	var unqWSI={};
	
	for(var i=0;i<contingentArray.length;i++)
	{
		if(contingentArray[i].getTarget().getID()==mktObject.getID())
		{
			oldWSI= contingentArray[i].getValue("ItemWSIList").getSimpleValue();
			//Already stored WSI + new WSI
			//As a supplier Item can be refered by more than one supplier
			oldWSI = oldWSI + ","+WSIList;
			unqWSI = getUniqueValues(oldWSI);
			oldWSI="";
			for(var wsi in unqWSI)
			{
				//showInfo(logger,"WSI Being added is "+wsi)
				
				if(wsi+""=="null" || wsi==null ||wsi=="")
					continue;
				logger.info("WSI Being added is "+wsi+" Supplier Item = "+supplierItem.getID())
				oldWSI = oldWSI+wsi+",";
			}
			//All the WSI has been concatented
			contingentArray[i].getValue("ItemWSIList").setSimpleValue(oldWSI);
			contingentArray[i].getValue("SIM_Contingency_Flag").setSimpleValue(node.getValue("SIM_Contingency_Flag").getSimpleValue());
		}
	}
	
}


function isWSIPresent(unkWSI,WSILIST)
{
	//List of Unique WSI provided is to be matched with MFG_SSP
	//FAC_216182|Yes|Yes|17333
	var WSI;
	try
	{
		for(var counter=0;counter<WSILIST.size();counter++)
	{
		var  data = new String(WSILIST.get(counter).getSimpleValue()).split("|");
		
		
		if(data.length!=4)
			return false;
		WSI = data[3];
		
		if(unkWSI[WSI])
			return true;
	}
	return false;
		
	}
	catch(err)
	{
		return false;
	}
	
	
}

function validateWrinWSI(value,length,validateLength)
{
	var unqValues=getUniqueValues(value);
		for(var val in unqValues)
		{
			logger.info("value is "+val)
			
			if(isNaN(val))
			{
				return "<br/><b>The WRIN(s)/WSI(s) provided is invalid. Please provide valid WRIN(s)/WSI(s) .</b><br/>"	
			}
			
			
			if(validateLength)
			{
				
				if(val.length<length||val.length>length)
				{
						return "<br/><b>The WRIN(s)/WSI(s) provided is invalid. Please provide valid WRIN(s)/WSI(s) .</b><br/>"	
				}
			}
				
		}
	return true;
}

///////////////////////////////////////////////////////////////////////////////////////////
/**
* @Author: Anindya Mukherjee
* @Created Date: 09/15/2026
* @Jira/INC ID: [Jira ID / INC ID]
* @Reason for Creation: This BR will validate the Supplier Entity rules 
* @Last Modified By: [Name]
* @Last Modification Date: [MM/DD/YYYY]
* @Last Modification Reason: [Brief description of the change]
*/

//List of rules -
//01. The Supplier and the associated Facility status are not in sync.
//55. Supplier market categories doesnt match with associated Facilities market categories(extention of no 1)
//Other. In Supplier Entities, SIM_Supplier_to_Facility_New and SIM_Facility_Realignment_Details should never have the same Facility


var vObjectType = node.getObjectType().getID();
var writeObj = step.getProductHome().getProductByID("objUpdateFacilityType");
var finalResult = "";

if(vObjectType == "SIM_Supplier_New" && node.getValue("SIM_Status").getSimpleValue() == "Active") {
	var check = false;
	var noOfFacilities = 0;
	var SupplierFacilityRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SIM_Supplier_to_Facility_New")).toArray();
	noOfFacilities = SupplierFacilityRef.length;
	if (noOfFacilities > 0) {
		for (var i = 0; i < noOfFacilities; i++) {
			if (SupplierFacilityRef[i].getTarget().getValue("SIM_Facility_Status").getSimpleValue() == "Active") {
				check = true;
				break;
			}
		}
	}
	if (check == false)
		finalResult = "01," + node.getID() + "," + noOfFacilities;
}

var refSet = new Set(["0"]);
var SupplierCategoryRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SIM_Supplier_To_Category")).toArray();
if (SupplierCategoryRef.length > 0) {
	var SupplierFacilityRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SIM_Supplier_to_Facility_New")).toArray();
	if (SupplierFacilityRef.length > 0) {
		
		for (var j = 0; j < SupplierFacilityRef.length; j++) {			
			var FacilityCategoryRef = SupplierFacilityRef[j].getTarget().getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SIM_Facility_To_Category")).toArray();
			if (FacilityCategoryRef.length > 0) {
				for (var k = 0; k < FacilityCategoryRef.length; k++) {
					var vFacilityMarketDetails = FacilityCategoryRef[k].getTarget().getName()
					+ ":" + FacilityCategoryRef[k].getValue("SIM_Approval_Status").getSimpleValue()
					+ ":" + FacilityCategoryRef[k].getValue("SIM_Category_To_Market").getSimpleValue();

					refSet.add(vFacilityMarketDetails);
				}
			}	
		}
	}
	for (var i = 0; i < SupplierCategoryRef.length; i++) {
		var vSupplierMarketDetails = SupplierCategoryRef[i].getTarget().getName()
		+ ":" + SupplierCategoryRef[i].getValue("SIM_Approval_Status").getSimpleValue()
		+ ":" + SupplierCategoryRef[i].getValue("SIM_Category_To_Market").getSimpleValue();
		if(!refSet.has(vSupplierMarketDetails)) {
			if(finalResult)
				finalResult = finalResult + "55," + node.getID() + "," + node.getValue("SIM_Status").getSimpleValue() + "," + vSupplierMarketDetails;
			else
				finalResult = "55," + node.getID() + "," + node.getValue("SIM_Status").getSimpleValue() + "," + vSupplierMarketDetails;
		}
	}
}

var FacilityRealignmentRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SIM_Facility_Realignment_Details")).toArray();
if (FacilityRealignmentRef.length > 0) {
	var refSet = new Set(["0"]);
	var SuppliertoFacilityRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SIM_Supplier_to_Facility_New")).toArray();
	if (SuppliertoFacilityRef.length > 0) {
		for (var j = 0; j < SuppliertoFacilityRef.length; j++) {			
			refSet.add(SuppliertoFacilityRef[j].getTarget().getID());
		}
	}
	for (var i = 0; i < FacilityRealignmentRef.length; i++) {
		if(refSet.has(FacilityRealignmentRef[i].getTarget().getID())) {
			if(finalResult)
				finalResult = finalResult + "Other," + node.getID() + "," + node.getValue("SIM_Status").getSimpleValue() + "," + FacilityRealignmentRef[i].getTarget().getID();
			else
				finalResult = "Other," + node.getID() + "," + node.getValue("SIM_Status").getSimpleValue() + "," + FacilityRealignmentRef[i].getTarget().getID();
		}
	}
}

if(finalResult) {
	writeObj.getValue("SupplierContactUpdate").addValue(finalResult);
	log.info(finalResult);
}













}