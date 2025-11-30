/**
 * ============================================
 * MAINMENUSCENE.JS
 * ============================================
 * 
 * Scene cho Main Menu
 * Hi?n th?: Logo, n�t Play, Shop, Settings, Exit
 * X? l�: Click v�o c�c n�t ?? chuy?n scene
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
     * Kh?i t?o Main Menu Scene
     * TODO: Implement initialization
     * - Load background (c� th? l� static image ho?c animated)
     * - Setup UI elements (buttons)
     * - Setup event listeners cho c�c n�t
     * - Hi?n th? high score n?u c�
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
     * T?o background cho menu
     * TODO: Implement background creation
     * - Load texture t? AssetPaths
     * - T?o PlaneGeometry v?i k�ch th??c ph� h?p
     * - C� th? th�m animation nh? (parallax, rotation...)
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
     * - T?o c�c n�t: Play, Shop, Settings, Exit
     * - Position c�c n�t tr�n m�n h�nh
     * - Style buttons (c� th? d�ng CSS ho?c Three.js sprites)
     */
    setupUI() {
        // TODO: Create UI buttons
        // C� th? d�ng HTML overlay ho?c Three.js sprites
    }

    /**
     * Setup event listeners
     * TODO: Implement button click handlers
     * - Play button -> chuy?n ??n LevelSelectScene
     * - Shop button -> chuy?n ??n ShopScene
     * - Settings button -> m? settings overlay
     * - Exit button -> confirm v� exit
     */
    setupEventListeners() {
        // TODO: Add click listeners
        // document.getElementById('btn-start')?.addEventListener('click', () => {
        //     this.gameEngine.getStateManager().changeState(GameState.LEVEL_SELECT);
        // });
    }

    /**
     * Update scene (n?u c� animation)
     * TODO: Implement update logic
     * - Animate background n?u c?n
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
