/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFeed = /* GraphQL */ `
  query GetFeed($id: ID!) {
    getFeed(id: $id) {
      id
      title
      url
      htmlUrl
      category
      feedType
      lastFetched
      isActive
      articles {
        id
        feedId
        title
        content
        abstract
        link
        pubDate
        fetchDate
        author
        status
        feedTitle
        feedCategory
        __typename
      }
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
      htmlUrl
      category
      feedType
      lastFetched
      isActive
      articles {
        id
        feedId
        title
        content
        abstract
        link
        pubDate
        fetchDate
        author
        status
        feedTitle
        feedCategory
        __typename
      }
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
      content
      abstract
      link
      pubDate
      fetchDate
      author
      status
      feedTitle
      feedCategory
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
      content
      abstract
      link
      pubDate
      fetchDate
      author
      status
      feedTitle
      feedCategory
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
      content
      abstract
      link
      pubDate
      fetchDate
      author
      status
      feedTitle
      feedCategory
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
      content
      abstract
      link
      pubDate
      fetchDate
      author
      status
      feedTitle
      feedCategory
      __typename
    }
  }
`;
export const getArticlesByDateRange = /* GraphQL */ `
  query GetArticlesByDateRange(
    $fromDate: AWSDateTime
    $toDate: AWSDateTime
    $limit: Int
    $feedId: ID
    $status: ArticleStatus
  ) {
    getArticlesByDateRange(
      fromDate: $fromDate
      toDate: $toDate
      limit: $limit
      feedId: $feedId
      status: $status
    ) {
      id
      feedId
      title
      content
      abstract
      link
      pubDate
      fetchDate
      author
      status
      feedTitle
      feedCategory
      __typename
    }
  }
`;
export const getArticlesFromLastDays = /* GraphQL */ `
  query GetArticlesFromLastDays(
    $days: Int!
    $limit: Int
    $feedId: ID
    $status: ArticleStatus
  ) {
    getArticlesFromLastDays(
      days: $days
      limit: $limit
      feedId: $feedId
      status: $status
    ) {
      id
      feedId
      title
      content
      abstract
      link
      pubDate
      fetchDate
      author
      status
      feedTitle
      feedCategory
      __typename
    }
  }
`;
