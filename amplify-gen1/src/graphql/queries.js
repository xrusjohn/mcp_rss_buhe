/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFeed = /* GraphQL */ `
  query GetFeed($id: ID!) {
    getFeed(id: $id) {
      id
      title
      url
      category
      lastFetched
      __typename
    }
  }
`;
export const listFeeds = /* GraphQL */ `
  query ListFeeds {
    listFeeds {
      id
      title
      url
      category
      lastFetched
      __typename
    }
  }
`;
export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
      id
      feedId
      title
      abstract
      link
      pubDate
      fetchDate
      status
      author
      feedTitle
      __typename
    }
  }
`;
export const getArticlesByFeed = /* GraphQL */ `
  query GetArticlesByFeed($feedId: ID!, $limit: Int) {
    getArticlesByFeed(feedId: $feedId, limit: $limit) {
      id
      feedId
      title
      abstract
      link
      pubDate
      fetchDate
      status
      author
      feedTitle
      __typename
    }
  }
`;
export const getArticlesByStatus = /* GraphQL */ `
  query GetArticlesByStatus($status: ArticleStatus!, $limit: Int) {
    getArticlesByStatus(status: $status, limit: $limit) {
      id
      feedId
      title
      abstract
      link
      pubDate
      fetchDate
      status
      author
      feedTitle
      __typename
    }
  }
`;
export const getRecentArticles = /* GraphQL */ `
  query GetRecentArticles($limit: Int) {
    getRecentArticles(limit: $limit) {
      id
      feedId
      title
      abstract
      link
      pubDate
      fetchDate
      status
      author
      feedTitle
      __typename
    }
  }
`;
