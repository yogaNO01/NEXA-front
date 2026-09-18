# NEXA React 前端

## 启动

```bash
npm install
npm run dev
```

## 当前结构

- `src/App.jsx`：路由、布局和行业详情统一模板。
- `src/data/solutions.js`：临时解决方案内容模型。
- `src/api/solutions.js`：公开解决方案接口的前端适配层；后端接入时替换其 mock 实现。

预留接口：`/api/public/solutions/navigation`、`/api/public/solutions?limit=8`、`/api/public/solutions`、`/api/public/solutions/{slug}`、`POST /api/leads`、`POST /api/tickets`。

## 对接 Python 后端

复制 `.env.example` 为 `.env.local`：

```bash
VITE_API_BASE_URL=auto
```

`auto` 会根据浏览器当前地址自动选择接口主机：本机访问 `http://localhost:5175` 时请求 `http://localhost:8000`，局域网访问 `http://192.168.5.56:5175` 时请求 `http://192.168.5.56:8000`。如前后端部署在不同主机，可改为完整接口地址。

## 运营后台

配置 API 后访问 `#/admin`。后台只包含方案二级标题、行业方案、新闻分类与新闻、案例、帮助分类与帮助文章，以及线索/工单只读列表；页面结构、固定栏目和表单字段不在后台编辑。
