<template>
  <div id="hints-board">
    <div class="hints">
      <Hint v-for="(n, i) in maxNumAttempts" :key="i" :index="i" />
    </div>
  </div>
</template>

<script setup>
import Hint from "./Hint";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const maxNumAttempts = computed(() => store.state.game.maxNumAttempts);
</script>

<style lang="scss" scoped>
@import "../scss/variables";

#hints-board {
  display: flex;
  flex-direction: column-reverse;
  width: 10%;
  max-width: 70px;
  margin-left: 4px;

  .hints {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    background-color: $bg-color;
    border-radius: 8px;
  }
}
</style>
