<script>
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import { onMount } from "svelte";
  
  let data = {};
  let infonew
  let id = '';
  let repod = {};
  let ep = [];
  let titles = {};
  let images = {};
  let pro = {};
  let air = {};
  let nextime = '';
  let dateair = '';
  let status = '';
  onMount(async () => {
    id = window.location.search;
    id = id.replace("?id=", "");
    console.log(id)
    const resp = await fetch(`https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`);
    if (resp.ok) {
      data = await resp.json();
      titles = data.title;
      images = data.coverImage;
      pro = data.id_provider;
      status = data.status;
      if(status=="FINISHED"){
        air = "completed"
        dateair = "completed"
        infonew.innerHTML = "Status : Completed"
      }
      else{
        air = data.nextair;
        dateair = air.airingAt;
        let unixTimestamp = dateair;
        var a = new Date(unixTimestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        nextime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
        }
  
        const repo = await fetch(`https://api.consumet.org/anime/gogoanime/info/${pro.idGogo}`)
      if(repo.ok){
        repod = await repo.json();
      ep = repod["episodes"];
      console.log(ep)
      }
      else{
        const repo = await fetch(`https://api.consumet.org/anime/gogoanime/info/${pro.idGogoDub}`)
      if(repo.ok){
        repod = await repo.json();
      ep = repod["episodes"];
      console.log(ep)
      }
      else{
        console.log("dead")
      }
      }
    }
    else{
      console.log("failed to fetch data")
    }
  });
  const watchepid = (epid,id) =>{
    window.open(`/watch?${epid}&${id}`,"_self")
  }
</script>

<svelte:head>
	<title>Pirate Tokei &bull; {titles.english}</title>
	<html lang="en" />
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-SDZHWZSFCG"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() { dataLayer.push(arguments); }
			gtag('js', new Date());

			gtag('config', 'G-SDZHWZSFCG');
		</script>
</svelte:head>

<Header />
<div class="info">
  <div class="cover">
    <img src={images.large} alt="" height="450px">  
  </div> 
  <div class="data">
      <h2 class="title">{titles.english}</h2>
      <h4 class="center">{titles.native}</h4>
      <h4 bind:this={infonew} class="center">New Episode {air.episode} on : {nextime}</h4>
      <p class="centerp">{data.description}</p>
  </div>
</div>
<h2 class="center">Episodes - {repod.totalEpisodes}</h2>
{#if ep.length > 0}
  {#each ep as episode}
  <div on:click={() => watchepid(episode.id,pro.idGogo)}  class="eps">
    <h4 class="center">episode : {episode.number}</h4>
  </div>
  {/each}
{:else}
  <h2 class="center">Loading episodes...</h2>
{/if}

<Footer />
   