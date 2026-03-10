<!-- created by Aaron Meche -->
<script>
    export let data;

    const bgNameList = [
        "Castle", 
        "Autumn",
        "Hill"
    ]
    const fontList = [
        "NotoRashi",
        "Baskerville"
    ]
    const timeCustomConfigs = [
        {
            widget: {
                bottom: 0.001,
                left: 0.001,
                font: fontList[0],
                size: 1.5,
                opacity: 0.8,
            },
            font: {
                top: 10,
                size: 6,
                weight: 700,
                font: fontList[0],
            },
        },
        {
            widget: {
                font: fontList[0],
                size: 1.5,
                opacity: 0.8,
            },
            font: {
                bottom: 0.001,
                size: 9,
                weight: 600,
                font: fontList[1],
                opacity: 0.8,
            },
        },
        {
            widget: {
                font: fontList[0],
                size: 1.5,
                opacity: 0.8,
            },
            font: {
                bottom: 5,
                left: 5,
                size: 6,
                weight: 600,
                font: fontList[0],
                opacity: 0.6,
            }
        }
    ]
    const bgIndex = 2;
    const bg_url = `WP_${bgNameList[bgIndex]}.jpeg`
    const time_config = timeCustomConfigs[bgIndex].font
    const widget_config = timeCustomConfigs[bgIndex].widget

    const now = new Date();
    const time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0')
    const sunrise = new Date(data.sunrise).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
    const sunset = new Date(data.sunset).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
    
    const timeToSunrise = (Number(sunrise.split(":")[0]) - now.getHours()) + "h " + (Number(sunrise.split(":")[1]) - now.getMinutes()) + "m"
    const timeToSunset = Number(sunset.split(":")[0]) - now.getHours()

</script>

<!--  -->

<div class="screen">
    <div class="bg" style="background-image: url('{bg_url}')"></div>
    <div class="time" style="
        {time_config.top ? "top:" + time_config.top + "%;" : ""}
        {time_config.bottom ? "bottom:" + time_config.bottom + "%;" : ""}
        {time_config.left ? "left:" + time_config.left + "%;" : ""}
        {time_config.right ? "right:" + time_config.right + "%;" : ""}
        
        {time_config.top || time_config.bottom ? "" : "top: 0;"}
        {time_config.left || time_config.right ? "" : "text-align: center; width: 100%;"}
        
        font-size: {time_config.size || 6}rem;
        font-family: {time_config.font};
        font-weight: {time_config.weight};
        color: {time_config.color || "white"};
        opacity: {time_config.opacity || 1};

    ">{time}</div>
    <div class="widgets" style="
        {widget_config.top  ? "top:" + widget_config.top + "%;" : ""}
        {widget_config.bottom ? "bottom:" + widget_config.bottom + "%;" : ""}
        {widget_config.left ? "left:" + widget_config.left + "%;" : ""}
        {widget_config.right ? "right:" + widget_config.right + "%;" : ""}
        
        {widget_config.top || widget_config.bottom ? "" : "top: 0;"}
        {widget_config.top || widget_config.bottom ? "" : "right: 0;"}

        font-size: {widget_config.size || 2}rem;
        font-family: {widget_config.font};
        font-weight: {widget_config.weight};
        color: {widget_config.color || "white"};
        opacity: {widget_config.opacity || 1};
    ">
        <div class="item">
            {Math.round(data.temperature)}°F
        </div>
        <div class="item">
            {data.humidity}%
        </div>
        <div class="item">
            <i class="fa-regular fa-sun"></i>
            {timeToSunrise}
        </div>
    </div>
</div>

<!--  -->

<style>
    .screen{
        position: relative;
        margin: 4rem;
        background: black;
        aspect-ratio: 16 / 9;
    }

    .bg{
        height: 100%;
        width: 100%;
        background-position: center center;
        background-size: cover;
    }

    .time{
        position: absolute;
    }

    .widgets{
        position: absolute;
        display: flex;
        align-items: center;
        padding-inline: 0.75rem;
        padding-block: 1.5rem;
    }

    .widgets .item{
        margin-inline: 0.75rem;
    }

    .widgets i{
        margin-right: 0.3rem;
    }
</style>