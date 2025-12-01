// Quản lý các state của game

import { GameState } from '../utils/Constants.js';

export class GameStateManager {
    constructor() {
        this.currentState = GameState.LOADING;
        this.previousState = null;
        this.stateListeners = new Map();
        
        this.scenes = {
            loading: null,
            mainMenu: null,
            gameplay: null,
            gameOver: null
        };
    }

    // Chuyển đổi state
    changeState(newState, data = {}) {
        if (!Object.values(GameState).includes(newState)) {
            console.error('Invalid state:', newState);
            return;
        }
        
        this.previousState = this.currentState;
        this.currentState = newState;
        
        this.notifyStateChange(newState, data);
    }

    // Thêm listener cho state change
    onStateChange(state, callback) {
        if (!this.stateListeners.has(state)) {
            this.stateListeners.set(state, []);
        }
        this.stateListeners.get(state).push(callback);
    }

    // Thông báo state change cho các listeners
    notifyStateChange(state, data) {
        const listeners = this.stateListeners.get(state);
        if (listeners) {
            listeners.forEach(callback => callback(data));
        }
    }

    // Lấy state hiện tại
    getCurrentState() {
        return this.currentState;
    }

    // Kiểm tra có đang ở state nào đó không
    isState(state) {
        return this.currentState === state;
    }

    // Quay lại state trước đó
    goBack() {
        if (this.previousState) {
            this.changeState(this.previousState);
        }
    }

    // Đăng ký scene manager
    registerScene(sceneName, sceneInstance) {
        this.scenes[sceneName] = sceneInstance;
    }

    // Lấy scene instance
    getScene(sceneName) {
        return this.scenes[sceneName];
    }

    // Tạm dừng game
    pause() {
        if (this.currentState === GameState.GAMEPLAY) {
            this.previousState = this.currentState;
            this.changeState(GameState.PAUSED);
        }
    }

    // Tiếp tục game
    resume() {
        if (this.currentState === GameState.PAUSED) {
            this.changeState(this.previousState || GameState.GAMEPLAY);
        }
    }
}
