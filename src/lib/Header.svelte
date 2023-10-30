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
                        <img class="" src="/piratetokei.png" alt="" height="100px">
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
                    <li><a href="">Home</a></li>
                    <li><a href="">Trending</a></li>
                    <li><a href="">Top</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>

<style>
    :root {
    --backgrd: rgb(0, 0, 0);
    --bcsecond: rgb(24, 25, 28);
}
    /* Navigation Links Styles */
li,
a,
ul {
    align-items: center;
    background-color: var(--bcsecond);
    color: white;
    font-family: Poppins;
    font-size: 15px;
    padding-left: 15px;
    text-decoration: none;
}

.nav_links {
    background-color: var(--bcsecond);
    display: inline-flex;
    list-style: none;
    margin-right: 10px;
    margin-bottom: 22px;
}

.nav_links li {
    background-color: var(--bcsecond);
    display: inline-block;
    margin-top: 25px;
    padding: 5px;
    text-align: center;
}

.nav_links li a {
    background-color: var(--bcsecond);
    transition: all 0.3s ease 0s;
}

.nav_links li a:hover {
    color: #68e8e6;
}

.nav_links li a ul {
    background-color: var(--bcsecond);
    text-align: center;
    transition: all 0.3s ease 0s;
}

.nav_links_moble {
    background-color: var(--bcsecond);
    display: none;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 16px;
    text-align: center;
}

.nav_links_moble li {
    background-color: var(--bcsecond);
    display: block;
    margin-top: 25px;
    padding: 5px;
    text-align: center;
}

.nav_links_moble li a {
    background-color: var(--bcsecond);
    transition: all 0.3s ease 0s;
}

.nav_links_moble li a:hover {
    color: rgb(94, 232, 124);
}
.menuicon {
    display: none;
    margin-right: 45%;
    padding: 10px;
}
.logo {
    background-color: var(--bcsecond);
    cursor: pointer;
    display: flex;
    height: 60px;
    margin-bottom:50px;
    margin-left: 15px;
    margin-top: 25px;
    width: auto;
}
    @media only screen and (max-width: 600px) {
    .header {
        align-items: center;
        background-color: var(--bcsecond);
        display: flex;
        justify-content: space-between;
    }

    .head {
        background-color: var(--bcsecond);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo {
        align-items: center;
        background-color: var(--bcsecond);
        justify-content: center;
        margin-left: 0px;
        margin-right: 50px;
        margin-top: 8px;
        margin-bottom: 5px;
        padding: 10px;
        width: 80px;
    }

    .menuicon {
        background-color: var(--bcsecond);
        display: inline-flex;
        margin-top: 0px;
    }

    .nav_links {
        display: none;
        padding: 10px;
        text-align: center;
    }
}
</style>