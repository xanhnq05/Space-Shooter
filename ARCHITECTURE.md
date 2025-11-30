# ?? Space Shooter Game - Architecture Documentation

## ?? C?u tr�c th? m?c

```
js/
??? core/                    # Core systems
?   ??? Camera.js           # Camera management (? ?� SETUP)
?   ??? GameEngine.js       # Main game engine, game loop
?   ??? SceneManager.js     # (Optional) Scene management
?
??? managers/               # Game managers
?   ??? DataManager.js      # Save/Load data (localStorage)
?   ??? GameStateManager.js # State management (menu, gameplay, etc.)
?   ??? AudioManager.js     # (Future) Sound management
?   ??? InputManager.js     # (Future) Input handling
?
??? scenes/                 # Game scenes
?   ??? BaseScene.js        # Base class cho t?t c? scenes
?   ??? MainMenuScene.js    # Main menu
?   ??? LevelSelectScene.js # Level selection
?   ??? ShopScene.js        # Shop ?? mua items
?   ??? UpgradeScene.js     # Upgrade ship stats
?   ??? GameplayScene.js    # Main gameplay
?   ??? GameOverScene.js    # Game over / Victory
?
??? ui/                     # UI system
?   ??? UIManager.js        # Qu?n l� t?t c? UI
?   ??? HUD.js              # HUD trong gameplay
?   ??? MenuUI.js           # (Future) Menu UI components
?   ??? ShopUI.js           # (Future) Shop UI components
?
??? game/                   # Game objects (s? t?o sau)
?   ??? Player.js           # Player ship
?   ??? Enemy.js            # Enemy ships
?   ??? Boss.js             # Boss enemies
?   ??? Bullet.js           # Bullets
?   ??? Background.js       # Scrolling background
?
??? data/                   # Data structures
?   ??? GameData.js         # (Future) Game data structures
?   ??? SaveData.js         # (Future) Save data format
?
??? utils/                  # Utilities
?   ??? Constants.js        # Game constants, configs
?   ??? Helpers.js          # Helper functions
?
??? main.js                 # Entry point
```

## ?? Lu?ng game (Game Flow)

```
1. LOADING
   ?
2. MAIN_MENU
   ??? Play ? LEVEL_SELECT
   ??? Shop ? SHOP
   ??? Upgrade ? UPGRADE
   ??? Settings ? (Overlay)
   ?
3. LEVEL_SELECT
   ??? Select Level ? GAMEPLAY
   ?
4. GAMEPLAY
   ??? Pause ? PAUSED
   ?   ??? Resume ? GAMEPLAY
   ?   ??? Restart ? GAMEPLAY (restart)
   ?   ??? Quit ? MAIN_MENU
   ?
   ??? Player Dies ? GAME_OVER
   ??? Boss Defeated ? GAME_OVER (Victory)
   ?
5. GAME_OVER
   ??? Play Again ? GAMEPLAY (same level)
   ??? Main Menu ? MAIN_MENU
```

## ?? Nhi?m v? t?ng file

### Core Systems

#### `Camera.js` ?
- **Nhi?m v?**: Setup v� qu?n l� Three.js Camera
- **?� implement**: Camera initialization v?i config t? Constants
- **TODO**: Camera shake effects, dynamic positioning

#### `GameEngine.js`
- **Nhi?m v?**: 
  - Kh?i t?o Three.js Scene, Renderer
  - Qu?n l� game loop
  - Load/unload scenes
  - Handle window resize
- **TODO**: Implement t?t c? methods

### Managers

#### `DataManager.js`
- **Nhi?m v?**:
  - L?u/Load player data (localStorage)
  - Qu?n l� high scores
  - Qu?n l� unlocked levels
  - Qu?n l� purchased items
  - Qu?n l� settings
- **TODO**: Implement localStorage operations

#### `GameStateManager.js`
- **Nhi?m v?**:
  - Qu?n l� state transitions
  - Register scene instances
  - Handle state change callbacks
  - Pause/Resume logic
- **TODO**: Implement state change logic

### Scenes

#### `BaseScene.js`
- **Nhi?m v?**: Base class cho t?t c? scenes
- **Interface**: `init()`, `update()`, `cleanup()`, `onResize()`

