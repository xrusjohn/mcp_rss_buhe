// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ArticleStatus = {
  "NORMAL": "NORMAL",
  "FAVORITE": "FAVORITE"
};

const { Feed, Article } = initSchema(schema);

export {
  ArticleStatus,
  Feed,
  Article
};