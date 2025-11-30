/**
 * ============================================
 * GAMEOVERSCENE.JS
 * ============================================
 * 
 * Scene cho Game Over / Victory
 * Hiển thị: Final score, stats, stars rating, buttons (Play Again, Main Menu)
 * Xử lý: Tính toán rating, hiển thị achievements
 */

import { BaseScene } from './BaseScene.js';
import { GameState } from '../utils/Constants.js';

export class GameOverScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.gameStats = null;
    }

    /**
     * Khởi tạo Game Over Scene
     * @param {object} data - { score, level, enemiesKilled, victory }
     * TODO: Implement initialization
     * - Hiển thị final score
     * - Hiển thị stats (level reached, enemies killed, time played)
     * - Tính toán và hiển thị stars (1-3)
     * - Hiển thị "Game Over" hoặc "Victory" tùy kết quả
     * - Hiển thị buttons: Play Again, Main Menu, Share
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // TODO: Save game stats
        // this.gameStats = {
        //     score: data.score || 0,
        //     level: data.level || 1,
        //     enemiesKilled: data.enemiesKilled || 0,
        //     victory: data.victory || false
        // };
        
        // TODO: Calculate stars rating
        // const stars = this.calculateStars();
        
        // TODO: Create game over UI
        // this.createGameOverUI();
        
        // TODO: Setup event listeners
        // this.setupEventListeners();
        
        // TODO: Show achievements nếu có
        // this.checkAchievements();
    }

    /**
     * Tính toán số sao (1-3)
     * TODO: Implement star calculation
     * Dựa trên: Score, level reached, enemies killed
     * @returns {number} 1-3 stars
     */
    calculateStars() {
        // TODO: Calculate based on performance
        // let stars = 1;
        // 
        // if (this.gameStats.score > 1000) stars = 2;
        // if (this.gameStats.score > 5000 && this.gameStats.level > 5) stars = 3;
        // 
        // return stars;
    }

    /**
     * Tạo UI cho game over
     * TODO: Implement UI creation
     */
    createGameOverUI() {
        // TODO: Create UI với:
        // - Title: "GAME OVER" hoặc "VICTORY"
        // - Final score display
        // - Stats display (level, kills, time)
        // - Stars display (1-3 stars)
        // - Buttons: Play Again, Main Menu
    }

    /**
     * Kiểm tra achievements
     * TODO: Implement achievement checking
     */
    checkAchievements() {
        // TODO: Check various achievements:
        // - First win
        // - High score milestone
        // - Perfect run (no damage)
        // - Boss killer
        // - etc.
    }

    /**
     * Xử lý Play Again
     * TODO: Implement play again
     */
    playAgain() {
        // TODO: Restart gameplay với cùng level
        // this.gameEngine.getStateManager().changeState(GameState.GAMEPLAY, {
        //     level: this.gameStats.level
        // });
    }

    /**
     * Xử lý Main Menu
     * TODO: Implement return to menu
     */
    goToMainMenu() {
        // TODO: Return to main menu
        // this.gameEngine.getStateManager().changeState(GameState.MAIN_MENU);
    }

    setupEventListeners() {
        // TODO: Add click listeners
    }

    cleanup() {
        super.cleanup();
    }
}
