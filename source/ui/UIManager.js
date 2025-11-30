/**
 * ============================================
 * UIMANAGER.JS
 * ============================================
 * 
 * Qu?n l� t?t c? UI elements
 * Hi?n th?/?n c�c screen, update HUD, handle UI events
 */

export class UIManager {
    constructor() {
        this.screens = new Map();
        this.currentScreen = null;
        this.hud = null;
    }

    /**
     * Kh?i t?o UI Manager
     * TODO: Implement initialization
     * - Get references ??n t?t c? screen elements t? DOM
     * - Setup HUD
     * - Hide t?t c? screens ban ??u
     */
    init() {
        // TODO: Get screen elements
        // this.screens.set('main-menu', document.getElementById('main-menu'));
        // this.screens.set('level-select', document.getElementById('level-select-screen'));
        // this.screens.set('shop', document.getElementById('shop-screen'));
        // this.screens.set('upgrade', document.getElementById('upgrade-screen'));
        // this.screens.set('gameplay', document.getElementById('game-hud'));
        // this.screens.set('pause', document.getElementById('pause-menu'));
        // this.screens.set('game-over', document.getElementById('game-over-screen'));
        
        // TODO: Initialize HUD
        // this.hud = new HUD();
        
        // TODO: Hide all screens
        // this.hideAllScreens();
    }

    /**
     * Hi?n th? m?t screen
     * @param {string} screenName 
     * TODO: Implement show screen
     */
    showScreen(screenName) {
        // TODO: Hide current screen
        // if (this.currentScreen) {
        //     this.hideScreen(this.currentScreen);
        // }
        
        // TODO: Show new screen
        // const screen = this.screens.get(screenName);
        // if (screen) {
        //     screen.classList.remove('hidden');
        //     this.currentScreen = screenName;
        // }
    }

    /**
     * ?n m?t screen
     * @param {string} screenName 
     */
    hideScreen(screenName) {
        const screen = this.screens.get(screenName);
        if (screen) {
            screen.classList.add('hidden');
        }
    }

    /**
     * ?n t?t c? screens
     * TODO: Implement hide all
     */
    hideAllScreens() {
        // TODO: Hide all screens
        // this.screens.forEach((screen, name) => {
        //     this.hideScreen(name);
        // });
    }

    /**
     * Update HUD
     * @param {object} data - { score, health, level, bossHealth }
     * TODO: Implement HUD update
     */
    updateHUD(data) {
        // TODO: Update score
        // if (data.score !== undefined) {
        //     document.getElementById('score-value').textContent = data.score;
        // }
        
        // TODO: Update health bar
        // if (data.health !== undefined) {
        //     this.updateHealthBar(data.health, data.maxHealth);
        // }
        
        // TODO: Update level
        // if (data.level !== undefined) {
        //     document.getElementById('level-value').textContent = data.level;
        // }
        
        // TODO: Update boss health n?u c�
        // if (data.bossHealth !== undefined) {
        //     this.updateBossHealthBar(data.bossHealth, data.bossMaxHealth);
        // }
    }

    /**
     * Update health bar
     * @param {number} current 
     * @param {number} max 
     * TODO: Implement health bar update
     */
    updateHealthBar(current, max) {
        // TODO: Update health bar width
        // const healthBar = document.getElementById('health-bar');
        // const percentage = (current / max) * 100;
        // healthBar.style.width = percentage + '%';
        
        // TODO: Update health text
        // document.getElementById('health-text').textContent = `${current}/${max}`;
        
        // TODO: Change color based on health percentage
        // if (percentage < 30) {
        //     healthBar.style.backgroundColor = '#ff0000';
        // } else if (percentage < 60) {
        //     healthBar.style.backgroundColor = '#ffaa00';
        // } else {
        //     healthBar.style.backgroundColor = '#00ff00';
        // }
    }

    /**
     * Hi?n th? boss warning icon
     * TODO: Implement boss warning
     */
    showBossWarning() {
        // TODO: Show boss icon v?i animation
        // const bossIcon = document.getElementById('boss-icon');
        // if (bossIcon) {
        //     bossIcon.classList.remove('hidden');
        //     bossIcon.classList.add('pulse-animation');
        // }
    }

    /**
     * ?n boss warning icon
     * TODO: Implement hide boss warning
     */
    hideBossWarning() {
        // TODO: Hide boss icon
        // const bossIcon = document.getElementById('boss-icon');
        // if (bossIcon) {
        //     bossIcon.classList.add('hidden');
        //     bossIcon.classList.remove('pulse-animation');
        // }
    }

    /**
     * Update boss health bar
     * @param {number} current 
     * @param {number} max 
     * TODO: Implement boss health bar
     */
    updateBossHealthBar(current, max) {
        // TODO: Show boss health bar
        // TODO: Update width based on health percentage
    }

    /**
     * Hi?n th? level up effect
     * @param {number} level 
     * TODO: Implement level up UI
     */
    showLevelUp(level) {
        // TODO: Show level up animation/text
        // - "LEVEL UP!" text
        // - New level number
        // - Animation effect
    }

    /**
     * Hi?n th? score popup (khi kill enemy)
     * @param {number} points 
     * @param {number} x 
     * @param {number} y 
     * TODO: Implement score popup
     */
    showScorePopup(points, x, y) {
        // TODO: Create floating score text
        // - "+10" text t?i v? tr� x, y
        // - Animation: fade out v� move up
        // - Remove sau animation
    }
}
