<!-- created by Aaron Meche -->
<script>
    import { db } from "$lib/data"
    export let data    

    let widget_config
    db.subscribe(data => {
        widget_config = data.widget_config
    })

    const now = new Date();
    const sunrise = new Date(data.sunrise).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
    const sunset = new Date(data.sunset).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
    
    function calcTimeUntil(time) {
        let inHr = Number(time.split(":")[0])
        let inMin = Number(time.split(":")[1])
        let hrUntil = inHr - now.getHours();
        let minUntil = inMin - now.getMinutes();
        if (minUntil < 0) minUntil += 60

        return hrUntil + "h " + minUntil + "m"
    }
    const timeToSunrise = calcTimeUntil(sunrise)
    const timeToSunset = calcTimeUntil(sunset)
    const hrUntilSunset = sunset.split(":")[0] - now.getHours()
    const hrUntilSunrise = sunrise.split(":")[0] - now.getHours()

    const timeUntilRain = data.hoursUntilRain.split(":")[0] + "h"
</script>

<!--  -->

{#if widget_config} 
<div class="widgets" style="
    {widget_config.top  ? "top:" + widget_config.top + "%;" : ""}
    {widget_config.bottom ? "bottom:" + widget_config.bottom + "%;" : ""}
    {widget_config.left ? "left:" + widget_config.left + "%;" : ""}
    {widget_config.right ? "right:" + widget_config.right + "%;" : ""}
    
    {widget_config.top || widget_config.bottom ? "" : "top: 1rem;"}
    {widget_config.left || widget_config.right ? "" : "justify-content: center; width: 100%;"}

    font-size: {widget_config.size || 1}rem;
    font-family: {widget_config.font};
    font-weight: {widget_config.weight || 400};
    color: {widget_config.color || "white"};
    opacity: {widget_config.opacity || 1};
">
    <div class="item">
        <i class="fa-solid fa-temperature-half"></i>
        {Math.round(data.temperature)}°F
    </div>
    <div class="item">
        <div class="fa-solid fa-water"></div>
        {data.humidity}%
    </div>
    <div class="item">
        <i class="fa-solid fa-droplet"></i>
        {timeUntilRain}
    </div>
    {#if hrUntilSunrise < 0}    
        <!-- Until Sunset -->
        <div class="item">
            <i class="fa-regular fa-sun"></i>
            {timeToSunset}
        </div>
    {:else}
        <!-- Until Sunrise -->
        <div class="item">
            <i class="fa-regular fa-moon"></i>
            {timeToSunrise}
        </div>
    {/if}
</div>
{/if}

<!--  -->

<style>
    .widgets{
        position: absolute;
        display: flex;
        align-items: center;
    }

    .widgets .item{
        margin-inline: 0.75rem;
    }

    .widgets i{
        font-size: 75%;
        margin-right: 0.3rem;
    }
</style>