<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
  }>(),
  {
    label: '',
    disabled: false,
  },
);

const model = defineModel<boolean>({ required: true });
</script>

<template>
  <label class="ui-checkbox" :class="{ 'ui-checkbox--disabled': disabled }">
    <input
      class="ui-checkbox__input"
      type="checkbox"
      v-model="model"
      :disabled="disabled"
    />
    <span class="ui-checkbox__box" />
    <span class="ui-checkbox__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.ui-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  color: #4b5563;
  cursor: pointer;
}

.ui-checkbox--disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.ui-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.ui-checkbox__box {
  width: 18px;
  height: 18px;
  border: 1px solid #94a3b8;
  border-radius: 6px;
  background-color: #ffffff;
  display: inline-block;
  position: relative;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.ui-checkbox__input:focus-visible + .ui-checkbox__box {
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.ui-checkbox__input:checked + .ui-checkbox__box {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

.ui-checkbox__input:checked + .ui-checkbox__box::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.ui-checkbox__label {
  user-select: none;
}
</style>
