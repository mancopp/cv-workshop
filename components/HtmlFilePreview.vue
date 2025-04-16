<template>
  <div ref="zoomEl" class="flex flex-col justify-center items-center w-full h-screen p-5">
    <div ref="cvEl"
      class="preview-container w-[700px] bg-white text-black shadow-lg border-[1px]">
      <ComplicatedCv />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { jsPDF } from "jspdf";
import { writeFile, readFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import ZoomShortcutHandler from '@/lib/zoom-shortcuts';


const zoomEl = ref<HTMLElement | null>(null);
const cvEl = ref<HTMLElement | null>(null);
const zoomhandler = ref<ZoomShortcutHandler | null>(null);

const selectedTags = ["tag-art"];

const handleGPress = async (event) => {
  if (event.key === 'g') {
    console.log('Button clicked!');

    const pdf = new jsPDF('p', 'px', 'a4');
    pdf.html(cvEl.value as HTMLElement, {
      callback: function (pdf) {
        const pdfData = new Uint8Array(pdf.output('arraybuffer'));
        writeFile('yourFileName1.pdf', pdfData, {
          baseDir: BaseDirectory.Download,
        });
        console.log('PDF generated!');
      },
      // margin: [20, 20, 20, 20], // Set appropriate margins
      autoPaging: 'text', // Crucial for handling text flow across pages
      html2canvas: {
        allowTaint: true,
        letterRendering: true,
        logging: false,
        scale: 0.638, // Adjust the scale to fit content
      }
    });
  }
};

onMounted(() => {
  if (zoomEl.value) {
    zoomhandler.value = new ZoomShortcutHandler(zoomEl.value, {
      initialZoom: 2,
      minZoom: 1,
      maxZoom: 5,
      zoomStep: 0.5,
    });
    zoomhandler.value.register();
  }

  // window.addEventListener('keydown', async (event) => {
  //   if (event.key === 'i') {
  //     console.log('Button clicked!');

  //     const input = await readFile('testcv.html', {
  //       baseDir: BaseDirectory.Download,
  //     });

  //     const decoder = new TextDecoder();
  //     const htmlContent = decoder.decode(input);

  //     if (!cvEl.value) return;

  //     cvEl.value.innerHTML = htmlContent;
  //   }
  // });

  window.addEventListener('keydown', handleGPress);

  const elWithArtTag = document.querySelectorAll('.preview-container .tag-art');
  
  elWithArtTag.forEach((el) => {
    const wrapperDiv = document.createElement('div');
    const taglistDiv = document.createElement('div');

    wrapperDiv.className = 'overlay highlighted-part';
    taglistDiv.className = 'taglist';
    taglistDiv.innerHTML = '#placeholder #tags #art #design #godot #test #helloworld';

    wrapperDiv.appendChild(taglistDiv);
    wrapperDiv.appendChild(el.cloneNode(true));

    el.parentNode.replaceChild(wrapperDiv, el);
  });

});

onUnmounted(() => {
  zoomhandler.value.unregister();
  window.removeEventListener('keydown', handleGPress);
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