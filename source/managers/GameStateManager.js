/**
 * ============================================
 * GAMESTATEMANAGER.JS
 * ============================================
 * 
 * Quản lý các state của game
 * Chuyển đổi giữa các scene: Menu -> Level Select -> Gameplay -> Game Over
 * Quản lý luồng game logic
 */

import { GameState } from '../utils/Constants.js';

export class GameStateManager {
    constructor() {
        this.currentState = GameState.LOADING;
        this.previousState = null;
        this.stateListeners = new Map(); // Callbacks khi state thay đổi
        
        // Reference đến các scene managers
        this.scenes = {
            mainMenu: null,
            levelSelect: null,
            shop: null,
            upgrade: null,
            gameplay: null,
            gameOver: null
        };
    }

    /**
     * Chuyển đổi state
     * @param {string} newState - State mới từ GameState constants
     * @param {object} data - Dữ liệu truyền vào state mới (optional)
     * TODO: Implement state transition
     * - Validate state hợp lệ
     * - Lưu previousState
     * - Gọi exit callback của state cũ
     * - Gọi enter callback của state mới
     * - Trigger state change event
     */
    changeState(newState, data = {}) {
        // TODO: Implement state change logic
        // if (!Object.values(GameState).includes(newState)) {
        //     console.error('Invalid state:', newState);
        //     return;
        // }
        // 
        // this.previousState = this.currentState;
        // this.currentState = newState;
        // 
        // // Trigger state change callbacks
        // this.notifyStateChange(newState, data);
    }

    /**
     * Thêm listener cho state change
     * @param {string} state 
     * @param {function} callback 
     */
    onStateChange(state, callback) {
        if (!this.stateListeners.has(state)) {
            this.stateListeners.set(state, []);
        }
        this.stateListeners.get(state).push(callback);
    }

    /**
     * Thông báo state change cho các listeners
     * @param {string} state 
     * @param {object} data 
     */
    notifyStateChange(state, data) {
        const listeners = this.stateListeners.get(state);
        if (listeners) {
            listeners.forEach(callback => callback(data));
        }
    }

    /**
     * Lấy state hiện tại
     * @returns {string}
     */
    getCurrentState() {
        return this.currentState;
    }

    /**
     * Kiểm tra có đang ở state nào đó không
     * @param {string} state 
     * @returns {boolean}
     */
    isState(state) {
        return this.currentState === state;
    }

    /**
     * Quay lại state trước đó
     * TODO: Implement go back to previous state
     */
    goBack() {
        // TODO: Return to previousState if exists
        // if (this.previousState) {
        //     this.changeState(this.previousState);
        // }
    }

    /**
     * Đăng ký scene manager
     * @param {string} sceneName 
     * @param {object} sceneInstance 
     */
    registerScene(sceneName, sceneInstance) {
        this.scenes[sceneName] = sceneInstance;
    }

    /**
     * Lấy scene instance
     * @param {string} sceneName 
     * @returns {object}
     */
    getScene(sceneName) {
        return this.scenes[sceneName];
    }

    /**
     * Pause game (từ gameplay)
     */
    pause() {
        if (this.currentState === GameState.GAMEPLAY) {
            this.previousState = this.currentState;
            this.changeState(GameState.PAUSED);
        }
    }

    /**
     * Resume game (từ paused)
     */
    resume() {
        if (this.currentState === GameState.PAUSED) {
            this.changeState(this.previousState || GameState.GAMEPLAY);
        }
    }
}
