<script lang="ts">
    import { db } from '$lib/firebase';
    import { collection, getDocs } from 'firebase/firestore';
    import { onMount } from 'svelte';
  
    let jobs: any[] = [];
    let loading = true;
    let error: Error | null = null;
  
    onMount(async () => {
      try {
        const jobProvidersSnapshot = await getDocs(collection(db, 'job_providers'));
        const allJobs: any[] = [];
  
        for (const providerDoc of jobProvidersSnapshot.docs) {
          const jobPostsCollection = collection(db, 'job_providers', providerDoc.id, 'job_posts');
          const jobPostsSnapshot = await getDocs(jobPostsCollection);
          jobPostsSnapshot.forEach((doc) => {
            allJobs.push({ ...doc.data(), id: doc.id, providerId: providerDoc.id });
          });
        }
  
        jobs = allJobs;
        loading = false;
      } catch (e) {
        error = e as Error;
        loading = false;
        console.error('Error fetching jobs:', error);
      }
    });
  
    function applyForJob(job: any) {
      alert(`Applying for: ${job.name} (you can implement the actual application logic here)`);
    }
  </script>
  
  <section class="py-8 antialiased mb-50 mt-30">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Available Jobs</h1>
  
      {#if loading}
        <p class="text-gray-500 mt-10">Loading jobs...</p>
      {:else if error}
        <p class="text-red-500 mt-10">Error loading jobs: {error.message}</p>
      {:else if jobs.length === 0}
        <p class="text-gray-500 mt-10">No jobs available at the moment.</p>
      {:else}
        <div class="grid gap-4">
          {#each jobs as job}
            <div class="bg-white p-4 rounded-lg shadow-md space-y-2">
              <h3 class="text-xl font-bold">{job.name}</h3>
              <p class="text-sm text-gray-600">{job.description}</p>
              <p class="text-sm"><strong>Type:</strong> {job.type}</p>
              <p class="text-sm"><strong>Category:</strong> {job.category}</p>
  
              <div class="flex justify-end">
                <button
                  class="bg-green-600 text-white px-6 py-2 rounded"
                  on:click={() => applyForJob(job)}>
                  Apply Now
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>