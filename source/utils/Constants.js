/**
 * ============================================
 * CONSTANTS.JS
 * ============================================
 * 
 * Ch?a t?t c? c�c h?ng s? ???c s? d?ng trong game
 * Bao g?m: Game states, paths, configs, scoring system
 */

// ============================================
// GAME STATES
// ============================================
export const GameState = {
    LOADING: 'loading',
    MAIN_MENU: 'main_menu',
    LEVEL_SELECT: 'level_select',
    SHOP: 'shop',
    UPGRADE: 'upgrade',
    GAMEPLAY: 'gameplay',
    PAUSED: 'paused',
    GAME_OVER: 'game_over',
    VICTORY: 'victory'
};

// ============================================
// ASSET PATHS
// ============================================
export const AssetPaths = {
    // Player Ships
    PLAYER_SHIP: 'assets/Spaceship-2d-game-sprites/PNG/Ship_01/Ship_LVL_1.png',
    
    // Enemy Ships
    ENEMY_SHIP: 'assets/Enemy-spaceship-game-sprites/PNG/Ships/Ship_0',
    
    // Boss Ships
    BOSS_01: 'assets/Boss-spaceship-game-sprites/PNG/Boss_01',
    BOSS_02: 'assets/Boss-spaceship-game-sprites/PNG/Boss_02',
    BOSS_03: 'assets/Boss-spaceship-game-sprites/PNG/Boss_03',
    
    // Backgrounds
    BG_VERTICAL: 'assets/Space-vertical-game-backgrounds/PNG/Space_BG_01',
    BG_2D: 'assets/Space-shooter-2d-game-backgrounds/PNG/Space_BG_01',
    
    // UI Elements
    UI_MAIN_MENU: 'assets/Space-shooter-game-gui/PNG/Main_Menu',
    UI_BUTTONS: 'assets/Space-shooter-game-gui/PNG/Buttons',
    UI_SHOP: 'assets/Space-shooter-game-gui/PNG/Shop',
    UI_HUD: 'assets/Space-shooter-game-gui/PNG/Main_UI',
    
    // Effects
    EXPLOSION: 'assets/Spaceship-2d-game-sprites/PNG/Ship_01/Explosion',
    BOSS_ICONS: 'assets/Boss-spaceship-game-sprites/PNG/Boss_Icons'
};

// ============================================
// GAME CONFIGURATION
// ============================================
export const GameConfig = {
    // Camera Settings
    CAMERA: {
        FOV: 75,
        NEAR: 0.1,
        FAR: 1000,
        POSITION: { x: 0, y: 0, z: 15 },
        LOOK_AT: { x: 0, y: 0, z: 0 }
    },
    
    // Player Settings
    PLAYER: {
        SPEED: 0.3,
        START_HEALTH: 100,
        SHOOT_COOLDOWN: 300, // milliseconds
        BULLET_SPEED: 0.5
    },
    
    // Enemy Settings
    ENEMY: {
        SPAWN_INTERVAL: 2000, // milliseconds
        BASE_SPEED: 0.05,
        HEALTH: 1
    },
    
    // Boss Settings
    BOSS: {
        HEALTH: 1000,
        SPAWN_AT_LEVEL: 5, // Boss xu?t hi?n ? level 5
        ATTACK_PATTERNS: 3
    },
    
    // Background Settings
    BACKGROUND: {
        SCROLL_SPEED: 0.02,
        LAYER_COUNT: 4
    },
    
    // Scoring System
    SCORING: {
        ENEMY_KILL: 10,
        BOSS_KILL: 1000,
        LEVEL_BONUS: 100,
        PERFECT_CLEAR: 500
    },
    
    // Level Progression
    LEVEL: {
        SCORE_PER_LEVEL: 100, // C?n bao nhi�u ?i?m ?? l�n level
        DIFFICULTY_MULTIPLIER: 1.2 // Nh�n ?? kh� m?i level
    }
};

// ============================================
// UI CONFIGURATION
// ============================================
export const UIConfig = {
    // HUD Positions
    HUD: {
        SCORE_POSITION: 'top-left',
        HEALTH_POSITION: 'bottom-left',
        BOSS_ICON_POSITION: 'top-right',
        PAUSE_BUTTON_POSITION: 'top-right'
    },
    
    // Menu Settings
    MENU: {
        BUTTON_SPACING: 20,
        ANIMATION_DURATION: 300
    }
};

// ============================================
// STORAGE KEYS
// ============================================
export const StorageKeys = {
    PLAYER_DATA: 'space_shooter_player_data',
    SETTINGS: 'space_shooter_settings',
    HIGH_SCORE: 'space_shooter_high_score',
    UNLOCKED_LEVELS: 'space_shooter_unlocked_levels',
    PURCHASED_ITEMS: 'space_shooter_purchased_items'
};

// ============================================
// DIFFICULTY LEVELS
// ============================================
export const Difficulty = {
    EASY: {
        name: 'D?',
        enemySpeed: 0.8,
        enemySpawnRate: 1.5,
        playerHealth: 1.5
    },
    NORMAL: {
        name: 'B�nh th??ng',
        enemySpeed: 1.0,
        enemySpawnRate: 1.0,
        playerHealth: 1.0
    },
    HARD: {
        name: 'Kh�',
        enemySpeed: 1.5,
        enemySpawnRate: 0.7,
        playerHealth: 0.8
    }
};

// ============================================
// SHOP ITEMS
// ============================================
export const ShopItems = {
    SHIP_UPGRADE: {
        id: 'ship_upgrade',
        name: 'N�ng c?p t�u',
        price: 100,
        type: 'upgrade'
    },
    HEALTH_BOOST: {
        id: 'health_boost',
        name: 'T?ng m�u',
        price: 50,
        type: 'powerup'
    },
    REMOVE_ADS: {
        id: 'remove_ads',
        name: 'G? qu?ng c�o',
        price: 500,
        type: 'premium'
    }
};

// ============================================
// ANIMATION TIMINGS
// ============================================
export const AnimationTimings = {
    FADE_IN: 300,
    FADE_OUT: 300,
    BUTTON_HOVER: 150,
    SCENE_TRANSITION: 500
};
