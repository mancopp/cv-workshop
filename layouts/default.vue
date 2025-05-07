<template>
  <div>
    <div class="title-bar absolute w-screen h-8 select-none" />
    <slot />
  </div>
</template>

<style>
.title-bar {
  -webkit-app-region: drag;
}
</style>
