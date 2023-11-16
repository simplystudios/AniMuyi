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

    let resp = await fetch(`https://api.amvstr.me/api/v2/info/${id}`);
    if (resp.ok) {
      data = await resp.json();
      titles = data.title;
      images = data.coverImage;
      color = data.coverImage.color;
      pro = data.id_provider;
      malid = data.idMal
      status = data.status;
      title_eng = data.title.english;
      desc = data.description;
      title_nav = data.title.native;
      img_large = data.coverImage.large;
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
        let relatedanimes = await fetch(`https://api.jikan.moe/v4/anime/${malid}/recommendations`)
        if (!relatedanimes.length==0){
          stylefordiv = 'display:none;'
        }
        else{
          stylefordiv = 'display:block;'
          rdata = await relatedanimes.json();
          ranimes = rdata['data'];
          console.log(ranimes,rdata)
        }

        const repo = await fetch(`https://api.amvstr.me/api/v2/episode/${id}`)
        if(repo.ok){
          repod = await repo.json();
          ep = repod["episodes"];
          totalep = ep.length;
        }
        else{
          const repo = await fetch(`https://api.consumet.org/anime/gogoanime/info/${pro.idGogo}`)
          if(repo.ok){
            repod = await repo.json();
            ep = repod["episodes"];
          }
          else{
            console.log("not able to find episodes")
          }
        }
      }
    else{
      resp = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
      data = await resp.json();
      data = data['data'];
      titles = data.title;
      title_eng = data.title;
      title_nav = data.title_japanese;
      img_large = data.images.webp.image_url;
      color = 'rgb(112, 0, 198)';
      pro = data.id_provider;
      malid = data.mal_id;
      status = data.status;
      release = data.year;
      subdub = data.type;
      dura = data.duration;
      desc = data.synopsis;
      stat = data.score;
    }
  });
  const watchepid = (epid,id) =>{
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
<Header />
<div class="container">
  <div class="banner">
    <img loading="lazy" src={data.bannerImage} alt="" width="100%" height="">
  </div>
  <div>
    <div class="info">
      <div class="cover">
          <img loading="lazy" style="border-radius: 5px;" src={img_large} alt="" height="auto">  
        
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
   
<style>
  eps:hover{
    background-color: var(--hoverc) ;
  }
</style>