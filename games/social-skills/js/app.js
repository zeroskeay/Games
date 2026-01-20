// ==================== 应用状态管理 ====================
let currentLevel = 1;
let userProgress = loadProgress();

// 从LocalStorage加载进度
function loadProgress() {
    const saved = localStorage.getItem('socialSkillsProgress');
    if (saved) {
        return JSON.parse(saved);
    }
    // 默认进度
    return {
        1: { completed: [], checkpoints: [] },
        2: { completed: [], checkpoints: [] },
        3: { completed: [], checkpoints: [] },
        4: { completed: [], checkpoints: [] },
        5: { completed: [], checkpoints: [] },
        6: { completed: [], checkpoints: [] }
    };
}

// 保存进度到LocalStorage
function saveProgress() {
    localStorage.setItem('socialSkillsProgress', JSON.stringify(userProgress));
}

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initLevelTabs();
    initProgressOverview();
    loadCourseContent(currentLevel);
    initScenarioSelector(currentLevel);
    initTemplates(currentLevel);
    initFloatingButton();
    initModal();
});

// ==================== 主题切换 ====================
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', theme);

    const themeToggle = document.getElementById('themeToggle');
    updateThemeIcon(theme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.toggle-icon');
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ==================== 等级导航 ====================
function initLevelTabs() {
    const tabs = document.querySelectorAll('.level-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const level = parseInt(this.getAttribute('data-level'));
            switchLevel(level);
        });
    });
}

