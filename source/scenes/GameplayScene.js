/**
 * ============================================
 * GAMEPLAYSCENE.JS
 * ============================================
 * 
 * Scene chính cho gameplay
 * Quản lý: Player, Enemies, Boss, Bullets, Collisions, Scoring
 * Xử lý: Game logic, spawn enemies, boss fights, game over conditions
 */

import { BaseScene } from './BaseScene.js';
import { GameState, GameConfig } from '../utils/Constants.js';

export class GameplayScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        
        // Game objects
        this.player = null;
        this.enemies = [];
        this.boss = null;
        this.bullets = [];
        this.background = null;
        this.explosions = [];
        
        // Game state
        this.currentLevel = 1;
        this.score = 0;
        this.enemiesKilled = 0;
        this.gameTime = 0;
        this.isPaused = false;
        
        // Spawn timers
        this.enemySpawnTimer = 0;
        this.bossSpawnTimer = 0;
    }

    /**
     * Khởi tạo Gameplay Scene
     * @param {object} data - { level: number }
     * TODO: Implement initialization
     * - Load level data
     * - Create player với stats từ upgrades
     * - Create background
     * - Setup HUD
     * - Initialize spawn timers
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // TODO: Get level from data
        // this.currentLevel = data.level || 1;
        
        // TODO: Create background
        // this.createBackground();
        
        // TODO: Create player với upgrades
        // this.createPlayer();
        
        // TODO: Setup HUD
        // this.setupHUD();
        
        // TODO: Initialize spawn timers
        // this.enemySpawnTimer = 0;
        // this.bossSpawnTimer = 0;
    }

    /**
     * Tạo player
     * TODO: Implement player creation
     * - Load player ship texture
     * - Apply upgrades từ DataManager
     * - Set position, health, speed
     */
    createPlayer() {
        // TODO: Get player upgrades
        // const playerData = this.gameEngine.getDataManager().data.playerData;
        // const upgrades = playerData.upgrades || {};
        
        // TODO: Create player object với stats
        // this.player = new Player(this.scene, {
        //     health: GameConfig.PLAYER.START_HEALTH * (1 + upgrades.health * 0.1),
        //     speed: GameConfig.PLAYER.SPEED * (1 + upgrades.speed * 0.1),
        //     damage: 1 * (1 + upgrades.damage * 0.1),
        //     fireRate: GameConfig.PLAYER.SHOOT_COOLDOWN / (1 + upgrades.fireRate * 0.1)
        // });
    }

    /**
     * Tạo background
     * TODO: Implement background creation
     */
    createBackground() {
        // TODO: Create scrolling background
        // this.background = new Background(this.scene);
    }

    /**
     * Setup HUD
     * TODO: Implement HUD setup
     * - Score display
     * - Health bar
     * - Level display
     * - Boss health bar (khi có boss)
     * - Boss icon (khi boss sắp xuất hiện)
     */
    setupHUD() {
        // TODO: Setup HUD elements
        // - Score counter
        // - Health bar với current/max health
        // - Level indicator
        // - Boss warning icon (khi boss sắp spawn)
    }

    /**
     * Update gameplay mỗi frame
     * TODO: Implement game loop logic
     * - Update player
     * - Spawn enemies theo timer
     * - Spawn boss ở level nhất định
     * - Update all game objects
     * - Check collisions
     * - Update score
     * - Check game over conditions
     */
    update(deltaTime) {
        if (this.isPaused) return;
        
        this.gameTime += deltaTime;
        
        // TODO: Update background
        // if (this.background) this.background.update();
        
        // TODO: Update player
        // if (this.player) this.player.update(deltaTime);
        
        // TODO: Spawn enemies
        // this.handleEnemySpawning(deltaTime);
        
        // TODO: Spawn boss
        // this.handleBossSpawning();
        
        // TODO: Update enemies
        // this.enemies.forEach(enemy => enemy.update(deltaTime));
        
        // TODO: Update bullets
        // this.bullets.forEach(bullet => bullet.update());
        
        // TODO: Update explosions
        // this.explosions.forEach(explosion => explosion.update());
        
        // TODO: Check collisions
        // this.checkCollisions();
        
        // TODO: Remove out of bounds objects
        // this.cleanupObjects();
        
        // TODO: Update HUD
        // this.updateHUD();
        
        // TODO: Check game over
        // this.checkGameOver();
    }

    /**
     * Xử lý spawn enemies
     * TODO: Implement enemy spawning
     */
    handleEnemySpawning(deltaTime) {
        // TODO: Increase spawn timer
        // this.enemySpawnTimer += deltaTime;
        
        // TODO: Calculate spawn interval (giảm dần theo level)
        // const spawnInterval = GameConfig.ENEMY.SPAWN_INTERVAL / (1 + this.currentLevel * 0.1);
        
        // TODO: Spawn enemy khi đủ thời gian
        // if (this.enemySpawnTimer >= spawnInterval) {
        //     this.spawnEnemy();
        //     this.enemySpawnTimer = 0;
        // }
    }

    /**
     * Spawn một enemy
     * TODO: Implement enemy spawn
     */
    spawnEnemy() {
        // TODO: Random x position
        // const x = (Math.random() - 0.5) * 18; // -9 to 9
        // const y = 12; // Spawn từ trên
        
        // TODO: Random enemy type
        // const type = Math.floor(Math.random() * 3) + 1;
        
        // TODO: Create enemy
        // const enemy = new Enemy(this.scene, x, y, type);
        // this.enemies.push(enemy);
    }

    /**
     * Xử lý spawn boss
     * TODO: Implement boss spawning
     */
    handleBossSpawning() {
        // TODO: Check if should spawn boss (mỗi 5 levels)
        // if (this.currentLevel % GameConfig.BOSS.SPAWN_AT_LEVEL === 0 && !this.boss) {
        //     this.spawnBoss();
        // }
    }

    /**
     * Spawn boss
     * TODO: Implement boss spawn
     */
    spawnBoss() {
        // TODO: Determine boss type based on level
        // const bossType = Math.floor((this.currentLevel - 1) / 5) + 1;
        
        // TODO: Create boss
        // this.boss = new Boss(this.scene, bossType, {
        //     health: GameConfig.BOSS.HEALTH * this.currentLevel
        // });
        
        // TODO: Show boss warning UI
        // this.showBossWarning();
    }

    /**
     * Kiểm tra collisions
     * TODO: Implement collision detection
     * - Player bullets vs Enemies
     * - Player bullets vs Boss
     * - Enemy bullets vs Player
     * - Player vs Enemies
     * - Player vs Boss
     */
    checkCollisions() {
        // TODO: Player bullets vs Enemies
        // this.player.bullets.forEach((bullet, bulletIndex) => {
        //     this.enemies.forEach((enemy, enemyIndex) => {
        //         if (this.isColliding(bullet, enemy)) {
        //             enemy.takeDamage(bullet.damage);
        //             if (!enemy.isAlive()) {
        //                 this.onEnemyKilled(enemy);
        //                 this.enemies.splice(enemyIndex, 1);
        //             }
        //             bullet.remove();
        //             this.player.bullets.splice(bulletIndex, 1);
        //         }
        //     });
        // });
        
        // TODO: Player bullets vs Boss
        // if (this.boss) {
        //     this.player.bullets.forEach((bullet, index) => {
        //         if (this.isColliding(bullet, this.boss)) {
        //             this.boss.takeDamage(bullet.damage);
        //             bullet.remove();
        //             this.player.bullets.splice(index, 1);
        //         }
        //     });
        // }
        
        // TODO: Enemy bullets vs Player
        // TODO: Player vs Enemies
        // TODO: Player vs Boss
    }

    /**
     * Xử lý khi enemy bị tiêu diệt
     * @param {object} enemy 
     * TODO: Implement enemy kill logic
     */
    onEnemyKilled(enemy) {
        // TODO: Add score
        // this.addScore(GameConfig.SCORING.ENEMY_KILL);
        // this.enemiesKilled++;
        
        // TODO: Create explosion effect
        // const explosion = new Explosion(this.scene, enemy.position.x, enemy.position.y);
        // this.explosions.push(explosion);
        
        // TODO: Random drop items (coins, powerups)
        // if (Math.random() < 0.1) {
        //     this.dropItem(enemy.position);
        // }
    }

    /**
     * Thêm điểm
     * @param {number} points 
     * TODO: Implement scoring
     */
    addScore(points) {
        // TODO: Add score
        // this.score += points;
        
        // TODO: Check level up
        // const newLevel = Math.floor(this.score / GameConfig.LEVEL.SCORE_PER_LEVEL) + 1;
        // if (newLevel > this.currentLevel) {
        //     this.onLevelUp(newLevel);
        // }
        
        // TODO: Update HUD
        // this.updateScoreDisplay();
    }

    /**
     * Xử lý khi lên level
     * @param {number} newLevel 
     * TODO: Implement level up logic
     */
    onLevelUp(newLevel) {
        // TODO: Update level
        // this.currentLevel = newLevel;
        
        // TODO: Show level up effect/UI
        // this.showLevelUpEffect();
        
        // TODO: Increase difficulty
        // this.increaseDifficulty();
    }

    /**
     * Kiểm tra game over
     * TODO: Implement game over check
     */
    checkGameOver() {
        // TODO: Check if player is dead
        // if (this.player && !this.player.isAlive()) {
        //     this.gameOver(false); // false = lost
        // }
        
        // TODO: Check if boss defeated
        // if (this.boss && !this.boss.isAlive()) {
        //     this.gameOver(true); // true = victory
        // }
    }

    /**
     * Xử lý game over
     * @param {boolean} victory 
     * TODO: Implement game over logic
     */
    gameOver(victory) {
        // TODO: Save high score
        // this.gameEngine.getDataManager().saveHighScore(this.score);
        
        // TODO: Unlock next level nếu victory
        // if (victory) {
        //     this.gameEngine.getDataManager().unlockLevel(this.currentLevel + 1);
        // }
        
        // TODO: Update player stats
        // const playerData = this.gameEngine.getDataManager().data.playerData;
        // playerData.totalGames++;
        // playerData.totalKills += this.enemiesKilled;
        // playerData.totalScore += this.score;
        // this.gameEngine.getDataManager().saveAll();
        
        // TODO: Chuyển đến GameOverScene
        // this.gameEngine.getStateManager().changeState(GameState.GAME_OVER, {
        //     score: this.score,
        //     level: this.currentLevel,
        //     enemiesKilled: this.enemiesKilled,
        //     victory: victory
        // });
    }

    /**
     * Pause game
     * TODO: Implement pause
     */
    pause() {
        this.isPaused = true;
        // TODO: Show pause menu
    }

    /**
     * Resume game
     * TODO: Implement resume
     */
    resume() {
        this.isPaused = false;
        // TODO: Hide pause menu
    }

    /**
     * Update HUD
     * TODO: Implement HUD update
     */
    updateHUD() {
        // TODO: Update score display
        // TODO: Update health bar
        // TODO: Update level display
        // TODO: Update boss health bar nếu có boss
    }

    cleanup() {
        // TODO: Remove all game objects
        // TODO: Dispose resources
        super.cleanup();
    }
}
