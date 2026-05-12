# 支付页面管理模式与预览模式实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 改造 pay.html 实现管理模式与预览模式，通过 URL 参数切换，支持编辑、图片上传、生成分享链接

**Architecture:** 单文件实现，保留原有 HTML/CSS/JS，新增模式判定、状态管理、渲染逻辑

**Tech Stack:** 原生 JavaScript, HTML, CSS, Fetch API, URLSearchParams

---

## 文件变更清单

| 操作 | 文件 | 说明 |
|------|------|------|
| 修改 | `docs/.vuepress/public/pay.html` | 主文件，完整改造 |

---

## Task 1: 准备工作 - 读取原文件并分析结构

**Files:**
- Read: `docs/.vuepress/public/pay.html`

- [ ] **Step 1: 读取原文件内容**

已在对话开始时读取，确认文件包含:
- HTML 结构: 导航栏、企业信息、加班管理、套餐列表、支付按钮、评分区
- 硬编码内容: "郑焕辉"、"广东纽瑞芯"、base64 图片
- 现有 JS: 套餐选择、评分、支付弹窗、时钟

- [ ] **Step 2: 确定需要动态化的元素位置**

需替换内容:
- 企业名称: `.company-name`
- 头像图片: `.avatar-wrap img`
- 标题中的姓名: `.pay-title`
- 模态框描述: `#modalDesc`

---

## Task 2: 添加模式判定与状态管理框架

**Files:**
- Modify: `docs/.vuepress/public/pay.html` (在 `<script>` 标签最开头添加)

- [ ] **Step 1: 添加状态对象与工具函数**

在现有 `<script>` 标签最开始插入:

```javascript
// 状态管理
const state = {
  name: '',
  company: '',
  image: ''
};

// 默认值（原有内容）
const defaultState = {
  name: '郑焕辉',
  company: '广东纽瑞芯',
  image: 'data:image/jpeg;base64,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'
};

// 从 URL 读取参数
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get('name') || '',
    company: params.get('company') || '',
    image: params.get('image') || ''
  };
}

// 判定当前模式
function getMode() {
  const params = getParams();
  const hasValidParam = params.name || params.company || params.image;
  return hasValidParam ? 'preview' : 'admin';
}
```

- [ ] **Step 2: 保存文件并验证无语法错误**

用浏览器打开 `pay.html`，确认控制台无错误，原有功能正常

- [ ] **Step 3: Commit**

```bash
git add docs/.vuepress/public/pay.html
git commit -m "feat(pay): add state management and mode detection framework"
```

---

## Task 3: 实现预览模式 - 从 URL 参数填充内容

**Files:**
- Modify: `docs/.vuepress/public/pay.html`

- [ ] **Step 1: 添加内容渲染函数**

在 Task 2 添加的代码后面继续添加:

```javascript
// 获取当前生效的值（state 有值用 state，否则用默认值）
function getValue(key) {
  return state[key] || defaultState[key];
}

// 渲染页面内容
function renderContent(container = document) {
  // 渲染公司名称
  const companyEl = container.querySelector('.company-name');
  if (companyEl) companyEl.textContent = getValue('company');

  // 渲染头像
  const avatarImg = container.querySelector('.avatar-wrap img');
  if (avatarImg) {
    avatarImg.src = getValue('image');
    avatarImg.onerror = function() {
      this.style.display = 'none';
      this.parentElement.style.background = '#d9d9d9';
    };
    avatarImg.onload = function() {
      this.style.display = 'block';
      this.parentElement.style.background = 'none';
    };
  }

  // 渲染标题中的姓名
  const payTitle = container.querySelector('.pay-title');
  if (payTitle) payTitle.textContent = `支付加班费，让${getValue('name')}继续工作`;

  // 更新模态框描述（需要修改原有 showPayModal 函数）
  // 这里先保存原有函数引用，后面重写
}

// 更新状态并重新渲染
function updateState(key, value) {
  state[key] = value;
  renderContent();
}
```

- [ ] **Step 2: 修改原有 showPayModal 函数**

找到原有 `showPayModal` 函数并替换为:

```javascript
function showPayModal() {
  var plan = plans[selectedIndex];
  document.getElementById('modalDesc').textContent =
    '您选择了"' + plan.name + '"套餐，' + getValue('name') + '将持续工作至 ' + plan.endTime + '.';
  document.getElementById('modalPrice').textContent = plan.price;
  document.getElementById('payModal').classList.add('show');
}
```

- [ ] **Step 3: 添加页面初始化逻辑**

在所有 JS 代码最后（原 `updateTime(); setInterval...` 之后）添加:

```javascript
// 初始化页面
function init() {
  const mode = getMode();
  const params = getParams();

  if (mode === 'preview') {
    // 预览模式：从 URL 读取参数
    state.name = params.name;
    state.company = params.company;
    state.image = params.image;
    renderContent();
  } else {
    // 管理模式：留待 Task 4 实现
  }
}

// 启动
init();
```

