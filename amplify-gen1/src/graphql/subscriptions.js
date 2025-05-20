/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onNewArticle = /* GraphQL */ `
  subscription OnNewArticle($feedId: ID, $category: String) {
    onNewArticle(feedId: $feedId, category: $category) {
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
export const onStatusChange = /* GraphQL */ `
  subscription OnStatusChange($articleId: ID!) {
    onStatusChange(articleId: $articleId) {
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
