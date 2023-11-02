<svelte:head>
<script src="https://unpkg.com/@mux/mux-video@0.17.0/dist/mux-video.js" on:load={renderMuxVideo}></script>
</svelte:head>

<script>
// import '@mux-elements/mux-video'
export let src = ''
// export let onend = {}
let duration
let videoWidth
let videoHeight
let muxVideoEl
let renderTag = false
const scriptId = 'mux-video-script'

const onloadedmetadata = () => {
  if (muxVideoEl) {
    duration = muxVideoEl.duration
    videoWidth = muxVideoEl.videoWidth
    videoHeight = muxVideoEl.videoHeight

    console.log('onloadedmetadata', { duration, videoWidth, videoHeight })
  }
}

const renderMuxVideo = () => (renderTag = true)
if (scriptId) {
  renderTag = true
}
</script>

{#if renderTag}
    <mux-video
  bind:this="{muxVideoEl}"
  src="{src}"
  controls
  preload="metadata"
  autoplay
  on:play
  on:pause
  on:loadedmetadata="{onloadedmetadata}"
  on:ended>
</mux-video>
{/if}

<style>
mux-video {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>