<script>
  import { onMount } from "svelte";
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  // import { LocalStorageStore } from "../../stores/store"
  import MuxVideo from '../../lib/Videoplayer.svelte'
  import { get } from "svelte/store";

  let eps = []
  // let currentlywatching = LocalStorageStore('currentlywatch',[])
  // export let currentw = currentlywatching.get(); // This will log the data stored in 'myDataKey' in localStorage, or the initial value if not found.
  let responseData = {}; // Initialize a variable to store the response data
  let animeid;
  let dura = '';
  let epsd = '';
  let totalep = '';
  let animecolor = '';
  let epd = {}
  let related = {};
  let searchep = '';
  let stat = '';
  let subdub = '';
  let gogo = {};
  let desc = '';
  let release = '';
  let images = '';
  let search = '';
  let title = '';
  let epdata = {}
  let episodeid = ''
  let d = {}

 function sortbyname() {
    const searchTerm = searchep.toLowerCase();
    console.log(searchTerm);


  }

  onMount(async () => {
    let id = window.location.search;
    id = id.replace("?", "");
    episodeid = id;
    const regex = /^.+&/;
    let text = id
    const result = text.replace(regex, '');
    animeid = result;

    const resp = await fetch(`https://api-amvstrm.nyt92.eu.org/api/v2/stream/${id}`);
     
    if (resp.ok) {
      responseData = await resp.json();
      epsd = responseData['info'].episode;
      responseData = responseData['plyr']
    }
    else{
      console.log("error")
    }

    const res = await fetch(`https://api.amvstr.me/api/v2/info/${animeid}`);
    if (res.ok) {
      epdata = await res.json();
      title = epdata.title.userPreferred;
      images = epdata.coverImage.large;
      animecolor = epdata.coverImage.color;
      related = epdata['relation']
      totalep = epdata.episodes;
      release = epdata.year;
      subdub = epdata.format;
      gogo = epdata.id_provider;
      desc = epdata.description;
      dura = epdata.duration;
      stat = epdata.score.decimalScore;
      // console.log(eps);
      let epres = await fetch(`https://api.consumet.org/anime/gogoanime/info/${gogo.idGogo}`);
    if(epres.ok){
      epd = await epres.json();
      eps = epd['episodes'];
      
    }
    else{
      console.log('error')
    }
      // setcurrentwatch(epdata.title,episodeid)
      // currentw = currentlywatching.get();
      // console.log(currentw);   
      
      
    } else {
      console.error("Failed to fetch data");
    }
  });

  const watchepid = (epid,id) =>{
    window.open(`/watch?${epid}&${id}`,"_self")
  }
  const infopg = (id) =>{
    window.open(`/info?id=${id}`)
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
    <div class="anime" on:click={() => infopg(animeid)}>
      <img src={images} alt="" style="border: 1; border-radius: 3px;" height="200px">
      <div class="animed">
        <h2 style="margin: 0;">{title} </h2> 
        <div class="reld">
          <p><i class="fa-solid fa-closed-captioning" style="color: #ffffff;"></i> {totalep} </p>
          <p>&bull;</p>
          <p><i class="fa-solid fa-star" style="color: #ff3d64;"></i> {stat} </p>
          <p>&bull;</p>
          <p><i class="fa-regular fa-clock" style="color: #ffffff;"></i> {dura}m </p>
          <p>&bull;</p>
          <p>{subdub} </p>
          <p>&bull;</p>
          <p>{release} </p>
        </div>
        <p class="desp">{desc}</p>
      </div>
    </div>
    <div class="relations">
      <h2>Related Animes And Manga</h2>
      <div class="relatedanimes">
                   {#if related.length > 0}
                    {#each related as item}
                            <div on:click={() => getid(item.id)} id="animeitem" class="watchgridshowlist">
                                <img class="gridimgshow" src={item.coverImage.large} alt="" width="100px">
                                <p class="center">{item.title.userPreferred}</p>
                        </div>
                    {/each}
                    {:else}
                    <h2 class="center">Loading Related Animes/Mangas...</h2>
                {/if}
                </div>
    </div>
  </div>
  </div>
  <div class="wdata">
    <div class="ep">

<div class="epi"style=" background-color:${animecolor};">
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
    <h4>More Episodes of {title} - </h4>
    <div class="searchbar">
      <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
      <input bind:value={searchep} on:input={() => sortbyname()} class="bar" type="text" placeholder="Jump to an Episode...">
      
    </div>
    <br>
    {#if eps.length > 0}
    {#each eps as episode}
      <div class="eps" on:click={() => watchepid(episode.id,epdata.id)}>
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
