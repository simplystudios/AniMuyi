<script>
  import { onMount } from "svelte";
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import { LocalStorageStore } from "../../stores/store"
  import Hls from 'hls.js'
  import { get } from "svelte/store";
  import Artplayer from 'artplayer/dist/artplayer.js';


  let eps = []
  let currentlywatching = LocalStorageStore('currentlywatch',[])
  export let currentw = currentlywatching.get(); // This will log the data stored in 'myDataKey' in localStorage, or the initial value if not found.
  let responseData = {}; // Initialize a variable to store the response data
  let animeid;
  let epnum = '';
  let animecolor = '';
  let epd = {}
  let banneri = '';
  let iep = '';
  let medimg = '';
  let divmain = 'display: block';
  let divload = 'display:none';
  let related = {};
  let searchep = '';
  let stat = '';
  let subdub = '';
  let anid = '';
  let nexep = '';
  let totalep = '';
  let dura = '';
  let release = '';
  let malid = '';
  let ranimes = [];
  let rdata = {};
  let gogo = {};
  let desc = '';
  let images = '';
  let search = '';
  let title = '';
  let relh = 'margin-top:0';
  let epdata = {}
  let stylefordiv = 'display:block;'
  let episodeid = ''
  let d = {}

 function sortbyname() {
    const searchTerm = searchep.toLowerCase();


  }
  onMount(async () => {

    divload = 'display:block'
    divmain = 'display:none'
    let id = window.location.search;
    id = id.replace("?", "");
    episodeid = id;
    const regex = /^.+&/;
    let text = id
    const result = text.replace(regex, '');
    animeid = result;
    
    const resp = await fetch(`https://api.amvstr.me/api/v2/stream/${episodeid}`);
     
    if (resp.ok) {
      responseData = await resp.json();
      epnum = responseData.info.episode;
      const regex2 = /&.+/;
      epnum = epnum.replace(regex2,'');
      responseData = responseData.stream.multi.backup.url;
      iep = parseInt(epnum); 
      nexep = iep + 1;
      console.log(iep);
      console.log(nexep);
      function playM3u8(video, url, art) {
    if (Hls.isSupported()) {
        if (art.hls) art.hls.destroy();
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        art.hls = hls;
        art.on('destroy', () => hls.destroy());
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
        } else {
            art.notice.show = 'Unsupported playback format: m3u8';
        }
      }
      const art = new Artplayer({
        container: '.artplayer-app',
        url: responseData,
        type: 'm3u8',
        customType: {
        m3u8: playM3u8,
    },
    volume: 0.5,
    isLive: false,
    muted: false,
    fastForward: true,
    autoplay: true,
    pip: true,
    autoSize: false,
    autoMini: true,
    screenshot: false,
    flip: true,
    playbackRate: true,
    aspectRatio: true,
    fullscreen: true,
    miniProgressBar: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    airplay: true,
    theme: '#23ade5',
    setting: false,
    settings: [
        {
            html: 'setting01',
            selector: [
                {
                    html: 'setting01-01',
                },
                {
                    html: 'setting01-02',
                },
            ],
            onSelect: function () {
                console.info("args");
            },
        },
        {
            html: 'setting02',
            selector: [
                {
                    html: 'setting02-01',
                },
                {
                    html: 'setting02-02',
                },
            ],
            onSelect: function () {
                console.info("args");
            },
        },
    ],
        controls: [
            {
              position: 'right',
              html: `Next Ep ->`,
              index: 1,
              tooltip: 'Episode number',
              style: {
                  marginRight: '5px',
                  marginLeft:'5px',
              },
              click: function () {
                  let neexnum = nexep-1;
                  let neeps = eps[neexnum];
                  let neextepisodeid = neeps.id;
                  console.log(neextepisodeid);
            watchepid(neextepisodeid,anid)
              },
            },
        ],
        icons: {
          loading: '<img src="/buff.gif">',
          state: '<img width="150" heigth="150" src="/state.jpg">',
          indicator: '<img width="16" heigth="16" src="https://www.svgrepo.com/show/407735/white-circle.svg">',
          setting: '<i class="fa-solid fa-cog" style="color: #ffffff;"></i>',
        },
      });
      art.on('video:ended', (state) => {
        let nexnum = nexep-1;
        let neps = eps[nexnum];
        let nextepisodeid = neps.id;
        console.log(nextepisodeid);
        watchepid(nextepisodeid,anid)
      });
      art.on('ready', () => {
    art.setting.show = true;
	setTimeout(() => {
		art.setting.show = false;
	}, 1000);
});
    }
    else{
      console.log("error")
    }

    const res = await fetch(`https://api.amvstr.me/api/v2/info/${animeid}`);
    if (res.ok) {
      epdata = await res.json();
      title = epdata.title.userPreferred;
      anid = epdata.id;
      images = epdata.coverImage.large;
      banneri = epdata.bannerImage;
      medimg = epdata.coverImage.medium;
      animecolor = epdata.coverImage.color;
      related = epdata['relation']
      totalep = epdata.episodes;
      release = epdata.year;
      subdub = epdata.format;
      malid = epdata.idMal;
      dura = epdata.duration;
      stat = epdata.score.decimalScore;
      gogo = epdata.id_provider;
      desc = epdata.description;
      divload = 'display:none'
      divmain = 'display:block'
      // console.log(eps);
      let epres = await fetch(`https://api.amvstr.me/api/v2/episode/${animeid}`);
    if(epres.ok){
      epd = await epres.json();
      eps = epd['episodes'];
      if(eps.length>0){
        relh='margin-top:0';
      }
      else{
        relh='margin-top:100px'
      }
    }
    else{
      console.log('error')
    }
    currentw = currentlywatching.get();
const cur = currentw.filter((cur) => cur.episode === episodeid);
const curIndex = currentw.findIndex((cur) => cur.anid === animeid);
if (cur.length > 0) {

} else {
 if (curIndex !== -1) {
  // Anime ID already exists, update the episodeid and epnum
  currentw[curIndex].episode = episodeid;
  currentw[curIndex].epnum = epnum;

  // Update LocalStorageStore with the modified data
  currentlywatching.set(currentw);
} else {
  // Anime ID doesn't exist, add a new entry
  setcurrentwatch(title, episodeid, banneri, dura, animeid, epnum);
}
}

      
      
    } else {
      console.error("Failed to fetch data");
    }
    let relatedanimes = await fetch(`https://api.jikan.moe/v4/anime/${malid}/recommendations`)
        if (relatedanimes.ok){
          stylefordiv = 'display:block;'
          rdata = await relatedanimes.json();
          ranimes = rdata['data'];
        }
        else{
          stylefordiv = 'display:none;'
        }
  });

  const watchepid = (epid,id) =>{
    window.open(`/watch?${epid}&${id}`,"_self")
  }
  const infopg = (id) =>{
    window.open(`/info?id=${id}`)
  }
  export function setcurrentwatch(title, epsode, cover, dura, anid,epnum){
  $currentlywatching = [
    {
      coverImage:`${cover}`,
      title:`${title}`,
      duration:`${dura}`,
      anid:`${anid}`,
      epnum:`${epnum}`,
      episode:`${epsode}`
    },
    ...$currentlywatching
  ]
}
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SDZHWZSFCG"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() { dataLayer.push(arguments); }
			gtag('js', new Date());

			gtag('config', 'G-SDZHWZSFCG');
		</script>
	<title>{title} &bull; episode : {epnum}</title>
	<html lang="en" />
