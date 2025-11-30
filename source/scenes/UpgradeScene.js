/**
 * ============================================
 * UPGRADESCENE.JS
 * ============================================
 * 
 * Scene cho Upgrade System
 * Hiển thị: Các upgrade có thể mua cho ship (damage, speed, health, fire rate...)
 * Xử lý: Upgrade ship stats, hiển thị current level và cost
 */

import { BaseScene } from './BaseScene.js';
import { GameState } from '../utils/Constants.js';

export class UpgradeScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.upgrades = {
            damage: { level: 1, maxLevel: 10, cost: 50 },
            speed: { level: 1, maxLevel: 10, cost: 50 },
            health: { level: 1, maxLevel: 10, cost: 50 },
            fireRate: { level: 1, maxLevel: 10, cost: 50 }
        };
    }

    /**
     * Khởi tạo Upgrade Scene
     * TODO: Implement initialization
     * - Load current upgrade levels từ DataManager
     * - Hiển thị upgrade UI
     * - Hiển thị current stats và next level stats
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // TODO: Load upgrades từ playerData
        // const playerData = this.gameEngine.getDataManager().data.playerData;
        // if (playerData.upgrades) {
        //     this.upgrades = { ...this.upgrades, ...playerData.upgrades };
        // }
        
        // TODO: Create upgrade UI
        // this.createUpgradeUI();
        
        // TODO: Setup event listeners
        // this.setupEventListeners();
    }

    /**
     * Tạo UI cho upgrades
     * TODO: Implement upgrade UI creation
     * - Hiển thị từng upgrade category
     * - Hiển thị current level và max level
     * - Hiển thị cost để upgrade
     * - Hiển thị stat values (current và next)
     * - Upgrade button (disabled nếu max level hoặc không đủ coins)
     */
    createUpgradeUI() {
        // TODO: Create upgrade cards
        // Object.keys(this.upgrades).forEach(upgradeKey => {
        //     this.createUpgradeCard(upgradeKey);
        // });
    }

    /**
     * Tạo card cho một upgrade
     * @param {string} upgradeKey 
     * TODO: Implement upgrade card creation
     */
    createUpgradeCard(upgradeKey) {
        // TODO: Create card với:
        // - Upgrade name và icon
        // - Current level / Max level
        // - Current stat value
        // - Next level stat value (preview)
        // - Cost to upgrade
        // - Upgrade button
    }

    /**
     * Upgrade một stat
     * @param {string} upgradeKey 
     * TODO: Implement upgrade logic
     */
    upgrade(upgradeKey) {
        // TODO: Get upgrade info
        // const upgrade = this.upgrades[upgradeKey];
        // if (!upgrade) return;
        
        // TODO: Check if max level
        // if (upgrade.level >= upgrade.maxLevel) {
        //     // Show message: "Max level reached"
        //     return;
        // }
        
        // TODO: Calculate cost (cost increases with level)
        // const cost = upgrade.cost * upgrade.level;
        
        // TODO: Check if enough coins
        // const playerData = this.gameEngine.getDataManager().data.playerData;
        // if (playerData.coins < cost) {
        //     // Show message: "Not enough coins"
        //     return;
        // }
        
        // TODO: Deduct coins và upgrade
        // playerData.coins -= cost;
        // upgrade.level++;
        
        // TODO: Save data
        // this.gameEngine.getDataManager().saveAll();
        
        // TODO: Update UI
        // this.updateUpgradeUI(upgradeKey);
    }

    /**
     * Tính toán stat value dựa trên level
     * @param {string} upgradeKey 
     * @param {number} level 
     * @returns {number}
     * TODO: Implement stat calculation
     */
    calculateStatValue(upgradeKey, level) {
        // TODO: Calculate stat based on level
        // Ví dụ: baseValue * (1 + level * multiplier)
        // return baseValue * (1 + level * 0.1);
    }

    updateUpgradeUI(upgradeKey) {
        // TODO: Update specific upgrade card
    }

    setupEventListeners() {
        // TODO: Add click listeners
    }

    cleanup() {
        super.cleanup();
    }
}
