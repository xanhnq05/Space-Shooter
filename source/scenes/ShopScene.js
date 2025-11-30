/**
 * ============================================
 * SHOPSCENE.JS
 * ============================================
 * 
 * Scene cho Shop
 * Hi?n th?: Danh s�ch items c� th? mua (ship upgrades, powerups, remove ads...)
 * X? l�: Mua items, hi?n th? gi�, ki?m tra ?� mua ch?a
 */

import { BaseScene } from './BaseScene.js';
import { GameState, ShopItems } from '../utils/Constants.js';

export class ShopScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        this.shopItems = [];
        this.playerCoins = 0;
    }

    /**
     * Kh?i t?o Shop Scene
     * TODO: Implement initialization
     * - Load player coins t? DataManager
     * - Hi?n th? danh s�ch items
     * - Hi?n th? items ?� mua (disable ho?c mark as owned)
     * - Hi?n th? gi� v� s? coins hi?n c�
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // TODO: Get player data
        // const playerData = this.gameEngine.getDataManager().data.playerData;
        // this.playerCoins = playerData.coins || 0;
        
        // TODO: Create shop UI
        // this.createShopUI();
        
        // TODO: Setup event listeners
        // this.setupEventListeners();
    }

    /**
     * T?o UI cho shop
     * TODO: Implement shop UI creation
     * - Hi?n th? coins counter
     * - T?o item cards cho m?i item trong ShopItems
     * - Hi?n th? gi�, icon, description
     * - Mark items ?� mua
     */
    createShopUI() {
        // TODO: Create shop items display
        // Object.values(ShopItems).forEach(item => {
        //     const isPurchased = this.gameEngine.getDataManager().hasPurchasedItem(item.id);
        //     this.createShopItemCard(item, isPurchased);
        // });
    }

    /**
     * T?o card cho m?t shop item
     * @param {object} item 
     * @param {boolean} isPurchased 
     * TODO: Implement item card creation
     */
    createShopItemCard(item, isPurchased) {
        // TODO: Create card v?i:
        // - Item icon
        // - Item name
        // - Item description
        // - Price (ho?c "Owned" n?u ?� mua)
        // - Buy button (disabled n?u ?� mua ho?c kh�ng ?? coins)
    }

    /**
     * X? l� mua item
     * @param {string} itemId 
     * TODO: Implement purchase logic
     */
    purchaseItem(itemId) {
        // TODO: Get item info
        // const item = ShopItems[itemId];
        // if (!item) return;
        
        // TODO: Check if already purchased
        // if (this.gameEngine.getDataManager().hasPurchasedItem(itemId)) {
        //     return; // Already owned
        // }
        
        // TODO: Check if enough coins
        // if (this.playerCoins < item.price) {
        //     // Show message: "Not enough coins"
        //     return;
        // }
        
        // TODO: Deduct coins
        // this.playerCoins -= item.price;
        // const playerData = this.gameEngine.getDataManager().data.playerData;
        // playerData.coins = this.playerCoins;
        
        // TODO: Mark as purchased
        // this.gameEngine.getDataManager().addPurchasedItem(itemId);
        
        // TODO: Apply item effect (n?u l� upgrade)
        // this.applyItemEffect(itemId);
        
        // TODO: Save data
        // this.gameEngine.getDataManager().saveAll();
        
        // TODO: Update UI
        // this.updateShopUI();
    }

    /**
     * �p d?ng effect c?a item ?� mua
     * @param {string} itemId 
     * TODO: Implement item effects
     */
    applyItemEffect(itemId) {
        // TODO: Apply effects based on item type
        // if (itemId === 'ship_upgrade') {
        //     // Upgrade ship level
        // } else if (itemId === 'health_boost') {
        //     // Increase max health
        // }
    }

    /**
     * Update shop UI sau khi mua
     * TODO: Implement UI update
     */
    updateShopUI() {
        // TODO: Refresh coins display
        // TODO: Update item cards (mark as purchased)
    }

    setupEventListeners() {
        // TODO: Add click listeners
    }

    cleanup() {
        super.cleanup();
    }
}
