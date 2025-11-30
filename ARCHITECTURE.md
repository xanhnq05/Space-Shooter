# 📋 Space Shooter Game - Architecture Documentation

## 📁 Cấu trúc thư mục

```
js/
├── core/                    # Core systems
│   ├── Camera.js           # Camera management (Đã SETUP)
│   ├── GameEngine.js       # Main game engine, game loop
│   └── SceneManager.js     # (Optional) Scene management
│
├── managers/               # Game managers
│   ├── DataManager.js      # Save/Load data (localStorage)
│   ├── GameStateManager.js # State management (menu, gameplay, etc.)
│   ├── AudioManager.js     # (Future) Sound management
│   └── InputManager.js     # (Future) Input handling
│
├── scenes/                 # Game scenes
│   ├── BaseScene.js        # Base class cho tất cả scenes
│   ├── MainMenuScene.js    # Main menu
│   ├── LevelSelectScene.js # Level selection
│   ├── ShopScene.js        # Shop để mua items
│   ├── UpgradeScene.js     # Upgrade ship stats
│   ├── GameplayScene.js    # Main gameplay
│   └── GameOverScene.js    # Game over / Victory
│
├── ui/                     # UI system
│   ├── UIManager.js        # Quản lý tất cả UI
│   ├── HUD.js              # HUD trong gameplay
│   ├── MenuUI.js           # (Future) Menu UI components
│   └── ShopUI.js           # (Future) Shop UI components
│
├── game/                   # Game objects (sẽ tạo sau)
│   ├── Player.js           # Player ship
│   ├── Enemy.js            # Enemy ships
│   ├── Boss.js             # Boss enemies
│   ├── Bullet.js           # Bullets
│   └── Background.js       # Scrolling background
│
├── data/                   # Data structures
│   ├── GameData.js         # (Future) Game data structures
│   └── SaveData.js         # (Future) Save data format
│
├── utils/                  # Utilities
│   ├── Constants.js        # Game constants, configs
│   └── Helpers.js          # Helper functions
│
└── main.js                 # Entry point
```

## 🔄 Luồng game (Game Flow)

```
1. LOADING
   │
2. MAIN_MENU
   ├── Play → LEVEL_SELECT
   ├── Shop → SHOP
   ├── Upgrade → UPGRADE
   └── Settings → (Overlay)
   │
3. LEVEL_SELECT
   └── Select Level → GAMEPLAY
   │
4. GAMEPLAY
   ├── Pause → PAUSED
   │   ├── Resume → GAMEPLAY
   │   ├── Restart → GAMEPLAY (restart)
   │   └── Quit → MAIN_MENU
   │
   ├── Player Dies → GAME_OVER
   └── Boss Defeated → GAME_OVER (Victory)
   │
5. GAME_OVER
   ├── Play Again → GAMEPLAY (same level)
   └── Main Menu → MAIN_MENU
```

## 📝 Nhiệm vụ từng file

### Core Systems

#### `Camera.js` ✅
- **Nhiệm vụ**: Setup và quản lý Three.js Camera
- **Đã implement**: Camera initialization với config từ Constants
- **TODO**: Camera shake effects, dynamic positioning

#### `GameEngine.js`
- **Nhiệm vụ**: 
  - Khởi tạo Three.js Scene, Renderer
  - Quản lý game loop
  - Load/unload scenes
  - Handle window resize
- **TODO**: Implement tất cả methods

### Managers

#### `DataManager.js`
- **Nhiệm vụ**:
  - Lưu/Load player data (localStorage)
  - Quản lý high scores
  - Quản lý unlocked levels
  - Quản lý purchased items
  - Quản lý settings
- **TODO**: Implement localStorage operations

#### `GameStateManager.js`
- **Nhiệm vụ**:
  - Quản lý state transitions
  - Register scene instances
  - Handle state change callbacks
  - Pause/Resume logic
- **TODO**: Implement state change logic

### Scenes

#### `BaseScene.js`
- **Nhiệm vụ**: Base class cho tất cả scenes
- **Interface**: `init()`, `update()`, `cleanup()`, `onResize()`

#### `MainMenuScene.js`
- **Nhiệm vụ**:
  - Hiển thị main menu UI
  - Handle button clicks (Play, Shop, Settings)
  - Show high score
- **TODO**: Implement UI creation, event handlers

#### `LevelSelectScene.js`
- **Nhiệm vụ**:
  - Hiển thị danh sách levels
  - Show lock/unlock status
  - Show stars rating
  - Start gameplay với level được chọn
- **TODO**: Implement level cards, selection logic

#### `ShopScene.js`
- **Nhiệm vụ**:
  - Hiển thị shop items
  - Handle purchases
  - Check coins balance
  - Apply item effects
- **TODO**: Implement shop UI, purchase logic

