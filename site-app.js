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
        ${data.sections.map((section) => `
          <a class="nav-link" href="${section.page}" aria-current="${currentId === section.id ? "page" : "false"}">
            <span class="nav-number">${section.number}</span><span class="nav-copy"><strong>${escapeHtml(section.label)}</strong><small>${escapeHtml(section.short)} · ${itemCount(section.id)} 個流程</small></span>
          </a>`).join("")}
      </nav>
      <p class="sidebar-foot">先確認方向，再進入下一階段。每個階段都可獨立查看與交付。</p>
    </aside>`;

  const header = () => `
    <header class="site-header">
      <div class="breadcrumb"><span>${currentSection ? `第 ${currentSection.number} 步驟` : "流程首頁"}</span><strong>${escapeHtml(currentSection?.label ?? "AI 開發流程總覽")}</strong></div>
      <div class="header-actions"><a class="header-link" href="${data.fullMapUrl}">開啟完整互動地圖</a></div>
    </header>`;

  const tenStageFlow = () => `<figure class="flowchart-figure"><div class="flowchart-viewport"><img class="flowchart-image" src="assets/ai-development-flow.png" alt="0 基礎 AI 開發地圖：分成三個階段，從專案準備、需求收集、功能清單與產品需求文件，進入產品原型、UI 設計、技術文件與開發計畫，再完成產品開發、驗收、發布與使用。" /></div><figcaption class="flowchart-caption">流程圖先看階段，再看細節；需要操作時，可從下方或側邊欄進入對應頁面。</figcaption><nav class="flowchart-shortcuts" aria-label="流程階段快速導覽">${data.sections.map((section) => `<a href="${section.page}">${escapeHtml(section.number)} ${escapeHtml(section.label)} →</a>`).join("")}</nav></figure>`;

  const processCard = (item) => `
    <article class="process-card">
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
    return `<div class="content"><section class="section-hero"><p class="eyebrow">第 ${currentSection.number} 步驟</p><h1>${escapeHtml(currentSection.label)}</h1><p>${escapeHtml(currentSection.short)}。本頁集中呈現此階段的流程、輸入資料與交付結果。</p><div class="section-meta"><span class="meta-pill">${items.length} 個流程</span><span class="meta-pill">獨立網頁</span><span class="meta-pill">可回到完整互動地圖</span></div></section><nav class="section-progress" aria-label="五大階段導覽">${data.sections.map((section) => `<a class="progress-link" href="${section.page}" aria-current="${section.id === currentId ? "page" : "false"}"><span>${section.number}</span>${escapeHtml(section.label)}</a>`).join("")}</nav><section class="process-list" aria-label="${escapeHtml(currentSection.label)}流程">${items.map(processCard).join("")}</section><div class="notice">本階段完成後，再由頁首或側邊欄進入下一階段。需要原文提示詞時，請開啟完整互動地圖。</div></div>`;
  };

  root.innerHTML = `<div class="site-shell">${sidebar()}<div class="site-main">${header()}<main>${currentId === "overview" ? overview() : sectionPage()}</main></div></div>`;
})();
