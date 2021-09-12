import { createStore } from 'vuex'
import { Game } from '../classes/Game'

const MAX_NUM_ATTEMPTS = 10
const SOLUTION_LENGTH = 4
const AVAILABLE_COLORS = ['#F7DC6F', '#6E2C00', '#E67E22', '#E74C3C', '#0E6655', '#58D68D', '#5DADE2', '#1F618D', '#AF7AC5', '#5B2C6F', '#F7F9F9', '#17202A']

export default createStore({
  state: {
    game: new Game(MAX_NUM_ATTEMPTS, SOLUTION_LENGTH, AVAILABLE_COLORS),
    currentColor: 0,  // index we are modifying
    pickerOffsetX: 0,
    pickerOffsetY: 0,
    pickerDisplay: false
  },
  mutations: {
    changeColor(state, payload) {
      state.game.changeColor(payload, state.currentColor)
      state.pickerDisplay = false;
    },
    showPicker(state, payload) {
      state.pickerOffsetX = payload.x;
      state.pickerOffsetY = payload.y;
      state.pickerDisplay = true;
      state.currentColor = payload.index;
    },
    closePicker(state) {
      state.pickerOffsetX = 0;
      state.pickerOffsetY = 0;
      state.pickerDisplay = false;
      state.currentColor = 0;
    },
    checkSolution(state) {
      state.game.checkSolution()
    },
    resetGame(state) {
      state.game = new Game(MAX_NUM_ATTEMPTS, SOLUTION_LENGTH, AVAILABLE_COLORS)
    }
  },
  actions: {
    changeColorAction({ commit }, payload) {
      commit('changeColor', payload)
    },
    showPickerAction({ commit }, payload) {
      commit('showPicker', payload)
    },
    closePickerAction({ commit }) {
      commit('closePicker')
    },
    checkSolutionAction({ commit }) {
      commit('checkSolution')
    },
    resetGameAction({ commit }) {
      commit('resetGame')
    }
  },
  modules: {
  }
})
