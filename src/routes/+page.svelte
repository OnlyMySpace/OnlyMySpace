<script lang="ts">
    import { goto } from '$app/navigation';
    import Profile from '../components/Profile.svelte';
</script>
<svelte:body data-theme="dracula"/>
<svelte:head>
    <title>OnlyMySpace</title>
</svelte:head>
<div class="flex flex-col justify-center items-center h-screen">
    <div class="z-50 flex justify-center items-center flex-col">
        <h1 class="text-3xl font-bold text-center">Welcome to OnlyMySpace!</h1>
        <p class="text-center text-2xl">
            A place where you can make your dream profile that is only your own!
        </p>
        <button on:click={() => goto('/auth/signup')} class="btn-primary btn my-4 rounded-md">Make your own profile for only 1$</button>
        <p class="text-lg text-center">
            Got an account already? <a href="/auth/login" class="link link-primary">Log in</a>!
        </p>
        <h1 class="text-3xl font-bold text-center">FAQ</h1>
        <div class="w-9/11 self-center mt-5 flex flex-col gap-4 sm:gap-2 sm:w-1/2">
            <div class="collapse collapse-arrow bg-neutral">
                <input type="radio" name="faq" checked={true} /> 
                <div class="collapse-title text-xl font-medium">
                    Does the background actually work?
                </div>
                <div class="collapse-content"> 
                    Yes! Try to click "Play".
                </div>
            </div>
            <div class="collapse collapse-arrow bg-neutral">
                <input type="radio" name="faq" checked={false} /> 
                <div class="collapse-title text-xl font-medium">
                  What can I actually customize?
                </div>
                <div class="collapse-content"> 
                  <p>You can customize almost any aspect of your profile. And if you got a thing you are missing, you can just write us your idea and we will add it!</p>
                </div>
            </div>
            <div class="collapse collapse-arrow bg-neutral">
                <input type="radio" name="faq" checked={false} /> 
                <div class="collapse-title text-xl font-medium">
                    What if something is wrong with my profile?
                </div>
                <div class="collapse-content"> 
                    If you have issues with your profile, make sure to let us know! And we will fix it immidiately.
                </div>
            </div>
        </div>
    </div>
    <div style="transform: rotateX(20deg)rotateZ(calc(-20deg * 1))skewY(calc(8deg * 1))" class="fixed w-1/2 h-1/2 opacity-20 top-0 left-0">
        <div class="mockup-browser border border-base-300">
            <div class="mockup-browser-toolbar">
              <div class="input border border-base-300">https://only-my.space/nano -- Click Play!</div>
            </div>
            <div class="flex justify-center px-4 py-16 border-t border-base-300">
                <Profile isExample={true}/>
            </div>
        </div>
    </div>
</div>