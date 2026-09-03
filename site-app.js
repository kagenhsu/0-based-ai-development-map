(() => {
  const data = globalThis.AI_MAP_DATA;
  const root = document.getElementById("site-app");
  if (!data || !root) return;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const currentId = document.body.dataset.section || "overview";
  const currentSection = data.sections.find((section) => section.id === currentId);
  const itemCount = (sectionId) => data.items.filter((item) => item.section === sectionId).length;
  const navStorageKey = "ai-map-sidebar-groups";
  const hashStep = location.hash.startsWith("#step-") ? location.hash.slice(6) : "";
  const queryStep = new URLSearchParams(location.search).get("step") || "";
  const currentStep = queryStep || hashStep || data.items.find((item) => item.section === currentId)?.step || "";
  const currentItem = data.items.find((item) => item.section === currentId && item.step === currentStep);
  const readNavState = () => {
    try { return JSON.parse(localStorage.getItem(navStorageKey) || "{}"); }
    catch { return {}; }
  };
  const writeNavState = (state) => {
    try { localStorage.setItem(navStorageKey, JSON.stringify(state)); }
    catch { /* Local storage may be unavailable in restricted browsers. */ }
  };
  const initialNavState = readNavState();

  const itemForStep = (step) => data.items.find((item) => item.step === step);
  const itemHref = (item) => {
    const section = data.sections.find((entry) => entry.id === item.section);
    return `${section.page}?step=${item.step}#step-${item.step}`;
  };

  const sidebar = () => `
    <aside class="site-sidebar" aria-label="主要導覽">
      <a class="brand" href="index.html">
        <span class="brand-mark">AI</span>
        <span class="brand-copy"><strong>AI 開發地圖</strong><span>正式流程導覽</span></span>
      </a>
      <div class="nav-label">流程導航</div>
      <nav class="site-nav">
        <a class="nav-link" href="index.html" aria-current="${currentId === "overview" ? "page" : "false"}">
          <span class="nav-number">00</span><span class="nav-copy"><strong>首頁總覽</strong><small>查看完整流程</small></span>
        </a>
        ${data.flowStages.map((stage) => {
          const defaultOpen = currentId === "overview" ? stage.id === "stage-1" : stage.steps.includes(currentStep);
          const isOpen = typeof initialNavState[stage.id] === "boolean" ? initialNavState[stage.id] : defaultOpen;
          return `<div class="nav-group"><button class="nav-group-toggle" type="button" data-stage-id="${stage.id}" aria-expanded="${isOpen}" aria-controls="${stage.id}-submenu"><span class="nav-number">${escapeHtml(stage.number)}</span><span class="nav-group-copy"><strong>${escapeHtml(stage.title)}｜${escapeHtml(stage.label)}</strong><small>${escapeHtml(stage.description)}</small></span><span class="nav-chevron" aria-hidden="true">⌄</span></button><div class="nav-submenu" id="${stage.id}-submenu"${isOpen ? "" : " hidden"}>${stage.steps.map((step) => { const item = itemForStep(step); return item ? `<a class="nav-sub-link" href="${itemHref(item)}" aria-current="${item.step === currentStep ? "page" : "false"}"><span>第 ${escapeHtml(item.step)} 步</span><strong>${escapeHtml(item.name)}</strong></a>` : ""; }).join("")}</div></div>`;
        }).join("")}
      </nav>
      <p class="sidebar-foot">點選階段名稱展開子流程；每個階段都可獨立查看與交付。</p>
    </aside>`;

  const header = () => {
    const stepLabel = currentItem ? `第 ${currentItem.step} 步` : "流程首頁";
    const title = currentItem?.name ?? "AI 開發流程總覽";
    const description = currentItem?.purpose ?? "從想法逐步完成可驗收、可使用的版本";
    return `
      <header class="site-header">
        <div class="breadcrumb"><span>${escapeHtml(stepLabel)}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(description)}</small></div>
      </header>`;
  };

  const tenStageFlow = () => `<figure class="flowchart-figure"><div class="flowchart-viewport"><img class="flowchart-image" src="assets/ai-development-flow.png" alt="0 基礎 AI 開發地圖：分成三個階段，從專案準備、需求收集、功能清單與產品需求文件，進入產品原型、UI 設計、技術文件與開發計畫，再完成產品開發、驗收、發布與使用。" /></div></figure>`;

  const storyMilestones = ["靈感想法", "告訴 AI", "需求與原型", "開發驗收", "發布使用"];

  const storyFlow = () => `<ol class="story-flow" aria-label="從想法到發布的五步驟流程">${storyMilestones.map((label, index) => `<li class="story-flow-step"><span class="story-flow-number">${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(label)}</strong></li>`).join("")}</ol>`;

  const assistantComparison = () => {
    const rows = [
      ["產品型態", "form"],
      ["適合誰", "fit"],
      ["主要能力", "strengths"],
      ["安裝準備", "setup"],
      ["注意事項", "note"]
    ];
    const detailRows = rows.map(([label, key]) => `<tr><th scope="row">${escapeHtml(label)}</th>${data.prepGuide.assistantComparison.map((tool) => `<td>${escapeHtml(tool[key])}</td>`).join("")}</tr>`).join("");
    const sourceRow = `<tr><th scope="row">官方資料</th>${data.prepGuide.assistantComparison.map((tool) => `<td>${tool.sourceUrl ? `<a href="${escapeHtml(tool.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(tool.source)} ↗</a>` : `<span class="pending-label">${escapeHtml(tool.source)}</span>`}</td>`).join("")}</tr>`;
    return `<div class="guide-table-wrap"><table class="guide-table guide-table-assistants"><caption>AI 開發助手分析表</caption><thead><tr><th>介紹項目</th>${data.prepGuide.assistantComparison.map((tool) => `<th scope="col">${escapeHtml(tool.name)}</th>`).join("")}</tr></thead><tbody>${detailRows}${sourceRow}</tbody></table></div>`;
  };

  const modelTaskMatrix = () => `<div class="guide-table-wrap"><table class="guide-table"><caption>高階模型與性價比模型任務分工</caption><thead><tr><th>任務</th><th>建議層級</th><th>原因</th><th>常見例子</th></tr></thead><tbody>${data.prepGuide.modelTaskMatrix.map((row) => `<tr><th scope="row">${escapeHtml(row.task)}</th><td><span class="tier-label">${escapeHtml(row.tier)}</span></td><td>${escapeHtml(row.reason)}</td><td>${escapeHtml(row.examples)}</td></tr>`).join("")}</tbody></table></div>`;

  const capabilityChecklist = () => `<div class="capability-chart" aria-label="模型能力使用檢查圖表">${data.prepGuide.capabilityChecklist.map((row) => `<article class="capability-row"><div><strong>${escapeHtml(row.use)}</strong><span>${escapeHtml(row.need)}</span></div><p>${escapeHtml(row.check)}</p><span class="capability-level" data-level="${escapeHtml(row.level)}">${escapeHtml(row.level)}</span></article>`).join("")}</div>`;

  const prepGuideExtra = (section) => {
    if (section.kind === "assistant-comparison") return assistantComparison();
    if (section.kind === "model-task-matrix") return modelTaskMatrix();
    if (section.kind === "capability-checklist") return capabilityChecklist();
    return "";
  };

  const prepGuideLabels = ["AI 開發助手", "選擇大模型", "高階模型", "性價比模型", "能力提醒", "本機工作空間"];

  const prepGuideNav = () => `<nav class="prep-guide-tabs" aria-label="開始前準備介紹導覽">${prepGuideLabels.map((label, index) => `<a class="prep-guide-tab" href="#prep-guide-section-${index + 1}"><span>${index + 1}</span>${escapeHtml(label)}</a>`).join("")}</nav>`;

  const prepGuide = () => `<section class="prep-guide" aria-labelledby="prep-guide-title"><header class="prep-guide-head"><span>開始前準備</span><h3 id="prep-guide-title">${escapeHtml(data.prepGuide.title)}</h3><p>${escapeHtml(data.prepGuide.lead)}</p></header>${prepGuideNav()}<div class="prep-guide-grid">${data.prepGuide.sections.map((section, index) => `<article class="prep-guide-section" id="prep-guide-section-${index + 1}"><h4>${escapeHtml(section.title)}</h4>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>` : ""}${section.image ? `<figure class="guide-visual"><img src="${escapeHtml(section.image.src)}" alt="${escapeHtml(section.image.alt)}" loading="lazy" /></figure>` : ""}${prepGuideExtra(section)}${section.warning ? `<div class="prep-warning">${escapeHtml(section.warning)}</div>` : ""}</article>`).join("")}</div></section>`;

  const requirementsGuideCard = (item) => {
    const guide = data.requirementsGuide;
    return `<article class="process-card requirements-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">grill-me skill</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>為什麼先做需求收集</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <div class="requirements-method-grid">
        <section class="requirements-method"><span class="requirements-number">01</span><div><h3>讓 AI 來問你</h3>${guide.method.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></section>
        <section class="requirements-method requirements-result"><span class="requirements-number">02</span><div><h3>先確認，再進下一步</h3><p>AI 問完後先閱讀完整需求摘要，補充或修正遺漏，再確認成為正式需求文件。</p><p>需求未確認前，不要直接進入功能設計或開發。</p></div></section>
      </div>
      <section class="requirements-prompt" aria-labelledby="requirements-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="requirements-prompt-title">grill-me 原文提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="requirementsGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <section class="requirements-example"><div class="requirements-section-head"><div><span>操作示例</span><h3>健身減肥日記</h3></div></div><div class="requirements-example-input"><div><strong>我準備做的應用</strong><p>${escapeHtml(guide.example.app)}</p></div><div><strong>目前的初步想法</strong><p>${escapeHtml(guide.example.idea)}</p></div></div><h4>AI 會逐步追問</h4><div class="requirements-question-list">${guide.example.questions.map((question) => `<span>${escapeHtml(question)}</span>`).join("")}</div></section>
      <section class="requirements-complete"><span>最後拿到</span><strong>完整的使用者需求文件</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const featureGuideCard = (item) => {
    const guide = data.featureGuide;
    return `<article class="process-card requirements-card feature-guide-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">含原文提示詞</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>功能清單的作用</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="feature-hierarchy" aria-labelledby="feature-hierarchy-title"><div class="requirements-section-head"><div><span>三層拆分方式</span><h3 id="feature-hierarchy-title">模組 → 功能 → 子功能</h3></div></div><div class="feature-hierarchy-flow">${guide.hierarchy.map((entry, index) => `<article><span>${escapeHtml(entry.level)}</span><strong>${escapeHtml(entry.example)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < guide.hierarchy.length - 1 ? `<span class="feature-hierarchy-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div><div class="feature-priority-tags"><span>核心必做</span><span>次要迭代</span><span>未來可選</span></div></section>
      <section class="requirements-prompt" aria-labelledby="feature-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="feature-prompt-title">功能清單原文提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="featureGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <div class="requirements-method-grid">
        <section class="requirements-method"><span class="requirements-number">01</span><div><h3>逐條檢查</h3>${guide.review.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></section>
        <section class="requirements-method requirements-result"><span class="requirements-number">02</span><div><h3>修正後要完整輸出</h3><p>如果 AI 只更新局部內容，再明確要求它整合所有修改，重新提供完整版本。</p><p>完整版本確認後，才能把功能清單定稿。</p></div></section>
      </div>
      <section class="requirements-example feature-fix-example"><div class="requirements-section-head"><div><span>缺漏修正示例</span><h3>健身減肥日記功能清單</h3></div></div><div class="feature-fix-list">${guide.example.issues.map((issue) => `<article><strong>${escapeHtml(issue.feature)}</strong><span>${escapeHtml(issue.missing)}</span></article>`).join("")}</div><div class="feature-correction"><strong>告訴 AI：</strong><p>${escapeHtml(guide.example.correction)}</p></div></section>
      <section class="requirements-complete"><span>功能清單定了</span><strong>取得完整產品功能清單</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const prdGuideCard = (item) => {
    const guide = data.prdGuide;
    return `<article class="process-card requirements-card prd-guide-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">含 3 組提示詞</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>PRD 的作用</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="prd-operation" aria-labelledby="prd-operation-title"><div class="requirements-section-head"><div><span>先理解差異</span><h3 id="prd-operation-title">從功能清單走向可執行規則</h3></div></div><div class="prd-comparison">${guide.comparison.map((entry, index) => `<article><span>${escapeHtml(entry.name)}</span><strong>${escapeHtml(entry.focus)}</strong><p>${escapeHtml(entry.description)}</p></article>${index === 0 ? `<span class="prd-comparison-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div><div class="prd-question-grid">${guide.questions.map((question) => `<span>${escapeHtml(question)}</span>`).join("")}</div></section>
      <section class="requirements-prompt" aria-labelledby="prd-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="prd-prompt-title">PRD 原文提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="prdGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <div class="requirements-method-grid">
        <section class="requirements-method"><span class="requirements-number">01</span><div><h3>閱讀與修改</h3>${guide.review.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></section>
        <section class="requirements-method requirements-result"><span class="requirements-number">02</span><div><h3>同步更新關聯規則</h3><p>${escapeHtml(guide.correctionResult)}</p><p>不要只接受局部修正，要取得整合後的完整文件。</p></div></section>
      </div>
      <section class="prd-correction"><div class="requirements-section-head"><div><span>修改示例</span><h3>食物描述增加圖片</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="prdGuide" data-copy-field="correctionPrompt">複製修正提示詞</button></div><p>${escapeHtml(guide.correctionPrompt)}</p></section>
      <section class="requirements-prompt" aria-labelledby="prd-detail-revision-prompt-title"><div class="requirements-section-head"><div><span>修改 PRD 細節時使用</span><h3 id="prd-detail-revision-prompt-title">PRD 細節修改提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="prdGuide" data-copy-field="detailRevisionPrompt">複製修改提示詞</button></div><pre><code>${escapeHtml(guide.detailRevisionPrompt)}</code></pre></section>
      <div class="prd-review-note"><strong>確認邊界</strong><p>AI 自動補全的內容仍是草稿；若涉及資料保存、權限、費用或業務規則，請標示為待確認後再定稿。</p></div>
      <section class="requirements-complete"><span>PRD 完成</span><strong>取得完整產品需求文檔</strong><p>${escapeHtml(guide.closing)}</p><p>${escapeHtml(guide.note)}</p></section>
    </article>`;
  };

  const prototypeGuideCard = (item) => {
    const guide = data.prototypeGuide;
    return `<article class="process-card requirements-card prototype-guide-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">含 3 組提示詞</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>原型設計的作用</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="prototype-journey" aria-labelledby="prototype-journey-title"><div class="requirements-section-head"><div><span>先看見，再開發</span><h3 id="prototype-journey-title">從 PRD 到可驗收原型</h3></div></div><div class="prototype-journey-flow">${guide.journey.map((entry, index) => `<article><span>${escapeHtml(entry.number)}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < guide.journey.length - 1 ? `<span class="prototype-journey-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div></section>
      <section class="requirements-prompt" aria-labelledby="prototype-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="prototype-prompt-title">原型設計原文提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="prototypeGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <div class="requirements-method-grid">
        <section class="requirements-method"><span class="requirements-number">01</span><div><h3>實際操作驗收</h3>${guide.acceptance.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></section>
        <section class="requirements-method requirements-result"><span class="requirements-number">02</span><div><h3>截圖回報修改</h3><p>覺得哪裡不對，就截圖圈出位置並清楚描述要增加、刪除或調整的規則。</p><p>重複驗收與修改，直到操作流程符合實際需求。</p></div></section>
      </div>
      <section class="requirements-example"><div class="requirements-section-head"><div><span>調整示例</span><h3>健身減肥日記原型</h3></div></div><div class="prototype-change-list">${guide.changeExample.map((change) => `<div><span aria-hidden="true">✓</span><p>${escapeHtml(change)}</p></div>`).join("")}</div></section>
      <section class="requirements-prompt" aria-labelledby="prototype-detail-revision-title"><div class="requirements-section-head"><div><span>修改產品原型細節時使用</span><h3 id="prototype-detail-revision-title">產品原型細節修改提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="prototypeGuide" data-copy-field="detailRevisionPrompt">複製修改提示詞</button></div><pre><code>${escapeHtml(guide.detailRevisionPrompt)}</code></pre></section>
      <section class="requirements-prompt prototype-sync-prompt-card" aria-labelledby="prototype-sync-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="prototype-sync-prompt-title">文件同步更新提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="prototypeGuide" data-copy-field="syncPrompt">複製提示詞</button></div><div class="requirements-prompt-context"><strong>原型改動會影響產品規則</strong>${guide.impact.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div><pre><code>${escapeHtml(guide.syncPrompt)}</code></pre></section>
      <section class="requirements-complete"><span>原型驗收完成</span><strong>取得可點擊、可操作的產品原型</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const uiGuideCard = (item) => {
    const guide = data.uiGuide;
    return `<article class="process-card requirements-card ui-guide-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">含 UI Skill 與 3 組提示詞</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>UI 設計的作用</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="ui-formula-section" aria-labelledby="ui-formula-title"><div class="requirements-section-head"><div><span>三層疊加，逐步提升</span><h3 id="ui-formula-title">好看的介面設計公式</h3></div></div><div class="ui-formula">${guide.formula.map((entry, index) => `<article><span>${escapeHtml(entry.number)}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < guide.formula.length - 1 ? `<span class="ui-formula-operator" aria-hidden="true">＋</span>` : `<span class="ui-formula-operator" aria-hidden="true">＝</span><strong class="ui-formula-result">好看的介面</strong>`}`).join("")}</div></section>
      <section class="requirements-prompt" aria-labelledby="ui-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="ui-prompt-title">UI 設計原文提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="uiGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <div class="requirements-method-grid">
        <section class="requirements-method"><span class="requirements-number">01</span><div><h3>加入參考圖</h3>${guide.referenceTips.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></section>
        <section class="requirements-method requirements-result"><span class="requirements-number">02</span><div><h3>截圖驗收與修正</h3><p>看到間距、卡片、文字、配色或操作狀態不正確時，截圖圈出位置並告訴 AI 修正。</p><p>每次修改後重新檢查桌面、平板與手機，不要只驗收單一畫面。</p></div></section>
      </div>
      <section class="requirements-example"><div class="requirements-section-head"><div><span>設計成熟度</span><h3>從方向到精緻介面</h3></div></div><div class="ui-progress-list">${guide.progress.map((entry, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><p>${escapeHtml(entry)}</p></article>`).join("")}</div></section>
      <section class="requirements-prompt" aria-labelledby="ui-maturity-prompt-title"><div class="requirements-section-head"><div><span>調整與測試使用</span><h3 id="ui-maturity-prompt-title">設計成熟度檢查提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="uiGuide" data-copy-field="maturityPrompt">複製提示詞</button></div><pre><code>${escapeHtml(guide.maturityPrompt)}</code></pre></section>
      <section class="requirements-prompt prototype-sync-prompt-card ui-sync" aria-labelledby="ui-sync-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="ui-sync-prompt-title">文件同步更新提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="uiGuide" data-copy-field="syncPrompt">複製提示詞</button></div><div class="requirements-prompt-context"><strong>同步更新所有產品文件</strong><p>UI 調整可能改變元件、頁面結構或操作細節；定稿前要讓功能清單、PRD、原型與 UI 設計保持一致。</p></div><pre><code>${escapeHtml(guide.syncPrompt)}</code></pre></section>
      <section class="requirements-complete"><span>設計全部定稿</span><strong>取得一致、可實作的完整 UI 設計</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const trdGuideCard = (item) => {
    const guide = data.trdGuide;
    return `<article class="process-card requirements-card trd-guide-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">含完整 TRD 提示詞</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>先畫施工圖，再動工</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="prototype-journey" aria-labelledby="trd-flow-title"><div class="requirements-section-head"><div><span>開發前置流程</span><h3 id="trd-flow-title">從產品文件到技術施工圖</h3></div></div><div class="prototype-journey-flow">${guide.flow.map((entry, index) => `<article><span>${escapeHtml(entry.number)}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < guide.flow.length - 1 ? `<span class="prototype-journey-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div></section>
      <section class="trd-outline" aria-labelledby="trd-outline-title"><div class="requirements-section-head"><div><span>文件架構</span><h3 id="trd-outline-title">TRD 十大章節</h3></div><p>從專案範圍一路對應到測試驗收，左右分欄快速掌握文件全貌。</p></div><ol>${guide.outline.map((entry) => `<li><span>${escapeHtml(entry.title)}</span><small>${escapeHtml(entry.description)}</small></li>`).join("")}</ol></section>
      <section class="requirements-prompt" aria-labelledby="trd-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="trd-prompt-title">TRD 原文提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="trdGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <section class="trd-boundary"><div><strong>忠實 PRD</strong><p>不新增產品功能，缺失或模糊內容統一標記【●待產品/業務(功能)確認】。</p></div><div><strong>不自行選型</strong><p>除非 PRD 已明確指定，否則不直接決定 Redis、MySQL 等具體技術方案。</p></div><div><strong>可直接交付</strong><p>以研發視角輸出 Markdown、Mermaid、表格、異常規則與測試校驗要點。</p></div></section>
      <section class="requirements-example"><div class="requirements-section-head"><div><span>閱讀方式</span><h3>依你的角色確認內容</h3></div></div><div class="trd-audience-grid">${guide.audiences.map((audience, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(audience.title)}</strong><p>${escapeHtml(audience.description)}</p></article>`).join("")}</div></section>
      <div class="prd-review-note"><strong>使用前確認</strong><p>${escapeHtml(guide.note)}</p></div>
      <section class="requirements-complete"><span>技術施工圖完成</span><strong>取得可交付開發與測試的 TRD</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const developmentPlanGuideCard = (item) => {
    const guide = data.developmentPlanGuide;
    return `<article class="process-card requirements-card development-plan-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">含開發計畫提示詞</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>先拆任務，再開始開發</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="plan-benefits" aria-labelledby="plan-benefits-title"><div class="requirements-section-head"><div><span>為什麼要拆解</span><h3 id="plan-benefits-title">兩個直接好處</h3></div></div><div>${guide.benefits.map((benefit) => `<article><span>${escapeHtml(benefit.number)}</span><div><strong>${escapeHtml(benefit.title)}</strong><p>${escapeHtml(benefit.description)}</p></div></article>`).join("")}</div></section>
      <section class="plan-flow" aria-labelledby="plan-flow-title"><div class="requirements-section-head"><div><span>任務拆解流程</span><h3 id="plan-flow-title">從文件到可執行任務</h3></div></div><div class="plan-flow-list">${guide.flow.map((entry, index) => `<article><span>${escapeHtml(entry.number)}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < guide.flow.length - 1 ? `<span class="plan-flow-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div></section>
      <section class="requirements-prompt" aria-labelledby="plan-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="plan-prompt-title">開發計畫原文提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="developmentPlanGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <section class="plan-table-section" aria-labelledby="plan-table-title"><div class="requirements-section-head"><div><span>輸出示意</span><h3 id="plan-table-title">開發實施計畫表</h3></div><p>實際內容應依你的 PRD、TRD、週期與人力調整。</p></div><div class="plan-table-wrap"><table><thead><tr><th>迭代</th><th>里程碑</th><th>角色</th><th>任務</th><th>前置依賴</th><th>驗收條件</th></tr></thead><tbody>${guide.tableRows.map((row) => `<tr><td>${escapeHtml(row.iteration)}</td><td>${escapeHtml(row.milestone)}</td><td>${escapeHtml(row.role)}</td><td>${escapeHtml(row.task)}</td><td>${escapeHtml(row.dependency)}</td><td>${escapeHtml(row.acceptance)}</td></tr>`).join("")}</tbody></table></div></section>
      <section class="requirements-complete"><span>任務拆解完成</span><strong>取得可逐項執行與驗收的開發計畫</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const productDevelopmentGuideCard = (item) => {
    const guide = data.productDevelopmentGuide;
    const sequence = (entries) => entries.map((entry, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < entries.length - 1 ? `<span class="development-sequence-arrow" aria-hidden="true">→</span>` : ""}`).join("");
    return `<article class="process-card requirements-card product-development-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">開發＋測試</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>正式進入編碼</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="development-skill" aria-labelledby="development-skill-title"><div><span>本步驟搭配技能</span><h3 id="development-skill-title">${escapeHtml(guide.skill.name)}</h3><p>${escapeHtml(guide.skill.description)}</p></div><code>${escapeHtml(guide.skill.command)}</code></section>
      <section class="development-flow" aria-labelledby="development-flow-title"><div class="requirements-section-head"><div><span>執行節奏</span><h3 id="development-flow-title">校驗、開發、測試、回報</h3></div></div><div class="development-flow-list">${guide.flow.map((entry, index) => `<article><span>${escapeHtml(entry.number)}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < guide.flow.length - 1 ? `<span class="development-flow-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div></section>
      <section class="development-rules" aria-labelledby="development-rules-title"><div class="requirements-section-head"><div><span>開工規則</span><h3 id="development-rules-title">五項執行邊界</h3></div></div><ol>${guide.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ol></section>
      <section class="requirements-prompt" aria-labelledby="development-prompt-title"><div class="requirements-section-head"><div><span>開始並持續執行</span><h3 id="development-prompt-title">依開發實施計畫持續開發</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="productDevelopmentGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <section class="requirements-prompt" aria-labelledby="development-continuation-prompt-title"><div class="requirements-section-head"><div><span>工作中斷時使用</span><h3 id="development-continuation-prompt-title">從上次進度接續開發</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="productDevelopmentGuide" data-copy-field="continuationPrompt">複製續作提示詞</button></div><pre><code>${escapeHtml(guide.continuationPrompt)}</code></pre></section>
      <section class="requirements-prompt" aria-labelledby="development-test-fix-prompt-title"><div class="requirements-section-head"><div><span>測試失敗時使用</span><h3 id="development-test-fix-prompt-title">定位、修改並重新測試</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="productDevelopmentGuide" data-copy-field="testFixPrompt">複製修正提示詞</button></div><pre><code>${escapeHtml(guide.testFixPrompt)}</code></pre></section>
      <section class="development-sequence" aria-labelledby="development-fix-areas-title"><div class="requirements-section-head"><div><span>測試失敗時依序檢查</span><h3 id="development-fix-areas-title">測試修正流程圖</h3></div></div><div class="development-sequence-list">${sequence(guide.fixAreas)}</div></section>
      <section class="development-sequence" aria-labelledby="development-deliverables-title"><div class="requirements-section-head"><div><span>每個模組依序交付</span><h3 id="development-deliverables-title">五項同步產物流程圖</h3></div></div><div class="development-sequence-list">${sequence(guide.deliverables)}</div></section>
      <section class="requirements-complete"><span>持續執行，不因單次回報中斷</span><strong>開發、測試、記錄，再接續下一項</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const acceptanceVersionGuideCard = (item) => {
    const guide = data.acceptanceVersionGuide;
    return `<article class="process-card requirements-card acceptance-version-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">驗收＋可回滾版本</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>修改前先留版本</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="version-reasons" aria-labelledby="version-reasons-title"><div class="requirements-section-head"><div><span>為什麼要做版本管理</span><h3 id="version-reasons-title">兩個重要原因</h3></div></div><div>${guide.reasons.map((reason) => `<article><span>${escapeHtml(reason.number)}</span><div><strong>${escapeHtml(reason.title)}</strong><p>${escapeHtml(reason.description)}</p></div></article>`).join("")}</div></section>
      <section class="version-cycle" aria-labelledby="version-cycle-title"><div class="requirements-section-head"><div><span>驗收迭代流程</span><h3 id="version-cycle-title">每次修改都能返回</h3></div></div><div class="version-cycle-list">${guide.cycle.map((entry, index) => `<article><span>${escapeHtml(entry.number)}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < guide.cycle.length - 1 ? `<span class="version-cycle-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div></section>
      <section class="version-snapshot" aria-labelledby="version-snapshot-title"><div class="requirements-section-head"><div><span>完整快照</span><h3 id="version-snapshot-title">每個版本必須保存</h3></div></div><ul>${guide.snapshotContents.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul></section>
      <section class="requirements-prompt" aria-labelledby="version-prompt-title"><div class="requirements-section-head"><div><span>可直接使用</span><h3 id="version-prompt-title">版本管理原文提示詞</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="acceptanceVersionGuide">複製提示詞</button></div><pre><code>${escapeHtml(guide.prompt)}</code></pre></section>
      <section class="version-commands" aria-labelledby="version-commands-title"><div class="requirements-section-head"><div><span>後續依序操作</span><h3 id="version-commands-title">四項版本操作流程圖</h3></div></div><div class="version-command-flow">${guide.commands.map((entry, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(entry)}</strong></article>${index < guide.commands.length - 1 ? `<span class="version-command-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div></section>
      <section class="version-package" aria-labelledby="version-package-title"><div class="requirements-section-head"><div><span>驗收完成後</span><h3 id="version-package-title">打包最終版本</h3></div><button class="copy-requirements-prompt" type="button" data-copy-guide="acceptanceVersionGuide" data-copy-field="packagePrompt">複製打包提示詞</button></div><p>${escapeHtml(guide.packagePrompt)}</p><aside><strong>備份邊界</strong><span>${escapeHtml(guide.backupNote)}</span></aside></section>
      <section class="requirements-complete"><span>改到自己滿意</span><strong>確認最終版本，再打包到指定位置</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const releaseUseGuideCard = (item) => {
    const guide = data.releaseUseGuide;
    return `<article class="process-card requirements-card release-use-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(guide.title)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">實機發布</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      <section class="requirements-intro"><span>最後發布</span><h3>${escapeHtml(guide.lead)}</h3>${guide.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="release-options" aria-labelledby="release-options-title"><div class="requirements-section-head"><div><span>依使用方式選擇</span><h3 id="release-options-title">三種發布方案</h3></div><p>先看用途與限制，再決定要複製資料夾、使用網址或安裝成 PWA。</p></div><div>${guide.options.map((option) => `<article><header><span>${escapeHtml(option.number)}</span><h4>${escapeHtml(option.title)}</h4></header><dl><div><dt>適合</dt><dd>${escapeHtml(option.bestFor)}</dd></div><div><dt>最後拿到</dt><dd>${escapeHtml(option.result)}</dd></div></dl><ol>${option.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol><p>${escapeHtml(option.note)}</p></article>`).join("")}</div></section>
      <section class="release-personal" aria-labelledby="release-personal-title"><div class="requirements-section-head"><div><span>自己手機使用</span><h3 id="release-personal-title">從複製資料夾到下次秒開</h3></div></div><div class="release-personal-flow">${guide.personalSteps.map((entry, index) => `<article><span>${escapeHtml(entry.number)}</span><strong>${escapeHtml(entry.title)}</strong><p>${escapeHtml(entry.description)}</p></article>${index < guide.personalSteps.length - 1 ? `<span class="release-personal-arrow" aria-hidden="true">→</span>` : ""}`).join("")}</div></section>
      <section class="release-checklist" aria-labelledby="release-checklist-title"><div class="requirements-section-head"><div><span>發布前最後確認</span><h3 id="release-checklist-title">六項完成條件</h3></div></div><ul>${guide.checklist.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul></section>
      <aside class="release-source-note"><strong>本步驟沒有原文提示詞</strong><span>${escapeHtml(guide.sourceNote)}</span></aside>
      <section class="requirements-complete"><span>正式開始使用</span><strong>實機驗收完成，從書籤、網址或主畫面開啟</strong><p>${escapeHtml(guide.closing)}</p></section>
    </article>`;
  };

  const processCard = (item) => item.step === "1" ? requirementsGuideCard(item) : item.step === "2" ? featureGuideCard(item) : item.step === "3" ? prdGuideCard(item) : item.step === "4" ? prototypeGuideCard(item) : item.step === "5" ? uiGuideCard(item) : item.step === "6" ? trdGuideCard(item) : item.step === "7" ? developmentPlanGuideCard(item) : item.step === "8" ? productDevelopmentGuideCard(item) : item.step === "9" ? acceptanceVersionGuideCard(item) : item.step === "10" ? releaseUseGuideCard(item) : `
    <article class="process-card" id="step-${escapeHtml(item.step)}">
      <div class="process-card-head">
        <div class="process-card-title"><span class="process-step">STEP ${escapeHtml(item.step)}</span><h2>${escapeHtml(item.name)}</h2><p class="process-purpose">${escapeHtml(item.purpose)}</p></div>
        <span class="process-badge">${item.promptAvailable ? "含提示詞" : "預備動作"}</span>
      </div>
      <div class="process-details">
        <section class="process-detail"><h3>適合推</h3><p>${escapeHtml(item.push)}</p></section>
        <section class="process-detail"><h3>需要提供</h3><ul>${item.materials.map((material) => `<li>${escapeHtml(material)}</li>`).join("")}</ul></section>
        <section class="process-detail"><h3>最後拿到</h3><p>${escapeHtml(item.result)}</p></section>
      </div>
      ${item.step === "0" ? "" : `<div class="process-card-foot">
        <span class="prompt-state">${item.promptAvailable ? "提示詞：請開啟完整互動地圖複製" : "預備動作：先確認專案資料夾位置，不使用提示詞"}</span>
        <a class="map-link" href="${data.fullMapUrl}">${item.promptAvailable ? "查看並複製提示詞 →" : "查看完整流程 →"}</a>
      </div>`}
    </article>`;

  const overview = () => `
    <div class="content">
      <section class="hero"><p class="eyebrow">AI DEVELOPMENT WORKFLOW</p><h1>${escapeHtml(data.title)}</h1><p>${escapeHtml(data.subtitle)} 用正式、可交付的方式，把每一個階段拆開管理。</p></section>
      <section class="home-story" aria-labelledby="story-title"><p class="eyebrow">HOW IT WORKS</p><h2 id="story-title">從一個想法，到可以使用的應用</h2>${storyFlow()}<div class="home-story-copy">${data.homeStory.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div></section>
      <section class="overview-flow"><div class="section-heading"><div><h2>10 大階段流程圖</h2><p>第 0 步是專案起點；第 1～10 步是核心開發流程</p></div></div>${tenStageFlow()}</section>
      <div class="notice">使用方式：從側邊欄選擇階段；閱讀「適合推、需要提供、最後拿到」，再進入完整互動地圖複製對應提示詞。</div>
    </div>`;

  const sectionPage = () => {
    const sectionItems = data.items.filter((item) => item.section === currentId);
    const selectedItem = sectionItems.find((item) => item.step === currentStep);
    const items = selectedItem ? [selectedItem] : sectionItems.slice(0, 1);
    const pageGuide = items.some((item) => item.step === "0") ? prepGuide() : "";
    return `<div class="content section-content"><section class="process-list" aria-label="${escapeHtml(currentSection.label)}流程">${items.map(processCard).join("")}</section>${pageGuide}</div>`;
  };

  root.innerHTML = `<div class="site-shell">${sidebar()}<div class="site-main">${header()}<main>${currentId === "overview" ? overview() : sectionPage()}</main></div></div><button class="back-to-top" type="button" aria-label="回到網頁內容最頂端" aria-hidden="true" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6" /></svg><span>回到頂端</span></button>`;
  document.querySelectorAll("[data-copy-guide]").forEach((copyButton) => {
    const defaultCopyLabel = copyButton.textContent;
    copyButton.addEventListener("click", async () => {
      try {
        const guide = data[copyButton.dataset.copyGuide];
        const promptField = copyButton.dataset.copyField || "prompt";
        const promptText = guide?.[promptField];
        if (!promptText) throw new Error("prompt missing");
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(promptText);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = promptText;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          const copied = document.execCommand("copy");
          textarea.remove();
          if (!copied) throw new Error("copy failed");
        }
        copyButton.textContent = "已複製";
        setTimeout(() => { copyButton.textContent = defaultCopyLabel; }, 1800);
      } catch {
        copyButton.textContent = "請手動複製";
      }
    });
  });
  document.querySelectorAll(".nav-group-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      document.getElementById(button.getAttribute("aria-controls")).hidden = expanded;
      const navState = readNavState();
      navState[button.dataset.stageId] = !expanded;
      writeNavState(navState);
    });
  });
  const syncCurrentChild = () => {
    const activeStep = location.hash.startsWith("#step-") ? location.hash.slice(6) : currentStep;
    document.querySelectorAll(".nav-sub-link").forEach((link) => {
      const linkStep = new URL(link.href, location.href).hash.slice(6);
      link.setAttribute("aria-current", linkStep === activeStep ? "page" : "false");
    });
  };
  window.addEventListener("hashchange", () => {
    const nextStep = location.hash.startsWith("#step-") ? location.hash.slice(6) : "";
    if (nextStep && nextStep !== currentStep) {
      location.reload();
      return;
    }
    syncCurrentChild();
  });
  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    const syncBackToTop = () => {
      const visible = window.scrollY > 360;
      backToTopButton.classList.toggle("is-visible", visible);
      backToTopButton.setAttribute("aria-hidden", String(!visible));
      backToTopButton.tabIndex = visible ? 0 : -1;
    };
    backToTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
    window.addEventListener("scroll", syncBackToTop, { passive: true });
    syncBackToTop();
  }
  const sidebarElement = document.querySelector(".site-sidebar");
  const headerElement = document.querySelector(".site-header");
  if (sidebarElement && headerElement && "ResizeObserver" in window) {
    const syncLayoutOffsets = () => {
      document.documentElement.style.setProperty("--site-mobile-sidebar-height", `${sidebarElement.offsetHeight}px`);
      document.documentElement.style.setProperty("--site-current-header-height", `${headerElement.offsetHeight}px`);
    };
    syncLayoutOffsets();
    const layoutObserver = new ResizeObserver(syncLayoutOffsets);
    layoutObserver.observe(sidebarElement);
    layoutObserver.observe(headerElement);
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" }));
  }
})();
