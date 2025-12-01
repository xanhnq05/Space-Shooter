// Quản lý background cho GameplayScene

import * as THREE from 'three';

export class BackgroundManager {
    constructor(scene, textureLoader, textureCache) {
        this.scene = scene;
        this.textureLoader = textureLoader;
        this.textureCache = textureCache;
        this.backgrounds = []; // Array chứa 2 background tiles để seamless scroll
        this.currentBackgroundIndex = 0;
    }

    // Tạo background với texture đầu tiên (2 tiles để seamless scrolling)
    create(texturePath) {
        // Xóa backgrounds cũ nếu có
        this.backgrounds.forEach(bg => {
            if (bg) this.scene.remove(bg);
        });
        this.backgrounds = [];
        
        const texture = this.getTexture(texturePath);
        // Giảm scale background để toàn cảnh hơn (từ 32x64 xuống 24x48)
        const geometry = new THREE.PlaneGeometry(24, 48);
        const material1 = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false
        });
        material1.color = new THREE.Color(0xffffff);
        
        const material2 = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false
        });
        material2.color = new THREE.Color(0xffffff);
        
        // Tạo 2 background tiles nối liền nhau
        const bg1 = new THREE.Mesh(geometry, material1);
        bg1.position.set(0, 0, -5); // Tile đầu tiên ở vị trí ban đầu
        bg1.renderOrder = -10;
        
        const bg2 = new THREE.Mesh(geometry, material2);
        bg2.position.set(0, 48, -5); // Tile thứ 2 ở phía trên (nối liền)
        bg2.renderOrder = -10;
        
        this.scene.add(bg1);
        this.scene.add(bg2);
        this.backgrounds = [bg1, bg2];
        this.scene.background = texture;
        this.currentBackgroundIndex = 0;
    }

    // Cập nhật background texture
    update(texturePath) {
        if (this.backgrounds.length === 0) return;
        
        const texture = this.getTexture(texturePath);
        // Cập nhật texture cho cả 2 tiles
        this.backgrounds.forEach(bg => {
            bg.material.map = texture;
            bg.material.needsUpdate = true;
        });
        this.scene.background = texture;
    }

    // Cập nhật scroll background mỗi frame để tạo cảm giác đang bay (seamless với 2 tiles)
    updateScroll(deltaTime, scrollSpeed = 0.02) {
        if (this.backgrounds.length !== 2) return;
        
        // Di chuyển cả 2 background tiles xuống dưới (tạo cảm giác đang bay lên)
        this.backgrounds.forEach(bg => {
            bg.position.y -= scrollSpeed * deltaTime;
        });
        
        // Seamless loop: Khi tile 1 đi xuống dưới, đưa nó lên trên tile 2
        // Khi tile 2 đi xuống dưới, đưa nó lên trên tile 1
        const bgHeight = 48;
        this.backgrounds.forEach(bg => {
            if (bg.position.y <= -bgHeight) {
                // Tìm tile kia và đặt tile này ở phía trên nó
                const otherTile = this.backgrounds.find(b => b !== bg);
                if (otherTile) {
                    bg.position.y = otherTile.position.y + bgHeight;
                }
            }
        });
    }
    
    // Reset background về vị trí ban đầu
    resetPosition() {
        if (this.backgrounds.length === 2) {
            this.backgrounds[0].position.y = 0;
            this.backgrounds[1].position.y = 48;
        }
    }

    // Lấy texture với caching
    getTexture(path) {
        if (!this.textureCache.has(path)) {
            const texture = this.textureLoader.load(path);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            this.textureCache.set(path, texture);
        }
        return this.textureCache.get(path);
    }

    // Thiết lập index background hiện tại
    setBackgroundIndex(index) {
        this.currentBackgroundIndex = index;
    }

    // Lấy index background hiện tại
    getBackgroundIndex() {
        return this.currentBackgroundIndex;
    }

    // Dọn dẹp
    cleanup() {
        this.backgrounds.forEach(bg => {
            if (bg) {
                this.scene.remove(bg);
            }
        });
        this.backgrounds = [];
    }
}
