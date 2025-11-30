/**
 * ============================================
 * UPGRADESCENE.JS
 * ============================================
 * 
 * Scene cho Upgrade System
 * Hi?n th?: C�c upgrade c� th? mua cho ship (damage, speed, health, fire rate...)
 * X? l�: Upgrade ship stats, hi?n th? current level v� cost
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
     * Kh?i t?o Upgrade Scene
     * TODO: Implement initialization
     * - Load current upgrade levels t? DataManager
     * - Hi?n th? upgrade UI
     * - Hi?n th? current stats v� next level stats
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // TODO: Load upgrades t? playerData
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
     * T?o UI cho upgrades
     * TODO: Implement upgrade UI creation
     * - Hi?n th? t?ng upgrade category
     * - Hi?n th? current level v� max level
     * - Hi?n th? cost ?? upgrade
     * - Hi?n th? stat values (current v� next)
     * - Upgrade button (disabled n?u max level ho?c kh�ng ?? coins)
     */
    createUpgradeUI() {
        // TODO: Create upgrade cards
        // Object.keys(this.upgrades).forEach(upgradeKey => {
        //     this.createUpgradeCard(upgradeKey);
        // });
    }

    /**
     * T?o card cho m?t upgrade
     * @param {string} upgradeKey 
     * TODO: Implement upgrade card creation
     */
    createUpgradeCard(upgradeKey) {
        // TODO: Create card v?i:
        // - Upgrade name v� icon
        // - Current level / Max level
        // - Current stat value
        // - Next level stat value (preview)
        // - Cost to upgrade
        // - Upgrade button
    }

    /**
     * Upgrade m?t stat
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
        
        // TODO: Deduct coins v� upgrade
        // playerData.coins -= cost;
        // upgrade.level++;
        
        // TODO: Save data
        // this.gameEngine.getDataManager().saveAll();
        
        // TODO: Update UI
        // this.updateUpgradeUI(upgradeKey);
    }

    /**
     * T�nh to�n stat value d?a tr�n level
     * @param {string} upgradeKey 
     * @param {number} level 
     * @returns {number}
     * TODO: Implement stat calculation
     */
    calculateStatValue(upgradeKey, level) {
        // TODO: Calculate stat based on level
        // V� d?: baseValue * (1 + level * multiplier)
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
