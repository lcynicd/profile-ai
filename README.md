# 合规 × AI 个人主页

一份对外公开、完全脱敏的个人作品集主页。

## 文件说明

```
personal-site/
├── index.html      ← 主页结构 + 顶部嵌入「可编辑文字」JSON 块
├── style.css       ← 所有样式
├── script.js       ← 交互逻辑（内容加载 / 时间线 / Tab / 滚动渐入）
├── robots.txt      ← 禁止搜索引擎收录
└── README.md       ← 本文件
```

## 本地预览

最简单：双击 `index.html` 用浏览器打开。

## 修改文字内容（推荐方式）

打开 `index.html`，文件最顶部有一段醒目的 JSON 块：

```html
<script id="site-content" type="application/json">
{
  "hero": { ... },
  "about": { ... },
  "writing": { ... },
  "footer": { ... }
}
</script>
```

直接改对应字段的字符串，保存后**刷新浏览器**即可。**不需要懂 HTML**。

支持改的内容：
- **hero**：首屏标题、副标题、两个按钮文字
- **about**：关于站点的标签、标题、正文
- **writing**：文章区标签、标题、文章卡片列表（标题 / 元信息 / 摘要 / 链接 / CTA 文字）
- **footer**：版权、注释

> 提示：副标题 / 正文里的 `<br>` 表示换行；引号 `"` 在 JSON 里要写成 `\"`。

## 修改其他内容（项目阶段、Skill 三视图、方法论卡片等）

这部分仍写在 `index.html` 的 HTML 中。每个模块上方有醒目注释（如 `<!-- ============ Project 区 -->`）方便定位。

### 改颜色
打开 `style.css`，主色 `#2B59D3`（深蓝）是全站点缀色，可全局替换。

### 增加文章
找到 `index.html` 顶部 `site-content` JSON 里的 `"articles"` 数组，复制一个对象添加。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个公开仓库（推荐用匿名账号）
2. 将本目录所有文件上传到仓库根目录
3. 在仓库 Settings → Pages → Source 选择 `main` 分支
4. 等 1~2 分钟，访问 `用户名.github.io/仓库名/`

## 隐私设置

- `<meta name="robots" content="noindex, nofollow">` 已在 HTML 头部
- `robots.txt` 同时禁止所有爬虫
- 不放任何个人信息（姓名、头像、联系方式）
- 不出现真实公司名 / 产品名 / 监管机构名
