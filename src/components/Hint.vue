<template>
  <div class="hint" :class="hintClass">
    <div
      class="hint-color"
      v-for="(n, i) in solutionLenght"
      :key="i"
      :style="hintBackground(i)"
      :class="hintClass"
    ></div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";
import ColorOption from "./ColorOption";

const props = defineProps({
  index: Number,
});

const store = useStore();
const currentNumAttempt = computed(() => store.state.game.currentNumAttempt);
const solutionLenght = computed(() => store.state.game.solutionLenght);
const historyHints = computed(() => store.state.game.historyHints);
const finished = computed(() => store.state.game.finished);

const hintClass = computed(() =>
  props.index > currentNumAttempt.value - 1 && finished.value === -1
    ? "hide"
    : "active"
);

const hintBackground = (row) => {
  let ret = "background-color: ";
  if (
    historyHints.value[props.index] &&
    historyHints.value[props.index][row] !== -1
  ) {
    ret += historyHints.value[props.index][row] === 1 ? "black" : "red";
  } else {
    ret += "grey";
  }
  return ret;
};
</script>

<style lang="scss" scoped>
.hint {
  display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
  padding: 4px;
  margin: 4px 0;
  height: 40px;

  &.active {
    opacity: 1;
  }

  &.hide {
    opacity: 0.2;
  }

  .hint-color {
    border-radius: 50%;
    height: 15px;
    width: 15px;
    margin: 1px;
  }
}
</style>
