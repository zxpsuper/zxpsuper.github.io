# GPU 天梯图实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个现代化的 GPU 天梯图页面，包含数据爬取、搜索筛选、对比功能、历史版本和性能基准展示，保存到 docs/.vuepress/public/gpu-ladder/ 目录下。

**Architecture:** 纯 HTML/CSS/JavaScript 单页面应用，数据与视图分离，通过 JSON 文件管理 GPU 数据。不依赖构建工具，直接可在浏览器运行。

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+)

---

## 文件结构

```
docs/.vuepress/public/
└── gpu-ladder/
    ├── index.html          # 主页面 HTML
    ├── styles.css          # 样式文件
    ├── app.js              # 应用逻辑
    └── data/
        └── gpu-data.json   # GPU 数据
```

---

### Task 1: 创建项目目录和 HTML 骨架

**Files:**
- Create: `docs/.vuepress/public/gpu-ladder/index.html`

- [ ] **Step 1: 创建目录和 HTML 基础结构**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GPU 天梯图 - 小皮咖</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- 顶部导航栏 -->
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <span class="logo-icon">🎮</span>
                <span class="logo-text">GPU 天梯图</span>
                <span class="version-badge" id="versionBadge">2026-05</span>
            </div>
            <div class="header-actions">
                <div class="search-box">
                    <input type="text" id="searchInput" placeholder="搜索显卡型号...">
                    <span class="search-icon">🔍</span>
                </div>
                <select class="version-select" id="versionSelect">
                    <option value="current">当前版本</option>
                </select>
            </div>
        </div>
    </header>

    <!-- 主内容区 -->
    <div class="main-container">
        <!-- 侧边栏 -->
        <aside class="sidebar" id="sidebar">
            <button class="sidebar-close" id="sidebarClose">✕</button>
            
            <div class="filter-section">
                <h3 class="filter-title">品牌</h3>
                <div class="filter-options">
                    <label class="filter-option">
                        <input type="checkbox" value="NVIDIA" checked>
                        <span>NVIDIA</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="AMD" checked>
                        <span>AMD</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="Intel" checked>
                        <span>Intel</span>
                    </label>
                </div>
            </div>

            <div class="filter-section">
                <h3 class="filter-title">价格范围</h3>
                <div class="filter-options">
                    <label class="filter-option">
                        <input type="checkbox" value="0-1000">
                        <span>¥0-1000</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="1000-2000" checked>
                        <span>¥1000-2000</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="2000-4000" checked>
                        <span>¥2000-4000</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="4000-8000" checked>
                        <span>¥4000-8000</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="8000+" checked>
                        <span>¥8000+</span>
                    </label>
                </div>
            </div>

            <div class="filter-section">
                <h3 class="filter-title">性能层级</h3>
                <div class="filter-options">
                    <label class="filter-option">
                        <input type="checkbox" value="flagship" checked>
                        <span class="tier-badge tier-flagship">旗舰级</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="high-end" checked>
                        <span class="tier-badge tier-high-end">高端级</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="mid-range" checked>
                        <span class="tier-badge tier-mid-range">中等级</span>
                    </label>
                    <label class="filter-option">
                        <input type="checkbox" value="entry-level" checked>
                        <span class="tier-badge tier-entry-level">入门级</span>
                    </label>
                </div>
            </div>
        </aside>

        <!-- 移动端侧边栏开关 -->
        <button class="sidebar-toggle" id="sidebarToggle">☰ 筛选</button>

        <!-- 天梯图主区域 -->
        <main class="ladder-container">
            <div class="performance-scale">
                <div class="scale-mark" style="top: 0%">100%</div>
                <div class="scale-mark" style="top: 25%">75%</div>
                <div class="scale-mark" style="top: 50%">50%</div>
                <div class="scale-mark" style="top: 75%">25%</div>
                <div class="scale-mark" style="top: 100%">0%</div>
            </div>
            <div class="ladder-content" id="ladderContent">
                <!-- GPU 卡片将在这里动态生成 -->
            </div>
        </main>
    </div>

    <!-- 底部对比栏 -->
    <div class="compare-bar" id="compareBar">
        <div class="compare-bar-content">
            <div class="compare-info">
                <span class="compare-count">已选: <strong id="compareCount">0</strong></span>
            </div>
            <div class="compare-items" id="compareItems">
                <!-- 已选显卡将在这里显示 -->
            </div>
            <div class="compare-actions">
                <button class="btn btn-secondary" id="clearCompareBtn">清空</button>
                <button class="btn btn-primary" id="compareBtn">📊 开始对比</button>
            </div>
        </div>
    </div>

    <!-- 对比弹窗 -->
    <div class="modal-overlay" id="compareModal">
        <div class="modal">
            <div class="modal-header">
                <h2>显卡对比</h2>
                <button class="modal-close" id="modalClose">✕</button>
            </div>
            <div class="modal-body" id="modalBody">
                <!-- 对比内容 -->
            </div>
        </div>
    </div>

    <!-- 显卡详情弹窗 -->
    <div class="modal-overlay" id="detailModal">
        <div class="modal modal-large">
            <div class="modal-header">
                <h2 id="detailTitle">显卡详情</h2>
                <button class="modal-close" id="detailModalClose">✕</button>
            </div>
            <div class="modal-body" id="detailModalBody">
                <!-- 详情内容 -->
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 2: 验证文件创建成功**

检查: `docs/.vuepress/public/gpu-ladder/index.html` 存在

- [ ] **Step 3: Commit**

```bash
git add docs/.vuepress/public/gpu-ladder/index.html
git commit -m "feat: add gpu ladder html skeleton"
```

