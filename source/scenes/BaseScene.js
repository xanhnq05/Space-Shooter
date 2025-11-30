/**
 * ============================================
 * BASESCENE.JS
 * ============================================
 * 
 * Base class cho tất cả các Scene
 * Cung cấp interface chung cho init, update, cleanup
 */

export class BaseScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.isInitialized = false;
    }

    /**
     * Khởi tạo scene
     * @param {THREE.Scene} scene - Three.js scene
     * @param {THREE.Camera} camera - Three.js camera
     * @param {object} data - Dữ liệu truyền vào (optional)
     * TODO: Implement trong các class con
     */
    init(scene, camera, data = {}) {
        this.scene = scene;
        this.camera = camera;
        this.isInitialized = true;
    }

    /**
     * Update scene mỗi frame
     * @param {number} deltaTime - Thời gian từ frame trước (ms)
     * TODO: Implement trong các class con
     */
    update(deltaTime) {
        // Override in child classes
    }

    /**
     * Cleanup khi scene bị destroy
     * TODO: Implement cleanup logic
     * - Remove tất cả objects khỏi scene
     * - Dispose textures, geometries, materials
     * - Clear event listeners
     */
    cleanup() {
        // TODO: Cleanup all resources
        this.isInitialized = false;
    }

    /**
     * Xử lý khi window resize
     * TODO: Implement resize handler
     */
    onResize() {
        // Override in child classes if needed
    }
}
