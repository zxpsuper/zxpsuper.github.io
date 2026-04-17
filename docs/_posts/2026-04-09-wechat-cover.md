---
title: 微信公众号封面图片生成器
date: 2026-04-09
tags:
  - 工具
  - 杂文
author: 小皮咖
location: 广州
---

实现一个微信公众号封面图片生成工具，方便大家使用。

<!-- more -->


## 使用说明

1. **上传图片**：点击左侧区域上传大图，点击右侧区域上传小图
2. **调整图片**：拖动图片调整位置，点击按钮调整大小
3. **添加文字**：点击左侧区域添加文字，点击右侧区域添加文字
4. **调整文字**：拖动文字调整位置，点击按钮调整大小，也可以设置图片颜色
5. **下载图片**：点击下载按钮下载合成后的图片

## 封面合成工具

使用下方的工具可以合成微信公众号封面图，左侧为大图区域（900x383），右侧为小图区域（383x383）。

<div id="cover-composer"></div>


这个工具合成出来是 1283 * 383 的图片，左边是单图文消息封面，右边是多图文消息封面。

我们用这个工具合成一张图片

![](/images/wechat-cover.png)

然后在文章编辑界面设置封面，左边刚好给消息列表做封面，右边刚好给卡片做小图，完美哈哈😁

![](/images/wechat-cover2.png)

