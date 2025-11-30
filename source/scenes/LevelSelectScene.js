/**
 * ============================================
 * LEVELSELECTSCENE.JS
 * ============================================
 * 
 * Scene cho Level Selection
 * Hiển thị: Danh sách các level, level đã mở khóa/chưa mở
 * Xử lý: Click vào level để bắt đầu gameplay
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
     * Khởi tạo Level Select Scene
     * TODO: Implement initialization
     * - Load danh sách levels từ DataManager
     * - Hiển thị các level cards
     * - Hiển thị lock/unlock status
     * - Hiển thị stars/rating cho mỗi level
     * - Hiển thị best score cho mỗi level
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // TODO: Get unlocked levels từ DataManager
        // const unlockedLevels = this.gameEngine.getDataManager().data.unlockedLevels;
        
        // TODO: Create level selection UI
        // this.createLevelSelection();
        
        // TODO: Setup event listeners
        // this.setupEventListeners();
    }

    /**
     * Tạo UI cho level selection
     * TODO: Implement level cards creation
     * - Tạo card cho mỗi level (1-10 hoặc nhiều hơn)
     * - Hiển thị level number
     * - Hiển thị lock icon nếu chưa mở
     * - Hiển thị stars (1-3) nếu đã hoàn thành
     * - Hiển thị best score
     * - Preview image của level
     */
    createLevelSelection() {
        // TODO: Create level cards
        // for (let i = 1; i <= 10; i++) {
        //     const isUnlocked = this.gameEngine.getDataManager().isLevelUnlocked(i);
        //     this.createLevelCard(i, isUnlocked);
        // }
    }

    /**
     * Tạo card cho một level
     * @param {number} levelNumber 
     * @param {boolean} isUnlocked 
     * TODO: Implement level card creation
     */
    createLevelCard(levelNumber, isUnlocked) {
        // TODO: Create card element với:
        // - Level number
        // - Lock/unlock status
        // - Stars rating
        // - Best score
        // - Preview thumbnail
    }

    /**
     * Xử lý khi click vào level
     * @param {number} levelNumber 
     * TODO: Implement level selection
     */
    selectLevel(levelNumber) {
        // TODO: Check if level is unlocked
        // if (!this.gameEngine.getDataManager().isLevelUnlocked(levelNumber)) {
        //     // Show message: "Complete previous levels to unlock"
        //     return;
        // }
        
        // TODO: Start gameplay với level được chọn
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
