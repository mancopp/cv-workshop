<template>
  <Sidebar>
    <SidebarHeader>
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
