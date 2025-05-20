import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum ArticleStatus {
  NORMAL = "NORMAL",
  FAVORITE = "FAVORITE"
}

type EagerFeed = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly category?: string | null;
  readonly lastFetched?: string | null;
}

type LazyFeed = {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly category?: string | null;
  readonly lastFetched?: string | null;
}

export declare type Feed = LazyLoading extends LazyLoadingDisabled ? EagerFeed : LazyFeed

export declare const Feed: (new (init: ModelInit<Feed>) => Feed)

type EagerArticle = {
  readonly id: string;
  readonly feedId: string;
  readonly title: string;
  readonly abstract?: string | null;
  readonly link: string;
  readonly pubDate: string;
  readonly fetchDate: string;
  readonly status: string;
  readonly author?: string | null;
  readonly feedTitle?: string | null;
}

type LazyArticle = {
  readonly id: string;
  readonly feedId: string;
  readonly title: string;
  readonly abstract?: string | null;
  readonly link: string;
  readonly pubDate: string;
  readonly fetchDate: string;
  readonly status: string;
  readonly author?: string | null;
  readonly feedTitle?: string | null;
}

export declare type Article = LazyLoading extends LazyLoadingDisabled ? EagerArticle : LazyArticle

export declare const Article: (new (init: ModelInit<Article>) => Article)

