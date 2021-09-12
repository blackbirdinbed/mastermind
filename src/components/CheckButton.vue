<template>
  <div id="check-button">
    <button @click.prevent="checkSolution" :disabled="buttonDisabled">
      Check
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const currentAttempt = computed(() => store.state.game.currentAttempt);
const checkSolution = () => store.dispatch("checkSolutionAction");

const buttonDisabled = computed(() => 
  currentAttempt.value.includes(-1) ? true : false
);
</script>

<style lang="scss" scoped>
@import "../scss/variables";

#check-button {
  display: flex;
  flex-direction: column-reverse;
  padding: 4px;
  margin-left: 10px;
  width: 10%;
  max-width: 100px;

  button {
    background-color: $btn-color;
    border: none;
    border-radius: 8px;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    padding: 8px;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
