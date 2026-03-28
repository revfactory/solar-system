/**
 * 좌측 사이드바 행성 네비게이션
 * - 행성 아이콘(dot) + 이름 목록
 * - 클릭 → selectPlanet 콜백
 */
export class Navigation {
  /**
   * @param {Object} planetsData - planets.json 데이터 (key: id)
   * @param {Function} onSelect - (planetId: string) => void
   */
  constructor(planetsData, onSelect) {
    this.container = document.getElementById('navigation');
    this.planetsData = planetsData;
    this.onSelect = onSelect;
    this.activePlanet = null;
    this.items = new Map();

    this._build();
  }

  _build() {
    if (!this.container) return;
    this.container.innerHTML = '';

    // 태양은 별도 (sun은 planets.json에 없을 수 있으므로 직접 추가)
    const sunItem = this._createItem('sun', '태양', 'Sun', '#FDB813');
    this.container.appendChild(sunItem);

    // 행성 순서
    const order = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    for (const id of order) {
      const data = this.planetsData[id];
      if (!data) continue;
      const color = data.visual?.color || '#ffffff';
      const item = this._createItem(id, data.name, data.nameEn, color);
      this.container.appendChild(item);
    }
  }

  _createItem(id, name, nameEn, color) {
    const el = document.createElement('div');
    el.className = 'nav-item';
    el.dataset.planet = id;

    const dot = document.createElement('span');
    dot.className = 'nav-item-dot';
    dot.style.borderColor = color;

    const label = document.createElement('span');
    label.className = 'nav-item-name';
    label.textContent = name;

    el.appendChild(dot);
    el.appendChild(label);

    el.addEventListener('click', () => {
      this.setActive(id);
      this.onSelect(id);
    });

    this.items.set(id, { el, dot, color });
    return el;
  }

  setActive(planetId) {
    // 이전 활성 항목 해제
    if (this.activePlanet && this.items.has(this.activePlanet)) {
      const prev = this.items.get(this.activePlanet);
      prev.el.classList.remove('active');
      prev.dot.style.background = '';
      prev.dot.style.boxShadow = '';
    }

    this.activePlanet = planetId;

    if (planetId && this.items.has(planetId)) {
      const curr = this.items.get(planetId);
      curr.el.classList.add('active');
      curr.dot.style.background = curr.color;
      curr.dot.style.boxShadow = `0 0 6px ${curr.color}`;
    }
  }

  clearActive() {
    this.setActive(null);
  }
}