<script>
export default {
    data() {
        return {
            bigImage: null,
            smallImage: null,
            bigScale: 1,
            smallScale: 1,
            bigOffsetX: 0,
            bigOffsetY: 0,
            smallOffsetX: 0,
            smallOffsetY: 0,
            isDraggingBig: false,
            isDraggingSmall: false,
            lastX: 0,
            lastY: 0,
            bigTexts: [],
            smallTexts: [],
            selectedTextId: null,
            textIdCounter: 1,
            isDraggingText: false,
            isResizingText: false,
            resizeHandle: null,
            textDragStartX: 0,
            textDragStartY: 0,
            currentTextColor: '#ffffff',
            presetImages: [
                { name: '📷 选择图片...', url: '' },
                { name: '🌄 随机风景1', url: 'https://picsum.photos/900/383?random=1' },
                { name: '🌄 随机风景2', url: 'https://picsum.photos/900/383?random=2' },
                { name: '🌄 随机风景3', url: 'https://picsum.photos/900/383?random=3' },
                { name: '💻 科技背景1', url: 'https://picsum.photos/900/383?random=4' },
                { name: '💻 科技背景2', url: 'https://picsum.photos/900/383?random=5' },
                { name: '💻 科技背景3', url: 'https://picsum.photos/900/383?random=6' }
            ]
        }
    },
    mounted() {
        this.generateGradientImages();
        this.initCanvas();
    },
    methods: {
        generateGradientImages() {
            const gradients = [
                { name: '🟦 蓝色渐变', start: '#667eea', end: '#764ba2' },
                { name: '🟩 绿色渐变', start: '#11998e', end: '#38ef7d' },
                { name: '🟧 橙色渐变', start: '#f093fb', end: '#f5576c' },
                { name: '🟨 青色渐变', start: '#4facfe', end: '#00f2fe' },
                { name: '🟪 粉色渐变', start: '#fa709a', end: '#fee140' },
                { name: '⬜ 灰色渐变', start: '#a8a8a8', end: '#868f96' }
            ];
            
            gradients.forEach(grad => {
                const canvas = document.createElement('canvas');
                canvas.width = 900;
                canvas.height = 383;
                const ctx = canvas.getContext('2d');
                
                const gradient = ctx.createLinearGradient(0, 0, 900, 383);
                gradient.addColorStop(0, grad.start);
                gradient.addColorStop(1, grad.end);
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 900, 383);
                
                const dataUrl = canvas.toDataURL('image/png');
                this.presetImages.splice(1, 0, { name: grad.name, url: dataUrl });
            });
        },
        initCanvas() {
            const container = document.getElementById('cover-composer');
            if (!container) return;
            
            const presetOptions = this.presetImages.map(img => 
                `<option value="${img.url}">${img.name}</option>`
            ).join('');
            
            container.innerHTML = `
                <div class="cover-composer-wrapper">
                    <div class="tools-bar">
                        <div class="tool-group">
                            <span class="tool-label">文本：</span>
                            <button id="addTextBig" class="btn btn-text">➕ 大图加文字</button>
                            <button id="addTextSmall" class="btn btn-text">➕ 小图加文字</button>
                        </div>
                        <div class="tool-group">
                            <span class="tool-label">颜色：</span>
                            <input type="color" id="textColorPicker" class="color-picker" value="#ffffff">
                            <span class="color-label" id="colorLabel">#ffffff</span>
                        </div>
                        <div class="tool-group">
                            <button id="deleteSelectedText" class="btn btn-delete">🗑️ 删除</button>
                        </div>
                        <div class="tool-group">
                            <span class="tool-label">字号：</span>
                            <button id="textBigger" class="btn">🔤 增大</button>
                            <button id="textSmaller" class="btn">🔤 减小</button>
                        </div>
                    </div>
                    <div class="cover-composer-grid">
                        <div class="panel panel-big">
                            <h3 class="panel-title">大图区域 (900x383)</h3>
                            <div class="image-source-section">
                                <div class="source-tabs">
                                    <button class="source-tab active" data-type="big" data-source="upload">📁 本地上传</button>
                                    <button class="source-tab" data-type="big" data-source="preset">🎨 选择预置</button>
                                    <button class="source-tab" data-type="big" data-source="url">🔗 图片链接</button>
                                </div>
                                <div class="source-content active" data-type="big" data-source="upload">
                                    <input type="file" accept="image/*" id="bigFileInput" class="file-input">
                                </div>
                                <div class="source-content" data-type="big" data-source="preset">
                                    <select id="bigPresetSelect" class="select-input">
                                        ${presetOptions}
                                    </select>
                                </div>
                                <div class="source-content" data-type="big" data-source="url">
                                    <div class="url-input-group">
                                        <input type="text" id="bigUrlInput" class="url-input" placeholder="请输入图片链接...">
                                        <button id="bigLoadUrlBtn" class="btn-small">加载</button>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group">
                                <button id="bigZoomIn" class="btn">🔍 放大</button>
                                <button id="bigZoomOut" class="btn">🔍 缩小</button>
                                <button id="bigReset" class="btn">↺ 重置</button>
                            </div>
                            <div class="canvas-wrapper canvas-wrapper-big">
                                <div id="bigCanvasContainer" class="canvas-container">
                                    <div id="bigPlaceholder" class="placeholder">📷 请上传大图</div>
                                    <img id="bigImg" style="display: none; position: absolute; transform-origin: center center; user-select: none; pointer-events: none;">
                                    <div id="bigTextLayer" class="text-layer"></div>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-small">
                            <h3 class="panel-title">小图区域 (383x383)</h3>
                            <div class="image-source-section">
                                <div class="source-tabs">
                                    <button class="source-tab active" data-type="small" data-source="upload">📁 本地上传</button>
                                    <button class="source-tab" data-type="small" data-source="preset">🎨 选择预置</button>
                                    <button class="source-tab" data-type="small" data-source="url">🔗 图片链接</button>
                                </div>
                                <div class="source-content active" data-type="small" data-source="upload">
                                    <input type="file" accept="image/*" id="smallFileInput" class="file-input">
                                </div>
                                <div class="source-content" data-type="small" data-source="preset">
                                    <select id="smallPresetSelect" class="select-input">
                                        ${presetOptions}
                                    </select>
                                </div>
                                <div class="source-content" data-type="small" data-source="url">
                                    <div class="url-input-group">
                                        <input type="text" id="smallUrlInput" class="url-input" placeholder="请输入图片链接...">
                                        <button id="smallLoadUrlBtn" class="btn-small">加载</button>
                                    </div>
                                </div>
                            </div>
                            <div class="button-group">
                                <button id="smallZoomIn" class="btn">🔍 放大</button>
                                <button id="smallZoomOut" class="btn">🔍 缩小</button>
                                <button id="smallReset" class="btn">↺ 重置</button>
                            </div>
                            <div class="canvas-wrapper canvas-wrapper-small">
                                <div id="smallCanvasContainer" class="canvas-container">
                                    <div id="smallPlaceholder" class="placeholder">📷 请上传小图</div>
                                    <img id="smallImg" style="display: none; position: absolute; transform-origin: center center; user-select: none; pointer-events: none;">
                                    <div id="smallTextLayer" class="text-layer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="download-section">
                        <button id="downloadBtn" class="btn btn-primary">⬇️ 下载合成图片 (1283x383)</button>
                    </div>
                </div>
            `;
            
            this.bindEvents();
        },
        bindEvents() {
            const self = this;
            
            // 标签切换
            document.querySelectorAll('.source-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const type = this.dataset.type;
                    const source = this.dataset.source;
                    
                    // 更新标签状态
                    document.querySelectorAll(`.source-tab[data-type="${type}"]`).forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 显示对应内容
                    document.querySelectorAll(`.source-content[data-type="${type}"]`).forEach(c => c.classList.remove('active'));
                    document.querySelector(`.source-content[data-type="${type}"][data-source="${source}"]`).classList.add('active');
                });
            });
            
            // 大图上传
            document.getElementById('bigFileInput').addEventListener('change', function(e) {
                self.handleFileUpload(e, 'big');
            });
            
            // 小图上传
            document.getElementById('smallFileInput').addEventListener('change', function(e) {
                self.handleFileUpload(e, 'small');
            });
            
            // 大图预置选择
            document.getElementById('bigPresetSelect').addEventListener('change', function(e) {
                if (e.target.value) {
                    self.loadImageFromUrl(e.target.value, 'big');
                }
            });
            
            // 小图预置选择
            document.getElementById('smallPresetSelect').addEventListener('change', function(e) {
                if (e.target.value) {
                    self.loadImageFromUrl(e.target.value, 'small');
                }
            });
            
            // 大图URL加载
            document.getElementById('bigLoadUrlBtn').addEventListener('click', function() {
                const url = document.getElementById('bigUrlInput').value.trim();
                if (url) {
                    self.loadImageFromUrl(url, 'big');
                }
            });
            
            // 小图URL加载
            document.getElementById('smallLoadUrlBtn').addEventListener('click', function() {
                const url = document.getElementById('smallUrlInput').value.trim();
                if (url) {
                    self.loadImageFromUrl(url, 'small');
                }
            });
            
            // 回车加载URL
            document.getElementById('bigUrlInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('bigLoadUrlBtn').click();
                }
            });
            document.getElementById('smallUrlInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('smallLoadUrlBtn').click();
                }
            });
            
            // 添加文本按钮
            document.getElementById('addTextBig').addEventListener('click', function() {
                self.addText('big');
            });
            document.getElementById('addTextSmall').addEventListener('click', function() {
                self.addText('small');
            });
            
            // 颜色选择器
            const colorPicker = document.getElementById('textColorPicker');
            const colorLabel = document.getElementById('colorLabel');
            colorPicker.addEventListener('input', function() {
                self.currentTextColor = this.value;
                colorLabel.textContent = this.value;
                self.updateSelectedTextColor();
            });
            
            // 删除选中文字
            document.getElementById('deleteSelectedText').addEventListener('click', function() {
                self.deleteSelectedText();
            });
            
            // 文本大小调整
            document.getElementById('textBigger').addEventListener('click', function() {
                self.adjustTextSize(4);
            });
            document.getElementById('textSmaller').addEventListener('click', function() {
                self.adjustTextSize(-4);
            });
            
            // 大图缩放
            document.getElementById('bigZoomIn').addEventListener('click', function() {
                self.zoomImage('big', 0.1);
            });
            document.getElementById('bigZoomOut').addEventListener('click', function() {
                self.zoomImage('big', -0.1);
            });
            document.getElementById('bigReset').addEventListener('click', function() {
                self.resetImage('big');
            });
            
            // 小图缩放
            document.getElementById('smallZoomIn').addEventListener('click', function() {
                self.zoomImage('small', 0.1);
            });
            document.getElementById('smallZoomOut').addEventListener('click', function() {
                self.zoomImage('small', -0.1);
            });
            document.getElementById('smallReset').addEventListener('click', function() {
                self.resetImage('small');
            });
            
            // 下载按钮
            document.getElementById('downloadBtn').addEventListener('click', function() {
                self.downloadComposite();
            });
            
            // 大图拖拽
            const bigContainer = document.getElementById('bigCanvasContainer');
            bigContainer.addEventListener('mousedown', function(e) {
                if (self.bigImage) {
                    self.isDraggingBig = true;
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                }
            });
            
            // 小图拖拽
            const smallContainer = document.getElementById('smallCanvasContainer');
            smallContainer.addEventListener('mousedown', function(e) {
                if (self.smallImage) {
                    self.isDraggingSmall = true;
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                }
            });
            
            // 全局鼠标移动
            document.addEventListener('mousemove', function(e) {
                if (self.isDraggingBig) {
                    const dx = e.clientX - self.lastX;
                    const dy = e.clientY - self.lastY;
                    self.bigOffsetX += dx;
                    self.bigOffsetY += dy;
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                    self.updateImagePosition('big');
                }
                if (self.isDraggingSmall) {
                    const dx = e.clientX - self.lastX;
                    const dy = e.clientY - self.lastY;
                    self.smallOffsetX += dx;
                    self.smallOffsetY += dy;
                    self.lastX = e.clientX;
                    self.lastY = e.clientY;
                    self.updateImagePosition('small');
                }
                if (self.isDraggingText && self.selectedTextId) {
                    const dx = e.clientX - self.textDragStartX;
                    const dy = e.clientY - self.textDragStartY;
                    self.textDragStartX = e.clientX;
                    self.textDragStartY = e.clientY;
                    
                    const textElement = document.getElementById(self.selectedTextId);
                    let textData = self.bigTexts.find(t => t.id === self.selectedTextId);
                    if (!textData) {
                        textData = self.smallTexts.find(t => t.id === self.selectedTextId);
                    }
                    
                    if (textData && textElement) {
                        textData.x += dx;
                        textData.y += dy;
                        textElement.style.left = textData.x + 'px';
                        textElement.style.top = textData.y + 'px';
                    }
                }
            });
            
            // 全局鼠标释放
            document.addEventListener('mouseup', function() {
                self.isDraggingBig = false;
                self.isDraggingSmall = false;
                self.isDraggingText = false;
            });
            
            // 大图滚轮缩放
            bigContainer.addEventListener('wheel', function(e) {
                if (self.bigImage) {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? -0.1 : 0.1;
                    self.zoomImage('big', delta);
                }
            });
            
            // 小图滚轮缩放
            smallContainer.addEventListener('wheel', function(e) {
                if (self.smallImage) {
                    e.preventDefault();
                    const delta = e.deltaY > 0 ? -0.1 : 0.1;
                    self.zoomImage('small', delta);
                }
            });
        },
        loadImageFromUrl(url, type) {
            const self = this;
            const img = new Image();
            // Base64 图片不需要 crossOrigin
            if (!url.startsWith('data:')) {
                img.crossOrigin = 'anonymous';
            }
            img.onload = function() {
                // 将图片转换为本地 DataURL
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');
                
                // 使用 DataURL 创建新的图片对象
                const localImg = new Image();
                localImg.onload = function() {
                    if (type === 'big') {
                        self.bigImage = localImg;
                        self.bigScale = 1;
                        self.bigOffsetX = 0;
                        self.bigOffsetY = 0;
                        self.fitImage('big');
                    } else {
                        self.smallImage = localImg;
                        self.smallScale = 1;
                        self.smallOffsetX = 0;
                        self.smallOffsetY = 0;
                        self.fitImage('small');
                    }
                };
                localImg.src = dataUrl;
            };
            img.onerror = function(err) {
                console.error('图片加载失败', err);
                alert('图片加载失败，请检查链接是否正确');
            };
            img.src = url;
        },
        handleFileUpload(e, type) {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            const self = this;
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    if (type === 'big') {
                        self.bigImage = img;
                        self.bigScale = 1;
                        self.bigOffsetX = 0;
                        self.bigOffsetY = 0;
                        self.fitImage('big');
                    } else {
                        self.smallImage = img;
                        self.smallScale = 1;
                        self.smallOffsetX = 0;
                        self.smallOffsetY = 0;
                        self.fitImage('small');
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        },
        fitImage(type) {
            const img = type === 'big' ? this.bigImage : this.smallImage;
            const container = document.getElementById(type === 'big' ? 'bigCanvasContainer' : 'smallCanvasContainer');
            
            if (!img || !container) return;
            
            const imgElement = document.getElementById(type === 'big' ? 'bigImg' : 'smallImg');
            const placeholder = document.getElementById(type === 'big' ? 'bigPlaceholder' : 'smallPlaceholder');
            
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            
            imgElement.src = img.src;
            imgElement.style.display = 'block';
            imgElement.style.width = 'auto';
            imgElement.style.height = 'auto';
            imgElement.style.maxWidth = 'none';
            imgElement.style.maxHeight = 'none';
            placeholder.style.display = 'none';
            
            // 计算缩放比例使图片适配容器
            const scaleX = containerWidth / img.width;
            const scaleY = containerHeight / img.height;
            const scale = Math.min(scaleX, scaleY);
            
            if (type === 'big') {
                this.bigScale = scale;
            } else {
                this.smallScale = scale;
            }
            
            this.updateImagePosition(type);
        },
        zoomImage(type, delta) {
            if (type === 'big') {
                this.bigScale = Math.max(0.1, Math.min(5, this.bigScale + delta));
            } else {
                this.smallScale = Math.max(0.1, Math.min(5, this.smallScale + delta));
            }
            this.updateImagePosition(type);
        },
        resetImage(type) {
            if (type === 'big') {
                this.bigScale = 1;
                this.bigOffsetX = 0;
                this.bigOffsetY = 0;
                this.fitImage('big');
            } else {
                this.smallScale = 1;
                this.smallOffsetX = 0;
                this.smallOffsetY = 0;
                this.fitImage('small');
            }
        },
        updateImagePosition(type) {
            const img = type === 'big' ? this.bigImage : this.smallImage;
            const imgElement = document.getElementById(type === 'big' ? 'bigImg' : 'smallImg');
            const container = document.getElementById(type === 'big' ? 'bigCanvasContainer' : 'smallCanvasContainer');
            const scale = type === 'big' ? this.bigScale : this.smallScale;
            const offsetX = type === 'big' ? this.bigOffsetX : this.smallOffsetX;
            const offsetY = type === 'big' ? this.bigOffsetY : this.smallOffsetY;
            
            if (!img || !container) return;
            
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            
            // 设置图片原始尺寸
            imgElement.style.width = img.width + 'px';
            imgElement.style.height = img.height + 'px';
            
            // 计算居中位置
            const centerX = (containerWidth - img.width) / 2;
            const centerY = (containerHeight - img.height) / 2;
            
            // 使用 transform 进行缩放和位移
            imgElement.style.left = centerX + 'px';
            imgElement.style.top = centerY + 'px';
            imgElement.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
        },
        downloadComposite() {
            const canvas = document.createElement('canvas');
            canvas.width = 1283;
            canvas.height = 383;
            const ctx = canvas.getContext('2d');
            
            // 填充白色背景
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 1283, 383);
            
            // 获取显示区域的实际尺寸
            const bigContainer = document.getElementById('bigCanvasContainer');
            const smallContainer = document.getElementById('smallCanvasContainer');
            
            // 绘制大图到 900x383 区域
            if (this.bigImage && bigContainer) {
                ctx.save();
                
                const displayWidth = bigContainer.offsetWidth;
                const displayHeight = bigContainer.offsetHeight;
                const targetWidth = 900;
                const targetHeight = 383;
                
                // 计算显示区域到目标区域的缩放比例
                const scaleX = targetWidth / displayWidth;
                const scaleY = targetHeight / displayHeight;
                
                // 计算图片在目标区域的位置和尺寸
                const scaledWidth = this.bigImage.width * this.bigScale;
                const scaledHeight = this.bigImage.height * this.bigScale;
                const centerX = (displayWidth - this.bigImage.width) / 2 + this.bigOffsetX;
                const centerY = (displayHeight - this.bigImage.height) / 2 + this.bigOffsetY;
                
                // 先绘制到临时 canvas，应用 transform
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = displayWidth;
                tempCanvas.height = displayHeight;
                const tempCtx = tempCanvas.getContext('2d');
                
                tempCtx.save();
                tempCtx.translate(centerX + this.bigImage.width / 2, centerY + this.bigImage.height / 2);
                tempCtx.scale(this.bigScale, this.bigScale);
                tempCtx.translate(-this.bigImage.width / 2, -this.bigImage.height / 2);
                tempCtx.drawImage(this.bigImage, 0, 0);
                tempCtx.restore();
                
                // 将临时 canvas 缩放到目标尺寸
                ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
                ctx.restore();
            }
            
            // 绘制小图到 383x383 区域
            if (this.smallImage && smallContainer) {
                ctx.save();
                
                const displayWidth = smallContainer.offsetWidth;
                const displayHeight = smallContainer.offsetHeight;
                const targetWidth = 383;
                const targetHeight = 383;
                
                // 计算显示区域到目标区域的缩放比例
                const scaleX = targetWidth / displayWidth;
                const scaleY = targetHeight / displayHeight;
                
                // 先绘制到临时 canvas，应用 transform
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = displayWidth;
                tempCanvas.height = displayHeight;
                const tempCtx = tempCanvas.getContext('2d');
                
                tempCtx.save();
                const centerX = (displayWidth - this.smallImage.width) / 2 + this.smallOffsetX;
                const centerY = (displayHeight - this.smallImage.height) / 2 + this.smallOffsetY;
                
                tempCtx.translate(centerX + this.smallImage.width / 2, centerY + this.smallImage.height / 2);
                tempCtx.scale(this.smallScale, this.smallScale);
                tempCtx.translate(-this.smallImage.width / 2, -this.smallImage.height / 2);
                tempCtx.drawImage(this.smallImage, 0, 0);
                tempCtx.restore();
                
                // 将临时 canvas 缩放到目标尺寸，绘制到大图右边
                ctx.drawImage(tempCanvas, 900, 0, targetWidth, targetHeight);
                ctx.restore();
            }
            
            // 绘制大图区域的文本
            if (this.bigTexts.length > 0 && bigContainer) {
                const bigScaleX = 900 / bigContainer.offsetWidth;
                const bigScaleY = 383 / bigContainer.offsetHeight;
                const textScale = Math.max(bigScaleX, bigScaleY);
                
                ctx.save();
                this.bigTexts.forEach(textData => {
                    ctx.fillStyle = textData.color;
                    ctx.font = `${textData.fontSize * textScale}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;
                    ctx.fillText(textData.content, textData.x * bigScaleX, textData.y * bigScaleY + textData.fontSize * textScale);
                });
                ctx.restore();
            }
            
            // 绘制小图区域的文本
            if (this.smallTexts.length > 0 && smallContainer) {
                const smallScaleX = 383 / smallContainer.offsetWidth;
                const smallScaleY = 383 / smallContainer.offsetHeight;
                const textScale = Math.max(smallScaleX, smallScaleY);
                
                ctx.save();
                this.smallTexts.forEach(textData => {
                    ctx.fillStyle = textData.color;
                    ctx.font = `${textData.fontSize * textScale}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;
                    ctx.fillText(textData.content, 900 + textData.x * smallScaleX, textData.y * smallScaleY + textData.fontSize * textScale);
                });
                ctx.restore();
            }
            
            // 下载图片
            const link = document.createElement('a');
            link.download = 'wechat-cover-' + Date.now() + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        },
        addText(type) {
            const text = prompt('请输入文本内容：', '示例文字');
            if (!text) return;
            
            const container = document.getElementById(type === 'big' ? 'bigCanvasContainer' : 'smallCanvasContainer');
            const textLayer = document.getElementById(type === 'big' ? 'bigTextLayer' : 'smallTextLayer');
            
            const textData = {
                id: 'text-' + this.textIdCounter++,
                content: text,
                x: 20,
                y: 20,
                fontSize: 24,
                color: this.currentTextColor
            };
            
            if (type === 'big') {
                this.bigTexts.push(textData);
            } else {
                this.smallTexts.push(textData);
            }
            
            this.renderText(textData, textLayer);
        },
        renderText(textData, textLayer) {
            const textElement = document.createElement('div');
            textElement.className = 'text-item';
            textElement.id = textData.id;
            textElement.textContent = textData.content;
            textElement.style.left = textData.x + 'px';
            textElement.style.top = textData.y + 'px';
            textElement.style.fontSize = textData.fontSize + 'px';
            textElement.style.color = textData.color;
            
            textElement.addEventListener('mousedown', (e) => this.startTextDrag(e, textData));
            textElement.addEventListener('dblclick', (e) => this.editTextContent(e, textData));
            
            textLayer.appendChild(textElement);
        },
        startTextDrag(e, textData) {
            e.preventDefault();
            e.stopPropagation();
            this.selectedTextId = textData.id;
            this.isDraggingText = true;
            this.textDragStartX = e.clientX;
            this.textDragStartY = e.clientY;
            
            const textElements = document.querySelectorAll('.text-item');
            textElements.forEach(el => el.classList.remove('selected'));
            document.getElementById(textData.id).classList.add('selected');
        },
        editTextContent(e, textData) {
            const newContent = prompt('请输入新的文本内容：', textData.content);
            if (newContent !== null) {
                textData.content = newContent;
                document.getElementById(textData.id).textContent = newContent;
            }
        },
        updateSelectedTextColor() {
            if (!this.selectedTextId) return;
            
            const textElement = document.getElementById(this.selectedTextId);
            if (!textElement) return;
            
            let textData = this.bigTexts.find(t => t.id === this.selectedTextId);
            if (!textData) {
                textData = this.smallTexts.find(t => t.id === this.selectedTextId);
            }
            
            if (textData) {
                textData.color = this.currentTextColor;
                textElement.style.color = this.currentTextColor;
            }
        },
        deleteSelectedText() {
            if (!this.selectedTextId) return;
            
            const indexBig = this.bigTexts.findIndex(t => t.id === this.selectedTextId);
            if (indexBig !== -1) {
                this.bigTexts.splice(indexBig, 1);
            } else {
                const indexSmall = this.smallTexts.findIndex(t => t.id === this.selectedTextId);
                if (indexSmall !== -1) {
                    this.smallTexts.splice(indexSmall, 1);
                }
            }
            
            const textElement = document.getElementById(this.selectedTextId);
            if (textElement) {
                textElement.remove();
            }
            
            this.selectedTextId = null;
        },
        adjustTextSize(delta) {
            if (!this.selectedTextId) return;
            
            const textElement = document.getElementById(this.selectedTextId);
            if (!textElement) return;
            
            let textData = this.bigTexts.find(t => t.id === this.selectedTextId);
            if (!textData) {
                textData = this.smallTexts.find(t => t.id === this.selectedTextId);
            }
            
            if (textData) {
                textData.fontSize = Math.max(12, Math.min(100, textData.fontSize + delta));
                textElement.style.fontSize = textData.fontSize + 'px';
            }
        }
    }
}
</script>

