/**
 * ============================================
 * DATAMANAGER.JS
 * ============================================
 * 
 * Qu?n l� l?u tr? v� t?i d? li?u game
 * S? d?ng localStorage ?? l?u:
 * - Player progress (level ?� m? kh�a, ?i?m cao nh?t)
 * - Settings (�m l??ng, ?? kh�)
 * - Shop purchases (items ?� mua)
 * - Player stats (t?ng ?i?m, s? l?n ch?i...)
 */

import { StorageKeys } from '../utils/Constants.js';

export class DataManager {
    constructor() {
        this.data = {
            playerData: null,
            settings: null,
            highScore: 0,
            unlockedLevels: [1], // Level 1 m?c ??nh ?� m?
            purchasedItems: []
        };
        
        this.loadAll();
    }

    /**
     * T?i t?t c? d? li?u t? localStorage
     * TODO: Implement load t? localStorage
     * - Load playerData t? StorageKeys.PLAYER_DATA
     * - Load settings t? StorageKeys.SETTINGS
     * - Load highScore t? StorageKeys.HIGH_SCORE
     * - Load unlockedLevels t? StorageKeys.UNLOCKED_LEVELS
     * - Load purchasedItems t? StorageKeys.PURCHASED_ITEMS
     * - X? l� tr??ng h?p d? li?u null (l?n ??u ch?i)
     */
    loadAll() {
        // TODO: Load t? localStorage
        // try {
        //     const playerDataStr = localStorage.getItem(StorageKeys.PLAYER_DATA);
        //     this.data.playerData = playerDataStr ? JSON.parse(playerDataStr) : this.getDefaultPlayerData();
        //     
        //     const settingsStr = localStorage.getItem(StorageKeys.SETTINGS);
        //     this.data.settings = settingsStr ? JSON.parse(settingsStr) : this.getDefaultSettings();
        //     
        //     this.data.highScore = parseInt(localStorage.getItem(StorageKeys.HIGH_SCORE) || '0');
        //     
        //     const unlockedStr = localStorage.getItem(StorageKeys.UNLOCKED_LEVELS);
        //     this.data.unlockedLevels = unlockedStr ? JSON.parse(unlockedStr) : [1];
        //     
        //     const purchasedStr = localStorage.getItem(StorageKeys.PURCHASED_ITEMS);
        //     this.data.purchasedItems = purchasedStr ? JSON.parse(purchasedStr) : [];
        // } catch (error) {
        //     console.error('Error loading data:', error);
        //     this.resetToDefaults();
        // }
    }

    /**
     * L?u t?t c? d? li?u v�o localStorage
     * TODO: Implement save v�o localStorage
     */
    saveAll() {
        // TODO: Save t?t c? v�o localStorage
        // try {
        //     localStorage.setItem(StorageKeys.PLAYER_DATA, JSON.stringify(this.data.playerData));
        //     localStorage.setItem(StorageKeys.SETTINGS, JSON.stringify(this.data.settings));
        //     localStorage.setItem(StorageKeys.HIGH_SCORE, this.data.highScore.toString());
        //     localStorage.setItem(StorageKeys.UNLOCKED_LEVELS, JSON.stringify(this.data.unlockedLevels));
        //     localStorage.setItem(StorageKeys.PURCHASED_ITEMS, JSON.stringify(this.data.purchasedItems));
        // } catch (error) {
        //     console.error('Error saving data:', error);
        // }
    }

    /**
     * L?u ?i?m cao nh?t
     * @param {number} score 
     */
    saveHighScore(score) {
        if (score > this.data.highScore) {
            this.data.highScore = score;
            localStorage.setItem(StorageKeys.HIGH_SCORE, score.toString());
        }
    }

    /**
     * M? kh�a level m?i
     * @param {number} level 
     */
    unlockLevel(level) {
        if (!this.data.unlockedLevels.includes(level)) {
            this.data.unlockedLevels.push(level);
            this.data.unlockedLevels.sort((a, b) => a - b);
            localStorage.setItem(StorageKeys.UNLOCKED_LEVELS, JSON.stringify(this.data.unlockedLevels));
        }
    }

    /**
     * Ki?m tra level ?� ???c m? kh�a ch?a
     * @param {number} level 
     * @returns {boolean}
     */
    isLevelUnlocked(level) {
        return this.data.unlockedLevels.includes(level);
    }

    /**
     * L?u item ?� mua trong shop
     * @param {string} itemId 
     */
    addPurchasedItem(itemId) {
        if (!this.data.purchasedItems.includes(itemId)) {
            this.data.purchasedItems.push(itemId);
            localStorage.setItem(StorageKeys.PURCHASED_ITEMS, JSON.stringify(this.data.purchasedItems));
        }
    }

    /**
     * Ki?m tra item ?� mua ch?a
     * @param {string} itemId 
     * @returns {boolean}
     */
    hasPurchasedItem(itemId) {
        return this.data.purchasedItems.includes(itemId);
    }

    /**
     * L?u settings
     * @param {object} settings 
     */
    saveSettings(settings) {
        this.data.settings = { ...this.data.settings, ...settings };
        localStorage.setItem(StorageKeys.SETTINGS, JSON.stringify(this.data.settings));
    }

    /**
     * L?y settings
     * @returns {object}
     */
    getSettings() {
        return this.data.settings || this.getDefaultSettings();
    }

    /**
     * L?y d? li?u player m?c ??nh
     * TODO: Define default player data structure
     * @returns {object}
     */
    getDefaultPlayerData() {
        return {
            totalScore: 0,
            totalGames: 0,
            totalKills: 0,
            highestLevel: 1,
            coins: 0, // Ti?n trong game ?? mua items
            shipLevel: 1,
            upgrades: {}
        };
    }

    /**
     * L?y settings m?c ??nh
     * TODO: Define default settings structure
     * @returns {object}
     */
    getDefaultSettings() {
        return {
            volume: 50,
            musicVolume: 50,
            difficulty: 'normal',
            language: 'vi',
            showFPS: false
        };
    }

    /**
     * Reset v? m?c ??nh
     */
    resetToDefaults() {
        this.data = {
            playerData: this.getDefaultPlayerData(),
            settings: this.getDefaultSettings(),
            highScore: 0,
            unlockedLevels: [1],
            purchasedItems: []
        };
        this.saveAll();
    }

    /**
     * X�a t?t c? d? li?u (reset game)
     */
    clearAll() {
        localStorage.removeItem(StorageKeys.PLAYER_DATA);
        localStorage.removeItem(StorageKeys.SETTINGS);
        localStorage.removeItem(StorageKeys.HIGH_SCORE);
        localStorage.removeItem(StorageKeys.UNLOCKED_LEVELS);
        localStorage.removeItem(StorageKeys.PURCHASED_ITEMS);
        this.resetToDefaults();
    }
}
