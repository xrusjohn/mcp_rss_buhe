import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum ArticleStatus {
  NORMAL = "NORMAL",
  FAVORITE = "FAVORITE"
}

export enum FeedType {
  RSS = "RSS",
  ATOM = "ATOM",
  JSON_FEED = "JSON_FEED",
  CUSTOM_API = "CUSTOM_API",
  HTML = "HTML"
}

type EagerFeed = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly htmlUrl?: string | null;
  readonly category?: string | null;
  readonly feedType?: FeedType | keyof typeof FeedType | null;
  readonly lastFetched?: string | null;
  readonly isActive?: boolean | null;
  readonly articles?: (Article | null)[] | null;
}

type LazyFeed = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly htmlUrl?: string | null;
  readonly category?: string | null;
  readonly feedType?: FeedType | keyof typeof FeedType | null;
  readonly lastFetched?: string | null;
  readonly isActive?: boolean | null;
  readonly articles?: (Article | null)[] | null;
}

export declare type Feed = LazyLoading extends LazyLoadingDisabled ? EagerFeed : LazyFeed

export declare const Feed: (new (init: ModelInit<Feed>) => Feed)

type EagerArticle = {
  readonly id: string;
  readonly feedId: string;
  readonly title: string;
  readonly content?: string | null;
  readonly abstract?: string | null;
  readonly link: string;
  readonly pubDate: string;
  readonly fetchDate: string;
  readonly author?: string | null;
  readonly status: ArticleStatus | keyof typeof ArticleStatus;
  readonly feedTitle?: string | null;
  readonly feedCategory?: string | null;
}

type LazyArticle = {
  readonly id: string;
  readonly feedId: string;
  readonly title: string;
  readonly content?: string | null;
  readonly abstract?: string | null;
  readonly link: string;
  readonly pubDate: string;
  readonly fetchDate: string;
  readonly author?: string | null;
  readonly status: ArticleStatus | keyof typeof ArticleStatus;
  readonly feedTitle?: string | null;
  readonly feedCategory?: string | null;
}

export declare type Article = LazyLoading extends LazyLoadingDisabled ? EagerArticle : LazyArticle

export declare const Article: (new (init: ModelInit<Article>) => Article)

type EagerUpdateResponse = {
  readonly success: boolean;
  readonly message?: string | null;
}

type LazyUpdateResponse = {
  readonly success: boolean;
  readonly message?: string | null;
}

export declare type UpdateResponse = LazyLoading extends LazyLoadingDisabled ? EagerUpdateResponse : LazyUpdateResponse

export declare const UpdateResponse: (new (init: ModelInit<UpdateResponse>) => UpdateResponse)

type EagerSubscriptionResponse = {
  readonly success: boolean;
  readonly subscriptionArn?: string | null;
  readonly message?: string | null;
}

type LazySubscriptionResponse = {
  readonly success: boolean;
  readonly subscriptionArn?: string | null;
  readonly message?: string | null;
}

export declare type SubscriptionResponse = LazyLoading extends LazyLoadingDisabled ? EagerSubscriptionResponse : LazySubscriptionResponse

export declare const SubscriptionResponse: (new (init: ModelInit<SubscriptionResponse>) => SubscriptionResponse)

