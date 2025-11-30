/**
 * ============================================
 * LEVELSELECTSCENE.JS
 * ============================================
 * 
 * Scene cho Level Selection
 * Hi?n th?: Danh s�ch c�c level, level ?� m? kh�a/ch?a m?
 * X? l�: Click v�o level ?? b?t ??u gameplay
 */

import { BaseScene } from './BaseScene.js';
import { GameState } from '../utils/Constants.js';

export class LevelSelectScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.levelButtons = [];
        this.selectedLevel = null;
    }

    /**
     * Kh?i t?o Level Select Scene
     * TODO: Implement initialization
     * - Load danh s�ch levels t? DataManager
     * - Hi?n th? c�c level cards
     * - Hi?n th? lock/unlock status
     * - Hi?n th? stars/rating cho m?i level
     * - Hi?n th? best score cho m?i level
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // TODO: Get unlocked levels t? DataManager
        // const unlockedLevels = this.gameEngine.getDataManager().data.unlockedLevels;
        
        // TODO: Create level selection UI
        // this.createLevelSelection();
        
        // TODO: Setup event listeners
        // this.setupEventListeners();
    }

    /**
     * T?o UI cho level selection
     * TODO: Implement level cards creation
     * - T?o card cho m?i level (1-10 ho?c nhi?u h?n)
     * - Hi?n th? level number
     * - Hi?n th? lock icon n?u ch?a m?
     * - Hi?n th? stars (1-3) n?u ?� ho�n th�nh
     * - Hi?n th? best score
     * - Preview image c?a level
     */
    createLevelSelection() {
        // TODO: Create level cards
        // for (let i = 1; i <= 10; i++) {
        //     const isUnlocked = this.gameEngine.getDataManager().isLevelUnlocked(i);
        //     this.createLevelCard(i, isUnlocked);
        // }
    }

    /**
     * T?o card cho m?t level
     * @param {number} levelNumber 
     * @param {boolean} isUnlocked 
     * TODO: Implement level card creation
     */
    createLevelCard(levelNumber, isUnlocked) {
        // TODO: Create card element v?i:
        // - Level number
        // - Lock/unlock status
        // - Stars rating
        // - Best score
        // - Preview thumbnail
    }

    /**
     * X? l� khi click v�o level
     * @param {number} levelNumber 
     * TODO: Implement level selection
     */
    selectLevel(levelNumber) {
        // TODO: Check if level is unlocked
        // if (!this.gameEngine.getDataManager().isLevelUnlocked(levelNumber)) {
        //     // Show message: "Complete previous levels to unlock"
        //     return;
        // }
        
        // TODO: Start gameplay v?i level ???c ch?n
        // this.gameEngine.getStateManager().changeState(GameState.GAMEPLAY, {
        //     level: levelNumber
        // });
    }

    /**
     * Setup event listeners
     * TODO: Implement event handlers
     */
    setupEventListeners() {
        // TODO: Add click listeners cho level cards
    }

    cleanup() {
        // TODO: Cleanup
        super.cleanup();
    }
}
