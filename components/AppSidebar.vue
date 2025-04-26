<template>
  <Sidebar>
    <SidebarHeader class="pt-10">
      <div class="flex items-center gap-1">
        <Button class="flex-none" variant="outline" @click="goBack">
          <Icon icon="radix-icons:arrow-left" />
        </Button>
        <ColorModeToggle />
      </div>
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

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const router = useRouter();

const goBack = () => {
  router.push("/");
};
</script>
