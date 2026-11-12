/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Main"
}
*/
/*===== business rule definition =====
{
  "id" : "BA_TESTBRKK",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "BA_TESTBRKK",
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
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
logger.info("This is to test if logger can be called by default without any binds")
#starts
{
	"info": {
		"_postman_id": "c7faa059-cdbd-465e-9c41-0943d11fdffd",
		"name": "DEV252 - Webservices - Exercises 2026.1",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "54551825",
		"_collection_link": "https://kudumu-vineethkumar-924622.postman.co/workspace/Vineeth's-Workspace~485153ad-cdad-4ada-83f9-4c80854a46ea/collection/54551825-c7faa059-cdbd-465e-9c41-0943d11fdffd?action=share&source=collection_link&creator=54551825"
	},
	"item": [
		{
			"name": "GraphQL",
			"item": [
				{
					"name": "Get token - auth",
					"event": [
						{
							"listen": "test",
							"script": {
								"exec": [
									"pm.globals.set(\"token\", responseBody);\r",
									"pm.environment.set(\"token\", responseBody);"
								],
								"type": "text/javascript",
								"packages": {},
								"requests": {}
							}
						},
						{
							"listen": "prerequest",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript",
								"packages": {},
								"requests": {}
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/graphqlv2/auth?userId={{login}}&password={{password}}",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"auth"
							],
							"query": [
								{
									"key": "userId",
									"value": "{{login}}"
								},
								{
									"key": "password",
									"value": "{{password}}"
								}
							]
						},
						"description": "Get the token needed"
					},
					"response": []
				},
				{
					"name": "Reading node - product",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "query getProductDetails {\n  product(context:\"GL\",workspace:\"Main\",id:\"SalesItem-102387\") {\n    id\n    name\n    title\n    objectType {id,name}\n    values {\n      attribute {id}\n      simpleValue\n    }\n  }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Reading node with Key - product",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "query getProductbyKey {\n  product(context:\"Context1\",workspace:\"Main\",id:\"90000017\",keyId:\"ERP_ID_KEY\") {\n     id\n    name\n    title\n    objectType {\n      id\n      name\n    }\n    values {\n      attribute {\n        id\n      }\n      simpleValue\n    }\n  }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Updating node - setNodeValue",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "mutation setAttributeValue {\n  localisedDesc:setNodeValue(context:\"Context1\",workspace:\"Main\",\n    input:{id:\"SalesItem-102387\",type:Product,attribute:\"LocalisedDescription\",\n      value:[{simpleValue:\"AC-P7000-79\"}]})\n  {success\n  errors {path,message}}\n  \n  color:setNodeValue(context:\"Context1\",workspace:\"Main\",\n    input:{id:\"SalesItem-102387\",type:Product,attribute:\"Color\",\n      value:[{valueId:\"BK\"}]})\n  {success\n  errors {path,message}}\n}\n",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create node - createEntity",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "mutation createNodewithID {\n  createEntity(context:\"Context1\",workspace:\"Main\",\n    input:{id:\"graphsu3\",name:\"graphsu3\",objectType:\"ProductOwner\",parent:\"ProductOwners\"})\n  {\n    success\n    errors{\n      path\n      message\n    }\n  }\n} ",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create reference - createReference",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "mutation createReferences {\n  ref1:createReference(context:\"Context1\",workspace:\"Main\",\n  input:{source:\"graphsu3\",sourceType:Entity,target:\"SalesItem-102387\",referenceType:\"ProductOwner\"}) \n  {\n    success\n    errors{\n      path\n      message\n    }\n  }\n  \n  ref2:createReference(context:\"Context1\",workspace:\"Main\",\n  input:{source:\"graphsu3\",sourceType:Entity,target:\"SalesItem-102384\",referenceType:\"ProductOwner\"}) \n  {\n    success\n    errors{\n      path\n      message\n    }\n  }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete node - deleteEntity",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "mutation deletingEntity {\n  deleteNode(context:\"Context1\",workspace:\"Main\",input:{node:\"graphsu3\",nodeType:Entity})\n  {\n    success\n    errors{\n      path\n      message\n    }\n  }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Start node in workflow - startWorkflow",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "mutation toStartWorkflow {\n  node1:startWorkflow(context:\"Context1\",workspace:\"Main\",input:{\n    node:\"SalesItem-102387\",\n    workflow:\"MarketingWf\",\n    message:\"GRAPHQL - Starting first Node to workflow\"\n  }) {\n    success\n    errors{\n      path\n      message\n    }\n  }\n  \n  node2:startWorkflow(context:\"Context1\",workspace:\"Main\",input:{\n    node:\"SalesItem-102384\",\n    workflow:\"MarketingWf\",\n    message:\"GRAPHQL - Starting Second Node to workflow\"\n  }) {\n    success\n    errors{\n      path\n      message\n    }\n  }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Search nodes - searchForProducts",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "query searchMyProducts {\n  searchForProducts(context:\"Context1\",workspace:\"Main\",useCache:false,\n  condition:{\n    and:{\n      conditions:[\n        {simpleBelow:{id:\"Level1-102362\",type:product}}\n        {numericValue:{attribute:\"HeightWithTableTopStand\",queryValue:\"91\",operator:gteq,unit:\"unece.unit.CMT\"}}\n      ]\n    }\n  }) {\n    pageInfo {hasNextPage hasPreviousPage startCursor endCursor}\n    pageElements {\n      id\n      name\n      values (attributes:[\"HeightWithTableTopStand\"]) {\n        simpleValue\n      }\n    }\n  }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Search nodes - searchProdsbyList",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "query searchProdsByList {\n  searchForProducts (\n    context:\"Context1\",\n    workspace:\"Main\",\n    first: 100,\n    condition: {\n      list: {\n        id: {\n          values: [\"SalesItem-102458\", \"SalesItem-102459\"]\n        }\n      }      \n    }\n  ){\n    pageInfo {\n      endCursor,\n      hasNextPage\n    }\n    pageElements {\n      id\n      title\n    }\n  }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Fetch image - product",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "query fetchImage {\n    product(\n        context: \"Context1\"\n        workspace: \"Main\"\n        id: \"SalesItem-102468\"\n    ) {\n        primaryImage {TODO}     # Easy solution\n\n        referencesByReferenceType(\n            referenceTypes:[\"PrimaryProductImage\"]\n        ){TODO}                 # \"Hard\" solution\n    }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Fetch image - product Copy",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "query getAssetContent {\n  asset(context:\"Context1\",workspace:\"Main\",id:\"ProductImage-101601\") {\n    id\n    name\n    hasContent\n    original :contentUri\n    grayscale:contentUri(imageConversionConfiguration:\"101509\")\n  }\n}",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				},
				{
					"name": "Optional - BR execute",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "graphql",
							"graphql": {
								"query": "mutation businessRule {\n    executeAction TODO\n}\n",
								"variables": ""
							}
						},
						"url": {
							"raw": "https://{{environment}}/graphqlv2/graphql",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"graphqlv2",
								"graphql"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "REST",
			"item": [
				{
					"name": "Reading node - products/{id}",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/restapiv2/products/SalesItem-102388?context=GL&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"products",
								"SalesItem-102388"
							],
							"query": [
								{
									"key": "context",
									"value": "GL"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						},
						"description": "Operation for retrieving information about a specific product object. The product can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key."
					},
					"response": [
						{
							"name": "The product with the specified ID / key value",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"culpa magna\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"attributeLinks\": [\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  },\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  }\n ],\n \"dataContainers\": \"<object>\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied.",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "If the specified product cannot be found",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Reading node - products/{id} Copy",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/restapiv2/products/90000017?context=GL&workspace=Main&keyId=ERP_ID_KEY",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"products",
								"90000017"
							],
							"query": [
								{
									"key": "context",
									"value": "GL"
								},
								{
									"key": "workspace",
									"value": "Main"
								},
								{
									"key": "keyId",
									"value": "ERP_ID_KEY"
								}
							]
						},
						"description": "Operation for retrieving information about a specific product object. The product can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key."
					},
					"response": [
						{
							"name": "The product with the specified ID / key value",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"culpa magna\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"attributeLinks\": [\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  },\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  }\n ],\n \"dataContainers\": \"<object>\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied.",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "If the specified product cannot be found",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "purging  - entity/{id}/purge",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/restapiv2/entities/restsu3/purge?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"entities",
								"restsu3",
								"purge"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						},
						"description": "Operation for retrieving information about a specific product object. The product can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key."
					},
					"response": [
						{
							"name": "The product with the specified ID / key value",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"culpa magna\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"attributeLinks\": [\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  },\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  }\n ],\n \"dataContainers\": \"<object>\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied.",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "If the specified product cannot be found",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/products/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Updating node - products/{id}",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "PATCH",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"name\": \"AC-P7000-65\",\n  \"values\": {\n    \"LocalisedDescription\": {\n      \"value\": {\n        \"value\": \"AC-P7000-65\"\n      }\n    },\n    \"Color\": {\n      \"value\": {\n        \"valueId\": \"BK\"\n      }\n    }\n  }\n}"
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/products/SalesItem-102388?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"products",
								"SalesItem-102388"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for replacing an existing product or creating a new product with known ID. To avoid accidental replacement of existing products, replacement will only be performed if the value \"true\" is supplied for the \"allow-overwrite\" query parameter. A 400 response is returned if the value for \"allow-overwrite\" is \"false\" and a product with the specified ID already exists. When replacing, any data that is local to the working context (or not dimension dependent) and for which the client has write permissions will be overwritten and replaced with the data provided in the request body. Object type and parent must always be specified in the request body. For the replace case, the product can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its value for the specified key. A STEP ID is required for creating a new product via this resource operation and a 400 response will therefore be returned if a \"keyId\" is supplied and the object does not exist in advance. If an ID is supplied in the request body, it must match the ID of the product identified via the URL."
					},
					"response": [
						{
							"name": "Product object successfully replaced",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"Fender AM Ori­ginal 60 Strat RW OW\",\n    \"objectType\": \"SalesItem\",\n    \"parent\": \"ElectricGuitars\",\n    \"values\": {\n        \"Body\": {\n            \"value\": {\n                \"value\": \"Alder\"\n            }\n        },\n        \"Neck\": {\n            \"value\": {\n                \"value\": \"Maple\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/products/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"culpa magna\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"attributeLinks\": [\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  },\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  }\n ],\n \"dataContainers\": \"<object>\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, a product with the specified ID already exists and the value for the query parameter \"allow-overwrite\" is \"false\", if a \"keyId\" is supplied and \"allow-overwrite\" is \"true\", if insufficient or erroneous in",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"Fender AM Ori­ginal 60 Strat RW OW\",\n    \"objectType\": \"SalesItem\",\n    \"parent\": \"ElectricGuitars\",\n    \"values\": {\n        \"Body\": {\n            \"value\": {\n                \"value\": \"Alder\"\n            }\n        },\n        \"Neck\": {\n            \"value\": {\n                \"value\": \"Maple\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/products/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Product object successfully created",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"Fender AM Ori­ginal 60 Strat RW OW\",\n    \"objectType\": \"SalesItem\",\n    \"parent\": \"ElectricGuitars\",\n    \"values\": {\n        \"Body\": {\n            \"value\": {\n                \"value\": \"Alder\"\n            }\n        },\n        \"Neck\": {\n            \"value\": {\n                \"value\": \"Maple\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/products/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Created",
							"code": 201,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"culpa magna\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"attributeLinks\": [\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  },\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  }\n ],\n \"dataContainers\": \"<object>\"\n}"
						}
					]
				},
				{
					"name": "Create Reference - products/{id}",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{}"
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/products/SalesItem-102388/references/PrimaryProductImage/ProductImage-101601?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"products",
								"SalesItem-102388",
								"references",
								"PrimaryProductImage",
								"ProductImage-101601"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for replacing an existing product or creating a new product with known ID. To avoid accidental replacement of existing products, replacement will only be performed if the value \"true\" is supplied for the \"allow-overwrite\" query parameter. A 400 response is returned if the value for \"allow-overwrite\" is \"false\" and a product with the specified ID already exists. When replacing, any data that is local to the working context (or not dimension dependent) and for which the client has write permissions will be overwritten and replaced with the data provided in the request body. Object type and parent must always be specified in the request body. For the replace case, the product can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its value for the specified key. A STEP ID is required for creating a new product via this resource operation and a 400 response will therefore be returned if a \"keyId\" is supplied and the object does not exist in advance. If an ID is supplied in the request body, it must match the ID of the product identified via the URL."
					},
					"response": [
						{
							"name": "Product object successfully replaced",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"Fender AM Ori­ginal 60 Strat RW OW\",\n    \"objectType\": \"SalesItem\",\n    \"parent\": \"ElectricGuitars\",\n    \"values\": {\n        \"Body\": {\n            \"value\": {\n                \"value\": \"Alder\"\n            }\n        },\n        \"Neck\": {\n            \"value\": {\n                \"value\": \"Maple\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/products/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"culpa magna\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"attributeLinks\": [\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  },\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  }\n ],\n \"dataContainers\": \"<object>\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, a product with the specified ID already exists and the value for the query parameter \"allow-overwrite\" is \"false\", if a \"keyId\" is supplied and \"allow-overwrite\" is \"true\", if insufficient or erroneous in",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"Fender AM Ori­ginal 60 Strat RW OW\",\n    \"objectType\": \"SalesItem\",\n    \"parent\": \"ElectricGuitars\",\n    \"values\": {\n        \"Body\": {\n            \"value\": {\n                \"value\": \"Alder\"\n            }\n        },\n        \"Neck\": {\n            \"value\": {\n                \"value\": \"Maple\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/products/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Product object successfully created",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"Fender AM Ori­ginal 60 Strat RW OW\",\n    \"objectType\": \"SalesItem\",\n    \"parent\": \"ElectricGuitars\",\n    \"values\": {\n        \"Body\": {\n            \"value\": {\n                \"value\": \"Alder\"\n            }\n        },\n        \"Neck\": {\n            \"value\": {\n                \"value\": \"Maple\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/products/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Created",
							"code": 201,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"culpa magna\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"attributeLinks\": [\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  },\n  {\n   \"attribute\": \"<string>\",\n   \"values\": \"<object>\"\n  }\n ],\n \"dataContainers\": \"<object>\"\n}"
						}
					]
				},
				{
					"name": "Create node - entities",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"name\": \"restsu3\",\n  \"objectType\": \"ProductOwner\",\n  \"parent\": \"ProductOwners\"\n}"
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/entities/restsu3?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"entities",
								"restsu3"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						},
						"description": "Operation for replacing an existing entity or creating a new entity with known ID. To avoid accidental replacement of existing entities, replacement will only be performed if the value \"true\" is supplied for the \"allow-overwrite\" query parameter. A 400 response is returned if the value for \"allow-overwrite\" is \"false\" and an entity with the specified ID already exists. When replacing, any data that is local to the working context (or not dimension dependent) and for which the client has write permissions will be overwritten and replaced with the data provided in the request body. Object type and parent must always be specified in the request body. For the replace case, the entity can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its value for the specified key. A STEP ID is required for creating a new entity via this resource operation and a 400 response will therefore be returned if a \"keyId\" is supplied and the object does not exist in advance. If an ID is supplied in the request body, it must match the ID of the entity identified via the URL."
					},
					"response": [
						{
							"name": "Error caused by client. Returned if, for instance, an entity with the specified ID already exists and the value for the query parameter \"allow-overwrite\" is \"false\", if a \"keyId\" is supplied and \"allow-overwrite\" is \"true\", if insufficient or erroneous in",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"objectType\": \"Customer\",\n    \"parent\": \"Customers\",\n    \"values\": {\n        \"FirstName\": {\n            \"value\": {\n                \"value\": \"John\"\n            }\n        },\n        \"LastName\": {\n            \"value\": {\n                \"value\": \"Smith\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/entities/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Entity object successfully created",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"objectType\": \"Customer\",\n    \"parent\": \"Customers\",\n    \"values\": {\n        \"FirstName\": {\n            \"value\": {\n                \"value\": \"John\"\n            }\n        },\n        \"LastName\": {\n            \"value\": {\n                \"value\": \"Smith\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/entities/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Created",
							"code": 201,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"voluptate tempor proident sit\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"dataContainers\": \"<object>\"\n}"
						},
						{
							"name": "Entity object successfully replaced",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"objectType\": \"Customer\",\n    \"parent\": \"Customers\",\n    \"values\": {\n        \"FirstName\": {\n            \"value\": {\n                \"value\": \"John\"\n            }\n        },\n        \"LastName\": {\n            \"value\": {\n                \"value\": \"Smith\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/entities/:id?allow-overwrite=false&keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id"
									],
									"query": [
										{
											"key": "allow-overwrite",
											"value": "false"
										},
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"voluptate tempor proident sit\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"dataContainers\": \"<object>\"\n}"
						}
					]
				},
				{
					"name": "Create reference - entities/{id}",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "PATCH",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"references\": {\n        \"ProductOwner\" : {\n            \"references\" : [\n                {\n                    \"target\": \"SalesItem-102388\"\n                },\n                {\n                    \"target\": \"SalesItem-102385\"\n                }\n            ]\n        }\n    }\n}"
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/entities/restsu3?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"entities",
								"restsu3"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for updating multiple properties with a single request. The entity to update can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its value for the specified key. Contrary to the PUT /entities/{id} replace operation, this operation will only modify data present in the supplied request body.<br/>For both single and multivalued attributes, if a value representation is present in the request body, the existing value will be overwritten. Notice however that supplying the property \"contextLocal\" with the value \"false\" or the SingleValue \"calculated\" property with the value \"true\" will cause a value update to be ignored.<br/>For single valued reference types, existing references will be replaced with those provided in the request body. For multivalued reference types, if references in the request body match existing references, these will be replaced. Otherwise references in the request body will be added (i.e. existing references not in the request body will not be removed). As with values, if the property \"contextLocal\" is supplied with the value \"false\" for a reference, the update will be ignored.<br/>If \"parent\" information is supplied, the entity will be moved below the specified parent given that it differs from the current.<br/>Data containers can only be updated if auto IDs are configured for the data container type. For single valued data container types, existing data container objects will be replaced with the data container object in the request body. For multi valued data container types, data container objects in the request body will be added if the data container type does not have a key definition. If a data container key definition is present data container objects in the request body will replace existing data containers that matches the data container key, otherwise new data container objects will be added to the multi valued data container.<br/>This resource operation does not allow for the entity object type to be updated. If an ID is supplied in the request body, it must match the ID of the entity identified via the URL."
					},
					"response": [
						{
							"name": "Entity object successfully updated",
							"originalRequest": {
								"method": "PATCH",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"values\": {\n        \"FirstName\": {\n            \"value\": {\n                \"value\": \"John\"\n            }\n        },\n        \"LastName\": {\n            \"value\": {\n                \"value\": \"Smith\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/entities/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"voluptate tempor proident sit\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"parent\": \"<string>\",\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"dataContainers\": \"<object>\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, insufficient or erroneous information is provided in the request body, if invalid context or workspace information is supplied or if operation is invoked in a terminated workspace.",
							"originalRequest": {
								"method": "PATCH",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"values\": {\n        \"FirstName\": {\n            \"value\": {\n                \"value\": \"John\"\n            }\n        },\n        \"LastName\": {\n            \"value\": {\n                \"value\": \"Smith\"\n            }\n        }\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/entities/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Delete node - entities/{id}",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/restapiv2/entities/restsu3?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"entities",
								"restsu3"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						},
						"description": "Operation for deleting a specific entity. Operation can only be invoked in editable workspaces and will if successful move the entity to the recycle bin or remove it completely depending on whether the entity object type is workspace revised. The entity can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key."
					},
					"response": [
						{
							"name": "If the specified entity cannot be found",
							"originalRequest": {
								"method": "DELETE",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/entities/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Entity successfully deleted (moved to recycle bin or removed)",
							"originalRequest": {
								"method": "DELETE",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/entities/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "text",
							"header": [
								{
									"key": "Content-Type",
									"value": "text/plain"
								}
							],
							"cookie": [],
							"body": ""
						},
						{
							"name": "Error caused by client. Returned if, for instance, the entity cannot be deleted due to constraints like e.g. the entity having children or the existence of references pointing to the entity, if invalid context or workspace information is supplied or if th",
							"originalRequest": {
								"method": "DELETE",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/entities/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Approve node - entities/{id}/approve",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/restapiv2/entities/restsu3/approve?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"entities",
								"restsu3",
								"approve"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for approving an entity. The operation can only be invoked in the Main workspace and a 400 response will be returned if the operation is invoked in another workspace. A 400 response is also returned if the entity could not be approved, for instance due to a constraint (e.g. parent not present in Approved), due to the approval being rejected by a business condition or due to the entity not being workspace revisable. The entity to approve can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key."
					},
					"response": [
						{
							"name": "Entity successfully approved. Notice that the entity may only have been partially approved. In this case the response will hold information about the part objects that could not be synchronized to the Approved workspace.",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/entities/:id/approve?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id",
										"approve"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"messages\": [\n  \"magna cupidatat\",\n  \"labore do Excepteur\"\n ]\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, the operation is invoked in a workspace different from Main, if the entity is not workspace revisable, if the approval for some other reason could not be performed or if invalid context or workspace infor",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/entities/:id/approve?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id",
										"approve"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "If the specified entity cannot be found",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/entities/:id/approve?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"entities",
										":id",
										"approve"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Start node in workflow - workflows/{id}/instances",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"node\": {\n        \"id\": \"SalesItem-102385\",\n        \"type\": \"product\"\n    },\n    \"message\": \"REST - Starting the first node\"\n}"
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/workflows/MarketingWf/instances?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"workflows",
								"MarketingWf",
								"instances"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for starting a workflow. I.e. creating a workflow instance."
					},
					"response": [
						{
							"name": "If the specified workflow cannot be found",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"node\": {\n        \"id\": \"<string>\",\n        \"type\": \"<string>\"\n    },\n    \"message\": \"<string>\"\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/workflows/:id/instances?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"workflows",
										":id",
										"instances"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Workflow successfully started",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"node\": {\n        \"id\": \"<string>\",\n        \"type\": \"<string>\"\n    },\n    \"message\": \"<string>\"\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/workflows/:id/instances?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"workflows",
										":id",
										"instances"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"tempor irure\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, insufficient or erroneous information is provided in the request body, if an instance already exists for the supplied object, if the supplied object is not valid for the workflow, if initiation is prevent",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"node\": {\n        \"id\": \"<string>\",\n        \"type\": \"<string>\"\n    },\n    \"message\": \"<string>\"\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/workflows/:id/instances?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"workflows",
										":id",
										"instances"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Initiate BGP - export",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"processDescription\": \"Export started from rest\"\n}"
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/export/su3export?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"export",
								"su3export"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for starting a workflow. I.e. creating a workflow instance."
					},
					"response": [
						{
							"name": "If the specified workflow cannot be found",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"node\": {\n        \"id\": \"<string>\",\n        \"type\": \"<string>\"\n    },\n    \"message\": \"<string>\"\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/workflows/:id/instances?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"workflows",
										":id",
										"instances"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Workflow successfully started",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"node\": {\n        \"id\": \"<string>\",\n        \"type\": \"<string>\"\n    },\n    \"message\": \"<string>\"\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/workflows/:id/instances?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"workflows",
										":id",
										"instances"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"tempor irure\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, insufficient or erroneous information is provided in the request body, if an instance already exists for the supplied object, if the supplied object is not valid for the workflow, if initiation is prevent",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"node\": {\n        \"id\": \"<string>\",\n        \"type\": \"<string>\"\n    },\n    \"message\": \"<string>\"\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/workflows/:id/instances?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"workflows",
										":id",
										"instances"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Download attachment (step 0) - background-proceses/TODO/TODO",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/restapiv2/background-processes/BGP_107542/attachments?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"background-processes",
								"BGP_107542",
								"attachments"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for retrieving information about available attachments for a specific background process instance"
					},
					"response": [
						{
							"name": "The background process attachments metadata",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/background-processes/:id/attachments?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"background-processes",
										":id",
										"attachments"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "[\n {\n  \"id\": \"aliquip\",\n  \"name\": \"et quis sunt ullamco\",\n  \"mimeType\": \"proiden\",\n  \"originalAttachmentId\": \"qui minim esse\",\n  \"description\": \"sed ex\"\n },\n {\n  \"id\": \"ex eu\",\n  \"name\": \"nostrud labore Ut\",\n  \"mimeType\": \"sit mollit non\",\n  \"originalAttachmentId\": \"id in Excepteur labore\",\n  \"description\": \"in aliquip\"\n }\n]"
						},
						{
							"name": "If the specified background process cannot be found",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/background-processes/:id/attachments?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"background-processes",
										":id",
										"attachments"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied.",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/background-processes/:id/attachments?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"background-processes",
										":id",
										"attachments"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Download attachment - background-processes/{id}/attachments/TODO/TODO",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/restapiv2/background-processes/BGP_107542/attachments/d6b2ee6d-1b70-4b7a-be04-12621fabb710/content?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"background-processes",
								"BGP_107542",
								"attachments",
								"d6b2ee6d-1b70-4b7a-be04-12621fabb710",
								"content"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for downloading attachment content for a specific background process attachment"
					},
					"response": [
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied.",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/background-processes/:id/attachments/:attachmentId/content?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"background-processes",
										":id",
										"attachments",
										":attachmentId",
										"content"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										},
										{
											"key": "attachmentId"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "If the specified background process or attachment cannot be found",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/background-processes/:id/attachments/:attachmentId/content?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"background-processes",
										":id",
										"attachments",
										":attachmentId",
										"content"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										},
										{
											"key": "attachmentId"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Binary data for the background process attachment with the specified ID",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/background-processes/:id/attachments/:attachmentId/content?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"background-processes",
										":id",
										"attachments",
										":attachmentId",
										"content"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										},
										{
											"key": "attachmentId"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "text",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/octet-stream"
								}
							],
							"cookie": [],
							"body": "Duis ullamco deserunt ad mollit"
						}
					]
				},
				{
					"name": "Upload and invoke - inbound-integration-endpoints/TODO/upload-and-invoke",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/octet-stream"
							}
						],
						"body": {
							"mode": "file",
							"file": {
								"src": "/C:/Users/2492667/OneDrive - Cognizant/Desktop/DEV_252__Webservices_course_06_10_-_08_10_-_Misc._Information_&_Documents/Exported file.xml"
							}
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/inbound-integration-endpoints/REST_IIEP/upload-and-invoke?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"inbound-integration-endpoints",
								"REST_IIEP",
								"upload-and-invoke"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for posting a message/file to an inbound integration endpoint with a configured REST receiver and invoking the endpoint. A 400 response is returned if the endpoint does not have a REST-enabled receiver plugin or if the endpoint is not enabled."
					},
					"response": [
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied, if operation is invoked for an endpoint that does not have a REST-enabled receiver or if the endpoint is not enabled.",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "\"<binary>\""
								},
								"url": {
									"raw": "{{baseUrl}}/inbound-integration-endpoints/:id/upload-and-invoke?fileName=unknown&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"inbound-integration-endpoints",
										":id",
										"upload-and-invoke"
									],
									"query": [
										{
											"key": "fileName",
											"value": "unknown"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "If the specified inbound integration endpoint cannot be found",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "\"<binary>\""
								},
								"url": {
									"raw": "{{baseUrl}}/inbound-integration-endpoints/:id/upload-and-invoke?fileName=unknown&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"inbound-integration-endpoints",
										":id",
										"upload-and-invoke"
									],
									"query": [
										{
											"key": "fileName",
											"value": "unknown"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Message/file successfully uploaded and endpoint invoked",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "\"<binary>\""
								},
								"url": {
									"raw": "{{baseUrl}}/inbound-integration-endpoints/:id/upload-and-invoke?fileName=unknown&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"inbound-integration-endpoints",
										":id",
										"upload-and-invoke"
									],
									"query": [
										{
											"key": "fileName",
											"value": "unknown"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "text",
							"header": [
								{
									"key": "Content-Type",
									"value": "text/plain"
								}
							],
							"cookie": [],
							"body": ""
						}
					]
				},
				{
					"name": "Upload Direct - inbound-integration-endpoints/TODO/upload-direct",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/octet-stream"
							}
						],
						"body": {
							"mode": "file",
							"file": {
								"src": "/C:/Users/2492667/OneDrive - Cognizant/Desktop/DEV_252__Webservices_course_06_10_-_08_10_-_Misc._Information_&_Documents/Exported file.xml"
							}
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/inbound-integration-endpoints/RESTDirect_IIEP/upload-direct?context=Context1&workspace=Main&fileName=Exported file.xml",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"inbound-integration-endpoints",
								"RESTDirect_IIEP",
								"upload-direct"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								},
								{
									"key": "fileName",
									"value": "Exported file.xml"
								}
							]
						},
						"description": "Operation for posting a message/file to an inbound integration endpoint with a configured REST receiver and invoking the endpoint. A 400 response is returned if the endpoint does not have a REST-enabled receiver plugin or if the endpoint is not enabled."
					},
					"response": [
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied, if operation is invoked for an endpoint that does not have a REST-enabled receiver or if the endpoint is not enabled.",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "\"<binary>\""
								},
								"url": {
									"raw": "{{baseUrl}}/inbound-integration-endpoints/:id/upload-and-invoke?fileName=unknown&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"inbound-integration-endpoints",
										":id",
										"upload-and-invoke"
									],
									"query": [
										{
											"key": "fileName",
											"value": "unknown"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "If the specified inbound integration endpoint cannot be found",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "\"<binary>\""
								},
								"url": {
									"raw": "{{baseUrl}}/inbound-integration-endpoints/:id/upload-and-invoke?fileName=unknown&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"inbound-integration-endpoints",
										":id",
										"upload-and-invoke"
									],
									"query": [
										{
											"key": "fileName",
											"value": "unknown"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "Message/file successfully uploaded and endpoint invoked",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "\"<binary>\""
								},
								"url": {
									"raw": "{{baseUrl}}/inbound-integration-endpoints/:id/upload-and-invoke?fileName=unknown&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"inbound-integration-endpoints",
										":id",
										"upload-and-invoke"
									],
									"query": [
										{
											"key": "fileName",
											"value": "unknown"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "text",
							"header": [
								{
									"key": "Content-Type",
									"value": "text/plain"
								}
							],
							"cookie": [],
							"body": ""
						}
					]
				},
				{
					"name": "Search nodes - products/search",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"condition\": {\n        \"conditionType\": \"and\",\n        \"conditions\": [\n            {\n                \"conditionType\":\"simplebelow\",\n                \"topNodeId\":\"Level1-102362\",\n                \"topNodeType\":\"product\"\n\n            },\n            {\n                \"conditionType\":\"numericvalue\",\n                \"attribute\":\"HeightWithTableTopStand\",\n                \"operator\":\"gt\",\n                \"queryValue\":\"91\",\n                \"unit\":\"unece.unit.CMT\"\n            }\n        ]\n    }\n}"
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/products/search?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"products",
								"search"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								}
							]
						},
						"description": "Operation for querying products. Resource operation will return a maximum of 1000 results. Notice that while the query can be made arbitrarily complex with multiple levels of nested AND and OR conditions, such complex queries will not perform well."
					},
					"response": [
						{
							"name": "Array of query results as a stream",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"condition\": {\n        \"conditionType\": \"and\",\n        \"conditions\": [\n            {\n                \"conditionType\": \"simplebelow\",\n                \"topNodeId\": \"I-Level2-13\",\n                \"topNodeType\": \"product\"\n            },\n            {\n                \"conditionType\": \"objecttype\",\n                \"objectType\": \"SalesItem\"\n            }\n        ]\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/products/search?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										"search"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "[\n {\n  \"type\": \"classification\",\n  \"id\": \"consectetur nulla velit ea\"\n },\n {\n  \"type\": \"asset\",\n  \"id\": \"ea tempor\"\n }\n]"
						},
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied.",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"condition\": {\n        \"conditionType\": \"and\",\n        \"conditions\": [\n            {\n                \"conditionType\": \"simplebelow\",\n                \"topNodeId\": \"I-Level2-13\",\n                \"topNodeType\": \"product\"\n            },\n            {\n                \"conditionType\": \"objecttype\",\n                \"objectType\": \"SalesItem\"\n            }\n        ]\n    }\n}"
								},
								"url": {
									"raw": "{{baseUrl}}/products/search?context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"products",
										"search"
									],
									"query": [
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Fetch image - assets/{id}",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/restapiv2/assets/ProductImage-101601/content?context=Context1&workspace=Main&conversion-configuration-id=101509",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"assets",
								"ProductImage-101601",
								"content"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1",
									"description": "(Required) ID of the context in which to perform the operation"
								},
								{
									"key": "workspace",
									"value": "Main",
									"description": "ID of the workspace in which to perform the operation. Defaults to \"Main\"."
								},
								{
									"key": "conversion-configuration-id",
									"value": "101509"
								}
							]
						},
						"description": "Operation for retrieving information about a specific asset object. The asset can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key. Notice that the response does not contain asset content (binary data). Use GET /assets/{id}/content to retrieve the binary data."
					},
					"response": [
						{
							"name": "Error caused by client. Returned if, for instance, invalid context or workspace information is supplied.",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/assets/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"assets",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Bad Request",
							"code": 400,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						},
						{
							"name": "The asset with the specified ID / key value",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/assets/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"assets",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"id\": \"sunt Lorem ipsum fugiat nisi\",\n \"name\": \"<string>\",\n \"objectType\": \"<string>\",\n \"classifications\": [\n  \"<string>\",\n  \"<string>\"\n ],\n \"values\": \"<object>\",\n \"references\": \"<object>\",\n \"contentMetadata\": {}\n}"
						},
						{
							"name": "If the specified asset cannot be found",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "Basic <credentials>",
										"description": "Added as a part of security scheme: basic"
									}
								],
								"url": {
									"raw": "{{baseUrl}}/assets/:id?keyId=<string>&context=<string>&workspace=Main",
									"host": [
										"{{baseUrl}}"
									],
									"path": [
										"assets",
										":id"
									],
									"query": [
										{
											"key": "keyId",
											"value": "<string>"
										},
										{
											"key": "context",
											"value": "<string>"
										},
										{
											"key": "workspace",
											"value": "Main"
										}
									],
									"variable": [
										{
											"key": "id"
										}
									]
								}
							},
							"status": "Not Found",
							"code": 404,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Content-Type",
									"value": "application/json"
								}
							],
							"cookie": [],
							"body": "{\n \"httpStatus\": 41492430,\n \"message\": \"in eiusmod ut\",\n \"httpReason\": \"eiusmod dolor ad\"\n}"
						}
					]
				},
				{
					"name": "Batch Operation - batch/execute",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n  \"mode\": \"LENIENT\",\r\n  \"operations\": [\r\n    {\r\n      \"resource\": \"/products/SalesItem-10238\",\r\n      \"method\": \"GET\",\r\n      \"queryParameters\": {}\r\n    },\r\n    {\r\n      \"resource\": \"/products\",\r\n      \"method\": \"POST\",\r\n      \"queryParameters\": {},\r\n      \"body\": {\r\n        \"name\": \"Newly Created\",\r\n        \"objectType\": \"SalesItem\",\r\n        \"parent\": \"SalesItemFamily-102386\"\r\n        // \"values\": {\r\n        //     \"CountryOfOrigin\": {\r\n        //     \"value\": {\r\n        //         \"valueId\": \"GB\"\r\n        //     }\r\n        //     },\r\n        //     \"UPC\": {\r\n        //     \"value\": {\r\n        //         \"value\": \"445555555575\"\r\n        //     }\r\n        //     }\r\n        // }\r\n      }\r\n    }\r\n  ]\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/batch/execute?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"batch",
								"execute"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "SOAP",
			"item": [
				{
					"name": "WSDL",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://{{environment}}/StepWS/stepws?wsdl=",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"StepWS",
								"stepws"
							],
							"query": [
								{
									"key": "wsdl",
									"value": ""
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "Reading node - getValues",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:getValuesRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:passwordType>password</ns1:passwordType>\n            <ns1:contextUrl>step://context?id=GL</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <ns:nodeURL>step://product?id=SalesItem-102389</ns:nodeURL>\n      </ns:getValuesRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Reading node - getReferences",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:getReferencesRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:passwordType>password</ns1:passwordType>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <ns:nodeURL>TODO</ns:nodeURL>\n      </ns:getReferencesRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Updating node - setValues",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:setValuesRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:passwordType>password</ns1:passwordType>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <ns:nodeURL>step://product?id=SalesItem-102389</ns:nodeURL>\n         <!--1 or more repetitions:-->\n         <ns:values>\n            <ns1:attributeURL>step://attribute?id=Color</ns1:attributeURL>\n            <ns1:attributeTtitle>Color</ns1:attributeTtitle>\n            <ns1:value>Black</ns1:value>\n         </ns:values>\n         <ns:values>\n            <ns1:attributeURL>step://attribute?id=LocalisedDescription</ns1:attributeURL>\n            <ns1:attributeTtitle>Localised Description</ns1:attributeTtitle>\n            <ns1:value>AC-P7000-55</ns1:value>\n         </ns:values>\n      </ns:setValuesRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create node - createEntity",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:createEntityRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <ns:entityID>soapsu3</ns:entityID>\n         <ns:name>soapsu3</ns:name>\n         <ns:objectTypeURL>step://objecttype?id=ProductOwner</ns:objectTypeURL>\n         <ns:parentURL>step://entity?id=ProductOwners</ns:parentURL>\n      </ns:createEntityRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create reference - createReference",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" \n    xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" \n        xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:createReferenceRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <ns:ownerURL>step://entity?id=soapsu3</ns:ownerURL>\n         <ns:targetURL>step://product?id=SalesItem-102383</ns:targetURL>\n         <ns:referenceType>ProductOwner</ns:referenceType>\n      </ns:createReferenceRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete node - deleteNode",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:deleteNodeRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:passwordType>password</ns1:passwordType>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <ns:nodeURL>step://entity?id=soapsu3</ns:nodeURL>\n      </ns:deleteNodeRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Keys - getByKey",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true,
							"user-agent": true,
							"accept": true,
							"accept-encoding": true,
							"connection": true
						}
					},
					"request": {
						"auth": {
							"type": "noauth"
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:queryByKeyRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:passwordType>password</ns1:passwordType>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <!--Zero or more repetitions:-->\n         <ns:keyConditions>\n            <ns1:keyExternalID>ERP_ID_KEY</ns1:keyExternalID>\n            <ns1:key>90000017</ns1:key>\n            <ns1:type>product</ns1:type>\n         </ns:keyConditions>\n      </ns:queryByKeyRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Approve node - approve",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:approveRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:passwordType>password</ns1:passwordType>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <ns:nodeURL>step://entity?id=su3</ns:nodeURL>\n      </ns:approveRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Start node in workflow - startWorkflow",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:startWorkflowRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:passwordType>password</ns1:passwordType>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <ns:nodeURL>step://product?id=SalesItem-102383</ns:nodeURL>\n         <ns:WorkflowID>MarketingWf</ns:WorkflowID>\n         <ns:message>SOAP - Stating second node in workflow</ns:message>\n      </ns:startWorkflowRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				},
				{
					"name": "Search nodes - queryByAttributesBelow",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"content-type": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"http://stibo.com/step/ws/step/1.0\" xmlns:ns1=\"http://stibo.com/step/ws/types/1.0\">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <ns:queryByAttributesBelowRequest>\n         <ns:accessContext>\n            <ns1:userName>{{login}}</ns1:userName>\n            <ns1:password>{{password}}</ns1:password>\n            <ns1:passwordType>password</ns1:passwordType>\n            <ns1:contextUrl>step://context?id=Context1</ns1:contextUrl>\n            <ns1:workspaceUrl>step://workspace?id=Main</ns1:workspaceUrl>\n         </ns:accessContext>\n         <!--Zero or more repetitions:-->\n         <ns:valueCondition>\n            <ns1:attributeURL>TODO</ns1:attributeURL>\n            <ns1:attributeValue>TODO</ns1:attributeValue>\n         </ns:valueCondition>\n         <ns:mode>and</ns:mode>\n         <ns:caseSensitive>n</ns:caseSensitive>\n         <ns:nodeType>TODO</ns:nodeType>\n         <ns:topNodeURL>TODO</ns:topNodeURL>\n         <ns:maxCount>3</ns:maxCount>\n      </ns:queryByAttributesBelowRequest>\n   </soapenv:Body>\n</soapenv:Envelope>",
							"options": {
								"raw": {
									"language": "xml"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}:443/StepWS/stepws",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"port": "443",
							"path": [
								"StepWS",
								"stepws"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Capstone Project - Task 3",
			"item": [
				{
					"name": "Creating User  - users/{id}",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n  \"name\": \"CapstoneSU3\",\r\n  \"email\": \"CapstoneSU3@somecompany.com\",\r\n  \"values\": {\r\n    \"UserInformation\": {\r\n      \"value\": {\r\n        \"value\": \"This is created for captsone project by su3\"\r\n      }\r\n    }\r\n  },\r\n  \"userGroups\": [\r\n    \"Super user\"\r\n  ]\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/users/CapstoneSU3?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"users",
								"CapstoneSU3"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						},
						"description": "Operation for retrieving information about a specific product object. The product can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key."
					},
					"response": []
				},
				{
					"name": "Add to user group  - /users/{id}/add-to-group",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n  \"groupId\": \"ReadOnly\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/users/CAPSTONESU3/add-to-group?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"users",
								"CAPSTONESU3",
								"add-to-group"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						},
						"description": "Operation for retrieving information about a specific product object. The product can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key."
					},
					"response": []
				},
				{
					"name": "Add to user group  - /users/{id}/remove-from-group",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n  \"groupId\": \"ReadOnly\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/users/CAPSTONESU3/remove-from-group?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"users",
								"CAPSTONESU3",
								"remove-from-group"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						},
						"description": "Operation for retrieving information about a specific product object. The product can be identified either by its STEP ID or if a value for the \"keyId\" query parameter is supplied, by its key value for the specified key."
					},
					"response": []
				},
				{
					"name": "Batch Operation for user management - batch/execute",
					"request": {
						"auth": {
							"type": "basic",
							"basic": [
								{
									"key": "password",
									"value": "{{password}}",
									"type": "string"
								},
								{
									"key": "username",
									"value": "{{login}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n  \"mode\": \"LENIENT\",\r\n  \"operations\": [\r\n    {\r\n      \"resource\": \"/users/CapstoneSU3\",\r\n      \"method\": \"PUT\",\r\n      \"queryParameters\": {\"context\":\"Context1\",\"workspace\":\"Main\"},\r\n      \"body\" : {\r\n        \"name\": \"CapstoneSU3\",\r\n        \"email\": \"CapstoneSU3@somecompany.com\",\r\n        \"values\": {\r\n            \"UserInformation\": {\r\n            \"value\": {\r\n                \"value\": \"This is created for captsone project by su3\"\r\n            }\r\n            }\r\n        },\r\n        \"userGroups\": [\r\n            \"Super user\"\r\n        ]\r\n      }\r\n    },\r\n    {\r\n      \"resource\": \"/users/CAPSTONESU3/add-to-group\",\r\n      \"method\": \"POST\",\r\n      \"queryParameters\": {\"context\":\"Context1\",\"workspace\":\"Main\"},\r\n      \"body\": {\r\n        \"groupId\": \"ReadOnly\"\r\n        }\r\n    },\r\n    {\r\n      \"resource\": \"/users/CAPSTONESU3/remove-from-group\",\r\n      \"method\": \"POST\",\r\n      \"queryParameters\": {\"context\":\"Context1\",\"workspace\":\"Main\"},\r\n      \"body\": {\r\n        \"groupId\": \"ReadOnly\"\r\n        }\r\n    }\r\n  ]\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://{{environment}}/restapiv2/batch/execute?context=Context1&workspace=Main",
							"protocol": "https",
							"host": [
								"{{environment}}"
							],
							"path": [
								"restapiv2",
								"batch",
								"execute"
							],
							"query": [
								{
									"key": "context",
									"value": "Context1"
								},
								{
									"key": "workspace",
									"value": "Main"
								}
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "workarea",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "{{token}}",
							"type": "string"
						}
					]
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "graphql",
					"graphql": {
						"query": "query HelloWorld {\n    product(id: \"SalesItem-102458\"\n    context: \"Context1\"\n    workspace: \"Main\") {\n        ...someFragment\n    }\n\n}\n\nfragment someFragment on Product {\n    id\n    name\n}",
						"variables": ""
					}
				},
				"url": {
					"raw": "https://{{environment}}/graphqlv2/graphql",
					"protocol": "https",
					"host": [
						"{{environment}}"
					],
					"path": [
						"graphqlv2",
						"graphql"
					]
				}
			},
			"response": []
		},
		{
			"name": "New Request",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	]
}

#ends




}