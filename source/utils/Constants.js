// Chứa tất cả các hằng số được sử dụng trong game

export const GameState = {
    LOADING: 'loading',
    MAIN_MENU: 'main_menu',
    GAMEPLAY: 'gameplay',
    PAUSED: 'paused',
    GAME_OVER: 'game_over'
};

export const AssetPaths = {
    PLAYER_SHIP: 'assets/Spaceship-2d-game-sprites/PNG/Ship_01/Ship_LVL_1.png',
    ENEMY_SHIP: 'assets/Enemy-spaceship-game-sprites/PNG/Ships/Ship_0',
    BOSS_01: 'assets/Boss-spaceship-game-sprites/PNG/Boss_01',
    BOSS_02: 'assets/Boss-spaceship-game-sprites/PNG/Boss_02',
    BOSS_03: 'assets/Boss-spaceship-game-sprites/PNG/Boss_03',
    BG_VERTICAL: 'assets/Space-vertical-game-backgrounds/PNG/Space_BG_01',
    BG_2D: 'assets/Space-shooter-2d-game-backgrounds/PNG/Space_BG_01',
    UI_MAIN_MENU: 'assets/Space-shooter-game-gui/PNG/Main_Menu',
    UI_BUTTONS: 'assets/Space-shooter-game-gui/PNG/Buttons',
    UI_HUD: 'assets/Space-shooter-game-gui/PNG/Main_UI',
    EXPLOSION: 'assets/Spaceship-2d-game-sprites/PNG/Ship_01/Explosion',
    BOSS_ICONS: 'assets/Boss-spaceship-game-sprites/PNG/Boss_Icons'
};

export const GameConfig = {
    CAMERA: {
        FOV: 75,
        NEAR: 0.1,
        FAR: 1000,
        POSITION: { x: 0, y: 0, z: 15 },
        LOOK_AT: { x: 0, y: 0, z: 0 }
    },
    
    PLAYER: {
        SPEED: 0.3,
        START_HEALTH: 100,
        SHOOT_COOLDOWN: 50, // Giảm cooldown để bắn nhanh hơn (100ms interval)
        BULLET_SPEED: 0.02,
        BULLET_DAMAGE: 1,
        MOVEMENT_SENSITIVITY: 0.01,
        MOVEMENT_LERP_SPEED: 0.1, // Tốc độ lerp khi di chuyển player
        TRANSITION_SPEED: 0.01 // Tốc độ bay lên khi chuyển map (chậm hơn để mượt mà)
    },
    
    ENEMY: {
        SPAWN_INTERVAL: 2000,
        BASE_SPEED: 0.05,
        BASE_HEALTH: 5, // Máu ban đầu của enemy
        HEALTH_INCREASE_RATE: 0.2, // Tăng 20% máu mỗi lần xuất hiện
        ATTACK_SPEED: 0.01, // Tốc độ tấn công của enemy
        RETURN_SPEED: 0.015, // Tốc độ quay lại vị trí ban đầu
        MOVE_DOWN_SPEED: 0.015 // Tốc độ bay xuống ban đầu
    },
    
    BOSS: {
        BASE_HEALTH: 500, // Máu ban đầu của boss
        HEALTH_INCREASE_RATE: 0.5, // Tăng 50% máu mỗi lần xuất hiện
        SPAWN_AT_LEVEL: 3, // Boss xuất hiện mỗi 3 wave
        ATTACK_PATTERNS: 3
    },
    
    BACKGROUND: {
        SCROLL_SPEED: 0.001, // Giảm tốc độ scroll để người chơi có thể tiêu diệt quái
        TRANSITION_SCROLL_MULTIPLIER: 2, // Tăng tốc scroll khi transition (x2)
        LAYER_COUNT: 4
    },
    
    SCORING: {
        ENEMY_KILL: 10,
        BOSS_KILL: 1000,
        LEVEL_BONUS: 100,
        PERFECT_CLEAR: 500
    },
    
    LEVEL: {
        SCORE_PER_LEVEL: 100,
        DIFFICULTY_MULTIPLIER: 1.2
    }
};

export const UIConfig = {
    HUD: {
        SCORE_POSITION: 'top-left',
        HEALTH_POSITION: 'bottom-left',
        BOSS_ICON_POSITION: 'top-right',
        PAUSE_BUTTON_POSITION: 'top-right'
    },
    
    MENU: {
        BUTTON_SPACING: 20,
        ANIMATION_DURATION: 300
    }
};

export const StorageKeys = {
    PLAYER_DATA: 'space_shooter_player_data',
    SETTINGS: 'space_shooter_settings',
    HIGH_SCORE: 'space_shooter_high_score'
};

export const Difficulty = {
    EASY: {
        name: 'Dễ',
        enemySpeed: 0.8,
        enemySpawnRate: 1.5,
        playerHealth: 1.5
    },
    NORMAL: {
        name: 'Bình thường',
        enemySpeed: 1.0,
        enemySpawnRate: 1.0,
        playerHealth: 1.0
    },
    HARD: {
        name: 'Khó',
        enemySpeed: 1.5,
        enemySpawnRate: 0.7,
        playerHealth: 0.8
    }
};

export const AnimationTimings = {
    FADE_IN: 300,
    FADE_OUT: 300,
    BUTTON_HOVER: 150,
    SCENE_TRANSITION: 500
};
