<script lang="ts">
    export let timezone = "Europe/Budapest";
    export let displayTimezone = false;
    let hours = "00";
    let mins = "00";
    let secs = "00";

    function updateClock() {
        const currentTime = new Date();

        // Format the time with the selected timezone
        const formattedTime = new Intl.DateTimeFormat('default', {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: timezone,
        }).format(currentTime);

        hours = formattedTime.split(":")[0];
        mins = formattedTime.split(":")[1];
        secs = formattedTime.split(":")[2];
    }
    updateClock();
    setInterval(updateClock, 1000);

</script>

<div id="clock" class="text-5xl font-bold text-center transition-all duration-500">
    <h1 class="text-5xl font-bold text-center transition-all duration-500">
        {hours} : {mins} : {secs}
    </h1>
    {#if displayTimezone}
    <h1 class="text-xl font-bold text-left transition-all duration-500">
        {timezone}
    </h1>
    {/if}
</div>