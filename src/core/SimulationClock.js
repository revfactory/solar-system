/**
 * 시뮬레이션 시간 제어 클래스
 * timeScale: 1 = 실시간, 86400 = 1일/초
 */
export class SimulationClock {
  constructor() {
    this.simulationTime = new Date();
    this.timeScale = 1;
    this.paused = false;
    this.lastRealTime = performance.now();
  }

  /**
   * 매 프레임 호출 — simulationTime을 timeScale만큼 진행
   * @returns {Date} 현재 시뮬레이션 시간
   */
  update() {
    const now = performance.now();
    if (!this.paused) {
      const realDelta = (now - this.lastRealTime) / 1000; // 초
      const simDelta = realDelta * this.timeScale;
      this.simulationTime = new Date(
        this.simulationTime.getTime() + simDelta * 1000
      );
    }
    this.lastRealTime = now;
    return this.simulationTime;
  }

  /** 배속 설정 */
  setSpeed(scale) {
    this.timeScale = scale;
  }

  /** 일시정지 */
  pause() {
    this.paused = true;
  }

  /** 재개 */
  resume() {
    this.paused = false;
  }

  /** 날짜 이동 */
  setDate(date) {
    this.simulationTime = new Date(date);
  }

  /** 역재생 */
  reverse() {
    this.timeScale = -Math.abs(this.timeScale);
  }

  /**
   * J2000.0 기준 줄리안 세기 (T) 반환 — 궤도 계산용
   * @returns {number}
   */
  getT() {
    const d = this.simulationTime;
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + 1;
    const day = d.getUTCDate()
      + d.getUTCHours() / 24
      + d.getUTCMinutes() / 1440
      + d.getUTCSeconds() / 86400;

    let yr = y, mo = m;
    if (mo <= 2) { yr -= 1; mo += 12; }
    const A = Math.floor(yr / 100);
    const B = 2 - A + Math.floor(A / 4);
    const jd = Math.floor(365.25 * (yr + 4716))
      + Math.floor(30.6001 * (mo + 1))
      + day + B - 1524.5;

    return (jd - 2451545.0) / 36525.0;
  }
}
