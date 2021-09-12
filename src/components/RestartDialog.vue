<template>
  <div class="dialog" v-if="finished !== -1">
    <p class="result">You {{ resultMsg }} the Game</p>
    <p class="question">Click on the button below to restart</p>
    <button @click="resetGame">Restart</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const finished = computed(() => store.state.game.finished);
const resetGame = () => store.dispatch("resetGameAction");

const resultMsg = computed(() => {
  let msg = "";
  switch (finished.value) {
    case 0:
      msg = "LOST";
      break;
    case 1:
      msg = "WON";
      break;
    default:
      break;
  }

  return msg;
});
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 250px;
  width: 400px;
  background-color: $bg-white;
  box-shadow: 0 0 6px 0 $bg-white;
  text-align: center;
  font-family: "Roboto", sans-serif;
	padding: 16px;

  .result {
    font-size: 32px;
  }

  .question {
    font-size: 24px;
  }

	button {
    background-color: $btn-color;
    border: none;
    border-radius: 8px;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    padding: 8px;
		width: 100px;
		margin: 4px auto;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