- [ ] **Step 4: 测试预览模式**

在浏览器访问 `pay.html?name=张三&company=某某公司`，确认:
- 公司名称显示为"某某公司"
- 标题显示"支付加班费，让张三继续工作"
- 原有功能正常（套餐选择、支付弹窗等）

- [ ] **Step 5: Commit**

```bash
git add docs/.vuepress/public/pay.html
git commit -m "feat(pay): implement preview mode with URL params"
```

---

## Task 4: 实现管理模式 - 左右分栏布局

**Files:**
- Modify: `docs/.vuepress/public/pay.html`

- [ ] **Step 1: 添加管理模式 CSS**

在 `<style>` 标签最后添加:

```css
/* 管理模式样式 */
.admin-layout {
  display: flex;
  min-height: 100vh;
}
.admin-panel {
  width: 50%;
  min-height: 100vh;
  overflow-y: auto;
}
.admin-edit-panel {
  background: #f5f7fa;
  padding: 24px;
  border-right: 1px solid #e8e8e8;
}
.admin-edit-panel h2 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}
.form-group {
  margin-bottom: 20px;
}
.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}
.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}
.form-input:focus {
  outline: none;
  border-color: #1677ff;
}
.file-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  background: #fff;
  cursor: pointer;
}
.file-upload:hover {
  border-color: #1677ff;
}
.file-upload input {
  display: none;
}
.upload-hint {
  color: #999;
  font-size: 13px;
  margin-top: 8px;
}
.copy-btn {
  width: 100%;
  padding: 12px;
  background: #52c41a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 12px;
  transition: opacity 0.2s;
}
.copy-btn:hover {
  opacity: 0.9;
}
.copy-btn.copied {
  background: #87d068;
}
.upload-status {
  margin-top: 8px;
  font-size: 13px;
  color: #666;
}
.upload-status.error {
  color: #ff4d4f;
}
```

- [ ] **Step 2: 添加管理模式渲染函数**

在 JS 中继续添加:

```javascript
// 保存原始 body HTML（用于预览面板）
let originalBodyHTML = '';

// 渲染管理模式
function renderAdminMode() {
  originalBodyHTML = document.body.innerHTML;

  document.body.innerHTML = `
    <div class="admin-layout">
      <div class="admin-panel admin-edit-panel">
        <h2>管理面板</h2>
        
        <div class="form-group">
          <label class="form-label">姓名</label>
          <input type="text" class="form-input" id="input-name" placeholder="请输入姓名" value="${state.name}">
        </div>
        
        <div class="form-group">
          <label class="form-label">公司名称</label>
          <input type="text" class="form-input" id="input-company" placeholder="请输入公司名称" value="${state.company}">
        </div>
        
        <div class="form-group">
          <label class="form-label">图片上传</label>
          <div class="file-upload" id="upload-area">
            <span style="color: #1677ff; font-weight: 500;">点击选择图片</span>
            <input type="file" id="input-image" accept="image/*">
            <div class="upload-hint">支持 jpg、png、gif 格式</div>
            <div class="upload-status" id="upload-status"></div>
          </div>
        </div>
        
        <button class="copy-btn" id="copy-btn">复制链接</button>
      </div>
      
      <div class="admin-panel admin-preview-panel" id="preview-panel">
        ${originalBodyHTML}
      </div>
    </div>
  `;

  // 绑定事件
  bindAdminEvents();

  // 在预览面板中渲染内容
  const previewPanel = document.getElementById('preview-panel');
  renderContent(previewPanel);
}

// 绑定管理模式事件
function bindAdminEvents() {
  // 姓名输入
  const inputName = document.getElementById('input-name');
  inputName.addEventListener('input', (e) => {
    updateState('name', e.target.value);
    updatePreview();
  });

  // 公司输入
  const inputCompany = document.getElementById('input-company');
  inputCompany.addEventListener('input', (e) => {
    updateState('company', e.target.value);
    updatePreview();
  });

  // 图片上传
  const uploadArea = document.getElementById('upload-area');
  const inputImage = document.getElementById('input-image');
  uploadArea.addEventListener('click', () => inputImage.click());
  inputImage.addEventListener('change', handleImageUpload);

  // 复制链接
  const copyBtn = document.getElementById('copy-btn');
  copyBtn.addEventListener('click', handleCopyLink);
}

// 更新预览面板
function updatePreview() {
  const previewPanel = document.getElementById('preview-panel');
  if (!previewPanel) return;

  // 重新填充内容
  renderContent(previewPanel);
}
```

- [ ] **Step 3: 修改 init 函数中的管理模式分支**

找到 `init` 函数并修改:

