import { AppDataSource } from '../config/database';
import { Article, ArticleStatus } from '../entities/Article';
import { Feed } from '../entities/Feed';

async function testArticleStorage() {
  try {
    // 初始化数据库连接
    await AppDataSource.initialize();
    
    const articleRepository = AppDataSource.getRepository(Article);
    const feedRepository = AppDataSource.getRepository(Feed);
    
    // 创建测试用的Feed
    const testFeed = new Feed();
    testFeed.title = '测试Feed';
    testFeed.url = 'http://test.feed/rss';
    testFeed.htmlUrl = 'http://test.feed';
    testFeed.category = '测试分类';
    await feedRepository.save(testFeed);
    
    // 创建测试文章
    const testArticle = new Article();
    testArticle.title = '测试文章标题';
    testArticle.content = '这是测试文章的内容';
    testArticle.link = 'http://test.feed/article/1';
    testArticle.pubDate = new Date().toISOString();
    testArticle.fetchDate = new Date().toISOString();
    testArticle.status = ArticleStatus.UNREAD;
    testArticle.feed = testFeed;
    
    // 保存文章
    await articleRepository.save(testArticle);
    console.log('测试文章已保存');
    
    // 从数据库中查询文章
    const savedArticle = await articleRepository.findOne({
      where: { id: testArticle.id },
      relations: ['feed']
    });
    
    if (!savedArticle) {
      throw new Error('未找到保存的文章');
    }
    
    // 验证文章字段
    console.log('验证文章字段：');
    console.log(`标题: ${savedArticle.title === testArticle.title ? '✓' : '✗'}`);
    console.log(`内容: ${savedArticle.content === testArticle.content ? '✓' : '✗'}`);
    console.log(`链接: ${savedArticle.link === testArticle.link ? '✓' : '✗'}`);
    console.log(`发布日期: ${savedArticle.pubDate === testArticle.pubDate ? '✓' : '✗'}`);
    console.log(`抓取日期: ${savedArticle.fetchDate === testArticle.fetchDate ? '✓' : '✗'}`);
    console.log(`状态: ${savedArticle.status === ArticleStatus.UNREAD ? '✓' : '✗'}`);
    console.log(`关联Feed: ${savedArticle.feed.title === testFeed.title ? '✓' : '✗'}`);
    
    // 测试文章状态更新
    savedArticle.status = ArticleStatus.READ;
    await articleRepository.save(savedArticle);
    
    const updatedArticle = await articleRepository.findOne({
      where: { id: testArticle.id }
    });
    
    console.log('\n测试文章状态更新：');
    console.log(`新状态: ${updatedArticle?.status === ArticleStatus.READ ? '✓' : '✗'}`);
    
    // 清理测试数据
    await articleRepository.remove(savedArticle);
    await feedRepository.remove(testFeed);
    console.log('\n测试数据已清理');
    
  } catch (error) {
    console.error('测试失败:', error);
  } finally {
    // 关闭数据库连接
    await AppDataSource.destroy();
  }
}

// 运行测试
testArticleStorage().then(() => {
  console.log('测试完成');
});