/**
 * ============================================
 * GAMEOVERSCENE.JS
 * ============================================
 * 
 * Scene cho Game Over / Victory
 * Hi?n th?: Final score, stats, stars rating, buttons (Play Again, Main Menu)
 * X? l�: T�nh to�n rating, hi?n th? achievements
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
     * Kh?i t?o Game Over Scene
     * @param {object} data - { score, level, enemiesKilled, victory }
     * TODO: Implement initialization
     * - Hi?n th? final score
     * - Hi?n th? stats (level reached, enemies killed, time played)
     * - T�nh to�n v� hi?n th? stars (1-3)
     * - Hi?n th? "Game Over" ho?c "Victory" t�y k?t qu?
     * - Hi?n th? buttons: Play Again, Main Menu, Share
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
        
        // TODO: Show achievements n?u c�
        // this.checkAchievements();
    }

    /**
     * T�nh to�n s? sao (1-3)
     * TODO: Implement star calculation
     * D?a tr�n: Score, level reached, enemies killed
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
     * T?o UI cho game over
     * TODO: Implement UI creation
     */
    createGameOverUI() {
        // TODO: Create UI v?i:
        // - Title: "GAME OVER" ho?c "VICTORY"
        // - Final score display
        // - Stats display (level, kills, time)
        // - Stars display (1-3 stars)
        // - Buttons: Play Again, Main Menu
    }

    /**
     * Ki?m tra achievements
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
     * X? l� Play Again
     * TODO: Implement play again
     */
    playAgain() {
        // TODO: Restart gameplay v?i c�ng level
        // this.gameEngine.getStateManager().changeState(GameState.GAMEPLAY, {
        //     level: this.gameStats.level
        // });
    }

    /**
     * X? l� Main Menu
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
