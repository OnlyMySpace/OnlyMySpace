<script lang="ts">
    export let songName: string;
    export let songUrl: string;
    export let songCover: string;
    export let songArtist: string;
    let playing = false;
    let vol = 1;
    let audio: HTMLAudioElement
    $: if (playing) {
        if (audio) {
            audio.play();
        }
    } else {
        if (audio) {
            audio.pause();
        }
    }
    $: if(vol) {
        if (audio) {
            audio.volume = vol;
        }
    }
</script>

<div class="card card-compact w-fit h-fit bg-base-100 shadow-xl">
    <figure><img src={songCover} alt="Album" class="h-52 w-52"/></figure>
    <div class="card-body">
        <h2 class="card-title">{songName}</h2>
        <p>{songArtist}</p>
        <input class="range" type="range" name="range" bind:value={vol} id="" min="0" max="1" step="0.01">
        <div class="card-actions justify-end">
            <button on:click={ () => playing = !playing} class="btn btn-primary">{playing ? "Pause" : "Play"}</button>
        </div>
        <audio hidden bind:this={audio}>
            <source src={songUrl} type="audio/mp3">
        </audio>
    </div>
</div>