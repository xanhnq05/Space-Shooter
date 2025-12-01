// Quản lý UI cho GameplayScene

export class GameplayUIManager {
    constructor() {
        this.elements = {
            gameHUD: null,
            pauseMenu: null,
            scoreValue: null,
            bossContainer: null,
            bossIcon: null,
            bossName: null,
            bossHealthBar: null,
            waveBanner: null,
            waveBannerText: null,
            resumeBtn: null,
            restartBtn: null,
            quitBtn: null
        };
        
        this.waveBannerTimeout = null;
    }

    // Khởi tạo UI Manager
    init() {
        this.elements.gameHUD = document.getElementById('game-hud');
        this.elements.pauseMenu = document.getElementById('pause-menu');
        this.elements.scoreValue = document.getElementById('score-value');
        this.elements.bossContainer = document.getElementById('boss-status');
        this.elements.bossIcon = document.getElementById('boss-icon');
        this.elements.bossName = document.getElementById('boss-name');
        this.elements.bossHealthBar = document.getElementById('boss-health-bar');
        this.elements.waveBanner = document.getElementById('wave-banner');
        this.elements.waveBannerText = document.getElementById('wave-banner-text');
        
        this.elements.resumeBtn = document.getElementById('btn-resume');
        this.elements.restartBtn = document.getElementById('btn-restart');
        this.elements.quitBtn = document.getElementById('btn-quit');
        
        this.hideBossStatus();
        this.hideWaveBanner();
        this.hidePauseMenu();
    }

    // Thiết lập event listeners cho pause menu
    setupPauseMenu(callbacks) {
        if (this.elements.resumeBtn && callbacks.onResume) {
            this.elements.resumeBtn.onclick = callbacks.onResume;
        }
        if (this.elements.restartBtn && callbacks.onRestart) {
            this.elements.restartBtn.onclick = callbacks.onRestart;
        }
        if (this.elements.quitBtn && callbacks.onQuit) {
            this.elements.quitBtn.onclick = callbacks.onQuit;
        }
    }

    // Hiển thị Game HUD
    showHUD() {
        if (this.elements.gameHUD) {
            this.elements.gameHUD.classList.remove('hidden');
        }
    }

    // Ẩn Game HUD
    hideHUD() {
        if (this.elements.gameHUD) {
            this.elements.gameHUD.classList.add('hidden');
        }
    }

    // Hiển thị Pause Menu
    showPauseMenu() {
        if (this.elements.pauseMenu) {
            this.elements.pauseMenu.classList.remove('hidden');
        }
    }

    // Ẩn Pause Menu
    hidePauseMenu() {
        if (this.elements.pauseMenu) {
            this.elements.pauseMenu.classList.add('hidden');
        }
    }

    // Cập nhật điểm số
    updateScore(score) {
        if (this.elements.scoreValue) {
            this.elements.scoreValue.textContent = score.toLocaleString();
        }
    }

    // Hiển thị wave banner
    showWaveBanner(text, duration = 2000, onComplete = null) {
        if (!this.elements.waveBanner || !this.elements.waveBannerText) return;
        
        this.clearWaveBannerTimeout();
        this.elements.waveBannerText.textContent = text;
        this.elements.waveBanner.classList.remove('hud-hidden');
        
        this.waveBannerTimeout = setTimeout(() => {
            this.hideWaveBanner();
            if (onComplete) onComplete();
        }, duration);
    }

    // Ẩn wave banner
    hideWaveBanner() {
        if (this.elements.waveBanner) {
            this.elements.waveBanner.classList.add('hud-hidden');
        }
    }

    // Xóa timeout của wave banner
    clearWaveBannerTimeout() {
        if (this.waveBannerTimeout) {
            clearTimeout(this.waveBannerTimeout);
            this.waveBannerTimeout = null;
        }
    }

    // Hiển thị boss status
    showBossStatus(config) {
        if (!this.elements.bossContainer) return;
        
        if (this.elements.bossIcon && config.icon) {
            this.elements.bossIcon.src = config.icon;
        }
        if (this.elements.bossName && config.name) {
            this.elements.bossName.textContent = config.name;
        }
        this.elements.bossContainer.classList.remove('hud-hidden');
    }

    // Ẩn boss status
    hideBossStatus() {
        if (this.elements.bossContainer) {
            this.elements.bossContainer.classList.add('hud-hidden');
        }
    }

    // Cập nhật thanh máu boss
    updateBossHealth(current, max) {
        if (!this.elements.bossHealthBar) return;
        const percentage = Math.max(0, Math.min(100, (current / max) * 100));
        this.elements.bossHealthBar.style.width = `${percentage}%`;
    }

    // Dọn dẹp
    cleanup() {
        this.clearWaveBannerTimeout();
        this.hideBossStatus();
        this.hideWaveBanner();
        this.hidePauseMenu();
        this.hideHUD();
    }
}
