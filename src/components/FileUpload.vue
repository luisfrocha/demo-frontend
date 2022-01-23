<script setup>
  import { onMounted, ref, toRefs, watch } from 'vue';
  import { PhotographIcon } from '@heroicons/vue/solid';

  const props = defineProps({ modelValue: { type: String } });
  const { modelValue } = toRefs(props);

  const emit = defineEmits(['update:modelValue']);
  const file = ref(null);
  const encodedImage = ref('');

  watch(
    () => encodedImage.value,
    val => {
      emit('update:modelValue', val);
    }
  );

  onMounted(() => {
    if (modelValue.value) {
      encodedImage.value = modelValue.value;
    }
  });

  const onChange = ev => {
    const reader = new FileReader();
    reader.readAsDataURL(file.value.files[0]);
    reader.onload = () => {
      encodedImage.value = reader.result;
    };
    reader.onerror = error => {
      imageError.value = error;
    };
  };
</script>
<template>
  <img
    v-if="encodedImage"
    class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl"
    :src="encodedImage"
    alt=""
    @click="
      encodedImage = null;
      file.value = null;
    "
  />
  <button v-else @click="file.click()"><PhotographIcon class="w-32 h-32 flex-shrink-0 mx-auto rounded-xl" /></button>
  <input ref="file" type="file" @change="onChange($event)" class="hidden" />
</template>
