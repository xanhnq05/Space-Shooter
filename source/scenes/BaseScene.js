/**
 * ============================================
 * BASESCENE.JS
 * ============================================
 * 
 * Base class cho t?t c? c�c Scene
 * Cung c?p interface chung cho init, update, cleanup
 */

export class BaseScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.isInitialized = false;
    }

    /**
     * Kh?i t?o scene
     * @param {THREE.Scene} scene - Three.js scene
     * @param {THREE.Camera} camera - Three.js camera
     * @param {object} data - D? li?u truy?n v�o (optional)
     * TODO: Implement trong c�c class con
     */
    init(scene, camera, data = {}) {
        this.scene = scene;
        this.camera = camera;
        this.isInitialized = true;
    }

    /**
     * Update scene m?i frame
     * @param {number} deltaTime - Th?i gian t? frame tr??c (ms)
     * TODO: Implement trong c�c class con
     */
    update(deltaTime) {
        // Override in child classes
    }

    /**
     * Cleanup khi scene b? destroy
     * TODO: Implement cleanup logic
     * - Remove t?t c? objects kh?i scene
     * - Dispose textures, geometries, materials
     * - Clear event listeners
     */
    cleanup() {
        // TODO: Cleanup all resources
        this.isInitialized = false;
    }

    /**
     * X? l� khi window resize
     * TODO: Implement resize handler
     */
    onResize() {
        // Override in child classes if needed
    }
}
