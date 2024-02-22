<script>
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import Swiper from 'swiper';
  import 'swiper/swiper-bundle.css'; // Import the Swiper CSS
  import { LocalStorageStore } from "../../stores/store";

  import { onMount } from "svelte";
  // import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
  import { slide } from "svelte/transition";
    let search = '';
    let divmain = 'display: block';
    let divload = 'display:none';
    let searchdata = [];
    let loadingtxt = 'May Take Time To Load...';
    let trendslide = [];
    let swiper;
    let data = {};
    let recentdata = {};
    let views = 4;
    let stylesfordiv = 'display: none; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
// const trendingload = async() => {
//     const response = await fetch('https://api-amvstrm.nyt92.eu.org/api/v2/trending');
//     let data = await response.json();
//     data = data['results'];
//     return data;
// }


// const trendingslide = async() =>{
//     const rep = await fetch("https://api-amvstrm.nyt92.eu.org/api/v2/trending");
//     trendslide = rep.json();
//     trendslide = trendslide['results']
// }

const getid = (id) =>{
    window.open(`/info?id=${id}`,"_self")
}
const searchanime = async() =>{
    const searchr = await fetch(`https://amvstrmapiprod-1-u6884838.deta.app/api/v2/search?q=${search}`)
    searchdata = await searchr.json();
    searchdata = searchdata['results'];
    return searchdata
}
let currentlywatching = LocalStorageStore('currentlywatch',[])
    export let currentw = currentlywatching.get();
    let curlen = currentw.length;
    const watchepid = (id) =>{
    window.open(`/watch?${id}`,"_self")
  }
const searchanimepp = () =>{
    if (search.length>0){
        searchanime()
    stylesfordiv = 'width: auto; display: block; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
    }
    else{
        stylesfordiv = 'display: none; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
    }
}
onMount(async()=>{
    swiper = new Swiper('.swiper-container', {
    autoplay: {
      delay: 3000, // Adjust the delay as needed (2 seconds in this example)
      disableOnInteraction: false,
    },
    loop: true, // Enable loop
  });
    register();
    let width = screen.width;
    if(width>1200){
        views = 4;
    }
    else if(width>900){
        views = 3;
    }
    else if(width>700){
        views= 2;
    }
    else if(width<900){
        views = 1;
    }
    swiper = new Swiper(".mySwiper", {
      slidesPerView: views,
      spaceBetween: 10,
    });
        divload = 'display:block'
    divmain = 'display:none'
    const response = await fetch('https://amvstrmapiprod-1-u6884838.deta.app//api/v2/popular');
    try{
        if(response.ok){
            data = await response.json();
        recentdata = data['results'];
        const trendd = await fetch('https://amvstrmapiprod-1-u6884838.deta.app//api/v2/trending')
        data = await trendd.json()
        data = data['results'];
        divload = 'display:none';
        divmain = 'display:block';
        }
        else{
                       divload = 'display:block';
    divmain = 'display:none';
        }
    }
    catch(error){
        loadingtxt = error;
            divload = 'display:block';
    divmain = 'display:none';
    }
    
    return data;
})
</script>
<svelte:head>
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-SDZHWZSFCG"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() { dataLayer.push(arguments); }
			gtag('js', new Date());

			gtag('config', 'G-SDZHWZSFCG');
		</script>
	<title>AniMuyi &bull; Home</title>
	<html lang="en" />
</svelte:head>
    <div style={divload} class="loadingb">
                <span class="loader"></span>
                <h3 class="center">{loadingtxt}</h3>
    </div>
