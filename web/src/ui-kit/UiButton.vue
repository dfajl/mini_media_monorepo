<script setup lang="ts">
import UiLoader from './UiLoader.vue';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
);
</script>

<template>
  <button
    class="ui-button"
    :class="[`ui-button--${variant}`, { 'ui-button--full': fullWidth }]"
    :type="type"
    :disabled="disabled || loading"
  >
    <UiLoader v-if="loading" size="sm" class="ui-button__loader" label="Loading button state" />
    <span><slot /></span>
  </button>
</template>

<style scoped>
.ui-button {
  height: 44px;
  border: 0;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.15s ease, color 0.15s ease, transform 0.15s ease, opacity 0.15s ease;
}

.ui-button--full {
  width: 100%;
}

.ui-button--primary {
  background-color: #4f46e5;
  color: #ffffff;
}

.ui-button--primary:hover:not(:disabled) {
  background-color: #4338ca;
  transform: translateY(-1px);
}

.ui-button--secondary {
  background-color: #e5e7eb;
  color: #111827;
}

.ui-button--secondary:hover:not(:disabled) {
  background-color: #d1d5db;
}

.ui-button--ghost {
  background-color: transparent;
  color: #4f46e5;
  border: 1px solid #c7d2fe;
}

.ui-button--ghost:hover:not(:disabled) {
  background-color: #eef2ff;
}

.ui-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.ui-button__loader {
  color: currentColor;
}
</style>
