<!-- created by Aaron Meche -->
<script>
    import { db, iterateBackground } from "$lib/data"
    import Time from "../lib/components/Time.svelte";
    import Widgets from "../lib/components/Widgets.svelte";
    export let data

    let bg_url
    db.subscribe(data => {
        bg_url = data.bg_url
    })

    function handleKeydown(event) {
        let code = event.code
        console.log(code)

        if (code == "KeyD") {
            iterateBackground()
        }
    }
</script>

<!--  -->

<svelte:window on:keydown={handleKeydown} />

<div class="screen">
    {#if bg_url}
        <div class="bg" style="background-image: url('{bg_url}')"></div>
    {/if}
    <Time />
    <Widgets {data} />
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
</style>