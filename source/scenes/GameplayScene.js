// Gameplay scene - Infinite mode với wave/boss system

import { BaseScene } from './BaseScene.js';
import { GameState, GameConfig } from '../utils/Constants.js';
import { GameplayUIManager } from '../ui/GameplayUIManager.js';
import { BackgroundManager } from '../managers/BackgroundManager.js';
import { createHitEffect, createExplosionEffect, createPlayerExplosionEffect, createExhaustEffect, createBossExplosionEffect, createBossBullet, createBossShootEffect } from '../helpers/AnimationHelper.js';
import * as THREE from 'three';

const BACKGROUND_TEXTURES = [
    'assets/Space-vertical-game-backgrounds/PNG/Space_BG_01/Space_BG_01.png',
    'assets/Space-vertical-game-backgrounds/PNG/Space_BG_02/Space_BG_02.png',
    'assets/Space-vertical-game-backgrounds/PNG/Space_BG_03/Space_BG_03.png',
    'assets/Space-vertical-game-backgrounds/PNG/Space_BG_04/Space_BG_04.png'
];

const ENEMY_WAVE_DEFINITIONS = [
    { id: 1, asset: 'assets/Enemy-spaceship-game-sprites/PNG/Ships/Ship_01.png', name: 'Kẻ Do Thám', baseHealth: 3, speed: 0.018, spawnInterval: 650, scale: 1.5 },
    { id: 2, asset: 'assets/Enemy-spaceship-game-sprites/PNG/Ships/Ship_02.png', name: 'Hộ Tống', baseHealth: 4, speed: 0.019, spawnInterval: 620, scale: 1.5 },
    { id: 3, asset: 'assets/Enemy-spaceship-game-sprites/PNG/Ships/Ship_03.png', name: 'Tiêm Kích', baseHealth: 5, speed: 0.02, spawnInterval: 600, scale: 1.5 },
    { id: 4, asset: 'assets/Enemy-spaceship-game-sprites/PNG/Ships/Ship_04.png', name: 'Pháo Hạm', baseHealth: 6, speed: 0.021, spawnInterval: 580, scale: 1.5 },
    { id: 5, asset: 'assets/Enemy-spaceship-game-sprites/PNG/Ships/Ship_05.png', name: 'Khu Trục', baseHealth: 7, speed: 0.022, spawnInterval: 560, scale: 1.5 },
    { id: 6, asset: 'assets/Enemy-spaceship-game-sprites/PNG/Ships/Ship_06.png', name: 'Chiến Hạm', baseHealth: 8, speed: 0.023, spawnInterval: 540, scale: 1.5 },
    { id: 7, asset: 'assets/Pirate-spaceship-game-sprites/PNG/Ships/Ship_01.png', name: 'Hải Tặc 01', baseHealth: 9, speed: 0.024, spawnInterval: 520, scale: 1.5 },
    { id: 8, asset: 'assets/Pirate-spaceship-game-sprites/PNG/Ships/Ship_02.png', name: 'Hải Tặc 02', baseHealth: 10, speed: 0.025, spawnInterval: 500, scale: 1.5 },
    { id: 9, asset: 'assets/Pirate-spaceship-game-sprites/PNG/Ships/Ship_03.png', name: 'Hải Tặc 03', baseHealth: 11, speed: 0.026, spawnInterval: 480, scale: 1.5 },
    { id:10, asset: 'assets/Pirate-spaceship-game-sprites/PNG/Ships/Ship_04.png', name: 'Hải Tặc 04', baseHealth: 12, speed: 0.027, spawnInterval: 460, scale: 1.5 },
    { id:11, asset: 'assets/Pirate-spaceship-game-sprites/PNG/Ships/Ship_05.png', name: 'Hải Tặc 05', baseHealth: 13, speed: 0.028, spawnInterval: 440, scale: 1.5 },
    { id:12, asset: 'assets/Pirate-spaceship-game-sprites/PNG/Ships/Ship_06.png', name: 'Hải Tặc 06', baseHealth: 14, speed: 0.03,  spawnInterval: 420, scale: 1.5 }
];

const ENEMIES_PER_WAVE = 9;
const BOSS_TRIGGER_INTERVAL = GameConfig.BOSS.SPAWN_AT_LEVEL;

const BOSS_CONFIGS = [
    { name: 'Chiến Thần 01', asset: 'assets/Boss-spaceship-game-sprites/PNG/Boss_01/Boss_Full.png', icon: 'assets/Boss-spaceship-game-sprites/PNG/Boss_Icons/Icon_01.png', baseHealth: 180, speed: 0.012, size: { w: 6, h: 6.5 } },
    { name: 'Chiến Thần 02', asset: 'assets/Boss-spaceship-game-sprites/PNG/Boss_02/Boss_Full.png', icon: 'assets/Boss-spaceship-game-sprites/PNG/Boss_Icons/Icon_02.png', baseHealth: 240, speed: 0.011, size: { w: 6.5, h: 7 } },
    { name: 'Chiến Thần 03', asset: 'assets/Boss-spaceship-game-sprites/PNG/Boss_03/Boss_Full.png', icon: 'assets/Boss-spaceship-game-sprites/PNG/Boss_Icons/Icon_03.png', baseHealth: 300, speed: 0.01, size: { w: 7, h: 7.5 } }
];

const PLAYER_MESH_NAME = 'playerShip';
const PLAYER_SIZE = { width: 1.2, height: 1.6 };
const PLAYER_BULLET_SIZE = { width: 0.5, height: 1.0 };
const BOSS_BULLET_SIZE = { width: 2.0, height: 4.0 };
const DEFAULT_ENEMY_SCALE = 1.5;
const BOSS_HITBOX_MULTIPLIER = 1.0;
const PLAYER_BOSS_COLLISION_MULTIPLIER = 1.0;
const PLAYER_BOSS_BULLET_COLLISION_MULTIPLIER = 0.02;
const SFX_PATHS = {
    SHOOT: 'sfx/tieng_sung_ban.mp3',
    ENEMY_EXPLOSION: 'sfx/tieng_no.mp3',
    BOSS_EXPLOSION: 'sfx/tieng_no_lon.mp3'
};

