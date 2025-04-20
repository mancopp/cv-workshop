<template>
  <div>
    <ul class="flex flex-col gap-2 p-4">
      <li
        v-for="t in configuratorStore.documentTags"
        :key="t"
        class="flex items-center gap-2"
        @mouseover="tagHover(t)"
        @mouseout="tagUnhover"
      >
        <Checkbox :id="`tag-${t}`" v-model="selectedTags[t]" />
        <Label class="cursor-pointer" :for="`tag-${t}`">#{{ t }}</Label>
      </li>
    </ul>
  </div>
  <Button @click="applySelectedTags">Apply selected tags</Button>
</template>

<script setup lang="ts">
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

const tagHover = (t: string) => {
  configuratorStore.hoveredTag = t;
  console.log(configuratorStore.hoveredTag);
};

const tagUnhover = () => {
  configuratorStore.hoveredTag = null;
  console.log(configuratorStore.hoveredTag);
};
</script>
