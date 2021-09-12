<template>
  <div class="attempt" :class="attemptClass">
    <ColorOption
      v-for="(n, i) in solutionLenght"
      :key="i"
      :col="index"
      :row="i"
    />
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

const attemptClass = computed(() =>
  props.index > currentNumAttempt.value ? "hide" : "active"
);
</script>

<style lang="scss" scoped>
.attempt {
  display: flex;
  justify-content: space-between;
  padding: 4px;
  margin: 4px 0;

  &.active {
    opacity: 1;
  }

  &.hide {
    opacity: 0.2;
  }
}
</style>
