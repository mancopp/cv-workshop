<template>
  <Sidebar>
    <SidebarHeader>
      <ColorModeToggle />
      <h1>CV Workshop</h1>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup />
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
</template>

<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
</script>