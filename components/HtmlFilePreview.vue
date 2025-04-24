<template>
  <div class="w-full h-full flex">
    <PreviewModeSelector />
    <iframe
      ref="iFrame"
      class="w-full h-full"
      src="http://localhost:8000/"
      frameborder="0"
      @load="onIframeLoad"
    />
  </div>
</template>

<script lang="ts" setup>
const configuratorStore = useConfiguratorStore();

const { processHtml, drawPreviewOverlayHtml } = useHtmlProcessors();

const iFrame = useTemplateRef("iFrame");

const onIframeLoad = (_event: Event) => {
  updateIframe();
};

const generatePDF = async () => {
  window.electronAPI.exportPDF();
};

const updateIframe = () => {
  if (!iFrame.value || !iFrame.value.contentWindow) return;

  iFrame.value.contentWindow.document.body.style.backgroundColor = "white";
  iFrame.value.contentWindow.document.body.style.color = "black";
  iFrame.value.contentWindow.document.body.style.padding = "1px";
  iFrame.value.contentWindow.document.body.style.boxSizing = "border-box";

  const processed = processHtml(iFrame.value.contentWindow.document.body);
  const withOverlay = drawPreviewOverlayHtml(processed);
  iFrame.value.contentWindow.document.body = withOverlay;
};

const  handleKeyPress = async (event: KeyboardEvent) => {
  if (event.key === "g") {
    generatePDF();
  }
};

watch(
  () => configuratorStore.hoveredTag,
  (newVal) => {
    if (!iFrame.value || !iFrame.value.contentWindow) return;
    if (newVal) {
      iFrame.value.contentWindow.document
        .querySelectorAll(`[data-tag='${newVal}']`)
        .forEach((el) => el.classList.add("highlighted-tag"));
    } else {
      iFrame.value.contentWindow.document
        .querySelectorAll(`[data-tag]`)
        .forEach((el) => el.classList.remove("highlighted-tag"));
    }
  }
);

watch(
  [() => configuratorStore.selectedTags, () => configuratorStore.previewMode],
  () => {
    iFrame.value?.contentWindow?.location.reload();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  window.addEventListener("keydown",  handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener("keydown",  handleKeyPress);
});

// on export: for every node not in the allow-list,
// set display to none and hide all of the ui.
</script>
