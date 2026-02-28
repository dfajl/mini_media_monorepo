<script setup lang="ts">
type LoaderSize = 'sm' | 'md' | 'lg';

withDefaults(
  defineProps<{
    size?: LoaderSize;
    label?: string;
  }>(),
  {
    size: 'md',
    label: 'Loading',
  },
);
</script>

<template>
  <span class="ui-loader" :class="`ui-loader--${size}`" role="status" :aria-label="label" />
</template>

<style scoped>
.ui-loader {
  display: inline-block;
  border-radius: 999px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: ui-loader-spin 0.7s linear infinite;
}

.ui-loader--sm {
  width: 14px;
  height: 14px;
}

.ui-loader--md {
  width: 18px;
  height: 18px;
}

.ui-loader--lg {
  width: 22px;
  height: 22px;
}

@keyframes ui-loader-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
