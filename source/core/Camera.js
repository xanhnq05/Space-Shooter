// Quản lý Camera cho Three.js game

import * as THREE from 'three';
import { GameConfig } from '../utils/Constants.js';

export class Camera {
    constructor() {
        this.camera = null;
        this.initialized = false;
        this.originalPosition = null;
    }

    // Khởi tạo Camera
    init() {
        const container = document.getElementById('game-container');
        const width = container ? container.clientWidth : window.innerWidth;
        const height = container ? container.clientHeight : window.innerHeight;
        const aspect = width / height;
        
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
        
        this.originalPosition = this.camera.position.clone();
        
        this.initialized = true;
        return this.camera;
    }

    // Lấy instance camera
    getCamera() {
        if (!this.initialized) {
            this.init();
        }
        return this.camera;
    }

    // Xử lý khi window resize
    handleResize() {
        if (this.camera) {
            const container = document.getElementById('game-container');
            const width = container ? container.clientWidth : window.innerWidth;
            const height = container ? container.clientHeight : window.innerHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }

    // Di chuyển camera
    setPosition(x, y, z) {
        if (this.camera) {
            this.camera.position.set(x, y, z);
        }
    }

    // Reset camera về vị trí ban đầu
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

    // Camera shake effect
    shake(intensity = 0.1, duration = 200) {
    }
}
