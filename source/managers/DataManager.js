// Quản lý lưu trữ và tải dữ liệu game

import { StorageKeys } from '../utils/Constants.js';

export class DataManager {
    constructor() {
        this.data = {
            playerData: null,
            settings: null,
            highScore: 0,
            unlockedLevels: [1],
            purchasedItems: []
        };
        
        this.loadAll();
    }

    // Tải tất cả dữ liệu từ localStorage
    loadAll() {
    }

    // Lưu tất cả dữ liệu vào localStorage
    saveAll() {
    }

    // Lưu điểm cao nhất
    saveHighScore(score) {
        if (score > this.data.highScore) {
            this.data.highScore = score;
            localStorage.setItem(StorageKeys.HIGH_SCORE, score.toString());
        }
    }

    // Lấy điểm cao nhất
    getHighScore() {
        if (this.data.highScore === 0) {
            const stored = localStorage.getItem(StorageKeys.HIGH_SCORE);
            this.data.highScore = stored ? parseInt(stored) : 0;
        }
        return this.data.highScore;
    }

    // Mở khóa level mới
    unlockLevel(level) {
        if (!this.data.unlockedLevels.includes(level)) {
            this.data.unlockedLevels.push(level);
            this.data.unlockedLevels.sort((a, b) => a - b);
            localStorage.setItem(StorageKeys.UNLOCKED_LEVELS, JSON.stringify(this.data.unlockedLevels));
        }
    }

    // Kiểm tra level đã được mở khóa chưa
    isLevelUnlocked(level) {
        return this.data.unlockedLevels.includes(level);
    }

    // Lưu item đã mua trong shop
    addPurchasedItem(itemId) {
        if (!this.data.purchasedItems.includes(itemId)) {
            this.data.purchasedItems.push(itemId);
            localStorage.setItem(StorageKeys.PURCHASED_ITEMS, JSON.stringify(this.data.purchasedItems));
        }
    }

    // Kiểm tra item đã mua chưa
    hasPurchasedItem(itemId) {
        return this.data.purchasedItems.includes(itemId);
    }

    // Lưu settings
    saveSettings(settings) {
        this.data.settings = { ...this.data.settings, ...settings };
        localStorage.setItem(StorageKeys.SETTINGS, JSON.stringify(this.data.settings));
    }

    // Lấy settings
    getSettings() {
        return this.data.settings || this.getDefaultSettings();
    }

    // Lấy dữ liệu player mặc định
    getDefaultPlayerData() {
        return {
            totalScore: 0,
            totalGames: 0,
            totalKills: 0,
            highestLevel: 1,
            coins: 0,
            shipLevel: 1,
            upgrades: {}
        };
    }

    // Lấy settings mặc định
    getDefaultSettings() {
        return {
            volume: 50,
            musicVolume: 50,
            difficulty: 'normal',
            language: 'vi',
            showFPS: false
        };
    }

    // Reset về mặc định
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

    // Xóa tất cả dữ liệu
    clearAll() {
        localStorage.removeItem(StorageKeys.PLAYER_DATA);
        localStorage.removeItem(StorageKeys.SETTINGS);
        localStorage.removeItem(StorageKeys.HIGH_SCORE);
        localStorage.removeItem(StorageKeys.UNLOCKED_LEVELS);
        localStorage.removeItem(StorageKeys.PURCHASED_ITEMS);
        this.resetToDefaults();
    }
}