#### `MainMenuScene.js`
- **Nhi?m v?**:
  - Hi?n th? main menu UI
  - Handle button clicks (Play, Shop, Settings)
  - Show high score
- **TODO**: Implement UI creation, event handlers

#### `LevelSelectScene.js`
- **Nhi?m v?**:
  - Hi?n th? danh s�ch levels
  - Show lock/unlock status
  - Show stars rating
  - Start gameplay v?i level ???c ch?n
- **TODO**: Implement level cards, selection logic

#### `ShopScene.js`
- **Nhi?m v?**:
  - Hi?n th? shop items
  - Handle purchases
  - Check coins balance
  - Apply item effects
- **TODO**: Implement shop UI, purchase logic

#### `UpgradeScene.js`
- **Nhi?m v?**:
  - Hi?n th? upgrade options (damage, speed, health, fire rate)
  - Show current level v� cost
  - Handle upgrades
  - Calculate stat values
- **TODO**: Implement upgrade UI, upgrade logic

#### `GameplayScene.js`
- **Nhi?m v?**:
  - Qu?n l� player, enemies, boss
  - Spawn enemies theo timer
  - Handle collisions
  - Update score
  - Check game over conditions
- **TODO**: Implement to�n b? gameplay logic

#### `GameOverScene.js`
- **Nhi?m v?**:
  - Hi?n th? final score, stats
  - Calculate stars rating
  - Show Play Again, Main Menu buttons
- **TODO**: Implement game over UI, rating calculation

### UI System

#### `UIManager.js`
- **Nhi?m v?**:
  - Qu?n l� t?t c? UI screens
  - Show/hide screens
  - Update HUD
  - Handle UI events
- **TODO**: Implement screen management, HUD updates

#### `HUD.js`
- **Nhi?m v?**:
  - Update score display
  - Update health bar
  - Update level display
  - Show/hide boss icon v� health bar
- **TODO**: Implement HUD updates

### Utils

#### `Constants.js` ?
- **Nhi?m v?**: Ch?a t?t c? constants, configs
- **?� implement**: Game states, asset paths, configs, scoring

## ?? H? th?ng l?u d? li?u

### Data ???c l?u (localStorage):

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

## ?? Gameplay Features

### Player
- Di chuy?n: WASD / Arrow keys
- B?n: Space
- Health system
- Upgrades: damage, speed, health, fire rate

### Enemies
- Spawn theo timer (t?ng d?n theo level)
- Nhi?u lo?i enemy
- Drop items khi b? ti�u di?t

### Boss
- Xu?t hi?n m?i 5 levels
- Health bar ri�ng
- Warning icon tr??c khi spawn
- Nhi?u attack patterns

### Scoring
- Enemy kill: 10 points
- Boss kill: 1000 points
- Level bonus: 100 points
- Perfect clear: 500 points

### Level Progression
- M?i 100 points = level up
- Difficulty t?ng theo level
- Boss spawn m?i 5 levels

## ?? UI Elements

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
- Boss icon (top-right, khi boss s?p spawn)
- Boss health bar (top, khi c� boss)
- Pause button (top-right)

### Game Over
- Final score
- Stats (level, kills, time)
- Stars (1-3)
- Play Again button
- Main Menu button

## ?? Implementation Order

1. ? **Constants.js** - ??nh ngh?a constants
2. ? **Camera.js** - Setup camera
3. ? **GameEngine.js** - Core engine
4. ? **DataManager.js** - Save/load system
5. ? **GameStateManager.js** - State management
6. ? **BaseScene.js** - Base scene class
7. ? **MainMenuScene.js** - Main menu
8. ? **UIManager.js** - UI system
9. ? **GameplayScene.js** - Gameplay
10. ? **LevelSelectScene.js** - Level selection
11. ? **ShopScene.js** - Shop
12. ? **UpgradeScene.js** - Upgrades
13. ? **GameOverScene.js** - Game over
14. ? **main.js** - Entry point v� wiring

## ?? Notes

- T?t c? files ?� c� structure v� comments chi ti?t
- M?i file c� TODO comments cho ph?n c?n implement
- Camera ?� ???c setup ho�n ch?nh
- Constants ?� ???c ??nh ngh?a ??y ??
- C?n implement c�c ph?n TODO ?? game ho?t ??ng
