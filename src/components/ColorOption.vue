<template>
  <div
    class="color-option"
    :style="optionBackground"
    :class="optionClass"
    @click="showPicker"
  ></div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  col: Number,
  row: Number,
});

const store = useStore();
const currentNumAttempt = computed(() => store.state.game.currentNumAttempt);
const availableColors = computed(() => store.state.game.availableColors);
const historyAttempts = computed(() => store.state.game.historyAttempts);
const solution = computed(() => store.state.game.solution);
const finished = computed(() => store.state.game.finished);

const showPicker = (e) => {
  if (props.col === currentNumAttempt.value) {
    store.dispatch("showPickerAction", {
      x: e.clientX,
      y: e.clientY,
      index: props.row,
    });
  }
};

const optionBackground = computed(() => {
  let ret = "background-color: ";
  if (
    historyAttempts.value[props.col] &&
    historyAttempts.value[props.col][props.row] !== -1
  ) {
    ret += availableColors.value[historyAttempts.value[props.col][props.row]];
  } else if (finished.value !== -1 && props.col === undefined) {
    // If we have not passed a col this is solution
    ret += availableColors.value[solution.value[props.row]];
  } else {
    ret += "grey";
  }
  return ret;
});

const optionClass = computed(() =>
  currentNumAttempt.value === props.col ? "available" : "disabled"
);
</script>

<style lang="scss" scoped>
.color-option {
  height: 40px;
  width: 40px;
  border-radius: 50%;

  &.available {
    &:hover {
      cursor: pointer;
    }
  }

  &.disabled {
    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
