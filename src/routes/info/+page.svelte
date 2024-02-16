<script>
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import { onMount } from "svelte";
  
  let color = '';
  let data = {};
  let infonew
  let id = '';
  let stylefordiv = 'display:block;'
  let repod = {};
  let img_large = '';
  let searchep = '';
  let divmain = 'display: block';
    let divload = 'display:none';
  let loadingtxt = 'Loading...';
  let desc = '';
  let malid = '';
  let stat = '';
  let subdub = '';
  let totalep = '';
  let dura = '';
  let title_eng = '';
  let title_nav = '';
  let release = '';
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
    let resp = await fetch(`https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`);
    if (resp.ok) {
      divload = 'display:none'
      divmain = 'display:block'
      data = await resp.json();
      titles = data.title;
      images = data.coverImage;
      color = data.color;
      malid = data.idMal;

      status = data.status;
      title_eng = data.title.english;
      desc = data.description;
      title_nav = data.title.native;
      img_large = data.coverImage.large;
      release = data.year;
      subdub = data.format;
      totalep = data.episodes;
      dura = data.duration;
      const repo = await fetch(`https://api-amvstrm.nyt92.eu.org/api/v2/episode/${id}`)
          if(repo.ok){
            repod = await repo.json();
            ep = repod.episodes;
            console.log(ep)
          }
          else{
            loadingtxt = "No Episodes For This Anime..."
          }
      }
      else{
          console.log("error")
        }
      stat = data.averageRating;
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
        var hour = a.getHours();
        var min = a.getMinutes();
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var ampm = hour >= 12 ? 'pm' : 'am';
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        nextime = date + ' ' + month + ' ' + hour + ':' + min + ' ' +ampm;
      }

        // const repo = await fetch(`https://api.anify.tv/episodes/${id}`)
        // if(repo.ok){
        //   repod = await repo.json();
        //   console.log(repod)
        //   ep = repod[0].episodes;
        // }
              divload = 'display:none'
        divmain = 'display:block'   
    else{
      console.log("error")
    }
    let relatedanimes = await fetch(`https://api.jikan.moe/v4/anime/${malid}/recommendations`)
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
    epid = epid.replace("/","")
    window.open(`/watch?${epid}&${id}`,"_self")
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
                <span class="loader"></span>
            </div>
<div style={divmain} class="back">
  <Header />
<div class="container">
  <div class="banner">
    <img class="bannerimg" loading="lazy" src={data.bannerImage} alt="" width="100%" height="100%">
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
          <p style="margin-right: 10px;"><i class="fa-regular fa-clock" style="color: #ffffff;"></i> {dura}m </p>
          <br>
          <p>{release} </p>
        </div>
        <div class="newep" style={`background-color:${color};`}>
            <h4 style="color: white;" bind:this={infonew} class="center"><i class="fa-solid fa-certificate" style="color: #ffffff;"></i> New Episode {air.episode} on : {nextime}</h4>
        </div>
        <p class="center">{desc}</p>
      </div> 
      <div class="data">
        <h2 class="center">Episodes - {totalep}</h2>
        <br>
        <div style="margin-left:auto; margin-right:auto; width: 30rem;" class="searchbar">
          <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
          <input class="bar" type="text" placeholder="Jump to an Episode...">
        </div>
        <br>
        {#if ep.length > 0}
          {#each ep as episode}
          <div style="--hoverc:{color}" on:click={() => watchepid(episode.id,id)}  class="eps">
            <h4 class="center">episode : {episode.number}</h4>
          </div>
          {/each}
        {:else}
          <h2 class="center">{loadingtxt}</h2>
        {/if}
    </div>
</div>
</div>
<div style={stylefordiv}>
      <h2>For You</h2>
      <div class="relatedanimes">
                   {#if ranimes.length > 0}
                    {#each ranimes as item}
                            <div on:click={() => getid(item.entry.mal_id)} id="animeitem" class="watchgridshowlist">
                                <img loading="lazy" class="gridimgshow" src={item.entry.images.webp.image_url} alt="" width="100px">
                                <p class="center">{item.entry.title}</p>
                        </div>
                    {/each}
                    {:else}
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
</style>