function switchLevel(level) {
    currentLevel = level;

    // 更新选中状态
    document.querySelectorAll('.level-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-level="${level}"]`).classList.add('active');

    // 加载内容
    loadCourseContent(level);
    initScenarioSelector(level);
    initTemplates(level);

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== 进度概览 ====================
function initProgressOverview() {
    const container = document.getElementById('levelProgress');
    let html = '';

    for (let level = 1; level <= 6; level++) {
        const course = coursesData[level];
        const progress = calculateLevelProgress(level);

        html += `
            <div class="progress-item">
                <div class="progress-item-icon">${course.icon}</div>
                <div class="progress-item-name">Level ${level}</div>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-percentage">${progress}%</div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function calculateLevelProgress(level) {
    const completed = userProgress[level].checkpoints.length;
    const total = coursesData[level].checkpoints.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
}

// ==================== 课程内容加载 ====================
function loadCourseContent(level) {
    const course = coursesData[level];
    const container = document.getElementById('courseContent');

    let html = `
        <h2>${course.icon} Level ${level}: ${course.name}</h2>
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 2rem;">
            ${course.description}
        </p>
        
        <div class="theory-section">
            ${course.theory.content}
        </div>
        
        <div class="techniques-section">
            <h3>🛠️ 实战技巧</h3>
    `;

    // 渲染技巧卡片
    course.techniques.forEach((tech, index) => {
        html += `
            <div class="technique-card">
                <div class="technique-title">${index + 1}. ${tech.title}</div>
                <div class="technique-formula">${tech.formula}</div>
        `;

        if (tech.example) {
            if (tech.example.wrong && tech.example.right) {
                html += `
                    <div class="example-comparison">
                        <div class="example-wrong">
                            <span class="example-label">❌ 错误示范</span>
                            <p>${tech.example.wrong}</p>
                        </div>
                        <div class="example-right">
                            <span class="example-label">✅ 正确示范</span>
                            <p>${tech.example.right}</p>
                        </div>
                    </div>
                `;
            }

            if (tech.example.key) {
                html += `<p><strong>关键点：</strong>${tech.example.key}</p>`;
            }

            if (tech.example.topics) {
                html += '<ul>';
                tech.example.topics.forEach(topic => {
                    html += `<li>${topic}</li>`;
                });
                html += '</ul>';
            }

            if (tech.example.categories) {
                html += '<ul>';
                tech.example.categories.forEach(cat => {
                    html += `<li>${cat}</li>`;
                });
                html += '</ul>';
                if (tech.example.key) {
                    html += `<p><strong>关键：</strong>${tech.example.key}</p>`;
                }
            }

            if (tech.example.games) {
                html += '<ul>';
                tech.example.games.forEach(game => {
                    html += `<li>${game}</li>`;
                });
                html += '</ul>';
            }

            if (tech.example.question) {
                html += `<p><strong>问题：</strong>${tech.example.question}</p>`;
            }

            if (tech.example.context) {
                html += `<p><strong>场景：</strong>${tech.example.context}</p>`;
            }

            if (tech.example.analysis) {
                html += `<p><strong>分析：</strong>${tech.example.analysis}</p>`;
            }
        }

        html += `</div>`;
    });

    html += `
        </div>
        
        <div class="checkpoints-section" style="margin-top: 2rem;">
            <h3>✅ 过关标准</h3>
            <p style="margin-bottom: 1rem;">完成以下任意 <strong>${Math.ceil(course.checkpoints.length * 0.6)}</strong> 项，即可进入下一等级：</p>
            <div>
    `;

    course.checkpoints.forEach((checkpoint, index) => {
        const isChecked = userProgress[level].checkpoints.includes(index);
        html += `
            <label style="display: flex; align-items: center; padding: 0.75rem; margin-bottom: 0.5rem; background: var(--bg-secondary); border-radius: 8px; cursor: pointer;">
                <input type="checkbox" 
                       ${isChecked ? 'checked' : ''} 
                       onchange="toggleCheckpoint(${level}, ${index})"
                       style="margin-right: 0.75rem; width: 18px; height: 18px; cursor: pointer;">
                <span>${checkpoint}</span>
            </label>
        `;
    });

    html += `
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// 切换过关标准
function toggleCheckpoint(level, index) {
    const checkpoints = userProgress[level].checkpoints;
    const idx = checkpoints.indexOf(index);

    if (idx > -1) {
        checkpoints.splice(idx, 1);
    } else {
        checkpoints.push(index);
    }

    saveProgress();
    initProgressOverview();
}

// ==================== 场景练习 ====================
function initScenarioSelector(level) {
    const select = document.getElementById('scenarioSelect');
    const scenarios = getScenariosByLevel(level);

    let html = '<option value="">-- 请选择场景 --</option>';
    scenarios.forEach(scenario => {
        html += `<option value="${scenario.id}">${scenario.name} (${scenario.difficulty})</option>`;
    });

    select.innerHTML = html;

    select.onchange = function () {
        const scenarioId = this.value;
        if (scenarioId) {
            loadScenario(scenarioId);
        } else {
            document.getElementById('scenarioContent').innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">🎯</span>
                    <p>选择一个场景开始练习</p>
                </div>
            `;
        }
    };

    // 清空场景内容
    document.getElementById('scenarioContent').innerHTML = `
        <div class="empty-state">
            <span class="empty-icon">🎯</span>
            <p>选择一个场景开始练习</p>
        </div>
    `;
}

function loadScenario(scenarioId) {
    const scenarios = getAllScenarios();
    const scenario = scenarios.find(s => s.id === scenarioId);

    if (!scenario) return;

    let html = `
        <div class="scenario-detail">
            <div class="scenario-header">
                <div class="scenario-name">${scenario.name}</div>
                <div class="scenario-meta">
                    <span>📊 Level ${scenario.level}</span>
                    <span>⭐ ${scenario.difficulty}</span>
                </div>
            </div>
            
            <div class="scenario-description">
                <h4>📋 场景描述</h4>
                <p>${scenario.description}</p>
            </div>
            
            <div class="mental-prep">
                <h4>🧠 心理准备</h4>
                <ul>
    `;

    scenario.mentalPrep.forEach(prep => {
        html += `<li>${prep}</li>`;
    });

    html += `
                </ul>
            </div>
            
            <div class="practice-steps">
                <h4>🎬 分步练习</h4>
    `;

    scenario.steps.forEach((step, index) => {
        const isCompleted = userProgress[scenario.level].completed.includes(scenarioId + '_' + index);

        html += `
            <div class="step-card">
                <div class="step-header">
                    <div class="step-number">${step.step}</div>
                    <div class="step-title">${step.title}</div>
                </div>
        `;

        if (step.wrong && step.right) {
            html += `
                <div class="step-comparison">
                    <div class="example-wrong">
                        <span class="example-label">❌ 错误示范</span>
                        <div>${step.wrong}</div>
                    </div>
                    <div class="example-right">
                        <span class="example-label">✅ 正确示范</span>
                        <div>${step.right}</div>
                    </div>
                </div>
            `;
        } else if (step.wrong) {
            html += `
                <div class="example-wrong" style="margin-bottom: 1rem;">
                    <span class="example-label">❌ 错误示范</span>
                    <div>${step.wrong}</div>
                </div>
            `;
        } else if (step.right) {
            html += `
                <div class="example-right" style="margin-bottom: 1rem;">
                    <span class="example-label">✅ 正确示范</span>
                    <div>${step.right}</div>
                </div>
            `;
        }

        if (step.keyPoints && step.keyPoints.length > 0) {
            html += '<div style="margin-top: 1rem;"><strong>📌 关键要点：</strong><ul style="margin-top: 0.5rem;">';
            step.keyPoints.forEach(point => {
                html += `<li>${point}</li>`;
            });
            html += '</ul></div>';
        }

        if (step.brainSimulation) {
            html += `
                <div class="brain-simulation">
                    <h5>🧠 脑内模拟</h5>
                    <p>${step.brainSimulation}</p>
                </div>
            `;
        }

        html += `
                <button class="step-complete-btn ${isCompleted ? 'completed' : ''}" 
                        onclick="completeStep('${scenarioId}', ${index}, ${scenario.level})">
                    ${isCompleted ? '✅ 已完成' : '标记完成'}
                </button>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    document.getElementById('scenarioContent').innerHTML = html;
}

// 完成步骤
function completeStep(scenarioId, stepIndex, level) {
    const key = scenarioId + '_' + stepIndex;
    const completed = userProgress[level].completed;

    if (!completed.includes(key)) {
        completed.push(key);
        saveProgress();
        loadScenario(scenarioId);
        initProgressOverview();
    }
}

// ==================== 模板库 ====================
const templatesData = {
    1: [
        { category: '破冰开场', name: '环境观察破冰', content: '这家店/这个地方真不错，你之前来过吗？', tag: 'Level 1' },
        { category: '破冰开场', name: '共同经历破冰', content: '刚才那个【活动/会议】挺有意思的，你觉得怎么样？', tag: 'Level 1' },
        { category: '破冰开场', name: '状态关心破冰', content: '你看起来【有点累/心情不错】，最近忙吗？', tag: 'Level 1' }
    ],
    2: [
        { category: '信息延展', name: '兴趣爱好延展', content: '我喜欢【项目】，最近在【具体活动】，你呢？', tag: 'Level 2' },
        { category: '信息延展', name: '周末计划延展', content: '我打算【计划】，【原因/细节】。你有什么安排吗？', tag: 'Level 2' },
        { category: '信息延展', name: '工作话题延展', content: '我做【职业】，最近在忙【具体项目】，挺【感受】的。你是做什么的？', tag: 'Level 2' }
    ],
    3: [
        { category: '情绪共鸣', name: '累的共鸣', content: '我懂我懂，【那种感觉】真的很【累/难受】。是因为【追问原因】吗？', tag: 'Level 3' },
        { category: '情绪共鸣', name: '开心的共鸣', content: '哈哈，感觉你特别【开心/兴奋】！是因为【猜测原因】吗？', tag: 'Level 3' },
        { category: '情绪共鸣', name: '"我也是"公式', content: '我也是！我之前【类似经历】，【简短感受】。你是什么时候【回到对方】？', tag: 'Level 3' }
    ],
    4: [
        { category: '自我披露', name: '工作故事', content: '我做【职业】，之前有次【具体事件】，当时【感受】，不过【收获】。', tag: 'Level 4' },
        { category: '自我披露', name: '旅行故事', content: '我去过【地方】，本以为【预期】，结果【反转】，但【难忘点】让我觉得值了。', tag: 'Level 4' },
        { category: '自我披露', name: '学习故事', content: '我在学【技能】，刚开始【困难】，但坚持【时间】后，【进步/成就感】。', tag: 'Level 4' }
    ],
    5: [
        { category: '推拉话术', name: '推拉基础公式', content: '【调侃】...不过【夸奖】😄', tag: 'Level 5' },
        { category: '推拉话术', name: '假装嫌弃', content: '天哪，你这个【标签】（推）...【拉回+邀约】', tag: 'Level 5' },
        { category: '推拉话术', name: '暧昧误会', content: '怎么，【往暧昧理解】？...开玩笑的啦，【拉回】', tag: 'Level 5' }
    ],
    6: [
        { category: '控场话术', name: '话题转换', content: '【总结当前】。对了说到这个，【桥接】，【新话题】？', tag: 'Level 6' },
        { category: '控场话术', name: '拉入冷落者', content: '对了【名字】，你之前不是【相关经历】吗？你觉得怎么样？', tag: 'Level 6' },
        { category: '控场话术', name: '化解争论', content: '你们俩先停一下，其实都有道理，只是角度不同。咱们【求同存异/换话题】吧', tag: 'Level 6' }
    ]
};

function initTemplates(level) {
    const templates = templatesData[level] || [];

    // 渲染分类按钮
    const categories = [...new Set(templates.map(t => t.category))];
    let categoryHtml = `
        <button class="category-btn active" data-category="all">全部</button>
    `;
    categories.forEach(cat => {
        categoryHtml += `<button class="category-btn" data-category="${cat}">${cat}</button>`;
    });

    document.getElementById('templateCategories').innerHTML = categoryHtml;

    // 初始显示全部
    renderTemplates(templates);

    // 分类点击事件
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            const filtered = category === 'all' ? templates : templates.filter(t => t.category === category);
            renderTemplates(filtered);
        });
    });
}

function renderTemplates(templates) {
    let html = '';

    if (templates.length === 0) {
        html = '<div class="empty-state"><p>本等级暂无模板</p></div>';
    } else {
        templates.forEach(template => {
            html += `
                <div class="template-card">
                    <div class="template-header">
                        <div class="template-name">${template.name}</div>
                        <div class="template-tag">${template.tag}</div>
                    </div>
                    <div class="template-content">${template.content}</div>
                    <div class="template-actions">
                        <button class="copy-btn" onclick="copyTemplate('${escapeHtml(template.content)}', this)">
                            📋 复制
                        </button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('templateList').innerHTML = html;
}

function copyTemplate(content, btn) {
    // 解码HTML实体
    const textarea = document.createElement('textarea');
    textarea.innerHTML = content;
    const decodedContent = textarea.value;

    navigator.clipboard.writeText(decodedContent).then(() => {
        btn.textContent = '✅ 已复制';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '📋 复制';
            btn.classList.remove('copied');
        }, 2000);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== 浮动按钮和弹窗 ====================
function initFloatingButton() {
    document.getElementById('progressBtn').addEventListener('click', function () {
        showProgressModal();
    });
}

function initModal() {
    const modal = document.getElementById('progressModal');
    const closeBtn = document.getElementById('closeModal');

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

function showProgressModal() {
    const modal = document.getElementById('progressModal');
    const body = document.getElementById('progressDetails');

    let html = '';

    for (let level = 1; level <= 6; level++) {
        const course = coursesData[level];
        const progress = calculateLevelProgress(level);
        const completedCheckpoints = userProgress[level].checkpoints.length;
        const totalCheckpoints = course.checkpoints.length;
        const completedScenarios = userProgress[level].completed.length;

        html += `
            <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                <h4 style="margin-bottom: 0.5rem;">${course.icon} Level ${level}: ${course.name}</h4>
                <div style="margin-bottom: 0.75rem;">
                    <div class="progress-bar" style="margin-bottom: 0.5rem;">
                        <div class="progress-bar-fill" style="width: ${progress}%"></div>
                    </div>
                    <p style="font-size: 0.875rem; color: var(--text-secondary);">
                        完成度: ${progress}%
                    </p>
                </div>
                <div style="font-size: 0.875rem;">
                    <p>✅ 过关标准: ${completedCheckpoints}/${totalCheckpoints} 项</p>
                    <p>🎬 场景练习: ${completedScenarios} 个步骤完成</p>
                </div>
            </div>
        `;
    }

    body.innerHTML = html;
    modal.classList.add('show');
}
