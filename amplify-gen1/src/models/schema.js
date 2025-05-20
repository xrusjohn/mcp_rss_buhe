export const schema = {
    "models": {},
    "enums": {
        "ArticleStatus": {
            "name": "ArticleStatus",
            "values": [
                "NORMAL",
                "FAVORITE"
            ]
        },
        "FeedType": {
            "name": "FeedType",
            "values": [
                "RSS",
                "ATOM",
                "JSON_FEED",
                "CUSTOM_API",
                "HTML"
            ]
        }
    },
    "nonModels": {
        "Feed": {
            "name": "Feed",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "url": {
                    "name": "url",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "htmlUrl": {
                    "name": "htmlUrl",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "category": {
                    "name": "category",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "feedType": {
                    "name": "feedType",
                    "isArray": false,
                    "type": {
                        "enum": "FeedType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "lastFetched": {
                    "name": "lastFetched",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "isActive": {
                    "name": "isActive",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "articles": {
                    "name": "articles",
                    "isArray": true,
                    "type": {
                        "nonModel": "Article"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                }
            }
        },
        "Article": {
            "name": "Article",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "feedId": {
                    "name": "feedId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "abstract": {
                    "name": "abstract",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "link": {
                    "name": "link",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "pubDate": {
                    "name": "pubDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "fetchDate": {
                    "name": "fetchDate",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "author": {
                    "name": "author",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "ArticleStatus"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "feedTitle": {
                    "name": "feedTitle",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "feedCategory": {
                    "name": "feedCategory",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "UpdateResponse": {
            "name": "UpdateResponse",
            "fields": {
                "success": {
                    "name": "success",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "message": {
                    "name": "message",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "SubscriptionResponse": {
            "name": "SubscriptionResponse",
            "fields": {
                "success": {
                    "name": "success",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "subscriptionArn": {
                    "name": "subscriptionArn",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "message": {
                    "name": "message",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.4",
    "version": "556d3587bbc09e0018d1237987ab899e"
};