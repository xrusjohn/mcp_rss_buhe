// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ArticleStatus = {
  "NORMAL": "NORMAL",
  "FAVORITE": "FAVORITE"
};

const FeedType = {
  "RSS": "RSS",
  "ATOM": "ATOM",
  "JSON_FEED": "JSON_FEED",
  "CUSTOM_API": "CUSTOM_API",
  "HTML": "HTML"
};

const { Feed, Article, UpdateResponse, SubscriptionResponse } = initSchema(schema);

export {
  ArticleStatus,
  FeedType,
  Feed,
  Article,
  UpdateResponse,
  SubscriptionResponse
};