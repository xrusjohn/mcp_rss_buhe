import { DataSource } from 'typeorm';
import { Feed } from '../entities/Feed';
import { Article } from '../entities/Article';
import path from 'path';
import os from 'os';

// 创建数据库连接
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(os.homedir(), '.mcp_rss.sqlite'),
  entities: [Feed, Article],
  synchronize: true,
  logging: false
});

// 初始化数据库连接
export async function initDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    // console.log('数据库连接已初始化');
  } catch (error) {
    console.error('数据库连接失败:', error);
    process.exit(1);
  }
};