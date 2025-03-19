import { AppDataSource } from '../config/database';
import { Article, ArticleStatus } from '../entities/Article';

interface ContentResponse {
  articles: {
    id: number;
    title: string;
    content: string;
    link: string;
    pubDate: string;
    fetchDate: string;
    status: string;
    feedTitle: string;
    feedCategory: string;
  }[];
  success: boolean;
  message?: string;
}

interface TagResponse {
  success: boolean;
  message?: string;
}

export class McpService {
  /**
   * 获取文章内容
   * @param status 文章状态过滤（可选）
   * @param limit 返回文章数量
   * @returns 文章列表
   */
  async get_content(status?: ArticleStatus, limit: number = 10): Promise<ContentResponse> {
    try {
      const articleRepository = AppDataSource.getRepository(Article);
      
      // 构建查询
      const queryBuilder = articleRepository.createQueryBuilder('article')
        .leftJoinAndSelect('article.feed', 'feed')
        .orderBy('article.fetchDate', 'DESC')
        .take(limit);
      
      // 如果指定了状态，添加状态过滤
      if (status) {
        queryBuilder.where('article.status = :status', { status });
      }
      
      const articles = await queryBuilder.getMany();
      
      // 将获取的文章标记为已读
      for (const article of articles) {
        if (article.status === ArticleStatus.UNREAD) {
          article.status = ArticleStatus.READ;
          await articleRepository.save(article);
        }
      }
      
      // 格式化返回数据
      const formattedArticles = articles.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        link: article.link,
        pubDate: article.pubDate,
        fetchDate: article.fetchDate,
        status: article.status,
        feedTitle: article.feed?.title || '',
        feedCategory: article.feed?.category || ''
      }));
      
      return {
        articles: formattedArticles,
        success: true
      };
    } catch (error) {
      // console.error('获取文章内容失败:', error);
      return {
        articles: [],
        success: false,
        message: `获取文章失败: ${error instanceof Error ? error.message : '未知错误'}`
      };
    }
  }
  
  /**
   * 设置文章标签（状态）
   * @param articleId 文章ID
   * @param status 新状态
   * @returns 操作结果
   */
  async set_tag(articleId: number, status: ArticleStatus): Promise<TagResponse> {
    try {
      const articleRepository = AppDataSource.getRepository(Article);
      
      // 查找文章
      const article = await articleRepository.findOne({
        where: { id: articleId }
      });
      
      if (!article) {
        return {
          success: false,
          message: `文章ID ${articleId} 不存在`
        };
      }
      
      // 更新状态
      article.status = status;
      await articleRepository.save(article);
      
      return {
        success: true,
        message: `文章 ${articleId} 状态已更新为 ${status}`
      };
    } catch (error) {
      // console.error('设置文章状态失败:', error);
      return {
        success: false,
        message: `设置文章状态失败: ${error instanceof Error ? error.message : '未知错误'}`
      };
    }
  }
}