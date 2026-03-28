import * as THREE from 'three';

/**
 * 로딩 화면 — THREE.LoadingManager 연동, 프로그레스 바, fade out
 */
export class LoadingScreen {
  constructor() {
    this.screen = document.getElementById('loading-screen');
    this.progressBar = document.getElementById('loading-progress');
    this.text = document.getElementById('loading-text');
    this.manager = new THREE.LoadingManager();
    this._setupManager();
  }

  _setupManager() {
    this.manager.onStart = (_url, loaded, total) => {
      this._update(loaded, total, '리소스 로딩 중...');
    };

    this.manager.onProgress = (_url, loaded, total) => {
      this._update(loaded, total, `로딩 중... (${loaded}/${total})`);
    };

    this.manager.onLoad = () => {
      this._update(1, 1, '완료');
      this.hide();
    };

    this.manager.onError = (url) => {
      console.warn('로딩 실패:', url);
    };
  }

  _update(loaded, total) {
    const pct = total > 0 ? (loaded / total) * 100 : 0;
    if (this.progressBar) {
      this.progressBar.style.width = `${pct}%`;
    }
  }

  hide() {
    if (!this.screen) return;
    setTimeout(() => {
      this.screen.classList.add('fade-out');
      this.screen.addEventListener('transitionend', () => {
        this.screen.style.display = 'none';
      }, { once: true });
    }, 400);
  }

  /** 즉시 숨기기 (텍스처 없는 개발 모드 등) */
  hideImmediate() {
    if (!this.screen) return;
    this.screen.style.display = 'none';
  }
}
