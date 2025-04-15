<template>
  <div ref="zoomPinchEl" class="projection-wrapper flex flex-col justify-center items-center w-full h-screen p-5">

    <zoompinch ref="zoompinchRef" v-model:transform="transform" :width="446" :height="3922" :offset="offset"
      :min-scale="5" :max-scale="10" :rotation="false" :bounds="false" :mouse="false" :touch="false" :wheel="true"
      :gesture="false">
      <template #canvas>
        <div class="w-[446px] bg-white text-black px-10 py-25 shadow-lg border-[1px]">
          <h1 class="text-2xl">Test</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h1 class="text-2xl">Test</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h1 class="text-2xl">Test</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h1 class="text-2xl">Test</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h1 class="text-2xl">Test</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
          <h3 class="text-xl">Mini test</h3>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, sunt eos fugit ducimus pariatur
            explicabo
            cum maxime nulla ut illum vel dolorum libero unde. Odit molestias recusandae velit impedit non?</p>
        </div>
      </template>
    </zoompinch>
  </div>
</template>

<script lang="ts" setup>
import { Zoompinch } from 'zoompinch';
import 'zoompinch/style.css';

const zoompinchRef = ref<InstanceType<typeof Zoompinch>>();
const offset = reactive({ top: 10, right: 10, bottom: 10, left: 10 });
const transform = ref({ x: 0, y: 0, scale: 1, rotate: 0 });


function fit() {
  transform.value = { x: 0, y: 0, scale: 1, rotate: 0 };
}

onMounted(() => {
  setTimeout(() => fit());
});
</script>