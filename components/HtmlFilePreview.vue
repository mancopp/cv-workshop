<template>
  <ScrollArea class="w-full h-full flex overflow-auto">
    <PreviewModeSelector />
    <div
      ref="zoomEl"
      class="flex flex-row justify-center items-start gap-5 p-5 text-gray-800"
    >
      <div>
        <h2 class="text-white">PREVIEW HTML</h2>
        <div
          ref="previewHtmlContainer"
          :style="{ width: `${exportHtmlWidthPx}px` }"
          class="preview-container bg-white shadow-lg border-[1px]"
        />
      </div>
      <div>
        <h2 class="text-white">PROCESSED HTML (EXPORT)</h2>
        <div
          ref="processedHtmlContainer"
          :style="{ width: `${exportHtmlWidthPx}px` }"
          class="output-preview-container bg-white shadow-lg border-[1px]"
        />
      </div>
      <div
        :style="{ width: `${exportHtmlWidthPx}px` }"
        class="bg-white shadow-lg border-[1px]"
      >
        <h2>FULL HTML</h2>
        <RealCv ref="inputHtmlComponent" />
      </div>
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>

<script lang="ts" setup>
const appStore = useAppStore();
const configuratorStore = useConfiguratorStore();

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

const prepareHtmlForExport = (rootElement: HTMLElement) => {
  const newHtmlEl = rootElement.cloneNode(true) as HTMLElement;
  const taggedElements = Array.from(newHtmlEl.querySelectorAll("[data-tags]"));

  taggedElements.forEach((el) => {
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
  const taggedElements = Array.from(newHtmlEl.querySelectorAll("[data-tags]"));

  taggedElements.forEach((el) => {
    let hide = true;
    const tags = el.dataset.tags.split(",");

    tags.forEach((c) => {
      if (configuratorStore.selectedTags.includes(c)) {
        hide = false;
      }
    });

    if (hide) {
      el.dataset.hidden = true;
    }
  });

  return newHtmlEl;
};

const drawPreviewOverlayHtml = (rootElement: HTMLElement) => {
  const newHtmlEl = rootElement.cloneNode(true) as HTMLElement;
  const taggedElements = Array.from(newHtmlEl.querySelectorAll("[data-tags]"));

  taggedElements.reverse().forEach((el) => {
    const tagsString = el.dataset.tags;

    if (tagsString) {
      const tags = el.dataset.tags.split(",");

      if (tags.length > 0) {
        tags.map((t: string) => configuratorStore.documentTags.add(t));
        const wrapperDiv = document.createElement("div");
        const taglistEl = document.createElement("ul");

        wrapperDiv.className = "overlay highlighted-part";
        taglistEl.className = "taglist flex items-center gap-1";

        tags.map((t: string) => {
          const li = document.createElement("li");
          li.innerHTML = `#${t}`;
          li.dataset.tag = t;
          if (configuratorStore.selectedTags.includes(t))
            li.style.textDecoration = "underline";
          taglistEl.appendChild(li);
        });

        wrapperDiv.appendChild(taglistEl);
        wrapperDiv.appendChild(el.cloneNode(true));

        if (el.dataset.hidden) {
          if (configuratorStore.previewMode === "show") {
            wrapperDiv.style.borderColor = "red";
            taglistEl.style.backgroundColor = "red";
          } else {
            return;
          }
        }

        el.parentNode.replaceChild(wrapperDiv, el);
      }
    }
  });

  return newHtmlEl;
};

const updateProcessedHtmls = () => {
  console.log("updateProcessedHtmls");

  //FIXME: I feel like it's an awful piece of code
  // To be rewritten using vue's reactivity system,
  // instead of replacing the whole node tree
  processedHtml.value = processHtml(inputHtmlComponent.value.$el);
  if (processedHtmlContainer.value.firstChild)
    processedHtmlContainer.value.removeChild(
      processedHtmlContainer.value.firstChild
    );
  processedHtmlContainer.value.appendChild(processedHtml.value);

  previewHtml.value = drawPreviewOverlayHtml(processedHtml.value);

  if (previewHtmlContainer.value.firstChild)
    previewHtmlContainer.value.removeChild(
      previewHtmlContainer.value.firstChild
    );
  previewHtmlContainer.value.appendChild(previewHtml.value);
};

watch(
  () => configuratorStore.hoveredTag,
  (newVal) => {
    if (newVal) {
      document
        .querySelectorAll(`[data-tag='${newVal}']`)
        .forEach((el) => el.classList.add("highlighted-tag"));
    } else {
      document
        .querySelectorAll(`[data-tag]`)
        .forEach((el) => el.classList.remove("highlighted-tag"));
    }
  }
);

watch(
  [() => configuratorStore.selectedTags, () => configuratorStore.previewMode],
  () => updateProcessedHtmls(),
  {
    deep: true,
  }
);

onMounted(() => {
  window.addEventListener("keydown", handleGPress);
  updateProcessedHtmls();

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
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGPress);
});

// on export: for every node not in the allow-list,
// set display to none and hide all of the ui.
</script>

<style>
.output-preview-container [data-hidden="true"] {
  opacity: 0.2;
}

.preview-container .overlay {
  border: 2px solid rgb(92, 92, 190);
}

.preview-container .overlay .taglist {
  padding: 4px;
  background-color: rgb(92, 92, 190);
  color: white;
}

.highlighted-tag {
  background-color: rgba(0, 0, 0, 0.3);
  background-image: linear-gradient(90deg, white 50%, transparent 50%),
    linear-gradient(90deg, white 50%, transparent 50%),
    linear-gradient(0deg, white 50%, transparent 50%),
    linear-gradient(0deg, white 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 15px 1px, 15px 1px, 1px 15px, 1px 15px;
  background-position: left top, right bottom, left bottom, right top;
  animation: border-dance 1s infinite linear;
}

@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right top;
  }

  100% {
    background-position: left 15px top, right 15px bottom, left bottom 15px,
      right top 15px;
  }
}
</style>
