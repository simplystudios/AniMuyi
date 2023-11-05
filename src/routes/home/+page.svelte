<script>
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
//   import { Splide, SplideSlide } from '@splidejs/svelte-splide';
//   import '@splidejs/svelte-splide/css';
  import { onMount } from "svelte";
    let search = '';
    let searchdata = [];
    let trendslide = [];
    let stylesfordiv = 'display: none; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
const trendingload = async() => {
    const response = await fetch('https://api-amvstrm.nyt92.eu.org/api/v2/trending');
    let data = await response.json();
    data = data['results'];
    return data;
}

const recentlyupdatedload = async() => {
    const response = await fetch('https://api-amvstrm.nyt92.eu.org/api/v2/popular');
    let recentdata = await response.json();
    recentdata = recentdata['results'];
    return recentdata;
}

// const trendingslide = async() =>{
//     const rep = await fetch("https://api-amvstrm.nyt92.eu.org/api/v2/trending");
//     trendslide = rep.json();
//     trendslide = trendslide['results']
// }

const getid = (id) =>{
    window.open(`/info?id=${id}`,"_self")
}
const searchanime = async() =>{
    const searchr = await fetch(`https://api-amvstrm.nyt92.eu.org/api/v2/search?q=${search}`)
    searchdata = await searchr.json();
    searchdata = searchdata['results'];
    console.log(searchdata)
    return searchdata
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
    trendingload()
    recentlyupdatedload()
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
	<title>Pirate Tokei &bull; Home</title>
	<html lang="en" />
</svelte:head>

<div class="back">
    <Header/>
            <div class="main">
                <!-- <div class="slider">
                    <Splide aria-label="My Favorite Images">
                    <SplideSlide>
                            <p class="center">
                                <img src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg" alt="">
                            </p>
                    </SplideSlide>
                    <SplideSlide>
                        <p class="center">
                            <img src="onepiece-poster.jpg" width="90%" alt="Image 2"/>
                        </p>
                    </SplideSlide>
                </Splide>
                </div> -->
                <br>
                <h1 class="center">
                  Search   
                </h1>
               <br>
                <div class="searchbar">
                    <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
                    <input class="bar" on:change={searchanimepp} type="text" bind:value={search} placeholder="Search Anime"> 
                </div>
                <div style={stylesfordiv} id="results">
                    <h3 class="center">Results</h3>
                    {#if searchdata.length > 0}
                    {#each searchdata as searchitem }
                        <div on:click={() => getid(searchitem.id)}>
                            <div class="resultlist">
                                <img class="imgres" src={searchitem.coverImage.medium} alt="" width="100px">
                                <div class="datali">
                                    <h4 class="datalitxt">{searchitem.title.english}</h4>
                                    <h5>Episodes : {searchitem.episodes}</h5>
                                    <h5>Mal Score : {searchitem.averageScore}</h5>
                                </div>
                            </div>
                        </div>
                    {/each}    
                    {:else}
                        <h2>Loading Resutls...</h2>
                    {/if}
                    
                </div>
                <br>
                
                <h1 class="center">
                    Trending
                </h1>
                <br>
                <div class="members">
                {#await trendingload()}
                    <h2 class="center">Loading trending animes</h2>
                    {:then data}
                    {#each data as item}
                            <div on:click={() => getid(item.id)} class="showlist">
                                <img class="imgshow" src={item.coverImage.large} alt="" width="100px">
                                <p class="center">{item.title.english}</p>
                            </div>
                    {/each}
                {/await}
            </div>
        </div>
            <div class="recentmain">
                <br>
<div class="butshare">
                        <div class="butflex">
                            <h3 class="centershare">Share PirateTokei Your Friends </h3>
                            <br>
                            <img src="/chibi.gif" alt="" height="70px">
                        </div>
                        <p class="center">It motivates us to keep developing the site and adding more awesome content for you all</p>
                    </div>
<br>
                <h1 class="center">
                    Popular
                </h1>
                <br>
                <div class="recentmembers">
                   {#await recentlyupdatedload()}
                    <h2 class="center">Loading Recently Updated Animes</h2>
                    {:then recentdata}
                    {#each recentdata as item}
                            <div on:click={() => getid(item.id)} id="animeitem" class="gridshowlist">
                                <img class="gridimgshow" src={item.coverImage.large} alt="" width="100px">
                                <p class="center">{item.title.english}</p>
                        </div>
                    {/each}
                {/await}
                </div>
            </div>

            <Footer/>
</div>