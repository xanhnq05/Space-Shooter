# 🏗️ Space Shooter Game - Architecture Documentation

## 📋 Tổng Quan

Space Shooter là một game bắn tàu vũ trụ 2D được xây dựng bằng **Three.js**, một thư viện JavaScript mạnh mẽ để tạo và hiển thị đồ họa 3D trong trình duyệt. Mặc dù game là 2D, Three.js được sử dụng để tận dụng các tính năng như scene management, camera system, và rendering pipeline hiệu quả.

## 🎯 Three.js trong Project

### 1. **Scene Management** (`THREE.Scene`)
- **Vị trí**: `source/core/GameEngine.js`
- **Mục đích**: Quản lý tất cả các đối tượng 3D trong game
- **Sử dụng**:
  ```javascript
  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color(0x050d1f);
  ```
- **Lợi ích**: Tự động quản lý object hierarchy, culling, và rendering order

### 2. **Camera System** (`THREE.PerspectiveCamera`)
- **Vị trí**: `source/core/Camera.js`
- **Mục đích**: Định nghĩa góc nhìn và vị trí camera
- **Cấu hình**:
  ```javascript
  const camera = new THREE.PerspectiveCamera(
      GameConfig.CAMERA.FOV,      // 75 độ
      aspect,                     // Tỷ lệ màn hình
      GameConfig.CAMERA.NEAR,     // 0.1
      GameConfig.CAMERA.FAR       // 1000
  );
  ```
- **Lợi ích**: Dễ dàng điều chỉnh góc nhìn, zoom, và vị trí camera

### 3. **Renderer** (`THREE.WebGLRenderer`)
- **Vị trí**: `source/core/GameEngine.js`
- **Mục đích**: Render scene lên canvas HTML5
- **Cấu hình**:
  ```javascript
  this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: true 
  });
  ```
- **Lợi ích**: Tận dụng GPU acceleration, hiệu suất cao

### 4. **Mesh Objects** (`THREE.Mesh`)
- **Vị trí**: Sử dụng rộng rãi trong `GameplayScene.js`, `AnimationHelper.js`
- **Mục đích**: Đại diện cho các đối tượng game (player, enemy, bullet, boss)
- **Cấu trúc**:
  ```javascript
  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  ```
- **Sử dụng cho**:
  - Player ship
  - Enemy ships (12 loại)
  - Boss ships (3 loại)
  - Bullets (player và boss)
  - Explosion effects
  - Hit effects
  - Background layers

### 5. **Textures** (`THREE.TextureLoader`)
- **Vị trí**: `source/scenes/GameplayScene.js`, `source/helpers/AnimationHelper.js`
- **Mục đích**: Load và quản lý texture từ file PNG
- **Caching**: Sử dụng `Map` để cache texture, tránh load lại
  ```javascript
  if (!this.textureCache.has(path)) {
      const texture = this.textureLoader.load(path);
      textureCache.set(path, texture);
  }
  ```
- **Tối ưu**: 
  - `NearestFilter` cho pixel art style
  - `SRGBColorSpace` cho màu sắc chính xác
  - `flipY: false` để texture hiển thị đúng

### 6. **Geometry** (`THREE.PlaneGeometry`)
- **Mục đích**: Định nghĩa hình dạng 2D cho các sprite
- **Sử dụng**: Tất cả game objects đều dùng `PlaneGeometry` (2D plane)
  ```javascript
  new THREE.PlaneGeometry(width, height)
  ```

### 7. **Materials** (`THREE.MeshBasicMaterial`)
- **Mục đích**: Định nghĩa cách object được render
- **Tính năng sử dụng**:
  - `transparent: true` - Cho phép alpha channel
  - `side: THREE.DoubleSide` - Hiển thị cả 2 mặt
  - `depthWrite: false` - Tối ưu rendering cho 2D

