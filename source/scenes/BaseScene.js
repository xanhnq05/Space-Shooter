// Base class cho tất cả các Scene

export class BaseScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.isInitialized = false;
    }

    // Khởi tạo scene
    init(scene, camera, data = {}) {
        this.scene = scene;
        this.camera = camera;
        this.isInitialized = true;
    }

    // Cập nhật scene mỗi frame
    update(deltaTime) {
    }

    // Dọn dẹp
    cleanup() {
        this.isInitialized = false;
    }

    // Xử lý khi window resize
    onResize() {
    }
}
