<template>
  <Select
    v-model="configuratorStore.previewMode"
    :default-value="configuratorStore.previewMode"
  >
    <SelectTrigger
      class="absolute top-8 right-4 bg-white shadow-black/20 shadow-md dark:shadow-none dark:bg-input dark:hover:bg-input hover:cursor-pointer"
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
const configuratorStore = useConfiguratorStore();
</script>