---

### Task 2: 编写 CSS 样式文件

**Files:**
- Create: `docs/.vuepress/public/gpu-ladder/styles.css`

- [ ] **Step 1: 编写 CSS 样式**

```css
/* CSS Reset & Base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --color-bg: #f8f9fa;
    --color-bg-gradient-1: #f8f9fa;
    --color-bg-gradient-2: #e9ecef;
    --color-text-primary: #212529;
    --color-text-secondary: #6c757d;
    --color-border: #dee2e6;
    --color-hover: rgba(0, 0, 0, 0.05);
    
    --color-flagship-1: #9d4edd;
    --color-flagship-2: #7b2cbf;
    --color-high-end-1: #4cc9f0;
    --color-high-end-2: #4361ee;
    --color-mid-range-1: #95d5b2;
    --color-mid-range-2: #40916c;
    --color-entry-level-1: #ffe066;
    --color-entry-level-2: #ffd000;
    
    --radius-card: 12px;
    --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-card-hover: 0 8px 24px rgba(0, 0, 0, 0.12);
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, var(--color-bg-gradient-1), var(--color-bg-gradient-2));
    min-height: 100vh;
    color: var(--color-text-primary);
    padding-bottom: 100px;
}

/* Header */
.header {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    font-size: 28px;
}

.logo-text {
    font-size: 22px;
    font-weight: 700;
}

.version-badge {
    background: linear-gradient(135deg, var(--color-high-end-1), var(--color-high-end-2));
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.search-box {
    position: relative;
}

.search-box input {
    width: 260px;
    padding: 10px 40px 10px 16px;
    border: 2px solid var(--color-border);
    border-radius: 24px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
}

.search-box input:focus {
    border-color: var(--color-high-end-2);
}

.search-icon {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
}

.version-select {
    padding: 10px 16px;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    font-size: 14px;
    background: white;
    cursor: pointer;
}

/* Main Container */
.main-container {
    max-width: 1200px;
    margin: 24px auto;
    padding: 0 20px;
    display: flex;
    gap: 24px;
}

/* Sidebar */
.sidebar {
    width: 280px;
    flex-shrink: 0;
    background: white;
    border-radius: var(--radius-card);
    padding: 20px;
    box-shadow: var(--shadow-card);
    position: sticky;
    top: 100px;
    height: fit-content;
}

.sidebar-close {
    display: none;
}

.sidebar-toggle {
    display: none;
}

.filter-section {
    margin-bottom: 24px;
}

.filter-section:last-child {
    margin-bottom: 0;
}

.filter-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
}

.filter-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.filter-option {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 14px;
}

.filter-option input {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.tier-badge {
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    color: white;
}

.tier-flagship {
    background: linear-gradient(135deg, var(--color-flagship-1), var(--color-flagship-2));
}

.tier-high-end {
    background: linear-gradient(135deg, var(--color-high-end-1), var(--color-high-end-2));
}

.tier-mid-range {
    background: linear-gradient(135deg, var(--color-mid-range-1), var(--color-mid-range-2));
}

.tier-entry-level {
    background: linear-gradient(135deg, var(--color-entry-level-1), var(--color-entry-level-2));
}

/* Ladder Container */
.ladder-container {
    flex: 1;
    position: relative;
}

.performance-scale {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50px;
    border-left: 2px solid var(--color-border);
    pointer-events: none;
}

.scale-mark {
    position: absolute;
    right: 8px;
    transform: translateY(-50%);
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-secondary);
}

.ladder-content {
    padding-right: 60px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* GPU Card */
.gpu-card {
    background: white;
    border-radius: var(--radius-card);
    padding: 20px;
    box-shadow: var(--shadow-card);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.gpu-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
}

.gpu-card.tier-flagship::before {
    background: linear-gradient(180deg, var(--color-flagship-1), var(--color-flagship-2));
}

.gpu-card.tier-high-end::before {
    background: linear-gradient(180deg, var(--color-high-end-1), var(--color-high-end-2));
}

.gpu-card.tier-mid-range::before {
    background: linear-gradient(180deg, var(--color-mid-range-1), var(--color-mid-range-2));
}

.gpu-card.tier-entry-level::before {
    background: linear-gradient(180deg, var(--color-entry-level-1), var(--color-entry-level-2));
}

.gpu-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-card-hover);
}

.gpu-card.selected {
    outline: 3px solid var(--color-high-end-2);
}

.gpu-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
}

.gpu-name {
    font-size: 20px;
    font-weight: 700;
    flex: 1;
}

.gpu-score {
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
}

.gpu-card.tier-flagship .gpu-score {
    color: var(--color-flagship-2);
}

.gpu-card.tier-high-end .gpu-score {
    color: var(--color-high-end-2);
}

.gpu-card.tier-mid-range .gpu-score {
    color: var(--color-mid-range-2);
}

.gpu-card.tier-entry-level .gpu-score {
    color: #b8860b;
}

.gpu-card-meta {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 12px;
}

.gpu-meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: var(--color-text-secondary);
}

.gpu-price {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-mid-range-2);
}

.gpu-card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.btn-add-compare {
    background: linear-gradient(135deg, var(--color-high-end-1), var(--color-high-end-2));
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn-add-compare:hover {
    opacity: 0.9;
}

.btn-add-compare.added {
    background: var(--color-mid-range-2);
}

/* Compare Bar */
.compare-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
    z-index: 200;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.compare-bar.visible {
    transform: translateY(0);
}

.compare-bar-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.compare-info {
    font-size: 14px;
    color: var(--color-text-secondary);
}

.compare-count strong {
    color: var(--color-high-end-2);
}

.compare-items {
    display: flex;
    gap: 10px;
    flex: 1;
    overflow-x: auto;
}

.compare-item {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--color-bg);
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    white-space: nowrap;
}

.compare-item-remove {
    cursor: pointer;
    font-size: 16px;
    color: var(--color-text-secondary);
}

.compare-item-remove:hover {
    color: #dc3545;
}

.compare-actions {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: opacity 0.2s;
}

.btn:hover {
    opacity: 0.9;
}

.btn-primary {
    background: linear-gradient(135deg, var(--color-high-end-1), var(--color-high-end-2));
    color: white;
}

.btn-secondary {
    background: var(--color-border);
    color: var(--color-text-primary);
}

/* Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 300;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow-y: auto;
}

.modal-overlay.visible {
    display: flex;
}

.modal {
    background: white;
    border-radius: 16px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
}

.modal-large {
    max-width: 1000px;
}

.modal-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-header h2 {
    font-size: 22px;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--color-text-secondary);
}

.modal-body {
    padding: 24px;
    overflow-y: auto;
    max-height: calc(90vh - 80px);
}

/* Compare Table */
.compare-table {
    overflow-x: auto;
}

.compare-table table {
    width: 100%;
    border-collapse: collapse;
}

.compare-table th,
.compare-table td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.compare-table th {
    font-weight: 600;
    background: var(--color-bg);
    white-space: nowrap;
}

.compare-table td {
    font-size: 14px;
}

.compare-table .gpu-col {
    font-weight: 600;
    font-size: 15px;
}

/* Detail View */
.detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.detail-section {
    margin-bottom: 24px;
}

.detail-section:last-child {
    margin-bottom: 0;
}

.detail-section h3 {
    font-size: 16px;
    margin-bottom: 12px;
    color: var(--color-text-secondary);
}

.detail-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--color-border);
}

.detail-label {
    color: var(--color-text-secondary);
}

.detail-value {
    font-weight: 600;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--color-text-secondary);
}

.empty-state-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.empty-state-text {
    font-size: 16px;
}

/* Responsive */
@media (max-width: 1024px) {
    .sidebar {
        width: 200px;
    }
}

@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
        align-items: stretch;
    }
    
    .header-actions {
        flex-direction: column;
    }
    
    .search-box input {
        width: 100%;
    }
    
    .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 280px;
        z-index: 250;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    .sidebar.open {
        transform: translateX(0);
    }
    
    .sidebar-close {
        display: block;
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
    }
    
    .sidebar-toggle {
        display: block;
        position: fixed;
        left: 20px;
        bottom: 120px;
        z-index: 150;
        background: linear-gradient(135deg, var(--color-high-end-1), var(--color-high-end-2));
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }
    
    .ladder-container {
        width: 100%;
    }
    
    .performance-scale {
        display: none;
    }
    
    .ladder-content {
        padding-right: 0;
    }
    
    .compare-bar-content {
        flex-direction: column;
        align-items: stretch;
    }
    
    .compare-actions {
        justify-content: flex-end;
    }
    
    .detail-grid {
        grid-template-columns: 1fr;
    }
    
    .sidebar-toggle {
        bottom: 180px;
    }
}
```

