/**
 * ============================================
 * SHOPSCENE.JS
 * ============================================
 * 
 * Scene cho Shop
 * Hiển thị: Danh sách items có thể mua (ship upgrades, powerups, remove ads...)
 * Xử lý: Mua items, hiển thị giá, kiểm tra đã mua chưa
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
     * Khởi tạo Shop Scene
     * TODO: Implement initialization
     * - Load player coins từ DataManager
     * - Hiển thị danh sách items
     * - Hiển thị items đã mua (disable hoặc mark as owned)
     * - Hiển thị giá và số coins hiện có
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
     * Tạo UI cho shop
     * TODO: Implement shop UI creation
     * - Hiển thị coins counter
     * - Tạo item cards cho mỗi item trong ShopItems
     * - Hiển thị giá, icon, description
     * - Mark items đã mua
     */
    createShopUI() {
        // TODO: Create shop items display
        // Object.values(ShopItems).forEach(item => {
        //     const isPurchased = this.gameEngine.getDataManager().hasPurchasedItem(item.id);
        //     this.createShopItemCard(item, isPurchased);
        // });
    }

    /**
     * Tạo card cho một shop item
     * @param {object} item 
     * @param {boolean} isPurchased 
     * TODO: Implement item card creation
     */
    createShopItemCard(item, isPurchased) {
        // TODO: Create card với:
        // - Item icon
        // - Item name
        // - Item description
        // - Price (hoặc "Owned" nếu đã mua)
        // - Buy button (disabled nếu đã mua hoặc không đủ coins)
    }

    /**
     * Xử lý mua item
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
        
        // TODO: Apply item effect (nếu là upgrade)
        // this.applyItemEffect(itemId);
        
        // TODO: Save data
        // this.gameEngine.getDataManager().saveAll();
        
        // TODO: Update UI
        // this.updateShopUI();
    }

    /**
     * Áp dụng effect của item đã mua
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
