/**
 * ============================================
 * CAMERA.JS
 * ============================================
 * 
 * Quan ly Camera cho Three.js game
 * Setup camera voi cac thong so toi uu cho game 2D/2.5D space shooter
 */

import * as THREE from 'three';
import { GameConfig } from '../utils/Constants.js';

export class Camera {
    constructor() {
        this.camera = null;
        this.initialized = false;
        this.originalPosition = null;
    }

    /**
     * Khoi tao Camera voi cau hinh tu Constants
     * Camera da duoc setup hoan chinh
     */
    init() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(
            GameConfig.CAMERA.FOV,
            aspect,
            GameConfig.CAMERA.NEAR,
            GameConfig.CAMERA.FAR
        );
        
        this.camera.position.set(
            GameConfig.CAMERA.POSITION.x,
            GameConfig.CAMERA.POSITION.y,
            GameConfig.CAMERA.POSITION.z
        );
        
        this.camera.lookAt(
            GameConfig.CAMERA.LOOK_AT.x,
            GameConfig.CAMERA.LOOK_AT.y,
            GameConfig.CAMERA.LOOK_AT.z
        );
        
        // Luu vi tri ban dau cho shake effect
        this.originalPosition = this.camera.position.clone();
        
        this.initialized = true;
        return this.camera;
    }

    /**
     * Lay instance camera
     * @returns {THREE.PerspectiveCamera}
     */
    getCamera() {
        if (!this.initialized) {
            this.init();
        }
        return this.camera;
    }

    /**
     * Xu ly khi window resize
     * Camera tu dong dieu chinh aspect ratio
     */
    handleResize() {
        if (this.camera) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    /**
     * Di chuyen camera (co the dung cho camera shake effects)
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    setPosition(x, y, z) {
        if (this.camera) {
            this.camera.position.set(x, y, z);
        }
    }

    /**
     * Reset camera ve vi tri ban dau
     */
    reset() {
        if (this.camera && this.originalPosition) {
            this.camera.position.copy(this.originalPosition);
            this.camera.lookAt(
                GameConfig.CAMERA.LOOK_AT.x,
                GameConfig.CAMERA.LOOK_AT.y,
                GameConfig.CAMERA.LOOK_AT.z
            );
        }
    }

    /**
     * Camera shake effect (khi player bi hit, boss xuat hien...)
     * @param {number} intensity - Cuong do shake
     * @param {number} duration - Thoi gian shake (ms)
     * TODO: Implement camera shake animation
     */
    shake(intensity = 0.1, duration = 200) {
        // TODO: Implement camera shake animation
        // - Luu vi tri ban dau
        // - Tao animation random offset
        // - Reset ve vi tri ban dau sau duration
    }
}
