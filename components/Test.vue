<template>
  <div>
    <Button @click="onButtonClick">Click me!</Button>
  </div>
  <div>
    <div ref="test-div" class="test-div">
      t
    </div>
    <div ref="temp-div"></div>
  </div>
</template>

<script setup lang="ts">
// import { jsPDF } from "jspdf";
// import { writeFile, readFile, BaseDirectory } from '@tauri-apps/plugin-fs';

// // 446 px

// const div = useTemplateRef('test-div');
// const _temp_div = useTemplateRef('temp-div');

// const onButtonClick = async () => {
//   console.log('Button clicked!');

//   const input = await readFile('test-so.html', {
//     baseDir: BaseDirectory.Download,
//   });

//   const decoder = new TextDecoder();
//   const htmlContent = decoder.decode(input);

//   console.log('HTML file content:', htmlContent);

//   // Create a temporary container to parse the HTML content
//   // const tempDiv = document.createElement('div');
//   // tempDiv.style.width = '447px;';
//   // tempDiv.innerHTML = htmlContent;

//   if (!_temp_div.value) return;

//   _temp_div.value.style.width = '447px;';
//   _temp_div.value.innerHTML = htmlContent;

//   const pdf = new jsPDF('p', 'px', 'a4');
//   // pdf.html(div.value as HTMLElement, {
//   pdf.html(_temp_div.value, {
//     callback: function (pdf) {
//       const pdfData = new Uint8Array(pdf.output('arraybuffer'));
//       writeFile('yourFileName.pdf', pdfData, {
//         baseDir: BaseDirectory.Download,
//       });
//       console.log('PDF generated!');
//     }
//   });
// };
</script>