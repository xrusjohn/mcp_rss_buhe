/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addFeed = /* GraphQL */ `
  mutation AddFeed(
    $title: String!
    $url: String!
    $htmlUrl: String
    $category: String
    $feedType: FeedType
    $parserConfig: AWSJSON
  ) {
    addFeed(
      title: $title
      url: $url
      htmlUrl: $htmlUrl
      category: $category
      feedType: $feedType
      parserConfig: $parserConfig
    ) {
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
export const updateFeed = /* GraphQL */ `
  mutation UpdateFeed(
    $id: ID!
    $title: String
    $url: String
    $htmlUrl: String
    $category: String
    $feedType: FeedType
    $parserConfig: AWSJSON
    $isActive: Boolean
  ) {
    updateFeed(
      id: $id
      title: $title
      url: $url
      htmlUrl: $htmlUrl
      category: $category
      feedType: $feedType
      parserConfig: $parserConfig
      isActive: $isActive
    ) {
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
export const deleteFeed = /* GraphQL */ `
  mutation DeleteFeed($id: ID!) {
    deleteFeed(id: $id) {
      success
      message
      __typename
    }
  }
`;
export const updateArticleStatus = /* GraphQL */ `
  mutation UpdateArticleStatus($id: ID!, $status: ArticleStatus!) {
    updateArticleStatus(id: $id, status: $status) {
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
export const subscribeToNotifications = /* GraphQL */ `
  mutation SubscribeToNotifications($endpoint: String!, $protocol: String!) {
    subscribeToNotifications(endpoint: $endpoint, protocol: $protocol) {
      success
      subscriptionArn
      message
      __typename
    }
  }
`;
export const unsubscribeFromNotifications = /* GraphQL */ `
  mutation UnsubscribeFromNotifications($subscriptionArn: String!) {
    unsubscribeFromNotifications(subscriptionArn: $subscriptionArn) {
      success
      message
      __typename
    }
  }
`;