<div style={divmain} class="back">
            <div class="main">
                <Header/>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        {#if data.length > 0}
                        {#each data as slidedata }
                    <div class="swiper-slide" on:click={()=> getid(slidedata.id)}  style="height: 500px; magrin:0;">
                            <div class="container">
                            <img class="imgslide" src={slidedata.bannerImage} alt="Cinque Terre" width="100%" height="400px">
                            <div class="bottomleft">
                                <h1 style="color: #ffffff; font-size: 180%;">{slidedata.title.english}</h1>
                                <div class="infoslide">
                                    <p style="margin: 5px; font-size:15px;"><i class="fa-solid fa-closed-captioning" style="color: #ffffff;"></i> {slidedata.totalEpisodes}</p>
                                    <br>
                                    <p style="margin: 5px; font-size:15px;"><i class="fa-solid fa-star" style="color: #ff3d64;"></i> {slidedata.averageRating}</p>
                                    <br>
                                    <p style="margin: 5px; font-size:15px;"><i class="fa-solid fa-calendar" style="color: #ffffff;"></i> {slidedata.year}</p>
                                    <br>
                                    <p style="font-weight:100; font-size:15px; margin: 5px;"><i class="fa-solid fa-clock" style="color: #ffffff;"></i> {slidedata.duration} mins</p>
                                </div>
                                <p class="descr">{slidedata.description}</p>
                                <div class="infoslide">
                                    <!-- <button class="watchbut"><i class="fa-solid fa-play" style="color: #ffffff;"></i> Watch Now</button> -->
                                    <button class="morebut"><i class="fa-solid fa-play" style="color: #ffffff;"></i> Watch Now</button>
                                </div>
                                

                            </div>
                        </div>
                    </div>
                    {/each}
                    {:else}
                        <h2>Loading Resutls...</h2>
                    {/if}
                    </div>
                </div>
               <br>
                
<!-- <h2 class="center">Continue Watching - {curlen}</h2>
<div class="swiper-container2">
    <div class="swiper-wrapper">
            {#if currentw.length > 0}
            {#each currentw as item}
            <div class="swiper-slide">
                
            </div>
            {/each}
            {:else}
            <h2 style="text-align: center;">No Anime In Currently Watching</h2>
            {/if}
    </div>
</div> -->
<div class="flex">
    <h2 style="margin-left: 5px;">Continue Watching - {curlen}</h2>
<a class="far" href="/currentlywatching">See All</a>
</div>
<div class="swiper mySwiper">
    <div class="swiper-wrapper">
        {#if currentw.length > 0}
            {#each currentw as item}
      <div class="swiper-slide">
                <div on:click={watchepid(item.episode)} class="gridshowlistc">
    <div class="container">
        <img src={item.coverImage} alt="" class="gridimgshowc">
        <div class="bottomleftc">
            <i class="fa-regular fa-circle-play fa-2xl" style="color: #ffffff;"></i>
        </div>
        <div class="bottomleftctxt">
                <p class="center">episode : {item.epnum}</p>
    <p class="center">{item.title}</p>
            </div>
    </div>
</div>
      </div>
      {/each}
            {:else}
            <h2 style="text-align: center;">No Anime In Currently Watching</h2>
            {/if}
    </div>
  </div>

                <h2 style="margin-left: 2%;">
                    <i class="fa-solid fa-arrow-trend-up" style="color: #ffffff;"></i> Trending
                </h2>
                <div class="members">
                {#if data.length > 0}
                    {#each data as item}
                            <div on:click={() => getid(item.id)} class="showlist">
                                <div class="container">
                                    <img class="imgshow" src={item.coverImage.large} alt="" width="100px">
                                <p class="center">{item.title.english}</p>
                                </div>
                            </div>
                    {/each}
                    {:else}
                    <h2 class="center">Loading trending animes</h2>
                {/if}
            </div>
        </div>
            <div class="recentmain">
                <br>
<div class="butshare">
                        <div class="butflex">
                            <h3 class="centershare">Share AniMuyi Your Friends </h3>
                            <br>
                            <img src="/chibi.gif" alt="" height="70px">
                        </div>
                        <p class="center">It motivates us to keep developing the site and adding more awesome content for you all</p>
                    </div>
                <h2 style="margin-left: 2%;">
                   <i class="fa-solid fa-fire" style="color: #ffffff;"></i> Popular
                </h2>
                <div class="recentmembers">
                   {#if recentdata.length > 0}
                    {#each recentdata as item}
                            <div on:click={() => getid(item.id)} id="animeitem" class="gridshowlist">
                                <img class="gridimgshow" src={item.coverImage.large} alt="" width="100px">
                                <p class="center">{item.title.english}</p>
                        </div>
                    {/each}
                    {:else}
                    <h2 class="center">Loading Popular Animes...</h2>
                {/if}
                </div>
            </div>

            <Footer/>
</div>