#### `UpgradeScene.js`
- **Nhiệm vụ**:
  - Hiển thị upgrade options (damage, speed, health, fire rate)
  - Show current level và cost
  - Handle upgrades
  - Calculate stat values
- **TODO**: Implement upgrade UI, upgrade logic

#### `GameplayScene.js`
- **Nhiệm vụ**:
  - Quản lý player, enemies, boss
  - Spawn enemies theo timer
  - Handle collisions
  - Update score
  - Check game over conditions
- **TODO**: Implement toàn bộ gameplay logic

#### `GameOverScene.js`
- **Nhiệm vụ**:
  - Hiển thị final score, stats
  - Calculate stars rating
  - Show Play Again, Main Menu buttons
- **TODO**: Implement game over UI, rating calculation

### UI System

#### `UIManager.js`
- **Nhiệm vụ**:
  - Quản lý tất cả UI screens
  - Show/hide screens
  - Update HUD
  - Handle UI events
- **TODO**: Implement screen management, HUD updates

#### `HUD.js`
- **Nhiệm vụ**:
  - Update score display
  - Update health bar
  - Update level display
  - Show/hide boss icon và health bar
- **TODO**: Implement HUD updates

### Utils

#### `Constants.js` ✅
- **Nhiệm vụ**: Chứa tất cả constants, configs
- **Đã implement**: Game states, asset paths, configs, scoring

## 💾 Hệ thống lưu dữ liệu

### Data được lưu (localStorage):

1. **Player Data** (`PLAYER_DATA`)
   - Total score
   - Total games played
   - Total kills
   - Highest level reached
   - Coins
   - Ship level
   - Upgrades (damage, speed, health, fire rate levels)

2. **Settings** (`SETTINGS`)
   - Volume
   - Music volume
   - Difficulty
   - Language
   - Show FPS

3. **High Score** (`HIGH_SCORE`)
   - Single number (highest score ever)

4. **Unlocked Levels** (`UNLOCKED_LEVELS`)
   - Array of level numbers [1, 2, 3...]

5. **Purchased Items** (`PURCHASED_ITEMS`)
   - Array of item IDs ['ship_upgrade', 'remove_ads'...]

## 🎮 Gameplay Features

### Player
- Di chuyển: WASD / Arrow keys
- Bắn: Space
- Health system
- Upgrades: damage, speed, health, fire rate

### Enemies
- Spawn theo timer (tăng dần theo level)
- Nhiều loại enemy
- Drop items khi bị tiêu diệt

### Boss
- Xuất hiện mỗi 5 levels
- Health bar riêng
- Warning icon trước khi spawn
- Nhiều attack patterns

### Scoring
- Enemy kill: 10 points
- Boss kill: 1000 points
- Level bonus: 100 points
- Perfect clear: 500 points

### Level Progression
- Mỗi 100 points = level up
- Difficulty tăng theo level
- Boss spawn mỗi 5 levels

## 🖥️ UI Elements

### Main Menu
- Logo
- Play button
- Shop button
- Upgrade button
- Settings button

### Level Select
- Level cards (1-10+)
- Lock/unlock status
- Stars rating
- Best score

### Shop
- Item cards
- Price display
- Coins counter
- Purchase buttons

### Upgrade
- Upgrade categories
- Current level / Max level
- Cost display
- Stat preview

### Gameplay HUD
- Score (top-left)
- Health bar (bottom-left)
- Level (top-left)
- Boss icon (top-right, khi boss sắp spawn)
- Boss health bar (top, khi có boss)
- Pause button (top-right)

### Game Over
- Final score
- Stats (level, kills, time)
- Stars (1-3)
- Play Again button
- Main Menu button

## 📋 Implementation Order

1. ✅ **Constants.js** - Định nghĩa constants
2. ✅ **Camera.js** - Setup camera
3. ✅ **GameEngine.js** - Core engine
4. ✅ **DataManager.js** - Save/load system
5. ✅ **GameStateManager.js** - State management
6. ✅ **BaseScene.js** - Base scene class
7. ✅ **MainMenuScene.js** - Main menu
8. ✅ **UIManager.js** - UI system
9. ✅ **GameplayScene.js** - Gameplay
10. ✅ **LevelSelectScene.js** - Level selection
11. ✅ **ShopScene.js** - Shop
12. ✅ **UpgradeScene.js** - Upgrades
13. ✅ **GameOverScene.js** - Game over
14. ⏳ **main.js** - Entry point và wiring

## 📌 Notes

- Tất cả files đã có structure và comments chi tiết
- Mỗi file có TODO comments cho phần cần implement
- Camera đã được setup hoàn chỉnh
- Constants đã được định nghĩa đầy đủ
- Cần implement các phần TODO để game hoạt động
