/**
 * ============================================
 * DATAMANAGER.JS
 * ============================================
 * 
 * Quản lý lưu trữ và tải dữ liệu game
 * Sử dụng localStorage để lưu:
 * - Player progress (level đã mở khóa, điểm cao nhất)
 * - Settings (âm lượng, độ khó)
 * - Shop purchases (items đã mua)
 * - Player stats (tổng điểm, số lần chơi...)
 */

import { StorageKeys } from '../utils/Constants.js';

export class DataManager {
    constructor() {
        this.data = {
            playerData: null,
            settings: null,
            highScore: 0,
            unlockedLevels: [1], // Level 1 mặc định đã mở
            purchasedItems: []
        };
        
        this.loadAll();
    }

    /**
     * Tải tất cả dữ liệu từ localStorage
     * TODO: Implement load từ localStorage
     * - Load playerData từ StorageKeys.PLAYER_DATA
     * - Load settings từ StorageKeys.SETTINGS
     * - Load highScore từ StorageKeys.HIGH_SCORE
     * - Load unlockedLevels từ StorageKeys.UNLOCKED_LEVELS
     * - Load purchasedItems từ StorageKeys.PURCHASED_ITEMS
     * - Xử lý trường hợp dữ liệu null (lần đầu chơi)
     */
    loadAll() {
        // TODO: Load từ localStorage
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
     * Lưu tất cả dữ liệu vào localStorage
     * TODO: Implement save vào localStorage
     */
    saveAll() {
        // TODO: Save tất cả vào localStorage
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
     * Lưu điểm cao nhất
     * @param {number} score 
     */
    saveHighScore(score) {
        if (score > this.data.highScore) {
            this.data.highScore = score;
            localStorage.setItem(StorageKeys.HIGH_SCORE, score.toString());
        }
    }

    /**
     * Mở khóa level mới
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
     * Kiểm tra level đã được mở khóa chưa
     * @param {number} level 
     * @returns {boolean}
     */
    isLevelUnlocked(level) {
        return this.data.unlockedLevels.includes(level);
    }

    /**
     * Lưu item đã mua trong shop
     * @param {string} itemId 
     */
    addPurchasedItem(itemId) {
        if (!this.data.purchasedItems.includes(itemId)) {
            this.data.purchasedItems.push(itemId);
            localStorage.setItem(StorageKeys.PURCHASED_ITEMS, JSON.stringify(this.data.purchasedItems));
        }
    }

    /**
     * Kiểm tra item đã mua chưa
     * @param {string} itemId 
     * @returns {boolean}
     */
    hasPurchasedItem(itemId) {
        return this.data.purchasedItems.includes(itemId);
    }

    /**
     * Lưu settings
     * @param {object} settings 
     */
    saveSettings(settings) {
        this.data.settings = { ...this.data.settings, ...settings };
        localStorage.setItem(StorageKeys.SETTINGS, JSON.stringify(this.data.settings));
    }

    /**
     * Lấy settings
     * @returns {object}
     */
    getSettings() {
        return this.data.settings || this.getDefaultSettings();
    }

    /**
     * Lấy dữ liệu player mặc định
     * TODO: Define default player data structure
     * @returns {object}
     */
    getDefaultPlayerData() {
        return {
            totalScore: 0,
            totalGames: 0,
            totalKills: 0,
            highestLevel: 1,
            coins: 0, // Tiền trong game để mua items
            shipLevel: 1,
            upgrades: {}
        };
    }

    /**
     * Lấy settings mặc định
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
     * Reset về mặc định
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
     * Xóa tất cả dữ liệu (reset game)
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
