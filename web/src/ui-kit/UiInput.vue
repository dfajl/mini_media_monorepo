<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    type?: string;
    placeholder?: string;
    autocomplete?: string;
    name?: string;
    minlength?: number;
    required?: boolean;
    disabled?: boolean;
    error?: string;
  }>(),
  {
    label: '',
    type: 'text',
    placeholder: '',
    autocomplete: '',
    name: '',
    minlength: undefined,
    required: false,
    disabled: false,
    error: '',
  },
);

const model = defineModel<string>({ required: true });
</script>

<template>
  <label class="ui-input">
    <span v-if="label" class="ui-input__label">{{ label }}</span>
    <input
      class="ui-input__field"
      :class="{ 'ui-input__field--error': !!error }"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :name="name"
      :minlength="minlength"
      :required="required"
      :disabled="disabled"
    />
    <span v-if="error" class="ui-input__error">{{ error }}</span>
  </label>
</template>

<style scoped>
.ui-input {
  display: grid;
  gap: 8px;
}

.ui-input__label {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
}

.ui-input__field {
  height: 42px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0 12px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ui-input__field:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.ui-input__field--error {
  border-color: #ef4444;
}

.ui-input__field--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.18);
}

.ui-input__error {
  font-size: 0.83rem;
  color: #dc2626;
}
</style>
