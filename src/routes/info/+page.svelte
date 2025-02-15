<script>
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import { Pulse } from 'svelte-loading-spinners';
  import { onMount } from "svelte";
  
  let color = '';
  let data = {};
  let infonew
  let id = '';
  let stylefordiv = 'display:block;'
  let repod = {};
  let pages = 0;
  let img_large = '';
  let searchep = '';
  let divmain = 'display: block';
    let divload = 'display:none';
  let loadingtxt = 'Loading...';
  let desc = '';
  let genre =[];
  let malid = '';
  let stat = '';
  let subdub = '';
  let totalep = '';
  let dura = '';
  let epnumse = '';
  let title_eng = '';
  let title_nav = '';
  let release = '';
  let currentpage = 0
  let ep = [];
  let titles = {};
  let images = {};
  let pro = {};
  let air = {};
  let nextime = '';
  let rdata = {};
  let ranimes = [];
  let dateair = '';
  let getid;
  let status = '';

  onMount(async () => {
    id = window.location.search;
    id = id.replace("?id=", "");

    getid = (id) =>{
    window.open(`/info?id=${id}`,"_self")
} 
            divload = 'display:block'
        divmain = 'display:none'
    let resp = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (resp.ok) {
      divload = 'display:none'
      divmain = 'display:block'
      data = await resp.json();
      data = data.data;
      // let respr = await fetch(`https://api.malsync.moe/mal/anime/${id}`);
      // if (respr.ok) {
      //   pro = await respr.json();
      //   pro = pro.data;
      //   id = pro.Sites.Gogoanime.
      //   console.log(pro)
      // }
      // else{
      //   console.log("error")
      // }
      titles = data.title_english;
      images = data.images.jpg.image_url;
      color = data.color;
      genre = data.genres;
      malid = data.id_mal;

      status = data.status;
      title_eng = data.title_english;
      desc = data.synopsis;
      title_nav = data.title_japanese;
      img_large = data.images.jpg.large_image_url;
      release = data.year;
      subdub = data.type;
      totalep = data.episodes;
      dura = data.duration;
      const repo = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`)
          if(repo.ok){
            repod = await repo.json();
            pages = repod['pagination'];
            ep = repod['data'];
            console.log(ep)
          }
          else{
            loadingtxt = "No Episodes For This Anime..."
          }
      }
      else{
          console.log("error")
        }
      stat = data.score;
      if(status=="FINISHED"){
        air = "completed"
        dateair = "completed"
        infonew.innerHTML = "Status : Completed"
      }
      else{
        if(data.nextair==null){
          air = "none"
          dateair="none"
        }
        else{
          air = data.nextair;
        dateair = air.airingAt;
        }
      }

        // const repo = await fetch(`https://api.anify.tv/episodes/${id}`)
        // if(repo.ok){
        //   repod = await repo.json();
        //   console.log(repod)
        //   ep = repod[0].episodes;
        // }
              divload = 'display:none'
        divmain = 'display:block'   
    let relatedanimes = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`)
        if (!relatedanimes.ok){
          stylefordiv = 'display:none;'
        }
        else{
          stylefordiv = 'display:block;'
          rdata = await relatedanimes.json();
          ranimes = rdata['data'];
          console.log(ranimes,rdata)
        }
  });
  const watchepid = (epid,id) =>{
    // epid = epid.replace("/","")
    window.open(`/watch?${epid}&${id}`,"_self")
  }
  const changepage = async (page) => {
    currentpage = page;
    const repo = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes?page=${page}`);
    if (repo.ok) {
      repod = await repo.json();
      ep = repod['data'];
      console.log("page changed", ep);
    } else {
      loadingtxt = "No Episodes For This Anime...";
    }

  }
  const searcheps = () => {
    if (epnumse !== null) {
        const sea = parseInt(epnumse.trim()); // Parse user input to an integer after trimming whitespace

        if (!isNaN(sea)) {
            const foundEpisode = ep.find(episode => episode.number === sea);
            if (foundEpisode !== undefined) {
                console.log("Episode found:", foundEpisode);
                // Update the ep array to contain only the found episode
                ep = [foundEpisode];
            } else {
                console.log("Episode not found.");
                // If episode not found, reset ep array to the original list of episodes
                ep = repod.episodes;
            }
        } else {
            console.log("Invalid input. Please enter a valid episode number.");
            ep = repod.episodes;
        }
    } else {
        console.log("User canceled the prompt.");
        ep = repod.episodes;
    }
}

</script>

<svelte:head>
	<title>AniMuyi &bull; {title_eng}</title>
	<html lang="en" />
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-SDZHWZSFCG"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() { dataLayer.push(arguments); }
			gtag('js', new Date());

			gtag('config', 'G-SDZHWZSFCG');
		</script>
</svelte:head>
<div style={divload} class="loadingb">

                <Pulse class="" size="60" color="rgb(112, 0, 198)" unit="px" duration="1s" />
            </div>
<div style={divmain} class="back">
  <Header />
<div class="container">
  <div class="banner">
    <img class="bannerimg" loading="lazy" src={data.image} alt="" width="100%" height="100%">
  </div>
  <div>
    <div class="info">
      <div class="cover">
          <img class="aimg" loading="lazy" style="border-radius: 5px;" src={img_large} alt="" height="280px">  
        
        <h2 class="title">{title_eng}</h2>
        <h4 class="center">{title_nav}</h4>
        <div class="ireld">
          <p style="margin-right: 10px;"><i class="fa-solid fa-closed-captioning" style="color: #ffffff;"></i> {totalep} </p>
          <br>
          <p style="margin-right: 10px;"><i class="fa-solid fa-star" style="color: #ff3d64;"></i> {stat} </p>
          <br>
          <p style="margin-right: 10px;"><i class="fa-regular fa-clock" style="color: #ffffff;"></i> {dura} </p>
          <br>
          <p>{release} </p>
        </div>
        <div class="ireld">
          {#each genre as gn}
            <p>{gn.name} </p>
            <p>&bull;</p>
          {/each}
        </div>
        <div class="newep" style={`background-color:${color};`}>
            <h4 style="color: white;" bind:this={infonew} class="center"><i class="fa-solid fa-certificate" style="color: #ffffff;"></i> {status}</h4>
        </div>
        <p class="center">{desc}</p>
      </div> 
      <div class="data">
        <h2 class="center">Episodes - {totalep}</h2>
        <br>
        <div style="margin-left:auto; margin-right:auto; width: 30rem;" class="searchbar">
          <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
          <input bind:value={epnumse} class="bar" on:input={searcheps} type="text" placeholder="Jump to an Episode...">
        </div>
        <div style="display:flex; padding:10px; align-items: center;">

          <div style="width: 20px; height:20px; background-color: rgb(112, 0, 198); margin-right: 2px;"></div>
          <p>Filler</p>
        </div>
        {#if pages.has_next_page === true}
          <div style="display: flex; justify-content: space-between;">
            <button class="center" on:click={() => changepage(currentpage - 1)} disabled={currentpage <= 1}><i class="fa-regular fa-clock" style="color: #ffffff;"></i> Previous Page</button>
<button class="center" on:click={() => changepage(currentpage + 1)}><i class="fa-regular fa-clock" style="color: #ffffff;"></i> Next Page</button>
          </div>
        {/if}
      <div class="epsout">
        {#if ep.length >= 0}
          {#each ep as episode}
            {#if episode.filler === true}
              <div style="--hoverc:{color}; background-color:rgb(112, 0, 198);" on:click={() => watchepid(episode.mal_id,id)}  class="eps">
            <h4 class="centerr">{episode.mal_id}</h4>
          </div>
            {:else}
              <div style="--hoverc:{color};" on:click={() => watchepid(episode.mal_id,id)}  class="eps">
            <h4 class="centerr">{episode.mal_id}</h4>
          </div>
            {/if}
          {/each}
        {:else}
          <h2 class="center">{loadingtxt}</h2>
          <Pulse class="" size="60" color="rgb(112, 0, 198)" unit="px" duration="1s" />
        {/if}
        </div>
    </div>
</div>

</div>
<div style={stylefordiv}>
      <h2>For You</h2>
      <div class="relatedanimes">
                   {#if ranimes.length >= 0}
                    {#each ranimes as item}
                            <div on:click={() => getid(item.entry.mal_id)} id="animeitem" class="watchgridshowlist">
                                <img loading="lazy" class="gridimgshow" src={item.entry.images.webp.image_url} alt="" width="100px">
                                <p class="center">{item.entry.title}</p>
                        </div>
                    {/each}
                    {:else}
                    <Pulse class="" size="60" color="rgb(112, 0, 198)" unit="px" duration="1s" />
                    <h2 class="center">Loading Related Animes/Mangas...</h2>
                {/if}
              </div>
        </div>
  </div>
<Footer />
   
</div>
<style>
  eps:hover{
    background-color: var(--hoverc) ;
  }
  .center{
    text-align: center;
    background-color: blueviolet;
  }
</style>