<script>
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import { onMount } from "svelte";
  
  export let color = '';
  let data = {};
  let infonew
  let id = '';
  let repod = {};
  let stat = '';
  let subdub = '';
  let totalep = '';
  let dura = '';
  let release = '';
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
    const resp = await fetch(`https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`);
    if (resp.ok) {
      data = await resp.json();
      titles = data.title;
      images = data.coverImage;
      color = data.coverImage.color;
      pro = data.id_provider;
      status = data.status;
      release = data.year;
      subdub = data.format;
      dura = data.duration;
      stat = data.score.decimalScore;
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
        nextime = date + ' ' + month + ' ' + year + '   ' + hour + ':' + min;
        }
  
      const repo = await fetch(`https://api.consumet.org/anime/gogoanime/info/${pro.idGogo}`)
      if(repo.ok){
        repod = await repo.json();
        ep = repod["episodes"];
        totalep = repod.totalEpisodes;
      }
      else{
        const repo = await fetch(`https://api.consumet.org/anime/gogoanime/info/${pro.idGogoDub}`)
      if(repo.ok){
        repod = await repo.json();
        ep = repod["episodes"];
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
	<title>AniMuyi &bull; {titles.english}</title>
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
<div class="container">
  <div class="banner">
    <img src={data.bannerImage} alt="" width="100%" height="">
  </div>
  <div>
    <div class="info">
      <div class="cover">
          <img style="border-radius: 5px;" src={images.large} alt="" height="auto">  
        
        <h2 class="title">{titles.english}</h2>
        <h4 class="center">{titles.native}</h4>
        <div class="ireld">
          <p style="margin-right: 10px;"><i class="fa-solid fa-closed-captioning" style="color: #ffffff;"></i> {repod.totalEpisodes} </p>
          <br>
          <p style="margin-right: 10px;"><i class="fa-solid fa-star" style="color: #ff3d64;"></i> {stat} </p>
          <br>
          <p style="margin-right: 10px;"><i class="fa-regular fa-clock" style="color: #ffffff;"></i> {dura}m </p>
          <br>
          <p>{release} </p>
        </div>
        <div class="newep" style={`background-color:${images.color};`}>
            <h4 style="color: white;" bind:this={infonew} class="center"><i class="fa-solid fa-certificate" style="color: #ffffff;"></i> New Episode {air.episode} on : {nextime}</h4>
        </div>
        <p class="center">{data.description}</p>
      </div> 
      <div class="data">
        <h2 class="center">Episodes - {repod.totalEpisodes}</h2>
        {#if ep.length > 0}
          {#each ep as episode}
          <div style="--hoverc:{color}" on:click={() => watchepid(episode.id,id)}  class="eps">
            <h4 class="center">episode : {episode.number}</h4>
          </div>
          {/each}
        {:else}
          <h2 class="center">Loading episodes...</h2>
        {/if}
    </div>
</div>
</div>
</div>
<Footer />
   
<style>
  eps:hover{
    background-color: var(--hoverc) ;
  }
</style>