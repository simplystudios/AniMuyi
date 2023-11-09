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
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
            <div class="main">
                <p class="center">
                     <img class="toptext" src="/piratetokei.png" alt="" width="330px">
                </p>
               
                <div class="searchbarmain">
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
                <br>
                <br>

                    <div class="butshare">
                        <div class="butflex">
                            <h3 class="centershare">Share With Your Friends </h3>
                            <br>
                            <img src="/chibi.gif" alt="" height="70px">
                        </div>
                        <p class="center">It motivates us to keep developing the site and adding more awesome content for you all</p>
                    </div>
                <div class="content">
                    <br>
                    <h2 class="center">What is Pirate Tokei and what does it offer?</h2>
                    <p class="center">Pirate Tokei is a free anime streaming platform that allows you to watch your favorite anime shows and movies online. It is open source, which means anyone can contribute to its development and improvement. It has no ads, which means you can enjoy your anime without any interruptions or distractions. It has fast loading times, which means you can watch your anime without any buffering or lagging. It has high quality, which means you can watch your anime in HD or even 4K resolution. It has easy UI, which means you can navigate and search for your anime with ease and convenience.</p>
                    <br>
                    <h2 class="center">How can I access Pirate Tokei and watch anime on it?</h2>
                    <p class="center">
                        You can access Pirate Tokei by visiting its website or downloading its app . You can watch anime on it by browsing through its categories, genres, or seasons, or by using its search bar to find the anime you want. You can also create an account and log in to save your watch history, favorites, and preferences.
                    </p>
                    <br>
                    <h2 class="center">How can I contribute to Pirate Tokei and support its development?</h2>
                    <p class="center">
                        You can contribute to Pirate Tokei by joining its community and providing feedback, suggestions, bug reports, or feature requests. You can also help by translating, coding, designing, or testing its website or app. You can support its development by donating or sharing it with your friends and fellow anime fans.
                    </p>
                </div>
        </div>
            <Footer/>
</div>