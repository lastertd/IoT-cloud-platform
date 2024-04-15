<template>
  <transition v-bind="props">
    <slot />
  </transition>
</template>

<script setup lang="ts">
import type { MyTransitionProps } from "./type";

const props = defineProps<MyTransitionProps>();
</script>

<style scoped lang="scss"></style>
