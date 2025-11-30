/**
 * ============================================
 * GAMEENGINE.JS
 * ============================================
 * 
 * Game Engine ch�nh - Qu?n l� game loop, scene, renderer
 * Entry point cho t?t c? c�c h? th?ng game
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
        
        // Scene references (s? ???c kh?i t?o sau)
        this.currentSceneInstance = null;
    }

    /**
     * Kh?i t?o game engine
     * TODO: Implement initialization
     * - T?o Three.js Scene
     * - Kh?i t?o Camera
     * - T?o WebGL Renderer v?i antialias
     * - Setup renderer size v� pixel ratio
     * - Append renderer DOM v�o body
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
        // TODO: Listen to state changes v� load scene t??ng ?ng
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
        // ... c�c state kh�c
    }

    /**
     * Load scene m?i
     * @param {string} sceneName 
     * @param {object} data 
     * TODO: Implement scene loading
     */
    loadScene(sceneName, data = {}) {
        // TODO: Cleanup scene c? n?u c�
        // if (this.currentSceneInstance) {
        //     this.currentSceneInstance.cleanup();
        // }
        
        // TODO: Get scene instance t? stateManager
        // const sceneInstance = this.stateManager.getScene(sceneName);
        // if (sceneInstance) {
        //     this.currentSceneInstance = sceneInstance;
        //     sceneInstance.init(this.scene, this.camera, data);
        // }
    }

    /**
     * B?t ??u game loop
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
     * Game loop ch�nh
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
     * D?ng game loop
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * X? l� window resize
     * TODO: Implement resize handler
     */
    handleResize() {
        // TODO: Update camera
        // this.cameraManager.handleResize();
        
        // TODO: Update renderer size
        // if (this.renderer) {
        //     this.renderer.setSize(window.innerWidth, window.innerHeight);
        // }
        
        // TODO: Notify current scene v? resize
        // if (this.currentSceneInstance && this.currentSceneInstance.onResize) {
        //     this.currentSceneInstance.onResize();
        // }
    }

    /**
     * Cleanup khi game k?t th�c
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
