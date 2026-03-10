<!-- created by Aaron Meche -->
<script>
    import { db } from "$lib/data"

    let time_config
    db.subscribe(data => {
        time_config = data.time_config
    })

    const now = new Date();
    const time = now.getHours() % 12 + ":" + String(now.getMinutes()).padStart(2, '0')

</script>

<!--  -->

{#if time_config} 
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
{/if}

<!--  -->

<style>
    .time{
        position: absolute;
        line-height: 1;
    }
</style>