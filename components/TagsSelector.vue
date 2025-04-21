<template>
  <div>
    <ul class="flex flex-col gap-2 p-4">
      <li class="flex items-center gap-2">
        <Checkbox id="select-all" v-model="selectAll" />
        <Label class="cursor-pointer" for="select-all">All</Label>
      </li>
      <li
        v-for="t in configuratorStore.documentTags"
        :key="t"
        class="flex items-center gap-2"
        @mouseover="tagHover(t)"
        @mouseout="tagUnhover"
      >
        <Checkbox :id="`tag-${t}`" v-model="tags[t]" />
        <Label class="cursor-pointer" :for="`tag-${t}`">#{{ t }}</Label>
      </li>
    </ul>
  </div>
  <Button @click="applyTags">Apply selected tags</Button>
</template>

<script setup lang="ts">
const configuratorStore = useConfiguratorStore();

const selectAll = ref<boolean | "indeterminate">(false);
const tags = ref<Record<string, boolean>>({});

const applyTags = () => {
  const checkedTags = Object.keys(tags.value).filter((tag) => tags.value[tag]);
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

const updateTags = () => {
  configuratorStore.documentTags.forEach((tag) => {
    tags.value[tag] = false;
    console.log(tags.value[tag]);
  });
};

watch(tags.value, () => {
  let selectAllState = false as boolean | "indeterminate";

  const length = Object.keys(tags.value).length;
  const checkedLength = Object.values(tags.value).filter(
    (value) => value === true
  ).length;

  if (length === checkedLength) {
    selectAllState = true;
  } else if (checkedLength > 0) {
    selectAllState = "indeterminate";
  }

  selectAll.value = selectAllState;
});

watch(
  () => selectAll.value,
  (val) => {
    if (val === "indeterminate") return;
    Object.keys(tags.value).forEach((key) => {
      tags.value[key] = val;
    });
  }
);

watch(configuratorStore.documentTags, updateTags);
</script>
