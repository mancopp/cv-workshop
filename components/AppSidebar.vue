<template>
  <Sidebar>
    <SidebarHeader class="pt-10">
      <ColorModeToggle />
      <h1>CV Workshop</h1>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <slot />
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>
