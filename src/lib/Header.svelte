<script>
let num = 0

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
</script>

<div class="head">  
        <div class="menuicon">
                <i on:click={openmenu} id="menubut" class="fa-solid fa-bars fa-xl" style=" margin-top: 10px; color: #ffffff;"></i>
            </div>
            <div class="header">
                <a href="/">
                    <div class="logo">
                        <img class="" src="/piratetokeirenew.png" alt="" height="60px" width="285">
                </div>
                </a>
                <div id="navpc" class="nav_links">
                    <ul style="background-color: var(--bcsecond)">
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Trending</a></li>
                        <li><a href="/">Top</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>
             </div>
        </div>
    </div>
            <div id="nav" class="nav_links_moble">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Trending</a></li>
                    <li><a href="/">Top</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>

