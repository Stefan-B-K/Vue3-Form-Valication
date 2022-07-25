<script setup>

defineProps({
   vertical: {
      type: Boolean,
      default: false
   },
   modelValue: {
      type: [String, Number],
      required: true
   },
   options: {
      type: Array,
      required: true
   },
   name: {
      type: String,
      required: true
   }
})

</script>

<template>
   <div>
      <component
         v-for="opt in options"
         :key="opt.value"
         :is="vertical ? 'div' : 'span'"
         :style="vertical ? '' : 'margin-right: 20px;'"
      >
         <BaseRadio
            :name="name"
            :label="opt.label"
            :modelValue="modelValue"
            :value="opt.value"
            :uuid="opt.uuid"
            @update:modelValue="$emit('update:modelValue', $event)"
         />
      </component>
   </div>
</template>