<tongji/>

<comment/>


<style>
.cover-composer-wrapper * {
    box-sizing: border-box;
}
.cover-composer-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
.tools-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px 20px;
    background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
    border-radius: 12px;
    margin-bottom: 24px;
    align-items: center;
}
.tool-group {
    display: flex;
    align-items: center;
    gap: 10px;
}
.tool-label {
    font-size: 14px;
    font-weight: 500;
    color: #666;
}
.btn-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}
.btn-text:hover {
    background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
    color: white;
}
.btn-delete {
    background: #ff6b6b;
    color: white;
}
.btn-delete:hover {
    background: #ee5a5a;
    color: white;
}
.color-picker {
    width: 40px;
    height: 40px;
    padding: 0;
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}
.color-picker:hover {
    border-color: #4096ff;
    transform: scale(1.05);
}
.color-label {
    font-size: 13px;
    color: #666;
    font-family: monospace;
    min-width: 60px;
}
.cover-composer-grid {
    display: flex;
    flex-direction: row;
    gap: 24px;
    margin-bottom: 24px;
    width: 100%;
}
@media (max-width: 768px) {
    .cover-composer-grid {
        flex-direction: column;
    }
}
.panel {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 20px;
    transition: box-shadow 0.3s ease;
}
.panel:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
.panel-big {
    flex: 0 0 auto;
    width: calc(70% - 12px);
    min-width: 0;
}
.panel-small {
    flex: 0 0 auto;
    width: calc(30% - 12px);
    min-width: 0;
}
@media (max-width: 768px) {
    .panel-big, .panel-small {
        width: 100%;
    }
}
.panel-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #f0f0f0;
}
.image-source-section {
    margin-bottom: 16px;
}
.source-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 12px;
    background: #f5f5f5;
    padding: 4px;
    border-radius: 8px;
}
.source-tab {
    flex: 1;
    padding: 8px 12px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    transition: all 0.2s ease;
}
.source-tab:hover {
    color: #333;
}
.source-tab.active {
    background: white;
    color: #333;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.source-content {
    display: none;
}
.source-content.active {
    display: block;
}
.file-input-wrapper {
    margin-bottom: 16px;
}
.file-input {
    width: 100%;
    padding: 10px 12px;
    border: 2px dashed #d9d9d9;
    border-radius: 8px;
    background: #fafafa;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
}
.file-input:hover {
    border-color: #4096ff;
    background: #f0f7ff;
}
.select-input, .url-input {
    width: 100%;
    padding: 10px 12px;
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    background: white;
    font-size: 14px;
    transition: all 0.3s ease;
}
.select-input:hover, .url-input:hover {
    border-color: #4096ff;
}
.select-input:focus, .url-input:focus {
    outline: none;
    border-color: #4096ff;
    box-shadow: 0 0 0 3px rgba(64, 150, 255, 0.1);
}
.url-input-group {
    display: flex;
    gap: 8px;
}
.url-input-group .url-input {
    flex: 1;
}
.btn-small {
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    white-space: nowrap;
}
.btn-small:hover {
    background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
    transform: translateY(-1px);
}
.button-group {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
}
.btn {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #f5f5f5;
    color: #333;
}
.btn:hover {
    background: #e8e8e8;
    transform: translateY(-1px);
}
.btn:active {
    transform: translateY(0);
}
.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 14px 32px;
    font-size: 16px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
