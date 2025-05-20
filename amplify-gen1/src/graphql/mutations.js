/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addFeed = /* GraphQL */ `
  mutation AddFeed($title: String!, $url: String!, $category: String) {
    addFeed(title: $title, url: $url, category: $category) {
      id
      title
      url
      category
      lastFetched
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
