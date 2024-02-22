<script>
    import Header from "../../lib/Header.svelte";
    import Footer from "../../lib/Footer.svelte";
    import { onMount } from "svelte";
    let search = '';
    let searchdata = [];
    let stylesfordiv = 'display: none; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';

const getid = (id) =>{
    window.open(`/info?id=${id}`,"_self")
}
const searchanime = async() =>{
    const searchr = await fetch(`https://amvstrmapiprod-1-u6884838.deta.app//api/v2/search?q=${search}`)
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
	<title>AniMuyi</title>
	<html lang="en" />
</svelte:head>
<Header/>
<div class="back">
            <div class="mains">
                <br>
                <br>
                <br>
                <br>
                <p class="center">
                     <img loading="lazy" class="toptext" src="/animuyi.png" alt="" width="330px">
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
                                <img loading="lazy" class="imgres" src={searchitem.coverImage.medium} alt="" width="100px">
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
                   
                </p>
                <br>
                <br>
                <br>

        </div>
            <Footer/>
</div>