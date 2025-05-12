<script lang="ts">
    import { db } from '$lib/firebase';
    import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
    import { onMount } from 'svelte';
    import { getAuth } from 'firebase/auth';
    let showModal = false;
    let selectedJob: { id: string; providerId: string; name: string };
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
    function openApplyModal(job: { id: string; providerId: string; name: string }) {
    selectedJob = job;
    showModal = true;
  }
  async function confirmApply() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to apply.');
      showModal = false;
      return;
    }
    
    try {
      // Fetch seeker’s profile
      const profileRef = doc(db, 'job_seekers', user.uid, 'profile', 'details');
      const profileSnap = await getDoc(profileRef);
      if (!profileSnap.exists()) {
        throw new Error('Your profile isn’t found. Please complete it first.');
      }
      const profileData = profileSnap.data();

      // Combine profile fields with user id and application time
      const applicationData = {
        ...profileData,
        id: user.uid,
        appliedAt: serverTimestamp()
      };

      // Write a single document called "profile"
      const applicationRef = doc(
        db,
        'job_providers',
        selectedJob.providerId,
        'job_posts',
        selectedJob.id,
        'applications',
         user.uid // fixed document name
      );

  await setDoc(applicationRef, applicationData);

      alert(`You’ve successfully applied for "${selectedJob.name}".`);
    } catch (err) {
      console.error('Error applying:', err);
      alert('Failed to apply: ' + (err instanceof Error ? err.message : err));
    } finally {
      showModal = false;
    }
  }


  function cancelApply() {
    showModal = false;
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
  class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  on:click={() => openApplyModal(job)}
>
  Apply
</button>

<!-- Confirmation Modal -->
{#if showModal}
<div class="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center space-y-4">
      <h2 class="text-xl font-semibold text-gray-800">Confirm Application</h2>
      <p class="text-gray-600">
        Are you sure you want to apply for <strong>{selectedJob.name}</strong>?<br />
        Your profile will be shared with the company.
      </p>
      <div class="flex justify-center gap-4 mt-4">
        <button
          on:click={confirmApply}
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Yes, Apply
        </button>
        <button
          on:click={cancelApply}
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>