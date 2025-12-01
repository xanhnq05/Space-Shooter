# 🚀 Space Shooter Game

Game bắn tàu vũ trụ 2D được xây dựng bằng Three.js với chế độ chơi vô tận (Infinite Mode).

## 🎮 Hướng Dẫn Chơi

### Điều Khiển

- **Click chuột trái** hoặc **Di chuyển chuột** trên màn hình để khóa con trỏ và điều khiển tàu
- **Di chuyển chuột** (khi đã khóa) để di chuyển tàu
- **ESC** - Tạm dừng game / Mở menu tạm dừng
- **Đạn tự động bắn** - Không cần nhấn phím, đạn sẽ tự động bắn khi có enemy hoặc boss

### Cách Chơi

1. **Khởi động game**: Click vào màn hình để bắt đầu
2. **Khóa chuột**: Click vào canvas game để khóa con trỏ chuột và điều khiển tàu
3. **Di chuyển**: Di chuyển chuột để điều khiển tàu tránh đạn và enemy
4. **Tiêu diệt enemy**: Đạn tự động bắn, chỉ cần di chuyển để nhắm mục tiêu
5. **Đánh bại boss**: Mỗi 3 wave sẽ xuất hiện boss, tiêu diệt boss để tiếp tục
6. **Tạm dừng**: Nhấn ESC để tạm dừng và xem menu

### Tính Năng

- ✅ Chế độ vô tận với hệ thống wave
- ✅ 3 loại boss khác nhau
- ✅ 12 loại enemy (6 enemy thường + 6 pirate)
- ✅ Hệ thống điểm số
- ✅ Hiệu ứng âm thanh (bắn, nổ enemy, nổ boss)
- ✅ Animation mượt mà với Three.js
- ✅ Hệ thống máu và damage
- ✅ AI enemy tấn công player

## 🛠️ Công Nghệ Sử Dụng

- **Three.js** - 3D graphics library
- **JavaScript ES6+** - Modern JavaScript
- **HTML5 Canvas** - Rendering surface
- **Web Audio API** - Sound effects

## 📁 Cấu Trúc Project

```
Space-Shooter/
├── source/
│   ├── core/           # Core systems (GameEngine, Camera)
│   ├── scenes/         # Game scenes (Menu, Gameplay, etc.)
│   ├── managers/       # Game managers (State, Data, Background)
│   ├── helpers/        # Helper functions (Animations)
│   ├── ui/             # UI components
│   └── utils/          # Utilities (Constants)
├── assets/             # Game assets (sprites, backgrounds)
├── sfx/                # Sound effects
└── index.html          # Entry HTML file
```

## 🚀 Chạy Game

### Cài Đặt và Khởi Động

1. **Đặt thư mục dự án vào htdocs**
   - Đảm bảo thư mục `Space-Shooter` được đặt trong thư mục `htdocs` của XAMPP
   - Đường dẫn: `C:\xampp\htdocs\Space-Shooter\`

2. **Khởi động XAMPP**
   - Mở XAMPP Control Panel
   - Khởi động Apache (click nút "Start" bên cạnh Apache)

3. **Truy cập game**
   - Mở trình duyệt web (Chrome, Firefox, Edge, etc.)
   - Truy cập địa chỉ: `http://localhost/Space-Shooter/`

4. **Yêu cầu hệ thống**
   - Trình duyệt hỗ trợ WebGL
   - Khuyến nghị sử dụng Chrome, Firefox, hoặc Edge mới nhất

## 📝 Lưu Ý

- Game yêu cầu trình duyệt hỗ trợ WebGL
- Khuyến nghị sử dụng Chrome, Firefox, hoặc Edge mới nhất
- Để có trải nghiệm tốt nhất, sử dụng màn hình có độ phân giải 1920x1080 trở lên

## 🎯 Mục Tiêu Game

- Tiêu diệt càng nhiều enemy càng tốt
- Vượt qua các wave để gặp boss
- Đánh bại boss để tiếp tục chơi
- Đạt điểm số cao nhất có thể

## 🐛 Báo Lỗi

Nếu gặp lỗi hoặc có đề xuất, vui lòng tạo issue trong repository.

---

**Enjoy the game! 🎮**
