<template>
  <div ref="zoomEl" class="flex flex-col justify-center items-center w-full h-screen p-5">
    <div ref="cvEl"
      class="w-[700px] bg-white text-black shadow-lg border-[1px]">
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
    const zoomHandler = new ZoomShortcutHandler(zoomEl.value, {
      initialZoom: 2,
      minZoom: 1,
      maxZoom: 5,
      zoomStep: 0.5,
    });
    zoomHandler.register();
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
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGPress);
});

</script>