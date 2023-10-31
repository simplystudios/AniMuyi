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
  <p class="center">
  <img src={data.image} alt="" width="300px">    
  </p>
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
<style>
  .title {
    text-align: center;
  }
  .eps{
    padding: 1px;
    margin: 10px;
    background-color: rgb(46, 46, 46);
    border: 1;
    border-radius: 6px;
  }
  .eps:hover{
    background-color: #d9f520;
    color: black;
    box-shadow: #d9f520;
  }
  .center {
    text-align: center;
  }
  .centerp {
    text-align: center;
    font-size: 18px;
  }
  .info{
    display: flex;
  }
  .data{
    padding: 10px;
  }
  @media only screen and (max-width : 700px) {
    .info{
    display: block;
  }
  }
</style>
