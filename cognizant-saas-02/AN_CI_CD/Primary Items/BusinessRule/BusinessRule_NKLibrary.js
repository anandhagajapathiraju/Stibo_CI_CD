/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "NKLibrary",
  "type" : "BusinessLibrary",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "NK Library",
  "description" : null,
  "scope" : null,
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : null,
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessLibrary",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/

// File changed for SUPPLIERFACILITYENTITY change by Venkat on 4,7,8,9,11,12-May-20
// File changed for SUPPLIERFACILITYENTITY change by Gandhi on 6 may, 2020
// File changed for SUPPLIERFACILITYENTITY change by Kriba on 8 may, 2020
// File changed for SUPPLIERFACILITYENTITY change by Gandhi on 9 may, 2020
// File changed for SUPPLIERFACILITYENTITY change by Kunal on 8,9 may, 2020
// File changed for SUPPLIERFACILITYENTITY change by Gandhi on 12 may, 2020
// 08/06/2020 -- Rahul Rangu -- Remove the function "sendEmailNotification" for email triggers as its no longer in use
// File changed by Shaktiman Misra for MDMI-20365
/*--------------------------------------------------------------------------------------
Title:	PIM Library
Author:Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Company:Cognizant
Date:6/26/2108
Description:Added reusable functions 
Assumptions:N/A
Usage: To reuse functions created in this library in business rules and workflows.
Update : Changed from Date to ISO Date
----------------------------------------------------------------------------------------*/
/*Title:	isAttributeValid
Author:	Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Company:	Cognizant
Date:	6/26/2108
Description:Added isAttributeValid function
Assumptions:N/A
Usage: 	To check if an attribute is valid on node or not*/
function isAttributeValid(node, step, attribute) {
    try {
        if (step.getAttributeHome().getAttributeByID(attribute)) {
            if (!(step.getAttributeHome().getAttributeByID(attribute).getValidForObjectTypes().isEmpty())) {
                if (step.getAttributeHome().getAttributeByID(attribute).getValidForObjectTypes().contains(node.getObjectType()) && !node.getValue(attribute).isOrphan())
                    return true;
                else
                    return false;
            }
        } else
            return false;
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Title:	checkMandatoryAttribute
Author:	Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com) 
Company:	Cognizant
Date:	6/26/2108
Description:Added checkMandatoryAttribute function
Assumptions:N/A
Usage: 	To return error message if an attribute value is null.*/
function checkMandatoryAttribute(node, step, attribute) {
    try {
        if (isAttributeValid(node, step, attribute)) {
            if (node.getValue(attribute).getSimpleValue() == null)
                return step.getAttributeHome().getAttributeByID(attribute).getName() + " is mandatory.";
        }
        return null;
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Title:	setName
Author:	Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com) 
Company:	Cognizant
Date:	6/26/2108
Description:Added setName function
Assumptions:N/A
Usage: 	To set name based on an attribute value.*/
function setName(node, step, attribute) {
    try {
        if (isAttributeValid(node, step, attribute)) {
            if (node.getObjectType().getID() == "BaseMenuItem") {
                var bmiMenuCode = node.getValue("a_mm_BMIMenuCode").getSimpleValue();
                var bmiName = node.getValue("a_mm_BMIInternalName").getSimpleValue();
                if (bmiMenuCode) {
                    node.setName(bmiMenuCode + "-" + bmiName.trim());// changes done as part of INC16757284

                }

            } else if (node.getObjectType().getID() == "SoldMenuItem") {
                var smiMenuCode = node.getValue("a_mm_SMIMenuCode").getSimpleValue();
                var smiName = node.getValue("a_mm_SMIName").getSimpleValue();
                if (smiMenuCode) {
                    node.setName(smiMenuCode + "-" + smiName.trim());// changes done as part of INC16757284

                }

            } else if (node.getObjectType().getID() == "RecipeComponent") {

                var rcMenuCode = node.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
                var rcName = node.getValue("a_mm_RecipeComponentName").getSimpleValue();
                if (rcMenuCode) {
                    node.setName(rcMenuCode + "-" + rcName.trim());// changes done as part of INC16757284

                }

            } else if (node.getObjectType().getID() == "Restaurants") {

                var storeNumber = node.getValue("a_mm_StoreNumber").getSimpleValue();
                var storeName = node.getValue("a_mm_Store_Name").getSimpleValue();
                if (storeNumber) {
                    node.setName(storeNumber + "-" + storeName.trim());// changes done as part of INC16757284

                }

            } else if (node.getObjectType().getID() == "MenuItemRequest") {

                var reqId = node.getValue("a_mm_ItemRequestID").getSimpleValue();
                var reqName = node.getValue("a_mm_MIRequestName").getSimpleValue();
                if (reqId && reqName) {
                    node.setName(reqId + "-" + reqName.trim());// changes done as part of INC16757284

                }
            } else if (node.getObjectType().getID() == "RestaurantGroups" && node.getValue("a_mm_Market").getSimpleValue() == "US") {

                var resGrpId = node.getValue("a_mm_RestaurantGroupID").getSimpleValue();
                var resGrpName = node.getValue("a_mm_RestaurantGroupName").getSimpleValue();
                if (resGrpId) {
                    node.setName(resGrpId + "-" + resGrpName.trim());// changes done as part of INC16757284

                }

            }
            else //change done as part of MDMI-20238 by Siva
            {
                var attrValue = node.getValue(attribute).getSimpleValue().trim();
                if (attrValue)
                    node.setName(attrValue);
            }
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     fdateComparison
Author:	     Susovan <susovan.ghosh@us.mcd.com>
Date:	     07/05/2018
Purpose:	     To compare dates and throw validation errrors
Applicability: During Promotion Creation*/
function fdateComparison(node, step, date1, date2) {

    try {
        if (isAttributeValid(node, step, date1) && isAttributeValid(node, step, date2)) {
            var dStartDate = node.getValue(date1).getSimpleValue();
            var dEndDate = node.getValue(date2).getSimpleValue();
            log.info("dStartDate:" + dStartDate);
            log.info("dEndDate:" + dEndDate);
            if (dStartDate != null && dEndDate != null) {
                //var dStartDate = node.getValue("a_mm_PromotionStartDate").getSimpleValue();
                dStartDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dStartDate);
                //var dEndDate = node.getValue("a_mm_PromotionEndDate").getSimpleValue();
                dEndDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dEndDate);
                log.info("GK1 sStartDate after parse:" + dStartDate);
                log.info("GK1 sEndDate after parse:" + dEndDate);
                log.info("GK1 dEndDate.before(dStartDate):" + dEndDate.before(dStartDate));
                log.info("GK1 dEndDate.after(dStartDate):" + dEndDate.after(dStartDate));
                if (dEndDate.before(dStartDate))
                    return step.getAttributeHome().getAttributeByID(date1).getName() + " can not be greater than " + step.getAttributeHome().getAttributeByID(date2).getName();
                //return step.getAttributeHome().getAttributeByID(date2).getName() + " should be greater than " + step.getAttributeHome().getAttributeByID(date1).getName();
            }
        }
        return null;
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     mandatoryAttributesOnLink
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com) 
Date:	     07/11/2108
Purpose:	     To return error message if mandatory attributes on link aren't populated
Applicability: During BMI Enrich*/
function mandatoryAttributesOnLink(node, step, reference, array) {
    try {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID(reference);
        if (tRef) {
            var tError = null;
            var tReferences = node.getReferences(tRef);
            if (!tReferences.isEmpty()) {
                for (var i = 0; i < tReferences.size(); i++) {
                    var tLink = tReferences.get(i);
                    var tAttributeName = new java.util.ArrayList();
                    for (var j = 0; j < array.length; j++) {
                        if (tLink.getValue(array[j]).getSimpleValue() == null) {
                            tAttributeName.add(step.getAttributeHome().getAttributeByID(array[j]).getName());
                            log.info("tAttributeName:" + tAttributeName);
                        }
                    }
                    if (tError != null) {
                        if (tAttributeName.size() > 0)
                            tError = tError + "\n" + tAttributeName + " is mandatory for " + tLink.getTarget().getName();
                    } else {
                        if (tAttributeName.size() > 0)
                            tError = tAttributeName + " is mandatory for " + tLink.getTarget().getName();
                    }
                }
            }
            return tError;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     rejectComments
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com) 
Date:	     07/18/2108
Purpose:	     To return error message if user tries to reject item without populating comments.
Applicability: During BMI Enrich*/
/*function rejectComments(node, step, attribute) {
    try {
        if (isAttributeValid(node, step, attribute)) {
            if (node.getValue(attribute).getSimpleValue() == null)
                return "Please provide rejection reason in " + step.getAttributeHome().getAttributeByID(attribute).getName() + " to reject this item";
            else
                return null;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}*/
/*Name:	     archiveComments
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     07/18/2108
Purpose:	     To return error message if user tries to archive item without populating comments.
Applicability: During BMI Enrich*/
function archiveComments(node, step, attribute) {
    try {
        if (isAttributeValid(node, step, attribute)) {
            if (node.getValue(attribute).getSimpleValue() == null)
                return "Please provide archival reason in " + step.getAttributeHome().getAttributeByID(attribute).getName() + " to archive this item";
            else
                return null;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}


// Author:: Amit Kumar mc76209
// Purpose:: Business Condition to check whether Rejection Comments is provided ot not.
//Date:: 16 JUNE 2021
function rejectComments(node, step, attribute) {
    var item = node.getObjectType().getName();
    //logger.info(item);
    try {
        if (attribute == "a_mm_Comments") {
            if (node.getValue(attribute).getSimpleValue() == null)
                return "Please provide rejection reason under Comments & History tab to reject this " + item;
            else
                return null;
        } else {
            if (attribute == null)
                return "Please provide rejection reason under Comments & History tab to reject this " + item;
            else
                return null;
        }
    } catch (err) {
        log.info("rejection with comment logger " + err);
        throw (err);
    }
}

/*Name:	     getCurrentDate
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     07/19/2108
Purpose:	     To return current date based on the current context.
Applicability: wherever current date is required*/
function getCurrentDate(step, context) {
    try {
        var tCurrentContext = step.getCurrentContext().getID();
        var dCurrentDate = new java.util.Date();
        var dNewDate = null;

        if (tCurrentContext == "Context1") {
            dNewDate = new Date(dCurrentDate.getTime());
        } else {
            //UTC. getTimezoneOffset()m return time in minutes. to convert to ms use *60000ms
            var dUTC = dCurrentDate.getTime() + (dCurrentDate.getTimezoneOffset() * 60000);

            var contextLOVHome = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context");
            var allContextLOVValues = contextLOVHome.queryValidValues().asList(100);
            if (allContextLOVValues.size() > 0) {
                for (var i = 0; i < allContextLOVValues.size(); i++) {
                    var eachLOVValue = allContextLOVValues.get(i);
                    if (eachLOVValue.getValue() == tCurrentContext) {
                        var marketEntity = step.getEntityHome().getEntityByID(eachLOVValue.getID() + "MarketEntity");
                        var UTCOffset = marketEntity.getValue("a_mm_UTCTimeOffset").getSimpleValue();
                        var dNewDate = new Date((dUTC + (3600000 * UTCOffset)));
                    }
                }
            }
        }
        if (dNewDate != null) {
            log.info("dNewDate:" + dNewDate);
            return dNewDate;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*Name:	     fBMIdateComparison1
Author:	     Susovan <susovan.ghosh@us.mcd.com>
Date:	     07/20/2018
Purpose:	     To compare dates and throw validation errrors
Applicability: During BMI Enrichment*/
function fBMIdateComparison1(node, step, date1, date2) {
    try {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToEvent");
        log.info("tRef: " + tRef);
        if (tRef) {
            var tReferences = node.getReferences(tRef);
            log.info("tReferences: " + tReferences);
            log.info("tReferences Empty: " + tReferences.isEmpty());
            if (!tReferences.isEmpty()) {
                log.info("tReferences.size: " + tReferences.size());
                if (tReferences.size() == 1) {
                    if (isAttributeValid(node, step, date1) && isAttributeValid(tReferences.get(0).getTarget(), step, date2)) {
                        var dStartDate = node.getValue(date1).getSimpleValue();
                        var dEndDate = tReferences.get(0).getTarget().getValue(date2).getSimpleValue();
                        log.info("dStartDate:" + dStartDate);
                        log.info("dEndDate:" + dEndDate);
                        if (dStartDate != null && dEndDate != null) {
                            //var dStartDate = node.getValue("a_mm_PromotionStartDate").getSimpleValue();
                            dStartDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dStartDate);
                            //var dEndDate = node.getValue("a_mm_PromotionEndDate").getSimpleValue();
                            dEndDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dEndDate);
                            log.info("sStartDate after parse:" + dStartDate);
                            log.info("sEndDate after parse:" + dEndDate);
                            log.info("dEndDate.before(dStartDate):" + dEndDate.before(dStartDate));
                            log.info("dEndDate.after(dStartDate):" + dEndDate.after(dStartDate));
                            if (dEndDate.before(dStartDate))
                                return step.getAttributeHome().getAttributeByID(date2).getName() + " should be greater than " + step.getAttributeHome().getAttributeByID(date1).getName();
                        }
                    }
                    return null;
                }
            }
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*Name:	     fBMIdateComparison2
Author:	     Susovan <susovan.ghosh@us.mcd.com>
Date:	     07/20/2018
Purpose:	     To compare dates and throw validation errrors
Applicability: During BMI Enrichment*/
function fBMIdateComparison2(node, step, date1, date2) {
    try {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToEvent");
        log.info("tRef: " + tRef);
        if (tRef) {
            var tReferences = node.getReferences(tRef);
            log.info("tReferences: " + tReferences);
            log.info("tReferences Empty: " + tReferences.isEmpty());
            if (!tReferences.isEmpty()) {
                log.info("tReferences.size: " + tReferences.size());
                if (tReferences.size() == 1) {
                    if (isAttributeValid(tReferences.get(0).getTarget(), step, date1) && isAttributeValid(node, step, date2)) {
                        var dStartDate = tReferences.get(0).getTarget().getValue(date1).getSimpleValue();
                        var dEndDate = node.getValue(date2).getSimpleValue();
                        log.info("dStartDate:" + dStartDate);
                        log.info("dEndDate:" + dEndDate);
                        if (dStartDate != null && dEndDate != null) {
                            //var dStartDate = node.getValue("a_mm_PromotionStartDate").getSimpleValue();
                            dStartDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dStartDate);
                            //var dEndDate = node.getValue("a_mm_PromotionEndDate").getSimpleValue();
                            dEndDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dEndDate);
                            log.info("sStartDate after parse:" + dStartDate);
                            log.info("sEndDate after parse:" + dEndDate);
                            log.info("dEndDate.before(dStartDate):" + dEndDate.before(dStartDate));
                            log.info("dEndDate.after(dStartDate):" + dEndDate.after(dStartDate));
                            if (dEndDate.before(dStartDate))
                                return step.getAttributeHome().getAttributeByID(date2).getName() + " should be greater than " + step.getAttributeHome().getAttributeByID(date1).getName();
                        }
                    }
                    return null;
                }
            }
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     conditionallyMandatoryAttribute
Author:	     Susovan <susovan.ghosh@us.mcd.com>
Date:	     07/24/2018
Purpose:	     To check Conditionally mandatory scenarios and throw error
Applicability: During BMI Enrichment*/
function conditionallyMandatoryAttribute(node, step, attribute1, attribute2) {
    try {
        if (isAttributeValid(node, step, attribute1) && isAttributeValid(node, step, attribute2)) {
            if ((node.getValue(attribute1).getSimpleValue() == "Yes") && (node.getValue(attribute2).getSimpleValue() == null)) {
                return "When " + step.getAttributeHome().getAttributeByID(attribute1).getName() + " is Yes, " + step.getAttributeHome().getAttributeByID(attribute2).getName() + " is required.";
            } else if ((node.getValue(attribute1).getSimpleValue() != "Yes") && (node.getValue(attribute2).getSimpleValue() != null)) {
                return "When " + step.getAttributeHome().getAttributeByID(attribute1).getName() + " is No/Blank, " + step.getAttributeHome().getAttributeByID(attribute2).getName() + " should be left blank.";
            }
        }
        return null;
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     conditionallyMandatoryAttributeonLink
Author:	     Susovan <susovan.ghosh@us.mcd.com>
Date:	     07/24/2018
Purpose:	     To check Conditionally mandatory scenarios and throw error
Applicability: During BMI Enrichment
Version History:
Harshit Sharma -- (30/10/2020) -- Modified the function as per MDMI-6700 
*/
function conditionallyMandatoryAttributeonLink(node, step, attribute1) {
    var flag = false;
    try {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToFieldTest");
        log.info("tRef: " + tRef);
        if (tRef) {
            var tReferences = node.getReferences(tRef);
            log.info("tReferences: " + tReferences);
            log.info("tReferences Empty: " + tReferences.isEmpty());
            if (!tReferences.isEmpty()) {
                for (var i = 0; i < tReferences.size(); i++) {

                    if (tReferences.get(i).getValue(attribute1).getSimpleValue() == null) {
                        flag = true;
                        break;
                    }

                }
            }
        }
        if (flag == false)
            return null;
        else
            return step.getAttributeHome().getAttributeByID(attribute1).getName() + " cannot be left blank for any of the rows.";

    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*Name:	     isInApprovedWorkspace
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     8/7/2018
Purpose:	     To return approved node for the current node.
Applicability: In workflow*/
function isInApprovedWorkspace(node, step) {
    try {
        return step.executeInWorkspace("Approved", function (step) {
            var approvedNode = step.getProductHome().getProductByID(node.getID());
            if (approvedNode == null) {
                return null;
            } else {
                return approvedNode;
            }
        });
    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*Name:	     populate_Comments_onLink
Author:	     Sanjay Yellapantula(Sanjay.Yellapantula@us.mcd.com)
Date:	     8/13/2018
Purpose:	 To copy the Comments from the Comments to CommentsLog Attribute.
Version History:-
1) Suman Pan - 07/05/2020 - Removed user ID from the comments log population logic as per MDMI-7276
*/
function populate_Comments_onLink(sRef, node, step) {
    var sComments = null;
    var sCommentsLog = null;
    var sExistCommentsLog = null;
    // var sLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID(sRef);
    var gridReference = node.getClassificationProductLinks().get(sRef).toArray();
    if (gridReference != null) {
        for (i = 0; i < gridReference.length; i++) {
            if (gridReference[i].getValue("a_mm_Comments").getSimpleValue() != null) {
                sComments = gridReference[i].getValue("a_mm_Comments").getSimpleValue();
            }
            //var sDate = new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date());
            var sDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
            var sUserId = step.getCurrentUser().getID();
            var sUserName = step.getCurrentUser().getName();
            if (sComments != null) {
                if (gridReference[i].getValue("a_mm_CommentsLog").getSimpleValue() == null) {
                    sCommentsLog = sDate + " - " + sUserName + "\n" + "! " + sComments; // Changes of version 1
                    gridReference[i].getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
                } else {
                    sExistCommentsLog = gridReference[i].getValue("a_mm_CommentsLog").getSimpleValue();
                    sCommentsLog = sDate + " - " + sUserName + "\n" + "! " + sComments + "\n" + "-------------" + "\n" + sExistCommentsLog; // Changes of version 1
                    gridReference[i].getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
                }
            }
            sComments = gridReference[i].getValue("a_mm_Comments").setSimpleValue(null);
        }
    }
}

/*Name:		populateCommentForProductRefs
Author:		Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:		19/11/2020
Purpose:	To copy the Comments to Comment Log for Product To Product Refernce.
*/
function populateCommentForProductRefs(productRefID, commentAttrID, commentLogAttrID, purchasingApproval, qaApproval, state, node, step) {
    var sComments = null;
    var sCommentsLog = null;
    var sExistCommentsLog = null;
    var productRefHome = step.getReferenceTypeHome().getReferenceTypeByID(productRefID);
    var productRefs = node.getReferences(productRefHome);
    for (var a = 0; a < productRefs.size(); a++) {
        var productRefIns = productRefs.get(a);
        var commentsInRef = productRefIns.getValue(commentAttrID).getSimpleValue();
        var commentLogInRef = productRefIns.getValue(commentLogAttrID).getSimpleValue();
        var purchasingApprRef = productRefIns.getValue(purchasingApproval).getSimpleValue();
        var qaApprRef = productRefIns.getValue(qaApproval).getSimpleValue();

        if (commentsInRef != null && commentsInRef != "") {
            var currentDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
            var currentUserName = step.getCurrentUser().getName();
            var theFormat = null;
            if (state == "QA") {
                if (qaApprRef == "Reject") {
                    theFormat = currentDate + " - " + currentUserName + "\n" + "! " + commentsInRef;
                } else {
                    theFormat = currentDate + " - " + currentUserName + "\n" + "➜ " + commentsInRef;
                }
            } else {
                if (purchasingApprRef == "Reject") {
                    theFormat = currentDate + " - " + currentUserName + "\n" + "! " + commentsInRef;
                } else {
                    theFormat = currentDate + " - " + currentUserName + "\n" + "➜ " + commentsInRef;
                }
            }
            if (commentLogInRef != null && commentLogInRef != "") {
                theFormat = theFormat + "\n" + "-------------" + "\n" + commentLogInRef;
            }
            productRefIns.getValue(commentLogAttrID).setSimpleValue(theFormat);
            productRefIns.getValue(commentAttrID).setSimpleValue(null);
        }
    }
}

/*Name:	     ConceptTestResultValidation
Author:	     Susovan <susovan.ghosh@us.mcd.com>
Date:	     8/28/2018
Purpose:	     Return error if latest(based on actual date) Concept Test Result is Fail.
*/
function ConceptTestResultValidation(node, step, BMIStage) {
    try {
        if (isAttributeValid(node, step, "a_mm_BMIStage")) {

            var tBMIToFieldTest = step.getReferenceTypeHome().getReferenceTypeByID("BMIToFieldTest");
            if (tBMIToFieldTest != null) {
                var tReferences = node.getReferences(tBMIToFieldTest);
                var dActualDate = new java.util.ArrayList();
                var iCountDate = new java.util.ArrayList();
                var dTemp = null;
                var tResult = null;
                if (!tReferences.isEmpty() && isAttributeValid(node, step, "a_mm_BMIStage")) {
                    for (var i = 0; i < tReferences.size(); i++) {
                        var dConceptDate = tReferences.get(i).getValue("a_mm_ConceptTestActualDate").getSimpleValue();
                        var tConceptResult = tReferences.get(i).getValue("a_mm_ConceptTestResult").getSimpleValue();
                        if (dConceptDate != null) {
                            dConceptDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dConceptDate);
                            if (dTemp == null) {
                                dTemp = dConceptDate;
                                tResult = tConceptResult;
                            } else {
                                var b1Flag = dTemp.compareTo(dConceptDate);
                                if ((b1Flag == 1) || (b1Flag == 0)) {
                                    log.info("dTemp is >= dConceptDate");

                                } else if (b1Flag == -1) {
                                    log.info("dTemp is < dConceptDate");
                                    dTemp = dConceptDate;
                                    tResult = tConceptResult;
                                }
                            }
                        }
                    }
                    if (tResult != null && tResult == "Fail")
                        return "A Dev BMI can be approved only if the Concept Test result is 'Pass', 'In Progress' or 'To Be Continued'. ";

                }
                return null;
            }

        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*Name:	     assetValidation
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     9/3/2018
Purpose:	     Return error if user tries to insert document from a different asset folder.
*/
/*function assetValidation(node,step,referenceType,assetFolder)  {
    try  {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID(referenceType);
        if (tRef) {
            var tReferences = node.getReferences(tRef);
            log.info("tReferences:" + tReferences);
            var iCount = 0;
            if (!tReferences.isEmpty()) {
                for (var i = 0; i < tReferences.size(); i++) {
                    var tAsset = tReferences.get(i).getTarget();
                    log.info("tAsset:" + tAsset.getID());
                    var tClassification = tAsset.getClassifications();
                    var itr = tClassification.iterator();
                    while (itr.hasNext()) {
                        var tCurrent = itr.next();
                        if (tCurrent.getID() == assetFolder) {
                            iCount++;
                        }
                    }
                }
            }
            if (tReferences.size() != iCount) {
                var tClassification = step.getClassificationHome().getClassificationByID(assetFolder);
                if(tClassification != null) {
                    var tName = tClassification.getName();
                    return "You can only select a document for "+ tName + " result from '"+tName+"' folder";
                }
            }
        }
        return null;
    }
    catch (err) {
        log.info(err);
        throw (err);
    }
}*/

/*Name:	     mandatoryAttributesOnEntity
Author:	     sanjay yellapantula(sanjay.yellapantula@us.mcd.com) 
Date:	     07/11/2108
Purpose:	     To return error message if mandatory attributes on Entity Reference aren't populated
Applicability: DEV SU Onboarding*/

function mandatoryAttributesOnEntity(node, step, reference, check_attr, array) {
    try {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID(reference);
        if (tRef) {
            var tError = null;
            var tReferences = node.getReferences(tRef);
            if (!tReferences.isEmpty()) {
                for (var i = 0; i < tReferences.size(); i++) {
                    var tLink = tReferences.get(i);
                    var check_attr_obj = step.getAttributeHome().getAttributeByID(check_attr);
                    var attr_LovID = tLink.getValue(check_attr).getID();
                    var attr_Value = tLink.getValue(check_attr).getSimpleValue();
                    var tAttributeName = new java.util.ArrayList();
                    //var tAttributeName_2 = new java.util.ArrayList();
                    if (attr_Value == null) {
                        if (tError != null) {
                            tError = tError + "\n" + check_attr_obj.getName() + " cannot be null for " + tLink.getTarget().getName() + "(" + tRef.getName() + ").";
                        } else {
                            tError = check_attr_obj.getName() + " cannot be null for " + tLink.getTarget().getName() + "(" + tRef.getName() + ").";
                        }
                    } else if (attr_Value != null) {
                        if (attr_LovID == "1") {
                            for (var j = 0; j < array.length; j++) {
                                if ((tLink.getValue(array[j]).getSimpleValue() == null) && (array[j] != "a_mm_CommentReference" && array[j] != "a_mm_DateCompleted")) {
                                    tAttributeName.add(step.getAttributeHome().getAttributeByID(array[j]).getName());
                                    log.info("tAttributeName:" + tAttributeName);
                                }
                            }
                            if (tError != null) {
                                if (tAttributeName.size() > 0)
                                    tError = tError + "\n" + tAttributeName + " is mandatory for " + tLink.getTarget().getName() + "(" + tRef.getName() + ") if the value of " + check_attr_obj.getName() + " is " + attr_Value;
                            } else {
                                if (tAttributeName.size() > 0)
                                    tError = tAttributeName + " is mandatory for " + tLink.getTarget().getName() + "(" + tRef.getName() + ") if the value of " + check_attr_obj.getName() + " is " + attr_Value;
                            }
                        }
                        /*// Condition added for MDMI-9791 : Rahul C : BEGINS
                        else if(attr_LovID == "2" && tLink.getValue(array[2]).getSimpleValue() == null){
                            tAttributeName_2.add(step.getAttributeHome().getAttributeByID(array[2]).getName());
                            if (tError != null) {
                                if (tAttributeName_2.size() > 0)
                                    tError = tError + "\n" + "Please provide a reason in " +tAttributeName_2 + " section, why the value is \"Not Available\" for " + tLink.getTarget().getName() + "(" + tRef.getName() + ")";
                            } else {
                                if (tAttributeName_2.size() > 0)
                                    tError = "Please provide a reason in " +tAttributeName_2 + " section, why the value is \"Not Available\" for " + tLink.getTarget().getName() + "(" + tRef.getName() + ")";
                            }
                        }
                        // Condition added for MDMI-9791 : Rahul C : ENDS*/
                        else {
                            for (var j = 0; j < array.length; j++) {
                                if (tLink.getValue(array[j]).getSimpleValue() != null && step.getAttributeHome().getAttributeByID(array[j]).getName() != "Comments") {
                                    tAttributeName.add(step.getAttributeHome().getAttributeByID(array[j]).getName());
                                    log.info("tAttributeName:" + tAttributeName);
                                }
                            }
                            if (tError != null) {
                                if (tAttributeName.size() > 0)
                                    tError = tError + "\n" + tAttributeName + " should be null for " + tLink.getTarget().getName() + "(" + tRef.getName() + ") if the value of " + check_attr_obj.getName() + " is " + attr_Value;
                            } else {
                                if (tAttributeName.size() > 0)
                                    tError = tAttributeName + " should be null for " + tLink.getTarget().getName() + "(" + tRef.getName() + ") if the value of " + check_attr_obj.getName() + " is " + attr_Value;
                            }
                        }
                    }
                }
            }
            return tError;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*Name:	     createBMIFacilityGrid
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     9/8/2018
Purpose:	     To create BMIToFacilityGrid
1) Rahul Rangu - 17/02/2019 - Updated the new Facility IDs for market classification folders
2) Suman Pan - 15/01/2020 - Updated the iCount portion and checking of linked facility grid classification with the BMI as per INC10337723
3) Suman Pan - 23/04/2020 - checkStatus function's parameter is changed
4) Harshit Sharma - 15/07/2020 - As per MDMI-7709, checkStatus function check the Manufacturing Facilitry only for Food type component.
File changed for SUPPLIERFACILITYENTITY change by Rishi on <06/05/2020>
File changed for SUPPLIERFACILITYENTITY change by Kunal on <06/05/2020>
5) Suman Pan - 24/11/2020 - Change the facility grid creation logic as the Supplier grid logic is also changed as per MDMI-8795, Sprint-39
*/
function createBMIFacilityGrid(node, step, facIDHashSet) {
    var alreadyPresentFac_HashSet = new java.util.HashSet("");
    var alreadyPresentClass_HashSet = new java.util.HashSet("");
    var bmiToFacGridHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToFacilityGrid");
    if (bmiToFacGridHome) {
        var bmiToFacGrids = node.getClassificationProductLinks(bmiToFacGridHome);
        for (var a = 0; a < bmiToFacGrids.size(); a++) {
            var bmiFacGridIns = bmiToFacGrids.get(a);
            var insClassID = bmiFacGridIns.getClassification().getID();
            var bmiSuppGridFacID = bmiFacGridIns.getValue("a_mm_BMIGridSupplierId").getSimpleValue();
            var bmiFacGridFacID = bmiFacGridIns.getValue("a_mm_BMIGridFacilityId").getSimpleValue();
            if (bmiSuppGridFacID != null && bmiFacGridFacID != null && facIDHashSet.size() > 0) {
                if (facIDHashSet.contains(bmiSuppGridFacID.trim() + ":" + bmiFacGridFacID.trim())) {
                    alreadyPresentFac_HashSet.add(bmiSuppGridFacID.trim() + ":" + bmiFacGridFacID.trim());
                    alreadyPresentClass_HashSet.add(insClassID);
                } else {
                    bmiFacGridIns.delete();
                }
            } else {
                bmiFacGridIns.delete();
            }
        }
        log.info("alreadyPresentFac_HashSet: " + alreadyPresentFac_HashSet);
        log.info("alreadyPresentClass_HashSet: " + alreadyPresentClass_HashSet);
        facIDHashSet.removeAll(alreadyPresentFac_HashSet);
        log.info("facIDHashSet: " + facIDHashSet);
        var countOfClass = 1;
        var facHashSetItr = facIDHashSet.iterator();
        while (facHashSetItr.hasNext()) {
            var nextSupFacId = facHashSetItr.next();
            var splittedNextSupFacId = nextSupFacId.split(":")
            var nextSuppID = splittedNextSupFacId[0];
            var nextFacId = splittedNextSupFacId[1];
            if (nextSuppID != null && nextSuppID != "" && nextFacId != null && nextFacId != "") {
                var suppEnity = step.getEntityHome().getEntityByID(nextSuppID.trim());
                var facEnity = step.getEntityHome().getEntityByID(nextFacId.trim());
                if (suppEnity != null && facEnity != null) {
                    log.info("nextFacId: " + nextFacId);
                    var bmiToFacGrids_New = node.getClassificationProductLinks(bmiToFacGridHome);
                    for (var b = 0; b < bmiToFacGrids_New.size(); b++) {
                        var newClassID = "FacilityGrid" + countOfClass;
                        if (alreadyPresentClass_HashSet.contains(newClassID)) {
                            countOfClass++;
                        } else {
                            log.info("Class ID going to be used: " + newClassID);
                            break;
                        }
                    }
                    var newClassID_ToCreate = "FacilityGrid" + countOfClass;
                    alreadyPresentClass_HashSet.add(newClassID_ToCreate);
                    var newClassHome = step.getClassificationHome().getClassificationByID(newClassID_ToCreate);
                    if (newClassHome == null) {
                        var classRoot = step.getClassificationHome().getClassificationByID("FacilityGridHierarchy");
                        if (classRoot != null) {
                            var newClassification = classRoot.createClassification(newClassID_ToCreate, "FacilityGrid");
                            log.info("Create newClassification " + newClassification.getID());
                            newClassification.approve();
                            newClassification.setName("Facility Grid " + countOfClass);
                            newClassHome = step.getClassificationHome().getClassificationByID(newClassID_ToCreate);
                        }
                    }
                    var newBMIFacGrid = node.createClassificationProductLink(newClassHome, bmiToFacGridHome);
                    newBMIFacGrid.getValue("a_mm_BMIGridSupplierId").setSimpleValue(nextSuppID.trim());
                    newBMIFacGrid.getValue("a_mm_BMIGridSupplier").setSimpleValue(suppEnity.getName());
                    newBMIFacGrid.getValue("a_mm_BMIGridFacilityId").setSimpleValue(nextFacId.trim());
                    newBMIFacGrid.getValue("a_mm_BMIGridFacility").setSimpleValue(facEnity.getName());
                    newBMIFacGrid.getValue("a_mm_FacilityVisitRequired").setSimpleValue("Approved without site visit");
                }
            }
        }
    }
}

/*Name:	     facilityVisitRequired
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     9/8/2018
Purpose:	     To initiate Dev Facility object in Site Visit workflow if facility site visit is required
*/
function facilityVisitRequired(node, step) {
    try {
        var tBmiFacilityLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToFacilityGrid");
        var DevFacility = node.getValue("a_mm_ref_DevFacility").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change
        if (tBmiFacilityLink != null) {
            var tFacilityLinks = node.getClassificationProductLinks(tBmiFacilityLink);
            if (!tFacilityLinks.isEmpty()) {
                for (var i = 0; i < tFacilityLinks.size(); i++) {
                    var tFacilityVisit = tFacilityLinks.get(i).getValue("a_mm_FacilityVisitRequired").getSimpleValue();
                    var tFacilityId = tFacilityLinks.get(i).getValue("a_mm_BMIGridFacilityId").getSimpleValue();
                    if (tFacilityVisit == "Yes" && tFacilityId != null) {
                        var tFacilityObject = step.getEntityHome().getEntityByID(tFacilityId); //Changed as part of SUPPLIERFACILITYENTITY change
                        if (tFacilityObject != null) {
                            /*if ((tFacilityObject.getObjectType().getID() == DevFacility) && (!tFacilityObject.isInWorkflow("wf_mm_SupplierSiteVisitApproval"))) {
                                log.info("To be initiated in Supplier Site Visit Workflow");
                                tFacilityObject.startWorkflowByID("wf_mm_SupplierSiteVisitApproval", "Started");
                            }*/
                        }
                    }
                }
            }
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     conceptDateComparison
Author:	     Rishidip Roy<Rishidip.Roy@us.mcd.com>
Date:	     09/10/2018
Purpose:	     To compare Concept Test Actual date and Planned Date and put validations accordingly.
Applicability: To check Validation of Concept planned and Concept actual date among subsequent Concept Tests and also within same test.
Version History: 
1) Suman Pan - 17/03/2020 -- Code is modified as part of internal fix*/
function conceptDateComparison(node, step, date1, date2) {
    try {
        var sErrorMessage = null;
        var sError = null;


        //Set the error Message
        function setErrorMessage(sNewErrorMessage) {
            if (sErrorMessage == null)
                sErrorMessage = sNewErrorMessage;
            else {
                if (sNewErrorMessage != null)
                    sErrorMessage = sErrorMessage + "\n" + sNewErrorMessage;
            }
            return sErrorMessage;
        }
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToFieldTest");
        log.info("tRef: " + tRef);
        if (tRef) {
            var tReferences = node.getReferences(tRef);
            log.info("tReferences: " + tReferences);
            log.info("tReferences Empty: " + tReferences.isEmpty());
            if (!tReferences.isEmpty()) {
                log.info("tReferences.size: " + tReferences.size());


                for (i = 0; i < tReferences.size(); i++) {
                    /******** Changes of version 1: Start ********/
                    var dCurrentConceptTestPlannedDate = tReferences.get(i).getValue(date1).getSimpleValue();
                    var dCurrentConceptTestActualDate = tReferences.get(i).getValue(date2).getSimpleValue();

                    if (dCurrentConceptTestPlannedDate != null && dCurrentConceptTestActualDate != null) {
                        var pCurrentConceptTestPlannedDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dCurrentConceptTestPlannedDate);
                        var pCurrentConceptTestActualDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dCurrentConceptTestActualDate);
                        if (pCurrentConceptTestActualDate.before(pCurrentConceptTestPlannedDate)) {
                            sError = setErrorMessage(step.getAttributeHome().getAttributeByID(date2).getName() + " should be greater than " + step.getAttributeHome().getAttributeByID(date1).getName() + " for " + tReferences.get(i).getTarget().getName());
                        }
                    }

                    if (i != 0) {
                        var dPreviousConceptTestActualDate = tReferences.get(i - 1).getValue(date2).getSimpleValue();
                        var dPreviousConceptTestPlannnedDate = tReferences.get(i - 1).getValue(date1).getSimpleValue();
                        if (dPreviousConceptTestPlannnedDate != null && dCurrentConceptTestPlannedDate != null) {
                            dPreviousConceptTestPlannnedDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dPreviousConceptTestPlannnedDate);
                            var pCurrentConceptTestPlannedDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dCurrentConceptTestPlannedDate);
                            if (pCurrentConceptTestPlannedDate.before(dPreviousConceptTestPlannnedDate)) {
                                sError = setErrorMessage(step.getAttributeHome().getAttributeByID(date1).getName() + " for " + tReferences.get(i).getTarget().getName() + " should be greater than " + step.getAttributeHome().getAttributeByID(date1).getName() + " for " + tReferences.get(i - 1).getTarget().getName());
                            }
                        }

                        if (dPreviousConceptTestActualDate != null && dCurrentConceptTestActualDate != null) {
                            var pCurrentConceptTestActualDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dCurrentConceptTestActualDate);
                            dPreviousConceptTestActualDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dPreviousConceptTestActualDate);

                            if (pCurrentConceptTestActualDate.before(dPreviousConceptTestActualDate)) {
                                sError = setErrorMessage(step.getAttributeHome().getAttributeByID(date2).getName() + " for " + tReferences.get(i).getTarget().getName() + " should be greater than " + step.getAttributeHome().getAttributeByID(date2).getName() + " for " + tReferences.get(i - 1).getTarget().getName());
                            }
                        }

                    }
                    /******** Changes of version 1: End ********/
                }


            }
        }

        if (sError != null)
            return sError;
        else
            return null;

    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     createSMI
Author:	     Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	     09/19/2018
Purpose:	     To create SMI for Launch Approved BMI 
Applicability: In Dev BMI Ideation workflow after Launch Approval */
function createSMI(node, step) {
    try {
        if (isAttributeValid(node, step, "a_mm_Market") && isAttributeValid(node, step, "a_mm_SoldIndividually")) {
            var tMarket = node.getValue("a_mm_Market").getSimpleValue();
            var tSellingOptions = node.getValue("a_mm_SoldIndividually").getValues();
            log.info("tSellingOptions : " + tSellingOptions);
            if (!tSellingOptions.isEmpty()) {
                var tLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToSellingOption");
                var tSMIRoot = step.getProductHome().getProductByID("SMIHierarchy");
                var tRef = step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI");
                for (var i = 0; i < tSellingOptions.size(); i++) {
                    var tValueId = tSellingOptions.get(i);
                    log.info("tValueId : " + tValueId);
                    if (tMarket != null) {
                        var tClassificationId = tMarket + "_" + tValueId.getID();
                        var tClassification = step.getClassificationHome().getClassificationByID(tClassificationId);
                        if (tClassification != null && tLink != null && tSMIRoot != null && tRef != null) {
                            try {
                                node.createClassificationProductLink(tClassification, tLink);
                            } catch (e) {
                                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                    //Target Already Referenced Exception
                                    log.info("Reference Already Linked.. ");
                                }
                                else {
                                    throw "Exception : " + e;
                                }
                            }
                            var tSMI = tSMIRoot.createProduct(null, "SoldMenuItem");
                            //// Changes for MDMI - 9630 : Rahul Choudhary : BEGINS
                            //var smiMarket = node.getValue("a_mm_Market").getSimpleValue();
                            tSMI.getValue("a_mm_RFMProductClass").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_RFMProductClass").getListOfValuesValueByID("01").getValue());
                            tSMI.getValue("a_mm_RFMProductCategory").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_RFMProductCategory").getListOfValuesValueByID("01").getValue());
                            tSMI.getValue("a_mm_Saleable").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_BooleanTrueFalse").getListOfValuesValueByID("01").getValue());
                            if (tMarket == "DE" || tMarket == "FR") { // For Future Market Onboarding modify this code block : Cuurently only for DE
                                tSMI.getValue("a_mm_Allowable").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_BooleanTrueFalse").getListOfValuesValueByID("01").getValue());
                            }
                            //// Changes for MDMI - 9630 : Rahul Choudhary : ENDS
                            tSMI.createReference(node, tRef);
                            if (isAttributeValid(tSMI, step, "a_mm_SMISellingOptions")) {
                                log.info("tValueIdValue : " + tValueId.getValue());
                                tSMI.getValue("a_mm_SMISellingOptions").setSimpleValue(tValueId.getValue());
                                //var tSMISellOps = tSMI.getValue("a_mm_SMISellingOptions").getSimpleValue();
                                var tSMISellOps = tValueId.getValue();
                                if (isAttributeValid(tSMI, step, "a_mm_SMIName") && tSMISellOps != null) {
                                    var tBMIName1 = node.getValue("a_mm_BMIName").getSimpleValue();
                                    var tConCat = tBMIName1 + "-" + tSMISellOps;
                                    tSMI.getValue("a_mm_SMIName").setSimpleValue(tConCat);
                                }
                            }
                            if (isAttributeValid(tSMI, step, "a_mm_BMIName") && isAttributeValid(node, step, "a_mm_BMIName")) {
                                tSMI.getValue("a_mm_BMIName").setSimpleValue(node.getValue("a_mm_BMIName").getSimpleValue());
                            }
                            tSMI.startWorkflowByID("wf_mm_SMILaunchWorkflow", "Starting SMI Launch Workflow");
                        }
                    }
                }
            }
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     UpdateSUStatus
Author:	     Sanjay Yellapantula (Sanjay.Yellapntula@us.mcd.com)
Date:	     09/20/2018
Purpose:	     To Update the Shipping Unit Status at BMI  Level.*/
function UpdateSUStatus(node, step) {
    try {
        var count1 = 0;
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
        var tLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToSupplierGRID");
        var tRef1 = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
        log.info("tRef:" + tRef);

        if (tRef != null) {

            var nodeBMItoRCRefObject = node.getReferences(tRef); // At the reference level
            log.info("nodeBMItoRCRefObject:" + nodeBMItoRCRefObject);
            var gridReference = node.getClassificationProductLinks().get(tLink).toArray();
            var k = 0;
            for (var i = 0; i < nodeBMItoRCRefObject.size(); i++) {

                var oRCRowObject = nodeBMItoRCRefObject.get(i);
                nodeRC = oRCRowObject.getTarget().getID();
                //logger.info(nodeRC);
                var oRCObject = step.getProductHome().getProductByID(nodeRC);
                //logger.info(oRCObject);

                var nodeRCtoSURefObject = oRCObject.getReferences(tRef1).toArray();
                for (var j = 0; j < nodeRCtoSURefObject.length; j++) {
                    var oSURowObject = nodeRCtoSURefObject[j];
                    nodeSU = oSURowObject.getTarget();
                    //var oSUObject = step.getProductHome().getProductByID(oSURowObject.getTarget().getID());
                    var getPortion = nodeSU.getValue("a_mm_ShippingUnitStatus").getSimpleValue();
                    //logger.info(getPortion);
                    //logger.info(gridReference[k]);
                    gridReference[k].getValue("a_mm_ShippingUnitStatus").setSimpleValue(getPortion);
                    k = k + 1;
                }
            }
        }
    } catch (err) {
        //logger.info("Exception caught while updating SUStatus: " + err);;
        throw (err);
    }
}
/*Name:	     Update Nutrition Information on RCLevel
Author:	     Sanjay Yellapantula (Sanjay.Yellapntula@us.mcd.com)
Date:	     09/20/2018
Purpose:	     To Update the Nutrition values at RC Level.*/
function calculateNutritionScoreRC(node, step) {
    try {
        var RcLink = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
        var SULink = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
        var ShippingPackageLink = step.getReferenceTypeHome().getReferenceTypeByID("DevSUToShipingPackage");
        var ReceipeComponents = node.getReferences().get(RcLink);
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID("PhysicalCharacteristics");
        var convFactor = 0;
        var SPSize = 0;
        var AttrArray = ["a_mm_%FruitContent", "a_mm_%VegetableContent", "a_mm_NutritionComposition-AddedSugars", "a_mm_NutCompositionCarbohydrates", "a_mm_NutritionComposition-DietaryFibre", "a_mm_NutritionComposition-Energykcal",
            "a_mm_NutritionComposition-EnergykJ", "a_mm_NutCompositionMonoUnsatFattyAcids", "a_mm_NutCompositionPolyUnsatFattyAcids",
            "a_mm_NutritionComposition-Protein", "a_mm_NutritionComposition-Salt", "a_mm_NutCompositionSaturatedFattyAcids", "a_mm_NutritionComposition-Sodium",
            "a_mm_NutritionComposition-TotalFats", "a_mm_NutritionComposition-TotalSugars", "a_mm_NutCompositionTransFattyAcids", "a_mm_NutritionComposition-Water"
        ];
        var lengthOfAttrArray = AttrArray.length;
        //  logger.info(convFactor);

        for (k = 0; k < lengthOfAttrArray; k++) {
            //logger.info(AttrArray[k]);
            // logger.info(ReceipeComponents);
            for (i = 0; i < ReceipeComponents.size(); i++) {
                var linkedSMI = ReceipeComponents.get(i).getTarget();
                ReceipeComponents.get(i).getValue("a_mm_Status").setSimpleValue(linkedSMI.getValue("a_mm_Status").getSimpleValue());
                //if(linkedSMI.getValue("a_mm_Status").getSimpleValue()=="In Development")
                //{
                var sumRC = 0;
                var avgRC = 0;
                var RCValue = 0;
                var UOM = null;
                var linkedSMI = ReceipeComponents.get(i).getTarget();
                //  logger.info("Receipe Component: " + linkedSMI.getID());
                var ShipingUnits = linkedSMI.getReferences().get(SULink);
                //logger.info("ShipingUnits" + ShipingUnits);
                if (ShipingUnits.size() > 0) {
                    var convFactor = 0;
                    //   logger.info("ShipingUnits" + ShipingUnits);
                    SPSize = 0;
                    for (j = 0; j < ShipingUnits.size(); j++) {

                        var LinkedShippingUnit = ShipingUnits.get(j).getTarget();
                        //logger.info("Shipping: " + LinkedShippingUnit.getID());

                        var ShippingPackages = LinkedShippingUnit.getReferences().get(ShippingPackageLink);
                        SPSize += ShippingPackages.size();
                        if (ShippingPackages.size() > 0) {
                            //var shippingPackagesSize=ShippingPackages.size();
                            for (p = 0; p < ShippingPackages.size(); p++) {
                                var LinkedShippingPackage = ShippingPackages.get(p).getTarget();
                                // logger.info("Shipping Package: " + LinkedShippingPackage.getID());
                                // logger.info(AttrArray[k] + ":" + LinkedShippingPackage.getValue(AttrArray[k]).getSimpleValue());
                                var value = LinkedShippingPackage.getValue(AttrArray[k]).getSimpleValue();
                                //logger.info("value--" + value);
                                if (value == null) {
                                    //logger.info("inside value if");
                                    sumRC = sumRC + 0;
                                } else {
                                    //logger.info("inside value");
                                    value = String(LinkedShippingPackage.getValue(AttrArray[k]).getSimpleValue());
                                    value = value.split(" ");
                                    value = Number(value[0]);
                                    sumRC = sumRC + value;
                                }
                                //logger.info("sumRC:" + sumRC);
                                var ShippingPackage = step.getProductHome().getProductByID(LinkedShippingPackage.getID());
                                if (LinkedShippingPackage.getValue("ShippingPackageKey").getSimpleValue() == null) {
                                    var UOM = LinkedShippingPackage.getValue("HandlingUOM").getSimpleValue();
                                    if (UOM == "EA" || UOM == "KG") {
                                        var physicalCharacteristics = step.getReferenceTypeHome().getReferenceTypeByID("PhysicalCharacteristics");
                                        var PhysicalCharacteristicsvalue = LinkedShippingPackage.getReferences(physicalCharacteristics);
                                        convFactor = convFactor + Number(LinkedShippingPackage.getValue("a_mm_PreparedWeight").getSimpleValue());
                                        for (var c = 0; c < PhysicalCharacteristicsvalue.size(); c++) {
                                            var Characteristic = PhysicalCharacteristicsvalue.get(c).getTarget().getID();
                                            //logger.info(Characteristic);
                                            /*if (Characteristic == "PhyChar_005") {
                                                convFactor = convFactor + Number(PhysicalCharacteristicsvalue.get(c).getValue("a_mm_PhysicalCharacteristicsTargetValue").getSimpleValue());
                                                //density = Number(convFactor);
                                                logger.info(convFactor);
                                                break;
                                            }*/
                                        }
                                    } else if (UOM == "L") {
                                        var physicalCharacteristics = step.getReferenceTypeHome().getReferenceTypeByID("PhysicalCharacteristics");
                                        var PhysicalCharacteristicsvalue = LinkedShippingPackage.getReferences(physicalCharacteristics);
                                        for (var c = 0; c < PhysicalCharacteristicsvalue.size(); c++) {
                                            var Characteristic = PhysicalCharacteristicsvalue.get(c).getTarget().getID();
                                            //logger.info(Characteristic);
                                            if (Characteristic == "PhyChar_006") {
                                                convFactor = convFactor + Number(PhysicalCharacteristicsvalue.get(c).getValue("a_mm_PhysicalCharacteristicsTargetValue").getSimpleValue());
                                                //	density = Number(convFactor);
                                                //logger.info(convFactor);
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    var UOM = LinkedShippingPackage.getValue("HandlingUOM").getSimpleValue();
                                    if (UOM == "EA" || UOM == "KG") {
                                        convFactor = convFactor + Number(LinkedShippingPackage.getValue("a_mm_UnitConversionValue").getSimpleValue());
                                        //density = Number(convFactor);
                                        //logger.info(convFactor);
                                    } else if (UOM == "L") {
                                        convFactor = convFactor + Number(LinkedShippingPackage.getValue("a_mm_DensityValue").getSimpleValue());
                                        //density = Number(convFactor);
                                        //logger.info(convFactor);

                                    }
                                }
                                /*var PhysicalCharacteristics = ShippingPackage.getReferences(tRef);
                                for (var c = 0; c < PhysicalCharacteristics.size(); c++) {
                                    var Characteristic = PhysicalCharacteristics.get(c).getTarget().getID();
                                    logger.info(Characteristic);
                                    if (Characteristic == "PhyChar_006") {
                                        var x = Number(PhysicalCharacteristics.get(c).getValue("a_mm_PhysicalCharacteristicsTargetValue").getSimpleValue());
                                        //logger.info(x);
                                        convFactor = convFactor + x;
                                        convFactor = Number(convFactor);
                                        //  logger.info(convFactor);
                                    }
                                }*/
                                //  logger.info("uom:" + uom);
                            }
                        }
                    }
                    //logger.info("SPSize:" + SPSize);
                    if (ShipingUnits.size() > 0 && SPSize > 0) {
                        convFactor = convFactor / (SPSize);
                        //logger.info(convFactor);
                        //logger.info(SPSize);
                        ReceipeComponents.get(i).getValue("a_mm_ConversionFactor").setSimpleValue(convFactor);
                        if (UOM == "L")
                            ReceipeComponents.get(i).getValue("a_mm_SUUnitType").setSimpleValue("Ml");
                        else if (UOM == "KG")
                            ReceipeComponents.get(i).getValue("a_mm_SUUnitType").setSimpleValue("Gm");
                        else if (UOM == "EA")
                            ReceipeComponents.get(i).getValue("a_mm_SUUnitType").setSimpleValue("EA"); // Need to change when LOV is changed
                        //  ReceipeComponents.get(i).getValue("a_mm_SUUnitType").setSimpleValue(UOM);
                        avgRC = sumRC / (SPSize);
                    }
                    //	ReceipeComponents.get(i).getValue("a_mm_ConversionFactor").setSimpleValue(convFactor);
                    if (convFactor == null) {
                        convFactor = 1;
                    }
                    var ServingQuantity = ReceipeComponents.get(i).getValue("a_mm_ServingQuantity").getSimpleValue();
                    RCValue = (convFactor * ServingQuantity * avgRC) / 100;
                    //logger.info("avgRC:" + avgRC + "convFactor:" + convFactor + "ServingQuantity:" + ServingQuantity + "RCValue:" + RCValue);
                    //logger.info(RCValue.toFixed(3));
                    ReceipeComponents.get(i).getValue(AttrArray[k]).setSimpleValue(RCValue.toFixed(3))
                    //logger.info(ReceipeComponents.get(i).getValue(AttrArray[k]).getSimpleValue());
                    linkedSMI.getValue(AttrArray[k]).setSimpleValue(RCValue.toFixed(3))
                    //logger.info(linkedSMI.getValue(AttrArray[k]).getSimpleValue());
                }
                //}

            }

        }
    } catch (err) {
        throw (err);
    }
}
/*Name:	     Update Nutrition Information on BMI Level
Author:	     Sanjay Yellapantula (Sanjay.Yellapntula@us.mcd.com)
Date:	     09/20/2018
Purpose:	     To Update the Nutrition values at BMI Level.*/
function deleteBMIMultiReferenceSupplierGrid(node, step) {
    var tLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToNutritionGRID");
    var gridReference = node.getClassificationProductLinks().get(tLink).toArray();
    if (gridReference != null) {
        for (var d = 0; d < gridReference.length; d++) {
            gridReference[d].delete();
        }
    }
}

/*Name:	     getEmailIdsFromTheGroup
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     9/21/2018
Purpose:	     To retrive mail id of all users who are member of a specific user group.
Version History : Code modified as it was generating invalid recepient address : Added new variable -> eachEmailID  : Rahul C
*/
function getEmailIdsFromTheGroup(step, GroupId) {
    try {
        var team_Users = step.getGroupHome().getGroupByID(GroupId).getUsers().toArray();
        var TeamUsers_EmailIDs = "";
        var index;
        log.info("Group Is " + GroupId);
        for (var index = 0; index < team_Users.length; index++) {
            if (team_Users[index].getEMail() != null && team_Users[index].getEMail().trim() != "") {
                log.info("team_Users[index].getEMail = " + team_Users[index].getEMail());
                var eachEmailID = team_Users[index].getEMail();
                if (eachEmailID.slice(-1) == ";")
                    TeamUsers_EmailIDs += team_Users[index].getEMail();
                else
                    TeamUsers_EmailIDs += team_Users[index].getEMail() + ";";
            }
        }
        return TeamUsers_EmailIDs;
    } catch (err) {
        throw (err);
    }
}

/* 
Name    		:	br_mm_Action_NutritionData
Author  		:	Kirubakaran Gajendran
Date      	: 	August 06 2018
Purpose        : 	To Pull Nutrition Data from Suppliers on BMI
Applicability	:  	On clicking Run Business Action button 'Update BMI' used in BMI screens
*/
function populateAllergensSensitivities(node, step) {
    try {
        var supp = null;
        var supplierList = new java.util.ArrayList();
        var shippingUnits = node.getValue("LinkedShippingUnits").getSimpleValue();
        //logger.info("shippingUnits: " + shippingUnits);

        var allergens = step.getReferenceTypeHome().getReferenceTypeByID("Allergens");
        var sensitivity = step.getReferenceTypeHome().getReferenceTypeByID("Sensitivity");

        if (shippingUnits.trim() != "") {

            var shippingUnitArray = shippingUnits.split(",");
            for (var i = 0; i < shippingUnitArray.length; i++) {

                //logger.info("shippingUnitArray: " + shippingUnitArray[i]);
                supp = step.getProductHome().getProductByID(shippingUnitArray[i]);

                if (supp != null) {
                    if (supplierList.size() == 0) {

                        supplierList.add(supp.getID());
                        populateBMIAllergens(node, supp, allergens);
                        populateBMISensitivity(node, supp, sensitivity);

                    } else if (!supplierList.contains(supp.getID())) {

                        supplierList.add(supp.getID());
                        populateBMIAllergens(node, supp, allergens);
                        populateBMISensitivity(node, supp, sensitivity);
                    }
                }
            }
        }

        var repeatedAllergens = node.getValue("RepeatedAllergens").getSimpleValue();
        var repeatedMCAllergens = node.getValue("RepeatedMCAllergens").getSimpleValue();
        var addedAllergens = node.getValue("AddedAllergens").getSimpleValue();

        //logger.info("repeatedMCAllergens :: " + repeatedMCAllergens);
        //logger.info("repeatedAllergens :: " + repeatedAllergens);
        //logger.info("addedAllergens :: " + addedAllergens);

        if (addedAllergens != null || repeatedAllergens != null || repeatedMCAllergens != null) {

            var bmiAllergensComplete = node.getReferences(allergens);
            for (b = 0; b < bmiAllergensComplete.size(); b++) {

                var aller = bmiAllergensComplete.get(b);

                if (repeatedMCAllergens != null) {

                    if (repeatedMCAllergens.contains(aller.getTarget().getID()) &&
                        aller.getValue("Contains").getSimpleValue() != "May Contain") {

                        //logger.info("At End Made " + aller.getTarget().getName() + " as May Contain");

                        //Changed for MDMI-5304 - LOVValue change from Contains to Contain
                        aller.getValue("Contains").setLOVValueByID("02");
                    }
                }

                if (repeatedAllergens != null) {

                    if (repeatedAllergens.contains(aller.getTarget().getID()) &&
                        aller.getValue("Contains").getSimpleValue() != "Contain") {

                        //logger.info("At End Made " + aller.getTarget().getName() + " as Contains");
                        //Changed for MDMI-5304 - LOVValue change from Contains to Contain
                        aller.getValue("Contains").setLOVValueByID("01");
                    }
                }


                if (addedAllergens != null) {

                    if (!addedAllergens.contains(aller.getTarget().getID())) {

                        //logger.info(aller.getTarget().getName() + " is Removed");
                        aller.delete();
                    }
                }
            }
            node.getValue("RepeatedAllergens").setSimpleValue("");
            node.getValue("RepeatedMCAllergens").setSimpleValue("");
            node.getValue("AddedAllergens").setSimpleValue("");
        }

        var repeatedSensitivities = node.getValue("RepeatedSensitivities").getSimpleValue();
        var repeatedMCSensitivities = node.getValue("RepeatedMCSensitivities").getSimpleValue();
        var addedSensitivities = node.getValue("AddedSensitivities").getSimpleValue();

        //logger.info("repeatedMCSensitivities :: " + repeatedMCSensitivities);
        //logger.info("repeatedSensitivities :: " + repeatedSensitivities);
        //logger.info("addedSensitivities :: " + addedSensitivities);

        if (addedSensitivities != null || repeatedSensitivities != null || repeatedMCSensitivities != null) {

            var bmiSensitivityComplete = node.getReferences(sensitivity);
            for (b = 0; b < bmiSensitivityComplete.size(); b++) {

                var sens = bmiSensitivityComplete.get(b);

                if (repeatedMCSensitivities != null) {

                    if (repeatedMCSensitivities.contains(sens.getTarget().getID()) &&
                        sens.getValue("Contains").getSimpleValue() != "May Contain") {

                        //logger.info("At End Made " + sens.getTarget().getName() + " as May Contain");

                        //Changed for MDMI-5304 - LOVValue change from Contains to Contain
                        sens.getValue("Contains").setLOVValueByID("02");
                    }
                }

                if (repeatedSensitivities != null) {

                    if (repeatedSensitivities.contains(sens.getTarget().getID()) &&
                        sens.getValue("Contains").getSimpleValue() != "Contain") {

                        //logger.info("At End Made " + sens.getTarget().getName() + " as Contains");
                        //Changed for MDMI-5304 - LOVValue change from Contains to Contain
                        sens.getValue("Contains").setLOVValueByID("01");
                    }
                }

                if (addedSensitivities != null) {

                    if (!addedSensitivities.contains(sens.getTarget().getID())) {

                        //logger.info(sens.getTarget().getName() + " is Removed");
                        sens.delete();
                    }
                }
            }
            node.getValue("RepeatedSensitivities").setSimpleValue("");
            node.getValue("RepeatedMCSensitivities").setSimpleValue("");
            node.getValue("AddedSensitivities").setSimpleValue("");
        }



    } catch (err) {
        //logger.info("Exception caught in br_mm_Action_NutritionData-try : " + err);
        throw (err);
    }
}

//Method to Populate Allergens on BMI from Supplier Items and Shipping Unit
function populateBMIAllergens(node, supp, allergens) {

    try {

        var bmiAllergens = null;
        var suppAllergens = null;
        var contains = null;
        var supplierTarget = null;
        var allergenID = null;

        var repeatedCAllergenID = new java.util.ArrayList();
        var repeatedMCAllergenID = new java.util.ArrayList();
        var addedAllergenID = new java.util.ArrayList();

        if (supp != null) {

            suppAllergens = supp.getReferences(allergens);
            // logger.info("suppAllergens.size: " + suppAllergens.size());

            for (j = 0; j < suppAllergens.size(); j++) {

                var newAllergen = null;
                bmiAllergens = node.getReferences(allergens);
                //logger.info("bmiAllergens size: " + bmiAllergens.size());

                supplierTarget = suppAllergens.get(j);
                allergenID = supplierTarget.getTarget().getID();

                contains = supplierTarget.getValue("Contains").getSimpleValue();
                var bmiAllergIDs = node.getValue("LinkedAllergens").getSimpleValue();

                if (bmiAllergens.size() == 0) {

                    //logger.info("Added Target(): " + supplierTarget.getTarget().getName() + " as " + contains);
                    newAllergen = node.createReference(supplierTarget.getTarget(), "Allergens");
                    newAllergen.getValue("Contains").setSimpleValue(contains);
                    addedAllergenID.add(allergenID);
                    if (contains == "Contain") {
                        repeatedCAllergenID.add(allergenID);
                    }

                } else {

                    if (!bmiAllergIDs.contains(allergenID)) {

                        //logger.info("BMI don not have the Allergen already");
                        //logger.info("before" + supplierTarget.getTarget().getName());
                        //logger.info("Added Target(): " + supplierTarget.getTarget().getName() + " as " + contains);
                        //logger.info(node);
                        newAllergen = node.createReference(supplierTarget.getTarget(), "Allergens");

                        newAllergen.getValue("Contains").setSimpleValue(contains);
                        addedAllergenID.add(allergenID);
                        if (contains == "Contain") {
                            repeatedCAllergenID.add(allergenID);
                        }

                    } else if (bmiAllergIDs.contains(allergenID)) {

                        addedAllergenID.add(allergenID);
                        if (contains == "Contain") {

                            //logger.info("BMI has " + supplierTarget.getTarget().getName() + " already as Contain");
                            repeatedCAllergenID.add(allergenID);

                        } else if (repeatedCAllergenID != null && contains == "May Contain") {

                            if (!repeatedCAllergenID.contains(allergenID)) {
                                //logger.info("BMI has " + supplierTarget.getTarget().getName() + " already as May Contain");
                                repeatedMCAllergenID.add(allergenID)
                            }
                        }
                    }
                }
            }
        }

        if (repeatedCAllergenID != null) {
            addNutritionValue("RepeatedAllergens", repeatedCAllergenID);
        }
        if (repeatedMCAllergenID != null) {
            addNutritionValue("RepeatedMCAllergens", repeatedMCAllergenID);
        }
        if (addedAllergenID != null) {
            addNutritionValue("AddedAllergens", addedAllergenID);
        }

    } catch (e) {
        //logger.info("Exception caught in br_mm_Action_NutritionData-populateBMIAllergens() : " + e);
        throw (e);
    }
}

//Method to Populate Sensitivities on BMI from Supplier Items and Shipping Unit
function populateBMISensitivity(node, supp, sensitivity) {

    try {

        var bmiSensitivities = null;
        var suppSensitivities = null;
        var contains = null;
        var supplierTarget = null;
        var sensitivityID = null;

        var repeatedCSensitivityID = new java.util.ArrayList();
        var repeatedMCSensitivityID = new java.util.ArrayList();
        var addedSensitivityID = new java.util.ArrayList();

        if (supp != null) {

            suppSensitivities = supp.getReferences(sensitivity);
            //logger.info("suppSensitivities.size: " + suppSensitivities.size());

            for (j = 0; j < suppSensitivities.size(); j++) {

                var newSensitivity = null;
                bmiSensitivities = node.getReferences(sensitivity);
                //logger.info("bmiSensitivities size: " + bmiSensitivities.size());

                supplierTarget = suppSensitivities.get(j);
                sensitivityID = supplierTarget.getTarget().getID();

                contains = supplierTarget.getValue("Contains").getSimpleValue();
                var bmiSensIDs = node.getValue("LinkedSensitivities").getSimpleValue();

                if (bmiSensitivities.size() == 0) {

                    //logger.info("Added Target(): " + supplierTarget.getTarget().getName() + " as " + contains);
                    newSensitivity = node.createReference(supplierTarget.getTarget(), "Sensitivity");
                    newSensitivity.getValue("Contains").setSimpleValue(contains);
                    addedSensitivityID.add(sensitivityID);
                    if (contains == "Contain") {
                        repeatedCSensitivityID.add(sensitivityID);
                    }
                } else {

                    if (!bmiSensIDs.contains(sensitivityID)) {
                        //logger.info("BMI don not have the sensitivity already");
                        //logger.info("Added Target(): " + supplierTarget.getTarget().getName() + " as " + contains);
                        newSensitivity = node.createReference(supplierTarget.getTarget(), "Sensitivity");
                        newSensitivity.getValue("Contains").setSimpleValue(contains);
                        addedSensitivityID.add(sensitivityID);
                        if (contains == "Contain") {
                            repeatedCSensitivityID.add(sensitivityID);
                        }

                    } else if (bmiSensIDs.contains(sensitivityID)) {

                        addedSensitivityID.add(sensitivityID);
                        if (contains == "Contain") {

                            //logger.info("BMI has " + supplierTarget.getTarget().getName() + " already as Contains");
                            repeatedCSensitivityID.add(sensitivityID);

                        } else if (repeatedCSensitivityID != null && contains == "May Contain") {

                            if (!repeatedCSensitivityID.contains(sensitivityID)) {

                                //logger.info("BMI has " + supplierTarget.getTarget().getName() + " already as May Contains");
                                repeatedMCSensitivityID.add(sensitivityID);
                            }
                        }

                    }
                }
            }
        }

        if (repeatedCSensitivityID != null) {
            addNutritionValue("RepeatedSensitivities", repeatedCSensitivityID);
        }
        if (repeatedMCSensitivityID != null) {
            addNutritionValue("RepeatedMCSensitivities", repeatedMCSensitivityID);
        }
        if (addedSensitivityID != null) {
            addNutritionValue("AddedSensitivities", addedSensitivityID);
        }


    } catch (e) {
        //logger.info("Exception caught in br_mm_Action_NutritionData-populateBMISensitivity() : " + e);
        throw (e);
    }
}

//Method to Add Nutrition value in counter variables
function addNutritionValue(attributeID, counterVarArray) {

    var counterVar = counterVarArray.toString();
    if (counterVar != null) {

        if (node.getValue(attributeID).getSimpleValue() != null) {

            var nutritionValue = node.getValue(attributeID).getSimpleValue() + "," + counterVar;
            node.getValue(attributeID).setSimpleValue(nutritionValue);
        } else {

            node.getValue(attributeID).setSimpleValue(counterVar);
        }
    }
}


/*Name:	     setHelp
Author:	     Swagata Samaddar
Date:	     22/12/2022
Purpose:	     To set 'Help' attribute value for serial states.

*/
function setHelp(node, step, workflow, ent, tstate, variable) {
    try {
        var entity = step.getEntityHome().getEntityByID(ent + "_" + tstate);
        var wfHelpURL = entity.getValue("a_mm_HelpURL").getSimpleValue();
        if (wfHelpURL != null) {
            log.info("wfHelpURL" + wfHelpURL);
            node.getWorkflowInstance(workflow).setSimpleVariable(variable, wfHelpURL);
        }

    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Name:	     populateInGlobalContext
Author:	     Suman Pan
Date:	     10/22/2018
Purpose:	 To populate value of an attribute to a specific context for context specific attributes
*/
function populateInGlobalContext(step, node, attrID) {
    var tPG = node.getValue(attrID).getSimpleValue();
    log.info("product group value: " + tPG)
    var tProdID = node.getID();
    step.getProductHome().getProductByID(tProdID).getValue(attrID).setSimpleValue(tPG);
    log.info("Set Value: " + step.getProductHome().getProductByID(tProdID).getValue(attrID).getSimpleValue());
}

// Function added as per MDMI-5056 for triggering a mail to supplier user to fill in packaging attributes
/*Name:	     sendThisEmail
Author:	     Suman Pan <suman_pan.pan@us.mcd.com>
Date:	     06/20/2019
Purpose:	 To send email notification
*/
function sendThisEmail(node, step, isEmail, isSUID, isSUName, mail) {
    var tUser = step.getCurrentUser().getName();
    var tEmailHier = step.getEntityHome().getEntityByID("EmailHierarchy");
    var tUrlFromEmailHier = tEmailHier.getValue("a_mm_Environment").getSimpleValue();
    var tFrom = tEmailHier.getValue("a_mm_From(Email)").getSimpleValue();

    if (tUrlFromEmailHier != null && tFrom != null) {
        var tCurrentContext = step.getCurrentContext().getID();
        var tURL = tUrlFromEmailHier + "/webui/Mcdonalds_Supplier_Portal#contextID=Context1&workspaceID=Main&screen=ItemSupplierTaskList&stateflow=NewItemOnboarding&onlyMine=All&state=Start";
        var tSubject = "DEV Shipping Unit further Enrichment Notification - " + isSUName;

        var tBody = "Dear Supplier,</br></br>" +
            "A DEV Shipping Unit has been sent to you for further enrichment of handling attributes.</br></br>" +
            "Sent By: " + tUser + "</br>" +
            "Dev Shipping Unit ID: " + isSUID + "</br>" +
            "Dev Shipping Unit Name: " + isSUName + "</br>" +
            "Click on link to login: " + tURL + "</br></br>" +
            "Thank you";

        //mail.mail().from(tFrom).addTo(isEmail).htmlMessage(tBody).subject(tSubject).send();
    }
}

/* Name: populateShippingPackageKey
Author: Surbhi Tyagi(surbhi.tyagi@us.mcd.com) 
Date: 02/20/2019
Purpose: To populate Shipping Package key.
Version: 1)15/05/2019 -- Susovan Ghosh: Updated the code as per MDMI-4914
2)20/12/2019 -- Rishidip Roy: Updated to set suppliername ,facility name ,SIname at respective attributes on SP object 

File changed for SUPPLIERFACILITYENTITY change by Rishi,Kunal on <06/05/2020>
Version: 3)11-Aug-2020 - KirubakaranG - Added a_mm_ShippingPackageKeyGen Logic for MDMI-7872 Technical Story - SIM Number Generator
*/
function populateShippingPackageKey(node, step, SUObj) {
    log.info("Inside Start of populateShippingPackageKey");
    var ShippingPackageToDevFacility = node.getValue("a_mm_ref_ShippingPackageToDevFacility").getSimpleValue() + "";
    var ShippingPackageToSupplier = node.getValue("a_mm_ref_ShippingPackageToSupplier").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change
    var SIM_Supplier_to_Facility = node.getValue("REF_SIM_Supplier_to_Facility").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change
    var suppRef = step.getReferenceTypeHome().getReferenceTypeByID(ShippingPackageToSupplier); // Changed as part of SUPPLIERFACILITYENTITY change for ID:ShippingPackageToSupplier
    var facRef = step.getReferenceTypeHome().getReferenceTypeByID(ShippingPackageToDevFacility); //Changed as part of SUPPLIERFACILITYENTITY change for ID:ShippingPackageToDevFacility
    var supfacRef = step.getReferenceTypeHome().getReferenceTypeByID(SIM_Supplier_to_Facility); //Changed as part of SUPPLIERFACILITYENTITY change for ID:SIM_Supplier_to_Facility
    var supplierRef = node.getReferences(suppRef);
    var supplier = supplierRef.get(0).getTarget().getID();
    var suppliername = supplierRef.get(0).getTarget().getName(); //to get supplier name
    log.info("supplier id: " + supplier);
    facilityRef = node.getReferences(facRef);
    var facility = facilityRef.get(0).getTarget().getID();
    var facilityname = facilityRef.get(0).getTarget().getName(); //to get facility Name
    log.info("Facility id: " + facility);
    //Start of code change as per MDMI-4914
    var supfac = supplierRef.get(0).getTarget().getReferences(supfacRef);
    if (!supfac.isEmpty()) {
        for (var w = 0; w < supfac.size(); w++) {
            if (supfac.get(w).getTarget().getID() == facility) {
                var wsi = supfac.get(w).getValue("SIM_WSI_Number").getSimpleValue();
                if (wsi != null)
                    node.getValue("a_mm_WSI").setSimpleValue(wsi);
                approveObjectInAllContexts(node, step);
            }
        }
    }
    //End of code change as per MDMI-4914

    var SupplierItem = SUObj.getID();
    log.info("SupplierItem: " + SupplierItem);
    var SupplierItemname = SUObj.getName(); // to get SI name

    var keyname = SupplierItem + "-" + supplier + "-" + facility;
    log.info("keyname: " + keyname);
    //to set suppliername ,facility name ,SIname at respective attributes on SP object
    var suppliername_sp = node.getValue("a_mm_SupplierName").setSimpleValue(suppliername);
    var facilityname_sp = node.getValue("a_mm_FacilityName").setSimpleValue(facilityname);
    var SupplierItemname_sp = node.getValue("a_mm_ShippingUnitName").setSimpleValue(SupplierItemname);

    //Added for MDMI-7872
    var supplierGen = supplierRef.get(0).getTarget().getValue("SIM_Identifier").getSimpleValue();
    var facilityGen = facilityRef.get(0).getTarget().getValue("SIM_Identifier").getSimpleValue();
    var keynameGen = SupplierItem + "-" + supplierGen + "-" + facilityGen;
    //logger.info("keynameGen: " + keynameGen);

    if (keyname != null && keynameGen != null) {

        var ExistingSP = step.getProductHome().getObjectByKey("Shipping_Package_Key", keyname);
        if (ExistingSP == null) {
            //var ShippingPackageKey = node.getValue("ShippingPackageKey").setSimpleValue(keyname);
            node.getValue("ShippingPackageKey").setSimpleValue(keyname);
        } else {

            log.info("Shipping Package with existing key already exists in the system");
        }

        if (SupplierItem != null && supplierGen != null && facilityGen != null) {

            var ExistingSP_Gen = step.getProductHome().getObjectByKey("ShippingPackageKey_Gen", keynameGen);
            if (ExistingSP_Gen == null) {
                node.getValue("a_mm_ShippingPackageKeyGen").setSimpleValue(keynameGen);
            } else {
                log.info("Shipping Package with existing Generated key already exists in the system");
            }
        } else {
            //logger.info("a_mm_ShippingPackageKeyGen is not populated since SIM Identifier of SI/Sup/Fac is Null");
        }
    }
    log.info("Inside End of populateShippingPackageKey");
    //return keyname;
}

/*Name:	     setHelpWorkflowVariable
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     10/24/2018
Purpose:	     To set workflow variable value based on current workflow and state.
*/
/*function setHelpWorkflowVariable(node, step, workflow, state, variable) {
    try {
        var tLov = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Help");
        if (tLov) {
            var tLovValue = tLov.getListOfValuesValueByID(workflow.getID() + "_" + state);
            if (tLovValue != null) {
                node.getWorkflowInstance(workflow).setSimpleVariable(variable, tLovValue.getValue());
            }
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}*/
/*Name:	     getDate
Author:	     Sanjay Yellapantula(Sanjay.Yellapantula@us.mcd.com)
Date:	     11/04/2018
Purpose:	     To Convert String to Date Format
*/
function getDate(str) {
    var arr = str.split('-');
    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    var i = 1;
    for (i; i <= months.length; i++) {
        if (months[i] == arr[1].toString().toUpperCase()) {
            break;
        }
    }
    i = i + 1;
    var formatddate = i + '/' + arr[0] + '/' + arr[2];
    return formatddate;
}

/*Name:	     setEffectiveDateForProductLink
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     11/5/2018
Purpose:	     To check Effective From Date, Effective To Date on Product to Product Link validation.
If Effective From Date is less than Current Date return error message, if null then set it to Current Date.
If Effective To Date is less than Effective From Date return error message, if null then set it to 30/12/2099.
*/
function setEffectiveDateForProductLink(node, step, linkType) {
    try {
        var tLink = step.getReferenceTypeHome().getReferenceTypeByID(linkType);
        log.info("tLink:" + tLink);
        if (tLink) {
            var tRef = node.getReferences(tLink);
            log.info("tRef:" + tRef);
            var tError = null;
            var iCount1 = 0;
            var iCount2 = 0;
            var tCurrentContext = step.getCurrentContext().getID();
            var dCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd");
            var dCurrentDateNew = dCurrentDate.format(getCurrentDate(step, tCurrentContext));
            dCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dCurrentDateNew);
            log.info("dCurrentDateNew:" + dCurrentDateNew);
            log.info("dCurrentDate:" + dCurrentDate);
            for (i = 0; i < tRef.size(); i++) {
                log.info("Inside for");
                var dFromDate = tRef.get(i).getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var dToDate = tRef.get(i).getValue("a_mm_EffectiveToDate").getSimpleValue();
                log.info("dFromDate : " + dFromDate + " dToDate : " + dToDate)
                if (dFromDate == null) {
                    /*tRef.get(i).getValue("a_mm_EffectiveFromDate").setSimpleValue(dCurrentDateNew);
                    do nothing */

                } else {
                    dFromDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dFromDate);
                    var bFlag = dFromDate.before(dCurrentDate);
                    if (bFlag == true) {
                        iCount1++;
                    }
                }
                if (dToDate == null) {
                    /*var dDate = new java.util.Date("30-Dec-2099");
                    dDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dDate);;
                    log.info("dDate:" + dDate);
                    tRef.get(i).getValue("a_mm_EffectiveToDate").setSimpleValue(dDate);
                    do nothing*/
                } else {
                    dToDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dToDate);
                    var bFlag = dToDate.before(dFromDate);
                    if (bFlag == true) {
                        iCount2++;
                    }
                }
            }
            /* if (iCount1 > 0) {
                 if (tError == null)
                     tError = step.getAttributeHome().getAttributeByID("a_mm_EffectiveFromDate").getName() + " on Linked BMIs should be greater than or equal to Current date";
                 else
                     tError = tError + "\n" + step.getAttributeHome().getAttributeByID("a_mm_EffectiveFromDate").getName() + " on Linked BMIs should be greater than or equal to Current date";
             } */ //Commented as a part of MDMI-18215

            if (iCount2 > 0) {
                if (tError == null)
                    tError = step.getAttributeHome().getAttributeByID("a_mm_EffectiveToDate").getName() + " on Linked BMIs should be greater " + step.getAttributeHome().getAttributeByID("a_mm_EffectiveFromDate").getName();
                else
                    tError = tError + "\n" + step.getAttributeHome().getAttributeByID("a_mm_EffectiveToDate").getName() + " on Linked BMIs should be greater " + step.getAttributeHome().getAttributeByID("a_mm_EffectiveFromDate").getName();
            }
            if (tError != null)
                return tError;
            else
                return null;
        }
    } catch (err) {
        //logger.info(err);
        throw (err);
    }
}
/*Name:	     setEffectiveDateForClassificationLink
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     11/5/2018
Purpose:	     To set Effective From Date, Effective To Date on Product to Classification Link.
If Effective From Date on link is null then set it to current date or Effective From Date on Classification based on whichever is greater.
If Effective To Date on link is null then set it to value of Effective To Date on classification.
*/
function setEffectiveDateForClassificationLink(node, step, linkType) {
    try {
        var tLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID(linkType);
        if (tLink) {
            log.info("tLink:" + tLink);
            var tRef = node.getClassificationProductLinks(tLink);
            log.info("tRef:" + tRef);

            var tCurrentContext = step.getCurrentContext().getID();
            var dCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd");
            var dCurrentDateNew = dCurrentDate.format(getCurrentDate(step, tCurrentContext));
            dCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dCurrentDateNew);
            log.info("dCurrentDateNew:" + dCurrentDateNew);
            log.info("dCurrentDate:" + dCurrentDate);
            for (i = 0; i < tRef.size(); i++) {
                var dFromDate = tRef.get(i).getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var dToDate = tRef.get(i).getValue("a_mm_EffectiveToDate").getSimpleValue();
                var tClassification = tRef.get(i).getClassification();
                var dFromDateNode = null;
                var dToDateNode = null;
                var dFromDateNodeNew = null;
                if (isAttributeValid(tClassification, step, "a_mm_EffectiveFromDate") && isAttributeValid(tClassification, step, "a_mm_EffectiveToDate")) {
                    dFromDateNode = tClassification.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                    dToDateNode = tClassification.getValue("a_mm_EffectiveToDate").getSimpleValue();
                    if (dFromDateNode != null)
                        dFromDateNodeNew = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dFromDateNode);
                }

                log.info("dFromDate:" + dFromDate);
                log.info("dToDate:" + dToDate);
                log.info("dFromDateNode:" + dFromDateNode);
                log.info("dToDateNode:" + dToDateNode);
                if (dFromDate == null) {
                    log.info("Inside if");
                    if (dFromDateNodeNew != null)
                        var bFlag = dFromDateNodeNew.after(dCurrentDate);
                    log.info("bFlag:" + bFlag);
                    if (bFlag == true) {
                        if (dFromDateNode != null)
                            tRef.get(i).getValue("a_mm_EffectiveFromDate").setSimpleValue(dFromDateNode);
                    } else {
                        if (dCurrentDateNew != null)
                            tRef.get(i).getValue("a_mm_EffectiveFromDate").setSimpleValue(dCurrentDateNew);
                    }

                }
                if (dToDate == null) {
                    if (dToDateNode != null)
                        tRef.get(i).getValue("a_mm_EffectiveToDate").setSimpleValue(dToDateNode);
                }
            }
        }
    } catch (err) {
        //logger.info(err);
        throw (err);
    }

    /*Name:	     Update Nutrition Information on NonRCLevel
    Author:	     Cognizant
    Date:	     11/08/2018
    Purpose:	     To Update the Nutrition values at NonRC Level.*/
    function calculateNutritionScoreNonRC(node, step) {
        try {
            var SULink = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
            var ShippingPackageLink = step.getReferenceTypeHome().getReferenceTypeByID("DevSUToShipingPackage");
            var tRef = step.getReferenceTypeHome().getReferenceTypeByID("PhysicalCharacteristics");
            var convFactor = 0;
            var AttrArray = ["a_mm_%FruitContent", "a_mm_%VegetableContent", "a_mm_NutritionComposition-AddedSugars", "a_mm_NutCompositionCarbohydrates", "a_mm_NutritionComposition-DietaryFibre", "a_mm_NutritionComposition-Energykcal",
                "a_mm_NutritionComposition-EnergykJ", "a_mm_NutCompositionMonoUnsatFattyAcids", "a_mm_NutCompositionPolyUnsatFattyAcids",
                "a_mm_NutritionComposition-Protein", "a_mm_NutritionComposition-Salt", "a_mm_NutCompositionSaturatedFattyAcids", "a_mm_NutritionComposition-Sodium",
                "a_mm_NutritionComposition-TotalFats", "a_mm_NutritionComposition-TotalSugars", "a_mm_NutCompositionTransFattyAcids", "a_mm_NutritionComposition-Water"
            ];
            var lengthOfAttrArray = AttrArray.length;
            //logger.info(convFactor);

            for (k = 0; k < lengthOfAttrArray; k++) {
                var sumRC = 0;
                var avgRC = 0;
                var RCValue = 0;
                var uom = null;
                var ShipingUnits = node.getReferences().get(SULink);
                //logger.info("ShipingUnits" + ShipingUnits);
                if (ShipingUnits.size() > 0) {
                    var convFactor = 0;
                    //logger.info("ShipingUnits" + ShipingUnits);
                    for (j = 0; j < ShipingUnits.size(); j++) {
                        var LinkedShippingUnit = ShipingUnits.get(j).getTarget();
                        //logger.info("Shipping: " + LinkedShippingUnit.getID());

                        var ShippingPackages = LinkedShippingUnit.getReferences().get(ShippingPackageLink);
                        if (ShippingPackages.size() > 0) {
                            //var shippingPackagesSize=ShippingPackages.size();
                            for (p = 0; p < ShippingPackages.size(); p++) {
                                var LinkedShippingPackage = ShippingPackages.get(p).getTarget();
                                //logger.info("Shipping Package: " + LinkedShippingPackage.getID());
                                //logger.info(AttrArray[k] + ":" + LinkedShippingPackage.getValue(AttrArray[k]).getSimpleValue());
                                sumRC = sumRC + Number(LinkedShippingPackage.getValue(AttrArray[k]).getSimpleValue());
                                //logger.info("sumRC:" + sumRC);
                                var ShippingPackage = step.getProductHome().getProductByID(LinkedShippingPackage.getID());
                                if (uom == null || uom == "") {
                                    uom = ShippingPackage.getValue("a_mm_SUUnitType").getSimpleValue();
                                }
                                var PhysicalCharacteristics = ShippingPackage.getReferences(tRef);
                                for (var c = 0; c < PhysicalCharacteristics.size(); c++) {
                                    var Characteristic = PhysicalCharacteristics.get(c).getTarget().getID();
                                    //logger.info(Characteristic);
                                    if (Characteristic == "PhyChar_006") {
                                        var x = Number(PhysicalCharacteristics.get(c).getValue("a_mm_PhysicalCharacteristicsTargetValue").getSimpleValue());
                                        //logger.info(x);
                                        convFactor = convFactor + x;
                                        convFactor = Number(convFactor);
                                        //logger.info(convFactor);
                                    }
                                }
                                //logger.info("uom:" + uom);
                            }
                        }

                    }
                    if (ShipingUnits.size() > 0 && ShippingPackages.size() > 0) {
                        convFactor = convFactor / (ShipingUnits.size() * ShippingPackages.size());
                        //logger.info(convFactor);
                        //logger.info(ShipingUnits.size() * ShippingPackages.size());
                        node.getValue("a_mm_ConversionFactor").setSimpleValue(convFactor);
                        node.getValue("a_mm_SUUnitType").setSimpleValue(uom);
                        avgRC = sumRC / (ShipingUnits.size() * ShippingPackages.size());
                    }
                    if (convFactor == null) {
                        convFactor = 1;
                    }
                    var ServingQuantity = node.getValue("a_mm_ServingQuantity").getSimpleValue();
                    RCValue = (convFactor * ServingQuantity * avgRC) / 100;
                    //logger.info("avgRC:" + avgRC + "convFactor:" + convFactor + "ServingQuantity:" + ServingQuantity + "RCValue:" + RCValue);
                    node.getValue(AttrArray[k]).setSimpleValue(RCValue.toFixed(3));

                }

            }
        } catch (err) {
            throw (err);
        }
    }
}

/*Name:	     checkSMIEffectiveDate
Author:	     Lakshmi Sravani(Sravani.Lakshmi@us.mcd.com)
Date:	     11/9/2018
Purpose:	     To check Effective From Date, Effective To Date on SMI.
If Effective From Date is less than Current Date return error message, if null then set it to Current Date.
If Effective To Date is less than Effective From Date return error message, if null then set it to 30/12/2099.
*/
function checkSMIEffectiveDate(node, step) {
    try {

        var tError = null;
        var iCount1 = 0;
        var iCount2 = 0;
        var tCurrentContext = step.getCurrentContext().getID();
        var dCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd");
        var dCurrentDateNew = dCurrentDate.format(getCurrentDate(step, tCurrentContext));
        dCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dCurrentDateNew);
        log.info("dCurrentDateNew:" + dCurrentDateNew);
        log.info("dCurrentDate:" + dCurrentDate);
        if (isAttributeValid(node, step, "a_mm_EffectiveFromDate") && isAttributeValid(node, step, "a_mm_EffectiveToDate")) {
            var dFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
            var dToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
            if (dFromDate == null) {
                node.getValue("a_mm_EffectiveFromDate").setSimpleValue(dCurrentDateNew);
            } else {
                dFromDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dFromDate);
                var bFlag = dFromDate.before(dCurrentDate);
                if (bFlag == true) {
                    iCount1++;
                }
            }
            if (dToDate == null) {
                var dDate = new java.util.Date("30-Dec-2099");
                dDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dDate);;
                log.info("dDate:" + dDate);
                node.getValue("a_mm_EffectiveToDate").setSimpleValue(dDate);
            } else {
                dToDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dToDate);
                var bFlag = dToDate.before(dFromDate);
                if (bFlag == true) {
                    iCount2++;
                }
            }

            /*  if (iCount1 > 0) {
                  if (tError == null)
                      tError = step.getAttributeHome().getAttributeByID("a_mm_EffectiveFromDate").getName() + " on SMI should be greater than or equal to Current date";
                  else
                      tError = tError + "\n" + step.getAttributeHome().getAttributeByID("a_mm_EffectiveFromDate").getName() + " on SMI should be greater than or equal to Current date";
              }*/ // Commented as a part of MDMI-18215

            if (iCount2 > 0) {
                if (tError == null)
                    tError = step.getAttributeHome().getAttributeByID("a_mm_EffectiveToDate").getName() + " on SMI should be greater than " + step.getAttributeHome().getAttributeByID("a_mm_EffectiveFromDate").getName();
                else
                    tError = tError + "\n" + step.getAttributeHome().getAttributeByID("a_mm_EffectiveToDate").getName() + " on SMI should be greater than " + step.getAttributeHome().getAttributeByID("a_mm_EffectiveFromDate").getName();
            }
            if (tError != null)
                return tError;
            else
                return null;
        }
    } catch (err) {
        //logger.info(err);
        throw (err);
    }
}

/* 
Name: 		SMIGrpToSMIEffDateValidation
Author: 		 Suman M (suman.m@us.mcd.com) 
Date: 		 11/05/2018 
Purpose: 		Used to validate the Effective dates of SMI to SMI Group mapping.('Effective From Date' should be lesser than 'Effective To Date') 
Applicability:  Business condition button on the SMI Group Details screen, this should run SMI Group
*/

function SMIGrpToSMIEffDateValidation(node, step) {
    try {
        var errMsg = '';
        var SMIGroupEffectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var SMIGroupEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();

        if (SMIGroupEffectiveFromDate != null && SMIGroupEffectiveToDate != null) {

            var SMIGroupEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMIGroupEffectiveFromDate);
            var SMIGroupEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMIGroupEffectiveToDate);
            var CurrentDate = new java.util.Date();
            var Dateformat = new java.text.SimpleDateFormat("yyyy-MM-dd");
            var sysDate = Dateformat.format(CurrentDate);

            //var sysDate = sysDate();
            var sysDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sysDate);

            var SMIGrouopClassificationLinks = node.getClassificationProductLinks();
            for (var i = 0; i < SMIGrouopClassificationLinks.size(); i++) {
                var flag = true;
                var SMILinkObj = SMIGrouopClassificationLinks.get(i);
                var SMILinkEffectiveFromDate = SMILinkObj.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var SMILinkEffectiveToDate = SMILinkObj.getValue("a_mm_EffectiveToDate").getSimpleValue();


                // Default to SMI group Effective from date or Current date, whichever is greater, user can edit
                //Value to be populated by business rule on clicking of Submit button, ONLY in case the field is left blank by user
                if (SMILinkEffectiveFromDate == null) {
                    if (SMIGroupEffectiveFromDateObj.after(sysDateObj)) {
                        SMILinkObj.getValue("a_mm_EffectiveFromDate").setSimpleValue(SMIGroupEffectiveFromDate);
                    } else {
                        SMILinkObj.getValue("a_mm_EffectiveFromDate").setSimpleValue(sysDate);
                    }
                }
                var name = '';
                if (SMILinkObj.getProduct().getName() == null) {
                    name = SMILinkObj.getProduct().getID();
                } else {
                    name = SMILinkObj.getProduct().getName() + "(" + SMILinkObj.getProduct().getID() + ")";
                }

                //Value to be populated by business rule on clicking of Submit button, ONLY in case the field is left blank by user
                if (SMILinkEffectiveToDate == null) {
                    SMILinkObj.getValue("a_mm_EffectiveToDate").setSimpleValue(SMIGroupEffectiveToDate);
                }


                var SMILinkEffectiveFromDate = SMILinkObj.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var SMIGroupLinkEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMILinkEffectiveFromDate);

                var SMILinkEffectiveToDate = SMILinkObj.getValue("a_mm_EffectiveToDate").getSimpleValue();
                var SMIGroupLinkEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMILinkEffectiveToDate);
                if (SMIGroupLinkEffectiveFromDateObj.before(SMIGroupEffectiveFromDateObj)) {

                    errMsg = errMsg + "For the SMI '" + name + "' Effective From Date should be greater than or Equal to SMI Group Effective From Date \n";
                    //logger.info("Error msg in SMIEffectiveFromDateObj: " + errMsg);
                    flag = false;
                }

                if (SMIGroupEffectiveToDateObj.before(SMIGroupLinkEffectiveToDateObj)) {

                    errMsg = errMsg + "For the SMI '" + name + "' Effective To Date should be less than or Equal to SMI Group Effective To Date \n";
                    //logger.info("Error msg in SMIGrpToSMIEffDateValidation: " + errMsg);
                    flag = false;
                }
                if (SMIGroupLinkEffectiveToDateObj.before(SMIGroupLinkEffectiveFromDateObj)) {

                    errMsg = errMsg + "For the SMI '" + name + "' Effective From Date should be lesser than Effective To Date \n";
                    flag = false;
                }

                if (flag) {
                    try {
                        approveObjectInAllContexts(SMILinkObj.getProduct(), step);
                    } catch (e) {
                        //logger.info("Exception Caught on Validation of SMIGroup:" + e);
                        throw (e);
                    }
                }
            }
            if (errMsg)
                return errMsg;
            else
                return null;
        } else {
            return "Effective Dates are empty for the SMI Group \n";
        }

    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/* 
Name: 		 SMIGrpToResGrpEffDateValidation
Author: 		 Sanjay Yellapantula  (Sanjay.yellapantula@us.mcd.com) 
Date: 		 05/11/2018 
Purpose: 		Used to validate the Effective dates of SMI Group to Restaurant Group mapping.('Effective From Date' should be lesser than 'Effective To Date') 
Applicability:  Business condition button on the SMI Group Details screen
*/

function SMIGrpToResGrpEffDateValidation(node, step) {

    var errMsg = '';
    var name = '';
    var SMIGroupEffectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
    var SMIGroupEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMIGroupEffectiveFromDate);

    var SMIGroupEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
    var SMIGroupEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMIGroupEffectiveToDate);

    var CurrentDate = new java.util.Date();
    var Dateformat = new java.text.SimpleDateFormat("yyyy-MM-dd");
    var sysDate = Dateformat.format(CurrentDate);

    //var sysDate = sysDate();
    var sysDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sysDate);
    var RestaurantGroupLink = step.getReferenceTypeHome().getReferenceTypeByID("SMIGroupToRestaurantGroup")
    var RestaurantGroups = node.getReferences(RestaurantGroupLink);
    for (var i = 0; i < RestaurantGroups.size(); i++) {
        var flag = true;
        var SMIGrpResGrpLink = RestaurantGroups.get(i);
        var SMILinkEffectiveFromDate = SMIGrpResGrpLink.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var SMILinkEffectiveToDate = SMIGrpResGrpLink.getValue("a_mm_EffectiveToDate").getSimpleValue();
        if (SMIGrpResGrpLink.getTarget().getName() == null) {
            name = SMIGrpResGrpLink.getTarget().getID();
        } else {
            name = SMIGrpResGrpLink.getTarget().getName() + "(" + SMIGrpResGrpLink.getTarget().getID() + ")";
        }

        // Default to SMI group Effective from date or Current date, whichever is greater, user can edit
        //Value to be populated by business rule on clicking of Submit button, ONLY in case the field is left blank by user
        if (SMILinkEffectiveFromDate == null) {
            if (SMIGroupEffectiveFromDateObj.before(sysDateObj)) {
                SMIGrpResGrpLink.getValue("a_mm_EffectiveFromDate").setSimpleValue(sysDate);
            } else {
                SMIGrpResGrpLink.getValue("a_mm_EffectiveFromDate").setSimpleValue(SMIGroupEffectiveFromDate);
            }
        }

        //Value to be populated by business rule on clicking of Submit button, ONLY in case the field is left blank by user
        if (SMILinkEffectiveToDate == null) {
            SMIGrpResGrpLink.getValue("a_mm_EffectiveToDate").setSimpleValue(SMIGroupEffectiveToDate);
        }


        var SMILinkEffectiveFromDate = SMIGrpResGrpLink.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var SMIGroupLinkEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMILinkEffectiveFromDate);

        var SMILinkEffectiveToDate = SMIGrpResGrpLink.getValue("a_mm_EffectiveToDate").getSimpleValue();
        var SMIGroupLinkEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMILinkEffectiveToDate);

        if (SMIGroupLinkEffectiveFromDateObj.before(SMIGroupEffectiveFromDateObj)) {
            // logger.info("sysDateObj" + sysDateObj);
            errMsg = errMsg + "For the Restaurant Group '" + name + "' Effective From Date should be greater than or Equal to SMI Group Effective From Date \n";
            flag = false;
        }
        if (SMIGroupEffectiveToDateObj.before(SMIGroupLinkEffectiveToDateObj)) {
            errMsg = errMsg + "For the Restaurant Group '" + name + "' Effective To Date should be less than or Equal to SMI Group Effective To Date \n";
            //logger.info("Error msg in NRCGroupEffectiveFromDateObj: "+errMsg);
            flag = false;
        }
        if (SMIGroupLinkEffectiveToDateObj.before(SMIGroupEffectiveFromDateObj)) {
            errMsg = errMsg + "For the Restaurant Group '" + name + "' Effective From Date should be lesser than Effective To Date \n";
            flag = false;
        }

        if (flag) {
            try {
                approveObjectInAllContexts(SMIGrpResGrpLink.getTarget(), step);
            } catch (e) {
                //logger.info(e);
                throw (e);
            }
        }
    }
    if (errMsg)
        return errMsg;
    else {

        return null;
    }
}

/* Name: 		 SMIGrpEffDateValidation
Author: 		 Suman M (suman.m@us.mcd.com) 
Date: 		 11/16/2018 
Purpose: 		Used to validate the Effective dates of SMI Group.('Effective From Date' should be lesser than 'Effective To Date') and to check the mandatory 
Version History:-
1) Suman Pan - 06/01/2020 - Effective dates and current date related validations are put inside an if block that is checking if the status of SMI group is Approved or not
*/

function SMIGrpEffDateValidation(node, step) {

    try {
        var errMsg = '';

        /*var user=step.getCurrentUser();
        var userGroup=step.getGroupHome().getGroupByID("SupplyChainCFM");*/

        var SMIGroupDescription = node.getValue("a_mm_GroupDescription").getSimpleValue();

        if (SMIGroupDescription == null) {
            errMsg = errMsg + "Group Description is mandatory \n";
        }


        var SMIGroupEffectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var SMIGroupEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();

        var CurrentDate = new java.util.Date();
        var Dateformat = new java.text.SimpleDateFormat("yyyy-MM-dd");
        var sysDate = Dateformat.format(CurrentDate);
        var sysDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sysDate);

        //var sysDate = sysDate();

        if (SMIGroupEffectiveFromDate == null) {
            node.getValue("a_mm_EffectiveFromDate").setSimpleValue(sysDate);
        }

        if (SMIGroupEffectiveToDate == null) {
            node.getValue("a_mm_EffectiveToDate").setSimpleValue("2099-12-30");
        }

        var SMIGroupEffectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var SMIGroupEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMIGroupEffectiveFromDate);

        var SMIGroupEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
        var SMIGroupEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(SMIGroupEffectiveToDate);

        /******* Start: Changes of version 1 *******/
        if (node.getValue("a_mm_SMIGroupstage").getSimpleValue() != "Approved") {
            if (SMIGroupEffectiveFromDateObj.before(sysDateObj)) {
                errMsg = errMsg + "For SMI Group '" + node.getName() + "' Effective From Date should be greater than or Equal to Current System Date \n";
            }
            if (SMIGroupEffectiveToDateObj.before(sysDateObj)) {
                errMsg = errMsg + "For SMI Group '" + node.getName() + "' Effective To Date should be greater than or Equal to Current System Date \n";
            }
        }
        /******* End: Changes of version 1 *******/

        if (SMIGroupEffectiveToDateObj.before(SMIGroupEffectiveFromDateObj)) {
            errMsg = errMsg + "SMI Group Effective From Date should be lesser than Effective To Date \n";
        }

        if (errMsg)
            return errMsg;
        else {

            return null;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/* Name: 		 SetAssignee
Author: 		 Sanjay yellapantula (sanjay.yellapantula@us.mcd.com) 
Date: 		 11/26/2018 
Purpose: 		To Assign the task to the user dynamically 
*/
function setAssignee(node, step, workflow, state) {
    try {
        var LOVID = workflow.getID() + "_" + state;
        var tLov = step.getListOfValuesHome().getListOfValuesByID("LOV_Assignee");
        var Group = tLov.getListOfValuesValueByID(LOVID).getValue();
        var UserGroup = step.getGroupHome().getGroupByID(Group)
        var task = node.getWorkflowInstance(workflow).getTaskByID(state);
        task.reassign(UserGroup);
    } catch (err) {
        //logger.info("Throw Error" + err);
        throw (err);
    }
}

/* 
Name    	:	setAllergenStatements
Author  	:	Suman Pan
Date      	:	03/05/2019
Purpose     :	To set the values of Allergen Statement attributes
*/
function setAllergenStatements(node, step) {
    var tAllergens = step.getReferenceTypeHome().getReferenceTypeByID("Allergens");
    if (tAllergens) {
        var tAllergenLink = node.getReferences(tAllergens);
        log.info("tAllergenLink.size() :" + tAllergenLink.size());
        node.getValue("a_mm_AllergenStatement").setSimpleValue(null);
        node.getValue("a_mm_AllergenStatementLocal").setSimpleValue(null);
        if (tAllergenLink.size() > 0) {
            if (isAttributeValid(node, step, "a_mm_AllergenStatement") && isAttributeValid(node, step, "a_mm_AllergenStatementLocal")) {
                var tAllergenStatementEng = null;
                var tAllergenStatementLoc = null;
                var tAllergenLocaleLOV = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_AllergenLocale");
                var tNewHashSet = new java.util.LinkedHashSet(); // new

                for (var i = 0; i < tAllergenLink.size(); i++) {
                    var tAllergenID = tAllergenLink.get(i).getTarget().getID();
                    var tAllergenTarget = tAllergenLink.get(i).getTarget().getName();
                    var tAllergenContains = tAllergenLink.get(i).getValue("Contains").getSimpleValue();
                    if (tAllergenContains != null && tAllergenContains != "Not Contain" && tAllergenID != null) {
                        var tAllergenLocaleLOVvalue = tAllergenLocaleLOV.getListOfValuesValueByID(tAllergenID).getValue();
                        tNewHashSet.add(tAllergenLocaleLOVvalue); // new

                        if (tAllergenStatementEng == null) {
                            tAllergenStatementEng = tAllergenTarget;
                        } else {
                            tAllergenStatementEng = tAllergenStatementEng + "," + tAllergenTarget;
                        }
                    }
                }

                var tItr = tNewHashSet.iterator();
                while (tItr.hasNext()) {
                    var tNext = tItr.next();
                    if (tAllergenStatementLoc == null) {
                        tAllergenStatementLoc = tNext;
                    } else {
                        tAllergenStatementLoc = tAllergenStatementLoc + "," + tNext;
                    }
                }

                if (tAllergenStatementEng != null && tAllergenStatementLoc != null) {
                    log.info("tAllergenStatementEng :" + tAllergenStatementEng);
                    log.info("tAllergenStatementLoc :" + tAllergenStatementLoc);
                    node.getValue("a_mm_AllergenStatement").setSimpleValue(tAllergenStatementEng);
                    node.getValue("a_mm_AllergenStatementLocal").setSimpleValue(tAllergenStatementLoc);
                }
            }
        }
    }
}

/* 
Name: 		NRCGrpToNRCEffDateValidation
Author:		Kirubakaran Gajendran
Date: 		 26/11/2018 
Purpose: 		Used to validate the Effective dates of NRC to NRC Group mapping.('Effective From Date' should be lesser than 'Effective To Date') 
Applicability:  Business condition button on the NRC Group Details screen, this should run NRC Group
*/

function NRCGrpToNRCEffDateValidation(node, step) {

    try {
        var errMsg = '';
        var NRCGroupEffectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var NRCGroupEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();

        if (NRCGroupEffectiveFromDate != null && NRCGroupEffectiveToDate != null) {

            var NRCGroupEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCGroupEffectiveFromDate);
            var NRCGroupEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCGroupEffectiveToDate);
            var CurrentDate = new java.util.Date();
            var Dateformat = new java.text.SimpleDateFormat("yyyy-MM-dd");
            var sysDate = Dateformat.format(CurrentDate);

            //var sysDate = sysDate();
            var sysDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sysDate);

            var NRCGrouopClassificationLinks = node.getClassificationProductLinks();
            for (var i = 0; i < NRCGrouopClassificationLinks.size(); i++) {
                var flag = true;
                var NRCLinkObj = NRCGrouopClassificationLinks.get(i);
                var NRCLinkEffectiveFromDate = NRCLinkObj.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var NRCLinkEffectiveToDate = NRCLinkObj.getValue("a_mm_EffectiveToDate").getSimpleValue();


                // Default to NRC group Effective from date or Current date, whichever is greater, user can edit
                //Value to be populated by business rule on clicking of Submit button, ONLY in case the field is left blank by user
                if (NRCLinkEffectiveFromDate == null) {
                    if (sysDateObj.before(NRCGroupEffectiveFromDateObj)) {
                        NRCLinkObj.getValue("a_mm_EffectiveFromDate").setSimpleValue(NRCGroupEffectiveFromDate);
                    } else {
                        NRCLinkObj.getValue("a_mm_EffectiveFromDate").setSimpleValue(sysDate);
                    }
                }

                //Value to be populated by business rule on clicking of Submit button, ONLY in case the field is left blank by user
                if (NRCLinkEffectiveToDate == null) {
                    NRCLinkObj.getValue("a_mm_EffectiveToDate").setSimpleValue(NRCGroupEffectiveToDate);
                }


                var NRCLinkEffectiveFromDate = NRCLinkObj.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var NRCGroupLinkEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCLinkEffectiveFromDate);

                var NRCLinkEffectiveToDate = NRCLinkObj.getValue("a_mm_EffectiveToDate").getSimpleValue();
                var NRCGroupLinkEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCLinkEffectiveToDate);

                var name = '';
                if (NRCLinkObj.getProduct().getValue("a_mm_RecipeComponentName").getSimpleValue() == null) {
                    name = NRCLinkObj.getProduct().getID();
                } else {
                    name = NRCLinkObj.getProduct().getValue("a_mm_RecipeComponentName").getSimpleValue() + "(" + NRCLinkObj.getProduct().getID() + ")";
                }

                if (NRCGroupLinkEffectiveFromDateObj.before(NRCGroupEffectiveFromDateObj)) {

                    errMsg = errMsg + "For the Non RC '" + name + "' Effective From Date should be greater than or Equal to Non RC Group Effective From Date \n";
                    //logger.info("Error msg in NRCGroupEffectiveFromDateObj: " + errMsg);
                    flag = false;
                }

                if (NRCGroupEffectiveToDateObj.before(NRCGroupLinkEffectiveToDateObj)) {

                    errMsg = errMsg + "For the Non RC '" + name + "' Effective To Date should be less than or Equal to Non RC Group Effective To Date \n";
                    //logger.info("Error msg in NRCGrpToNRCEffDateValidation: " + errMsg);
                    flag = false;
                }
                //logger.info("NRCGroupEffectiveFromDateObj: " + NRCGroupEffectiveFromDateObj);
                //logger.info("NRCGroupEffectiveToDateObj: " + NRCGroupEffectiveToDateObj);
                if (NRCGroupLinkEffectiveToDateObj.before(NRCGroupLinkEffectiveFromDateObj)) {

                    errMsg = errMsg + "For the Non RC '" + name + "' Effective From Date should be lesser than Effective To Date \n";
                    //logger.info("Final Error msg in NRCGrpToNRCEffDateValidation: " + errMsg);
                    flag = false;
                }

                if (flag) {
                    try {
                        approveObjectInAllContexts(NRCLinkObj.getProduct(), step);
                    } catch (e) {
                        //logger.info("Exception Caught on Validation of NRCGroup:" + e);
                        throw (e);
                    }
                }
            }
            if (errMsg)
                return errMsg;
            else
                return null;
        } else {
            return "Effective Dates are empty for the NRC Group \n";
        }

    } catch (err) {
        log.info("Exception caught in NRCGrpToNRCEffDateValidation: " + err);
        throw (err);
    }
}

/* 
Name: 		 NRCGrpToResGrpEffDateValidation
Author: 	 Kirubakaran Gajendran
Date: 		 26/11/2018 
Purpose: 		Used to validate the Effective dates of NRC Group to Restaurant Group mapping.('Effective From Date' should be lesser than 'Effective To Date') 
Applicability:  Business condition button on the NRC Group Details screen
*/

function NRCGrpToResGrpEffDateValidation(node, step) {

    var errMsg = '';
    //logger.info("errMsg" + errMsg);
    var NRCGroupEffectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
    var NRCGroupEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCGroupEffectiveFromDate);

    var NRCGroupEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
    var NRCGroupEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCGroupEffectiveToDate);

    var CurrentDate = new java.util.Date();
    var Dateformat = new java.text.SimpleDateFormat("yyyy-MM-dd");
    var sysDate = Dateformat.format(CurrentDate);

    //var sysDate = sysDate();
    var sysDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sysDate);
    var RestaurantGroupLink = step.getReferenceTypeHome().getReferenceTypeByID("NonRCGroupToRestaurantGroup")
    var RestaurantGroups = node.getReferences(RestaurantGroupLink);
    for (var i = 0; i < RestaurantGroups.size(); i++) {
        var flag = true;
        var NRCGrpResGrpLink = RestaurantGroups.get(i);
        var NRCLinkEffectiveFromDate = NRCGrpResGrpLink.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var NRCLinkEffectiveToDate = NRCGrpResGrpLink.getValue("a_mm_EffectiveToDate").getSimpleValue();


        // Default to NRC group Effective from date or Current date, whichever is greater, user can edit
        //Value to be populated by business rule on clicking of Submit button, ONLY in case the field is left blank by user
        if (NRCLinkEffectiveFromDate == null) {
            if (sysDateObj.before(NRCGroupEffectiveFromDateObj)) {
                NRCGrpResGrpLink.getValue("a_mm_EffectiveFromDate").setSimpleValue(NRCGroupEffectiveFromDate);
            } else {
                NRCGrpResGrpLink.getValue("a_mm_EffectiveFromDate").setSimpleValue(sysDate);
            }
        }

        //Value to be populated by business rule on clicking of Submit button, ONLY in case the field is left blank by user
        if (NRCLinkEffectiveToDate == null) {
            NRCGrpResGrpLink.getValue("a_mm_EffectiveToDate").setSimpleValue(NRCGroupEffectiveToDate);
        }


        var NRCLinkEffectiveFromDate = NRCGrpResGrpLink.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var NRCGroupResGrpEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCLinkEffectiveFromDate);

        var NRCLinkEffectiveToDate = NRCGrpResGrpLink.getValue("a_mm_EffectiveToDate").getSimpleValue();
        var NRCGroupResGrpEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCLinkEffectiveToDate);

        var name = '';
        if (NRCGrpResGrpLink.getTarget().getName() == null) {
            name = NRCGrpResGrpLink.getTarget().getID();
        } else {
            name = NRCGrpResGrpLink.getTarget().getName() + "(" + NRCGrpResGrpLink.getTarget().getID() + ")";
        }

        /*if(NRCGroupResGrpEffectiveFromDateObj.before(NRCGroupEffectiveFromDateObj)){
                	
            errMsg = errMsg+"For the Restaurant Group '"+name+"' Effective From Date should be greater than or Equal to Non RC Group Effective From Date \n";	
            logger.info("Error msg in NRCGroupEffectiveFromDateObj: "+errMsg);
            flag = false;
        }*/
        if (NRCGroupResGrpEffectiveFromDateObj.before(NRCGroupEffectiveFromDateObj)) {
            //logger.info("sysDateObj" + sysDateObj);
            //logger.info("NRCGroupResGrpEffectiveFromDateObj" + NRCGroupResGrpEffectiveFromDateObj);
            //logger.info("NRCGroupEffectiveFromDateObj" + NRCGroupEffectiveFromDateObj);
            errMsg = errMsg + "For the Restaurant Group '" + name + "' Effective From Date should be greater than or Equal to Non RC Group Effective From Date \n";
            //logger.info("Error msg in NRCGroupEffectiveFromDateObj: " + errMsg);
            flag = false;
        }
        //logger.info(NRCGroupResGrpEffectiveFromDateObj.before(NRCGroupEffectiveFromDateObj));
        /*if(NRCGroupResGrpEffectiveToDateObj.before(sysDateObj)){
        	
            errMsg = errMsg+"For the Restaurant Group '"+name+"' Effective To Date should be greater than or Equal to Current System Date \n";	
            logger.info("Error msg in NRCGroupEffectiveToDateObj: "+errMsg);
            flag = false;
        }*/
        if (NRCGroupEffectiveToDateObj.before(NRCGroupResGrpEffectiveToDateObj)) {
            errMsg = errMsg + "For the Restaurant Group '" + name + "' Effective To Date should be less than or Equal to Non RC Group Effective To Date \n";
            //logger.info("Error msg in NRCGroupEffectiveFromDateObj: " + errMsg);
            flag = false;
        }


        if (NRCGroupResGrpEffectiveToDateObj.before(NRCGroupResGrpEffectiveFromDateObj)) {
            errMsg = errMsg + "For the Restaurant Group '" + name + "' Effective From Date should be lesser than Effective To Date \n";
            //logger.info("Final Error msg in NRCGrpToResGrpEffDateValidation: " + errMsg);
            flag = false;
        }

        if (flag) {
            try {
                approveObjectInAllContexts(NRCGrpResGrpLink.getTarget(), step);
            } catch (e) {
                //logger.info(e);
                throw (e);
            }
        }
    }
    if (errMsg)
        return errMsg;
    else {

        return null;
    }
}

/* Name: 		 NRCGrpEffDateValidation
Author: 		 Kirubakaran Gajendran
Date:	 		 26/11/2018 
Purpose: 		Used to validate the Effective dates of NRC Group.('Effective From Date' should be lesser than 'Effective To Date') and to check the mandatory 
Version History:-
1) Suman Pan - 06/01/2020 - Effective dates and current date related validations are put inside an if block that is checking if the status of NonRC group is Approved or not
*/

function NRCGrpEffDateValidation(node, step) {

    try {
        var errMsg = '';

        /*var user=step.getCurrentUser();
        var userGroup=step.getGroupHome().getGroupByID("SupplyChainCFM");*/

        var NRCGroupDescription = node.getValue("a_mm_GroupDescription").getSimpleValue();

        if (NRCGroupDescription == null) {
            errMsg = errMsg + "Group Description is mandatory \n";
        }

        var NonRCGroupNumber = node.getValue("a_mm_NonRCGroupNumber").getSimpleValue();

        if (NonRCGroupNumber == null) {
            errMsg = errMsg + "Non RC Group Number is mandatory \n";
        }


        var NRCGroupEffectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var NRCGroupEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();

        var CurrentDate = new java.util.Date();
        var Dateformat = new java.text.SimpleDateFormat("yyyy-MM-dd");
        var sysDate = Dateformat.format(CurrentDate);
        var sysDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sysDate)

        //var sysDate = sysDate();

        if (NRCGroupEffectiveFromDate == null) {
            node.getValue("a_mm_EffectiveFromDate").setSimpleValue(sysDate);
        }

        if (NRCGroupEffectiveToDate == null) {
            node.getValue("a_mm_EffectiveToDate").setSimpleValue("2099-12-30");
        }

        var NRCGroupEffectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var NRCGroupEffectiveFromDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCGroupEffectiveFromDate);

        var NRCGroupEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
        var NRCGroupEffectiveToDateObj = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(NRCGroupEffectiveToDate);

        /*********** Start: Changes of version 1 ********/
        if (node.getValue("a_mm_NonRCGroupStage").getSimpleValue() != "Approved") {
            if (NRCGroupEffectiveFromDateObj.before(sysDateObj)) {
                errMsg = errMsg + "For Non RC Group '" + node.getName() + "' Effective From Date should be greater than or Equal to Current System Date \n";
            }
            if (NRCGroupEffectiveToDateObj.before(sysDateObj)) {
                errMsg = errMsg + "For Non RC Group '" + node.getName() + "' Effective To Date should be greater than or Equal to Current System Date \n";
            }
        }
        /*********** End: Changes of version 1 ********/

        if (NRCGroupEffectiveToDateObj.before(NRCGroupEffectiveFromDateObj)) {
            errMsg = errMsg + "For Non RC Group '" + node.getName() + "' Effective From Date should be lesser than Effective To Date \n";
        }
        //logger.info("Final Error msg in NRCGrpEffDateValidation: " + errMsg);
        if (errMsg)
            return errMsg;
        else {

            return null;
        }
    } catch (err) {
        log.info("Exception Caught in NRCGrpEffDateValidation: " + err);
        throw (err);
    }
}

/* 
Name: updateRestToRestGrp
Author: Suman M(suman.m@us.mcd.com) 
Date: 11/28/2018
Purpose: Function to create the Restaurant Groups depending on the Restaurant Type mentioned in the Restaurants and to link the Restaurants to RestaurantGroups
*/

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.position = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return i;
        }
    }
    return false;
}

function updateRestToRestGrp(node, step) {
    try {
        var tCurrentContext = step.getCurrentContext().getID();
        var restTypes = [],
            rests = new Array(),
            restGroups = [],
            pos = null;
        // ***** DE context*****
        if (tCurrentContext.equals("Context3")) { // For Future Market Onboarding modify this code block: currently only for Context 3

            //******* Get the Restaurants and the Restaurant Type **********
            var restRoot = step.getProductHome().getProductByID("RestaurantHierarchy");
            var restsList = restRoot.getChildren().iterator();
            while (restsList.hasNext()) {

                var rest = restsList.next();
                var restMarket = rest.getValue("a_mm_Market").getSimpleValue();
                if (restMarket != null) {

                    if (restMarket.equals("DE")) { // For Future Market Onboarding modify this code block: currently only for DE
                        var lovValues = rest.getValue("a_mm_RestaurantType").getValues().iterator();
                        while (lovValues.hasNext()) {
                            var lovVal = lovValues.next().getValue();

                            if (restTypes.contains(lovVal)) {
                                //logger.info("in IF");
                                pos = restTypes.position(lovVal)
                                rests[pos].push(rest.getID());

                            } else {
                                //logger.info("in Else");
                                restTypes.push(lovVal);
                                pos = restTypes.position(lovVal);
                                rests.push(new Array());
                                rests[pos].push(rest.getID());

                            }

                        }

                    }

                }
            } //******end******

            //******** Check/Create the Restaurant Groups ****************
            var restGrpRootDE = step.getClassificationHome().getClassificationByID(restMarket + "RestaurantGroups");
            var restGrps = restGrpRootDE.getChildren().iterator();
            var restGrpArray = [];
            while (restGrps.hasNext()) {
                restGrpArray.push(restGrps.next());
            }

            for (i = 0; i < restTypes.length; i++) {
                var restTypeFlag = false;
                var restType = restTypes[i];
                for (j = 0; j < restGrpArray.length; j++) {
                    var restGrpName = restGrpArray[j].getName();
                    if (restGrpName != null) {
                        if (restGrpName.equals(restType)) {
                            restTypeFlag = true;
                            restGroups[i] = restGrpArray[j];
                            break;
                        }

                    }
                }

                if (restTypeFlag == false) {
                    var newRestGrp = restGrpRootDE.createClassification(null, "RestaurantGroups");
                    newRestGrp.setName(restType);
                    //position = restTypes.contains(restType);
                    restGroups[i] = newRestGrp;
                }

            } // ***** end *******

            // ***** To link the Restaurant to RestaurantGroups*********
            var restToRestGrpLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID("RestaurantToRestaurantGroups");
            for (i = 0; i < restTypes.length; i++) {
                //logger.info(restTypes[i] + " ID: " + restGroups[i].getID());
                var restGrpObj = restGroups[i];
                restGrpObj.getValue("a_mm_RestaurantGroupDescription").setSimpleValue(restTypes[i]);
                for (j = 0; j < rests[i].length; j++) {
                    var restID = rests[i][j];
                    var restObj = step.getProductHome().getProductByID(restID);
                    try {
                        restObj.createClassificationProductLink(restGrpObj, restToRestGrpLink);

                    } catch (e) {
                        //logger.info("Restaurant " + restID + " already linked to Restaurant Group " + restGrpObj.getID());
                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                            //Target Already Referenced Exception
                            log.info("Reference Already Linked.. ");
                        }
                        else {
                            throw "Exception : " + e;
                        }
                    }

                }
            } // ***** end ******
        }

    } catch (err) {
        log.info("err" + err);
        throw (err);
    }
}


/*Name:	     ValidateNRCGroupNumbers
Author:	     Kirubakaran Gajendran
Date:	     04 Dec 2018
Purpose:	 To validate the Uniqueness of Non RC Group Numbers.*/

function ValidateNRCGroupNumbers(node, step) {

    try {
        var condition = null;
        var nonRCNumber = node.getValue("a_mm_NonRCGroupNumberOPs").getSimpleValue();

        //Validate whether Entered NON RC Number is already present for any other NON RC Group

        var nonRCUKMarket = step.getClassificationHome().getClassificationByID("NonRCGroupUK");
        var nonRCDEMarket = step.getClassificationHome().getClassificationByID("NonRCGroupDE");

        var NonRCUKGroups = nonRCUKMarket.getChildren();
        var NonRCDEGroups = nonRCDEMarket.getChildren();


        //Validate UK Non RC Group numbers
        if (node.getParent().getID() == "NonRCGroupUK") {
            for (var i = 0; i < NonRCUKGroups.size(); i++) {
                var nonRCUKGrp = NonRCUKGroups.get(i);
                var nonRCUKGrpNum = nonRCUKGrp.getValue("a_mm_NonRCGroupNumber").getSimpleValue();
                //logger.info("nonRCNumber: " + nonRCNumber);
                //logger.info("nonRCUKGrpNum: " + nonRCUKGrpNum);

                if (nonRCUKGrp.getID() != node.getID() && nonRCNumber != null && nonRCUKGrpNum == nonRCNumber) {
                    condition = "\n Entered 3 Digit Non RC Group Number '" + nonRCNumber + "' is already present for another Non RC Group \n";
                    return condition;
                }
            }
        }

        //Validate DE Non RC Group numbers
        if (node.getParent().getID() == "NonRCGroupDE") {
            for (var i = 0; i < NonRCDEGroups.size(); i++) {
                var nonRCDEGrp = NonRCDEGroups.get(i);
                var nonRCDEGrpNum = nonRCDEGrp.getValue("a_mm_NonRCGroupNumber").getSimpleValue();
                //logger.info("nonRCNumber: " + nonRCNumber);
                //logger.info("nonRCDEGrpNum: " + nonRCDEGrpNum);
                if (nonRCDEGrp.getID() != node.getID() && nonRCNumber != null && nonRCDEGrpNum == nonRCNumber) {
                    condition = "\n Entered 3 Digit Non RC Group Number '" + nonRCNumber + "' is already present for another Non RC Group \n";
                    return condition;
                }
            }
        }

        return condition;

    } catch (err) {
        //logger.info("Exception caught in ValidateNRCGroupNumbers: " + err);;
        throw (err);
    }
}

/* Name: calculateNutScoreRCGridFromTargetRC
Author: Kirubakaran Gajendran(MC74931)
Date: 02/26/2019
Purpose: To populate BMItoRC Ref Meta data values at BMI with Target RC Values.

function calculateNutScoreRCGridFromTargetRC(node, step) {

    try {
        var RcLink = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");        
        var ReceipeComponents = node.getReferences().get(RcLink);
    	
        var AttrArray = ["a_mm_%FruitContent", "a_mm_%VegetableContent", "a_mm_NutritionComposition-AddedSugars", "a_mm_NutCompositionCarbohydrates", "a_mm_NutritionComposition-DietaryFibre", "a_mm_NutritionComposition-Energykcal",
        "a_mm_NutritionComposition-EnergykJ", "a_mm_NutCompositionMonoUnsatFattyAcids", "a_mm_NutCompositionPolyUnsatFattyAcids",
        "a_mm_NutritionComposition-Protein", "a_mm_NutritionComposition-Salt", "a_mm_NutCompositionSaturatedFattyAcids", "a_mm_NutritionComposition-Sodium",
        "a_mm_NutritionComposition-TotalFats", "a_mm_NutritionComposition-TotalSugars", "a_mm_NutCompositionTransFattyAcids", "a_mm_NutritionComposition-Water"
        ];
        var lengthOfAttrArray = AttrArray.length;
    	
    	
        for (k = 0; k < lengthOfAttrArray; k++) {			
                	
            for (i = 0; i < ReceipeComponents.size(); i++) {

                var linkedSMI = ReceipeComponents.get(i).getTarget();
                logger.info("Calculating for RC '"+linkedSMI.getID()+"'");
                  ReceipeComponents.get(i).getValue("a_mm_Status").setSimpleValue(linkedSMI.getValue("a_mm_Status").getSimpleValue());
            	
                logger.info("RC Target Value for '"+AttrArray[k]+"' : "+linkedSMI.getValue(AttrArray[k]).getSimpleValue());
                logger.info("RC Meta-data Value for '"+AttrArray[k]+"' : "+ReceipeComponents.get(i).getValue(AttrArray[k]).getSimpleValue());					                
            	
                ReceipeComponents.get(i).getValue(AttrArray[k]).setSimpleValue(linkedSMI.getValue(AttrArray[k]).getSimpleValue());		
            }
        }
                    
    } catch (err) {
        logger.info("Exception Caught in calculateNutScoreRCGridFromTargetRC: "+err);
        throw (err);
    }
}*/
//Modified function as per PRB ticket "PRB9012930" 
function calculateNutScoreRCGridFromTargetRC(node, step) {

    try {
        var RcLink = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
        var ReceipeComponents = node.getReferences().get(RcLink);

        var AttrArray = ["a_mm_%FruitContent", "a_mm_%VegetableContent", "a_mm_NutritionComposition-AddedSugars", "a_mm_NutCompositionCarbohydrates", "a_mm_NutritionComposition-DietaryFibre", "a_mm_NutritionComposition-Energykcal",
            "a_mm_NutritionComposition-EnergykJ", "a_mm_NutCompositionMonoUnsatFattyAcids", "a_mm_NutCompositionPolyUnsatFattyAcids",
            "a_mm_NutritionComposition-Protein", "a_mm_NutritionComposition-Salt", "a_mm_NutCompositionSaturatedFattyAcids", "a_mm_NutritionComposition-Sodium",
            "a_mm_NutritionComposition-TotalFats", "a_mm_NutritionComposition-TotalSugars", "a_mm_NutCompositionTransFattyAcids", "a_mm_NutritionComposition-Water"
        ];
        var lengthOfAttrArray = AttrArray.length;


        for (k = 0; k < lengthOfAttrArray; k++) {

            for (i = 0; i < ReceipeComponents.size(); i++) {

                // Change for MDMI-9797 : Rahul C : BEGINS
                var attributeHome = step.getAttributeHome().getAttributeByID(AttrArray[k]);
                //var contextSpecGetObj = step.getObjectFromOtherManager(attributeHome);
                //var roundingDecValue = contextSpecGetObj.getValue("a_mm_RoundingDecimalMetaData").getSimpleValue();
                ////////////////////////

                var marketValue = node.getValue("a_mm_Market").getSimpleValue();
                var roundingDecValue = fetchValueFromSpecificContext(step, marketValue, attributeHome, "a_mm_RoundingDecimalMetaData", false);

                ///////////////////////
                // Change for MDMI-9797 : Rahul C : ENDS

                var linkedSMI = ReceipeComponents.get(i).getTarget();
                //logger.info("Calculating for RC '" + linkedSMI.getID() + "'");
                ReceipeComponents.get(i).getValue("a_mm_Status").setSimpleValue(linkedSMI.getValue("a_mm_Status").getSimpleValue());

                //logger.info("RC Target Value for '" + AttrArray[k] + "' : " + linkedSMI.getValue(AttrArray[k]).getSimpleValue());
                //logger.info("RC Meta-data Value for '" + AttrArray[k] + "' : " + ReceipeComponents.get(i).getValue(AttrArray[k]).getSimpleValue());
                var conversionFactor = 0;
                var baseServingQtyUOM = ReceipeComponents.get(i).getTarget().getValue("a_mm_BaseServingQuantityUOM").getSimpleValue();
                var baseServingQtyUOMID = ReceipeComponents.get(i).getTarget().getValue("a_mm_BaseServingQuantityUOM").getID();

                var technicalServingQuantity = Number(ReceipeComponents.get(i).getValue("a_mm_ServingQuantityTechnical").getSimpleValue());
                var servingSize = 0;
                //logger.info("baseServingQtyUOM" + baseServingQtyUOM);
                if (baseServingQtyUOM == "grams" || baseServingQtyUOM == "OZ") {
                    conversionFactor = 1;
                }
                /*else if (baseServingQtyUOM == "individual") {
                    conversionFactor = Number(ReceipeComponents.get(i).getTarget().getValue("a_mm_CookedWeight").getSimpleValue());
                }*/
                // Code change for MDMI-10041 : Rahul C  : BEGINS
                else if (baseServingQtyUOMID == "2" && ReceipeComponents.get(i).getTarget().getValue("IsLiquid").getSimpleValue() == "No") {
                    conversionFactor = Number(ReceipeComponents.get(i).getTarget().getValue("a_mm_CookedWeight").getSimpleValue());
                } else if (baseServingQtyUOMID == "2" && ReceipeComponents.get(i).getTarget().getValue("IsLiquid").getSimpleValue() == "Yes") {
                    var recipeComponentObject = ReceipeComponents.get(i).getTarget();
                    var recipeComponentCookedWeight = recipeComponentObject.getValue("a_mm_CookedWeight").getSimpleValue();
                    if (marketValue != "US") {
                        var recipeComponentUnitWeight = pimGramConversion(recipeComponentObject, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                    } else {
                        var recipeComponentUnitWeight = pimOzConversion(recipeComponentObject, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                    }
                    if (recipeComponentCookedWeight != null) {
                        conversionFactor = Number(recipeComponentCookedWeight);
                    } else {
                        conversionFactor = Number(recipeComponentUnitWeight);
                    }
                }
                // Code change for MDMI-10041 : Rahul C  : ENDS
                else if (baseServingQtyUOM == "ml" || baseServingQtyUOM == "FL OZ") {
                    conversionFactor = Number(ReceipeComponents.get(i).getTarget().getValue("a_mm_Density").getSimpleValue());
                }
                //logger.info("conversionFactor" + conversionFactor);
                //logger.info("technicalServingQuantity" + technicalServingQuantity);
                ReceipeComponents.get(i).getValue("a_mm_ConversionFactor").setSimpleValue(conversionFactor.toFixed(7));
                servingSize = Number(technicalServingQuantity) * Number(conversionFactor);
                //logger.info("servingSize" + servingSize)
                ReceipeComponents.get(i).getValue("a_mm_ServingSizeUOM").setSimpleValue("grams");
                ReceipeComponents.get(i).getValue("a_mm_ServingSize").setSimpleValue(servingSize);
                ReceipeComponents.get(i).getValue("a_mm_ServingSizeRounded").setSimpleValue(servingSize.toFixed(5));
                if (linkedSMI.getValue(AttrArray[k]).getSimpleValue() != null) { // modified as per PRB ticket
                    var RCValue = (Number(linkedSMI.getValue(AttrArray[k]).getSimpleValue()) * Number(servingSize)) / 100;
                    //ReceipeComponents.get(i).getValue(AttrArray[k]).setSimpleValue(RCValue.toFixed(4)); //modified // Commented for MDMI-9797
                    ReceipeComponents.get(i).getValue(AttrArray[k]).setSimpleValue(RCValue.toFixed(roundingDecValue)); // Rounding it for MDMI-9797
                    //logger.info("ReceipeComponents.get(i).getValue(AttrArray[k]).getSimpleValue()" + ReceipeComponents.get(i).getValue(AttrArray[k]).getSimpleValue())
                } else {
                    ReceipeComponents.get(i).getValue(AttrArray[k]).setSimpleValue(null);
                }
            }
        }

    } catch (err) {
        //logger.info("Exception Caught in calculateNutScoreRCGridFromTargetRC: " + err);
        throw (err);
    }
}

/* Name: NA
Author: Susovan Ghosh<Susovan.Ghosh@uk.mcd.com>
Date: 02/26/2019
Purpose:Email Id Validation
*/
function EmailValidation(node, step, emailAttr) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //logger.info("Email reg exp " + re);
    if (isAttributeValid(node, step, emailAttr)) {
        var Email = node.getValue(emailAttr).getSimpleValue();
        if (Email != null) {
            var emailValidated = re.test(String(Email).toLowerCase());
            if (emailValidated == false) {
                return "Incorrect email address. Please enter a valid Email Id for: " + step.getAttributeHome().getAttributeByID(emailAttr).getName();
            }
        }

    }


    return null;
}


/* Name: attrDuplicateCheck
Author: Sanjay Yellapantula<Sanjay.yellapantula@uk.mcd.com>
Date: 03/22/2019
Purpose:Duplicate object search
Revision History:
1) Rahul Rangu -- 25/03/2019 -- Modified Error Message
2) Rahul Choudhary -- 26/04/2021 - Added the condition for skipping the BMI versions as multiple BMI's versions can have the same name : MDMI-9879
3) Pratik Deshmuk -- Added Duplicate check With the help of Meta Data Attribute (e.g US wants to allow Duplicate names for BMI and SMI Name) : MDMI-14323
*/
function attrDuplicateCheck(node, step, Attribute, statusAttribute) {
    var attributeObj = step.getAttributeHome().getAttributeByID(Attribute);
    var name = node.getValue(Attribute).getSimpleValue();
    var market = node.getValue("a_mm_Market").getSimpleValue();
    //logger.info("Outside isDuplicateAllowed" + attributeObj);
    var isDuplicateAllowed = fetchValueFromSpecificContext(step, market, attributeObj, "a_mm_IsDuplicateAllowedMetaData", true);

    if (isDuplicateAllowed != "01") {
        //logger.info("Inside isDuplicateAllowed " + isDuplicateAllowed);

        if (name != null) {
            name = name.trim();
        }

        var tError = null;
        var searchResObjType, searchResObjMarket, searchResObjStatus, searchResObjID;
        var searchQuery = new com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification(com.stibo.core.domain.Product, attributeObj, name);
        var searchResults = step.getHome(com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome).querySingleAttribute(searchQuery).asList(100);
        var nodeMenuCode = node.getValue("a_mm_BMIMenuCode").getSimpleValue(); // Added for MDMI-9879
        var ObjectType = node.getObjectType().getID();

        if (searchResults.size() > 0) {
            for (i = 0; i < searchResults.size(); i++) {
                searchResObjType = searchResults.get(i).getObjectType().getID();
                searchResObjMarket = searchResults.get(i).getValue("a_mm_Market").getSimpleValue();
                searchResObjStatus = searchResults.get(i).getValue(statusAttribute).getSimpleValue();
                searchResObjID = searchResults.get(i).getID();
                // Condition for MDMI-9879 : Rahul Choudhary : BEGINS

                if (ObjectType == "BaseMenuItem" && searchResObjType == ObjectType && searchResObjMarket == market && searchResObjStatus != "Archived") {

                    var searchResObjTypeMenuCode = searchResults.get(i).getValue("a_mm_BMIMenuCode").getSimpleValue();


                    if (nodeMenuCode == null && searchResObjTypeMenuCode == null && node.getID() != searchResObjID) {

                        tError = node.getObjectType().getName() + " with same Name already exists in the system with status as '" + searchResObjStatus + "'. Please choose a different Name to continue. ";
                        //log.info("Condition 1");
                        return tError;
                    } else if (nodeMenuCode != searchResObjTypeMenuCode && node.getID() != searchResObjID) {

                        tError = node.getObjectType().getName() + " with same Name already exists in the system with status as '" + searchResObjStatus + "'. Please choose a different Name to continue. ";
                        //log.info("Condition 2");
                        return tError;
                    } else if (nodeMenuCode == searchResObjTypeMenuCode && node.getID() != searchResObjID && nodeMenuCode != null && searchResObjTypeMenuCode != null) {
                        //log.info("Condition 3");
                        continue;
                        //return true;
                    }

                }

                // Condition for MDMI-9879 : Rahul Choudhary : ENDS
                else if (searchResObjType == ObjectType && searchResObjMarket == market && searchResObjStatus != "Archived" && searchResObjStatus != "Rejected" && searchResObjID != node.getID()) {
                    var smiFlag = searchResults.get(i).getValue("a_mm_PrimaryOrAlternateIndicator").getSimpleValue();
                    if (ObjectType == "SoldMenuItem" && market == "US" && smiFlag == "Alternate") {
                        // do nothing
                    } else {

                        tError = node.getObjectType().getName() + " with same Name already exists in the system with status as '" + searchResObjStatus + "'. Please choose a different Name to continue. ";
                        return tError;
                    }
                }
            }

        }
        return true;
    }
    return true;
}

/* Name: Duplicate_RC_SU_RelationhQuery
Author: Sanjay Yellapantula<Sanjay.yellapantula@uk.mcd.com>
Date: 03/22/2019
Purpose: Duplicate RC_SU Link validation.
*/
function Duplicate_RC_SU_Relation(node, step) {
    var tError = null;
    var tRCToDevSU = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var rc_market = node.getValue("a_mm_Market").getSimpleValue();
    var tReference = node.getReferences(tRCToDevSU);
    var dCount = 0;
    if (!tReference.isEmpty()) {
        var reference_length = tReference.size();
        for (var l = 0; l < tReference.size(); l++) {
            // logger.info("inside first for");
            log.info("tReference" + tReference);
            log.info("l==" + l);
            var ShippingUnit = tReference.get(l).getTarget()
            log.info("ShippingUnit outside== " + ShippingUnit.getID());
            var referencedby = ShippingUnit.getReferencedByProducts().toArray();
            //var referencedby_iterator = referencedby.iterator();
            for (var j = 0; j < referencedby.length; j++) {
                var refby_ObjectType = referencedby[j].getSource().getObjectType().getID();
                if (refby_ObjectType == "RecipeComponent") {
                    dCount++;
                }
            }
            if (dCount > 1) {
                var node_Market = node.getValue("a_mm_Market").getSimpleValue();
                for (var j = 0; j < referencedby.length; j++) {
                    //var refby_ObjectType = referencedby[j].getSource().getObjectType().getID();
                    if (referencedby[j].getReferenceType().getID() == "RecipeComponentToSupplierItem") {
                        var rcName = referencedby[j].getSource().getValue("a_mm_RecipeComponentName").getSimpleValue();
                        var refby_Market = referencedby[j].getSource().getValue("a_mm_Market").getSimpleValue();
                        if (node_Market == refby_Market && (node.getID() != referencedby[j].getSource().getID())) {
                            if (tError == null || tError == "") {
                                tError = "Dev RC cannot be submitted as there is an existing RC in the system - " + rcName + " with the same Supplier Item - " + ShippingUnit.getName() + " linked to it";
                            } else {
                                tError = tError + "\n" + "Dev RC cannot be submitted as there is an existing RC in the system - " + rcName + " with the same Supplier Item - " + ShippingUnit.getName() + " linked to it";
                            }
                        }
                    }
                }
            }
        }
    }
    if (tError != null) {
        return tError;
    } else {
        return true;
    }
}


/*Title:	Weight Conversion to Grams
Author:	Rahul Rangu
Company:	Cognizant
Date:	01/04/2019
Usage: 	This function can be used to convert any weight value with UOM into grams equivalent
*/

function gramConversion(node, attrValue, attrUOM) {
    var value = node.getValue(attrValue).getSimpleValue();
    var uomV = node.getValue(attrUOM).getSimpleValue();
    var uom = ""; if (uomV != null) uom = uomV.toLowerCase();
    //logger.info("UOM value is " + uom);
    var valueInGrams = 0;
    //logger.info("Inside gm conv function " + value + " " + uom);
    if (uom == "µg") {
        valueInGrams = Number(value) * 0.000001;
    } else if (uom == "g") {
        valueInGrams = Number(value);
    } else if (uom == "kg") {
        valueInGrams = Number(value) * 1000;
    } else if (uom == "lb") {
        valueInGrams = Number(value) * 453.592;
    } else if (uom == "mg") {
        valueInGrams = Number(value) * 0.001;
    } else if (uom == "oz") {
        valueInGrams = Number(value) * 28.3495;
    }
    return valueInGrams;
}



/*Title:	Volume Conversion to ml
Author:	Rahul Rangu
Company:	Cognizant
Date:	01/04/2019
Usage: 	This function can be used to convert any Volume value with UOM into ml equivalent
*/

function mlConversion(node, attrValue, attrUOM) { //INC17132104 - Fix for mL uom 
    var value = node.getValue(attrValue).getSimpleValue();
    var uom = node.getValue(attrUOM).getSimpleValue();
    //var uom = ""; if(uomV!=null) uom = uomV.toLowerCase();
    var valueInml = 0;
    if (uom == "cL") {
        valueInml = Number(value) * 10;
    } else if (uom == "Cu.cm") {
        valueInml = Number(value);
    } else if (uom == "Cu. Ft.") {
        valueInml = Number(value) * 28316.846592;
    } else if (uom == "Cu. In.") {
        valueInml = Number(value) * 16.387064;
    } else if (uom == "dL") {
        valueInml = Number(value) * 100;
    } else if (uom == "fl oz (UK)" || uom == "fl oz. (UK)") { //INC17404243 - 02/07/2025 - added fl oz. (UK)
        valueInml = Number(value) * 28.413064262467;
    } else if (uom == "fl oz (US)" || uom == "fl oz. (US)") { //INC17404243 - 02/07/2025 - added fl oz. (UK)
        valueInml = Number(value) * 29.5735295625;
    } else if (uom == "gal (UK)") {
        valueInml = Number(value) * 4546.0902819948;
    } else if (uom == "gal (US)") {
        valueInml = Number(value) * 3785.411784;
    } else if (uom == "kL") {
        valueInml = Number(value) * 1000000;
    } else if (uom == "L") {
        valueInml = Number(value) * 1000;
    } else if (uom == "m3") {
        valueInml = Number(value) * 1000000;
    } else if (uom == "ml" || uom == "mL") { // INC17132104 - End
        valueInml = Number(value);
    }
    return valueInml;
}

/*Title:	updateMerlinNutritionInfo
Author:		Surbhi Tyagi
Company:	Cognizant
Date:		2nd May 2019
Usage: 		This function can be used to update allergen values on BMI and SMI level from RC level
Version History:
            1)12/05/2019 -- Susovan Ghosh: Optimised the code to have a single function for Allergens and sensitivities
                                           MDMI-4857: Added logic to push BMI ahead from Hold state if all the food RCs have been updated from Merlin as approved/Pre-approved
2) 16/09/2020 -- Harshit Sharma: As per MDMI-8205, to populate the Comment log and Last comment.
3) Harshit Sharma - 10/02/2021 - Modified code as per MDMI-9543, to check Recipe Component Group by ID
4) Suman Pan -- 20/04/2021 -- One flag parameter for pushing to MERLIN workflow is added and applied wherever required
5) Suman Pan -- 02/06/2021 -- Pushing the BMI from Awaiting MERLIN is now changed from BMI Ideation and BMI Replacement to MErLIN workflow, MDMI-10073, Sprint-48
*/
function updateMerlinNutritionInfo(node, step, EntityReference, RCNode, pushToMerlinFlag) {
    var entityref = step.getReferenceTypeHome().getReferenceTypeByID(EntityReference);
    nodeEntities = node.getReferences(entityref);

    if (nodeEntities.size() > 0) {
        for (var j = 0; j < nodeEntities.size(); j++) {
            var entity = nodeEntities.get(j);
            log.info("Deleting" + entity);
            entity.delete();
            log.info("Deleted" + entity);

        }
    }
    log.info("Node Allergens Sensitivities Size" + nodeEntities.size());
    var obje = node.getObjectType();
    log.info(obje.getID());

    if (RCNode != null) {
        var tRCName = RCNode.getValue("a_mm_RecipeComponentName").getSimpleValue();
        var tRCNum = RCNode.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
    }

    if (obje.getID() == "BaseMenuItem") {
        var refe = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
        if (refe) {
            var tReferences = node.getReferences(refe);
            var bRC_Flag = false;
            if (!tReferences.isEmpty()) {
                for (var m = 0; m < tReferences.size(); m++) {
                    var RCTarget = tReferences.get(m).getTarget();
                    var RCGroup = RCTarget.getValue("a_mm_RecipeComponentGroup").getID();
                    log.info("RCGroup: " + RCGroup);
                    var RCMerlinStatus = RCTarget.getValue("a_mm_MerlinStatus").getSimpleValue();
                    log.info("RCMerlinStatus: " + RCMerlinStatus);
                    if (RCGroup == "F") {
                        if ((RCMerlinStatus != "Pre-Approved") && (RCMerlinStatus != "Approved")) {
                            bRC_Flag = true;
                            break;
                        }
                    }
                }
            }
            if (bRC_Flag == false) {
                /********************************************** Start: Version 5 ***********************************************/
                var merlinworkflow = step.getWorkflowHome().getWorkflowByID("wf_mm_MerlinNutritionApproval");
                if (node.isInState("wf_mm_MerlinNutritionApproval", "Start")) {
                    node.getWorkflowInstance(merlinworkflow).getTaskByID("Start").triggerByID("SubmitBMI", "Submitted to Next state");
                    log.info("Submitted to next state");
                }
                /********************************************** End: Version 5 ***********************************************/
                //Code Changes start for INC15969387
                if (node.isInWorkflow("wf_mm_MerlinNutritionApproval_New")) {
                    var merlinWorkflow = step.getWorkflowHome().getWorkflowByID("wf_mm_MerlinNutritionApproval_New");
                    var currentDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
                    var taskCreationReason = currentDate + " - System\n" + "!Pushed into Maintenance for Recipe Update";
                    node.getWorkflowInstance(merlinWorkflow).setSimpleVariable("wf_mm_LastComment1", taskCreationReason);
                }
                //Code changes ends for INC15969387
                //Code change for the incident INC15031811 starts
                if (node.isInWorkflow("wf_mm_MerlinNutritionApproval") && (node.getValue("a_mm_Status").getSimpleValue() != "Rejected" && node.getValue("a_mm_Status").getSimpleValue() != "Archived" && node.getValue("a_mm_Status").getSimpleValue() != "Inactive")) { //Removed "a_mm_MerlinNutritionApproval" attribute condition as a part of INC15805621
                    if (RCNode != null) {
                        var sCommentsLog = null;
                        var sExistCommentsLog = null;
                        var sLastComment = null;
                        var sUserName = step.getCurrentUser().getName();
                        var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
                        sLastComment = sDate + " - " + sUserName + "\n" + "! " + tRCName + " has an update on the MERLIN values, hence this BMI has to be approved again before publishing to DNA";
                        //node.getValue("a_mm_LastComment").setSimpleValue(sLastComment); // Comment out for MERLIN data load
                        if (node.getValue("a_mm_CommentsLog").getSimpleValue() != null) {
                            sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
                            sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
                             //node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog); // Comment out for MERLIN data load
                        }
                    }
                }
                if (!node.isInWorkflow("wf_mm_MerlinNutritionApproval") && pushToMerlinFlag == true && (node.getValue("a_mm_Status").getSimpleValue() != "Rejected" && node.getValue("a_mm_Status").getSimpleValue() != "Archived" && node.getValue("a_mm_Status").getSimpleValue() != "Inactive" && node.getValue("a_mm_Status").getSimpleValue() != "In Development")) { // in Development check added as a part of INC15805621
                           //node.startWorkflowByID("wf_mm_MerlinNutritionApproval", "Started"); // Comment out for MERLIN data load
                         //log.info("Initiated to Merlin Nutrition Approval Workflow"); // Comment out for MERLIN data load
                    if (RCNode != null) {
                        var sCommentsLog = null;
                        var sExistCommentsLog = null;
                        var sLastComment = null;
                        var sUserName = step.getCurrentUser().getName();
                        var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
                        sLastComment = sDate + " - " + sUserName + "\n" + "! " + tRCName + " has an update on the MERLIN values, hence this BMI has to be approved again before publishing to DNA";
                            //node.getValue("a_mm_LastComment").setSimpleValue(sLastComment); // Comment out for MERLIN data load
                        if (node.getValue("a_mm_CommentsLog").getSimpleValue() != null) {
                            sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
                            sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
                                //node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog); // Comment out for MERLIN data load
                        }
                    }
                }
                //Code change for the incident INC15031811 end
            }

        }
        //}
    } else if (obje.getID() == "SoldMenuItem") {
        var refe = step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI");
    }

    // Code for setting Allergen and Sensitivities : Rahul Choudhary : BEGINS
    log.info("Values for populating the Allergens and Sensitivities : MDMI- 7745 : BEGINS");
    var ObjectType = node.getObjectType();
    if (ObjectType.getID() == "BaseMenuItem") {
        pimNutrLib.populateAllergenSensitivityMultiValuedAttribute(step, node, "BMIToRecipeComponent", "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenValues");
        pimNutrLib.populateAllergenSensitivityMultiValuedAttribute(step, node, "BMIToRecipeComponent", "a_mm_SensitivityContains", "a_mm_SensitivityMayContains", false, "Lov_mm_SensitivityValues");
    } else if (ObjectType.getID() == "SoldMenuItem") {
        pimNutrLib.populateAllergenSensitivityMultiValuedAttribute(step, node, "SMIToBMI", "a_mm_AllergenContains", "a_mm_AllergenMayContains", null, "Lov_mm_AllergenValues");
        pimNutrLib.populateAllergenSensitivityMultiValuedAttribute(step, node, "SMIToBMI", "a_mm_SensitivityContains", "a_mm_SensitivityMayContains", null, "Lov_mm_SensitivityValues");
    }
    log.info("Values for populating the Allergens and Sensitivities : MDMI- 7745 : ENDS");
    // Code for setting Allergen and Sensitivities : Rahul Choudhary : ENDS

    /* //Below code commented out : Rahul Choudhary
    var nodeRef = node.getReferences(refe);
    var ContainsArr = new java.util.HashSet("");
    var MayContainsArr = new java.util.HashSet("");
    for (var k = 0; k < nodeRef.size(); k++) {
        var ref = nodeRef.get(k).getTarget();
        log.info("Node Reference:" + ref.getID());
        var tempEntities = ref.getReferences(entityref);
        for (var p = 0; p < tempEntities.size(); p++) {
            var tempEntity = tempEntities.get(p);
            var nodeEntityID = tempEntity.getTarget().getID();
            log.info("rc Entities:" + nodeEntityID);
            var nodeEntityValue = tempEntity.getValue("Contains").getSimpleValue();
            if (nodeEntityValue == "Contain") {
                log.info("Added to Contain Array" + nodeEntityID);
                ContainsArr.add(nodeEntityID);
            } else if (nodeEntityValue == "May Contain") {
                log.info("Added to May Contain Array" + nodeEntityID);
                MayContainsArr.add(nodeEntityID);
            }
        }
    }
    MayContainsArr.removeAll(ContainsArr);
    var itr = ContainsArr.iterator();
    while (itr.hasNext()) {
        var tempEntityID = itr.next();
        log.info("Contain Array contains" + tempEntityID);
        var allerSen = step.getEntityHome().getEntityByID(tempEntityID);
        log.info("Allergens/Sensitivities" + allerSen);
        newAllergenSen = node.createReference(allerSen, EntityReference);
        
        //Changed for MDMI-5304 - LOVValue change from Contains to Contain
        newAllergenSen.getValue("Contains").setLOVValueByID("01");
    }
    try {
        var itr1 = MayContainsArr.iterator();
        //var itr2 = ContainsArr.iterator();
        while (itr1.hasNext()) {
            var tempEntityID1 = itr1.next();
            var allerSen1 = step.getEntityHome().getEntityByID(tempEntityID1);
            newAllergenSen1 = node.createReference(allerSen1, EntityReference);
            
            //Changed for MDMI-5304 - LOVValue change from Contains to Contain
            newAllergenSen1.getValue("Contains").setLOVValueByID("02");
            log.info("May Contain Array Contains" + tempEntityID1);
        }
    } catch (err) {
        log.info("Exception caught in  function: updateMerlinNutritionInfo" + err);
    } */

}

/* Name: populateCFMGLAccountcode
Author: Rahul Rangu(Cognizant)
Date: 18/04/2019 
Sprint :NA
User Story: NA
Purpose: To populate CFM GL Account Code on Supplier Items of UK market based on Item GL Code from SIM
Revision History:1)Susovan Ghosh: Made it in a function to use at multiple places as per MDMI-4939
1)
*/
function populateCFMGLAccountcode(node, step, sourceContext, targetContext) {
    var sourceNode, itemGLCode, itemGLCodeValue, targetNode;
    step.executeWritePrivileged(function (writePrivileged) {
        step.executeInContext(sourceContext, function (step) {
            log.info("Inside Source Context : " + step.getCurrentContext().getID());
            sourceNode = step.getObjectFromOtherManager(node);
            itemGLCodeValue = sourceNode.getValue("ItemGLCode").getSimpleValue();
            if (itemGLCodeValue != null) {
                itemGLCode = sourceNode.getValue("ItemGLCode").getID();
                log.info("itemGLCode: " + itemGLCode);
            }

        });
        if (itemGLCode != null && itemGLCode != "") {
            step.executeInContext(targetContext, function (step) {
                log.info("Inside Target Context : " + step.getCurrentContext().getID());
                targetNode = step.getObjectFromOtherManager(node);
                //try {                    
                var cfmGLAccountCode = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_GLAccountCodeCFM").getListOfValuesValueByID(itemGLCode);
                log.info("PIM GL Account Code before " + cfmGLAccountCode);
                if (cfmGLAccountCode != null && cfmGLAccountCode != "") {
                    log.info("cfmGLAccountCode " + cfmGLAccountCode);
                    targetNode.getValue("a_mm_GLAccountCode").setLOVValueByID(itemGLCode);
                    log.info("Setting Value on PIM GL Account Code. ");
                } else {
                    //Commented as part of this INC16125958
                    //step.getListOfValuesHome().getListOfValuesByID("Lov_mm_GLAccountCodeCFM").createListOfValuesValue(itemGLCodeValue, null, itemGLCode);
                    //targetNode.getValue("a_mm_GLAccountCode").setLOVValueByID(itemGLCode);;
                    //Changes Start as part of this INC16125958
                    cfmGLAccountCode = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_GLAccountCodeCFM").createListOfValuesValue(itemGLCodeValue, null, itemGLCode);
                    targetNode.getValue("a_mm_GLAccountCode").setSimpleValue(cfmGLAccountCode.getValue());
                    //Changes End as part of this INC16125958
                }
                //Rahul Rangu - 15-02-2020--Commented as part of Market Hierarchy mapping approval changes 
                //targetNode.approve();
                /*} catch (e) {
                    logger.info("Inside Catch");
                    throw (e);
                }*/
            });
        }

    });
}
/* Name: 		 setWorkflowAssignee
Author: 		 Rahul Rangu
Date: 		 	 04/06/2019 
Purpose: 		 To Assign the task to the user dynamically 
*/
function setWorkflowAssignee(node, step, workflow, state) {
    var newAssignee = null,
        userGroup = null,
        assigneeGroup = null,
        task;
    task = node.getWorkflowInstance(workflow).getTaskByID(state);
    log.info("task: " + task);
    assigneeGroup = task.getAssignee().getID();
    log.info("AG: " + assigneeGroup);
    var market = node.getValue("a_mm_Market").getSimpleValue();
    if (market != null && assigneeGroup != null) {
        userGroup = assigneeGroup + "-" + market;
        newAssignee = step.getGroupHome().getGroupByID(userGroup);
        if (newAssignee != null) {
            task.reassign(newAssignee);
        }
    }
}


/* Name: 		 conditional_mandatory_check
Author: 		 Sanjay Yellapantula
Date: 		 04/07/2019 
Purpose: 		 To check the conditionally Mandatory Nutritional Attributes.
Release:  1.1, Sprint 15, MDMI-5198.
Version History:
Harshit Sharma - 16/02/2021 - Modified function as per MDMI-9473
Amit Kushwaha - 23/03/2021 - Modified function as per MDMI-9793
*/

function conditional_mandatory_check(node, step, reference, check_attr, DateCheck, Mandatory_attr, Availibilty) {
    var tRef = step.getReferenceTypeHome().getReferenceTypeByID(reference);
    if (tRef) {
        var tError = null;
        var tReferences = node.getReferences(tRef);
        if (!tReferences.isEmpty()) {
            for (var i = 0; i < tReferences.size(); i++) {
                var tLink = tReferences.get(i);
                var check_attr_obj = step.getAttributeHome().getAttributeByID(check_attr);
                //var Mandatory_attr_obj = step.getAttributeHome().getAttributeByID(Mandatory_attr);
                var attr_LovID = tLink.getValue(check_attr).getID();
                var attr_Value = tLink.getValue(check_attr).getSimpleValue();
                var avai_Value = tLink.getValue(Availibilty).getID();
                var Mandattr_Value = tLink.getValue(Mandatory_attr).getSimpleValue();
                var DateCheck_Value = tLink.getValue(DateCheck).getSimpleValue();
                if (attr_Value != null && avai_Value == "1") {
                    //log.info(attr_LovID + Mandattr_Value +DateCheck_Value );
                    if (attr_LovID == "2" && Mandattr_Value == null) {
                        //if(Mandattr_Value == null ){
                        if (tError == null)
                            tError = "Comments should not be blank for " + tLink.getTarget().getName() + " if " + check_attr_obj.getName() + " is selected as " + attr_Value;
                        else
                            tError = tError + "\n" + "Comments should not be blank for " + tLink.getTarget().getName() + " if " + check_attr_obj.getName() + " is selected as " + attr_Value;
                        //}
                    }
                    /* else if (attr_LovID == "1" && Mandattr_Value != null) {
                                           //if (Mandattr_Value != null){
                                           if (tError == null)
                                               tError = "Comments should be blank for " + tLink.getTarget().getName() + " if " + check_attr_obj.getName() + " is selected as " + attr_Value;
                                           else
                                               tError = tError + "\n" + "Comments should be blank for " + tLink.getTarget().getName() + " if " + check_attr_obj.getName() + " is selected as " + attr_Value;
                                           //}
                                       } */
                    else if (attr_LovID == "1" && DateCheck_Value == null && (tLink.getTarget().getID() != "a_mm_NutritionComposition-AddedSugars" && tLink.getTarget().getID() != "a_mm_%FruitContent" && tLink.getTarget().getID() != "a_mm_%VegetableContent")) {
                        if (tError == null)
                            tError = "Analysis Completion Date should not be blank for " + tLink.getTarget().getName() + " if " + check_attr_obj.getName() + " is selected as " + attr_Value;
                        else
                            tError = tError + "\n" + "Analysis Completion Date should not be blank for " + tLink.getTarget().getName() + " if " + check_attr_obj.getName() + " is selected as " + attr_Value;
                    } else if (attr_LovID == "2" && DateCheck_Value != null) {
                        if (tError == null)
                            tError = "Analysis Completion Date should be blank for " + tLink.getTarget().getName() + " if " + check_attr_obj.getName() + " is selected as " + attr_Value;
                        else
                            tError = tError + "\n" + "Analysis Completion Date should be blank for " + tLink.getTarget().getName() + " if " + check_attr_obj.getName() + " is selected as " + attr_Value;
                    } else {
                        //do nothing
                    }
                }
            }
        }
        return tError;
    }
}

/* Name: 		 deletedRejectedArchivedObj
Author: 		 Sanlap Bose
Date: 		 25/07/2019 
Purpose: 		 To move Inactive/ Archived/ Rejected objects to respective blue hierarchies
Release:  1.1, Sprint 16.
Version History:-
1) Suman Pan- 05/05/2021 -- Added Recipe Component related part to delete it from the All RCs link, MDMI-10038, Sprint-47
*/

function deletedRejectedArchivedObj(node, step) {
    var objName = node.getObjectType().getName(); //get the object type name;
    var objID = node.getObjectType().getID(); //get the object type id;
    var devSupplier = node.getValue("a_mm_ref_DevSupplier").getSimpleValue() + "";
    var devFacility = node.getValue("a_mm_ref_DevFacility").getSimpleValue() + "";
    var statusValue = node.getValue("a_mm_Status").getSimpleValue(); //get the LOV value of a_mm_Status 

    var statusID = node.getValue("a_mm_Status").getID(); //get the LOV value ID of a_mm_Status 
    var hierarchyNodeID = objID + "_" + statusID;
    var hierarchyNodeName = statusValue + " " + objName;
    if (objID == devSupplier || objID == devFacility) { // Changed as part of SUPPLIERFACILITYENTITY change
        var hierarchyNodeObj = step.getEntityHome().getEntityByID(hierarchyNodeID); // Changed as part of SUPPLIERFACILITYENTITY change
    } else {
        var hierarchyNodeObj = step.getProductHome().getProductByID(hierarchyNodeID);
    }
    /************************************************ Start: Version 1 ********************************************/
    if (objID == "RecipeComponent") {
        var allRCLinkHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("AllRCLink");
        if (allRCLinkHome) {
            var allRCLinks = node.getClassificationProductLinks(allRCLinkHome);
            if (allRCLinks.size() > 0) {
                allRCLinks.get(0).delete();
            }
        }
    }
    /************************************************ End: Version 1 ********************************************/
    if (hierarchyNodeObj != null) {
        node.setParent(hierarchyNodeObj);
        approveObjectInAllContexts(hierarchyNodeObj, step);
    } else {
        // create the hierarchyNodeObj and then set it as parent of current node.
        if (objID == devSupplier || objID == devFacility) { // Changed as part of SUPPLIERFACILITYENTITY change
            var objArDelRejHierarchy = step.getEntityHome().getEntityByID("ArchivalDeletionRejectionHierarchy");
            objArDelRejHierarchy.createEntity(hierarchyNodeID, "ArchivalDeletionRejectionParentRoot_New");
            var hierarchyNodeObjNew = step.getEntityHome().getEntityByID(hierarchyNodeID);
        } else {
            var objArDelRejHierarchy = step.getProductHome().getProductByID("ArchivalDeletionRejectionHierarchy");
            objArDelRejHierarchy.createProduct(hierarchyNodeID, "ArchivalDeletionRejectionParentRoot");
            var hierarchyNodeObjNew = step.getProductHome().getProductByID(hierarchyNodeID);
        }
        if (hierarchyNodeObjNew != null) {
            hierarchyNodeObjNew.setName(hierarchyNodeName);
            node.setParent(hierarchyNodeObjNew);
            approveObjectInAllContexts(hierarchyNodeObjNew, step);
        }
    }
    if (node.getObjectType().getID() == "BaseMenuItemRecipe")
        approveBmirAndSmiPartially(node, step)
    else if (node.getObjectType().getID() == "SoldMenuItem")
        approveBmirAndSmiPartially(node, step)
    else
        approveObjectInAllContexts(node, step);
}

/*
Name:	     populateSMIGrouptoRestaurant_RecipeGroupMaintenance
Author:	     Suman Pan(suman_pan.pan@us.mcd.com) 
Date:	     21/08/2019
Purpose:	 To populate the SMI Group to Restaurant link from Recipe Group Maintenace
Applicability: During clicking the Submit button in Recipe Group Maintenance quick Link
*/

function populateSMIGrouptoRestaurant_RecipeGroupMaintenance(node, step) {

    var smiGroupToRestHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIGrouptoRestaurant");

    var restGroupRefedByClass = node.getReferencedByClassifications().iterator();
    while (restGroupRefedByClass.hasNext()) {

        var restGroupRefedByClassLink = restGroupRefedByClass.next();
        var linkTypeString = restGroupRefedByClassLink.getReferenceTypeString();
        log.info("linkTypeString :" + linkTypeString);
        if (linkTypeString == "SMIGroupToRestaurantGroup") {

            var smiGroup = restGroupRefedByClassLink.getSource();
            log.info("smiGroup :" + smiGroup.getID());

            var restGroupClassProdLinks = node.getClassificationProductLinks();
            for (var i = 0; i < restGroupClassProdLinks.size(); i++) {

                var restGroupToProdLink = restGroupClassProdLinks.get(i);
                var restGroupToLinkedProd = restGroupToProdLink.getProduct();
                var prodObjectType = restGroupToLinkedProd.getObjectType().getID();
                log.info("prodObjectType :" + prodObjectType);
                if (prodObjectType == "Restaurants") {

                    log.info("restGroupToLinkedProd :" + restGroupToLinkedProd.getID());
                    var restLinkedWithRestGroup_ID = restGroupToLinkedProd.getID();

                    var count1 = 0;
                    var smiGroupToRest = smiGroup.getReferences(smiGroupToRestHome);
                    for (var j = 0; j < smiGroupToRest.size(); j++) {

                        var smiGroupToRestLink = smiGroupToRest.get(j);
                        var restProd = smiGroupToRestLink.getTarget();
                        log.info("restProd :" + restProd.getID());
                        var restProd_ID = restProd.getID();
                        if (restProd_ID != restLinkedWithRestGroup_ID) {
                            count1++;
                        }
                    }
                    log.info("count1: " + count1);
                    log.info("smiGroupToRest.size(): " + smiGroupToRest.size());
                    if (count1 == smiGroupToRest.size()) {
                        smiGroup.createReference(restGroupToLinkedProd, smiGroupToRestHome);
                        log.info("SMI Group To Restaurant link created");
                        approveObjectInAllContexts(smiGroup, step);
                        approveObjectInAllContexts(restGroupToLinkedProd, step);
                    }
                }

            }
        }
    }
}

/*
Name:	     populateSMIGrouptoRestaurant_SMIGroupMaintenance
Author:	     Suman Pan(suman_pan.pan@us.mcd.com) 
Date:	     21/08/2019
Purpose:	 To populate the SMI Group to Restaurant link from SMI Group Maintenace
Applicability: During clicking the Submit button in SMI Group Maintenance quick Link
*/

function populateSMIGrouptoRestaurant_SMIGroupMaintenance(node, step) {
    var smiGroupToRestGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIGroupToRestaurantGroup");
    var smiGroupToRestHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIGrouptoRestaurant");

    if (smiGroupToRestGroupHome && smiGroupToRestHome) {

        var smiGroupToRestRefD = node.getReferences(smiGroupToRestHome);
        for (var del = 0; del < smiGroupToRestRefD.size(); del++) {

            var smiGroupToRestLink = smiGroupToRestRefD.get(del);
            smiGroupToRestLink.delete();
            log.info("deleted");
        }

        var restHashSet = new java.util.LinkedHashSet();
        var smiGroupToRestGroupRef = node.getReferences(smiGroupToRestGroupHome);
        for (var i = 0; i < smiGroupToRestGroupRef.size(); i++) {

            var smiGroupToRestGroupLink = smiGroupToRestGroupRef.get(i);
            var restGroup = smiGroupToRestGroupLink.getTarget();
            log.info("restGroup :" + restGroup);

            var restGroupClassProdLinks = restGroup.getClassificationProductLinks();
            for (var j = 0; j < restGroupClassProdLinks.size(); j++) {

                var restGroupClassProdLinkProd = restGroupClassProdLinks.get(j).getProduct();
                var restGroupClassProdLinkProdObjectType = restGroupClassProdLinkProd.getObjectType().getID();
                log.info("restGroupClassProdLinkProdObjectType :" + restGroupClassProdLinkProdObjectType);
                if (restGroupClassProdLinkProdObjectType == "Restaurants") {

                    var restProd = restGroupClassProdLinkProd;
                    log.info("restProd :" + restProd.getID());
                    restHashSet.add(restProd);
                }
            }
        }

        var restHashSetItr = restHashSet.iterator();
        while (restHashSetItr.hasNext()) {

            var restNext = restHashSetItr.next();
            log.info("restNext :" + restNext.getID());
            node.createReference(restNext, smiGroupToRestHome);
        }
    }
}

/*Name:	     blanckcheckrejectionreason
Author:	     Rishidip Roy(Rishidip.Roy@us.mcd.com) 
Date:	     09/03/2108
Purpose:	     To return error message if user tries to approve item with populating Rejection Reason.
Applicability: All worflows while approving object*/
function blanckcheckrejectionreason(node, step, attribute) {
    try {
        if (isAttributeValid(node, step, attribute)) {
            if (node.getValue(attribute).getSimpleValue() != null)
                return "Please make Rejection Reason blank";
            else
                return null;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*Title:	Weight Conversion to Grams
Author:	Sanjay yellapantula
Company:	Cognizant
Date:	10/09/2019
Usage: 	This function can be used to convert any weight value with UOM into grams equivalent
*/

function pimGramConversion(node, attrValue, attrUOM) {
    var value = node.getValue(attrValue).getSimpleValue();
    var uom = node.getValue(attrUOM).getID();
    //logger.info("UOM value is " + uom);
    var valueInGrams = 0;
    //logger.info("Inside gm conv function " + value + " " + uom);
    if (uom == "µg") {
        valueInGrams = Number(value) * 0.000001;
    } else if (uom == "g") {
        valueInGrams = Number(value);
    } else if (uom == "kg") {
        valueInGrams = Number(value) * 1000;
    } else if (uom == "lb") {
        valueInGrams = Number(value) * 453.592;
    } else if (uom == "mg") {
        valueInGrams = Number(value) * 0.001;
    } else if (uom == "oz") {
        valueInGrams = Number(value) * 28.3495;
    }
    return valueInGrams;
}


/*Title:	Weight Conversion to OZ
Author:	Swagata Samaddar
Company:	Cognizant
Date:	01/11/2022
Usage: 	This function can be used to convert any weight value with UOM into OZ equivalent
*/

function pimOzConversion(node, attrValue, attrUOM) {
    var value = node.getValue(attrValue).getSimpleValue();
    var uom = node.getValue(attrUOM).getID();
    // logger.info("UOM value is " + uom);
    var valueInOz = 0;
    //logger.info("Inside oz conv function " + value + " " + uom);
    if (uom == "µg") {
        valueInGrams = Number(value) / 28350000;
    } else if (uom == "g") {
        valueInOz = Number(value) / 28.3495;
    } else if (uom == "kg") {
        valueInOz = Number(value) * 35.274;
    } else if (uom == "lb") {
        valueInOz = Number(value) * 16;
    } else if (uom == "mg") {
        valueInOz = Number(value) / 28350;
    } else if (uom == "oz") {
        valueInOz = Number(value);
    }
    return valueInOz;
}


/*Title:	Volume Conversion to ml
Author:	Sanjay yellapantula
Company:	Cognizant
Date:	10/09/2019
Usage: 	This function can be used to convert any Volume value with UOM into ml equivalent
*/

function pimMlConversion(node, attrValue, attrUOM) {
    var value = node.getValue(attrValue).getSimpleValue();
    var uom = node.getValue(attrUOM).getID();
    var valueInml = 0;
    if (uom == "cL") {
        valueInml = Number(value) * 10;
    } else if (uom == "Cu.cm") {
        valueInml = Number(value);
    } else if (uom == "Cu. Ft.") {
        valueInml = Number(value) * 28316.846592;
    } else if (uom == "Cu. In.") {
        valueInml = Number(value) * 16.387064;
    } else if (uom == "dL") {
        valueInml = Number(value) * 100;
    } else if (uom == "fl oz (UK)") {
        valueInml = Number(value) * 28.413064262467;
    } else if (uom == "fl oz (US)") {
        valueInml = Number(value) * 29.5735295625;
    } else if (uom == "gal (UK)") {
        valueInml = Number(value) * 4546.0902819948;
    } else if (uom == "gal (US)") {
        valueInml = Number(value) * 3785.411784;
    } else if (uom == "kL") {
        valueInml = Number(value) * 1000000;
    } else if (uom == "l") {
        valueInml = Number(value) * 1000;
    } else if (uom == "m3") {
        valueInml = Number(value) * 1000000;
    } else if (uom == "ml") {
        valueInml = Number(value);
    }
    return valueInml;
}

/*Title:	Volume Conversion to fl oz
Author:	Swagata Samaddar
Company:	Cognizant
Date:	01/11/2022
Usage: 	This function can be used to convert any Volume value with UOM into fl oz (US) equivalent
*/

function pimFlOzConversion(node, attrValue, attrUOM) {
    var value = node.getValue(attrValue).getSimpleValue();
    var uom = node.getValue(attrUOM).getID();
    var valueInFlOz = 0;
    if (uom == "cL") {
        valueInFlOz = Number(value) / 2.957;
    } else if (uom == "Cu.cm") {
        valueInFlOz = Number(value) / 29.574;
    } else if (uom == "Cu. Ft.") {
        valueInFlOz = Number(value) * 957.5;
    } else if (uom == "Cu. In.") {
        valueInFlOz = Number(value) / 1.805;
    } else if (uom == "dL") {
        valueInFlOz = Number(value) * 3.381;
    } else if (uom == "fl oz (UK)") {
        valueInFlOz = Number(value) / 1.0408;
    } else if (uom == "fl oz (US)") {
        valueInFlOz = Number(value);
    } else if (uom == "gal (UK)") {
        valueInFlOz = Number(value) * 153.7;
    } else if (uom == "gal (US)") {
        valueInFlOz = Number(value) * 128;
    } else if (uom == "kL") {
        valueInFlOz = Number(value) * 33814;
    } else if (uom == "l") {
        valueInFlOz = Number(value) * 33.814;
    } else if (uom == "m3") {
        valueInFlOz = Number(value) * 33814;
    } else if (uom == "ml") {
        valueInFlOz = Number(value) / 29.574;
    }
    return valueInFlOz;
}


/*
Name:	     populatecommentatsource
Author:	     Rishi(Rishidip.Roy@us.mcd.com)
Date:	     09/10/2019
Purpose:	     To populate commnet at DEV SU level when SUP is rejected and at RC level when DSU is rejected.
Applicability: In workflow
Version History:-
1) Suman Pan - 08/06/2020 -- Changed the Rejection Reason related attribute for new Supplier entity changes
*/
function populatecommentatsource(node, obj, step, workflow) {
    //try {

    var sComments = null;
    var sCommentsLog = null;
    var sExistCommentsLog = null;
    var sRejectionReason = null;
    var sLastComment = null;
    var sStateName = node.getWorkflowInstance(workflow).getSimpleVariable("wf_mm_StateName");
    /********************************************** Start: Version 1 ******************************************/
    var rejectionReasonAttributeID = null;
    var objectType = node.getObjectType().getID();
    log.info("objectType check for source rejection BR: " + objectType);
    if (objectType == "SIM_Supplier_New") {
        rejectionReasonAttributeID = "a_mm_RejectionReasonDescription";
    }
    if ((isAttributeValid(node, step, "a_mm_Comments")) && (isAttributeValid(node, step, "a_mm_CommentsLog")) && (isAttributeValid(node, step, "a_mm_LastComment"))) {
        /********************************************** End: Version 1 ******************************************/
        if (node.getValue("a_mm_Comments").getSimpleValue() != null) {
            sComments = node.getValue("a_mm_Comments").getSimpleValue();
        }

        //  if (node.getValue(rejectionReasonAttributeID).getSimpleValue() != null) {
        //     sRejectionReason = node.getValue(rejectionReasonAttributeID).getSimpleValue();
        // }

        var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
        var sUserId = step.getCurrentUser().getID();
        var sUserName = step.getCurrentUser().getName();
        //var sUserName = node.getWorkflowInstance(workflow).getSimpleVariable("wf_mm_CurrentUserName");

        if (sRejectionReason != null) {
            // File changed for SUPPLIERFACILITYENTITY change by Gandhi on 7 may, 2020
            var simSupplier = node.getValue("a_mm_ref_SIM_Supplier").getSimpleValue() + "";
            if (node.getObjectType().getID() == simSupplier) { // Changed as part of SUPPLIERFACILITYENTITY change for ID:SIM_Supplier
                sLastComment = sDate + " - " + sUserName + "\n" + "! Dev Supplier " + node.getName() + " - " + " Rejected from - " + sStateName + "\n" + sRejectionReason;

                if (sComments != null) {

                    sLastComment = sLastComment + "\n" + sComments;

                }
            }
        }
        if (sComments != null) {
            if (node.getObjectType().getID() == "RecipeComponent") {
                sLastComment = sDate + " - " + sUserName + "\n" + "! Recipe Component " + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + " - " + " Archived from - Enrich - Dev RC " + "\n" + sComments;
            }
        }
        obj.getValue("a_mm_LastComment").setSimpleValue(sLastComment);

        if (obj.getValue("a_mm_CommentsLog").getSimpleValue() == null) {
            sCommentsLog = sLastComment;
            log.info("sCommentsLog: " + sCommentsLog);
            obj.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);

        } else {
            sExistCommentsLog = obj.getValue("a_mm_CommentsLog").getSimpleValue();
            sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
            log.info("sCommentsLog: " + sCommentsLog);
            obj.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
        }


        //sComments = node.getValue("a_mm_Comments").setSimpleValue(null);

    }


    // } catch (err) {
    //     log.info(err);
    //     throw (err);
    // }
}



// ********************************* Start of new food and paper related functions ****************************************

/*
Name:	     mlConversionUsingAttributeValueAndUOM
Author:	     Suman Pan(Auman_Pan.Pan@us.mcd.com)
Date:	     09/11/2019
Purpose:	 To convert any volume UOM in ml unit
Applicability: In workflow
Version History:-
1) Suman Pan - 21/08/2020 - Added ignore case checking of UOM for some of the UOM values as per PROD ticket INC10671110 
*/
function mlConversionUsingAttributeValueAndUOM(value, uom) {
    var valueInml = 0;
    if (uom == "cL") {
        valueInml = Number(value) * 10;
    } else if (uom == "Cu.cm") {
        valueInml = Number(value);
    } else if (uom == "Cu. Ft.") {
        valueInml = Number(value) * 28316.846592;
    } else if (uom == "Cu. In.") {
        valueInml = Number(value) * 16.387064;
    } else if (uom == "dL") {
        valueInml = Number(value) * 100;
    } else if (uom == "fl oz (UK)") {
        valueInml = Number(value) * 28.413064262467;
    } else if (uom == "fl oz (US)" || uom.equalsIgnoreCase("FL OZ")) {
        valueInml = Number(value) * 29.5735295625;
    } else if (uom == "gal (UK)") {
        valueInml = Number(value) * 4546.0902819948;
    } else if (uom == "gal (US)" || uom.equalsIgnoreCase("GAL")) {
        valueInml = Number(value) * 3785.411784;
    } else if (uom == "kL") {
        valueInml = Number(value) * 1000000;
    } else if (uom.equalsIgnoreCase("l")) {
        valueInml = Number(value) * 1000;
    } else if (uom == "m3") {
        valueInml = Number(value) * 1000000;
    } else if (uom.equalsIgnoreCase("ml")) {
        valueInml = Number(value);
    }
    return valueInml;
}

/*
Name:	     gramConversionUsingAttributeValueAndUOM
Author:	     Suman Pan(Auman_Pan.Pan@us.mcd.com)
Date:	     09/11/2019
Purpose:	 To convert any weight UOM in gm unit
Applicability: In workflow
Version History:-
1) Suman Pan - 21/08/2020 - Added ignore case checking of UOM for some of the UOM values as per PROD ticket INC10671110 
*/
function gramConversionUsingAttributeValueAndUOM(value, uom) {
    var valueInGrams = 0;
    //logger.info("Inside gm conv function " + value + " " + uom);
    if (uom == "µg") {
        valueInGrams = Number(value) * 0.000001;
    } else if (uom.equalsIgnoreCase("g")) {
        valueInGrams = Number(value);
    } else if (uom.equalsIgnoreCase("kg")) {
        valueInGrams = Number(value) * 1000;
    } else if (uom.equalsIgnoreCase("lb")) {
        valueInGrams = Number(value) * 453.592;
    } else if (uom == "mg") {
        valueInGrams = Number(value) * 0.001;
    } else if (uom.equalsIgnoreCase("oz")) {
        valueInGrams = Number(value) * 28.3495;
    }
    return valueInGrams;
}

/*
Name:	     allFnPAttributesPopulationFromSPObj
Author:	     Suman Pan(Suman_Pan.Pan@us.mcd.com)
Date:	     09/11/2019
Purpose:	 To populate all the food and paper cost related attributes in grid level from SP level
Applicability: In workflow
Version History : 
1) Sanjay(27/1/2019): Commented the code for setting attribtue "a_mm_BMIGridSP".
2) Suman Pan - 31/03/2020 - commented out food and paper related lines
*/

function allFnPAttributesPopulationFromSPObj(step, spObj, fNpGridIns, fNpRequired) {
    // Start of version 2
    /*if(fNpRequired == "Yes"){
    // get all attributes from SP level
        var exWorksPrice = spObj.getValue("a_mm_ExWorks").getSimpleValue();
        var supplierCurrency = spObj.getValue("a_mm_SupplierCurrency").getSimpleValue();
        var exchangeRate = spObj.getValue("a_mm_ExchangeRate").getSimpleValue();
        var supplierFreight = spObj.getValue("a_mm_SupplierFreight").getSimpleValue();
        var supplierFreightCurrency = spObj.getValue("a_mm_SupplierFreightCurrency").getSimpleValue();
        var freightExchangeRate = spObj.getValue("a_mm_FreightExchangeRate").getSimpleValue();
        var exWorksPerGBP = spObj.getValue("a_mm_ExWorksPerGBP").getSimpleValue();
        var discount = spObj.getValue("a_mm_Discount%").getSimpleValue();
        var exWorksDiscount = spObj.getValue("a_mm_ExWorksDiscount").getSimpleValue();
            	
        var varIndt1 = spObj.getValue("a_mm_VarianceIdentifier1").getSimpleValue();
        var costVarAmnt1 = spObj.getValue("a_mm_CostVarianceAmount1").getSimpleValue();
        var varIndt2 = spObj.getValue("a_mm_VarianceIdentifier2").getSimpleValue();
        var costVarAmnt2 = spObj.getValue("a_mm_CostVarianceAmount2").getSimpleValue();
        var varIndt3 = spObj.getValue("a_mm_VarianceIdentifier3").getSimpleValue();
        var costVarAmnt3 = spObj.getValue("a_mm_CostVarianceAmount3").getSimpleValue();
        var varIndt4 = spObj.getValue("a_mm_VarianceIdentifier4").getSimpleValue();
        var costVarAmnt4 = spObj.getValue("a_mm_CostVarianceAmount4").getSimpleValue();
        var varIndt5 = spObj.getValue("a_mm_VarianceIdentifier5").getSimpleValue();
        var costVarAmnt5 = spObj.getValue("a_mm_CostVarianceAmount5").getSimpleValue();
            	
        var dcPrice = spObj.getValue("a_mm_DistributionCentrePrice").getSimpleValue();
        var volumePer = spObj.getValue("a_mm_Volume%").getSimpleValue();
        var weghtAvgPrice = spObj.getValue("a_mm_Weightedaverageprice").getSimpleValue();
        var dualBalValue = spObj.getValue("a_mm_Dualbalancingvalue").getSimpleValue();
        var mbCaseRate = spObj.getValue("a_mm_MBCaseRate").getSimpleValue();
        var mbCaseRateValue = spObj.getValue("a_mm_MBCaseRateValue").getSimpleValue();
        var storeDelivered = spObj.getValue("a_mm_StoreDelivered").getSimpleValue();
        var conversionFact = spObj.getValue("a_mm_ConversionFactor").getSimpleValue();
        var caseSize = spObj.getValue("a_mm_CaseSize").getSimpleValue();
        var caseSizeUOM = spObj.getValue("a_mm_CaseSizeUOM").getSimpleValue();
        var caseSizeRCUom = spObj.getValue("a_mm_CaseSize(RC UOM)").getSimpleValue();
            	
        var conversionUnitToMcdUnit = spObj.getValue("a_mm_ConversionUnitsToMCDUnits").getSimpleValue();
        var storeDeliveredPriceinMcdUnits = spObj.getValue("a_mm_StoreDeliveredPriceInMCDUnits").getSimpleValue();
        var unitTypeMcdUnits = spObj.getValue("a_mm_UnitTypeMCDUnits").getSimpleValue();
        var theoreticalYield = spObj.getValue("a_mm_TheoreticalYield").getSimpleValue();
        var targetYield = spObj.getValue("a_mm_TargetYield").getSimpleValue();
        var cfmConversionRate = spObj.getValue("a_mm_CFMConversionRate").getSimpleValue();
        var portionCost = spObj.getValue("a_mm_PortionCost").getSimpleValue();
        //var  = spObj.getValue("").getSimpleValue();
    	
    	
        // set all attributes to fNp grid level
        fNpGridIns.getValue("a_mm_ExWorks").setSimpleValue(exWorksPrice);
        fNpGridIns.getValue("a_mm_SupplierCurrency").setSimpleValue(supplierCurrency);
        fNpGridIns.getValue("a_mm_ExchangeRate").setSimpleValue(exchangeRate);
        fNpGridIns.getValue("a_mm_SupplierFreight").setSimpleValue(supplierFreight);
        fNpGridIns.getValue("a_mm_SupplierFreightCurrency").setSimpleValue(supplierFreightCurrency);
        fNpGridIns.getValue("a_mm_FreightExchangeRate").setSimpleValue(freightExchangeRate);
        fNpGridIns.getValue("a_mm_ExWorksPerGBP").setSimpleValue(exWorksPerGBP);
        fNpGridIns.getValue("a_mm_Discount%").setSimpleValue(discount);
        fNpGridIns.getValue("a_mm_ExWorksDiscount").setSimpleValue(exWorksDiscount);

        fNpGridIns.getValue("a_mm_VarianceIdentifier1").setSimpleValue(varIndt1);
        fNpGridIns.getValue("a_mm_CostVarianceAmount1").setSimpleValue(costVarAmnt1);
        fNpGridIns.getValue("a_mm_VarianceIdentifier2").setSimpleValue(varIndt2);
        fNpGridIns.getValue("a_mm_CostVarianceAmount2").setSimpleValue(costVarAmnt2);
        fNpGridIns.getValue("a_mm_VarianceIdentifier3").setSimpleValue(varIndt3);
        fNpGridIns.getValue("a_mm_CostVarianceAmount3").setSimpleValue(costVarAmnt3);
        fNpGridIns.getValue("a_mm_VarianceIdentifier4").setSimpleValue(varIndt4);
        fNpGridIns.getValue("a_mm_CostVarianceAmount4").setSimpleValue(costVarAmnt4);
        fNpGridIns.getValue("a_mm_VarianceIdentifier5").setSimpleValue(varIndt5);
        fNpGridIns.getValue("a_mm_CostVarianceAmount5").setSimpleValue(costVarAmnt5);

        fNpGridIns.getValue("a_mm_DistributionCentrePrice").setSimpleValue(dcPrice);
        fNpGridIns.getValue("a_mm_Volume%").setSimpleValue(volumePer);
        fNpGridIns.getValue("a_mm_Weightedaverageprice").setSimpleValue(weghtAvgPrice);
        fNpGridIns.getValue("a_mm_Dualbalancingvalue").setSimpleValue(dualBalValue);
        fNpGridIns.getValue("a_mm_MBCaseRate").setSimpleValue(mbCaseRate);
        fNpGridIns.getValue("a_mm_MBCaseRateValue").setSimpleValue(mbCaseRateValue);
        fNpGridIns.getValue("a_mm_StoreDelivered").setSimpleValue(storeDelivered);
        fNpGridIns.getValue("a_mm_ConversionFactor").setSimpleValue(conversionFact);
        fNpGridIns.getValue("a_mm_CaseSize").setSimpleValue(caseSize);
        fNpGridIns.getValue("a_mm_CaseSizeUOM").setSimpleValue(caseSizeUOM);
        fNpGridIns.getValue("a_mm_CaseSize(RC UOM)").setSimpleValue(caseSizeRCUom);

        fNpGridIns.getValue("a_mm_ConversionUnitsToMCDUnits").setSimpleValue(conversionUnitToMcdUnit);
        fNpGridIns.getValue("a_mm_StoreDeliveredPriceInMCDUnits").setSimpleValue(storeDeliveredPriceinMcdUnits);
        fNpGridIns.getValue("a_mm_UnitTypeMCDUnits").setSimpleValue(unitTypeMcdUnits);
        fNpGridIns.getValue("a_mm_TheoreticalYield").setSimpleValue(theoreticalYield);
        fNpGridIns.getValue("a_mm_TargetYield").setSimpleValue(targetYield);
        fNpGridIns.getValue("a_mm_CFMConversionRate").setSimpleValue(cfmConversionRate);
        fNpGridIns.getValue("a_mm_PortionCost").setSimpleValue(portionCost);
        //fNpGridIns.getValue("").setSimpleValue();
    }*/ // End of changes of version 2
    /*======================================copy the nutrition values and Shipping Package ID to BMI Level================================*/
    //fNpGridIns.getValue("a_mm_BMIGridSP").setSimpleValue(spObj.getID());
    fNpGridIns.getValue("a_mm_NutritionComposition-EnergykJ").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-EnergykJ").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-Energykcal").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-Energykcal").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-Protein").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-Protein").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutCompositionCarbohydrates").setSimpleValue(spObj.getValue("a_mm_NutCompositionCarbohydrates").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-DietaryFibre").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-DietaryFibre").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-TotalSugars").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-TotalSugars").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-AddedSugars").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-AddedSugars").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-TotalFats").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-TotalFats").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutCompositionSaturatedFattyAcids").setSimpleValue(spObj.getValue("a_mm_NutCompositionSaturatedFattyAcids").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutCompositionMonoUnsatFattyAcids").setSimpleValue(spObj.getValue("a_mm_NutCompositionMonoUnsatFattyAcids").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutCompositionPolyUnsatFattyAcids").setSimpleValue(spObj.getValue("a_mm_NutCompositionPolyUnsatFattyAcids").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutCompositionTransFattyAcids").setSimpleValue(spObj.getValue("a_mm_NutCompositionTransFattyAcids").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-Water").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-Water").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-Sodium").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-Sodium").getSimpleValue());
    fNpGridIns.getValue("a_mm_NutritionComposition-Salt").setSimpleValue(spObj.getValue("a_mm_NutritionComposition-Salt").getSimpleValue());
    fNpGridIns.getValue("a_mm_%FruitContent").setSimpleValue(spObj.getValue("a_mm_%FruitContent").getSimpleValue());
    fNpGridIns.getValue("a_mm_%VegetableContent").setSimpleValue(spObj.getValue("a_mm_%VegetableContent").getSimpleValue());
}


// ********************************* End of new food and paper related functions ****************************************
/* Name: 		 NA
Author: 		 Sanjay Yellapantula
Date: 		 25/09/2019
Purpose: 		 To check whether the target object is valid in the currentr market or not.
Version History:- 
1) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/
function checkValidMarket(step, source, target, MarketClassification, classification) {
    var sourceObjectType = source.getObjectType().getID();
    var targetObjectType = target.getObjectType().getID();
    var flag = false;
    var errmsg = null;
    var targetmarket;
    var sourceMarket = source.getValue("a_mm_Market").getSimpleValue();
    var ISOMarketFormat = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(sourceMarket).getValue();
    /////////////////////////////
    if (targetObjectType == "McDonaldItem") {
        if (ISOMarketFormat == "USA")
            targetmarket = classification + ISOMarketFormat + "_Active";
        else
            targetmarket = classification + ISOMarketFormat + "_Active_Linked";
    }
    ///////////////////////
    else {
        targetmarket = classification + ISOMarketFormat;
    }
    var markets = target.getClassificationProductLinks(MarketClassification);
    for (i = 0; i < markets.size(); i++) {
        var market = markets.get(i).getClassification().getID();
        if (market == targetmarket) {
            flag = true;
            break;
        }
    }
    if (flag == false) {
        if (errmsg == null) {
            errmsg = target.getName() + " is not Active for " + sourceMarket + " Market.\n";
        } else {
            errmsg = errmsg + target.getName() + " is not Active for " + sourceMarket + " Market.\n";
        }
    }
    return errmsg;
}

/* Name: 		 NA
Author: 		 Sanjay Yellapantula
Date: 		15/10/2019
Purpose: 		 To check whether the Supplier Facility are valid in market and category and also contingency for existing facility.
Version History:-
1) Suman Pan - 23/04/2020 - parameter is added to resuse this function for non-manufacturing facilities
2) Harshit Sharma - 15/07/2020 - As per MDMI-7709, checkStatus function check the Manufacturing Facilitry only for Food type component.
3) Harshit Sharma - 08/03/2020 - As per MDMI-7923, added the market category check status
File changed for SUPPLIERFACILITYENTITY change by Rishi on <06/05/2020>
File changed for SUPPLIERFACILITYENTITY change by Kunal on <06/05/2020>
4) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/

function checkStatus(step, object, category, productgroup, categoryClassification, market, facType) {
    var objectType = object.getObjectType().getID();
    var node = object;
    var SupplierToSupplierMarket = node.getValue("a_mm_ref_SupplierToSupplierMarket").getSimpleValue() + "";
    var DevSupplierToDevFacility = node.getValue("a_mm_ref_DevSupplierToDevFacility").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change
    var SIM_Supplier_to_Facility = node.getValue("REF_SIM_Supplier_to_Facility").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change
    var tDevRef = step.getReferenceTypeHome().getReferenceTypeByID(DevSupplierToDevFacility); //Changed as part of SUPPLIERFACILITYENTITY change for ID:DevSupplierToDevFacility
    var tSimRef = step.getReferenceTypeHome().getReferenceTypeByID(SIM_Supplier_to_Facility); //Changed as part of SUPPLIERFACILITYENTITY change for ID:SIM_Supplier_to_Facility
    var FacilityToFacilityMarket = node.getValue("a_mm_ref_FacilityToFacilityMarket").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change
    var DevFacility = node.getValue("a_mm_ref_DevFacility").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change
    //logger.info(objectType);
    var category_flag = false;
    var market_flag = false;
    var isApproved_flag = false;
    var contingency_flag = false;
    var facility_type_flag = false;
    var active_status = false;
    var classfication = step.getReferenceTypeHome().getReferenceTypeByID(categoryClassification);
    var check_market = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(market).getValue();
    //logger.info(check_market);
    // File changed for SUPPLIERFACILITYENTITY change by Venkat on 6-May-20
    var simFacility = node.getValue("a_mm_ref_SIM_Facility").getSimpleValue() + "";
    // File changed for SUPPLIERFACILITYENTITY change by Gandhi on 7 may, 2020
    var simSupplier = node.getValue("a_mm_ref_SIM_Supplier").getSimpleValue() + "";
    if (objectType == simSupplier) // Changed as part of SUPPLIERFACILITYENTITY change for ID:SIM_Supplier
    {
        // Changed as part of SUPPLIERFACILITYENTITY change for 'ClassificationToReferenceAPI'
        var tStepRef = step.getReferenceTypeHome().getReferenceTypeByID(SupplierToSupplierMarket); //Changed as part of SUPPLIERFACILITYENTITY change for ID:SupplierToSupplierMarket
        if (tStepRef) {
            // Changed as part of SUPPLIERFACILITYENTITY change for 'ClassificationToReferenceAPI'
            var tNodeRef = object.getReferences(tStepRef);
            for (var i = 0; i < tNodeRef.size(); i++) {
                tTargetLink = tNodeRef.get(i).getTarget().getID();
                if ((tTargetLink == "Supplier" + check_market)) {
                    active_status = true;
                }
            }
        }

    } else if (objectType == simFacility || objectType == DevFacility) { // Changed as part of SUPPLIERFACILITYENTITY change for “ID:SIM_Facility,ID:DevFacility”
        var tStepRef = step.getReferenceTypeHome().getReferenceTypeByID(FacilityToFacilityMarket); // Changed as part of SUPPLIERFACILITYENTITY change for ID:FacilityToFacilityMarket
        if (tStepRef) {
            var tNodeRef = object.getReferences(tStepRef);
            for (var j = 0; j < tNodeRef.size(); j++) {
                tTargetLink = tNodeRef.get(j).getTarget().getID();
                if ((tTargetLink == "Facility" + check_market)) {
                    active_status = true;
                }
            }
        }
    }
    //logger.info(active_status);
    if (active_status) {
        // File changed for SUPPLIERFACILITYENTITY change by Gandhi on 7 may, 2020
        var simSupplier = node.getValue("a_mm_ref_SIM_Supplier").getSimpleValue() + "";
        if (objectType == simSupplier) // Changed as part of SUPPLIERFACILITYENTITY change for ID:SIM_Supplier
        {
            tRef = tDevRef;
            tRef1 = tSimRef;
            var facilityReferences = object.getReferences(tRef);
            if (facilityReferences.isEmpty())
                var facilityReferences = object.getReferences(tRef1);
            for (j = 0; j < facilityReferences.size(); j++) {
                var facility = facilityReferences.get(j).getTarget();
                if (!facility_flag) {

                    if (facType == null)
                        var facility_flag = checkStatus(step, facility, category, productgroup, "SIM_Facility_To_Category", market, null);
                    else
                        facility_flag = true;
                    //logger.info("facility" + facility.getID() + "facility_flag" + facility_flag);
                }
            }
        }
        // File changed for SUPPLIERFACILITYENTITY change by Venkat on 6-May-20
        var simFacility = node.getValue("a_mm_ref_SIM_Facility").getSimpleValue() + "";
        // Changed as part of SUPPLIERFACILITYENTITY change for “ID:SIM_Facility”

        // File changed for SUPPLIERFACILITYENTITY change by Gandhi on 7 may, 2020
        var simSupplier = node.getValue("a_mm_ref_SIM_Supplier").getSimpleValue() + "";
        // Changed as part of SUPPLIERFACILITYENTITY change for ID:SIM_Supplier
        if ((objectType == simSupplier && facility_flag) || (objectType == simFacility || objectType == DevFacility)) {
            var categoryReferences = object.getReferences(classfication);
            for (i = 0; i < categoryReferences.size(); i++) {
                //logger.info(facility_flag);
                var category_name = categoryReferences.get(i).getTarget().getName();
                var category_id = categoryReferences.get(i).getTarget().getID();
                var category_check = categoryReferences.get(i).getValue("SIM_Approval_Status").getSimpleValue();
                var market_name = category_id.substring(0, 3)
                if (category_name == category) {
                    category_flag = true;
                    if (market_name == check_market) {
                        market_flag = true;
                        if (category_check == "Approved" || category_check == "Development" || category_check == "Onboarding") {
                            isApproved_flag = true;
                            if (objectType == simFacility || objectType == DevFacility) { // Changed as part of SUPPLIERFACILITYENTITY change for “ID:SIM_Facility, ID:DevFacility”
                                if (productgroup == "F") { // Changed as a part of MDMI-15954
                                    if (object.getValue("SIM_Facility_Type").getSimpleValue() == "Manufacturing") {
                                        var facility_type_flag = true;
                                    }
                                } else {
                                    facility_type_flag = true;
                                }
                                if (facType != null) {
                                    facility_type_flag = true;
                                }
                                var contingency = categoryReferences.get(i).getValue("SIM_Contingency_Flag").getSimpleValue();
                                if (contingency != "Yes") {
                                    contingency_flag = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // File changed for SUPPLIERFACILITYENTITY change by Venkat on 6-May-20
    var simFacility = node.getValue("a_mm_ref_SIM_Facility").getSimpleValue() + "";
    // File changed for SUPPLIERFACILITYENTITY change by Gandhi on 7 may, 2020
    var simSupplier = node.getValue("a_mm_ref_SIM_Supplier").getSimpleValue() + "";
    if (objectType == simSupplier) // Changed as part of SUPPLIERFACILITYENTITY change for ID:SIM_Supplier
    {
        //logger.info("category_flag" + category_flag + "market_flag" + market_flag + "isApproved_flag" + isApproved_flag);
        if (category_flag && market_flag && isApproved_flag)
            return true;
        else
            return false;
    } else if (objectType == simFacility || objectType == DevFacility) { // Changed as part of SUPPLIERFACILITYENTITY change for “ID:SIM_Facility, ID:DevFacility”
        if (facType != null) {
            facility_type_flag = true;
        }
        //logger.info("category_flag" + category_flag + "market_flag" + market_flag + "contingency_flag" + contingency_flag + "facility_type_flag" + facility_type_flag + "isApproved_flag" + isApproved_flag);
        if (category_flag && market_flag && contingency_flag && facility_type_flag && isApproved_flag)
            return true;
        else
            return false;
    }
}

/*
Name:	     Delete Extra references in STEP
Author:	     Sanjay Yellapantula(Sanjay.yellapantula@us.mcd.com)
Date:	     06/11/2019
Purpose:	   To Delete the extra references which are present in PIM and not present in Merlin. 
*/
function updatePIMReferences(node, step, referenceType, attribute) {
    var nodeValues = new java.util.LinkedHashSet();
    var reference = step.getReferenceTypeHome().getReferenceTypeByID(referenceType);
    var references = node.getReferences(reference);
    var merlinReferences = node.getValue(attribute).getSimpleValue();
    if (merlinReferences != null) {
        var merlinSplitReferences = merlinReferences.split(";");
        for (i = 0; i < merlinSplitReferences.length; i++) {
            var referenceID = merlinSplitReferences[i].trim();
            nodeValues.add(referenceID);
        }
        for (i = 0; i < references.size(); i++) {
            var targetID = references.get(i).getTarget().getID();
            if (!nodeValues.contains(targetID)) {
                references.get(i).delete();
            }
        }
    } else {
        for (i = 0; i < references.size(); i++) {
            references.get(i).delete();
            //logger.info("Deleted in else");
        }
    }
}

/* 
Name: addAssetsInDifferentClassification
Author: Susovan(Susovan.Ghosh@uk.mcd.com) 
Date: 07/11/2019
Purpose: To add document in a different classification
*/
function addAssetsInDifferentClassification(step, node, linkID, classificationID) {
    var tRefAddDoc = step.getReferenceTypeHome().getReferenceTypeByID(linkID);
    var oClassObject = step.getClassificationHome().getClassificationByID(classificationID);
    if (tRefAddDoc) {
        var tAddDoc = node.getReferences(tRefAddDoc);
        if (!tAddDoc.isEmpty()) {
            log.info("tAddDoc.size(): " + tAddDoc.size());
            for (var j = 0; j < tAddDoc.size(); j++) {
                var Supdoc = tAddDoc.get(j).getTarget();
                var SupdocClass = Supdoc.getClassifications();
                var count = 0;
                /*for (var i=0; i<SupdocClass.size(); i++)
                {
                    if(SupdocClass.get(i).getClassification().getID() == "SupplierNDADocument")
                    {
                        count++;
                        break;
                    }
                }
                if(count == 0)*/
                try {
                    Supdoc.addClassification(oClassObject);
                } catch (e) {
                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                        //Target Already Referenced Exception
                        log.info("Reference Already Linked.. ");
                    }
                    else {
                        throw "Exception : " + e;
                    }
                }
            }
        }
    }
}

/*Name: 		checkValidMarketForPIMObjects
Author: 	Suman Pan
Date: 		11/12/2019
Purpose: 	To check whether the node object is valid on the currentr market or not.
*/
function checkValidMarketForPIMObjects(parentNode, node, step, classificationPrefixOrSuffixID, nodeToMarketClassificationID) {
    //var errMessage = null;
    //var nodeObjectType = null;
    //throw node.getObjectType().getID();
    if (parentNode != null) {
        var nodeMarket = parentNode.getValue("a_mm_Market").getSimpleValue();
    } else {
        var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
    }
    var nodeObjectType = node.getObjectType().getID();

    log.info("nodeMarket: " + nodeMarket + " ******************** nodeObjectType: " + nodeObjectType);
    var marketClassFlag = false;

    if (nodeObjectType == "Restaurants" || nodeObjectType == "SoldMenuItem") {
        var marketWiseClass = nodeMarket + classificationPrefixOrSuffixID;
    } else if (nodeObjectType == "RecipeComponent" && (node.getValue("a_mm_Status").getLOVValue().getID() == "1" || (!node.isInWorkflow("wf_mm_RecipeComponent") && !node.isInWorkflow("wf_mm_RecipeComponentMaintenance") && node.getValue("a_mm_Status").getLOVValue().getID() != "4" && node.getValue("a_mm_Status").getLOVValue().getID() != "18" && node.getValue("a_mm_Status").getLOVValue().getID() != "8") || node.isInWorkflow("wf_mm_RecipeComponentMaintenance"))) { //node.getValue("a_mm_Status").getLOVValue().getID() == "2" || node.getValue("a_mm_Status").getLOVValue().getID() == "3") for MDMI-16579
        if (node.getValue("a_mm_Status").getLOVValue().getID() == "1") {
            if (node.getValue("a_mm_RecipeFlag").getLOVValue().getID() == "0") {
                var marketWiseClass = "DevelopmentRC" + nodeMarket;
            } else {
                var marketWiseClass = "DevelopmentNonRC" + nodeMarket;
            }
        } else {
            if (node.getValue("a_mm_RecipeFlag").getLOVValue().getID() == "0") {
                var marketWiseClass = "ApprovedRC" + nodeMarket;
            } else {
                var marketWiseClass = "ApprovedNonRC" + nodeMarket;
            }
        }

    } else {
        var marketWiseClass = classificationPrefixOrSuffixID + nodeMarket;
    }

    log.info("marketWiseClass: " + marketWiseClass);
    var nodeToMarketClasses = node.getClassificationProductLinks(step.getLinkTypeHome().getClassificationProductLinkTypeByID(nodeToMarketClassificationID));
    for (var i = 0; i < nodeToMarketClasses.size(); i++) {
        var classMarket = nodeToMarketClasses.get(i).getClassification();
        var classMarketID = classMarket.getID();
        log.info("classMarketID: " + classMarketID);

        if (nodeObjectType == "SoldMenuItem") {
            var parentClass = classMarket.getParent();
            var parentClassID = parentClass.getID();
            log.info("parentClassID: " + parentClassID);
            classMarketID = parentClassID;
        }

        if (classMarketID == marketWiseClass) {
            marketClassFlag = true;
            break;
        }
    }

    log.info("marketClassFlag: " + marketClassFlag);
    if (marketClassFlag) {
        return true;
    } else {
        //errMessage = node.getName() + " is not valid for " + nodeMarket + " market";
        return node.getName() + " is not valid for " + nodeMarket + " market";
        //return false;
    }
}


/*Name: 	ApproveClassifications
Author: 	Sanjay Yellapantula(Sanjay.yellapantula@us.mcd.com)
Date: 		22/1/2020
Purpose: 	To Approve the classification folders that are linked to the node.
*/

function approveClassification(node, step, referencetype) {
    var reftype = step.getLinkTypeHome().getClassificationProductLinkTypeByID(referencetype);
    var ref = node.getClassificationProductLinks(reftype);
    for (i = 0; i < ref.size(); i++) {
        var classification = ref.get(i).getClassification();
        classification.approve();
    }
}



function changeBGColour(value) {

    if (value == "Not Available") {
        return " bgcolor=#FF0000>" + value;
    } else {
        return ">" + value;
    }
}

function getDetails(node, step) {
    var result = "";
    var spID = node.getValue("LinkedShippingPackages").getSimpleValue() + "";

    var phyCharID = step.getReferenceTypeHome().getReferenceTypeByID("PhysicalCharacteristics");
    var shippingPackage = step.getProductHome().getProductByID(spID);
    //logger.info("phyCharID: " + phyCharID);
    //logger.info("shippingPackage: " + shippingPackage);

    if (shippingPackage != null && phyCharID != null) {
        var phyChar = shippingPackage.getReferences(phyCharID).toArray();

        //logger.info("phyChar.length: " + phyChar.length);
        for (var i = 0; i < phyChar.length; i++) {

            result = result + "<tr>" + "<td>" + phyChar[i].getTarget().getName() + "</td>";
            result = result + "<td>" + phyChar[i].getValue("a_mm_PhysicalCharacteristicsTargetValue").getSimpleValue() + "</td>";
            result = result + "<td>" + phyChar[i].getValue("a_mm_PhysicalCharacteristicsMinimumValue").getSimpleValue() + "</td>";
            result = result + "<td>" + phyChar[i].getValue("a_mm_PhysicalCharacteristicsMaximumValue").getSimpleValue() + "</td>";
            result = result + "<td" + changeBGColour(phyChar[i].getValue("a_mm_Availability").getSimpleValue()) + "</td>";
            result = result + "</tr>"

        }
        if (result != "") {
            result = "<table border=2><TR><td>Name</td><td>Target Value</td><td>Minimum Value</td><td>Maximum Value</td><td>Avaiability Value</td></tr>" + result + "</table>";
        }
        //logger.info("result: "+result)
    }
    //logger.info("result: " + result)
    return result;
}


/* Name: 
Author: Kirubakaran Gajendran
Date: 13 March 2020 
Purpose: Fetch User group from Current User for BMI Maintenance -  MDMI 6766 & MDMI 5169 - 13 March 2020
*/
function getBMIMaintenanceUser(step) {

    var userGroupList = new java.util.ArrayList();
    userGroupList.addAll(step.getCurrentUser().getGroups());
    //logger.info("Size is :" + userGroupList.size());
    var userGroup = null;
    var user = "INVALID";

    for (var i = 0; i < userGroupList.size(); i++) {

        //logger.info("Group is: " + userGroupList.get(i).getID());
        userGroup = userGroupList.get(i).getID();
        if (userGroup.contains("PIMRole8-")) {

            // logger.info("Its HAVI GLOBAL User");
            user = "HAVI";
        } else if (userGroup.contains("PIMRole1-")) {

            //logger.info("Its FOOD User");
            user = "FOOD";
        } else if (userGroup.contains("PIMRole15-")) {

            //logger.info("Its POWER User");
            user = "POWER";
        } else {

            //logger.info("Not Valid User for BMI Replacement");
        }
    }
    //logger.info("BMI Maintenance User: " + user);
    return user;
}

//Function for performing the Product Ingredient Roll Up fucntionality at SU to RC level : Rahul_Choudhary
/* Name: 
Author: Rahul Choudhary (rahul.choudhary@us.mcd.com)
Date: 03/11/2020 
Purpose: Ingredient Statements of the RC should get rolled up to RC level from SU level  : MDMI-6389
Revision History : 
1. Harshit Sharma - 10/02/2021 - Modified code as per MDMI-9543, to check Recipe Component Group by ID
*/
function productIngredientStatementRollUp_RC(node, step) {

    var tRefSupplierItem = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var tRefShippingPackage = step.getReferenceTypeHome().getReferenceTypeByID("DevSUToShipingPackage");


    var Ingredient_Statement = "";
    var Ingredient_Statement_local_language = "";
    var productCategory = "";
    var marketCategory = "";
    var popDeclaration = null;

    var ObjectType = node.getObjectType();
    log.info("value of Object type" + ObjectType.getID());
    if (ObjectType.getID() == "RecipeComponent") {
        log.info("Inside Recipe Component Loop");
        //productCategory = node.getValue("a_mm_RecipeComponentGroup").getSimpleValue();
        productCategory = node.getValue("a_mm_RecipeComponentGroup").getID();
        var objectMarket = node.getValue("a_mm_Market").getSimpleValue();
        log.info("market name of the node" + objectMarket);
        if (productCategory != null && productCategory == "F") {
            var tRefListSupplierUnit = node.getReferences(tRefSupplierItem);
            log.info("Number of Supplier Item linked to the RC : " + tRefListSupplierUnit.size());
            for (var j = 0; j < tRefListSupplierUnit.size(); j++) {
                var siObject = tRefListSupplierUnit.get(j).getTarget();
                var supplierUnitName = siObject.getName();

                log.info("Name of Supplier Unit" + supplierUnitName);
                var shippingPackageList = siObject.getReferences(tRefShippingPackage);
                log.info("Number of SP linked to the SI_Rahul " + Number(j + 1) + ">" + shippingPackageList.size());
                for (var k = 0; k < shippingPackageList.size(); k++) {
                    var Ingredient_Statement_temp = null;
                    var Ingredient_Statement_local_language_temp = null;

                    var shippingPackageObject = shippingPackageList.get(k).getTarget();
                    //Check for the market of the shipping package wrt RC
                    var shippingPkgMarket = shippingPackageObject.getValue("a_mm_Market").getSimpleValue();
                    //var marketStatus = pim.checkValidMarketForPIMObjects(node, shippingPackageObject, step, "ShippingPackage", "SPToSPMarket");
                    var marketStatus = checkValidMarketForPIMObjects(node, shippingPackageObject, step, "ShippingPackage", "SPToSPMarket");
                    if (marketStatus != null && marketStatus == true) {
                        /* log.info("value of SP Level Product Ingredient Statement(English) " +
                            Number(k + 1) + ":" + shippingPackageObject.getValue("a_mm_IngredientStatement").getSimpleValue()); */

                        Ingredient_Statement_temp = shippingPackageObject.getValue("a_mm_IngredientStatement").getSimpleValue();

                        Ingredient_Statement_local_language_temp = shippingPackageObject.getValue("a_mm_IngredientStatementGerman").getSimpleValue();

                        if (Ingredient_Statement_temp != null) {
                            Ingredient_Statement = Ingredient_Statement + supplierUnitName + ": " + Ingredient_Statement_temp + "\n\n";

                        }
                        if (Ingredient_Statement_local_language_temp != null) {
                            Ingredient_Statement_local_language = Ingredient_Statement_local_language + supplierUnitName + ": " + Ingredient_Statement_local_language_temp + "\n\n";

                        }

                    }

                }
                //var tRefListShippingPackage = node.getReferences(tRefShippingPackage);
            }
            //log.info("value of the updated RC ingredient statement" + Ingredient_Statement);
        }


        if (Ingredient_Statement != null)
            node.getValue("a_mm_IngredientStatement").setSimpleValue(Ingredient_Statement.trim());
        if (Ingredient_Statement_local_language != null)
            node.getValue("a_mm_IngredientStatementGerman").setSimpleValue(Ingredient_Statement_local_language.trim());
        log.info("value of the updated RC ingredient statement(English)" + node.getValue("a_mm_IngredientStatement").getSimpleValue());
        log.info("value of the updated RC ingredient statement (Local)" + node.getValue("a_mm_IngredientStatementGerman").getSimpleValue());
    }
}

/* Name: deleteProductToClassification_If_ProductToProductReferenceIsBroken
Author: Suman Pan (Suman_Pan.pan@us.mcd.com)
Date: 16/04/2020 
Purpose: To delete any product to classification link if product to product reference is no more exists
Revision History :
1) Suman Pan - 10/06/2020 -- changed the parameter(sourceObj) of the function as per MDMI-7486
*/
function deleteProductToClassification_If_ProductToProductReferenceIsBroken(node, step, refID, prodToClassID, sourceObj, validAttributeIdForSource, validAttributeIdForTarget) {
    var toDelete = false;
    var sourceProduct = null;
    if (sourceObj == null) {
        sourceProduct = node;
    } else {
        /****************************** Start: Version 1 *******************************/
        sourceProduct = sourceObj;
        /*sourceProduct = step.getProductHome().getProductByID(sourceObjID.trim());
        if(sourceProduct != null)
            var objectType = sourceProduct.getObjectType().getID();
        // Changed as part of SUPPLIERFACILITYENTITY change for 'EntityHome'
        if(!sourceProduct || objectType == "SIM_Supplier")
            sourceProduct = step.getEntityHome().getEntityByID(sourceObjID.trim());*/
        /****************************** End: Version 1 *******************************/
    }
    log.info("sourceProduct: " + sourceProduct.getID());
    var refHome = step.getReferenceTypeHome().getReferenceTypeByID(refID);
    var prodToClassificationHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID(prodToClassID);
    if (refHome != null && prodToClassificationHome != null && sourceProduct != null) {
        var arrayListToStoreRefProdID = new java.util.ArrayList();
        var refLinks = sourceProduct.getReferences(refHome);
        log.info("refLinks size: " + refLinks.size());
        for (var i = 0; i < refLinks.size(); i++) {
            var refProdID = refLinks.get(i).getTarget().getID();
            arrayListToStoreRefProdID.add(refProdID);
        }
        log.info("arrayListToStoreRefProdID: " + arrayListToStoreRefProdID);
        var prodToClassificationLinks = node.getClassificationProductLinks(prodToClassificationHome);
        log.info("prodToClassificationLinks size: " + prodToClassificationLinks.size());
        for (var j = 0; j < prodToClassificationLinks.size(); j++) {
            if (validAttributeIdForSource != null)
                var sourceProdIDinProdToClassLink = prodToClassificationLinks.get(j).getValue(validAttributeIdForSource).getSimpleValue();
            var prodIDinProdToClassLink = prodToClassificationLinks.get(j).getValue(validAttributeIdForTarget).getSimpleValue();
            log.info("validAttributeIdForTarget: " + validAttributeIdForTarget);
            log.info("prodIDinProdToClassLink: " + prodIDinProdToClassLink);
            if (!arrayListToStoreRefProdID.contains(prodIDinProdToClassLink.trim())) {
                if (sourceObj == null && validAttributeIdForSource == null) {
                    log.info("1. Deleting Prod to Classification for product with ID: " + prodIDinProdToClassLink);
                    prodToClassificationLinks.get(j).delete();
                } else if (sourceProdIDinProdToClassLink.trim() == sourceProduct.getID()) {
                    log.info("2. Deleting Prod to Classification for product with ID: " + prodIDinProdToClassLink);
                    toDelete = true;
                    prodToClassificationLinks.get(j).delete();
                }
            }
        }
    }
    log.info("toDelete: " + toDelete);
    return toDelete;
}

/* Name: createSP_From_RCtoFacilityGrid
Author: Suman Pan (Suman_Pan.pan@us.mcd.com)
Date: 16/04/2020 
Purpose: To create or update new Shipping Packages depending upon user's selection
Revision History :-
1) Suman Pan - 16/06/2020 - Modified the function as per MDMI-7508
File changed for SUPPLIERFACILITYENTITY change by Rishi,Kunal on <06/05/2020>
2) Suman Pan - 21/08/2020 - Added conversion logic for HandlingUOM and TotalPackQty as per PROD ticket INC10671110
3) Harshit Sharma - 3-/12/2020 - Modified the function as per MDMI-8973
4) Suman Pan - 10/03/2021 -- Added setting of Market attribute for newly created SP
*/
function createSP_From_RCtoFacilityGrid(node, step, state) {
    var rcToFacilityGrid = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToFacilityGrid");
    var rcMarket = node.getValue("a_mm_Market").getSimpleValue();
    var ShippingPackageToDevFacility = node.getValue("a_mm_ref_ShippingPackageToDevFacility").getSimpleValue() + "";
    var ShippingPackageToSupplier = node.getValue("a_mm_ref_ShippingPackageToSupplier").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change
    log.info("rcMarket: " + rcMarket);
    if (rcToFacilityGrid != null && rcMarket != null && rcMarket != "US") {
        var rcToFacLinks = node.getClassificationProductLinks(rcToFacilityGrid);
        for (var i = 0; i < rcToFacLinks.size(); i++) {
            var rcToFacilityIns = rcToFacLinks.get(i);

            var spID = null;
            var suIDinGrid = rcToFacilityIns.getValue("a_mm_BMIGridSUID").getSimpleValue();
            var suppIDinGrid = rcToFacilityIns.getValue("a_mm_BMIGridSupplierId").getSimpleValue();
            var facIDinGrid = rcToFacilityIns.getValue("a_mm_BMIGridFacilityId").getSimpleValue();
            if (suIDinGrid != null && suppIDinGrid != null && facIDinGrid != null) {
                var suObj = step.getProductHome().getProductByID(suIDinGrid.trim());
                if (suObj != null) {
                    var spKey = suIDinGrid.trim() + "-" + suppIDinGrid.trim() + "-" + facIDinGrid.trim();
                    log.info("suObj: " + suObj.getID() + " spKey: " + spKey);
                    if (suObj.getObjectType().getID() == "McDonaldItem") {
                        var spProductExists = step.getProductHome().getObjectByKey("Shipping_Package_Key", spKey);
                        /************************************************************** Start: Version 1 ********************************************************************/
                    } else if (suObj.getObjectType().getID() == "DevSU") {
                        var spProductExists = step.getProductHome().getObjectByKey("Dev_Shipping_Package_Key", spKey);
                        log.info("devSpProductExists: " + spProductExists);
                        if (spProductExists != null) {
                            spID = spProductExists.getID();
                        }
                    }
                    log.info("spProductExists: " + spProductExists);
                    var spToSpMarketHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SPToSPMarket");
                    var spMarketClassificationHome = step.getClassificationHome().getClassificationByID("ShippingPackage" + rcMarket);
                    if (spProductExists == null) {
                        //create SP
                        var spRootHome = step.getProductHome().getProductByID("ShippingPackageHierarchyRoot");
                        var suToSpHome = step.getReferenceTypeHome().getReferenceTypeByID("DevSUToShipingPackage");
                        var spToSupplierHome = step.getReferenceTypeHome().getReferenceTypeByID(ShippingPackageToSupplier); // Changed as part of SUPPLIERFACILITYENTITY change for ID:ShippingPackageToSupplier
                        var spToFacilityHome = step.getReferenceTypeHome().getReferenceTypeByID(ShippingPackageToDevFacility); //Changed as part of SUPPLIERFACILITYENTITY change for ID:ShippingPackageToDevFacility
                        if (spRootHome != null && spMarketClassificationHome != null && spToSpMarketHome != null && suToSpHome != null && spToSupplierHome != null && spToFacilityHome != null) {
                            var newSpObj = spRootHome.createProduct(null, "ShippingPackage");
                            log.info("newSpObj: " + newSpObj);
                            newSpObj.getValue("ShippingPackageKey").setSimpleValue(spKey);
                            if (suObj.getObjectType().getID() == "DevSU") {
                                newSpObj.getValue("a_mm_DevShippingPackageKey").setSimpleValue(spKey);
                            }
                            newSpObj.setName(suObj.getName());
                            newSpObj.getValue("a_mm_ShippingUnitName").setSimpleValue(suObj.getName());
                            /*************************** Start: Version 4 ******************************/
                            if (newSpObj.getValue("a_mm_Market").getSimpleValue() == null)
                                newSpObj.getValue("a_mm_Market").setSimpleValue(rcMarket);
                            /*************************** End: Version 4 ******************************/
                            var currentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
                            newSpObj.getValue("a_mm_CreationDate").setSimpleValue(currentDate);
                            log.info("currentDate: " + currentDate);
                            var createdDate = newSpObj.getValue("SIM_Creation_Date").getSimpleValue();
                            newSpObj.getValue("SIM_Creation_Date").setSimpleValue(createdDate);
                            newSpObj.getValue("a_mm_Name").setSimpleValue(suObj.getName());
                            //newSpObj.getValue("a_mm_ProductSpecNumber").setSimpleValue("5001923");// Required?
                            /******************************** Start: Version 2 ************************************/
                            var handlingUOMofSUobj = suObj.getValue("HandlingUOM").getID();
                            var handlingUOMValueOfSUobj = suObj.getValue("HandlingUOM").getSimpleValue();
                            var totPkQty = suObj.getValue("TotalPackQty").getSimpleValue();
                            var handUOMlovHome = step.getListOfValuesHome().getListOfValuesByID("HandlingUOM");
                            newSpObj.getValue("a_mm_SULongDescription").setSimpleValue(suObj.getValue("TradeItemLongDescription").getSimpleValue());
                            newSpObj.getValue("a_mm_SUShortDescription").setSimpleValue(suObj.getValue("TradeItemShortDescription").getSimpleValue());
                            newSpObj.getValue("ProductGroup").setSimpleValue(suObj.getValue("ProductGroup").getSimpleValue());
                            newSpObj.getValue("ProductCategory").setSimpleValue(suObj.getValue("ProductCategory").getSimpleValue());
                            //newSpObj.getValue("MaxYieldPerServing").setSimpleValue(suObj.getValue("MaxYieldPerServing").getSimpleValue());
                            //newSpObj.getValue("MinYieldPerServing").setSimpleValue(suObj.getValue("MinYieldPerServing").getSimpleValue());
                            newSpObj.getValue("MaximumTemperature").setSimpleValue(suObj.getValue("MaximumTemperature").getSimpleValue());
                            newSpObj.getValue("MinimumTemperature").setSimpleValue(suObj.getValue("MinimumTemperature").getSimpleValue());
                            if (handlingUOMofSUobj == "EA") {
                                newSpObj.getValue("a_mm_CaseSize").setSimpleValue(Number((Number(totPkQty)).toFixed(2)));
                                newSpObj.getValue("a_mm_CaseSizeUOM").setSimpleValue("EA"); // Need to change when LOV is changed
                                newSpObj.getValue("HandlingUOM").setSimpleValue(handlingUOMValueOfSUobj);
                            } else if (handlingUOMofSUobj == "KG" || handlingUOMofSUobj == "G" || handlingUOMofSUobj == "LB" || handlingUOMofSUobj == "OZ") {
                                var caseSizeValue = Number(gramConversionUsingAttributeValueAndUOM(totPkQty, handlingUOMValueOfSUobj)) / 1000;
                                newSpObj.getValue("a_mm_CaseSize").setSimpleValue(Number(caseSizeValue).toFixed(2));
                                newSpObj.getValue("a_mm_CaseSizeUOM").setSimpleValue("KG");
                                newSpObj.getValue("HandlingUOM").setSimpleValue(handUOMlovHome.getListOfValuesValueByID("KG").getValue());
                            } else if (handlingUOMofSUobj == "L" || handlingUOMofSUobj == "ML" || handlingUOMofSUobj == "GAL" || handlingUOMofSUobj == "FLZ") {
                                var caseSizeValue = Number(mlConversionUsingAttributeValueAndUOM(totPkQty, handlingUOMValueOfSUobj)) / 1000;
                                newSpObj.getValue("a_mm_CaseSize").setSimpleValue(Number(caseSizeValue).toFixed(2));
                                newSpObj.getValue("a_mm_CaseSizeUOM").setSimpleValue("Ltr");
                                newSpObj.getValue("HandlingUOM").setSimpleValue(handUOMlovHome.getListOfValuesValueByID("L").getValue());
                            }
                            /******************************** End: Version 2 ************************************/
                            if ((Number(totPkQty)) != 0) {
                                newSpObj.getValue("CaseQty").setSimpleValue((Number(totPkQty)).toFixed(2));
                            }
                            newSpObj.getValue("IsLiquid").setSimpleValue(suObj.getValue("IsLiquid").getSimpleValue());
                            newSpObj.getValue("TradeItemFlavour").setSimpleValue(suObj.getValue("TradeItemFlavour").getSimpleValue());
                            newSpObj.getValue("TradeItemWeight").setSimpleValue(suObj.getValue("TradeItemWeight").getSimpleValue());
                            newSpObj.getValue("TradeItemVolume").setSimpleValue(suObj.getValue("TradeItemVolume").getSimpleValue());
                            newSpObj.getValue("a_mm_Status").setSimpleValue("Approved");
                            newSpObj.getValue("a_mm_PIMMerlinStatus").setSimpleValue("Triggered to Merlin on SI");
                            try {
                                newSpObj.createClassificationProductLink(spMarketClassificationHome, spToSpMarketHome);
                            } catch (e) {
                                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                    //Target Already Referenced Exception
                                    log.info("Reference Already Linked.. ");
                                }
                                else {
                                    throw "Exception : " + e;
                                }
                            }
                            suObj.createReference(newSpObj, suToSpHome);
                            // Changed as part of SUPPLIERFACILITYENTITY change for 'EntityHome'
                            var suppObj = step.getEntityHome().getEntityByID(suppIDinGrid.trim());
                            // Changed as part of SUPPLIERFACILITYENTITY change for 'EntityHome'
                            var facObj = step.getEntityHome().getEntityByID(facIDinGrid.trim());
                            if (facObj == null)
                                facObj = step.getNodeHome().getObjectByKey("customIDKey", facIDinGrid);
                            if (suppObj != null && facObj != null) {
                                newSpObj.getValue("a_mm_Merlin_Supplier_ID").setSimpleValue(suppObj.getID());
                                newSpObj.getValue("a_mm_Merlin_Facility_ID").setSimpleValue(facObj.getID());
                                newSpObj.getValue("a_mm_SupplierName").setSimpleValue(suppObj.getName());
                                newSpObj.getValue("a_mm_FacilityName").setSimpleValue(facObj.getName());
                                newSpObj.getValue("SIM_Physical_ Address_Country").setSimpleValue(suppObj.getValue("SIM_Physical_ Address_Country").getSimpleValue());
                                newSpObj.getValue("SIM_Physical_ Address_City").setSimpleValue(suppObj.getValue("SIM_Physical_ Address_City").getSimpleValue());
                                // File changed for SUPPLIERFACILITYENTITY change by Venkat on 6-May-20
                                var simFacility = node.getValue("a_mm_ref_SIM_Facility").getSimpleValue() + "";
                                var SIM_Supplier_to_Facility = node.getValue("REF_SIM_Supplier_to_Facility").getSimpleValue() + ""; // added for SUPPLIERFACILITYENTITY change

                                if (facObj.getObjectType().getID() == simFacility) { // Changed as part of SUPPLIERFACILITYENTITY change for “ID:SIM_Facility”
                                    var suppToFacLink = suppObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(SIM_Supplier_to_Facility)); // Changed as part of SUPPLIERFACILITYENTITY change for “ID:SIM_Supplier_to_Facility”
                                    for (var j = 0; j < suppToFacLink.size(); j++) {
                                        var facObjID = suppToFacLink.get(j).getTarget().getID();
                                        if (facObjID == facObj.getID()) {
                                            newSpObj.getValue("a_mm_WSI").setSimpleValue(suppToFacLink.get(j).getValue("SIM_WSI_Number").getSimpleValue());
                                        }
                                    }
                                }
                                newSpObj.createReference(suppObj, spToSupplierHome);
                                newSpObj.createReference(facObj, spToFacilityHome);
                            }
                            spID = newSpObj.getID();
                        }
                    } else if (spMarketClassificationHome != null && spToSpMarketHome != null) {
                        var spMarketCheck = checkValidMarketForPIMObjects(node, spProductExists, step, "ShippingPackage", "SPToSPMarket");
                        if (spMarketCheck != true) {
                            // Market extension
                            spProductExists.createClassificationProductLink(spMarketClassificationHome, spToSpMarketHome);
                        }
                        spID = spProductExists.getID();
                    }
                    /************************************************************** End: Version 1 ********************************************************************/
                }
            }
            if (spID != null) {
                rcToFacilityIns.getValue("a_mm_BMIGridSPID").setSimpleValue(spID);
            }

        }
    }
}

/* Name: check_If_YesNoSelectionIsNotYes_In_ProdToClassRef_For_AtleastOneTargetObj_In_ProdToProdRef
Author: Suman Pan (Suman_Pan.pan@us.mcd.com)
Date: 17/04/2020 
Purpose: To throw validation message if user has not selected the desired value in product to classification link by comparing the grids with product to product reference target objects
Revision History : 
*/
function check_If_YesNoSelectionIsNotYes_In_ProdToClassRef_For_AtleastOneTargetObj_In_ProdToProdRef(node, step, prodToProdRefID, ProdToClassID, attrIDforTargetObj, attrIDinGridToCheck, desiredID, message) {
    var prodToClassHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID(ProdToClassID);
    var prodToProdRefHome = step.getReferenceTypeHome().getReferenceTypeByID(prodToProdRefID);
    if (prodToClassHome != null && prodToProdRefHome != null) {
        var errorMessage = "";
        var prodToProdRefs = node.getReferences(prodToProdRefHome);
        for (var i = 0; i < prodToProdRefs.size(); i++) {
            var objCheckingFlag = false;
            var yesNoCheckingFlag = false;
            var targetObj = prodToProdRefs.get(i).getTarget();
            var prodToClassLinks = node.getClassificationProductLinks(prodToClassHome);
            for (var j = 0; j < prodToClassLinks.size(); j++) {
                var prodToClassIns = prodToClassLinks.get(j);
                var targetObjIDinGrid = prodToClassIns.getValue(attrIDforTargetObj).getSimpleValue();
                var attributeToCheck = prodToClassIns.getValue(attrIDinGridToCheck).getID();
                if (targetObjIDinGrid != null && targetObjIDinGrid.trim() == targetObj.getID()) {
                    objCheckingFlag = true;
                    if (attributeToCheck == desiredID) {
                        yesNoCheckingFlag = true;
                        break;
                    }
                }
            }
            if (yesNoCheckingFlag == false && objCheckingFlag == true) {
                errorMessage = "Atleast one " + step.getAttributeHome().getAttributeByID(attrIDinGridToCheck).getName() + " should be '" + message + "' for " + targetObj.getName() + "\n" + errorMessage;
            }
        }
    }
    if (errorMessage == "" || errorMessage == null)
        return true;
    else
        return errorMessage;
}
/* Name: checkFacMarket
Author: Rishidip Roy (Rishidip.Roy@us.mcd.com)
Date: 07/04/2020 
Purpose: To check market of source and target and retuen true if they match(entity approach) 
Revision History : 
1) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/
function checkFacMarket(step, source, target, MarketClassification, tEntity) {
    var sourceObjectType = source.getObjectType().getID();
    var targetObjectType = target.getObjectType().getID();
    var flag = false;
    var errmsg = null;
    var targetmarket;
    var sourceMarket = source.getValue("a_mm_Market").getSimpleValue();
    var ISOMarketFormat = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(sourceMarket).getValue();
    targetmarket = tEntity + ISOMarketFormat;

    var markets = target.getReferences(MarketClassification);
    for (var i = 0; i < markets.size(); i++) {
        var market = markets.get(i).getTarget().getID();
        if (market == targetmarket) {
            flag = true;
            log.info("Check Flag");
            break;
        }
    }
    if (flag == true) {
        return true;
    } else
        return false;
}

/* Name: populateAllContext
Author: Rishidip Roy (Rishidip.Roy@us.mcd.com)
Date: 07/23/2020 
Purpose: To populate value of a particular attribute for all contexts from node to a different object.
Revision History :
1) 29/07/2020 -- Suman Pan -- Added extra parameter in the function and modified the variable names in a sclable manner
*/
function populateAllContext(getValueFromObj, step, setValueToObj, fromAttr, toAttr) {
    if (toAttr == null)
        toAttr = fromAttr;
    var allcontexts = step.getContextHome().getContexts();
    var contextIterator = allcontexts.iterator();
    while (contextIterator.hasNext()) {
        var conTarget = contextIterator.next()
        var contextID = conTarget.getID();
        log.info("contexts" + contextID);
        step.executeInContext(contextID, function (step) {

            var contextSpecGetObj = step.getObjectFromOtherManager(getValueFromObj);
            var getAttrValue = contextSpecGetObj.getValue(fromAttr).getSimpleValue();
            if (getAttrValue != null) {
                var contextSpecSetObj = step.getObjectFromOtherManager(setValueToObj);
                contextSpecSetObj.getValue(toAttr).setSimpleValue(getAttrValue);
                log.info("getAttrValue: " + contextSpecSetObj.getValue(toAttr).getSimpleValue());
            }
        });
    }
}

/*
Name: deleteAllProductToProductRefs
Author: Suman Pan(Suman_Pan.pan@us.mcd.com)
Date: 31/08/2020
Sprint : 35
Purpose: To delete all the Product to Product references of a product type source object
*/
function deleteAllProductToProductRefs(sourceObj, step, prodRefID) {
    var prodToProdRefHome = step.getReferenceTypeHome().getReferenceTypeByID(prodRefID);
    var prodToProdRefs = sourceObj.getReferences(prodToProdRefHome);
    for (var a = 0; a < prodToProdRefs.size(); a++) {
        var prodToProdRefIns = prodToProdRefs.get(a);
        prodToProdRefIns.delete();
    }
}

/*
Name: createSMItoRCReferences
Author: Suman Pan(Suman_Pan.pan@us.mcd.com)
Date: 31/08/2020
Sprint : 35
Purpose: To create SMI to RC links and to calculate and populate corresponding attributes in the new and existing links
version 2: Updated by Kiruba as part of MDMI-9464
version 3: Updated by Ritabrata as part of MDMI-11078
*/

function createSMItoRCReferences(node, step, BMIToRCLinkID) {
    var tBMIToRecipeLink = step.getReferenceTypeHome().getReferenceTypeByID(BMIToRCLinkID);
    var tSMIToRecipeLink = step.getReferenceTypeHome().getReferenceTypeByID("SMIToRecipeComponent");
    var tSMIToBMIRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI"));
    var tMarket = node.getValue("a_mm_Market").getSimpleValue();

    if (tSMIToBMIRef.size() > 0) {
        for (var i = 0; i < tSMIToBMIRef.size(); i++) {
            var tSMIToBMIIns = tSMIToBMIRef.get(i);
            var tBMIObj = tSMIToBMIIns.getTarget();
            var tBMIObjStepID = tBMIObj.getID();

            if (tBMIObj.getObjectType().getID() == "BaseMenuItem") {
                var BMIRList = tBMIObj.getChildren().iterator();
                while (BMIRList.hasNext()) {

                    var tBMIRObj = BMIRList.next();
                    var tRecipeVariantMenuCode = tBMIRObj.getValue("a_mm_BMIMenuCode").getSimpleValue();
                    var tRecipeVariantStepID = tBMIRObj.getID();
                    var tRecipeVariantID = tBMIRObj.getValue("a_mm_BMIRecipeID").getSimpleValue();
                    var tRecipeVariantEffFromdate = tBMIRObj.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                    var tRecipeVariantEffTodate = tBMIRObj.getValue("a_mm_EffectiveToDate").getSimpleValue();
                    var tRecipeVariantName = tBMIRObj.getValue("a_mm_BMIRName").getSimpleValue();
                    var tRecipeVariantClassification = tBMIRObj.getValue("a_mm_BMIRecipeGroup").getSimpleValue();
                    // a_mm_BMIRecipesLinked ==> BMI StepID| BMI Menu Code|Recipe Variant StepID|Recipe Variant Number|EffectiveFromdate|EffectiveToDate|Recipe Variant Name| Recipe Variant Classification.
                    var tLinkedBMIRDetails = tBMIObjStepID + "|" + tRecipeVariantMenuCode + "|" + tRecipeVariantStepID + "|" + tRecipeVariantID + "|" + tRecipeVariantEffFromdate + "|" + tRecipeVariantEffTodate + "|" + tRecipeVariantName + "|" + tRecipeVariantClassification;
                    var tBMIToRecipeRef = tBMIRObj.getReferences(tBMIToRecipeLink);
                    for (var j = 0; j < tBMIToRecipeRef.size(); j++) {
                        var tBMIToRecipeIns = tBMIToRecipeRef.get(j);
                        var tRecipeObj = tBMIToRecipeIns.getTarget();
                        var tRecipeID = tRecipeObj.getID();

                        var tBtoRServingFact = tBMIToRecipeIns.getValue("a_mm_ServingFactor").getSimpleValue();
                        var tRecipeCompNum = tRecipeObj.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
                        var tBtoRWasteInclusion = tBMIToRecipeIns.getValue("a_mm_WasteInclusion").getSimpleValue();
                        var tBtoRMinServingFact = tBMIToRecipeIns.getValue("a_mm_MinCustomisableQuantity").getSimpleValue();
                        var tBtoRMaxServingFact = tBMIToRecipeIns.getValue("a_mm_MaxCustomisableQuantity").getSimpleValue();
                        var tBtoRRefund = tBMIToRecipeIns.getValue("a_mm_Refund").getSimpleValue();
                        var tBtoRCharge = tBMIToRecipeIns.getValue("a_mm_PricingCharge").getSimpleValue();
                        var tBtoRGrill = tBMIToRecipeIns.getValue("a_mm_Grill").getSimpleValue();
                        var tBtoRDefRFMServingFact = tBMIToRecipeIns.getValue("a_mm_Default_RFM_Serving_Factor").getSimpleValue();
                        var tBtoRCostInclusive = tBMIToRecipeIns.getValue("a_mm_CostInclusive").getSimpleValue();
                        var tBtoRDisplayOnCSO = tBMIToRecipeIns.getValue("a_mm_DisplayOnCSO").getSimpleValue();
                        var tSequenceNumber = tBMIToRecipeIns.getValue("a_mm_RefSequenceNumber").getSimpleValue(); // Added to calculate the Sequence Number
                        if (tMarket == "DE" || tMarket == "ES" || tMarket == "IT" || tMarket == "PL" || tMarket == "UA" || tMarket == "AT" || tMarket == "BE" || tMarket == "CA" || tMarket == "NL" || tMarket == "PT" || tMarket == "CH") { // Need to revisit for New Market Onboarding
                            var tBtoRIncludeInSalesType = tBMIToRecipeIns.getValue("a_mm_IncludeinSalesType").getSimpleValue();
                        }

                        var tSMIToRecipeRef = node.getReferences(tSMIToRecipeLink);
                        var tRecipeCount = 0;

                        for (var k = 0; k < tSMIToRecipeRef.size(); k++) {
                            var tSMIToRecipeIns = tSMIToRecipeRef.get(k);
                            var tRecipeObj1 = tSMIToRecipeIns.getTarget();
                            var tRecipeID1 = tRecipeObj1.getID();
                            if (tRecipeID1 == tRecipeID) {
                                tRecipeCount++;
                                tSMIToRecipeIns.getValue("a_mm_BMIRecipesLinked").addValue(tLinkedBMIRDetails);
                            }
                        }

                        if (tRecipeCount == 0) {
                            try {
                                var tNewSMIToRecipeRefE = node.createReference(tRecipeObj, tSMIToRecipeLink);
                                // code added by Ritabrata to calculate the Sequence Number - Starts
                                /*
                                var SMIToRCSize = tSMIToRecipeRef.size();
                                var SequenceNumber = (SMIToRCSize + 1)*10;
                                tNewSMIToRecipeRefE.getValue("a_mm_RefSequenceNumber").setSimpleValue(SequenceNumber);
                                */
                                // code added by Ritabrata to calculate the Sequence Number - Ends
                                if (tMarket != "CA") {
                                    tNewSMIToRecipeRefE.getValue("a_mm_RecipeGroup").setSimpleValue("1");
                                    tNewSMIToRecipeRefE.getValue("a_mm_ServingFactor").setSimpleValue(tBtoRServingFact);
                                    tNewSMIToRecipeRefE.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(tBtoRDefRFMServingFact);
                                    tNewSMIToRecipeRefE.getValue("a_mm_MinCustomisableQuantity").setSimpleValue(tBtoRMinServingFact);
                                    tNewSMIToRecipeRefE.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue(tBtoRMaxServingFact);
                                    tNewSMIToRecipeRefE.getValue("a_mm_Refund").setSimpleValue(tBtoRRefund);
                                    tNewSMIToRecipeRefE.getValue("a_mm_PricingCharge").setSimpleValue(tBtoRCharge);
                                    tNewSMIToRecipeRefE.getValue("a_mm_CostInclusive").setSimpleValue(tBtoRCostInclusive);
                                    tNewSMIToRecipeRefE.getValue("a_mm_DisplayOnCSO").setSimpleValue(tBtoRDisplayOnCSO);
                                    tNewSMIToRecipeRefE.getValue("a_mm_RefSequenceNumber").setSimpleValue(tSequenceNumber); // added to calculate the Sequence Number                               

                                    if (tBtoRGrill) {
                                        tNewSMIToRecipeRefE.getValue("a_mm_Grill").setSimpleValue(tBtoRGrill);
                                    } else {
                                        tNewSMIToRecipeRefE.getValue("a_mm_Grill").setSimpleValue("FALSE");
                                    }
                                } else {
                                    tNewSMIToRecipeRefE.getValue("a_mm_MinCustomisableQuantity").setSimpleValue("Not Defined");
                                    tNewSMIToRecipeRefE.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue("Not Defined");
                                    tNewSMIToRecipeRefE.getValue("a_mm_Refund").setSimpleValue("Not Defined");
                                    tNewSMIToRecipeRefE.getValue("a_mm_PricingCharge").setSimpleValue("Not Defined");
                                    tNewSMIToRecipeRefE.getValue("a_mm_DisplayOnCSO").setSimpleValue("Not Defined");
                                    tNewSMIToRecipeRefE.getValue("a_mm_Grill").setSimpleValue("Not Defined");
                                    tNewSMIToRecipeRefE.getValue("a_mm_CostInclusive").setSimpleValue("Not Defined");
                                    tNewSMIToRecipeRefE.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue("1");

                                }
                                if (tBtoRWasteInclusion) {
                                    tNewSMIToRecipeRefE.getValue("a_mm_WasteInclusion").setSimpleValue(tBtoRWasteInclusion);
                                } else {
                                    tNewSMIToRecipeRefE.getValue("a_mm_WasteInclusion").setSimpleValue("YES");
                                }

                                var rcRefType = tNewSMIToRecipeRefE.getValue("a_mm_RCReferenceType").getSimpleValue();
                                if (BMIToRCLinkID == "BMIToRecipeComponent_CanAdd" && rcRefType != "Composition") {
                                    tNewSMIToRecipeRefE.getValue("a_mm_RCReferenceType").setSimpleValue("Can Add");
                                } else {
                                    tNewSMIToRecipeRefE.getValue("a_mm_RCReferenceType").setSimpleValue("Composition");
                                }

                                if (tMarket == "DE" || tMarket == "ES" || tMarket == "IT" || tMarket == "PL" || tMarket == "UA" || tMarket == "AT" || tMarket == "BE" || tMarket == "CA" || tMarket == "NL" || tMarket == "PT" || tMarket == "CH") {
                                    if (tBtoRIncludeInSalesType) {
                                        tNewSMIToRecipeRefE.getValue("a_mm_IncludeinSalesType").setSimpleValue(tBtoRIncludeInSalesType);
                                    } else {
                                        tNewSMIToRecipeRefE.getValue("a_mm_IncludeinSalesType").setSimpleValue("Both (Eat In and Take Out)");
                                    }
                                }

                                tNewSMIToRecipeRefE.getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(tRecipeCompNum);
                            } catch (e) {
                                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                    //Target Already Referenced Exception
                                    log.info("Reference Already Linked.. ");
                                }
                                else {
                                    throw "Exception : " + e;
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        log.info("ASASASAS")
        deleteAllProductToProductRefs(node, step, "SMIToRecipeComponent");
    }

    var statusOfSMI = node.getValue("a_mm_Status").getID();
    if ((!node.isInWorkflow("wf_mm_SMILaunchWorkflow") && !node.isInWorkflow("wf_mm_SMIMaintenance") && statusOfSMI != "4" && statusOfSMI != "18" && statusOfSMI != "8") || statusOfSMI == "6") // Approve the SMI node only when the status is Approved(2) or Rejected(6) statusOfSMI == "2" for MDMI-16579
        approveBmirAndSmiPartially(node, step);
}

/*
Name: deleteCrossReference_From_WebUI
Author: Suman Pan(Suman_Pan.pan@us.mcd.com)
Date: 07/09/2020
Sprint : 35
Purpose: To delete selected Cross References for Product To Classification links
*/
function deleteCrossReference_From_WebUI(webui, node, step, crossRefID) {
    var selectedTargets = webui.getSelection();
    var crossRefererenceHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID(crossRefID);
    log.info("theNodeID: " + node.getID());
    if (selectedTargets.size() > 0 && crossRefererenceHome) {
        for (var i = 0; i < selectedTargets.size(); i++) {
            var eachTarget = selectedTargets.get(i);
            var statusValue = eachTarget.getValue("a_mm_Status").getID();
            var prodToCrossRefs = eachTarget.getClassificationProductLinks(crossRefererenceHome);
            for (var j = 0; j < prodToCrossRefs.size(); j++) {
                var prodToCrossRefIns = prodToCrossRefs.get(j);
                var crossRefTarget = prodToCrossRefIns.getClassification();
                if (crossRefTarget.getID() == node.getID()) {
                    prodToCrossRefIns.delete();
                    //if(statusValue == "15" || statusValue == "2" || statusValue == "4" || statusValue == "6"){
					/*
					 * Edited by Akash on 07-03-2025
					 * MDMI-21026
					 * Uncommented the approval code and utilized node.approve() due to the RC object
					 */

                           try {
//                         	approveObjectInAllContexts(eachTarget, step);
						//eachTarget.approve();
                           } catch (error) {
                              log.info("error occured during approval of: " + eachTarget.getID());
                           }
                    //}
                    break;
                }
            }
        }
    }
}

/*
Name: createXGroupToRestaurantLink
Author: Suman Pan(Suman_Pan.pan@us.mcd.com)
Date: 08/09/2020
Sprint : 35
Purpose: To create "X"(SMI Group/ NR Group) Group to Restaurant links
*/
function createXGroupToRestaurantLink(step, XGroup, XGroupToRestGroupID, XGroupToRestLinkID, flag) {
    var newRestFlag = false;
    var allRestsHashSet = new java.util.HashSet("");
    var reqRestsHashSet = new java.util.HashSet("");
    var XGroupToRestHome = step.getReferenceTypeHome().getReferenceTypeByID(XGroupToRestLinkID);
    var XGroupToRestGroupHome = step.getReferenceTypeHome().getReferenceTypeByID(XGroupToRestGroupID);
    var IsRCToRestReq = false;
    var linkedSMIs = new java.util.HashSet("");
    if (XGroupToRestGroupID == "SMIGroupToRestaurantGroup" && XGroupToRestLinkID == "SMIGrouptoRestaurant") {
        var LinkedSMIs = XGroup.getClassificationProductLinks();
        var SMIToRecipeComponentHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToRecipeComponent");
        for (var d = 0; d < LinkedSMIs.size(); d++) {
            var SMI = LinkedSMIs.get(d).getProduct();
            var LinkedSMIRCs = SMI.getReferences(SMIToRecipeComponentHome);
            for (var e = 0; e < LinkedSMIRCs.size(); e++) {
                var eachRC = LinkedSMIRCs.get(e).getTarget().getID();
                if (!linkedSMIs.contains(eachRC)) {
                    linkedSMIs.add(eachRC);
                }
            }
        }
    }
    if (XGroupToRestGroupID == "NonRCGroupToRestaurantGroup" && XGroupToRestLinkID == "NonRCGroupToRestaurant") {
        var RCs = XGroup.getClassificationProductLinks();
        for (var f = 0; f < RCs.size(); f++) {
            var eachRC1 = RCs.get(f).getProduct().getID();
            if (!linkedSMIs.contains(eachRC1)) {
                linkedSMIs.add(eachRC1);
            }
        }
    }
    var linkedSMIsAttr = linkedSMIs.toArray();
    if (XGroupToRestHome && XGroupToRestGroupHome) {
        var allRests = XGroup.getReferences(XGroupToRestHome);
        for (var a = 0; a < allRests.size(); a++) {
            var eachRest = allRests.get(a).getTarget();
            allRestsHashSet.add(eachRest.getID()); //----- Existing Restaurant List
        }
        var allRestGroups = XGroup.getReferences(XGroupToRestGroupHome);
        for (var b = 0; b < allRestGroups.size(); b++) {
            var eachRestGroup = allRestGroups.get(b).getTarget();
            var restGroupRefedByProds = eachRestGroup.getClassificationProductLinks();
            for (var c = 0; c < restGroupRefedByProds.size(); c++) {
                var restObj = restGroupRefedByProds.get(c).getProduct();
                if (restObj.getObjectType().getID() == "Restaurants") {
                    reqRestsHashSet.add(restObj.getID()); //----- New Restaurant List
                }
            }
        }
        for (var a = 0; a < allRests.size(); a++) {
            var eachRestIns = allRests.get(a);
            if (!reqRestsHashSet.contains(eachRestIns.getTarget().getID())) {
                eachRestIns.delete(); //----- Remove Deleted Restaurant
                newRestFlag = true;
            }
        }
        var reqRestsHashSetArr = reqRestsHashSet.toArray();
        for (var d = 0; d < reqRestsHashSetArr.length; d++) {
            var restID = reqRestsHashSetArr[d];
            if (restID != null) {
                var restProd = step.getProductHome().getProductByID(restID.trim());
                if (!allRestsHashSet.contains(restProd.getID())) {
                    try {
                        XGroup.createReference(restProd, XGroupToRestHome); //----- Add New Restaurant
                        for (var h = 0; h < linkedSMIsAttr.length; h++) {
                            var rcProd = step.getProductHome().getProductByID(linkedSMIsAttr[h].trim());
                            rcProd.createReference(restProd, "RecipeComponentToRestaurants"); //----- Add New Restaurant
                            var nonApprovedObjects = rcProd.getNonApprovedObjects().toArray();
                            var partLinkSet = new java.util.HashSet();
                            for (var counter in nonApprovedObjects) {
                                if (nonApprovedObjects[counter] instanceof com.stibo.core.domain.partobject.ReferencePartObject && nonApprovedObjects[counter].getReferenceType() == "ItemToMarketCategory") {
                                    partLinkSet.add(nonApprovedObjects[counter]);
                                }
                            }
                            rcProd.approve(partLinkSet);
                        }
                        allRestsHashSet.add(restProd.getID());
                        newRestFlag = true;
                    } catch (e) {
                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                            //Target Already Referenced Exception
                            log.info("Reference Already Linked.. ");
                        }
                        else {
                            throw "Exception : " + e;
                        }
                    }
                }
            }
        }
    }
    if (newRestFlag == true && flag == true)
        XGroup.approve();
    //approveObjectInAllContexts(XGroup, step);
}

/*
Name:	setValueInSpecificContext
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	08/10/2020	  
Purpose:	To set context specific attribute's value from another context specific attribute for a specified context (for UK market context 2 and DE market context 3)
Version History:-
1) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/
function setValueInSpecificContext(step, market, valueFromObj, getValueFromObj, setValueToObj, attrID1, attrID2) {
    if (market != null) {
        var contextID = null;
        contextID = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID(market).getValue();
        if (contextID != null) {
            step.executeInContext(contextID, function (step) {
                if (valueFromObj == null && getValueFromObj != null) { // changes as part of the INC16247064
                    var contextSpecGetObj = step.getObjectFromOtherManager(getValueFromObj);
                    valueFromObj = contextSpecGetObj.getValue(attrID1).getSimpleValue();
                }
                if (valueFromObj != null && !isNaN(valueFromObj)) {
                    try {
                        var contextSpecSetObj = step.getObjectFromOtherManager(setValueToObj);
                        contextSpecSetObj.getValue(attrID2).setSimpleValue(valueFromObj);
                        log.info("contextID: " + contextID + ", valueFromObj: " + contextSpecSetObj.getValue(attrID2).getSimpleValue());
                    }
                    catch (e) {
                        throw e;
                    }
                }
            });
        }
    }
}
/*
Name:	fetchValueFromSpecificContext
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	08/10/2020	  
Purpose:	To fetch context specific attribute's value for a specified context (for UK market context 2 and DE market context 3)
Version History:-
1) Suman Pan -- 16/06/2021 -- Modified the function by using "Lov_mm_Context" to fetch the context dynamically, Sprint-49
*/
function fetchValueFromSpecificContext(step, market_1, getValueFromObj, attrID, isLOVID) {
    var valueFromObj = null;
    if (market_1 != null && market_1 != "") {
        var contextLOV = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context");
        log.info("Context Lov : MDMI-10888 " + contextLOV);
        var contextID = contextLOV.getListOfValuesValueByID(market_1).getValue();
        log.info("Context ID : MDMI-10888 " + contextID);
        if (contextID != null && contextID != "") {
            step.executeInContext(contextID, function (step) {
                var contextSpecGetObj = step.getObjectFromOtherManager(getValueFromObj);
                if (isLOVID != true)
                    valueFromObj = contextSpecGetObj.getValue(attrID).getSimpleValue();
                else
                    valueFromObj = contextSpecGetObj.getValue(attrID).getID();
            });
        }
    }
    return valueFromObj;
}

/*
Name:	EventDatePopulate
Author:	Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	12/10/2020	  
Purpose: To fetch the earliest event date and based on that event set the dates attribute on BMI level
*/

function EventDatePopulate(node, step, workflow) {
    try {
        var aAttributeList = new java.util.ArrayList();
        //Changes as part of MDMI-8617
        //aAttributeList.addAll(["a_mm_OpsTestRequired",  "a_mm_SalesTestRequired", "a_mm_ScanTestSignOffDate", "a_mm_OpsTestApprovalDate", "a_mm_SalesTestApprovalDate", "a_mm_TasteApprovalDate", "a_mm_FeasibilityApprovalDate", "a_mm_DepartmentalApprovalDate", "a_mm_HODApprovalDate", "a_mm_LaunchApprovalDate"]);
        aAttributeList.addAll(["a_mm_ScanTestSignOffDate", "a_mm_TasteApprovalDate", "a_mm_FeasibilityApprovalDate", "a_mm_DepartmentalApprovalDate", "a_mm_HODApprovalDate", "a_mm_LaunchApprovalDate"]);
        log.info("aAttributeList.size: " + aAttributeList.size());
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToEvent");
        if (tRef) {
            var tMarket = node.getValue("a_mm_Market").getSimpleValue();
            var tReferences = node.getReferences(tRef);
            if (!tReferences.isEmpty()) {
                if (tReferences.size() == 1) {

                    for (var i = 0; i < aAttributeList.size(); i++) {
                        if (isAttributeValid(node, step, aAttributeList.get(i)) && isAttributeValid(tReferences.get(0).getTarget(), step, aAttributeList.get(i))) {
                            var tValue = tReferences.get(0).getTarget().getValue(aAttributeList.get(i)).getSimpleValue();
                            log.info("tValue: " + tValue);
                            if (tValue != null) {
                                node.getValue(aAttributeList.get(i)).setSimpleValue(tValue);
                                if (node.getWorkflowInstance(workflow) != null) {
                                    node.getWorkflowInstance(workflow).setSimpleVariable("wf_mm_EventDetails", "Yes");
                                }
                            }
                        }
                    }
                } else if (tReferences.size() > 1) {
                    var tEventID = null
                    var tStartDate = "";
                    for (var i = 0; i < tReferences.size(); i++) {
                        var tEventObj = tReferences.get(i).getTarget();
                        var tEventStartDate = tEventObj.getValue("a_mm_PromotionStartDate").getSimpleValue();
                        log.info("tEventStartDate " + tEventStartDate);
                        if (tEventStartDate != null) {
                            var tStartDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tEventStartDate);
                            if (tStartDate == "") {
                                tStartDate = tEventStartDate;
                                tEventID = tEventObj.getID();
                                log.info("tStartDate1 " + tStartDate);
                            } else {
                                var pStartDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tStartDate);
                                if (tStartDateParsed.before(pStartDateParsed)) {
                                    var tStartDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tStartDateParsed);
                                    tStartDate = tStartDateFormat;
                                    tEventID = tEventObj.getID();
                                    log.info("tStartDate2 " + tStartDate);
                                }
                            }
                        }
                    }
                    if (tEventID != null && tStartDate != null) {

                        var tEvent = step.getProductHome().getProductByID(tEventID);
                        log.info("When size more than one: " + tEvent.getValue("a_mm_PromotionName").getSimpleValue());
                        for (var i = 0; i < aAttributeList.size(); i++) {
                            if (isAttributeValid(node, step, aAttributeList.get(i)) && isAttributeValid(tEvent, step, aAttributeList.get(i))) {
                                var tValue = tEvent.getValue(aAttributeList.get(i)).getSimpleValue();
                                if (tValue != null) {
                                    node.getValue(aAttributeList.get(i)).setSimpleValue(tValue);
                                    if (node.getWorkflowInstance(workflow) != null) {
                                        node.getWorkflowInstance(workflow).setSimpleVariable("wf_mm_EventDetails", "Yes");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    } catch (err) {
        log.info(err);
        throw (err);
    }
}


/*
Name:	calculateBackWordDate
Author:	Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	12/10/2020	  
Purpose: To set  the MileStone dates
*/

function calculateBackWordDate(sourceStartDate, days) {
    var dow = sourceStartDate.getDay();
    log.info("dow 1: " + dow);
    var daysToExclude = parseInt(days);
    log.info("daysToExclude: " + daysToExclude);
    //var daysToReduce = 0;
    if (dow == 0) {
        dow = 6;
        sourceStartDate.setDate(sourceStartDate.getDate() - 1);
    }
    log.info("dow 2: " + dow);
    var restDaysInCurrentWeek = dow - 1;
    log.info("restDaysInCurrentWeek: " + restDaysInCurrentWeek);
    var restDaysInPreviousWeeks = daysToExclude - restDaysInCurrentWeek;
    log.info("restDaysInPreviousWeeks: " + restDaysInPreviousWeeks);
    if (restDaysInPreviousWeeks > 0) {
        var weekEndDays = 2 * (Math.floor(restDaysInPreviousWeeks / 5) + 1);
        log.info("weekEndDays 1: " + weekEndDays);
        if (restDaysInPreviousWeeks % 5 == 0) {
            weekEndDays -= 2;
            log.info("weekEndDays 2: " + weekEndDays);
        }
        daysToExclude += weekEndDays;
    }
    log.info("daysToExclude final: " + daysToExclude);
    sourceStartDate.setDate(sourceStartDate.getDate() - daysToExclude);
    return sourceStartDate;
}

/*
 Name:	     addWorkDays
Author:	     Kirubakaran Gajendran
Date:	     Oct 12 2020
Purpose:	     MDMI-8392 - Process TimeLine Management - To Add Working Dates to given date
*/

function addWorkDays(sourceStartDate, days) {

    // Get the day of the week as a number (0 = Sunday, 1 = Monday, .... 6 = Saturday)
    var dow = sourceStartDate.getDay();
    var daysToAdd = parseInt(days);
    // If the current day is Sunday add one day
    if (dow == 0)
        daysToAdd++;
    // If the start date plus the additional days falls on or after the closest Saturday calculate weekends
    if (dow + daysToAdd >= 6) {
        //Subtract days in current working week from work days
        var remainingWorkDays = daysToAdd - (5 - dow);
        //Add current working week's weekend
        daysToAdd += 2;
        if (remainingWorkDays > 5) {
            //Add two days for each working week by calculating how many weeks are included
            daysToAdd += 2 * Math.floor(remainingWorkDays / 5);
            //Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
            if (remainingWorkDays % 5 == 0)
                daysToAdd -= 2;
        }
    }
    ///////
    //var sourceStartDate = sourceStartDate.getDate().next();
    //sourceStartDate.setDate(sourceStartDate.getDate() + daysToAdd);

    ////////
    log.info("Days to add : RahulC  " + daysToAdd);
    log.info("Source date " + sourceStartDate);
    log.info("Final date : Rahul C" + sourceStartDate.getDate());

    sourceStartDate.setDate(sourceStartDate.getDate() + daysToAdd);
    return sourceStartDate;
}


/*
 * Name:	     workingDaysBetweenDates
Author:	     Kirubakaran Gajendran
Date:	     Oct 12 2020
Purpose:	     MDMI-8392 - Process TimeLine Management - To Calculate Working Dates between 2 Dates
*/
function workingDaysBetweenDates(startDate, endDate) {

    // Validate input
    if (endDate < startDate) {

        return 0;

    } else {

        // Calculate days between dates
        var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        //startDate.setHours(0, 0, 0, 1); // Start just after midnight
        //endDate.setHours(23, 59, 59, 999); // End just before midnight
        var diff = endDate - startDate; // Milliseconds between datetime objects    
        var days = Math.round(diff / millisecondsPerDay);

        // Subtract two weekend days for every week in between
        var weeks = Math.round(days / 7);
        days = days - (weeks * 2);

        // Handle special cases
        var startDay = startDate.getDay();
        var endDay = endDate.getDay();

        // Remove weekend not previously removed.   
        if (startDay - endDay > 1)
            days = days - 2;

        //if (startDay - endDay == 0)
        //days = days - 2;    

        // Remove start day if span starts on Sunday but ends before Saturday
        if (startDay == 0 && endDay != 6)
            days = days - 1;

        // Remove end day if span ends on Saturday but starts after Sunday
        if (endDay == 6 && startDay != 0)
            days = days - 1;

        return days;
    }
}

/*
 * Name:	     parseTLDate
Author:	     Kirubakaran Gajendran
Date:	     Oct 12 2020
Purpose:	     MDMI-8392 - Process TimeLine Management - To Parse Dates
*/
function parseTLDate(input) {
    // Transform date from text to date
    var parts = input.match(/(\d+)/g);
    //logger.info("parts: " + parts);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}


/*
Name: 	performTaskUpdate
Author: Rahul Choudhary (rahul.choudhary.@us.mcd.com)
Date: 	11/10/2020	  
Purpose: To update the task priorities based on event start date for BMI, and cascading priorities to related objects : MDMI-8396
Version History : 
*/
function performTaskUpdate(node, step, workflow, workflowStatusFlagVariable) {

    var priority = "";
    var nodeDueDate = node.getValue("a_mm_DueDate").getSimpleValue();
    var currentDate = new java.util.Date().getTime();
    var formattedCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(currentDate);
    var effectiveCurrentDate = parseTLDate(formattedCurrentDate);
    if (nodeDueDate != null) {
        var effectiveDueDate = parseTLDate(nodeDueDate);
        var workFlowInst = node.getWorkflowInstance(workflow);



        priority = taskPriority(node, step, effectiveCurrentDate, effectiveDueDate);
        // log.info("Returned value of priority for Recipe Component" + priority);
        workFlowInst.setSimpleVariable(workflowStatusFlagVariable, priority);
        var task = node.getWorkflowInstance(workflow).getTasks().toArray();

        if (workFlowInst.getSimpleVariable(workflowStatusFlagVariable)) {
            if (task.length > 0) {
                for (var j = 0; j < task.length; j++) {
                    var taskstate = task[j].getState() + "";
                    //log.info("value of the states ; " + taskstate);
                    var taskstateSplit = taskstate.split(":");

                    if (taskstateSplit.length > 0) {
                        //logger.info("taskstate value : " + taskstateSplit[1]);
                        var task2 = workFlowInst.getTaskByID(taskstateSplit[1]);
                        task2.setStatusFlagByID(workFlowInst.getSimpleVariable(workflowStatusFlagVariable));
                        //logger.info("workflowStatusFlagVariable: "+workFlowInst.getSimpleVariable(workflowStatusFlagVariable));
                    }
                }
            }
        }
    }
}

/*
Name: 	taskPriority
Author: Rahul Choudhary (rahul.choudhary.@us.mcd.com)
Date: 	11/10/2020	  
Purpose: To update the task priorities based on event start date for BMI, and cascading priorities to related objects : MDMI-8396
Version History : 
*/
function taskPriority(node, step, effectiveCurrentDate, effectiveDueDate) {
    var priority = "";
    var taskPriorityNow = "";
    var taskPriorityNext = "";
    var processTimeLineManagement = step.getEntityHome().getEntityByID("ProcessTimeLineManagement");


    // Code added for Context :BEGINS
    var market = node.getValue("a_mm_Market").getSimpleValue();
    if (market != null) {
        var marketSpecificContextID = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID(market).getValue();

        // Code added for Context : ENDS

        step.executeInContext(marketSpecificContextID, function (step) {
            var contextSpecGetObj = step.getObjectFromOtherManager(processTimeLineManagement);

            taskPriorityNow = contextSpecGetObj.getValue("a_mm_status_Now").getSimpleValue();
            taskPriorityNext = contextSpecGetObj.getValue("a_mm_status_Next").getSimpleValue();

        });
    }


    //logger.info("GK effectiveCurrentDate: " + effectiveCurrentDate);
    //logger.info("GK effectiveDueDate: " + effectiveDueDate);


    effectiveDueDate.setHours(23, 59, 59, 999); //Fix added form MDMI-10600
    var workingDays = workingDaysBetweenDates(effectiveCurrentDate, effectiveDueDate);
    //logger.info("workingDays: " + workingDays);

    /*if(effectiveCurrentDate.getDay() == effectiveDueDate.getDay()){
            workingDays = workingDays + 2;    	
    }*/
    //logger.info("GK workingDays: " + workingDays);

    if (workingDays <= taskPriorityNow)
        priority = "wf_mm_sf_Now";
    else if (workingDays > taskPriorityNow && workingDays <= taskPriorityNext)
        priority = "wf_mm_sf_Next";
    else if (workingDays > taskPriorityNext)
        priority = "wf_mm_sf_Later";

    //logger.info("priority: "+priority);
    return priority;
}
/*
Name: 	setTaskPriority
Author: Rahul Choudhary (rahul.choudhary.@us.mcd.com)
Date: 	11/10/2020	  
Purpose: To update the task priorities based on event start date for BMI, and cascading priorities to related objects : MDMI-8396
Version History : 
*/

function setTaskPriority(node, step) {

    var workflow = null;
    var workflowStatusFlagVariable = "";


    var objType = node.getObjectType().getID();
    var checkObjectDueDate = node.getValue("a_mm_DueDate").getSimpleValue();
    if (checkObjectDueDate != null) {

        if (objType == "BaseMenuItem") {

            workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_DevBMIIdeationandApproval");
            workflowStatusFlagVariable = "wf_mm_Status_Flag_BMI";
            //log.info("Inside BMI");    

        } else if (objType == "RecipeComponent") {

            workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_RecipeComponent");
            workflowStatusFlagVariable = "wf_mm_Status_Flag_RC";
            //log.info("Inside RC");

        } else if (objType == "DevSU") {

            workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_DevSUOnboardingWorkflow");
            workflowStatusFlagVariable = "wf_mm_Status_Flag_SU";
            //log.info("Inside Dev SU");

        } else if (objType == "ShippingPackage") {

            workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_DevSUOnboardingWorkflow");
            workflowStatusFlagVariable = "wf_mm_Status_Flag_SP";
            //log.info("Inside Shipping Package");

        } else if (objType == "SIM_Supplier_New") {

            workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_DevSupandFacOnboardWorkflow");
            workflowStatusFlagVariable = "wf_mm_Status_Flag_SUP";
            //log.info("Inside Supplier");

        } else if (objType == "SoldMenuItem") {

            workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_SMILaunchWorkflow");
            workflowStatusFlagVariable = "wf_mm_Status_Flag_SMI";
            //log.info("Solde Menu Item Supplier");
        }

        if (workflowStatusFlagVariable != "") {
            performTaskUpdate(node, step, workflow, workflowStatusFlagVariable);
        }
    }
}

/*
Name: 	taskUpdateForAwaitingStates
Author: Rahul Choudhary (rahul.choudhary.@us.mcd.com)
Date: 	11/10/2020	  
Purpose: To update the Due Date/ Priority to null for the task list of Awaiting States
Version History : 
*/

function taskUpdateForAwaitingStates(node, step, workflow, workflowStatusFlagVariable) {

    node.getValue("a_mm_DueDate").setSimpleValue(null);

    var workFlowInst = node.getWorkflowInstance(workflow);
    workFlowInst.setSimpleVariable(workflowStatusFlagVariable, null);
    var task = node.getWorkflowInstance(workflow).getTasks().toArray();

    if (workFlowInst.getSimpleVariable(workflowStatusFlagVariable)) {
        if (task.length > 0) {
            for (var j = 0; j < task.length; j++) {
                var taskstate = task[j].getState() + "";
                //log.info("value of the states ; " + taskstate);
                var taskstateSplit = taskstate.split(":");

                if (taskstateSplit.length > 0) {
                    //logger.info("taskstate value : " + taskstateSplit[1]);
                    var task2 = workFlowInst.getTaskByID(taskstateSplit[1]);
                    task2.setStatusFlagByID(workFlowInst.getSimpleVariable(workflowStatusFlagVariable));
                    //logger.info("workflowStatusFlagVariable: "+workFlowInst.getSimpleVariable(workflowStatusFlagVariable));
                }
            }
        }
    }
}

/*
Name:	calculateBMITaskDueDate
Author:	Kirubakaran Gajendran
Date:	12/10/2020	  
Purpose: To set the BMI due date
*/

function calculateBMITaskDueDate(node, step) {

    var workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_DevBMIIdeationandApproval");
    //var task = node.getWorkflowInstance(workflow).getTasks().toArray();
    //logger.info("task.length: " + task.length);

    var stateID = "";

    if (node.getValue("a_mm_CurrentStateID").getSimpleValue() != null && node.getWorkflowInstance(workflow) != null) {
        stateID = node.getValue("a_mm_CurrentStateID").getSimpleValue();
    }

    //logger.info("stateID " + stateID);
    if (stateID == "DevBMIEnrich_Draft" || stateID == "DevBMIEnrich") {

        //var currentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
        var currentDate = new Date();
        //logger.info("currentDate: " + currentDate);
        var dueDate = addWorkDays(currentDate, 2);
        var day = dueDate.getDay();
        // logger.info("Day: " + day);

        dueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dueDate);
        //logger.info("dueDate: " + dueDate);
        dueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dueDate);
        //logger.info("again dueDate: " + dueDate);

        if (day == 1) { // If day is Monday
            dueDate.setDate(dueDate.getDate() - 2);
            dueDate.setSeconds(dueDate.getSeconds() - 1);
        } else {
            dueDate.setSeconds(dueDate.getSeconds() - 1);
        }

        //logger.info("Due Date: " + dueDate);

        stateID = "DevBMIEnrich";
        var stateTask = node.getWorkflowInstance(workflow).getTaskByID(stateID);
        if (stateTask != null) {
            node.getWorkflowInstance(workflow).getTaskByID(stateID).setDeadline(dueDate);
            //logger.info("Task DeadLine : " + node.getWorkflowInstance(workflow).getTaskByID(stateID).getDeadline());

            var formatedDueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dueDate);
            node.getValue("a_mm_DueDate").setSimpleValue(formatedDueDate);
            //logger.info("ISO Due Date: " + node.getValue("a_mm_DueDate").getSimpleValue());

            setTaskPriority(node, step);
        }
        stateID = "";

    }

    var entityNode = step.getEntityHome().getEntityByID("MS_" + stateID);
    //logger.info("entityNode: " + entityNode);
    if (entityNode != null) {

        var entitySNO = entityNode.getValue("a_mm_SerialNumber").getSimpleValue();
        var entityOffset = entityNode.getValue("a_mm_Offset").getSimpleValue();
        var children = entityNode.getParent().getChildren();

        //logger.info("entityNode Offset: " + entityOffset);
        //logger.info("entityParent: " + entityNode.getParent().getName());
        var PropOffset = 0;

        for (var i = 0; i < children.size(); i++) {
            var entityChildSNO = children.get(i).getValue("a_mm_SerialNumber").getSimpleValue();
            var entityChildPropOffset = children.get(i).getValue("a_mm_ProportionalOffset").getSimpleValue();

            //logger.info("entityChildSNO: " + entityChildSNO);
            //logger.info("entitySNO: " + entitySNO);


            if (Number(entityChildSNO) <= Number(entitySNO)) {

                //logger.info("PropOffset entry: " + Number(PropOffset));
                //logger.info("PropOffset entry: " + Number(entityChildPropOffset));
                PropOffset = Number(PropOffset) + Number(entityChildPropOffset);
                PropOffset = PropOffset.toFixed(9);
                //logger.info("PropOffset end: " + PropOffset);
            }
        }

        var msNode = step.getEntityHome().getEntityByID("MileStone_" + node.getValue("a_mm_BMIStage").getID());
        //logger.info("msNode: " + msNode);
        //logger.info("PropOffset: " + PropOffset);

        if (PropOffset != 0 && msNode != null) {

            var sourceDateAttrID = msNode.getValue("a_mm_sourceMileStoneAttr").getSimpleValue();
            var targetDateAttrID = msNode.getValue("a_mm_targetMileStoneAttr").getSimpleValue();

            //logger.info("sourceDateAttrID: " + sourceDateAttrID);
            //logger.info("targetDateAttrID: " + targetDateAttrID);

            if (sourceDateAttrID != null && sourceDateAttrID != "" && targetDateAttrID != null && targetDateAttrID != "") {

                var sourceDate = node.getValue(sourceDateAttrID).getSimpleValue();
                var targetDate = node.getValue(targetDateAttrID).getSimpleValue();

                //logger.info("sourceDate: " + sourceDate);
                //logger.info("targetDate: " + targetDate);

                if (sourceDate != null && targetDate != null) {
                    //Method To pull the difference of Dates

                    var startDate = parseTLDate(sourceDate);
                    var endDate = parseTLDate(targetDate);
                    //logger.info("startDate: " + startDate);
                    //logger.info("endDate: " + endDate);

                    var noOfWorkingDays = workingDaysBetweenDates(startDate, endDate);
                    //logger.info("No of Working Days between the dates: " + noOfWorkingDays);
                    var PropOffsetTime = (noOfWorkingDays * PropOffset);
                    //logger.info("PropOffsetTime: " + PropOffsetTime);
                    PropOffsetTime = Math.ceil(PropOffsetTime);
                    //logger.info("Final PropOffsetTime: " + PropOffsetTime);

                    var parseSourceDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sourceDate);
                    //logger.info("parseSourceDate: " + parseSourceDate);
                    PropOffsetTime = PropOffsetTime + 1;
                    //logger.info("No of Working Days between the dates: " + PropOffsetTime);

                    var dueDate = addWorkDays(parseSourceDate, PropOffsetTime);
                    //logger.info("Due Date before one sec subtraction: " + dueDate);


                    if (dueDate.getDay() == 1) { // If day is Monday
                        dueDate.setDate(dueDate.getDate() - 2);
                        dueDate.setSeconds(dueDate.getSeconds() - 1);
                    } else {
                        dueDate.setSeconds(dueDate.getSeconds() - 1);
                    }

                    //logger.info("Due Date: " + dueDate);
                    //logger.info("stateID: " + stateID);

                    var task = node.getWorkflowInstance(workflow).getTaskByID(stateID);
                    //logger.info("task: " + task);
                    if (task != null) {
                        node.getWorkflowInstance(workflow).getTaskByID(stateID).setDeadline(dueDate);
                        //logger.info("Task DeadLine : " + node.getWorkflowInstance(workflow).getTaskByID(stateID).getDeadline());

                        var formatedDueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dueDate);
                        node.getValue("a_mm_DueDate").setSimpleValue(formatedDueDate);
                        //logger.info("ISO Due Date: " + node.getValue("a_mm_DueDate").getSimpleValue());

                        setTaskPriority(node, step);
                    }
                }
            }
        }
    }
}

/*
Name:	calculateTaskDueDate
Author:	Rishidip Roy(Rishidip.Roy@us.mcd.com)
Date:	12/10/2020	  
Purpose: To set the due date based on the object type
*/

function calculateTaskDueDate(node, step) {
    var ObjType = node.getObjectType().getID();



    if (ObjType == "RecipeComponent" && node.getValue("a_mm_RecipeComponentGroup").getID() == "F") {
        var workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_RecipeComponent");
        var tObjSourceDate = "a_mm_ObjectSourceDate";
        var tObjTargetDate = "a_mm_ObjectTargetDate";
    }
    if (ObjType == "DevSU" || ObjType == "ShippingPackage") {
        //logger.info("GK SUNode2: "+node.getID());
        var workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_DevSUOnboardingWorkflow");
        var tObjSourceDate = "a_mm_ObjectSourceDate";
        var tObjTargetDate = "a_mm_ObjectTargetDate";
    }
    if (ObjType == "SIM_Supplier_New" || ObjType == "DevSupplier") {
        //logger.info("GK SUPP Node: "+node.getID());
        var workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_DevSupandFacOnboardWorkflow");
        var tObjSourceDate = "a_mm_ObjectSourceDate";
        var tObjTargetDate = "a_mm_ObjectTargetDate";
    }
    if (workflow != null && node.getWorkflowInstance(workflow) != null) {
        var task = node.getWorkflowInstance(workflow).getTasks().toArray();
        var stateID = "";

        if (node.getValue("a_mm_CurrentStateID").getSimpleValue() != null) {
            stateID = node.getValue("a_mm_CurrentStateID").getSimpleValue();
        }
        var entityNode = step.getEntityHome().getEntityByID("MS_" + stateID);
        //logger.info("entityNode: " + entityNode);
        if (entityNode != null) {
            var tPar = entityNode.getParent(); //milestone object
            var tSMileStoneAtt = "a_mm_sourceMileStoneAttr";
            var tTMileStoneAtt = "a_mm_targetMileStoneAttr";
            var tGetBMID = getLowestBMIdate(node, step, tSMileStoneAtt, tTMileStoneAtt, ObjType, tObjSourceDate, tObjTargetDate);
            //log.info("tGetBMID " + tGetBMID);
            var entitySNO = entityNode.getValue("a_mm_SerialNumber").getSimpleValue();
            var entityOffset = entityNode.getValue("a_mm_Offset").getSimpleValue();
            var children = entityNode.getParent().getChildren();

            var PropOffset = 0;

            for (var i = 0; i < children.size(); i++) {
                var entityChildSNO = children.get(i).getValue("a_mm_SerialNumber").getSimpleValue();
                var entityChildPropOffset = children.get(i).getValue("a_mm_ProportionalOffset").getSimpleValue();

                //logger.info("entityChildSNO: " + entityChildSNO);
                //logger.info("entitySNO: " + entitySNO);


                if (Number(entityChildSNO) <= Number(entitySNO)) {
                    //logger.info("PropOffset entry: " + PropOffset);
                    PropOffset = Number(PropOffset) + Number(entityChildPropOffset);
                    PropOffset = PropOffset.toFixed(9);
                    //logger.info("PropOffset End: " + PropOffset);
                }
            }

            if (PropOffset != 0) {

                if (ObjType == "RecipeComponent") {
                    if (tGetBMID != null) {
                        var tBMI = step.getProductHome().getProductByID(tGetBMID);
                        if (tSMileStoneAtt != null && tTMileStoneAtt != null) {
                            var sourceDate = tBMI.getValue(tSMileStoneAtt).getSimpleValue();
                            var targetDate = tBMI.getValue(tTMileStoneAtt).getSimpleValue();
                        }
                    }
                }
                if (ObjType == "DevSU" || ObjType == "ShippingPackage" || ObjType == "SIM_Supplier_New") {
                    if (tGetBMID != null) {
                        var tBMI = step.getProductHome().getProductByID(tGetBMID);
                        log.info("object is " + tBMI);
                        if (tObjSourceDate != null && tObjTargetDate != null) {
                            var sourceDate = tBMI.getValue(tObjSourceDate).getSimpleValue();
                            var targetDate = tBMI.getValue(tObjTargetDate).getSimpleValue();
                        }
                    }
                }

                //logger.info("sourceDate: " + sourceDate);
                //logger.info("targetDate: " + targetDate);
                if (sourceDate != null && targetDate != null) {
                    var startDate = parseTLDate(sourceDate);
                    var endDate = parseTLDate(targetDate);

                    //logger.info("startDate: " + startDate);
                    //logger.info("endDate: " + endDate);

                    var noOfWorkingDays = workingDaysBetweenDates(startDate, endDate);
                    //logger.info("No of Working Days between the dates: " + noOfWorkingDays);
                    var PropOffsetTime = (noOfWorkingDays * PropOffset); //Divided by 150 for Testing
                    //logger.info("PropOffsetTime: " + PropOffsetTime);
                    PropOffsetTime = Math.ceil(PropOffsetTime);
                    //logger.info("Final PropOffsetTime: " + PropOffsetTime);

                    var parseSourceDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sourceDate);
                    //logger.info("parseSourceDate: " + parseSourceDate);
                    //logger.info("No of Working Days between the dates: " + PropOffsetTime);

                    PropOffsetTime = PropOffsetTime + 1;
                    //logger.info("Added one to PropOffsetTime: " + PropOffsetTime);
                    var dueDate = addWorkDays(parseSourceDate, PropOffsetTime);
                    //logger.info("Due Date before one sec subtraction: " + dueDate.getDay());

                    if (dueDate.getDay() == 1) { // If day is Monday
                        dueDate.setDate(dueDate.getDate() - 2);
                        dueDate.setSeconds(dueDate.getSeconds() - 1);
                    } else {
                        dueDate.setSeconds(dueDate.getSeconds() - 1);
                    }

                    var taskDetail = node.getWorkflowInstance(workflow).getTaskByID(stateID);
                    //logger.info("taskDetail: " + taskDetail);
                    if (taskDetail != null) {

                        node.getWorkflowInstance(workflow).getTaskByID(stateID).setDeadline(dueDate);
                        //logger.info("Due Date after : " + node.getWorkflowInstance(workflow).getTaskByID(stateID).getDeadline());

                        var formatedDueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dueDate);
                        node.getValue("a_mm_DueDate").setSimpleValue(formatedDueDate);
                        //logger.info("GK due Date node: "+node.getID());
                        //logger.info("ISO Due Date: " + node.getValue("a_mm_DueDate").getSimpleValue());

                        setTaskPriority(node, step);
                    }
                }
            }
        }
    }
}

/*
Name:	getLowestBMIdate
Author:	Harshit Sharma(Harshit.Sharma@us.mcd.com)
Date:	12/10/2020	  
Purpose:	To fetch the earliest date object
*/

function getLowestBMIdate(node, step, tSMileStoneAtt, tTMileStoneAtt, ObjType, tObjSourceDate, tObjTargetDate) {
    try {
        var refby = new java.util.ArrayList();
        refby.addAll(node.getReferencedByProducts());
        var size = refby.size();
        log.info("refby size is " + refby.size());
        var tBMIID = null
        var tDate = "";
        var flag = false;
        for (var i = 0; i < size; i++) {
            if (ObjType == "RecipeComponent") {
                if ((refby.get(i).getSource().getObjectType().getID() == "BaseMenuItem") && (refby.get(i).getReferenceTypeString().equals("BMIToRecipeComponent"))) {
                    var BMIObj = refby.get(i).getSource();
                    var BMIDate = BMIObj.getValue(tSMileStoneAtt).getSimpleValue();
                    if (BMIDate != null) {
                        var tBMIDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(BMIDate);
                        if (tDate == "") {
                            tDate = BMIDate;
                            tBMIID = BMIObj.getID();
                            log.info("tDate1 " + tDate);
                            flag = true;
                        } else {
                            var pDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tDate);
                            if (tBMIDateParsed.before(pDateParsed)) {
                                var tBMIDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tBMIDateParsed);
                                tDate = tBMIDateFormat;
                                tBMIID = BMIObj.getID();
                                log.info("tDate2 " + tDate);
                                flag = true;
                            }
                        }
                    }
                }
            }
            if (ObjType == "DevSU") {
                log.info("ObjType " + ObjType);
                if ((refby.get(i).getSource().getObjectType().getID() == "RecipeComponent") && (refby.get(i).getReferenceTypeString().equals("RecipeComponentToSupplierItem"))) {
                    var BMIObj = refby.get(i).getSource();
                    log.info("BMIObj " + BMIObj);
                    var BMIDate = BMIObj.getValue(tObjSourceDate).getSimpleValue();
                    log.info("BMIDate " + BMIDate);
                    if (BMIDate != null) {
                        var tBMIDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(BMIDate);
                        if (tDate == "") {
                            tDate = BMIDate;
                            tBMIID = BMIObj.getID();
                            log.info("tDate1 " + tDate);
                            flag = true;
                        } else {
                            var pDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tDate);
                            if (tBMIDateParsed.before(pDateParsed)) {
                                var tBMIDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tBMIDateParsed);
                                tDate = tBMIDateFormat;
                                tBMIID = BMIObj.getID();
                                log.info("tDate2 " + tDate);
                                flag = true;
                            }
                        }
                    }
                }
            }
            if (ObjType == "ShippingPackage") {
                log.info("ObjType SP " + ObjType);
                log.info("ObjType Source " + refby.get(i).getSource().getObjectType().getID());
                log.info("refby SP" + refby.get(i).getReferenceTypeString());
                if ((refby.get(i).getSource().getObjectType().getID() == "DevSU") && (refby.get(i).getReferenceTypeString().equals("DevSUToShipingPackage"))) {
                    var BMIObj = refby.get(i).getSource();
                    log.info("BMIObj SP " + BMIObj);
                    var BMIDate = BMIObj.getValue(tObjSourceDate).getSimpleValue();
                    log.info("BMIDate " + BMIDate);
                    if (BMIDate != null) {
                        var tBMIDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(BMIDate);
                        if (tDate == "") {
                            tDate = BMIDate;
                            tBMIID = BMIObj.getID();
                            log.info("tDate1 " + tDate);
                            flag = true;
                        } else {
                            var pDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tDate);
                            if (tBMIDateParsed.before(pDateParsed)) {
                                var tBMIDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tBMIDateParsed);
                                tDate = tBMIDateFormat;
                                tBMIID = BMIObj.getID();
                                log.info("tDate2 " + tDate);
                                flag = true;
                            }
                        }
                    }
                }
            }
            if (ObjType == "SIM_Supplier_New") {
                log.info("ObjType " + ObjType);
                if ((refby.get(i).getSource().getObjectType().getID() == "DevSU") && (refby.get(i).getReferenceTypeString().equals("DevSUToSupplier"))) {
                    var BMIObj = refby.get(i).getSource();
                    log.info("BMIObj " + BMIObj);
                    var BMIDate = BMIObj.getValue(tObjSourceDate).getSimpleValue();
                    log.info("BMIDate " + BMIDate);
                    if (BMIDate != null) {
                        var tBMIDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(BMIDate);
                        if (tDate == "") {
                            tDate = BMIDate;
                            tBMIID = BMIObj.getID();
                            log.info("tDate1 " + tDate);
                            flag = true;
                        } else {
                            var pDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tDate);
                            if (tBMIDateParsed.before(pDateParsed)) {
                                var tBMIDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tBMIDateParsed);
                                tDate = tBMIDateFormat;
                                tBMIID = BMIObj.getID();
                                log.info("tDate2 " + tDate);
                                flag = true;
                            }
                        }
                    }
                }
            }
        }
        if (tBMIID != null && tDate != null && ObjType == "RecipeComponent") {
            var tBMI = step.getProductHome().getProductByID(tBMIID);
            var SourceDate = tBMI.getValue(tSMileStoneAtt).getSimpleValue();
            var TargetDate = tBMI.getValue(tTMileStoneAtt).getSimpleValue();
            node.getValue(tObjSourceDate).setSimpleValue(SourceDate);
            node.getValue(tObjTargetDate).setSimpleValue(TargetDate);
            if (flag == true)
                return tBMIID;
        }
        if (tBMIID != null && tDate != null && (ObjType == "DevSU" || ObjType == "ShippingPackage" || ObjType == "SIM_Supplier_New")) {
            var tBMI = step.getProductHome().getProductByID(tBMIID);
            var SourceDate = tBMI.getValue(tObjSourceDate).getSimpleValue();
            var TargetDate = tBMI.getValue(tObjTargetDate).getSimpleValue();
            log.info("SourceDate " + SourceDate + " TargetDate " + TargetDate);
            node.getValue(tObjSourceDate).setSimpleValue(SourceDate);
            node.getValue(tObjTargetDate).setSimpleValue(TargetDate);
            if (flag == true)
                return tBMIID;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*
Name:	MaintainEventDatePopulate
Author:	Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	12/10/2020	  
Purpose: To fetch the earliest event date and based on that event set the dates attribute on BMI level
*/
function MaintainEventDatePopulate(node, step, workflow) {

    try {

        if (node.getWorkflowInstance(workflow) != null) {
            var workflowFlag = node.getWorkflowInstance(workflow).getSimpleVariable("wf_mm_EventDetails");
            if (workflowFlag == "Yes") {
                var BMIToRecipeReference = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
                var RecipeToShippingUnitReference = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
                var ShippingUnitToShippingPackageReference = step.getReferenceTypeHome().getReferenceTypeByID("DevSUToShipingPackage");
                var DevSUToSupplierReference = step.getReferenceTypeHome().getReferenceTypeByID("DevSUToSupplier");
                var tBMIObjType = node.getObjectType().getID();
                calculateBMITaskDueDate(node, step); //call for BMI
                var RCReferenceLink = node.getReferences(BMIToRecipeReference);
                if (RCReferenceLink) {
                    for (var r = 0; r < RCReferenceLink.size(); r++) {
                        var RCNode = RCReferenceLink.get(r).getTarget();
                        var tRCObjType = RCNode.getObjectType().getID();
                        var RCStatus = RCNode.getValue("a_mm_Status").getSimpleValue();
                        if (RCStatus == "In Development") {
                            calculateTaskDueDate(RCNode, step); //call for Dev RC
                            var SUReferenceLink = RCNode.getReferences(RecipeToShippingUnitReference);
                            if (SUReferenceLink) {
                                for (var s = 0; s < SUReferenceLink.size(); s++) {
                                    var SUNode = SUReferenceLink.get(s).getTarget();
                                    var tSUObjType = SUNode.getObjectType().getID();
                                    if (tSUObjType == "DevSU") {
                                        logger.info("GK SUNode1: " + SUNode.getID());
                                        calculateTaskDueDate(SUNode, step); //call for Dev SU
                                        var SPReferenceLink = SUNode.getReferences(ShippingUnitToShippingPackageReference);
                                        if (SPReferenceLink) {
                                            for (var p = 0; p < SPReferenceLink.size(); p++) {
                                                var SPNode = SPReferenceLink.get(p).getTarget();
                                                var tSPObjType = SPNode.getObjectType().getID();
                                                var SPKey = SPNode.getValue("ShippingPackageKey").getSimpleValue();
                                                if (SPKey == null) {
                                                    calculateTaskDueDate(SPNode, step); //call for Dev SP
                                                }
                                            }
                                        }
                                        var SUPReferenceLink = SUNode.getReferences(DevSUToSupplierReference);
                                        if (SUPReferenceLink) {
                                            for (var t = 0; t < SUPReferenceLink.size(); t++) {
                                                var SUPNode = SUPReferenceLink.get(t).getTarget();
                                                var tSUPObjType = SUPNode.getObjectType().getID();
                                                if (tSUPObjType == "DevSupplier" || tSUPObjType == "SIM_Supplier_New") {
                                                    calculateTaskDueDate(SUPNode, step); //call for Dev SUP
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*
Name:	isWRINActive
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	10/12/2020	  
Purpose:	To check whether the WRIN is valid for the current RC's market or not
Version History:-
1. Harshit Sharma - 10/02/2021 - Modified code as per MDMI-9543, to check Recipe Component Group by ID
*/
function isWRINActive(rcObj, siObj, step, market, placeOfCalling, web) {
    var isWRINActiveFlag = false;
    if (market == null)
        isWRINActiveFlag = true;
    else if (isWRINInExceptionList(siObj, step, market))
        isWRINActiveFlag = true;
    else {
        var manuFlag = false;
        var manuFlagForAlert = false;
        var shipPointFlag = false;
        var siToSuppHome = step.getReferenceTypeHome().getReferenceTypeByID("ItemToSupplier");
        if (siToSuppHome != null && siObj != null && market != null) {
            var marketName = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_MarketIDName").getListOfValuesValueByID(market).getValue();
            var siToSuppRefs = siObj.getReferences(siToSuppHome);
            for (var a = 0; a < siToSuppRefs.size(); a++) {
                var siToSuppRefIns = siToSuppRefs.get(a);
                var suppObj = siToSuppRefIns.getTarget();
                var originValue = siToSuppRefIns.getValue("TargetMarket").getSimpleValue();
                if (originValue != null) {
                    //log.info("originValue: "+originValue);
                    var splittedOriginValue = originValue.trim().split("<multisep/>");

                    for (var b = 0; b < splittedOriginValue.length; b++) {
                        var eachLine = splittedOriginValue[b];
                        if (eachLine != null) {

                            var splittedEachLine = eachLine.trim().split("\\|");

                            var eachLinesMarket = splittedEachLine[1];
                            if (eachLinesMarket != null) {
                                if (marketName == eachLinesMarket) {
                                    //log.info("eachLinesMarket: "+eachLinesMarket);
                                    var facID = splittedEachLine[0];
                                    log.info("Facility ID from Origin " + b + " - " + facID);
                                    var statusOfEachFac = splittedEachLine[2];
                                    var contingencyValue = splittedEachLine[3];
                                    if (facID != null) {
                                        facID = facID.trim();
                                        var facAttrValues = siToSuppRefIns.getValue("Facility_MFG_SSP").getSimpleValue();
                                        if (facAttrValues != null) {
                                            var splittedFacAttrValues = facAttrValues.trim().split("<multisep/>");
                                            logger.info("Length*--" + splittedFacAttrValues.length);
                                            for (var d = 0; d < splittedFacAttrValues.length; d++) {
                                                var eachFacAttrLineValue = splittedFacAttrValues[d];
                                                if (eachFacAttrLineValue != null) {
                                                    var splittedEachFacAttrLineValue = eachFacAttrLineValue.trim().split("\\|");
                                                    var facIDToCheck = splittedEachFacAttrLineValue[0];
                                                    log.info("Facility ID from Facility_MFG_SSP " + d + " - " + facIDToCheck);
                                                    if (facIDToCheck != null) {
                                                        if (rcObj)
                                                            var rcGroup = rcObj.getValue("a_mm_RecipeComponentGroup").getID();
                                                        else
                                                            var rcGroup = siObj.getValue("ProductGroup").getID();
                                                        var manufValue = splittedEachFacAttrLineValue[1];
                                                        var shipPointValue = splittedEachFacAttrLineValue[2];
                                                        if (rcGroup == "F") {
                                                            if (manufValue == "Yes") {
                                                                manuFlag = true;

                                                            }
                                                        } else {
                                                            manuFlag = true;

                                                        }
                                                        if (shipPointValue == "Yes") {
                                                            shipPointFlag = true;

                                                        }

                                                        // Show Alert message : BEGINS  : Changes for MDMI-11802
                                                        if (facIDToCheck.trim() == facID && manufValue == "Yes") {
                                                            manuFlagForAlert = true;
                                                        }
                                                        if (facIDToCheck.trim() == facID) {
                                                            if (web != null) {
                                                                // if(manuFlagForAlert == false && shipPointFlag == true)
                                                                // 	web.showAlert("ERROR", siObj.getName() +" Supplier Item has No Manufacturing Facility, do you still want to add the Supplier Item to the RC?" ,"");
                                                                // else if(manuFlagForAlert == true && shipPointFlag == false)
                                                                // 	web.showAlert("ERROR", siObj.getName() +" Supplier Item has No Shipping Point Facility, do you still want to add the Supplier Item to the RC?" ,"");
                                                                // else 
                                                                if (manuFlagForAlert == false && shipPointFlag == false)
                                                                    web.showAlert("ERROR", siObj.getName() + " Supplier Item has No  Manufacturing or Shipping Point Facility, do you still want to add the Supplier Item to the RC?", "");
                                                            }
                                                        }
                                                        // Show Alert message : ENDS   : Changes for MDMI-11802
                                                        if (facIDToCheck.trim() == facID) {
                                                            var facObj = step.getKeyHome().getObjectByKey("customIDKey", facID);
                                                            if (placeOfCalling == null || placeOfCalling == "" || placeOfCalling == "createRCToFacilityGrid") {
                                                                isWRINActiveFlag = true;
                                                                if (rcObj != null && placeOfCalling == "createRCToFacilityGrid" && facObj != null) {
                                                                    createRCToFacilityGrid(rcObj, siObj, suppObj, facObj, statusOfEachFac, contingencyValue, manufValue, shipPointValue, step);
                                                                }
                                                            }
                                                            // Code Added for checking the contingencyValue of the facility : BEGINS : Rahul Choudhary
                                                            else if (placeOfCalling == "checkFacilityContingency" && facObj != null && statusOfEachFac == "Active") {
                                                                if (contingencyValue != "Yes")
                                                                    isWRINActiveFlag = true;
                                                            }
                                                            // Code Added for checking the contingencyValue of the facility : ENDS : Rahul Choudhary
                                                            else if (facObj != null && placeOfCalling != null && (placeOfCalling.substring(0, 4).equals("FAC_") || placeOfCalling.substring(0, 2).equals("F_"))) {
                                                                if (placeOfCalling == facObj.getID()) {
                                                                    isWRINActiveFlag = true;
                                                                }
                                                            }
                                                            log.info("'facID'--> " + facID + ". 'eachLinesMarket'--> " + eachLinesMarket + ". 'statusOfEachFac'--> " + statusOfEachFac + ". 'manufValue'--> " + manufValue + ". 'shipPointValue'--> " + shipPointValue);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return isWRINActiveFlag;
}

/*
Name:	createRCToFacilityGrid
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	10/12/2020	  
Purpose:	To create RC-Facility grid if not already present
Version History:-
*/
function createRCToFacilityGrid(rcObj, suObj, suppObj, facObj, facStatus, contingency, manuOrNot, shipPointOrNot, step) {
    var rcFacilityGridHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToFacilityGrid");
    if (rcFacilityGridHome != null && rcObj != null && suObj != null && suppObj != null && facObj != null) {
        var facGridCount = 1;
        var arrayListForGridClassID = new java.util.ArrayList();
        var gridExistsFlag = false;
        var rcFacilityGrids = rcObj.getClassificationProductLinks(rcFacilityGridHome);
        log.info("rcFacilityGrids size 1::" + rcFacilityGrids.size());
        var spKey = suObj.getID() + "-" + suppObj.getID() + "-" + facObj.getID();
        // Added to populate a_mm_BMIGridSPID in BMI to facility Grid : Srikanth : Begin
        //var shippingPackage = step.getProductHome().getObjectByKey("Shipping_Package_Key", spKey); // Commented Out as a part of MDMI-20669
        var shippingPackage = step.getProductHome().getObjectByKey("Dev_Shipping_Package_Key", spKey); // Added as a part of MDMI-20669
        // Added to populate a_mm_BMIGridSPID in BMI to facility Grid : Srikanth : Ends
        var facStatus_pendingInact = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Status").getListOfValuesValueByID("20").getValue(); // Pending Inactivation
        for (var a = 0; a < rcFacilityGrids.size(); a++) {
            var rcFacilityGridIns = rcFacilityGrids.get(a);
            var suID = rcFacilityGridIns.getValue("a_mm_BMIGridSUID").getSimpleValue();
            var suppID = rcFacilityGridIns.getValue("a_mm_BMIGridSupplierId").getSimpleValue();
            var facID = rcFacilityGridIns.getValue("a_mm_BMIGridFacilityId").getSimpleValue();
            var suppCustId = suppObj.getValue("SIM_Identifier").getSimpleValue()//Added as part of INC15965928
            var facCustId = facObj.getValue("SIM_Identifier").getSimpleValue()//Added as part of INC15965928
            if (suID != null && suppID != null && facID != null) {
                //Updated IF condition as part of INC15965928
                if (suID.trim() == suObj.getID() && suppID.trim() == suppCustId && facID.trim() == facCustId) {
                    gridExistsFlag = true;
                    rcFacilityGridIns.getValue("a_mm_BMIGridSU").setSimpleValue(suObj.getName());
                    rcFacilityGridIns.getValue("a_mm_BMIGridSupplier").setSimpleValue(suppObj.getName());
                    rcFacilityGridIns.getValue("a_mm_BMIGridFacility").setSimpleValue(facObj.getName());
                    // Added to populate a_mm_BMIGridSPID in BMI to facility Grid : Srikanth : Begin
                    if (shippingPackage) {
                        rcFacilityGridIns.getValue("a_mm_BMIGridSPID").setSimpleValue(shippingPackage.getID());
                    }
                    // Added to populate a_mm_BMIGridSPID in BMI to facility Grid : Srikanth : Ends
                    log.info("fac status dev " + facStatus);
                    rcFacilityGridIns.getValue("a_mm_Status").setSimpleValue(facStatus);
                    if (contingency != null && contingency != "") {
                        rcFacilityGridIns.getValue("SIM_Contingency_Flag").setSimpleValue(contingency);
                    } else {
                        rcFacilityGridIns.getValue("SIM_Contingency_Flag").setSimpleValue(null);
                    }
                    if (manuOrNot != null && manuOrNot != "")
                        rcFacilityGridIns.getValue("a_mm_IsItManufacturingFac").setSimpleValue(manuOrNot);

                    if (shipPointOrNot == "Yes") {
                        rcFacilityGridIns.getValue("SIM_Facility_Ship-Point").setLOVValueByID("100456");

                    } else if (shipPointOrNot == "No") {

                        rcFacilityGridIns.getValue("SIM_Facility_Ship-Point").setLOVValueByID("100457");
                    }
                    var wsiDeactivation = isThisFacilityDeactivated(step, rcObj, spKey, rcFacilityGridIns, null);
                    log.info("wsiDeactivation resultant10::" + wsiDeactivation + " _ " + spKey);
                    if (wsiDeactivation == true) {
                        log.info("wsiDeactivation 2::" + wsiDeactivation);
                        rcFacilityGridIns.getValue("a_mm_Status").setSimpleValue(facStatus_pendingInact);
                        log.info("Facility Status:: " + rcFacilityGridIns.getValue("a_mm_Status").getSimpleValue());
                    }
                    log.info("Grid exists for: " + facID);
                    break;
                } else {
                    arrayListForGridClassID.add(rcFacilityGridIns.getClassification().getID());
                }
            }
        }
        log.info("gridExistsFlag: " + gridExistsFlag);
        if (gridExistsFlag == false) {
            for (var b = 0; b < rcFacilityGrids.size(); b++) {
                var facClassID = "FacilityGrid" + facGridCount;
                if (arrayListForGridClassID.contains(facClassID)) {
                    facGridCount++;
                } else {
                    break;
                }
            }
            var facClassID = "FacilityGrid" + facGridCount;
            var facGrid = step.getClassificationHome().getClassificationByID(facClassID);
            if (facGrid == null) {
                var facGridRoot = step.getClassificationHome().getClassificationByID("FacilityGridHierarchy");
                if (facGridRoot != null) {
                    var newFacGrid = facGridRoot.createClassification(facClassID, "FacilityGrid");
                    newFacGrid.setName("Facility Grid " + facGridCount);
                    approveObjectInAllContexts(newFacGrid, step);
                    facGrid = step.getClassificationHome().getClassificationByID(facClassID);
                }
            }
            var newFacGridLink = rcObj.createClassificationProductLink(facGrid, rcFacilityGridHome);
            newFacGridLink.getValue("a_mm_BMIGridRCID").setSimpleValue(rcObj.getID());
            newFacGridLink.getValue("a_mm_BMIGridSUID").setSimpleValue(suObj.getID());
            newFacGridLink.getValue("a_mm_BMIGridSU").setSimpleValue(suObj.getName());
            newFacGridLink.getValue("a_mm_BMIGridSupplierId").setSimpleValue(suppObj.getValue("SIM_Identifier").getSimpleValue()); //Changed as part of INC15965928
            newFacGridLink.getValue("a_mm_BMIGridSupplier").setSimpleValue(suppObj.getName());
            newFacGridLink.getValue("a_mm_BMIGridFacilityId").setSimpleValue(facObj.getValue("SIM_Identifier").getSimpleValue()); //changed as part of INC15965928

            newFacGridLink.getValue("a_mm_BMIGridFacility").setSimpleValue(facObj.getName());
            // Added to populate a_mm_BMIGridSPID in BMI to facility Grid : Srikanth : Begin
            if (shippingPackage) {
                newFacGridLink.getValue("a_mm_BMIGridSPID").setSimpleValue(shippingPackage.getID());
            }
            // Added to populate a_mm_BMIGridSPID in BMI to facility Grid : Srikanth : Ends
            newFacGridLink.getValue("a_mm_Status").setSimpleValue(facStatus);
            if (suObj.getObjectType().getID() == "DevSU")
                newFacGridLink.getValue("a_mm_SPSelectionOfQA").setLOVValueByID("01");
            if (contingency != null && contingency != "")
                newFacGridLink.getValue("SIM_Contingency_Flag").setSimpleValue(contingency);
            if (manuOrNot != null && manuOrNot != "")
                newFacGridLink.getValue("a_mm_IsItManufacturingFac").setSimpleValue(manuOrNot);
            if (shipPointOrNot != null && shipPointOrNot != "" && shipPointOrNot != "null")
                newFacGridLink.getValue("SIM_Facility_Ship-Point").setSimpleValue(shipPointOrNot);
            var wsiDeactivation = isThisFacilityDeactivated(step, rcObj, spKey, newFacGridLink, null);
            log.info("wsiDeactivation resultant20:: " + wsiDeactivation + " _ " + spKey);
            if (wsiDeactivation == true) {
                newFacGridLink.getValue("a_mm_Status").setSimpleValue(facStatus_pendingInact);
            }
            log.info("Grid created for: " + newFacGridLink.getValue("a_mm_BMIGridFacilityId").getSimpleValue());
        }
    }
}

/*
Name:	facilityContingencyCheck
Author:	Rahul Choudhary(rahul.choudhary@us.mcd.com)
Date:	01/11/2020	  
Purpose:	To check whether the facility is contingent or not
Version History:-
1) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/
function facilityContingencyCheck(facObj, step, market, supplierRefObjectCategory) {
    var contingencyFlag = true;
    var check_market = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(market).getValue();;

    var tStepRef = step.getReferenceTypeHome().getReferenceTypeByID("SIM_Facility_To_Category");
    var refObj = facObj.getReferences(tStepRef);
    // log.info("Reference size " + refObj.size());
    for (var i = 0; i < refObj.size(); i++) {
        var facilityCategory = refObj.get(i).getTarget().getName();
        var marketObj = refObj.get(i).getTarget().getID().trim().split("_");
        // log.info("value = " + marketObj[0]);
        if (marketObj[0] == check_market && facilityCategory == supplierRefObjectCategory) {
            //log.info("Market check for Contingency :" + check_market);
            var flag = refObj.get(i).getValue("SIM_Contingency_Flag").getSimpleValue();
            if (flag != "Yes")
                contingencyFlag = false;

        }
    }

    return contingencyFlag;
}

/*
Name:	
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	03/11/2020	  
Purpose:	To create and update RC-Facility grid as per user story MDMI-8725, Sprint-38
Version History:-
*/
function createRCtoFacilityGridMainFunction_New(node, step, web) {
    var rcToSUHome = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var rcToFacilityGridHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToFacilityGrid");
    if (rcToSUHome && rcToFacilityGridHome) {
        var suIDArrayList = new java.util.ArrayList();
        var rcMarket = node.getValue("a_mm_Market").getSimpleValue();
        var rcToSURefs = node.getReferences(rcToSUHome);
        for (var i = 0; i < rcToSURefs.size(); i++) {
            var suObjHere = rcToSURefs.get(i).getTarget();
            var suObjectType = suObjHere.getObjectType().getID();
            suIDArrayList.add(suObjHere.getID());
            if (suObjectType == "DevSU") {
                var suToSpHome = step.getReferenceTypeHome().getReferenceTypeByID("DevSUToShipingPackage");
                if (suToSpHome) {
                    var suToSpRefs = suObjHere.getReferences(suToSpHome);
                    for (var j = 0; j < suToSpRefs.size(); j++) {
                        var spObjHere = suToSpRefs.get(j).getTarget();
                        var spToSuppHome = step.getReferenceTypeHome().getReferenceTypeByID("ShippingPackageToSupplier");
                        var spToFacHome = step.getReferenceTypeHome().getReferenceTypeByID("ShippingPackageToDevFacility");
                        var spToSuppRefs = spObjHere.getReferences(spToSuppHome);
                        var spToFacRefs = spObjHere.getReferences(spToFacHome);
                        if (spToSuppRefs.size() == 1 && spToFacRefs.size() == 1) {
                            var suppObjHere = spToSuppRefs.get(0).getTarget();
                            var facObjHere = spToFacRefs.get(0).getTarget();
                            var facStatus = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Status").getListOfValuesValueByID("15").getValue(); // Active
                            var contingency = step.getListOfValuesHome().getListOfValuesByID("SIM_Yes_No").getListOfValuesValueByID("100457").getValue(); // No
                            var manuOrNot = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_YN").getListOfValuesValueByID("01").getValue(); // Yes
                            var shipPointOrNot = step.getListOfValuesHome().getListOfValuesByID("SIM_Yes_No").getListOfValuesValueByID("100456").getValue(); // Yes
                            createRCToFacilityGrid(node, suObjHere, suppObjHere, facObjHere, facStatus, contingency, manuOrNot, shipPointOrNot, step);
                        }
                    }
                }
            } else if (suObjectType == "McDonaldItem") {
                log.info("SI Case");
                isWRINActive(node, suObjHere, step, rcMarket, "createRCToFacilityGrid", web);
            }
        }
        var rcToFacilityGrids = node.getClassificationProductLinks(rcToFacilityGridHome);
        for (var l = 0; l < rcToFacilityGrids.size(); l++) {
            var rcFacilityGridIns = rcToFacilityGrids.get(l);
            var suID = rcFacilityGridIns.getValue("a_mm_BMIGridSUID").getSimpleValue();
            //Changed as part of INC15965928
            var suppObjID = rcFacilityGridIns.getValue("a_mm_BMIGridSupplierId").getSimpleValue();
            suppID = step.getKeyHome().getObjectByKey("customIDKey", suppObjID);
            if (suppID) suppID = suppID.getID();
            var facObjID = rcFacilityGridIns.getValue("a_mm_BMIGridFacilityId").getSimpleValue();
            facID = step.getKeyHome().getObjectByKey("customIDKey", facObjID);
            if (facID) facID = facID.getID();
            //Changed as part of INC15965928

            if (suID != null && suppID != null && facID != null) {
                if (suIDArrayList.contains(suID)) {
                    var suObj = step.getProductHome().getProductByID(suID.trim());
                    var suObjectType = suObj.getObjectType().getID();
                    if (suObjectType == "McDonaldItem") {
                        log.info("Calling for the second time");
                        var checkingResult = isWRINActive(node, suObj, step, rcMarket, facID.trim(), null);
                        if (checkingResult == false) {
                            rcFacilityGridIns.delete();
                        }
                    }
                } else {
                    rcFacilityGridIns.delete();
                }
            } else {
                rcFacilityGridIns.delete();
            }
        }
    }
}

/* Name: 
Author: Kirubakaran(Cognizant)
Date: 04 November 2020
Sprint : 38
User Story: MDMI - 8274
Purpose: To Validate WRIN for Active in Market and Supplier Facility Combination
*/
function isWRINValid(node, step, web) {


    var result = "";
    var tRCToSupplierRef = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var supplierItemReferences = node.getReferences(tRCToSupplierRef);
    var market = node.getValue("a_mm_Market").getSimpleValue();

    for (var j = 0; j < supplierItemReferences.size(); j++) {
        var supplierRefObject = supplierItemReferences.get(j).getTarget();
        var Objtype = supplierRefObject.getObjectType().getID();
        if (Objtype == "McDonaldItem") {
            var IsActiveWRIN = isWRINActive(node, supplierRefObject, step, market, null, web);
            logger.info("IsActiveWRIN : " + IsActiveWRIN);
            /*
            if (IsActiveWRIN == true) {

                var facilityChk = isWRINActive(node, supplierRefObject, step, market, "checkFacilityContingency", web);
                logger.info("facilityChk : " + facilityChk);
                if (facilityChk == false) {

                    result = result + supplierRefObject.getName() + " does not have at least one Supplier-Facility combination that is active and non-contingent. For more information, please refer to the sub-screen .​\n";

                }
            }
            */
            if (IsActiveWRIN == false) {

                result = result + supplierRefObject.getName() + " is Inactive for the Current Market. \n";

            }
        }

    }
    return result;
}


/*
Name:	isThisFacilityDeactivated
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	05/11/2020	  
Purpose:	To check whether the WSI is deactivated from SIM or not
Version History:-
*/
function isThisFacilityDeactivated(step, rcNode, spKey, rcFacGridIns, placeOFCalling, lookup) {
    var rcMaintenanceWorkflow = step.getWorkflowHome().getWorkflowByID("wf_mm_RecipeComponentMaintenance");
    var isItAnImpactedWSI = false;
    var impactedObjs = rcNode.getValue("a_mm_ImpactedObjects").getSimpleValue() + "";
    log.info("RESULTANT1:: " + impactedObjs + "_" + rcMaintenanceWorkflow);
    if (impactedObjs != null && impactedObjs != "" && rcMaintenanceWorkflow != null) {
        log.info("impactedObjs: " + impactedObjs);
        var splittedImpactValue = impactedObjs.trim().split("\n");
        if (splittedImpactValue != null) {
            for (var a = 0; a < splittedImpactValue.length; a++) {
                var eachLine = splittedImpactValue[a];
                var splittedEachLine = eachLine.split("|");
                if (splittedEachLine != null) {
                    var spKeyInEachLine = splittedEachLine[1];
                    log.info("spKeyInEachLine: " + spKeyInEachLine);
                    var contigencyFlag = splittedEachLine[4];
                    log.info("contigencyFlag: " + contigencyFlag);
                    if (a == 0 && contigencyFlag == "Contingent" && placeOFCalling != "RejectTransition") {
                        log.info("Contigency Scenario");
                        return false;
                    }
                    log.info("RESULTANT2:: " + spKeyInEachLine + "_" + spKey);
                    if (spKeyInEachLine != null && spKeyInEachLine != "") {
                        log.info("RESULTANT3:: " + spKeyInEachLine + "_" + spKey);
                        if (spKeyInEachLine.trim() == spKey) {
                            log.info("RESULTANT4:: " + spKeyInEachLine + "_" + spKey);
                            isItAnImpactedWSI = true;
                            if (placeOFCalling == "sendSIMResponse") {
                                var activeStatus = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Status").getListOfValuesValueByID("15").getValue(); // Active
                                var InactiveStatus = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Status").getListOfValuesValueByID("8").getValue(); // Inactive
                                var qaSelection = rcFacGridIns.getValue("a_mm_SPSelectionOfQA").getID();
                                var purSelection = rcFacGridIns.getValue("a_mm_SPSelectionOfPurchasing").getID();
                                var wrinInEachLine = splittedEachLine[0];
                                var marketInEachLine = splittedEachLine[2];
                                if ((qaSelection == null || qaSelection == "00") && (purSelection == null || purSelection == "00")) {
                                    log.info("acceptAcceptanceFlag: sendSIMResponse");
                                    if (wrinInEachLine != null && spKeyInEachLine != null && marketInEachLine != null) {
                                        rcFacGridIns.getValue("a_mm_Status").setSimpleValue(InactiveStatus);
                                        integ.approvePimImpactedObjects(wrinInEachLine.trim(), spKeyInEachLine.trim(), marketInEachLine.trim(), step, logger, lookup); // Call SIM Method for accepting
                                    }
                                }
                                if (qaSelection == "01" || purSelection == "01") {
                                    log.info("rejectAcceptanceFlag: sendSIMResponse");
                                    var qaComment = rcNode.getWorkflowInstance(rcMaintenanceWorkflow).getSimpleVariable("wf_mm_QAComment");
                                    var purComment = rcNode.getWorkflowInstance(rcMaintenanceWorkflow).getSimpleVariable("wf_mm_PurComment");
                                    var nodeComment = qaComment + "\n" + purComment;
                                    if (wrinInEachLine != null && spKeyInEachLine != null && marketInEachLine != null) {
                                        rcFacGridIns.getValue("a_mm_Status").setSimpleValue(activeStatus);
                                        integ.rejectPimImpactedObjects(wrinInEachLine.trim(), spKeyInEachLine.trim(), marketInEachLine.trim(), nodeComment, step, logger, lookup); // Call SIM Method for rejecting                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return isItAnImpactedWSI;
}


function getFacTypeFromSI(siObj, wsi, step) {

    if (wsi != "") {
        var wsiSplitNode = wsi.split("-");
        var facID = null;
        if (wsiSplitNode.length > 0) {
            logger.info("-PIMImpactedObjects---" + wsiSplitNode[2]);
            facID = wsiSplitNode[2];
        }
        var siToSuppHome = step.getReferenceTypeHome().getReferenceTypeByID("ItemToSupplier");
        var siToSuppRefs = siObj.getReferences(siToSuppHome);
        for (var a = 0; a < siToSuppRefs.size(); a++) {
            var siToSuppRefIns = siToSuppRefs.get(a);
            var suppObj = siToSuppRefIns.getTarget();
            var facAttrValues = siToSuppRefIns.getValue("Facility_MFG_SSP").getSimpleValue();
            if (facAttrValues != null) {
                var splittedFacAttrValues = facAttrValues.trim().split("<multisep/>");
                for (var d = 0; d < splittedFacAttrValues.length; d++) {
                    var eachFacAttrLineValue = splittedFacAttrValues[d];
                    if (eachFacAttrLineValue != null) {
                        var splittedEachFacAttrLineValue = eachFacAttrLineValue.trim().split("\\|");
                        var facIDToCheck = splittedEachFacAttrLineValue[0];
                        if (facIDToCheck != null) {
                            var mainNode = step.getKeyHome().getObjectByKey("customIDKey", facIDToCheck);
                            if (mainNode != null) {
                                if (mainNode.getID() == facID) {
                                    // var rcGroup = rcObj.getValue("a_mm_RecipeComponentGroup").getID();
                                    var manufValue = splittedEachFacAttrLineValue[1];
                                    var shipPointValue = splittedEachFacAttrLineValue[2];
                                    if (manufValue == "Yes") {
                                        return manufValue;
                                    } else {
                                        return "No";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return "No";
}

/*
Name:	toChecktConceptTestDoc
Author:	Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	10/11/2020	  
Purpose:	To check whether the Concept Test is added or not as per MDMI-8900
Version History:-
*/

function toChecktConceptTestDoc(node, step) {
    var flag = false;
    var tRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToFieldTest");
    if (tRef) {
        var nodeBMItoFTRefObject = node.getReferences(tRef)
        if (nodeBMItoFTRefObject.isEmpty()) {
            var tRefBMIToConDoc = step.getReferenceTypeHome().getReferenceTypeByID("BMIToConceptTest");
            if (tRefBMIToConDoc) {
                var tBMIToConDoc = node.getReferences(tRefBMIToConDoc);
                if (!tBMIToConDoc.isEmpty()) {
                    flag = true;
                }
            }
        }
    }
    if (flag == false)
        return null;
    else
        return "If Concept Test is not added then Concept Test Result Document should be left blank.";
}

/*
Name: 
Author: Rahul Choudhary (rahul.choudhary.@us.mcd.com)
Date: 	12/11/2020	  
Purpose: For populating the status of the Supplier Items under SU tab when RC is pushed from Maintenence : MDMI-8884
Version History :-
1) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/
function populateStatus(step, node, tMarket) {
    var tRCToSupplierRef = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var tRCToSupplierInactiveRef = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem_Inactive");
    var supplierItemReferences = node.getReferences(tRCToSupplierRef);
    var supplierItemInactiveReferences = node.getReferences(tRCToSupplierInactiveRef);
    var market = node.getValue("a_mm_Market").getSimpleValue();
    var tStepSURef = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SUToSUMarket");
    var MarketClassification = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SUToSUMarket");
    //var tMarket = node.getValue("a_mm_Market").getSimpleValue();
    var supplierItemArrayList = new java.util.ArrayList();

    tMarket = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(market).getValue();;

    var tcurrentcontext = step.getCurrentContext().getID();
    var shippingUnitMarket = "ShippingUnit" + tMarket;

    //var rcRefObjectID = node.getID();


    if (supplierItemReferences) {
        for (var j = 0; j < supplierItemReferences.size(); j++) {
            var supplierRefObjectID = supplierItemReferences.get(j).getTarget().getID();
            supplierItemArrayList.add(supplierRefObjectID);
        }
    }

    if (supplierItemInactiveReferences) {
        for (var k = 0; k < supplierItemInactiveReferences.size(); k++) {
            var supplierRefObjectID = supplierItemInactiveReferences.get(k).getTarget().getID();
            supplierItemArrayList.add(supplierRefObjectID);
        }
    }
    var supplierItemArrayListToArray = supplierItemArrayList.toArray();
    for (var i = 0; i < supplierItemArrayListToArray.length; i++) {
        var supplierItemObject = step.getProductHome().getProductByID(supplierItemArrayListToArray[i]);
        var supplierRefObjectType = supplierItemObject.getObjectType().getID();
        var supplierItemmarkets = supplierItemObject.getClassificationProductLinks(MarketClassification);
        for (m = 0; m < supplierItemmarkets.size(); m++) {
            var market = supplierItemmarkets.get(m).getClassification().getID();
            if (market == shippingUnitMarket + "_Active") {
                var marketStatusArray = market.split(shippingUnitMarket + "_");
                var marketStatus = marketStatusArray[1];
                log.info("value of Supplier Item Status :" + marketStatus);

                for (var n = 0; n < supplierItemReferences.size(); n++) {
                    if (supplierItemReferences.get(n).getTarget().getID() == supplierItemArrayListToArray[i]) {
                        supplierItemReferences.get(n).getValue("a_mm_Status").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Status").getListOfValuesValueByID("15").getValue());
                        break;
                    }
                }
            } else if (market == shippingUnitMarket + "_Inactive") {

                var marketStatusArray = market.split(shippingUnitMarket + "_");
                var marketStatus = marketStatusArray[1];
                log.info("value of Supplier Item Status :" + marketStatus);

                for (var p = 0; p < supplierItemInactiveReferences.size(); p++) {
                    if (supplierItemInactiveReferences.get(p).getTarget().getID() == supplierItemArrayListToArray[i]) {
                        supplierItemInactiveReferences.get(p).getValue("a_mm_Status").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Status").getListOfValuesValueByID("8").getValue());
                        break;
                    }
                }
            }

        }
    }
}
/* Name: Mail Sending functionality for Inactive/Archived MERLIN Specs
Author: Rahul Choudhary(Cognizant)
Date: 11/23/2020
Sprint :39
User Story: MDMI - 8425
Purpose: Mail Sending functionality for Inactive/Archived MERLIN Specs
Revision History:
1) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/
function sendMailSpecInactivation(step, node, mail) {
    var tRefSupplierItem = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var tRefListSupplierItem = node.getReferences(tRefSupplierItem);
    var tRefSupplierItemInactive = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem_Inactive");
    var tRefListSupplierItemInactive = node.getReferences(tRefSupplierItemInactive);
    var specName = node.getValue("a_mm_MerlinSpecName").getSimpleValue();
    var specNumber = node.getValue("a_mm_SpecificationNumber").getSimpleValue();
    var issueNumber = node.getValue("a_mm_IssueNumber").getSimpleValue();
    var market = node.getValue("a_mm_Market").getSimpleValue();
    var tEmailHier = step.getEntityHome().getEntityByID("EmailHierarchy");
    var localEmaillHierarchy = step.getEntityHome().getEntityByID("MailTrigger_018");
    var globalswitch = tEmailHier.getValue("a_mm_EmailSwitch").getID();
    var localswitch = localEmaillHierarchy.getValue("a_mm_EmailSwitch").getID();
    var tUrlFromEmailHier = tEmailHier.getValue("a_mm_Merlinurl").getSimpleValue();
    var tFrom = tEmailHier.getValue("a_mm_From(Email)").getSimpleValue();
    var GroupEmail = "";
    var recipeComponentName = node.getValue("a_mm_RecipeComponentName").getSimpleValue();
    var recipeComponentID = node.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
    var wrinIDs = "";

    if (tRefListSupplierItem) {
        for (var i = 0; i < tRefListSupplierItem.size(); i++) {

            var supplierItemObjectType = tRefListSupplierItem.get(i).getTarget().getObjectType().getID();
            if (supplierItemObjectType == "McDonaldItem") {
                var wrinIDTemp = tRefListSupplierItem.get(i).getTarget().getValue("WRINNUMBER").getSimpleValue();
                if (wrinIDTemp != null)
                    if (wrinIDs == "")
                        wrinIDs = wrinIDTemp;
                    else
                        wrinIDs = wrinIDs + "," + wrinIDTemp;
            }
        }
    }
    if (tRefListSupplierItemInactive) {
        for (var j = 0; j < tRefListSupplierItemInactive.size(); j++) {

            var supplierItemObjectTypeInactive = tRefListSupplierItemInactive.get(j).getTarget().getObjectType().getID();
            if (supplierItemObjectTypeInactive == "McDonaldItem") {
                var wrinIDTempInactive = tRefListSupplierItemInactive.get(j).getTarget().getValue("WRINNUMBER").getSimpleValue();
                if (wrinIDTempInactive != null)
                    if (wrinIDs == "")
                        wrinIDs = wrinIDTempInactive;
                    else
                        wrinIDs = wrinIDs + "," + wrinIDTempInactive;
            }
        }
    }

    if (tUrlFromEmailHier != null && tFrom != null) {
        var url = tUrlFromEmailHier + "/gsm/getSpecByNum.aspx?SpecNum=" + specNumber + "-" + issueNumber;

        if (step.getGroupHome().getGroupByID("PIMRole10-" + market)) {
            GroupEmail = getEmailIdsFromTheGroup(step, "PIMRole10-" + market);
        }

        var GroupEmailList = GroupEmail.replace(";", ",");
        GroupEmailList = GroupEmailList.substring(0, GroupEmailList.length - 1);
        log.info("GroupEmail:" + GroupEmail);
        if (GroupEmail != "") {
            var tSubject = "A MERLIN Spec has been inactivated in MERLIN. An action is needed in PIM to grant data accuracy.";
            var tBody = "Dear User, <br/>Your action is needed.<br/>The following MERLIN specification has been made inactive.<br/><br/><b>MERLIN Title:</b> " + specName + "<br/><b>MERLIN Number:</b> " + specNumber + "-" + issueNumber + "<br/><br/><b>RC Name:</b> " + recipeComponentName + "<br/><b>RC Number:</b> " + recipeComponentID + "<br/><br/><b>Linked Supplier Items:</b> " + wrinIDs + "<br/><br/>Currently PIM is displaying the information of the inactivated Specification.<br/><br/>The following action is expected:<br/>Please, check and provide the correct Spec Number to update the data or inactivate the linked items in PIM.<br/><br/>To know the inactivation reason, please check the Event History section of the MERLIN Approval/Audit Trail tab:<br/>" + url + "<br/><br/>This message was sent to:<br/>" + GroupEmailList;

            if (globalswitch == "01" && localswitch == "01") //email to be triggered when both the switches are turned on
            {
                mail.mail().from(tFrom).addTo(GroupEmail).htmlMessage(tBody).subject(tSubject).send();
                //log.info("code to trigger mail");
            }
        }
    }
}

/*
Author:Kirubakaran Gajendran
Date:20 November 2020
Purpose:To Populate Composition Related attributes in BMIToRecipeComponent Link
Version1 : Code modified by Ritabrata to populate Sequence Number in Customization tab for UK, ANZ and FR markets (MDMI-11078 and MDMI-12049)
Version2 : Code Modified by Pratik Deshmukh to Default Attrinuts under Costomization tab to "N/A" for US market(MDMI-12948)
*/

function setCustomisationAttributeValues(node, step, refTypeID, lookupTableHome) {

    logger.info("refTypeID: " + refTypeID);
    var tRef = step.getReferenceTypeHome().getReferenceTypeByID(refTypeID);
    var tBMIToRCRefLink = node.getReferences(tRef);

    if (tBMIToRCRefLink != null) {
        for (var i = 0; i < tBMIToRCRefLink.size(); i++) {

            var tBMIToRCRef = tBMIToRCRefLink.get(i);
            var tBMIToRCObj = tBMIToRCRef.getTarget();
            logger.info("tBMIToRCObj ID: " + tBMIToRCObj.getID());
            var market = node.getValue("a_mm_Market").getSimpleValue();
            var rfmServFactor = tBMIToRCRef.getValue("a_mm_Default_RFM_Serving_Factor").getSimpleValue();
            var grillgroup = tBMIToRCObj.getValue("a_mm_Grill_Group").getLOVValue();
            var grillgroupID = "";
            if (grillgroup) {
                grillgroupID = grillgroup.getID();
            }

            /******Attribute Value population based on object Type Starts*******/

            if (refTypeID == "BMIToRecipeComponent") {

                //code starts - to populate Sequence Number
                if (market == "UK" || market == "AU" || market == "NZ") {
                    var latestSequenceNumber = (i + 1) * 10;
                    tBMIToRCRef.getValue("a_mm_RefSequenceNumber").setSimpleValue(latestSequenceNumber);
                } else if (market == "FR") {
                    var order = lookupTableHome.getLookupTableValue("lt_mm_SequenceNumber", grillgroupID);
                    if (order) {
                        tBMIToRCRef.getValue("a_mm_RefSequenceNumber").setSimpleValue(order);
                    }
                    log.info("order:" + order);
                }
                //code ends - to populate Sequence Number
                if (rfmServFactor == null || rfmServFactor == "") {
                    var servingFactor = tBMIToRCRef.getValue("a_mm_ServingFactor").getSimpleValue();
                    var UOM = tBMIToRCObj.getValue("a_mm_BaseServingQuantityUOM").getSimpleValue();
                    var UOMID = tBMIToRCObj.getValue("a_mm_BaseServingQuantityUOM").getID();

                    logger.info("servingFactor: " + servingFactor);
                    if (market != "US" && market != "CA") {
                        if (servingFactor != null && servingFactor.trim() != "") {
                            servingFactor = Number(servingFactor);
                            // var servingFactorRounded =Math.round(servingFactor);
                            logger.info(" Numbered servingFactor: " + servingFactor);


                            if (UOMID == "2") {
                                if (servingFactor % 1 != 0) {

                                    tBMIToRCRef.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(1);

                                    tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue(1);
                                    tBMIToRCRef.getValue("a_mm_PricingCharge").setSimpleValue(1);

                                } else {

                                    if (servingFactor > 10) {
                                        tBMIToRCRef.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(10);

                                        tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue(10);
                                        tBMIToRCRef.getValue("a_mm_PricingCharge").setSimpleValue(10);


                                    } else {
                                        tBMIToRCRef.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(servingFactor);

                                        tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue(servingFactor);
                                        tBMIToRCRef.getValue("a_mm_PricingCharge").setSimpleValue(servingFactor);

                                    }


                                }
                            } else {
                                tBMIToRCRef.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(1);

                                tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue(1);
                                tBMIToRCRef.getValue("a_mm_PricingCharge").setSimpleValue(1);

                            }
                        }
                    } else if (market == "US") {
                        tBMIToRCRef.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(1);
                        tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue("N/A");
                        tBMIToRCRef.getValue("a_mm_PricingCharge").setSimpleValue("N/A");
                    } else {
                        tBMIToRCRef.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(1);
                        tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue("Not Defined");
                        tBMIToRCRef.getValue("a_mm_PricingCharge").setSimpleValue("Not Defined");
                    }

                    if (market != "US" && market != "CA") {
                        tBMIToRCRef.getValue("a_mm_DisplayOnCSO").setSimpleValue("TRUE");
                        tBMIToRCRef.getValue("a_mm_Grill").setSimpleValue("TRUE");
                    } else if (market == "US") {
                        tBMIToRCRef.getValue("a_mm_DisplayOnCSO").setSimpleValue("N/A");
                        tBMIToRCRef.getValue("a_mm_Grill").setSimpleValue("N/A");
                    } else {
                        tBMIToRCRef.getValue("a_mm_DisplayOnCSO").setSimpleValue("Not Defined");
                        tBMIToRCRef.getValue("a_mm_Grill").setSimpleValue("Not Defined");
                    }
                }

            } else if (refTypeID == "BMIToRecipeComponent_CanAdd") {
                //code starts - to populate Sequence Number
                if (market == "UK" || market == "AU" || market == "NZ") {
                    var latestSequenceNumber = (i + 1) * 10;
                    tBMIToRCRef.getValue("a_mm_RefSequenceNumber").setSimpleValue(latestSequenceNumber);
                } else if (market == "FR") {
                    var order = lookupTableHome.getLookupTableValue("lt_mm_SequenceNumber", grillgroupID);
                    if (order) {
                        tBMIToRCRef.getValue("a_mm_RefSequenceNumber").setSimpleValue(order);
                    }
                    log.info("order:" + order);
                }
                //code ends - to populate Sequence Number
                if (rfmServFactor == null || rfmServFactor == "") {
                    tBMIToRCRef.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(0);
                    if (market != "US" && market != "CA") {
                        tBMIToRCRef.getValue("a_mm_DisplayOnCSO").setSimpleValue("FALSE");
                        tBMIToRCRef.getValue("a_mm_MinCustomisableQuantity").setSimpleValue(0);
                        //tBMIToRCRef.getValue("a_mm_Grill").setSimpleValue("N/A");                
                    }
                    if (market == "US") {
                        tBMIToRCRef.getValue("a_mm_DisplayOnCSO").setSimpleValue("N/A");
                        tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue("N/A");
                        tBMIToRCRef.getValue("a_mm_PricingCharge").setSimpleValue("N/A");
                    }
                    if (market == "CA") {
                        tBMIToRCRef.getValue("a_mm_DisplayOnCSO").setSimpleValue("Not Defined");
                        tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue("Not Defined");
                        tBMIToRCRef.getValue("a_mm_PricingCharge").setSimpleValue("Not Defined");
                    }

                }
            } else if (refTypeID == "BMIToPackagingComponent") {


                //code starts - to populate Sequence Number
                if (market == "UK" || market == "AU" || market == "NZ") {
                    var latestSequenceNumber = (i + 1) * 10;
                    tBMIToRCRef.getValue("a_mm_RefSequenceNumber").setSimpleValue(latestSequenceNumber);
                } else if (market == "FR") {
                    var order = lookupTableHome.getLookupTableValue("lt_mm_SequenceNumber", grillgroupID);
                    if (order) {
                        tBMIToRCRef.getValue("a_mm_RefSequenceNumber").setSimpleValue(order);
                    }
                    log.info("order:" + order);
                }
                //code ends - to populate Sequence Number
            } else {

                logger.info("Invalid Object Type for this 'setCustomisationAttributeValues' Method");

            }
            /******Attribute Value population based on object Type Ends*******/

            /******Attribute Value population for all object types Starts*******/
            if (rfmServFactor == null || rfmServFactor == "") {
                if (market != "US" && market != "CA") {
                    tBMIToRCRef.getValue("a_mm_MinCustomisableQuantity").setSimpleValue(0);
                    tBMIToRCRef.getValue("a_mm_Refund").setSimpleValue(0);
                } else if (market == "US") {
                    tBMIToRCRef.getValue("a_mm_MinCustomisableQuantity").setSimpleValue("N/A");
                    tBMIToRCRef.getValue("a_mm_Refund").setSimpleValue("N/A");
                } else {
                    tBMIToRCRef.getValue("a_mm_MinCustomisableQuantity").setSimpleValue("Not Defined");
                    tBMIToRCRef.getValue("a_mm_Refund").setSimpleValue("Not Defined");
                }


                var maxCustomisableQuantity = tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").getSimpleValue();
                var pricingCharge = tBMIToRCRef.getValue("a_mm_PricingCharge").getSimpleValue();
                logger.info("maxCustomisableQuantity: " + maxCustomisableQuantity);
                logger.info("pricingCharge: " + pricingCharge);

                if (market != "US" && market != "CA") {
                    if (maxCustomisableQuantity != null & pricingCharge != null) {

                        if (maxCustomisableQuantity <= pricingCharge) {
                            tBMIToRCRef.getValue("a_mm_CostInclusive").setSimpleValue("TRUE");
                        } else {
                            tBMIToRCRef.getValue("a_mm_CostInclusive").setSimpleValue("FALSE");
                        }
                        logger.info("CostInclusive: " + tBMIToRCRef.getValue("a_mm_CostInclusive").getSimpleValue());
                    }
                } else if (market == "US") {
                    tBMIToRCRef.getValue("a_mm_CostInclusive").setSimpleValue(null);
                } else {
                    tBMIToRCRef.getValue("a_mm_CostInclusive").setSimpleValue("Not Defined");
                }

                /******Attribute Value population for all object types Ends*******/
            }
        }
    }
}


/*
Name:	Update 'Supplier Feasibility' tab
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	23/11/2020
Purpose:	To update the fields related to Suppliers Feasibility tab and then create BMI To Facility Grid as per MDMI-8795. Sprint-39
*/
function updateSuppFeasibility(node, step, placeOfCalling) {
    var bmiToRCRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
    var bmiToFacilityGrid = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToFacilityGrid");
    if (bmiToRCRef && bmiToFacilityGrid) {
        var reqFacIDHashSet = new java.util.HashSet("");
        var bmiToRCs = node.getReferences(bmiToRCRef);
        for (var a = 0; a < bmiToRCs.size(); a++) {
            var suNames_Concatenated = null;
            var facNames_Concatenated = null;
            var suNames_HashSet = new java.util.HashSet("");
            var facNames_HashSet = new java.util.HashSet("");
            var bmiToRCRefIns = bmiToRCs.get(a);
            var rcTarget = bmiToRCRefIns.getTarget();
            var qaApproval = bmiToRCRefIns.getValue("a_mm_QAApproval").getSimpleValue();
            var purApproval = bmiToRCRefIns.getValue("a_mm_PurchasingApproval").getSimpleValue();
            var rcToFacs = rcTarget.getClassificationProductLinks(bmiToFacilityGrid);
            for (var b = 0; b < rcToFacs.size(); b++) {
                var rcToFacGridIns = rcToFacs.get(b);
                var suID = rcToFacGridIns.getValue("a_mm_BMIGridSUID").getSimpleValue();
                var suppID = rcToFacGridIns.getValue("a_mm_BMIGridSupplierId").getSimpleValue();
                var facID = rcToFacGridIns.getValue("a_mm_BMIGridFacilityId").getSimpleValue();
                //var qaSelection = rcToFacGridIns.getValue("a_mm_SPSelectionOfQA").getID();
                //var purSelection = rcToFacGridIns.getValue("a_mm_SPSelectionOfPurchasing").getID();
                var manufPoint = rcToFacGridIns.getValue("a_mm_IsItManufacturingFac").getID();
                if (suID != null && suID != "" && facID != null && facID != "") {
                    var suObj = step.getProductHome().getProductByID(suID.trim());
                    var facObj = step.getEntityHome().getEntityByID(facID.trim());
                    if (facObj == null)
                        facObj = step.getNodeHome().getObjectByKey("customIDKey", facID);
                    if (suObj != null && facObj != null) {
                        if (manufPoint == "01") {
                            reqFacIDHashSet.add(suppID + ":" + facID);
                        }
                        if (suNames_Concatenated == null) {
                            suNames_Concatenated = suObj.getName();
                        } else if (!suNames_HashSet.contains(suObj.getName())) {
                            suNames_Concatenated = suNames_Concatenated + "\n" + suObj.getName();
                        }
                        if (facNames_Concatenated == null) {
                            facNames_Concatenated = facObj.getName();
                        } else if (!facNames_HashSet.contains(facObj.getName())) {
                            facNames_Concatenated = facNames_Concatenated + "\n" + facObj.getName();
                        }
                        suNames_HashSet.add(suObj.getName());
                        facNames_HashSet.add(facObj.getName());
                    }
                }
            }
            bmiToRCRefIns.getValue("a_mm_BMIGridSU").setSimpleValue(suNames_Concatenated);
            bmiToRCRefIns.getValue("a_mm_BMIGridFacility").setSimpleValue(facNames_Concatenated);
            var bmiHierarchy = step.getProductHome().getProductByID("BMIHierarchy");
            var purAppDefaultValue = bmiHierarchy.getValue("a_mm_PurchasingApprovalDefaultValue").getSimpleValue();
            var QAAppDefaultValue = bmiHierarchy.getValue("a_mm_QAApprovalDefaultValue").getSimpleValue();
            logger.info("purAppDefaultValue: " + purAppDefaultValue);
            logger.info("QAAppDefaultValue: " + QAAppDefaultValue);
            var rcGroup = rcTarget.getValue("a_mm_RecipeComponentGroup").getLOVValue().getID();
            if (rcGroup == "F") {
                if ((placeOfCalling == "AutoPopulateQAApproval" || placeOfCalling == "AutoPopulateBothApprovals") && qaApproval == null) {
                    if (QAAppDefaultValue == "Blank") {
                        bmiToRCRefIns.getValue("a_mm_QAApproval").setSimpleValue("");
                    } else {
                        bmiToRCRefIns.getValue("a_mm_QAApproval").setSimpleValue(QAAppDefaultValue);
                    }
                }
            }
            if ((placeOfCalling == "AutoPopulatePurApproval" || placeOfCalling == "AutoPopulateBothApprovals") && purApproval == null) {
                if (purAppDefaultValue == "Blank") {
                    bmiToRCRefIns.getValue("a_mm_PurchasingApproval").setSimpleValue("");
                } else {
                    bmiToRCRefIns.getValue("a_mm_PurchasingApproval").setSimpleValue(purAppDefaultValue);
                }
            }
        }
        createBMIFacilityGrid(node, step, reqFacIDHashSet);
    }
}

/*
Author:Rishi
Date:24 November 2020
Purpose:To Populate Cost Inclusion based on Pricing Charge and Max Cust Quantity
Version 1: Code Modified by Pratik to set Cost Inclusion to null/blank for US market
*/
function setCostInclusion(node, step, refTypeID) {

    logger.info("refTypeID: " + refTypeID);
    var tRef = step.getReferenceTypeHome().getReferenceTypeByID(refTypeID);
    var tBMIToRCRefLink = node.getReferences(tRef);
    var market = node.getValue("a_mm_Market").getSimpleValue();
    if (tBMIToRCRefLink != null) {
        for (var i = 0; i < tBMIToRCRefLink.size(); i++) {

            var tBMIToRCRef = tBMIToRCRefLink.get(i);
            var tBMIToRCObj = tBMIToRCRef.getTarget();
            logger.info("tBMIToRCObj ID: " + tBMIToRCObj.getID());

            if (refTypeID == "BMIToRecipeComponent" || refTypeID == "BMIToRecipeComponent_CanAdd" || refTypeID == "SMIToRecipeComponent" || refTypeID == "SMIToSMI") {

                var maxCustomisableQuantity = tBMIToRCRef.getValue("a_mm_MaxCustomisableQuantity").getSimpleValue();
                var pricingCharge = tBMIToRCRef.getValue("a_mm_PricingCharge").getSimpleValue();
                logger.info("maxCustomisableQuantity: " + maxCustomisableQuantity);
                logger.info("pricingCharge: " + pricingCharge);

                if (market != "US") { //added market check by Pratik because Us market Dosen't require Cost Inclusion Populated to True or False
                    if (maxCustomisableQuantity != null && pricingCharge != null) {
                        if (maxCustomisableQuantity <= pricingCharge) {
                            tBMIToRCRef.getValue("a_mm_CostInclusive").setSimpleValue("TRUE");
                        } else {
                            tBMIToRCRef.getValue("a_mm_CostInclusive").setSimpleValue("FALSE");
                        }
                        logger.info("CostInclusive: " + tBMIToRCRef.getValue("a_mm_CostInclusive").getSimpleValue());
                    }
                } else {
                    tBMIToRCRef.getValue("a_mm_Grill").setSimpleValue("N/A");
                    tBMIToRCRef.getValue("a_mm_CostInclusive").setSimpleValue(null);
                }

            } else {

                logger.info("Invalid Ref Type for this 'setCustomisationAttributeValues' Method");

            }

        }
    }
}

/*
Name:	calculateBMIToRC_CookedServQty_ServFact
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	16/12/2020	  
Purpose:	To populate BMIToRC Serving Quantity cooked and Serving Factor
Version History:-
*/
function calculateBMIToRC_CookedServQty_ServFact(node, step) {
    // Changes for MDMI-9274 : Rahul Choudhary : BEGINS
    var attributeHome = step.getAttributeHome().getAttributeByID("a_mm_ServingQuantityTechnical");
    var marketValue = node.getValue("a_mm_Market").getSimpleValue();
    var roundingDecValue = fetchValueFromSpecificContext(step, marketValue, attributeHome, "a_mm_RoundingDecimalMetaData");
    // Changes for MDMI-9274 : Rahul Choudhary : ENDS
    var tBMIToRecipe = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
    if (tBMIToRecipe) {
        var tBMIToRecipeLink = node.getReferences(tBMIToRecipe);
        if (tBMIToRecipeLink.size() > 0) {
            log.info("SS Inside PIM Library 1st If BMIToRecipeComponent Size : " + tBMIToRecipeLink.size()); //2
            for (var i = 0; i < tBMIToRecipeLink.size(); i++) {
                var tBMIToRCLink = tBMIToRecipeLink.get(i);
                var tRCObj = tBMIToRecipeLink.get(i).getTarget();
                setServingQtyUncooked(tRCObj, tBMIToRCLink);
                tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(null);
                tBMIToRCLink.getValue("a_mm_ServingFactor").setSimpleValue(null);

                var tServingQtyTech = 0;
                var tServingQuantity = tBMIToRCLink.getValue("a_mm_ServingQuantity").getSimpleValue();
                var tServingQuantityUOM = tBMIToRCLink.getValue("a_mm_ServingQuantityUnitofMeasure").getSimpleValue();
                var tCookingFactor = tRCObj.getValue("a_mm_CookingFactor").getSimpleValue();
                var tRCWeight = tRCObj.getValue("a_mm_RCUnitWeight").getSimpleValue();
                var tRCWeightUOM = tRCObj.getValue("a_mm_RCUnitWeightUOM").getSimpleValue();
                var tRCVolume = tRCObj.getValue("a_mm_RCUnitVolume").getSimpleValue();
                var tRCVolumeUOM = tRCObj.getValue("a_mm_RCUnitVolumeUOM").getSimpleValue();
                var tTechUOM = tRCObj.getValue("a_mm_BaseServingQuantityUOM").getSimpleValue();
                var tTechUOMID = tRCObj.getValue("a_mm_BaseServingQuantityUOM").getID();
                var tMerlinDensity = tRCObj.getValue("a_mm_Density").getSimpleValue();
                var tMerlinStatus = tRCObj.getValue("a_mm_MerlinStatus").getSimpleValue();
                var tIsLiquid = tRCObj.getValue("IsLiquid").getSimpleValue();
                if (tServingQuantity >= 0) {
                    if (tRCWeight != null && tRCWeightUOM != null) {
                        if (marketValue != "US") {
                            tRCWeight = pimGramConversion(tRCObj, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                        } else {
                            tRCWeight = pimOzConversion(tRCObj, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                        }
                    }
                    if (tRCVolume != null && tRCVolumeUOM != null) {
                        if (marketValue != "US") {
                            tRCVolume = pimMlConversion(tRCObj, "a_mm_RCUnitVolume", "a_mm_RCUnitVolumeUOM");
                        } else {
                            tRCVolume = pimFlOzConversion(tRCObj, "a_mm_RCUnitVolume", "a_mm_RCUnitVolumeUOM");
                        }
                    }
                    if ((tServingQuantityUOM == "grams" && tTechUOM == "ml") || (tServingQuantityUOM == "OZ" && tTechUOM == "FL OZ")) {
                        if (tCookingFactor > 0) {
                            log.info("tCookingFactor :" + tCookingFactor);
                            if (tIsLiquid == "Yes" && tMerlinDensity != null && Number(tMerlinDensity != 0) && (tMerlinStatus == "Pre-Approved" || tMerlinStatus == "Approved")) {
                                tServingQtyTech = ((Number(tServingQuantity) / Number(tMerlinDensity)) * Number(tCookingFactor));
                                tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(tServingQtyTech.toFixed(roundingDecValue))
                            } else if (tRCWeight != null && tRCVolume != null) {
                                tServingQtyTech = ((Number(tServingQuantity) * Number(tRCVolume)) / Number(tRCWeight)) * Number(tCookingFactor);
                                //tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(tServingQtyTech.toFixed(2));//Commented for MDMI-9274
                                tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(tServingQtyTech.toFixed(roundingDecValue)); //Change for MDMI-9274
                                log.info("tServingQuantityTech :" + tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").getSimpleValue());
                            }
                        }
                    } else if ((tServingQuantityUOM == "ml" && tTechUOM == "grams") || (tServingQuantityUOM == "FL OZ" && tTechUOM == "OZ")) {
                        if (tCookingFactor > 0) {
                            log.info("tCookingFactor :" + tCookingFactor);
                            if (tIsLiquid == "Yes" && tMerlinDensity != null && (tMerlinStatus == "Pre-Approved" || tMerlinStatus == "Approved")) {
                                tServingQtyTech = ((Number(tServingQuantity) * Number(tMerlinDensity)) * Number(tCookingFactor));
                                tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(tServingQtyTech.toFixed(roundingDecValue))
                            } else if (tRCWeight != null && tRCVolume != null) {
                                tServingQtyTech = ((Number(tServingQuantity) * Number(tRCWeight)) / Number(tRCVolume)) * Number(tCookingFactor);
                                //tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(tServingQtyTech.toFixed(2));//Commented for MDMI-9274
                                tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(tServingQtyTech.toFixed(roundingDecValue)); //Change for MDMI-9274
                                log.info("tServingQuantityTech :" + tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").getSimpleValue());
                            }
                        }
                    } else if (tTechUOMID == "2") {
                        log.info("SS Inside PIM Library 1st else if " + tTechUOMID); // 2
                        tServingQtyTech = Number(tServingQuantity) * Number(tCookingFactor);
                        tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(tServingQtyTech.toFixed(roundingDecValue)); //Change for MDMI-9274
                        log.info("tServingQuantityTech :" + tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").getSimpleValue());
                        // changed as per MDMI-4439
                        log.info("SS Inside PIM Library 2nd  else if " + tServingQuantityUOM); //EA
                        if ((tServingQuantityUOM == "grams" || tServingQuantityUOM == "ml") || (tServingQuantityUOM == "OZ" || tServingQuantityUOM == "FL OZ")) {
                            //tBMIToRCLink.getValue("a_mm_ServingQuantityUnitofMeasure").setSimpleValue("individual");
                            log.info("SS Inside PIM Library 2nd  if " + tServingQuantityUOM);
                            tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(null);
                            tBMIToRCLink.getValue("a_mm_ServingFactor").setSimpleValue(null);
                        }
                    }
                    // changed as per MDMI-4439
                    else {
                        tServingQtyTech = Number(tServingQuantity) * Number(tCookingFactor);
                        tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(tServingQtyTech.toFixed(roundingDecValue)); //Change for MDMI-9274
                        log.info("tServingQuantityTech :" + tBMIToRCLink.getValue("a_mm_ServingQuantityTechnical").getSimpleValue());
                    }
                }
                //End of calculating Serving Quantity Technical

                //Start of calculating Serving Factor
                var tServingQty = tBMIToRCLink.getValue("a_mm_ServingQuantity").getSimpleValue();
                var tBaseServingQty = tRCObj.getValue("a_mm_BaseServingQuantity").getSimpleValue();
                var tServingFactor = null;
                log.info("SS Outside PIM Library 3rd if " + tBaseServingQty);
                log.info("SS Outside PIM Library 3rd if " + tServingQty);

                if (tServingQty != null && tBaseServingQty > 0) {
                    log.info("SS Inside PIM Library 3rd if " + tBaseServingQty);
                    if (tServingQuantityUOM == tTechUOM) {
                        log.info("SS inside 4th If ");
                        tServingFactor = Number(tServingQty) / Number(tBaseServingQty);
                        tBMIToRCLink.getValue("a_mm_ServingFactor").setSimpleValue(tServingFactor.toFixed(2));
                        log.info("SS 1st tServingFactor :" + tBMIToRCLink.getValue("a_mm_ServingFactor").getSimpleValue());
                    } else {
                        if (tRCWeight != null && tRCWeightUOM != null && tRCVolume != null && tRCVolumeUOM != null) {
                            logger.info("tRCWeight" + tRCWeight);
                            if (marketValue != "US") {
                                tRCWeight = pimGramConversion(tRCObj, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                                tRCVolume = pimMlConversion(tRCObj, "a_mm_RCUnitVolume", "a_mm_RCUnitVolumeUOM");
                            } else {
                                tRCWeight = pimOzConversion(tRCObj, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                                tRCVolume = pimFlOzConversion(tRCObj, "a_mm_RCUnitVolume", "a_mm_RCUnitVolumeUOM");
                            }
                            logger.info("tRCWeight" + tRCWeight);
                            logger.info("tRCVolume" + tRCVolume);
                            logger.info("tRCVolume" + tRCVolume);
                            logger.info("tServingQuantity" + tServingQuantity);
                            if ((tServingQuantityUOM == "grams" && tTechUOM == "ml") || (tServingQuantityUOM == "OZ" && tTechUOM == "FL OZ") && Number(tRCWeight) > 0 && Number(tMerlinDensity) > 0) {
                                if (tIsLiquid == "Yes" && (tMerlinStatus == "Pre-Approved" || tMerlinStatus == "Approved")) {
                                    tServingQty = (Number(tServingQuantity) / Number(tMerlinDensity));
                                } else {
                                    tServingQty = ((Number(tServingQuantity) * Number(tRCVolume)) / Number(tRCWeight));
                                }
                            } else if ((tServingQuantityUOM == "ml" && tTechUOM == "grams") || (tServingQuantityUOM == "FL OZ" && tTechUOM == "OZ") && Number(tRCVolume) > 0 && Number(tMerlinDensity) > 0) {
                                if (tIsLiquid == "Yes" && (tMerlinStatus == "Pre-Approved" || tMerlinStatus == "Approved")) {
                                    tServingQty = (Number(tServingQuantity) * Number(tMerlinDensity));
                                } else {
                                    tServingQty = ((Number(tServingQuantity) * Number(tRCWeight)) / Number(tRCVolume));
                                }
                            }
                            logger.info("tServingQty" + tServingQty);
                            logger.info("tBaseServingQty" + tBaseServingQty);
                            tServingFactor = Number(tServingQty) / Number(tBaseServingQty);
                            tBMIToRCLink.getValue("a_mm_ServingFactor").setSimpleValue(tServingFactor.toFixed(2));
                            log.info("SS 2nd tServingFactor :" + tBMIToRCLink.getValue("a_mm_ServingFactor").getSimpleValue());
                        }
                    }
                }
                //End of calculating Serving Factor
            }
        }
    }
}

/*
Name:	calculateRCBuild_CookedServQty_ServFact
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	16/12/2020	  
Purpose:	To populate RC Build Serving Quantity cooked and Serving Factor
Version History:-
*/
function calculateRCBuild_CookedServQty_ServFact(node, step) {
    // Changes for MDMI-9274 : Rahul Choudhary : BEGINS
    var attributeHome = step.getAttributeHome().getAttributeByID("a_mm_ServingQuantityTechnical");
    var marketValue = node.getValue("a_mm_Market").getSimpleValue();
    var roundingDecValue = fetchValueFromSpecificContext(step, marketValue, attributeHome, "a_mm_RoundingDecimalMetaData");
    // Changes for MDMI-9274 : Rahul Choudhary : ENDS

    var recipeBuildString = "RecipeBuildOrder";
    for (var a = 1; a < 11; a++) {
        var rcBuildHome = step.getReferenceTypeHome().getReferenceTypeByID(recipeBuildString + a);
        if (rcBuildHome) {
            var rcBuildRefs = node.getReferences(rcBuildHome);
            for (var b = 0; b < rcBuildRefs.size(); b++) {
                var rcBuildIns = rcBuildRefs.get(b);
                var rcBuildTarget = rcBuildIns.getTarget();
                setServingQtyUncooked(rcBuildTarget, rcBuildIns);
                rcBuildIns.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(null);
                var uncookedServQty = rcBuildIns.getValue("a_mm_ServingQuantity").getSimpleValue();
                var uncookedServUOM = rcBuildIns.getValue("a_mm_ServingQuantityUnitofMeasure").getID();
                var cookingFactor = rcBuildTarget.getValue("a_mm_CookingFactor").getSimpleValue();
                var bsqUOM = rcBuildTarget.getValue("a_mm_BaseServingQuantityUOM").getID();
                var rcWeight = rcBuildTarget.getValue("a_mm_RCUnitWeight").getSimpleValue();
                var rcVolume = rcBuildTarget.getValue("a_mm_RCUnitVolume").getSimpleValue();
                var tMerlinDensity = rcBuildTarget.getValue("a_mm_Density").getSimpleValue();
                var tMerlinStatus = rcBuildTarget.getValue("a_mm_MerlinStatus").getSimpleValue();
                var tIsLiquid = rcBuildTarget.getValue("IsLiquid").getSimpleValue();

                if (Number(uncookedServQty) != 0 && uncookedServUOM != null && cookingFactor != null && bsqUOM != null) {
                    var cookedServQty = null;
                    if (rcWeight != null && rcBuildTarget.getValue("a_mm_RCUnitWeightUOM").getSimpleValue() != null) {
                        if (marketValue != "US") {
                            rcWeight = pimGramConversion(rcBuildTarget, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                        } else {
                            rcWeight = pimOzConversion(rcBuildTarget, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                        }
                    }
                    if (rcVolume != null && rcBuildTarget.getValue("a_mm_RCUnitVolumeUOM").getSimpleValue() != null) {
                        if (marketValue != "US") {
                            rcVolume = pimMlConversion(rcBuildTarget, "a_mm_RCUnitVolume", "a_mm_RCUnitVolumeUOM");
                        } else {
                            rcVolume = pimFlOzConversion(rcBuildTarget, "a_mm_RCUnitVolume", "a_mm_RCUnitVolumeUOM");
                        }
                    }
                    if ((uncookedServUOM == "1" && bsqUOM == "3") || (uncookedServUOM == "5" && bsqUOM == "4")) { // uncookedServUOM = grams(ID=1) and bsqUOM = ml(ID=3)
                        if (tIsLiquid == "Yes" && tMerlinDensity != null && Number(tMerlinDensity) != 0 && (tMerlinStatus == "Pre-Approved" || tMerlinStatus == "Approved")) {
                            cookedServQty = ((Number(uncookedServQty) / Number(tMerlinDensity)) * Number(cookingFactor))
                        } else if (Number(rcWeight) != 0 && rcVolume != null)
                            cookedServQty = Number(uncookedServQty) * (Number(rcVolume) / Number(rcWeight)) * Number(cookingFactor);
                    } else if ((uncookedServUOM == "3" && bsqUOM == "1") || (uncookedServUOM == "4" && bsqUOM == "5")) { // uncookedServUOM = ml(ID=3) and bsqUOM = grams(ID=1)
                        if (tIsLiquid == "Yes" && tMerlinDensity != null && (tMerlinStatus == "Pre-Approved" || tMerlinStatus == "Approved")) {
                            cookedServQty = ((Number(uncookedServQty) * Number(tMerlinDensity)) * Number(cookingFactor))
                        } else if (Number(rcVolume) != 0 && rcWeight != null)
                            cookedServQty = Number(uncookedServQty) * (Number(rcWeight) / Number(rcVolume)) * Number(cookingFactor);
                    } else if ((uncookedServUOM == "1" && bsqUOM == "1") || (uncookedServUOM == "2" && bsqUOM == "2") || (uncookedServUOM == "3" && bsqUOM == "3") || (uncookedServUOM == "5" && bsqUOM == "5") || (uncookedServUOM == "4" && bsqUOM == "4")) { // when both the UOM are same, note: ID 2 = individual
                        cookedServQty = Number(uncookedServQty) * Number(cookingFactor);
                    }
                    if (cookedServQty != null)
                        rcBuildIns.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(Number(cookedServQty).toFixed(roundingDecValue)); //Change for MDMI-9274 -- it was toFixed(2)
                }
            }
        }
    }
}


/*
Name:	calculateRCBuild_CookedServQty_ServFact
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	22/01/2021
Purpose:	To populate RC Build Serving Quantity cooked and Serving Factor as per MDMI-9315, Sprint-42
Version History:-
*/
function createBuildOrderReferences(sourceObj, step, targetObj, currentTimeStamp, subRCName) {
    var recipeBuildString = "RecipeBuildOrder";
    var naValue = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_SubRecipeComponent").getListOfValuesValueByID("0").getValue();
    var buildOrder = 10;
    var maxBuildOrder = 0;
    for (var c = 1; c < 11; c++) {
        var recipeBuildHome = step.getReferenceTypeHome().getReferenceTypeByID(recipeBuildString + c);
        if (recipeBuildHome) {
            var recipeBuildRef = sourceObj.getReferences(recipeBuildHome);
            buildOrder = Number(buildOrder) + (Number(recipeBuildRef.size()) * 10);
            /*for(var d=0; d<recipeBuildRef.size(); d++){
                var currentBuildOrder = recipeBuildRef.get(d).getValue("a_mm_IngredientBuildOrder").getSimpleValue();
                if(Number(currentBuildOrder) > Number(maxBuildOrder))
                    maxBuildOrder = currentBuildOrder;
            }*/
        }
    }
    //buildOrder = Number(buildOrder) + Number(maxBuildOrder);
    //buildOrder = Number(buildOrder) - (Number(buildOrder)%10);
    for (var a = 1; a < 11; a++) {
        var targetExists = false;
        var recipeBuildHome = step.getReferenceTypeHome().getReferenceTypeByID(recipeBuildString + a);
        if (recipeBuildHome) {
            var recipeBuildRef = sourceObj.getReferences(recipeBuildHome);
            for (var b = 0; b < recipeBuildRef.size(); b++) {
                var rcRefInRecipeBuild = recipeBuildRef.get(b);
                var rcTargetInRecipeBuild = rcRefInRecipeBuild.getTarget();
                if (targetObj.getID() == rcTargetInRecipeBuild.getID()) {
                    targetExists = true;
                    break;
                }
            }
            if (targetExists == false) {
                var newRef = sourceObj.createReference(targetObj, recipeBuildHome);
                newRef.getValue("a_mm_TimeStamp").setSimpleValue(currentTimeStamp);
                newRef.getValue("a_mm_RecipeServingQuantity").setSimpleValue(targetObj.getValue("a_mm_BaseServingQuantity").getSimpleValue());
                newRef.getValue("a_mm_ServingQuantityUnitofMeasure").setSimpleValue(targetObj.getValue("a_mm_BaseServingQuantityUOM").getSimpleValue());
                newRef.getValue("a_mm_PreparedOrUnprepared").setLOVValueByID("1");
                newRef.getValue("a_mm_IngredientBuildOrder").setSimpleValue(buildOrder);
                if (subRCName != null)
                    newRef.getValue("a_mm_SubRecipeComponent").setSimpleValue(subRCName);
                else
                    newRef.getValue("a_mm_SubRecipeComponent").setSimpleValue(naValue);
                break;
            }
        }
    }
}

/*
Name:	newBMICreation_RFMIdentifier
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	28/01/2021
Purpose:	To create New BMI and SMI for RFM Scenarios MDMI-9315, Sprint-42
Version History:-
*/
function newBMICreation_RFMIdentifier(rcObject, bmiObject, step, lookupTableHome) {
    log.info("newBMICreation_RFMIdentifier");
    // Fetching general details
    var currentTimeStamp = new Date().getTime();
    var currentContext = step.getCurrentContext().getID();
    var currentUser = step.getCurrentUser().getName();
    var dformatDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(getCurrentDate(step, currentContext));
    var bmiToEventHome = step.getReferenceTypeHome().getReferenceTypeByID("BMIToEvent");
    var bmiToRCRefHome = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
    // Fetching RC related details
    var rcMarket = rcObject.getValue("a_mm_Market").getSimpleValue();
    var rcBSQ = rcObject.getValue("a_mm_BaseServingQuantity").getSimpleValue();
    var rcBSQUOM = rcObject.getValue("a_mm_BaseServingQuantityUOM").getSimpleValue();
    // New BMI Creation
    var bmiRoot = step.getProductHome().getProductByID("BMIHierarchy");
    var newBMI = bmiRoot.createProduct(null, "BaseMenuItem");
    log.info("newBMI: " + newBMI.getID());
    // Recipe Build reference creation
    var subRCs = rcObject.getChildren();
    if (subRCs.size() > 0) {
        for (var i = 0; i < subRCs.size(); i++) {
            var eachSubRC = subRCs.get(i);
            createBuildOrderReferences(newBMI, step, rcObject, currentTimeStamp, eachSubRC.getValue("a_mm_RecipeComponentName").getSimpleValue());
        }
    } else {
        createBuildOrderReferences(newBMI, step, rcObject, currentTimeStamp);
    }
    calculateRCBuild_CookedServQty_ServFact(newBMI, step);
    // Technical Recipe reference Creation
    try {
        var rcToBMIRef = newBMI.createReference(rcObject, bmiToRCRefHome);
        rcToBMIRef.getValue("a_mm_RecipeServingQuantity").setSimpleValue(rcBSQ);
        rcToBMIRef.getValue("a_mm_ServingQuantityUnitofMeasure").setSimpleValue(rcBSQUOM);
        rcToBMIRef.getValue("a_mm_PreparedOrUnprepared").setLOVValueByID("1");
        rcToBMIRef.getValue("a_mm_WasteInclusion").setLOVValueByID("0"); // 0 = "YES"
        if (rcMarket == "DE" || rcMarket == "FR") { // For Future Market Onboarding modify this code block: currently only for DE
            rcToBMIRef.getValue("a_mm_IncludeinSalesType").setLOVValueByID("B"); // B = Both (Eat In and Take Out)
        }

    } catch (e) {
        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
            //Target Already Referenced Exception
            log.info("Reference Already Linked.. ");
        }
        else {
            throw "Exception : " + e;
        }
    }
    calculateBMIToRC_CookedServQty_ServFact(newBMI, step);
    setCustomisationAttributeValues(newBMI, step, "BMIToRecipeComponent", lookupTableHome);
    // Supplier Tab population
    updateSuppFeasibility(newBMI, step, "AutoPopulateBothApprovals");
    // Event reference creation
    var eventHierarchy = step.getProductHome().getProductByID("EventHierarchy");
    var availableEventID = eventHierarchy.getValue("a_mm_CoreEventID").getSimpleValue();
    try {
        if (availableEventID != null && availableEventID != "") {
            var eventObj = step.getProductHome().getProductByID(availableEventID.trim());
            newBMI.createReference(eventObj, bmiToEventHome);
        }
    } catch (e) {
        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
            //Target Already Referenced Exception
            log.info("Reference Already Linked.. ");
        }
        else {
            throw "Exception : " + e;
        }
    }
    // BMI Menu Code population
    var bmiHierarchy = step.getProductHome().getProductByID("BMIHierarchy");
    var availableMenuCode = bmiHierarchy.getValue("a_mm_IncrementalMenuCode_" + rcMarket).getSimpleValue();
    var isBMIExists = null;
    if (availableMenuCode != null && availableMenuCode != "") {
        isBMIExists = step.getProductHome().getObjectByKey("BMI_Key", availableMenuCode + rcMarket + "-01-001");
        while (isBMIExists != null) {
            availableMenuCode = Number(availableMenuCode) + 1;
            isBMIExists = step.getProductHome().getObjectByKey("BMI_Key", availableMenuCode + rcMarket + "-01-001");
        }
        try {
            bmiHierarchy.getValue("a_mm_IncrementalMenuCode_" + rcMarket).setSimpleValue(Number(availableMenuCode));
        } catch (e) {
            throw "Available Menu Code range may have exceeded. Please contact PIM Support team.";
        }
        newBMI.getValue("a_mm_BMIMenuCode").setSimpleValue(availableMenuCode);
    }
    // Selling Option Classification linking
    var sellingOptLinkHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToSellingOption");
    var sellingOptClassification = step.getClassificationHome().getClassificationByID(rcMarket + "_1");
    if (sellingOptLinkHome != null && sellingOptClassification != null) {
        try {
            newBMI.createClassificationProductLink(sellingOptClassification, sellingOptLinkHome);
        } catch (e) {
            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                //Target Already Referenced Exception
                log.info("Reference Already Linked.. ");
            }
            else {
                throw "Exception : " + e;
            }
        }
    }
    // BMI general information population
    var rcName = rcObject.getValue("a_mm_RecipeComponentName").getSimpleValue();
    if (rcName == null)
        rcName = "";
    var bmiName = "RC - " + rcName;
    if (currentUser != null)
        newBMI.getValue("a_mm_Owner").setSimpleValue(currentUser); // ==> Owner
    newBMI.getValue("a_mm_CreationDate").setSimpleValue(dformatDate); // ==> Creation Date
    newBMI.getValue("a_mm_BMICreationDate").setSimpleValue(dformatDate); // ==> BMI Creation Date
    newBMI.getValue("a_mm_BMIName").setSimpleValue(bmiName); // ==> BMI Name
    newBMI.setName(bmiName); // ==> STEP Name
    newBMI.getValue("a_mm_BMIDescription").setSimpleValue(bmiName); // ==> BMI Description
    newBMI.getValue("a_mm_Market").setSimpleValue(rcMarket); // ==> Market
    newBMI.getValue("a_mm_PrePackagedItem").setSimpleValue("Yes"); // ==> Is It Pre-packaged Item
    newBMI.getValue("a_mm_F&PRequired").setSimpleValue("No"); // ==> F & P Required
    newBMI.getValue("a_mm_LegalApproval_BMIName").setSimpleValue("Yes"); // ==> Legal Approval Name
    newBMI.getValue("a_mm_CheckDeclaration").setSimpleValue("Yes, I agree"); // ==> Check Delcaration
    //newBMI.getValue("a_mm_SoldIndividually").setSimpleValue("ALC"); // ==> Selling Individually
    newBMI.getValue("a_mm_SoldIndividually").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_SoldIndividually").getListOfValuesValueByID("1").getValue()); // ==> Selling Individually
    newBMI.getValue("a_mm_BMIStage").setLOVValueByID("07"); // 07 = Launch Approved
    newBMI.getValue("a_mm_Status").setLOVValueByID("14"); // 14 = Launch Approved
    // Comments log population
    var rcMRINum = rcObject.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
    if (rcMRINum != null && rcMRINum != "")
        rcName = rcName + " - " + rcMRINum;
    var commentsLog = dformatDate + " - " + currentUser + "\n" +
        "Created for RFM records" + "\n" +
        "This BMI '" + bmiName + "' has been automatically created by PIM system in order to assign a Menu Code as the RFM Identifier for Recipe Component – ‘" + rcName + "'";
    newBMI.getValue("a_mm_CommentsLog").setSimpleValue(commentsLog + "\n" + "-------------");
    newBMI.getValue("a_mm_LastComment").setSimpleValue(commentsLog);
    newBMI.getValue("a_mm_EffectiveFromDate").setSimpleValue(dformatDate); // ==> Effective To Date
    if (rcMarket == "UK") { // For Future Market Onboarding modify this code block
        newBMI.getValue("a_mm_BMICategory").setSimpleValue("Others"); // ==> BMI Category for UK
        newBMI.getValue("a_mm_BMIProteinType").setSimpleValue("N/A"); // ==> BMI Protein Type for UK
        newBMI.getValue("a_mm_EffectiveToDate").setSimpleValue("2099-12-31"); // ==> Effective To Date
        newBMI.getValue("a_mm_LegalApproval_BMIDesc").setSimpleValue("Yes"); // ==> Legal Approval Description
    } else if (rcMarket == "DE") { // For Future Market Onboarding modify this code block
        newBMI.getValue("a_mm_BMICategory").setSimpleValue("Saucen & Dressings"); // ==> BMI Category for DE
        newBMI.getValue("a_mm_BMIProteinType").setSimpleValue("Others"); // ==> BMI Protein Type for UK
        newBMI.getValue("a_mm_EffectiveToDate").setSimpleValue("2100-01-01"); // ==> Effective To Date
    }
    // BMI Market classification reference creation
    var bmiToBMIMarketHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToBMIMarket");
    var bmiToBMIMarketClassi = step.getClassificationHome().getClassificationByID(rcMarket);
    try {
        newBMI.createClassificationProductLink(bmiToBMIMarketClassi, bmiToBMIMarketHome);
    } catch (e) {
        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
            //Target Already Referenced Exception
            log.info("Reference Already Linked.. ");
        }
        else {
            throw "Exception : " + e;
        }
    }
    newBMI.getValue("a_mm_RFMIdentifierFlag").setSimpleValue(rcObject.getID());
    log.info("RFM Identifier: " + newBMI.getValue("a_mm_RFMIdentifierFlag").getSimpleValue());
    approveObjectInAllContexts(newBMI, step);

    // SMI Creation
    newSMICreation_RFMIdentifier(rcObject, step, newBMI);
}

/*
Name:	checkEligibleRCs_RFMIdentifier
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	28/01/2021
Purpose:	To check whether single BMI-SMI combination is present for eligible RCs for RFM Scenarios MDMI-9315, Sprint-42
Version History:-
*/
function checkEligibleRCs_RFMIdentifier(rc, bmi, step, lookupTableHome) {
    var bmiHashSet = new java.util.HashSet("");
    var newBMISMIFlag = true;
    log.info("checkEligibleRCs_RFMIdentifier");
    var getRefedByProds = rc.getReferencedByProducts().toArray();
    for (var a = 0; a < getRefedByProds.length; a++) {
        var getRefdLink = getRefedByProds[a];
        var sourceBMI = getRefdLink.getSource();
        if ((getRefdLink.getReferenceTypeString() == "BMIToRecipeComponent" || getRefdLink.getReferenceTypeString() == "BMIToRecipeComponent_CanAdd") &&
            sourceBMI.getObjectType().getID() == "BaseMenuItem" && !bmiHashSet.contains(sourceBMI.getID())) {
            bmiHashSet.add(sourceBMI.getID());
            var bmiToThisRCRef = sourceBMI.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));
            log.info("sourceBMI is " + sourceBMI.getID() + " and the size of this RC ref is " + bmiToThisRCRef.size());
            if (bmiToThisRCRef.size() == 1) { // Checking Single BMI with this RC
                var getRefedByProdsOfBMI = sourceBMI.getReferencedByProducts().toArray();
                for (var b = 0; b < getRefedByProdsOfBMI.length; b++) {
                    var getRefdLinkOfBMI = getRefedByProdsOfBMI[b];
                    var sourceSMI = getRefdLinkOfBMI.getSource();
                    if (getRefdLinkOfBMI.getReferenceTypeString() == "SMIToBMI" && sourceSMI.getObjectType().getID() == "SoldMenuItem") {
                        var smiToThisBMIRef = sourceSMI.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI"));
                        log.info("sourceSMI is " + sourceSMI.getID() + " and the size of this RC ref is " + smiToThisBMIRef.size());
                        if (smiToThisBMIRef.size() == 1) { // Checking Single SMI with this BMI
                            newBMISMIFlag = false;
                            var thisSMIMenuCode = sourceSMI.getValue("a_mm_SMIMenuCode").getSimpleValue();
                            var rcMarket = rc.getValue("a_mm_Market").getSimpleValue();
                            if (thisSMIMenuCode != null && thisSMIMenuCode != "" && (rcMarket == "UK" || rcMarket == "DE"))
                                rc.getValue("a_mm_RFMIdentifier").setSimpleValue(thisSMIMenuCode);
                            log.info("thisSMIMenuCode: " + thisSMIMenuCode);
                            sourceBMI.getValue("a_mm_RFMIdentifierFlag").setSimpleValue(rc.getID());
                            sourceSMI.getValue("a_mm_RFMIdentifierFlag").setSimpleValue(sourceBMI.getID());
                            break;
                        }
                    }
                }
                if (newBMISMIFlag == false)
                    break;
            }
        }
    }
    if (newBMISMIFlag == true) { // Creation of new BMI-SMI when no single BMI-SMI is found
        log.info("newBMISMIFlag is " + newBMISMIFlag);
        newBMICreation_RFMIdentifier(rc, bmi, step, lookupTableHome);
    }
}

/*
Name:	fetchEligibleRCs_RFMIdentifier
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	28/01/2021
Purpose:	To fetch eligible RCs from BMI-RC and BMI-CanAddRC links for RFM Scenarios MDMI-9315, Sprint-42
Version History:-
1. Harshit Sharma - 10/02/2021 - Modified code as per MDMI-9543, to check Recipe Component Group by ID
*/
function fetchEligibleRCs_RFMIdentifier(bmiObj, step, bmiToRcRefID, lookupTableHome) {
    log.info("fetchEligibleRCs_RFMIdentifier");
    var bmiToRCRef = bmiObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(bmiToRcRefID));
    for (var i = 0; i < bmiToRCRef.size(); i++) {
        var checkFurtherFlag = false;
        var bmiToRC = bmiToRCRef.get(i);
        var rcObj = bmiToRC.getTarget();
        var rcGroup = rcObj.getValue("a_mm_RecipeComponentGroup").getID();
        if (rcGroup == "F") { // For Food type RC only
            var rcMarket = rcObj.getValue("a_mm_Market").getSimpleValue();
            var rfmIdentf = rcObj.getValue("a_mm_RFMIdentifier").getSimpleValue();
            if (rfmIdentf == null) {
                checkFurtherFlag = true;
            } else {
                var isSMIPresent = step.getProductHome().getObjectByKey("SMI_Key", rfmIdentf.trim() + rcMarket);
                log.info("isSMIPresent: " + isSMIPresent);
                if (isSMIPresent != null && isSMIPresent.getObjectType().getID() == "SoldMenuItem")
                    log.info("SMI is present with ID: " + isSMIPresent.getID());
                else
                    checkFurtherFlag = true;
            }
            if (checkFurtherFlag == true) {
                var maxServFact = bmiToRC.getValue("a_mm_MaxCustomisableQuantity").getSimpleValue();
                var chargeThreshold = bmiToRC.getValue("a_mm_PricingCharge").getSimpleValue();
                if (Number(chargeThreshold) < Number(maxServFact)) {
                    checkEligibleRCs_RFMIdentifier(rcObj, bmiObj, step, lookupTableHome);
                }
            }
        }
    }
}

/*--------------------------------------------------------------------------------------
Title:	Single BMI-SMI_RC scenario
Author: Rahul Choudhary(rahul.choudhary@us.mcd.com)
Company:Cognizant
Date:01/26/2021
Description: Code for creation of new SMI for  Single BMI-SMI_RC scenario : MDMI-9316
Assumptions:N/A
Version History : 
1) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
----------------------------------------------------------------------------------------*/

function newSMICreation_RFMIdentifier(rcObject, step, newBMI) {
    var currentContext = step.getCurrentContext().getID();
    var currentUser = step.getCurrentUser().getName();
    var dformatDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(getCurrentDate(step, currentContext));
    var rcMarket = rcObject.getValue("a_mm_Market").getSimpleValue();

    /*var bmiRoot = step.getProductHome().getProductByID("BMIHierarchy");
    var newBMI = bmiRoot.createProduct(null, "BaseMenuItem");*/

    var smiRoot = step.getProductHome().getProductByID("SMIHierarchy");
    var newSMI = smiRoot.createProduct(null, "SoldMenuItem");


    // Creation of SMI To SMI Market Classification link
    var smiToSMIMarketHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SMIToSMIMarket");
    var smiToSMIMarketClassification = step.getClassificationHome().getClassificationByID("DevelopmentSMI" + rcMarket);
    try {
        newSMI.createClassificationProductLink(smiToSMIMarketClassification, smiToSMIMarketHome);
        classifySMIBasedOnPG(newSMI, step);
    } catch (e) {
        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
            //Target Already Referenced Exception
            log.info("Reference Already Linked.. ");
        }
        else {
            throw "Exception : " + e;
        }
    }



    //log.info("Newly created SMI = " + newSMI.getID());
    var smiToBMIRefHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI");
    try {
        newSMI.createReference(newBMI, smiToBMIRefHome);
    } catch (e) {
        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
            //Target Already Referenced Exception
            log.info("Reference Already Linked.. ");
        }
        else {
            throw "Exception : " + e;
        }
    }


    var bmiName = newBMI.getValue("a_mm_BMIName").getSimpleValue();
    var rcName = rcObject.getValue("a_mm_RecipeComponentName").getSimpleValue();
    if (rcName == null)
        rcName = "";
    var smiName = "RC - " + rcName;
    newSMI.getValue("a_mm_Market").setSimpleValue(rcMarket);

    newSMI.getValue("a_mm_SMIName").setSimpleValue(smiName);
    //newSMI.getValue("a_mm_BMIName").setSimpleValue(bmiName);
    newSMI.getValue("a_mm_LongName").setSimpleValue(smiName.substring(0, "20"));
    newSMI.getValue("a_mm_SMIShortName").setSimpleValue(rcName.substring(0, "6"));
    newSMI.getValue("a_mm_RFMIdentifierFlag").setSimpleValue(newBMI.getID());
    //// Changes for MDMI - 9630 : Rahul Choudhary : BEGINS
    newSMI.getValue("a_mm_RFMProductClass").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_RFMProductClass").getListOfValuesValueByID("01").getValue());
    newSMI.getValue("a_mm_RFMProductCategory").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_RFMProductCategory").getListOfValuesValueByID("01").getValue());
    newSMI.getValue("a_mm_Saleable").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_BooleanTrueFalse").getListOfValuesValueByID("01").getValue());
    if (rcMarket == "DE" || rcMarket == "FR") { // For Future Market Onboarding modify this code block: currently only for DE
        newSMI.getValue("a_mm_Allowable").setSimpleValue(step.getListOfValuesHome().getListOfValuesByID("Lov_mm_BooleanTrueFalse").getListOfValuesValueByID("01").getValue());
    }
    //// Changes for MDMI - 9630 : Rahul Choudhary : ENDS
    var Dateformat = new java.text.SimpleDateFormat("MM/dd/yyyy");
    var sysDate = Dateformat.format(new java.util.Date());

    log.info("Current Date : " + sysDate);
    newSMI.getValue("a_mm_FullWaste").setLOVValueByID("1");
    newSMI.getValue("a_mm_NeedsNutritionApproval").setLOVValueByID("00");
    newSMI.getValue("a_mm_EffectiveFromDate").setSimpleValue(dformatDate);
    newSMI.getValue("a_mm_EffectiveToDate").setSimpleValue("2099-12-31");
    newSMI.getValue("a_mm_PMIXGroup").setLOVValueByID("02");
    newSMI.getValue("a_mm_ProductorNonProduct").setLOVValueByID("01");
    newSMI.getValue("a_mm_CreationDate").setSimpleValue(dformatDate);
    /* var commentsLog = dformatDate + " - " + currentUser + "\n" +
                    smiName+" is created to assign a SMI Menu Code in the RFM Identifier of the Recipe Component : " + rcObject.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();*/
    var commentsLog = dformatDate + " - " + currentUser + "\n" +
        "This SMI '" + smiName + "' has been automatically created by PIM system in order to assign a SMI Menu Code as the RFM Identifier for Recipe Component - '" + rcObject.getValue("a_mm_RecipeComponentName").getSimpleValue() + "' - '" + rcObject.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue() + "'";

    newSMI.getValue("a_mm_CommentsLog").setSimpleValue(commentsLog + "\n" + "-------------");
    newSMI.getValue("a_mm_LastComment").setSimpleValue(commentsLog);


    if (rcMarket == "UK") { // For Future Market Onboarding modify this code block
        newSMI.getValue("a_mm_SMICategory").setLOVValueByID("1");

    } else if (rcMarket == "DE") { // For Future Market Onboarding modify this code block
        newSMI.getValue("a_mm_SMICategory").setLOVValueByID("2");
        newSMI.getValue("a_mm_TimeServed").setLOVValueByID("2");
        // For setting the SMI Menu Code from the Linked BMI
        var set = new java.util.HashMap();
        var bmiMenuCode = newBMI.getValue("a_mm_BMIMenuCode").getSimpleValue();
        var smiKey = bmiMenuCode + rcMarket;
        var isSMIExists = step.getProductHome().getObjectByKey("SMI_Key", smiKey);
        if (isSMIExists != null) {
            log.info("value Exist");
            set.put("a_mm_SMIMenuCode", "");
        } else {
            log.info("Value doesn't exist");
            set.put("a_mm_SMIMenuCode", bmiMenuCode);
        }

        step.getKeyHome().updateUniqueKeyValues2(set, newSMI);

    }

    // Setting the reference Meta Data for SMIToBMI reference
    var smiReference = newSMI.getReferences(smiToBMIRefHome);
    for (var i = 0; i < smiReference.size(); i++) {
        var refBMI = smiReference.get(i);
        refBMI.getValue("a_mm_Factor").setSimpleValue("1");
        refBMI.getValue("a_mm_EffectiveFromDate").setSimpleValue(dformatDate);
        refBMI.getValue("a_mm_EffectiveToDate").setSimpleValue("2099-12-31");
    }

    //For pushing the newly created SMI to Enrich SMI state of SMI Workflow
    newSMI.startWorkflowByID("wf_mm_SMILaunchWorkflow", "New SMI Created for RFM Interface");

}

/*
Name:	createEntityRefsFromEntityChildren
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	08/02/2021
Purpose:	To create entity type references with the node by referring the entity type children underlined mentioned entity Object, MDMI-9612, Sprint-43
Version History:-
*/
function createEntityRefsFromEntityChildren(step, node, entityID, entityRefID) {
    var entityRefHome = step.getReferenceTypeHome().getReferenceTypeByID(entityRefID);
    var entityObjHome = step.getEntityHome().getEntityByID(entityID);
    var entityChildren = entityObjHome.getChildren();
    logger.info(entityChildren.size());
    for (var a = 0; a < entityChildren.size(); a++) {
        var eachEntityChild = step.getEntityHome().getEntityByID(entityChildren.get(a).getID());
        node.createReference(eachEntityChild, entityRefHome);
    }
}




/*--------------------------------------------------------------------------------------
Title:	
Author: Rahul Choudhary(rahul.choudhary@us.mcd.com)
Company:Cognizant
Date:   02/15/2021
Description: To the Lov value on attribute depending upon a particular context
Assumptions: N/A
Usage: 
Version History: 

----------------------------------------------------------------------------------------*/

function setLovValueBySpecificContext(node, step, attributeID, mappedLovAttribute, LovIdValue) {

    var market = node.getValue("a_mm_Market").getSimpleValue();

    if (market != null) {
        var marketSpecificContextID = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID(market).getValue();
        step.executeInContext(marketSpecificContextID, function (step) {
            var contextSpecGetObj = step.getObjectFromOtherManager(node);
            var valueToSet = step.getListOfValuesHome().getListOfValuesByID(mappedLovAttribute).getListOfValuesValueByID(LovIdValue).getValue();
            log.info("Value of the LOV from particular context " + valueToSet);
            contextSpecGetObj.getValue(attributeID).setSimpleValue(valueToSet);
        });
    }
}


/*
 * Name: UpdateSMIToRestaurantLinkOld
 * Author:	Kirubakaran Gajendran
 * Purpose:	Update SMI To Restaurant Link as part of MDMI-9554 in Sprint 43 - To RFM FEED
 Version History:-
 1) Suman Pan -- 10/03/2021 -- Added condition before approving SMI object
 2)Truncated method by Renaming and Added new method 'UpdateSMIToRestaurantLink'
 */
function UpdateSMIToRestaurantLinkOld(node, step) {

    try {

        var tContext = step.getCurrentContext().getID();
        var tCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(getCurrentDate(step, tContext));
        tCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tCurrentDate);
        tCurrentDate.setDate(tCurrentDate.getDate() + 1);
        log.info("tCurrentDate func " + tCurrentDate);
        var tomorrowDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tCurrentDate);


        var tLinkSMIToSMIGroup = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SMIToSMIGroup");
        var tSMIoRES = step.getReferenceTypeHome().getReferenceTypeByID("SMItoRestaurant");
        var tRESLinks = node.getReferences(tSMIoRES);

        if (tLinkSMIToSMIGroup) {

            var tRefSMIToSMIGroup = node.getClassificationProductLinks(tLinkSMIToSMIGroup).toArray();
            log.info("tRefSMIToSMIGroup func " + tRefSMIToSMIGroup.length);

            if (tRefSMIToSMIGroup.length > 0) {

                for (var i = 0; i < tRefSMIToSMIGroup.length; i++) {

                    var tSMIGroupObj = tRefSMIToSMIGroup[i];
                    var tSMIGroupObj1 = tRefSMIToSMIGroup[i].getClassification();

                    logger.info("tSMIGroupObj1 ID: " + tSMIGroupObj1.getID());

                    var tSMIGroupEffFromDate = tSMIGroupObj.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                    var tSMIGroupEffToDate = tSMIGroupObj.getValue("a_mm_EffectiveToDate").getSimpleValue();
                    log.info("tSMIGroupEffFromDate func " + tSMIGroupEffFromDate);
                    log.info("tSMIGroupEffToDate func " + tSMIGroupEffToDate);

                    //var SMIGEffFromDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tSMIGroupEffFromDate);
                    //var SMIGEffToDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tSMIGroupEffToDate);

                    var restInSMIGroup = tSMIGroupObj1.getValue("a_mm_RestaurantsLinkedMetaData").getSimpleValue() + "";
                    logger.info("restInSMIGroup: " + restInSMIGroup);
                    var restInSMI = node.getValue("a_mm_RestaurantsLinkedOnSMI").getSimpleValue();
                    logger.info("restInSMI: " + restInSMI);
                    var restFromSMIGroup = node.getValue("a_mm_LinkedRestFromSMIGroups").getSimpleValue();
                    logger.info(node.getID() + " - restFromSMIGroup: " + restFromSMIGroup);

                    if (restInSMIGroup != null && restInSMIGroup != "") {

                        var restInSMIGroupSplit = restInSMIGroup.split(",");
                        for (var a = 0; a < restInSMIGroupSplit.length; a++) {
                            var resInSMIGID = restInSMIGroupSplit[a] + "";
                            var restNode = step.getProductHome().getProductByID(resInSMIGID);
                            //logger.info("restNode ID: " + restNode.getID());


                            if (tRESLinks.size() > 0) {

                                logger.info("restInSMI: " + restInSMI + " - " + resInSMIGID);
                                for (var j = 0; j < tRESLinks.size(); j++) {

                                    var TarRest = tRESLinks.get(j).getTarget();


                                    if (!restFromSMIGroup.contains(TarRest.getID())) {


                                        logger.info("INVALID Restaurant : " + TarRest.getID());
                                        tRESLinks.get(j).getValue("a_mm_RFMRestaurantStatus").setSimpleValue("No");
                                        tRESLinks.get(j).getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(tomorrowDate);

                                    } else {

                                        try {

                                            var SMIToRESCreated = node.createReference(restNode, tSMIoRES);
                                            SMIToRESCreated.getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(tSMIGroupEffFromDate);
                                            SMIToRESCreated.getValue("a_mm_EffectiveToDate").setSimpleValue(tSMIGroupEffToDate);
                                            SMIToRESCreated.getValue("a_mm_RFMRestaurantStatus").setSimpleValue("Yes");

                                        } catch (e) {
                                            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                                //Target Already Referenced Exception
                                                log.info("Reference Already Linked.. ");
                                            }
                                            else {
                                                throw "Exception : " + e;
                                            }
                                        }

                                        if (TarRest.getID() == resInSMIGID) {

                                            var targetResEffFromDate = tRESLinks.get(j).getValue("a_mm_EffectFrmDtSMIToRest").getSimpleValue();
                                            var targetResEffToDate = tRESLinks.get(j).getValue("a_mm_EffectiveToDate").getSimpleValue();

                                            if (targetResEffFromDate != null && tSMIGroupEffFromDate != null) {
                                                targetResEffFromDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(targetResEffFromDate);
                                                var SMIGEffFromDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tSMIGroupEffFromDate);
                                                if (!targetResEffFromDate.before(SMIGEffFromDate)) {
                                                    tRESLinks.get(j).getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(tSMIGroupEffFromDate);
                                                }
                                            } else {
                                                tRESLinks.get(j).getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(tSMIGroupEffFromDate);
                                            }
                                            if (targetResEffToDate != null && tSMIGroupEffToDate != null) {
                                                targetResEffToDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(targetResEffToDate);
                                                var SMIGEffToDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tSMIGroupEffToDate);
                                                if (targetResEffToDate.before(SMIGEffToDate)) {
                                                    tRESLinks.get(j).getValue("a_mm_EffectiveToDate").setSimpleValue(tSMIGroupEffToDate);
                                                }
                                            } else {
                                                tRESLinks.get(j).getValue("a_mm_EffectiveToDate").setSimpleValue(tSMIGroupEffToDate);
                                            }
                                            logger.info(tRESLinks.get(j).getTarget().getID() + " - FINAL FROM DATE: " + tRESLinks.get(j).getValue("a_mm_EffectiveFromDate").getSimpleValue());
                                            logger.info(tRESLinks.get(j).getTarget().getID() + " - FINAL TO DATE: " + tRESLinks.get(j).getValue("a_mm_EffectiveToDate").getSimpleValue());

                                        }
                                    }
                                }

                            } else {

                                try {
                                    var SMIToRESCreated = node.createReference(restNode, tSMIoRES);
                                    SMIToRESCreated.getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(tSMIGroupEffFromDate);
                                    SMIToRESCreated.getValue("a_mm_EffectiveToDate").setSimpleValue(tSMIGroupEffToDate);
                                    SMIToRESCreated.getValue("a_mm_RFMRestaurantStatus").setSimpleValue("Yes");
                                } catch (e) {
                                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                        //Target Already Referenced Exception
                                        log.info("Reference Already Linked.. ");
                                    }
                                    else {
                                        throw "Exception : " + e;
                                    }
                                }
                            }

                        }
                    }

                }
                // Start of Version 1 //
                var smiStatus = node.getValue("a_mm_Status").getSimpleValue();
                if (smiStatus != null && ((!node.isInWorkflow("wf_mm_SMILaunchWorkflow") && !node.isInWorkflow("wf_mm_SMIMaintenance") && smiStatus != "Archived" && smiStatus != "Archival Pending" && smiStatus != "Inactive") || node.getValue("a_mm_Status").getID() == "6")) //node.getValue("a_mm_Status").getID() == "2" for MDMI-16579
                    approveBmirAndSmiPartially(node, step);
                // End of Version 1 //
            }
        }

    } catch (err) {
        log.info("Exception Caught in Deactivate SMI func: " + err);
        throw (err);
    }
}

// check the RC to be cloned and find its clone and then return the clone RC object
function cloneRC(masterBMI, cloneBMI, theRC, step) {
    var cloneRCObj = null;
    var cloneMarket = cloneBMI.getValue("a_mm_Market").getSimpleValue();
    var rcMarket = theRC.getValue("a_mm_Market").getSimpleValue();
    if (cloneMarket == rcMarket) {
        cloneRCObj = theRC;
    } else {
        var rcMultiMarketRefHome = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentMultiMarketReference");
        if (rcMultiMarketRefHome) {
            var rcMultiMarketRefs = theRC.getReferences(rcMultiMarketRefHome);
            for (var m = 0; m < rcMultiMarketRefs.size(); m++) {
                var rcInMultiRef = rcMultiMarketRefs.get(m).getTarget();
                var rcInMultiRefMarket = rcInMultiRef.getValue("a_mm_Market").getSimpleValue();
                if (cloneMarket == rcInMultiRefMarket) {
                    cloneRCObj = rcInMultiRef;
                    break;
                }
            }
            if (cloneRCObj == null) {
                var theRCName = theRC.getValue("a_mm_RecipeComponentName").getSimpleValue();
                var rcMenuCode = theRC.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
                var theRCGroup = theRC.getValue("a_mm_RecipeComponentGroup").getSimpleValue();
                var theRCFlag = theRC.getValue("a_mm_RecipeFlag").getSimpleValue();
                var theRCBSQ = theRC.getValue("a_mm_BaseServingQuantity").getSimpleValue();
                var theRCBSQUOM = theRC.getValue("a_mm_BaseServingQuantityUOM").getSimpleValue();
                var theRCSampleNum = theRC.getValue("a_mm_SampleNumber").getSimpleValue();
                var theRCServQty = theRC.getValue("a_mm_ServingFactor").getSimpleValue();
                var theRCIsItBun = theRC.getValue("a_mm_IsItaBun").getID();
                theRCName = rcMenuCode + "-" + theRCName;
                var draftRCRootHome = step.getProductHome().getProductByID("RecipeComponent_9");
                var newRC = draftRCRootHome.createProduct(null, "RecipeComponent");
                newRC.getValue("a_mm_RecipeComponentName").setSimpleValue(theRCName);
                newRC.setName(theRCName);
                newRC.getValue("a_mm_RecipeComponentGroup").setSimpleValue(theRCGroup);
                newRC.getValue("a_mm_RecipeFlag").setSimpleValue(theRCFlag);
                newRC.getValue("a_mm_BaseServingQuantity").setSimpleValue(theRCBSQ);
                newRC.getValue("a_mm_BaseServingQuantityUOM").setSimpleValue(theRCBSQUOM);
                newRC.getValue("a_mm_SampleNumber").setSimpleValue(theRCSampleNum);
                newRC.getValue("a_mm_IsItaBun").setLOVValueByID(theRCIsItBun);
                newRC.getValue("a_mm_ServingFactor").setSimpleValue(theRCServQty);
                if (theRCGroup != null && theRCGroup != "" && theRC.getValue("a_mm_RecipeComponentGroup").getID() != "F") {
                    newRC.getValue("a_mm_RCCreationUser").setLOVValueByID("PIMRole8");
                    newRC.getValue("a_mm_CookingFactor").setSimpleValue("1");
                }

                var newRCIsItBun = newRC.getValue("a_mm_IsItaBun").getID();
                if (newRCIsItBun == "00") {
                    for (var s = 0; s < 2; s++) {
                        var subRC = newRC.createProduct(null, "SubRecipeComponent");
                        if (s == 0)
                            subRC.setName("Crown");
                        if (s == 1)
                            subRC.setName("Heel");
                    }
                } else if (newRCIsItBun == "01") {
                    for (var t = 0; t < 3; t++) {
                        var subRC = newRC.createProduct(null, "SubRecipeComponent");
                        if (t == 0)
                            subRC.setName("Crown");
                        else if (t == 1)
                            subRC.setName("Club");
                        else
                            subRC.setName("Heel");
                    }
                } else {
                    //do nothing	
                }
                try {
                    var aHashMap = new java.util.HashMap();
                    aHashMap.put("a_mm_Market", cloneMarket);
                    log.info("aHashMap in cloneRC: " + aHashMap);
                    step.getKeyHome().updateUniqueKeyValues2(aHashMap, newRC);
                } catch (e) {
                    throw "Not able to update the market for RC: " + newRC + " in cloneRC: " + e;
                }
                var rcToRCMarketHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("RecipeComponentToRecipeMarket");
                var rcToRCMarket = newRC.getClassificationProductLinks(rcToRCMarketHome);
                for (var u = 0; u < rcToRCMarket.size(); u++) {
                    rcToRCMarket.get(u).delete();
                }
                var rcMarketClassification = "RecipeComponent" + cloneMarket;
                var rcMarketClassHome = step.getClassificationHome().getClassificationByID(rcMarketClassification);
                if (rcMarketClassHome)
                    newRC.createClassificationProductLink(rcMarketClassHome, rcToRCMarketHome);
                try {
                    newRC.createReference(theRC, rcMultiMarketRefHome);
                    theRC.createReference(newRC, rcMultiMarketRefHome);
                } catch (e) {
                    throw "Not able to create RC Multi Market Ref for RC: " + newRC + " in cloneRC: " + e;
                }
                cloneRCObj = newRC;
            }
        }
    }
    return cloneRCObj;
}

// Recipe Build reference creation starts here
function createRCbuildClone(masterBMI, cloneBMI, step) {
    for (var x = 1; x <= 10; x++) {
        var rcBuildID = "RecipeBuildOrder" + x;
        var rcBuildHome = step.getReferenceTypeHome().getReferenceTypeByID(rcBuildID);
        if (rcBuildHome) {
            var rcBuildRefs = masterBMI.getReferences(rcBuildHome);
            for (var y = 0; y < rcBuildRefs.size(); y++) {
                var rcBuildIns = rcBuildRefs.get(y);
                var rcBuildTarget = rcBuildIns.getTarget();
                var rcToBeUsed = cloneRC(masterBMI, cloneBMI, rcBuildTarget, step);
                if (rcToBeUsed != null) {
                    var subRCName = rcBuildIns.getValue("a_mm_SubRecipeComponent").getSimpleValue();
                    var servQtyUncooked = rcBuildIns.getValue("a_mm_RecipeServingQuantity").getSimpleValue();
                    var serQtyUOM = rcBuildIns.getValue("a_mm_ServingQuantityUnitofMeasure").getSimpleValue();
                    var preparedOrUnprepared = rcBuildIns.getValue("a_mm_PreparedOrUnprepared").getSimpleValue();
                    var ingreBuildOrder = rcBuildIns.getValue("a_mm_IngredientBuildOrder").getSimpleValue();
                    var notes = rcBuildIns.getValue("a_mm_Notes").getSimpleValue();
                    //var servQtyCooked = rcBuildIns.getValue("a_mm_ServingQuantityTechnical").getSimpleValue();
                    var timeStamp = rcBuildIns.getValue("a_mm_TimeStamp").getSimpleValue();
                    try {
                        var newRefCreated = cloneBMI.createReference(rcToBeUsed, rcBuildHome);
                        newRefCreated.getValue("a_mm_SubRecipeComponent").setSimpleValue(subRCName);
                        newRefCreated.getValue("a_mm_RecipeServingQuantity").setSimpleValue(servQtyUncooked);
                        newRefCreated.getValue("a_mm_ServingQuantityUnitofMeasure").setSimpleValue(serQtyUOM);
                        newRefCreated.getValue("a_mm_PreparedOrUnprepared").setSimpleValue(preparedOrUnprepared);
                        newRefCreated.getValue("a_mm_IngredientBuildOrder").setSimpleValue(ingreBuildOrder);
                        newRefCreated.getValue("a_mm_Notes").setSimpleValue(notes);
                        //newRefCreated.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(servQtyCooked);
                        newRefCreated.getValue("a_mm_TimeStamp").setSimpleValue(timeStamp);
                    } catch (e) {
                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                            //Target Already Referenced Exception
                            log.info("Reference Already Linked.. ");
                        }
                        else {
                            throw "Exception : " + e;
                        }
                    }
                } else {
                    log.info("function: createRCbuildClone--> no 'rcToBeUsed' ie returned");
                }
            }
        }
    }
}

// Packaging & Technical Recipe reference starts here
function createRCrefsClone(masterBMI, cloneBMI, step) {
    var bmiToPkgRCRefHome = step.getReferenceTypeHome().getReferenceTypeByID("BMIToPackagingComponent");
    var bmiToPkgRCRefs = masterBMI.getReferences(bmiToPkgRCRefHome);
    for (var i = 0; i < bmiToPkgRCRefs.size(); i++) {
        var bmiToPkgRCIns = bmiToPkgRCRefs.get(i);
        var pkgRCTarget = bmiToPkgRCIns.getTarget();
        var rcToBeUsed = cloneRC(masterBMI, cloneBMI, pkgRCTarget, step);
        if (rcToBeUsed != null) {
            var servQtyUncooked = bmiToPkgRCIns.getValue("a_mm_RecipeServingQuantity").getSimpleValue();
            var serQtyUOM = bmiToPkgRCIns.getValue("a_mm_ServingQuantityUnitofMeasure").getSimpleValue();
            var preparedOrUnprepared = bmiToPkgRCIns.getValue("a_mm_PreparedOrUnprepared").getSimpleValue();
            var notes = bmiToPkgRCIns.getValue("a_mm_Notes").getSimpleValue();
            try {
                var newRefCreated = cloneBMI.createReference(rcToBeUsed, bmiToPkgRCRefHome);
                newRefCreated.getValue("a_mm_RecipeServingQuantity").setSimpleValue(servQtyUncooked);
                newRefCreated.getValue("a_mm_ServingQuantityUnitofMeasure").setSimpleValue(serQtyUOM);
                newRefCreated.getValue("a_mm_PreparedOrUnprepared").setSimpleValue(preparedOrUnprepared);
                newRefCreated.getValue("a_mm_Notes").setSimpleValue(notes);
            } catch (e) {
                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                    //Target Already Referenced Exception
                    log.info("Reference Already Linked.. ");
                }
                else {
                    throw "Exception : " + e;
                }
            }
        } else {
            log.info("function: createRCrefsClone--> no 'rcToBeUsed' is returned for pkg rcs");
        }
    }
    var bmiToRCRefHome = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
    var bmiToRCRefs = masterBMI.getReferences(bmiToRCRefHome);
    for (var j = 0; j < bmiToRCRefs.size(); j++) {
        var bmiToRCIns = bmiToRCRefs.get(j);
        var foodRCTarget = bmiToRCIns.getTarget();
        var rcToBeUsed = cloneRC(masterBMI, cloneBMI, foodRCTarget, step);
        if (rcToBeUsed != null) {
            var servQtyUncooked = bmiToRCIns.getValue("a_mm_RecipeServingQuantity").getSimpleValue();
            var serQtyUOM = bmiToRCIns.getValue("a_mm_ServingQuantityUnitofMeasure").getSimpleValue();
            var preparedOrUnprepared = bmiToRCIns.getValue("a_mm_PreparedOrUnprepared").getSimpleValue();
            //var servQtyCooked = bmiToRCIns.getValue("a_mm_ServingQuantityTechnical").getSimpleValue();
            //var servFactor = bmiToRCIns.getValue("a_mm_ServingFactor").getSimpleValue();
            var notes = bmiToRCIns.getValue("a_mm_Notes").getSimpleValue();
            var wasteIncl = bmiToRCIns.getValue("a_mm_WasteInclusion").getSimpleValue();
            var includeInSalesType = bmiToRCIns.getValue("a_mm_IncludeinSalesType").getSimpleValue();
            try {
                var newRefCreated = cloneBMI.createReference(rcToBeUsed, bmiToRCRefHome);
                newRefCreated.getValue("a_mm_RecipeServingQuantity").setSimpleValue(servQtyUncooked);
                newRefCreated.getValue("a_mm_ServingQuantityUnitofMeasure").setSimpleValue(serQtyUOM);
                newRefCreated.getValue("a_mm_PreparedOrUnprepared").setSimpleValue(preparedOrUnprepared);
                //newRefCreated.getValue("a_mm_ServingQuantityTechnical").setSimpleValue(servQtyCooked);
                //newRefCreated.getValue("a_mm_ServingFactor").setSimpleValue(servFactor);
                newRefCreated.getValue("a_mm_Notes").setSimpleValue(notes);
                newRefCreated.getValue("a_mm_WasteInclusion").setSimpleValue(wasteIncl);
                newRefCreated.getValue("a_mm_IncludeinSalesType").setSimpleValue(includeInSalesType);
            } catch (e) {
                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                    //Target Already Referenced Exception
                    log.info("Reference Already Linked.. ");
                }
                else {
                    throw "Exception : " + e;
                }
            }
        } else {
            log.info("function: createRCrefsClone--> no 'rcToBeUsed' is returned for food rcs");
        }
    }
}

//copyDeclaredRc
function copyDeclaredRc(node, step, VBMIObj) {
    var tCategory = node.getValue("a_mm_BMICategory").getSimpleValue();
    var tPISEng = node.getValue("a_mm_IngredientStatementX").getSimpleValue();
    var tPISGer = node.getValue("a_mm_IngredientStatementGermanX").getSimpleValue();
    VBMIObj.getValue("a_mm_BMICategory").setSimpleValue(tCategory);
    VBMIObj.getValue("a_mm_IngredientStatementX").setSimpleValue(tPISEng);
    VBMIObj.getValue("a_mm_IngredientStatementGermanX").setSimpleValue(tPISGer);

    var tBMIToDecRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToDeclaredRecipeComponent"));
    if (!tBMIToDecRef.isEmpty()) {
        var nutrgrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_DeclaredNutritionalValues");
        var nutratt = nutrgrp.getAllAttributes();
        var itr = nutratt.iterator();
        for (var m = 0; m < tBMIToDecRef.size(); m++) {
            var tRCName = tBMIToDecRef.get(m).getValue("a_mm_RecipeComponentName").getSimpleValue();
            var tServingSize = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeRounded").getSimpleValue();
            var tServingUOM = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeUOM").getSimpleValue();
            var tServingSizeX = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeX").getSimpleValue();
            var tServingUOMX = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeUOMX").getSimpleValue();
            var tMerlinStatus = tBMIToDecRef.get(m).getValue("a_mm_MerlinStatus").getSimpleValue();
            var tMerlinSpec = tBMIToDecRef.get(m).getValue("a_mm_SpecificationNumber").getSimpleValue();
            var tMerlinIssue = tBMIToDecRef.get(m).getValue("a_mm_IssueNumber").getSimpleValue();
            var tMerlinURL = tBMIToDecRef.get(m).getValue("a_mm_MerlinSpecURL").getSimpleValue();
            var tDecNutScore = tBMIToDecRef.get(m).getValue("a_mm_DeclaredNutritionSource").getSimpleValue();
            var tDelta = tBMIToDecRef.get(m).getValue("a_mm_DeltaX").getSimpleValue();
            var tPisEng = tBMIToDecRef.get(m).getValue("a_mm_IngredientStatementX").getSimpleValue();
            var tPisEngLocal = tBMIToDecRef.get(m).getValue("a_mm_IngredientStatementGermanX").getSimpleValue();
            var tlastupdate = tBMIToDecRef.get(m).getValue("a_mm_LastUpdatedDateX").getSimpleValue();
            var tDecRC = tBMIToDecRef.get(m).getTarget();
            var tRMRI = tDecRC.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
            try {
                var VBMIToDecRef = VBMIObj.createReference(tDecRC, "BMIToDeclaredRecipeComponent");
                VBMIToDecRef.getValue("a_mm_RecipeComponentName").setSimpleValue(tRCName);
                VBMIToDecRef.getValue("a_mm_ServingSizeRounded").setSimpleValue(tServingSize);
                VBMIToDecRef.getValue("a_mm_ServingSizeUOM").setSimpleValue(tServingUOM);
                VBMIToDecRef.getValue("a_mm_ServingSizeX").setSimpleValue(tServingSizeX);
                VBMIToDecRef.getValue("a_mm_ServingSizeUOMX").setSimpleValue(tServingUOMX);
                VBMIToDecRef.getValue("a_mm_MerlinStatus").setSimpleValue(tMerlinStatus);
                VBMIToDecRef.getValue("a_mm_SpecificationNumber").setSimpleValue(tMerlinSpec);
                VBMIToDecRef.getValue("a_mm_IssueNumber").setSimpleValue(tMerlinIssue);
                VBMIToDecRef.getValue("a_mm_MerlinSpecURL").setSimpleValue(tMerlinURL);
                VBMIToDecRef.getValue("a_mm_DeclaredNutritionSource").setSimpleValue(tDecNutScore);
                VBMIToDecRef.getValue("a_mm_DeltaX").setSimpleValue(tDelta);
                VBMIToDecRef.getValue("a_mm_IngredientStatementX").setSimpleValue(tPisEng);
                VBMIToDecRef.getValue("a_mm_IngredientStatementGermanX").setSimpleValue(tPisEngLocal);
                VBMIToDecRef.getValue("a_mm_LastUpdatedDateX").setSimpleValue(tlastupdate);
                VBMIToDecRef.getTarget().getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(tRMRI);
                while (itr.hasNext()) {
                    var attribute = itr.next().getID();
                    VBMIToDecRef.getValue(attribute).setSimpleValue(tBMIToDecRef.get(m).getValue(attribute).getSimpleValue());
                }
                calculateNutScoreRCGridFromTargetRC(VBMIObj, step);
                pimNutrLib.calculateNutritionScoreBMI(VBMIObj, step, "BMIToRecipeComponent", "ag_mm_NutritionalValues", null);
                pimNutrLib.calculateNutritionScoreBMI(VBMIObj, step, "BMIToDeclaredRecipeComponent", "ag_mm_NutritionalValues", "Declared");

                pimNutrLib.setBMIToDeclaredReferenceValues(step, node, VBMIObj, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContainsX", "a_mm_AllergenMayContainsX");
                pimNutrLib.populateAllergenSensitivityMultiValuedAttribute(step, VBMIObj, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContainsX", "a_mm_AllergenMayContainsX", true, "Lov_mm_AllergenValues");
                pimNutrLib.setAllergenStatements_New(VBMIObj, step, null, "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenValues");

                pimNutrLib.setAllergenStatements_Local(VBMIObj, step, null, "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenLocale");
                pimNutrLib.setAllergenStatements_New(VBMIObj, step, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenValues");
                pimNutrLib.setAllergenStatements_Local(VBMIObj, step, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenLocale");
                VBMIObj.getValue("a_mm_AllergenContains").setSimpleValue(node.getValue("a_mm_AllergenContains").getSimpleValue());
                VBMIObj.getValue("a_mm_AllergenMayContains").setSimpleValue(node.getValue("a_mm_AllergenMayContains").getSimpleValue());
            } catch (e) {
                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                    //Target Already Referenced Exception
                    log.info("Reference Already Linked.. ");
                }
                else {
                    throw "Exception : " + e;
                }
            }
        }
    }
}

/*Name:	     setBMIVersion
Author:	     Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	     05/03/2021
Purpose:	 Newly BMI created based on BMI Maintenance type as per MDMI-9635
Applicability: During BMI Maintenance
Version History:-
1) Suman Pan -- 15/05/2021 -- Added parameter "activity" to allow the user to maintain existing BMIs, MDMI-10159, Sprint-47
2) Neethu J -- 27/04/2022 -- Added Copy attributes and references as part of MDMI-11831

*/

function setBMIVersion(node, step, tEffectiveFromDate, tchoose, activity) {

    var tFlagCheck = null;
    var tBMIKey = null;
    var tBMICode = node.getValue("a_mm_BMIMenuCode").getSimpleValue();
    var tMarket = node.getValue("a_mm_Market").getSimpleValue();
    var tBMIStage = node.getValue("a_mm_BMIStage").getSimpleValue();
    //var tEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
    var tBMIName = node.getValue("a_mm_BMIName").getSimpleValue();
    var tBMIInternalName = node.getValue("a_mm_BMIInternalName").getSimpleValue(); //Added as part of MDMI-10653 Amit Kumar
    var tBMIStatus = node.getValue("a_mm_Status").getSimpleValue();
    var tBMIDesc = node.getValue("a_mm_BMIDescription").getSimpleValue();
    var tBMIProteinType = node.getValue("a_mm_BMIProteinType").getSimpleValue();
    var variantorVersion = node.getValue("a_mm_VariantOrVersion").getSimpleValue();
    var versionNumber = node.getValue("a_mm_BMIVersionNumber").getSimpleValue();
    var variantNumber = node.getValue("a_mm_VariantNumber").getSimpleValue();
    var replacementBMIOption = node.getValue("a_mm_ReplacementBMIOption").getSimpleValue();
    var typeOfChange = node.getValue("a_mm_TypeOfChange").getSimpleValue();
    var tvariantName = node.getValue("a_mm_VariantName").getSimpleValue();
    var tmaintenanceReason = node.getValue("a_mm_MaintenanceReason").getSimpleValue();
    tBMIInternalName = tBMICode + "-" + tBMIInternalName;
    //START: MDMI-11831
    var tApprovedDeclaration = node.getValue("a_mm_ApprovedDeclaration").getSimpleValue();
    var tHotHoldApproval = node.getValue("a_mm_HotHoldApproval").getSimpleValue();
    var tSoldIndiviaually = node.getValue("a_mm_SoldIndividually").getSimpleValue();
    //END: MDMI-11831

    var varID = ""
    if (variantorVersion) {
        varID = node.getValue("a_mm_VariantOrVersion").getLOVValue().getID();
        /*if(varID == "01"){
            variantNumber++
            for(var s=0; variantNumber.toString().length<2; s++){
                variantNumber = "0" + variantNumber;
            }
        }else{
            versionNumber++
            for(var s=0; versionNumber.toString().length<3; s++){
                versionNumber = "0" + versionNumber;
            }
        }*/
    }
    var currentContext = step.getCurrentContext().getID();
    var dformatDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(getCurrentDate(step, currentContext));

    if (tBMICode != null && tMarket != null && variantNumber != null && versionNumber != null) {
        //tBMIKey = tBMICode + tMarket + "-" + variantNumber + "-" + versionNumber;
        //var ExistingBMIObj = step.getProductHome().getObjectByKey("BMI_Key", tBMIKey);
        //log.info("ExistingBMIObj " + tBMIKey);
        var attrInstance = step.getAttributeHome().getAttributeByID("a_mm_BMIMenuCode");
        var searchQuery = new com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification(com.stibo.core.domain.Product, attrInstance, tBMICode);
        var searchResults = step.getHome(com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome).querySingleAttribute(searchQuery).asList(100);
        var ExistingBMIObj = null;


        if (ExistingBMIObj == null || varID == "01") {
            if (activity == "Create_New_BMI") {
                var bmiRoot = step.getProductHome().getProductByID("BMIHierarchy");
                // try {

                var newBMI = bmiRoot.createProduct(null, "BaseMenuItem");
                tFlagCheck = true;
                newBMI.getValue("a_mm_BMIName").setSimpleValue(tBMIName);
                newBMI.setName(tBMIInternalName); //Added as part of MDMI-10653 Amit Kumar
                newBMI.getValue("a_mm_BMIInternalName").setSimpleValue(tBMIInternalName); //Added as part of MDMI-10653 Amit Kumar
                if (varID == "02") {
                    newBMI.getValue("a_mm_VariantName").setSimpleValue(tvariantName);
                }
                newBMI.getValue("a_mm_Market").setSimpleValue(tMarket);
                newBMI.getValue("a_mm_BMIMenuCode").setSimpleValue(tBMICode);
                newBMI.getValue("a_mm_Status").setLOVValueByID("1");
                newBMI.getValue("a_mm_BMIStage").setLOVValueByID("01");
                newBMI.getValue("a_mm_BMIVersionDate").setSimpleValue(tEffectiveFromDate);

                newBMI.getValue("a_mm_MarketStatus").setLOVValueByID("03");

                if (varID == "02") {
                    newBMI.getValue("a_mm_ReplacementBMIOption").setSimpleValue(replacementBMIOption);
                }
                if (tchoose == "01" || tchoose == "02") {
                    newBMI.getValue("a_mm_TypeOfChange").setLOVValueByID(tchoose); //MDMI-17525
                }
                newBMI.getValue("a_mm_VariantOrVersion").setSimpleValue(variantorVersion);
                newBMI.getValue("a_mm_BMIDescription").setSimpleValue(tBMIDesc);
                newBMI.getValue("a_mm_EffectiveToDate").setSimpleValue("2099-12-31");
                newBMI.getValue("a_mm_EffectiveFromDate").setSimpleValue(tEffectiveFromDate);
                newBMI.getValue("a_mm_BMIVersionDate").setSimpleValue(tEffectiveFromDate);
                newBMI.getValue("a_mm_BMIProteinType").setSimpleValue(tBMIProteinType);
                newBMI.getValue("a_mm_CreationDate").setSimpleValue(dformatDate); // ==> Creation Date
                newBMI.getValue("a_mm_BMICreationDate").setSimpleValue(dformatDate);
                newBMI.getValue("a_mm_MaintenanceReason").setSimpleValue(tmaintenanceReason);

                //***********************************//Start MDMI-11831 //***********************************************
                newBMI.getValue("a_mm_ApprovedDeclaration").setSimpleValue(tApprovedDeclaration);
                newBMI.getValue("a_mm_HotHoldApproval").setSimpleValue(tHotHoldApproval);
                newBMI.getValue("a_mm_SoldIndividually").setSimpleValue(tSoldIndiviaually);
                newBMI.getValue("a_mm_AllergenContains").setSimpleValue(node.getValue("a_mm_AllergenContains").getSimpleValue());
                newBMI.getValue("a_mm_AllergenMayContains").setSimpleValue(node.getValue("a_mm_AllergenMayContains").getSimpleValue());



                var attrgrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_CopyBMItoVersionOrVariant");

                //Copy attributes
                log.info("++++++++++ COPY ATTRIBUTES ++++++++++++++++++");
                var attr = attrgrp.getAllAttributes();
                var itr = attr.iterator();
                while (itr.hasNext()) {
                    var attribute = itr.next().getID();
                    newBMI.getValue(attribute).setSimpleValue(node.getValue(attribute).getSimpleValue());
                    log.info(attribute + ":" + node.getValue(attribute).getSimpleValue() + ":" + newBMI.getValue(attribute).getSimpleValue());
                }

                //Copy references
                var refTypes = attrgrp.getLinkTypes();
                var itr = refTypes.iterator();
                while (itr.hasNext()) {
                    var refType = itr.next().getID();
                    var tReference = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(refType));
                    if (!tReference.isEmpty()) {
                        for (var l = 0; l < tReference.size(); l++) {
                            var tReferenceTar = tReference.get(l).getTarget();
                            try {
                                newBMI.createReference(tReferenceTar, refType);
                            } catch (e) {
                                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                    //Target Already Referenced Exception
                                    log.info("Reference Already Linked.. ");
                                }
                                else {
                                    throw "Exception : " + e;
                                }
                            }
                        }
                    }
                }

                //********************************************//End MDMI-11831 //**************************************
                //Comment below as part of MDMI-11831
                /*
                        /// For populating the Image : Rahul C : BEGINS
                    	
                        var tBMIEvents = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToEvent"));
                        for (var l = 0; l < tBMIEvents.size(); l++) {
                            var tBMIEvent = tBMIEvents.get(l).getTarget();
                            try {
                                newBMI.createReference(tBMIEvent, "BMIToEvent");
                            } catch (err) {
                                log.info("Already Present BMIToEvent " + err);
                            }
                        }
    
                        var tBMIProImg = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("PrimaryProductImage"));
                        if (!tBMIProImg.isEmpty()) {
                            for (var l = 0; l < tBMIProImg.size(); l++) {
                                var tBMIProImgTar = tBMIProImg.get(l).getTarget();
                                try {
                                    newBMI.createReference(tBMIProImgTar, "PrimaryProductImage");
                                } catch (err) {
                                    log.info("Already Present UploadProductImage " + err);
                                }
                            }
                        }
                        // For populating the Image : Rahul C : ENDS
                */
                //End of commenting as part of MDMI-11831

                var tBMIVersionRef = node.createReference(newBMI, "BMIToBMIVersion");
                // function Added for BMI Versions BiDirectional Link : Rahul C
                try {

                    newBMI.createReference(node, "BMIToBMIVersion");
                    newBMI.createReference(newBMI, "BMIToBMIVersion");
                    node.createReference(node, "BMIToBMIVersion");



                } catch (e) {
                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                        //Target Already Referenced Exception
                        log.info("Reference Already Linked.. ");
                    }
                    else {
                        throw "Exception : " + e;
                    }
                }
                createBiDirectionalBMIVersionLink(node, step, newBMI);
                setBMIPriceGroupValues(newBMI, node, step);
                //  function Added for BMI Versions BiDirectional Link : Rahul C



                var bmiToBMIMarketHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToBMIMarket");
                var bmiToBMIMarket = newBMI.getClassificationProductLinks(bmiToBMIMarketHome);
                for (var b = 0; b < bmiToBMIMarket.size(); b++) {
                    bmiToBMIMarket.get(b).delete();

                }
                var bmiMarketClassification = tMarket;
                var bmiMarketClassHome = step.getClassificationHome().getClassificationByID(bmiMarketClassification);
                if (bmiMarketClassHome) {
                    newBMI.createClassificationProductLink(bmiMarketClassHome, bmiToBMIMarketHome);

                }
                createRCbuildClone(node, newBMI, step);
                createRCrefsClone(node, newBMI, step);
                calculateBMIToRC_CookedServQty_ServFact(newBMI, step);
                calculateRCBuild_CookedServQty_ServFact(newBMI, step);
                copyDeclaredRc(node, step, newBMI);
                /////////////////// function Added for BMI Versions shuffling  : Rahul C

                createBMIVersion(node, step);
                /////////////////// function Added for BMI Versions shuffling  : Rahul C

                tBMIVersionRef.getValue("a_mm_EffectiveFromDate").setSimpleValue(tEffectiveFromDate);
                //tBMIVersionRef.getValue("a_mm_Status").setLOVValueByID("3"); for MDMI-16579
                if (!newBMI.isInWorkflow("wf_mm_BMIReplacement")) {

                    newBMI.startWorkflowByID("wf_mm_BMIReplacement", "Maintained by Food/Havi User");

                    log.info("New BMIs initiated to BMI Maintenance Workflow");
                }

                var bmiRCRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));
                var versionBMIRCRef = newBMI.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));
                //log.info(bmiRCRef.size());
                for (var i = 0; i < bmiRCRef.size(); i++) {

                    var bmiRCrefobj = bmiRCRef.get(i);
                    var rcObj = bmiRCrefobj.getTarget().getID();
                    for (var j = 0; j < versionBMIRCRef.size(); j++) {
                        var versionBMIRCrefobj = versionBMIRCRef.get(j);
                        if (versionBMIRCrefobj.getTarget().getID() == rcObj) {

                            versionBMIRCrefobj.getValue("a_mm_PurchasingApproval").setSimpleValue(bmiRCrefobj.getValue("a_mm_PurchasingApproval").getSimpleValue());
                            versionBMIRCrefobj.getValue("a_mm_QAApproval").setSimpleValue(bmiRCrefobj.getValue("a_mm_QAApproval").getSimpleValue());
                            //change done as part of MDMI-16663-start
                            versionBMIRCrefobj.getValue("a_mm_IncludeinSalesType").setSimpleValue(bmiRCrefobj.getValue("a_mm_IncludeinSalesType").getSimpleValue());
                            versionBMIRCrefobj.getValue("a_mm_WasteInclusion").setSimpleValue(bmiRCrefobj.getValue("a_mm_WasteInclusion").getSimpleValue());
                            //change done as part of MDMI-16663-end
                        }
                    }

                }
                //change done as part of MDMI-16663-start
                var bmiRCRefPkg = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToPackagingComponent"));
                var versionBMIRCRefPkg = newBMI.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToPackagingComponent"));
                for (var i = 0; i < bmiRCRefPkg.size(); i++) {
                    var bmiRCrefobj = bmiRCRefPkg.get(i);
                    var rcObj = bmiRCrefobj.getTarget().getID();
                    for (var j = 0; j < versionBMIRCRefPkg.size(); j++) {
                        var versionBMIRCrefobj = versionBMIRCRefPkg.get(j);
                        if (versionBMIRCrefobj.getTarget().getID() == rcObj) {
                            versionBMIRCrefobj.getValue("a_mm_IncludeinSalesType").setSimpleValue(bmiRCrefobj.getValue("a_mm_IncludeinSalesType").getSimpleValue());
                            versionBMIRCrefobj.getValue("a_mm_WasteInclusion").setSimpleValue(bmiRCrefobj.getValue("a_mm_WasteInclusion").getSimpleValue());
                            versionBMIRCrefobj.getValue("a_mm_Notes").setSimpleValue(bmiRCrefobj.getValue("a_mm_Notes").getSimpleValue());
                        }
                    }


                } //change done as part of MDMI-16663-end
                return newBMI;
            }
            log.info(" 123 ENTERING tcheck ")
        } else {
            tFlagCheck = false;
            log.info("tFlagCheckExistingBMIObj " + ExistingBMIObj);
        }
    }
    return tFlagCheck;
}




/*
Name: 	createBiDirectionalBMIVersionLink
Author: Rahul Choudhary (rahul.choudhary.@us.mcd.com)
Date: 	05/03/2021  
Purpose: To create the bidirectional BMI Versions link for BMIToBMIVersion Reference
Version History :-

*/
function createBiDirectionalBMIVersionLink(node, step, maintainedBMI) {

    var bmiVersionReference = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToBMIVersion"));


    if (bmiVersionReference.size() > 0) {
        log.info("BMI Verisons already exist");
        var listOfBMIVersions = new java.util.ArrayList();
        for (var i = 0; i < bmiVersionReference.size(); i++) {
            var previousBMIVersionObject = null;
            var bmiVersionID = bmiVersionReference.get(i).getTarget().getID();
            var maintainedBMIID = maintainedBMI.getID();
            if (bmiVersionID != maintainedBMIID) {
                var previousBMIVersionObject = step.getProductHome().getProductByID(bmiVersionID);
                if (previousBMIVersionObject != null) {
                    try {
                        maintainedBMI.createReference(previousBMIVersionObject, "BMIToBMIVersion");
                        previousBMIVersionObject.createReference(maintainedBMI, "BMIToBMIVersion");
                    } catch (e) {
                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                            //Target Already Referenced Exception
                            log.info("Reference Already Linked.. ");
                        }
                        else {
                            throw "Exception : " + e;
                        }
                    }
                }
            }
        }
    }

}


/*
Name: 	createBMIVersion
Author: Rahul Choudhary (rahul.choudhary.@us.mcd.com)
Date: 	05/03/2021  
Purpose: To create BMI Versions while maintaining a BMI with the chosen option as Change in Recipe or Packaging
Version History :-

*/
function createBMIVersion(node, step) {
    var verNum = "001"
    var varNum = "01"
    var blankNumber = ""
    var variantorVersion = node.getValue("a_mm_VariantOrVersion").getLOVValue();
    var nodeVarNumber = node.getValue("a_mm_VariantNumber").getSimpleValue();
    var tRef = step.getReferenceTypeHome().getReferenceTypeByID("BMIToBMIVersion");
    var versionReferences = node.getReferences(tRef);

    for (var i = 0; i < versionReferences.size(); i++) {
        var refObj = versionReferences.get(i).getTarget();
        var highestVerNum = refObj.getValue("a_mm_BMIVersionNumber").getSimpleValue();
        var highestVarNum = refObj.getValue("a_mm_VariantNumber").getSimpleValue();
        if (highestVerNum && highestVarNum) {
            if (nodeVarNumber == highestVarNum && Number(highestVerNum) > Number(verNum))
                verNum = highestVerNum
            if (Number(highestVarNum) > Number(varNum))
                varNum = highestVarNum
        } else {
            blankNumber = refObj.getID();
        }
    }

    if (variantorVersion) {
        var varId = variantorVersion.getID();
        if (varId == "01") {
            varNum++
            for (var s = 0; varNum.toString().length < 2; s++) {
                varNum = "0" + varNum;
            }
            verNum = "001";
        } else {
            verNum++
            for (var s = 0; verNum.toString().length < 3; s++) {
                verNum = "0" + verNum;
            }
            varNum = node.getValue("a_mm_VariantNumber").getSimpleValue();
        }
    }

    var newObj = step.getProductHome().getProductByID(blankNumber)
    if (newObj) {
        newObj.getValue("a_mm_VariantNumber").setSimpleValue(varNum);
        newObj.getValue("a_mm_BMIVersionNumber").setSimpleValue(verNum);
        //changeFutureVersion(newObj,step,node);
    }
    // throw newObj;

}

// change the future version to active and current active version archive
function changeFutureVersion(node, step, parentObj) {
    // try{
    var statusID = null;

    var parentStatus = parentObj.getValue("a_mm_MarketStatus").getSimpleValue();

    if (node.getValue("a_mm_Status").getSimpleValue() != null) {
        statusID = node.getValue("a_mm_Status").getID();
    }

    var nodeEffecFromDt = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
    var nodeVariantNumber = node.getValue("a_mm_VariantNumber").getSimpleValue();
    var nodeMarketStatus = node.getValue("a_mm_MarketStatus").getSimpleValue();

    // if (statusID != "14") {

    //     throw "This Version of BMI cannot be made active since only Launch Approved BMIs can be Activated";
    //     //throw errorMessage;

    // }

    // if (nodeMarketStatus != "Future") {

    //     throw "This Version of BMI cannot be made active since only Future Version BMI can be Activated";
    //     //throw errorMessage;

    // }

    if (node.isInWorkflow("wf_mm_BMIReplacement")) {

        throw "This Version of BMI cannot be made active since the BMI is still into Maintenance.";
        //throw errorMessage;

    }

    if (!node.isInWorkflow("wf_mm_DevBMIIdeationandApproval") && !node.isInWorkflow("wf_mm_BMIReplacement") && !node.isInWorkflow("wf_mm_BMIMaintenance") && statusID != "4" && statusID != "18" && statusID != "8" && nodeEffecFromDt != null) { //statusID == "14" && !node.isInWorkflow("wf_mm_BMIReplacement") for MDMI-16579

        var bmiSellingOptionsHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToSellingOption")
        var hashSet_BMILaunchHierarchy = new java.util.HashSet("");

        var hashSet_smi = new java.util.HashSet("");
        var getRefedByProds_node = node.getReferencedByProducts().toArray();
        for (var i = 0; i < getRefedByProds_node.length; i++) {
            var eachLinkType_node = getRefedByProds_node[i].getReferenceTypeString();
            if (eachLinkType_node == "SMIToBMI") {
                var eachSMI_node = getRefedByProds_node[i].getSource();
                if (eachSMI_node.getObjectType().getID() == "SoldMenuItem") {
                    hashSet_smi.add(eachSMI_node.getID());
                }
            }
        }

        var bmiToBMIver = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToBMIVersion"));
        // var bmiToBMIver=[];
        // for (var a = 0; a < bmiToBMIverFull.size(); a++) {
        //     var eachBMI = bmiToBMIverFull.get(a).getTarget();
        //     var eachBMIEffecFromDt = eachBMI.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        //     //var eachBMIEffecToDt = eachBMI.getValue("a_mm_EffectiveToDate").getSimpleValue();
        //     var eachBMIMarketStatus = eachBMI.getValue("a_mm_MarketStatus").getSimpleValue();
        //     if(nodeEffecFromDt >= eachBMIEffecFromDt && eachBMIVariantNumber == nodeVariantNumber && parentStatus==eachBMIMarketStatus)
        //     {
        //         bmiToBMIver.push(bmiToBMIverFull.get(a));
        //     }

        // }

        for (var a = 0; a < bmiToBMIver.size(); a++) {
            var eachBMI = bmiToBMIver.get(a).getTarget();
            var eachBMIEffecFromDt = eachBMI.getValue("a_mm_EffectiveFromDate").getSimpleValue();
            var eachBMIVariantNumber = eachBMI.getValue("a_mm_VariantNumber").getSimpleValue();
            var eachBMIMarketStatus = eachBMI.getValue("a_mm_MarketStatus").getSimpleValue();

            if (node.getID() != eachBMI.getID() && nodeEffecFromDt == eachBMIEffecFromDt && eachBMIVariantNumber == nodeVariantNumber) { // MDMI-11834 -Variant Number comparison
                //logger.info("eachBMI inside Archive Loop: "+eachBMI.getID());
                var getRefedByProds = eachBMI.getReferencedByProducts().toArray();
                node.getValue("a_mm_MarketStatus").setLOVValueByID(eachBMI.getValue("a_mm_MarketStatus").getID());
                eachBMI.getValue("a_mm_MarketStatus").setLOVValueByID("02");
                for (var b = 0; b < getRefedByProds.length; b++) {
                    var eachLinkType = getRefedByProds[b].getReferenceTypeString();
                    if (eachLinkType == "SMIToBMI") {
                        var eachSMI = getRefedByProds[b].getSource();
                        if (eachSMI.getObjectType().getID() == "SoldMenuItem") {
                            //log.info("eachSMI: " + eachSMI);
                            if (!hashSet_smi.contains(eachSMI.getID())) {
                                var factor_link = getRefedByProds[b].getValue("a_mm_Factor").getSimpleValue();
                                var effecFromDt_link = getRefedByProds[b].getValue("a_mm_EffectiveFromDate").getSimpleValue();
                                var effecToDt_link = getRefedByProds[b].getValue("a_mm_EffectiveToDate").getSimpleValue();
                                try {
                                    var newLink = eachSMI.createReference(node, step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI"));
                                    var tBMC = node.getValue("a_mm_BMIMenuCode").getSimpleValue();
                                    newLink.getValue("a_mm_BMIMenuCode").setSimpleValue(tBMC); //Added for PRB9017322
                                    newLink.getValue("a_mm_Factor").setSimpleValue(factor_link);
                                    newLink.getValue("a_mm_EffectiveFromDate").setSimpleValue(effecFromDt_link);
                                    newLink.getValue("a_mm_EffectiveToDate").setSimpleValue(effecToDt_link);
                                    hashSet_smi.add(eachSMI.getID());
                                    getRefedByProds[b].delete();
                                } catch (e) {
                                    throw e;
                                    log.info("Error while running Action: " + e);
                                }
                            }
                        }
                    }
                }
                var eachBMIStatusID = eachBMI.getValue("a_mm_Status").getID();
                //logger.info("eachBMIStatusID: "+eachBMIStatusID)
                if (eachBMIStatusID != "4" && eachBMIStatusID != "6") {
                    var currentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
                    var yesterdayDate = getPreviousDate(currentDate);
                    //log.info(yesterdayDate + ": " + currentDate);
                    eachBMI.getValue("a_mm_InactivationDate").setSimpleValue(currentDate);
                    //eachBMI.getValue("a_mm_EffectiveToDate").setSimpleValue(yesterdayDate); // Line added for Jonathan's concern for Eff To date during scheduler run
                    eachBMI.getValue("a_mm_PreviousStatus").setLOVValueByID(eachBMIStatusID); //Setting Previous Status
                    eachBMI.getValue("a_mm_Status").setLOVValueByID("4"); // 4 = Archived
                    eachBMI.getValue("a_mm_BMIStage").setLOVValueByID("14"); // 14 = Archived
                    deletedRejectedArchivedObj(eachBMI, step);
                    var cmmnts = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date()) + "\n" +
                        "System Update" + "\n" +
                        "This version of the BMI is archived as another version with " +
                        step.getAttributeHome().getAttributeByID("a_mm_BMIVersionDate").getName() + " - " + nodeEffecFromDt + " is being activated.";
                    var eachBMICommLog = eachBMI.getValue("a_mm_CommentsLog").getSimpleValue();
                    if (eachBMICommLog != null) {
                        var newCommLog = cmmnts + "\n-------------\n" + eachBMICommLog;
                    } else {
                        var newCommLog = cmmnts;
                    }
                    eachBMI.getValue("a_mm_LastComment").setSimpleValue(cmmnts);
                    eachBMI.getValue("a_mm_CommentsLog").setSimpleValue(newCommLog);
                }

                //eachBMI.getValue("a_mm_MarketStatus").setLOVValueByID("02");
                var eachBMIEffFromDate = eachBMI.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var eachBMIEffToDate = eachBMI.getValue("a_mm_EffectiveToDate").getSimpleValue();
                node.getValue("a_mm_EffectiveFromDate").setSimpleValue(eachBMIEffFromDate);
                node.getValue("a_mm_BMIVersionDate").setSimpleValue(eachBMIEffFromDate);
                //node.getValue("a_mm_EffectiveToDate").setSimpleValue(eachBMIEffToDate);
                eachBMI.getValue("a_mm_EffectiveToDate").setSimpleValue(eachBMIEffFromDate);


                // Code for copying linked Restaurant Group from the BMI which is being made Archived to the BMI which will become Active : Rahul C : BEGINS
                var eachBMIRestReferencesObj = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRestaurantGroups");
                var eachBMIRestReferences = eachBMI.getReferences(eachBMIRestReferencesObj).toArray();

                // For creating the linked Restaturants Groups to the active BMI
                for (var m = 0; m < eachBMIRestReferences.length; m++) {
                    var restGrpID = eachBMIRestReferences[m].getTarget().getID();

                    var bmiToRestaurantGroupsToCreate = step.getClassificationHome().getClassificationByID(restGrpID);
                    try {
                        node.createReference(bmiToRestaurantGroupsToCreate, "BMIToRestaurantGroups");
                    } catch (e) {
                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                            //Target Already Referenced Exception
                            log.info("Reference Already Linked.. ");
                        }
                        else {
                            throw "Exception : " + e;
                        }
                    }
                }

                // For deleting the linked Restaturants Groups from the archived BMI
                for (var n = 0; n < eachBMIRestReferences.length; n++) {
                    eachBMIRestReferences[n].delete();
                }
                // Code for copying linked Restaurant Group from the BMI which is being made Archived to the BMI which will become Active : Rahul C : ENDS
                if (eachBMI.isInWorkflow("wf_mm_DevBMIIdeationandApproval"))
                    eachBMI.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_DevBMIIdeationandApproval")).delete("Removed from wf_mm_DevBMIIdeationandApproval workflow");
                if (eachBMI.isInWorkflow("wf_mm_BMIReplacement"))
                    eachBMI.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_BMIReplacement")).delete("Removed from wf_mm_BMIReplacement workflow");
                if (eachBMI.isInWorkflow("wf_mm_BMIMaintenance"))
                    eachBMI.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_BMIMaintenance")).delete("Removed from wf_mm_BMIMaintenance workflow");
                if (eachBMI.isInWorkflow("wf_mm_MerlinNutritionApproval"))
                    eachBMI.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_MerlinNutritionApproval")).delete("Removed from wf_mm_MerlinNutritionApproval workflow");

                logger.info("BMI got Archived: " + eachBMI.getID());
                logger.info("Archived BMI Eff From Date: " + eachBMI.getValue("a_mm_EffectiveFromDate").getSimpleValue());
                logger.info("Archived BMI Eff To Date: " + eachBMI.getValue("a_mm_EffectiveToDate").getSimpleValue());
                logger.info("Archived BMI Status: " + eachBMI.getValue("a_mm_Status").getSimpleValue());
                logger.info("Archived BMI Market Status: " + eachBMI.getValue("a_mm_MarketStatus").getSimpleValue());
            }
            var bmiLaunchHierarchy_eachBMI = eachBMI.getClassificationProductLinks(bmiSellingOptionsHome);
            for (var z = 0; z < bmiLaunchHierarchy_eachBMI.size(); z++) {
                var eachClassi = bmiLaunchHierarchy_eachBMI.get(z).getClassification();
                hashSet_BMILaunchHierarchy.add(eachClassi.getID());
                bmiLaunchHierarchy_eachBMI.get(z).delete();
            }
            approveObjectInAllContexts(eachBMI, step);

        }
        var bmiLaunchHierarchy_node = node.getClassificationProductLinks(bmiSellingOptionsHome);
        for (var y = 0; y < bmiLaunchHierarchy_node.size(); y++) {
            var eachClassi_node = bmiLaunchHierarchy_node.get(y).getClassification();
            if (hashSet_BMILaunchHierarchy.contains(eachClassi_node.getID())) {
                hashSet_BMILaunchHierarchy.remove(eachClassi_node.getID());
            }
        }
        var hashSet_BMILaunchHierarchy_itr = hashSet_BMILaunchHierarchy.iterator();
        while (hashSet_BMILaunchHierarchy_itr.hasNext()) {
            var next_BMILaunchHierarchy = hashSet_BMILaunchHierarchy_itr.next();
            var nextClassHome = step.getClassificationHome().getClassificationByID(next_BMILaunchHierarchy);
            if (nextClassHome) {
                node.createClassificationProductLink(nextClassHome, bmiSellingOptionsHome);
            }
        }
        /***************************************** Start: Version 1 ******************************************/
        var finalRefedByProducts = node.getReferencedByProducts().toArray();
        for (var g = 0; g < finalRefedByProducts.length; g++) {
            var finalLinkType = finalRefedByProducts[g].getReferenceTypeString();
            if (finalLinkType == "SMIToBMI") {
                var finalSMI = finalRefedByProducts[g].getSource();
                if (finalSMI.getObjectType().getID() == "SoldMenuItem") {
                    createSMItoRCReferences(finalSMI, step, "BMIToRecipeComponent");
                    createSMItoRCReferences(finalSMI, step, "BMIToRecipeComponent_CanAdd");
                    var finalSMIStatus = finalSMI.getValue("a_mm_Status").getID();
                    if (!finalSMI.isInWorkflow("wf_mm_SMILaunchWorkflow") && !finalSMI.isInWorkflow("wf_mm_SMIMaintenance") && finalSMIStatus != "4" && finalSMIStatus != "18" && finalSMIStatus != "8") // SMI Status is Approved finalSMIStatus == "2" for MDMI-16579
                        approveBmirAndSmiPartially(finalSMI, step);
                }
            }
        }
        if (!node.isInWorkflow("wf_mm_DevBMIIdeationandApproval") && !node.isInWorkflow("wf_mm_BMIReplacement") && !node.isInWorkflow("wf_mm_BMIMaintenance") && statusID != "4" && statusID != "18" && statusID != "8") // BMI Status is Launch Approved statusID == "14" for MDMI-16579
            approveObjectInAllContexts(node, step);
        logger.info("------------------------------------------------------------------------------------");
        logger.info("BMI got Activated: " + node.getID());
        logger.info("Activated BMI Eff From Date: " + node.getValue("a_mm_EffectiveFromDate").getSimpleValue());
        logger.info("Activated BMI Eff To Date: " + node.getValue("a_mm_EffectiveToDate").getSimpleValue());
        logger.info("Activated BMI Status: " + node.getValue("a_mm_Status").getSimpleValue());
        logger.info("Activated BMI Market Status: " + node.getValue("a_mm_MarketStatus").getSimpleValue());
        logger.info("Activated BMI Version Status: " + node.getValue("a_mm_BMIVersionDate").getSimpleValue());
        /***************************************** End: Version 1 ******************************************/
    }
    // }
    // catch(e)
    // {
    //     throw e;
    // }

}

/*Name:	     CopyToVersion
Author:	     Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	     10/03/2021
Purpose:	 Copy the values from Source to versions BMI
*/
function CopyToVersion(node, step, tMainType, Version) {
    var aAttributeList = new java.util.ArrayList();
    var aReferenceList = new java.util.ArrayList();


    var tSelection = node.getValue("a_mm_CopyBMIDescription").getSimpleValue();
    var tSelectionId = "";
    if (tSelection) {
        tSelectionId = node.getValue("a_mm_CopyBMIDescription").getLOVValue().getID();
        node.getValue("a_mm_CopyBMIDescription").setSimpleValue(null);
    }
    if (tMainType == "03" && Version == "Yes") {
        aAttributeList.addAll(["a_mm_BMIName", "a_mm_BMIInternalName", "a_mm_BMIDescription", "a_mm_BMICategory", "a_mm_BMIProteinType", "a_mm_BMIFlavourProfile", "a_mm_PointofSale", "a_mm_Contentant", "a_mm_Volume", "a_mm_NatureBMI", "a_mm_Soda"]);
        aReferenceList.addAll(["PrimaryProductImage", "ProductImage", "BMIToAsset", "BMIToSellingOptions"]);
        var UploadProductImage = "PrimaryProductImage";
        var UploadOtherImage = "ProductImage";
        var UploadDocument = "BMIToAsset";
        var ConceptTest = "BMIToFieldTest";
        //MDMI-11831: Add below line
        var tBMItoEvent = "BMItoEvent";
        var sStateName = "Enrich - Maintenance BMI";
    }
    if (tMainType == "04" && Version == "Yes") {
        aAttributeList.addAll(["a_mm_ApprovedDeclaration", "a_mm_PackagingApproved", "a_mm_CrossContaminationNote", "a_mm_HotHoldApproval", "a_mm_MicroApproval", "a_mm_IngredientStatement", "a_mm_IngredientStatementGerman"]);
        var sStateName = "Approve - Feasibility of QA";
    }
    if (tMainType == "06" && Version == "Yes") {
        aAttributeList.addAll(["a_mm_BMIDescription", "a_mm_BMIName"]);
        var sStateName = "Enrich - Marketing Information";
    }
    if (tMainType == "05" && Version == "Yes") {
        aAttributeList.addAll(["a_mm_IngredientStatementX", "a_mm_IngredientStatementGermanX"]);
        var tBMIToDec = "BMIToDeclaredRecipeComponent";
        var tBMIToRec = "BMIToRecipeComponent";
        var sStateName = "Enrich - Launch Approved BMI";
    }
    if (tMainType == "MERLINBMI" && Version == "Yes") {
        aAttributeList.addAll(["a_mm_IngredientStatementX", "a_mm_IngredientStatementGermanX"]);
        var tBMIToDec = "BMIToDeclaredRecipeComponent";
        var tBMIToRec = "BMIToRecipeComponent";
        var sStateName = "Approve Merlin Nutrition - BMI";
    }

    var nodeVariantNumber = node.getValue("a_mm_VariantNumber").getSimpleValue();
    var tRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToBMIVersion"));
    if (!tRef.isEmpty()) {
        for (var i = 0; i < tRef.size(); i++) {
            var sCommentsLog = null;
            var sExistCommentsLog = null;
            //var sComments = null;
            var sLastComment = null;
            var VBMIObj = tRef.get(i).getTarget();

            var VBMIObjVariantNumber = VBMIObj.getValue("a_mm_VariantNumber").getSimpleValue();
            var vStatus = VBMIObj.getValue("a_mm_MarketStatus").getSimpleValue();
            var versionStatus = "";
            if (vStatus)
                versionStatus = VBMIObj.getValue("a_mm_MarketStatus").getLOVValue().getID();


            //MDMI-11831, MDMI-12072 : Updated below if condition 
            if ((((tMainType == "06" || tMainType == "01") && tSelectionId == "02") || tMainType == "03" || nodeVariantNumber == VBMIObjVariantNumber) && node.getID() != VBMIObj.getID() && versionStatus != "02" && tSelectionId != "01") {
                //throw(Test);

                for (var j = 0; j < aAttributeList.size(); j++) {
                    var tValues = node.getValue(aAttributeList.get(j)).getSimpleValue();
                    if (tValues != null) {
                        if (aAttributeList.get(j) == "a_mm_BMIInternalName") VBMIObj.setName(tValues);
                        VBMIObj.getValue(aAttributeList.get(j)).setSimpleValue(tValues);
                    }
                }
                if (tMainType == "03") {
                    for (var q = 0; q < aReferenceList.size(); q++) {

                        var tReferences = VBMIObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(aReferenceList.get(q)));
                        if (!tReferences.isEmpty()) {
                            for (var r = 0; r < tReferences.size(); r++) {
                                var tref = tReferences.get(r);
                                if (node.getID() != VBMIObj.getID()) {
                                    tref.delete();
                                }
                            }
                        }
                        var tBMIReferences = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(aReferenceList.get(q)));
                        if (!tBMIReferences.isEmpty()) {
                            for (var x = 0; x < tBMIReferences.size(); x++) {
                                var tBMIReferencesTar = tBMIReferences.get(x).getTarget();
                                try {
                                    VBMIObj.createReference(tBMIReferencesTar, aReferenceList.get(q));
                                    log.info(q + " : " + VBMIObj.getID() + " : " + aReferenceList.get(q));
                                    partialApproveReference(VBMIObj, aReferenceList.get(q));
                                } catch (e) {
                                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                        //Target Already Referenced Exception
                                        log.info("Reference Already Linked.. ");
                                    }
                                    else {
                                        throw "Exception : " + e;
                                    }
                                }
                            }
                        }


                    }

                    //MDMI-11831: Start
                    var VBMIToEvent = VBMIObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToEvent"));
                    if (!VBMIToEvent.isEmpty()) {
                        for (var k1 = 0; k1 < VBMIToEvent.size(); k1++) {
                            var VBMIToEvent2 = VBMIToEvent.get(k1);
                            if (node.getID() != VBMIObj.getID()) {
                                VBMIToEvent2.delete();
                            }
                        }
                    }

                    var tBMIEvents = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToEvent"));
                    for (var l3 = 0; l3 < tBMIEvents.size(); l3++) {
                        var tBMIEvent = tBMIEvents.get(l3).getTarget();
                        try {
                            VBMIObj.createReference(tBMIEvent, "BMIToEvent");
                            var BMIToRecipeComponent = VBMIObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));
                            var newHashSetRCID = new java.util.LinkedHashSet();

                            for (var a = 0; a < BMIToRecipeComponent.size(); a++) {

                                var RCName = BMIToRecipeComponent.get(a).getTarget().getValue("a_mm_RecipeComponentName").getSimpleValue();
                                var RCStatus = BMIToRecipeComponent.get(a).getTarget().getValue("a_mm_Status").getSimpleValue();
                                log.info("RCName: " + RCName + " - RCStatus: " + RCStatus);

                                if ((!BMIToRecipeComponent.get(a).getTarget().isInWorkflow("wf_mm_RecipeComponent") && !BMIToRecipeComponent.get(a).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance") && RCStatus != "Archived" && RCStatus != "Archival Pending" && RCStatus != "Inactive") || RCStatus == "In Development" || BMIToRecipeComponent.get(a).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance")) { //RCStatus == "Approved" || RCStatus == "In Maintenance" for MDMI-16579
                                    newHashSetRCID.add(BMIToRecipeComponent.get(a).getTarget().getID());
                                }
                            }

                            var BMIToRecipeComponent_CanAdd = VBMIObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent_CanAdd"));

                            for (var b = 0; b < BMIToRecipeComponent_CanAdd.size(); b++) {

                                var RCName = BMIToRecipeComponent_CanAdd.get(b).getTarget().getValue("a_mm_RecipeComponentName").getSimpleValue();
                                var RCStatus = BMIToRecipeComponent_CanAdd.get(b).getTarget().getValue("a_mm_Status").getSimpleValue();
                                log.info("RCName: " + RCName + " - RCStatus: " + RCStatus);

                                if ((!BMIToRecipeComponent_CanAdd.get(b).getTarget().isInWorkflow("wf_mm_RecipeComponent") && !BMIToRecipeComponent_CanAdd.get(b).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance") && RCStatus != "Archived" && RCStatus != "Archival Pending" && RCStatus != "Inactive") || RCStatus == "In Development" || BMIToRecipeComponent_CanAdd.get(b).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance")) { // RCStatus == "Approved" || RCStatus == "In Maintenance" for MDMI-16579
                                    newHashSetRCID.add(BMIToRecipeComponent_CanAdd.get(b).getTarget().getID());
                                }
                            }

                            var BMIToPackagingComponent = VBMIObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToPackagingComponent"));

                            for (var c = 0; c < BMIToPackagingComponent.size(); c++) {

                                var RCName = BMIToPackagingComponent.get(c).getTarget().getValue("a_mm_RecipeComponentName").getSimpleValue();
                                var RCStatus = BMIToPackagingComponent.get(c).getTarget().getValue("a_mm_Status").getSimpleValue();
                                log.info("RCName: " + RCName + " - RCStatus: " + RCStatus);

                                if ((!BMIToPackagingComponent.get(c).getTarget().isInWorkflow("wf_mm_RecipeComponent") && !BMIToPackagingComponent.get(c).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance") && RCStatus != "Archived" && RCStatus != "Archival Pending" && RCStatus != "Inactive") || RCStatus == "In Development" || BMIToPackagingComponent.get(c).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance")) { //RCStatus == "Approved" || RCStatus == "In Maintenance" for MDMI-16579
                                    newHashSetRCID.add(BMIToPackagingComponent.get(c).getTarget().getID());
                                }
                            }

                            var itrRCID = newHashSetRCID.iterator();
                            while (itrRCID.hasNext()) {
                                var nextRCID = itrRCID.next();
                                var RCNode = step.getProductHome().getProductByID(nextRCID);
                                if (RCNode != null) {
                                    try {
                                        RCNode.createReference(tBMIEvent, "RecipeToEvent");
                                    } catch (e) {
                                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                            //Target Already Referenced Exception
                                            log.info("Reference Already Linked.. ");
                                        }
                                        else {
                                            throw "Exception : " + e;
                                        }
                                    }
                                }
                            }


                        } catch (e) {
                            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                logger.info("Event Already Referenced");
                            } else {
                                log.info("Exception occurs in BR : " + e);
                                throw e;
                            }
                        }

                    }
                    //MDMI-11831: End

                    var tReferences = VBMIObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(ConceptTest));
                    if (!tReferences.isEmpty()) {
                        for (var r1 = 0; r1 < tReferences.size(); r1++) {
                            var tref = tReferences.get(r1);
                            if (node.getID() != VBMIObj.getID()) {
                                tref.delete();
                            }
                        }
                    }


                    var tConcept = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(ConceptTest));
                    if (!tConcept.isEmpty()) {
                        for (var l = 0; l < tConcept.size(); l++) {
                            var tConActDate = tConcept.get(l).getValue("a_mm_ConceptTestActualDate").getSimpleValue();
                            var tConResult = tConcept.get(l).getValue("a_mm_ConceptTestResult").getSimpleValue();
                            var tConTitle = tConcept.get(l).getValue("a_mm_ConceptTestTitle").getSimpleValue();
                            var tConObs = tConcept.get(l).getValue("a_mm_ConceptTestobservations").getSimpleValue();
                            var tConceptTar = tConcept.get(l).getTarget();
                            //var tConceptID = tConceptTar.getID();
                            try {
                                var NewConcept = VBMIObj.createReference(tConceptTar, "BMIToFieldTest");
                                //var NewConceptID = NewConcept.getTarget().getID();
                                //if(tConceptID == NewConceptID){
                                NewConcept.getValue("a_mm_ConceptTestActualDate").setSimpleValue(tConActDate);
                                NewConcept.getValue("a_mm_ConceptTestResult").setSimpleValue(tConResult);
                                NewConcept.getValue("a_mm_ConceptTestTitle").setSimpleValue(tConTitle);
                                NewConcept.getValue("a_mm_ConceptTestobservations").setSimpleValue(tConObs);
                                //}
                            } catch (e) {
                                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                    //Target Already Referenced Exception
                                    log.info("Reference Already Linked.. ");
                                }
                                else {
                                    throw "Exception : " + e;
                                }
                            }
                        }
                    }
                }
                if (tMainType == "05" || tMainType == "MERLINBMI" || tMainType == "01") {

                    var VBMIToDec = VBMIObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(tBMIToDec));
                    if (!VBMIToDec.isEmpty()) {
                        for (var k = 0; k < VBMIToDec.size(); k++) {
                            var VBMIToDec2 = VBMIToDec.get(k);
                            if (node.getID() != VBMIObj.getID()) {
                                VBMIToDec2.delete();
                            }
                        }
                    }

                    calculateNutScoreRCGridFromTargetRC(VBMIObj, step);

                    var tBMIToRecRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(tBMIToRec));
                    var VBMIToRecRef = VBMIObj.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(tBMIToRec));
                    if (!tBMIToRecRef.isEmpty() && !VBMIToRecRef.isEmpty()) {
                        var nutrgrp1 = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_NutritionalValues");
                        var nutratt1 = nutrgrp1.getAllAttributes();
                        var itr1 = nutratt1.iterator();
                        for (var u = 0; u < VBMIToRecRef.size(); u++) {
                            var VBMIToRecipe = VBMIToRecRef.get(u);
                            var VRCID = VBMIToRecipe.getTarget().getID();
                            for (var t = 0; t < tBMIToRecRef.size(); t++) {
                                var tBMIToRecipe = tBMIToRecRef.get(t);
                                var tRCID = tBMIToRecipe.getTarget().getID();
                                if (VRCID == tRCID) {
                                    while (itr1.hasNext()) {
                                        var attribute1 = itr1.next().getID();
                                        VBMIToRecipe.getValue(attribute1).setSimpleValue(tBMIToRecipe.getValue(attribute1).getSimpleValue());
                                    }
                                }
                            }
                        }
                    }

                    var tBMIToDecRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(tBMIToDec));
                    if (!tBMIToDecRef.isEmpty()) {
                        var nutrgrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_DeclaredNutritionalValues");
                        var nutratt = nutrgrp.getAllAttributes();
                        var itr = nutratt.iterator();
                        for (var m = 0; m < tBMIToDecRef.size(); m++) {
                            var tRCName = tBMIToDecRef.get(m).getValue("a_mm_RecipeComponentName").getSimpleValue();
                            var tServingSize = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeRounded").getSimpleValue();
                            var tServingUOM = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeUOM").getSimpleValue();
                            var tServingSizeX = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeX").getSimpleValue();
                            var tServingUOMX = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeUOMX").getSimpleValue();
                            var tMerlinStatus = tBMIToDecRef.get(m).getValue("a_mm_MerlinStatus").getSimpleValue();
                            var tMerlinSpec = tBMIToDecRef.get(m).getValue("a_mm_SpecificationNumber").getSimpleValue();
                            var tMerlinIssue = tBMIToDecRef.get(m).getValue("a_mm_IssueNumber").getSimpleValue();
                            var tMerlinURL = tBMIToDecRef.get(m).getValue("a_mm_MerlinSpecURL").getSimpleValue();
                            var tDecNutScore = tBMIToDecRef.get(m).getValue("a_mm_DeclaredNutritionSource").getSimpleValue();
                            var tDelta = tBMIToDecRef.get(m).getValue("a_mm_DeltaX").getSimpleValue();
                            var tPisEng = tBMIToDecRef.get(m).getValue("a_mm_IngredientStatementX").getSimpleValue();
                            log.info("amit test pis " + tPisEng);
                            var tPisEngLocal = tBMIToDecRef.get(m).getValue("a_mm_IngredientStatementGermanX").getSimpleValue();
                            //var tlastupdate = tBMIToDecRef.get(m).getValue("a_mm_LastUpdatedDateX").getSimpleValue();
                            //log.info("LastUpdatedDate"+tlastupdate);
                            var tDecRC = tBMIToDecRef.get(m).getTarget();
                            var tRMRI = tDecRC.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
                            try {
                                var VBMIToDecRef = VBMIObj.createReference(tDecRC, "BMIToDeclaredRecipeComponent");
                                // To set the Declared allergens values on Reference MetaData on the newly created BMI versions : BEGINS
                                //pimNutrLib.setBMIToDeclaredReferenceValues(step, node, VBMIObj, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContainsX", "a_mm_AllergenMayContainsX");
                                // To set the Declared allergens values on Reference MetaData on the newly created BMI versions : ENDS
                                VBMIToDecRef.getValue("a_mm_RecipeComponentName").setSimpleValue(tRCName);
                                VBMIToDecRef.getValue("a_mm_ServingSizeRounded").setSimpleValue(tServingSize);
                                VBMIToDecRef.getValue("a_mm_ServingSizeUOM").setSimpleValue(tServingUOM);
                                VBMIToDecRef.getValue("a_mm_ServingSizeX").setSimpleValue(tServingSizeX);
                                VBMIToDecRef.getValue("a_mm_ServingSizeUOMX").setSimpleValue(tServingUOMX);
                                VBMIToDecRef.getValue("a_mm_MerlinStatus").setSimpleValue(tMerlinStatus);
                                VBMIToDecRef.getValue("a_mm_SpecificationNumber").setSimpleValue(tMerlinSpec);
                                VBMIToDecRef.getValue("a_mm_IssueNumber").setSimpleValue(tMerlinIssue);
                                VBMIToDecRef.getValue("a_mm_MerlinSpecURL").setSimpleValue(tMerlinURL);
                                VBMIToDecRef.getValue("a_mm_DeclaredNutritionSource").setSimpleValue(tDecNutScore);
                                VBMIToDecRef.getValue("a_mm_DeltaX").setSimpleValue(tDelta);
                                VBMIToDecRef.getValue("a_mm_IngredientStatementX").setSimpleValue(tPisEng);
                                VBMIToDecRef.getValue("a_mm_IngredientStatementGermanX").setSimpleValue(tPisEngLocal);
                                //VBMIToDecRef.getNode().getValue("a_mm_LastUpdatedDateX").setSimpleValue(tlastupdate);
                                VBMIToDecRef.getTarget().getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(tRMRI);
                                while (itr.hasNext()) {
                                    var attribute = itr.next().getID();
                                    VBMIToDecRef.getValue(attribute).setSimpleValue(tBMIToDecRef.get(m).getValue(attribute).getSimpleValue());
                                }
                                pimNutrLib.calculateNutritionScoreBMI(VBMIObj, step, "BMIToRecipeComponent", "ag_mm_NutritionalValues", null);
                                pimNutrLib.calculateNutritionScoreBMI(VBMIObj, step, "BMIToDeclaredRecipeComponent", "ag_mm_NutritionalValues", "Declared");

                                pimNutrLib.setBMIToDeclaredReferenceValues(step, node, VBMIObj, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContainsX", "a_mm_AllergenMayContainsX");
                                pimNutrLib.populateAllergenSensitivityMultiValuedAttribute(step, VBMIObj, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContainsX", "a_mm_AllergenMayContainsX", true, "Lov_mm_AllergenValues");
                                pimNutrLib.setAllergenStatements_New(VBMIObj, step, null, "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenValues");

                                pimNutrLib.setAllergenStatements_Local(VBMIObj, step, null, "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenLocale");
                                pimNutrLib.setAllergenStatements_New(VBMIObj, step, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenValues");
                                pimNutrLib.setAllergenStatements_Local(VBMIObj, step, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenLocale");
                                // Changes as part of INC17093551
						  if(isOldModel(node,step)) {
	                                VBMIObj.getValue("a_mm_AllergenContains").setSimpleValue(node.getValue("a_mm_AllergenContains").getSimpleValue());
	                                VBMIObj.getValue("a_mm_AllergenMayContains").setSimpleValue(node.getValue("a_mm_AllergenMayContains").getSimpleValue());
						  }
                            } catch (e) {
                                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                    //Target Already Referenced Exception
                                    log.info("Reference Already Linked.. ");
                                }
                                else {
                                    throw "Exception : " + e;
                                }
                            }
                        }
                    }
                }

                //--------------------
                var currentContext = step.getCurrentContext().getID();
                var currentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(getCurrentDate(step, currentContext))
                var nodeEffecFromDt = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var currIsFuture = 0;

                if (nodeEffecFromDt > currentDate)
                    currIsFuture = 1;

                var eachBMIMarketStatusID = VBMIObj.getValue("a_mm_MarketStatus").getID();
                var eacheffectiveDate = VBMIObj.getValue("a_mm_EffectiveFromDate").getSimpleValue();

                log.info("CommentLogCheck: " + eachBMIMarketStatusID + " : " + currIsFuture + " : " + eacheffectiveDate + " : " + nodeEffecFromDt);

                if (!((eachBMIMarketStatusID == "01" && !currIsFuture) || (currIsFuture && eachBMIMarketStatusID == "03" && eacheffectiveDate == nodeEffecFromDt))) {
                    log.info("CommentLogCheck: IN ...");
                    var tVersionDate = node.getValue("a_mm_BMIVersionDate").getSimpleValue();
                    var workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_BMIReplacement");
                    //var merlinworkflow = step.getWorkflowHome().getWorkflowByID("wf_mm_MerlinNutritionApproval");
                    //var workflow;
                    if (node.isInWorkflow("wf_mm_BMIReplacement")) {
                        //if(tMainType == "03" || tMainType == "04" || tMainType == "05" ){
                        if (tMainType == "03") {
                            var sComments = node.getValue("a_mm_Comments").getSimpleValue();
                        } else {
                            var sComments = node.getWorkflowInstance(workflow).getSimpleVariable("wf_mm_Comment2");
                        }
                    } else if (node.isInWorkflow("wf_mm_MerlinNutritionApproval")) {
                        //var sComments = node.getValue("a_mm_Comments").getSimpleValue();
                        log.info("MERLIN_WF_test1");
                    } else {
                        log.info("DO NOTHING");
                    }

                    var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
                    var sUserId = step.getCurrentUser().getID();
                    var sUserName = step.getCurrentUser().getName();
                    var tBMIName = node.getValue("a_mm_BMIName").getSimpleValue();
                    var MaintypeV = node.getValue("a_mm_ReplacementBMIOption").getSimpleValue();
                    //MDMI-12233
                    if (!MaintypeV)
                        MaintypeV = node.getValue("a_mm_TypeOfChange").getSimpleValue();

                    //log.info("sComments "+sComments);
                    if (sComments != null) {
                        sLastComment = sDate + " - " + sUserName + "\n➜ Submitted From - " + sStateName + "\n" + "Updated from " + tBMIName + " version dated " + tVersionDate + " as part of " + '"' + MaintypeV + '"';
                        sLastComment = sLastComment + "\n" + sComments;
                    } else {
                        sLastComment = sDate + " - " + sUserName + "\n➜ Submitted From - " + sStateName + "\n" + "Updated from " + tBMIName + " version dated " + tVersionDate + " as part of " + '"' + MaintypeV + '"';
                    }
                    VBMIObj.getValue("a_mm_LastComment").setSimpleValue(sLastComment);
                    var commentsLog = VBMIObj.getValue("a_mm_CommentsLog").getSimpleValue(); // Added as per PRB9015632
                    if (commentsLog != null) { // Added as per PRB9015632
                        sLastComment = sLastComment + "\n" + "-------------" + "\n" + commentsLog; // Added as per PRB9015632
                    } // Added as per PRB9015632
                    VBMIObj.getValue("a_mm_CommentsLog").setSimpleValue(sLastComment);
                }

            }
        }
        //node.getValue("a_mm_CommentsLog").setSimpleValue(null);	Commented as per PRB9015632
        //nodeComm=sDate + " - " + sUserName + "\n➜ Submitted From - " + sStateName + "\n" + sComments;
        //node.getValue("a_mm_CommentsLog").setSimpleValue(nodeComm);
    }
}


/*Name:	     copyDeclaredRc
Author:	     Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	     10/03/2021
Purpose:	 Copy the Declared RC values from Source to versions BMI
*/
function copyDeclaredRc(node, step, VBMIObj) {
    var tCategory = node.getValue("a_mm_BMICategory").getSimpleValue();
    var tPISEng = node.getValue("a_mm_IngredientStatementX").getSimpleValue();
    var tPISGer = node.getValue("a_mm_IngredientStatementGermanX").getSimpleValue();
    VBMIObj.getValue("a_mm_BMICategory").setSimpleValue(tCategory);
    VBMIObj.getValue("a_mm_IngredientStatementX").setSimpleValue(tPISEng);
    VBMIObj.getValue("a_mm_IngredientStatementGermanX").setSimpleValue(tPISGer);

    var tBMIToDecRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToDeclaredRecipeComponent"));
    if (!tBMIToDecRef.isEmpty()) {
        var nutrgrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_DeclaredNutritionalValues");
        var nutratt = nutrgrp.getAllAttributes();
        var itr = nutratt.iterator();
        for (var m = 0; m < tBMIToDecRef.size(); m++) {
            var tRCName = tBMIToDecRef.get(m).getValue("a_mm_RecipeComponentName").getSimpleValue();
            var tServingSize = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeRounded").getSimpleValue();
            var tServingUOM = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeUOM").getSimpleValue();
            var tServingSizeX = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeX").getSimpleValue();
            var tServingUOMX = tBMIToDecRef.get(m).getValue("a_mm_ServingSizeUOMX").getSimpleValue();
            var tMerlinStatus = tBMIToDecRef.get(m).getValue("a_mm_MerlinStatus").getSimpleValue();
            var tMerlinSpec = tBMIToDecRef.get(m).getValue("a_mm_SpecificationNumber").getSimpleValue();
            var tMerlinIssue = tBMIToDecRef.get(m).getValue("a_mm_IssueNumber").getSimpleValue();
            var tMerlinURL = tBMIToDecRef.get(m).getValue("a_mm_MerlinSpecURL").getSimpleValue();
            var tDecNutScore = tBMIToDecRef.get(m).getValue("a_mm_DeclaredNutritionSource").getSimpleValue();
            var tDelta = tBMIToDecRef.get(m).getValue("a_mm_DeltaX").getSimpleValue();
            var tPisEng = tBMIToDecRef.get(m).getValue("a_mm_IngredientStatementX").getSimpleValue();
            var tPisEngLocal = tBMIToDecRef.get(m).getValue("a_mm_IngredientStatementGermanX").getSimpleValue();
            var tlastupdate = tBMIToDecRef.get(m).getValue("a_mm_LastUpdatedDateX").getSimpleValue();
            var tDecRC = tBMIToDecRef.get(m).getTarget();
            var tRMRI = tDecRC.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
            try {
                var VBMIToDecRef = VBMIObj.createReference(tDecRC, "BMIToDeclaredRecipeComponent");
                VBMIToDecRef.getValue("a_mm_RecipeComponentName").setSimpleValue(tRCName);
                VBMIToDecRef.getValue("a_mm_ServingSizeRounded").setSimpleValue(tServingSize);
                VBMIToDecRef.getValue("a_mm_ServingSizeUOM").setSimpleValue(tServingUOM);
                VBMIToDecRef.getValue("a_mm_ServingSizeX").setSimpleValue(tServingSizeX);
                VBMIToDecRef.getValue("a_mm_ServingSizeUOMX").setSimpleValue(tServingUOMX);
                VBMIToDecRef.getValue("a_mm_MerlinStatus").setSimpleValue(tMerlinStatus);
                VBMIToDecRef.getValue("a_mm_SpecificationNumber").setSimpleValue(tMerlinSpec);
                VBMIToDecRef.getValue("a_mm_IssueNumber").setSimpleValue(tMerlinIssue);
                VBMIToDecRef.getValue("a_mm_MerlinSpecURL").setSimpleValue(tMerlinURL);
                VBMIToDecRef.getValue("a_mm_DeclaredNutritionSource").setSimpleValue(tDecNutScore);
                VBMIToDecRef.getValue("a_mm_DeltaX").setSimpleValue(tDelta);
                VBMIToDecRef.getValue("a_mm_IngredientStatementX").setSimpleValue(tPisEng);
                VBMIToDecRef.getValue("a_mm_IngredientStatementGermanX").setSimpleValue(tPisEngLocal);
                VBMIToDecRef.getValue("a_mm_LastUpdatedDateX").setSimpleValue(tlastupdate);
                VBMIToDecRef.getTarget().getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(tRMRI);
                while (itr.hasNext()) {
                    var attribute = itr.next().getID();
                    VBMIToDecRef.getValue(attribute).setSimpleValue(tBMIToDecRef.get(m).getValue(attribute).getSimpleValue());
                }
                calculateNutScoreRCGridFromTargetRC(VBMIObj, step);
                pimNutrLib.calculateNutritionScoreBMI(VBMIObj, step, "BMIToRecipeComponent", "ag_mm_NutritionalValues", null);
                pimNutrLib.calculateNutritionScoreBMI(VBMIObj, step, "BMIToDeclaredRecipeComponent", "ag_mm_NutritionalValues", "Declared");

                pimNutrLib.setBMIToDeclaredReferenceValues(step, node, VBMIObj, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContainsX", "a_mm_AllergenMayContainsX");
                pimNutrLib.populateAllergenSensitivityMultiValuedAttribute(step, VBMIObj, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContainsX", "a_mm_AllergenMayContainsX", true, "Lov_mm_AllergenValues");
                pimNutrLib.setAllergenStatements_New(VBMIObj, step, null, "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenValues");

                pimNutrLib.setAllergenStatements_Local(VBMIObj, step, null, "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenLocale");
                pimNutrLib.setAllergenStatements_New(VBMIObj, step, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenValues");
                pimNutrLib.setAllergenStatements_Local(VBMIObj, step, "BMIToDeclaredRecipeComponent", "a_mm_AllergenContains", "a_mm_AllergenMayContains", false, "Lov_mm_AllergenLocale");
                VBMIObj.getValue("a_mm_AllergenContains").setSimpleValue(node.getValue("a_mm_AllergenContains").getSimpleValue());
                VBMIObj.getValue("a_mm_AllergenMayContains").setSimpleValue(node.getValue("a_mm_AllergenMayContains").getSimpleValue());
            } catch (e) {
                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                    //Target Already Referenced Exception
                    log.info("Reference Already Linked.. ");
                }
                else {
                    throw "Exception : " + e;
                }
            }
        }
    }
}

/*Name:	     AttributesCheckOnEntity
Author:	     Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	     23/03/2021
Purpose:	 To return error message if check box is not selected and mandatory attributes are populated on Entity Reference
*/
function AttributesCheckOnEntity(node, step, reference, Attr_Check, array) {
    try {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID(reference);
        if (tRef) {
            var tError = null;
            var attr_Value = node.getValue(Attr_Check).getSimpleValue();
            var tReferences = node.getReferences(tRef);
            if (!tReferences.isEmpty()) {
                for (var i = 0; i < tReferences.size(); i++) {
                    var tLink = tReferences.get(i);
                    var tAttributeName = new java.util.ArrayList();
                    if (attr_Value == "Yes") {
                        for (var j = 0; j < array.length; j++) {
                            if ((tLink.getValue(array[j]).getSimpleValue() != null)) {
                                tAttributeName.add(step.getAttributeHome().getAttributeByID(array[j]).getName());
                                log.info("tAttributeName:" + tAttributeName);
                            }
                        }
                        if (tError != null) {
                            if (tAttributeName.size() > 0)
                                tError = tError + "\n" + tAttributeName + " should be null for " + tLink.getTarget().getName() + "(" + tRef.getName() + ") if the value of the checkbox not check";
                        } else {
                            if (tAttributeName.size() > 0)
                                tError = tAttributeName + " should be null for " + tLink.getTarget().getName() + "(" + tRef.getName() + ") if the value of the checkbox not check";
                        }
                    }
                }
            }
            return tError;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}




/*Name:	     mandatoryAttributesOnEntity_otherValidations
Author:	     Rahul Choudhary (rahul.choudhary@us.mcd.com) 
Date:	     24/03/2021
Purpose:	     To return error message if mandatory attributes on Entity Reference aren't populated
Applicability: DEV SU Onboarding*/

function mandatoryAttributesOnEntity_otherValidations(node, step, reference, check_entity, check_column_attr, entityFlag, array) {
    try {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID(reference);
        var check_entity_obj = step.getAttributeHome().getAttributeByID(check_entity).getName();
        var check_entity_obj_ID = step.getAttributeHome().getAttributeByID(check_entity).getID();
        var sum = 0;
        var counter = 0;
        var foundFlag = false;
        if (tRef) {
            var tError = null;
            var tReferences = node.getReferences(tRef);
            if (!tReferences.isEmpty()) {
                for (var i = 0; i < tReferences.size(); i++) {
                    var tLink = tReferences.get(i);

                    var attr_Value = tLink.getValue(check_column_attr).getSimpleValue();

                    var avail_attr_LovID = tLink.getValue("a_mm_Availability").getID();


                    if (check_entity_obj_ID == tLink.getTarget().getID()) {

                        if (entityFlag == "Data Source_1" || entityFlag == "Data Source_2" || entityFlag == "Data Source_3") {
                            var lovValueID = tLink.getValue(check_column_attr).getID();

                            if (lovValueID == "1") {
                                if (tError != null) {
                                    tError = tError + "\n" + "\"Data Source\" dropdown list value should be only \"Calculated\" or \"Reference\" (not Analysed) for " + check_entity_obj + ".";

                                } else {
                                    tError = "\"Data Source\" dropdown list value should be only \"Calculated\" or \"Reference\" (not Analysed) for " + check_entity_obj + ".";

                                }
                            }
                        } else {

                            for (var j = 0; j < tReferences.size(); j++) {
                                var tLink_2 = tReferences.get(j);
                                if (array.length == 1) {
                                    var check_entity_obj_2 = step.getAttributeHome().getAttributeByID(array[0]).getName();
                                    var check_entity_obj_2_ID = step.getAttributeHome().getAttributeByID(array[0]).getID();
                                    var attr_Value_2 = tLink_2.getValue(check_column_attr).getSimpleValue();

                                    var avail_attr_2_LovID = tLink_2.getValue("a_mm_Availability").getID();


                                } else {

                                    for (var m = 0; m < array.length; m++) {
                                        if (tLink_2.getTarget().getID() == step.getAttributeHome().getAttributeByID(array[m]).getID()) {
                                            var fatValue = tLink_2.getValue(check_column_attr).getSimpleValue();
                                            if (fatValue != null) {
                                                sum = sum + Number(fatValue);
                                            }
                                            counter++;
                                            foundFlag = true;

                                        }
                                    }
                                }


                                if (check_entity_obj_2_ID == tLink_2.getTarget().getID() || (counter == array.length && foundFlag == true)) {
                                    /////////////////////////////////
                                    if (avail_attr_LovID == 1 && avail_attr_LovID != avail_attr_2_LovID && entityFlag == "Energy") {

                                        log.info("Mismatched");
                                        if (tError != null) {
                                            tError = tError + "\n" + "Please provide \"" + tLink_2.getTarget().getName() + "\" as well as \"" + tLink.getTarget().getName() + "\".";

                                        } else {
                                            tError = "Please provide \"" + tLink_2.getTarget().getName() + "\" as well as \"" + tLink.getTarget().getName() + "\".";

                                        }
                                    } else if (avail_attr_2_LovID == 1 && avail_attr_LovID != avail_attr_2_LovID && entityFlag == "Energy") {

                                        log.info("Mismatched");
                                        if (tError != null) {
                                            tError = tError + "\n" + "Please provide \"" + tLink.getTarget().getName() + "\" as well as \"" + tLink_2.getTarget().getName() + "\".";

                                        } else {
                                            tError = "Please provide \"" + tLink.getTarget().getName() + "\" as well as \"" + tLink_2.getTarget().getName() + "\".";

                                        }
                                    } else if (avail_attr_LovID == 1 && avail_attr_2_LovID == 1 && attr_Value != null && attr_Value_2 != null && Number(attr_Value_2) > Number(attr_Value) && entityFlag == "Energy") {
                                        //log.info("When target attribute is greater");

                                        if (tError != null) {
                                            tError = tError + "\n" + " Value for \"" + tLink.getTarget().getName() + "\" is less than \"" + tLink_2.getTarget().getName() + "\", please check the unit of measure.";

                                        } else {
                                            tError = " Value for \"" + tLink.getTarget().getName() + "\" is less than \"" + tLink_2.getTarget().getName() + "\", please check the unit of measure.";

                                        }

                                    }


                                    ////////////////////////////////
                                    /* if (attr_Value != null && attr_Value_2 == null && entityFlag == "Energy") {

                                        if (tError != null) {
                                            tError = tError + "\n" + "Please provide " + tLink_2.getTarget().getName() + " as well as " + tLink.getTarget().getName();

                                        } else {
                                            tError = "Please provide " + tLink_2.getTarget().getName() + " as well as " + tLink.getTarget().getName();

                                        }
                                    }
                                    //
                                    else if (attr_Value == null && attr_Value_2 != null && entityFlag == "Energy") {
                                        if (tError != null) {
                                            tError = tError + "\n" + "Please provide " + tLink.getTarget().getName() + " as well as " + tLink_2.getTarget().getName();

                                        } else {
                                            tError = "Please provide " + tLink.getTarget().getName() + " as well as " + tLink_2.getTarget().getName();

                                        }
                                    } else if (attr_Value != null && attr_Value_2 != null && Number(attr_Value_2) > Number(attr_Value) && entityFlag == "Energy") {
                                        //log.info("When target attribute is greater");
                                        
                                        if (tError != null) {
                                                tError = tError + "\n" + " Value for " + tLink.getTarget().getName() + " is less than " + tLink_2.getTarget().getName()+ ", please check the unit of measure.";

                                        } else {
                                            tError = " Value for " + tLink.getTarget().getName() + " is less than " + tLink_2.getTarget().getName()+ ", please check the unit of measure.";

                                        }
                                        
                                    } else if (attr_Value != null && attr_Value_2 == null && entityFlag == "Salt") {

                                        if (tError != null) {
                                            tError = tError + "\n" + " Please provide " + tLink_2.getTarget().getName()+ " value, note that " + tLink.getTarget().getName() + " in grams = 2.5 times "+ tLink_2.getTarget().getName() + " in grams.";

                                        } else {
                                            tError = " Please provide " + tLink_2.getTarget().getName()+ " value, note that " + tLink.getTarget().getName() + " in grams = 2.5 times "+ tLink_2.getTarget().getName() + " in grams.";

                                        }
                                    } else if (attr_Value == null && attr_Value_2 != null && entityFlag == "Salt") {

                                        if (tError != null) {
                                            tError = tError + "\n" + "Please provide " + tLink.getTarget().getName() + " value, note that " + tLink_2.getTarget().getName() + " in grams = " + tLink.getTarget().getName() + " divided by 2.5.";

                                        } else {
                                            tError = "Please provide " + tLink.getTarget().getName() + " value, note that " + tLink_2.getTarget().getName() + " in grams = " + tLink.getTarget().getName() + " divided by 2.5.";

                                        }
                                    } */
                                    /*else if (attr_Value != null && attr_Value_2 != null && Number(attr_Value_2) < 10 && entityFlag == "Salt") {

                                        if (tError != null) {
                                            tError = tError + "\n" + "Please provide " + tLink_2.getTarget().getName() + " value in \"mg\" rather than in \"g\".";

                                        } else {
                                            tError = "Please provide " + tLink_2.getTarget().getName() + " value in \"mg\" rather than in \"g\".";

                                        }
                                    } */
                                    else if (avail_attr_LovID == 1 && avail_attr_LovID != avail_attr_2_LovID && entityFlag == "Salt") { // attr_Value != null && attr_Value_2 == null

                                        if (tError != null) {
                                            tError = tError + "\n" + " Please provide " + tLink_2.getTarget().getName() + " value, note that " + tLink.getTarget().getName() + " in grams = 2.5 per " + tLink_2.getTarget().getName() + " in grams.";

                                        } else {
                                            tError = " Please provide " + tLink_2.getTarget().getName() + " value, note that " + tLink.getTarget().getName() + " in grams = 2.5 per " + tLink_2.getTarget().getName() + " in grams.";

                                        }
                                    } else if (avail_attr_2_LovID == 1 && avail_attr_LovID != avail_attr_2_LovID && entityFlag == "Salt") { //  attr_Value == null && attr_Value_2 != null

                                        if (tError != null) {
                                            tError = tError + "\n" + "Please provide " + tLink.getTarget().getName() + " value, note that " + tLink_2.getTarget().getName() + " in grams = " + tLink.getTarget().getName() + " divided by 2.5.";

                                        } else {
                                            tError = "Please provide " + tLink.getTarget().getName() + " value, note that " + tLink_2.getTarget().getName() + " in grams = " + tLink.getTarget().getName() + " divided by 2.5.";

                                        }
                                    } else if (attr_Value != null && attr_Value_2 != null && Number(attr_Value) > Number(attr_Value_2) && entityFlag == "Sugar") {

                                        if (tError != null) {
                                            tError = tError + "\n" + "Where \"" + tLink.getTarget().getName() + "\" is greater than \"" + tLink_2.getTarget().getName() + "\" value, please use \"" + tLink.getTarget().getName() + "\" for \"" + tLink_2.getTarget().getName() + "\".";

                                        } else {
                                            tError = "Where \"" + tLink.getTarget().getName() + "\" is greater than \"" + tLink_2.getTarget().getName() + "\" value, please use \"" + tLink.getTarget().getName() + "\" for \"" + tLink_2.getTarget().getName() + "\".";

                                        }

                                    } else if (attr_Value != null && attr_Value_2 != null && Number(attr_Value) > Number(attr_Value_2) && entityFlag == "Added Sugar") {
                                        if (tError != null) {
                                            tError = tError + "\n" + "Where \"" + tLink.getTarget().getName() + "\" is greater than \"" + tLink_2.getTarget().getName() + "\" value, please use \"" + tLink_2.getTarget().getName() + "\" for \"" + tLink.getTarget().getName() + "\".";

                                        } else {
                                            tError = "Where \"" + tLink.getTarget().getName() + "\" is greater than \"" + tLink_2.getTarget().getName() + "\" value, please use \"" + tLink_2.getTarget().getName() + "\" for \"" + tLink.getTarget().getName() + "\".";

                                        }
                                    } else if (attr_Value != null && sum != null && Number(attr_Value) < Number(sum) && entityFlag == "Fat") { //attr_Value != null && sum != null && attr_Value < sum && entityFlag == "Fat"
                                        if (tError != null) {
                                            tError = tError + "\n" + "Sum of fats is greater than \"Total Fat (g)\", please recheck.";

                                        } else {
                                            tError = "Sum of fats is greater than \"Total Fat (g)\", please recheck.";

                                        }
                                    }

                                    break;
                                }
                            }

                        }

                        break;
                    }
                }
            }
            return tError;
        }

    } catch (error) {
        throw error;
    }

}


/*
Name:	setRCParentHierarchy
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	25/03/2021
Purpose:	To set the Parent of the RC objects depending upon the linked lowest WRIN or DSU, MDMI-9787, Sprint-45
Version History:-
1) Suman Pan - 03/05/2021 - Code is modified as only 2 level of RC hierarchies are required now, MDMI-10038, Sprint-47
2)Suman Chakraborty - 5/28/2021 f RC Group is matching Raw Item Group Code of atleast one of the Supplier Items linked to the RC, then RC will be linked as per that Supplier Item's Hieararchy.
If RC Group is not matching Raw Item Group Code of any of the Supplier Items linked to the RC, then we will consider the Hierarchy for Supplier Item with lowest WRIN Number. MDMI-10040
3) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/
function setRCParentHierarchy(node, step, flag, mailHome) {
    var recipeComponentGroup = node.getValue("a_mm_RecipeComponentGroup").getID();
    var rcHierHome = step.getProductHome().getProductByID("RecipeComponentHierarchy");
    var nodeStatus = node.getValue("a_mm_Status").getID();
    if (rcHierHome != null && nodeStatus != "4" && nodeStatus != "6") {
        var rcToSURefs = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem"));
        var wrin_Array_Same_Grp = [];
        var wrin_Array_Diff_Grp = [];
        var wrin_Array = [];

        for (var a = 0; a < rcToSURefs.size(); a++) {
            var siObj = rcToSURefs.get(a).getTarget();

            if (siObj.getObjectType().getID() == "McDonaldItem") {
                var rawItemGroup = siObj.getValue("ProductGroup").getID();
                if (rawItemGroup == recipeComponentGroup) {
                    var wrinNumber = siObj.getValue("WRINNUMBER").getSimpleValue();
                    if (wrinNumber != null)
                        wrin_Array_Same_Grp.push(wrinNumber);
                } else {
                    var wrinNumber = siObj.getValue("WRINNUMBER").getSimpleValue();
                    if (wrinNumber != null) {
                        wrin_Array_Diff_Grp.push(wrinNumber);

                    }

                }

            }
        }

        if (wrin_Array_Same_Grp.length > 0) {
            wrin_Array = wrin_Array_Same_Grp;
            if (wrin_Array_Diff_Grp.length > 0) {
                if (flag == true) {
                    var market = node.getValue("a_mm_Market").getSimpleValue();
                    var mailer = mailHome.mail();
                    var groupID = "";
                    var powerUserID = "";
                    var context = "";
                    if (market != null) {
                        groupID = "PIMRole15-" + market;
                        //powerUserID = "PIMRole15-" + market;
                        context = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID(market).getValue();
                    }
                    if (groupID != "" && context != "") {



                        var emailHier = step.getEntityHome().getEntityByID("EmailHierarchy");
                        var localEmaillHierarchy = step.getEntityHome().getEntityByID("MailTrigger_019");
                        var globalswitch = emailHier.getValue("a_mm_EmailSwitch").getID();
                        var localswitch = localEmaillHierarchy.getValue("a_mm_EmailSwitch").getID();
                        var envFromEmailHier = emailHier.getValue("a_mm_Environment").getSimpleValue();
                        var fromEmail = emailHier.getValue("a_mm_From(Email)").getSimpleValue();
                        var toEmail = getEmailIdsFromTheGroup(step, groupID);
                        //var ccUser = getEmailIdsFromTheGroup(step, powerUserID);
                        var fromEmail = node.getValue("McDDefaultEmail").getSimpleValue();
                        var subjectEmail = "Recipe Component Group alignment";

                        var bodyEmail = "Dear User,</br></br>" +
                            "For Recipe Component " + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + " one or more SIs are from different SIM product group(s) compared to the Recipe Component Group." + "</br></br>" +
                            "No immediate action is required however you should consider aligning this data in SIM and PIM for future reference." + "</br></br>" +
                            "Thank You";

                        mailer.addTo(toEmail);
                        mailer.from(fromEmail);
                        //mailer.addCc(ccUser);
                        mailer.subject(subjectEmail);
                        mailer.htmlMessage(bodyEmail);
                        if (globalswitch == "01" && localswitch == "01") //email to be triggered when both the switches are turned on
                        {
                            //mailer.send(); //Changed as a part of MDMI-15954
                        }
                    }
                }
            }

        } else {


            wrin_Array = wrin_Array_Diff_Grp;

            //To throw mail if wrin number is not matching
            if (flag == true) {
                var market = node.getValue("a_mm_Market").getSimpleValue();
                var mailer = mailHome.mail();
                var groupID = "";
                var powerUserID = "";
                var context = "";
                if (market != null) {
                    groupID = "PIMRole15-" + market;
                    //powerUserID = "PIMRole15-" + market;
                    context = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID(market).getValue();
                }
                if (groupID != "" && context != "") {



                    var emailHier = step.getEntityHome().getEntityByID("EmailHierarchy");
                    var localEmaillHierarchy = step.getEntityHome().getEntityByID("MailTrigger_019");
                    var globalswitch = emailHier.getValue("a_mm_EmailSwitch").getID();
                    var localswitch = localEmaillHierarchy.getValue("a_mm_EmailSwitch").getID();
                    var envFromEmailHier = emailHier.getValue("a_mm_Environment").getSimpleValue();
                    var fromEmail = emailHier.getValue("a_mm_From(Email)").getSimpleValue();
                    var toEmail = getEmailIdsFromTheGroup(step, groupID);
                    //var ccUser = getEmailIdsFromTheGroup(step, powerUserID);
                    var fromEmail = node.getValue("McDDefaultEmail").getSimpleValue();
                    var subjectEmail = "Recipe Component Group alignment";

                    var bodyEmail = "Dear User,</br></br>" +
                        "For Recipe Component " + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + " one or more SIs are from different SIM product group(s) compared to the Recipe Component Group." + "</br></br>" +
                        "No immediate action is required however you should consider aligning this data in SIM and PIM for future reference." + "</br></br>" +
                        "Thank You";

                    mailer.addTo(toEmail);
                    mailer.from(fromEmail);
                    //mailer.addCc(ccUser);
                    mailer.subject(subjectEmail);
                    mailer.htmlMessage(bodyEmail);
                    if (globalswitch == "01" && localswitch == "01" && toEmail != null && toEmail != "") //email to be triggered when both the switches are turned on
                    {
                        mailer.send();
                    }
                }
            }

        }

        if (wrin_Array.length > 0) {
            wrin_Array.sort();
            var lowestWrinNumber = wrin_Array[0];
            var findWrin = step.getKeyHome().getObjectByKey("GTINWRIN", lowestWrinNumber);
            if (findWrin != null) {
                var McDProduct = findWrin.getParent(); //////////// Level 6 = McD Product: Not Required ///////////
                log.info("McDProduct: " + McDProduct.getID());
                var assemblyItem = McDProduct.getParent(); //////////// Level 5 = Assembly Item with ID pattern as RC_AI_[id] ///////////
                log.info("assemblyItem: " + assemblyItem.getID());
                var McDBrick = assemblyItem.getParent(); //////////// Level 4 = McD Brick with ID pattern as RC_S3_[id] ///////////
                log.info("McDBrick: " + McDBrick.getID());
                var McDClass = McDBrick.getParent(); //////////// Level 3 = McD Class with ID pattern as RC_S2_[id] ///////////
                log.info("McDClass: " + McDClass.getID());
                var McDFamily = McDClass.getParent(); //////////// Level 2 = McD Family with ID pattern as RC_S1_[id] ///////////
                log.info("McDFamily: " + McDFamily.getID());
                var McDSegment = McDFamily.getParent(); //////////// Level 1 = McDSegment with ID pattern as RC_CT_[id]///////////
                log.info("McDSegment: " + McDSegment.getID());

                var lev1_Prod = step.getProductHome().getProductByID("RC_" + McDSegment.getID()); //////////// Level 1 = RC Level 1 /////////////////
                log.info("lev1_Prod 1: " + lev1_Prod);
                if (lev1_Prod == null) {
                    lev1_Prod = rcHierHome.createProduct("RC_" + McDSegment.getID(), "RC_Segment");
                }
                log.info("lev1_Prod 2: " + lev1_Prod);
                lev1_Prod.setName(McDSegment.getName());
                approveObjectInAllContexts(lev1_Prod, step);
                var lev2_Prod = step.getProductHome().getProductByID("RC_" + McDFamily.getID()); //////////// Level 2 = RC Level 2 /////////////////
                if (lev2_Prod == null) {
                    lev2_Prod = lev1_Prod.createProduct("RC_" + McDFamily.getID(), "RC_Family");
                }
                lev2_Prod.setName(McDFamily.getName());
                node.setParent(lev2_Prod);
                approveObjectInAllContexts(lev2_Prod, step);
                /*var lev3_Prod = step.getProductHome().getProductByID("RC_" + McDClass.getID()); //////////// Level 3 = RC Level 3 /////////////////
                if (lev3_Prod == null) {
                    lev3_Prod = lev2_Prod.createProduct("RC_" + McDClass.getID(), "RC_Class");
                }
                lev3_Prod.setName(McDClass.getName());
                lev3_Prod.approve();
                var lev4_Prod = step.getProductHome().getProductByID("RC_" + McDBrick.getID()); //////////// Level 4 = RC Level 4 /////////////////
                if (lev4_Prod == null) {
                    lev4_Prod = lev3_Prod.createProduct("RC_" + McDBrick.getID(), "RC_Brick");
                }
                lev4_Prod.setName(McDBrick.getName());
                lev4_Prod.approve();
                var lev5_Prod = step.getProductHome().getProductByID("RC_" + assemblyItem.getID()); //////////// Level 5 = RC Level 5 /////////////////
                if (lev5_Prod == null) {
                    lev5_Prod = lev4_Prod.createProduct("RC_" + assemblyItem.getID(), "RC_McDonaldAssemblyItem");
                }
                lev5_Prod.setName(assemblyItem.getName());
                node.setParent(lev5_Prod);
                lev5_Prod.approve();*/
            }
        } else {
            var rc_InDev = step.getProductHome().getProductByID("RC_InDev"); //////////// Uncategorized RCs /////////////////
            if (rc_InDev == null) {
                rc_InDev = rcHierHome.createProduct("RC_InDev", "RC_Segment");
            }
            rc_InDev.setName("Uncategorized RCs");
            node.setParent(rc_InDev);
            approveObjectInAllContexts(rc_InDev, step);
        }
    }
}

/*
Name:	approveObjectInAllContexts
Author:	Suman Pan (Suman_Pan.Pan@us.mcd.com)
Date:	30/03/2021
Purpose:	To approve any object in all the available contexts in the system, Sprint-45
Version History:-
*/
function approveObjectInAllContexts(node, step) {
    var allContexts = step.getContextHome().getContexts().iterator();
    while (allContexts.hasNext()) {
        var eachContext = allContexts.next();
        var eachContextID = eachContext.getID();
        step.executeInContext(eachContextID, function (step) {
            var objInEachContext = step.getObjectFromOtherManager(node);
            try {
                objInEachContext.approve();
            } catch (e) {
                log.info("approveObjectInAllContexts: " + e);
                throw (e);
            }
        });
    }
}

/*
Name:	linkedAsset
Author:	Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	04/01/2021
Purpose:	Linked asset with the object
*/
function linkedAsset(node, step, market, assetFolder, assetRef) {
    var tClassification = step.getClassificationHome().getClassificationByID(assetFolder);
    log.info("tClassification " + tClassification);
    if (tClassification != null) {
        var tChild = tClassification.getAssets();
        log.info("tChild " + tChild.size());
        for (var i = 0; i < tChild.size(); i++) {
            var tAsset = tChild.get(i);
            var tSplitAsset = tAsset.getID().split("_");
            var tassetmar = tSplitAsset[0];
            if (tassetmar == market) {
                try {
                    node.createReference(tAsset, assetRef);
                } catch (e) {
                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                        //Target Already Referenced Exception
                        log.info("Reference Already Linked.. ");
                    }
                    else {
                        throw "Exception : " + e;
                    }
                }
            }
        }
    }
}

/*
Name:	sendTaskEmail
Author:	Kirubakaran Gajendran
Date:	04-April-2021
Purpose:	Send Email when task is created on the state - MDMI-7537
Version History:-
1) Suman Pan -- 15/06/2021 -- changed the fetching logic of "a_mm_EmailSwitch" attribute and current context, MDMI-9697, Sprint-49
*/

function sendTaskEmail(node, step, workflow, mailer, wfTag, stateID, screenID) {
    /**************************** Start: Version 1 ************************************/
    //var tCurrentContext = step.getCurrentContext().getID();
    var tEmailHier = step.getEntityHome().getEntityByID("EmailHierarchy");
    var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
    var globalswitch = fetchValueFromSpecificContext(step, nodeMarket, tEmailHier, "a_mm_EmailSwitch", true);
    var contextLOV = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context");
    log.info("Current Context CC1" + nodeMarket);
    var tCurrentContext = contextLOV.getListOfValuesValueByID(nodeMarket).getValue();
    log.info("Current Context CC2" + tCurrentContext);
    //var globalswitch = tEmailHier.getValue("a_mm_EmailSwitch").getID();
    /**************************** End: Version 1 ************************************/
    var workflowID = workflow.getID();
    var workflowName = workflow.getName();

    var wfEmailTriggerID = "EM" + "_" + workflowID; //Ex: EM_wf_mm_DevBMIIdeationandApproval
    var stateEmailTriggerID = wfTag + "_" + stateID; //Ex: BI_DevBMIEnrich

    logger.info("wfEmailTriggerID: " + wfEmailTriggerID);
    logger.info("stateEmailTriggerID: " + stateEmailTriggerID);

    var wfEmaillHierarchy = step.getEntityHome().getEntityByID(wfEmailTriggerID);
    var stateEmaillHierarchy = step.getEntityHome().getEntityByID(stateEmailTriggerID);
    if (stateID == "NutritionScoreCalculationLA") {
        stateID = "NutritionScoreCalculation(LaunchApproval)";
    }

    if (wfEmaillHierarchy != null && stateEmaillHierarchy != null) {
        /**************************** Start: Version 1 ************************************/
        var wfEmailswitch = fetchValueFromSpecificContext(step, nodeMarket, wfEmaillHierarchy, "a_mm_EmailSwitch", true);
        var stateEmailswitch = fetchValueFromSpecificContext(step, nodeMarket, stateEmaillHierarchy, "a_mm_EmailSwitch", true);

        //var wfEmailswitch = wfEmaillHierarchy.getValue("a_mm_EmailSwitch").getID();
        //var stateEmailswitch = stateEmaillHierarchy.getValue("a_mm_EmailSwitch").getID();
        /**************************** End: Version 1 ************************************/
        var tUrlFromEmailHier = tEmailHier.getValue("a_mm_Environment").getSimpleValue();
        var tFrom = tEmailHier.getValue("a_mm_From(Email)").getSimpleValue();
        //var toEmail = step.getCurrentUser().getEMail();
        logger.info("tFrom: " + tFrom);
        var toEmail = null;
        var isCMfromL2 = false;
        var task = node.getWorkflowInstance(workflow).getTaskByID(stateID);
        var userGroup = task.getAssignee().getID();
        var userGroupName = task.getAssignee().getName();
        logger.info("userGroup: " + userGroup);
        if (step.getGroupHome().getGroupByID(userGroup) != null) {
            var objectType = node.getObjectType().getID();
            var mainType = node.getValue("a_mm_RCMaintenanceType").getLOVValue();
            var mainTypeID = "";
            if (mainType) {
                mainTypeID = mainType.getID();
            }
            if ((nodeMarket == "AU" || nodeMarket == "NZ") && objectType == "RecipeComponent") {
                if ((node.isInWorkflow("wf_mm_RecipeComponentMaintenance") && mainTypeID == "01") || node.isInWorkflow("wf_mm_RecipeComponent")) {
                    var isPurchasing = isQAorPurchasingUser(node, step, userGroup);
                    if (isPurchasing != false) {
                        toEmail = ANZToEmailsForQAandPurchasing(node, step, isPurchasing);
                        if (toEmail == null) {
                            toEmail = getEmailIdsFromTheGroup(step, userGroup);
                        } else {
                            isCMfromL2 = true;
                        }
                    } else {
                        toEmail = getEmailIdsFromTheGroup(step, userGroup);
                    }
                } else {
                    toEmail = getEmailIdsFromTheGroup(step, userGroup);
                }
            } else {
                toEmail = getEmailIdsFromTheGroup(step, userGroup);
            }
        }
        logger.info("toEmail: " + toEmail);

        if (tUrlFromEmailHier != null && tFrom != null && toEmail != null && toEmail != "") {

            var nodeID = node.getID();
            var nodeName = getObjectName(node);
            var nodeObjectType = node.getObjectType().getName();
            var stateName = stateEmaillHierarchy.getName();
            logger.info("currentUserName: " + step.getCurrentUser().getName());
            var portalID = "McDonaldsPIMPortal";
            var lastComment = node.getValue("a_mm_LastComment").getSimpleValue();
            logger.info("Last Comment value : " + lastComment);
            ///////////////////////
            var mailLastComment = "";
            if (lastComment != null) {
                var partialComment = lastComment.split("\n");
                for (var i = 0; i < partialComment.length; i++) {
                    if (mailLastComment == "")
                        mailLastComment = partialComment[i] + "<br/>";
                    else if (mailLastComment != "")
                        mailLastComment = mailLastComment + partialComment[i] + "<br/>"
                }
            }
            //////////////////////
            //if(lastComment == null)
            //		lastComment = "";
            var url = tUrlFromEmailHier + "webui/" + portalID + "#contextID=" + tCurrentContext + "&workspaceID=Main&screen=" + screenID + "&stateflow=" + workflowID + "&onlyMine=Group&state=" + stateID;
            if (isCMfromL2 == true) {
                var emailSubject = nodeObjectType + " '" + nodeName + "' - Task created on " + stateName + " state assigned to " + node.getParent().getName() + " category";
                var emailBody = ("Dear User, <br/><br/> Your action is needed. The " + nodeObjectType + " - <b style='color:blue'>" + nodeName + "</b> is assigned to " + node.getParent().getName() + " category in '" + stateName + "' state of " + workflowName + " workflow.<br/><br/><b style='color:black'>Last Comment : </b>" + mailLastComment + "<br/>Please click on the below link to login and proceed to the " + stateName + " task list.<br/><br/>" + url + "<br/><br/>Thank you.  <br/><br/>");
            } else {
                var emailSubject = nodeObjectType + " '" + nodeName + "' - Task created on " + stateName + " state";
                var emailBody = ("Dear User, <br/><br/> Your action is needed. The " + nodeObjectType + " - <b style='color:blue'>" + nodeName + "</b> is assigned to " + userGroupName + " in '" + stateName + "' state of " + workflowName + " workflow.<br/><br/><b style='color:black'>Last Comment : </b>" + mailLastComment + "<br/>Please click on the below link to login and proceed to the " + stateName + " task list.<br/><br/>" + url + "<br/><br/>Thank you.  <br/><br/>");
            }
            if (globalswitch == "01" && wfEmailswitch == "01" && stateEmailswitch == "01") { //email to be triggered when both the switches are turned on

                logger.info("emailBody: " + emailBody);
                logger.info("emailSubject: " + emailSubject);
                //if current user == super user && super user switch == Yes 

                var superUser = isPIMSuperUser(node, step);

                if (superUser == false) {
                    mailer.mail().from(tFrom).addTo(toEmail).htmlMessage(emailBody).subject(emailSubject).send();
                } else {
                    var superUserSwitch = fetchValueFromSpecificContext(step, nodeMarket, stateEmaillHierarchy, "a_mm_IsSuperUserState", true);
                    if (superUserSwitch == "01") {
                        mailer.mail().from(tFrom).addTo(toEmail).htmlMessage(emailBody).subject(emailSubject).send();
                    }
                }
            }
        }
    }
}


/*
Name:	getObjectName
Author:	Kirubakaran Gajendran
Date:	07-April-2021
Purpose:	Send Email when task is created on the state - MDMI-7537
*/
function getObjectName(node) {

    var nodeName = node.getName();

    if (nodeName == null || nodeName == "") {

        var nodeObjectType = node.getObjectType().getID();
        logger.info("nodeObjectType ID: " + nodeObjectType);

        if (nodeObjectType == "BaseMenuItem") {
            nodeName = node.getValue("a_mm_BMIName").getSimpleValue();
        } else if (nodeObjectType == "RecipeComponent") {
            nodeName = node.getValue("a_mm_RecipeComponentName").getSimpleValue();
        } else if (nodeObjectType == "DevSU") {
            nodeName = node.getValue("a_mm_ShippingUnitName").getSimpleValue();
        } else if (nodeObjectType == "ShippingPackage") {
            nodeName = node.getValue("a_mm_ShippingUnitName").getSimpleValue();
        } else if (nodeObjectType == "DevSupplier") {
            nodeName = node.getValue("SIM_Supplier_Legal_Name").getSimpleValue();
        } else if (nodeObjectType == "Event") {
            nodeName = node.getValue("a_mm_PromotionName").getSimpleValue();
        } else if (nodeObjectType == "Restaurants") {
            nodeName = node.getValue("a_mm_Store_Name").getSimpleValue();
        } else if (nodeObjectType == "SoldMenuItem") {
            nodeName = node.getValue("a_mm_SMIName").getSimpleValue();
        } else {
            nodeName = node.getID();
        }
    }

    logger.info("Node Name returned from getObjectName: " + nodeName);
    if (nodeName == null || nodeName == "") {
        nodeName = node.getID();
    }
    return nodeName;
}


/*Name:	     nutritionEntity_nonAvailabilityValidations
Author:	      
Date:	     07/11/2108
Purpose:	     To return error message if mandatory attributes on Entity Reference aren't populated
Applicability: DEV SU Onboarding*/

function nutritionEntity_nonAvailabilityValidations(node, step, reference, check_attr, array) {
    try {
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID(reference);
        if (tRef) {
            var tError = null;
            var tReferences = node.getReferences(tRef);
            if (!tReferences.isEmpty()) {
                for (var i = 0; i < tReferences.size(); i++) {
                    var tLink = tReferences.get(i);
                    var check_attr_obj = step.getAttributeHome().getAttributeByID(check_attr);
                    var attr_LovID = tLink.getValue(check_attr).getID();
                    var attr_Value = tLink.getValue(check_attr).getSimpleValue();
                    var tAttributeName = new java.util.ArrayList();
                    var tAttributeName_2 = new java.util.ArrayList();
                    if (attr_Value != null) {

                        // Condition added for MDMI-9791 : Rahul C : BEGINS
                        if (attr_LovID == "2" && tLink.getValue(array[2]).getSimpleValue() == null) {
                            tAttributeName_2.add(step.getAttributeHome().getAttributeByID(array[2]).getName());
                            if (tError != null) {
                                if (tAttributeName_2.size() > 0)
                                    tError = tError + "\n" + "Please provide a reason in " + tAttributeName_2 + " section, why the value is \"Not Available\" for " + tLink.getTarget().getName() + "(" + tRef.getName() + ")";
                            } else {
                                if (tAttributeName_2.size() > 0)
                                    tError = "Please provide a reason in " + tAttributeName_2 + " section, why the value is \"Not Available\" for " + tLink.getTarget().getName() + "(" + tRef.getName() + ")";
                            }
                        }
                        // Condition added for MDMI-9791 : Rahul C : ENDS

                    }
                }
            }
            return tError;
        }
    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*
Name:	getBMIStatus
Author:	Harshit Sharma (Harshit.Sharma@us.mcd.com)
Date:	04/08/2021
Purpose:	Code used to get the BMI status.
*/
function getBMIStatus(node, step) {
    var getRefedByProds = node.getReferencedByProducts().toArray();
    var tFlag = false;
    for (var a = 0; a < getRefedByProds.length; a++) {
        var getRefdLink = getRefedByProds[a];
        var sourceBMI = getRefdLink.getSource();
        if (getRefdLink.getReferenceTypeString() == "BMIToRecipeComponent" && sourceBMI.getObjectType().getID() == "BaseMenuItem") {
            var tBMIStatus = sourceBMI.getValue("a_mm_Status").getSimpleValue();
            if (!sourceBMI.isInWorkflow("wf_mm_DevBMIIdeationandApproval") && !sourceBMI.isInWorkflow("wf_mm_BMIReplacement") && !sourceBMI.isInWorkflow("wf_mm_BMIMaintenance") && tBMIStatus != "Archived" && tBMIStatus != "Archival Pending" && tBMIStatus != "Inactive") { //tBMIStatus == "Launch Approved" for MDMI-16579
                tFlag = true;
                break;
            }
        }
    }
    return tFlag;
}


/*
Name:	approvedDeclarationRollUp_BMI
Author:	Suman Chakraborty (Suman.Chakraborty@us.mcd.com)
Date:	26/05/2021
Purpose:	Code used to roll up approvedDeclaration for RC attributes
*/
function approvedDeclarationRollUp_BMI(node, step) {



    var tRefRecipeComponent = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");

    var concatenatedAdditionalDeclarationText = "";
    var concatenatedDeclarationNumberText = "";



    var ObjectType = node.getObjectType();
    log.info("value of Object type" + ObjectType.getID());
    if (ObjectType.getID() == "BaseMenuItem") {

        //productCategory = node.getValue("a_mm_RecipeComponentGroup").getSimpleValue();
        productCategory = node.getValue("a_mm_RecipeComponentGroup").getID();
        var objectMarket = node.getValue("a_mm_Market").getSimpleValue();
        log.info("market name of the node" + objectMarket);

        var tRefListRecipeComponent = node.getReferences(tRefRecipeComponent);
        log.info("Number of RC linked to the BMI : " + tRefListRecipeComponent.size());
        for (var j = 0; j < tRefListRecipeComponent.size(); j++) {

            log.info("Inside Recipe Component Loop");
            var rcObject = tRefListRecipeComponent.get(j).getTarget();
            var rcName = rcObject.getName();
            //if (productCategory != null) {
            log.info("Name of RC" + rcName);

            var rcMarket = rcObject.getValue("a_mm_Market").getSimpleValue();

            var marketStatus = checkValidMarketForPIMObjects(node, rcObject, step, "RecipeComponent", "RecipeComponentToRecipeMarket");
            if (marketStatus != null && marketStatus == true) {
                var additionalDeclarationText_POP = "";
                var declarationNumber_POP = "";
                var ingredientDeclaration = rcObject.getValue("a_mm_IngredientDeclaration").getValues();
                log.info("value of the ingredientDeclaration ::" + ingredientDeclaration);
                if (!ingredientDeclaration.isEmpty()) {
                    for (var i = 0; i < ingredientDeclaration.size(); i++) {
                        var tValue = ingredientDeclaration.get(i).getSimpleValue();
                        declarationNumber_POP = declarationNumber_POP + tValue + " ,\n"
                        // log.info("value of the ingredientDeclaration ::" + tValueId);
                    }
                }
                log.info("value of the ingredientDeclaration ::" + declarationNumber_POP);
                //declarationNumber_POP = rcObject.getValue("a_mm_IngredientDeclaration").getSimpleValue();
                if (declarationNumber_POP != null && declarationNumber_POP != "") {
                    log.info("value of the a_mm_SystemDeclaration4 ::");
                    concatenatedAdditionalDeclarationText = concatenatedAdditionalDeclarationText + rcName + " : \n" + declarationNumber_POP;
                }

                additionalDeclarationText_POP = rcObject.getValue("a_mm_AddtionalDeclarationText").getSimpleValue();
                if (additionalDeclarationText_POP != null && declarationNumber_POP != null) {
                    log.info("value of the a_mm_SystemDeclaration3 ::");
                    concatenatedAdditionalDeclarationText = concatenatedAdditionalDeclarationText + additionalDeclarationText_POP + "\n";
                } else if (additionalDeclarationText_POP != null && declarationNumber_POP == null) {
                    log.info("value of the a_mm_SystemDeclaration2 ::");

                    concatenatedAdditionalDeclarationText = concatenatedAdditionalDeclarationText + rcName + " : \n" + additionalDeclarationText_POP;

                }


            }


            // }

        }


        if (concatenatedAdditionalDeclarationText != null) {
            node.getValue("a_mm_SystemDeclaration").setSimpleValue(concatenatedAdditionalDeclarationText.trim());
            node.getValue("a_mm_ApprovedDeclaration").setSimpleValue(concatenatedAdditionalDeclarationText.trim());
            node.getValue("a_mm_POPTextStatementDeclared").setSimpleValue(concatenatedAdditionalDeclarationText.trim());
        }



        log.info("value of the a_mm_SystemDeclaration1 ::" + node.getValue("a_mm_ApprovedDeclaration").getSimpleValue());

    }

}


/*
Name:	validateMenuCode
Author:	Suman Pan (Suman_Pan.pan@us.mcd.com)
Date:	31/05/2021
Purpose:	Validate the menu code if it is already occupied, MDMI-9647, Sprint-48
*/
function validateMenuCode(step, node, availMenuCodeAttrID) {
    var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
    var userEnteredMenuCode = node.getValue(availMenuCodeAttrID).getID();
    log.info("userEnteredMenuCode : " + userEnteredMenuCode);
    var effectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
    var objectType = node.getObjectType().getID();
    if (objectType == "SoldMenuItem") {
        if (userEnteredMenuCode != null && userEnteredMenuCode != "") {
            var nodeKey = userEnteredMenuCode + nodeMarket;
            var isThisNodePresent = step.getProductHome().getObjectByKey("SMI_Key", nodeKey);
            if (isThisNodePresent != null && isThisNodePresent.getID() != node.getID())
                return false;
        }
    } else if (objectType == "BaseMenuItem") {
        if (userEnteredMenuCode != null && userEnteredMenuCode != "") {
            //var nodeKey = userEnteredMenuCode + nodeMarket + effectiveFromDate;
            //var isThisNodePresent = step.getProductHome().getObjectByKey("BMI_Key", nodeKey);
            ////
            var enteredBMINameOrMenuCode = node.getValue(availMenuCodeAttrID).getSimpleValue();
            log.info("enteredBMINameOrMenuCode : " + enteredBMINameOrMenuCode);
            //var enterBMIMenuCode = node.getValue(availMenuCodeAttrID).getLOVValue().getID();
            var bmiLovValue = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_MenuCodesBMI").getListOfValuesValueByID(userEnteredMenuCode).getValue();
            if (enteredBMINameOrMenuCode != bmiLovValue)
                return false;

            ////
            //if (isThisNodePresent != null && isThisNodePresent.getID() != node.getID())
            //    return false;
        }
    }
    return true;
}
/*
Name:	updateMenuCodeAttribute
Author:	Suman Pan (Suman_Pan.pan@us.mcd.com)
Date:	31/05/2021
Purpose:	update MenuCode related attributes, MDMI-9647, Sprint-48
*/
function updateMenuCodeAttribute(step, node, menuCodeLOVID, availMenuCodeAttrID, finalmenuCodeAttrID) {
    var menuCodeLovHome = step.getListOfValuesHome().getListOfValuesByID(menuCodeLOVID);
    var aHashMap = new java.util.HashMap();
    var userEnteredMenuCode = node.getValue(availMenuCodeAttrID).getID();
    var finalMenuCode = node.getValue(finalmenuCodeAttrID).getSimpleValue();
    if (userEnteredMenuCode != null && userEnteredMenuCode != "") {
        if (finalMenuCode != null && finalMenuCode != "" && Number(finalMenuCode) != userEnteredMenuCode) {
            log.info("Attribute Update Start Time:: " + new Date().getTime());
            if (!Number(finalMenuCode) > 999999) {
                menuCodeLovHome.getListOfValuesValueByID(Number(finalMenuCode)).setValue(finalMenuCode, null);
            }
            log.info("Attribute Update End Time:: " + new Date().getTime());
        }
        aHashMap.put(finalmenuCodeAttrID, userEnteredMenuCode);
        step.getKeyHome().updateUniqueKeyValues2(aHashMap, node);
        //node.getValue(availMenuCodeAttrID).setSimpleValue(null);
    }
}


/*
Name:	updateMenuCodeLOV
Author:	Suman Pan (Suman_Pan.pan@us.mcd.com)
Date:	31/05/2021
Purpose:	Update the menu code LOV values, MDMI-9647, Sprint-48
Version History:-
1) Suman Pan -- 01/07/2021 -- To replace static market check, Sprint-50
*/
function updateMenuCodeLOV(step, node, menuCodeLOVID, menuCodeAttrID, nameAttrID) {
    var menuCode = null;
    var menuCodeEditValue = node.getValue(menuCodeAttrID).getLOVValue();
    if (menuCodeEditValue != null) {
        menuCode = menuCodeEditValue.getID();
    }
    if (menuCode != null && menuCode != "") {
        var nodeName = node.getValue(nameAttrID).getSimpleValue();
        log.info("nodeName1 " + nodeName);
        if (nodeName != null) {
            node.setName(nodeName);
        }
        var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
        log.info("nodeMarket1 " + nodeMarket);
        try {
            var contextID = null;
            contextID = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID(nodeMarket).getValue();
            step.executeInContext(contextID, function (step) {
                var menuCodeLovHome = step.getObjectFromOtherManager(step.getListOfValuesHome().getListOfValuesByID(menuCodeLOVID));

                menuCodeLovHome.getListOfValuesValueByID(Number(menuCode)).setValue(nodeName, null);

            });
        } catch (err) {

            log.info(err);
            throw (err);
        }
    }
}

/*
Name:	
Author:	Rahul Choudhary
Date:	02/02/2021
Purpose:	To check duplicate Menu Code for BMI, MDMI-9648, Sprint-48
*/
function menuCodeDuplicateCheck(node, step, Attribute, menuCodeAttribute) { //  Attribute = a_mm_BMIMenuCodeEdit , menuCodeAttribute =  a_mm_BMIMenuCode
    // Adding code for storing the IDs of BMI's in BMI to BMI version reference : BEGINS : INC12544050
    var bmiHashSet = new java.util.HashSet("");
    var bmiToBMIReferecnes = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToBMIVersion"));

    if (bmiToBMIReferecnes) {
        for (var i = 0; i < bmiToBMIReferecnes.size(); i++) {
            var referrencedBMIID = bmiToBMIReferecnes.get(i).getTarget().getID();
            if (referrencedBMIID != null) {
                bmiHashSet.add(referrencedBMIID);
            }
        }
    }
    // Adding code for storing the IDs of BMI's in BMI to BMI version reference : ENDS : INC12544050
    var attributeObj = step.getAttributeHome().getAttributeByID(menuCodeAttribute);
    var providedMenuCode = node.getValue(Attribute).getID();
    if (providedMenuCode != null) {
        providedMenuCode = providedMenuCode.trim();
    }
    var tError = null
    var searchResObjType, searchResObjMarket, searchResMenuCode, searchResObjID;
    var searchQuery = new com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification(com.stibo.core.domain.Product, attributeObj, providedMenuCode);
    var searchResults = step.getHome(com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome).querySingleAttribute(searchQuery).asList(100);
    var market = node.getValue("a_mm_Market").getSimpleValue();
    var ObjectType = node.getObjectType().getID();
    log.info("Number of searched results " + searchResults.size());
    if (searchResults.size() > 0) {
        for (i = 0; i < searchResults.size(); i++) {
            searchResObjType = searchResults.get(i).getObjectType().getID();
            searchResObjMarket = searchResults.get(i).getValue("a_mm_Market").getSimpleValue();
            searchResMenuCode = searchResults.get(i).getValue(menuCodeAttribute).getSimpleValue(); // Gives the Menu code from the Searched result
            searchResObjID = searchResults.get(i).getID();

            if (searchResObjType == ObjectType && searchResObjMarket == market && searchResObjID != node.getID()) {
                if (bmiHashSet.contains(searchResObjID)) {
                    log.info("Do Nothing");
                } else {
                    tError = node.getObjectType().getName() + " with same Menu Code already exists in the system with Menu Code as '" + searchResMenuCode + "'. Please choose a different Menu Code to continue. ";
                    return tError;
                }
            }
        }

    }
    return true;
}

/* Name: menuCodeRangeValidation
Author: Suman Pan
Date: 21/06/2021
Purpose: To validate Menu Code attribute range, MDMI-10292, Sprint-49
Revision History:
1) 03-10-2021 : Rahul Choudhary : Code modified to incorporate FR market menu code validations : MDMI-10681 : Sprint 54
*/
function menuCodeRangeValidation(node, step, menuCodeAttribute) {
    var validationFlag = true;
    var maxRange, minRange = null;
    var market = node.getValue("a_mm_Market").getSimpleValue();
    /*if(market == "UK"){ // For Future Market Onboarding modify this code block: currently only for UK
        maxRange = 9999;
        minRange = 1000;
    }*/

    maxRange = fetchValueFromSpecificContext(step, market, menuCodeAttribute, "a_mm_MenuCodeMaxRange", false);
    minRange = fetchValueFromSpecificContext(step, market, menuCodeAttribute, "a_mm_MenuCodeMinRange", false);
    var startTime = new Date().getTime();
    //log.info("Logger START Time : " + startTime);
    var menuCodeValue = node.getValue(menuCodeAttribute.getID()).getID();
    var endTime = new Date().getTime();
    //log.info("Logger END Time : " + endTime);
    log.info("EXECUTION TIME in ms ::: " + (endTime - startTime));

    if (Number(menuCodeValue) < minRange || Number(menuCodeValue) > maxRange) {
        validationFlag = menuCodeAttribute.getName() + " value should be between " + minRange + " and " + maxRange;
    }
    return validationFlag;
}



/*
 * Name: UpdateSMIToRestaurantLink
 * Author:	Kirubakaran Gajendran
 * Purpose:	Update SMI To Restaurant Link as part of MDMI-9554 in Sprint 43 - To RFM FEED
 Version History:-
 1)  Added new method 'UpdateSMIToRestaurantLink'
 */
function UpdateSMIToRestaurantLink(node, step) {

    try {

        var count = 0;
        var tContext = step.getCurrentContext().getID();
        var tCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(getCurrentDate(step, tContext));
        tCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tCurrentDate);
        var todayDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tCurrentDate);
        var tSMIToRecipeLink = step.getReferenceTypeHome().getReferenceTypeByID("SMIToRecipeComponent");
        log.info("tCurrentDate func " + todayDate);

        tCurrentDate.setDate(tCurrentDate.getDate() + 1);
        var tomorrowDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tCurrentDate);
        log.info("tCurrentDate func " + tomorrowDate);
        var tSMIoRES = step.getReferenceTypeHome().getReferenceTypeByID("SMItoRestaurant");
        var tRESLinks = node.getReferences(tSMIoRES);
        var tSMIToRecipeRef = node.getReferences(tSMIToRecipeLink);
        var linkedSMIs = new java.util.HashSet("");
        for (var e = 0; e < tSMIToRecipeRef.size(); e++) {
            var eachRC = tSMIToRecipeRef.get(e).getTarget().getID();
            if (!linkedSMIs.contains(eachRC)) {
                linkedSMIs.add(eachRC);
            }
        }
        var linkedSMIsAttr = linkedSMIs.toArray();
        var tSMIGroupEffFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        var tSMIGroupEffToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
        //log.info("tSMIGroupEffFromDate func " + tSMIGroupEffFromDate);
        //log.info("tSMIGroupEffToDate func " + tSMIGroupEffToDate);

        var restInSMI = node.getValue("a_mm_RestaurantsLinkedOnSMI").getSimpleValue();
        //logger.info("restInSMI: " + restInSMI);

        var restFromSMIGroupString = node.getValue("a_mm_LinkedRestFromSMIGroups").getSimpleValue();
        var restFromSMIGroup = node.getValue("a_mm_LinkedRestFromSMIGroups").getSimpleValue() + "";
        //logger.info(node.getID() + " - restFromSMIGroup: " + restFromSMIGroup);

        tRESLinks = node.getReferences(tSMIoRES);

        if (restFromSMIGroup != null) {

            var restFromSMIGroupSplit = restFromSMIGroup.split(",");
            logger.info("restFromSMIGroupSplit.length " + restFromSMIGroupSplit.length);
            var uniqueSMIIDs = restFromSMIGroupSplit.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            }); // REMOVE DUPLICATES

            logger.info("K-uniqueSMIIDs Length: " + uniqueSMIIDs.length);
            logger.info("K-tRESLinks size: " + tRESLinks.size());

            for (var a = 0; a < uniqueSMIIDs.length; a++) {
                var resInSMIGID = uniqueSMIIDs[a] + "";
                var restNode = step.getProductHome().getProductByID(resInSMIGID);

                if (restNode != null) {

                    if (tRESLinks.size() > 0) {

                        //logger.info("restInSMI: " + restInSMI + " - " + resInSMIGID);
                        for (var j = 0; j < tRESLinks.size(); j++) {

                            var TarRest = tRESLinks.get(j).getTarget();

                            if (!restFromSMIGroupString.contains(TarRest.getID())) {

                                logger.info("INVALID Restaurant : " + TarRest.getID());
                                tRESLinks.get(j).getValue("a_mm_RFMRestaurantStatus").setSimpleValue("No");
                                tRESLinks.get(j).getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(tomorrowDate);

                            } else {

                                if (!restInSMI.contains(restNode.getID())) {
                                    try {

                                        var SMIToRESCreated = node.createReference(restNode, tSMIoRES);
                                        SMIToRESCreated.getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(todayDate);
                                        SMIToRESCreated.getValue("a_mm_EffectiveToDate").setSimpleValue(tSMIGroupEffToDate);
                                        SMIToRESCreated.getValue("a_mm_RFMRestaurantStatus").setSimpleValue("Yes");

                                        for (var h = 0; h < linkedSMIsAttr.length; h++) {
                                            var rcProd = step.getProductHome().getProductByID(linkedSMIsAttr[h].trim());
                                            rcProd.createReference(restNode, "RecipeComponentToRestaurants"); //----- Add New Restaurant
                                        }

                                    } catch (e) {
                                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                            //Target Already Referenced Exception
                                            log.info("Reference Already Linked.. ");
                                        }
                                        else {
                                            throw "Exception : " + e;
                                        }
                                    }
                                }

                                if (TarRest.getID() == resInSMIGID) {

                                    var targetResEffFromDate = tRESLinks.get(j).getValue("a_mm_EffectFrmDtSMIToRest").getSimpleValue();
                                    var targetResEffToDate = tRESLinks.get(j).getValue("a_mm_EffectiveToDate").getSimpleValue();

                                    if (targetResEffFromDate == null) {
                                        tRESLinks.get(j).getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(todayDate);
                                    }
                                    if (targetResEffToDate != null && tSMIGroupEffToDate != null) {
                                        targetResEffToDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(targetResEffToDate);
                                        var SMIGEffToDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tSMIGroupEffToDate);
                                        if (targetResEffToDate.before(SMIGEffToDate)) {
                                            tRESLinks.get(j).getValue("a_mm_EffectiveToDate").setSimpleValue(tSMIGroupEffToDate);
                                        }
                                    } else {
                                        tRESLinks.get(j).getValue("a_mm_EffectiveToDate").setSimpleValue(tSMIGroupEffToDate);
                                    }
                                    //logger.info(tRESLinks.get(j).getTarget().getID() + " - FINAL FROM DATE: " + tRESLinks.get(j).getValue("a_mm_EffectFrmDtSMIToRest").getSimpleValue());
                                    //logger.info(tRESLinks.get(j).getTarget().getID() + " - FINAL TO DATE: " + tRESLinks.get(j).getValue("a_mm_EffectiveToDate").getSimpleValue());

                                }
                            }
                        }

                    } else {

                        try {
                            count = count + 1;
                            var SMIToRESCreated = node.createReference(restNode, tSMIoRES);
                            SMIToRESCreated.getValue("a_mm_EffectFrmDtSMIToRest").setSimpleValue(todayDate);
                            SMIToRESCreated.getValue("a_mm_EffectiveToDate").setSimpleValue(tSMIGroupEffToDate);
                            SMIToRESCreated.getValue("a_mm_RFMRestaurantStatus").setSimpleValue("Yes");
                            for (var k = 0; k < linkedSMIsAttr.length; k++) {
                                var rcProd = step.getProductHome().getProductByID(linkedSMIsAttr[k].trim());
                                rcProd.createReference(restNode, "RecipeComponentToRestaurants"); //----- Add New Restaurant
                            }
                        } catch (e) {
                            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                //Target Already Referenced Exception
                                log.info("Reference Already Linked.. ");
                            }
                            else {
                                throw "Exception : " + e;
                            }
                        }
                    }
                }

            }
        }
        logger.info("Final Count = " + count);


        // Start of Version 1 //
        var smiStatus = node.getValue("a_mm_Status").getSimpleValue();
        if (smiStatus != null && ((!node.isInWorkflow("wf_mm_SMILaunchWorkflow") && !node.isInWorkflow("wf_mm_SMIMaintenance") && smiStatus != "Archived" && smiStatus != "Archival Pending" && smiStatus != "Inactive") || node.getValue("a_mm_Status").getID() == "6")) { //node.getValue("a_mm_Status").getID() == "2" for MDMI-16579
            approveBmirAndSmiPartially(node, step);
            //approveObjectInAllContexts(node, step);
            for (var h = 0; h < linkedSMIsAttr.length; h++) {
                var rcProd = step.getProductHome().getProductByID(linkedSMIsAttr[h].trim());
                rcProd.approve();
                //approveObjectInAllContexts(rcProd, step);
            }
        }
        // End of Version 1 //


    } catch (err) {
        log.info("Exception Caught in Deactivate SMI func: " + err);
        throw (err);
    }
}



/*
Name:	setMarketAttributeWRTContext
Author:	Suman Pan (Suman_Pan.pan@us.mcd.com)
Date:	01/07/2021
Purpose:	set Market atribute depending upon context, Sprint-50
*/
function setMarketAttributeWRTContext(step, node) {
    var currentContext = step.getCurrentContext();
    var contextLOVHome = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context");
    var allContextLOVValues = contextLOVHome.queryValidValues().asList(100);
    if (allContextLOVValues.size() > 0) {
        for (var i = 0; i < allContextLOVValues.size(); i++) {
            var eachLOVValue = allContextLOVValues.get(i);
            if (eachLOVValue.getValue() == currentContext.getID()) {
                var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
                if (nodeMarket == null) {
                    node.getValue("a_mm_Market").setSimpleValue(eachLOVValue.getID());
                }
                break;
            }
        }
    }
}

/*
Name:	linkMarketClassificationWRTMarket
Author:	Suman Pan (Suman_Pan.pan@us.mcd.com)
Date:	01/07/2021
Purpose:	link Market Classification depending upon market, Sprint-50
*/
function linkMarketClassificationWRTMarket(step, node, staticClassificationID, linkID, parentClassID, classObjType) {
    var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
    if (nodeMarket != null && nodeMarket != "") {
        var linkHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID(linkID);
        var classificationID = staticClassificationID + nodeMarket;
        var classificationHome = step.getClassificationHome().getClassificationByID(classificationID);
        if (classificationHome == null) {
            var parentClassHome = step.getClassificationHome().getClassificationByID(parentClassID);
            if (parentClassHome != null && classObjType != null) {
                try {
                    classificationHome = parentClassHome.createClassification(classificationID, classObjType);
                    if (staticClassificationID == null || staticClassificationID == "") {
                        classificationHome.setName(nodeMarket);
                    } else {
                        classificationHome.setName(staticClassificationID + " " + nodeMarket);
                    }
                    classificationHome.approve();
                } catch (e) {
                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                        //Target Already Referenced Exception
                        log.info("Reference Already Linked.. ");
                    }
                    else {
                        throw "Exception : " + e;
                    }
                }
            }
        }
        if (linkHome != null && classificationHome != null) {
            try {
                node.createClassificationProductLink(classificationHome, linkHome);
            } catch (e) {
                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                    //Target Already Referenced Exception
                    log.info("Reference Already Linked.. ");
                }
                else {
                    throw "Exception : " + e;
                }
            }
        }
    }
}

/*
Name:	autoSubmitIfStateNotPIMBasic
Author:	Suman Pan (Suman_Pan.pan@us.mcd.com)
Date:	05/07/2021
Purpose:	Auto submit the task if the current state is not part of PIM Basic, Sprint-50
*/
function autoSubmitIfStateNotPIMBasic(step, node, workflowAbbrv, workflow, stateID, activity) {
    var workflowID = workflow.getID(); // Added as part of INC15447593
    if (isPIMSuperUser(node, step) && (workflowID == "wf_mm_SMILaunchWorkflow" || workflowID == "wf_mm_SMIMaintenance" || workflowID == "wf_mm_DevBMIIdeationandApproval" || workflowID == "wf_mm_BMIReplacement")) return; // Added as part of INC15447593
    var workflowStateID = workflowAbbrv + "_" + stateID;
    var workflowStateEntity = step.getEntityHome().getEntityByID(workflowStateID);
    if (workflowStateEntity) {
        log.info("RBP state workflowStateEntity: " + workflowStateEntity);
        var workflowStateSwitch = workflowStateEntity.getValue("a_mm_WorkflowStateSwitch").getID();
        log.info("RBP state switch: " + workflowStateSwitch);
        if (workflowStateSwitch == "00") {
            log.info("RBP state workflowStateSwitch: " + workflowStateSwitch);
            if (activity == "AutoSubmitTrigger") {
                try {
                    log.info("RBP state activity: " + activity);
                    node.getWorkflowInstance(workflow).getTaskByID(stateID).triggerLaterByID("AutoSubmit", "Auto Submitted as workflow switch is No");
                } catch (e) {
                    log.info("Error in autoSubmitIfStateNotPIMBasic: " + e);
                    throw (e);
                }
            }
            log.info("RBP autosubmit false ");
            return false;
        }
    }
    log.info("RBP autosubmit true ");
    return true;
}

/*
Name:	 autoSubmitIfStateNotPIMBasic
Author:	 Suman Pan (Suman_Pan.pan@us.mcd.com)
Date:	 05/07/2021
Purpose: coppied the 'autoSubmitIfStateNotPIMBasic' as pert of MDMI-18037 & MDMI-18044 to avoid the Impact of other places, Sprint-111
*/
function autoSubmitIfStateNotPIMBasic_SuperUser(step, node, workflowAbbrv, workflow, stateID, activity) {
    //var workflowID = workflow.getID(); // Added as part of INC15447593
    //if(isPIMSuperUser(node,step) && (workflowID == "wf_mm_SMILaunchWorkflow" || workflowID == "wf_mm_SMIMaintenance" || workflowID == "wf_mm_DevBMIIdeationandApproval" || workflowID == "wf_mm_BMIReplacement"))//return; // Added as part of INC15447593
    var workflowStateID = workflowAbbrv + "_" + stateID;
    var workflowStateEntity = step.getEntityHome().getEntityByID(workflowStateID);
    if (workflowStateEntity) {
        log.info("RBP state workflowStateEntity: " + workflowStateEntity);
        var workflowStateSwitch = workflowStateEntity.getValue("a_mm_WorkflowStateSwitch").getID();
        log.info("RBP state switch: " + workflowStateSwitch);
        if (workflowStateSwitch == "00") {
            log.info("RBP state workflowStateSwitch: " + workflowStateSwitch);
            if (activity == "AutoSubmitTrigger") {
                try {
                    log.info("RBP state activity: " + activity);
                    node.getWorkflowInstance(workflow).getTaskByID(stateID).triggerLaterByID("AutoSubmit", "Auto Submitted as workflow switch is No");
                } catch (e) {
                    log.info("Error in autoSubmitIfStateNotPIMBasic: " + e);
                    throw (e);
                }
            }
            log.info("RBP autosubmit false ");
            return false;
        }
    }
    log.info("RBP autosubmit true ");
    return true;
}


/*
Name:	calculateSMITaskDueDate
Author:	Kirubakaran Gajendran
Date:	03/Aug/2021	  
Purpose: To set the SMI due date
*/
function calculateSMITaskDueDate(node, step) {

    var workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_SMILaunchWorkflow");

    var stateID = "";

    if (node.getValue("a_mm_CurrentStateID").getSimpleValue() != null && node.getWorkflowInstance(workflow) != null) {
        stateID = node.getValue("a_mm_CurrentStateID").getSimpleValue();
    }

    logger.info("stateID " + stateID);

    if (stateID == "SMIEnrich") {

        //var currentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
        var currentDate = new Date();
        logger.info("currentDate: " + currentDate);

        var entityNode = step.getEntityHome().getEntityByID("MS_" + stateID);
        var entityOffset = entityNode.getValue("a_mm_Offset").getSimpleValue();
        var addedDays = Number(entityOffset);
        logger.info("addedDays in SMIEntich: " + addedDays);
        var dueDate = addWorkDays(currentDate, addedDays);
        var day = dueDate.getDay();

        dueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dueDate);
        dueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dueDate);
        logger.info("again dueDate: " + dueDate);

        if (day == 1) { // If day is Monday
            dueDate.setDate(dueDate.getDate() - 2);
            dueDate.setSeconds(dueDate.getSeconds() - 1);
        } else {
            dueDate.setSeconds(dueDate.getSeconds() - 1);
        }

        logger.info("Due Date: " + dueDate);


        var stateTask = node.getWorkflowInstance(workflow).getTaskByID(stateID);
        if (stateTask != null) {
            node.getWorkflowInstance(workflow).getTaskByID(stateID).setDeadline(dueDate);
            logger.info("Task DeadLine : " + node.getWorkflowInstance(workflow).getTaskByID(stateID).getDeadline());

            var formatedDueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dueDate);
            node.getValue("a_mm_DueDate").setSimpleValue(formatedDueDate);
            logger.info("ISO Due Date: " + node.getValue("a_mm_DueDate").getSimpleValue());

            setTaskPriority(node, step);
        }
        stateID = "";

    }


    var entityNode = step.getEntityHome().getEntityByID("MS_" + stateID);
    logger.info("entityNode: " + entityNode);
    if (entityNode != null) {

        var entitySNO = entityNode.getValue("a_mm_SerialNumber").getSimpleValue();
        var entityOffset = entityNode.getValue("a_mm_Offset").getSimpleValue();
        var children = entityNode.getParent().getChildren();

        logger.info("entityNode Offset: " + entityOffset);
        logger.info("entityParent: " + entityNode.getParent().getName());
        var PropOffset = 0;

        for (var i = 0; i < children.size(); i++) {
            var entityChildSNO = children.get(i).getValue("a_mm_SerialNumber").getSimpleValue();
            var entityChildPropOffset = children.get(i).getValue("a_mm_ProportionalOffset").getSimpleValue();

            logger.info("entityChildSNO: " + entityChildSNO);
            logger.info("entitySNO: " + entitySNO);


            if (Number(entityChildSNO) <= Number(entitySNO)) {

                logger.info("PropOffset entry: " + Number(PropOffset));
                logger.info("PropOffset entry: " + Number(entityChildPropOffset));
                PropOffset = Number(PropOffset) + Number(entityChildPropOffset);
                PropOffset = PropOffset.toFixed(9);
                logger.info("PropOffset end: " + PropOffset);
            }
        }

        //var msNode = step.getEntityHome().getEntityByID("MileStone_" + node.getValue("a_mm_BMIStage").getID());
        var msNode = step.getEntityHome().getEntityByID("MileStone_07");
        logger.info("msNode: " + msNode);
        logger.info("PropOffset: " + PropOffset);

        if (PropOffset != 0 && msNode != null) {

            var sourceDateAttrID = msNode.getValue("a_mm_sourceMileStoneAttr").getSimpleValue();
            var targetDateAttrID = msNode.getValue("a_mm_targetMileStoneAttr").getSimpleValue();

            logger.info("sourceDateAttrID: " + sourceDateAttrID);
            logger.info("targetDateAttrID: " + targetDateAttrID);

            if (sourceDateAttrID != null && sourceDateAttrID != "" && targetDateAttrID != null && targetDateAttrID != "") {

                var sourceDate = node.getValue(sourceDateAttrID).getSimpleValue();
                var targetDate = node.getValue(targetDateAttrID).getSimpleValue();

                logger.info("sourceDate: " + sourceDate);
                logger.info("targetDate: " + targetDate);

                if (sourceDate != null && targetDate != null) {
                    //Method To pull the difference of Dates

                    var startDate = parseTLDate(sourceDate);
                    var endDate = parseTLDate(targetDate);
                    logger.info("startDate: " + startDate);
                    logger.info("endDate: " + endDate);

                    var noOfWorkingDays = workingDaysBetweenDates(startDate, endDate);
                    logger.info("No of Working Days between the dates: " + noOfWorkingDays);
                    var PropOffsetTime = (noOfWorkingDays * PropOffset);
                    logger.info("PropOffsetTime: " + PropOffsetTime);
                    PropOffsetTime = Math.ceil(PropOffsetTime);
                    logger.info("Final PropOffsetTime: " + PropOffsetTime);

                    var parseSourceDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(sourceDate);
                    logger.info("parseSourceDate: " + parseSourceDate);
                    PropOffsetTime = PropOffsetTime + 1;
                    logger.info("No of Working Days between the dates: " + PropOffsetTime);

                    var dueDate = addWorkDays(parseSourceDate, PropOffsetTime);
                    logger.info("Due Date before one sec subtraction: " + dueDate);


                    if (dueDate.getDay() == 1) { // If day is Monday
                        dueDate.setDate(dueDate.getDate() - 2);
                        dueDate.setSeconds(dueDate.getSeconds() - 1);
                    } else {
                        dueDate.setSeconds(dueDate.getSeconds() - 1);
                    }

                    logger.info("Due Date: " + dueDate);
                    logger.info("stateID: " + stateID);

                    var task = node.getWorkflowInstance(workflow).getTaskByID(stateID);
                    logger.info("task: " + task);
                    if (task != null) {
                        node.getWorkflowInstance(workflow).getTaskByID(stateID).setDeadline(dueDate);
                        logger.info("Task DeadLine : " + node.getWorkflowInstance(workflow).getTaskByID(stateID).getDeadline());

                        var formatedDueDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dueDate);
                        node.getValue("a_mm_DueDate").setSimpleValue(formatedDueDate);
                        logger.info("ISO Due Date: " + node.getValue("a_mm_DueDate").getSimpleValue());

                        setTaskPriority(node, step);
                    }
                }
            }
        }
    }
}


/*
Name:	SMIEventDatePopulate
Author:	Kirubakaran Gajendran
Date:	03/Aug/2021	  
Purpose: To populate Event dates on the SMI
*/

function SMIEventDatePopulate(node, step, workflow) {
    try {
        var aAttributeList = new java.util.ArrayList();
        //Changes as part of MDMI-8617
        aAttributeList.addAll(["a_mm_LaunchApprovalDate", "a_mm_SMI_MilestoneDate"]);
        log.info("aAttributeList.size: " + aAttributeList.size());
        var tRef = step.getReferenceTypeHome().getReferenceTypeByID("SMIToEvent");
        if (tRef) {

            var tMarket = node.getValue("a_mm_Market").getSimpleValue();
            var tReferences = node.getReferences(tRef);
            if (!tReferences.isEmpty()) {
                if (tReferences.size() == 1) {

                    for (var i = 0; i < aAttributeList.size(); i++) {
                        if (isAttributeValid(node, step, aAttributeList.get(i)) && isAttributeValid(tReferences.get(0).getTarget(), step, aAttributeList.get(i))) {
                            var tValue = tReferences.get(0).getTarget().getValue(aAttributeList.get(i)).getSimpleValue();
                            log.info("tValue: " + tValue);
                            if (tValue != null) {
                                node.getValue(aAttributeList.get(i)).setSimpleValue(tValue);
                                if (node.getWorkflowInstance(workflow) != null) {
                                    node.getWorkflowInstance(workflow).setSimpleVariable("wf_mm_EventDetails", "Yes");
                                }
                            }
                        }
                    }
                } else if (tReferences.size() > 1) {
                    var tEventID = null
                    var tStartDate = "";
                    for (var i = 0; i < tReferences.size(); i++) {
                        var tEventObj = tReferences.get(i).getTarget();
                        var tEventStartDate = tEventObj.getValue("a_mm_PromotionStartDate").getSimpleValue();
                        log.info("tEventStartDate " + tEventStartDate);
                        if (tEventStartDate != null) {
                            var tStartDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tEventStartDate);
                            if (tStartDate == "") {
                                tStartDate = tEventStartDate;
                                tEventID = tEventObj.getID();
                                log.info("tStartDate1 " + tStartDate);
                            } else {
                                var pStartDateParsed = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tStartDate);
                                if (tStartDateParsed.before(pStartDateParsed)) {
                                    var tStartDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd").format(tStartDateParsed);
                                    tStartDate = tStartDateFormat;
                                    tEventID = tEventObj.getID();
                                    log.info("tStartDate2 " + tStartDate);
                                }
                            }
                        }
                    }
                    if (tEventID != null && tStartDate != null) {

                        var tEvent = step.getProductHome().getProductByID(tEventID);
                        log.info("When size more than one: " + tEvent.getName());
                        for (var i = 0; i < aAttributeList.size(); i++) {
                            if (isAttributeValid(node, step, aAttributeList.get(i)) && isAttributeValid(tEvent, step, aAttributeList.get(i))) {
                                var tValue = tEvent.getValue(aAttributeList.get(i)).getSimpleValue();
                                if (tValue != null) {
                                    node.getValue(aAttributeList.get(i)).setSimpleValue(tValue);
                                    if (node.getWorkflowInstance(workflow) != null) {
                                        node.getWorkflowInstance(workflow).setSimpleVariable("wf_mm_EventDetails", "Yes");
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    } catch (err) {
        log.info(err);
        throw (err);
    }
}

/*
Name:	marketingNameMandatoryCheckInContextLanguages
Author:	Amit Kumar
Date:	16/Sept/2021	  
Purpose: Mandatory Check of Marketing Names in all Context Language.
*/
function marketingNameMandatoryCheckInContextLanguages(node, step, currentContextObj) {
    var currentContext = currentContextObj.getID();
    var flag = true;
    var sourceNode;
    var result = true;

    var dataContainer = node.getDataContainerByTypeID("dc_mm_RFMMultiLanguageTable");
    var dataContainerObjs = dataContainer.getDataContainers().toArray();
    for (var k = 0; k < dataContainerObjs.length; k++) {
        var dataContainerObj = dataContainerObjs[k].getDataContainerObject();

        var csoName = dataContainerObj.getValue("a_mm_CSOName").getSimpleValue();
        if (csoName == null || csoName == "") {
            result = false;
        }
    }


    /*  var string = ["A", "B", "C", "D", "E", "F", "G", "H"];
      for (i = 0; i < string.length; i++) {
          var contextLanguages = currentContext + string[i];
          //log.info("Context :: Languages"+contextLanguages);
          step.executeInContext(contextLanguages, function(step) {
              sourceNode = step.getObjectFromOtherManager(node);
              var exeContext = currentContextObj.getName();
              var csoName = sourceNode.getValue("a_mm_CSOName").getSimpleValue();
              //log.info(csoName);
              if (csoName == null) {
                  //log.info("CSOName is not filled in all Marketing Languages");
                  result = false;
              }
          });
      }*/

    return result;
}

function eventDatesValidation(node, step, workflow) {
    var sErrorMessage = null;

    function setErrorMessage(sNewErrorMessage) {
        if (sErrorMessage == null)
            sErrorMessage = sNewErrorMessage;
        else {
            if (sNewErrorMessage != null)
                sErrorMessage = sErrorMessage + "\n" + sNewErrorMessage;
        }
        return sErrorMessage;
    }

    function getDays(node, step, attribute) {
        try {
            if (isAttributeValid(node, step, attribute)) {
                var tDate = node.getValue(attribute).getSimpleValue();
                var parseDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(tDate);
                var tDay = parseDate.getDay();
                if (tDay == 0 || tDay == 6) {
                    sErrorMessage = setErrorMessage("Please select " + step.getAttributeHome().getAttributeByID(attribute).getName() + " as a week days.");
                }
            }
            return null;
        } catch (err) {
            log.info(err);
            throw (err);
        }
    }
    var tContext = step.getCurrentContext().getID();
    var tMarket = node.getValue("a_mm_Market").getSimpleValue();
    var tStatus = node.getValue("a_mm_Status").getSimpleValue();
    var dCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(getCurrentDate(step, tContext));
    log.info("dCurrentDate: " + dCurrentDate);
    var dPromoStartdate = node.getValue("a_mm_PromotionStartDate").getSimpleValue();
    var BMIItemDefinedDate = node.getValue("a_mm_TasteApprovalDate").getSimpleValue();
    //var futureEvent = node.getWorkflowInstance(workflow).getSimpleVariable("wf_mm_FutureEvent")
    //if (dPromoStartdate != null)
    //  dPromoStartdate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dPromoStartdate);
    var dPromoEnddate = node.getValue("a_mm_PromotionEndDate").getSimpleValue();
    var dPromoDestockagedate = node.getValue("a_mm_Promotion_DestockageDate").getSimpleValue();
    sErrorMessage = setErrorMessage(getDays(node, step, "a_mm_TasteApprovalDate"));
    sErrorMessage = setErrorMessage(getDays(node, step, "a_mm_LaunchApprovalDate"));
    sErrorMessage = setErrorMessage(getDays(node, step, "a_mm_HODApprovalDate"));
    sErrorMessage = setErrorMessage(getDays(node, step, "a_mm_DepartmentalApprovalDate"));
    sErrorMessage = setErrorMessage(getDays(node, step, "a_mm_FeasibilityApprovalDate"));
    sErrorMessage = setErrorMessage(getDays(node, step, "a_mm_SMI_MilestoneDate"));
    sErrorMessage = setErrorMessage(getDays(node, step, "a_mm_ScanTestSignOffDate"));
    //Event Name Duplicate Check
    var duplicate = attrDuplicateCheck(node, step, "a_mm_PromotionName", "a_mm_Status");
    if (duplicate != true)
        sErrorMessage = setErrorMessage(duplicate);

    if (isAttributeValid(node, step, "a_mm_PromotionEndDate")) {
        var dEndDate = node.getValue("a_mm_PromotionEndDate").getSimpleValue();
        log.info("dEndDate:" + dEndDate);
        if (dEndDate != null) {
            dEndDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(dEndDate);
            log.info("Date Test 1");
            dDate = new java.util.Date("31-Dec-2099");
            log.info("dDate:" + dDate);
            if (dEndDate.after(dDate))
                sErrorMessage = setErrorMessage("End Date cannot be greater than '31-Dec-2099'.");
        }
    }
    if (dPromoStartdate != null && dPromoStartdate < dCurrentDate && tStatus != "Active") // Status check added as a part of MDMI-17456
        sErrorMessage = setErrorMessage("Start Date cannot be less than Today's Date.");
    if (dEndDate != null && dEndDate < dCurrentDate)
        sErrorMessage = setErrorMessage("End Date cannot be less than Today's Date.");
    if (dPromoStartdate != null && BMIItemDefinedDate > dPromoStartdate)
        sErrorMessage = setErrorMessage("Base Menu Item Defined Date should not be greater than Start Date.");

    sErrorMessage = setErrorMessage(fdateComparison(node, step, "a_mm_PromotionStartDate", "a_mm_PromotionEndDate"));
    sErrorMessage = setErrorMessage(fdateComparison(node, step, "a_mm_LaunchApprovalDate", "a_mm_PromotionStartDate"));
    sErrorMessage = setErrorMessage(fdateComparison(node, step, "a_mm_TasteApprovalDate", "a_mm_FeasibilityApprovalDate"));
    sErrorMessage = setErrorMessage(fdateComparison(node, step, "a_mm_FeasibilityApprovalDate", "a_mm_DepartmentalApprovalDate"));
    sErrorMessage = setErrorMessage(fdateComparison(node, step, "a_mm_DepartmentalApprovalDate", "a_mm_HODApprovalDate"));
    sErrorMessage = setErrorMessage(fdateComparison(node, step, "a_mm_LaunchApprovalDate", "a_mm_SMI_MilestoneDate"));
    sErrorMessage = setErrorMessage(fdateComparison(node, step, "a_mm_SMI_MilestoneDate", "a_mm_PromotionStartDate"));
    /*Context Specific Validations starts here*/
    var variableDate = null;
    if (tMarket) { // For Future Market Onboarding modify this code block
        variableDate = "a_mm_ScanTestSignOffDate";
    }

    if ((tMarket == "FR" || tMarket == "ES" || tMarket == "IT" || tMarket == "CZ" || tMarket == "SK" || tMarket == "PL" || tMarket == "UA" || tMarket == "AT" || tMarket == "BE" || tMarket == "CA" || tMarket == "NL" || tMarket == "PT" || tMarket == "CH") && dPromoEnddate > dPromoDestockagedate) { // For Future Market Onboarding modify this code block
        sErrorMessage = setErrorMessage("Déstockage Date should be greater than Event End Date");
    }
    if (variableDate != null) {
        sErrorMessage = setErrorMessage(fdateComparison(node, step, "a_mm_HODApprovalDate", variableDate));
        sErrorMessage = setErrorMessage(fdateComparison(node, step, variableDate, "a_mm_LaunchApprovalDate"));
    }
    return sErrorMessage;
}




/*--------------------------------------------------------------------------------------
Title:	Fetch Language specific to a particular context
Author: Rahul Choudhary(rahul.choudhary@us.mcd.com)
Company:Cognizant
Date:06/10/2021
Description:: MDMI-10681
Assumptions:N/A
Version History : 
----------------------------------------------------------------------------------------*/

function fetchContextLanguage(contextID) {
    var hashMapContext = new java.util.HashMap();

    hashMapContext.put("Context4E", "Chinese");
    hashMapContext.put("Context4F", "Dutch");
    hashMapContext.put("Context3A", "English UK");
    hashMapContext.put("Context4A", "English UK");
    hashMapContext.put("Context1", "English");
    hashMapContext.put("Context4", "French");
    hashMapContext.put("Context3B", "French");
    hashMapContext.put("Context2B", "French");
    hashMapContext.put("Context4B", "German");
    hashMapContext.put("Context2A", "German");
    hashMapContext.put("Context3", "German");
    hashMapContext.put("Context4C", "Italian");
    hashMapContext.put("Context4G", "Japanese");
    hashMapContext.put("Context2C", "Polish");
    hashMapContext.put("Context3C", "Portuguese");
    hashMapContext.put("Context4H", "Russian");
    hashMapContext.put("Context3D", "Spanish");
    hashMapContext.put("Context4D", "Spanish");
    hashMapContext.put("Context2D", "Spanish");
    hashMapContext.put("Context3E", "Turkish")
    hashMapContext.put("Context2", "English UK");
    hashMapContext.put("Context2E", "Welsh");

    return hashMapContext.get(contextID);
}

/*--------------------------------------------------------------------------------------
Title:	Internal Names character length validations
Author: Rahul Choudhary(rahul.choudhary@us.mcd.com)
Company:Cognizant
Date:06/10/2021
Description: Code for throwing the error message if character length of Internal name attributes in more than the permissible limits
            : MDMI-10681
Assumptions:N/A
Version History : 
----------------------------------------------------------------------------------------*/

function validateInternalAttributeLength(step, node, contextID, internalNameAttributeID, internalNameMetaData) {

    var message1 = " should not be more than ";
    var contextString = ["", "A", "B", "C", "D", "E", "F", "H", "G"];
    var flag = false;
    var result = null;

    var contextHashSet = new java.util.HashSet();
    var contextHome = step.getContextHome().getContexts();
    var contextIterator = contextHome.iterator();
    while (contextIterator.hasNext()) {
        var contextObj = contextIterator.next();
        //log.info(contextObj.getID());
        contextHashSet.add(contextObj.getID());
    }
    log.info(contextHashSet);

    for (var i = 0; i < contextString.length; i++) {

        var subContextID = contextID + contextString[i];
        var attibuteLengthString = "";
        var internalNameAttributeLength = 0;
        var contextLanguage = fetchContextLanguage(subContextID);

        if (contextHashSet.contains(subContextID)) {
            step.executeInContext(subContextID, function (step) {
                var sourceNode = step.getObjectFromOtherManager(node);
                var internalNameCharacters = sourceNode.getValue(internalNameAttributeID).getSimpleValue();

                if (internalNameCharacters != null) {
                    internalNameCharacters = internalNameCharacters.trim();
                    attibuteLengthString = attibuteLengthString + internalNameCharacters;
                    internalNameAttributeLength = attibuteLengthString.length;
                } else {
                    internalNameAttributeLength = 0;
                }

                if (internalNameAttributeLength != null && internalNameAttributeLength != "") {
                    if (internalNameAttributeLength > internalNameMetaData)
                        flag = true;
                }

            });
        }
        if (flag == true) {
            if (internalNameAttributeID == "a_mm_BMIShortName" || internalNameAttributeID == "a_mm_SMIShortName" || internalNameAttributeID == "a_mm_DTName" || internalNameAttributeID == "a_mm_SMIName") {
                result = message1 + internalNameMetaData + " characters."
                break;
            } else {
                result = message1 + internalNameMetaData + " characters.";
                break;
            }
        }
    }
    return result;
}


/*
Name:	
Author:	Rahul Choudhary (rahul.choudhary@us.mcd.com)
Date:	30/09/2021	  
Purpose:	To copy the node level attributes to all the subContexts of a particular context MDMI-10455, Sprint-54
Version History:-
1) 
*/


function copyAttributeValueInAllSubContexts(step, sourceNode, targetNode, contextID, attributeID) {


    var contextString = ["", "A", "B", "C", "D", "E", "F", "H", "G"];

    var contextHashSet = new java.util.HashSet();
    var contextHome = step.getContextHome().getContexts();
    var contextIterator = contextHome.iterator();
    while (contextIterator.hasNext()) {
        var contextObj = contextIterator.next();

        contextHashSet.add(contextObj.getID());
    }

    for (var i = 0; i < contextString.length; i++) {

        var subContextID = contextID + contextString[i];

        if (contextHashSet.contains(subContextID)) {
            step.executeInContext(subContextID, function (step) {
                var sourceContextNode = step.getObjectFromOtherManager(sourceNode);
                var targetContextNode = step.getObjectFromOtherManager(targetNode);
                var sourceContextAttributeValue = sourceContextNode.getValue(attributeID).getSimpleValue();

                targetContextNode.getValue(attributeID).setSimpleValue((sourceContextAttributeValue == null) ? "" : sourceContextAttributeValue);

            });
        }
    }
}

function SupplierAssign(refs, removeAssign) {
    var assignedFlag = removeAssign; //false;
    if (refs.length > 0) {
        if (!removeAssign) {
            for (var i = 0; i < refs.length; i++) {
                var selectStepVal = refs[i].getValue("a_mm_SPSelectionOfQA");
                if (selectStepVal != null) {
                    if (selectStepVal.getID() == "01") {
                        var assigned = refs[i].getValue("a_mm_AssignedSupplier").getSimpleValue();
                        log.info("assigned: " + assigned);
                        var yes = selectStepVal.getSimpleValue();
                        log.info("selectStepVal : " + yes);
                        if (assigned != yes) {
                            refs[i].getValue("a_mm_AssignedSupplier").setSimpleValue(yes);
                            assignedFlag = true;
                        }
                    }
                }
            }
        }
        if (assignedFlag) {
            log.info("assignedFlag : " + assignedFlag);
            for (var i = 0; i < refs.length; i++) {
                var selectStepVal = refs[i].getValue("a_mm_SPSelectionOfQA");
                if (selectStepVal != null) {
                    if (selectStepVal.getID() == "00") {
                        refs[i].getValue("a_mm_AssignedSupplier").setSimpleValue("");
                    }
                }
            }
        }
    }
}

function CommentToSupplier(sComments, sUserName, node) {
    var sExistCommentsLog = node.getValue("a_mm_CommentsLogToSupplier").getSimpleValue();
    var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
    var sLastComment = sDate + " - " + sUserName + "\n! " + sComments;
    node.getValue("a_mm_LastCommentToSupplier").setSimpleValue(sLastComment);
    if (sExistCommentsLog != null) {
        sExistCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
    } else {
        sExistCommentsLog = sLastComment;
    }
    node.getValue("a_mm_CommentsLogToSupplier").setSimpleValue(sExistCommentsLog);
}


function validateMenuCodeChoice(step, node, availMenuCodeAttrID, count) {
    var message1 = "";
    var message2 = "";
    var menuCode = node.getValue(availMenuCodeAttrID).getSimpleValue();
    var market = node.getValue("a_mm_Market").getSimpleValue();
    if (node.getObjectType().getID() == "BaseMenuItem") {
        var variantnum1 = node.getValue("a_mm_VariantNumber").getSimpleValue();
        var versionnum1 = node.getValue("a_mm_BMIVersionNumber").getSimpleValue();
        if (variantnum1 && versionnum1) {
            market = market + "-" + variantnum1 + "-" + versionnum1;
        } else {
            market = market + "-01-001";
        }
    }
    var currentKey = menuCode + market;
    var objectKey = ""
    var RFMProductClassID = "";
    var salesChannelID = "";
    if (node.getObjectType().getID() == "SoldMenuItem") {
        objectKey = "SMI_Key";
        var RFMProductClass = node.getValue("a_mm_RFMProductClass").getLOVValue();
        if (RFMProductClass) {
            RFMProductClassID = RFMProductClass.getID();
        }
        var salesChannel = node.getValue("a_mm_SMISalesChannel").getLOVValue();
        if (salesChannel) {
            salesChannelID = salesChannel.getID();
        }
    } else if (node.getObjectType().getID() == "BaseMenuItem") {
        objectKey = "BMI_Key";
    }
    var ExistingObj = step.getProductHome().getObjectByKey(objectKey, currentKey);
    logger.info("RBP currentkey: " + currentKey)
    if (ExistingObj && ExistingObj.getID() != node.getID()) {
        logger.info("RBP ExistingObj.getID(): " + ExistingObj.getID() + " RBP node.getID(): " + node.getID())
        var overNumbers = "";
        var underNumbers = "";
        var counter = count;
        var counter1 = count;
        var ObjMenuCode = menuCode;
        while (counter != 0) {
            var key = ObjMenuCode + market;
            var ExistingObj = step.getProductHome().getObjectByKey(objectKey, key);
            if (ExistingObj && ExistingObj.getID() != node.getID()) {

            } else {
                if (overNumbers == "") {
                    overNumbers = ObjMenuCode;
                } else {
                    overNumbers = overNumbers + ", " + ObjMenuCode;
                }
                counter--;
            }
            ObjMenuCode++;
            if (node.getObjectType().getID() == "SoldMenuItem" && RFMProductClassID == "05" && Number(ObjMenuCode) > 99999999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "FR" && RFMProductClassID != "05" && (salesChannelID == "1" || salesChannelID == "2")) {
                if ((Number(menuCode) > 0 && Number(menuCode) < 40000 && Number(ObjMenuCode) > 39999) || (Number(menuCode) > 59999 && Number(menuCode) < 70000 && Number(ObjMenuCode) > 69999)) {
                    break;
                }
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "FR" && RFMProductClassID != "05" && salesChannelID == "3") {
                if ((Number(menuCode) > 39999 && Number(menuCode) < 50000 && Number(ObjMenuCode) > 49999) || (Number(menuCode) > 49999 && Number(menuCode) < 60000 && Number(ObjMenuCode) > 59999)) {
                    break;
                }
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "FR" && RFMProductClassID != "05" && salesChannelID == "4" && Number(ObjMenuCode) > 999999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "FR" && RFMProductClassID != "05" && Number(ObjMenuCode) > 999999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "UK" && RFMProductClassID != "05" && Number(ObjMenuCode) > 9999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "SK" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "CZ" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "DE" && RFMProductClassID != "05" && Number(ObjMenuCode) > 9999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "ES" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "IT" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "PL" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "UA" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "AT" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "BE" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "CH" && RFMProductClassID != "05" && Number(ObjMenuCode) > 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "CA" && RFMProductClassID != "05" && Number(ObjMenuCode) < 99999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "PT" && RFMProductClassID != "05" && Number(ObjMenuCode) < 9999) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "NL" && RFMProductClassID != "05" && Number(ObjMenuCode) < 9999) {
                break;
            }

        }

        var ObjMenuCode = menuCode;
        logger.info("RBP menuCode: " + menuCode)

        while (counter1 != 0 && ObjMenuCode > 0) {
            var key = ObjMenuCode + market;
            var ExistingObj = step.getProductHome().getObjectByKey(objectKey, key);
            if (ExistingObj && ExistingObj.getID() != node.getID()) {

            } else {
                if (underNumbers == "") {
                    underNumbers = ObjMenuCode;
                } else {
                    underNumbers = ObjMenuCode + ", " + underNumbers;
                }
                counter1--;
            }
            ObjMenuCode--;
            if (node.getObjectType().getID() == "SoldMenuItem" && RFMProductClassID == "05" && Number(ObjMenuCode) < 10000000) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "FR" && RFMProductClassID != "05" && (salesChannelID == "1" || salesChannelID == "2")) {
                if ((Number(menuCode) > 0 && Number(menuCode) < 40000 && Number(ObjMenuCode) < 1) || (Number(menuCode) > 59999 && Number(menuCode) < 70000 && Number(ObjMenuCode) < 60000)) {
                    break;
                }
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "FR" && RFMProductClassID != "05" && salesChannelID == "3") {
                if ((Number(menuCode) > 39999 && Number(menuCode) < 50000 && Number(ObjMenuCode) < 40000) || (Number(menuCode) > 49999 && Number(menuCode) < 60000 && Number(ObjMenuCode) < 50000)) {
                    break;
                }
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "FR" && RFMProductClassID != "05" && salesChannelID == "4" && Number(ObjMenuCode) < 500000) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "FR" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "UK" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1000) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "DE" && RFMProductClassID != "05" && Number(ObjMenuCode) < 100) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "ES" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "IT" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "PL" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "UA" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "AT" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "BE" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "CH" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "CA" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "PT" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            } else if (node.getValue("a_mm_Market").getSimpleValue() == "NL" && RFMProductClassID != "05" && Number(ObjMenuCode) < 1) {
                break;
            }
        }
        logger.info("RBP before message")
        if (overNumbers != "") {
            var availableMenuCodes = Number(count) - Number(counter);

            message1 = "\nThe nearest " + availableMenuCodes + " available menu codes after the selected value" + ((availableMenuCodes == 1) ? " is " : "s are ");
        }
        if (underNumbers != "") {
            var availableMenuCodes = Number(count) - Number(counter1);
            message2 = "\nThe nearest " + availableMenuCodes + " available menu codes before the selected value" + ((availableMenuCodes == 1) ? " is " : "s are ");
        }
        if (node.getValue("a_mm_Market").getSimpleValue() == "UA")
            return "The selected menu code is already in use and needs to be changed." + message1 + overNumbers;
        return "The selected menu code is already in use and needs to be changed." + message2 + underNumbers + message1 + overNumbers;
        logger.info("RBP error msg: " + message2 + underNumbers + message1 + overNumbers);
    }
    return true;
}

/*
Name:  
Author:	Pratik dDeshmukh
Date:	10/15/2023
Purpose:	Validate SMI BMI Menu code For IOMBU Markets MDMI-17338
*/

function validateBmiSmiMenuCodeChoice(step, node, availMenuCodeAttrID, count) {
    var message1 = "";
    var message2 = "";
    var BmiSmiCounter = 2;
    var menuCode = node.getValue(availMenuCodeAttrID).getSimpleValue();
    //menuCode = 9;
    var market = node.getValue("a_mm_Market").getSimpleValue();
    if (node.getObjectType().getID() == "BaseMenuItem") {
        var variantnum1 = node.getValue("a_mm_VariantNumber").getSimpleValue();
        var versionnum1 = node.getValue("a_mm_BMIVersionNumber").getSimpleValue();
        if (variantnum1 && versionnum1) {
            market = market + "-" + variantnum1 + "-" + versionnum1;
        } else {
            market = market + "-01-001";
        }
    }
    var currentKey = menuCode + market;
    var objectKey = ""
    do {
        if (BmiSmiCounter == 2) {
            objectKey = "BMI_Key";
            BmiSmiCounter--;
        } else {
            objectKey = "SMI_Key";
            var marketSMI = node.getValue("a_mm_Market").getSimpleValue();
            var currentKey = menuCode + marketSMI;
            BmiSmiCounter--;
        }
        var ExistingObj = step.getProductHome().getObjectByKey(objectKey, currentKey);
        if (ExistingObj && ExistingObj.getID() != node.getID()) {
            var overNumbers = "";
            var underNumbers = "";
            var counter = count;
            var counter1 = count;
            var ObjMenuCode = menuCode;
            while (counter != 0) {
                var key = ObjMenuCode + market;
                objectKey = "BMI_Key";
                var ExistingObj = step.getProductHome().getObjectByKey(objectKey, key);
                if (ExistingObj && ExistingObj.getID() != node.getID()) {

                } else {
                    objectKey = "SMI_Key";
                    var marketSMI = node.getValue("a_mm_Market").getSimpleValue();
                    key = ObjMenuCode + marketSMI;
                    var ExistingObj = step.getProductHome().getObjectByKey(objectKey, key);
                    if (ExistingObj && ExistingObj.getID() != node.getID()) { } else {
                        if (overNumbers == "") {
                            overNumbers = ObjMenuCode;
                        } else {
                            overNumbers = overNumbers + ", " + ObjMenuCode;
                        }
                        counter--;
                    }
                }
                ObjMenuCode++;
                if (market == "UA" && Number(ObjMenuCode) > 99999)
                    break;
                else if (Number(ObjMenuCode) > 99999) {
                    break;
                }

            }
            var ObjMenuCode = menuCode;
            while (counter1 != 0 && ObjMenuCode > 0) {
                objectKey = "BMI_Key";
                var key = ObjMenuCode + market;
                var ExistingObj = step.getProductHome().getObjectByKey(objectKey, key);
                if (ExistingObj && ExistingObj.getID() != node.getID()) { } else {
                    objectKey = "SMI_Key";
                    var marketSMI = node.getValue("a_mm_Market").getSimpleValue();
                    key = ObjMenuCode + marketSMI;

                    var ExistingObj = step.getProductHome().getObjectByKey(objectKey, key);
                    if (ExistingObj && ExistingObj.getID() != node.getID()) { } else {
                        if (underNumbers == "") {
                            underNumbers = ObjMenuCode;
                        } else {
                            underNumbers = ObjMenuCode + ", " + underNumbers;
                        }
                        counter1--;
                    }
                }
                ObjMenuCode--;
                if (Number(ObjMenuCode) < 1) {
                    break;
                }
            }
            if (overNumbers != "") {
                var availableMenuCodes = Number(count) - Number(counter);

                message1 = "\nThe nearest " + availableMenuCodes + " available menu codes after the selected value" + ((availableMenuCodes == 1) ? " is " : "s are ");
            }
            if (underNumbers != "") {
                var availableMenuCodes = Number(count) - Number(counter1);
                message2 = "\nThe nearest " + availableMenuCodes + " available menu codes before the selected value" + ((availableMenuCodes == 1) ? " is " : "s are ");
            }
            return "The selected menu code is already in use and needs to be changed." + message2 + underNumbers + message1 + overNumbers;
        }
    } while (BmiSmiCounter >= 1)
    return true;
}

/*
Name:  AddBMIEventsToRC
Author:	Ritabrata Pal
Date:	27/01/2022  
Purpose:	To copy the events linked to the BMI to the RCs linked with the BMI
Created in Sprint-59 for MDMI-10869
*/
function AddBMIEventsToRC(BMINode, step) {


    try {

        var BMIToRecipeComponent = BMINode.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));
        var newHashSetRCID = new java.util.LinkedHashSet();

        for (var i = 0; i < BMIToRecipeComponent.size(); i++) {

            var RCName = BMIToRecipeComponent.get(i).getTarget().getValue("a_mm_RecipeComponentName").getSimpleValue();
            var RCStatus = BMIToRecipeComponent.get(i).getTarget().getValue("a_mm_Status").getSimpleValue();
            log.info("RCName: " + RCName + " - RCStatus: " + RCStatus);

            if ((!BMIToRecipeComponent.get(i).getTarget().isInWorkflow("wf_mm_RecipeComponent") && !BMIToRecipeComponent.get(i).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance") && RCStatus != "Archived" && RCStatus != "Archival Pending" && RCStatus != "Inactive") || BMIToRecipeComponent.get(i).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance")) { // RCStatus == "Approved" || RCStatus == "In Maintenance" for MDMI-16579
                newHashSetRCID.add(BMIToRecipeComponent.get(i).getTarget().getID());
            }
        }

        var BMIToRecipeComponent_CanAdd = BMINode.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent_CanAdd"));

        for (var j = 0; j < BMIToRecipeComponent_CanAdd.size(); j++) {

            var RCName = BMIToRecipeComponent_CanAdd.get(j).getTarget().getValue("a_mm_RecipeComponentName").getSimpleValue();
            var RCStatus = BMIToRecipeComponent_CanAdd.get(j).getTarget().getValue("a_mm_Status").getSimpleValue();
            log.info("RCName: " + RCName + " - RCStatus: " + RCStatus);

            if ((!BMIToRecipeComponent_CanAdd.get(j).getTarget().isInWorkflow("wf_mm_RecipeComponent") && !BMIToRecipeComponent_CanAdd.get(j).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance") && RCStatus != "Archived" && RCStatus != "Archival Pending" && RCStatus != "Inactive") || BMIToRecipeComponent_CanAdd.get(j).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance")) { //RCStatus == "Approved" || RCStatus == "In Maintenance" for MDMI-16579
                newHashSetRCID.add(BMIToRecipeComponent_CanAdd.get(j).getTarget().getID());
            }
        }

        var BMIToPackagingComponent = BMINode.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToPackagingComponent"));

        for (var k = 0; k < BMIToPackagingComponent.size(); k++) {

            var RCName = BMIToPackagingComponent.get(k).getTarget().getValue("a_mm_RecipeComponentName").getSimpleValue();
            var RCStatus = BMIToPackagingComponent.get(k).getTarget().getValue("a_mm_Status").getSimpleValue();
            log.info("RCName: " + RCName + " - RCStatus: " + RCStatus);

            if ((!BMIToPackagingComponent.get(k).getTarget().isInWorkflow("wf_mm_RecipeComponent") && !BMIToPackagingComponent.get(k).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance") && RCStatus != "Archived" && RCStatus != "Archival Pending" && RCStatus != "Inactive") || BMIToPackagingComponent.get(k).getTarget().isInWorkflow("wf_mm_RecipeComponentMaintenance")) { //RCStatus == "Approved" RCStatus == "In Maintenance" for MDMI-16579
                newHashSetRCID.add(BMIToPackagingComponent.get(k).getTarget().getID());
            }
        }

        var BMIToEvent = BMINode.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToEvent"));

        for (var a = 0; a < BMIToEvent.size(); a++) {

            var EventNode = BMIToEvent.get(a).getTarget();
            var itrRCID = newHashSetRCID.iterator();
            while (itrRCID.hasNext()) {
                var nextRCID = itrRCID.next();
                var RCNode = step.getProductHome().getProductByID(nextRCID);
                if (RCNode != null) {
                    try {
                        RCNode.createReference(EventNode, "RecipeToEvent");
                    } catch (e) {
                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                            //Target Already Referenced Exception
                            log.info("Reference Already Linked.. ");
                        }
                        else {
                            throw "Exception : " + e;
                        }
                    }
                }
            }
        }

    } catch (e) {
        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
            //Target Already Referenced Exception
            log.info("Reference Already Linked.. ");
        }
        else {
            throw "Exception : " + e;
        }

    }
}



function validateMenuCodeRange(node, availMenuCodeAttrID, minValue, maxValue) {
    var menuCode = node.getValue(availMenuCodeAttrID).getSimpleValue();
    if (Number(menuCode) < Number(minValue) || Number(menuCode) > Number(maxValue)) {
        return false;
    }
    return true;
}

/*
Name:  AutoSetMenuCode
Author:	Srikanth
Date:	27/04/2022  
Purpose:	To Auto allocate Menu code for BMI MDMI-11325
Created in Sprint-59 for MDMI-10869
*/

function AutoSetMenuCode(node, step) {
    var market = node.getValue("a_mm_Market").getSimpleValue();
    log.info("Market PM = " + market);
    var objectType = node.getObjectType().getID();
    if (objectType == "BaseMenuItem") {
        var hierarchy = "BMIHierarchy";
        var availableMenuCodeAttr = "a_mm_NextAvailMenuCode"
        var tempMenuCodeAttr = "a_mm_BMIMenuCodeInt"
        var menuCodeAttr = "a_mm_BMIMenuCode"
    } else if (objectType == "SoldMenuItem") {
        if (market == "US") {
            var hierarchy = "BMIHierarchy";
            var tempMenuCodeAttr = "a_mm_SMIMenuCodeNonChoice"
            var availableMenuCodeAttr = "a_mm_NextAvailMenuCode"
        } else {
            var RFMProductClassID = "";
            var RFMProductClass = node.getValue("a_mm_RFMProductClass").getLOVValue();
            if (RFMProductClass) {
                RFMProductClassID = RFMProductClass.getID();
            }
            var hierarchy = "SMIHierarchy";
            if (RFMProductClassID == "05") {
                var tempMenuCodeAttr = "a_mm_SMIMenuCodeInt"
                var availableMenuCodeAttr = "a_mm_NextAvailMenuCodeChoice"
            } else {
                var tempMenuCodeAttr = "a_mm_SMIMenuCodeNonChoice"
                var availableMenuCodeAttr = "a_mm_NextAvailMenuCode"
            }
        }
        var menuCodeAttr = "a_mm_SMIMenuCode"
    } else if (objectType == "RestaurantGroups") {
        if (market == "US") {
            var hierarchy = "USRestaurantGroups";
            var tempMenuCodeAttr = "a_mm_RestaurantGroupIDInt"
            var menuCodeAttr = "a_mm_RestaurantGroupID"
            var availableMenuCodeAttr = "a_mm_NextAvailMenuCode"

        }
    } else if (objectType == "SMIGroup") {
        if (market == "US") {
            var hierarchy = "USSMIGroup";
            var tempMenuCodeAttr = "a_mm_SMIGroupInt"
            var menuCodeAttr = "a_mm_SMIGroup"
            var availableMenuCodeAttr = "a_mm_NextAvailMenuCode"

        }
    }

    //var market = node.getValue("a_mm_Market").getSimpleValue();
    var objectType = node.getObjectType().getID();
    if (objectType == "RestaurantGroups" && market == "US") {
        var productHome = step.getClassificationHome().getClassificationByID(hierarchy);
    } else if (objectType == "SMIGroup" && market == "US") {
        var productHome = step.getClassificationHome().getClassificationByID(hierarchy);
    } else {
        var productHome = step.getProductHome().getProductByID(hierarchy);
    }
    var availableCode = fetchValueFromSpecificContext(step, market, productHome, availableMenuCodeAttr, false);
    var nextAvailableCode = Number(availableCode) + 1;
    log.info("MPS: 1st Set ");
    setValueInSpecificContext(step, market, availableCode, null, node, null, tempMenuCodeAttr);
    log.info("MPS: 1st Set Com");
    for (var a = 0; a < 99999999; a++) {

        var isValidMenuCode = validateMenuCodeChoice(step, node, tempMenuCodeAttr, 1);

        //MDMI-12734: Updating Menu Code Logic for US
        if (isValidMenuCode == true && market == "US") {
            var ExistingSMIObj = "";
            if (objectType == "BaseMenuItem") {
                ExistingSMIObj = step.getProductHome().getObjectByKey("SMI_Key", availableCode + "US");
            } else {
                ExistingSMIObj = step.getProductHome().getObjectByKey("BMI_Key", availableCode + "US-01-001");
            }
            if (ExistingSMIObj)
                isValidMenuCode = false;
        }
        //MDMI-12734: End
        if (isValidMenuCode == true) {
            log.info("MPS: 2nd Set");
            setValueInSpecificContext(step, market, nextAvailableCode, null, productHome, null, availableMenuCodeAttr);
            log.info("MPS: 2nd Set Out");
            break;
        } else {
            availableCode = nextAvailableCode;
            nextAvailableCode = Number(availableCode) + 1;
            log.info("MPS: 3rd Set");
            setValueInSpecificContext(step, market, availableCode, null, node, null, tempMenuCodeAttr);
            log.info("MPS: 3rd Set Out");
        }
    }
}




/*
Name:  
Author:	Srikanth
Date:	13/05/2022  
Purpose:	To get to emails from Cm's on level 2 of RC

*/

function ANZToEmailsForQAandPurchasing(node, step, userGroup) {
    var toEmailIds = null;
    var objectType = node.getObjectType().getID();
    if (objectType == "RecipeComponent") {
        var parent = node.getParent().getID();
        var splitParent = parent.split("_");
        var productID = splitParent[1] + "_" + splitParent[2];
        logger.info("productID : " + productID)
        var product = step.getProductHome().getProductByID(productID);
        if (product) {
            var purchasingRef = step.getReferenceTypeHome().getReferenceTypeByID("sim_CategoryLead_Market_Approvars_Ref");
            var purchasingRefValues = product.getReferences(purchasingRef).toArray();
            var QARef = step.getReferenceTypeHome().getReferenceTypeByID("sim_Market_Approvars_Ref");
            var QARefValues = product.getReferences(QARef).toArray();
            if (userGroup == "Purchasing") {
                for (var b = 0; b < purchasingRefValues.length; b++) {
                    var entity = purchasingRefValues[b].getTarget().getID();
                    if (entity == "ANZ_Grouping") {
                        var approver = purchasingRefValues[b].getValue("SIM_Approvars_List").getSimpleValue();
                        if (approver) {
                            var approvers = approver.split(",");
                            for (var c = 0; c < approvers.length; c++) {
                                var userID = approvers[c];
                                var user = step.getUserHome().getUserById(userID);
                                if (user && user.getEMail()) {
                                    var emailID = user.getEMail();
                                    if (emailID.slice(-1) == ";") {
                                        if (toEmailIds == null) {
                                            toEmailIds = user.getEMail();
                                        } else {
                                            toEmailIds += user.getEMail();
                                        }
                                    } else {
                                        if (toEmailIds == null) {
                                            toEmailIds = user.getEMail() + ";";
                                        } else {
                                            toEmailIds += user.getEMail() + ";";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                for (var b = 0; b < QARefValues.length; b++) {
                    var entity = QARefValues[b].getTarget().getID();
                    if (entity == "ANZ_Grouping") {
                        var approver = QARefValues[b].getValue("SIM_Approvars_List").getSimpleValue();
                        if (approver) {
                            var approvers = approver.split(",");
                            for (var c = 0; c < approvers.length; c++) {
                                var userID = approvers[c];
                                var user = step.getUserHome().getUserById(userID);
                                if (user && user.getEMail()) {
                                    var emailID = user.getEMail();
                                    if (emailID.slice(-1) == ";") {
                                        if (toEmailIds == null) {
                                            toEmailIds = user.getEMail();
                                        } else {
                                            toEmailIds += user.getEMail();
                                        }
                                    } else {
                                        if (toEmailIds == null) {
                                            toEmailIds = user.getEMail() + ";";
                                        } else {
                                            toEmailIds += user.getEMail() + ";";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return toEmailIds;
}

/*
Name:  
Author:	Srikanth
Date:	13/05/2022  
Purpose:	To check if user group contains QA or purchasing user

*/

function isQAorPurchasingUser(node, step, userGroup) {
    var group = step.getGroupHome().getGroupByID(userGroup);
    if (group) {
        var users = group.getUsers().toArray();
        for (var a = 0; a < users.length; a++) {
            var allUserGrps = users[a].getAllGroups().toArray();
            for (var b = 0; b < allUserGrps.length; b++) {
                var userGrp = allUserGrps[b].getID();
                if (userGrp == "PIMRole12-AU" || userGrp == "PIMRole12-NZ") {
                    return "Purchasing";
                } else if (userGrp == "PIMRole13-AU" || userGrp == "PIMRole13-NZ") {
                    return "QA";
                }
            }
        }
    }
    return false;
}


function TaxPattern(taxes) {
    var taxCode = "N";
    for (a = 0; a < taxes.size(); a++) {
        var eit = taxes.get(a).getValue("a_mm_EITaxCode").getID();
        if (eit == "01" || eit == "02") {
            taxCode += "N-" + eit + "-";
        } else {
            taxCode += "N-"
        }
        var take = taxes.get(a).getValue("a_mm_TakeAwayTaxCode").getID();
        if (take == "01" || take == "02") {
            taxCode += take + "-";
        } else {
            taxCode += "N-"
        }
        var other = taxes.get(a).getValue("a_mm_OtherTaxCode").getID();
        if (other == "03" || other == "02") {
            taxCode += other;
        } else {
            taxCode += "N";
        }
    }
    return taxCode;
}


/*
Name:  
Author:	Kirubakaran Gajendran
Purpose:	To populate RC MRI Number in References - Added for PRB9017321
Example: setRCMRINumberInReference(node, step, "BMIToRecipeComponent");
*/

function setRCMRINumberInReference(node, step, refTypeID) {

    var referencedBy = node.getReferencedByProducts().toArray();
    var rcMRINum = node.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
    logger.info("referencedBy: " + referencedBy.length);
    logger.info("rcMRINum: " + rcMRINum);

    if (rcMRINum != null && referencedBy.length > 0) {

        for (var i = 0; i < referencedBy.length; i++) {

            var source = referencedBy[i].getSource();
            var BMIObject = step.getProductHome().getProductByID(source.getID());

            if (BMIObject.getObjectType().getID() == "BaseMenuItem" && referencedBy[i].getReferenceType() == refTypeID) {

                var tBMIToRecipeRef = BMIObject.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(refTypeID));

                for (var j = 0; j < tBMIToRecipeRef.size(); j++) {

                    var tBMIToRecipeIns = tBMIToRecipeRef.get(j);
                    var tRecipeObj = tBMIToRecipeIns.getTarget();

                    if (tRecipeObj.getID() == node.getID()) {

                        tBMIToRecipeIns.getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(rcMRINum);
                        logger.info("RCMRI Number set at BMIToRC for '" + BMIObject.getID() + "' is " + tBMIToRecipeIns.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue());
                    }
                }
            }
        }
    }
}


/*
Name:  
Author:	Srikanth
Date:	13/05/2022  
Purpose:	To calculate SI Market Price 

*/

function calculateSIMarketPrice(node, step) {
    var SIMPValue = "";
    var tRef = step.getReferenceTypeHome().getReferenceTypeByID("ShippingUnitToMarketPricing");
    var ItemRef = step.getReferenceTypeHome().getReferenceTypeByID("ItemToMarketCategory");
    var market = node.getValue("a_mm_Market").getSimpleValue();
    if (market) {
        var refBys = node.getReferencedByProducts().toArray();
        for (var a = 0; a < refBys.length; a++) {
            if (refBys[a].getReferenceType().getID() == "ShippingUnitToMarketPricing") {
                var SIItem = refBys[a].getSource();
                var references = SIItem.getReferences(tRef).toArray();
                for (var b = 0; b < references.length; b++) {
                    var mp = references[b].getTarget();
                    if (mp.getValue("a_mm_Market").getSimpleValue() == market) {
                        var subMarket = mp.getValue("a_mm_SubMarket").getSimpleValue();
                        var effectiveDate = mp.getValue("a_mm_SUCostEffectiveFromDate").getSimpleValue();
                        var price = mp.getValue("a_mm_StoreDelivered").getSimpleValue();
                        log.info("RBP strore delivered price : " + price);
                        if (price == "" || price == null) {
                            log.info("RBP price 1 : " + price);
                            price = "";
                        }

                        if (SIMPValue == "") {
                            SIMPValue = effectiveDate + "|" + price + "|" + subMarket;
                        } else {
                            SIMPValue = SIMPValue + "<multisep/>" + effectiveDate + "|" + price + "|" + subMarket;
                        }
                    }
                }
                var ItemReferences = SIItem.getReferences(ItemRef).toArray();
                for (var c = 0; c < ItemReferences.length; c++) {
                    var country = ItemReferences[c].getTarget().getID();
                    var ISOMarketFormat = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(market).getValue();
                    if (country == ISOMarketFormat) {
                        ItemReferences[c].getValue("a_mm_SIMarketPrice").setSimpleValue(SIMPValue);
                    }
                }
            }
        }
    }
}


/*
Name:  
Author:	Swagata
Date:	08/07/2022  
Purpose:	To populate Price Group References 

*/

function setBMIPriceGroupValues(newBMI, node, step) {
    var smiToPriceGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToPriceGroup");
    var currentSMIToPriceReferences = node.getReferences(smiToPriceGroupHome);

    var market = node.getValue("a_mm_Market").getSimpleValue();

    var tPriceRoot = step.getEntityHome().getEntityByID("Price Group Hierarchy");
    if (market == "AU" || market == "NZ") {
        for (k = 0; k < currentSMIToPriceReferences.size(); k++) {
            var priceGroupObject = step.getEntityHome().getEntityByID(currentSMIToPriceReferences.get(k).getTarget().getID());

            //log.info(newBMI.getID());

            var newSMIToPriceReferences = newBMI.createReference(priceGroupObject, smiToPriceGroupHome);
            var bmiSalesPrice = null;
            var taxPercent = null;
            var bmiNetSale = null;
            var pennyProfit = null;
            var grossProfitPercent = null;

            if (currentSMIToPriceReferences.size() > 0) {
                bmiSalesPrice = currentSMIToPriceReferences.get(k).getValue("a_mm_SalesPrice").getSimpleValue();
                taxPercent = currentSMIToPriceReferences.get(k).getValue("a_mm_TaxPercent").getSimpleValue();
                bmiNetSale = currentSMIToPriceReferences.get(k).getValue("a_mm_BMINetPrice").getSimpleValue();
                pennyProfit = currentSMIToPriceReferences.get(k).getValue("a_mm_PennyProfit").getSimpleValue();
                grossProfitPercent = currentSMIToPriceReferences.get(k).getValue("a_mm_GrossProfitPercent").getSimpleValue();

            }

            newSMIToPriceReferences.getValue("a_mm_SalesPrice").setSimpleValue((bmiSalesPrice == null) ? "" : bmiSalesPrice);

            newSMIToPriceReferences.getValue("a_mm_TaxPercent").setSimpleValue((taxPercent == null) ? "" : taxPercent);

            newSMIToPriceReferences.getValue("a_mm_BMINetPrice").setSimpleValue((bmiNetSale == null) ? "" : bmiNetSale);

            newSMIToPriceReferences.getValue("a_mm_PennyProfit").setSimpleValue((pennyProfit == null) ? "" : pennyProfit);

            newSMIToPriceReferences.getValue("a_mm_GrossProfitPercent").setSimpleValue((grossProfitPercent == null) ? "" : grossProfitPercent);
        }
    }

}

/*
Name:  
Author:	Srikanth
Date:	26/07/2022  
Purpose:	To populate Recipe Serving Quantity Uncooked 

*/

function setServingQtyUncooked(node, ref) {
    ref.getValue("a_mm_ServingQuantity").setSimpleValue("");
    var cookingFactor = node.getValue("a_mm_CookingFactor").getSimpleValue();
    var marketValue = node.getValue("a_mm_Market").getSimpleValue();
    var servingQuantity = ref.getValue("a_mm_RecipeServingQuantity").getSimpleValue();
    var preparedorUnprepared = ref.getValue("a_mm_PreparedOrUnprepared").getLOVValue();
    var preparedorUnpreparedID = "";
    if (preparedorUnprepared) {
        preparedorUnpreparedID = preparedorUnprepared.getID();
    }
    if (servingQuantity && cookingFactor) {
        if (preparedorUnpreparedID == "1") {
            ref.getValue("a_mm_ServingQuantity").setSimpleValue(servingQuantity);
        } else if (preparedorUnpreparedID == "2") {
            var tRCWeight = node.getValue("a_mm_RCUnitWeight").getSimpleValue();
            var tRCWeightUOM = node.getValue("a_mm_RCUnitWeightUOM").getSimpleValue();
            var tRCVolume = node.getValue("a_mm_RCUnitVolume").getSimpleValue();
            var tRCVolumeUOM = node.getValue("a_mm_RCUnitVolumeUOM").getSimpleValue();
            var tTechUOM = node.getValue("a_mm_BaseServingQuantityUOM").getSimpleValue();
            var tServingQuantityUOM = ref.getValue("a_mm_ServingQuantityUnitofMeasure").getSimpleValue();
            var tMerlinDensity = node.getValue("a_mm_Density").getSimpleValue();
            var tMerlinStatus = node.getValue("a_mm_MerlinStatus").getSimpleValue();
            var tIsLiquid = node.getValue("IsLiquid").getSimpleValue();
            if (tRCWeight != null && tRCWeightUOM != null) {
                if (marketValue != "US") {
                    tRCWeight = pimGramConversion(node, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                } else {
                    tRCWeight = pimOzConversion(node, "a_mm_RCUnitWeight", "a_mm_RCUnitWeightUOM");
                }
            }
            if (tRCVolume != null && tRCVolumeUOM != null) {
                if (marketValue != "US") {
                    tRCVolume = pimMlConversion(node, "a_mm_RCUnitVolume", "a_mm_RCUnitVolumeUOM");
                } else {
                    tRCVolume = pimFlOzConversion(node, "a_mm_RCUnitVolume", "a_mm_RCUnitVolumeUOM");
                }
            }
            var calcServingQty = null;
            if ((tServingQuantityUOM == "grams" && tTechUOM == "ml") || (tServingQuantityUOM == "OZ" && tTechUOM == "FL OZ")) {
                if (tIsLiquid == "Yes" && tMerlinDensity != null && (tMerlinStatus == "Pre-Approved" || tMerlinStatus == "Approved")) {
                    calcServingQty = (Number(servingQuantity) * Number(tMerlinDensity)) / Number(cookingFactor);
                } else if (tRCWeight != null && tRCVolume != null) {
                    calcServingQty = (Number(servingQuantity) * Number(tRCWeight)) / (Number(tRCVolume) * Number(cookingFactor));
                }
            } else if ((tServingQuantityUOM == "ml" && tTechUOM == "grams") || (tServingQuantityUOM == "FL OZ" && tTechUOM == "OZ")) {
                if (tIsLiquid == "Yes" && tMerlinDensity != null && (tMerlinStatus == "Pre-Approved" || tMerlinStatus == "Approved")) {
                    calcServingQty = Number(servingQuantity) / (Number(tMerlinDensity) * Number(cookingFactor));
                } else if (tRCWeight != null && tRCVolume != null) {
                    calcServingQty = (Number(servingQuantity) * Number(tRCVolume)) / (Number(tRCWeight) * Number(cookingFactor));
                }
            } else {
                calcServingQty = Number(servingQuantity) / Number(cookingFactor);
            }
            if (calcServingQty) {
                ref.getValue("a_mm_ServingQuantity").setSimpleValue(calcServingQty.toFixed(3));
            }
        }
    }
}

/*
Name:  
Author:	Srikanth
Date:	04/08/2022  
Purpose:	To validate FR menucode specific ranges based on SMI Sales Channel 

*/

function validateMenuCodeRangeFR(node, step, availMenuCodeAttrID) {
    var isInRange = true;
    var isRangeOccupied = true;
    var menuCode = node.getValue(availMenuCodeAttrID).getSimpleValue();
    var salesChannel = node.getValue("a_mm_SMISalesChannel").getLOVValue();
    var salesChannelID = "";
    if (salesChannel) {
        salesChannelID = salesChannel.getID();
    }
    if (salesChannelID == "1" || salesChannelID == "2") {
        isInRange = validateMenuCodeRange(node, availMenuCodeAttrID, 1, 39999);
        if (isInRange != true) {
            for (var a = 1; a < 39999; a++) {
                var ExistingObj = step.getProductHome().getObjectByKey("SMI_Key", a);
                if (!ExistingObj) {
                    isRangeOccupied = false;
                    break;
                }
            }
            if (isRangeOccupied = false) {
                return false;
            } else {
                isInRange = validateMenuCodeRange(node, availMenuCodeAttrID, 60000, 69999);
                if (isInRange != true) {
                    return false;
                }
            }
        }
    } else if (salesChannelID == "3") {
        isInRange = validateMenuCodeRange(node, availMenuCodeAttrID, 40000, 49999);
        if (isInRange != true) {
            for (var a = 40000; a < 49999; a++) {
                var ExistingObj = step.getProductHome().getObjectByKey("SMI_Key", a);
                if (!ExistingObj) {
                    isRangeOccupied = false;
                    break;
                }
            }
            if (isRangeOccupied = false) {
                return false;
            } else {
                isInRange = validateMenuCodeRange(node, availMenuCodeAttrID, 50000, 59999);
                if (isInRange != true) {
                    return false;
                }
            }
        }
    } else if (salesChannelID == "4") {
        isInRange = validateMenuCodeRange(node, availMenuCodeAttrID, 500000, 999999);
        if (isInRange != true) {
            return false;
        }
    }
    return true;
}

/*
Name:  
Author:	Srikanth
Date:	17/08/2022  
Purpose:	To set Rc Number for US Market 

*/

function AutoSetRCNumber(node, step) {
    var objectType = node.getObjectType().getID();
    if (objectType == "RecipeComponent") {
        var hierarchy = "RecipeComponentHierarchy";
        var availableMenuCodeAttr = "a_mm_NextAvailRCNumber";
        var tempMenuCodeAttr = "a_mm_RecipeComponentNumber(MRI)";

        var market = node.getValue("a_mm_Market").getSimpleValue();
        var productHome = step.getProductHome().getProductByID(hierarchy);
        var availableCode = fetchValueFromSpecificContext(step, market, productHome, availableMenuCodeAttr, false);
        var nextAvailableCode = Number(availableCode) + 1;

        for (var a = 0; a < 999999999; a++) {
            var isValidMenuCode = true;
            var currentKey = availableCode + market;
            var ExistingObj = step.getProductHome().getObjectByKey("RC_Key", currentKey);
            if (ExistingObj) {
                isValidMenuCode = false;
            }
            if (isValidMenuCode == true) {
                setValueInSpecificContext(step, market, availableCode, null, node, null, tempMenuCodeAttr);
                setValueInSpecificContext(step, market, nextAvailableCode, null, productHome, null, availableMenuCodeAttr);
                break;
            } else {
                availableCode = nextAvailableCode;
                nextAvailableCode = Number(availableCode) + 1;
            }
        }
    }
}

/*
Name : Ritabrata Pal, Swagata Samaddar
Purpose : Put constraints on RFM Names for US market
Date : 19AUG2022
Sprint : 73 
User STory : MDMI-12794,MDMI-12795,MDMI-12769
*/

function ConstraintOnRFMNames(node, check_attr, market) {

    function setErrorMessage(sNewErrorMessage) {
        if (sErrorMessage == null)
            sErrorMessage = sNewErrorMessage;
        else {
            if (sNewErrorMessage != null)
                sErrorMessage = sErrorMessage + "\n" + sNewErrorMessage;
        }
        return sErrorMessage;
    }

    //var market = node.getValue("a_mm_Market").getSimpleValue();
    var attrVal = node.getValue(check_attr.getID()).getSimpleValue();
    var sErrorMessage = null;
    var tError = "";

    if (market == "US" && attrVal != null) {

        var inValidHashset = new java.util.HashSet();
        inValidHashset.add("`");
        inValidHashset.add("~");
        inValidHashset.add("^");
        inValidHashset.add("_");
        inValidHashset.add("{");
        inValidHashset.add("}");
        inValidHashset.add("[");
        inValidHashset.add("]");
        inValidHashset.add("|");
        inValidHashset.add("\\");
        //inValidHashset.add(" ");		

        var x = "" + attrVal;
        var y = x.length;

        for (var i = 0; i < y; i++) {
            var charValue = x.charAt(i);
            if (inValidHashset.contains(charValue)) {
                tError = setErrorMessage("Please enter valid characters applicable for " + check_attr.getName());
                log.info(attrVal + tError);
                break;
            }
        }
        log.info(check_attr.getName() + " : " + attrVal);

        var arrAttr = attrVal.split("");
        if (attrVal.search(/[a-zA-Z]/i) < 0) {
            tError = setErrorMessage(check_attr.getName() + " must contain at least one alphabetical character.");
        }
        if (!arrAttr[0].match(/[a-zA-Z0-9]/g)) {
            tError = setErrorMessage("First character of " + check_attr.getName() + " should not contain any special character.");
        }
        /*if (!attrVal.match(/[a-zA-Z0-9!"#$%&',()*+-.:;<=>?@]/g)){			
            tError = setErrorMessage("Please enter valid characters applicable for " + check_attr.getName());
        }*/
        //log.info(tError);
    }

    return tError;

}

/*
Name:  
Author:	Srikanth
Date:	02/09/2022  
Purpose:	To set SMI Menu Code for alacart SMI for US Market 

*/

function setSMIMenuCodeUSAlacart(node, step) {
    var sellingOptionId = "";
    var sellingOption = node.getValue("a_mm_SMISellingOptions").getLOVValue();
    if (sellingOption) {
        sellingOptionId = sellingOption.getID();
    }
    if (sellingOptionId == "1") {
        var SMIToBMIRef = step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI");
        var smiToBMIReferences = node.getReferences(SMIToBMIRef).toArray();
        for (var a = 0; a < smiToBMIReferences.length; a++) {
            var bmi = smiToBMIReferences[a].getTarget();
            var bmiMenuCode = bmi.getValue("a_mm_BMIMenuCode").getSimpleValue();
            if (bmiMenuCode) {
                var key = bmiMenuCode + "US";
                var ExistingObj = step.getProductHome().getObjectByKey("SMI_Key", key);
                if (ExistingObj) {

                } else {
                    node.getValue("a_mm_SMIMenuCodeNonChoice").setSimpleValue(bmiMenuCode);
                }
            }
        }
    }
}


// Srikanth added these function to use clone SMI code in Creating alternate SMI Starts

function setClonesSMIAttributeValues(step, newSMI, currentSMI, smiAttributeID, contextID) {
    var currentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
    if (smiAttributeID == "a_mm_SMIName") {
        var smiName = currentSMI.getValue("a_mm_SMIName").getSimpleValue();
        newSMI.getValue(smiAttributeID).setSimpleValue(smiName);
        //log.info("SMI name already copied with applicable suffix");
    } else if (smiAttributeID == "a_mm_EffectiveFromDate") {
        var currentSMIEffectiveFromDate = currentSMI.getValue("a_mm_EffectiveFromDate").getSimpleValue();
        if (currentSMIEffectiveFromDate != null && currentSMIEffectiveFromDate < currentDate) {
            newSMI.getValue(smiAttributeID).setSimpleValue(currentDate);
        } else if ((currentSMIEffectiveFromDate != null && currentSMIEffectiveFromDate >= currentDate)) {
            newSMI.getValue(smiAttributeID).setSimpleValue(currentSMIEffectiveFromDate);
        }
    } else if (smiAttributeID == "a_mm_EffectiveToDate") {
        var currentSMIEffectiveToDate = currentSMI.getValue("a_mm_EffectiveToDate").getSimpleValue();
        if (currentSMIEffectiveToDate != null && currentSMIEffectiveToDate < currentDate) {
            newSMI.getValue(smiAttributeID).setSimpleValue("2099-12-31");
        } else if (currentSMIEffectiveToDate != null && currentSMIEffectiveToDate >= currentDate) {
            newSMI.getValue(smiAttributeID).setSimpleValue(currentSMIEffectiveToDate);
        }
    } else if (smiAttributeID == "a_mm_CSOName") {
        copyAttributeValueInAllSubContexts(step, currentSMI, newSMI, contextID, smiAttributeID);
    } else if (smiAttributeID != "a_mm_SMIName" && smiAttributeID != "a_mm_EffectiveFromDate" && smiAttributeID != "a_mm_EffectiveToDate" && smiAttributeID != "a_mm_CSOName") {
        var valueToSet = currentSMI.getValue(smiAttributeID).getSimpleValue();
        newSMI.getValue(smiAttributeID).setSimpleValue((valueToSet == null) ? "" : valueToSet);
    }
}

//Function rewritten as part of INC15670730
function setClonesSMITaxGroupValues(step, newSMI, currentSMI) {
    var smiToTaxGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToTaxGroup");
    var currentSMIToTaxReferences = currentSMI.getReferences(smiToTaxGroupHome);
    var market = currentSMI.getValue("a_mm_Market").getSimpleValue();
    if (market != "AU" && market != "NZ") {
        for (var k = 0; k < currentSMIToTaxReferences.size(); k++) {
            var taxGroupObject = currentSMIToTaxReferences.get(k).getTarget();
            log.info("taxGroupObject");
            var newSMIToTaxReferences = newSMI.createReference(taxGroupObject, smiToTaxGroupHome);
            newSMIToTaxReferences.getValue("a_mm_EITaxCode").setSimpleValue(currentSMIToTaxReferences.get(k).getValue("a_mm_EITaxCode").getSimpleValue());
            newSMIToTaxReferences.getValue("a_mm_TakeAwayTaxCode").setSimpleValue(currentSMIToTaxReferences.get(k).getValue("a_mm_TakeAwayTaxCode").getSimpleValue());
            newSMIToTaxReferences.getValue("a_mm_OtherTaxCode").setSimpleValue(currentSMIToTaxReferences.get(k).getValue("a_mm_OtherTaxCode").getSimpleValue());
        }
    }
}

function copyLinkedBMI(step, newSMI, currentSMI) {
    var smiToBMIGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI");
    var currentSMIToBMIReferences = currentSMI.getReferences(smiToBMIGroupHome);
    var smiToSMIGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToSMI");
    var currentSMIToSMIReferences = currentSMI.getReferences(smiToSMIGroupHome);
    var smiToRCGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToRecipeComponent");
    var currentSMIToRCReferences = currentSMI.getReferences(smiToRCGroupHome);
    var currentContext = step.getCurrentContext();

    var market = currentSMI.getValue("a_mm_Market").getSimpleValue();

    if (currentSMIToBMIReferences.size() > 0) {
        for (var m = 0; m < currentSMIToBMIReferences.size(); m++) {
            var linkedBMI = currentSMIToBMIReferences.get(m).getTarget();
            var newSMIToBMIReferences = newSMI.createReference(linkedBMI, smiToBMIGroupHome);
            var factorValue = currentSMIToBMIReferences.get(m).getValue("a_mm_Factor").getSimpleValue();
            var effectiveFromDate = newSMI.getValue("a_mm_EffectiveFromDate").getSimpleValue();
            var effectiveToDate = newSMI.getValue("a_mm_EffectiveToDate").getSimpleValue();

            newSMIToBMIReferences.getValue("a_mm_Factor").setSimpleValue((factorValue == null) ? "" : factorValue);
            newSMIToBMIReferences.getValue("a_mm_EffectiveFromDate").setSimpleValue((effectiveFromDate == null) ? "" : effectiveFromDate);
            newSMIToBMIReferences.getValue("a_mm_EffectiveToDate").setSimpleValue((effectiveToDate == null) ? "" : effectiveToDate);



        }
    }

    if (currentSMIToRCReferences.size() > 0) {
        logger.info("currentSMIToRCReferences.size:-" + currentSMIToRCReferences.size());
        for (var m = 0; m < currentSMIToRCReferences.size(); m++) {
            var linkedBMI = currentSMIToRCReferences.get(m).getTarget();
            var primarySMIToSMIInsBMI = currentSMIToRCReferences.get(m);
            var newSMIToBMIReferences = newSMI.createReference(linkedBMI, smiToRCGroupHome);
            var inheritCustGrpBMI = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_CustomizationAttributes");
            var inheritCustAttributesBMI = inheritCustGrpBMI.getAllAttributes();
            var inheritItrBMI = inheritCustAttributesBMI.iterator();

            //copying attribute values
            while (inheritItrBMI.hasNext()) {
                var custAttributeIDBMI = inheritItrBMI.next().getID();
                try {
                    logger.info("custAttributeIDBMI:-" + custAttributeIDBMI)
                    var pCustAttrValBMI = primarySMIToSMIInsBMI.getValue(custAttributeIDBMI).getSimpleValue();
                    logger.info("pCustAttrValBMI:-" + pCustAttrValBMI) -
                        newSMIToBMIReferences.getValue(custAttributeIDBMI).setSimpleValue(pCustAttrValBMI);

                } catch (err) {
                    logger.info("Attributes validated" + err);
                    throw (err);
                }
            }
        }
    }

    if (currentSMIToSMIReferences.size() > 0) {
        for (var m = 0; m < currentSMIToSMIReferences.size(); m++) {
            var linkedBMI = currentSMIToSMIReferences.get(m).getTarget();
            var primarySMIToSMIIns = currentSMIToSMIReferences.get(m);
            var newSMIToBMIReferences = newSMI.createReference(linkedBMI, smiToSMIGroupHome);
            var effectiveFromDate = newSMI.getValue("a_mm_EffectiveFromDate").getSimpleValue();
            var effectiveToDate = newSMI.getValue("a_mm_EffectiveToDate").getSimpleValue();

            var inheritCustGrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_CustomizationAttributes");
            var inheritCustAttributes = inheritCustGrp.getAllAttributes();
            var inheritItr = inheritCustAttributes.iterator();



            //copying attribute values
            while (inheritItr.hasNext()) {
                var custAttributeID = inheritItr.next().getID();
                try {

                    var pCustAttrVal = primarySMIToSMIIns.getValue(custAttributeID).getSimpleValue();
                    newSMIToBMIReferences.getValue(custAttributeID).setSimpleValue(pCustAttrVal);


                } catch (err) {
                    //logger.info("Attributes validated" + err);
                    throw (err);
                }
            }

            newSMIToBMIReferences.getValue("a_mm_EffectiveFromDate").setSimpleValue((effectiveFromDate == null) ? "" : effectiveFromDate);
            newSMIToBMIReferences.getValue("a_mm_EffectiveToDate").setSimpleValue((effectiveToDate == null) ? "" : effectiveToDate);
        }
    }


}

function validateAttrValueInApprovedContext(step, AttrGrp, currentObj, node, newObj) {
    var currentContext = step.getCurrentContext();
    var AttrGrp = step.getAttributeGroupHome().getAttributeGroupByID(AttrGrp);
    var TabAttributes = AttrGrp.getAllAttributes();
    var inheritItr = TabAttributes.iterator();

    //copying attribute values
    while (inheritItr.hasNext()) {
        var AttrID = inheritItr.next().getID();
        var valueMainWSAlternate = newObj.getValue(AttrID).getSimpleValue();

        var valueApprWSPrimary = step.executeInWorkspace("Approved", function execute(approvedNode) {
            var approvePrimaryNode = approvedNode.getProductHome().getProductByID(node.getID());
            return approvePrimaryNode.getValue(AttrID).getSimpleValue();
        });

        if (valueMainWSAlternate == valueApprWSPrimary) {
            return true;
        } else
            return false;

    }
}

function cloneSMIButtonCode(node, step, webUI) {
    var cloneSMIGrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_ClonedSMI");
    var cloneSMIAttributes = cloneSMIGrp.getAllAttributes();

    var message1 = " cannot be cloned as status of this SMI is not Approved or In Maintenance.";
    var message2 = "You are not privileged to perform this action";

    var selectedSMIs = webUI.getSelection();
    var smiRoot = step.getProductHome().getProductByID("SMIHierarchy");
    var currentContext = step.getCurrentContext();
    var currentuser = step.getCurrentUser;
    var logisticGroupHome = null;
    var powerGroupHome = null;
    var currentUser = step.getCurrentUser();
    var currentUserHome = step.getUserHome().getUserByID(currentUser.getID());

    if (selectedSMIs.size() > 0) {
        var currentSMIMarket = selectedSMIs.get(0).getValue("a_mm_Market").getSimpleValue();
        var logisticGroup = "PIMRole5-" + currentSMIMarket;
        var powerGroup = "PIMRole15-" + currentSMIMarket;
        logisticGroupHome = step.getGroupHome().getGroupByID(logisticGroup);
        powerGroupHome = step.getGroupHome().getGroupByID(powerGroup);
        logisticGroupHome = step.getGroupHome().getGroupByID(logisticGroup);
        if ((logisticGroupHome != null && logisticGroupHome.isMember(currentUserHome)) || (powerGroupHome != null && powerGroupHome.isMember(currentUserHome))) {
            for (var a = 0; a < selectedSMIs.size(); a++) {
                var currentSMI = selectedSMIs.get(a);
                var smiFlagID = "";
                var smiFlag = currentSMI.getValue("a_mm_PrimaryOrAlternateIndicator").getLOVValue();
                if (smiFlag) {
                    smiFlagID = smiFlag.getID();
                }
                // Alternet SMI
                if (smiFlagID == "A") {
                    var alternateSMIRef = step.getReferenceTypeHome().getReferenceTypeByID("AlternateSMI");
                    var alternetRefSMIs = currentSMI.getReferences(alternateSMIRef).toArray();
                    for (var b = 0; b < alternetRefSMIs.length; b++) {
                        var altSMIrefIns = alternetRefSMIs[b];
                        currentSMI = altSMIrefIns.getSource();
                    }
                }
                var currentSMIStatusID = currentSMI.getValue("a_mm_Status").getID();
                if (currentSMIStatusID != null) {
                    if ((!currentSMI.isInWorkflow("wf_mm_SMILaunchWorkflow") && !currentSMI.isInWorkflow("wf_mm_SMIMaintenance") && currentSMIStatusID != "4" && currentSMIStatusID != "18" && currentSMIStatusID != "8") || currentSMI.isInWorkflow("wf_mm_SMIMaintenance")) { //currentSMIStatusID == "2" currentSMIStatusID == "3" for MDMI-16579
                        log.info("SMI cloning starts :");
                        var currentSMIName = currentSMI.getValue("a_mm_SMIName").getSimpleValue();
                        var newSMI = smiRoot.createProduct(null, "SoldMenuItem");
                        var cloneItr = cloneSMIAttributes.iterator();
                        while (cloneItr.hasNext()) {
                            var smiAttributeID = cloneItr.next().getID();
                            setClonesSMIAttributeValues(step, newSMI, currentSMI, smiAttributeID, currentContext.getID());
                        }
                        newSMI.setName(currentSMI.getValue("a_mm_SMIName").getSimpleValue() + " - CLONED");
                        newSMI.getValue("a_mm_SMIName").setSimpleValue(currentSMIName + " - CLONED");
                        setClonesSMITaxGroupValues(step, newSMI, currentSMI);
                        var currentSMIType = currentSMI.getValue("a_mm_SoldMenuItemType").getSimpleValue();
                        //if SMI type Combo
                        if (currentSMIType == "Combo") {
                            copyLinkedBMI(step, newSMI, currentSMI);
                        }

                        // MDMI-20365
                        // Added by Shaktiman Misra
                        var context = step.getCurrentContext().getID();
                        var currentDate_2 = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss a").format(getCurrentDate(step, context));
                        //var currentDate_2 = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
                        // End of MDMI-20365

                        var commentTemp = currentDate_2 + " - " + currentUser.getName() + "\n" +
                            "! Sold Menu Item Cloned \n" + "The Sold Menu Item is CLONED from " + currentSMIName + " by " + currentUser.getName();
                        newSMI.getValue("a_mm_LastComment").setSimpleValue(commentTemp);
                        newSMI.getValue("a_mm_CommentsLog").setSimpleValue(commentTemp);

                        newSMI.startWorkflowByID("wf_mm_SMILaunchWorkflow", currentUser.getID() + " has cloned the " + currentSMI.getValue("a_mm_SMIName").getSimpleValue() + " SMI");
                    } else {
                        webUI.showAlert("ERROR", currentSMI.getValue("a_mm_SMIName").getSimpleValue() + message1, "");
                    }
                }
            }


        } else {
            webUI.showAlert("ERROR", message2, "");
        }
    }
}

//code by Ritabrata to create Alternate SMI from Primary SMI

function createAlternateSMIButtonCode(node, step, webUI, comment) {
    var cloneSMIGrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_ClonedSMI");
    var cloneSMIAttributes = cloneSMIGrp.getAllAttributes();

    var message1 = " cannot be created as status of this SMI is not Approved or In Maintenance.";
    var message2 = "You are not privileged to perform this action";

    var selectedSMIs = webUI.getSelection();
    var smiRoot = step.getProductHome().getProductByID("SMIHierarchy");
    var currentContext = step.getCurrentContext();
    var currentuser = step.getCurrentUser();
    var logisticGroupHome = null;
    var powerGroupHome = null;
    var currentUser = step.getCurrentUser();
    var currentUserHome = step.getUserHome().getUserByID(currentUser.getID());

    if (selectedSMIs.size() > 0) {
        var currentSMIMarket = selectedSMIs.get(0).getValue("a_mm_Market").getSimpleValue();
        var logisticGroup = "PIMRole5-" + currentSMIMarket;
        var powerGroup = "PIMRole15-" + currentSMIMarket;
        logisticGroupHome = step.getGroupHome().getGroupByID(logisticGroup);
        powerGroupHome = step.getGroupHome().getGroupByID(powerGroup);
        logisticGroupHome = step.getGroupHome().getGroupByID(logisticGroup);
        if ((logisticGroupHome != null && logisticGroupHome.isMember(currentUserHome)) || (powerGroupHome != null && powerGroupHome.isMember(currentUserHome))) {
            for (var a = 0; a < selectedSMIs.size(); a++) {
                var currentSMI = selectedSMIs.get(a);
                var currentSMIStatusID = currentSMI.getValue("a_mm_Status").getID();
                if (currentSMIStatusID != null) {
                    if (currentSMI.isInWorkflow("wf_mm_SMIMaintenance")) { //currentSMIStatusID == "3" for MDMI-16579
                        log.info("SMI cloning starts :");
                        var currentSMIName = currentSMI.getValue("a_mm_SMIName").getSimpleValue();
                        var currentSMIMenuCode = currentSMI.getValue("a_mm_SMIMenuCode").getSimpleValue();
                        var newSMI = smiRoot.createProduct(null, "SoldMenuItem");
                        newSMI.setName(currentSMIName);
                        newSMI.getValue("a_mm_SMIName").setSimpleValue(currentSMIName);
                        newSMI.getValue("a_mm_PrimarySMINumber").setSimpleValue(currentSMIMenuCode);
                        newSMI.getValue("a_mm_Market").setSimpleValue(currentSMIMarket);
                        var tLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SMIToSMIMarket");
                        if (currentSMIMarket == "US") {
                            var oTargetObject = step.getClassificationHome().getClassificationByID("SMI" + currentSMIMarket + "Active");

                        } else {
                            var oTargetObject = step.getClassificationHome().getClassificationByID("Development" + "SMI" + currentSMIMarket);
                        }
                        newSMI.createClassificationProductLink(oTargetObject, tLink);
                        classifySMIBasedOnPG(newSMI, step);

                        var cloneItr = cloneSMIAttributes.iterator();
                        while (cloneItr.hasNext()) {
                            var smiAttributeID = cloneItr.next().getID();
                            setClonesSMIAttributeValues(step, newSMI, currentSMI, smiAttributeID, currentContext.getID());
                        }
                        setClonesSMITaxGroupValues(step, newSMI, currentSMI);
                        copyLinkedBMI(step, newSMI, currentSMI);
                        copySMIGroup(currentSMI, step, newSMI);
                        var smiToEventHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToEvent");
                        var currentSMIToEventHomeReferences = currentSMI.getReferences(smiToEventHome);
                        var newHashSetEventID = new java.util.LinkedHashSet();
                        for (var s = 0; s < currentSMIToEventHomeReferences.size(); s++) {
                            var eventStatus = currentSMIToEventHomeReferences.get(s).getTarget().getValue("a_mm_Status").getSimpleValue();
                            log.info("eventName: " + currentSMIToEventHomeReferences.get(s).getTarget().getName() + " - eventStatus: " + eventStatus);

                            if (eventStatus == "Active" || eventStatus == "In Development") {
                                newHashSetEventID.add(currentSMIToEventHomeReferences.get(s).getTarget().getID());
                            }
                        }

                        var itrEventID = newHashSetEventID.iterator();
                        while (itrEventID.hasNext()) {
                            var nextEventID = itrEventID.next();
                            var eventNode = step.getProductHome().getProductByID(nextEventID);
                            if (eventNode != null) {
                                try {
                                    newSMI.createReference(eventNode, "SMIToEvent");
                                } catch (e) {
                                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                        //Target Already Referenced Exception
                                        log.info("Reference Already Linked.. ");
                                    }
                                    else {
                                        throw "Exception : " + e;
                                    }
                                }
                            }
                        }
                        if (currentSMIMarket == "US") {
                            AutoSetMenuCode(newSMI, step);
                            var userEnteredMenuCode = newSMI.getValue("a_mm_SMIMenuCodeNonChoice").getSimpleValue();
                            var aHashMap = new java.util.HashMap();
                            aHashMap.put("a_mm_SMIMenuCode", userEnteredMenuCode);
                            step.getKeyHome().updateUniqueKeyValues2(aHashMap, newSMI);
                        }
                        //copyAttrGrp(step, "ag_mm_CustomizationAttributes", currentSMI, newSMI)
                        //copyLinkedBMI(step, newSMI, node);
                        var smiToRCGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToRecipeComponent");
                        var currentSMIToRCReferences = currentSMI.getReferences(smiToRCGroupHome);

                        if (currentSMIToRCReferences.size() > 0) {
                            for (var r = 0; r < currentSMIToRCReferences.size(); r++) {
                                var linkedSMI = currentSMIToRCReferences.get(r).getTarget();
                                // var newSMIToRCReferences = newSMI.createReference(linkedSMI, smiToRCGroupHome);
                                //copyAttrGrp(step, "ag_mm_CustomizationAttributes", currentSMIToRCReferences, newSMIToRCReferences);
                                var AttrGrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_CustomizationAttributes");
                                var TabAttributes = AttrGrp.getAllAttributes();
                                var inheritItr = TabAttributes.iterator();

                                //copying attribute values
                                while (inheritItr.hasNext()) {
                                    var AttrID = inheritItr.next().getID();
                                    if (AttrID != "a_mm_SMIMenuCode")
                                        setClonesSMIAttributeValues(step, newSMI, currentSMI, AttrID, currentContext.getID());

                                }

                            }
                        }

                        // var smiToSMIGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToSMI");
                        //  var currentSMIToSMIReferences = currentSMI.getReferences(smiToSMIGroupHome);

                        //  if (currentSMIToSMIReferences.size() > 0) {
                        //         for (var r = 0; r < currentSMIToSMIReferences.size(); r++) {
                        //             var linkedSMI = currentSMIToSMIReferences.get(r).getTarget();
                        //             var currentSMIToSMIReferences = newSMI.createReference(linkedSMI, smiToSMIGroupHome);
                        //             //copyAttrGrp(step, "ag_mm_CustomizationAttributes", currentSMIToRCReferences, newSMIToRCReferences);
                        //             var AttrGrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_CustomizationAttributes");
                        // 			var TabAttributes = AttrGrp.getAllAttributes();
                        // 			var inheritItr = TabAttributes.iterator();

                        // 			//copying attribute values
                        // 			while (inheritItr.hasNext()) {
                        // 				var AttrID = inheritItr.next().getID();
                        // 				if (AttrID!="a_mm_SMIMenuCode")
                        // 				setClonesSMIAttributeValues(step, newSMI, currentSMI, AttrID, currentContext.getID());

                        // 			}

                        //         }
                        //     }


                        newSMI.getValue("a_mm_PrimaryOrAlternateIndicator").setLOVValueByID("A");
                        //newSMI.getValue("a_mm_Status").setLOVValueByID("2");
                        newSMI.getValue("a_mm_SMIStage").setLOVValueByID("1");
                        if (currentSMIMarket == "US") {
                            newSMI.getValue("a_mm_Status").setLOVValueByID("1"); //setting status as 'In Development'
                            newSMI.getValue("a_mm_ProductMixStatus").setLOVValueByID("1");
                            newSMI.getValue("a_mm_ProductMixMapToDescription").setSimpleValue(node.getValue("a_mm_SMIName").getSimpleValue());
                            newSMI.getValue("a_mm_ProductMixMapTo").setSimpleValue(node.getValue("a_mm_SMIMenuCode").getSimpleValue());
                            var menuCode = newSMI.getValue("a_mm_SMIMenuCode").getSimpleValue();

                            // MDMI-20365
                            // Added by Shaktiman Misra
                            var context = step.getCurrentContext().getID();
                            var currentDate_2 = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss a").format(getCurrentDate(step, context));
                            //var currentDate_2 = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
                            // End of MDMI-20365

                            var commentNodeAlt = currentDate_2 + " - " + currentUser.getName() + "\n" +
                                "! Alternate Sold Menu Item Created \n" + "The Alternate Sold Menu Item is created from Primary SMI '" + currentSMIName + "' by " + currentUser.getName() + "\n" + "➜" + comment;
                            var sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
                            var commentNodePriCommenLog = currentDate_2 + " - " + currentUser.getName() + "\n" +
                                "! Alternate Sold Menu Item Created \n" + "The Alternate Sold Menu Item is created with " + menuCode + " SMI Menu Code by " + currentUser.getName() + "\n" + "-------------" + "\n" + sExistCommentsLog;
                            var commentNodePriCommenLastLog = currentDate_2 + " - " + currentUser.getName() + "\n" +
                                "! Alternate Sold Menu Item Created \n" + "The Alternate Sold Menu Item is created with " + menuCode + " SMI Menu Code by " + currentUser.getName();
                            newSMI.getValue("a_mm_LastComment").setSimpleValue(commentNodeAlt);
                            newSMI.getValue("a_mm_CommentsLog").setSimpleValue(commentNodeAlt);
                            //newSMI.approve();
                            node.getValue("a_mm_LastComment").setSimpleValue(commentNodePriCommenLastLog);
                            node.getValue("a_mm_CommentsLog").setSimpleValue(commentNodePriCommenLog);
                        } else {
                            // MDMI-20365
                            // Added by Shaktiman Misra
                            var context = step.getCurrentContext().getID();
                            var currentDate_2 = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss a").format(getCurrentDate(step, context));
                            //var currentDate_2 = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
                            // End of MDMI-20365     

                            var commentNodeAlt = currentDate_2 + " - " + currentUser.getName() + "\n" +
                                "! Alternate Sold Menu Item Created \n" + "The Alternate Sold Menu Item is created from Primary SMI '" + currentSMIName + "' by " + currentUser.getName() + "\n" + "➜" + comment;
                            var sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
                            var commentNodePriCommenLog = currentDate_2 + " - " + currentUser.getName() + "\n" +
                                "! Alternate Sold Menu Item Created \n" + "The Alternate Sold Menu Item is created by " + currentUser.getName() + "\n" + "-------------" + "\n" + sExistCommentsLog;
                            var commentNodePriCommenLastLog = currentDate_2 + " - " + currentUser.getName() + "\n" +
                                "! Alternate Sold Menu Item Created \n" + "The Alternate Sold Menu Item is created by " + currentUser.getName();
                            newSMI.getValue("a_mm_LastComment").setSimpleValue(commentNodeAlt);
                            newSMI.getValue("a_mm_CommentsLog").setSimpleValue(commentNodeAlt);
                            //newSMI.approve();
                            node.getValue("a_mm_LastComment").setSimpleValue(commentNodePriCommenLastLog);
                            node.getValue("a_mm_CommentsLog").setSimpleValue(commentNodePriCommenLog);
                        }

                        var tAltSMIToBMIRef = newSMI.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI"));
                        var tPrimSMIToBMIRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI"));
                        //logger.info("RBP " + tAltSMIToBMIRef.size())
                        for (var m = 0; m < tAltSMIToBMIRef.size(); m++) {
                            var tAltSMIToBMI = tAltSMIToBMIRef.get(m);
                            //var tBMIObj = tAltSMIToBMI.getTarget();
                            for (var n = 0; n < tPrimSMIToBMIRef.size(); n++) {
                                var tPrimSMIToBMI = tPrimSMIToBMIRef.get(n);
                                var tPrimrefBMIMenuCode = tPrimSMIToBMI.getValue("a_mm_BMIMenuCode").getSimpleValue();
                                //log.info("PRIM SMI-BMI Menu Code " + tPrimrefBMIMenuCode)
                                if (tPrimrefBMIMenuCode) {
                                    var tAltrefBMIMenuCode = tAltSMIToBMI.getValue("a_mm_BMIMenuCode").setSimpleValue(tPrimrefBMIMenuCode);
                                }
                                //log.info("Alt SMI-BMI Menu Code " + tAltSMIToBMI.getValue("a_mm_BMIMenuCode").getSimpleValue());						
                            }
                        }

                        if (currentSMIMarket != "US") {
                            pimNutrLib.calculateNutritionScoreSMI(newSMI, step, "ag_mm_NutritionalValues", false);
                            pimNutrLib.calculateNutritionScoreSMI(newSMI, step, "ag_mm_NutritionalValues", true);
                            //**********************************
                            //newSMI.getValue("a_mm_SMIMenuCode").setSimpleValue(node.getValue("a_mm_SMIMenuCode").getSimpleValue());
                            newSMI.getValue("a_mm_DeclaredName").setSimpleValue(node.getValue("a_mm_DeclaredName").getSimpleValue());
                            newSMI.getValue("a_mm_DeclaredDescription").setSimpleValue(node.getValue("a_mm_DeclaredDescription").getSimpleValue());
                            newSMI.getValue("a_mm_SMICategoryX").setSimpleValue(node.getValue("a_mm_SMICategoryX").getSimpleValue());
                            newSMI.getValue("a_mm_IngredientStatementX").setSimpleValue(node.getValue("a_mm_IngredientStatementX").getSimpleValue());
                            newSMI.getValue("a_mm_IngredientStatementGermanX").setSimpleValue(node.getValue("a_mm_IngredientStatementX").getSimpleValue());
                            newSMI.getValue("a_mm_LastUpdatedDateX").setSimpleValue(node.getValue("a_mm_LastUpdatedDateX").getSimpleValue());


                            //**********************************
                            var alternateSMInonUS = step.getReferenceTypeHome().getReferenceTypeByID("AlternateSMI_Draft");
                            node.createReference(newSMI, alternateSMInonUS);
                            newSMI.startWorkflowByID("wf_mm_SMILaunchWorkflow", "Alternate SMI Pushed to SMI Ideation workflow");
                            logger.info("RBP Alt SMI to Idn wf");
                        } else {
                            var alternateSMI = step.getReferenceTypeHome().getReferenceTypeByID("AlternateSMI");
                            node.createReference(newSMI, alternateSMI);
                        }

                    } else {
                        webUI.showAlert("ERROR", currentSMI.getName() + message1, "");
                    }
                }
            }


        } else {
            webUI.showAlert("ERROR", message2, "");
        }
    }
}



// Srikanth added these function to use clone SMI code in Creating alternate SMI Ends

//copy SMI groups
function copySMIGroup(node, step, newSMI) {
    var tLinkSMIToSMIGroup = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SMIToSMIGroup");
    var tRefSMIToSMIGroup = node.getClassificationProductLinks(tLinkSMIToSMIGroup).toArray();
    log.info("tRefSMIToSMIGroup func " + tRefSMIToSMIGroup.length);

    if (tRefSMIToSMIGroup.length > 0) {

        for (var i = 0; i < tRefSMIToSMIGroup.length; i++) {

            var tSMIGroupObj = tRefSMIToSMIGroup[i];
            var tSMIGroupObj1 = tRefSMIToSMIGroup[i].getClassification();
            var tSMIGroupObj1ID = tSMIGroupObj1.getID();
            var tSMIGroupObjClassification = step.getClassificationHome().getClassificationByID(tSMIGroupObj1ID);
            if (tSMIGroupObjClassification != null) {
                try {
                    newSMI.createClassificationProductLink(tSMIGroupObjClassification, tLinkSMIToSMIGroup);
                    log.info("Classification link created ");

                } catch (e) {
                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                        //Target Already Referenced Exception
                        log.info("Reference Already Linked.. ");
                    }
                    else {
                        throw "Exception : " + e;
                    }
                }
            }
        }
    }
}


/*
Name:	autoSubmitIfStateNotPIMBasicSUworkflow
Author:	Kirubakaran G
Date:	16Sept2022
Purpose:	Auto submit the task if the current state is not part of PIM Basic, Sprint-50
Version: Modified as part of MDMI-12993
*/
function autoSubmitIfStateNotPIMBasicSUworkflow(step, node, workflowAbbrv, workflow, stateID, activity) {
    var workflowStateID = workflowAbbrv + "_" + stateID;
    var workflowStateEntity = step.getEntityHome().getEntityByID(workflowStateID);
    var market = node.getValue("a_mm_Market").getSimpleValue();
    if (workflowStateEntity) {
        log.info("RBP state workflowStateEntity: " + workflowStateEntity);
        var workflowStateSwitch = fetchValueFromSpecificContext(step, market, workflowStateEntity, "a_mm_WorkflowStateSwitch", true);
        //var workflowStateSwitch = workflowStateEntity.getValue("a_mm_WorkflowStateSwitch").getID();
        log.info("RBP state switch: " + workflowStateSwitch);
        if (workflowStateSwitch == "00") {
            log.info("RBP state workflowStateSwitch: " + workflowStateSwitch);
            if (activity == "AutoSubmitTrigger") {
                try {
                    log.info("RBP state activity: " + activity);
                    node.getWorkflowInstance(workflow).getTaskByID(stateID).triggerLaterByID("AutoSubmit", "Auto Submitted as workflow switch is No");
                } catch (e) {
                    log.info("Error in autoSubmitIfStateNotPIMBasic: " + e);
                    throw (e);
                }
            }
            log.info("RBP autosubmit false ");
            return false;
        }
    }
    log.info("RBP autosubmit true ");
    return true;
}

/*Title:	getWRINActiveForMarket
Author:	Neethu J
Company:	Cognizant
Date:	27/09/2022
Usage: 	To determine f WRIN is active for current Market- Includes all checks done while linked SU to RC*/

function getWRINActiveForMarket(step, RCNode, tShippingUnit, webui) {
    var Market = "";

    var contextLOVHome = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context");
    var tCurrentContext = step.getCurrentContext().getID();
    var allContextLOVValues = contextLOVHome.queryValidValues().asList(100);
    if (allContextLOVValues.size() > 0) {
        for (var i = 0; i < allContextLOVValues.size(); i++) {
            var eachLOVValue = allContextLOVValues.get(i);
            if (eachLOVValue.getValue() == tCurrentContext)
                Market = eachLOVValue.getID();
        }
    }

    var tMarket = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(Market).getValue();
    var isActive = false;
    var tTradeItemStatus = tShippingUnit.getValue("TradeItemStatus").getSimpleValue();
    var marRef = step.getReferenceTypeHome().getReferenceTypeByID("ItemToMarketCategory");
    var marRefObj = tShippingUnit.getReferences(marRef);
    for (var i = 0; i < marRefObj.size(); i++) {
        var marID = marRefObj.get(i).getTarget().getID();
        var marStatus = marRefObj.get(i).getValue("SupplierItemMktApprovalStatus").getSimpleValue();
        var MarketClassification = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SUToSUMarket");
        var market_check = false;
        var targetmarket = "ShippingUnit" + tMarket + "_Active";
        log.info(targetmarket);
        var markets = tShippingUnit.getClassificationProductLinks(MarketClassification);
        for (var j = 0; j < markets.size(); j++) {
            var marketID = markets.get(j).getClassification().getID();
            if (marketID == targetmarket) {
                market_check = true;
                break;
            }
        }

        var IsActiveWRIN = isWRINActive(RCNode, tShippingUnit, step, Market, null, webui);
        //var facilityChk = isWRINActive(RCNode, tShippingUnit, step, Market, "checkFacilityContingency", webui);
        //log.info(tTradeItemStatus + " " + marStatus + " " + market_check + " " + IsActiveWRIN + " " + facilityChk);
        if (tTradeItemStatus == "Active" && marStatus == "Active" && marID == tMarket && market_check == true && IsActiveWRIN == true)
            isActive = true;
    }
    return isActive;
}


/*Title:	ValidateRCToSU
Author:	Neethu J
Company:	Cognizant
Date:	27/09/2022
Usage: 	To Validate the RC to SU Product group and isLiquid values*/


function ValidateRCToSU(node, step) {
    var errorMessage = "";
    var tContext = step.getCurrentContext().getID();
    var tMarket = node.getValue("a_mm_Market").getSimpleValue();

    var recipeComponentGroup = node.getValue("a_mm_RecipeComponentGroup").getSimpleValue();
    if (recipeComponentGroup != null) {
        recipeComponentGroup = node.getValue("a_mm_RecipeComponentGroup").getID();
    }
    var tRCToSU = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");

    var tReference = node.getReferences(tRCToSU);
    if (!tReference.isEmpty()) {

        for (var i = 0; i < tReference.size(); i++) {
            var tRef = tReference.get(i);
            var tTarget = tReference.get(i).getTarget();

            var rawItemGroup = tTarget.getValue("ProductGroup").getID();
            var tLinkedPPO = tTarget.getValue("a_mm_LinkedPPO").getSimpleValue();
            if (recipeComponentGroup && rawItemGroup != recipeComponentGroup) {
                errorMessage = errorMessage + " Product Group for Shipping Unit(" + tTarget.getName() + ") Linked to the PPO " + tLinkedPPO + " and Recipe Component Group of RC (" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") should be equal.\n";
                break;
            }
        }
    }
    var tSIRef = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var tSPRef = step.getReferenceTypeHome().getReferenceTypeByID("DevSUToShipingPackage");
    var rcIsLiquid = node.getValue("IsLiquid").getSimpleValue();
    var SIref = node.getReferences(tSIRef);
    log.info("RC is liquid: " + rcIsLiquid);
    for (j = 0; j < SIref.size(); j++) {
        var objectType = SIref.get(j).getTarget().getObjectType().getID();

        var siIsLiquid = SIref.get(j).getTarget().getValue("IsLiquid").getSimpleValue();
        log.info(SIref.get(j).getTarget().getID() + " : SI is liquid: " + siIsLiquid);
        var tPPO = SIref.get(j).getTarget().getValue("a_mm_LinkedPPO").getSimpleValue();
        if (siIsLiquid != null && rcIsLiquid != null) {
            if (siIsLiquid != rcIsLiquid) {
                log.info("ISLIQUID : SI : " + siIsLiquid + " RC: " + rcIsLiquid);
                if (errorMessage == null)
                    errorMessage = "The value of IsLiquid for the Recipe Component(" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") does not match with the Linked Shipping Unit (" + SIref.get(j).getTarget().getName() + ") IsLiquid Value. \n";
                else
                    errorMessage = errorMessage + "The value of IsLiquid for the Recipe Component(" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") does not match with the Linked Shipping Unit (" + SIref.get(j).getTarget().getName() + ") IsLiquid Value. \n";
            }
        }

        var rcBSQUOM = node.getValue("a_mm_BaseServingQuantityUOM").getSimpleValue();
        var rcBSQUOMID = node.getValue("a_mm_BaseServingQuantityUOM").getID();
        var siHandlingUOM = SIref.get(j).getTarget().getValue("HandlingUOM").getSimpleValue();
        logger.info("RC BSQUOM: " + rcBSQUOM + " / SI HandlingUOM: " + siHandlingUOM);

        if (siHandlingUOM != null && rcBSQUOM != null) {

            if (rcBSQUOMID == "2" && siHandlingUOM != "EA") {

                if (errorMessage == null)
                    errorMessage = "Base serving quantity UOM of Recipe Component(" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") is '" + rcBSQUOM + "' and HandlingUOM of " + SIref.get(j).getTarget().getName() + " is '" + siHandlingUOM + "'. This RC can be added only to Shipping Unit(s) with Handling UOM 'Each' \n"; // Need to change when LOV is changed
                else
                    errorMessage = errorMessage + "Base serving quantity UOM of Recipe Component(" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") is '" + rcBSQUOM + "'and HandlingUOM of " + SIref.get(j).getTarget().getName() + " is '" + siHandlingUOM + "'. This RC can be added only to Shipping Unit(s) with Handling UOM 'Each' \n"; // Need to change when LOV is changed
            }

            if (rcBSQUOM == "OZ") {
                if (siHandlingUOM != "G" && siHandlingUOM != "KG" && siHandlingUOM != "LB" && siHandlingUOM != "OZ") {

                    if (errorMessage == null)
                        errorMessage = "Base serving quantity UOM of Recipe Component(" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") is 'OZ'and HandlingUOM of " + SIref.get(j).getTarget().getName() + " is '" + siHandlingUOM + "'. This RC can be added only to Shipping Unit(s) with Handling UOM 'G/KG/LB/OZ' \n";
                    else
                        errorMessage = errorMessage + "Base serving quantity UOM of Recipe Component(" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") is 'OZ'and HandlingUOM of " + SIref.get(j).getTarget().getName() + " is '" + siHandlingUOM + "'. This RC can be added only to Shipping Unit(s) with Handling UOM 'G/KG/LB/OZ' \n";
                }
            }

            if (rcBSQUOM == "FL OZ") {
                if (siHandlingUOM != "ML" && siHandlingUOM != "L" && siHandlingUOM != "GAL" && siHandlingUOM != "FL OZ") {

                    if (errorMessage == null)
                        errorMessage = "Base serving quantity UOM of Recipe Component(" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") is 'FL OZ'and HandlingUOM of " + SIref.get(j).getTarget().getName() + " is '" + siHandlingUOM + "'. This RC can be added only to Shipping Unit(s) with Handling UOM 'ML/L/GAL/FL OZ' \n";
                    else
                        errorMessage = errorMessage + "Base serving quantity UOM of Recipe Component(" + node.getValue("a_mm_RecipeComponentName").getSimpleValue() + ") is 'FL OZ'and HandlingUOM of " + SIref.get(j).getTarget().getName() + " is '" + siHandlingUOM + "'. This RC can be added only to Shipping Unit(s) with Handling UOM 'ML/L/GAL/FL OZ' \n";
                }
            }
        }

    }
    logger.info("Validate RC To SU Result: " + errorMessage);
    return errorMessage;
}



/*Title:	copyValuesToItemToMarketCategoryReference
Author:	Neethu J
Company:	Cognizant
Date:	29/09/2022
Usage: 	To set attribute values on item to category reference from node level*/

function copyValuesToItemToMarketCategoryReference(step, SINode, market, attributeID) {
    var supplierToMarketCategory = step.getReferenceTypeHome().getReferenceTypeByID("ItemToMarketCategory");
    var marketContext = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID(market).getValue();
    var usContext = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID("US").getValue();
    var isoMarketCode = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(market).getValue();

    var supplierItemToMarketCategoryRef = SINode.getReferences(supplierToMarketCategory);
    for (var i = 0; i < supplierItemToMarketCategoryRef.size(); i++) {
        var marketCategoryRef = supplierItemToMarketCategoryRef.get(i);
        var marketCategoryRefTarget = supplierItemToMarketCategoryRef.get(i).getTarget();
        var marketCategoryRefTargetISO = marketCategoryRefTarget.getID();

        if (isoMarketCode == marketCategoryRefTargetISO) {
            var valueToSet = SINode.getValue(attributeID).getSimpleValue(); // Taking the value from Supplier Item Node					


            log.info("Value to set for attribute ID : " + attributeID + " : " + valueToSet);
            // Execute in specific context :: BEGINS
            step.executeInContext(marketContext, function (step) {
                var contextSpecSetObj = step.getObjectFromOtherManager(marketCategoryRef);
                log.info("Value in original context ");
                contextSpecSetObj.getValue(attributeID).setSimpleValue(valueToSet);
            });

            step.executeInContext(usContext, function (step) {
                var contextSpecSetObj = step.getObjectFromOtherManager(marketCategoryRef);
                log.info("Value in US context ");
                contextSpecSetObj.getValue(attributeID).setSimpleValue(valueToSet);
            });
        }
    }
}

/*Title:	startWRINReviewWorkflow
Author:	Neethu J
Company:	Cognizant
Date:	03/10/2022
Usage: 	To start WRIN Review Workflow*/
function startWRINReviewWorkflow(node, step, type) {

    var WRINWorkflow = step.getWorkflowHome().getWorkflowByID("wf_mm_WRINReviewWorkflow");
    //push to New WRIN Review State
    if (type == "New") {
        if (!node.isInWorkflow("wf_mm_WRINReviewWorkflow")) {
            node.startWorkflowByID("wf_mm_WRINReviewWorkflow", "Started with Type " + type);
            node.getWorkflowInstance(WRINWorkflow).getTaskByID("Start").triggerByID("Submit_NewWRINReview", "Submitted to New WRIN Review State");
        }
    }
    //push to Existing WRIN Review State
    if (type == "Existing" && node.getValue("a_mm_LinkedPPO").getSimpleValue() != null && node.getValue("a_mm_LinkedPPO").getSimpleValue() != "") {
        var firstTimeTriggerFlag = false;
        var attributeGroupHome = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_WRINReviewWFTriggering");
        var AttrArray = attributeGroupHome.getAllAttributes().toArray();
        for (var k = 0; k < AttrArray.length; k++) {
            var attributeID = AttrArray[k].getID();
            var valueMainWS = node.getValue(attributeID).getSimpleValue();
            //Below code snippet is to get the attribute value in 'Approved' workspace
            var valueApprWS = step.executeInWorkspace("Approved", function execute(approvedNode) {
                var approveNode = approvedNode.getProductHome().getProductByID(node.getID());
                return approveNode.getValue(attributeID).getSimpleValue();
            });

            log.info("Main WS  :--" + attributeID + ":--" + valueMainWS);
            log.info("Appr WS  :--" + attributeID + ":--" + valueApprWS);

            if (valueMainWS != valueApprWS) {
                if (!node.isInWorkflow("wf_mm_WRINReviewWorkflow")) {
                    log.info("Existing WRIN Review Triggered");
                    node.startWorkflowByID("wf_mm_WRINReviewWorkflow", "Started with Type " + type);
                    node.getWorkflowInstance(WRINWorkflow).getTaskByID("Start").triggerByID("Submit_ExistingWRINUpdateReview", "Submitted to Existing WRIN Update Review State");
                    firstTimeTriggerFlag = true;
                }
                break;
            }
        }

        if (node.isInState("wf_mm_WRINReviewWorkflow", "ExistingWRINUpdateReview") || (node.isInState("wf_mm_WRINReviewWorkflow", "DiscardedWRINs") && node.getWorkflowInstance(WRINWorkflow).getSimpleVariable("wf_mm_DiscardedFromState") == "Existing WRIN Update Review")) {

            var changeInAttributesFlag = false;

            for (var j = 0; j < AttrArray.length; j++) {
                var attributeID = AttrArray[j].getID();

                var valueMainWS = node.getValue(attributeID).getSimpleValue();
                var valueApprWS = step.executeInWorkspace("Approved", function execute(approvedNode) {
                    var approveNode = approvedNode.getProductHome().getProductByID(node.getID());
                    return approveNode.getValue(attributeID).getSimpleValue();
                });

                log.info("Setting 6 workflow variables.. ");
                var currentWFVariableValue = node.getWorkflowInstance(WRINWorkflow).getSimpleVariable("wf_mm_" + attributeID);
                if (currentWFVariableValue == "NOCHANGE" || currentWFVariableValue == null) {
                    if (valueMainWS != valueApprWS)
                        node.getWorkflowInstance(WRINWorkflow).setSimpleVariable("wf_mm_" + attributeID, valueApprWS);
                    else
                        node.getWorkflowInstance(WRINWorkflow).setSimpleVariable("wf_mm_" + attributeID, "NOCHANGE");
                }

                currentWFVariableValue = node.getWorkflowInstance(WRINWorkflow).getSimpleVariable("wf_mm_" + attributeID);
                log.info("currentWFVariableValue : " + "wf_mm_" + attributeID + " : " + currentWFVariableValue);
                log.info("valueMainWS : " + attributeID + " : " + valueMainWS);

                if (currentWFVariableValue != "NOCHANGE" && currentWFVariableValue != valueMainWS)
                    changeInAttributesFlag = true;
            }
        }

        if (changeInAttributesFlag == false && firstTimeTriggerFlag == false) {
            var comment = "There are no changes in the tracking attributes for the WRIN";
            autoRemoveFromWRINReviewWorkflow(node, WRINWorkflow, step, comment);
            log.info(comment);
        }
    }
    //push to WRIN Maintenance State   
    if (type == "Maintenance") {
        if (!node.isInWorkflow("wf_mm_WRINReviewWorkflow")) {
            node.startWorkflowByID("wf_mm_WRINReviewWorkflow", "Started with Type " + type);
            node.getWorkflowInstance(WRINWorkflow).getTaskByID("Start").triggerByID("WRIN_Maintain", "Submitted to WRIN Maintenance State");
        }
    }
}


function autoRemoveFromWRINReviewWorkflow(node, WRINWorkflow, step, comment) {
    log.info("Resetting values for WRIN for auto removal");
    node.getValue("a_mm_WRINReviewChangeDate").setSimpleValue("");
    node.getValue("a_mm_WRINReviewReasonForPending").setSimpleValue("");
    node.getValue("a_mm_WRINCurrentStateName").setSimpleValue(null);
    node.getValue("a_mm_WRINReviewStatus").setLOVValueByID("01"); //Accept
    node.getValue("a_mm_WorkflowCommentLog").setSimpleValue(null);

    var refForPartObj = ["ItemToMarketCategory", "SupplierItemtoRestaurant"];
    var attrForPartObj = ["a_mm_WRINReviewChangeDate", "a_mm_WRINReviewReasonForPending", "a_mm_WRINCurrentStateName", "a_mm_WRINReviewStatus", "a_mm_WorkflowCommentLog", "a_mm_LastComment", "a_mm_CommentsLog"];

    var sCommentsLog = null;
    var sLastComment = null;
    var sStateName = node.getWorkflowInstance(WRINWorkflow).getSimpleVariable("wf_mm_StateName");

    var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
    var sUserId = step.getCurrentUser().getID();
    var sUserName = step.getCurrentUser().getName();

    sLastComment = sDate + " - " + sUserName + "\n" + "➜" + " Automatically Removed From " + " - " + sStateName + "\n" + comment;
    node.getValue("a_mm_LastComment").setSimpleValue(sLastComment);

    if (node.getValue("a_mm_CommentsLog").getSimpleValue() == null)
        sCommentsLog = sLastComment;
    else
        sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + node.getValue("a_mm_CommentsLog").getSimpleValue();

    node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);

    log.info("--------------------\nComments Log on WRIN : " + node.getValue("a_mm_CommentsLog").getSimpleValue());

    //start : changes done as part of INC16429959

    var attrArray = ["a_mm_WRINReviewChangeDate", "a_mm_WRINReviewReasonForPending", "a_mm_WRINReviewStatus"];

    for (k = 0; k < attrArray.length; k++) {
        var attributeID = attrArray[k];
        copyValuesToItemToMarketCategoryReference(step, node, "US", attributeID);
    }
    //end : changes done as part of INC16429959

    node.getWorkflowInstance(WRINWorkflow).delete(comment);
    //approveObjectInAllContexts(node, step);

    //changes done as part of INC16512748 for partial approval
    for (var i = 0; i < attrForPartObj.length; i++) {
        partialApproveAttribute(node, attrForPartObj[i]);
    }
    for (var j = 0; j < refForPartObj.length; j++) {
        partialApproveReference(node, refForPartObj[j]);
    }
}


/*Title:	validatePPOShortDescription
Author:	Neethu J
Company:	Cognizant
Date:	17/10/2022
Usage: 	To validate PPO Short Description for special characters*/
function validatePPOShortDescription(tPPO) {
    var Market = tPPO.getValue("a_mm_Market").getSimpleValue();
    var attrVal = tPPO.getValue("a_mm_PPOShortDescription").getSimpleValue();


    if (Market == "US" && attrVal != null) {
        //_ ^ ~ \ ` | { [ ] } - special characters not allowed
        var inValidHashset = new java.util.HashSet();
        inValidHashset.add("`");
        inValidHashset.add("~");
        inValidHashset.add("^");
        inValidHashset.add("_");
        inValidHashset.add("{");
        inValidHashset.add("}");
        inValidHashset.add("[");
        inValidHashset.add("]");
        inValidHashset.add("|");
        inValidHashset.add("\\");

        var x = "" + attrVal;
        var y = x.length;

        for (var i = 0; i < y; i++) {
            var charValue = x.charAt(i);
            if (inValidHashset.contains(charValue)) {
                return "Invalid Special Characters are not allowed for PPO Short Description.";
            }
        }
    }
    return true;
}


/*Title:	NA
Author:	Srikanth
Company:	Cognizant
Date:	28/10/2022
Usage: 	To classify SMI Based on Product Group*/

function classifySMIBasedOnPG(node, step) {
    var productGroup = node.getValue("a_mm_PMIXGroup").getLOVValue();
    if (productGroup) {
        var productGroupID = productGroup.getID();
        var lovValue = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_PMIXGroup").getListOfValuesValueByID(productGroupID).getValue();
        var smiToSMIMarketHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SMIToSMIMarket");
        var smiToSMIMarkets = node.getClassificationProductLinks(smiToSMIMarketHome).toArray();
        for (var a = 0; a < smiToSMIMarkets.length; a++) {
            var MarketClassification = smiToSMIMarkets[a].getClassification();
            if (MarketClassification.getObjectType().getID() != "ActiveSMI_PG") {
                var MarketClassificationID = MarketClassification.getID();
                var Classification = step.getClassificationHome().getClassificationByID(MarketClassificationID + "_" + productGroupID);
                if (Classification) {
                    // do nothing
                } else {
                    Classification = MarketClassification.createClassification(MarketClassificationID + "_" + productGroupID, "ActiveSMI_PG");
                    if (lovValue)
                        Classification.setName(lovValue);

                    Classification.approve();
                }
                try {
                    node.createClassificationProductLink(Classification, smiToSMIMarketHome);
                } catch (e) {
                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                        //Target Already Referenced Exception
                        log.info("Reference Already Linked.. ");
                    }
                    else {
                        throw "Exception : " + e;
                    }
                }
                smiToSMIMarkets[a].delete();
            }
        }
    }
}

/*--------------------------------------------------------------------------------------
Author: Kirubakaran_G
Description: Code for Approving Linked Alternate SMI
Date: 01 Nov 2022
----------------------------------------------------------------------------------------*/
function approveAlternateSMIFromPrimarySMI(node, step) {
    var market = node.getValue("a_mm_Market").getSimpleValue();
    //if (market == "US") {
    var alternateSMIRef = step.getReferenceTypeHome().getReferenceTypeByID("AlternateSMI");
    var alternateSMIs = node.getReferences(alternateSMIRef).toArray();
    for (var a = 0; a < alternateSMIs.length; a++) {
        var linkedSMI = alternateSMIs[a].getTarget();
        logger.info("linkedSMI getting approved : " + linkedSMI.getID());
        approveBmirAndSmiPartially(linkedSMI, step)
    }
    //}
}

/*--------------------------------------------------------------------------------------
Author: Neethu J
Description: Code to Partial approve a reference
Date: 10 Nov 2022
----------------------------------------------------------------------------------------*/
function partialApproveReference(node, reference) {
    var nonApprovedObjectArray = node.getNonApprovedObjects().toArray();
    var partLinkSet = new java.util.HashSet();
    log.info(reference);
    for (counter in nonApprovedObjectArray) {
        if (nonApprovedObjectArray[counter] instanceof com.stibo.core.domain.partobject.ReferencePartObject && nonApprovedObjectArray[counter].getReferenceType() == reference) {
            partLinkSet.add(nonApprovedObjectArray[counter]);
            log.info("Add : " + reference);
        }
        if (nonApprovedObjectArray[counter] instanceof com.stibo.core.domain.partobject.ProductReferencePartObject && nonApprovedObjectArray[counter].getReferenceType() == reference) {
            partLinkSet.add(nonApprovedObjectArray[counter]);
            log.info("Add : " + reference);
        }
        if (nonApprovedObjectArray[counter] instanceof com.stibo.core.domain.partobject.ClassificationReferencePartObject && nonApprovedObjectArray[counter].getReferenceType() == reference) {
            partLinkSet.add(nonApprovedObjectArray[counter]);
            log.info("Add : " + reference);
        }
        if (nonApprovedObjectArray[counter] instanceof com.stibo.core.domain.partobject.ClassificationLinkPartObject && nonApprovedObjectArray[counter].getLinkTypeID() == reference) {
            partLinkSet.add(nonApprovedObjectArray[counter]);
            log.info("Add : " + reference);
        }
        if (nonApprovedObjectArray[counter] instanceof com.stibo.core.domain.partobject.EntityReferencePartObject && nonApprovedObjectArray[counter].getReferenceType() == reference) {
            partLinkSet.add(nonApprovedObjectArray[counter]);
            log.info("Add : " + reference);
        }
    }
    if (node.getApprovalStatus() != "Not in Approved workspace") {
        node.approve(partLinkSet);
    }
}


/*--------------------------------------------------------------------------------------
Author: Neethu J
Description: Code to Partial approve an attribute
Date: 10 Nov 2022
----------------------------------------------------------------------------------------*/
function partialApproveAttribute(node, attribute) {
    var nonApprovedObjectArray = node.getNonApprovedObjects().toArray();
    var partLinkSet = new java.util.HashSet();
    for (counter in nonApprovedObjectArray) {
        if (nonApprovedObjectArray[counter] instanceof com.stibo.core.domain.partobject.ValuePartObject && nonApprovedObjectArray[counter].getAttributeID() == attribute) {
            partLinkSet.add(nonApprovedObjectArray[counter]);
            log.info("Add Attribute : " + attribute);
        }
    }
    if (node.getApprovalStatus() != "Not in Approved workspace") {
        node.approve(partLinkSet);
    }
}


/*--------------------------------------------------------------------------------------
Author: Bharanidharan K L.
Description: Code to check whether the object is there in the workflows or not. This function will retun "true" if the object in in workflow.
Date: 15 Dec 2022
----------------------------------------------------------------------------------------*/
function checkIfObjectPresentInWorkflows(node, step) {
    log.info("Inside checkIfObjectPresentInWorkflows node" + node);
    var flag = false;
    var nodeObjectType = node.getObjectType().getID();
    if (nodeObjectType == "BaseMenuItem") {
        if (node.isInWorkflow("wf_mm_DevBMIIdeationandApproval"))
            flag = true;
        if (node.isInWorkflow("wf_mm_BMIVariantRestaurantGroup"))
            flag = true;
        if (node.isInWorkflow("wf_mm_BMIReplacement"))
            flag = true;
        if (node.isInWorkflow("wf_mm_BMIMaintenance"))
            flag = true;
        if (node.isInWorkflow("wf_mm_MerlinNutritionApproval"))
            flag = true;
    } else if (nodeObjectType == "BaseMenuItemRecipe") {
        if (node.isInWorkflow("wf_mm_DevBMIIdeationandApproval_New"))
            flag = true;
        if (node.isInWorkflow("wf_mm_BMIVariantRestaurantGroup_New"))
            flag = true;
        if (node.isInWorkflow("wf_mm_BMIReplacement_New"))
            flag = true;
        if (node.isInWorkflow("wf_mm_MerlinNutritionApproval_New"))
            flag = true;
    } else if (nodeObjectType == "RecipeComponent") {
        if (node.isInWorkflow("wf_mm_RecipeComponent"))
            flag = true;
        if (node.isInWorkflow("wf_mm_RecipeComponentMaintenance"))
            flag = true;
        if (node.isInWorkflow("wf_mm_DrawBridge"))
            flag = true;
        if (node.isInWorkflow("wf_mm_RecipeComponentWorkflow"))
            flag = true;
        if (node.isInWorkflow("wf_mm_MerlinNutritionApproval"))
            flag = true;
    } else if (nodeObjectType == "DevSU") {
        if (node.isInWorkflow("wf_mm_DevSUOnboardingWorkflow"))
            flag = true;
    } else if (nodeObjectType == "ShippingPackage") {
        if (node.isInWorkflow("wf_mm_DevSUOnboardingWorkflow"))
            flag = true;
    } else if (nodeObjectType == "DevSupplier") {
        if (node.isInWorkflow("wf_mm_DevSupandFacOnboardWorkflow"))
            flag = true;
    } else if (nodeObjectType == "Event") {
        if (node.isInWorkflow("wf_mm_Promotion"))
            flag = true;
    } else if (nodeObjectType == "Restaurants") {
        if (node.isInWorkflow("wf_mm_RestaurantWorkflow"))
            flag = true;
    } else if (nodeObjectType == "McDonaldItem") {
        if (node.isInWorkflow("wf_mm_WRINReviewWorkflow"))
            flag = true;
    } else if (nodeObjectType == "SoldMenuItem") {
        if (node.isInWorkflow("wf_mm_SMILaunchWorkflow"))
            flag = true;
        if (node.isInWorkflow("wf_mm_SMIMaintenance"))
            flag = true;
    } else {
        log.info("Invalid Object type");
    }
    return flag;
}

/*--------------------------------------------------------------------------------------
Author: Neethu J
Description: To Validate the WRIN Review Status of WRINs associated with the given RC
Date: 20 Dec 2022
----------------------------------------------------------------------------------------*/

function validateWRINReviewStatus(node, step) {
    var market = node.getValue("a_mm_Market").getSimpleValue();

    var tRef = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var ref = node.getReferences(tRef);
    var tError = null;
    for (var i = 0; i < ref.size(); i++) {
        var shippingUnit = ref.get(i).getTarget();
        if (market == "US" && (shippingUnit.getValue("a_mm_WRINReviewStatus").getSimpleValue() == "Suspend" || shippingUnit.getValue("a_mm_WRINReviewStatus").getSimpleValue() == "Discard")) {
            if (tError == null)
                tError = "Recipe Component cannot be submitted as the Shipping Unit " + shippingUnit.getName() + " Linked to it is in '" + shippingUnit.getValue("a_mm_WRINReviewStatus").getSimpleValue() + "' Status in WRIN Review Workflow";
            else
                tError = tError + "Recipe Component cannot be submitted as the Shipping Unit " + shippingUnit.getName() + " Linked to it is in '" + shippingUnit.getValue("a_mm_WRINReviewStatus").getSimpleValue() + "' Status in WRIN Review Workflow";
        }

    }

    if (tError != null)
        return tError;
    else
        return true;
}



function getDateinFormat(str) {
    var arr = str.split('-');
    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    var i = 0;
    for (i; i <= months.length; i++) {
        if (months[i] == arr[1].toString().toUpperCase()) {
            break;
        }
    }
    i = i + 1;
    var formatddate = i + '/' + arr[0] + '/' + arr[2];
    return formatddate;
}


function FormatDate(str) {

    var dd
    var mm
    var yyyy
    var arr = str.split("-");
    for (var s = 0; s < arr.length; s++) {
        yyyy = arr[0];
        mm = arr[1];
        dd = arr[2];

    }
    //logger.info("Fetch Date:"+ dd+"-"+mm+"-"+yyyy);

    if (mm < 10) {
        mm = '0' + mm
    }
    //logger.info("Fetch Date:"+ dd+"-"+mm+"-"+yyyy);
    if (mm == 01)
        var mo = "jan";
    else if (mm == 02)
        var mo = "feb";
    else if (mm == 03)
        var mo = "mar";
    else if (mm == 04)
        var mo = "apr";
    else if (mm == 05)
        var mo = "may";
    else if (mm == 06)
        var mo = "jun";
    else if (mm == 07)
        var mo = "jul";
    else if (mm == 08)
        var mo = "aug";
    else if (mm == 09)
        var mo = "sep";
    else if (mm == 10)
        var mo = "oct";
    else if (mm == 11)
        var mo = "nov";
    else
        var mo = "dec";

    var getFromDateFo = dd + '-' + mo + '-' + yyyy;
    return getFromDateFo;
}


function getPreviousDate(currentDate) {
    var getVal = getDateinFormat(FormatDate(currentDate));
    var getVall = new Date(getVal);
    var getVal1 = new java.text.SimpleDateFormat("MM/dd/yyyy").format(getVall);
    var yesterday = new Date(getVall);
    yesterday.setDate(getVall.getDate() - 1);
    var dd = yesterday.getDate();
    var mm = yesterday.getMonth() + 1;

    var yyyy = yesterday.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var yesterdayDate = yyyy + '-' + mm + '-' + dd;
    return yesterdayDate;
}

/*
 Name: getCaseSize
 Author: Manasa Gondipalli 
Date: 03/14/2023
Purpose: To get case size value from Total Pack Qty
*/
function getCaseSize(suObj, step) {
    var handlingUOMValueOfSUobj = suObj.getValue("HandlingUOM").getSimpleValue();
    var totPkQty = suObj.getValue("TotalPackQty").getSimpleValue();
    var handlingUOMofSUobj = suObj.getValue("HandlingUOM").getID();
    var caseSize = 0;
    if (handlingUOMofSUobj == "EA") {
        caseSize = Number((Number(totPkQty)).toFixed(2));
    } else if (handlingUOMofSUobj == "KG" || handlingUOMofSUobj == "G" || handlingUOMofSUobj == "LB" || handlingUOMofSUobj == "OZ") {

        var caseSizeValue = Number(gramConversionUsingAttributeValueAndUOM(totPkQty, handlingUOMValueOfSUobj)) / 1000;
        caseSize = Number(caseSizeValue).toFixed(2);


    } else if (handlingUOMofSUobj == "L" || handlingUOMofSUobj == "ML" || handlingUOMofSUobj == "GAL" || handlingUOMofSUobj == "FLZ") {
        var caseSizeValue = Number(mlConversionUsingAttributeValueAndUOM(totPkQty, handlingUOMValueOfSUobj)) / 1000;
        caseSize = Number(caseSizeValue).toFixed(2);
    }
    return caseSize;
}

/*Name:  
Author:	Pratik
Date:	12/21/2022  
Purpose:To replace First Char With Given Value
*/
function replaceFirstCharWithGivenValue(wrinPrefix, Char) {
    var strWrinPrefix = wrinPrefix.toString();
    logger.info(strWrinPrefix.substring(1));
    var startCounter1 = Char + strWrinPrefix.substring(1);

    var startCounter = Number(startCounter1);
    return startCounter;
}




/*Name:	     setHelpWorkflowVariable
Author:	     Swagata Samaddar
Purpose:	 To set workflow variable value based on current workflow and state.
*/
function setHelpWorkflowVariable(node, step, workflow, ent, tstate, variable) {
    try {
        var entity = step.getEntityHome().getEntityByID(ent + "_" + tstate);
        if (entity != null) {
            var wfHelpURL = entity.getValue("a_mm_HelpURL").getSimpleValue();
            log.info("wfHelpURL" + wfHelpURL);
            node.getWorkflowInstance(workflow).setSimpleVariable(variable, wfHelpURL);
        }

    } catch (err) {
        log.info(err);
        throw (err);
    }
}



/*Name:  
Author:	Pratik
Date:	12/22/2022  
Purpose:To populate WRINPrefix as a Recipe Component Number(MRI) for IMBU Market.
*/
function AllocateRCNumberStartingfromEight(node, step) {

    try {
        if (node.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue() == null) {
            var market = node.getValue("a_mm_Market").getSimpleValue();
            var tRCToDevSU = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
            var tReference = node.getReferences(tRCToDevSU);
            if (!tReference.isEmpty()) {
                //log.info("tReference.size: "+tReference.size());
                for (var i = 0; i < tReference.size(); i++) {
                    var tTarget = tReference.get(i).getTarget();
                    if (isAttributeValid(tTarget, step, "WRINPrefix")) {
                        var wrinPrefix = tTarget.getValue("WRINPrefix").getSimpleValue();
                        log.info("wrinPrefix:" + wrinPrefix);
                        var rcKey = wrinPrefix + market;
                        log.info("rcKey:" + rcKey);
                        var ExistingObject = step.getProductHome().getObjectByKey("RC_Key", rcKey);
                        if (ExistingObject == null) {
                            if (wrinPrefix != null && wrinPrefix != "") {

                                if (node.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue() == null) {
                                    node.getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(wrinPrefix);
                                    break;
                                }
                            }
                        } else if (ExistingObject != null && wrinPrefix < 10000) {
                            var startCounter = replaceFirstCharWithGivenValue(wrinPrefix, "8");

                        } else if (ExistingObject != null && wrinPrefix >= 10000) {
                            var startCounter = replaceFirstCharWithGivenValue(wrinPrefix, "8");
                        }
                        //startCounter++;
                        for (j = startCounter; j > 9999; j = j - 1000) {
                            //i = 79998
                            logger.info("j:" + j);
                            // break;
                            var rcKey = j + market;
                            var ExistingObject = step.getProductHome().getObjectByKey("RC_Key", rcKey);
                            logger.info("ExistingObject:" + ExistingObject);
                            if (ExistingObject == null) {
                                if (node.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue() == null) {
                                    node.getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(j);

                                    break;
                                }
                            }
                            if (j > 80999) {

                                j = "79" + wrinPrefix.toString().substring(2);
                                logger.info("j:" + j);
                                var rcKey = j + market;
                                var ExistingObject = step.getProductHome().getObjectByKey("RC_Key", rcKey);
                                logger.info("ExistingObject:" + ExistingObject);
                                logger.info("ExistingObject:" + ExistingObject);
                                if (ExistingObject == null) {
                                    if (node.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue() == null) {
                                        node.getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(j);

                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
        var Rcnumber = node.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
        log.info("Rcnumber:" + Rcnumber);
    } catch (e) {
        logger.info("Exception in setting RC MRI at 'setRCMRINumFromWRINPrefix' - Unable to modify the unique code for object" + e);
    }
}


/*
Author: 	Kirubakaran G
Date: 		08 Jan 2023
Purpose: 	To throw validation messages related Uncooked Serving Size, Uncooked Serving Size UOM, Build Order for Recipe Build Order References
Applicability:  On Condition of the transitions of the states where Recipe Build Order reference is editable
*/
function recipeBuildOrderValidation(node, step) {


    var sErrorMessage = null;
    var tError = null;
    //Set the error Message function
    function setErrorMessage(sNewErrorMessage) {
        if (sErrorMessage == null)
            sErrorMessage = sNewErrorMessage;
        else {
            if (sNewErrorMessage != null)
                sErrorMessage = sErrorMessage + "\n" + sNewErrorMessage;
        }
        return sErrorMessage;
    }

    var recipeBuildString = "RecipeBuildOrder";
    var isThereAnyRC = null;
    var bmiToPkgRCHome = step.getReferenceTypeHome().getReferenceTypeByID("BMIToPackagingComponent");
    if (bmiToPkgRCHome) {
        var bmiToPkgRCs = node.getReferences(bmiToPkgRCHome);
        if (bmiToPkgRCs.size() > 0)
            isThereAnyRC = true;
    }
    var nullUnckServQty = null;
    var nullUnckServUOM = null;
    var nullBuildOrder = null;
    var nullPreparedorUnprepared = null;
    var misMatchIndUOM = null;
    var misMatchNonIndUOM = null;
    var misMatchUnckdServQtyUOM = null;
    var misMatchUnckdServQty = null;
    var isLiquidMisMatch = null;
    var misMatchPreparedorUnprepared = null;
    for (var a = 1; a < 11; a++) {
        var rcBuildHome = step.getReferenceTypeHome().getReferenceTypeByID(recipeBuildString + a);
        if (rcBuildHome) {
            var rcBuildRefs = node.getReferences(rcBuildHome);
            for (var b = 0; b < rcBuildRefs.size(); b++) {
                isThereAnyRC = true;
                var rcBuildIns = rcBuildRefs.get(b);
                var rcBuildTarget = rcBuildIns.getTarget();
                var rcIsLiquid = rcBuildTarget.getValue("IsLiquid").getID();
                var marketValue = rcBuildTarget.getValue("a_mm_Market").getSimpleValue();
                var bsqUOM = rcBuildTarget.getValue("a_mm_BaseServingQuantityUOM").getID();
                var uncookedServQty = rcBuildIns.getValue("a_mm_RecipeServingQuantity").getSimpleValue();
                var uncookedServUOM = rcBuildIns.getValue("a_mm_ServingQuantityUnitofMeasure").getID();
                var preparedorUnprepared = rcBuildIns.getValue("a_mm_PreparedOrUnprepared").getSimpleValue();
                var buildOrder = rcBuildIns.getValue("a_mm_IngredientBuildOrder").getSimpleValue();
                var timeStamp = rcBuildIns.getValue("a_mm_TimeStamp").getSimpleValue();

                var enrichDevRC = rcBuildTarget.isInState("wf_mm_RecipeComponent", "DevRCEnrich");
                var rcHold = rcBuildTarget.isInState("wf_mm_RecipeComponent", "RCHoldState");
                var rcStart = rcBuildTarget.isInState("wf_mm_RecipeComponent", "initialstart");

                //if(enrichDevRC != true && rcHold != true && rcStart != true){
                if (uncookedServQty == null) {
                    nullUnckServQty = true;
                }
                if (uncookedServUOM == null) {
                    nullUnckServUOM = true;
                }
                //}
                if (preparedorUnprepared == null) {
                    nullPreparedorUnprepared = true;
                }
                if (buildOrder == null) {
                    nullBuildOrder = true;
                }
                if (uncookedServUOM != null && bsqUOM != null) {
                    var bsqUOMHome = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_BaseServingQuantityUOM");
                    if (bsqUOM == "2") {
                        if (uncookedServUOM != "2") { // if bsqUOM individual and uncookedServUOM is non-individual
                            var indUOM = bsqUOMHome.getListOfValuesValueByID("2").getValue();
                            misMatchIndUOM = indUOM;
                        }
                    } else {
                        if (uncookedServUOM == "2") { // if bsqUOM non-individual and uncookedServUOM is individual
                            var gmUOM = bsqUOMHome.getListOfValuesValueByID("1").getValue();
                            var ozUOM = bsqUOMHome.getListOfValuesValueByID("5").getValue();
                            var mlUOM = bsqUOMHome.getListOfValuesValueByID("3").getValue();
                            var flozUOM = bsqUOMHome.getListOfValuesValueByID("4").getValue();
                            if (marketValue != "US") {
                                misMatchNonIndUOM = gmUOM + "'/ '" + mlUOM;
                            } else {
                                if (bsqUOM == "5") {
                                    misMatchNonIndUOM = ozUOM;
                                } else if (bsqUOM == "4") {
                                    misMatchNonIndUOM = flozUOM;
                                }
                            }
                        } else if (uncookedServUOM != bsqUOM && marketValue == "US") { // if bsqUOM is not same as RSQUOM for USA

                            var ozUOM = bsqUOMHome.getListOfValuesValueByID("5").getValue();
                            var flozUOM = bsqUOMHome.getListOfValuesValueByID("4").getValue();
                            if (bsqUOM == "5") {
                                misMatchNonIndUOM = ozUOM;
                            } else if (bsqUOM == "4") {
                                misMatchNonIndUOM = flozUOM;
                            }
                        } else if ((rcIsLiquid == "N" && uncookedServUOM == "3") || (rcIsLiquid == "N" && uncookedServUOM == "4")) { // if isLiquid is No and uncookedServUOM is ml or fl oz
                            gmUOM = bsqUOMHome.getListOfValuesValueByID("1").getValue();
                            ozUOM = bsqUOMHome.getListOfValuesValueByID("5").getValue();
                            mlUOM = bsqUOMHome.getListOfValuesValueByID("3").getValue();
                            flozUOM = bsqUOMHome.getListOfValuesValueByID("4").getValue();
                            if (marketValue != "US") {
                                isLiquidMisMatch = mlUOM;
                            } else
                                isLiquidMisMatch = flozUOM;
                        }
                    }
                }
                if (nullUnckServQty != null && nullUnckServUOM != null && nullBuildOrder != null && misMatchIndUOM != null && misMatchNonIndUOM != null && isLiquidMisMatch != null && nullPreparedorUnprepared != null)
                    break;
                else if (nullUnckServUOM == null && misMatchIndUOM == null && misMatchNonIndUOM == null && (misMatchUnckdServQtyUOM == null || misMatchUnckdServQty == null) && nullPreparedorUnprepared == null) {
                    // Uncooked Serv. Qty. UOM should be equal across all Sub-RC rows of a same RC -- hence, repeating the for loops to check if the same RC contains different Uncooked Serv. Qty. UOM value
                    for (var m = 1; m < 11; m++) {
                        var reBuildOrderHome = step.getReferenceTypeHome().getReferenceTypeByID(recipeBuildString + m);
                        if (reBuildOrderHome) {
                            var reBuildOrderRefs = node.getReferences(reBuildOrderHome);
                            for (var n = 0; n < reBuildOrderRefs.size(); n++) {
                                var reBuildOrderTarget = reBuildOrderRefs.get(n).getTarget();
                                if (reBuildOrderTarget.getID() == rcBuildTarget.getID()) {
                                    var reUnckdSerUOM = reBuildOrderRefs.get(n).getValue("a_mm_ServingQuantityUnitofMeasure").getID();
                                    var reUnckdSerQty = reBuildOrderRefs.get(n).getValue("a_mm_RecipeServingQuantity").getSimpleValue();
                                    var repreparedorUnprepared = reBuildOrderRefs.get(n).getValue("a_mm_PreparedOrUnprepared").getSimpleValue();
                                    var reTimeStamp = reBuildOrderRefs.get(n).getValue("a_mm_TimeStamp").getSimpleValue();
                                    if ((reUnckdSerUOM != uncookedServUOM)) {
                                        misMatchUnckdServQtyUOM = true;
                                    }
                                    if ((Number(reUnckdSerQty) != Number(uncookedServQty)) && reTimeStamp == timeStamp) {
                                        misMatchUnckdServQty = true;
                                    }
                                    if ((repreparedorUnprepared != preparedorUnprepared)) {
                                        misMatchPreparedorUnprepared = true;
                                    }
                                    if (misMatchUnckdServQtyUOM != null && misMatchUnckdServQty != null && misMatchPreparedorUnprepared != null)
                                        break;
                                }
                            }
                        }
                        if (misMatchUnckdServQtyUOM != null && misMatchUnckdServQty != null && misMatchPreparedorUnprepared != null)
                            break;
                    }
                }
            }
        }
        if (nullUnckServQty != null && nullUnckServUOM != null && nullBuildOrder != null && misMatchIndUOM != null && misMatchNonIndUOM != null && isLiquidMisMatch != null && nullPreparedorUnprepared != null)
            break;
        else if (misMatchUnckdServQtyUOM != null && misMatchUnckdServQty != null && misMatchPreparedorUnprepared != null)
            break;
    }
    if (isThereAnyRC == null) {
        tError = setErrorMessage("Please add atleast one Recipe Component to proceed further.");
    } else {
        if (nullUnckServQty != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_RecipeServingQuantity").getName() + " is mandatory for all the Recipe and Sub Recipe Components under 'Recipe Build' sub-tab.");
        if (nullUnckServUOM != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_ServingQuantityUnitofMeasure").getName() + " is mandatory for all the Recipe and Sub Recipe Components under 'Recipe Build' sub-tab.");
        if (nullPreparedorUnprepared != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_PreparedOrUnprepared").getName() + " is mandatory for all the Recipe and Sub Recipe Components under 'Recipe Build' sub-tab.");
        if (nullBuildOrder != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_IngredientBuildOrder").getName() + " is mandatory for all the Recipe and Sub Recipe Components under 'Recipe Build' sub-tab.");
        if (misMatchIndUOM != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_ServingQuantityUnitofMeasure").getName() + ", under 'Recipe Build' sub-tab, should be '" + misMatchIndUOM + "' when " + step.getAttributeHome().getAttributeByID("a_mm_BaseServingQuantityUOM").getName() + " is '" + misMatchIndUOM + "' for a Recipe Component.");
        if (misMatchNonIndUOM != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_ServingQuantityUnitofMeasure").getName() + ", under 'Recipe Build' sub-tab, should be '" + misMatchNonIndUOM + "' when " + step.getAttributeHome().getAttributeByID("a_mm_BaseServingQuantityUOM").getName() + " is '" + misMatchNonIndUOM + "' for a Recipe Component.");
        if (misMatchUnckdServQtyUOM != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_ServingQuantityUnitofMeasure").getName() + " should be equal across all the Sub Recipe Components of each Recipe Component under 'Recipe Build' sub-tab.");
        if (misMatchUnckdServQty != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_RecipeServingQuantity").getName() + " should be equal across all the Sub Recipe Components of each Recipe Component set under 'Recipe Build' sub-tab.");
        if (misMatchPreparedorUnprepared != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_PreparedOrUnprepared").getName() + " should be equal across all the Sub Recipe Components of each Recipe Component set under 'Recipe Build' sub-tab.");
        if (isLiquidMisMatch != null)
            tError = setErrorMessage(step.getAttributeHome().getAttributeByID("a_mm_ServingQuantityUnitofMeasure").getName() + ", under 'Recipe Build' sub-tab, should not be '" + isLiquidMisMatch + "' when " + step.getAttributeHome().getAttributeByID("IsLiquid").getName() + " is 'No' for a Recipe Component");
    }

    //logger.info("tError: "+tError);
    if (tError != null) {
        return tError;
    } else {
        return true;
    }
}



/*
Name: validateTaxCodeGroup
Author: 	Ritabrata Pal
Date: 	07Feb2023
Purpose: 	To throw validation message if incorrect value entered for a Tax Group for SMI as part of MDMI-14948
Applicability:  On Condition of the transitions of the SMI states where Tax grid is editable
*/

function validateTaxCodeGroup(node, step, attributeID) {

    var tRefTax = step.getReferenceTypeHome().getReferenceTypeByID("SMIToTaxGroup");
    var tReferences = node.getReferences(tRefTax);
    log.info("tRefTax " + tRefTax);
    var attribute = step.getAttributeHome().getAttributeByID(attributeID);
    var mvAttrID = attributeID + "_MV";
    var attributeMV = step.getAttributeHome().getAttributeByID(mvAttrID);
    if (!tReferences.isEmpty() && attribute != null && attributeMV != null) {
        log.info("Inside IF");
        for (var i = 0; i < tReferences.size(); i++) {

            var tLink = tReferences.get(i);
            log.info("tLink1 " + tLink);
            var tTaxCodeValue = tReferences.get(i).getValue(attributeID).getSimpleValue();
            var taxGroupObject = tReferences.get(i).getTarget();
            log.info("RBP taxGroupObject: " + taxGroupObject.getID());

            var eatInTaxCodeMV = taxGroupObject.getValue(mvAttrID).getSimpleValue();
            log.info("eatInTaxCodeMV: " + eatInTaxCodeMV);
            log.info("tTaxCodeValue: " + tTaxCodeValue);
            if (taxGroupObject && eatInTaxCodeMV != null && tTaxCodeValue != null) {
                if (!eatInTaxCodeMV.contains(tTaxCodeValue)) {
                    var attributeName = step.getAttributeHome().getAttributeByID(attributeID).getName();
                    log.info("attributeName: " + attributeName);
                    log.info("taxName: " + taxGroupObject.getName());
                    var newStr = eatInTaxCodeMV.replace("<multisep/>", ", ");
                    return "Invalid " + attributeName + " for " + taxGroupObject.getName() + ". Valid Tax Codes are: " + newStr;

                }
            }
        }
    }
    return true;
}

/*
MDMI-13312
Name: ValidateDuplicateVariant
Author: 	Mahesh
Date: 	08March2023
Purpose: 	To throw validation message if user submits variant without any changes 
Applicability:  On Every transition of BMI Maintenance
*/
function ValidateDuplicateVariant(node, step) {

    var variantOrVersion = node.getValue("a_mm_VariantOrVersion").getSimpleValue();
    var typeOfChange = node.getValue("a_mm_TypeOfChange").getSimpleValue();

    if (variantOrVersion == "Variant" && typeOfChange != null) {

        var jsObject = {
            RecipeID: "",
            quantity: ""
        }
        var BMIVariants = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToBMIVersion"));
        //logger.info(BMIVariants.size());
        var name = node.getValue("a_mm_BMIInternalName").getSimpleValue();
        var effectivedate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
        var recipes = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));
        var recipesAddon = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent_CanAdd"));
        //var currState= node.
        var recipesHashSet = new java.util.HashMap();
        var recipesAddonHashSet = new java.util.HashMap();
        var recipeAddOnString = "";
        for (var k = 0; k < recipesAddon.size(); k++) {
            var recipeVariant = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_recipevariantcheck");
            var recipeatt = recipeVariant.getAllAttributes();
            var itr = recipeatt.iterator();
            while (itr.hasNext()) {
                var attribute = itr.next().getID();
                if (node.isInState("wf_mm_BMIReplacement", "CRTEnrichmentStage") ||
                    node.isInState("wf_mm_BMIReplacement", "LaunchApprove")) {
                    if (attribute == "a_mm_RecipeServingQuantity" || attribute == "a_mm_ServingQuantityUnitofMeasure" || attribute == "a_mm_PreparedOrUnprepared" || attribute == "a_mm_IngredientBuildOrder" || attribute == "a_mm_Default_RFM_Serving_Factor" ||
                        attribute == "a_mm_MinCustomisableQuantity" ||
                        attribute == "a_mm_MaxCustomisableQuantity" ||
                        attribute == "a_mm_Refund" ||
                        attribute == "a_mm_PricingCharge" ||
                        attribute == "a_mm_DisplayOnCSO" ||
                        attribute == "a_mm_Grill") {
                        recipeAddOnString += attribute + ":" + recipesAddon.get(k).getValue(attribute).getSimpleValue() + "|";
                    }

                }
            }
            logger.info("Add on Start  " + recipesAddon.get(k).getTarget().getID() + "  " + recipeAddOnString);
            recipesAddonHashSet.put(recipesAddon.get(k).getTarget().getID(), recipeAddOnString);
        }
        logger.info("dsdsd");
        for (var k = 0; k < recipes.size(); k++) {
            //logger.info(recipes.get(k).getTarget().getID());
            var stringappend = "";
            var recipeVariant = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_recipevariantcheck");
            var recipeatt = recipeVariant.getAllAttributes();
            var itr = recipeatt.iterator();
            while (itr.hasNext()) {
                var attribute = itr.next().getID();
                if (node.isInState("wf_mm_BMIReplacement", "DevBMIEnrich")) {
                    if (attribute == "a_mm_RecipeServingQuantity" || attribute == "a_mm_ServingQuantityUnitofMeasure" || attribute == "a_mm_PreparedOrUnprepared" || attribute == "a_mm_IngredientBuildOrder") {
                        //	logger.info(recipesHashSet.get(recipeID));
                        stringappend += attribute + ":" + recipes.get(k).getValue(attribute).getSimpleValue() + "|";
                    }
                } else if (node.isInState("wf_mm_BMIReplacement", "CRTEnrichmentStage") ||
                    node.isInState("wf_mm_BMIReplacement", "LaunchApprove")) {
                    if (attribute == "a_mm_RecipeServingQuantity" || attribute == "a_mm_ServingQuantityUnitofMeasure" || attribute == "a_mm_PreparedOrUnprepared" || attribute == "a_mm_IngredientBuildOrder" || attribute == "a_mm_Default_RFM_Serving_Factor" ||
                        attribute == "a_mm_MinCustomisableQuantity" ||
                        attribute == "a_mm_MaxCustomisableQuantity" ||
                        attribute == "a_mm_Refund" ||
                        attribute == "a_mm_PricingCharge" ||
                        attribute == "a_mm_DisplayOnCSO" ||
                        attribute == "a_mm_Grill") {
                        stringappend += attribute + ":" + recipes.get(k).getValue(attribute).getSimpleValue() + "|";
                    }

                } else {
                    if (attribute == "a_mm_RecipeServingQuantity" || attribute == "a_mm_ServingQuantityUnitofMeasure" || attribute == "a_mm_PreparedOrUnprepared" || attribute == "a_mm_WasteInclusion" || attribute == "a_mm_IncludeinSalesType") {
                        //	logger.info(recipesHashSet.get(recipeID));
                        stringappend += attribute + ":" + recipes.get(k).getValue(attribute).getSimpleValue() + "|";
                    }
                }

            }
            recipesHashSet.put(recipes.get(k).getTarget().getID(), stringappend);
        }

        var isDiff = false;
        var isDiffAddon = false;
        var notdiffReason = "";
        var sameVariantNo = "";
        var sameVersionNo = "";

        logger.info("-------------------------------------------------------------------");
        for (var e = 0; e < BMIVariants.size(); e++) {
            isDiff = false;
            isDiffAddon = false;
            //logger.info(BMIVariants.get(e).getTarget().getID());
            var curr = BMIVariants.get(e).getTarget();
            if (curr.getID() == node.getID()) continue;//This line added as a part of INC15712338/INC15711468/INC15711641
            var status = curr.getValue("a_mm_MarketStatus").getLOVValue().getID();
            var variant = curr.getValue("a_mm_VariantNumber").getSimpleValue();
            var version = curr.getValue("a_mm_BMIVersionNumber").getSimpleValue();
            logger.info(status);
            if (status != "02") {

                var currRecipes = curr.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));
                var currRecipesAddon = curr.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent_CanAdd"));
                var recipesHashSetofVariants = new java.util.HashMap();
                var recipesAddonHashSetofVariants = new java.util.HashMap();

                for (var i = 0; i < currRecipes.size(); i++) {
                    //logger.info("Manasa");
                    stringappend = "";
                    logger.info("test " + currRecipes.get(i).getTarget().getID());
                    var recipeVariant = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_recipevariantcheck");
                    var recipeatt = recipeVariant.getAllAttributes();
                    var itr2 = recipeatt.iterator();
                    while (itr2.hasNext()) {
                        var attribute = itr2.next().getID();

                        if (node.isInState("wf_mm_BMIReplacement", "DevBMIEnrich")) {

                            if (attribute == "a_mm_RecipeServingQuantity" || attribute == "a_mm_ServingQuantityUnitofMeasure" || attribute == "a_mm_PreparedOrUnprepared" || attribute == "a_mm_IngredientBuildOrder") { //added as part of INC15811602
                                //	logger.info(recipesHashSet.get(recipeID));
                                stringappend += attribute + ":" + currRecipes.get(i).getValue(attribute).getSimpleValue() + "|";
                                //logger.info(stringappend);
                            }
                        } else if (node.isInState("wf_mm_BMIReplacement", "CRTEnrichmentStage") ||
                            node.isInState("wf_mm_BMIReplacement", "LaunchApprove")) {
                            if (attribute == "a_mm_RecipeServingQuantity" || attribute == "a_mm_ServingQuantityUnitofMeasure" || attribute == "a_mm_PreparedOrUnprepared" || attribute == "a_mm_IngredientBuildOrder" || attribute == "a_mm_Default_RFM_Serving_Factor" ||
                                attribute == "a_mm_MinCustomisableQuantity" ||
                                attribute == "a_mm_MaxCustomisableQuantity" ||
                                attribute == "a_mm_Refund" ||
                                attribute == "a_mm_PricingCharge" ||
                                attribute == "a_mm_DisplayOnCSO" ||
                                attribute == "a_mm_Grill") {
                                stringappend += attribute + ":" + currRecipes.get(i).getValue(attribute).getSimpleValue() + "|";
                            }

                        } else {
                            if (attribute == "a_mm_RecipeServingQuantity" || attribute == "a_mm_ServingQuantityUnitofMeasure" || attribute == "a_mm_PreparedOrUnprepared" || attribute == "a_mm_WasteInclusion" || attribute == "a_mm_IncludeinSalesType") {
                                //	logger.info(recipesHashSet.get(recipeID));
                                stringappend += attribute + ":" + currRecipes.get(i).getValue(attribute).getSimpleValue() + "|";
                            }
                        }

                    }
                    recipesHashSetofVariants.put(currRecipes.get(i).getTarget().getID(), stringappend);
                }

                for (var i = 0; i < currRecipesAddon.size(); i++) {
                    //logger.info("Manasa");
                    recipeAddOnString = "";
                    logger.info("test " + currRecipesAddon.get(i).getTarget().getID());
                    var recipeVariant = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_recipevariantcheck");
                    var recipeatt = recipeVariant.getAllAttributes();
                    var itr2 = recipeatt.iterator();
                    while (itr2.hasNext()) {
                        var attribute = itr2.next().getID();


                        if (node.isInState("wf_mm_BMIReplacement", "CRTEnrichmentStage") ||
                            node.isInState("wf_mm_BMIReplacement", "LaunchApprove")) {
                            if (attribute == "a_mm_RecipeServingQuantity" || attribute == "a_mm_ServingQuantityUnitofMeasure" || attribute == "a_mm_PreparedOrUnprepared" || attribute == "a_mm_IngredientBuildOrder" || attribute == "a_mm_Default_RFM_Serving_Factor" ||
                                attribute == "a_mm_MinCustomisableQuantity" ||
                                attribute == "a_mm_MaxCustomisableQuantity" ||
                                attribute == "a_mm_Refund" ||
                                attribute == "a_mm_PricingCharge" ||
                                attribute == "a_mm_DisplayOnCSO" ||
                                attribute == "a_mm_Grill") {
                                recipeAddOnString += attribute + ":" + recipes.get(i).getValue(attribute).getSimpleValue() + "|";
                            }

                        }


                    }

                    recipesAddonHashSetofVariants.put(currRecipesAddon.get(i).getTarget().getID(), recipeAddOnString);
                }


                //logger.info(status);
                if (recipesHashSet.size() == currRecipes.size()) {
                    var recipesHashSetItr = recipesHashSet.entrySet().iterator();

                    while (recipesHashSetItr.hasNext()) {
                        //logger.info(recipesHashSetItr.next());
                        var recipeID = recipesHashSetItr.next().getKey();
                        //logger.info(recipeID + "  " + recipesHashSet.containsKey(recipeID));
                        if (!recipesHashSetofVariants.containsKey(recipeID)) {
                            logger.info("unique");
                            isDiff = true;
                            break;
                        } else {
                            var newVariantRecipe = recipesHashSet.get(recipeID);
                            var currVariantRecipe = recipesHashSetofVariants.get(recipeID);
                            logger.info(recipeID + "  " + newVariantRecipe);
                            logger.info(recipeID + "  " + currVariantRecipe);
                            if (newVariantRecipe != currVariantRecipe) {
                                logger.info(currVariantRecipe);
                                logger.info(newVariantRecipe);
                                logger.info("unique");
                                isDiff = true;
                                break;
                            }

                        }


                    }
                } else {
                    logger.info("unique");
                    isDiff = true;
                    //break; removed as part of INC15811602
                }

                // Recipes Add on
                if (recipesAddonHashSet.size() == currRecipesAddon.size()) {

                    var recipesAddonHashSetItr = recipesAddonHashSet.entrySet().iterator();
                    logger.info("Add on " + recipesAddonHashSet.size());
                    while (recipesAddonHashSetItr.hasNext()) {
                        //logger.info(recipesAddonHashSetItr.next());
                        var recipeID = recipesAddonHashSetItr.next().getKey();

                        //logger.info(recipeID + "  " + recipesAddonHashSet.containsKey(recipeID));
                        if (!recipesAddonHashSetofVariants.containsKey(recipeID)) {
                            logger.info("unique");
                            isDiffAddon = true;
                            break;
                        } else {
                            var newVariantRecipe = recipesAddonHashSet.get(recipeID);
                            var currVariantRecipe = recipesAddonHashSetofVariants.get(recipeID);
                            logger.info("Add on " + currVariantRecipe);
                            logger.info("Add on " + newVariantRecipe);
                            if (newVariantRecipe != currVariantRecipe) {

                                logger.info("unique");
                                isDiffAddon = true;
                                break;
                            }

                        }


                    }
                } else {
                    logger.info("unique");
                    isDiffAddon = true;
                    //break; removed as part of INC15811602
                }
                //Recipes add on end
                if (!isDiff && !isDiffAddon) {
                    notdiffReason = "Recipe";
                    logger.info("culprit " + variant + "  " + version);

                    sameVariantNo = variant;
                    sameVersionNo = version;
                    break;
                }



            }
            //logger.info(notdiffReason);
        }
        var agree = node.getValue("a_mm_DupVariantCheck").getSimpleValue();
        var currentUser = step.getCurrentUser();
        var superUser = currentUser.getValue("a_mm_PIMSuperUser").getID();
        var msg = "This is a duplicate of the version " + sameVersionNo + " of variant " + sameVariantNo + " for the Base Menu Item. " + "\n" + "Note: Please click on the Save button before approving in case any changes have been made to the BMI, otherwise the changes would not reflect. ";
        if (notdiffReason) {
            node.getValue("a_mm_DupCheckSwitch").setSimpleValue("YES");
            if (superUser == "Y" || node.isInState("wf_mm_BMIReplacement", "ApproveLaunchedApprovedBMI") || node.isInState("wf_mm_BMIReplacement", "LaunchApprove")) {
                return msg;

            } else {
                if (agree) return true;
            }
            return "This is a duplicate of the version " + sameVersionNo + " of variant " + sameVariantNo + ". If you still want to submit the duplicate variant, please select 'Yes, I Agree' for 'Submit Duplicate Variant?' under Primary Information >> General tab ";
        }
    }
    node.getValue("a_mm_DupCheckSwitch").setSimpleValue("NO");
    return true;

}
/*
 Name: PPOEffectiveDatesCheck
 Author: Manasa Gondipalli
Date: 03/14/2023
Purpose: To validate PPO Dates On Recipe Component To PPO reference
*/

function PPOEffectiveDatesCheck(node, ppoNode, step, errorMessage) {
    var tContext = step.getCurrentContext().getID();
    var dCurrentDate = new Date(new java.text.SimpleDateFormat("MM/dd/yyyy").format(getCurrentDate(step, tContext)));
    var oCurrentDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(dCurrentDate);

    var PPORefID = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToPPO");
    var PPOReferences = node.getReferences(PPORefID);
    var RCToPPORefs = new java.util.HashMap();
    // hashset for the temp reference
    var RCToPPORefsHashSetTemp = new java.util.HashSet();

    var startDate0 = "";
    var endDate0 = "";
    if (PPOReferences) {
        for (var i = 0; i < PPOReferences.size(); i++) {
            if (ppoNode == "1" || PPOReferences.get(i).getTarget().getID() == ppoNode.getID()) {
                startDate0 = PPOReferences.get(i).getValue("a_mm_EffectiveFromDate").getSimpleValue();
                endDate0 = PPOReferences.get(i).getValue("a_mm_EffectiveToDate").getSimpleValue();
                var PPOReferencesTargetId = PPOReferences.get(i).getTarget().getID();
                var value = startDate0.toString() + "|" + endDate0.toString();
                RCToPPORefs.put(PPOReferencesTargetId, value);
            }
        }
    }

    var PPOTempRefID = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToPPOTemp");
    var PPOTempReferences = node.getReferences(PPOTempRefID);
    if (PPOTempReferences) {
        for (var j = 0; j < PPOTempReferences.size(); j++) {
            var startDateTempo = PPOTempReferences.get(j).getValue("a_mm_EffectiveFromDate").getSimpleValue();
            if (ppoNode != "1" && PPOTempReferences.get(j).getTarget().getID() != ppoNode.getID()) {
                continue;
            }
            RCToPPORefsHashSetTemp.add(PPOTempReferences.get(j).getTarget().getID());

            var tdisplayDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(startDateTempo);
            var displayDate = new java.text.SimpleDateFormat("MM/dd/yyyy").format(tdisplayDate);
            var startDateTemp = new Date(displayDate);
            var endDateTempo = PPOTempReferences.get(j).getValue("a_mm_EffectiveToDate").getSimpleValue();

            var tdisplayEndDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(endDateTempo);
            var displayEndDate = new java.text.SimpleDateFormat("MM/dd/yyyy").format(tdisplayEndDate);
            var endDateTemp = new Date(displayEndDate);
            log.info("endDateTempo:" + endDateTempo);
            log.info("endDateTemp:" + endDateTemp);

            var PPOTempReferencesTargetId = PPOTempReferences.get(j).getTarget().getID();

            if (RCToPPORefs.containsKey(PPOTempReferencesTargetId)) {
                var newValue = RCToPPORefs.get(PPOTempReferencesTargetId).toString();
                if (ppoNode != "1" && PPOTempReferencesTargetId != ppoNode.getID()) {
                    continue;
                }
                var tstartDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(newValue.substr(0, 10));
                var startDate = new Date(new java.text.SimpleDateFormat("MM/dd/yyyy").format(tstartDate));
                var tendDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(newValue.substr(11));
                var endDate = new Date(new java.text.SimpleDateFormat("MM/dd/yyyy").format(tendDate));
                var ppoNumber = PPOTempReferences.get(j).getTarget().getValue("a_mm_PPONumber").getSimpleValue();



                if (endDate.toDateString() != endDateTemp.toDateString()) {
                    log.info("Entered end date loop");
                    if (endDateTemp.toDateString() == dCurrentDate.toDateString()) {
                        if (endDate < dCurrentDate) {
                            errorMessage = errorMessage + "On current date, cannot set the Effective To date which is past. Please set the Effective To Date of the PPO " + ppoNumber.toString() + " to greater than or equal to Current Date to proceed further.\n";
                            break;
                        }
                    } else if (endDateTemp > dCurrentDate) {
                        log.info("Enter3");
                        if (endDate < dCurrentDate) {
                            errorMessage = errorMessage + "Cannot set past date for a PPO with future Effective To date. Please set the Effective To Date of the PPO" + ppoNumber.toString() + " to greater than or equal to Current Date to proceed further.\n";
                            break;
                        }
                    } else if (endDateTemp <= dCurrentDate || endDate > dCurrentDate) {
                        log.info("Entered end date loop1");
                        errorMessage = errorMessage + "Cannot change Effective To Date since it's past date. Please reset the Effective To Date of the PPO " + ppoNumber.toString() + " to " + displayEndDate + " to proceed further.\n";
                        break;
                    }

                }
                if (startDate.toDateString() != startDateTemp.toDateString()) {
                    if (startDateTemp.toDateString() == dCurrentDate.toDateString()) {
                        if (startDate < dCurrentDate) {
                            errorMessage = errorMessage + "On current date, cannot set the Effective From date which is past. Please reset the Effective From Date of the PPO " + ppoNumber.toString() + " to " + displayDate + " to proceed further.\n";
                            break;
                        }
                    } else if ((startDateTemp <= startDate) || (startDate <= dCurrentDate)) {
                        errorMessage = errorMessage + "Cannot change Effective From Date since it's past date. Please reset the Effective From Date of the PPO " + ppoNumber.toString() + " to " + displayDate + " to proceed further.\n";
                        break;
                    }
                } else if (startDate > endDate) {
                    errorMessage = errorMessage + "Effective From Date should be less than or equal to Effective To Date\n";
                    break;
                }
            }
        }
    }


    if (errorMessage == "") {
        var count = " ";
        for (var i = 0; i < PPOReferences.size(); i++) {
            if (ppoNode == "1" || PPOReferences.get(i).getTarget().getID() == ppoNode.getID()) {
                var displayDate = PPOReferences.get(i).getValue("a_mm_EffectiveFromDate").getSimpleValue();
                var tdisplayDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(displayDate);
                var startDate0 = new Date(new java.text.SimpleDateFormat("MM/dd/yyyy").format(tdisplayDate));

                var endDateTempo = PPOReferences.get(i).getValue("a_mm_EffectiveToDate").getSimpleValue();
                var tdisplayEndDate = new java.text.SimpleDateFormat("yyyy-MM-dd").parse(endDateTempo);
                var endDate0 = new Date(new java.text.SimpleDateFormat("MM/dd/yyyy").format(tdisplayEndDate));

                var PPOReferencesTargetId = PPOReferences.get(i).getTarget().getID();
                var ppoNumber = PPOReferences.get(i).getTarget().getValue("a_mm_PPONumber").getSimpleValue();
                count += PPOReferencesTargetId + "  ";
                if (!RCToPPORefsHashSetTemp.contains(PPOReferencesTargetId)) {

                    //throw new Date(endDate0) <new Date(dCurrentDate);
                    if (endDate0 < dCurrentDate) {
                        //throw "sdsd"+PPOReferencesTargetId;
                        errorMessage += "Cannot set past date for a PPO with future Effective To date. Please set the Effective To Date of the PPO" + ppoNumber.toString() + " to greater than or equal to Current Date to proceed further.\n";


                    } else if (startDate0 > endDate0) {
                        //throw "sdsd"+PPOReferencesTargetId;
                        errorMessage += "Effective From Date should be less than Effective To Date";

                    }
                }

            }
        }

    }

    return errorMessage;
}


/* Name:                              br_mm_Action_ApprovedRecentCommentLog
Author:                                  Cognizant
Date:                                     10/17/2018 
Purpose:                               To copy Comments to Recent. 
Applicability:  Used within the Workflow
Version History:-
1) Suman Pan - 05/05/2020 - Removed the isAttributeValid check for Rejection Reason from the 1st if as this is irrelevant here
2) Swagata Samaddar - 08/10/2022 - Adding Workflow Comment Log changes as per MDMI-12689
*/
function populateRecentCommentLog(node, step, workflow, suStatus, suName) {

    try {

        var sComments = null;
        var sCommentsLog = null;
        var sExistCommentsLog = null;
        var sRejectionReason = null;
        var sLastComment = null;
        var sWfComment = null;
        var sStateName = node.getWorkflowInstance(workflow).getSimpleVariable("wf_mm_StateName");
        log.info("sStateName+commentlog" + sStateName);
        if ((isAttributeValid(node, step, "a_mm_Comments")) && (isAttributeValid(node, step, "a_mm_CommentsLog")) && (isAttributeValid(node, step, "a_mm_LastComment")) && (isAttributeValid(node, step, "a_mm_WorkflowCommentLog"))) // Changes of version 1
        {

            if (suStatus == "Pending Inactivation") {
                if (node.getValue("a_mm_Comments").getSimpleValue() != null) {
                    var rejlog = "Inactivation for Supplier Item " + suName + " has been Rejected";
                    sComments = rejlog + "\n" + node.getValue("a_mm_Comments").getSimpleValue(); //interchange comment log
                }
            }

            //var srejcmnt = node.getWorkflowInstance(workflow).setSimpleVariable("wf_mm_RejectionComment", sComments);
            //log.info("RBP srejcmnt " + srejcmnt);
            if (sComments == null && node.getValue("a_mm_Comments").getSimpleValue() != null) {
                sComments = node.getValue("a_mm_Comments").getSimpleValue();
            }
            var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
            var sUserId = step.getCurrentUser().getID();
            var sUserName = step.getCurrentUser().getName();
            if (sComments != null) {

                sLastComment = sDate + " - " + sUserName + "\n" + "➜" + " Submitted From " + " - " + sStateName;
                sLastComment = sLastComment + "\n" + sComments;
            } else {
                sLastComment = sDate + " - " + sUserName + "\n" + "➜" + " Submitted From " + " - " + sStateName;
            }
            node.getValue("a_mm_LastComment").setSimpleValue(sLastComment);

            if (node.getValue("a_mm_CommentsLog").getSimpleValue() == null) {

                sCommentsLog = sLastComment;
                node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);

            } else {
                if (node.getValue("a_mm_Comments").getSimpleValue() != null) {
                    sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
                    sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
                    node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);

                } else {
                    sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
                    sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
                    node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
                }
            }
            if (node.getValue("a_mm_WorkflowCommentLog").getSimpleValue() != null) {
                var sLastCmnt = sDate + " - " + sUserName + "\n" + "➜" + " Submitted From " + " - " + sStateName;
                var sWfComment = node.getValue("a_mm_WorkflowCommentLog").getSimpleValue();
                var sLatestcmt = node.getValue("a_mm_Comments").getSimpleValue();
                sLastCmnt = sLastCmnt + "\n" + sLatestcmt;
                var sconsWfCommentLog = sLatestcmt + "\n" + "-------------" + "\n" + sWfComment;
                node.getValue("a_mm_WorkflowCommentLog").setSimpleValue(sconsWfCommentLog);
            } else {
                var sLastCmnt = sDate + " - " + sUserName + "\n" + "➜" + " Submitted From " + " - " + sStateName;
                var sLatestcmt = node.getValue("a_mm_Comments").getSimpleValue();
                sLastCmnt = sLastCmnt + "\n" + sLatestcmt;
                var sWfComment = sLastCmnt;
                node.getValue("a_mm_WorkflowCommentLog").setSimpleValue(sWfComment);
            }
            sComments = node.getValue("a_mm_Comments").setSimpleValue(null);

        }

        log.info("End of commentlog");
    } catch (err) {
        log.info(err);
        throw (err);
    }
}
/*--------------------------------------------------------------------------------------
Function Name : isWRINInExceptionList
Author: Neethu J
Description: To Validate if the WRIN is present in the US exception List
User Story: MDMI-15571
Date: 21-March-2023
----------------------------------------------------------------------------------------*/
function isWRINInExceptionList(node, step, market) {
    var WrinNumber = node.getValue("WRINNUMBER").getSimpleValue();
    if (WrinNumber && market == "US") {
        var ExceptionListLOVHome = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_USWRINExceptionList");
        if (ExceptionListLOVHome.getListOfValuesValueByID(WrinNumber))
            return true;
    }
    return false;
}
//

//Function added to populate comment log in SIM-PIM integration WF RCs which are linked to same WRIN
function populateLinkedRCcommentLog(node, step) {

    var sComments = null;
    var sCommentsLog = null;
    var sExistCommentsLog = null;
    var sLastComment = null;

    if ((isAttributeValid(node, step, "a_mm_Comments")) && (isAttributeValid(node, step, "a_mm_CommentsLog")) && (isAttributeValid(node, step, "a_mm_LastComment")) && (isAttributeValid(node, step, "a_mm_WorkflowCommentLog"))) // Changes of version 1
    {
        var rcToSuLinks = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem"));
        for (var a = 0; a < rcToSuLinks.size(); a++) {
            var suStatus = rcToSuLinks.get(a).getValue("a_mm_Status").getSimpleValue();
            var suObj = rcToSuLinks.get(a).getTarget();
            log.info("RBP su " + suObj);
            var suName = rcToSuLinks.get(a).getTarget().getName();
            log.info("RBP Inactivation Rejected SUAS ");
            log.info("RBP suStatus Rejected SUAS " + suStatus);
            log.info("RBP comment Rejected SUAS " + node.getValue("a_mm_Comments").getSimpleValue());
            //var tSUExistCommentsLog = suObj.getValue("a_mm_CommentsLog").getSimpleValue();

            if (suStatus == "Pending Inactivation") {
                //if (node.getValue("a_mm_Comments").getSimpleValue() != null) {
                log.info("RBP Inactivation Rejected ");
                var rejlog = "Inactivation for Supplier Item " + suName + " has been Rejected";
                sComments = rejlog //+ "\n" + node.getValue("a_mm_Comments").getSimpleValue(); //interchange comment log
                //var tSUNewCommentsLog = sComments + "\n" + tSUExistCommentsLog;
                //suObj.getValue("a_mm_CommentsLog").setSimpleValue(tSUNewCommentsLog);
                //}
            }
        }

        if (sComments == null && node.getValue("a_mm_Comments").getSimpleValue() != null) {
            sComments = node.getValue("a_mm_Comments").getSimpleValue();
        }

        var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
        var sUserId = step.getCurrentUser().getID();
        var sUserName = step.getCurrentUser().getName();

        if (sComments != null) {

            sLastComment = sDate + " - " + sUserName + "\n" + "➜" + " Submitted From  - SIM-PIM Integration Workflow";
            sLastComment = sLastComment + "\n" + sComments;
        } else {
            sLastComment = sDate + " - " + sUserName + "\n" + "➜" + " Submitted From  - SIM-PIM Integration Workflow";
        }

        return sLastComment;

    }
    //sComments = node.getValue("a_mm_Comments").setSimpleValue(null);

    log.info("RBP End of Source RC commentlog");

}


function populatelinkedSMIcommentLog(node, step) {

    var sComments = null;
    var sCommentsLog = null;
    var sExistCommentsLog = null;
    var sLastComment = null;

    if ((isAttributeValid(node, step, "a_mm_Comments")) && (isAttributeValid(node, step, "a_mm_CommentsLog")) && (isAttributeValid(node, step, "a_mm_LastComment")) && (isAttributeValid(node, step, "a_mm_WorkflowCommentLog"))) // Changes of version 1
    {
        var rcToSuLinks = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem"));
        for (var a = 0; a < rcToSuLinks.size(); a++) {
            var suStatus = rcToSuLinks.get(a).getValue("a_mm_Status").getSimpleValue();
            var suObj = rcToSuLinks.get(a).getTarget();
            log.info("RBP su " + suObj);
            var suName = rcToSuLinks.get(a).getTarget().getName();
            log.info("RBP Inactivation Rejected SUAS ");
            log.info("RBP suStatus Rejected SUAS " + suStatus);
            log.info("RBP comment Rejected SUAS " + node.getValue("a_mm_Comments").getSimpleValue());
            //var tSUExistCommentsLog = suObj.getValue("a_mm_CommentsLog").getSimpleValue();

            if (suStatus == "Pending Inactivation") {
                //if (node.getValue("a_mm_Comments").getSimpleValue() != null) {
                log.info("RBP Inactivation Rejected ");
                var rejlog = "Inactivation for Supplier Item " + suName + " has been Rejected";
                sComments = rejlog //+ "\n" + node.getValue("a_mm_Comments").getSimpleValue(); //interchange comment log
                //var tSUNewCommentsLog = sComments + "\n" + tSUExistCommentsLog;
                //suObj.getValue("a_mm_CommentsLog").setSimpleValue(tSUNewCommentsLog);
                //}
            }
        }

        if (sComments == null && node.getValue("a_mm_Comments").getSimpleValue() != null) {
            sComments = node.getValue("a_mm_Comments").getSimpleValue();
        }

        var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
        var sUserId = step.getCurrentUser().getID();
        var sUserName = step.getCurrentUser().getName();

        if (sComments != null) {

            sLastComment = sDate + " - " + sUserName + "\n" + "➜" + " Submitted From  - SIM-PIM Integration Workflow";
            sLastComment = sLastComment + "\n" + sComments;
        } else {
            sLastComment = sDate + " - " + sUserName + "\n" + "➜" + " Submitted From  - SIM-PIM Integration Workflow";
        }

        return sLastComment;

    }
    //sComments = node.getValue("a_mm_Comments").setSimpleValue(null);

    log.info("RBP End of Source RC commentlog");

}

/*
Name:	POPTextStatementDeclaredRollUp
Author:	Manasa Gondipalli
Date:	28/03/2023
Purpose:	Code used to roll up POP Text Statement Declared
*/

function POPTextStatementDeclaredRollUp(node, step) {
    var tRefRecipeComponent = step.getReferenceTypeHome().getReferenceTypeByID("BMIToDeclaredRecipeComponent");
    var concatenatedAdditionalDeclarationText = "";
    var concatenatedDeclarationNumberText = "";
    var ObjectType = node.getObjectType();
    log.info("value of Object type" + ObjectType.getID());
    if (ObjectType.getID() == "BaseMenuItem") {
        productCategory = node.getValue("a_mm_RecipeComponentGroup").getID();
        var objectMarket = node.getValue("a_mm_Market").getSimpleValue();
        log.info("market name of the node" + objectMarket);

        var tRefListRecipeComponent = node.getReferences(tRefRecipeComponent);
        log.info("Number of RC linked to the BMI : " + tRefListRecipeComponent.size());
        for (var j = 0; j < tRefListRecipeComponent.size(); j++) {

            log.info("Inside Recipe Component Loop");
            var rcObject = tRefListRecipeComponent.get(j).getTarget();
            var rcName = rcObject.getValue("a_mm_RecipeComponentName").getSimpleValue();
            log.info("Name of RC" + rcName);
            var additionalDeclarationText_POP = "";
            var declarationNumber_POP = "";
            var ingredientDeclaration = rcObject.getValue("a_mm_IngredientDeclaration").getValues();
            log.info("value of the ingredientDeclaration ::" + ingredientDeclaration);
            if (!ingredientDeclaration.isEmpty()) {
                for (var i = 0; i < ingredientDeclaration.size(); i++) {
                    var tValue = ingredientDeclaration.get(i).getSimpleValue();
                    declarationNumber_POP = declarationNumber_POP + tValue + " ,\n";
                }
            }
            log.info("value of the ingredientDeclaration ::" + declarationNumber_POP);
            if (declarationNumber_POP != null && declarationNumber_POP != "") {
                log.info("value of the a_mm_SystemDeclaration4 ::");
                concatenatedAdditionalDeclarationText = concatenatedAdditionalDeclarationText + rcName + " : \n" + declarationNumber_POP;
            }

            additionalDeclarationText_POP = rcObject.getValue("a_mm_AddtionalDeclarationText").getSimpleValue();
            if (additionalDeclarationText_POP != null && declarationNumber_POP != null) {
                log.info("value of the a_mm_SystemDeclaration3 ::");
                concatenatedAdditionalDeclarationText = concatenatedAdditionalDeclarationText + additionalDeclarationText_POP + "\n";
            } else if (additionalDeclarationText_POP != null && declarationNumber_POP == null) {
                log.info("value of the a_mm_SystemDeclaration2 ::");
                concatenatedAdditionalDeclarationText = concatenatedAdditionalDeclarationText + rcName + " : \n" + additionalDeclarationText_POP;
            }

        }
        if (concatenatedAdditionalDeclarationText != null) {
            node.getValue("a_mm_POPTextStatementDeclared").setSimpleValue(concatenatedAdditionalDeclarationText.trim());
        }
        log.info("value of the a_mm_POPTextStatementDeclared ::" + node.getValue("a_mm_POPTextStatementDeclared").getSimpleValue());
    }
}



/* 
Name    		:	getLinkOfObject(node, step)
Author  		:	Kirubakaran Gajendran
Date      		: 	27 March 2023
Purpose     	: 	To get the link of an object directing to ReadOnly screen

*/

function getLinkOfObject(node, step) {

    var tUrlFromEmailHier = step.getEntityHome().getEntityByID("EmailHierarchy").getValue("a_mm_Environment").getSimpleValue();
    var tCurrentContext = step.getCurrentContext().getID();
    var objectTypeID = node.getObjectType().getID();
    var nodeLink = node.getName();

    if (objectTypeID == "Event" || objectTypeID == "BaseMenuItemRecipe" || objectTypeID == "SoldMenuItem" || objectTypeID == "RecipeComponent" || objectTypeID == "McDonaldItem" || objectTypeID == "DevSU") {


        if (objectTypeID == "Event") {

            var screenText = "Event+-+Read+Only&selection=";
            nodeName = node.getValue("a_mm_PromotionName").getSimpleValue();

        } else if (objectTypeID == "BaseMenuItemRecipe") {

            var screenText = "Base+Menu+Item+Recipe+-+Read+Only&selection=";
            nodeName = node.getValue("a_mm_BMIInternalName").getSimpleValue();

        } else if (objectTypeID == "BaseMenuItem") {

            var screenText = "Base+Menu+Item+-+Read+Only&selection=";
            nodeName = node.getValue("a_mm_BMIInternalName").getSimpleValue();

        } else if (objectTypeID == "SoldMenuItem") {

            var screenText = "Sold+Menu+Item+-+Read+Only&selection=";
            nodeName = node.getValue("a_mm_SMIName").getSimpleValue();

        } else if (objectTypeID == "RecipeComponent") {

            var screenText = "Recipe+Component+-+Read+Only&selection=";
            nodeName = node.getValue("a_mm_RecipeComponentName").getSimpleValue();

        } else if (objectTypeID == "McDonaldItem") {

            var screenText = "Supplier+Item+-+Read+Only&selection=";
            nodeName = node.getValue("a_mm_ShippingUnitName").getSimpleValue();

        } else if (objectTypeID == "DevSU") {

            var screenText = "Shipping+Unit+-+Read+Only&selection=";
            nodeName = node.getValue("a_mm_ShippingUnitName").getSimpleValue();

        } else {
            nodeName = node.getName();
        }

        if (nodeName == null || nodeName == "") {
            nodeName = node.getObjectType().getName() + "(" + node.getID() + ")";
        }

        nodeLink = nodeName.link(tUrlFromEmailHier + "webui/McDonaldsPIMPortal#contextID=" + tCurrentContext + "&workspaceID=Main&screen=" + screenText + node.getID() + "&nodeType=product");
    } else {

        if (node.getName() == null || node.getName() == "") {
            nodeLink = node.getObjectType().getName() + "(" + node.getID() + ")";
        } else {
            nodeLink = node.getName();
        }
    }

    logger.info("nodeLink: " + nodeLink)
    return nodeLink;
}

/* 
Name    		:	IsBMIArchivable(node, step)
Author  		:	Kirubakaran Gajendran
Date      		: 	27 March 2023
Purpose     	: 	To checn if SMI is archivable - to check Active SMI Link

*/

function IsBMIArchivable(node, step) {

    var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
    var result = true;
    var smiSize = 0;

    var getRefedByProdsOfBMI = node.getReferencedByProducts().toArray();

    for (var b = 0; b < getRefedByProdsOfBMI.length; b++) {

        var getRefdLinkOfBMI = getRefedByProdsOfBMI[b];
        var sourceSMI = getRefdLinkOfBMI.getSource();

        if (getRefdLinkOfBMI.getReferenceTypeString() == "SMIToBMI" && sourceSMI.getObjectType().getID() == "SoldMenuItem") {

            var smiMarket = sourceSMI.getValue("a_mm_Market").getSimpleValue();
            var smiStatus = sourceSMI.getValue("a_mm_Status").getSimpleValue();
            logger.info("nodeMarket: " + nodeMarket);
            logger.info("smiMarket: " + smiMarket);
            logger.info("smiStatus: " + smiStatus);

            if (smiMarket == nodeMarket) {
                if ((!sourceSMI.isInWorkflow("wf_mm_SMILaunchWorkflow") && !sourceSMI.isInWorkflow("wf_mm_SMIMaintenance") && smiStatus != "Archived" && smiStatus != "Archival Pending" && smiStatus != "Inactive") || smiStatus == "In Development" || sourceSMI.isInWorkflow("wf_mm_SMIMaintenance")) { //smiStatus == "Approved" || smiStatus == "In Maintenance" for MDMI-16579 
                    smiSize = smiSize + 1;
                    nodeLink = getLinkOfObject(sourceSMI, step);
                }
            }
        }
    }

    logger.info("smiSize: " + smiSize);
    if (smiSize > 0) {
        if (nodeMarket == "US") {
            result = "This BMI '" + node.getValue("a_mm_BMIInternalName").getSimpleValue() + "' cannot be archived since it is linked with an active SMIs '" + nodeLink + "'. Please Archive the SMI before archiving this BMI";
        } else {
            result = "This BMI '" + node.getValue("a_mm_BMIInternalName").getSimpleValue() + "' cannot be archived since it is linked with an active SMIs '" + nodeLink + "'. Please delink the BMI from SMI and Approve Or Archive the SMI";

        }
    }

    logger.info("result: " + result);
    return result;

}

//*******************************************************************************

function archivalOfBaseMenuItemWithSMI(node, step) {
    var sUserName = step.getCurrentUser().getName();
    var sCommentsLog = null;
    var sExistCommentsLog = null;
    var sLastComment = null;
    var sDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
    node.getValue("a_mm_InactivationDate").setSimpleValue(sDate);
    node.getValue("a_mm_EffectiveToDate").setSimpleValue(sDate);
    log.info("Inactivation Date: " + node.getValue("a_mm_InactivationDate").getSimpleValue());
    node.getValue("a_mm_PreviousStatus").setLOVValueByID(node.getValue("a_mm_Status").getID()); //Setting Previous Status 
    node.getValue("a_mm_Status").setLOVValueByID("4"); //Setting Status value as Archived
    logger.info("inside first Function:");
    node.getValue("a_mm_BMIStage").setLOVValueByID("14"); // 14 = Archived
    node.getValue("a_mm_MarketStatus").setLOVValueByID("02");
    sLastComment = sDate + " - " + sUserName + "\n" + "! BMI has been Archived as a part of SMI Archival";
    if (node.getValue("a_mm_CommentsLog").getSimpleValue() == null) {
        sCommentsLog = sLastComment;
        node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
    } else {
        sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
        sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
        node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
    }
    if (node.isInWorkflow("wf_mm_DevBMIIdeationandApproval"))
        node.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_DevBMIIdeationandApproval")).delete("Removed from wf_mm_DevBMIIdeationandApproval workflow");
    if (node.isInWorkflow("wf_mm_MerlinNutritionApproval"))
        node.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_MerlinNutritionApproval")).delete("Removed from wf_mm_MerlinNutritionApproval workflow");
    if (node.isInWorkflow("wf_mm_BMIVariantRestaurantGroup"))
        node.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_BMIVariantRestaurantGroup")).delete("Removed from wf_mm_BMIVariantRestaurantGroup workflow");
    deletedRejectedArchivedObj(node, step);
}

/* 
Name:	archivalOfBaseMenuItemWithSMI
Author:	Ramya Shankar Iyer
Date:	19/05/2023
Purpose: Archival of BMI linked with SMI
*/


function archivalOfBaseMenuItemWithSMI(node, step) {
    var sUserName = step.getCurrentUser().getName();
    var sCommentsLog = null;
    var sExistCommentsLog = null;
    var sLastComment = null;
    var sDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
    node.getValue("a_mm_InactivationDate").setSimpleValue(sDate);
    node.getValue("a_mm_EffectiveToDate").setSimpleValue(sDate);
    log.info("Inactivation Date: " + node.getValue("a_mm_InactivationDate").getSimpleValue());
    node.getValue("a_mm_PreviousStatus").setLOVValueByID(node.getValue("a_mm_Status").getID()); //Setting Previous Status 
    node.getValue("a_mm_Status").setLOVValueByID("4"); //Setting Status value as Archived
    logger.info("inside first Function:");
    node.getValue("a_mm_BMIStage").setLOVValueByID("14"); // 14 = Archived
    node.getValue("a_mm_MarketStatus").setLOVValueByID("02");
    sLastComment = sDate + " - " + sUserName + "\n" + "! BMI has been Archived as a part of SMI Archival";
    if (node.getValue("a_mm_CommentsLog").getSimpleValue() == null) {
        sCommentsLog = sLastComment;
        node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
    } else {
        sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
        sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
        node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
    }
    if (node.isInWorkflow("wf_mm_DevBMIIdeationandApproval"))
        node.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_DevBMIIdeationandApproval")).delete("Removed from wf_mm_DevBMIIdeationandApproval workflow");
    if (node.isInWorkflow("wf_mm_MerlinNutritionApproval"))
        node.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_MerlinNutritionApproval")).delete("Removed from wf_mm_MerlinNutritionApproval workflow");
    if (node.isInWorkflow("wf_mm_BMIVariantRestaurantGroup"))
        node.getWorkflowInstance(step.getWorkflowHome().getWorkflowByID("wf_mm_BMIVariantRestaurantGroup")).delete("Removed from wf_mm_BMIVariantRestaurantGroup workflow");
    deletedRejectedArchivedObj(node, step);
}


/*Title:	autoTriggerCurrentStatesBySuperUser
Author:	Neethu J
Company:	Cognizant
Date:	5/26/2023
Description: To auto trigger the item from given workflow until required stopState
Assumptions:N/A
Usage: 	To auto trigger the item from given workflow until required stopState*/
function autoTriggerCurrentStatesBySuperUser(node, step, workflowID, lookupTableHome, lookupTableID, stopState) {
    var tError = null;
    var workflow = step.getWorkflowHome().getWorkflowByID(workflowID);
    var stateID = "";
    var eventID = "";
    var clusterStateID = "";
    var clusterEventID = "";
    try {
        while (tError == null && node.getWorkflowInstance(workflow) && stateID != stopState && stateID != "BMIHoldState") {
            log.info("1 -- START --");
            var currentTasks = new java.util.HashSet("");

            /*  
             for (var j=0;j<10;j++){
             currentTasks = node.getWorkflowInstance(workflow).getTasks();
             //log.info("2");
             var currentTasksItr = currentTasks.iterator();
             while (currentTasksItr.hasNext()) {
                 var task = currentTasksItr.next();
                 }
             } */

            log.info("3");
            // var latestTasks = node.getWorkflowInstance(workflow).getTasks();
            currentTasks = node.getWorkflowInstance(workflow).getTasks();
            currentTasksItr = currentTasks.iterator();
            while (currentTasksItr.hasNext()) {
                log.info("4");
                var task = currentTasksItr.next();
                var latestTasks = node.getWorkflowInstance(workflow).getTasks();
                if (!latestTasks.contains(task)) {
                    currentTasks = node.getWorkflowInstance(workflow).getTasks();
                    currentTasksItr = currentTasks.iterator();
                    //                	throw "HERE " ;
                    break;
                }

                try {
                    stateID = task.getState().getID();
                    log.info("6");
                    var currentEvents = new java.util.HashSet("");
                    currentEvents = task.getState().getLegalEvents();
                    eventID = lookupTableHome.getLookupTableValue(lookupTableID, stateID);
                } catch (ex) {
                    stateID = "";
                    throw ex;
                }
                if (stateID != stopState && stateID != "BMIHoldState" && currentEvents.size() > 0 && stateID != "" && stateID != "DepartmentalApprovals" && stateID != "LaunchApproval") {
                    log.info("7");

                    var scriptMessage = node.getWorkflowInstance(workflow).getTaskByID(stateID).triggerByID(eventID, "Auto trigger by Super user").getScriptMessage();
                    if (scriptMessage != null && scriptMessage != "" && scriptMessage != "null")
                        if (tError == "" || tError == null || tError == "null")
                            tError = scriptMessage;
                        else
                            tError = tError + "\n\n" + scriptMessage;
                    log.info("NJ BMI : EventID : State ID : Error --> " + node.getName() + " : " + eventID + " : " + stateID + " : ^^^" + tError + "^^^");

                } else if (stateID == "DepartmentalApprovals" || stateID == "LaunchApproval") {
                    clusterStateID = stateID;
                    clusterEventID = eventID;
                } else if (stateID == "BMIHoldState") {
                    task.reassign(step.getCurrentUser());
                }
            }
            if (node.getWorkflowInstance(workflow) && node.getWorkflowInstance(workflow).getTaskByID(clusterStateID)) {
                log.info("7");

                var scriptMessage = node.getWorkflowInstance(workflow).getTaskByID(clusterStateID).triggerByID(clusterEventID, "Auto trigger by Super user").getScriptMessage();
                if (scriptMessage != null && scriptMessage != "" && scriptMessage != "null")
                    if (tError == "" || tError == null || tError == "null")
                        tError = scriptMessage;
                    else
                        tError = tError + "\n\n" + scriptMessage;
                log.info("NJ BMI : EventID : State ID : Error --> " + node.getName() + " : " + clusterEventID + " : " + clusterStateID + " : ^^^" + tError + "^^^");

            }

            log.info("8 -- END --");
        }
    } catch (e) {
        throw e;
    }
    logger.info("NJ FINAL ERROR : ^^^" + tError + "^^^");
    return tError;
}


/*
 * Author : Ritabrata Pal
 * User Story : MDMI-16008
 * Sprint : 93
 * Purpose : To override attribute values and linked Products of Primary SMI to linked Alternate SMIs
 */

function overridePrimToAltSMI(node, step, PToAltSMIRef) {

    var market = node.getValue("a_mm_Market").getSimpleValue();
    var errorFlag = false;
    var currentContext = step.getCurrentContext();

    var pToAltSMIRef = step.getReferenceTypeHome().getReferenceTypeByID(PToAltSMIRef);
    var alternateSMIs = node.getReferences(pToAltSMIRef).toArray();

    for (var a = 0; a < alternateSMIs.length; a++) {
        var linkedAltSMI = alternateSMIs[a].getTarget();
        var inheritSMIGrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_SoldMenuItem");
        var inheritSMIAttributes = inheritSMIGrp.getAllAttributes();
        var inheritItr = inheritSMIAttributes.iterator();

        //copying attribute values
        while (inheritItr.hasNext()) {
            var smiAttributeID = inheritItr.next().getID();

            if (smiAttributeID == "a_mm_CoreStatus" || smiAttributeID == "a_mm_DTName" || smiAttributeID == "a_mm_LongName" || smiAttributeID == "a_mm_SMIShortName") {

                setClonesSMIAttributeValues(step, linkedAltSMI, node, smiAttributeID, currentContext.getID());
            } else if (smiAttributeID == "a_mm_SMIName") {
                linkedAltSMI.getValue("a_mm_SMIName").setSimpleValue(node.getValue("a_mm_SMIName").getSimpleValue());
            } else {
                if (smiAttributeID != "a_mm_SMIMenuCode" && smiAttributeID != "a_mm_Status")
                    setClonesSMIAttributeValues(step, linkedAltSMI, node, smiAttributeID, currentContext.getID());
            }
        }
        var PMixSMINm = linkedAltSMI.getValue("a_mm_SMIName").getSimpleValue();
        var PMixSMIMenCode = linkedAltSMI.getValue("a_mm_SMIMenuCode").getSimpleValue();
        linkedAltSMI.getValue("a_mm_ProductMixMapToDescription").setSimpleValue(node.getValue("a_mm_SMIName").getSimpleValue());
        linkedAltSMI.getValue("a_mm_ProductMixMapTo").setSimpleValue(node.getValue("a_mm_SMIMenuCode").getSimpleValue());


        //copy linked products and customization attributes
        var smiToBMIGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI");
        var primarySMIToBMIReferences = node.getReferences(smiToBMIGroupHome);
        var altSMIToBMIReferences = linkedAltSMI.getReferences(smiToBMIGroupHome);
        var smiToRCGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToRecipeComponent");
        var alternateSMIToRCReferences = linkedAltSMI.getReferences(smiToRCGroupHome);
        var primarySMIToRCReferences = node.getReferences(smiToRCGroupHome);
        var smiToSMIGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToSMI");
        var primarySMIToSMIReferences = node.getReferences(smiToSMIGroupHome);
        var altSMIToSMIReferences = linkedAltSMI.getReferences(smiToSMIGroupHome);
        var ApprWSnode = step.executeInWorkspace("Approved", function execute(approvedNode) {
            var approveNode = approvedNode.getProductHome().getProductByID(node.getID());
            return approveNode;
        });
        var aprvPrimarySMIToBMIReferences = ApprWSnode.getReferences(smiToBMIGroupHome);
        var aprvPrimarySMIToRCReferences = ApprWSnode.getReferences(smiToRCGroupHome);
        var aprvPrimarySMIToSMIReferences = ApprWSnode.getReferences(smiToSMIGroupHome);
        // copy linked products in Alt SMIs when products are modified in Primary SMI
        try {
            for (var j = 0; j < altSMIToSMIReferences.size(); j++) {
                altSMIToSMIReferences.get(j).delete();
            }
            for (var k = 0; k < altSMIToBMIReferences.size(); k++) {
                altSMIToBMIReferences.get(k).delete();
            }
            copyLinkedBMI(step, linkedAltSMI, node);
        } catch (e) {
            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                //Target Already Referenced Exception
                log.info("Reference Already Linked.. ");
            }
            else {
                throw "Exception : " + e;
            }
        }
        var inheritCustGrpBMI = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_CustomizationAttributes");
        var inheritCustAttributes = inheritCustGrpBMI.getAllAttributes();
        var inheritItrAttr = inheritCustAttributes.iterator();
        while (inheritItrAttr.hasNext()) {
            var custAttributeID = inheritItrAttr.next().getID();
            //updating RC customization values
            try {
                alternateSMIToRCReferences = linkedAltSMI.getReferences(smiToRCGroupHome);
                if (alternateSMIToRCReferences.size() > 0) {
                    for (var m = 0; m < alternateSMIToRCReferences.size(); m++) {
                        var altSMIToRCIns = alternateSMIToRCReferences.get(m);
                        var altCustAttrValRC = altSMIToRCIns.getValue(custAttributeID).getSimpleValue();
                        for (var p = 0; p < primarySMIToRCReferences.size(); p++) {
                            var pSMIToRCInsMWS = primarySMIToRCReferences.get(p);
                            altSMIToRCIns.getValue(custAttributeID).setSimpleValue(pSMIToRCInsMWS.getValue(custAttributeID).getSimpleValue());
                        }
                    }
                }
            } catch (err) {
                logger.info("Attributes validated 1" + err);
                throw (err);
            }
            //updating SMI customization values
            try {
                altSMIToSMIReferences = linkedAltSMI.getReferences(smiToSMIGroupHome);
                if (altSMIToSMIReferences.size() > 0) {
                    for (var q = 0; q < altSMIToSMIReferences.size(); q++) {
                        var altSMIToSMIIns = altSMIToSMIReferences.get(q);
                        for (var s = 0; s < primarySMIToSMIReferences.size(); s++) {
                            var pSMIToSMIInsMWS = primarySMIToSMIReferences.get(s);
                            altSMIToSMIIns.getValue(custAttributeID).setSimpleValue(pSMIToSMIInsMWS.getValue(custAttributeID).getSimpleValue());
                        }
                    }
                }
            } catch (err) {
                logger.info("Attributes validated 2" + err);
                throw (err);
            }
        }
        //copy tax group values
        /*if (market != "US") {
            try {
                setClonesSMITaxGroupValues(step, linkedAltSMI, node);
            } catch (err) {
                //logger.info("Tax Group Already referenced" + err);
            }
        }
        */
        var smiToTaxGroupHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToTaxGroup");
        var currentSMIToTaxReferences = node.getReferences(smiToTaxGroupHome);
        var market = node.getValue("a_mm_Market").getSimpleValue();
        var taxHierarchyRoot = "TaxGroup" + market;
        var tTaxRoot = step.getEntityHome().getEntityByID(taxHierarchyRoot);
        var tTax = tTaxRoot.getChildren();
        if (market != "AU" && market != "NZ") {
            for (var k = 0; k < tTax.size(); k++) {
                var taxGroupObject = step.getEntityHome().getEntityByID(tTax.get(k).getID());
                var newSMIToTaxReferences = linkedAltSMI.getReferences(smiToTaxGroupHome);
                var eatInTaxCode = null;
                var takeAwayTaxCode = null;
                var otherTaxCode = null;
                if (currentSMIToTaxReferences.size() > 0) {
                    eatInTaxCode = currentSMIToTaxReferences.get(k).getValue("a_mm_EITaxCode").getSimpleValue();
                    takeAwayTaxCode = currentSMIToTaxReferences.get(k).getValue("a_mm_TakeAwayTaxCode").getSimpleValue();
                    otherTaxCode = currentSMIToTaxReferences.get(k).getValue("a_mm_OtherTaxCode").getSimpleValue();
                }
                //for (var i = 0; i < tTax.size(); i++) {
                newSMIToTaxReferences.get(k).getValue("a_mm_EITaxCode").setSimpleValue((eatInTaxCode == null) ? "" : eatInTaxCode);
                newSMIToTaxReferences.get(k).getValue("a_mm_TakeAwayTaxCode").setSimpleValue((takeAwayTaxCode == null) ? "" : takeAwayTaxCode);
                newSMIToTaxReferences.get(k).getValue("a_mm_OtherTaxCode").setSimpleValue((otherTaxCode == null) ? "" : otherTaxCode);

            }
        }

        //copy SMI groups
        var tLinkSMIToSMIGroup = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SMIToSMIGroup");
        var tRefSMIToSMIGroup = node.getClassificationProductLinks(tLinkSMIToSMIGroup).toArray();
        var tLinkSMIToAltSMIGroup = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SMIToSMIGroup");
        var tRefSMIToAltSMIGroup = linkedAltSMI.getClassificationProductLinks(tLinkSMIToAltSMIGroup).toArray();
        log.info("tRefSMIToSMIGroup func " + tRefSMIToSMIGroup.length);

        try {
            if (tRefSMIToSMIGroup.length > 0) {

                for (var i = 0; i < tRefSMIToSMIGroup.length; i++) {

                    var tSMIGroupObj = tRefSMIToSMIGroup[i];
                    var tSMIGroupObj1 = tRefSMIToSMIGroup[i].getClassification();
                    var tSMIGroupObj1ID = tSMIGroupObj1.getID();
                    var pEffFrmDate = tSMIGroupObj1.getValue("a_mm_EffectiveFromDate").getSimpleValue();
                    var pEffToDate = tSMIGroupObj1.getValue("a_mm_EffectiveToDate").getSimpleValue();
                    logger.info("pEffFrmDate" + pEffFrmDate + "pEffToDate" + pEffToDate);
                    var tSMIGroupObjClassification = step.getClassificationHome().getClassificationByID(tSMIGroupObj1ID);
                    if (tSMIGroupObjClassification != null) {

                        var AltSMIToClassRef = linkedAltSMI.createClassificationProductLink(tSMIGroupObjClassification, tLinkSMIToSMIGroup);
                        AltSMIToClassRef.getValue("a_mm_EffectiveFromDate").setSimpleValue(pEffFrmDate);
                        AltSMIToClassRef.getValue("a_mm_EffectiveToDate").setSimpleValue(pEffToDate);
                    }
                }
            } else if (tRefSMIToAltSMIGroup.length > 0) {
                if (tLinkSMIToAltSMIGroup != null) {
                    var tRef = linkedAltSMI.getClassificationProductLinks().get(tLinkSMIToAltSMIGroup);
                    if (!tRef.isEmpty()) {
                        for (var i = 0; i < tRef.size(); i++) {
                            tRef.get(i).delete();
                        }
                    }

                }
            }
        } catch (err) {
            //logger.info("Already linked" + err);
            throw (err);
        }


        //copy linked events
        //if (market == "US") {
        var smiToEventHome = step.getReferenceTypeHome().getReferenceTypeByID("SMIToEvent");
        var PrimarysmiToEventHomeReferences = node.getReferences(smiToEventHome);
        var AltSMIToBMIReferences = linkedAltSMI.getReferences(smiToEventHome);

        var newHashSetEventID = new java.util.LinkedHashSet();

        for (var s = 0; s < PrimarysmiToEventHomeReferences.size(); s++) {

            var eventName = PrimarysmiToEventHomeReferences.get(s).getTarget().getValue("a_mm_PromotionName").getSimpleValue();
            var eventStatus = PrimarysmiToEventHomeReferences.get(s).getTarget().getValue("a_mm_Status").getSimpleValue();
            //log.info("eventName: " + eventName + " - eventStatus: " + eventStatus);

            if (eventStatus == "Active" || eventStatus == "In Development") {
                newHashSetEventID.add(PrimarysmiToEventHomeReferences.get(s).getTarget().getID());
            }
        }

        var itrEventID = newHashSetEventID.iterator();
        while (itrEventID.hasNext()) {
            var nextEventID = itrEventID.next();
            var eventNode = step.getProductHome().getProductByID(nextEventID);
            if (eventNode != null) {
                try {
                    if (errorFlag == true) {
                        //log.info("Do nothing for SMIToEvent reference creation");
                    } else {
                        linkedAltSMI.createReference(eventNode, "SMIToEvent");
                        //logger.info("event added " )
                    }
                } catch (e) {
                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                        //Target Already Referenced Exception
                        log.info("Reference Already Linked.. ");
                    }
                    else {
                        throw "Exception : " + e;
                    }
                }
            }
        }
    }
}


function isPIMSuperUser(node, step) {
    var user = step.getCurrentUser();
    var IsSuperUser = user.getValue("a_mm_PIMSuperUser").getID();
    if (IsSuperUser == "Y") {
        return true;
    } else {
        return false;
    }
}

/*Title:	restQueryHome
Author:	Manasa Gondipalli
Company:	Cognizant
Date:	8/4/2023
User Story :  MDMI-16483
Description: To build condition for Restaurants to compare with restaurant group condition
*/

function restQueryHome(node, step, qh, web) {
    var GrpCondition = node.getValue("a_mm_ViewConditions").getSimpleValue();
    if (GrpCondition) {
        GrpCondition.replace("<lt/>", "<");
        var conditions = GrpCondition.toUpperCase();

        log.info("conditions" + conditions);
        var andOrList = conditions.match(/ AND| OR /g);
        var attrValues = conditions.split(" AND | OR ");
        var condP = com.stibo.query.condition.Condition;
        var cond = com.stibo.query.condition.Conditions;
        var AndQuery = "";
        var OrQuery = "";
        var obj = step.getObjectTypeHome().getObjectTypeByID("Restaurants");
        var marketattr = step.getAttributeHome().getAttributeByID("a_mm_Market");
        //log.info(Object.keys(cond));
        condP = cond.objectType(obj);
        condP = condP.and(cond.valueOf(marketattr).eq("US"));
        var attributes = new java.util.HashMap();
        var attrGrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_PIMUSRestaurant");
        var attrList = attrGrp.getAllAttributes();
        var itr = attrList.iterator();
        var validCondition = 0;
        while (itr.hasNext()) {
            var currObj = itr.next();
            var attrName = currObj.getName().trim().toUpperCase();
            var attrId = currObj.getID();
            attributes.put(attrName, attrId);
        }
        var j = 0;
        for (var i = 0; i < attrValues.length; i++) {
            var temp2 = attrValues[i];
            log.info(temp2);
            var temp2temp = temp2;
            temp2 = temp2.split("=|>|<|!=|<=|>=").filter(Boolean);
            log.info("temp2 " + temp2);
            if (temp2.length != 2) break;
            var attrid = "";
            temp2[0] = temp2[0].trim().toUpperCase();
            if (attributes.containsKey(temp2[0]))
                attrid = step.getAttributeHome().getAttributeByID(attributes.get(temp2[0]));
            var value = temp2[1].trim().toString();
            if (attrid && value) {
                validCondition = 1;
                cond = com.stibo.query.condition.Conditions;
                cond = cond.valueOf(attrid);
                //cond=cond.valueOf(attrid).gt("00026");
                log.info(Object.keys(cond.numeric()));
                cond = computeAcctoSign(cond, temp2temp, value);

                if (i == 0 || andOrList[j].trim() == "AND") {
                    condP = condP.and(cond);
                } else {
                    condP = condP.or(cond);
                }
                if (i != 0) j++;
            } else {
                //  web.showAlert("ERROR", "Kindly check the attribute name - " + temp2[0] + ". Current result is given by ignoring the condition for " + temp2[0]);
            }
            //log.info("condP"+condP);

        }
        var query = qh.queryFor(com.stibo.core.domain.Product).where(condP);
        var result = query.execute();
        log.info("result" + result.asList(10).size());
        var resIds = new java.util.HashSet("");
        //if(!validCondition)return resIds;
        result.forEach(
            function (res) {
                log.info(res.getValue("a_mm_StoreNumber").getSimpleValue());
                resIds.add(res.getID());
                return true;
            });
        log.info("resIds" + resIds);
        return resIds;
    }
}

function computeAcctoSign(cond, temp2, value) {
    if (temp2.indexOf("=") > -1) cond = cond.eq(value);
    else if (temp2.indexOf(">") > -1) cond = cond.numeric().gt(value);
    else if (temp2.indexOf("<") > -1) cond = cond.numeric().lt(value);
    else if (temp2.indexOf("<=") > -1) cond = cond.numeric().lteq(value);
    else if (temp2.indexOf(">=") > -1) cond = cond.numeric().gteq(value);
    else if (temp2.indexOf("!=") > -1) cond = cond.neq(value);
    return cond;


}

function autoTriggerCurrentStatesBySuperUserForSMI(node, step, workflowID) {
    var tError = null;
    var workflow = step.getWorkflowHome().getWorkflowByID(workflowID);
    var stateID = "";
    var eventID = "";
    var i = 0;
    var j = 0;
    var x = 0;
    var y = 0;
    var clusterStateID = "";
    var clusterEventID = "";
    log.info(x);
    // try {
    while (tError == null && node.getWorkflowInstance(workflow) && x < 40) {
        x++;
        log.info("1 -- START --");
        var currentTasks = new java.util.HashSet("");
        currentTasks = node.getWorkflowInstance(workflow).getTasks();
        log.info("2");
        var currentTasksItr = currentTasks.iterator();
        log.info("3");
        while (tError == null && currentTasksItr.hasNext() && y < 40) {
            y++;
            log.info("4");
            eventID = null;
            var task = currentTasksItr.next();
            // try {
            stateID = task.getState().getID();
            log.info("6" + stateID);
            //throw stateID;
            var currentEvents = new java.util.HashSet("");
            currentEvents = task.getState().getLegalEvents().toArray();
            //log.info(currentEvents);
            for (var i = 0; i < currentEvents.length; i++) {
                //log.info("event "+currentEvents[i].getID());

                if (currentEvents[i].getID().toUpperCase() == "SUBMIT" || (node.getWorkflowInstance(workflow).getTasks().size() == 1 && currentEvents[i].getID() == "ST_Cluster.done"))
                    eventID = currentEvents[i].getID();

            }
            //eventID = lookupTableHome.getLookupTableValue(lookupTableID, stateID);
            if (i > 40) {
                break;
            }
            i++;
            if (!eventID) continue;
            log.info(eventID);
            var scriptMessage = node.getWorkflowInstance(workflow).getTaskByID(stateID).triggerByID(eventID, "Auto trigger by Super user").getScriptMessage();
            if (scriptMessage != null && scriptMessage != "" && scriptMessage != "null")
                if (tError == "" || tError == null || tError == "null")
                    tError = scriptMessage;
                else
                    tError = tError + "\n\n" + scriptMessage;

            //    } catch (ex) {
            //       stateID = "";
            //       throw ex;
            //}
            if (node.getWorkflowInstance(workflow)) {
                currentTasks = node.getWorkflowInstance(workflow).getTasks();
                currentTasksItr = currentTasks.iterator();
            } else break;


        }

        if (j > 40) {
            break;
        }
        j++;
        //log.info("8 -- END --");
    }
    //  } catch (e) {
    //    throw e;
    //  }
    //log.info(node.getWorkflowInstance(workflow));
    return tError;
}

/*
Name: refreshSMItoRecipeComponentReference
Autoher:Bharanidharan K L[bharanidharan.kl@us.mcd.com]
Purpose: To refresh the SMI to RC reference in the SMI Node level
*/
function refreshSMItoRecipeComponentReference(node, step, approvalflag) {
    if (node.getObjectType().getID() == "SoldMenuItem") {
        //Deleting SMIToRecipeComponent references from SMI level
        deleteAllProductToProductRefs(node, step, "SMIToRecipeComponent");

        var tSMIToRecipeLink = step.getReferenceTypeHome().getReferenceTypeByID("SMIToRecipeComponent");
        var tMarket = node.getValue("a_mm_Market").getSimpleValue();
        var tSMIStatus = node.getValue("a_mm_Status").getSimpleValue();
        if (tSMIStatus) {
            var tSMIStatusID = node.getValue("a_mm_Status").getID();
            if (tSMIStatusID != "4" && tSMIStatusID != "8") { // Checking SMI Status
                var tSMIToBMIRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI")); //Getting BMI Reference from SMI
                for (var i = 0; i < tSMIToBMIRef.size(); i++) {
                    var tBMIObj = tSMIToBMIRef.get(i).getTarget(); //Getting BMI Node From SMI
                    if (tBMIObj.getObjectType().getID() == "BaseMenuItem") {
                        var refs = ["BMIToRecipeComponent", "BMIToRecipeComponent_CanAdd"]; // Initializing BMItoRC Refs in array
                        for (var a = 0; a < refs.length; a++) { // looping thru BMItoRC refs
                            var tBMIToRecipeLink = step.getReferenceTypeHome().getReferenceTypeByID(refs[a]);
                            var tBMIToRecipeRef = tBMIObj.getReferences(tBMIToRecipeLink); // Getting RCs from BMItoRC refs
                            for (var j = 0; j < tBMIToRecipeRef.size(); j++) { // Getting RCs from Each refs
                                var tBMIToRecipeIns = tBMIToRecipeRef.get(j);
                                var tRecipeObj = tBMIToRecipeIns.getTarget();

                                //Getting the BMItoRC reference meta data
                                var tBtoRServingFact = tBMIToRecipeIns.getValue("a_mm_ServingFactor").getSimpleValue();
                                var tRecipeCompNum = tRecipeObj.getValue("a_mm_RecipeComponentNumber(MRI)").getSimpleValue();
                                var tBtoRWasteInclusion = tBMIToRecipeIns.getValue("a_mm_WasteInclusion").getSimpleValue();
                                var tBtoRMinServingFact = tBMIToRecipeIns.getValue("a_mm_MinCustomisableQuantity").getSimpleValue();
                                var tBtoRMaxServingFact = tBMIToRecipeIns.getValue("a_mm_MaxCustomisableQuantity").getSimpleValue();
                                var tBtoRRefund = tBMIToRecipeIns.getValue("a_mm_Refund").getSimpleValue();
                                var tBtoRCharge = tBMIToRecipeIns.getValue("a_mm_PricingCharge").getSimpleValue();
                                var tBtoRGrill = tBMIToRecipeIns.getValue("a_mm_Grill").getSimpleValue();
                                var tBtoRDefRFMServingFact = tBMIToRecipeIns.getValue("a_mm_Default_RFM_Serving_Factor").getSimpleValue();
                                var tBtoRCostInclusive = tBMIToRecipeIns.getValue("a_mm_CostInclusive").getSimpleValue();
                                var tBtoRDisplayOnCSO = tBMIToRecipeIns.getValue("a_mm_DisplayOnCSO").getSimpleValue();
                                var tSequenceNumber = tBMIToRecipeIns.getValue("a_mm_RefSequenceNumber").getSimpleValue();
                                if (tMarket == "DE" || tMarket == "ES" || tMarket == "IT" || tMarket == "PL") { // Need to revisit for New Market Onboarding
                                    var tBtoRIncludeInSalesType = tBMIToRecipeIns.getValue("a_mm_IncludeinSalesType").getSimpleValue();
                                }

                                try {
                                    //SMI to RC Reference creation
                                    var tNewSMIToRecipeRefE = null;
                                    try {
                                        tNewSMIToRecipeRefE = node.createReference(tRecipeObj, tSMIToRecipeLink);
                                    } catch (e) {
                                        if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                            //do nothing
                                        } else {
                                            throw "Exception occured during SMI to RC Reference creation" + e;
                                        }
                                    }

                                    //setting values in SMI to RC reference meta data
                                    if (tNewSMIToRecipeRefE != null && tNewSMIToRecipeRefE != "null" && tNewSMIToRecipeRefE != "") { //null check added bcz if that target is already present then this variable will be null
                                        tNewSMIToRecipeRefE.getValue("a_mm_RecipeGroup").setSimpleValue("1");
                                        tNewSMIToRecipeRefE.getValue("a_mm_ServingFactor").setSimpleValue(tBtoRServingFact);
                                        tNewSMIToRecipeRefE.getValue("a_mm_Default_RFM_Serving_Factor").setSimpleValue(tBtoRDefRFMServingFact);
                                        tNewSMIToRecipeRefE.getValue("a_mm_MinCustomisableQuantity").setSimpleValue(tBtoRMinServingFact);
                                        tNewSMIToRecipeRefE.getValue("a_mm_MaxCustomisableQuantity").setSimpleValue(tBtoRMaxServingFact);
                                        tNewSMIToRecipeRefE.getValue("a_mm_Refund").setSimpleValue(tBtoRRefund);
                                        tNewSMIToRecipeRefE.getValue("a_mm_PricingCharge").setSimpleValue(tBtoRCharge);
                                        tNewSMIToRecipeRefE.getValue("a_mm_CostInclusive").setSimpleValue(tBtoRCostInclusive);
                                        tNewSMIToRecipeRefE.getValue("a_mm_DisplayOnCSO").setSimpleValue(tBtoRDisplayOnCSO);
                                        tNewSMIToRecipeRefE.getValue("a_mm_RefSequenceNumber").setSimpleValue(tSequenceNumber);

                                        if (tBtoRWasteInclusion) {
                                            tNewSMIToRecipeRefE.getValue("a_mm_WasteInclusion").setSimpleValue(tBtoRWasteInclusion);
                                        } else {
                                            tNewSMIToRecipeRefE.getValue("a_mm_WasteInclusion").setSimpleValue("YES");
                                        }

                                        if (tBtoRGrill) {
                                            tNewSMIToRecipeRefE.getValue("a_mm_Grill").setSimpleValue(tBtoRGrill);
                                        } else {
                                            tNewSMIToRecipeRefE.getValue("a_mm_Grill").setSimpleValue("FALSE");
                                        }

                                        var rcRefType = tNewSMIToRecipeRefE.getValue("a_mm_RCReferenceType").getSimpleValue();
                                        if (tBMIToRecipeLink == "BMIToRecipeComponent_CanAdd" && rcRefType != "Composition") {
                                            tNewSMIToRecipeRefE.getValue("a_mm_RCReferenceType").setSimpleValue("Can Add");
                                        } else {
                                            tNewSMIToRecipeRefE.getValue("a_mm_RCReferenceType").setSimpleValue("Composition");
                                        }

                                        if (tMarket == "DE" || tMarket == "ES" || tMarket == "IT" || tMarket == "PL") {
                                            if (tBtoRIncludeInSalesType) {
                                                tNewSMIToRecipeRefE.getValue("a_mm_IncludeinSalesType").setSimpleValue(tBtoRIncludeInSalesType);
                                            } else {
                                                if (tMarket == "DE")
                                                    tNewSMIToRecipeRefE.getValue("a_mm_IncludeinSalesType").setSimpleValue("Both (Eat In and Take Out)");
                                            }
                                        }

                                        tNewSMIToRecipeRefE.getValue("a_mm_RecipeComponentNumber(MRI)").setSimpleValue(tRecipeCompNum);
                                    }

                                } catch (e1) {
                                    throw "Exception occured during SMI to RC Reference Meta data value setting" + e1;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (approvalflag) {
            if ((!node.isInWorkflow("wf_mm_SMILaunchWorkflow") && !node.isInWorkflow("wf_mm_SMIMaintenance") && tSMIStatusID != "4" && tSMIStatusID != "18" && tSMIStatusID != "8") || tSMIStatusID == "6") { // Approve the SMI node only when the status is Approved(2) or Rejected(6) tSMIStatusID == "2" for MDMI-16579
                approveBmirAndSmiPartially(node, step);
            }
        }
    }
}

function isIOMBUMarket(node) {
    var market = node.getValue("a_mm_Market").getSimpleValue();

    if (market != "US" && market != "UK" && market != "DE" && market != "FR" && market != "AU" && market != "NZ") {
        return true;
    }
    return false;
}

/*Title:	setBMIVersionAndApprove 
Author:	Pratik Deshmukh
Company:	Cognizant
Date:	10/30/2023
User Story :  MDMI-13892
Description: To auto create the BMI Vaersion as part of recipe change from SMI Maintenance.
*/

function setBMIVersionAndApprove(node, step, tEffectiveFromDate, tchoose, activity) {
    var tFlagCheck = null;
    var tBMIKey = null;
    var tBMICode = node.getValue("a_mm_BMIMenuCode").getSimpleValue();
    var tMarket = node.getValue("a_mm_Market").getSimpleValue();
    var tBMIStage = node.getValue("a_mm_BMIStage").getSimpleValue();
    //var tEffectiveToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
    var tBMIName = node.getValue("a_mm_BMIName").getSimpleValue();
    var tBMIInternalName = node.getValue("a_mm_BMIInternalName").getSimpleValue(); //Added as part of MDMI-10653 Amit Kumar
    var tBMIStatus = node.getValue("a_mm_Status").getSimpleValue();
    var tBMIDesc = node.getValue("a_mm_BMIDescription").getSimpleValue();
    var tBMIProteinType = node.getValue("a_mm_BMIProteinType").getSimpleValue();
    var variantorVersion = node.getValue("a_mm_VariantOrVersion").getSimpleValue();
    var versionNumber = node.getValue("a_mm_BMIVersionNumber").getSimpleValue();
    var variantNumber = node.getValue("a_mm_VariantNumber").getSimpleValue();
    var replacementBMIOption = node.getValue("a_mm_ReplacementBMIOption").getSimpleValue();
    var typeOfChange = node.getValue("a_mm_TypeOfChange").getSimpleValue();
    var tvariantName = node.getValue("a_mm_VariantName").getSimpleValue();
    var tmaintenanceReason = node.getValue("a_mm_MaintenanceReason").getSimpleValue();
    tBMIInternalName = tBMICode + "-" + tBMIInternalName;
    //START: MDMI-11831
    var tApprovedDeclaration = node.getValue("a_mm_ApprovedDeclaration").getSimpleValue();
    var tHotHoldApproval = node.getValue("a_mm_HotHoldApproval").getSimpleValue();
    var tSoldIndiviaually = node.getValue("a_mm_SoldIndividually").getSimpleValue();
    //END: MDMI-11831

    var varID = ""
    if (variantorVersion) {
        varID = node.getValue("a_mm_VariantOrVersion").getLOVValue().getID();
    }
    var currentContext = step.getCurrentContext().getID();
    var dformatDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(getCurrentDate(step, currentContext));

    if (tBMICode != null && tMarket != null && variantNumber != null && versionNumber != null) {
        var attrInstance = step.getAttributeHome().getAttributeByID("a_mm_BMIMenuCode");
        var searchQuery = new com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification(com.stibo.core.domain.Product, attrInstance, tBMICode);
        var searchResults = step.getHome(com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome).querySingleAttribute(searchQuery).asList(100);
        var ExistingBMIObj = null;


        if (ExistingBMIObj == null || varID == "01") {
            if (activity == "Create_New_BMI") {
                var bmiRoot = step.getProductHome().getProductByID("BMIHierarchy");
                // try {

                var newBMI = bmiRoot.createProduct(null, "BaseMenuItem");
                tFlagCheck = true;
                newBMI.getValue("a_mm_BMIName").setSimpleValue(tBMIName);
                newBMI.setName(tBMIInternalName); //Added as part of MDMI-10653 Amit Kumar
                newBMI.getValue("a_mm_BMIInternalName").setSimpleValue(tBMIInternalName); //Added as part of MDMI-10653 Amit Kumar
                if (varID == "02") {
                    newBMI.getValue("a_mm_VariantName").setSimpleValue(tvariantName);
                }
                newBMI.getValue("a_mm_Market").setSimpleValue(tMarket);
                newBMI.getValue("a_mm_BMIMenuCode").setSimpleValue(tBMICode);
                newBMI.getValue("a_mm_Status").setSimpleValue(tBMIStatus);
                newBMI.getValue("a_mm_BMIStage").setLOVValueByID("01");
                newBMI.getValue("a_mm_BMIVersionDate").setSimpleValue(tEffectiveFromDate);

                newBMI.getValue("a_mm_MarketStatus").setLOVValueByID("03");

                if (varID == "02") {
                    newBMI.getValue("a_mm_ReplacementBMIOption").setSimpleValue(replacementBMIOption);
                }
                if (tchoose == "01" || tchoose == "02") {
                    newBMI.getValue("a_mm_TypeOfChange").setLOVValueByID(tchoose); //MDMI-17525
                }
                newBMI.getValue("a_mm_VariantOrVersion").setSimpleValue(variantorVersion);
                newBMI.getValue("a_mm_BMIDescription").setSimpleValue(tBMIDesc);
                newBMI.getValue("a_mm_EffectiveToDate").setSimpleValue("2099-12-31");
                newBMI.getValue("a_mm_EffectiveFromDate").setSimpleValue(tEffectiveFromDate);
                newBMI.getValue("a_mm_BMIVersionDate").setSimpleValue(tEffectiveFromDate);
                newBMI.getValue("a_mm_BMIProteinType").setSimpleValue(tBMIProteinType);
                newBMI.getValue("a_mm_CreationDate").setSimpleValue(dformatDate); // ==> Creation Date
                newBMI.getValue("a_mm_BMICreationDate").setSimpleValue(dformatDate);
                newBMI.getValue("a_mm_MaintenanceReason").setSimpleValue(tmaintenanceReason);

                //***********************************//Start MDMI-11831 //***********************************************
                newBMI.getValue("a_mm_ApprovedDeclaration").setSimpleValue(tApprovedDeclaration);
                newBMI.getValue("a_mm_HotHoldApproval").setSimpleValue(tHotHoldApproval);
                newBMI.getValue("a_mm_SoldIndividually").setSimpleValue(tSoldIndiviaually);
                newBMI.getValue("a_mm_AllergenContains").setSimpleValue(node.getValue("a_mm_AllergenContains").getSimpleValue());
                newBMI.getValue("a_mm_AllergenMayContains").setSimpleValue(node.getValue("a_mm_AllergenMayContains").getSimpleValue());



                var attrgrp = step.getAttributeGroupHome().getAttributeGroupByID("ag_mm_CopyBMItoVersionOrVariant");

                //Copy attributes
                log.info("++++++++++ COPY ATTRIBUTES ++++++++++++++++++");
                var attr = attrgrp.getAllAttributes();
                var itr = attr.iterator();
                while (itr.hasNext()) {
                    var attribute = itr.next().getID();
                    newBMI.getValue(attribute).setSimpleValue(node.getValue(attribute).getSimpleValue());
                    log.info(attribute + ":" + node.getValue(attribute).getSimpleValue() + ":" + newBMI.getValue(attribute).getSimpleValue());
                }

                //Copy references
                var refTypes = attrgrp.getLinkTypes();
                var itr = refTypes.iterator();
                while (itr.hasNext()) {
                    var refType = itr.next().getID();
                    var tReference = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(refType));
                    if (!tReference.isEmpty()) {
                        for (var l = 0; l < tReference.size(); l++) {
                            var tReferenceTar = tReference.get(l).getTarget();
                            try {
                                newBMI.createReference(tReferenceTar, refType);
                            } catch (e) {
                                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                    //Target Already Referenced Exception
                                    log.info("Reference Already Linked.. ");
                                }
                                else {
                                    throw "Exception : " + e;
                                }
                            }
                        }
                    }
                }

                var tBMIVersionRef = node.createReference(newBMI, "BMIToBMIVersion");
                // function Added for BMI Versions BiDirectional Link : Rahul C
                try {

                    newBMI.createReference(node, "BMIToBMIVersion");
                    newBMI.createReference(newBMI, "BMIToBMIVersion");
                    node.createReference(node, "BMIToBMIVersion");

                } catch (e) {
                    if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                        //Target Already Referenced Exception
                        log.info("Reference Already Linked.. ");
                    }
                    else {
                        throw "Exception : " + e;
                    }
                }
                createBiDirectionalBMIVersionLink(node, step, newBMI);
                setBMIPriceGroupValues(newBMI, node, step);
                //  function Added for BMI Versions BiDirectional Link : Rahul C
                var bmiToBMIMarketHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("BMIToBMIMarket");
                var bmiToBMIMarket = newBMI.getClassificationProductLinks(bmiToBMIMarketHome);
                for (var b = 0; b < bmiToBMIMarket.size(); b++) {
                    bmiToBMIMarket.get(b).delete();

                }
                var bmiMarketClassification = tMarket;
                var bmiMarketClassHome = step.getClassificationHome().getClassificationByID(bmiMarketClassification);
                if (bmiMarketClassHome) {
                    newBMI.createClassificationProductLink(bmiMarketClassHome, bmiToBMIMarketHome);

                }
                /*createRCbuildClone(node, newBMI, step);
                createRCrefsClone(node, newBMI, step);
                calculateBMIToRC_CookedServQty_ServFact(newBMI, step);
                calculateRCBuild_CookedServQty_ServFact(newBMI, step);
                copyDeclaredRc(node, step, newBMI);
                */
                createBMIVersion(node, step);
                tBMIVersionRef.getValue("a_mm_EffectiveFromDate").setSimpleValue(tEffectiveFromDate);

                if (!newBMI.isInWorkflow("wf_mm_BMIReplacement")) {
                    newBMI.startWorkflowByID("wf_mm_BMIReplacement", "Maintained due to change in Recipe at SMI");
                    log.info("New BMIs initiated to BMI Maintenance Workflow");
                    if (newBMI.isInState("wf_mm_BMIReplacement", "DevBMIEnrich")) { }
                    var workflow = step.getWorkflowHome().getWorkflowByID("wf_mm_BMIReplacement");
                    //newBMI.getWorkflowInstance(workflow).getTaskByID("DevBMIEnrich").triggerLaterByID("AutoSubmit_BMI","AutoSubmit to End State");
                    newBMI.getWorkflowInstance(workflow).getTaskByID("DevBMIEnrich").triggerByID("AutoSubmit_BMI", "Submitted to Next state");
                }

                return newBMI;
            }
        } else {
            tFlagCheck = false;
        }
    }
    return tFlagCheck;
}


///node = BMIR
//This Finction will return the Active Market BMI Recipe.
function isBMIRecipeActiveMarketVariant(node, step) {
    if (node.getObjectType().getID() == "BaseMenuItemRecipe") {
        var marketStatus = node.getValue("a_mm_MarketStatus").getSimpleValue();
        var recipeClassification = node.getValue("a_mm_BMIRecipeGroup").getSimpleValue();
        if (marketStatus && recipeClassification) {
            var marketStatusID = node.getValue("a_mm_MarketStatus").getID();
            var recipeClassificationID = node.getValue("a_mm_BMIRecipeGroup").getID();
            if (marketStatusID == "01" && recipeClassificationID == "01") {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}


//To Identify New/Old BMI model.
function isOldModel(node, step) {
    var market = ""
    var currentContext = step.getCurrentContext();
    var contextLOVHome = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context");
    var allContextLOVValues = contextLOVHome.queryValidValues().asList(100);
    if (allContextLOVValues.size() > 0) {
        for (var i = 0; i < allContextLOVValues.size(); i++) {
            if (allContextLOVValues.get(i).getValue() == currentContext.getID()) {
                market = allContextLOVValues.get(i).getID();
                break;
            }
        }
    }
    if (!market)
        market = node.getValue("a_mm_Market").getSimpleValue();
    market = market + "MarketEntity";
    var marketEntityObj = step.getEntityHome().getEntityByID(market);
    var IsOldModelUser = marketEntityObj.getValue("a_mm_PIMOldModel").getID();
    if (IsOldModelUser == "Y") {
        return true;
    } else {
        return false;
    }
}

//to generate the Recipe Variant Number for given node BMIR
function generateRecipeVariantNumber(node) {
    var recipeIDHasSet = [];
    var TempArr = [];
    var revTempArr = [];
    var bmiMenuCode = node.getValue("a_mm_BMIMenuCode").getSimpleValue();
    var recipeVariantNumber = node.getValue("a_mm_BMIRecipeID").getSimpleValue();
    var market = node.getValue("a_mm_Market").getSimpleValue();

    if ((bmiMenuCode != "" && bmiMenuCode != null) && (recipeVariantNumber == "" || recipeVariantNumber == null)) {
        var variantID = 0;
        var BMIRList = node.getParent().getChildren();
        for (var i = 0; i < BMIRList.size(); i++) {
            var recipeVariantNumberBMIR = BMIRList.get(i).getValue("a_mm_BMIRecipeID").getSimpleValue();
            if (recipeVariantNumberBMIR != "" && recipeVariantNumberBMIR != null) {
                variantID++;
                recipeIDHasSet.push(Number(recipeVariantNumberBMIR));
            }
        }
        var TempArr = recipeIDHasSet.sort(function (a, b) {
            return a - b
        });
        var revTempArr = TempArr.reverse();
        if (revTempArr[0] != undefined && revTempArr[0] != null && revTempArr[0] != "") {
            var variantID_final = revTempArr[0] + 1;
            node.getValue("a_mm_BMIRecipeID").setSimpleValue(variantID_final);
            if (node.getValue("a_mm_BMIRecipeKey").getSimpleValue() == "" || node.getValue("a_mm_BMIRecipeKey").getSimpleValue() == null) {
                node.getValue("a_mm_BMIRecipeKey").setSimpleValue(bmiMenuCode + node.getValue("a_mm_Market").getSimpleValue() + "-" + variantID_final);
            }
        } else {
            node.getValue("a_mm_BMIRecipeID").setSimpleValue(0);
            if (node.getValue("a_mm_BMIRecipeKey").getSimpleValue() == "" || node.getValue("a_mm_BMIRecipeKey").getSimpleValue() == null) {
                node.getValue("a_mm_BMIRecipeKey").setSimpleValue(bmiMenuCode + node.getValue("a_mm_Market").getSimpleValue() + "-" + 0);
            }
        }
    }
}

//To Identify Inventory UOM will be consider to calculate Yield for the Market
function isYieldWithInventoryUOM(node, step) {
    var market = ""
    var currentContext = step.getCurrentContext();
    var contextLOVHome = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context");
    var allContextLOVValues = contextLOVHome.queryValidValues().asList(100);
    if (allContextLOVValues.size() > 0) {
        for (var i = 0; i < allContextLOVValues.size(); i++) {
            if (allContextLOVValues.get(i).getValue() == currentContext.getID()) {
                market = allContextLOVValues.get(i).getID();
                break;
            }
        }
    }
    market = market + "MarketEntity";
    var marketEntityObj = step.getEntityHome().getEntityByID(market);
    var IsYldWthInvUOM = marketEntityObj.getValue("a_mm_YieldWithInvUOM").getID();
    if (IsYldWthInvUOM == "Y") {
        return true;
    } else {
        return false;
    }
}

//Function added as part of INC15505500, INC15510186
function CheckLinkedSU(node, step) {
    var tError = null;
    var tReferences = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var tRef = node.getReferences(tReferences);
    if (!node.isInWorkflow("wf_mm_RecipeComponentWorkflow")) {
        if (node.getValue("a_mm_Status").getID() != "2" && !node.isInWorkflow("wf_mm_RecipeComponentMaintenance")) {
            tError = "RecipeComponent with Status Approved or In Maintanence can only be sent to Restaurant Source mapping Workflow.";
        } else {
            if (!tRef.isEmpty()) {
                logger.info(tRef.size())
                if (tRef.size() == 1) {
                    tError = "Not able to move RC to the Restaurant Assortment Mapping Workflow as only one Active SU is linked to that RC.";
                }
            } else {
                tError = "Not able to move RC to the Restaurant Assortment Mapping Workflow as it is not linked to any Active SU.";
            }
        }
    } else {
        tError = "RecipeComponent is already present in the Restaurant Assortment Mapping Workflow.";
    }
    if (tError != null)
        return tError;
    else
        return true;
}

/*Title:	Dev RC Archival as part of BMI/BMIR Archival 
Company:	Cognizant
Date:	03/15/2024
User Story :  MDMI-17831
Description: To Archive the Dev RC as part BMI-BMIR Archival.
*/
function archiveDevRC(node, step) {
    var sDate = new java.text.SimpleDateFormat("dd-MMM-yyyy hh:mm:ss").format(new Date());
    var sUserId = step.getCurrentUser().getID();
    var sUserName = step.getCurrentUser().getName();
    var sCommentsLog = null;
    var sExistCommentsLog = null;
    var sLastComment = null;
    var rcStatus = node.getValue("a_mm_Status").getSimpleValue();
    var rcName = node.getValue("a_mm_RecipeComponentName").getSimpleValue();
    var uniquereferencedby = node.getReferencedByProducts().toArray();
    var referencedBy = [];
    var hashu = new java.util.HashSet();
    if (node.isInWorkflow("wf_mm_RecipeComponent") || (rcStatus == "Inactive" && !node.isInWorkflow("wf_mm_RecipeComponentMaintenance"))) {
        if (node.getValue("a_mm_RCStage").getID() != "08") {
            for (var i = 0; i < uniquereferencedby.length; i++) {
                var source = uniquereferencedby[i].getSource();
                if (hashu.contains(source.getID())) continue;
                if (uniquereferencedby[i].getReferenceType().toString().indexOf("Order") == -1) {
                    hashu.add(source.getID());
                    referencedBy.push(uniquereferencedby[i]);
                }
            }

            if (referencedBy.length > 0) {
                for (var i = 0; i < referencedBy.length; i++) {
                    var source = referencedBy[i].getSource();
                    var BMIObject = step.getProductHome().getProductByID(source.getID());
                    if (BMIObject.getObjectType().getID() == "BaseMenuItemRecipe" || BMIObject.getObjectType().getID() == "BaseMenuItem") {
                        try {
                            BMIObject.createReference(node, "BMIToUnlinkedRecipeComponent");
                        } catch (e) {
                            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                //Target Already Referenced Exception
                                log.info("Reference Already Linked.. ");
                            }
                            else {
                                throw "Exception : " + e;
                            }
                        }

                        var recipeBuildString = "RecipeBuildOrder";
                        for (var j = 1; j < 11; j++) {
                            var recipeBuildHome = step.getReferenceTypeHome().getReferenceTypeByID(recipeBuildString + j);
                            if (recipeBuildHome) {
                                var recipeBuildRefs = BMIObject.getReferences(recipeBuildHome);
                                for (var k = 0; k < recipeBuildRefs.size(); k++) {
                                    var RCID = recipeBuildRefs.get(k).getTarget().getID();
                                    var CurrentRCID = node.getID();
                                    if (CurrentRCID == RCID) {
                                        recipeBuildRefs.get(k).delete();
                                    }
                                }
                            }
                        }
                        referencedBy[i].delete();
                    }
                }

            }
            var sDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
            node.getValue("a_mm_InactivationDate").setSimpleValue(sDate);
            node.getValue("a_mm_PreviousStatus").setLOVValueByID(node.getValue("a_mm_Status").getID());
            node.getValue("a_mm_Status").setSimpleValue("Archived");
            node.getValue("a_mm_RCStage").setLOVValueByID("08"); //Setting RC Stage value as Archived
            var currDate = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
            var effectiveFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
            if (effectiveFromDate > currDate) {
                node.getValue("a_mm_EffectiveFromDate").setSimpleValue(sDate);
            }
            node.getValue("a_mm_EffectiveToDate").setSimpleValue(sDate);
            var RCflag = node.getValue("a_mm_RecipeComponentGroup").getSimpleValue();
            if (RCflag != null) {
                RCflag = node.getValue("a_mm_RecipeComponentGroup").getID();
            }
            if (RCflag == "F") {
                var v = null;
                //Modified as part of MDMI-20391
                //                var set = new java.util.HashMap();
                //                set.put("a_mm_SpecificationNumber", v);
                //                step.getKeyHome().updateUniqueKeyValues2(set, node);
                node.getValue("a_mm_SpecificationNumber").setSimpleValue("");
                node.getValue("a_mm_IssueNumber").setSimpleValue("");
                node.getValue("a_mm_MerlinStatus").setSimpleValue("");
                node.getValue("a_mm_MerlinSpecURL").setSimpleValue("");
            }
            var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
            var ISOMarketFormat = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(nodeMarket).getID();

            var linkedSUHashset = new java.util.HashSet(""); //Added as a part of MDMI-17874
            var RCToSU = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
            if (RCToSU != null) {
                var tRef = node.getReferences(RCToSU);
                if (!tRef.isEmpty()) {
                    for (var i = 0; i < tRef.size(); i++) {
                        try {
                            linkedSUHashset.add(tRef.get(i).getTarget()); //Added as a part of MDMI-17874
                            node.createReference(tRef.get(i).getTarget(), "ArchivedRecipeComponentToSupplierItem");
                            tRef.get(i).delete();
                        } catch (e) {
                            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                //Target Already Referenced Exception
                                log.info("Reference Already Linked.. ");
                            }
                            else {
                                throw "Exception : " + e;
                            }
                        }
                    }
                }
            }

            var threeDigitISOMarketFormat = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(nodeMarket).getValue();
            var SUToSU = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SUToSUMarket");
            var activeClassification = "ShippingUnit" + threeDigitISOMarketFormat + "_Active";
            var activeLinkedClassification = "ShippingUnit" + threeDigitISOMarketFormat + "_Active_Linked";
            var itr = linkedSUHashset.iterator();
            while (itr.hasNext()) {
                var tSINode = itr.next();
                if (SUToSU) {
                    var tSUToSurefs = tSINode.getClassificationProductLinks().get(SUToSU);
                    for (var a = 0; a < tSUToSurefs.size(); a++) {
                        try {
                            if (activeLinkedClassification == tSUToSurefs.get(a).getClassification().getID()) {
                                tSUToSurefs.get(a).delete();
                                var sTargetclass = step.getClassificationHome().getClassificationByID(activeClassification);
                                tSINode.createClassificationProductLink(sTargetclass, SUToSU);
                            }
                        } catch (e) {
                            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                //Target Already Referenced Exception
                                log.info("Reference Already Linked.. ");
                            }
                            else {
                                throw "Exception : " + e;
                            }
                        }
                    }
                }
            }

            var RCToEvent = step.getReferenceTypeHome().getReferenceTypeByID("RecipeToEvent");
            if (RCToEvent != null) {
                var tRef = node.getReferences(RCToEvent);
                if (!tRef.isEmpty()) {
                    for (var i = 0; i < tRef.size(); i++) {
                        try {
                            node.createReference(tRef.get(i).getTarget(), "ArchivedRecipeToEvent");
                            tRef.get(i).delete();
                        } catch (e) {
                            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                //Target Already Referenced Exception
                                log.info("Reference Already Linked.. ");
                            }
                            else {
                                throw "Exception : " + e;
                            }
                        }
                    }
                }
            }
            var tLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID("RecipeComponentToRecipeMarket");
            if (tLink != null) {
                var tRef = node.getClassificationProductLinks().get(tLink);
                if (!tRef.isEmpty()) {
                    for (var i = 0; i < tRef.size(); i++) {
                        tRef.get(i).delete();
                    }
                }
            }
            var recipeFlag = node.getValue("a_mm_RecipeFlag");
            if (recipeFlag)
                recipeFlagId = recipeFlag.getID();
            if (recipeFlagId == "0") {
                var oTargetObject = step.getClassificationHome().getClassificationByID("ArchivedRC" + ISOMarketFormat);
                node.createClassificationProductLink(oTargetObject, tLink);
            } else {
                var oTargetObject = step.getClassificationHome().getClassificationByID("ArchivedNonRC" + ISOMarketFormat);
                node.createClassificationProductLink(oTargetObject, tLink);
            }
            deletedRejectedArchivedObj(node, step);
            sLastComment = sDate + " - " + sUserName + "\n" + "! Dev RC has been Archived as part of BMI Archival"
            if (node.getValue("a_mm_CommentsLog").getSimpleValue() == null) {
                sCommentsLog = sLastComment;
                node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
            } else {
                sExistCommentsLog = node.getValue("a_mm_CommentsLog").getSimpleValue();
                sCommentsLog = sLastComment + "\n" + "-------------" + "\n" + sExistCommentsLog;
                node.getValue("a_mm_CommentsLog").setSimpleValue(sCommentsLog);
            }
            node.getValue("a_mm_LastComment").setSimpleValue(sLastComment);
            /***************************** Start: Version 1 ****************************/
            if (node.isInWorkflow("wf_mm_RecipeComponent")) {
                var workflow_0 = step.getWorkflowHome().getWorkflowByID("wf_mm_RecipeComponent");
                node.getWorkflowInstance(workflow_0).delete("Removed from Recipe Component workflow");
            }
            /////
            if (node.isInWorkflow("wf_mm_MerlinNutritionApproval")) {
                var workflow_1 = step.getWorkflowHome().getWorkflowByID("wf_mm_MerlinNutritionApproval");
                node.getWorkflowInstance(workflow_1).delete("Removed from Merlin workflow");
            }
            if (node.isInWorkflow("wf_mm_RecipeComponentWorkflow")) {
                var workflow_2 = step.getWorkflowHome().getWorkflowByID("wf_mm_RecipeComponentWorkflow");
                node.getWorkflowInstance(workflow_2).delete("Removed from Restaurant Source Mapping workflow");
            }
            if (node.isInWorkflow("wf_mm_RecipeComponentMaintenance")) {
                var workflow_2 = step.getWorkflowHome().getWorkflowByID("wf_mm_RecipeComponentMaintenance");
                node.getWorkflowInstance(workflow_2).delete("Removed from Recipe Component (RC) Maintenance workflow");
            }
            if (node.isInWorkflow("wf_mm_DrawBridge")) {
                var workflow_2 = step.getWorkflowHome().getWorkflowByID("wf_mm_DrawBridge");
                node.getWorkflowInstance(workflow_2).delete("Removed from Integration workflow");
            }

            //---------- Informing to SIM
            var market = "";
            var wrin = "";
            var wsi = "";
            var impactedObjects = node.getValue("a_mm_ImpactedObjects").getSimpleValue() + "";
            if (impactedObjects != null) {
                var impactedObjectsSplit = impactedObjects.split("\n");
                for (var j = 0; j < impactedObjectsSplit.length; j++) {
                    var impactedObjectsSplitRow = impactedObjectsSplit[j] + "";
                    var impactedObjectsSplitNode = impactedObjectsSplitRow.split("|");
                    if (impactedObjectsSplitNode.length > 0) {
                        if (impactedObjectsSplitNode.length > 0) {
                            var supplierItem = step.getKeyHome().getObjectByKey("GTINWRIN", impactedObjectsSplitNode[0]);
                            wrin = impactedObjectsSplitNode[0];
                            wsi = impactedObjectsSplitNode[1];
                            market = impactedObjectsSplitNode[2];
                            if (supplierItem != null) {
                                if (wsi == "") {
                                    integ.approvePimImpactedObjects(wrin, null, market, step, logger, getLookupTableValue); //Call SIM Method

                                } else {
                                    integ.approvePimImpactedObjects(wrin, wsi, market, step, logger, getLookupTableValue); //Call SIM Method
                                }
                            }
                        }
                    }
                }
            }
            approveObjectInAllContexts(node, step);
            /***************************** End: Version 1 ****************************/
        } else {
            //Do Nothing

        }

    } else { // Commented as part of the MDMI-15449(we can archive the RC which is in development) and rcStatus == "Approved" rcStatus == "In Maintenance" for MDMI-16579
        //Do Nothing

    }
    logger.info("Rc Status :- " + node.getValue("a_mm_Status").getSimpleValue());
}

function refAvailable(node, rcRef, step) { //changes as part of INC16900786 - Added the parameter node
    //try {
    var bmiHashSetID = new java.util.HashSet("");
    var archivedBMICount = 0;
    var length = 0;
    for (var x = 0; x < rcRef.size(); x++) {
        var rc = rcRef.get(x).getTarget();
        var devRC = rc.getValue("a_mm_IsDevRC").getSimpleValue();
        if (devRC == "Yes") {
            var getRefedByProds = rc.getReferencedByProducts().toArray();
            //logger.info(devRC);
            for (var a = 0; a < getRefedByProds.length; a++) {
                var refID = getRefedByProds[a].getReferenceType().getID();
                if (refID == "BMIToRecipeComponent" || refID == "RecipeBuildOrder1") {
                    var getRefdLink = getRefedByProds[a];
                    var sourceBMI = getRefdLink.getSource();
                    bmiHashSetID.add(sourceBMI.getID())

                    // logger.info(sourceBMI.getID() + "- " + sourceBMI.getValue("a_mm_Status").getSimpleValue())
                    if (sourceBMI.getValue("a_mm_Status").getSimpleValue() == "Archived" && node.getID() != sourceBMI.getID()) {
                        archivedBMICount++;
                    }
                }
            }
            logger.info(bmiHashSetID.size())
            logger.info("length-" + length + "archivedBMICount-" + archivedBMICount)
            if (archivedBMICount == bmiHashSetID.size() - 1) {
                logger.info("Linked Dev RC got Archived");
                archiveDevRC(rc, step);
            } if (bmiHashSetID.size() < 1) {
                logger.info("Linked to node BMI Olny");
                archiveDevRC(rc, step);
            }
        }
    }
}

/*Title:	NA
Author:	Pinaki Mondal
Company:	Cognizant
Date:	15/04/2024
Usage: 	To classify SMI Based on SMI Type and SMI Indicator 
(Primary, Alternate, Ala carte, Combo)*/

function classifyActiveInactiveSMI(node, step, activeInactive) {
    var tLink = step.getLinkTypeHome().getClassificationProductLinkTypeByID("SMIToSMIMarket");
    var nodeMarket = node.getValue("a_mm_Market").getSimpleValue();
    var ISOMarketFormat = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_ISOMarket").getListOfValuesValueByID(nodeMarket).getID();
    var SMItype = node.getValue("a_mm_SoldMenuItemType").getID();
    var smiIndicator = node.getValue("a_mm_PrimaryOrAlternateIndicator").getID();
    if (activeInactive == "SMIActive") {
        if (SMItype == "1") { // A-la-carte
            var oTargetObject1 = step.getClassificationHome().getClassificationByID("SMIActive_" + ISOMarketFormat + "_ALC");
            node.createClassificationProductLink(oTargetObject1, tLink);
        } else { // SMItype == "2" Combo
            var oTargetObject2 = step.getClassificationHome().getClassificationByID("SMIActive_" + ISOMarketFormat + "_COMBO");
            node.createClassificationProductLink(oTargetObject2, tLink);
        }

        if (smiIndicator == "P") { // Primary
            var oTargetObject3 = step.getClassificationHome().getClassificationByID("SMIActive_" + ISOMarketFormat + "_PRIMARY");
            node.createClassificationProductLink(oTargetObject3, tLink);
        } else { // smiIndicator == "A" Alternate 
            var oTargetObject4 = step.getClassificationHome().getClassificationByID("SMIActive_" + ISOMarketFormat + "_ALTERNATE");
            node.createClassificationProductLink(oTargetObject4, tLink);
        }
        // Populating Primary Alacarte for US market
        if (ISOMarketFormat == "US" && SMItype == "1" && smiIndicator == "P") {
            var oTargetObject5 = step.getClassificationHome().getClassificationByID("SMIActive_" + ISOMarketFormat + "_PRIMARY_ALC");
            node.createClassificationProductLink(oTargetObject5, tLink);
        }
    } else if (activeInactive == "SMIInactive") { // Classification while Inactive SMI
        if (SMItype == "1") { // A-la-carte
            var oTargetObject1 = step.getClassificationHome().getClassificationByID("SMIInactive_" + ISOMarketFormat + "_ALC");
            node.createClassificationProductLink(oTargetObject1, tLink);
        } else { // SMItype == "2" Combo
            var oTargetObject2 = step.getClassificationHome().getClassificationByID("SMIInactive_" + ISOMarketFormat + "_COMBO");
            node.createClassificationProductLink(oTargetObject2, tLink);
        }

        if (smiIndicator == "P") { // Primary
            var oTargetObject3 = step.getClassificationHome().getClassificationByID("SMIInactive_" + ISOMarketFormat + "_PRIMARY");
            node.createClassificationProductLink(oTargetObject3, tLink);
        } else { // smiIndicator == "A" Alternate 
            var oTargetObject4 = step.getClassificationHome().getClassificationByID("SMIInactive_" + ISOMarketFormat + "_ALTERNATE");
            node.createClassificationProductLink(oTargetObject4, tLink);
        }
        // Populating Primary Alacarte for US market
        if (ISOMarketFormat == "US" && SMItype == "1" && smiIndicator == "P") {
            var oTargetObject5 = step.getClassificationHome().getClassificationByID("SMIInactive_" + ISOMarketFormat + "_PRIMARY_ALC");
            node.createClassificationProductLink(oTargetObject5, tLink);
        }
    }
}

/*Title:	NA
Author:	Manasa Gondipalli
Company:	Cognizant
Date:	19/04/2024
Usage: 	To get time along with seconds and AM/PM */

function getTimeFormat(date) {
    var hours = date.getHours();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var isoTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return isoTime;
}

/*Title:	NA
Author:	Manasa Gondipalli
Company:	Cognizant
Date:	19/04/2024
Usage: 	To get time along with seconds without AM/PM */

function getTimeFormatWithoutAmPm(date) {
    var hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var isoTime = hours + ':' + minutes + ':' + seconds;
    return isoTime;
}
function removeResgrpClassification(res, step) {
    var finalResgrps = new java.util.HashSet();
    var removedResgrp = [];

    var tRESGRPLinks = res.getClassificationProductLinks(tRESGRP).toArray();

    for (var i = 0; i < tRESGRPLinks.length; i++) {

        var currResgrp = step.getClassificationHome().getClassificationByID(tRESGRPLinks[i].getClassification().getID());
        var referenceHierarchyType = currResgrp.getValue("a_mm_RestaurantGroupHierarchyType").getID();
        if (referenceHierarchyType == "C") {
            if (!checkValidResgrp(res, currResgrp)) {
                removedResgrp.push(currResgrp.getID());
                log.info("removing resgrp " + currResgrp.getName());
                tRESGRPLinks[i].delete();
            }
        }

    }

    return removedResgrp.join(",");
}

// checks if resgrp condition matches with the restaurant
function checkValidResgrp(res, resgrp) {


    var attrs = ["a_mm_Physical_Address_City", "a_mm_AdCoopNumber", "a_mm_DisCenterNumber", "a_mm_RegionCode", "a_mm_State", "a_mm_ZoneCode"];
    //var currRef = resgrp.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("ResgrpToCities"));
    // var a_mm_Physical_Address_City=null
    // if (currRef.size() >0)
    // {
    //  a_mm_Physical_Address_City=currRef.get(0).getTarget().getID();
    // }
    var a_mm_Physical_Address_City = res.getValue("a_mm_Physical_Address_City").getSimpleValue();
    // var a_mm_AdCoopNumber=null;
    // currRef = resgrp.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("ResgrpToResGRP"));
    // log.info("a_mm_AdCoopNumber size"+currRef.size());
    // if (currRef.size() >0)
    // {
    // 	a_mm_AdCoopNumber=currRef.get(0).getTarget().getValue("a_mm_AdCoopNumber").getSimpleValue()
    // }

    var a_mm_AdCoopNumber = res.getValue("a_mm_AdCoopNumber").getSimpleValue();
    // var a_mm_DisCenterNumber=null;
    // currRef =  resgrp.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("ResgrpToDC"));
    // if (currRef.size() >0)
    // a_mm_DisCenterNumber=currRef.get(0).getTarget().getValue("a_mm_DisCenterNumber").getSimpleValue();


    var a_mm_DisCenterNumber = res.getValue("a_mm_DisCenterNumber").getSimpleValue();
    // var a_mm_RegionCode=null;
    // currRef =  resgrp.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("ResgrpToFieldOfficeCode"));
    // if (currRef.size() >0)
    // a_mm_RegionCode=currRef.get(0).getTarget().getValue("a_mm_RegionCode").getSimpleValue();

    var a_mm_RegionCode = res.getValue("a_mm_RegionCode").getSimpleValue();
    // var a_mm_State=null;
    // currRef =  resgrp.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("ResgrpToState"));
    // if (currRef.size() >0)
    // a_mm_State=currRef.get(0).getTarget().getValue("a_mm_State").getSimpleValue()

    var a_mm_State = res.getValue("a_mm_State").getSimpleValue();
    // var a_mm_ZoneCode=null;
    // currRef =  resgrp.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("ResgrpToZone"));
    // if (currRef.size() >0)
    //  a_mm_ZoneCode=currRef.get(0).getTarget().getName();

    var a_mm_ZoneCode = res.getValue("a_mm_ZoneCode").getSimpleValue();
    var viewCondition = resgrp.getValue("a_mm_ViewConditions_MDL").getSimpleValue();
    log.info(viewCondition);
    log.info("a_mm_Physical_Address_City " + a_mm_Physical_Address_City);
    log.info("a_mm_AdCoopNumber " + a_mm_AdCoopNumber);
    log.info("a_mm_DisCenterNumber " + a_mm_DisCenterNumber);
    log.info("a_mm_RegionCode " + a_mm_RegionCode);
    log.info("a_mm_State " + a_mm_State);
    log.info("a_mm_ZoneCode " + a_mm_ZoneCode);
    viewCondition = viewCondition.replaceAll("OR", "||");
    viewCondition = viewCondition.replaceAll("AND", "&&");
    //viewCondition=viewCondition.replaceAll("'","");
    viewCondition = viewCondition.replaceAll("=", "==");
    var ans = eval("(" + viewCondition + ")");
    log.info(ans);
    log.info("-------------------------------------------------------------------");
    return ans;
}
function addBackValidResgrp(res, step) {
    var valueApprWS = step.executeInWorkspace("Approved", function execute(approvedNode) {
        var approveNode = approvedNode.getProductHome().getProductByID(res.getID());
        if (approveNode != null) {
            var tRESGRPLinks = approveNode.getClassificationProductLinks(tRESGRP).toArray();

            for (var i = 0; i < tRESGRPLinks.length; i++) {

                var currResgrp = step.getClassificationHome().getClassificationByID(tRESGRPLinks[i].getClassification().getID());
                var referenceHierarchyType = currResgrp.getValue("a_mm_RestaurantGroupHierarchyType").getID();
                if (referenceHierarchyType == "C") {
                    if (checkValidResgrp(approveNode, currResgrp)) {
                        log.info("Adding Restaurant group" + currResgrp.getName());
                        try {
                            res.createClassificationProductLink(currResgrp, tRESGRP);
                        }
                        catch (e) {
                            if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                                //Target Already Referenced Exception
                                log.info("Reference Already Linked.. ");
                            }
                            else {
                                throw "Exception : " + e;
                            }
                        }
                    }
                }

            }
            return true;
        } else {
            return null;
        }
    });
}

function approveBmirAndSmiPartially(node, step) {
    node.approve();
}

/*Title:	approveBmirAndSmiPartially
Author:		Pratik Deshmuk
Company: 	Cognizant
Date:  		27/05/2024
Usage: 		To Partially approve BMIR and SMI 
This function is not in the use any more it can be used in the fureu if required
*/

function approveBmirAndSmiPartiallyFutureUse(node, step) {
    var objectType = node.getObjectType().getID();
    var attributeGrpArray = new java.util.HashSet("");

    if (objectType == "BaseMenuItemRecipe") {
        var RefArray = ["BMIToDeclaredRecipeComponent", "BMIToRecipeComponent", "BMIToRecipeComponent_CanAdd", "BMIToRestaurant", "BMIToRestaurantGroups", "SMIToPriceGroup", "BMIToRestaurant_Deleted", "BMIToRestaurantGroup_Deleted", "BMIToNutritionGRID"];
        var AttrGrp = ["MDL_BMIR_Attribute_Group", "MDL_BMIREST_Attribute_Group", "MDL_Event_Attribute_Group", "MDL_Nutrition_Grid_Attribute_Group"];
        for (p = 0; p <= AttrGrp.length; p++) {
            if (AttrGrp[p]) {
                var attributeGrp = step.getAttributeGroupHome().getAttributeGroupByID(AttrGrp[p]).getAttributes();
                attributeGrpArray.add(attributeGrp)
            }
        }
    } else if (objectType == "SoldMenuItem") {
        var RefArray = ["SMIToEvent", "SMIToBMI", "SMIToSMIAlternateHierachy", "SMIToRestaurantGroups", "AlternateSMI", "SMIToRecipeComponent", "SMItoRestaurant", "SMIToSMI", "SMIToTaxGroup", "SMIToRestaurant_Deleted", "SMIToRestaurantGroup_Deleted", "SMIGrouptoRestaurant", "SMIGroupToRestaurantGroup", "SMIToSMIGroup", "BMIToNutritionGRID"];
        var AttrGrp = ["MDL_Event_Attribute_Group", "MDL_SMI_BMI_Relation_Attribute_Group", "MDL_Nutrition_Grid_Attribute_Group", "MDL_SMI_Alternate_Attribute_Group", "MDL_SMI_Attribute_Group", "MDL_SMI_RC_Attribute_Group", "MDL_SMI_Rest_Attribute_Group", "MDL_SMI_Tax_Attribute_Group", "MDL_SMI_SMIGroup_Attribute_Group", "MDL_SMIGroup_Attribute_Group", "MDL_SMIGrouptoRestaurant_Attribute_Group"];
        for (i = 0; i <= AttrGrp.length; i++) {
            if (AttrGrp[i]) {
                var attributeGrp = step.getAttributeGroupHome().getAttributeGroupByID(AttrGrp[i]).getAttributes();
                attributeGrpArray.add(attributeGrp)
            }
        }

    }
    var finalArray = attributeGrpArray.toArray();
    for (j = 0; j < finalArray.length; j++) {
        var iterator = finalArray[j].iterator();
        while (iterator.hasNext()) {
            var attribute = iterator.next();
            if (attribute) {
                var attributeID = attribute.getID();
                logger.info(attributeID)
                partialApproveAttribute(node, attributeID)
            }
        }
    }

    for (k = 0; k < RefArray.length; k++) {
        partialApproveReference(node, RefArray[k])
    }
}


function newWRINinactivationModel(node, step) {
    var market = ""
    var currentContext = step.getCurrentContext();
    var contextLOVHome = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context");
    var allContextLOVValues = contextLOVHome.queryValidValues().asList(100);
    if (allContextLOVValues.size() > 0) {
        for (var i = 0; i < allContextLOVValues.size(); i++) {
            if (allContextLOVValues.get(i).getValue() == currentContext.getID()) {
                market = allContextLOVValues.get(i).getID();
                break;
            }
        }
    }
    if (!market)
        market = node.getValue("a_mm_Market").getSimpleValue();
    market = market + "MarketEntity";
    var marketEntityObj = step.getEntityHome().getEntityByID(market);
    var newInactivationModel = marketEntityObj.getValue("a_mm_WRINInactivationNewModel").getID();
    if (newInactivationModel == "Y") {
        return true;
    } else {
        return false;
    }
}


/*
Name: 	addNonDuplicateRowsIntoDataContainerWRIN
Author: Neethu J
Date: 	11/07/2024
Purpose: To add values for a_mm_SUCostEffectiveFromDate,a_mm_BMIGridSU, a_mm_StoreDelivered, a_mm_PortionCost
        into dc_mm_FuturePricing only if it does not exists
Version History :-

*/
function addNonDuplicateRowsIntoDataContainerWRIN(node, subMarket, SUCostEffectiveFromDate, BMIGridSU, StoreDelivered, PortionCost) {
    log.info("Data: " + SUCostEffectiveFromDate + " : " + BMIGridSU + " : " + StoreDelivered + " : " + PortionCost);
    var market = node.getValue("a_mm_Market").getSimpleValue();

    if (PortionCost == "NaN")
        PortionCost = 0;
    var isDuplicate = false;
    var dataContainer = node.getDataContainerByTypeID("dc_mm_FuturePricing");
    var dataContainerObjs = dataContainer.getDataContainers().toArray();

    for (var k = 0; k < dataContainerObjs.length; k++) {
        var dataContainerObj = dataContainerObjs[k].getDataContainerObject();
        if (dataContainerObj.getValue("a_mm_SUCostEffectiveFromDate").getSimpleValue() == SUCostEffectiveFromDate &&
            dataContainerObj.getValue("a_mm_BMIGridSU").getSimpleValue() == BMIGridSU &&
            dataContainerObj.getValue("a_mm_StoreDelivered").getSimpleValue() == StoreDelivered &&
            dataContainerObj.getValue("a_mm_PortionCost").getSimpleValue() == PortionCost) {
            if (market == "ES") {
                if (dataContainerObj.getValue("a_mm_SubMarketPricingMarket").getSimpleValue() == subMarket)
                    isDuplicate = true;
            }
            else {
                isDuplicate = true;
            }
            break;
        }
        else if (market != 'ES' && (dataContainerObj.getValue("a_mm_SUCostEffectiveFromDate").getSimpleValue() == SUCostEffectiveFromDate &&
            dataContainerObj.getValue("a_mm_BMIGridSU").getSimpleValue() == BMIGridSU &&
            dataContainerObj.getValue("a_mm_StoreDelivered").getSimpleValue() != StoreDelivered)) {
            dataContainerObj.getValue("a_mm_StoreDelivered").setSimpleValue(StoreDelivered);
            dataContainerObj.getValue("a_mm_PortionCost").setSimpleValue(PortionCost);
            return dataContainerObj;
        }
        else if (market == "ES" && (dataContainerObj.getValue("a_mm_SUCostEffectiveFromDate").getSimpleValue() == SUCostEffectiveFromDate &&
            dataContainerObj.getValue("a_mm_BMIGridSU").getSimpleValue() == BMIGridSU &&
            dataContainerObj.getValue("a_mm_SubMarketPricingMarket").getSimpleValue() == subMarket &&
            dataContainerObj.getValue("a_mm_StoreDelivered").getSimpleValue() != StoreDelivered)) {
            dataContainerObj.getValue("a_mm_StoreDelivered").setSimpleValue(StoreDelivered);
            dataContainerObj.getValue("a_mm_PortionCost").setSimpleValue(PortionCost);
            dataContainerObj.getValue("a_mm_SubMarketPricingMarket").setSimpleValue(subMarket);
            return dataContainerObj;
        }

    }

    if (!isDuplicate) {
        var dataContainerObjNew = dataContainer.addDataContainer().createDataContainerObject("");
        dataContainerObjNew.getValue("a_mm_SUCostEffectiveFromDate").setSimpleValue(SUCostEffectiveFromDate);
        dataContainerObjNew.getValue("a_mm_BMIGridSU").setSimpleValue(BMIGridSU);
        dataContainerObjNew.getValue("a_mm_StoreDelivered").setSimpleValue(StoreDelivered);
        dataContainerObjNew.getValue("a_mm_PortionCost").setSimpleValue(PortionCost);
        if (market == "ES")
            dataContainerObjNew.getValue("a_mm_SubMarketPricingMarket").setSimpleValue(subMarket);
        return dataContainerObjNew;
    }
    return false;

}

/*
Name: 	addNonDuplicateRowsIntoDataContainerRC
Author: Neethu J
Date: 	11/07/2024
Purpose: To add values for a_mm_SUCostEffectiveFromDate, a_mm_RCCost 
        into dc_mm_FuturePricingRC only if it does not exists
Version History :-

*/
function addNonDuplicateRowsIntoDataContainerRC(node, subMarket, SUCostEffectiveFromDate, RCCost) {
    log.info("Data: " + SUCostEffectiveFromDate + " : " + RCCost);
    var isDuplicate = false;
    var market = node.getValue("a_mm_Market").getSimpleValue();
    var dataContainer = node.getDataContainerByTypeID("dc_mm_FuturePricingRC");
    var dataContainerObjs = dataContainer.getDataContainers().toArray();

    for (var k = 0; k < dataContainerObjs.length; k++) {
        var dataContainerObj = dataContainerObjs[k].getDataContainerObject();
        if (dataContainerObj.getValue("a_mm_SUCostEffectiveFromDate").getSimpleValue() == SUCostEffectiveFromDate &&
            dataContainerObj.getValue("a_mm_RCCost").getSimpleValue() == RCCost) {
            isDuplicate = true;
            break;
        }
        else if (dataContainerObj.getValue("a_mm_SUCostEffectiveFromDate").getSimpleValue() == SUCostEffectiveFromDate &&
            dataContainerObj.getValue("a_mm_RCCost").getSimpleValue() != RCCost) {
            dataContainerObj.getValue("a_mm_RCCost").setSimpleValue(RCCost);
            if (market == "ES")
                dataContainerObj.getValue("a_mm_SubMarketPricingMarket").setSimpleValue(subMarket);
            return dataContainerObj;
        }
    }

    if (!isDuplicate) {
        var dataContainerObjNew = dataContainer.addDataContainer().createDataContainerObject("");
        dataContainerObjNew.getValue("a_mm_SUCostEffectiveFromDate").setSimpleValue(SUCostEffectiveFromDate);
        dataContainerObjNew.getValue("a_mm_RCCost").setSimpleValue(RCCost);
        if (market == "ES")
            dataContainerObjNew.getValue("a_mm_SubMarketPricingMarket").setSimpleValue(subMarket);

    }

}

/*
Name: 	addNonDuplicateRowsIntoDataContainerBMI
Author: Neethu J
Date: 	11/07/2024
Purpose: To add values for a_mm_SUCostEffectiveFromDate,a_mm_FoodCost,a_mm_PaperCost 
        into dc_mm_FuturePricingBMI only if it does not exists
Version History :-

*/
function addNonDuplicateRowsIntoDataContainerBMI(node, SUCostEffectiveFromDate, FoodCost, PaperCost) {
    log.info("Data: " + SUCostEffectiveFromDate + " : " + FoodCost + " : " + PaperCost);
    var isDuplicate = false;
    var market = node.getValue("a_mm_Market").getSimpleValue();
    var dataContainer = node.getDataContainerByTypeID("dc_mm_FuturePricingBMI");
    var dataContainerObjs = dataContainer.getDataContainers().toArray();

    for (var k = 0; k < dataContainerObjs.length; k++) {
        var dataContainerObj = dataContainerObjs[k].getDataContainerObject();
        if (dataContainerObj.getValue("a_mm_SUCostEffectiveFromDate").getSimpleValue() == SUCostEffectiveFromDate &&
            dataContainerObj.getValue("a_mm_FoodCost").getSimpleValue() == FoodCost &&
            dataContainerObj.getValue("a_mm_PaperCost").getSimpleValue() == PaperCost) {
            isDuplicate = true;
            break;
        }
        else if (dataContainerObj.getValue("a_mm_SUCostEffectiveFromDate").getSimpleValue() == SUCostEffectiveFromDate &&
            (dataContainerObj.getValue("a_mm_FoodCost").getSimpleValue() != FoodCost ||
                dataContainerObj.getValue("a_mm_PaperCost").getSimpleValue() != PaperCost)) {
            dataContainerObj.getValue("a_mm_FoodCost").setSimpleValue(FoodCost);
            dataContainerObj.getValue("a_mm_PaperCost").setSimpleValue(PaperCost);
            return dataContainerObj;
        }
    }

    if (!isDuplicate) {
        var dataContainerObjNew = dataContainer.addDataContainer().createDataContainerObject("");
        dataContainerObjNew.getValue("a_mm_SUCostEffectiveFromDate").setSimpleValue(SUCostEffectiveFromDate);
        dataContainerObjNew.getValue("a_mm_FoodCost").setSimpleValue(FoodCost);
        dataContainerObjNew.getValue("a_mm_PaperCost").setSimpleValue(PaperCost);
        return dataContainerObjNew;
    }
    return false;
}

/*
Name: 	updateFuturePricingAtBMI
Author: Neethu J
Date: 	11/07/2024
Purpose: To update the future pricing Data container on BMI node
Version History :-

*/
function updateFuturePricingAtBMI(RCeachProduct, gridLevelSUCostDate, gridLevelPortionCost, step) {

    var refedByBMIs = RCeachProduct.queryReferencedBy(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));
    refedByBMIs.forEach(function (refedByBMI) {

        var bmiProd = refedByBMI.getSource();
        var BMImarket = bmiProd.getValue("a_mm_Market").getSimpleValue();
        var rcUOMID = RCeachProduct.getValue("a_mm_RecipeComponentUnitType").getID();
        var rcGroup = RCeachProduct.getValue("a_mm_RecipeComponentGroup").getID();
        var rcUOM = RCeachProduct.getValue("a_mm_RecipeComponentUnitType").getSimpleValue();
        var bmiToRCLink = bmiProd.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent"));

        var bmiFoodCost = null;
        var paperAndPackgCost = null;
        var reusepaperAndPackgCost = null;
        var sum = null;
        var spCount = 0;

        for (var i = 0; i < bmiToRCLink.size(); i++) {
            var bmiToRCIns = bmiToRCLink.get(i);
            setServingQtyUncooked(RCeachProduct, bmiToRCIns);
            var uncookedServingQty = bmiToRCIns.getValue("a_mm_ServingQuantity").getSimpleValue();
            var uncookedUOM = bmiToRCIns.getValue("a_mm_ServingQuantityUnitofMeasure").getSimpleValue();
            var uncookedUOMID = bmiToRCIns.getValue("a_mm_ServingQuantityUnitofMeasure").getID();
            var servingFactor = bmiToRCIns.getValue("a_mm_ServingFactor").getSimpleValue();

            if (BMImarket == "FR") {
                var reusable = RCeachProduct.getValue("a_mm_Reusable").getSimpleValue();
                if (reusable != null) {
                    var reuseCost = RCeachProduct.getValue("a_mm_ReuseCost").getSimpleValue();

                }
            }
            var spGridHome = step.getLinkTypeHome().getClassificationProductLinkTypeByID("NodeToFoodAndPaperGrid");
            var spGridLink = bmiProd.getClassificationProductLinks(spGridHome);
            for (var a = 0; a < spGridLink.size(); a++) {
                var spGridIns = spGridLink.get(a);
                var rcIDinGrid = spGridIns.getValue("a_mm_BMIGridRCID").getSimpleValue();
                var suIDinGrid = spGridIns.getValue("a_mm_BMIGridSUID").getSimpleValue();
                var spIDinGrid = spGridIns.getValue("a_mm_BMIGridSPID").getSimpleValue();
                if (rcIDinGrid != null && suIDinGrid != null && spIDinGrid != null && rcIDinGrid.trim() == RCeachProduct.getID() && Number(gridLevelPortionCost) != 0) {
                    var suObj = step.getProductHome().getProductByID(suIDinGrid.trim());
                    var spObj = step.getProductHome().getProductByID(spIDinGrid.trim());
                    if (suObj != null && spObj != null) {
                        var tradeItemCal = null;
                        if (BMImarket != "DE") {
                            if (suObj.getObjectType().getID() == "McDonaldItem") {
                                var tradeItemWeightB = suObj.getValue("TradeItemWeight").getSimpleValue();
                                var tradeItemVolumeB = suObj.getValue("TradeItemVolume").getSimpleValue();
                                if (tradeItemWeightB != null) {
                                    var tradeItemWeight = suObj.getValue("TradeItemWeight").getSimpleValue().split(" ");
                                    var tradeItemWeightUOM = suObj.getValue("TradeItemWeight").getUnit().getName();
                                }
                                if (tradeItemVolumeB != null) {
                                    var tradeItemVolume = suObj.getValue("TradeItemVolume").getSimpleValue().split(" ");
                                    var tradeItemVolumeUOM = suObj.getValue("TradeItemVolume").getUnit().getName();
                                }
                            } else {
                                var tradeItemWeightB = spObj.getValue("TradeItemWeight").getSimpleValue();
                                var tradeItemVolumeB = spObj.getValue("TradeItemVolume").getSimpleValue();
                                if (tradeItemWeightB != null) {
                                    var tradeItemWeight = spObj.getValue("TradeItemWeight").getSimpleValue().split(" ");
                                    var tradeItemWeightUOM = spObj.getValue("TradeItemWeight").getUnit().getName();
                                }
                                if (tradeItemVolumeB != null) {
                                    var tradeItemVolume = spObj.getValue("TradeItemVolume").getSimpleValue().split(" ");
                                    var tradeItemVolumeUOM = spObj.getValue("TradeItemVolume").getUnit().getName();
                                }
                            }

                            if (uncookedUOM == "grams") {
                                if ((rcUOM == "Litre" || rcUOMID == "IND") && tradeItemWeightB != null && tradeItemWeight != null && tradeItemWeight.length > 0 && tradeItemWeightUOM != null) {
                                    tradeItemCal = gramConversionUsingAttributeValueAndUOM(tradeItemWeight[0].trim(), tradeItemWeightUOM);
                                    if (rcUOM == "Litre" && tradeItemVolumeB != null && tradeItemVolume != null && tradeItemVolume.length > 0 && tradeItemVolumeUOM != null) {
                                        var tradeItemCalTemp = mlConversionUsingAttributeValueAndUOM(tradeItemVolume[0].trim(), tradeItemVolumeUOM);
                                        if (Number(tradeItemCalTemp) != 0)
                                            tradeItemCal = Number(tradeItemCal) / Number(tradeItemCalTemp);
                                    }
                                } else if (rcUOM == "Kilo") {
                                    tradeItemCal = "1";
                                }
                            } else if (uncookedUOM == "ml") {
                                if ((rcUOM == "Kilo" || rcUOMID == "IND") && tradeItemVolumeB != null && tradeItemVolume != null && tradeItemVolume.length > 0 && tradeItemVolumeUOM != null) {
                                    tradeItemCal = mlConversionUsingAttributeValueAndUOM(tradeItemVolume[0].trim(), tradeItemVolumeUOM);
                                    if (rcUOM == "Kilo" && tradeItemWeightB != null && tradeItemWeight != null && tradeItemWeight.length > 0 && tradeItemWeightUOM != null) {
                                        var tradeItemCalTemp = gramConversionUsingAttributeValueAndUOM(tradeItemWeight[0].trim(), tradeItemWeightUOM);
                                        if (Number(tradeItemCalTemp) != 0)
                                            tradeItemCal = Number(tradeItemCal) / Number(tradeItemCalTemp);
                                    }
                                } else if (rcUOM == "Litre") {
                                    tradeItemCal = "1";
                                }
                            } else if (uncookedUOMID == "2") {
                                tradeItemCal = "1";
                            }
                            log.info("Value of tradeItemCal : " + tradeItemCal);
                            if (Number(tradeItemCal) != 0) {
                                sum = Number(sum) + (Number(gridLevelPortionCost) * (Number(uncookedServingQty) / Number(tradeItemCal)));
                                spCount++;
                            }
                        } else if (BMImarket == "DE" && servingFactor != null) {
                            sum = Number(sum) + (Number(gridLevelPortionCost) * Number(servingFactor));
                            spCount++;
                        }
                    }
                }
            }

            log.info("SUM: " + sum + "  SPCOUNT :" + spCount);
            if (sum != null && Number(spCount) != 0) {
                var avgCost = Number(sum) / Number(spCount);
                log.info("Value of Average Cost: " + avgCost);
                bmiToRCIns.getValue("a_mm_RCCost").setSimpleValue(Number(avgCost).toFixed(6)); // need to check rounding values
                if (reuseCost != null) {
                    bmiToRCIns.getValue("a_mm_ReuseCost").setSimpleValue(Number(reuseCost).toFixed(6));
                }
                log.info("Value of RC Group : " + rcGroup);
                if (rcGroup == "F") {
                    bmiFoodCost = Number(bmiFoodCost) + Number(avgCost);
                } else if (rcGroup == "P") {
                    paperAndPackgCost = Number(paperAndPackgCost) + Number(avgCost);
                    if (BMImarket == "FR" && reuseCost != null) {
                        reusepaperAndPackgCost = Number(reusepaperAndPackgCost) + Number(reuseCost);
                    }
                }
            }

        }

        //////////////////////////////// BMI level Data Container /////////////////////////////
        //a_mm_PaperReuseCost, a_mm_TotalFandPReuseCost, a_mm_TotalF&PCost
        log.info(" LOGGER : " + RCeachProduct.getID() + " :   " + bmiProd.getID() + "   bmiFoodCost: " + bmiFoodCost + " :    " + paperAndPackgCost);
        /*  var dataContainerBMI = bmiProd.getDataContainerByTypeID("dc_mm_FuturePricingBMI");
    var dataContainerObjBMI = dataContainerBMI.addDataContainer().createDataContainerObject("");
    dataContainerObjBMI.getValue("a_mm_FoodCost").setSimpleValue(Number(bmiFoodCost).toFixed(6));
    dataContainerObjBMI.getValue("a_mm_PaperCost").setSimpleValue(Number(paperAndPackgCost).toFixed(6));
    dataContainerObjBMI.getValue("a_mm_SUCostEffectiveFromDate").setSimpleValue(gridLevelSUCostDate);
    */
        var dataContainerObjBMI = addNonDuplicateRowsIntoDataContainerBMI(bmiProd, gridLevelSUCostDate, Number(bmiFoodCost).toFixed(6), Number(paperAndPackgCost).toFixed(6));

        if (dataContainerObjBMI) {
            if (BMImarket == "FR") {
                if (reusepaperAndPackgCost != null) {
                    dataContainerObjBMI.getValue("a_mm_PaperReuseCost").setSimpleValue(Number(reusepaperAndPackgCost).toFixed(6));
                    var totalCost = Number(bmiFoodCost) + Number(reusepaperAndPackgCost);
                    bmiProd.getValue("a_mm_TotalFandPReuseCost").setSimpleValue(Number(totalCost).toFixed(6));
                    dataContainerObjBMI.getValue("a_mm_TotalFandPReuseCost").setSimpleValue(Number(totalCost).toFixed(6));
                }
            }
            if (bmiFoodCost != null || paperAndPackgCost != null) {
                var totalCost = Number(bmiFoodCost) + Number(paperAndPackgCost);
                dataContainerObjBMI.getValue("a_mm_TotalF&PCost").setSimpleValue(Number(totalCost).toFixed(6));

            }
        }

        return true;
    });

}


/*Title:	populateRCToSUHistory
Author:	Neethu J
Company: 	Cognizant
Date:  		15/08/2024
Usage: 		Function to populate Rc to WRIN history 
//updated as part of INC16281978
*/
function populateRCToSUHistory(node, step, actualRef, deletedRef, action) {
    var currDate = new java.text.SimpleDateFormat("MM/dd/yyyy").format(new Date());
    var mainSUHashset = new java.util.HashSet();
    var mainRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(actualRef));
    for (var i = 0; i < mainRef.size(); i++) {
        mainSUHashset.add(mainRef.get(i).getTarget());
    }
    log.info("mainSUHashset: " + mainSUHashset);
    var deletedSUHashset = new java.util.HashSet();
    step.executeInWorkspace("Approved", function execute(approvedNode) {
        var approveNode = approvedNode.getProductHome().getProductByID(node.getID());
        if (approveNode) {
            var ref = approveNode.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(actualRef));

            for (var j = 0; j < ref.size(); j++) {
                if (mainSUHashset.contains(ref.get(j).getTarget())) { } else {
                    deletedSUHashset.add(ref.get(j).getTarget());
                }
            }
        }
    });
    log.info("deletedSUHashset: " + deletedSUHashset);
    rcToPPODeleteRef(node, step, deletedRef, mainSUHashset); //changes as part of INC16971265
    var deletedSUHashsetItr = deletedSUHashset.iterator();
    while (deletedSUHashsetItr.hasNext()) {
        var addDate = null;
        var suNext = deletedSUHashsetItr.next();
        addDate = step.executeInWorkspace("Approved", function execute(approvedNode) {
            var approveNode = approvedNode.getProductHome().getProductByID(node.getID());
            var ref = approveNode.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(actualRef));
            log.info(actualRef + ":actualRef");
            var flag = false;
            if (actualRef == "RecipeComponentToSupplierItem") {
                addDate = null;
                var refInactive = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem_Inactive"));
                if (refInactive.size() > 0) {
                    for (var m = 0; m < refInactive.size(); m++) {
                        log.info("MANU" + suNext.getID() + " : " + refInactive.get(m).getTarget().getID());
                        if (suNext.getID() == refInactive.get(m).getTarget().getID()) {
                            addDate = null;
                            return addDate;
                        } else {
                            flag = true;
                        }
                    }
                } else {
                    flag = true;
                }

            } else {
                flag = true;
            }
            if (flag = true) {
                if (ref) {
                    for (var k = 0; k < ref.size(); k++) {
                        if (suNext.getID() == ref.get(k).getTarget().getID()) {
                            var fromDate = ref.get(k).getValue("a_mm_EffectiveFromDate").getSimpleValue();
                            var dateArr = fromDate.split("-");
                            var dFromtDate = dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
                            if (action == null || action == "" || action == "null") {
                                addDate = dFromtDate + " | " + currDate + " | " + "Manual Removal";
                            }
                            else {
                                addDate = dFromtDate + " | " + currDate + " | " + action;
                            }
                        }
                    }
                    return addDate;
                }
            }
        });
        //log.info("addDate:" + addDate);
        if (addDate != null) {
            var refSet = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(deletedRef));
            for (var j = 0; j < refSet.size(); j++) {
                if (suNext.getID() == refSet.get(j).getTarget().getID()) {
                    refSet.get(j).getValue("a_mm_DeletedUser").setSimpleValue(step.getCurrentUser().getName());
                    var ExiHist = refSet.get(j).getValue("a_mm_RCWRINHistory").getSimpleValue();
                    refSet.get(j).getValue("a_mm_RCWRINHistory").setSimpleValue(addDate);
                    if (ExiHist)
                        refSet.get(j).getValue("a_mm_RCWRINHistory").addValue(ExiHist);
                    refSet.get(j).getValue("a_mm_DeletionDate").setSimpleValue(new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date()));
                }
            }
            try {
                var newRef = node.createReference(suNext, step.getReferenceTypeHome().getReferenceTypeByID(deletedRef));
                newRef.getValue("a_mm_DeletedUser").setSimpleValue(step.getCurrentUser().getName());
                newRef.getValue("a_mm_RCWRINHistory").addValue(addDate);
                newRef.getValue("a_mm_DeletionDate").setSimpleValue(new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date()));
                var histEffDate = newRef.getValue("a_mm_DeletionDate").getSimpleValue();
                var inactiveRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem_Inactive"));
                if (inactiveRef.size() > 0) {
                    for (var p = 0; p < inactiveRef.size(); p++) {
                        var inactiveRefIns = inactiveRef.get(p);
                        log.info("MANU" + suNext.getID() + " : " + inactiveRef.get(p).getTarget().getID());
                        if (suNext.getID() == inactiveRef.get(p).getTarget().getID()) {
                            inactiveRefIns.getValue("a_mm_EffectiveToDate").setSimpleValue(histEffDate);
                        }
                    }
                }
                log.info("YES" + newRef + newRef.getValue("a_mm_RCWRINHistory").getSimpleValue());
            } catch (e) { //throw e;
                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                    //Target Already Referenced Exception
                    log.info("Reference Already Linked.. ");
                }
                else {
                    throw "Exception : " + e;
                }
            }
        }
    }
}

/*Title:	populateNodeReferenceHistory
Author:	Neethu J
Company: 	Cognizant
Date:  		15/08/2024
Usage: 		Function to populate deletion history  
//updated as part of INC16281978
*/
function populateNodeReferenceHistory(node, step, actualRef, deletedRef, action) {
    var currDate = new java.text.SimpleDateFormat("MM/dd/yyyy").format(new Date());
    var mainTargetHashset = new java.util.HashSet();
    var mainRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(actualRef));
    for (var i = 0; i < mainRef.size(); i++) {
        mainTargetHashset.add(mainRef.get(i).getTarget());
    }
    log.info("mainTargetHashset: " + mainTargetHashset);
    var deletedTargetHashset = new java.util.HashSet();
    step.executeInWorkspace("Approved", function execute(approvedNode) {
        var approveNode = approvedNode.getProductHome().getProductByID(node.getID());
        if (approveNode) {
            var ref = approveNode.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(actualRef));
            for (var j = 0; j < ref.size(); j++) {
                log.info("NJ: " + ref.get(j).getTarget() + ":" + mainTargetHashset.contains(ref.get(j).getTarget()));

                if (mainTargetHashset.contains(ref.get(j).getTarget())) { } else {
                    deletedTargetHashset.add(ref.get(j).getTarget());
                }
            }
        }
    });
    log.info("deletedTargetHashset: " + deletedTargetHashset);
    rcToPPODeleteRef(node, step, deletedRef, mainTargetHashset); //changes as part of INC16971265
    var deletedTargetHashsetItr = deletedTargetHashset.iterator();
    while (deletedTargetHashsetItr.hasNext()) {
        var addDate = null;
        var targetNext = deletedTargetHashsetItr.next();
        addDate = step.executeInWorkspace("Approved", function execute(approvedNode) {
            var approveNode = approvedNode.getProductHome().getProductByID(node.getID());
            var ref = approveNode.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(actualRef));

            if (ref) {
                for (var k = 0; k < ref.size(); k++) {
                    if (targetNext.getID() == ref.get(k).getTarget().getID()) {
                        var fromDate = ref.get(k).getValue("a_mm_EffectiveFromDate").getSimpleValue();
                        var dFromtDate = "";
                        if (fromDate) {
                            var dateArr = fromDate.split("-");
                            dFromtDate = dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
                        }
                        addDate = dFromtDate + " | " + currDate + " | " + action;
                    }
                }
                return addDate;
            }
        });
        log.info("addDate:" + addDate);
        if (addDate) {
            var refSet = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID(deletedRef));
            for (var j = 0; j < refSet.size(); j++) {
                if (targetNext.getID() == refSet.get(j).getTarget().getID()) {
                    var ExiHist = refSet.get(j).getValue("a_mm_RCWRINHistory").getSimpleValue();
                    refSet.get(j).getValue("a_mm_RCWRINHistory").setSimpleValue(addDate);
                    if (ExiHist)
                        refSet.get(j).getValue("a_mm_RCWRINHistory").addValue(ExiHist);
                }
            }
            try {
                var newRef = node.createReference(targetNext, step.getReferenceTypeHome().getReferenceTypeByID(deletedRef));
                newRef.getValue("a_mm_RCWRINHistory").addValue(addDate);
                newRef.getValue("a_mm_DeletionDate").setSimpleValue(new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date()));
                newRef.getValue("a_mm_DeletedUser").setSimpleValue(step.getCurrentUser().getName());
                log.info(newRef.getValue("a_mm_RCWRINHistory").getSimpleValue());
            } catch (e) {
                if (e.javaException instanceof com.stibo.core.domain.reference.TargetAlreadyReferencedException) {
                    //Target Already Referenced Exception
                    log.info("Reference Already Linked.. ");
                }
                else {
                    throw "Exception : " + e;
                }
            }
        }
    }
}

//Added as part of INC16971265
function rcToPPODeleteRef(node, step, ref, mainTargetHashset) {
    var RCToPPODeleteRefID = step.getReferenceTypeHome().getReferenceTypeByID(ref);
    var RCToPPODeleteReferences = node.getReferences(RCToPPODeleteRefID);
    if (RCToPPODeleteReferences) {
        for (var a = 0; a < RCToPPODeleteReferences.size(); a++) {
            if (mainTargetHashset.contains(RCToPPODeleteReferences.get(a).getTarget())) {

                try {
                    RCToPPODeleteReferences.get(a).delete();
                } catch (e) {
                    log.info("Error on deleting reference...");
                    throw (e);
                }
            }
        }
    }
}
/*Title:	setDefaultValueIfNull
Author:	Neethu J
Company: 	Cognizant
Date: 18/11/2024
Usage: Function to set default value if empty 
updated as part of MDMI-19981
*/
function setDefaultValueIfNull(node, attributeID, value) {
    var attrValue = node.getValue(attributeID).getSimpleValue();
    if (attrValue == "" || attrValue == null) {
        //log.info("Set Value : "+ node.getID() + ": " + value)
        node.getValue(attributeID).setSimpleValue(value);
    }
}


/*Title	:	recipeComponentDefaultingLogic
Author	:	Neethu J
Company	: 	Cognizant
Date		:    18/11/2024
Usage	:    Function to set default value if empty- updated as part of MDMI-19981
*/
function recipeComponentDefaultingLogic(node, step) {

    var market = node.getValue("a_mm_Market").getSimpleValue();
    var marketContext = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID(market).getValue();

    //Waste Inclusion - for AU market set to Not Defined if null
    //As part of defect fix MDMI-20415 below if condition has been commented
    //if( market == "AU")
    //As part of defect fix MDMI-20415 below WasteInclusion code has been commented
    //setDefaultValueIfNull (node, "a_mm_WasteInclusion", "NOT DEFINED");

    var usContext = step.getListOfValuesHome().getListOfValuesByID("Lov_mm_Context").getListOfValuesValueByID("US").getValue();
    var tRCToSupplierRef = step.getReferenceTypeHome().getReferenceTypeByID("RecipeComponentToSupplierItem");
    var supplierItemReferences = node.getReferences(tRCToSupplierRef);

    for (var j = 0; j < supplierItemReferences.size(); j++) {
        var suNode = supplierItemReferences.get(j).getTarget();

        var valueInUS = "";
        step.executeInContext(usContext, function (step) {
            var contextSpecSetObj = step.getObjectFromOtherManager(suNode);
            valueInUS = contextSpecSetObj.getValue("TradeItemLongDescription").getSimpleValue();
        });

        step.executeInContext(marketContext, function (step) {
            var suNodeMarketContext = step.getObjectFromOtherManager(suNode);

            //TradeItemLongDescription- On submit of back office data, copy value from US market node level to all markets respective Item to market category. 
            setDefaultValueIfNull(suNodeMarketContext, "TradeItemLongDescription", valueInUS);
            copyValuesToItemToMarketCategoryReference(step, suNodeMarketContext, market, "TradeItemLongDescription");

            //Trade Item Vendor1, Trade Item Vendor 2 - default to Not defined if null for all markets, roll up to item to market category for respective context.
            setDefaultValueIfNull(suNodeMarketContext, "TradeItemVendor1", "Not Defined");
            setDefaultValueIfNull(suNodeMarketContext, "a_mm_TradeItemVendor1(MDL)", "Not Defined");
            copyValuesToItemToMarketCategoryReference(step, suNodeMarketContext, market, "a_mm_TradeItemVendor1(MDL)");
            setDefaultValueIfNull(suNodeMarketContext, "TradeItemVendor2", "Not Defined");
            setDefaultValueIfNull(suNodeMarketContext, "a_mm_TradeItemVendor2(MDL)", "Not Defined");
            copyValuesToItemToMarketCategoryReference(step, suNodeMarketContext, market, "a_mm_TradeItemVendor2(MDL)");

            //IsGSTApplicable - Set to NO for all markets
            if (suNodeMarketContext.getObjectType().getID() == "McDonaldItem")
                setDefaultValueIfNull(suNodeMarketContext, "IsGSTApplicable", "No");

        });
    }
}
/*Title	:	getHighestDateForBMIs
Author	:	Sivasankar P
Company	: 	Cognizant
Date		:    28/01/2025
Usage	:    Function to get the highest effective date for BMIs as part of INC16847419
*/
function getHighestDateForBMIs(node, step) {
    var restGrpRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRestaurantGroups"));
    var highestDate = null;
    for (var m = 0; m < restGrpRef.size(); m++) {
        var restGrpEffecToDt = restGrpRef.get(m).getValue("a_mm_EffectiveToDate").getSimpleValue();
        if (restGrpEffecToDt != null) {
            if (restGrpEffecToDt != "2099-12-31") {
                if (highestDate == null || restGrpEffecToDt > highestDate)
                    highestDate = restGrpEffecToDt;
            }
            else {
                highestDate = restGrpEffecToDt;
                break;
            }
        }
    }

    if (highestDate !== "2099-12-31") {
        var eachBMIToRestRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRestaurant"));
        for (var n = 0; n < eachBMIToRestRef.size(); n++) {
            var restEffecToDt = eachBMIToRestRef.get(n).getValue("a_mm_EffectiveToDate").getSimpleValue();
            if (restEffecToDt != null) {
                if (restEffecToDt != "2099-12-31") {
                    if (highestDate == null || restEffecToDt > highestDate)
                        highestDate = restEffecToDt;
                }
                else {
                    highestDate = restEffecToDt;
                    break;
                }
            }
        }
    }
    return highestDate;
}

/*Title	:	getLowestDateForBMIs
Author	:	Sivasankar P
Company	: 	Cognizant
Date		:    23/02/2025
Usage	:    Function to get the least effective from date for BMIs as part of INC16978650
*/
function getEarliestFromDateForBMIs(node, step) {
    var restGrpRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRestaurantGroups"));
    var lowestDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
    for (var m = 0; m < restGrpRef.size(); m++) {
        var restGrpEffecFromDt = restGrpRef.get(m).getValue("a_mm_EffectiveFromDate").getSimpleValue();
        if (restGrpEffecFromDt) {
            if (lowestDate == null || restGrpEffecFromDt < lowestDate) {
                lowestDate = restGrpEffecFromDt;
            }
        }
    }

    var eachBMIToRestRef = node.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("BMIToRestaurant"));
    for (var n = 0; n < eachBMIToRestRef.size(); n++) {
        var restEffecFromDt = eachBMIToRestRef.get(n).getValue("a_mm_EffectiveFromDate").getSimpleValue();
        if (restEffecFromDt) {
            if (lowestDate == null || restEffecFromDt < lowestDate) {
                lowestDate = restEffecFromDt;
            }
        }
    }
    return lowestDate;
}
/*
Added as part of INC17119713 -- start
Name: CopySMIName, getSMILongName, copySMINameToBMIRecipe  
Author: 	Aahana
Date: 	19April2025
Purpose: 	To copy SMIName, SMI LongName to BMI Name and BMI External Name 
Applicability:  Enrich - SMI submit on transition, Maintain - SMI: On Exit, Save SMI
*/
function copySMIName(SMI, step){
    var tSMIToBMIRef = SMI.getReferences(step.getReferenceTypeHome().getReferenceTypeByID("SMIToBMI"));
    var longName = getSMILongName(SMI, step);
    var SMIName = SMI.getValue("a_mm_SMIName").getSimpleValue();
    if (tSMIToBMIRef.size() > 0) {
        for (var i = 0; i < tSMIToBMIRef.size(); i++) {
        var BMI = tSMIToBMIRef.get(i).getTarget();
        if(longName)
        BMI.getValue("a_mm_BMIName").setSimpleValue(longName);
        if(SMIName){
        BMI.getValue("a_mm_BMIInternalName").setSimpleValue(SMIName);
        setName(BMI, step, "a_mm_BMIInternalName");
        } 
        copySMINameToBMIRecipe(BMI, SMIName, longName);
        }
    }
}
function getSMILongName(SMI, step){
    var currentContext = step.getCurrentContext().getID();
    var dataContainer = SMI.getDataContainerByTypeID("dc_mm_RFMMultiLanguageTable");
	        var dataContainerObjs = dataContainer.getDataContainers().toArray();
	        var longName = null;
			for (var k = 0; k < dataContainerObjs.length; k++) {
				var dataContainerObj = dataContainerObjs[k].getDataContainerObject();
				var context = dataContainerObj.getValue("a_mm_ContextID").getSimpleValue();
                if(context == currentContext){
				return dataContainerObj.getValue("a_mm_LongName").getSimpleValue();
                 
                }
			 }
}
function copySMINameToBMIRecipe(BMI, SMIName, SMILongName){
    var BMIR = BMI.queryChildren().asList(100).toArray();
    for(var i =0;i<BMIR.length;i++){
        if(SMILongName)
            BMIR[i].getValue("a_mm_BMIName").setSimpleValue(SMILongName);
            if(SMIName)
            BMIR[i].getValue("a_mm_BMIInternalName").setSimpleValue(SMIName);
    }
}
//Added as part of INC17119713 -- end

/*Title	:	setDatesAtBMIRToRcLevel
Author	:	Sivasankar P
Company	: 	Cognizant
Date		:    12/05/2025
Usage	:    Setting the linked RC's From and To dates from the BMIR
*/
  function setDatesAtBMIRToRcLevel(node){
  	 var step = node.getManager();
      var bmiToRC = step.getReferenceTypeHome().getReferenceTypeByID("BMIToRecipeComponent");
      var bmirEffFromDate = node.getValue("a_mm_EffectiveFromDate").getSimpleValue();
	 var bmirEffToDate = node.getValue("a_mm_EffectiveToDate").getSimpleValue();
      var bmirToRC = node.queryReferences(bmiToRC);
        bmirToRC.forEach(function (ref) {
            ref.getValue("a_mm_EffectiveFromDate").setSimpleValue(bmirEffFromDate);
	       ref.getValue("a_mm_EffectiveToDate").setSimpleValue(bmirEffToDate);
            return true;
        });
  }
/*===== business library exports - this part will not be imported to STEP =====*/
exports.isAttributeValid = isAttributeValid
exports.checkMandatoryAttribute = checkMandatoryAttribute
exports.setName = setName
exports.fdateComparison = fdateComparison
exports.mandatoryAttributesOnLink = mandatoryAttributesOnLink
exports.archiveComments = archiveComments
exports.rejectComments = rejectComments
exports.getCurrentDate = getCurrentDate
exports.fBMIdateComparison1 = fBMIdateComparison1
exports.fBMIdateComparison2 = fBMIdateComparison2
exports.conditionallyMandatoryAttribute = conditionallyMandatoryAttribute
exports.conditionallyMandatoryAttributeonLink = conditionallyMandatoryAttributeonLink
exports.isInApprovedWorkspace = isInApprovedWorkspace
exports.populate_Comments_onLink = populate_Comments_onLink
exports.populateCommentForProductRefs = populateCommentForProductRefs
exports.ConceptTestResultValidation = ConceptTestResultValidation
exports.mandatoryAttributesOnEntity = mandatoryAttributesOnEntity
exports.createBMIFacilityGrid = createBMIFacilityGrid
exports.facilityVisitRequired = facilityVisitRequired
exports.conceptDateComparison = conceptDateComparison
exports.createSMI = createSMI
exports.UpdateSUStatus = UpdateSUStatus
exports.calculateNutritionScoreRC = calculateNutritionScoreRC
exports.deleteBMIMultiReferenceSupplierGrid = deleteBMIMultiReferenceSupplierGrid
exports.getEmailIdsFromTheGroup = getEmailIdsFromTheGroup
exports.populateAllergensSensitivities = populateAllergensSensitivities
exports.populateBMIAllergens = populateBMIAllergens
exports.populateBMISensitivity = populateBMISensitivity
exports.addNutritionValue = addNutritionValue
exports.setHelp = setHelp
exports.populateInGlobalContext = populateInGlobalContext
exports.sendThisEmail = sendThisEmail
exports.populateShippingPackageKey = populateShippingPackageKey
exports.getDate = getDate
exports.setEffectiveDateForProductLink = setEffectiveDateForProductLink
exports.setEffectiveDateForClassificationLink = setEffectiveDateForClassificationLink
exports.checkSMIEffectiveDate = checkSMIEffectiveDate
exports.SMIGrpToSMIEffDateValidation = SMIGrpToSMIEffDateValidation
exports.SMIGrpToResGrpEffDateValidation = SMIGrpToResGrpEffDateValidation
exports.SMIGrpEffDateValidation = SMIGrpEffDateValidation
exports.setAssignee = setAssignee
exports.setAllergenStatements = setAllergenStatements
exports.NRCGrpToNRCEffDateValidation = NRCGrpToNRCEffDateValidation
exports.NRCGrpToResGrpEffDateValidation = NRCGrpToResGrpEffDateValidation
exports.NRCGrpEffDateValidation = NRCGrpEffDateValidation
exports.Array = Array
exports.prototype = prototype
exports.contains = contains
exports.Array = Array
exports.prototype = prototype
exports.position = position
exports.updateRestToRestGrp = updateRestToRestGrp
exports.ValidateNRCGroupNumbers = ValidateNRCGroupNumbers
exports.calculateNutScoreRCGridFromTargetRC = calculateNutScoreRCGridFromTargetRC
exports.EmailValidation = EmailValidation
exports.attrDuplicateCheck = attrDuplicateCheck
exports.Duplicate_RC_SU_Relation = Duplicate_RC_SU_Relation
exports.gramConversion = gramConversion
exports.mlConversion = mlConversion
exports.updateMerlinNutritionInfo = updateMerlinNutritionInfo
exports.populateCFMGLAccountcode = populateCFMGLAccountcode
exports.setWorkflowAssignee = setWorkflowAssignee
exports.conditional_mandatory_check = conditional_mandatory_check
exports.deletedRejectedArchivedObj = deletedRejectedArchivedObj
exports.populateSMIGrouptoRestaurant_RecipeGroupMaintenance = populateSMIGrouptoRestaurant_RecipeGroupMaintenance
exports.populateSMIGrouptoRestaurant_SMIGroupMaintenance = populateSMIGrouptoRestaurant_SMIGroupMaintenance
exports.blanckcheckrejectionreason = blanckcheckrejectionreason
exports.pimGramConversion = pimGramConversion
exports.pimOzConversion = pimOzConversion
exports.pimMlConversion = pimMlConversion
exports.pimFlOzConversion = pimFlOzConversion
exports.populatecommentatsource = populatecommentatsource
exports.mlConversionUsingAttributeValueAndUOM = mlConversionUsingAttributeValueAndUOM
exports.gramConversionUsingAttributeValueAndUOM = gramConversionUsingAttributeValueAndUOM
exports.allFnPAttributesPopulationFromSPObj = allFnPAttributesPopulationFromSPObj
exports.checkValidMarket = checkValidMarket
exports.checkStatus = checkStatus
exports.updatePIMReferences = updatePIMReferences
exports.addAssetsInDifferentClassification = addAssetsInDifferentClassification
exports.checkValidMarketForPIMObjects = checkValidMarketForPIMObjects
exports.approveClassification = approveClassification
exports.changeBGColour = changeBGColour
exports.getDetails = getDetails
exports.getBMIMaintenanceUser = getBMIMaintenanceUser
exports.productIngredientStatementRollUp_RC = productIngredientStatementRollUp_RC
exports.deleteProductToClassification_If_ProductToProductReferenceIsBroken = deleteProductToClassification_If_ProductToProductReferenceIsBroken
exports.createSP_From_RCtoFacilityGrid = createSP_From_RCtoFacilityGrid
exports.check_If_YesNoSelectionIsNotYes_In_ProdToClassRef_For_AtleastOneTargetObj_In_ProdToProdRef = check_If_YesNoSelectionIsNotYes_In_ProdToClassRef_For_AtleastOneTargetObj_In_ProdToProdRef
exports.checkFacMarket = checkFacMarket
exports.populateAllContext = populateAllContext
exports.deleteAllProductToProductRefs = deleteAllProductToProductRefs
exports.createSMItoRCReferences = createSMItoRCReferences
exports.deleteCrossReference_From_WebUI = deleteCrossReference_From_WebUI
exports.createXGroupToRestaurantLink = createXGroupToRestaurantLink
exports.setValueInSpecificContext = setValueInSpecificContext
exports.fetchValueFromSpecificContext = fetchValueFromSpecificContext
exports.EventDatePopulate = EventDatePopulate
exports.calculateBackWordDate = calculateBackWordDate
exports.addWorkDays = addWorkDays
exports.workingDaysBetweenDates = workingDaysBetweenDates
exports.parseTLDate = parseTLDate
exports.performTaskUpdate = performTaskUpdate
exports.taskPriority = taskPriority
exports.setTaskPriority = setTaskPriority
exports.taskUpdateForAwaitingStates = taskUpdateForAwaitingStates
exports.calculateBMITaskDueDate = calculateBMITaskDueDate
exports.calculateTaskDueDate = calculateTaskDueDate
exports.getLowestBMIdate = getLowestBMIdate
exports.MaintainEventDatePopulate = MaintainEventDatePopulate
exports.isWRINActive = isWRINActive
exports.createRCToFacilityGrid = createRCToFacilityGrid
exports.facilityContingencyCheck = facilityContingencyCheck
exports.createRCtoFacilityGridMainFunction_New = createRCtoFacilityGridMainFunction_New
exports.isWRINValid = isWRINValid
exports.isThisFacilityDeactivated = isThisFacilityDeactivated
exports.getFacTypeFromSI = getFacTypeFromSI
exports.toChecktConceptTestDoc = toChecktConceptTestDoc
exports.populateStatus = populateStatus
exports.sendMailSpecInactivation = sendMailSpecInactivation
exports.setCustomisationAttributeValues = setCustomisationAttributeValues
exports.updateSuppFeasibility = updateSuppFeasibility
exports.setCostInclusion = setCostInclusion
exports.calculateBMIToRC_CookedServQty_ServFact = calculateBMIToRC_CookedServQty_ServFact
exports.calculateRCBuild_CookedServQty_ServFact = calculateRCBuild_CookedServQty_ServFact
exports.createBuildOrderReferences = createBuildOrderReferences
exports.newBMICreation_RFMIdentifier = newBMICreation_RFMIdentifier
exports.checkEligibleRCs_RFMIdentifier = checkEligibleRCs_RFMIdentifier
exports.fetchEligibleRCs_RFMIdentifier = fetchEligibleRCs_RFMIdentifier
exports.newSMICreation_RFMIdentifier = newSMICreation_RFMIdentifier
exports.createEntityRefsFromEntityChildren = createEntityRefsFromEntityChildren
exports.setLovValueBySpecificContext = setLovValueBySpecificContext
exports.UpdateSMIToRestaurantLinkOld = UpdateSMIToRestaurantLinkOld
exports.cloneRC = cloneRC
exports.createRCbuildClone = createRCbuildClone
exports.createRCrefsClone = createRCrefsClone
exports.copyDeclaredRc = copyDeclaredRc
exports.setBMIVersion = setBMIVersion
exports.createBiDirectionalBMIVersionLink = createBiDirectionalBMIVersionLink
exports.createBMIVersion = createBMIVersion
exports.changeFutureVersion = changeFutureVersion
exports.CopyToVersion = CopyToVersion
exports.copyDeclaredRc = copyDeclaredRc
exports.AttributesCheckOnEntity = AttributesCheckOnEntity
exports.mandatoryAttributesOnEntity_otherValidations = mandatoryAttributesOnEntity_otherValidations
exports.setRCParentHierarchy = setRCParentHierarchy
exports.approveObjectInAllContexts = approveObjectInAllContexts
exports.linkedAsset = linkedAsset
exports.sendTaskEmail = sendTaskEmail
exports.getObjectName = getObjectName
exports.nutritionEntity_nonAvailabilityValidations = nutritionEntity_nonAvailabilityValidations
exports.getBMIStatus = getBMIStatus
exports.approvedDeclarationRollUp_BMI = approvedDeclarationRollUp_BMI
exports.validateMenuCode = validateMenuCode
exports.updateMenuCodeAttribute = updateMenuCodeAttribute
exports.updateMenuCodeLOV = updateMenuCodeLOV
exports.menuCodeDuplicateCheck = menuCodeDuplicateCheck
exports.menuCodeRangeValidation = menuCodeRangeValidation
exports.UpdateSMIToRestaurantLink = UpdateSMIToRestaurantLink
exports.setMarketAttributeWRTContext = setMarketAttributeWRTContext
exports.linkMarketClassificationWRTMarket = linkMarketClassificationWRTMarket
exports.autoSubmitIfStateNotPIMBasic = autoSubmitIfStateNotPIMBasic
exports.autoSubmitIfStateNotPIMBasic_SuperUser = autoSubmitIfStateNotPIMBasic_SuperUser
exports.calculateSMITaskDueDate = calculateSMITaskDueDate
exports.SMIEventDatePopulate = SMIEventDatePopulate
exports.marketingNameMandatoryCheckInContextLanguages = marketingNameMandatoryCheckInContextLanguages
exports.eventDatesValidation = eventDatesValidation
exports.fetchContextLanguage = fetchContextLanguage
exports.validateInternalAttributeLength = validateInternalAttributeLength
exports.copyAttributeValueInAllSubContexts = copyAttributeValueInAllSubContexts
exports.SupplierAssign = SupplierAssign
exports.CommentToSupplier = CommentToSupplier
exports.validateMenuCodeChoice = validateMenuCodeChoice
exports.validateBmiSmiMenuCodeChoice = validateBmiSmiMenuCodeChoice
exports.AddBMIEventsToRC = AddBMIEventsToRC
exports.validateMenuCodeRange = validateMenuCodeRange
exports.AutoSetMenuCode = AutoSetMenuCode
exports.ANZToEmailsForQAandPurchasing = ANZToEmailsForQAandPurchasing
exports.isQAorPurchasingUser = isQAorPurchasingUser
exports.TaxPattern = TaxPattern
exports.setRCMRINumberInReference = setRCMRINumberInReference
exports.calculateSIMarketPrice = calculateSIMarketPrice
exports.setBMIPriceGroupValues = setBMIPriceGroupValues
exports.setServingQtyUncooked = setServingQtyUncooked
exports.validateMenuCodeRangeFR = validateMenuCodeRangeFR
exports.AutoSetRCNumber = AutoSetRCNumber
exports.ConstraintOnRFMNames = ConstraintOnRFMNames
exports.setSMIMenuCodeUSAlacart = setSMIMenuCodeUSAlacart
exports.setClonesSMIAttributeValues = setClonesSMIAttributeValues
exports.setClonesSMITaxGroupValues = setClonesSMITaxGroupValues
exports.copyLinkedBMI = copyLinkedBMI
exports.validateAttrValueInApprovedContext = validateAttrValueInApprovedContext
exports.cloneSMIButtonCode = cloneSMIButtonCode
exports.createAlternateSMIButtonCode = createAlternateSMIButtonCode
exports.copySMIGroup = copySMIGroup
exports.autoSubmitIfStateNotPIMBasicSUworkflow = autoSubmitIfStateNotPIMBasicSUworkflow
exports.getWRINActiveForMarket = getWRINActiveForMarket
exports.ValidateRCToSU = ValidateRCToSU
exports.copyValuesToItemToMarketCategoryReference = copyValuesToItemToMarketCategoryReference
exports.startWRINReviewWorkflow = startWRINReviewWorkflow
exports.autoRemoveFromWRINReviewWorkflow = autoRemoveFromWRINReviewWorkflow
exports.validatePPOShortDescription = validatePPOShortDescription
exports.classifySMIBasedOnPG = classifySMIBasedOnPG
exports.approveAlternateSMIFromPrimarySMI = approveAlternateSMIFromPrimarySMI
exports.partialApproveReference = partialApproveReference
exports.partialApproveAttribute = partialApproveAttribute
exports.checkIfObjectPresentInWorkflows = checkIfObjectPresentInWorkflows
exports.validateWRINReviewStatus = validateWRINReviewStatus
exports.getDateinFormat = getDateinFormat
exports.FormatDate = FormatDate
exports.getPreviousDate = getPreviousDate
exports.getCaseSize = getCaseSize
exports.replaceFirstCharWithGivenValue = replaceFirstCharWithGivenValue
exports.setHelpWorkflowVariable = setHelpWorkflowVariable
exports.AllocateRCNumberStartingfromEight = AllocateRCNumberStartingfromEight
exports.recipeBuildOrderValidation = recipeBuildOrderValidation
exports.validateTaxCodeGroup = validateTaxCodeGroup
exports.ValidateDuplicateVariant = ValidateDuplicateVariant
exports.PPOEffectiveDatesCheck = PPOEffectiveDatesCheck
exports.populateRecentCommentLog = populateRecentCommentLog
exports.isWRINInExceptionList = isWRINInExceptionList
exports.populateLinkedRCcommentLog = populateLinkedRCcommentLog
exports.populatelinkedSMIcommentLog = populatelinkedSMIcommentLog
exports.POPTextStatementDeclaredRollUp = POPTextStatementDeclaredRollUp
exports.getLinkOfObject = getLinkOfObject
exports.IsBMIArchivable = IsBMIArchivable
exports.archivalOfBaseMenuItemWithSMI = archivalOfBaseMenuItemWithSMI
exports.archivalOfBaseMenuItemWithSMI = archivalOfBaseMenuItemWithSMI
exports.autoTriggerCurrentStatesBySuperUser = autoTriggerCurrentStatesBySuperUser
exports.overridePrimToAltSMI = overridePrimToAltSMI
exports.isPIMSuperUser = isPIMSuperUser
exports.restQueryHome = restQueryHome
exports.computeAcctoSign = computeAcctoSign
exports.autoTriggerCurrentStatesBySuperUserForSMI = autoTriggerCurrentStatesBySuperUserForSMI
exports.refreshSMItoRecipeComponentReference = refreshSMItoRecipeComponentReference
exports.isIOMBUMarket = isIOMBUMarket
exports.setBMIVersionAndApprove = setBMIVersionAndApprove
exports.isBMIRecipeActiveMarketVariant = isBMIRecipeActiveMarketVariant
exports.isOldModel = isOldModel
exports.generateRecipeVariantNumber = generateRecipeVariantNumber
exports.isYieldWithInventoryUOM = isYieldWithInventoryUOM
exports.CheckLinkedSU = CheckLinkedSU
exports.archiveDevRC = archiveDevRC
exports.refAvailable = refAvailable
exports.classifyActiveInactiveSMI = classifyActiveInactiveSMI
exports.getTimeFormat = getTimeFormat
exports.getTimeFormatWithoutAmPm = getTimeFormatWithoutAmPm
exports.removeResgrpClassification = removeResgrpClassification
exports.checkValidResgrp = checkValidResgrp
exports.addBackValidResgrp = addBackValidResgrp
exports.approveBmirAndSmiPartially = approveBmirAndSmiPartially
exports.approveBmirAndSmiPartiallyFutureUse = approveBmirAndSmiPartiallyFutureUse
exports.newWRINinactivationModel = newWRINinactivationModel
exports.addNonDuplicateRowsIntoDataContainerWRIN = addNonDuplicateRowsIntoDataContainerWRIN
exports.addNonDuplicateRowsIntoDataContainerRC = addNonDuplicateRowsIntoDataContainerRC
exports.addNonDuplicateRowsIntoDataContainerBMI = addNonDuplicateRowsIntoDataContainerBMI
exports.updateFuturePricingAtBMI = updateFuturePricingAtBMI
exports.populateRCToSUHistory = populateRCToSUHistory
exports.populateNodeReferenceHistory = populateNodeReferenceHistory
exports.rcToPPODeleteRef = rcToPPODeleteRef
exports.setDefaultValueIfNull = setDefaultValueIfNull
exports.recipeComponentDefaultingLogic = recipeComponentDefaultingLogic
exports.getHighestDateForBMIs = getHighestDateForBMIs
exports.getEarliestFromDateForBMIs = getEarliestFromDateForBMIs
exports.copySMIName = copySMIName
exports.getSMILongName = getSMILongName
exports.copySMINameToBMIRecipe = copySMINameToBMIRecipe
exports.setDatesAtBMIRToRcLevel = setDatesAtBMIRToRcLevel