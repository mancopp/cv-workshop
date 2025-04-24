<template>
  <iframe
    ref="iFrame"
    class="w-full"
    src="http://localhost:8000/"
    frameborder="0"
    @load="onIframeLoad"
  />
</template>

<script setup lang="ts">
const { processHtml, prepareHtmlForExport } = useHtmlProcessors();

const iFrame = useTemplateRef<HTMLIFrameElement | null>("iFrame");

const onIframeLoad = () => {
  if (!iFrame.value || !iFrame.value.contentWindow) return;

  const processed = processHtml(iFrame.value.contentWindow.document.body);
  const prepared = prepareHtmlForExport(processed, 700);
  iFrame.value.contentWindow.document.body = prepared;
  iFrame.value.height = `${iFrame.value.contentWindow.document.body.scrollHeight}`;

  window.__readyToExport = true;
};
</script>
