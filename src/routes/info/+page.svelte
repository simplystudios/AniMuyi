<script>
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import { onMount } from "svelte";
  
  let data = {};
  let id = '';
  let ep = [];

  onMount(async () => {
    id = window.location.search;
    id = id.replace("?id=", "");
    const resp = await fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`);
    if (resp.ok) {
      data = await resp.json();
    ep = data["episodes"];
    }
    else{
      console.log("failed to fetch data")
    }
  });
  const watchepid = (epid,id) =>{
    window.open(`/watch?${epid}&${id}`,"_self")
  }
</script>

<Header />
<div class="info">
  <img class="cover" src={data.image} alt="" height="450px">    
  <div class="data">
    <h2 class="title">{data.title}</h2>
    <h4 class="center">{data.otherName}</h4>
    <p class="centerp">{data.description}</p>
  </div>
</div>
<h2 class="center">Episodes - {data.totalEpisodes}</h2>
{#if ep.length > 0}
  {#each ep as episode}
  <div on:click={() => watchepid(episode.id,data.id)}  class="eps">
    <h4 class="center">episode : {episode.number}</h4>
  </div>
  {/each}
{:else}
  <p class="center">Loading episodes...</p>
{/if}

<Footer />

