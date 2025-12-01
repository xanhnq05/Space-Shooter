// Loading Scene - hiển thị loading bar khi game đang tải

import { BaseScene } from './BaseScene.js';
import { GameState } from '../utils/Constants.js';

export class LoadingScene extends BaseScene {
    constructor(gameEngine) {
        super();
        this.gameEngine = gameEngine;
        
        this.loadingProgress = 0;
        this.loadingDuration = 500;
        this.loadingStartTime = 0;
        this.isComplete = false;
        
        // DOM elements
        this.loadingScreen = null;
        this.loadingBarContainer = null;
        this.loadingBarStart = null;
        this.loadingBarMiddle = null;
        this.loadingBarEnd = null;
        this.loadingText = null;
        this.loadingProgressText = null;
        
        this.loadingBarStartImage = 'assets/Space-shooter-game-gui/PNG/Loading_Bar/Loading_Bar_3_1.png';
        this.loadingBarMiddleImage = 'assets/Space-shooter-game-gui/PNG/Loading_Bar/Loading_Bar_3_2.png';
        this.loadingBarEndImage = 'assets/Space-shooter-game-gui/PNG/Loading_Bar/Loading_Bar_3_3.png';
        
        this.startEndWidth = 0;
    }

    /**
     * Khởi tạo Loading Scene
     * @param {THREE.Scene} scene - Three.js scene
     * @param {THREE.Camera} camera - Three.js camera
     * @param {object} data - Dữ liệu truyền vào (optional)
     */
    init(scene, camera, data = {}) {
        super.init(scene, camera, data);
        
        // Get DOM elements
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingText = document.getElementById('loading-text');
        
        this.loadingProgress = 0;
        this.loadingStartTime = performance.now();
        this.isComplete = false;
        
        if (this.loadingScreen) {
            this.loadingScreen.classList.remove('hidden');
        }
        
        this.initLoadingBar();
    }

    // Khởi tạo loading bar UI với 3 phần riêng biệt
    initLoadingBar() {
        if (!this.loadingBarContainer) {
            // Create loading bar container if it doesn't exist
            const loadingContainer = document.querySelector('.loading-container');
            if (loadingContainer) {
                // Remove old spinner if exists
                const oldSpinner = loadingContainer.querySelector('.loading-spinner');
                if (oldSpinner) {
                    oldSpinner.remove();
                }
                
                // Remove existing loading bar wrapper if exists
                const existingWrapper = loadingContainer.querySelector('.loading-bar-wrapper');
                if (existingWrapper) {
                    existingWrapper.remove();
                }
                
                // Create loading bar structure
                const barWrapper = document.createElement('div');
                barWrapper.className = 'loading-bar-wrapper';
                barWrapper.id = 'loading-bar-wrapper';
                
                const tableImg = document.createElement('img');
                tableImg.src = 'assets/Space-shooter-game-gui/PNG/Loading_Bar/Table.png';
                tableImg.className = 'loading-bar-table';
                tableImg.alt = 'Loading Bar Background';
                
                const barContainer = document.createElement('div');
                barContainer.className = 'loading-bar-container';
                barContainer.id = 'loading-bar-container';
                
                // Tạo 3 phần của loading bar
                // Phần đầu - cố định bên trái
                const barStart = document.createElement('div');
                barStart.className = 'loading-bar-start';
                barStart.id = 'loading-bar-start';
                barStart.style.backgroundImage = `url(${this.loadingBarStartImage})`;
                barStart.style.backgroundSize = 'auto 100%';
                barStart.style.backgroundRepeat = 'no-repeat';
                barStart.style.backgroundPosition = 'left center';
                barStart.style.height = '100%';
                barStart.style.display = 'none'; // Ẩn ban đầu, sẽ hiển thị khi có progress
                barStart.style.verticalAlign = 'top';
                barStart.style.margin = '0';
                barStart.style.padding = '0';
                barStart.style.border = 'none';
                barStart.style.position = 'relative'; // Đảm bảo nằm trong flow
                barStart.style.left = '0'; // Cố định bên trái
                
                // Phần giữa - sẽ scale từ trái sang phải, nối tiếp phần đầu
                const barMiddle = document.createElement('div');
                barMiddle.className = 'loading-bar-middle';
                barMiddle.id = 'loading-bar-middle';
                barMiddle.style.backgroundImage = `url(${this.loadingBarMiddleImage})`;
                barMiddle.style.backgroundSize = 'auto 100%';
                barMiddle.style.backgroundRepeat = 'repeat-x'; // Lặp lại theo chiều ngang để scale
                barMiddle.style.backgroundPosition = 'left center'; // Căn trái để nối với phần đầu
                barMiddle.style.height = '100%';
                barMiddle.style.width = '0px';
                barMiddle.style.display = 'none'; // Ẩn ban đầu
                barMiddle.style.verticalAlign = 'top';
                barMiddle.style.margin = '0';
                barMiddle.style.padding = '0';
                barMiddle.style.border = 'none';
                barMiddle.style.position = 'relative';
                
                // Phần cuối - chỉ hiển thị khi gần xong, nối tiếp phần giữa
                const barEnd = document.createElement('div');
                barEnd.className = 'loading-bar-end';
                barEnd.id = 'loading-bar-end';
                barEnd.style.backgroundImage = `url(${this.loadingBarEndImage})`;
                barEnd.style.backgroundSize = 'auto 100%';
                barEnd.style.backgroundRepeat = 'no-repeat';
                barEnd.style.backgroundPosition = 'left center'; // Căn trái để nối với phần giữa
                barEnd.style.height = '100%';
                barEnd.style.display = 'none'; // Ẩn ban đầu
                barEnd.style.verticalAlign = 'top';
                barEnd.style.margin = '0';
                barEnd.style.padding = '0';
                barEnd.style.border = 'none';
                barEnd.style.position = 'relative';
                
                barContainer.appendChild(barStart);
                barContainer.appendChild(barMiddle);
                barContainer.appendChild(barEnd);
                
                barWrapper.appendChild(tableImg);
                barWrapper.appendChild(barContainer);
                
                const progressText = document.createElement('div');
                progressText.className = 'loading-progress-text';
                progressText.id = 'loading-progress-text';
                progressText.textContent = '0%';
                barWrapper.appendChild(progressText);
                
                loadingContainer.appendChild(barWrapper);
                
                this.loadingBarContainer = barContainer;
                this.loadingBarStart = barStart;
                this.loadingBarMiddle = barMiddle;
                this.loadingBarEnd = barEnd;
                this.loadingProgressText = progressText;
                
                // Tính toán kích thước phần đầu và cuối sau khi image load
                this.calculateStartEndWidth();
            }
        }
    }

