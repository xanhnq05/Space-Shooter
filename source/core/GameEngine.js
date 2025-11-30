/**
 * ============================================
 * GAMEENGINE.JS
 * ============================================
 * 
 * Game Engine chính - Quản lý game loop, scene, renderer
 * Entry point cho tất cả các hệ thống game
 */

import * as THREE from 'three';
import { Camera } from './Camera.js';
import { GameStateManager } from '../managers/GameStateManager.js';
import { DataManager } from '../managers/DataManager.js';
import { GameState } from '../utils/Constants.js';

export class GameEngine {
    constructor() {
        // Core Three.js components
        this.scene = null;
        this.renderer = null;
        this.camera = null;
        
        // Managers
        this.cameraManager = new Camera();
        this.stateManager = new GameStateManager();
        this.dataManager = new DataManager();
        
        // Game loop
        this.isRunning = false;
        this.lastTime = 0;
        this.deltaTime = 0;
        
        // Scene references (sẽ được khởi tạo sau)
        this.currentSceneInstance = null;
    }

    /**
     * Khởi tạo game engine
     * TODO: Implement initialization
     * - Tạo Three.js Scene
     * - Khởi tạo Camera
     * - Tạo WebGL Renderer với antialias
     * - Setup renderer size và pixel ratio
     * - Append renderer DOM vào body
     * - Setup window resize handler
     */
    init() {
        // TODO: Initialize Three.js scene
        // this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color(0x000011);
        
        // TODO: Initialize camera
        // this.camera = this.cameraManager.init();
        
        // TODO: Initialize renderer
        // this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.setPixelRatio(window.devicePixelRatio);
        // document.body.appendChild(this.renderer.domElement);
        
        // TODO: Setup resize handler
        // window.addEventListener('resize', () => this.handleResize());
        
        // TODO: Setup state change listeners
        // this.setupStateListeners();
    }

    /**
     * Setup listeners cho state changes
     * TODO: Implement state change handlers
     */
    setupStateListeners() {
        // TODO: Listen to state changes và load scene tương ứng
        // this.stateManager.onStateChange(GameState.MAIN_MENU, () => {
        //     this.loadScene('mainMenu');
        // });
        // 
        // this.stateManager.onStateChange(GameState.LEVEL_SELECT, () => {
        //     this.loadScene('levelSelect');
        // });
        // 
        // this.stateManager.onStateChange(GameState.GAMEPLAY, (data) => {
        //     this.loadScene('gameplay', data);
        // });
        // ... các state khác
    }

    /**
     * Load scene mới
     * @param {string} sceneName 
     * @param {object} data 
     * TODO: Implement scene loading
     */
    loadScene(sceneName, data = {}) {
        // TODO: Cleanup scene cũ nếu có
        // if (this.currentSceneInstance) {
        //     this.currentSceneInstance.cleanup();
        // }
        
        // TODO: Get scene instance từ stateManager
        // const sceneInstance = this.stateManager.getScene(sceneName);
        // if (sceneInstance) {
        //     this.currentSceneInstance = sceneInstance;
        //     sceneInstance.init(this.scene, this.camera, data);
        // }
    }

    /**
     * Bắt đầu game loop
     * TODO: Implement game loop
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTime = performance.now();
        
        // TODO: Start animation loop
        // this.animate();
    }

    /**
     * Game loop chính
     * TODO: Implement animation loop
     */
    animate() {
        if (!this.isRunning) return;
        
        requestAnimationFrame(() => this.animate());
        
        // TODO: Calculate deltaTime
        // const currentTime = performance.now();
        // this.deltaTime = currentTime - this.lastTime;
        // this.lastTime = currentTime;
        
        // TODO: Update current scene
        // if (this.currentSceneInstance && this.currentSceneInstance.update) {
        //     this.currentSceneInstance.update(this.deltaTime);
        // }
        
        // TODO: Render scene
        // if (this.renderer && this.scene && this.camera) {
        //     this.renderer.render(this.scene, this.camera);
        // }
    }

    /**
     * Dừng game loop
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * Xử lý window resize
     * TODO: Implement resize handler
     */
    handleResize() {
        // TODO: Update camera
        // this.cameraManager.handleResize();
        
        // TODO: Update renderer size
        // if (this.renderer) {
        //     this.renderer.setSize(window.innerWidth, window.innerHeight);
        // }
        
        // TODO: Notify current scene về resize
        // if (this.currentSceneInstance && this.currentSceneInstance.onResize) {
        //     this.currentSceneInstance.onResize();
        // }
    }

    /**
     * Cleanup khi game kết thúc
     */
    cleanup() {
        this.stop();
        
        if (this.currentSceneInstance) {
            this.currentSceneInstance.cleanup();
        }
        
        // TODO: Dispose Three.js resources
        // if (this.renderer) {
        //     this.renderer.dispose();
        // }
    }

    // Getters
    getScene() { return this.scene; }
    getRenderer() { return this.renderer; }
    getCamera() { return this.camera; }
    getStateManager() { return this.stateManager; }
    getDataManager() { return this.dataManager; }
}
