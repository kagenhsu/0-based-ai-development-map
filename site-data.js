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
        paragraphs: [
          "不論是國外的 Claude、Codex，國內的 WorkBody、Coder、Trae，還是豆包、千問，都可以使用。",
          "如果從來沒有用過，中國地區可先選擇安裝與操作較簡單的國產辦公智能體；台灣可使用 Claude Code 或 Codex。",
          "原稿示範使用 WorkBody，但後續操作也能在其他工具中找到對應功能。"
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
        paragraphs: [
          "選完工具後，還要替智能體選一個負責思考的「大腦」——大模型。",
          "省錢的關鍵技巧是高低搭配：重要決策使用能力較高的旗艦模型，大量重複工作使用性價比較高的模型。",
          "如果不知道什麼時候切換，可先使用自動模式，讓智能體依任務選擇模型。"
        ]
      },
      {
        title: "3｜旗艦模型負責方向",
        paragraphs: [
          "設計整體架構、撰寫需求文件等全局性、核心、重要或複雜的任務，適合使用旗艦模型。",
          "這些任務工作量通常不大、Token 用量較少；先把方向與結構定好，後面的設計與開發才有意義。",
          "原稿模型例子：Claude Fable5、GPT 5.6 sol、GLM 5.2、Kimi K3、DeepSeek V4 Pro。"
        ],
        warning: "模型名稱、版本、價格與供應狀態待確認，使用前請查看各廠商官方資料。"
      },
      {
        title: "4｜性價比模型負責大量執行",
        paragraphs: [
          "撰寫具體頁面程式碼等局部性、非核心、次要或較簡單的重複任務，適合使用單價較低的模型。",
          "這類任務本身不一定複雜，但工作量大、需要大量 Token，應優先控制成本。",
          "可從主流廠商的次旗艦或性價比產品中選擇；原稿列出的產品版本仍需向官方確認。"
        ]
      },
      {
        title: "5｜模型能力提醒",
        paragraphs: [
          "原稿將 DeepSeek V4 列為性價比選項，並提醒它不支援圖片輸入；如果要傳送圖片或截圖給 AI 查看，使用前仍須確認官方最新能力。",
          "原稿提到混元 3（Hy3）限時免費，較適合簡單任務；複雜任務仍應選擇能力較高的模型。"
        ],
        warning: "免費方案、圖片輸入與模型能力會變動，以上內容須以官方最新說明為準。"
      },
      {
        title: "6｜建立本機工作空間",
        paragraphs: [
          "在電腦上建立一個專案資料夾，例如「健身減肥日記」。",
          "在智能體中建立工作空間，選擇「打開本機資料夾」並指向這個資料夾。以後此專案的文件、程式與測試資料都放在這裡，查找與維護會更方便。",
          "開始新任務時，記得先選擇這個工作空間。"
        ]
      }
    ]
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
