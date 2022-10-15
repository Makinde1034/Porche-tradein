<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  vehicle: {
    carFinderUrl:
      'https://finder-preview.porsche.com/es/en/dealer/details/JW8ZL1',
    id: 'JW8ZL1',
    vin: 'WP0ZZZ97ZJL132975',
    name: 'Panamera 4S',
    price: {
      value: 99990,
      currencyCode: 'EUR',
      localized: '99.990 €',
    },
    modelYear: 2018,
    condition: {
      localized: 'Usado',
      value: 'preowned',
    },
    modelSeries: {
      localized: 'Panamera',
      value: 'panamera',
    },
    mileage: {
      value: 24000,
      unit: 'kilometer',
      localized: '24.000 km',
    },
    transmission: {
      localized: 'Transmisión PDK',
      value: 'PDK',
    },
    power: {
      localized: '324 kW / 440 hp',
    },
    numberOfPreviousOwners: 1,
    exteriourColor: {
      localized: 'Azul Noche Metalizado',
      value: '#1d2738',
    },
    interior: 'Interior en cuero bitono Negro / Crayon',
    images: [
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/5c55453b-b702-42b1-a132-52a31768c94d/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/5c55453b-b702-42b1-a132-52a31768c94d/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/5c55453b-b702-42b1-a132-52a31768c94d/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/5c55453b-b702-42b1-a132-52a31768c94d/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/5c55453b-b702-42b1-a132-52a31768c94d/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/5c55453b-b702-42b1-a132-52a31768c94d/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/491aac9a-684d-45dd-9071-23ca89195082/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/491aac9a-684d-45dd-9071-23ca89195082/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/491aac9a-684d-45dd-9071-23ca89195082/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/491aac9a-684d-45dd-9071-23ca89195082/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/491aac9a-684d-45dd-9071-23ca89195082/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/491aac9a-684d-45dd-9071-23ca89195082/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/eb7bebcf-4be9-4f73-b953-96138df090f1/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/eb7bebcf-4be9-4f73-b953-96138df090f1/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/eb7bebcf-4be9-4f73-b953-96138df090f1/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/eb7bebcf-4be9-4f73-b953-96138df090f1/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/eb7bebcf-4be9-4f73-b953-96138df090f1/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/eb7bebcf-4be9-4f73-b953-96138df090f1/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/2b56ea17-2485-4c30-b4e7-774a5e842c68/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/2b56ea17-2485-4c30-b4e7-774a5e842c68/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/2b56ea17-2485-4c30-b4e7-774a5e842c68/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/2b56ea17-2485-4c30-b4e7-774a5e842c68/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/2b56ea17-2485-4c30-b4e7-774a5e842c68/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/2b56ea17-2485-4c30-b4e7-774a5e842c68/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/342f3cd4-d4bb-4c4b-b665-1680cebb08a8/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/342f3cd4-d4bb-4c4b-b665-1680cebb08a8/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/342f3cd4-d4bb-4c4b-b665-1680cebb08a8/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/342f3cd4-d4bb-4c4b-b665-1680cebb08a8/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/342f3cd4-d4bb-4c4b-b665-1680cebb08a8/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/342f3cd4-d4bb-4c4b-b665-1680cebb08a8/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/b51e51c0-f149-4f2e-8e6f-bc0952b9a2fd/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/b51e51c0-f149-4f2e-8e6f-bc0952b9a2fd/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/b51e51c0-f149-4f2e-8e6f-bc0952b9a2fd/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/b51e51c0-f149-4f2e-8e6f-bc0952b9a2fd/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/b51e51c0-f149-4f2e-8e6f-bc0952b9a2fd/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/b51e51c0-f149-4f2e-8e6f-bc0952b9a2fd/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/c0c6493c-2fcc-4fd1-9d0b-be4ec733036c/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/c0c6493c-2fcc-4fd1-9d0b-be4ec733036c/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/c0c6493c-2fcc-4fd1-9d0b-be4ec733036c/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/c0c6493c-2fcc-4fd1-9d0b-be4ec733036c/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/c0c6493c-2fcc-4fd1-9d0b-be4ec733036c/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/c0c6493c-2fcc-4fd1-9d0b-be4ec733036c/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/0827c3f5-778e-46e1-a8d4-4e113a9c6c6d/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/0827c3f5-778e-46e1-a8d4-4e113a9c6c6d/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/0827c3f5-778e-46e1-a8d4-4e113a9c6c6d/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/0827c3f5-778e-46e1-a8d4-4e113a9c6c6d/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/0827c3f5-778e-46e1-a8d4-4e113a9c6c6d/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/0827c3f5-778e-46e1-a8d4-4e113a9c6c6d/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/c1419924-bda8-46f8-b717-e02681000016/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/c1419924-bda8-46f8-b717-e02681000016/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/c1419924-bda8-46f8-b717-e02681000016/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/c1419924-bda8-46f8-b717-e02681000016/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/c1419924-bda8-46f8-b717-e02681000016/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/c1419924-bda8-46f8-b717-e02681000016/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/eac32a59-634f-4203-a9ca-6efc8d190cbc/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/eac32a59-634f-4203-a9ca-6efc8d190cbc/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/eac32a59-634f-4203-a9ca-6efc8d190cbc/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/eac32a59-634f-4203-a9ca-6efc8d190cbc/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/eac32a59-634f-4203-a9ca-6efc8d190cbc/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/eac32a59-634f-4203-a9ca-6efc8d190cbc/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/054a83c0-7ce6-4346-bfb8-ac162c3a15c9/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/054a83c0-7ce6-4346-bfb8-ac162c3a15c9/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/054a83c0-7ce6-4346-bfb8-ac162c3a15c9/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/054a83c0-7ce6-4346-bfb8-ac162c3a15c9/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/054a83c0-7ce6-4346-bfb8-ac162c3a15c9/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/054a83c0-7ce6-4346-bfb8-ac162c3a15c9/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/e8195465-fb62-4515-b97e-f52002b9c216/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/e8195465-fb62-4515-b97e-f52002b9c216/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/e8195465-fb62-4515-b97e-f52002b9c216/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/e8195465-fb62-4515-b97e-f52002b9c216/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/e8195465-fb62-4515-b97e-f52002b9c216/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/e8195465-fb62-4515-b97e-f52002b9c216/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/dc24b4d1-0ea7-4afd-914b-55c9656fa3ed/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/dc24b4d1-0ea7-4afd-914b-55c9656fa3ed/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/dc24b4d1-0ea7-4afd-914b-55c9656fa3ed/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/dc24b4d1-0ea7-4afd-914b-55c9656fa3ed/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/dc24b4d1-0ea7-4afd-914b-55c9656fa3ed/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/dc24b4d1-0ea7-4afd-914b-55c9656fa3ed/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/6766baae-dcfb-4de5-9593-6d55e1b1164b/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/6766baae-dcfb-4de5-9593-6d55e1b1164b/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/6766baae-dcfb-4de5-9593-6d55e1b1164b/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/6766baae-dcfb-4de5-9593-6d55e1b1164b/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/6766baae-dcfb-4de5-9593-6d55e1b1164b/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/6766baae-dcfb-4de5-9593-6d55e1b1164b/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/d1f55db4-abeb-4b6f-a5e8-f2cfc3c0b7b9/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/d1f55db4-abeb-4b6f-a5e8-f2cfc3c0b7b9/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/d1f55db4-abeb-4b6f-a5e8-f2cfc3c0b7b9/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/d1f55db4-abeb-4b6f-a5e8-f2cfc3c0b7b9/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/d1f55db4-abeb-4b6f-a5e8-f2cfc3c0b7b9/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/d1f55db4-abeb-4b6f-a5e8-f2cfc3c0b7b9/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/6821330d-4204-4916-9389-4dfd10eec781/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/6821330d-4204-4916-9389-4dfd10eec781/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/6821330d-4204-4916-9389-4dfd10eec781/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/6821330d-4204-4916-9389-4dfd10eec781/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/6821330d-4204-4916-9389-4dfd10eec781/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/6821330d-4204-4916-9389-4dfd10eec781/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/c907dc7b-716f-40bb-81d9-2f344758f0e6/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/c907dc7b-716f-40bb-81d9-2f344758f0e6/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/c907dc7b-716f-40bb-81d9-2f344758f0e6/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/c907dc7b-716f-40bb-81d9-2f344758f0e6/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/c907dc7b-716f-40bb-81d9-2f344758f0e6/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/c907dc7b-716f-40bb-81d9-2f344758f0e6/1920.webp',
          },
        ],
      },
      {
        imageDimensions: [
          {
            width: 320,
            height: 180,
            url: 'https://images.finder.porsche.com/8721c390-9080-4fd7-9552-076fb0cd2982/320.webp',
          },
          {
            width: 640,
            height: 360,
            url: 'https://images.finder.porsche.com/8721c390-9080-4fd7-9552-076fb0cd2982/640.webp',
          },
          {
            width: 960,
            height: 540,
            url: 'https://images.finder.porsche.com/8721c390-9080-4fd7-9552-076fb0cd2982/960.webp',
          },
          {
            width: 1280,
            height: 720,
            url: 'https://images.finder.porsche.com/8721c390-9080-4fd7-9552-076fb0cd2982/1280.webp',
          },
          {
            width: 1600,
            height: 900,
            url: 'https://images.finder.porsche.com/8721c390-9080-4fd7-9552-076fb0cd2982/1600.webp',
          },
          {
            width: 1920,
            height: 1080,
            url: 'https://images.finder.porsche.com/8721c390-9080-4fd7-9552-076fb0cd2982/1920.webp',
          },
        ],
      },
    ],
    orderTypeCode: '97ADB1',
    warranty: {
      porscheApproved: true,
    },
  },
  ctaLabel: 'Call to action',
  dealerId: 'c1rt9Og2a',
  numberOfOwnersLabel: 'Number of owners',
});
</script>
<template>
  <Story
    title="v2/modules/car-finder/CarFinderCard"
    icon="simple-icons:porsche"
  >
    <dwaas-car-finder-card v-bind="state"> </dwaas-car-finder-card>
  </Story>
</template>
