/**
 * ============================================
 * HUD.JS
 * ============================================
 * 
 * Qu?n l� HUD (Heads-Up Display) trong gameplay
 * Hi?n th?: Score, Health, Level, Boss Health, Boss Icon
 */

export class HUD {
    constructor() {
        this.elements = {
            score: null,
            healthBar: null,
            healthText: null,
            level: null,
            bossIcon: null,
            bossHealthBar: null
        };
    }

    /**
     * Kh?i t?o HUD
     * TODO: Implement HUD initialization
     * - Get references ??n HUD elements t? DOM
     * - Setup initial values
     */
    init() {
        // TODO: Get element references
        // this.elements.score = document.getElementById('score-value');
        // this.elements.healthBar = document.getElementById('health-bar');
        // this.elements.healthText = document.getElementById('health-text');
        // this.elements.level = document.getElementById('level-value');
        // this.elements.bossIcon = document.getElementById('boss-icon');
        // this.elements.bossHealthBar = document.getElementById('boss-health-bar');
    }

    /**
     * Update score
     * @param {number} score 
     * TODO: Implement score update
     */
    updateScore(score) {
        // TODO: Update score display v?i animation
        // if (this.elements.score) {
        //     this.elements.score.textContent = score.toLocaleString();
        //     // Add pulse animation
        // }
    }

    /**
     * Update health
     * @param {number} current 
     * @param {number} max 
     * TODO: Implement health update
     */
    updateHealth(current, max) {
        // TODO: Update health bar v� text
        // const percentage = (current / max) * 100;
        // if (this.elements.healthBar) {
        //     this.elements.healthBar.style.width = percentage + '%';
        // }
        // if (this.elements.healthText) {
        //     this.elements.healthText.textContent = `${current}/${max}`;
        // }
    }

    /**
     * Update level
     * @param {number} level 
     * TODO: Implement level update
     */
    updateLevel(level) {
        // TODO: Update level display
        // if (this.elements.level) {
        //     this.elements.level.textContent = level;
        // }
    }

    /**
     * Hi?n th? boss icon
     * TODO: Implement boss icon display
     */
    showBossIcon() {
        // TODO: Show boss icon v?i animation
        // if (this.elements.bossIcon) {
        //     this.elements.bossIcon.classList.remove('hidden');
        //     this.elements.bossIcon.classList.add('pulse');
        // }
    }

    /**
     * ?n boss icon
     * TODO: Implement hide boss icon
     */
    hideBossIcon() {
        // TODO: Hide boss icon
        // if (this.elements.bossIcon) {
        //     this.elements.bossIcon.classList.add('hidden');
        // }
    }

    /**
     * Update boss health
     * @param {number} current 
     * @param {number} max 
     * TODO: Implement boss health update
     */
    updateBossHealth(current, max) {
        // TODO: Show v� update boss health bar
        // if (this.elements.bossHealthBar) {
        //     const percentage = (current / max) * 100;
        //     this.elements.bossHealthBar.style.width = percentage + '%';
        //     this.elements.bossHealthBar.parentElement.classList.remove('hidden');
        // }
    }

    /**
     * ?n boss health bar
     * TODO: Implement hide boss health
     */
    hideBossHealth() {
        // TODO: Hide boss health bar
        // if (this.elements.bossHealthBar) {
        //     this.elements.bossHealthBar.parentElement.classList.add('hidden');
        // }
    }
}
