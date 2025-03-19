#!/usr/bin/env node

import 'reflect-metadata';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { initDatabase } from './config/database';
import { OpmlService } from './services/OpmlService';
import { RssService } from './services/RssService';

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

const server = new Server(
  {
    name: "rss_mcp",
    version: "1.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);


// 加载环境变量
dotenv.config();

// 获取环境变量
const opmlFilePath = process.env.OPML_FILE_PATH || './feeds.opml';
const updateInterval = process.env.RSS_UPDATE_INTERVAL || '5';

// 初始化服务
const opmlService = new OpmlService();
const rssService = new RssService();

    

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query",
        description: "Run a read-only SQL query",
        inputSchema: {
          type: "object",
          properties: {
            sql: { type: "string" },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "query") {}
  throw new Error(`Unknown tool: ${request.params.name}`);
});
// console.log('MCP 启动成功')



  async function runServer() {
    try {
      
      // 设置定时任务，定期获取RSS更新
      const cronExpression = `*/${updateInterval} * * * *`; // 每X分钟执行一次
      // console.log(`设置定时任务: ${cronExpression}`);
      
      cron.schedule(cronExpression, async () => {
        // console.log(`定时任务执行: ${new Date().toISOString()}`);
        // 初始化数据库
        await initDatabase();
      // console.log('数据库初始化成功');
      
      // 解析OPML文件并保存订阅源
        await opmlService.parseAndSaveFeeds(opmlFilePath);
        await rssService.fetchAllFeeds();
      });
    } catch (error) {
      // console.error('服务启动失败:', error);
      process.exit(1);
    }
    const transport = new StdioServerTransport();
    await server.connect(transport);
  }
  
  runServer().catch(console.error);