.btn-primary:hover {
    background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
    transform: translateY(-2px);
}
.canvas-wrapper {
    width: 100%;
    position: relative;
}
.canvas-wrapper-big {
    aspect-ratio: 900 / 383;
}
.canvas-wrapper-small {
    aspect-ratio: 1 / 1;
}
.canvas-container {
    width: 100%;
    height: 100%;
    border: 2px solid #e8e8e8;
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(45deg, #f9f9f9 25%, transparent 25%), 
                linear-gradient(-45deg, #f9f9f9 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #f9f9f9 75%), 
                linear-gradient(-45deg, transparent 75%, #f9f9f9 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    cursor: move;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.canvas-container:hover {
    border-color: #4096ff;
    box-shadow: 0 0 0 3px rgba(64, 150, 255, 0.1);
}
.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #999;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
}
.download-section {
    text-align: center;
    padding: 20px 0;
}
.text-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.text-item {
    position: absolute;
    cursor: move;
    user-select: none;
    pointer-events: auto;
    white-space: nowrap;
    font-weight: 600;
    padding: 4px 8px;
    border: 2px dashed transparent;
    border-radius: 4px;
    transition: border-color 0.2s ease, background-color 0.2s ease;
}
.text-item:hover {
    border-color: rgba(64, 150, 255, 0.3);
    background-color: rgba(64, 150, 255, 0.1);
}
.text-item.selected {
    border-color: #4096ff;
    background-color: rgba(64, 150, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(64, 150, 255, 0.3);
}
</style>
