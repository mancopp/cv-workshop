<template>
  <Select v-model="selectedPreviewMode" default-value="show">
    <SelectTrigger
      class="absolute top-4 right-4 bg-white shadow-black/20 shadow-md dark:shadow-none dark:bg-input dark:hover:bg-input hover:cursor-pointer"
    >
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup class="w-[200px]">
        <!-- <SelectItem v-for="m in previewModes" :key="m" value="m">{{
          m
        }}</SelectItem> -->
        <SelectItem value="show">
          <div class="flex flex-col">
            <SelectItemText>Show</SelectItemText>
            <p class="text-xs opacity-50">
              Show unmatched sections that will be hidden in the output
              document.
            </p>
          </div>
        </SelectItem>
        <SelectItem value="hide">
          <div class="flex flex-col">
            <SelectItemText>Hide</SelectItemText>
            <p class="text-xs opacity-50">
              Hide unmatched sections that will be hidden in the output
              document.
            </p>
          </div>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script lang="ts" setup>
const selectedPreviewMode = ref();

watch(
  () => selectedPreviewMode.value,
  () => console.log(selectedPreviewMode.value)
);

// const previewModes = [
//   "Show unmatched",
//   // 'Trim hidden',
//   "Hide unmatched",
// ];
</script>
