# Prototype Design: Serverless RSS Feed with Amplify, AppSync, and DynamoDB

This document outlines a prototype design for implementing the MCP RSS project using AWS serverless technologies. This approach aligns with the serverless architecture described in our design document while providing a concrete implementation path using AWS Amplify.

## Architecture Overview

1. **DynamoDB Tables**: Store RSS feeds and articles
2. **AppSync GraphQL API**: Interface for querying and mutating data
3. **Lambda Functions**: Fetch RSS feeds periodically and process articles
4. **Amplify**: Manage infrastructure and provide client libraries

## DynamoDB Data Model

### Feeds Table
```
Table: Feeds
- id (Partition Key): String (UUID)
- title: String
- url: String
- category: String
- lastFetched: String (ISO timestamp)
```

### Articles Table
```
Table: Articles
- id (Partition Key): String (UUID)
- feedId (GSI): String (reference to Feeds table)
- title: String
- content: String
- link: String
- pubDate: String (ISO timestamp)
- fetchDate: String (ISO timestamp)
- status: String (normal/favorite)
```

## GraphQL Schema

```graphql
type Feed @model {
  id: ID!
  title: String!
  url: String!
  category: String
  lastFetched: AWSDateTime
  articles: [Article] @hasMany(fields: ["id"], references: ["feedId"])
}

type Article @model {
  id: ID!
  feedId: ID! @index(name: "byFeed")
  title: String!
  content: String
  link: String!
  pubDate: AWSDateTime!
  fetchDate: AWSDateTime!
  status: ArticleStatus!
}

enum ArticleStatus {
  NORMAL
  FAVORITE
}

type Query {
  getArticlesByStatus(status: ArticleStatus!, limit: Int): [Article]
  getArticlesBySource(feedId: ID!, limit: Int): [Article]
}

type Mutation {
  importOPML(opmlContent: String!): Boolean
  fetchRSSUpdates: Boolean
  setArticleStatus(articleId: ID!, status: ArticleStatus!): Article
}
```

## Lambda Functions

1. **RSS Fetcher Lambda**:
   - Triggered on a schedule (CloudWatch Events)
   - Fetches updates from all feeds in the Feeds table
   - Parses RSS content and adds new articles to the Articles table
   - Updates the `lastFetched` timestamp in the Feeds table
   - Calls the `fetchRSSUpdates` mutation

2. **OPML Importer Lambda**:
   - Triggered by the `importOPML` mutation
   - Parses OPML file content
   - Adds new feeds to the Feeds table

## Implementation Flow

1. **RSS Update Process**:
   ```
   CloudWatch Event (scheduled) → RSS Fetcher Lambda → 
   Fetch RSS feeds → Parse articles → 
   Store in DynamoDB → AppSync resolvers → Client updates
   ```

2. **User Interaction Flow**:
   ```
   User action → GraphQL query/mutation → 
   AppSync resolver → DynamoDB operation → 
   Response to client
   ```

## Amplify Setup

You would use Amplify CLI to set up the project:

```bash
# Initialize Amplify project
amplify init

# Add API (AppSync + DynamoDB)
amplify add api

# Add Lambda functions
amplify add function

# Deploy resources
amplify push
```

## Lambda for RSS Fetching

Here's a sketch of what your RSS fetcher Lambda might look like:

```javascript
const AWS = require('aws-sdk');
const Parser = require('rss-parser');
const { v4: uuidv4 } = require('uuid');

const parser = new Parser();
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Get all feeds from DynamoDB
    const feedsResult = await documentClient.scan({
      TableName: process.env.FEEDS_TABLE
    }).promise();
    
    const feeds = feedsResult.Items;
    
    for (const feed of feeds) {
      try {
        // Fetch and parse RSS feed
        const feedContent = await parser.parseURL(feed.url);
        
        // Process each article
        for (const item of feedContent.items) {
          // Check if article already exists
          const existingArticles = await documentClient.query({
            TableName: process.env.ARTICLES_TABLE,
            IndexName: 'byLink',
            KeyConditionExpression: 'link = :link',
            ExpressionAttributeValues: {
              ':link': item.link
            }
          }).promise();
          
          if (existingArticles.Items.length === 0) {
            // Add new article
            await documentClient.put({
              TableName: process.env.ARTICLES_TABLE,
              Item: {
                id: uuidv4(),
                feedId: feed.id,
                title: item.title,
                content: item.content || item.contentSnippet || '',
                link: item.link,
                pubDate: item.isoDate || new Date().toISOString(),
                fetchDate: new Date().toISOString(),
                status: 'NORMAL'
              }
            }).promise();
          }
        }
        
        // Update lastFetched timestamp
        await documentClient.update({
          TableName: process.env.FEEDS_TABLE,
          Key: { id: feed.id },
          UpdateExpression: 'set lastFetched = :now',
          ExpressionAttributeValues: {
            ':now': new Date().toISOString()
          }
        }).promise();
        
      } catch (feedError) {
        console.error(`Error processing feed ${feed.url}:`, feedError);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error in RSS fetcher:', error);
    return { success: false, error: error.message };
  }
};
```

## Alignment with Serverless News Feed Design

This prototype design aligns with the serverless architecture outlined in the design document:

1. It uses DynamoDB for the data layer instead of MySQL
2. It implements GraphQL API through AppSync
3. It uses Lambda functions for processing RSS feeds
4. It follows a similar data model with feeds and articles
5. It supports the core features of the MCP RSS project

The main difference is that this prototype leverages AWS Amplify to simplify the setup and deployment process, which is ideal for rapid prototyping and development.

## Next Steps

1. Set up an Amplify project
2. Define the GraphQL schema
3. Create the DynamoDB tables through Amplify
4. Implement the Lambda functions for RSS fetching
5. Test the API with sample data
6. Integrate with the MCP server