### 8. **Vector Math** (`THREE.Vector2`, `THREE.Vector3`)
- **Mục đích**: Tính toán vị trí, khoảng cách, hướng
- **Sử dụng**:
  - Player movement
  - Collision detection
  - Bullet trajectory
  - Enemy AI pathfinding

## 🔄 Luồng Hoạt Động của Code

### 1. **Khởi Tạo** (`main.js`)

```
main.js
  └─> GameEngine.init()
      ├─> Tạo THREE.Scene
      ├─> Tạo THREE.PerspectiveCamera (từ Camera.js)
      ├─> Tạo THREE.WebGLRenderer
      └─> Khởi tạo GameStateManager
      
  └─> Tạo các Scene instances
      ├─> LoadingScene
      ├─> MainMenuScene
      ├─> GameplayScene
      └─> GameOverScene
      
  └─> Đăng ký scenes vào GameStateManager
  └─> Bắt đầu game loop
```

### 2. **Game Loop** (`GameEngine.js`)

```javascript
gameLoop(timestamp) {
    1. Tính deltaTime (thời gian giữa các frame)
    2. Gọi currentScene.update(deltaTime)
    3. Renderer.render(scene, camera)
    4. requestAnimationFrame(gameLoop)
}
```

### 3. **Gameplay Scene Flow** (`GameplayScene.js`)

```
init()
  ├─> Tạo player (THREE.Mesh)
  ├─> Setup input handlers
  ├─> Setup audio
  └─> Bắt đầu wave đầu tiên

update(deltaTime)
  ├─> removeDuplicatePlayerMeshes() - Đảm bảo chỉ có 1 player
  ├─> updatePlayerPosition() - Di chuyển player theo mouse
  ├─> moveEnemies(deltaTime) - AI và di chuyển enemy
  ├─> moveBoss(deltaTime) - Di chuyển và bắn boss
  ├─> checkCollisions() - Kiểm tra va chạm
  │   ├─> Bullet vs Enemy
  │   ├─> Bullet vs Boss
  │   ├─> Player vs Enemy
  │   ├─> Player vs Boss
  │   └─> Player vs Boss Bullet
  ├─> updateProjectiles(deltaTime) - Di chuyển đạn
  │   ├─> Player bullets
  │   ├─> Boss bullets
  │   ├─> Hit effects animation
  │   └─> Explosion effects animation
  ├─> checkWaveCompletion() - Kiểm tra hoàn thành wave
  └─> updateHUD() - Cập nhật UI

startWave()
  ├─> Hiển thị wave banner
  └─> spawnWaveEnemies() - Tạo 9 enemies

spawnWaveEnemies()
  ├─> Load texture từ cache
  ├─> Tính toán kích thước từ texture
  ├─> Tạo THREE.Mesh cho mỗi enemy
  ├─> Setup userData (health, position, AI state)
  └─> Thêm vào scene và enemies array

checkCollisions()
  ├─> Bullet vs Enemy
  │   ├─> Tính khoảng cách 2D
  │   ├─> Kiểm tra collision radius
  │   ├─> Giảm máu enemy
  │   ├─> Tạo hit effect (THREE.Mesh)
  │   ├─> Chuyển sang damaged texture khi < 30% máu
  │   └─> Tạo explosion khi máu <= 0
  ├─> Bullet vs Boss
  │   ├─> AABB collision detection
  │   └─> Giảm máu boss
  └─> Player vs Enemy/Boss/Bullet
      ├─> AABB collision detection
      └─> onPlayerDeath() nếu va chạm
```

### 4. **Animation System** (`AnimationHelper.js`)

```
createExplosionEffect()
  ├─> Load 9 frames texture (000-008)
  ├─> Tạo THREE.Mesh với frame đầu tiên
  ├─> Lưu frames vào userData.frameTextures
  └─> Animation được update trong updateProjectiles()

updateProjectiles()
  ├─> Kiểm tra thời gian từ lastFrameTime
  ├─> Chuyển sang frame tiếp theo
  ├─> Cập nhật material.map
  └─> Xóa effect khi hoàn thành animation
```

