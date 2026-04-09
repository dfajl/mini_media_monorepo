<script setup lang="ts">
type SegmentOption<T extends string> = {
  value: T;
  label: string;
};

const props = withDefaults(
  defineProps<{
    options: readonly SegmentOption<string>[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="ui-segmented" :class="{ 'ui-segmented--disabled': disabled }">
    <button
      v-for="option in props.options"
      :key="option.value"
      type="button"
      class="ui-segmented__tab"
      :class="{ 'ui-segmented__tab--active': model === option.value }"
      :disabled="disabled"
      @click="model = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.ui-segmented {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid rgba(79, 70, 229, 0.2);
  border-radius: 999px;
  background: rgba(79, 70, 229, 0.06);
}

.ui-segmented__tab {
  appearance: none;
  border: 0;
  background: transparent;
  color: #4338ca;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  line-height: 1;
  transition:
    background-color 120ms ease,
    color 120ms ease,
    box-shadow 120ms ease,
    opacity 120ms ease,
    transform 120ms ease;
}

.ui-segmented__tab:hover:not(:disabled) {
  background: rgba(79, 70, 229, 0.1);
}

.ui-segmented__tab--active {
  background: rgba(79, 70, 229, 0.18);
  color: #312e81;
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.16);
}

.ui-segmented__tab:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ui-segmented--disabled {
  opacity: 0.85;
}
</style>

