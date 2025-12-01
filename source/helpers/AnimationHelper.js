// Helper functions cho animation effects

import * as THREE from 'three';

// Tạo hit effect khi đạn trúng enemy
export function createHitEffect(scene, position, textureLoader, textureCache) {
    const hitFrames = [
        'assets/Spaceship-2d-game-sprites/PNG/Ship_Effects/Fire_Shot_4_3.png',
        'assets/Spaceship-2d-game-sprites/PNG/Ship_Effects/Fire_Shot_4_4.png'
    ];
    
    const getTexture = (path) => {
        if (!textureCache.has(path)) {
            const texture = textureLoader.load(path);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            textureCache.set(path, texture);
        }
        return textureCache.get(path);
    };
    
    const textures = hitFrames.map(path => getTexture(path));
    const geometry = new THREE.PlaneGeometry(0.8, 0.8);
    const material = new THREE.MeshBasicMaterial({
        map: textures[0],
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    const effect = new THREE.Mesh(geometry, material);
    effect.position.copy(position);
    effect.renderOrder = 50;
    
    effect.userData = {
        currentFrame: 0,
        frameTextures: textures,
        animationSpeed: 50, // ms per frame - diễn ra nhanh
        lastFrameTime: performance.now(),
        totalFrames: 2
    };
    
    scene.add(effect);
    return effect;
}

/**
 * T?o explosion effect animation
 */
export function createExplosionEffect(scene, position, shipId, isPirate = false, textureLoader, textureCache) {
    // Ship ID t? 1-6, map v�o explosion frames
    // Xác định đường dẫn explosion dựa trên loại ship
    const explosionSpritesPath = isPirate
        ? 'assets/Pirate-spaceship-game-sprites/PNG/Ship_Sprites/Explosion'
        : 'assets/Enemy-spaceship-game-sprites/PNG/Ships_Sprites/Explosion';
    
    const explosionPaths = [];
    for (let i = 0; i <= 8; i++) {
        const frameNum = i.toString().padStart(3, '0');
        explosionPaths.push(`${explosionSpritesPath}/Ship_${shipId.toString().padStart(2, '0')}_Explosion_${frameNum}.png`);
    }
    
    const getTexture = (path) => {
        if (!textureCache.has(path)) {
            const texture = textureLoader.load(path);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            textureCache.set(path, texture);
        }
        return textureCache.get(path);
    };
    
    const textures = explosionPaths.map(path => getTexture(path));
    const standardScale = 1.8;
    const geometry = new THREE.PlaneGeometry(standardScale, standardScale * 1.3);
    const material = new THREE.MeshBasicMaterial({
        map: textures[0],
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    const explosion = new THREE.Mesh(geometry, material);
    explosion.position.copy(position);
    explosion.renderOrder = 50;
    
    explosion.userData = {
        currentFrame: 0,
        frameTextures: textures,
        animationSpeed: 40, // ms per frame - diễn ra nhanh
        lastFrameTime: performance.now(),
        totalFrames: 9
    };
    
    scene.add(explosion);
    return explosion;
}

// Tạo explosion effect cho player
export function createPlayerExplosionEffect(scene, position, textureLoader, textureCache) {
    const explosionPaths = [];
    for (let i = 0; i <= 8; i++) {
        const frameNum = i.toString().padStart(3, '0');
        explosionPaths.push(`assets/Spaceship-2d-game-sprites/PNG/Ship_01/Explosion/Explosion_1_${frameNum}.png`);
    }
    
    const getTexture = (path) => {
        if (!textureCache.has(path)) {
            const texture = textureLoader.load(path);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            textureCache.set(path, texture);
        }
        return textureCache.get(path);
    };
    
    const textures = explosionPaths.map(path => getTexture(path));
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({
        map: textures[0],
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    const explosion = new THREE.Mesh(geometry, material);
    explosion.position.copy(position);
    explosion.renderOrder = 50;
    
    explosion.userData = {
        currentFrame: 0,
        frameTextures: textures,
        animationSpeed: 50, // ms per frame
        lastFrameTime: performance.now(),
        totalFrames: 9
    };
    
    scene.add(explosion);
    return explosion;
}

// Tạo exhaust effect khi chuyển wave
export function createExhaustEffect(scene, position, textureLoader, textureCache) {
    const exhaustPaths = [];
    for (let i = 0; i <= 9; i++) {
        const frameNum = i.toString().padStart(3, '0');
        exhaustPaths.push(`assets/Spaceship-2d-game-sprites/PNG/Ship_01/Exhaust/Exhaust_1_1_${frameNum}.png`);
    }
    
    const getTexture = (path) => {
        if (!textureCache.has(path)) {
            const texture = textureLoader.load(path);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            textureCache.set(path, texture);
        }
        return textureCache.get(path);
    };
    
    const textures = exhaustPaths.map(path => getTexture(path));
    const geometry = new THREE.PlaneGeometry(1.2, 2.0);
    const material = new THREE.MeshBasicMaterial({
        map: textures[0],
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    const exhaust = new THREE.Mesh(geometry, material);
    exhaust.position.copy(position);
    exhaust.rotation.z = Math.PI;
    exhaust.renderOrder = 15;
    
    exhaust.userData = {
        currentFrame: 0,
        frameTextures: textures,
        animationSpeed: 60, // ms per frame
        lastFrameTime: performance.now(),
        totalFrames: 10,
        isComplete: false
    };
    
    scene.add(exhaust);
    return exhaust;
}

// Tạo explosion effect cho boss
export function createBossExplosionEffect(scene, position, bossId, textureLoader, textureCache) {
    const explosionPaths = [];
    for (let i = 1; i <= 8; i++) {
        const frameNum = i.toString().padStart(3, '0');
        explosionPaths.push(`assets/Boss-spaceship-game-sprites/PNG/Boss_${bossId.toString().padStart(2, '0')}/Effects_Sprites/Explosion_${frameNum}.png`);
    }
    
    const getTexture = (path) => {
        if (!textureCache.has(path)) {
            const texture = textureLoader.load(path);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            textureCache.set(path, texture);
        }
        return textureCache.get(path);
    };
    
    const textures = explosionPaths.map(path => getTexture(path));
    const geometry = new THREE.PlaneGeometry(9, 9);
    const material = new THREE.MeshBasicMaterial({
        map: textures[0],
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    const explosion = new THREE.Mesh(geometry, material);
    explosion.position.copy(position);
    explosion.renderOrder = 50;
    
    explosion.userData = {
        currentFrame: 0,
        frameTextures: textures,
        animationSpeed: 50, // ms per frame
        lastFrameTime: performance.now(),
        totalFrames: 8
    };
    
    scene.add(explosion);
    return explosion;
}

// Tạo hiệu ứng bắn của boss
export function createBossShootEffect(scene, position, bossId, textureLoader, textureCache) {
    const effectPath = `assets/Boss-spaceship-game-sprites/PNG/Boss_${bossId.toString().padStart(2, '0')}/Effects_Sprites/Shot_001.png`;
    
    const getTexture = (path) => {
        if (!textureCache.has(path)) {
            const texture = textureLoader.load(path);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            textureCache.set(path, texture);
        }
        return textureCache.get(path);
    };
    
    const texture = getTexture(effectPath);
    const geometry = new THREE.PlaneGeometry(1.2, 1.2);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    const effect = new THREE.Mesh(geometry, material);
    effect.position.copy(position);
    effect.renderOrder = 35;
    effect.position.z = 0;
    
    effect.userData = {
        animationSpeed: 200,
        lastFrameTime: performance.now(),
        duration: 300
    };
    
    scene.add(effect);
    return effect;
}

// Tạo boss bullet
export function createBossBullet(scene, position, angle, bossId, textureLoader, textureCache) {
    const bulletPath = `assets/Boss-spaceship-game-sprites/PNG/Boss_${bossId.toString().padStart(2, '0')}/Effects_Sprites/Shot_004.png`;
    
    const getTexture = (path) => {
        if (!textureCache.has(path)) {
            const texture = textureLoader.load(path);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            textureCache.set(path, texture);
        }
        return textureCache.get(path);
    };
    
    const texture = getTexture(bulletPath);
    const geometry = new THREE.PlaneGeometry(2.0, 4.0);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false
    });
    
    const bullet = new THREE.Mesh(geometry, material);
    bullet.position.copy(position);
    bullet.rotation.z = angle + Math.PI;
    bullet.renderOrder = 30;
    bullet.position.z = 0;
    bullet.userData = {
        angle: angle,
        speed: 0.008,
        width: geometry.parameters.width,
        height: geometry.parameters.height
    };
    
    scene.add(bullet);
    return bullet;
}