    // Tính toán kích thước của phần đầu và cuối
    calculateStartEndWidth() {
        if (this.loadingBarStart && this.loadingBarEnd && this.loadingBarContainer) {
            // Đợi một chút để container có kích thước
            setTimeout(() => {
                const startImg = new Image();
                startImg.onload = () => {
                    const containerHeight = this.loadingBarContainer.clientHeight || 20;
                    if (containerHeight > 0) {
                        const aspectRatio = startImg.width / startImg.height;
                        this.startEndWidth = containerHeight * aspectRatio;
                        
                        // Đảm bảo width không vượt quá container
                        const containerWidth = this.loadingBarContainer.clientWidth;
                        if (this.startEndWidth > containerWidth * 0.3) {
                            // Giới hạn tối đa 30% container width
                            this.startEndWidth = containerWidth * 0.3;
                        }
                    }
                };
                startImg.onerror = () => {
                    // Fallback nếu image không load được
                    this.startEndWidth = 20;
                };
                startImg.src = this.loadingBarStartImage;
                
                // Cũng tính cho phần cuối
                const endImg = new Image();
                endImg.onload = () => {
                    const containerHeight = this.loadingBarContainer.clientHeight || 20;
                    if (containerHeight > 0) {
                        const aspectRatio = endImg.width / endImg.height;
                        const endWidth = containerHeight * aspectRatio;
                        // Có thể lưu riêng nếu cần, hiện tại dùng chung
                        if (!this.startEndWidth) {
                            this.startEndWidth = endWidth;
                        }
                    }
                };
                endImg.onerror = () => {
                    if (!this.startEndWidth) {
                        this.startEndWidth = 20;
                    }
                };
                endImg.src = this.loadingBarEndImage;
            }, 100);
        }
    }

    // Cập nhật loading scene mỗi frame
    update(deltaTime) {
        if (this.isComplete) return;
        
        const currentTime = performance.now();
        const elapsed = currentTime - this.loadingStartTime;
        
        // Calculate progress (0 to 1)
        this.loadingProgress = Math.min(elapsed / this.loadingDuration, 1);
        
        // Update loading bar
        this.updateLoadingBar();
        
        // Update loading progress text
        if (this.loadingProgressText) {
            const percentage = Math.floor(this.loadingProgress * 100);
            this.loadingProgressText.textContent = `${percentage}%`;
        }
        
        // Check if loading is complete
        if (this.loadingProgress >= 1 && !this.isComplete) {
            this.onLoadingComplete();
        }
    }

