<script>
    import Header from "../lib/Header.svelte";
    import Footer from "../lib/Footer.svelte";
  import { onMount } from "svelte";
    let search = '';
    let searchdata = [];
    let stylesfordiv = 'display: none; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';

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
const openhome = () =>{
    window.open("/home","_self")
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
                <p class="center">
                     <img class="toptext" src="/piratetokei.png" alt="" width="330px">
                </p>
               
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
                <p class="center">
                    <button on:click={openhome} class="buthome">View The Full Site <i class="fa-solid fa-arrow-right" style="color: #ffffff;"></i></button>
                </p>
                <br>


                    <div class="butshare">
                        <h4 class="centershare">Share With Your Friends </h4>
                        <img src="/chibi.gif" alt="" height="50px">
                    </div>
                <div class="content">
                    <br>
                    <h2 class="center">What is PirateTokei?</h2>
                    <p class="center">PirateTokei is a open source anime streaming site which is ad free and fast and community supported</p>
                </div>
        </div>
            <Footer/>
</div>