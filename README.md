# Yi Xiao - Personal Academic Homepage

这是一个现代化的个人学术主页，具有响应式设计和动态内容管理。

## 特点

- **现代化设计**: 清洁的绿色主题，专业的排版
- **响应式布局**: 适配各种设备屏幕
- **动态内容**: 通过配置文件管理所有内容
- **BibTeX 支持**: 可显示和复制论文引用
- **平滑动画**: 优雅的页面交互效果

## 文件结构

- `index.html` - 主页面结构
- `styles.css` - 样式表
- `script.js` - JavaScript 功能
- `config.js` - 网站配置数据
- `profile.jpg` - 个人头像
- `README.md` - 说明文档

## 使用方法

### 1. 直接使用
双击 `index.html` 文件即可在浏览器中打开网站。

### 2. 更新内容
只需要编辑 `config.js` 文件中的数据：

```javascript
const siteConfig = {
  "personal": {
    "name": "你的名字",
    "title": "你的职位",
    ...
  },
  "publications": [...],
  "experience": [...],
  ...
};
```

### 3. 支持的内容类型

- **个人信息**: 姓名、职位、邮箱、链接
- **关于**: 自我介绍段落
- **发表论文**: 支持BibTeX引用
- **工作经历**: 实习、工作经验
- **教育背景**: 学历信息
- **学术服务**: 审稿、会议参与
- **获奖情况**: 奖项和荣誉

## 添加新论文

在 `config.js` 的 `publications` 数组中添加新条目：

```javascript
{
  "year": "2025",
  "title": "您的论文标题",
  "authors": "<strong>Yi Xiao</strong>, 合作者姓名",
  "venue": "会议或期刊名称",
  "links": [
    {"name": "PDF", "url": "论文链接"},
    {"name": "Code", "url": "代码链接"}
  ],
  "bibtex": "@inproceedings{citation_key,\n  author = {作者},\n  title = {标题},\n  ...\n}"
}
```

## 自定义主题

要更改主题色彩，编辑 `styles.css` 文件中的 `:root` 变量：

```css
:root {
    --primary-color: #2d5a27;  /* 主色调 */
    --accent-color: #4a7c59;   /* 强调色 */
    --text-color: #333;        /* 文本色 */
    ...
}
```

## 部署

将所有文件上传到你的网站服务器即可。支持：
- GitHub Pages
- Netlify
- Vercel
- 任何静态网站托管服务

## 技术栈

- HTML5
- CSS3 (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript
- Font Awesome 图标
- Google Fonts 字体

## 浏览器兼容性

支持所有现代浏览器：
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
