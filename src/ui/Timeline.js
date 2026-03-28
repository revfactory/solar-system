/**
 * 하단 타임라인 바
 * - 재생/일시정지/배속/날짜 표시
 * - TimeController와 연동
 */
export class Timeline {
  /**
   * @param {Object} callbacks
   * @param {Function} callbacks.onSetSpeed - (timeScale: number) => void
   * @param {Function} callbacks.onTogglePause - () => void
   */
  constructor(callbacks) {
    this.container = document.getElementById('timeline');
    this.callbacks = callbacks;
    this.isPaused = false;
    this.currentSpeed = 1;

    this._build();
  }

  _build() {
    if (!this.container) return;
    this.container.innerHTML = '';

    // 배속 프리셋: ⏮ ⏪ ⏯ ⏩ ⏭
    const speeds = [
      { icon: '⏮', scale: -31536000, label: '-1년/초' },
      { icon: '⏪', scale: -86400, label: '-1일/초' },
      { icon: '⏯', scale: 0, label: '일시정지', isPause: true },
      { icon: '⏩', scale: 86400, label: '1일/초' },
      { icon: '⏭', scale: 31536000, label: '1년/초' },
    ];

    this.btnElements = [];

    speeds.forEach((def) => {
      const btn = document.createElement('button');
      btn.className = 'timeline-btn';
      btn.textContent = def.icon;
      btn.title = def.label;

      btn.addEventListener('click', () => {
        if (def.isPause) {
          this.isPaused = !this.isPaused;
          this.callbacks.onTogglePause();
          this._updateButtons();
        } else {
          this.isPaused = false;
          this.currentSpeed = def.scale;
          this.callbacks.onSetSpeed(def.scale);
          this._updateButtons();
        }
      });

      this.btnElements.push({ btn, def });
      this.container.appendChild(btn);
    });

    // 구분선
    this.container.appendChild(this._divider());

    // 날짜 표시
    this.dateDisplay = document.createElement('span');
    this.dateDisplay.className = 'timeline-date';
    this.dateDisplay.textContent = this._formatDate(new Date());
    this.container.appendChild(this.dateDisplay);

    // 구분선
    this.container.appendChild(this._divider());

    // 속도 표시
    this.speedDisplay = document.createElement('span');
    this.speedDisplay.className = 'timeline-speed';
    this.speedDisplay.textContent = '실시간';
    this.container.appendChild(this.speedDisplay);

    this._updateButtons();
  }

  _divider() {
    const d = document.createElement('span');
    d.className = 'timeline-divider';
    return d;
  }

  _updateButtons() {
    this.btnElements.forEach(({ btn, def }) => {
      btn.classList.remove('active');
      if (def.isPause && this.isPaused) {
        btn.classList.add('active');
      } else if (!def.isPause && !this.isPaused && def.scale === this.currentSpeed) {
        btn.classList.add('active');
      }
    });
  }

  /**
   * 외부에서 호출 — 현재 시뮬레이션 날짜 갱신
   * @param {Date} date
   */
  updateDate(date) {
    if (this.dateDisplay) {
      this.dateDisplay.textContent = this._formatDate(date);
    }
  }

  /**
   * 외부에서 호출 — 현재 속도 표시 갱신
   * @param {number} timeScale
   */
  updateSpeed(timeScale) {
    this.currentSpeed = timeScale;
    if (this.speedDisplay) {
      this.speedDisplay.textContent = this._formatSpeed(timeScale);
    }
    this._updateButtons();
  }

  _formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) return '--';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  _formatSpeed(scale) {
    if (scale === 0) return '일시정지';
    const abs = Math.abs(scale);
    const sign = scale < 0 ? '-' : '';
    if (abs >= 31536000) return `${sign}${(abs / 31536000).toFixed(0)}년/초`;
    if (abs >= 86400) return `${sign}${(abs / 86400).toFixed(0)}일/초`;
    if (abs >= 3600) return `${sign}${(abs / 3600).toFixed(0)}시간/초`;
    if (abs === 1) return '실시간';
    return `×${scale}`;
  }
}
