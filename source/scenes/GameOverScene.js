// Scene cho Game Over

import { BaseScene } from './BaseScene.js';
import { GameState } from '../utils/Constants.js';

export class GameOverScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.gameStats = null;
        this.gameOverElement = null;
    }

    // Khởi tạo Game Over Scene
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        this.gameStats = {
            score: data.score || 0,
            enemiesKilled: data.enemiesKilled || 0,
            waveNumber: data.waveNumber || 1
        };
        
        this.gameOverElement = document.getElementById('game-over-screen');
        
        this.createGameOverUI();
        this.setupEventListeners();
        this.showGameOverUI();
    }

    // Hiển thị Game Over UI
    showGameOverUI() {
        const allScreens = Array.from(document.querySelectorAll('#game-container .screen'));
        allScreens.forEach(screen => {
            if (screen === this.gameOverElement) {
                screen.classList.remove('hidden');
            } else {
                screen.classList.add('hidden');
            }
        });
    }

    // Tạo UI cho game over
    createGameOverUI() {
        const finalScore = document.getElementById('final-score');
        if (finalScore) {
            finalScore.textContent = this.gameStats.score;
        }
        
        const enemiesKilled = document.getElementById('enemies-killed');
        if (enemiesKilled) {
            enemiesKilled.textContent = this.gameStats.enemiesKilled;
        }
        
        const finalLevel = document.getElementById('final-level');
        if (finalLevel) {
            finalLevel.textContent = `Wave ${this.gameStats.waveNumber}`;
        }
        
        const gameOverTitle = document.getElementById('game-over-title');
        if (gameOverTitle) {
            gameOverTitle.textContent = 'GAME OVER';
        }
        
        const starsRating = document.getElementById('stars-rating');
        if (starsRating) {
            starsRating.style.display = 'none';
        }
    }

    // Thiết lập event listeners
    setupEventListeners() {
        const playAgainBtn = document.getElementById('btn-play-again');
        const mainMenuBtn = document.getElementById('btn-main-menu');
        
        if (playAgainBtn) {
            playAgainBtn.onclick = () => this.playAgain();
        }
        
        if (mainMenuBtn) {
            mainMenuBtn.onclick = () => this.goToMainMenu();
        }
    }

    // Xử lý Play Again
    playAgain() {
        this.gameEngine.getStateManager().changeState(GameState.GAMEPLAY);
    }

    // Xử lý Main Menu
    goToMainMenu() {
        this.gameEngine.getStateManager().changeState(GameState.MAIN_MENU);
    }

    // Cập nhật scene
    update(deltaTime) {
    }

    // Dọn dẹp
    cleanup() {
        if (this.gameOverElement) {
            this.gameOverElement.classList.add('hidden');
        }
        super.cleanup();
    }
}
