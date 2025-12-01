// Game Engine chính - quản lý game loop, scene, renderer

import * as THREE from 'three';
import { Camera } from './Camera.js';
import { GameStateManager } from '../managers/GameStateManager.js';
import { DataManager } from '../managers/DataManager.js';
import { GameState } from '../utils/Constants.js';

export class GameEngine {
    constructor() {
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        
        this.cameraManager = new Camera();
        this.stateManager = new GameStateManager();
        this.dataManager = new DataManager();
        
        this.isRunning = false;
        this.lastTime = 0;
        this.deltaTime = 0;
        
        this.currentSceneInstance = null;
    }

    // Khởi tạo game engine
    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050d1f);
        
        this.camera = this.cameraManager.init();
        
        const canvas = document.getElementById('game-canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true 
        });
        
        const container = document.getElementById('game-container');
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x050d1f, 1);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.NoToneMapping;
        
        window.addEventListener('resize', () => this.handleResize());
        
        this.setupStateListeners();
    }

    // Thiết lập listeners cho state changes
    setupStateListeners() {
        this.stateManager.onStateChange(GameState.LOADING, () => {
            this.loadScene('loading');
        });
        
        this.stateManager.onStateChange(GameState.MAIN_MENU, () => {
            this.loadScene('mainMenu');
        });
        
        this.stateManager.onStateChange(GameState.GAMEPLAY, (data) => {
            this.loadScene('gameplay', data);
        });
        
        this.stateManager.onStateChange(GameState.PAUSED, () => {
        });
        
        this.stateManager.onStateChange(GameState.GAME_OVER, (data) => {
            this.loadScene('gameOver', data);
        });
    }

    // Load scene mới
    loadScene(sceneName, data = {}) {
        if (this.currentSceneInstance) {
            this.currentSceneInstance.cleanup();
        }
        
        const sceneInstance = this.stateManager.getScene(sceneName);
        if (sceneInstance) {
            this.currentSceneInstance = sceneInstance;
            sceneInstance.init(this.scene, this.camera, data);
        }
    }

    // Bắt đầu game loop
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTime = performance.now();
        
        this.animate();
    }

    // Game loop chính
    animate() {
        if (!this.isRunning) return;
        
        requestAnimationFrame(() => this.animate());
        
        const currentTime = performance.now();
        this.deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        if (this.currentSceneInstance && this.currentSceneInstance.update) {
            this.currentSceneInstance.update(this.deltaTime);
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    // Dừng game loop
    stop() {
        this.isRunning = false;
    }

    // Xử lý window resize
    handleResize() {
        this.cameraManager.handleResize();
        
        if (this.renderer) {
            const container = document.getElementById('game-container');
            const width = container.clientWidth;
            const height = container.clientHeight;
            this.renderer.setSize(width, height);
        }
        
        if (this.currentSceneInstance && this.currentSceneInstance.onResize) {
            this.currentSceneInstance.onResize();
        }
    }

    // Dọn dẹp
    cleanup() {
        this.stop();
        
        if (this.currentSceneInstance) {
            this.currentSceneInstance.cleanup();
        }
    }

    getScene() { return this.scene; }
    getRenderer() { return this.renderer; }
    getCamera() { return this.camera; }
    getStateManager() { return this.stateManager; }
    getDataManager() { return this.dataManager; }
}
