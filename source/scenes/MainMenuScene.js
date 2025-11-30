/**
 * ============================================
 * MAINMENUSCENE.JS
 * ============================================
 * 
 * Scene cho Main Menu
 * Hiển thị: Logo, nút Play, Shop, Settings, Exit
 * Xử lý: Click vào các nút để chuyển scene
 */

import { BaseScene } from './BaseScene.js';
import { GameState } from '../utils/Constants.js';
import * as THREE from 'three';

export class MainMenuScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.uiElements = [];
        this.background = null;
    }

    /**
     * Khởi tạo Main Menu Scene
     * TODO: Implement initialization
     * - Load background (có thể là static image hoặc animated)
     * - Setup UI elements (buttons)
     * - Setup event listeners cho các nút
     * - Hiển thị high score nếu có
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // TODO: Create background
        // this.createBackground();
        
        // TODO: Setup UI
        // this.setupUI();
        
        // TODO: Setup button listeners
        // this.setupEventListeners();
    }

    /**
     * Tạo background cho menu
     * TODO: Implement background creation
     * - Load texture từ AssetPaths
     * - Tạo PlaneGeometry với kích thước phù hợp
     * - Có thể thêm animation nhẹ (parallax, rotation...)
     */
    createBackground() {
        // TODO: Load background texture
        // const textureLoader = new THREE.TextureLoader();
        // const texture = textureLoader.load('path/to/menu/bg.png');
        // 
        // const geometry = new THREE.PlaneGeometry(20, 20);
        // const material = new THREE.MeshBasicMaterial({ map: texture });
        // this.background = new THREE.Mesh(geometry, material);
        // this.background.position.z = -5;
        // this.scene.add(this.background);
    }

    /**
     * Setup UI elements
     * TODO: Implement UI setup
     * - Tạo các nút: Play, Shop, Settings, Exit
     * - Position các nút trên màn hình
     * - Style buttons (có thể dùng CSS hoặc Three.js sprites)
     */
    setupUI() {
        // TODO: Create UI buttons
        // Có thể dùng HTML overlay hoặc Three.js sprites
    }

    /**
     * Setup event listeners
     * TODO: Implement button click handlers
     * - Play button -> chuyển đến LevelSelectScene
     * - Shop button -> chuyển đến ShopScene
     * - Settings button -> mở settings overlay
     * - Exit button -> confirm và exit
     */
    setupEventListeners() {
        // TODO: Add click listeners
        // document.getElementById('btn-start')?.addEventListener('click', () => {
        //     this.gameEngine.getStateManager().changeState(GameState.LEVEL_SELECT);
        // });
    }

    /**
     * Update scene (nếu có animation)
     * TODO: Implement update logic
     * - Animate background nếu cần
     * - Update UI animations
     */
    update(deltaTime) {
        // TODO: Update animations
    }

    /**
     * Cleanup
     * TODO: Implement cleanup
     */
    cleanup() {
        // TODO: Remove all objects, event listeners
        super.cleanup();
    }
}
