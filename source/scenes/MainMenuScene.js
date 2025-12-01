// Scene cho Main Menu

import { BaseScene } from './BaseScene.js';
import { GameState } from '../utils/Constants.js';
import * as THREE from 'three';

export class MainMenuScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.uiElements = [];
        this.background = null;
        this.screenElements = [];
        this.mainMenuElement = null;
    }

    // Khởi tạo Main Menu Scene
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        this.cacheDomElements();
        this.showMainMenuUI();
        this.setupEventListeners();
        this.loadHighScore();
    }

    // Lưu lại các DOM screen
    cacheDomElements() {
        this.screenElements = Array.from(document.querySelectorAll('#game-container .screen'));
        this.mainMenuElement = document.getElementById('main-menu');
    }

    // Hiển thị Main Menu và ẩn các screen khác
    showMainMenuUI() {
        if (!this.screenElements?.length || !this.mainMenuElement) {
            return;
        }
        
        this.screenElements.forEach(screen => {
            if (screen === this.mainMenuElement) {
                screen.classList.remove('hidden');
            } else {
                screen.classList.add('hidden');
            }
        });
    }

    // Tạo background cho menu
    createBackground() {
    }

    // Thiết lập UI elements
    setupUI() {
    }

    // Thiết lập event listeners
    setupEventListeners() {
        const playButton = document.getElementById('btn-play');
        if (playButton) {
            playButton.addEventListener('click', () => {
                this.gameEngine.getStateManager().changeState(GameState.GAMEPLAY);
            });
        }
    }

    // Load và hiển thị high score
    loadHighScore() {
        const highScoreDisplay = document.getElementById('high-score-display');
        if (highScoreDisplay) {
            const highScore = this.gameEngine.getDataManager().getHighScore() || 0;
            highScoreDisplay.textContent = highScore;
        }
    }

    // Cập nhật scene
    update(deltaTime) {
    }

    // Dọn dẹp
    cleanup() {
        if (this.mainMenuElement) {
            this.mainMenuElement.classList.add('hidden');
        }
        super.cleanup();
    }
}
