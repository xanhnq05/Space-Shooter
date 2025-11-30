/**
 * ============================================
 * GAMESTATEMANAGER.JS
 * ============================================
 * 
 * Qu?n l� c�c state c?a game
 * Chuy?n ??i gi?a c�c scene: Menu -> Level Select -> Gameplay -> Game Over
 * Qu?n l� lu?ng game logic
 */

import { GameState } from '../utils/Constants.js';

export class GameStateManager {
    constructor() {
        this.currentState = GameState.LOADING;
        this.previousState = null;
        this.stateListeners = new Map(); // Callbacks khi state thay ??i
        
        // Reference ??n c�c scene managers
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
     * Chuy?n ??i state
     * @param {string} newState - State m?i t? GameState constants
     * @param {object} data - D? li?u truy?n v�o state m?i (optional)
     * TODO: Implement state transition
     * - Validate state h?p l?
     * - L?u previousState
     * - G?i exit callback c?a state c?
     * - G?i enter callback c?a state m?i
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
     * Th�m listener cho state change
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
     * Th�ng b�o state change cho c�c listeners
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
     * L?y state hi?n t?i
     * @returns {string}
     */
    getCurrentState() {
        return this.currentState;
    }

    /**
     * Ki?m tra c� ?ang ? state n�o ?� kh�ng
     * @param {string} state 
     * @returns {boolean}
     */
    isState(state) {
        return this.currentState === state;
    }

    /**
     * Quay l?i state tr??c ?�
     * TODO: Implement go back to previous state
     */
    goBack() {
        // TODO: Return to previousState if exists
        // if (this.previousState) {
        //     this.changeState(this.previousState);
        // }
    }

    /**
     * ??ng k� scene manager
     * @param {string} sceneName 
     * @param {object} sceneInstance 
     */
    registerScene(sceneName, sceneInstance) {
        this.scenes[sceneName] = sceneInstance;
    }

    /**
     * L?y scene instance
     * @param {string} sceneName 
     * @returns {object}
     */
    getScene(sceneName) {
        return this.scenes[sceneName];
    }

    /**
     * Pause game (t? gameplay)
     */
    pause() {
        if (this.currentState === GameState.GAMEPLAY) {
            this.previousState = this.currentState;
            this.changeState(GameState.PAUSED);
        }
    }

    /**
     * Resume game (t? paused)
     */
    resume() {
        if (this.currentState === GameState.PAUSED) {
            this.changeState(this.previousState || GameState.GAMEPLAY);
        }
    }
}