</svelte:head>
<div style={divload}>
  <span class="loader"></span>
</div>
<div style={divmain}>
    <Header/>
<br>
<br>
<br>
<br>
<br>
  <div class="watchinfo">
  <div class="coveriframe">
    <div class="artplayer-app"></div>
<div>
  <div class="butep">
                        <div class="butflex">
                            <p class="centershare">Currently Watching Episode {iep} of {title}</p>
                            <br>
                        </div>
                    </div>
                    <br>
    <div class="animeinfo">
        <div class="anime" on:click={() => infopg(animeid)}>
      <img class="animeimg" loading="lazy" src={images} alt="" style="border: 1; border-radius: 3px;" height="200px">

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

  </div>
  </div>
  <div class="wdata">
    <div class="ep">
      <h4 class="centerr">More Episodes of {title} : </h4>
    <div class="searchbar">
      <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
      <input bind:value={searchep} on:input={() => sortbyname()} class="bar" type="text" placeholder="Jump to an Episode...">
      
    </div>
    <div class="epsout">
      {#if eps.length > 0}
      {#each eps as episode}
      <div class="eps" on:click={() => watchepid(episode.id,epdata.id)}>
        <h4 class="centerr">{episode.number}</h4>
      </div>
      {/each}
{:else}
  <h2 class="centerr">Loading episodes...</h2>
{/if}
    </div>

<div class="epi"style=" background-color:${animecolor};">
</div>
  </div>
</div>
</div>
<div style={relh}>
  <div style={stylefordiv}>
    <br>

    <br>
      <h2 class="centerr">Related Animes</h2>
      <div class="relatedanimes">
                   {#if ranimes.length > 0}
                    {#each ranimes as item}
                            <div on:click={() => infopg(item.entry.mal_id)} id="animeitem" class="watchgridshowlist">
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
</div>

<Footer/>
</div>
