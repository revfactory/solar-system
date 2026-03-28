/**
 * TimeController — 시뮬레이션 시간 제어
 * SimulationClock이 준비되면 래핑, 아니면 자체 시간 관리
 */
export class TimeController {
  constructor() {
    /** @type {number} 초 단위 배속 (1 = 실시간, 86400 = 1일/초) */
    this.timeScale = 1;
    /** @type {boolean} */
    this.paused = false;
    /** 시뮬레이션 기준 시각 (밀리초) */
    this.simTime = Date.now();
    /** 외부 Clock 인스턴스 (있으면 위임) */
    this.clock = null;
    /** 변경 리스너 */
    this._listeners = [];
  }

  /**
   * 외부 SimulationClock 연결
   * @param {import('../core/SimulationClock.js').SimulationClock} clock
   */
  attachClock(clock) {
    this.clock = clock;
    this.timeScale = clock.timeScale;
    this.paused = clock.paused;
  }

  /**
   * @param {number} scale
   */
  setSpeed(scale) {
    this.timeScale = scale;
    if (this.clock) {
      this.clock.setSpeed(scale);
    }
    this.paused = false;
    if (this.clock) this.clock.paused = false;
    this._notify();
  }

  togglePause() {
    this.paused = !this.paused;
    if (this.clock) {
      if (this.paused) this.clock.pause();
      else this.clock.resume();
    }
    this._notify();
  }

  /**
   * 매 프레임 호출 — dt(초)만큼 시뮬레이션 시간 전진
   * @param {number} dt - 실제 경과 시간(초)
   */
  update(dt) {
    if (this.clock) return; // 외부 Clock이 직접 관리
    if (!this.paused) {
      this.simTime += dt * this.timeScale * 1000;
    }
  }

  /**
   * 현재 시뮬레이션 날짜
   * @returns {Date}
   */
  getSimDate() {
    if (this.clock) return new Date(this.clock.simulationTime);
    return new Date(this.simTime);
  }

  /**
   * @param {Function} fn - () => void
   */
  onChange(fn) {
    this._listeners.push(fn);
  }

  _notify() {
    for (const fn of this._listeners) fn();
  }
}
