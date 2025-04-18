<template>
  <div ref="container" class="w-full h-full">
    <h1>Seeing this text means that some kind of error occured</h1>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore();

const container = useTemplateRef<HTMLElement | null>('container');

onMounted(() => {
  container.value.innerHTML = appStore.htmlToExport;
  container.value.firstChild?.style.setProperty('width', '100%');
  window.__onMountedComplete = true;
});
</script>