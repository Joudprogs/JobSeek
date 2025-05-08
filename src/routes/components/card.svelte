

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    function handleClose() {
      dispatch('close');
    }
  </script>
  
  <div
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
    on:click={handleClose}
  >
    <div
      class="w-full max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 relative"
      on:click|stopPropagation
    >
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        on:click={handleClose}
      >
        ✕
      </button>
  
      <h5 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Welcome!</h5>
  
      <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <a href="/jobseeker/createAcc/" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
          <div class="text-left rtl:text-right">
            <div class="mb-1 text-xs">I Am a Job Seeker</div>
            <div class="-mt-1 font-sans text-sm font-semibold">Create Account</div>
          </div>
        </a>
        <a href="/jobprovider/createAcc/" class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
          <div class="text-left rtl:text-right">
            <div class="mb-1 text-xs">I Am Job Provider</div>
            <div class="-mt-1 font-sans text-sm font-semibold">Create Company Account</div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <!-- E:\website\job seek website\project\jobseek\src\routes\pages\jobprovider\createAcc\+page.svelte -->
  E:\website\job seek website\project\jobseek\src\routes\pages\jobprovider\createAcc\+page.svelte