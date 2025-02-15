<script>
let num = 0
let search = '';
let searchdata = [];
let stylesfordiv = 'display: none; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';

function openmenu(){
    if (num == 0){
        nav.style.display = 'block';
        num = num + 1;
    }
    else if (num == 1){
        nav.style.display = 'none';
        num = num-1
    }

}
const getid = (id) =>{
    window.open(`/info?id=${id}`,"_self")
}
const opensearch = () =>{
    window.open(`/search?query=${search}`, '_self')
}
const searchanime = async() =>{
    const searchr = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
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

</script>
<div class="head">
    <div class="menuicon">
                <i on:click={openmenu} id="menubut" class="fa-solid fa-bars fa-xl" style=" margin-top: 10px; color: #ffffff;"></i>
            </div>
            <div class="header">
                <div class="logo">
                        <img loading="lazy" class="" src="/crampedanimuyi.png" alt="" height="20px" width="160px">
                </div>
                <div id="navpc" class="nav_links">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/home">Trending</a></li>
                        <li><a href="/search">Search</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
             </div>
                              <div class="searchbar">
                    <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
                    <input class="bar" on:change={searchanimepp} type="text" bind:value={search} placeholder="Search Anime"> 
                </div>
        </div>
        <div id="nav" class="nav_links_moble">
                <ul>
                    <div class="searchbarmob">
                    <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
                    <input class="bar" on:change={()=>opensearch(search)} type="text" bind:value={search} placeholder="Search Anime"> 
                    </div>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/home">Trending</a></li>
                    <li><a href="/home">Top</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>
            <br>
    </div>
<div style={stylesfordiv} id="results">
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                    <h3 class="center">Results</h3>
                    {#if searchdata.length > 0}
                    {#each searchdata as searchitem }
                        <div on:click={() => getid(searchitem.id)}>
                            <div class="resultlist">
                                <img loading="lazy" class="imgres" src={searchitem.coverImage.medium} alt="" width="100px">
                                <div class="datali">
                                    <h3 class="datalitxt">{searchitem.title.userPreferred}</h3>
                                    <h5>Episodes : {searchitem.episodes}</h5>
                                    <h5>Released : {searchitem.seasonYear}</h5>
                                    <h5>Type : {searchitem.format}</h5>
                                </div>
                            </div>
                        </div>
                    {/each}    
                    {:else}
                        <h2 class="center">Loading Resutls...</h2>
                    {/if}
                    
                </div>
