<template>
  <div id="board">
    <Attempt class="solution"/>
    <div class="attempts">
      <Attempt v-for="(n, i) in maxNumAttempts" :key="i" :index="i" />
    </div>
  </div>
</template>

<script setup>
import Attempt from "./Attempt";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const maxNumAttempts = computed(() => store.state.game.maxNumAttempts);
</script>

<style lang="scss" scoped>
@import "../scss/variables";

#board {
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 300px;
  background-color: $bg-color;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 0 6px 0 $bg-color;

  .attempts {
    display: flex;
    flex-direction: column-reverse;
  }

  .solution {
    padding: 6px;
    background-color: $bg-color-solution;
    border-radius: 8px;
  }
}
</style>