- [ ] **Step 2: 验证 CSS 文件创建成功**

检查: `docs/.vuepress/public/gpu-ladder/styles.css` 存在

- [ ] **Step 3: Commit**

```bash
git add docs/.vuepress/public/gpu-ladder/styles.css
git commit -m "feat: add gpu ladder styles"
```

---

### Task 3: 创建示例 GPU 数据 JSON

**Files:**
- Create: `docs/.vuepress/public/gpu-ladder/data/gpu-data.json`

- [ ] **Step 1: 创建示例数据**

```json
{
  "version": "2026-05",
  "lastUpdated": "2026-05-13",
  "source": "https://www.mydrivers.com/zhuanti/tianti/gpu/",
  "gpus": [
    {
      "id": "nvidia-rtx-4090-ti",
      "name": "NVIDIA GeForce RTX 4090 Ti",
      "brand": "NVIDIA",
      "model": "RTX 4090 Ti",
      "performanceScore": 100,
      "tier": "flagship",
      "price": 14999,
      "releaseDate": "2024-01",
      "power": 600,
      "memory": "24GB GDDR6X",
      "benchmarks": {
        "gaming": 100,
        "rendering": 100,
        "aiCompute": 100,
        "games": {
          "Cyberpunk 2077": 100,
          "Alan Wake 2": 100
        }
      }
    },
    {
      "id": "nvidia-rtx-4090",
      "name": "NVIDIA GeForce RTX 4090",
      "brand": "NVIDIA",
      "model": "RTX 4090",
      "performanceScore": 95,
      "tier": "flagship",
      "price": 12999,
      "releaseDate": "2022-10",
      "power": 450,
      "memory": "24GB GDDR6X",
      "benchmarks": {
        "gaming": 95,
        "rendering": 93,
        "aiCompute": 90,
        "games": {
          "Cyberpunk 2077": 95,
          "Alan Wake 2": 94
        }
      }
    },
    {
      "id": "amd-rx-7950-xtx",
      "name": "AMD Radeon RX 7950 XTX",
      "brand": "AMD",
      "model": "RX 7950 XTX",
      "performanceScore": 90,
      "tier": "flagship",
      "price": 9999,
      "releaseDate": "2024-01",
      "power": 355,
      "memory": "24GB GDDR6",
      "benchmarks": {
        "gaming": 90,
        "rendering": 92,
        "aiCompute": 75,
        "games": {
          "Cyberpunk 2077": 88,
          "Alan Wake 2": 92
        }
      }
    },
    {
      "id": "nvidia-rtx-4080-super",
      "name": "NVIDIA GeForce RTX 4080 SUPER",
      "brand": "NVIDIA",
      "model": "RTX 4080 SUPER",
      "performanceScore": 82,
      "tier": "high-end",
      "price": 8499,
      "releaseDate": "2024-01",
      "power": 320,
      "memory": "16GB GDDR6X",
      "benchmarks": {
        "gaming": 82,
        "rendering": 80,
        "aiCompute": 78,
        "games": {
          "Cyberpunk 2077": 82,
          "Alan Wake 2": 81
        }
      }
    },
    {
      "id": "nvidia-rtx-4080",
      "name": "NVIDIA GeForce RTX 4080",
      "brand": "NVIDIA",
      "model": "RTX 4080",
      "performanceScore": 78,
      "tier": "high-end",
      "price": 7999,
      "releaseDate": "2022-11",
      "power": 320,
      "memory": "16GB GDDR6X",
      "benchmarks": {
        "gaming": 78,
        "rendering": 76,
        "aiCompute": 74,
        "games": {
          "Cyberpunk 2077": 78,
          "Alan Wake 2": 77
        }
      }
    },
    {
      "id": "amd-rx-7900-xtx",
      "name": "AMD Radeon RX 7900 XTX",
      "brand": "AMD",
      "model": "RX 7900 XTX",
      "performanceScore": 76,
      "tier": "high-end",
      "price": 7499,
      "releaseDate": "2022-12",
      "power": 355,
      "memory": "24GB GDDR6",
      "benchmarks": {
        "gaming": 76,
        "rendering": 78,
        "aiCompute": 60,
        "games": {
          "Cyberpunk 2077": 74,
          "Alan Wake 2": 78
        }
      }
    },
    {
      "id": "nvidia-rtx-4070-ti-super",
      "name": "NVIDIA GeForce RTX 4070 Ti SUPER",
      "brand": "NVIDIA",
      "model": "RTX 4070 Ti SUPER",
      "performanceScore": 70,
      "tier": "high-end",
      "price": 6499,
      "releaseDate": "2024-01",
      "power": 260,
      "memory": "16GB GDDR6X",
      "benchmarks": {
        "gaming": 70,
        "rendering": 68,
        "aiCompute": 65,
        "games": {
          "Cyberpunk 2077": 70,
          "Alan Wake 2": 69
        }
      }
    },
    {
      "id": "nvidia-rtx-4070-ti",
      "name": "NVIDIA GeForce RTX 4070 Ti",
      "brand": "NVIDIA",
      "model": "RTX 4070 Ti",
      "performanceScore": 66,
      "tier": "high-end",
      "price": 5999,
      "releaseDate": "2023-01",
      "power": 230,
      "memory": "12GB GDDR6X",
      "benchmarks": {
        "gaming": 66,
        "rendering": 64,
        "aiCompute": 62,
        "games": {
          "Cyberpunk 2077": 66,
          "Alan Wake 2": 65
        }
      }
    },
    {
      "id": "amd-rx-7900-xt",
      "name": "AMD Radeon RX 7900 XT",
      "brand": "AMD",
      "model": "RX 7900 XT",
      "performanceScore": 64,
      "tier": "high-end",
      "price": 5499,
      "releaseDate": "2022-12",
      "power": 315,
      "memory": "20GB GDDR6",
      "benchmarks": {
        "gaming": 64,
        "rendering": 66,
        "aiCompute": 52,
        "games": {
          "Cyberpunk 2077": 62,
          "Alan Wake 2": 66
        }
      }
    },
    {
      "id": "nvidia-rtx-4070-super",
      "name": "NVIDIA GeForce RTX 4070 SUPER",
      "brand": "NVIDIA",
      "model": "RTX 4070 SUPER",
      "performanceScore": 58,
      "tier": "mid-range",
      "price": 4899,
      "releaseDate": "2024-01",
      "power": 220,
      "memory": "12GB GDDR6X",
      "benchmarks": {
        "gaming": 58,
        "rendering": 56,
        "aiCompute": 54,
        "games": {
          "Cyberpunk 2077": 58,
          "Alan Wake 2": 57
        }
      }
    },
    {
      "id": "nvidia-rtx-4070",
      "name": "NVIDIA GeForce RTX 4070",
      "brand": "NVIDIA",
      "model": "RTX 4070",
      "performanceScore": 55,
      "tier": "mid-range",
      "price": 4499,
      "releaseDate": "2023-04",
      "power": 200,
      "memory": "12GB GDDR6X",
      "benchmarks": {
        "gaming": 55,
        "rendering": 53,
        "aiCompute": 52,
        "games": {
          "Cyberpunk 2077": 55,
          "Alan Wake 2": 54
        }
      }
    },
    {
      "id": "amd-rx-7800-xt",
      "name": "AMD Radeon RX 7800 XT",
      "brand": "AMD",
      "model": "RX 7800 XT",
      "performanceScore": 52,
      "tier": "mid-range",
      "price": 3799,
      "releaseDate": "2023-09",
      "power": 263,
      "memory": "16GB GDDR6",
      "benchmarks": {
        "gaming": 52,
        "rendering": 54,
        "aiCompute": 40,
        "games": {
          "Cyberpunk 2077": 50,
          "Alan Wake 2": 54
        }
      }
    },
    {
      "id": "nvidia-rtx-4060-ti",
      "name": "NVIDIA GeForce RTX 4060 Ti",
      "brand": "NVIDIA",
      "model": "RTX 4060 Ti",
      "performanceScore": 45,
      "tier": "mid-range",
      "price": 3299,
      "releaseDate": "2023-05",
      "power": 160,
      "memory": "8GB GDDR6",
      "benchmarks": {
        "gaming": 45,
        "rendering": 44,
        "aiCompute": 42,
        "games": {
          "Cyberpunk 2077": 45,
          "Alan Wake 2": 44
        }
      }
    },
    {
      "id": "amd-rx-7700-xt",
      "name": "AMD Radeon RX 7700 XT",
      "brand": "AMD",
      "model": "RX 7700 XT",
      "performanceScore": 42,
      "tier": "mid-range",
      "price": 2999,
      "releaseDate": "2023-09",
      "power": 230,
      "memory": "12GB GDDR6",
      "benchmarks": {
        "gaming": 42,
        "rendering": 43,
        "aiCompute": 34,
        "games": {
          "Cyberpunk 2077": 40,
          "Alan Wake 2": 43
        }
      }
    },
    {
      "id": "nvidia-rtx-4060",
      "name": "NVIDIA GeForce RTX 4060",
      "brand": "NVIDIA",
      "model": "RTX 4060",
      "performanceScore": 36,
      "tier": "entry-level",
      "price": 2499,
      "releaseDate": "2023-06",
      "power": 115,
      "memory": "8GB GDDR6",
      "benchmarks": {
        "gaming": 36,
        "rendering": 35,
        "aiCompute": 33,
        "games": {
          "Cyberpunk 2077": 36,
          "Alan Wake 2": 35
        }
      }
    },
    {
      "id": "amd-rx-7600",
      "name": "AMD Radeon RX 7600",
      "brand": "AMD",
      "model": "RX 7600",
      "performanceScore": 32,
      "tier": "entry-level",
      "price": 1899,
      "releaseDate": "2023-05",
      "power": 165,
      "memory": "8GB GDDR6",
      "benchmarks": {
        "gaming": 32,
        "rendering": 33,
        "aiCompute": 26,
        "games": {
          "Cyberpunk 2077": 30,
          "Alan Wake 2": 33
        }
      }
    },
    {
      "id": "nvidia-rtx-3060",
      "name": "NVIDIA GeForce RTX 3060",
      "brand": "NVIDIA",
      "model": "RTX 3060",
      "performanceScore": 26,
      "tier": "entry-level",
      "price": 1599,
      "releaseDate": "2021-02",
      "power": 170,
      "memory": "12GB GDDR6",
      "benchmarks": {
        "gaming": 26,
        "rendering": 25,
        "aiCompute": 24,
        "games": {
          "Cyberpunk 2077": 26,
          "Alan Wake 2": 25
        }
      }
    },
    {
      "id": "amd-rx-6600",
      "name": "AMD Radeon RX 6600",
      "brand": "AMD",
      "model": "RX 6600",
      "performanceScore": 22,
      "tier": "entry-level",
      "price": 1199,
      "releaseDate": "2021-08",
      "power": 132,
      "memory": "8GB GDDR6",
      "benchmarks": {
        "gaming": 22,
        "rendering": 23,
        "aiCompute": 18,
        "games": {
          "Cyberpunk 2077": 20,
          "Alan Wake 2": 23
        }
      }
    },
    {
      "id": "nvidia-arc-a770",
      "name": "Intel Arc A770",
      "brand": "Intel",
      "model": "Arc A770",
      "performanceScore": 28,
      "tier": "entry-level",
      "price": 1699,
      "releaseDate": "2022-10",
      "power": 225,
      "memory": "16GB GDDR6",
      "benchmarks": {
        "gaming": 28,
        "rendering": 26,
        "aiCompute": 30,
        "games": {
          "Cyberpunk 2077": 28,
          "Alan Wake 2": 25
        }
      }
    },
    {
      "id": "intel-arc-a750",
      "name": "Intel Arc A750",
      "brand": "Intel",
      "model": "Arc A750",
      "performanceScore": 24,
      "tier": "entry-level",
      "price": 1299,
      "releaseDate": "2022-10",
      "power": 225,
      "memory": "8GB GDDR6",
      "benchmarks": {
        "gaming": 24,
        "rendering": 22,
        "aiCompute": 25,
        "games": {
          "Cyberpunk 2077": 24,
          "Alan Wake 2": 21
        }
      }
    }
  ],
  "history": [
    {
      "version": "2026-05",
      "url": "data/gpu-data.json",
      "label": "2026年5月版"
    }
  ]
}
```