const PLAYER_BOUNDS = {
    X: 6.5,
    Y: 10.5
};
export class GameplayScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.hitEffects = [];
        this.explosions = [];
        this.playerExplosion = null;
        this.isPlayerDying = false;
        this.exhaustEffect = null;
        this.isTransitioning = false;
        this.transitionSpeed = 0;
        this.currentBoss = null;
        this.currentWaveDefinition = null;
        
        this.score = 0;
        this.enemiesKilled = 0;
        this.gameTime = 0;
        this.isPaused = false;
        this.waveInProgress = false;
        this.bossActive = false;
        this.currentWaveNumber = 1;
        this.totalWavesCompleted = 0;
        this.enemyLoopCount = 0;
        this.bossIndex = 0;
        this.bossSpawnCount = 0;
        this.playerBulletDamage = GameConfig.PLAYER.BULLET_DAMAGE;
        this.bossBullets = [];
        this.bossShootEffects = [];
        this.lastBossShootTime = 0;
        this.bossShootCooldown = 2000;
        this.waveDisplayNumber = 1;
        this.currentBackgroundIndex = 0;
        this.bossFloatTimer = 0;
        this.isWavePreparing = false;
        this.pointerLockChangeHandler = this.handlePointerLockChange.bind(this);
        this.autoShootActive = false;
        this.autoShootInterval = null;
        this.lastEnemyAttackTime = 0;
        this.enemyAttackCooldown = 3000;
        this.playerBulletDamage = GameConfig.PLAYER.BULLET_DAMAGE;
        this.bossBullets = [];
        this.bossShootEffects = [];
        this.lastBossShootTime = 0;
        this.bossShootCooldown = 2000;
        
        this.mousePosition = new THREE.Vector2(0, 0);
        this.targetPosition = new THREE.Vector2(0, -8);
        this.isMouseDown = false;
        this.lastShootTime = 0;
        
        this.uiManager = new GameplayUIManager();
        this.backgroundManager = null;
        
        this.textureLoader = new THREE.TextureLoader();
        this.textureCache = new Map();
        this.sfx = {};
    }

    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        this.cleanupObjects();
        
        this.resetState();
        this.uiManager.init();
        this.uiManager.setupPauseMenu({
            onResume: () => this.resume(),
            onRestart: () => this.restart(),
            onQuit: () => this.quitToMenu()
        });
        this.backgroundManager = new BackgroundManager(this.scene, this.textureLoader, this.textureCache);
        this.backgroundManager.create(BACKGROUND_TEXTURES[0]);
        this.createPlayer();
        this.setupAudio();
        this.setupInputHandlers();
        this.uiManager.showHUD();
        this.startWave();
    }
    
    setupInputHandlers() {
        const canvas = document.getElementById('game-canvas');
        
        this.boundMouseMove = (e) => {
            if (this.isPaused) return;
            if (this.isMouseLocked && document.pointerLockElement) {
                const sensitivity = GameConfig.PLAYER.MOVEMENT_SENSITIVITY;
                this.targetPosition.x += e.movementX * sensitivity;
                this.targetPosition.y -= e.movementY * sensitivity;
                this.clampToPlayArea(this.targetPosition);
            } else {
                const rect = canvas.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                this.mousePosition.set(x * 9, y * 9);
                this.clampToPlayArea(this.mousePosition);
                if (this.isMouseDown && this.isMouseLocked) {
                    this.targetPosition.copy(this.mousePosition);
                    this.clampToPlayArea(this.targetPosition);
                }
            }
        };
        
        this.boundMouseDown = (e) => {
            if (e.button !== 0 || this.isPaused) return;
            if (!this.isMouseLocked) {
                this.lockMouse();
                this.isMouseDown = true;
            } else {
                this.isMouseDown = true;
            }
        };
        
        this.boundMouseUp = (e) => {
            if (e.button === 0) {
                this.isMouseDown = false;
            }
        };
        
        this.boundKeyDown = (e) => {
            if (this.isPaused) {
                if (e.key === 'Escape') {
                    this.resume();
                }
                return;
            }
            if (e.key === 'Escape') {
                this.pause();
            }
        };
        
        this.boundClick = () => {
            if (!this.isMouseLocked && !this.isPaused) {
                this.lockMouse();
                this.targetPosition.copy(this.mousePosition);
                this.clampToPlayArea(this.targetPosition);
            }
        };
        
        canvas.addEventListener('mousemove', this.boundMouseMove);
        canvas.addEventListener('mousedown', this.boundMouseDown);
        canvas.addEventListener('mouseup', this.boundMouseUp);
        canvas.addEventListener('click', this.boundClick);
        window.addEventListener('keydown', this.boundKeyDown);
        document.addEventListener('pointerlockchange', this.pointerLockChangeHandler);
    }

    lockMouse() {
        const canvas = document.getElementById('game-canvas');
        if (canvas.requestPointerLock) {
            canvas.requestPointerLock();
        }
        this.isMouseLocked = true;
        this.targetPosition.copy(this.mousePosition);
    }

    unlockMouse() {
        if (document.exitPointerLock) {
            document.exitPointerLock();
        }
        this.isMouseLocked = false;
    }

    handlePointerLockChange() {
        const canvas = document.getElementById('game-canvas');
        const isLocked = document.pointerLockElement === canvas;
        this.isMouseLocked = isLocked;
        if (!isLocked && this.isInitialized && !this.isPaused) {
            this.pause({ skipUnlock: true });
        }
    }
    
    cleanupObjects() {
        this.removeDuplicatePlayerMeshes();
        if (this.player) {
            this.scene.remove(this.player);
            this.player = null;
        }
        this.enemies.forEach(enemy => {
            if (enemy && enemy.parent) {
                this.scene.remove(enemy);
            }
        });
        this.enemies = [];
        this.bullets.forEach(bullet => {
            if (bullet && bullet.parent) {
                this.scene.remove(bullet);
            }
        });
        this.bullets = [];
        
        // Xóa tất cả boss bullets
        this.bossBullets.forEach(bullet => {
            if (bullet && bullet.parent) {
                this.scene.remove(bullet);
            }
        });
        this.bossBullets = [];
        
        // Xóa tất cả boss shoot effects
        this.bossShootEffects.forEach(effect => {
            if (effect && effect.parent) {
                this.scene.remove(effect);
            }
        });
        this.bossShootEffects = [];
        
        // Xóa tất cả hit effects
        this.hitEffects.forEach(effect => {
            if (effect && effect.parent) {
                this.scene.remove(effect);
            }
        });
        this.hitEffects = [];
        
        // Xóa tất cả explosions
        this.explosions.forEach(explosion => {
            if (explosion && explosion.parent) {
                this.scene.remove(explosion);
            }
        });
        this.explosions = [];
        
        // Xóa player explosion
        if (this.playerExplosion) {
            this.scene.remove(this.playerExplosion);
            this.playerExplosion = null;
        }
        
        // Xóa boss
        if (this.currentBoss) {
            this.scene.remove(this.currentBoss);
            this.currentBoss = null;
        }
    }

    resetState() {
        this.clearWaveTimers();
        this.removeDuplicatePlayerMeshes();
        this.score = 0;
        this.enemiesKilled = 0;
        this.gameTime = 0;
        this.isPaused = false;
        this.isMouseLocked = false;
        this.waveInProgress = false;
        this.bossActive = false;
        this.currentWaveNumber = 1;
        this.totalWavesCompleted = 0;
        this.enemyLoopCount = 0;
        this.bossIndex = 0;
        this.bossSpawnCount = 0;
        this.playerBulletDamage = GameConfig.PLAYER.BULLET_DAMAGE;
        this.bossBullets = [];
        this.bossShootEffects = [];
        this.lastBossShootTime = 0;
        this.bossShootCooldown = 2000;
        this.waveDisplayNumber = 1;
        this.currentBackgroundIndex = 0;
        this.bossFloatTimer = 0;
        this.currentWaveDefinition = ENEMY_WAVE_DEFINITIONS[0];
        this.isWavePreparing = false;
        
        // Reset player death state
        this.isPlayerDying = false;
        this.playerExplosion = null;
        this.exhaustEffect = null;
        this.isTransitioning = false;
        this.transitionSpeed = 0;
        
        this.enemies = [];
        this.bullets = [];
        this.hitEffects = [];
        this.explosions = [];
        this.currentBoss = null;
        this.targetPosition.set(0, -8);
        this.mousePosition.set(0, 0);
        this.stopAutoShoot();
        this.autoShootActive = false;
        this.lastEnemyAttackTime = 0;
    }

    updateBackgroundForWave() {
        if (!this.backgroundManager) return;
        const bgIndex = (this.bossSpawnCount - 1) % BACKGROUND_TEXTURES.length;
        if (bgIndex !== this.currentBackgroundIndex) {
            this.currentBackgroundIndex = bgIndex;
            this.backgroundManager.setBackgroundIndex(bgIndex);
            this.backgroundManager.update(BACKGROUND_TEXTURES[bgIndex]);
        }
    }

    clearWaveTimers() {
        this.uiManager.clearWaveBannerTimeout();
        this.isWavePreparing = false;
        this.uiManager.hideWaveBanner();
    }

    clampToPlayArea(vector2) {
        vector2.x = Math.max(-PLAYER_BOUNDS.X, Math.min(PLAYER_BOUNDS.X, vector2.x));
        vector2.y = Math.max(-PLAYER_BOUNDS.Y, Math.min(PLAYER_BOUNDS.Y, vector2.y));
        return vector2;
    }

    createPlayer() {
        this.removeDuplicatePlayerMeshes();
        if (this.player) {
            if (this.player.parent === this.scene) {
                this.scene.remove(this.player);
            }
            this.player = null;
        }
        const texture = this.getTexture('assets/Spaceship-2d-game-sprites/PNG/Ship_01/Ship_LVL_1.png');
        const geometry = new THREE.PlaneGeometry(PLAYER_SIZE.width, PLAYER_SIZE.height);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            depthTest: false
        });
        this.player = new THREE.Mesh(geometry, material);
        this.player.name = PLAYER_MESH_NAME;
        this.player.userData = this.player.userData || {};
        this.player.userData.isPlayer = true;
        this.player.position.set(0, -8, 1);
        this.player.rotation.z = Math.PI;
        this.player.renderOrder = 20;
        this.player.visible = true;
        if (this.player.parent !== this.scene) {
            this.scene.add(this.player);
        }
    }
    
    removeDuplicatePlayerMeshes() {
        if (!this.scene) return;
        const duplicates = [];
        this.scene.traverse(obj => {
            const isNamedPlayer = obj.name === PLAYER_MESH_NAME;
            const isTaggedPlayer = obj.userData?.isPlayer;
            const isLegacyPlayer = obj.geometry?.parameters &&
                Math.abs(obj.geometry.parameters.width - PLAYER_SIZE.width) < 0.001 &&
                Math.abs(obj.geometry.parameters.height - PLAYER_SIZE.height) < 0.001;
            if ((isNamedPlayer || isTaggedPlayer || isLegacyPlayer) && obj !== this.player) {
                duplicates.push(obj);
            }
        });
        duplicates.forEach(mesh => {
            if (mesh.parent) {
                mesh.parent.remove(mesh);
            }
        });
    }

    // Thiết lập xử lý input

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

    startWave() {
        if (this.currentWaveNumber > ENEMY_WAVE_DEFINITIONS.length) {
            this.currentWaveNumber = 1;
            this.enemyLoopCount++;
        }
        this.currentWaveDefinition = ENEMY_WAVE_DEFINITIONS[this.currentWaveNumber - 1];
        this.waveDisplayNumber = this.totalWavesCompleted + 1;
        this.waveInProgress = false;
        this.isWavePreparing = true;
        // Không update background ở đây - map chỉ thay đổi sau khi kill boss
        // this.updateBackgroundForWave(); // Comment out để không tự động chuyển map
        this.updateHUD();
        this.scheduleWaveIntro();
    }

    // Lên lịch hiển thị wave banner
    scheduleWaveIntro() {
        this.clearWaveTimers();
        this.isWavePreparing = true;
        this.uiManager.showWaveBanner(`Wave ${this.waveDisplayNumber}`, 2000, () => {
            this.spawnWaveEnemies();
            this.waveInProgress = true;
            this.isWavePreparing = false;
            this.updateHUD();
            // Bắt đầu bắn tự động sau khi wave banner kết thúc
            this.startAutoShoot();
        });
    }

    spawnWaveEnemies() {
        if (!this.currentWaveDefinition) return;
        const def = this.currentWaveDefinition;
        const texture = this.getTexture(def.asset);
        const enemyHealthMultiplier = Math.pow(1 + GameConfig.ENEMY.HEALTH_INCREASE_RATE, this.totalWavesCompleted);
        const baseEnemyHealth = Math.floor(GameConfig.ENEMY.BASE_HEALTH * enemyHealthMultiplier);
        const textureImage = texture.image;
        let textureWidth = 100;
        let textureHeight = 100;
        if (textureImage && textureImage.width && textureImage.height) {
            textureWidth = textureImage.width;
            textureHeight = textureImage.height;
        } else if (texture.source && texture.source.data && texture.source.data.width && texture.source.data.height) {
            textureWidth = texture.source.data.width;
            textureHeight = texture.source.data.height;
        } else {
            textureWidth = 120;
            textureHeight = 156;
        }
        const baseScale = def.scale ?? DEFAULT_ENEMY_SCALE;
        const aspectRatio = textureHeight && textureWidth ? (textureHeight / textureWidth) : 1.3;
        const worldWidth = baseScale;
        const worldHeight = baseScale * aspectRatio;
        for (let i = 0; i < ENEMIES_PER_WAVE; i++) {
            const geometry = new THREE.PlaneGeometry(worldWidth, worldHeight);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: false
            });
            const enemy = new THREE.Mesh(geometry, material);
            let baseX, spawnY, targetY;
            if (i < 5) {
                const spacing = 3;
                baseX = -6 + i * spacing;
                spawnY = 12;
                targetY = 7;
            } else {
                const topIndex = i - 5;
                const spacing = 3;
                baseX = -6 + spacing / 2 + topIndex * spacing;
                spawnY = 14;
                targetY = 9;
            }
            const jitterX = (Math.random() - 0.5) * 0.4;
            enemy.position.set(baseX + jitterX, spawnY, 0);
            const baseHealth = baseEnemyHealth;
            let shipIdMatch = def.asset.match(/Enemy-spaceship.*?Ship_(\d+)/);
            let isPirate = false;
            let shipId = 1;
            if (shipIdMatch) {
                shipId = parseInt(shipIdMatch[1]);
                isPirate = false;
            } else {
                shipIdMatch = def.asset.match(/Pirate-spaceship.*?Ship_(\d+)/);
                if (shipIdMatch) {
                    shipId = parseInt(shipIdMatch[1]);
                    isPirate = true;
                }
            }
            const baseAssetPath = isPirate 
                ? 'assets/Pirate-spaceship-game-sprites/PNG/Ships'
                : 'assets/Enemy-spaceship-game-sprites/PNG/Ships';
            const damagedTexturePath = `${baseAssetPath}/Damaged_Ship_${shipId.toString().padStart(2, '0')}.png`;
            const explosionSpritesPath = isPirate
                ? 'assets/Pirate-spaceship-game-sprites/PNG/Ship_Sprites/Explosion'
                : 'assets/Enemy-spaceship-game-sprites/PNG/Ships_Sprites/Explosion';
            const explosionTexturePath = `${explosionSpritesPath}/Ship_${shipId.toString().padStart(2, '0')}_Explosion_000.png`;
            const damagedTexture = this.getTexture(damagedTexturePath);
            const explosionTexture = this.getTexture(explosionTexturePath);
            const damagedTextureImage = damagedTexture.image;
            let damagedWidth = worldWidth;
            let damagedHeight = worldHeight;
            if (damagedTextureImage) {
                const damagedAspectRatio = (damagedTextureImage.height || 100) / (damagedTextureImage.width || 100);
                damagedHeight = damagedWidth * damagedAspectRatio;
            }
            enemy.userData = {
                health: baseHealth,
                maxHealth: baseHealth,
                speed: def.speed,
                baseX: enemy.position.x,
                baseY: enemy.position.y,
                targetY: targetY,
                hasReachedTarget: false,
                idleOffset: Math.random() * Math.PI * 2,
                shipId: shipId,
                isPirate: isPirate,
                isDamaged: false,
                width: worldWidth,
                height: worldHeight,
                damagedWidth: damagedWidth,
                damagedHeight: damagedHeight,
                damagedTexture: damagedTexture,
                explosionTexture: explosionTexture,
                normalTexture: texture,
                assetPath: def.asset,
                attackState: 'idle',
                attackTargetPosition: null,
                originalPosition: null
            };
            enemy.userData.originalPosition = new THREE.Vector2(enemy.position.x, enemy.position.y);
            this.scene.add(enemy);
            this.enemies.push(enemy);
        }
    }

    spawnBoss() {
        this.clearWaveTimers();
        this.uiManager.hideWaveBanner();
        this.bossActive = true;
        this.waveInProgress = false;
        const bossConfig = BOSS_CONFIGS[this.bossIndex];
        this.bossIndex = (this.bossIndex + 1) % BOSS_CONFIGS.length;
        this.bossSpawnCount++;
        const bossHealthMultiplier = Math.pow(1 + GameConfig.BOSS.HEALTH_INCREASE_RATE, this.bossSpawnCount - 1);
        const maxHealth = Math.floor(GameConfig.BOSS.BASE_HEALTH * bossHealthMultiplier);
        const texture = this.getTexture(bossConfig.asset);
        const geometry = new THREE.PlaneGeometry(bossConfig.size.w, bossConfig.size.h);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        this.currentBoss = new THREE.Mesh(geometry, material);
        this.currentBoss.position.set(0, 13, 0);
        this.currentBoss.userData = {
            health: maxHealth,
            maxHealth,
            speed: bossConfig.speed
        };
        this.scene.add(this.currentBoss);
        this.bossFloatTimer = 0;
        this.uiManager.showBossStatus(bossConfig);
        this.uiManager.updateBossHealth(maxHealth, maxHealth);
        this.updateHUD();
        if (!this.autoShootActive) {
            this.startAutoShoot();
        }
    }

    update(deltaTime) {
        if (this.isPaused) return;
        this.removeDuplicatePlayerMeshes();
        this.gameTime += deltaTime;
        if (!this.waveInProgress && !this.bossActive && !this.isWavePreparing && !this.isTransitioning) {
            this.startWave();
        }
        if (this.backgroundManager) {
            const scrollSpeed = this.isTransitioning 
                ? GameConfig.BACKGROUND.SCROLL_SPEED * GameConfig.BACKGROUND.TRANSITION_SCROLL_MULTIPLIER
                : GameConfig.BACKGROUND.SCROLL_SPEED;
            this.backgroundManager.updateScroll(deltaTime, scrollSpeed);
        }
        if (this.isTransitioning && this.player) {
            this.player.position.y += this.transitionSpeed * deltaTime;
            if (this.player.position.y > 15) {
                this.player.position.y = 15;
            }
            if (this.exhaustEffect) {
                this.exhaustEffect.position.x = this.player.position.x;
                this.exhaustEffect.position.y = this.player.position.y - 1.5;
            }
        }
        if (!this.isPlayerDying && !this.isTransitioning) {
            this.updatePlayerPosition();
            this.moveEnemies(deltaTime);
            this.moveBoss(deltaTime);
            this.checkCollisions();
            this.updateProjectiles(deltaTime);
            this.checkCollisions();
            this.checkWaveCompletion();
        } else {
            this.updateProjectiles(deltaTime);
        }
        this.updateHUD();
    }

    updatePlayerPosition() {
        if (!this.player || !this.isMouseLocked || !document.pointerLockElement) {
            return;
        }
        const lerpSpeed = GameConfig.PLAYER.MOVEMENT_LERP_SPEED;
        this.player.position.x += (this.targetPosition.x - this.player.position.x) * lerpSpeed;
        this.player.position.y += (this.targetPosition.y - this.player.position.y) * lerpSpeed;
        this.clampToPlayArea(this.player.position);
    }

    // Di chuyển enemies
    moveEnemies(deltaTime) {
        const wiggleSpeed = 0.0015;
        const moveDownSpeed = GameConfig.ENEMY.MOVE_DOWN_SPEED; // Tốc độ bay xuống
        const currentTime = performance.now();
        
        // Kiểm tra và trigger enemy attack
        if (this.waveInProgress && this.player && currentTime - this.lastEnemyAttackTime > this.enemyAttackCooldown) {
            const idleEnemies = this.enemies.filter(e => 
                e.userData.hasReachedTarget && 
                e.userData.attackState === 'idle'
            );
            
            if (idleEnemies.length > 0) {
                // Chọn 1-2 enemies ngẫu nhiên để tấn công
                const numAttackers = Math.min(Math.floor(Math.random() * 2) + 1, idleEnemies.length);
                const attackers = [];
                const shuffled = [...idleEnemies].sort(() => Math.random() - 0.5);
                for (let i = 0; i < numAttackers; i++) {
                    attackers.push(shuffled[i]);
                }
                
                // Bắt đầu tấn công
                attackers.forEach(enemy => {
                    enemy.userData.attackState = 'attacking';
                    // Lưu vị trí player tại thời điểm bắt đầu tấn công (không cập nhật theo thời gian)
                    enemy.userData.attackTargetPosition = new THREE.Vector2(
                        this.player.position.x,
                        this.player.position.y
                    );
                });
                
                this.lastEnemyAttackTime = currentTime;
            }
        }
        
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            if (!enemy.userData) continue;
            
            // Nếu chưa đến vị trí mục tiêu, bay xuống
            if (!enemy.userData.hasReachedTarget && enemy.userData.targetY !== undefined) {
                const distanceToTarget = enemy.position.y - enemy.userData.targetY;
                if (distanceToTarget > 0.1) {
                    enemy.position.y -= moveDownSpeed * deltaTime;
                    enemy.userData.baseY = enemy.position.y;
                    if (enemy.position.y <= enemy.userData.targetY) {
                        enemy.position.y = enemy.userData.targetY;
                        enemy.userData.baseY = enemy.userData.targetY;
                        enemy.userData.hasReachedTarget = true;
                        // Cập nhật originalPosition khi đến target
                        enemy.userData.originalPosition = new THREE.Vector2(enemy.position.x, enemy.position.y);
                    }
                } else {
                    enemy.userData.hasReachedTarget = true;
                    enemy.userData.originalPosition = new THREE.Vector2(enemy.position.x, enemy.position.y);
                }
            }
            
            // Xử lý AI tấn công
            if (enemy.userData.hasReachedTarget && enemy.userData.attackState === 'attacking') {
                const attackSpeed = GameConfig.ENEMY.ATTACK_SPEED; // Tốc độ tấn công của enemy
                const targetPos = enemy.userData.attackTargetPosition;
                const direction = new THREE.Vector2(
                    targetPos.x - enemy.position.x,
                    targetPos.y - enemy.position.y
                );
                const distance = direction.length();
                
                if (distance > 0.1) {
                    // Di chuyển đến vị trí player
                    direction.normalize();
                    enemy.position.x += direction.x * attackSpeed * deltaTime;
                    enemy.position.y += direction.y * attackSpeed * deltaTime;
                } else {
                    // Đã đến vị trí player, bắt đầu quay lại
                    enemy.userData.attackState = 'returning';
                }
            } else if (enemy.userData.attackState === 'returning') {
                const returnSpeed = GameConfig.ENEMY.RETURN_SPEED; // Tốc độ quay lại - điều chỉnh trong Constants.js
                const originalPos = enemy.userData.originalPosition;
                const direction = new THREE.Vector2(
                    originalPos.x - enemy.position.x,
                    originalPos.y - enemy.position.y
                );
                const distance = direction.length();
                
                if (distance > 0.1) {
                    // Di chuyển về vị trí ban đầu
                    direction.normalize();
                    enemy.position.x += direction.x * returnSpeed * deltaTime;
                    enemy.position.y += direction.y * returnSpeed * deltaTime;
                } else {
                    // Đã về vị trí ban đầu
                    enemy.position.x = originalPos.x;
                    enemy.position.y = originalPos.y;
                    enemy.userData.attackState = 'idle';
                    enemy.userData.baseX = originalPos.x;
                    enemy.userData.baseY = originalPos.y;
                }
            } else {
                // Di chuyển lắc lư ngang khi ở trạng thái idle
                enemy.userData.idleOffset += wiggleSpeed * deltaTime;
                const wiggleX = Math.sin(enemy.userData.idleOffset * 0.5) * 0.3;
                const wiggleY = Math.sin(enemy.userData.idleOffset) * 0.3;
                enemy.position.x = enemy.userData.baseX + wiggleX;
                enemy.position.y = enemy.userData.baseY + wiggleY;
            }
        }
    }

    moveBoss(deltaTime) {
        if (!this.currentBoss) return;
        const targetY = 6;
        if (this.currentBoss.position.y > targetY) {
            this.currentBoss.position.y -= this.currentBoss.userData.speed * deltaTime;
            if (this.currentBoss.position.y < targetY) {
                this.currentBoss.position.y = targetY;
            }
        } else {
            this.bossFloatTimer += deltaTime * 0.0015;
            const horizontalAmplitude = 4;
            this.currentBoss.position.x = Math.sin(this.bossFloatTimer) * horizontalAmplitude;
            const currentTime = performance.now();
            if (currentTime - this.lastBossShootTime > this.bossShootCooldown) {
                this.bossShoot();
                this.lastBossShootTime = currentTime;
                this.bossShootCooldown = 1000 + Math.random() * 1500;
            }
        }
    }
    
    bossShoot() {
        if (!this.currentBoss || !this.player) return;
        const bossIndex = (this.bossIndex - 1 + BOSS_CONFIGS.length) % BOSS_CONFIGS.length;
        const bossConfig = BOSS_CONFIGS[bossIndex];
        const bossPosition = this.currentBoss.position.clone();
        const bulletSpawnY = bossPosition.y - bossConfig.size.h / 2;
        const bulletSpawnX = bossPosition.x;
        const bulletSpawnPosition = new THREE.Vector3(bulletSpawnX, bulletSpawnY, 0);
        const shootEffect = createBossShootEffect(
            this.scene,
            bulletSpawnPosition.clone(),
            bossIndex + 1, // Boss 1, 2, hoặc 3
            this.textureLoader,
            this.textureCache
        );
        this.bossShootEffects.push(shootEffect); // Lưu để tự động xóa sau khi animation kết thúc
        
        // Số lượng đạn: 5-10 viên (random)
        const bulletCount = 5 + Math.floor(Math.random() * 6);
        const playerPos = this.player.position;
        const directionToPlayer = Math.atan2(playerPos.y - bulletSpawnPosition.y, playerPos.x - bulletSpawnPosition.x);
        const arcAngle = Math.PI / 2;
        const startAngle = directionToPlayer - arcAngle / 2;
        const angleStep = arcAngle / (bulletCount - 1);
        for (let i = 0; i < bulletCount; i++) {
            const angle = startAngle + angleStep * i;
            const bullet = createBossBullet(
                this.scene,
                bulletSpawnPosition.clone(),
                angle,
                bossIndex + 1,
                this.textureLoader,
                this.textureCache
            );
            this.bossBullets.push(bullet);
        }
    }

    updateProjectiles(deltaTime) {
        const currentTime = performance.now();
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            if (bullet.userData.isHit) continue;
            const angle = bullet.userData.angle || 0;
            const speed = GameConfig.PLAYER.BULLET_SPEED * deltaTime;
            bullet.position.y += Math.cos(angle) * speed;
            bullet.position.x += Math.sin(angle) * speed;
            bullet.position.z = 0;
            if (bullet.position.y > 12) {
                this.scene.remove(bullet);
                this.bullets.splice(i, 1);
            }
        }
        for (let i = this.bossShootEffects.length - 1; i >= 0; i--) {
            const effect = this.bossShootEffects[i];
            const now = performance.now();
            if (now - effect.userData.lastFrameTime > effect.userData.duration) {
                this.scene.remove(effect);
                this.bossShootEffects.splice(i, 1);
            }
        }
        for (let i = this.bossBullets.length - 1; i >= 0; i--) {
            const bullet = this.bossBullets[i];
            const angle = bullet.userData.angle;
            const speed = bullet.userData.speed * deltaTime;
            bullet.position.x += Math.cos(angle) * speed;
            bullet.position.y += Math.sin(angle) * speed;
            bullet.position.z = 0;
            if (bullet.position.y < -15 || bullet.position.y > 15 || 
                bullet.position.x < -15 || bullet.position.x > 15) {
                this.scene.remove(bullet);
                this.bossBullets.splice(i, 1);
            }
        }
        for (let i = this.hitEffects.length - 1; i >= 0; i--) {
            const effect = this.hitEffects[i];
            if (currentTime - effect.userData.lastFrameTime > effect.userData.animationSpeed) {
                effect.userData.currentFrame++;
                if (effect.userData.currentFrame >= effect.userData.totalFrames) {
                    this.scene.remove(effect);
                    this.hitEffects.splice(i, 1);
                    continue;
                }
                effect.material.map = effect.userData.frameTextures[effect.userData.currentFrame];
                effect.material.needsUpdate = true;
                effect.userData.lastFrameTime = currentTime;
            }
        }
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const explosion = this.explosions[i];
            if (currentTime - explosion.userData.lastFrameTime > explosion.userData.animationSpeed) {
                explosion.userData.currentFrame++;
                if (explosion.userData.currentFrame >= explosion.userData.totalFrames) {
                    this.scene.remove(explosion);
                    this.explosions.splice(i, 1);
                    continue;
                }
                explosion.material.map = explosion.userData.frameTextures[explosion.userData.currentFrame];
                explosion.material.needsUpdate = true;
                explosion.userData.lastFrameTime = currentTime;
            }
        }
        
        // Cập nhật player explosion animation
        if (this.playerExplosion) {
            const explosion = this.playerExplosion;
            if (currentTime - explosion.userData.lastFrameTime > explosion.userData.animationSpeed) {
                explosion.userData.currentFrame++;
                if (explosion.userData.currentFrame >= explosion.userData.totalFrames) {
                    // Không remove player explosion ngay, để nó hiển thị cho đến khi game over
                    explosion.userData.currentFrame = explosion.userData.totalFrames - 1; // Giữ frame cuối
                } else {
                    explosion.material.map = explosion.userData.frameTextures[explosion.userData.currentFrame];
                    explosion.material.needsUpdate = true;
                    explosion.userData.lastFrameTime = currentTime;
                }
            }
        }
        
        // Cập nhật exhaust effect animation khi transition
        if (this.exhaustEffect && this.isTransitioning) {
            const exhaust = this.exhaustEffect;
            if (currentTime - exhaust.userData.lastFrameTime > exhaust.userData.animationSpeed) {
                exhaust.userData.currentFrame++;
                if (exhaust.userData.currentFrame >= exhaust.userData.totalFrames) {
                    // Lặp lại animation để tiếp tục hiển thị
                    exhaust.userData.currentFrame = 0;
                }
                exhaust.material.map = exhaust.userData.frameTextures[exhaust.userData.currentFrame];
                exhaust.material.needsUpdate = true;
                exhaust.userData.lastFrameTime = currentTime;
            }
        }
        
    }

    checkWaveCompletion() {
        if (this.waveInProgress && this.enemies.length === 0 && !this.isTransitioning) {
            this.waveInProgress = false;
            this.totalWavesCompleted++;
            this.currentWaveNumber++;
            
            if (this.totalWavesCompleted % BOSS_TRIGGER_INTERVAL === 0) {
                this.spawnBoss();
            }
        }
    }
    
    startWaveTransition() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // Dừng bắn tự động
        this.stopAutoShoot();
        
        // Tạo exhaust effect phía sau player (hướng xuống dưới)
        if (this.player) {
            const exhaustPosition = this.player.position.clone();
            exhaustPosition.y -= 1.5; // Phía sau player (dưới)
            exhaustPosition.z = 0.5; // Gần player hơn một chút
            this.exhaustEffect = createExhaustEffect(
                this.scene,
                exhaustPosition,
                this.textureLoader,
                this.textureCache
            );
        }
        
        // Bắt đầu tăng tốc player bay lên phía trước
        this.transitionSpeed = GameConfig.PLAYER.TRANSITION_SPEED; // Tốc độ bay lên khi transition
        
        // Sau khi exhaust animation chạy và player bay lên, chuyển map
        setTimeout(() => {
            this.completeWaveTransition();
        }, 2000); // 2 giây để exhaust animation chạy và player bay lên
    }
    
    completeWaveTransition() {
        this.removeDuplicatePlayerMeshes();
        // Xóa exhaust effect cũ
        if (this.exhaustEffect) {
            this.scene.remove(this.exhaustEffect);
            this.exhaustEffect = null;
        }
        
        // Reset background về vị trí ban đầu trước khi chuyển map
        if (this.backgroundManager) {
            this.backgroundManager.resetPosition();
        }
        
        // Chuyển background (map)
        this.updateBackgroundForWave();
        
        // Reset transition state
        this.isTransitioning = false;
        this.transitionSpeed = 0;
        
        // Player xuất hiện từ dưới map mới (bay lên từ -12)
        // KHÔNG tạo player mới, chỉ di chuyển player hiện có
        if (this.player) {
            this.player.position.y = -12;
            this.targetPosition.y = -8;
            this.player.visible = true;
        } else {
            this.createPlayer();
            if (this.player) {
                this.player.position.y = -12;
                this.targetPosition.y = -8;
            }
        }
        
        // Sau khi chuyển map xong, bắt đầu wave mới
        // Không spawn boss ở đây vì boss chỉ spawn sau mỗi 3 wave (không phải sau mỗi map)
        this.startWave();
    }

    shoot() {
        const currentTime = performance.now();
        if (currentTime - this.lastShootTime < GameConfig.PLAYER.SHOOT_COOLDOWN) return;
        if (!this.player) return;
        
        // Tạo 3 tia đạn: giữa, trái (-5 độ), phải (+5 độ)
        const bulletTexture = this.getTexture('assets/Spaceship-2d-game-sprites/PNG/Ship_Effects/Fire_Shot_4_2.png');
        const geometry = new THREE.PlaneGeometry(0.5, 1);
        const angles = [0, -5, 5]; // Góc lệch: giữa, trái, phải (độ)
        
        angles.forEach((angle) => {
            const material = new THREE.MeshBasicMaterial({
                map: bulletTexture,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: false
            });
            
            const bullet = new THREE.Mesh(geometry, material);
            bullet.position.copy(this.player.position);
            bullet.position.y += 0.6;
            bullet.position.z = 0; // Đặt Z = 0 để cùng mặt phẳng với enemy
            
            // Xoay đạn theo góc (chuyển độ sang radian)
            const angleInRadians = (angle * Math.PI) / 180;
            bullet.rotation.z = angleInRadians;
            
            bullet.userData = {
                damage: this.playerBulletDamage, // SÁT THƯƠNG CỦA ĐẠN (tăng khi kill boss)
                isHit: false, // Đánh dấu đã trúng enemy chưa
                angle: angleInRadians // Lưu góc để di chuyển đúng hướng
            };
            
            this.scene.add(bullet);
            this.bullets.push(bullet);
        });
        
        this.playShootSound();
        
        this.lastShootTime = currentTime;
    }
    
    startAutoShoot() {
        if (this.autoShootActive) return;
        this.autoShootActive = true;
        this.shoot(); // Bắn ngay lập tức
        this.autoShootInterval = setInterval(() => {
            // Bắn khi wave đang diễn ra HOẶC khi boss active (không bắn khi pause/preparing)
            if (!this.isPaused && !this.isWavePreparing && (this.waveInProgress || this.bossActive)) {
                this.shoot();
            }
        }, 100); // Bắn mỗi 100ms - tốc độ bắn nhanh hơn
    }
    
    stopAutoShoot() {
        this.autoShootActive = false;
        if (this.autoShootInterval) {
            clearInterval(this.autoShootInterval);
            this.autoShootInterval = null;
        }
    }

    checkCollisions() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
                if (bullet.userData.isHit) continue;
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                const enemy = this.enemies[j];
                if (!enemy || !enemy.userData) continue;
                
                const dx = bullet.position.x - enemy.position.x;
                const dy = bullet.position.y - enemy.position.y;
                const distance2D = Math.sqrt(dx * dx + dy * dy);
                const bulletRadius = Math.max(0.5, 1.0) / 2;
                const enemyWidth = enemy.userData.width || 2.34;
                const enemyHeight = enemy.userData.height || 2.34;
                const enemyRadius = Math.max(enemyWidth, enemyHeight) / 2;
                const collisionDistance = (bulletRadius + enemyRadius) * 1.1;
                
                if (distance2D < collisionDistance) {
                    const hitEffect = createHitEffect(
                        this.scene,
                        enemy.position.clone(),
                        this.textureLoader,
                        this.textureCache
                    );
                    this.hitEffects.push(hitEffect);
                    bullet.userData.isHit = true;
                    this.scene.remove(bullet);
                    this.bullets.splice(i, 1);
                    if (enemy.userData.health !== undefined) {
                        enemy.userData.health -= bullet.userData.damage;
                    }
                    const healthPercent = (enemy.userData.health / enemy.userData.maxHealth) * 100;
                    if (healthPercent <= 30 && !enemy.userData.isDamaged) {
                        enemy.material.map = enemy.userData.damagedTexture;
                        enemy.material.needsUpdate = true;
                        enemy.geometry.dispose();
                        enemy.geometry = new THREE.PlaneGeometry(enemy.userData.damagedWidth, enemy.userData.damagedHeight);
                        enemy.userData.isDamaged = true;
                    }
                    if (enemy.userData.health <= 0) {
                        const explosion = createExplosionEffect(
                            this.scene,
                            enemy.position.clone(),
                            enemy.userData.shipId,
                            enemy.userData.isPirate,
                            this.textureLoader,
                            this.textureCache
                        );
                        this.explosions.push(explosion);
                        this.playEnemyExplosionSound();
                        
                        this.onEnemyKilled(enemy);
                        this.scene.remove(enemy);
                        this.enemies.splice(j, 1);
                    }
                    break;
                }
            }
        }
        
        if (this.currentBoss) {
            const bossIndex = (this.bossIndex - 1 + BOSS_CONFIGS.length) % BOSS_CONFIGS.length;
            const bossConfig = BOSS_CONFIGS[bossIndex];
            const bossHalfWidth = ((bossConfig.size?.w ?? this.currentBoss.geometry.parameters.width ?? 6) / 2) * BOSS_HITBOX_MULTIPLIER;
            const bossHalfHeight = ((bossConfig.size?.h ?? this.currentBoss.geometry.parameters.height ?? 6) / 2) * BOSS_HITBOX_MULTIPLIER;
            
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                const bullet = this.bullets[i];
                const bulletHalfWidth = (bullet.geometry?.parameters?.width ?? PLAYER_BULLET_SIZE.width) / 2;
                const bulletHalfHeight = (bullet.geometry?.parameters?.height ?? PLAYER_BULLET_SIZE.height) / 2;
                const dx = Math.abs(bullet.position.x - this.currentBoss.position.x);
                const dy = Math.abs(bullet.position.y - this.currentBoss.position.y);
                
                if (dx < (bossHalfWidth + bulletHalfWidth) && dy < (bossHalfHeight + bulletHalfHeight)) {
                    this.dealDamageToBoss(bullet.userData.damage);
                    this.scene.remove(bullet);
                    this.bullets.splice(i, 1);
                    continue;
                }
            }
        }
        
        if (this.player && !this.isPaused) {
            if (this.enemies.length > 0) {
                const playerPos = this.player.position;
                for (let i = this.enemies.length - 1; i >= 0; i--) {
                    const enemy = this.enemies[i];
                    if (!enemy || !enemy.position) continue;
                    
                    const dx = enemy.position.x - playerPos.x;
                    const dy = enemy.position.y - playerPos.y;
                    const distance2D = Math.sqrt(dx * dx + dy * dy);
                    
                    const playerRadius = Math.max(PLAYER_SIZE.width, PLAYER_SIZE.height) / 2;
                    const enemyWidth = enemy.userData.width || DEFAULT_ENEMY_SCALE;
                    const enemyHeight = enemy.userData.height || enemyWidth * (PLAYER_SIZE.height / PLAYER_SIZE.width);
                    const enemyRadius = Math.max(enemyWidth, enemyHeight) / 2;
                    const collisionDistance = (playerRadius + enemyRadius) * 1.1;
                    
                    if (distance2D < collisionDistance && !this.isPlayerDying) {
                        this.onPlayerDeath(enemy);
                        return;
                    }
                }
            }
            
            if (this.currentBoss && !this.isPlayerDying) {
                const bossIndex = (this.bossIndex - 1 + BOSS_CONFIGS.length) % BOSS_CONFIGS.length;
                const bossConfig = BOSS_CONFIGS[bossIndex];
                
                const playerHalfWidth = PLAYER_SIZE.width / 2;
                const playerHalfHeight = PLAYER_SIZE.height / 2;
                const bossHalfWidth = (bossConfig.size?.w ?? this.currentBoss.geometry.parameters.width ?? 6) / 2 * PLAYER_BOSS_COLLISION_MULTIPLIER;
                const bossHalfHeight = (bossConfig.size?.h ?? this.currentBoss.geometry.parameters.height ?? 6) / 2 * PLAYER_BOSS_COLLISION_MULTIPLIER;
                
                const dx = Math.abs(this.player.position.x - this.currentBoss.position.x);
                const dy = Math.abs(this.player.position.y - this.currentBoss.position.y);
                
                if (dx < (playerHalfWidth + bossHalfWidth) && dy < (playerHalfHeight + bossHalfHeight)) {
                    this.onPlayerDeath(null);
                    return;
                }
            }
            
            if (this.bossBullets.length > 0 && !this.isPlayerDying) {
                for (let i = this.bossBullets.length - 1; i >= 0; i--) {
                    const bullet = this.bossBullets[i];
                    if (!bullet || !bullet.position) continue;
                    
                    const playerHalfWidth = PLAYER_SIZE.width / 2;
                    const playerHalfHeight = PLAYER_SIZE.height / 2;
                    const bulletHalfWidth = ((bullet.userData.width || BOSS_BULLET_SIZE.width) / 2) * PLAYER_BOSS_BULLET_COLLISION_MULTIPLIER;
                    const bulletHalfHeight = ((bullet.userData.height || BOSS_BULLET_SIZE.height) / 2) * PLAYER_BOSS_BULLET_COLLISION_MULTIPLIER;
                    
                    const dxAbs = Math.abs(this.player.position.x - bullet.position.x);
                    const dyAbs = Math.abs(this.player.position.y - bullet.position.y);
                    
                    if (dxAbs < (playerHalfWidth + bulletHalfWidth) && dyAbs < (playerHalfHeight + bulletHalfHeight)) {
                        this.onPlayerDeath(null);
                        if (bullet.parent === this.scene) {
                            this.scene.remove(bullet);
                        }
                        this.bossBullets.splice(i, 1);
                        return;
                    }
                }
            }
        }
    }

    // Xử lý khi player chết
    onPlayerDeath(collidingEnemy) {
        if (this.isPlayerDying) return;
        this.isPlayerDying = true;
        
        // Dừng bắn tự động
        this.stopAutoShoot();
        
        // Tạo explosion effect cho enemy nếu có
        if (collidingEnemy && collidingEnemy.userData?.shipId) {
            const explosion = createExplosionEffect(
                this.scene,
                collidingEnemy.position.clone(),
                collidingEnemy.userData.shipId,
                collidingEnemy.userData.isPirate || false,
                this.textureLoader,
                this.textureCache
            );
            this.explosions.push(explosion);
            this.playEnemyExplosionSound();
            this.scene.remove(collidingEnemy);
            const enemyIndex = this.enemies.indexOf(collidingEnemy);
            if (enemyIndex > -1) {
                this.enemies.splice(enemyIndex, 1);
            }
        }
        
        // Tạo player explosion effect tại vị trí player
        if (this.player) {
            this.playerExplosion = createPlayerExplosionEffect(
                this.scene,
                this.player.position.clone(),
                this.textureLoader,
                this.textureCache
            );
            // Ẩn player đi
            this.player.visible = false;
        }
        
        // Đợi 2s để explosion animation chạy, sau đó mới hiển thị game over screen
        setTimeout(() => {
            this.gameOver();
        }, 2000);
    }
    
    // Gây sát thương cho boss
    dealDamageToBoss(amount) {
        if (!this.currentBoss) return;
        this.currentBoss.userData.health -= amount;
        this.uiManager.updateBossHealth(this.currentBoss.userData.health, this.currentBoss.userData.maxHealth);
        if (this.currentBoss.userData.health <= 0) {
            this.onBossDefeated();
        }
    }

    onEnemyKilled(enemy) {
        this.addScore(GameConfig.SCORING.ENEMY_KILL);
        this.enemiesKilled++;
    }

    onBossDefeated() {
        if (!this.currentBoss) return;
        
        // Tạo explosion effect cho boss
        const bossPosition = this.currentBoss.position.clone();
        const bossIndex = (this.bossIndex - 1 + BOSS_CONFIGS.length) % BOSS_CONFIGS.length; // Lấy boss index vừa bị kill
        const bossExplosion = createBossExplosionEffect(
            this.scene,
            bossPosition,
            bossIndex + 1, // Boss 1, 2, hoặc 3
            this.textureLoader,
            this.textureCache
        );
        this.explosions.push(bossExplosion);
        this.playBossExplosionSound();
        
        // Tăng damage của player bullet lên 1
        this.playerBulletDamage += 1;
        
        this.addScore(GameConfig.SCORING.BOSS_KILL);
        this.scene.remove(this.currentBoss);
        this.currentBoss = null;
        this.uiManager.hideBossStatus();
        this.bossActive = false;
        
        // Xóa tất cả boss bullets
        this.bossBullets.forEach(bullet => {
            this.scene.remove(bullet);
        });
        this.bossBullets = [];
        
        // Xóa tất cả boss shoot effects
        this.bossShootEffects.forEach(effect => {
            this.scene.remove(effect);
        });
        this.bossShootEffects = [];
        
        // Sau khi kill boss, chuyển map (luôn chuyển sau mỗi boss kill)
        // Map được tính dựa trên số boss đã kill (bossSpawnCount đã được tăng trong spawnBoss)
        const previousBgIndex = this.currentBackgroundIndex;
        const newBgIndex = (this.bossSpawnCount - 1) % BACKGROUND_TEXTURES.length;
        const isMapChanging = previousBgIndex !== newBgIndex;
        
        // Chuyển map sau khi kill boss
        if (isMapChanging) {
            // Bắt đầu transition với exhaust effect khi chuyển map
            this.startWaveTransition();
        } else {
            // Không cần transition (cùng map), bắt đầu wave mới ngay
            this.startWave();
        }
    }

    addScore(points) {
        this.score += points;
    }

    updateHUD() {
        this.uiManager.updateScore(this.score);
    }

    pause(options = {}) {
        if (this.isPaused) return;
        this.isPaused = true;
        if (!options.skipUnlock) {
            this.unlockMouse();
        }
        this.uiManager.showPauseMenu();
    }

    // Tiếp tục game
    resume() {
        if (!this.isPaused) return;
        this.isPaused = false;
        this.uiManager.hidePauseMenu();
    }

    restart() {
        this.gameEngine.getStateManager().changeState(GameState.GAMEPLAY);
    }

    quitToMenu() {
        this.gameEngine.getStateManager().changeState(GameState.MAIN_MENU);
    }

    // Xử lý game over
    gameOver() {
        this.gameEngine.getDataManager().saveHighScore(this.score);
        this.clearWaveTimers();
        const wasBossActive = this.bossActive;
        this.bossActive = false;
        const finalWave = wasBossActive ? Math.max(1, this.totalWavesCompleted) : this.waveDisplayNumber;
        this.gameEngine.getStateManager().changeState(GameState.GAME_OVER, {
            score: this.score,
            enemiesKilled: this.enemiesKilled,
            waveNumber: finalWave
        });
    }

    cleanup() {
        this.stopAutoShoot();
        
        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            this.boundMouseMove && canvas.removeEventListener('mousemove', this.boundMouseMove);
            this.boundMouseDown && canvas.removeEventListener('mousedown', this.boundMouseDown);
            this.boundMouseUp && canvas.removeEventListener('mouseup', this.boundMouseUp);
            this.boundClick && canvas.removeEventListener('click', this.boundClick);
        }
        this.boundKeyDown && window.removeEventListener('keydown', this.boundKeyDown);
        document.removeEventListener('pointerlockchange', this.pointerLockChangeHandler);
        this.unlockMouse();
        
        this.player && this.scene.remove(this.player);
        this.backgroundManager && this.backgroundManager.cleanup();
        this.enemies.forEach(enemy => this.scene.remove(enemy));
        this.bullets.forEach(bullet => this.scene.remove(bullet));
        this.hitEffects.forEach(effect => this.scene.remove(effect));
        this.explosions.forEach(explosion => this.scene.remove(explosion));
        this.playerExplosion && this.scene.remove(this.playerExplosion);
        this.currentBoss && this.scene.remove(this.currentBoss);
        this.bossActive = false;
        
        this.uiManager.cleanup();
        super.cleanup();
    }
    
    setupAudio() {
        if (typeof Audio === 'undefined') {
            this.sfx = {};
            return;
        }
        this.sfx = {
            shoot: this.createAudio(SFX_PATHS.SHOOT, 0.4),
            enemyExplosion: this.createAudio(SFX_PATHS.ENEMY_EXPLOSION, 0.6),
            bossExplosion: this.createAudio(SFX_PATHS.BOSS_EXPLOSION, 0.8)
        };
    }
    
    createAudio(path, volume = 1) {
        try {
            const audio = new Audio(path);
            audio.volume = volume;
            audio.preload = 'auto';
            return audio;
        } catch (err) {
            return null;
        }
    }
    
    playSound(audio) {
        if (!audio || typeof Audio === 'undefined') return;
        try {
            const instance = audio.cloneNode();
            instance.volume = audio.volume;
            instance.play().catch(() => {});
        } catch (err) {
            // Ignore autoplay or playback errors
        }
    }
    
    playShootSound() {
        this.playSound(this.sfx?.shoot);
    }
    
    playEnemyExplosionSound() {
        this.playSound(this.sfx?.enemyExplosion);
    }
    
    playBossExplosionSound() {
        this.playSound(this.sfx?.bossExplosion);
    }
}
