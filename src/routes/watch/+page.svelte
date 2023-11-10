<script>
  import { onMount } from "svelte";
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  // import { LocalStorageStore } from "../../stores/store"
  import MuxVideo from '../../lib/Videoplayer.svelte'

  let eps = []
  // let currentlywatching = LocalStorageStore('currentlywatch',[])
  // export let currentw = currentlywatching.get(); // This will log the data stored in 'myDataKey' in localStorage, or the initial value if not found.
  let responseData = {}; // Initialize a variable to store the response data
  let animeid;
  let epsd = '';
  let totalep = '';
  let subdub = '';
  let desc = '';
  let release = '';
  let images = '';
  let search = '';
  let title = '';
  let epdata = {}
  let episodeid = ''
  let d = {}
  onMount(async () => {
    let id = window.location.search;
    id = id.replace("?", "");
    episodeid = id;
    const regex = /^.+&/;
    let text = id
    const result = text.replace(regex, '');
    animeid = result;

    console.log(id);

    const resp = await fetch(`https://api-amvstrm.nyt92.eu.org/api/v2/stream/${id}`);
     
    if (resp.ok) {
      responseData = await resp.json();
      epsd = responseData['info'].episode;
      responseData = responseData['plyr']
    }
    else{
      console.log("error")
    }

    const res = await fetch(`https://api.consumet.org/anime/gogoanime/info/${animeid}`);
    if (res.ok) {
      epdata = await res.json();
      eps = epdata["episodes"];
      title = epdata.title;
      images = epdata.image;
      totalep = epdata.totalEpisodes;
      release = epdata.releaseDate;
      subdub = epdata.subOrDub;
      desc = epdata.description;
      console.log(eps);
      // setcurrentwatch(epdata.title,episodeid)
      currentw = currentlywatching.get();
      console.log(currentw);   
      
      
    } else {
      console.error("Failed to fetch data");
    }
  });
  const watchepid = (epid,id) =>{
    window.open(`/watch?${epid}&${id}`,"_self")
  }
//   export function setcurrentwatch(title, epsode){
//   $currentlywatching = [
//     {
//       title:`${title}`,
//       episode:`${epsode}`
//     },
//     ...$currentlywatching
//   ]
// }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SDZHWZSFCG"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() { dataLayer.push(arguments); }
			gtag('js', new Date());

			gtag('config', 'G-SDZHWZSFCG');
		</script>
	<title>{title} &bull; episode : {epsd}</title>
	<html lang="en" />
</svelte:head>

<Header/>
<br>
<br>
<br>
<br>
<div class="watchinfo">
  <div class="coveriframe">
    <iframe allow="autoplay; fullscreen; picture-in-picture; xr-spatial-tracking; clipboard-write" allowfullscreen class="frame" src={responseData.main} frameborder="0"></iframe>
     <div class="animeinfo">
    <div class="anime"> 
      <img src={images} alt="" height="200px">
      <div class="animed">
        <h2 style="margin: 0;">{title}</h2> 
        <div class="reld">
          <p>{subdub}</p>
          <p>&bull;</p>
          <p>{totalep} episodes</p>
          <p>&bull;</p>
          <p>{release}</p>
        </div>
        <p class="desp">{desc}</p>
      </div>
    </div>
  </div>
  </div>
  <div class="data">
    <div class="ep">

<div class="epi">
  <br>
<div class="butshare">
                        <div class="butflex">
                            <h3 class="centershare">Share PirateTokei With Your Friends </h3>
                            <br>
                            <img src="/chibi.gif" alt="" height="70px">
                        </div>
                        <p class="center">It motivates us to keep developing the site and adding more awesome content for you all</p>
                    </div>
                    <br>
    <h4>More Episodes of {epdata.title} - </h4>
    <!-- <div class="searchbar">
      <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
      <input class="bar" type="text" placeholder="Jump to a Episode...">
    </div> -->
    <!-- <br> -->
    {#if eps.length > 0}
    {#each eps as episode}
      <div on:click={() => watchepid(episode.id,epdata.id)}  class="eps">
        <h4 class="centerr">episode : {episode.number}</h4>
      </div>
    {/each}
{:else}
  <h2 class="centerr">Loading episodes...</h2>
{/if}
</div>
  </div>
</div>
</div>

<Footer/>
