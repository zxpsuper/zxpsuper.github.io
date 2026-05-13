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
