<script lang="ts">
	import Profile from "../../components/Profile.svelte";
	import type { PageData } from "./$types";
    export let data: PageData
</script>
<Profile profile={JSON.parse(data.profile.toString())} views={data.views}/>