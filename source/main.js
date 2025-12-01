// Entry point của game - khởi tạo GameEngine và bắt đầu game

import { GameEngine } from './core/GameEngine.js';
import { LoadingScene } from './scenes/LoadingScene.js';
import { MainMenuScene } from './scenes/MainMenuScene.js';
import { GameplayScene } from './scenes/GameplayScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { GameState } from './utils/Constants.js';

let gameEngine = null;

// Khởi tạo game
async function initGame() {
    try {
        gameEngine = new GameEngine();
        gameEngine.init();
        
        const loadingScene = new LoadingScene(gameEngine);
        const mainMenuScene = new MainMenuScene(gameEngine);
        const gameplayScene = new GameplayScene(gameEngine);
        const gameOverScene = new GameOverScene(gameEngine);
        
        gameEngine.getStateManager().registerScene('loading', loadingScene);
        gameEngine.getStateManager().registerScene('mainMenu', mainMenuScene);
        gameEngine.getStateManager().registerScene('gameplay', gameplayScene);
        gameEngine.getStateManager().registerScene('gameOver', gameOverScene);
        
        gameEngine.getStateManager().changeState(GameState.LOADING);
        gameEngine.start();
        
        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

window.gameEngine = () => gameEngine;
