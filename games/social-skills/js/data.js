// ==================== 课程数据 ====================
const coursesData = {
    1: {
        level: 1,
        name: "破冰勇气与心态",
        icon: "💪",
        description: "克服对冷场的恐惧，建立'不是我的错'的心态",
        theory: {
            title: "理论基础",
            content: `
                <h3>为什么会恐惧开口？</h3>
                <p>大多数社交恐惧来自于<strong>错误的归因模式</strong>：</p>
                <div class="technique-card">
                    <p><strong>❌ 错误归因：</strong>"冷场了，肯定是我太无聊"</p>
                    <p><strong>✅ 正确归因：</strong>"可能对方也在思考说什么"</p>
                </div>
                <div class="technique-card">
                    <h4>冷场的真相</h4>
                    <p>冷场是<strong>双方的责任</strong>，不是你一个人的问题。对话是两个人的舞蹈，如果对方也不主动，那你只是遇到了一个同样不擅长社交的人。</p>
                </div>
            `
        },
        techniques: [
            {
                title: "3秒勇气法则",
                formula: "数 3-2-1 → 不管说什么都开口 → 恐惧消失80%",
                example: {
                    wrong: "在脑海里纠结'说什么好'，然后保持沉默",
                    right: "3-2-1，直接说：'今天天气不错啊'",
                    key: "不要等待完美的开场白，任何开场都比沉默好"
                }
            },
            {
                title: "降低期待值",
                formula: "不要给自己设定'必须说有趣的话'的压力",
                example: {
                    wrong: "我要成为话题中心，说的话必须让大家笑",
                    right: "我只需要参与对话，说的话是真实的就行",
                    key: "破冰的目的是打破沉默，不是娱乐大众"
                }
            },
            {
                title: "安全话题清单",
                formula: "准备5个永远不会错的破冰话题",
                example: {
                    topics: [
                        "天气/环境：'今天天气真好啊'",
                        "最近的共同经历：'刚才那个会议挺有意思的'",
                        "对方的状态：'你看起来有点累，工作很忙吗？'",
                        "中性的观察：'这家店的装修挺特别的'",
                        "简单的问候：'最近怎么样？'"
                    ]
                }
            }
        ],
        checkpoints: [
            "在聚会上主动和1个陌生人打招呼",
            "遇到冷场时，能在10秒内重新开启话题",
            "在团体对话中至少插话2次",
            "一周内至少有3次主动开口的经历",
            "能够在冷场时保持自然，不陷入焦虑"
        ]
    },

    2: {
        level: 2,
        name: "信息延展",
        icon: "💬",
        description: "拒绝一问一答，将'是/否'转化为完整的事实陈述",
        theory: {
            title: "理论基础",
            content: `
                <h3>什么是"一问一答"陷阱？</h3>
                <div class="technique-card">
                    <p><strong>典型失败模式：</strong></p>
                    <p>对方: "周末去哪玩了？"</p>
                    <p>你: "没去哪"</p>
                    <p>对方: "......"（不知道怎么继续）</p>
                </div>
                <h3>信息延展的核心原理</h3>
                <p><strong>对话像传球：你的回答应该给对方提供下一个话题。</strong></p>
                <div class="example-comparison">
                    <div class="example-wrong">
                        <span class="example-label">❌ 终结式</span>
                        <p>"是的" / "没有" / "还行"</p>
                    </div>
                    <div class="example-right">
                        <span class="example-label">✅ 延展式</span>
                        <p>"是的，我去了XX，那里很有意思"</p>
                    </div>
                </div>
            `
        },
        techniques: [
            {
                title: "是/否 + 事实补充",
                formula: "简单回答 + 因为/其实/不过 + 具体事实",
                example: {
                    wrong: "喜欢",
                    right: "喜欢，他们家的咖啡特别香",
                    key: "补充的信息给了对方继续聊的'抓手'"
                }
            },
            {
                title: "多说一句法则",
                formula: "每次回答后，强迫自己多说一句相关的话",
                example: {
                    wrong: "看书",
                    right: "看书，最近在看推理小说，你呢？",
                    key: "多说的内容可以是：具体细节、最近的例子、反问、相关感受"
                }
            },
            {
                title: "三个信息点结构",
                formula: "直接回答 + 具体细节 + 延展话题点",
                example: {
                    question: "你周末干嘛了？",
                    right: "我去了郊区爬山，天气特别好，人也不多。你周末有什么安排吗？",
                    key: "包含：事实（爬山）+ 细节（天气好、人少）+ 反问"
                }
            }
        ],
        checkpoints: [
            "一周内至少有5次对话避免了一问一答",
            "能在每次回答中自然地添加1-2个延展信息",
            "反问前都先提供了自己的信息",
            "被人夸'和你聊天很舒服'",
            "对话持续时间比之前平均增长50%"
        ]
    },

    3: {
        level: 3,
        name: "情绪共鸣与抓钩子",
        icon: "❤️",
        description: "从'事实逻辑'转向'情绪逻辑'，捕捉对方话语中的状态词",
        theory: {
            title: "理论基础",
            content: `
                <h3>事实逻辑 vs 情绪逻辑</h3>
                <div class="example-comparison">
                    <div class="example-wrong">
                        <span class="example-label">事实逻辑</span>
                        <p>"你去哪玩了？" → "去了XX景点" → "那里好玩吗？"</p>
                        <p style="margin-top:0.5rem; font-size:0.875rem; opacity:0.8;">像在查资料</p>
                    </div>
                    <div class="example-right">
                        <span class="example-label">情绪逻辑</span>
                        <p>"你去哪玩了？" → "去了XX，人超多累死了" → "哈哈我懂，我上次也是"</p>
                        <p style="margin-top:0.5rem; font-size:0.875rem; opacity:0.8;">像在交朋友</p>
                    </div>
                </div>
                <h3>什么是"钩子"？</h3>
                <p><strong>钩子 = 对方话语中透露出的情绪、状态或感受</strong></p>
                <div class="technique-card">
                    <h4>常见状态词识别</h4>
                    <p>🔴 <strong>疲惫类：</strong>累、困、发呆、崩溃、快疯了</p>
                    <p>🟢 <strong>兴奋类：</strong>活过来、爽、开心、激动</p>
                    <p>🟡 <strong>焦虑类：</strong>紧张、忐忑、怕、担心</p>
                    <p>🔵 <strong>放松类：</strong>舒服、放松、自在、惬意</p>
                </div>
            `
        },
        techniques: [
            {
                title: "状态共鸣公式",
                formula: "状态词 + 共鸣表达 + 延展问题",
                example: {
                    context: "对方说：'这周累爆了，天天加班到11点'",
                    analysis: "识别状态词：'累爆了'",
                    right: "我懂我懂，这种强度真的扛不住。是项目要上线吗？",
                    key: "先共鸣情绪，再追问细节"
                }
            },
            {
                title: "'我也是'共鸣法",
                formula: "'我也是！' + 你的类似体验 + 回到对方",
                example: {
                    context: "对方：'我刚养了只猫，现在每天回家都特别开心'",
                    right: "我也是！我家猫每次听到开门就跑过来，那种感觉真的太治愈了。你家猫是什么品种？",
                    key: "快速建立共鸣，然后把话题还给对方"
                }
            },
            {
                title: "避免攻略式聊天",
                formula: "聊感受而不是聊清单",
                example: {
                    wrong: "你去了哪些城市？→ 去了哪些景点？→ 好玩吗？",
                    right: "哇，是不是玩得特别开心不想回来？→ 有什么特别难忘的经历吗？",
                    key: "从收集信息变成交流感受"
                }
            }
        ],
        checkpoints: [
            "一周内至少有5次对话成功抓住情绪钩子",
            "能够在对话中自然地从事实转向情绪",
            "对话中至少有3次成功的'我也是'共鸣",
            "减少'怎么做/哪里好玩'类攻略式提问",
            "被对方说'和你聊天很有共鸣'"
        ]
    },

    4: {
        level: 4,
        name: "自我披露与故事力",
        icon: "📖",
        description: "在对话中自然地展示自己的价值和生活趣事，而不像在炫耀",
        theory: {
            title: "理论基础",
            content: `
                <h3>为什么需要自我披露？</h3>
                <p>如果你只是<strong>倾听者</strong>和<strong>提问者</strong>，对方会觉得：</p>
                <ul>
                    <li>"这个人好像对我挺感兴趣，但我完全不了解TA"</li>
                    <li>"感觉像在被采访"</li>
                </ul>
                <p><strong>好的对话是双向的信息交换，不是单向采访。</strong></p>
                <h3>自我披露的平衡</h3>
                <div class="example-comparison">
                    <div class="example-wrong">
                        <span class="example-label">❌ 披露不足</span>
                        <p>只问不说，像记者</p>
                    </div>
                    <div class="example-right">
                        <span class="example-label">✅ 恰当披露</span>
                        <p>有来有往，有互动</p>
                    </div>
                </div>
            `
        },
        techniques: [
            {
                title: "故事化披露",
                formula: "场景引入 + 趣事/挑战 + 感受/教训",
                example: {
                    wrong: "我上个月赚了10万（直接炫耀）",
                    right: "我做自由职业，上个月接了个大项目，连着熬了一周夜，累到怀疑人生，不过看到成果还挺有成就感的",
                    key: "强调过程和感受，而非结果"
                }
            },
            {
                title: "自我披露三层结构",
                formula: "事实层 + 感受层 + 思考层（可选）",
                example: {
                    shallow: "我去爬山了（只有事实）",
                    deep: "我去爬山了，爬到一半累到想放弃（感受），但咬牙爬上去之后，发现风景真的超值。有时候人生也是这样，越难的事情回报越大（思考）",
                    key: "根据对话氛围调整深度"
                }
            },
            {
                title: "趣事库建设",
                formula: "准备5-10个可复用的故事",
                example: {
                    categories: [
                        "工作：一次印象深刻的项目经历",
                        "旅行：一次有趣/尴尬的旅行",
                        "社交：一次破冰/社恐的经历",
                        "学习：学某个技能的趣事",
                        "日常：宠物/美食/运动的小故事"
                    ],
                    key: "好的故事需要：真实 + 细节 + 情绪"
                }
            }
        ],
        checkpoints: [
            "准备了至少5个可复用的个人故事",
            "一周内至少有3次自然地分享了自己的经历",
            "对话中能做到'问-答-反问'的平衡",
            "被对方说'你经历挺丰富的'",
            "能够在展示价值时不显得炫耀"
        ]
    },

    5: {
        level: 5,
        name: "推拉与张力",
        icon: "⚡",
        description: "制造'暧昧的玩笑'，掌握Flirting的艺术",
        theory: {
            title: "理论基础",
            content: `
                <h3>什么是"推拉"？</h3>
                <p><strong>推</strong> = 制造距离感、挑战、调侃<br>
                <strong>拉</strong> = 释放好感、夸奖、靠近</p>
                <div class="technique-card">
                    <h4>推拉的本质</h4>
                    <p>制造情绪波动，让对话不是一条平线</p>
                    <p>平淡对话：————（安全但无聊）</p>
                    <p>推拉对话：～～～～（有趣、有张力）</p>
                </div>
                <h3>推拉的核心原则</h3>
                <p><strong>⚠️ 推拉不是PUA，不是操纵，而是一种"有趣的互动方式"</strong></p>
                <p>✅ 健康的推拉：双方都觉得有趣、基于善意的调侃、尊重边界</p>
            `
        },
        techniques: [
            {
                title: "基础推拉公式",
                formula: "调侃（推）+ 笑容/夸奖（拉）",
                example: {
                    context: "对方：'我今天化妆化了一小时'",
                    right: "哇，一小时？那我得好好看看值不值（推）...嗯，效果不错，挺好看的（拉）",
                    key: "笑着说，让对方知道是玩笑"
                }
            },
            {
                title: "假装嫌弃",
                formula: "夸张语气 + 玩笑调侃 + 立刻拉回",
                example: {
                    context: "对方：'我今天吃了三顿火锅'",
                    right: "天哪，你这个吃货，离你远点，怕被你吃穷（推）...不过能吃是福，我也喜欢火锅，下次一起去？（拉）",
                    key: "夸张的语气 + 后面立刻拉回 + 制造下次机会"
                }
            },
            {
                title: "角色扮演",
                formula: "给对方贴有趣的标签 + 围绕标签调侃",
                example: {
                    context: "对方：'我又点外卖了'",
                    right: "又点？你这个月外卖费得上天了吧...以后叫你'外卖小公主'好了",
                    key: "标签要可爱/有趣，不能贬低"
                }
            }
        ],
        checkpoints: [
            "一周内至少有3次成功的推拉互动",
            "能够自然地调侃对方而不冒犯",
            "被对方说'你好坏'（带笑）",
            "成功制造暧昧氛围至少2次",
            "能够把握推拉的边界"
        ]
    },

    6: {
        level: 6,
        name: "社交直觉与控场",
        icon: "👑",
        description: "主导对话节奏，在多人场合游刃有余",
        theory: {
            title: "理论基础",
            content: `
                <h3>什么是"控场"？</h3>
                <p><strong>控场 = 掌握对话的节奏、方向和氛围，但不是独霸话题</strong></p>
                <div class="example-comparison">
                    <div class="example-wrong">
                        <span class="example-label">❌ 控场误区</span>
                        <p>一直说话不让别人插嘴<br>只聊自己感兴趣的话题<br>压制别人的意见</p>
                    </div>
                    <div class="example-right">
                        <span class="example-label">✅ 正确控场</span>
                        <p>引导话题但鼓励他人发言<br>照顾所有人的兴趣<br>让每个人都有表达机会</p>
                    </div>
                </div>
                <h3>社交直觉</h3>
                <p>快速读懂场合、氛围和人，并做出适当反应</p>
            `
        },
        techniques: [
            {
                title: "话题转换的艺术",
                formula: "总结当前话题 + 桥接句 + 新话题",
                example: {
                    context: "当前话题：工作加班，气氛变沉重",
                    right: "看来大家最近都挺累的（总结）。对了说到累，上周我发现一家按摩店超级舒服（桥接），你们平时怎么放松啊？（新话题）",
                    key: "何时该换：连续3-5秒沉默、大部分人不参与、有人明显不舒服"
                }
            },
            {
                title: "照顾冷落者",
                formula: "提到TA的名字 + 相关问题",
                example: {
                    context: "大家在聊旅游，小李一直没说话",
                    right: "对了小李，你之前不是去过云南吗？你觉得怎么样？",
                    key: "让每个人感觉被重视"
                }
            },
            {
                title: "破冰游戏储备",
                formula: "当气氛僵硬时，用游戏破冰",
                example: {
                    games: [
                        "快问快答：每人轮流问问题，被点到的人必须秒答",
                        "真心话（温和版）：准备轻松的问题，避免隐私",
                        "这个人是谁：每人说一件趣事，其他人猜"
                    ],
                    key: "选择轻松、全员参与的游戏"
                }
            }
        ],
        checkpoints: [
            "在多人聚会中成功主导过至少2次话题转换",
            "成功拉入过被冷落的人至少3次",
            "化解过尴尬局面至少2次",
            "被朋友评价'和你一起聚会气氛很好'",
            "能够在3人以上的场合自如控场"
        ]
    }
};
