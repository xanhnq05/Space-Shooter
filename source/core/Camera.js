/**
 * ============================================
 * CAMERA.JS
 * ============================================
 * 
 * Quản lý Camera cho Three.js game
 * Setup camera với các thông số tối ưu cho game 2D/2.5D space shooter
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
     * Khởi tạo Camera với cấu hình từ Constants
     * Camera đã được setup hoàn chỉnh
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
        
        // Lưu vị trí ban đầu cho shake effect
        this.originalPosition = this.camera.position.clone();
        
        this.initialized = true;
        return this.camera;
    }

    /**
     * Lấy instance camera
     * @returns {THREE.PerspectiveCamera}
     */
    getCamera() {
        if (!this.initialized) {
            this.init();
        }
        return this.camera;
    }

    /**
     * Xử lý khi window resize
     * Camera tự động điều chỉnh aspect ratio
     */
    handleResize() {
        if (this.camera) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    /**
     * Di chuyển camera (có thể dùng cho camera shake effects)
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
     * Reset camera về vị trí ban đầu
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
     * Camera shake effect (khi player bị hit, boss xuất hiện...)
     * @param {number} intensity - Cường độ shake
     * @param {number} duration - Thời gian shake (ms)
     * TODO: Implement camera shake animation
     */
    shake(intensity = 0.1, duration = 200) {
        // TODO: Implement camera shake animation
        // - Lưu vị trí ban đầu
        // - Tạo animation random offset
        // - Reset về vị trí ban đầu sau duration
    }
}
