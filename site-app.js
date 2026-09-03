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

  const itemForStep = (step) => data.items.find((item) => item.step === step);
  const itemHref = (item) => {
    const section = data.sections.find((entry) => entry.id === item.section);
    return `${section.page}#step-${item.step}`;
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
          const isCurrentStage = stage.steps.some((step) => itemForStep(step)?.section === currentId);
          const isOpen = currentId === "overview" ? stage.id === "stage-1" : isCurrentStage;
          return `<div class="nav-group"><button class="nav-group-toggle" type="button" aria-expanded="${isOpen}" aria-controls="${stage.id}-submenu"><span class="nav-number">${escapeHtml(stage.number)}</span><span class="nav-group-copy"><strong>${escapeHtml(stage.title)}｜${escapeHtml(stage.label)}</strong><small>${escapeHtml(stage.description)}</small></span><span class="nav-chevron" aria-hidden="true">⌄</span></button><div class="nav-submenu" id="${stage.id}-submenu"${isOpen ? "" : " hidden"}>${stage.steps.map((step) => { const item = itemForStep(step); return item ? `<a class="nav-sub-link" href="${itemHref(item)}" aria-current="${item.section === currentId ? "page" : "false"}"><span>第 ${escapeHtml(item.step)} 步</span><strong>${escapeHtml(item.name)}</strong></a>` : ""; }).join("")}</div></div>`;
        }).join("")}
      </nav>
      <p class="sidebar-foot">點選階段名稱展開子流程；每個階段都可獨立查看與交付。</p>
    </aside>`;

  const header = () => `
    <header class="site-header">
      <div class="breadcrumb"><span>${currentSection ? `第 ${currentSection.number} 步驟` : "流程首頁"}</span><strong>${escapeHtml(currentSection?.label ?? "AI 開發流程總覽")}</strong></div>
      <div class="header-actions"><a class="header-link" href="${data.fullMapUrl}">開啟完整互動地圖</a></div>
    </header>`;

  const tenStageFlow = () => `<figure class="flowchart-figure"><div class="flowchart-viewport"><img class="flowchart-image" src="assets/ai-development-flow.png" alt="0 基礎 AI 開發地圖：分成三個階段，從專案準備、需求收集、功能清單與產品需求文件，進入產品原型、UI 設計、技術文件與開發計畫，再完成產品開發、驗收、發布與使用。" /></div></figure>`;

  const processCard = (item) => `
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
      <div class="process-card-foot">
        <span class="prompt-state">${item.promptAvailable ? "提示詞：請開啟完整互動地圖複製" : "預備動作：先確認專案資料夾位置，不使用提示詞"}</span>
        <a class="map-link" href="${data.fullMapUrl}">${item.promptAvailable ? "查看並複製提示詞 →" : "查看完整流程 →"}</a>
      </div>
    </article>`;

  const overview = () => `
    <div class="content">
      <section class="hero"><p class="eyebrow">AI DEVELOPMENT WORKFLOW</p><h1>${escapeHtml(data.title)}</h1><p>${escapeHtml(data.subtitle)} 用正式、可交付的方式，把每一個階段拆開管理。</p><div class="hero-actions"><a class="primary-button" href="${data.sections[0].page}">從第 1 步開始</a><a class="secondary-button" href="${data.fullMapUrl}">查看完整互動地圖</a></div></section>
      <section class="home-story" aria-labelledby="story-title"><p class="eyebrow">HOW IT WORKS</p><h2 id="story-title">從一個想法，到可以使用的應用</h2>${data.homeStory.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section class="overview-flow"><div class="section-heading"><div><h2>10 大階段流程圖</h2><p>第 0 步是專案起點；第 1～10 步是核心開發流程</p></div></div>${tenStageFlow()}</section>
      <div class="notice">使用方式：從側邊欄選擇階段；閱讀「適合推、需要提供、最後拿到」，再進入完整互動地圖複製對應提示詞。</div>
    </div>`;

  const sectionPage = () => {
    const items = data.items.filter((item) => item.section === currentId);
    return `<div class="content"><section class="section-hero"><p class="eyebrow">第 ${currentSection.number} 步驟</p><h1>${escapeHtml(currentSection.label)}</h1><p>${escapeHtml(currentSection.short)}。本頁集中呈現此階段的流程、輸入資料與交付結果。</p><div class="section-meta"><span class="meta-pill">${items.length} 個流程</span><span class="meta-pill">獨立網頁</span><span class="meta-pill">可回到完整互動地圖</span></div></section><section class="process-list" aria-label="${escapeHtml(currentSection.label)}流程">${items.map(processCard).join("")}</section><div class="notice">本階段完成後，再由頁首或側邊欄進入下一階段。需要原文提示詞時，請開啟完整互動地圖。</div></div>`;
  };

  root.innerHTML = `<div class="site-shell">${sidebar()}<div class="site-main">${header()}<main>${currentId === "overview" ? overview() : sectionPage()}</main></div></div>`;
  document.querySelectorAll(".nav-group-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      document.getElementById(button.getAttribute("aria-controls")).hidden = expanded;
    });
  });
  const sidebarElement = document.querySelector(".site-sidebar");
  if (sidebarElement && "ResizeObserver" in window) {
    const syncMobileHeaderOffset = () => document.documentElement.style.setProperty("--site-mobile-sidebar-height", `${sidebarElement.offsetHeight}px`);
    syncMobileHeaderOffset();
    new ResizeObserver(syncMobileHeaderOffset).observe(sidebarElement);
  }
})();
