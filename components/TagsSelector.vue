<template>
  <div>
    <ul class="flex flex-col gap-2 p-4">
      <li v-for="t in configuratorStore.documentTags" :key="t">
        <Checkbox :id="`tag-${t}`" v-model="selectedTags[t]" />
        <label class="ml-2 cursor-pointer" :for="`tag-${t}`">#{{ t }}</label>
      </li>
    </ul>
  </div>
  <Button @click="applySelectedTags">Apply selected tags</Button>
</template>

<script setup lang="ts">
import { ref } from "vue";
const configuratorStore = useConfiguratorStore();

const selectedTags = ref<Record<string, boolean>>({});

configuratorStore.documentTags.forEach((tag) => {
  selectedTags.value[tag] = false;
});

const applySelectedTags = () => {
  const checkedTags = Object.keys(selectedTags.value).filter(
    (tag) => selectedTags.value[tag]
  );
  configuratorStore.setSelectedTags(checkedTags);
};
</script>
