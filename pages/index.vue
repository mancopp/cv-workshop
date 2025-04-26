<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-10">
    <h1 class="text-6xl text-inherit">CV Workshop</h1>
    <div class="flex justify-center items-center">
      <button
        class="bg-gray-300 hover:bg-gray-200 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-900 text-gray-800 dark:text-gray-400 hover:text-gray-600 h-60 w-50 rounded-2xl cursor-pointer"
        @click="importHtml"
      >
        <span class="text-4xl">+</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const importHtml = async () => {
  window.electronAPI.importHtml().then((result: boolean) => {
    if (result) router.push("/editor");
  });
};
</script>
