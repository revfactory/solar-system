/**
 * 우측 슬라이드인 정보 패널
 * - 개요 / 물리 / 탐사 탭
 * - planets.json + planets-ui.json 데이터 사용
 */
export class InfoPanel {
  /**
   * @param {Object} planetsData - planets.json
   * @param {Object} planetsUI - planets-ui.json (description, exploration)
   */
  constructor(planetsData, planetsUI) {
    this.container = document.getElementById('info-panel');
    this.planetsData = planetsData;
    this.planetsUI = planetsUI;
    this.currentPlanet = null;
    this.currentTab = 'overview';
  }

  show(planetId) {
    if (!this.container) return;
    this.currentPlanet = planetId;
    this.currentTab = 'overview';
    this._render();
    this.container.classList.add('open');
  }

  hide() {
    if (!this.container) return;
    this.container.classList.remove('open');
    this.currentPlanet = null;
  }

  isOpen() {
    return this.container?.classList.contains('open') ?? false;
  }

  _render() {
    const id = this.currentPlanet;
    const data = this.planetsData[id];
    const ui = this.planetsUI[id];

    // 태양 특수 처리
    const name = data?.name || (id === 'sun' ? '태양' : id);
    const nameEn = data?.nameEn || (id === 'sun' ? 'Sun' : '');

    this.container.innerHTML = '';

    // 헤더
    const header = this._el('div', 'info-header');
    const titleWrap = this._el('div');
    const title = this._el('span', 'info-planet-name');
    title.textContent = name;
    const titleEn = this._el('span', 'info-planet-name-en');
    titleEn.textContent = nameEn;
    titleWrap.appendChild(title);
    titleWrap.appendChild(titleEn);

    const closeBtn = this._el('button', 'info-close');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', '닫기');
    closeBtn.addEventListener('click', () => this.hide());

    header.appendChild(titleWrap);
    header.appendChild(closeBtn);
    this.container.appendChild(header);

    // 모바일 스와이프 닫기
    this._initSwipeDismiss(header);

    // 탭
    const tabs = this._el('div', 'info-tabs');
    const tabDefs = [
      { key: 'overview', label: '개요' },
      { key: 'physical', label: '물리' },
      { key: 'exploration', label: '탐사' },
    ];
    tabDefs.forEach(({ key, label }) => {
      const btn = this._el('button', 'info-tab');
      btn.textContent = label;
      if (key === this.currentTab) btn.classList.add('active');
      btn.addEventListener('click', () => {
        this.currentTab = key;
        this._render();
      });
      tabs.appendChild(btn);
    });
    this.container.appendChild(tabs);

    // 콘텐츠
    const content = this._el('div', 'info-content');
    switch (this.currentTab) {
      case 'overview':
        this._renderOverview(content, data, ui);
        break;
      case 'physical':
        this._renderPhysical(content, data);
        break;
      case 'exploration':
        this._renderExploration(content, ui);
        break;
    }
    this.container.appendChild(content);
  }

  _renderOverview(container, data, ui) {
    if (ui?.description) {
      const desc = this._el('p', 'info-description selectable');
      desc.textContent = ui.description;
      container.appendChild(desc);
    }

    // 간략 데이터
    if (data?.physical) {
      const section = this._el('div', 'info-section info-section--spaced');
      const title = this._el('div', 'info-section-title');
      title.textContent = '주요 제원';
      section.appendChild(title);

      const briefFields = {
        '적도 반지름': data.physical.equatorial_radius_km ? `${data.physical.equatorial_radius_km.toLocaleString()} km` : null,
        '질량': data.physical.mass_1e24_kg ? `${data.physical.mass_1e24_kg} × 10²⁴ kg` : null,
      };

      if (data.orbital) {
        briefFields['태양 거리'] = `${data.orbital.a} AU`;
        briefFields['공전 주기'] = `${data.orbital.period_days.toLocaleString()}일`;
      }

      for (const [label, value] of Object.entries(briefFields)) {
        if (!value) continue;
        const row = this._el('div', 'info-row');
        const l = this._el('span', 'info-label');
        l.textContent = label;
        const v = this._el('span', 'info-value');
        v.textContent = value;
        row.appendChild(l);
        row.appendChild(v);
        section.appendChild(row);
      }
      container.appendChild(section);
    }
  }

  _renderPhysical(container, data) {
    if (!data?.physical) {
      container.textContent = '데이터 없음';
      return;
    }

    const fields = {
      '물리 특성': {
        '적도 반지름': `${data.physical.equatorial_radius_km?.toLocaleString()} km`,
        '평균 반지름': `${data.physical.mean_radius_km?.toLocaleString()} km`,
        '질량': `${data.physical.mass_1e24_kg} × 10²⁴ kg`,
        '밀도': `${data.physical.bulk_density_g_cm3} g/cm³`,
        '기하학적 알베도': data.physical.geometric_albedo,
      },
      '궤도 요소': data.orbital ? {
        '장반경': `${data.orbital.a} AU`,
        '이심률': data.orbital.e,
        '경사각': `${data.orbital.I}°`,
        '공전 주기': `${data.orbital.period_days?.toLocaleString()}일`,
      } : null,
      '자전': data.rotation ? {
        '자전 주기': `${data.rotation.period_hours} 시간`,
        '자전축 기울기': `${data.rotation.axial_tilt_deg}°`,
        '역행 자전': data.rotation.retrograde ? '예' : '아니오',
      } : null,
    };

    for (const [sectionName, sectionData] of Object.entries(fields)) {
      if (!sectionData) continue;
      const section = this._el('div', 'info-section');
      const title = this._el('div', 'info-section-title');
      title.textContent = sectionName;
      section.appendChild(title);

      for (const [label, value] of Object.entries(sectionData)) {
        if (value == null) continue;
        const row = this._el('div', 'info-row');
        const l = this._el('span', 'info-label');
        l.textContent = label;
        const v = this._el('span', 'info-value');
        v.textContent = String(value);
        row.appendChild(l);
        row.appendChild(v);
        section.appendChild(row);
      }
      container.appendChild(section);
    }
  }

  _renderExploration(container, ui) {
    if (!ui?.exploration?.length) {
      container.textContent = '탐사 데이터 없음';
      return;
    }

    const section = this._el('div', 'info-section');
    const title = this._el('div', 'info-section-title');
    title.textContent = '주요 탐사 미션';
    section.appendChild(title);

    for (const mission of ui.exploration) {
      const p = this._el('p', 'info-description info-mission selectable');
      p.textContent = mission;
      section.appendChild(p);
    }
    container.appendChild(section);
  }

  _initSwipeDismiss(header) {
    let startY = 0;
    let currentY = 0;
    let dragging = false;

    header.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      dragging = true;
      this.container.style.transition = 'none';
    }, { passive: true });

    header.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      currentY = e.touches[0].clientY;
      const dy = Math.max(0, currentY - startY);
      this.container.style.transform = `translateY(${dy}px)`;
    }, { passive: true });

    header.addEventListener('touchend', () => {
      if (!dragging) return;
      dragging = false;
      this.container.style.transition = '';
      const dy = currentY - startY;
      if (dy > 80) {
        this.hide();
      } else {
        this.container.style.transform = '';
        if (this.container.classList.contains('open')) {
          this.container.style.transform = 'translateY(0)';
        }
      }
    }, { passive: true });
  }

  _el(tag, className) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
  }
}