```javascript
// 初始化页面
function init() {
  const mode = getMode();
  const params = getParams();

  if (mode === 'preview') {
    // 预览模式：从 URL 读取参数
    state.name = params.name;
    state.company = params.company;
    state.image = params.image;
    renderContent();
  } else {
    // 管理模式
    renderAdminMode();
  }
}
```

- [ ] **Step 4: 测试管理模式布局**

访问 `pay.html`（无参数），确认:
- 显示左右分栏
- 左侧有姓名、公司、上传控件
- 右侧显示完整支付页面

- [ ] **Step 5: Commit**

```bash
git add docs/.vuepress/public/pay.html
git commit -m "feat(pay): implement admin mode layout"
```

---

## Task 5: 实现图片上传功能

**Files:**
- Modify: `docs/.vuepress/public/pay.html`

- [ ] **Step 1: 添加图片上传处理函数**

在 JS 中继续添加:

```javascript
// 处理图片上传
async function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const statusEl = document.getElementById('upload-status');
  statusEl.textContent = '上传中...';
  statusEl.className = 'upload-status';

  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://img.scdn.io/api/v1.php', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('上传失败: ' + response.status);
    }

    // 尝试解析响应
    let imageUrl = '';
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      imageUrl = json.url || json;
    } catch {
      // 不是 JSON，直接使用响应文本
      imageUrl = text;
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('无法解析图片 URL');
    }

    // 更新状态
    updateState('image', imageUrl);
    updatePreview();

    statusEl.textContent = '上传成功';
    statusEl.className = 'upload-status';
  } catch (err) {
    console.error('Upload error:', err);
    statusEl.textContent = '上传失败: ' + err.message;
    statusEl.className = 'upload-status error';
    alert('图片上传失败: ' + err.message);
  }
}
```

- [ ] **Step 2: 测试图片上传**

访问 `pay.html`，选择图片上传，确认:
- 显示"上传中..."
- 成功后显示"上传成功"
- 右侧预览显示新图片

- [ ] **Step 3: Commit**

```bash
git add docs/.vuepress/public/pay.html
git commit -m "feat(pay): implement image upload"
```

---

## Task 6: 实现复制链接功能

**Files:**
- Modify: `docs/.vuepress/public/pay.html`

- [ ] **Step 1: 添加复制链接处理函数**

在 JS 中继续添加:

```javascript
// 处理复制链接
async function handleCopyLink() {
  const params = new URLSearchParams();
  if (state.name) params.set('name', state.name);
  if (state.company) params.set('company', state.company);
  if (state.image) params.set('image', state.image);

  const baseUrl = window.location.origin + window.location.pathname;
  const url = params.toString() ? baseUrl + '?' + params.toString() : baseUrl;

  const copyBtn = document.getElementById('copy-btn');
  const originalText = copyBtn.textContent;

  try {
    await navigator.clipboard.writeText(url);
    copyBtn.textContent = '已复制';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.classList.remove('copied');
    }, 2000);
  } catch (err) {
    // 剪贴板不可用，降级到 prompt
    window.prompt('请手动复制链接:', url);
  }
}
```

- [ ] **Step 2: 测试复制链接**

访问 `pay.html`，输入内容后点击"复制链接"，确认:
- 按钮变为"已复制"
- 2秒后恢复
- 粘贴链接包含正确参数

- [ ] **Step 3: Commit**

```bash
git add docs/.vuepress/public/pay.html
git commit -m "feat(pay): implement copy link function"
```

---

## Task 7: 最终测试与回归验证

**Files:**
- No changes

- [ ] **Step 1: 完整测试管理模式**

访问 `pay.html`:
- 输入姓名: "张三" → 右侧实时更新
- 输入公司: "ABC公司" → 右侧实时更新
- 上传图片 → 右侧显示新图片
- 点击复制 → URL 正确
- 套餐选择、评分、支付弹窗正常

- [ ] **Step 2: 完整测试预览模式**

访问刚才复制的链接:
- 显示正确的姓名、公司、图片
- 套餐选择、评分、支付弹窗正常
- 支付弹窗描述包含正确姓名

- [ ] **Step 3: 测试默认值回退**

访问 `pay.html?name=李四`，确认未提供的字段使用默认值

- [ ] **Step 4: 测试边界情况**
  - 图片加载失败 → 显示灰色占位
  - 无参数访问 → 管理模式
  - 空参数访问 (`?name=`) → 管理模式

---

## 验收标准回顾

- [x] 1. 无参数访问 → 显示管理模式（左右分栏）
- [x] 2. 输入姓名/公司 → 右侧实时更新
- [x] 3. 上传图片 → 上传成功后预览显示
- [x] 4. 点击复制 → URL 包含当前非空参数
- [x] 5. 访问带参数 URL → 显示预览模式（仅支付页面）
- [x] 6. 预览模式功能完整（套餐选择、支付等）
- [x] 7. 原有功能无回归
