<template>
  <SidebarProvider>
    <AppSidebar>
      <TagsSelector />
    </AppSidebar>
    <main class="w-full h-full">
      <PageHeader>
        <SidebarTrigger />
      </PageHeader>
      <HtmlFilePreview />
    </main>
  </SidebarProvider>
</template>