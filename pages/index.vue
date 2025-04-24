<template>
  <SidebarProvider>
    <AppSidebar>
      <TagsSelector />
      <Button @click="clickMe">Click Me</Button>
    </AppSidebar>
    <main class="w-full h-full max-w-full max-h-full overflow-hidden">
      <!-- <PageHeader>
        <SidebarTrigger />
      </PageHeader> -->
      <HtmlFilePreview />
    </main>
  </SidebarProvider>
</template>

<script setup lang="ts">
const clickMe = () => {
  window.electronAPI.importHtml();
};
</script>