### 5. **State Management** (`GameStateManager.js`)

```
changeState(newState)
  ├─> Lưu previousState
  ├─> Cleanup scene cũ
  ├─> Init scene mới
  └─> Notify listeners

States:
  LOADING → MainMenuScene
  MAIN_MENU → GameplayScene
  GAMEPLAY → GameOverScene (khi chết/thắng)
  GAME_OVER → MainMenuScene hoặc GameplayScene
```

### 6. **Background System** (`BackgroundManager.js`)

```
create(texturePath)
  ├─> Load background texture
  ├─> Tạo 4 layers (THREE.Mesh) để parallax scrolling
  ├─> Mỗi layer scroll với tốc độ khác nhau
  └─> Tạo hiệu ứng chiều sâu

updateScroll(deltaTime, speed)
  ├─> Di chuyển các layers
  ├─> Reset position khi ra khỏi màn hình
  └─> Tạo vòng lặp vô tận
```

## 📊 Kiến Trúc Code

### **Separation of Concerns**

1. **Core Layer** (`core/`)
   - `GameEngine.js` - Game loop, rendering
   - `Camera.js` - Camera configuration

2. **Scene Layer** (`scenes/`)
   - `BaseScene.js` - Base class cho tất cả scenes
   - `GameplayScene.js` - Logic gameplay chính
   - `MainMenuScene.js`, `LoadingScene.js`, `GameOverScene.js` - UI scenes

3. **Manager Layer** (`managers/`)
   - `GameStateManager.js` - Quản lý state transitions
   - `DataManager.js` - Lưu/load data (localStorage)
   - `BackgroundManager.js` - Quản lý background scrolling

4. **Helper Layer** (`helpers/`)
   - `AnimationHelper.js` - Tạo animation effects

5. **UI Layer** (`ui/`)
   - `GameplayUIManager.js` - HUD, pause menu

6. **Utils Layer** (`utils/`)
   - `Constants.js` - Game configuration, constants

## 🎨 Three.js Features Được Sử Dụng

| Feature | Mục Đích | File |
|---------|----------|------|
| `THREE.Scene` | Quản lý object hierarchy | `GameEngine.js` |
| `THREE.PerspectiveCamera` | Góc nhìn game | `Camera.js` |
| `THREE.WebGLRenderer` | Render lên canvas | `GameEngine.js` |
| `THREE.Mesh` | Game objects | Tất cả scenes |
| `THREE.PlaneGeometry` | 2D sprites | Tất cả objects |
| `THREE.MeshBasicMaterial` | Material cho sprites | Tất cả objects |
| `THREE.TextureLoader` | Load PNG textures | `GameplayScene.js`, `AnimationHelper.js` |
| `THREE.Vector2/3` | Math calculations | Collision, movement |
| `renderOrder` | Z-ordering | Đảm bảo rendering đúng thứ tự |

## 🔧 Tối Ưu Hóa

1. **Texture Caching**: Cache tất cả textures để tránh load lại
2. **Object Pooling**: Có thể mở rộng để reuse objects
3. **Render Order**: Sử dụng `renderOrder` để tối ưu rendering
4. **Delta Time**: Sử dụng deltaTime cho frame-rate independent movement
5. **Geometry Reuse**: Có thể reuse geometry cho cùng loại object

## 📈 Performance Considerations

- **Mesh Count**: Giới hạn số lượng mesh trên scene
- **Texture Size**: Sử dụng texture có kích thước phù hợp
- **Animation**: Chỉ update animations khi cần thiết
- **Collision Detection**: Sử dụng AABB cho boss, distance-based cho enemy

## 🚀 Mở Rộng Tương Lai

- Particle System với `THREE.Points`
- Post-processing effects với `THREE.EffectComposer`
- 3D models với `THREE.GLTFLoader`
- Shader effects với custom materials
- Physics engine integration

---

**Tài liệu này mô tả kiến trúc và cách sử dụng Three.js trong Space Shooter Game.**
