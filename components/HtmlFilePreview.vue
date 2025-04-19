<template>
  <div class="w-full h-full flex justify-center items-center overflow-scroll">
    <div
      ref="zoomEl"
      class="flex flex-row justify-center items-start gap-5 p-5 text-gray-800"
    >
      <div
        :style="{ width: `${exportHtmlWidthPx}px` }"
        class="output-preview-container bg-white shadow-lg border-[1px]"
      >
        <h2>FULL HTML</h2>
        <ComplicatedCv ref="inputHtmlComponent" />
      </div>
      <div
        ref="processedHtmlContainer"
        :style="{ width: `${exportHtmlWidthPx}px` }"
        class="output-preview-container bg-white shadow-lg border-[1px]"
      >
        <h2>PROCESSED HTML (EXPORT)</h2>
      </div>
      <div
        ref="previewHtmlContainer"
        :style="{ width: `${exportHtmlWidthPx}px` }"
        class="preview-container bg-white shadow-lg border-[1px]"
      >
        <h2>PREVIEW HTML</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { writeFile, BaseDirectory } from '@tauri-apps/plugin-fs';

const appStore = useAppStore();

const inputHtmlComponent = useTemplateRef<HTMLElement | null>(
  "inputHtmlComponent"
);
const processedHtmlContainer = useTemplateRef<HTMLElement | null>(
  "processedHtmlContainer"
);

const processedHtml = ref<HTMLElement | null>(null);
const previewHtml = ref<HTMLElement | null>(null);

const zoomEl = ref<HTMLElement | null>(null);
const previewHtmlContainer = ref<HTMLElement | null>(null);

const exportHtmlWidthPx = 700;

const selectedTags = ["tag-art"];

const prepareHtmlForExport = (rootElement: HTMLElement) => {
  const newHtmlEl = rootElement.cloneNode(true) as HTMLElement;

  const elWithTag = newHtmlEl.querySelectorAll("[class*='tag-']");

  elWithTag.forEach((el) => {
    if (el.dataset.hidden) {
      el.style.display = "none";
    }
  });

  newHtmlEl.style.width = `${exportHtmlWidthPx}px`;

  return newHtmlEl;
};

const generatePDF = async (rootElement: HTMLElement) => {
  // rootElement.style.width = `${exportHtmlWidthPx}px`;
  // rootElement.style.backgroundColor = 'white';

  console.log(rootElement);

  // zoomEl.value.appendChild(rootElement);
  // console.log(window.electronAPI);

  appStore.setHtmlToExport(rootElement.outerHTML);
  console.log(appStore.htmlToExport);
  window.electronAPI.exportPDF();
};

const handleGPress = async (event) => {
  if (event.key === "g") {
    const preparedHtml = prepareHtmlForExport(processedHtml.value);
    generatePDF(preparedHtml);
  }
};

const processHtml = (rootElement: HTMLElement) => {
  const newHtmlEl = rootElement.cloneNode(true) as HTMLElement;
  console.log(newHtmlEl);
  console.log("Processing HTML...");

  const elWithTag = newHtmlEl.querySelectorAll("[class*='tag-']");

  elWithTag.forEach((el) => {
    let hide = true;
    el.classList.forEach((c) => {
      if (c.startsWith("tag-") && selectedTags.includes(c)) {
        hide = false;
      }
    });

    if (hide) {
      // el.style.backgroundColor = 'black';
      el.dataset.hidden = true;
    } else {
      // For debug: Mark as scanned element
      // el.style.backgroundColor = 'lightblue';
    }
  });

  return newHtmlEl;
};

const drawPreviewOverlayHtml = (rootElement: HTMLElement) => {
  const newHtmlEl = rootElement.cloneNode(true) as HTMLElement;

  const elWithTag = newHtmlEl.querySelectorAll("[class*='tag-']");

  elWithTag.forEach((el) => {
    if (el.dataset.hidden) {
      // Depends on preview mode
      el.style.display = "none";
      return;
    }

    const tags = [];
    el.classList.forEach((c) => {
      if (c.startsWith("tag-")) {
        tags.push(c.replace("tag-", "#"));
      }
    });

    if (tags.length > 0) {
      const wrapperDiv = document.createElement("div");
      const taglistDiv = document.createElement("div");

      wrapperDiv.className = "overlay highlighted-part";
      taglistDiv.className = "taglist";
      taglistDiv.innerHTML = tags.join(" ");

      wrapperDiv.appendChild(taglistDiv);
      wrapperDiv.appendChild(el.cloneNode(true));

      el.parentNode.replaceChild(wrapperDiv, el);
    }
  });

  return newHtmlEl;
};

onMounted(() => {
  // window.addEventListener('keydown', async (event) => {
  //   if (event.key === 'i') {
  //     console.log('Button clicked!');

  //     const input = await readFile('testcv.html', {
  //       baseDir: BaseDirectory.Download,
  //     });

  //     const decoder = new TextDecoder();
  //     const htmlContent = decoder.decode(input);

  //     if (!previewHtmlContainer.value) return;

  //     previewHtmlContainer.value.innerHTML = htmlContent;
  //   }
  // });

  window.addEventListener("keydown", handleGPress);

  processedHtml.value = processHtml(inputHtmlComponent.value.$el);
  processedHtmlContainer.value.appendChild(processedHtml.value);

  previewHtml.value = drawPreviewOverlayHtml(processedHtml.value);
  previewHtmlContainer.value.appendChild(previewHtml.value);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGPress);
});

// on export: for every node not in the allow-list,
// set display to none and hide all of the ui.
</script>

<style>
.preview-container [class*="tag-"] {
  opacity: 0.5;
}

.preview-container .tag-art {
  opacity: 1;
}

.preview-container *:not(.overlay) {
  /* opacity: 0.7; */
}

.preview-container .overlay {
  border: 2px solid rgb(92, 92, 190);
}

.preview-container .overlay .taglist {
  padding: 4px;
  background-color: rgb(92, 92, 190);
  color: white;
}
</style>
