<template>
  <div id="app">
    <Board />
    <HintsBoard />
    <CheckButton />
    <Picker />
    <RestartDialog />
  </div>
</template>

<script setup>
import Board from "./components/Board";
import HintsBoard from "./components/HintsBoard";
import CheckButton from "./components/CheckButton";
import Picker from "./components/Picker.vue";
import RestartDialog from "./components/RestartDialog.vue";
</script>

<style scoped>
#app {
  display: flex;
  justify-content: flex-start;
}
</style>
