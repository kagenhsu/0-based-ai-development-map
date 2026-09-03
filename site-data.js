globalThis.AI_MAP_DATA = {
  title: "0 基礎 AI 開發地圖",
  subtitle: "從想法、需求到可驗收的網站、系統與 App。",
  fullMapUrl: "0-based-ai-development-map.html",
  homeStory: [
    "如果你跟我一樣，腦中偶爾會跳出一個 APP 的想法，我會帶你走完一整個流程。",
    "從我有一個想法，到它變成了一個在手機上能用的應用，全程不需要你寫一行程式碼，不需要你學任何程式語言，也不需要你花錢買任何軟體。",
    "你唯一需要做的就是對 AI 說出你的想法。我會帶你從專案準備、產品想法、需求文件、開發上線逐步推進，讓應用自己長出來。",
    "從選擇適合的智能體、大模型，建立工作空間，再到讓 AI 幫你理清需求、整理成功能清單，制定完整的產品需求文件、產品原型、UI 介面、技術開發文件與開發計畫，並進行開發、驗收、上線。",
    "你可以使用這個流程開發網頁、小程式、手機應用程式與電腦軟體。"
  ],
  prepGuide: {
    title: "第 0 步｜選一個 AI 開發助手、智能體",
    lead: "先選擇開發助手與大模型，再建立本機工作空間。後續文件、程式與測試都會放在同一個專案資料夾。",
    sections: [
      {
        title: "1｜選擇 AI 開發助手",
        kind: "assistant-comparison",
        paragraphs: [
          "不論是國外的 Claude Code、Codex，或 CodeBuddy、WorkBuddy、TRAE、豆包、千問等工具，都可以依任務選用。",
          "如果從來沒有用過，中國地區可先選擇安裝與操作較簡單的國產辦公智能體；台灣可使用 Claude Code 或 Codex。",
          "原稿的 WorkBody 經官方資料核對後校正為 WorkBuddy；「Coder」無法確認是指哪一項產品，先列為待確認。"
        ],
        bullets: [
          "安裝後即可使用，減少網路或服務限制",
          "不必手動配置複雜環境",
          "可切換不同的大模型",
          "可安裝各種技能與插件"
        ],
        warning: "注意：不要使用來源不明的第三方中介軟體，以免產生帳號、資料與付款風險。"
      },
      {
        title: "2｜替智能體選擇大模型",
        image: {
          src: "assets/model-routing-guide.png",
          alt: "高低模型搭配：高階模型決定方向，性價比模型負責大量執行，不確定時可使用自動模式。"
        },
        paragraphs: [
          "選完工具後，還要替智能體選一個負責思考的「大腦」——大模型。",
          "省錢的關鍵技巧是高低搭配：重要決策使用能力較高的旗艦模型，大量重複工作使用性價比較高的模型。",
          "如果不知道什麼時候切換，可先使用自動模式，讓智能體依任務選擇模型。"
        ]
      },
      {
        title: "3｜旗艦模型負責方向",
        kind: "model-task-matrix",
        paragraphs: [
          "設計整體架構、撰寫需求文件等全局性、核心、重要或複雜的任務，適合使用旗艦模型。",
          "這些任務工作量通常不大、Token 用量較少；先把方向與結構定好，後面的設計與開發才有意義。",
          "原稿模型例子：Claude Fable5、GPT 5.6 sol、GLM 5.2、Kimi K3、DeepSeek V4 Pro。"
        ],
        warning: "模型名稱、版本、價格與供應狀態待確認，使用前請查看各廠商官方資料。"
      },
      {
        title: "4｜性價比模型負責大量執行",
        image: {
          src: "assets/execution-model-guide.png",
          alt: "性價比模型從已確認規格、頁面程式碼、測試與修正，逐步產出可驗收版本。"
        },
        paragraphs: [
          "撰寫具體頁面程式碼等局部性、非核心、次要或較簡單的重複任務，適合使用單價較低的模型。",
          "這類任務本身不一定複雜，但工作量大、需要大量 Token，應優先控制成本。",
          "可從主流廠商的次旗艦或性價比產品中選擇；原稿列出的產品版本仍需向官方確認。"
        ]
      },
      {
        title: "5｜模型能力提醒",
        kind: "capability-checklist",
        paragraphs: [
          "原稿曾以 DeepSeek V4 與混元 3（Hy3）說明價格、圖片輸入與任務難度，但這些名稱與能力屬於待確認的原稿資訊，不作為目前版本的選型結論。",
          "實際選擇時，先依工作內容確認是否需要圖片輸入、本機檔案、網路搜尋、長期工作空間與企業資料保護，再用小任務測試。"
        ],
        warning: "免費方案、圖片輸入與模型能力會變動，以上內容須以官方最新說明為準。"
      },
      {
        title: "6｜建立本機工作空間",
        image: {
          src: "assets/workspace-setup-guide.png",
          alt: "建立專案資料夾、在智能體打開本機資料夾，集中存放文件、程式與測試，開始新任務時先選工作空間。"
        },
        paragraphs: [
          "在電腦上建立一個專案資料夾，例如「健身減肥日記」。",
          "在智能體中建立工作空間，選擇「打開本機資料夾」並指向這個資料夾。以後此專案的文件、程式與測試資料都放在這裡，查找與維護會更方便。",
          "開始新任務時，記得先選擇這個工作空間。"
        ]
      }
    ],
    assistantComparison: [
      { name: "Codex", form: "桌面 App／CLI／雲端", fit: "Windows 新手、完整專案開發", strengths: "讀寫專案、執行命令、圖片輸入、平行任務", setup: "登入 OpenAI；依版本確認方案與網路", note: "適合從規劃一路維護到測試", source: "OpenAI 官方", sourceUrl: "https://openai.com/codex/" },
      { name: "Claude Code", form: "終端機／IDE", fit: "複雜程式庫、開發者工作流", strengths: "理解程式庫、修改檔案、執行命令、MCP", setup: "安裝並登入；Windows 須符合官方環境需求", note: "較適合願意使用終端機者", source: "Anthropic 官方", sourceUrl: "https://docs.anthropic.com/en/docs/claude-code/getting-started" },
      { name: "CodeBuddy", form: "IDE／插件／CLI", fit: "零基礎、產品到部署流程", strengths: "需求、設計、開發、測試與部署整合", setup: "下載 IDE、插件或安裝 CLI", note: "使用前確認地區、帳號與資料政策", source: "騰訊雲官方", sourceUrl: "https://cloud.tencent.com/product/acc" },
      { name: "TRAE", form: "AI IDE", fit: "偏好圖形介面的新手與開發者", strengths: "程式問答、專案理解、生成、修復與優化", setup: "下載 IDE 並登入", note: "使用前確認地區與隱私設定", source: "TRAE 官方", sourceUrl: "https://docs.trae.cn/ide_chat" },
      { name: "千問／Qwen Code", form: "桌面 App／CLI／開源專案", fit: "需要開源、多模型或進階擴充", strengths: "Skills、Hooks、MCP、沙箱、工作樹", setup: "桌面安裝或 CLI 配置模型驗證", note: "進階功能需要較多設定", source: "Qwen 官方", sourceUrl: "https://github.com/QwenLM/qwen-code" },
      { name: "WorkBuddy", form: "AI 原生桌面智能體工作台", fit: "辦公流程、日常工作與開發工具切換", strengths: "官方定位為桌面智能體工作台", setup: "依騰訊雲帳號與方案啟用", note: "開發工作可搭配 CodeBuddy", source: "騰訊雲官方", sourceUrl: "https://cloud.tencent.com/announce/detail/2270" },
      { name: "豆包", form: "對話式 AI 應用", fit: "想法整理、問答與內容草稿", strengths: "以 AI 對話為核心的文字、語音等互動", setup: "使用官方 App 或網站", note: "本機專案操作能力須依實際版本確認", source: "豆包官方", sourceUrl: "https://www.doubao.com/legal/instructions" },
      { name: "Coder", form: "名稱待確認", fit: "待確認", strengths: "同名產品很多，無法安全比較", setup: "請先提供官方網址或完整產品名", note: "確認前不建議下載或付款", source: "待確認", sourceUrl: "" }
    ],
    modelTaskMatrix: [
      { task: "產品方向與範圍", tier: "高階模型", reason: "會影響整體目標與後續成本", examples: "需求訪談、功能取捨、PRD" },
      { task: "系統架構與資料安全", tier: "高階模型", reason: "跨模組且錯誤代價較高", examples: "TRD、權限、資料模型、API" },
      { task: "複雜除錯與程式審查", tier: "高階模型", reason: "需要跨檔案推理與找根因", examples: "疑難錯誤、安全與回歸風險" },
      { task: "依規格製作頁面", tier: "性價比模型", reason: "方向已確認，主要是大量執行", examples: "HTML、CSS、元件與文案套版" },
      { task: "測試案例與重複修正", tier: "性價比模型", reason: "工作量大且可用驗收條件核對", examples: "單元測試、格式修正、批次調整" },
      { task: "跨模組或規格不清的任務", tier: "自動／混合", reason: "先由高階模型拆解，再交付執行", examples: "大型功能、長鏈路改版" }
    ],
    capabilityChecklist: [
      { use: "整理文字需求", need: "文字理解、長上下文", check: "貼一小段需求，確認能否正確摘要", level: "基本" },
      { use: "看圖片或截圖", need: "圖片輸入／視覺能力", check: "上傳測試截圖，請它指出畫面元素", level: "必查" },
      { use: "修改本機專案", need: "檔案與命令工具權限", check: "用測試資料夾確認讀檔、改檔與執行", level: "必查" },
      { use: "查最新官方資料", need: "網路搜尋與來源引用", check: "要求附官方連結與查詢日期", level: "必查" },
      { use: "長期維護同一專案", need: "工作空間、規則與版本管理", check: "關閉重開後確認仍能找到專案規則", level: "必查" },
      { use: "處理公司敏感資料", need: "權限、隱私與企業管理", check: "先查官方資料政策；不要上傳機密原文", level: "高風險" }
    ]
  },
  requirementsGuide: {
    title: "第一步：需求收集（做什麼）",
    lead: "好，準備工作完成。接下來先不要急著開發，而是把腦中的模糊想法問清楚。",
    intro: [
      "大多數人做應用程式最大的問題不是技術，而是說不清楚要什麼。",
      "你可能只能先說出「我想做一個記錄健身減肥的應用」，但還不知道要有哪些功能、操作流程與畫面。反過來要求自己一開始就想清楚全部需求，也不現實。",
      "最好的方法不是一次把所有答案告訴 AI，而是先說出大概方向，讓 AI 像產品經理一樣，每次問一個問題，逐步挖出真正需求。"
    ],
    method: [
      "這裡使用 grill-me skill，以一問一答方式進行需求訪談。",
      "當回答太模糊時，AI 會繼續追問；資料足夠後，再整理成完整的使用者需求文件交給你確認。",
      "若使用的工具支援語音輸入，也可以直接用說的回答，就像聊天一樣完成訪談。"
    ],
    prompt: `/codex-with-chatgpt
/grill me

請用一問一答收集我想要做的應用的需求
每次只輸出1個問題，等我回復再問下一個，禁止一次性輸出大量問題
提問覆蓋：目標用戶、真實痛點、使用場景、需要的功能、不要的功能、運行設備、參考產品、特殊限制
我回答模糊就追問細節，訊息足夠之後，輸出一份結構畫完整需求文檔給我確認

我準備做一個應用：__________________
我目前的初步想法：__________________

現在直接開始`,
    example: {
      app: "健身減肥日記手機網頁應用",
      idea: "記錄我每天的運動健身狀況、日常飲食、體能與體重，並根據這些資訊給我相關建議。",
      questions: [
        "工具是自己用，還是也給別人用？",
        "什麼時候記錄？",
        "要解決什麼痛點？",
        "需要記錄哪些資訊？",
        "資料要記錄到多細？",
        "要提供什麼建議？",
        "哪些功能不需要？",
        "手機上如何呈現？",
        "有哪些參考產品？",
        "資料要存放在哪裡？",
        "建議如何產生？",
        "希望使用什麼視覺風格？"
      ]
    },
    closing: "完成問答後，原本模糊的想法會被整理成一份完整的使用者需求文件，作為下一步功能清單的輸入。"
  },
  featureGuide: {
    title: "第二步：功能清單（應用功能）",
    lead: "需求聊清楚後，下一步讓 AI 幫你輸出一份完整的功能清單。",
    intro: [
      "功能清單是整個產品的地基。這一步先確認產品要具備哪些能力，再進入 UI、互動與程式開發。",
      "關鍵是要求 AI 依照「模組 → 功能 → 子功能」三層拆開，並標示核心必做、次要迭代與未來可選功能。",
      "現在多花時間逐條檢查，通常比進入開發後反覆返工更省時間。"
    ],
    hierarchy: [
      { level: "一級模組", example: "運動紀錄", description: "產品主要能力區域" },
      { level: "二級功能", example: "運動紀錄輸入", description: "模組底下的具體功能" },
      { level: "三級子功能", example: "開始時間、運動類型", description: "功能需要包含的細項" }
    ],
    prompt: `/codex-with-chatgpt
/grill me

要求：
案這模組化拆分，分為一級模組、二級功能、三級子功能；
區分：核心必做功能、次要迭代功能、未來可選用規劃功能，
用標籤標註；
每條功能寫簡短功能描述，說明這個功能決什麼使用者問題；
不要寫UI交互細節，只輸出功能能力；
輸出格式用Markdown列表，清晰分層，不要大段文字`,
review: [
      "逐條閱讀 AI 產出的功能清單，確認每項功能是否真的解決使用者問題。",
      "發現不正確或遺漏時，可以截圖並圈出問題，直接告訴 AI 要補充或修正的內容。",
      "修正後要求 AI 重新輸出完整功能清單，不要只回覆局部修改。"
    ],
    example: {
      issues: [
        { feature: "運動紀錄輸入", missing: "缺少運動開始時間" },
        { feature: "飲食紀錄輸入", missing: "缺少用餐時間" }
      ],
      correction: "運動記錄缺少運動開始時間；飲食記錄缺少用餐時間。請更新並重新給出完整的功能清單。"
    },
    closing: "功能清單確認完成後，會得到依模組、功能與子功能分層，並標示優先順序的完整產品能力清單。"
  },
  prdGuide: {
    title: "第三步：產品需求文檔（PRD）",
    lead: "功能清單告訴你「要有什麼」，PRD 則進一步定義每項功能「怎麼運作」。",
    intro: [
      "接下來要把已確認的功能清單寫成產品需求文檔，讓設計、開發與測試都能依照同一套規則工作。",
      "你不需要先學會撰寫這類文件，可以把功能清單、需求描述與使用場景交給 AI，請它整理成標準 PRD 草稿。"
    ],
    comparison: [
      { name: "功能清單", focus: "要有什麼", description: "確認模組、功能、子功能與優先順序" },
      { name: "產品需求文檔 PRD", focus: "怎麼運作", description: "定義輸入、操作、輸出、規則、異常與權限" }
    ],
    questions: [
      "這個按鈕點下去會發生什麼？",
      "資料要怎麼保存？",
      "輸入錯誤時如何提示？",
      "沒有網路時要怎麼處理？"
    ],
    prompt: `/codex-with-chatgpt
/grill me

你現在是資深互聯網產品經理，擅長把零散的功能清單、需求點子、零散需求，
轉化為結構標準、邏輯完整、可直接交付開發/測試的正是PRD文檔
請嚴格照以下規則執行：
1.輸入內容：我將提供零散的功能清單、修求描述、使用場景
2.輸出格式：標準產品PRD文檔，結構完整、條理清晰、無口語化表述、邏輯閉環；
3.必須包含模組：文檔概述(背景、目的、適用範圍)、需求受眾、產品目標、功能詳細敘述需求、業務流程、交互規則、異常場景、權限說明、非功能需求、上線(上架)約束、需求排期、備註；
4.功能需求部分：逐條拆解每個功能，明確輸入、操作流程、輸出、規則、限制條件，覆蓋正常場景+所有異常場景；
5.自動補全缺失訊息：若我提供的功能清單訊息不全，請基於主流產品邏輯合理補充，不遺漏核心業務規則，不隨意刪減需求；
6.語言需求：正式、專業、落地，符合國內(台灣)互聯網團隊開發交付標準，無需沉餘廢話，可直接用於評審、開發、測試`,
    review: [
      "收到 PRD 後先快速閱讀，確認產品方向、功能規則與使用情境是否符合你的需求。",
      "發現問題時可截圖並圈出位置，告訴 AI 要修改的規則。",
      "要求 AI 更新相關功能、資料與非功能需求，最後重新輸出完整 PRD。"
    ],
    correctionPrompt: "食物描述要能加入食物圖片，添加圖片非必填，並更新給出完整的文檔",
    correctionResult: "AI 除了更新食物描述功能，也要同步檢查圖片資料、容量、效能與相關異常處理是否需要調整。",
    note: "如果你完全不懂技術，可以先略過技術細節；這份文件主要交給後續設計、開發與測試使用，但功能方向與使用者需求仍要由你確認。",
    closing: "PRD 確認後，會得到可直接用於評審、設計、開發與測試的完整產品需求文檔。"
  },
  sections: [
    { id: "prep", number: "01", label: "專案準備", short: "確認專案位置", page: "step-1-project-preparation.html" },
    { id: "product", number: "02", label: "產品定義", short: "釐清需求與功能", page: "step-2-product-definition.html" },
    { id: "design", number: "03", label: "原型與設計", short: "先看見操作流程", page: "step-3-prototype-design.html" },
    { id: "build", number: "04", label: "技術與開發", short: "規劃、開發與測試", page: "step-4-technology-development.html" },
    { id: "release", number: "05", label: "驗收與發布", short: "確認版本並使用", page: "step-5-acceptance-release.html" }
  ],
  flowStages: [
    { id: "stage-1", number: "01", title: "第一階段", label: "想法與需求", description: "把想法說清楚", steps: ["0", "1", "2", "3"] },
    { id: "stage-2", number: "02", title: "第二階段", label: "原型與技術", description: "把規格變成施工圖", steps: ["4", "5", "6", "7"] },
    { id: "stage-3", number: "03", title: "第三階段", label: "開發、驗收與發布", description: "做出、驗收並發布", steps: ["8", "9", "10"] }
  ],
  items: [
    { id: "prep", step: "0", section: "prep", name: "建立 AI 工作空間", purpose: "先確認專案資料夾要放在哪裡", push: "準備開始專案，但還沒有決定資料夾要放在哪裡。", materials: ["專案名稱或暫定名稱", "希望存放的磁碟與資料夾位置", "是否需要同步雲端或版本庫（可選）"], result: "確認的專案資料夾路徑，以及後續文件的存放位置。", promptAvailable: false },
    { id: "requirements", step: "1", section: "product", name: "需求收集", purpose: "把模糊想法問清楚", push: "只知道大方向，還說不清楚用戶、痛點、場景與功能。", materials: ["App 名稱或暫定名稱", "初步想法", "已知的使用對象或情境"], result: "使用者需求、使用場景、功能方向、限制條件與可確認的需求文件。", promptAvailable: true },
    { id: "features", step: "2", section: "product", name: "功能清單", purpose: "把產品能力拆成三層", push: "需求已大致清楚，需要知道產品到底要做哪些能力。", materials: ["已確認的需求文件", "使用者場景與痛點", "核心與非核心的取捨"], result: "模組、功能、子功能清單，並區分必做、迭代與未來規劃。", promptAvailable: true },
    { id: "prd", step: "3", section: "product", name: "產品需求文件 PRD", purpose: "定義功能如何運作", push: "功能清單已定，需要交給設計、開發與測試共同理解。", materials: ["完整功能清單", "使用場景與流程", "權限、限制與上線條件"], result: "包含輸入、操作、輸出、規則、異常、權限與驗收條件的 PRD。", promptAvailable: true },
    { id: "prototype", step: "4", section: "design", name: "產品原型", purpose: "先把頁面與互動走一遍", push: "PRD 是文字，想在寫程式前先實際點擊與驗收。", materials: ["已確認 PRD", "頁面或功能清單", "對操作流程的修正意見"], result: "可點擊的頁面原型、彈窗、表單、導覽與互動流程。", promptAvailable: true },
    { id: "ui", step: "5", section: "design", name: "UI 介面設計", purpose: "建立或修改一致的視覺介面", push: "原型已確認，或已有介面需要調整風格、元件與響應式細節。", materials: ["已驗收原型或目前網站", "PRD、品牌資料與現有 UI 程式碼", "想保留與想修改的畫面、截圖或風格描述"], result: "UI 視覺規格、元件規則、可實作變更清單與不同螢幕尺寸的驗收標準。", promptAvailable: true },
    { id: "trd", step: "6", section: "build", name: "技術開發文件 TRD", purpose: "先畫好系統施工圖", push: "PRD、原型與 UI 已定，需要讓開發知道資料、模組與接口如何連接。", materials: ["PRD、原型、UI 設計", "已知的技術限制", "現有系統或外部服務資料"], result: "架構、資料模型、API、權限、安全、依賴、風險與測試要點。", promptAvailable: true },
    { id: "plan", step: "7", section: "build", name: "開發計畫", purpose: "把大工程拆成可控任務", push: "技術方向已清楚，需要知道先做什麼、誰做、如何驗收。", materials: ["PRD 與 TRD", "預計迭代週期", "可投入的人力與時間"], result: "迭代、里程碑、前後端與測試任務、依賴關係及驗收順序。", promptAvailable: true },
    { id: "development", step: "8", section: "build", name: "產品開發與測試", purpose: "依文件逐步做出可運作版本", push: "需求、設計、技術文件與任務順序都已確認。", materials: ["PRD、原型、UI、TRD、開發計畫", "專案工作空間", "每個模組的驗收標準"], result: "可運作的系統、資料與接口、測試紀錄與自我核對清單。", promptAvailable: true },
    { id: "acceptance", step: "9", section: "release", name: "驗收與版本管理", purpose: "反覆修改仍能比較與回復", push: "已有可操作版本，需要依實際使用感受迭代，不讓改版失去控制。", materials: ["目前版本", "驗收清單與截圖", "問題、修改要求與版本命名規則"], result: "驗收紀錄、問題清單、新版本快照、變更摘要與可回滾版本。", promptAvailable: true },
    { id: "release", step: "10", section: "release", name: "發布與使用", purpose: "把完成版本放到實際裝置使用", push: "最終版本已通過驗收，需要打包、備份或放到指定位置。", materials: ["已驗收版本", "發布位置或裝置", "備份、網址、上架或安裝需求"], result: "可使用的發布版本、打包位置、操作方式、備份紀錄與後續維護清單。", promptAvailable: true }
  ]
};
