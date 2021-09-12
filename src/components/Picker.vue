<template>
  <div
    ref="target"
    class="picker"
    :style="pickerClass"
    v-if="pickerDisplay"
  >
    <div v-for="(color, index) in availableColors" :key="index">
      <div
        class="color"
        v-if="!currentAttempt.includes(index)"
        :style="pickerBackground(index)"
        @click="changeColor(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { onClickOutside } from '@vueuse/core'

const showed = ref(false);
const target = ref(null)

const store = useStore();
const currentAttempt = computed(() => store.state.game.currentAttempt);
const availableColors = computed(() => store.state.game.availableColors);
const pickerOffsetX = computed(() => store.state.pickerOffsetX);
const pickerOffsetY = computed(() => store.state.pickerOffsetY);
const pickerDisplay = computed(() => store.state.pickerDisplay);

const pickerClass = computed(
  (offset) => `top: ${pickerOffsetY.value}px; left: ${pickerOffsetX.value}px`
);

const pickerBackground = (index) =>
  `background-color: ${availableColors.value[index]}`;

const changeColor = (index) => store.dispatch("changeColorAction", index);


onClickOutside(target, () => store.dispatch("closePickerAction"))
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.picker {
  position: absolute;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 100px;
  width: 240px;
  background-color: $bg-white;
  padding: 6px;
  box-shadow: 0 0 6px 0 $bg-white;

  .color {
    border-radius: 4px;
    height: 30px;
    width: 30px;
    margin: 4px;
  }
}
</style>