    // Cập nhật loading bar visual
    updateLoadingBar() {
        if (!this.loadingBarContainer || !this.loadingBarStart || !this.loadingBarMiddle) return;
        
        const percentage = this.loadingProgress * 100;
        const containerWidth = this.loadingBarContainer.clientWidth;
        
        if (containerWidth === 0) return; // Chưa có kích thước
        
        const startWidth = this.startEndWidth || 20; // Fallback nếu chưa tính được
        const endWidth = this.startEndWidth || 20;
        
        // Tổng width cần = percentage% của container
        // Đảm bảo không vượt quá container width
        let totalNeededWidth = (containerWidth * percentage) / 100;
        totalNeededWidth = Math.min(totalNeededWidth, containerWidth); // Giới hạn tối đa
        
        // Quyết định có hiển thị phần cuối không (khi > 90% để có thời gian hiển thị)
        const showEnd = percentage > 90;
        
        // Logic: Chạy từ trái sang phải
        // Đảm bảo phần start luôn cố định bên trái
        if (totalNeededWidth <= 0) {
            // 0% - Không hiển thị gì
            this.loadingBarStart.style.display = 'none';
            this.loadingBarMiddle.style.display = 'none';
            this.loadingBarEnd.style.display = 'none';
        } else if (totalNeededWidth <= startWidth) {
            // Chỉ đủ cho phần đầu (0% - ~5%)
            this.loadingBarStart.style.display = 'inline-block';
            this.loadingBarStart.style.width = `${Math.min(totalNeededWidth, startWidth)}px`;
            this.loadingBarStart.style.left = '0'; // Đảm bảo cố định bên trái
            this.loadingBarStart.style.marginLeft = '0'; // Đảm bảo không có margin
            this.loadingBarMiddle.style.display = 'none';
            this.loadingBarEnd.style.display = 'none';
        } else if (!showEnd) {
            // Có phần đầu + giữa (chưa đến phần cuối)
            this.loadingBarStart.style.display = 'inline-block';
            this.loadingBarStart.style.width = `${startWidth}px`; // Cố định width phần đầu
            this.loadingBarStart.style.left = '0'; // Cố định bên trái
            this.loadingBarStart.style.marginLeft = '0'; // Đảm bảo không có margin
            const middleWidth = Math.min(totalNeededWidth - startWidth, containerWidth - startWidth);
            this.loadingBarMiddle.style.width = `${middleWidth}px`;
            this.loadingBarMiddle.style.display = middleWidth > 0 ? 'inline-block' : 'none';
            this.loadingBarEnd.style.display = 'none';
        } else {
            // Có đủ cả 3 phần (> 90%)
            this.loadingBarStart.style.display = 'inline-block';
            this.loadingBarStart.style.width = `${startWidth}px`; // Cố định width phần đầu
            this.loadingBarStart.style.left = '0'; // Cố định bên trái
            this.loadingBarStart.style.marginLeft = '0'; // Đảm bảo không có margin
            const remainingWidth = containerWidth - startWidth - endWidth;
            const middleWidth = Math.max(0, Math.min(totalNeededWidth - startWidth - endWidth, remainingWidth));
            this.loadingBarMiddle.style.width = `${middleWidth}px`;
            this.loadingBarMiddle.style.display = middleWidth > 0 ? 'inline-block' : 'none';
            this.loadingBarEnd.style.display = 'inline-block';
            this.loadingBarEnd.style.width = `${endWidth}px`; // Cố định width phần cuối
        }
    }

    // Xử lý khi loading hoàn thành
    onLoadingComplete() {
        this.isComplete = true;
        
        // Đảm bảo phần cuối được hiển thị
        if (this.loadingBarEnd) {
            this.loadingBarEnd.style.display = 'inline-block';
        }
        
        // Wait a bit before transitioning
        setTimeout(() => {
            // Transition to main menu (sẽ được enable khi MainMenuScene sẵn sàng)
            if (this.gameEngine) {
                const stateManager = this.gameEngine.getStateManager();
                if (stateManager) {
                    stateManager.changeState(GameState.MAIN_MENU);
                    console.log('Loading complete! Transitioning to main menu.');
                }
            }
        }, 500);
    }

    // Dọn dẹp
    cleanup() {
        super.cleanup();
        
        // Hide loading screen
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
        }
        
        this.loadingProgress = 0;
        this.isComplete = false;
    }

    // Xử lý khi window resize
    onResize() {
    }
}
