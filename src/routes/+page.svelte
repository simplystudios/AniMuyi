<script>
    import Header from "../lib/Header.svelte";
    import Footer from "../lib/Footer.svelte";
  import { onMount } from "svelte";
    let search = '';
    let searchdata = [];
    let stylesfordiv = 'display: none; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
const trendingload = async() => {
    const response = await fetch('https://api.consumet.org/anime/gogoanime/top-airing?page=1');
    let data = await response.json();
    data = data['results'];
    return data;
}

const recentlyupdatedload = async() => {
    const response = await fetch('https://api.consumet.org/anime/gogoanime/recent-episodes');
    let recentdata = await response.json();
    recentdata = recentdata['results'];
    return recentdata;
}

const getid = (id) =>{
    window.open(`/info?id=${id}`,"_self")
}
const searchanime = async() =>{
    const searchr = await fetch(`https://api.consumet.org/anime/gogoanime/${search}?page=1`)
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
	<title>Pirate Tokei &bull; Home</title>
	<html lang="en" />
</svelte:head>

<div class="back">
    <Header/>
            <div class="main">
                <p class="center">
                     <img class="toptext" src="/search.png" alt="" width="130px">
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
                                <img class="imgres" src={searchitem.image} alt="" width="100px">
                                <div class="datali">
                                    <h4 class="datalitxt">{searchitem.title}</h4>
                                    <h5>{searchitem.releaseDate}</h5>
                                    <h5>{searchitem.subOrDub}</h5>
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
                    <img class="toptext" src="/trending.png" alt="" width="130px">
                </p>
                <div class="members">
                {#await trendingload()}
                    <p>Loading trending animes</p>
                    {:then data}
                    {#each data as item}
                            <div on:click={() => getid(item.id)} class="showlist">
                                <img class="imgshow" src={item.image} alt="" width="100px">
                                <p class="center">{item.title}</p>
                            </div>
                    {/each}
                {/await}
            </div>
        </div>
            <div class="recentmain">
                <p class="center">
                    <img class="toptext" src="/airing.png" alt="" width="230px">
                </p>
                <div class="recentmembers">
                   {#await recentlyupdatedload()}
                    <p>Loading Recently Updated Animes</p>
                    {:then recentdata}
                    {#each recentdata as item}
                            <div on:click={() => getid(item.id)} id="animeitem" class="gridshowlist">
                                <img class="gridimgshow" src={item.image} alt="" width="100px">
                                <p class="center">{item.title}</p>
                        </div>
                    {/each}
                {/await}
                </div>
            </div>

            <Footer/>
</div>