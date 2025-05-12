<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { db } from '$lib/firebase';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { onSnapshot, collection } from 'firebase/firestore';
  import Card from '../jobcard/card.svelte';

  let showPopup = false;
  let jobs: any[] = [];
  let confirmDeleteIndex: number | null = null;
  let user: any; // Declare user at the component level

  const auth = getAuth();

  function addJob(job: any) {
    // Firestore listener already handles updates, this is optional
    jobs = [...jobs, job];
  }

  function togglePopup() {
    showPopup = !showPopup;
  }

  function requestDelete(index: number) {
    confirmDeleteIndex = index;
  }

  function confirmDelete() {
    if (confirmDeleteIndex !== null) {
      // Delete from Firestore here
      const jobToDelete = jobs[confirmDeleteIndex];
      if(user){
        const jobPostRef = collection(db, 'job_providers', user.uid, 'job_posts');
        //deleteDoc(doc(jobPostRef, jobToDelete.id)) //deleteDoc needs a DocumentReference
        jobs.splice(confirmDeleteIndex, 1);
        jobs = [...jobs]; // trigger reactivity
        confirmDeleteIndex = null;
      }
      else{
        console.error("user is not signed in")
      }
      
    }
  }

  function cancelDelete() {
    confirmDeleteIndex = null;
  }

  function viewAppliers(job: any) {
    if (user) {
      const providerId = user.uid;
      const postId = job.id;
      goto(`/jobprovider/applications`);
    } else {
      console.error("User is not logged in.");
    }
  }

  onMount(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      user = authUser;
      if (authUser) {
        const jobsRef = collection(db, 'job_providers', authUser.uid, 'job_posts');
        const unsubscribeSnapshot = onSnapshot(jobsRef, (snapshot) => {
          // Make sure to include the document ID in your job data
          jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });

        return () => unsubscribeSnapshot(); // cleanup Firestore listener
      }
    });

    return () => unsubscribeAuth(); // cleanup auth listener
  });
</script>

<section class="py-8 antialiased mb-70 mt-30">
  <div class="max-w-4xl mx-auto px-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Posted Jobs</h1>
      <button class="bg-blue-600 text-white px-6 py-2 rounded" on:click={togglePopup}>
        Post Job
      </button>
    </div>

    {#if jobs.length === 0}
      <p class="text-gray-500 mt-10">No jobs posted yet.</p>
    {/if}

    {#if showPopup}
      <Card onPost={addJob} close={() => (showPopup = false)} />
    {/if}

    <div class="grid gap-4">
      {#each jobs as job, i (job.id)}
        <div class="bg-white p-4 rounded-lg shadow-md space-y-2">
          <h3 class="text-xl font-bold">{job.name}</h3>
          <p class="text-sm text-gray-600">{job.description}</p>
          <p class="text-sm"><strong>Type:</strong> {job.type}</p>
          <p class="text-sm"><strong>Category:</strong> {job.category}</p>

          <div class="flex gap-3 mt-2">
            <button
              class="bg-red-500 text-white px-4 py-1 rounded"
              on:click={() => requestDelete(i)}
            >
              Delete
            </button>
            <button
              class="bg-green-600 text-white px-4 py-1 rounded"
              on:click={() => viewAppliers(job)}
            >
              View Appliers
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  {#if confirmDeleteIndex !== null}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-lg font-bold mb-4">Are you sure?</h2>
        <p class="text-sm text-gray-700 mb-4">
          Deleting this job will remove all associated appliers' data. This action is irreversible.
        </p>
        <div class="flex justify-end gap-2">
          <button class="bg-gray-300 px-4 py-1 rounded" on:click={cancelDelete}>Cancel</button>
          <button class="bg-red-600 text-white px-4 py-1 rounded" on:click={confirmDelete}>Delete</button>
        </div>
      </div>
    </div>
  {/if}
</section>