- [ ] **Step 2: 验证 JSON 文件创建成功**

检查: `docs/.vuepress/public/gpu-ladder/data/gpu-data.json` 存在

- [ ] **Step 3: Commit**

```bash
git add docs/.vuepress/public/gpu-ladder/data/gpu-data.json
git commit -m "feat: add sample gpu data"
```

---

### Task 4: 编写 JavaScript 应用逻辑

**Files:**
- Create: `docs/.vuepress/public/gpu-ladder/app.js`

- [ ] **Step 1: 编写主应用逻辑**

```javascript
// GPU 天梯图应用
class GPULadderApp {
    constructor() {
        this.gpus = [];
        this.filteredGpus = [];
        this.compareList = [];
        this.currentData = null;
        
        this.init();
    }
    
    async init() {
        this.bindElements();
        this.bindEvents();
        await this.loadData();
        this.render();
    }
    
    bindElements() {
        // 导航栏
        this.versionBadge = document.getElementById('versionBadge');
        this.searchInput = document.getElementById('searchInput');
        this.versionSelect = document.getElementById('versionSelect');
        
        // 侧边栏
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.sidebarClose = document.getElementById('sidebarClose');
        
        // 主内容
        this.ladderContent = document.getElementById('ladderContent');
        
        // 对比栏
        this.compareBar = document.getElementById('compareBar');
        this.compareCount = document.getElementById('compareCount');
        this.compareItems = document.getElementById('compareItems');
        this.compareBtn = document.getElementById('compareBtn');
        this.clearCompareBtn = document.getElementById('clearCompareBtn');
        
        // 弹窗
        this.compareModal = document.getElementById('compareModal');
        this.modalClose = document.getElementById('modalClose');
        this.modalBody = document.getElementById('modalBody');
        this.detailModal = document.getElementById('detailModal');
        this.detailModalClose = document.getElementById('detailModalClose');
        this.detailTitle = document.getElementById('detailTitle');
        this.detailModalBody = document.getElementById('detailModalBody');
    }
    
    bindEvents() {
        // 搜索
        this.searchInput.addEventListener('input', () => this.applyFilters());
        
        // 侧边栏
        this.sidebarToggle.addEventListener('click', () => {
            this.sidebar.classList.add('open');
        });
        this.sidebarClose.addEventListener('click', () => {
            this.sidebar.classList.remove('open');
        });
        
        // 筛选器事件代理
        this.sidebar.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.applyFilters();
            }
        });
        
        // 版本选择
        this.versionSelect.addEventListener('change', async (e) => {
            const url = e.target.value;
            if (url && url !== 'current') {
                await this.loadData(url);
            } else if (url === 'current') {
                await this.loadData();
            }
        });
        
        // 对比功能
        this.compareBtn.addEventListener('click', () => this.showCompareModal());
        this.clearCompareBtn.addEventListener('click', () => this.clearCompare());
        
        // 弹窗关闭
        this.modalClose.addEventListener('click', () => this.hideCompareModal());
        this.compareModal.addEventListener('click', (e) => {
            if (e.target === this.compareModal) {
                this.hideCompareModal();
            }
        });
        
        this.detailModalClose.addEventListener('click', () => this.hideDetailModal());
        this.detailModal.addEventListener('click', (e) => {
            if (e.target === this.detailModal) {
                this.hideDetailModal();
            }
        });
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideCompareModal();
                this.hideDetailModal();
                this.sidebar.classList.remove('open');
            }
        });
    }
    
    async loadData(url = 'data/gpu-data.json') {
        try {
            const response = await fetch(url);
            this.currentData = await response.json();
            this.gpus = this.currentData.gpus;
            
            // 更新版本选择
            this.updateVersionSelect();
            
            // 更新版本徽章
            this.versionBadge.textContent = this.currentData.version;
            
            // 重置筛选
            this.applyFilters();
        } catch (error) {
            console.error('加载数据失败:', error);
            this.showError('加载数据失败');
        }
    }
    
    updateVersionSelect() {
        this.versionSelect.innerHTML = '<option value="current">当前版本</option>';
        
        if (this.currentData.history) {
            this.currentData.history.forEach(version => {
                if (version.version !== this.currentData.version) {
                    const option = document.createElement('option');
                    option.value = version.url;
                    option.textContent = version.label;
                    this.versionSelect.appendChild(option);
                }
            });
        }
    }
    
    getSelectedFilters() {
        const brands = [];
        const prices = [];
        const tiers = [];
        
        // 获取品牌筛选
        this.sidebar.querySelectorAll('.filter-section:nth-child(1) input:checked').forEach(input => {
            brands.push(input.value);
        });
        
        // 获取价格筛选
        this.sidebar.querySelectorAll('.filter-section:nth-child(2) input:checked').forEach(input => {
            prices.push(input.value);
        });
        
        // 获取层级筛选
        this.sidebar.querySelectorAll('.filter-section:nth-child(3) input:checked').forEach(input => {
            tiers.push(input.value);
        });
        
        return { brands, prices, tiers };
    }
    
    applyFilters() {
        const searchText = this.searchInput.value.toLowerCase();
        const { brands, prices, tiers } = this.getSelectedFilters();
        
        this.filteredGpus = this.gpus.filter(gpu => {
            // 搜索筛选
            if (searchText && !gpu.name.toLowerCase().includes(searchText)) {
                return false;
            }
            
            // 品牌筛选
            if (brands.length > 0 && !brands.includes(gpu.brand)) {
                return false;
            }
            
            // 层级筛选
            if (tiers.length > 0 && !tiers.includes(gpu.tier)) {
                return false;
            }
            
            // 价格筛选
            if (prices.length > 0 && !this.matchPrice(gpu.price, prices)) {
                return false;
            }
            
            return true;
        });
        
        // 按性能分数降序排序
        this.filteredGpus.sort((a, b) => b.performanceScore - a.performanceScore);
        
        this.render();
    }
    
    matchPrice(price, priceRanges) {
        return priceRanges.some(range => {
            if (range === '0-1000') return price < 1000;
            if (range === '1000-2000') return price >= 1000 && price < 2000;
            if (range === '2000-4000') return price >= 2000 && price < 4000;
            if (range === '4000-8000') return price >= 4000 && price < 8000;
            if (range === '8000+') return price >= 8000;
            return false;
        });
    }
    
    getTierLabel(tier) {
        const labels = {
            'flagship': '旗舰级',
            'high-end': '高端级',
            'mid-range': '中等级',
            'entry-level': '入门级'
        };
        return labels[tier] || tier;
    }
    
    render() {
        this.renderLadder();
        this.updateCompareBar();
    }
    
    renderLadder() {
        if (this.filteredGpus.length === 0) {
            this.ladderContent.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🎮</div>
                    <div class="empty-state-text">没有找到符合条件的显卡</div>
                </div>
            `;
            return;
        }
        
        const maxScore = Math.max(...this.filteredGpus.map(g => g.performanceScore));
        
        this.ladderContent.innerHTML = this.filteredGpus.map(gpu => {
            const isCompared = this.compareList.some(c => c.id === gpu.id);
            const position = 100 - (gpu.performanceScore / maxScore * 100);
            
            return `
                <div class="gpu-card tier-${gpu.tier} ${isCompared ? 'selected' : ''}" data-id="${gpu.id}">
                    <div class="gpu-card-header">
                        <div class="gpu-name">🎮 ${gpu.name}</div>
                        <div class="gpu-score">${gpu.performanceScore}%</div>
                    </div>
                    <div class="gpu-card-meta">
                        <div class="gpu-meta-item">
                            <span>🏷️</span>
                            <span class="tier-badge tier-${gpu.tier}">${this.getTierLabel(gpu.tier)}</span>
                        </div>
                        <div class="gpu-meta-item gpu-price">
                            <span>💰</span>
                            <span>¥${gpu.price.toLocaleString()}</span>
                        </div>
                        <div class="gpu-meta-item">
                            <span>📅</span>
                            <span>${gpu.releaseDate}</span>
                        </div>
                        <div class="gpu-meta-item">
                            <span>⚡</span>
                            <span>${gpu.power}W</span>
                        </div>
                        <div class="gpu-meta-item">
                            <span>💾</span>
                            <span>${gpu.memory}</span>
                        </div>
                    </div>
                    <div class="gpu-card-actions">
                        <button class="btn-add-compare ${isCompared ? 'added' : ''}" data-action="toggle-compare">
                            ${isCompared ? '✓ 已添加' : '+ 添加对比'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        // 绑定卡片事件
        this.ladderContent.querySelectorAll('.gpu-card').forEach(card => {
            const id = card.dataset.id;
            const gpu = this.gpus.find(g => g.id === id);
            
            card.addEventListener('click', (e) => {
                if (e.target.closest('[data-action="toggle-compare"]')) {
                    this.toggleCompare(gpu);
                } else {
                    this.showDetail(gpu);
                }
            });
        });
    }
    
    toggleCompare(gpu) {
        const index = this.compareList.findIndex(c => c.id === gpu.id);
        
        if (index > -1) {
            this.compareList.splice(index, 1);
        } else {
            if (this.compareList.length >= 5) {
                alert('最多只能对比 5 个显卡');
                return;
            }
            this.compareList.push(gpu);
        }
        
        this.render();
        this.saveCompareList();
    }
    
    clearCompare() {
        this.compareList = [];
        this.render();
        this.saveCompareList();
    }
    
    updateCompareBar() {
        if (this.compareList.length > 0) {
            this.compareBar.classList.add('visible');
            this.compareCount.textContent = this.compareList.length;
            
            this.compareItems.innerHTML = this.compareList.map(gpu => `
                <div class="compare-item">
                    <span>${gpu.model}</span>
                    <span class="compare-item-remove" data-id="${gpu.id}">✕</span>
                </div>
            `).join('');
            
            // 绑定移除事件
            this.compareItems.querySelectorAll('.compare-item-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = btn.dataset.id;
                    const gpu = this.gpus.find(g => g.id === id);
                    if (gpu) {
                        this.toggleCompare(gpu);
                    }
                });
            });
        } else {
            this.compareBar.classList.remove('visible');
        }
    }
    
    showCompareModal() {
        if (this.compareList.length < 2) {
            alert('请至少选择 2 个显卡进行对比');
            return;
        }
        
        this.modalBody.innerHTML = `
            <div class="compare-table">
                <table>
                    <thead>
                        <tr>
                            <th>对比项</th>
                            ${this.compareList.map(gpu => `<th class="gpu-col">${gpu.model}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>显卡名称</td>
                            ${this.compareList.map(gpu => `<td>${gpu.name}</td>`).join('')}
                        </tr>
                        <tr>
                            <td>性能分数</td>
                            ${this.compareList.map(gpu => `<td><strong>${gpu.performanceScore}%</strong></td>`).join('')}
                        </tr>
                        <tr>
                            <td>价格</td>
                            ${this.compareList.map(gpu => `<td>¥${gpu.price.toLocaleString()}</td>`).join('')}
                        </tr>
                        <tr>
                            <td>性能层级</td>
                            ${this.compareList.map(gpu => `<td><span class="tier-badge tier-${gpu.tier}">${this.getTierLabel(gpu.tier)}</span></td>`).join('')}
                        </tr>
                        <tr>
                            <td>显存</td>
                            ${this.compareList.map(gpu => `<td>${gpu.memory}</td>`).join('')}
                        </tr>
                        <tr>
                            <td>功耗</td>
                            ${this.compareList.map(gpu => `<td>${gpu.power}W</td>`).join('')}
                        </tr>
                        <tr>
                            <td>发布时间</td>
                            ${this.compareList.map(gpu => `<td>${gpu.releaseDate}</td>`).join('')}
                        </tr>
                        <tr>
                            <td>游戏性能</td>
                            ${this.compareList.map(gpu => `<td>${gpu.benchmarks.gaming}%</td>`).join('')}
                        </tr>
                        <tr>
                            <td>渲染性能</td>
                            ${this.compareList.map(gpu => `<td>${gpu.benchmarks.rendering}%</td>`).join('')}
                        </tr>
                        <tr>
                            <td>AI 算力</td>
                            ${this.compareList.map(gpu => `<td>${gpu.benchmarks.aiCompute}%</td>`).join('')}
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        
        this.compareModal.classList.add('visible');
    }
    
    hideCompareModal() {
        this.compareModal.classList.remove('visible');
    }
    
    showDetail(gpu) {
        this.detailTitle.textContent = gpu.name;
        
        this.detailModalBody.innerHTML = `
            <div class="detail-grid">
                <div>
                    <div class="detail-section">
                        <h3>基本信息</h3>
                        <div class="detail-item">
                            <span class="detail-label">显卡名称</span>
                            <span class="detail-value">${gpu.name}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">品牌</span>
                            <span class="detail-value">${gpu.brand}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">性能分数</span>
                            <span class="detail-value">${gpu.performanceScore}%</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">性能层级</span>
                            <span class="detail-value"><span class="tier-badge tier-${gpu.tier}">${this.getTierLabel(gpu.tier)}</span></span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">价格</span>
                            <span class="detail-value">¥${gpu.price.toLocaleString()}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">发布时间</span>
                            <span class="detail-value">${gpu.releaseDate}</span>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3>硬件规格</h3>
                        <div class="detail-item">
                            <span class="detail-label">显存</span>
                            <span class="detail-value">${gpu.memory}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">功耗</span>
                            <span class="detail-value">${gpu.power}W</span>
                        </div>
                    </div>
                </div>
                
                <div>
                    <div class="detail-section">
                        <h3>性能基准</h3>
                        <div class="detail-item">
                            <span class="detail-label">综合游戏性能</span>
                            <span class="detail-value">${gpu.benchmarks.gaming}%</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">渲染性能</span>
                            <span class="detail-value">${gpu.benchmarks.rendering}%</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">AI 算力</span>
                            <span class="detail-value">${gpu.benchmarks.aiCompute}%</span>
                        </div>
                    </div>
                    
                    ${gpu.benchmarks.games ? `
                    <div class="detail-section">
                        <h3>游戏跑分</h3>
                        ${Object.entries(gpu.benchmarks.games).map(([game, score]) => `
                            <div class="detail-item">
                                <span class="detail-label">${game}</span>
                                <span class="detail-value">${score}%</span>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        this.detailModal.classList.add('visible');
    }
    
    hideDetailModal() {
        this.detailModal.classList.remove('visible');
    }
    
    showError(message) {
        this.ladderContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <div class="empty-state-text">${message}</div>
            </div>
        `;
    }
    
    saveCompareList() {
        const ids = this.compareList.map(g => g.id);
        localStorage.setItem('gpuCompareList', JSON.stringify(ids));
    }
    
    loadCompareList() {
        try {
            const saved = localStorage.getItem('gpuCompareList');
            if (saved) {
                const ids = JSON.parse(saved);
                this.compareList = ids
                    .map(id => this.gpus.find(g => g.id === id))
                    .filter(Boolean);
            }
        } catch (e) {
            console.error('加载对比列表失败:', e);
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.gpuApp = new GPULadderApp();
    
    // 数据加载完成后恢复对比列表
    const checkData = setInterval(() => {
        if (window.gpuApp.gpus.length > 0) {
            window.gpuApp.loadCompareList();
            window.gpuApp.render();
            clearInterval(checkData);
        }
    }, 100);
});
```

- [ ] **Step 2: 验证 JS 文件创建成功**

检查: `docs/.vuepress/public/gpu-ladder/app.js` 存在

- [ ] **Step 3: Commit**

```bash
git add docs/.vuepress/public/gpu-ladder/app.js
git commit -m "feat: add gpu ladder app logic"
```

---

### Task 5: 在浏览器中测试页面

**Files:**
- 无文件变更

- [ ] **Step 1: 打开 HTML 文件测试**

在浏览器中打开: `docs/.vuepress/public/gpu-ladder/index.html`

检查项:
- 页面布局正常显示
- GPU 卡片正确渲染
- 搜索功能可用
- 筛选功能可用
- 对比功能可用
- 详情弹窗可用
- 响应式布局正常（调整浏览器宽度）

- [ ] **Step 2: 验证页面可以正常运行**

确保无控制台错误，所有功能正常工作

---

### Task 6: 更新导航栏添加链接（可选）

**Files:**
- Modify: `docs/.vuepress/config.js`

- [ ] **Step 1: 更新导航栏配置**

在 `nav` 数组中添加 GPU 天梯图链接:

```javascript
nav: [
    {
        text: '首页',
        link: '/',
    },
    {
        text: 'GPU 天梯图',
        link: '/gpu-ladder/index.html',
    },
    {
        text: '标签',
        link: '/tag/',
    },
    {
        text: '时间线',
        link: '/archives',
    },
    {
        text: '资源库',
        link: 'https://suporka-resource.netlify.app/',
    },
],
```

- [ ] **Step 2: Commit（如果修改了）**

```bash
git add docs/.vuepress/config.js
git commit -m "feat: add gpu ladder link to nav"
```

---

## 计划完成

所有任务已定义完毕。实现顺序为:

1. 创建 HTML 骨架
2. 编写 CSS 样式
3. 创建示例数据
4. 编写 JavaScript 逻辑
5. 测试页面
6. （可选）更新导航栏

页面将包含完整的功能: 搜索筛选、对比功能、历史版本支持、性能基准展示和响应式布局。
