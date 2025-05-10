<script lang="ts">
    import { db } from '$lib/firebase';
    import { getAuth } from 'firebase/auth';
    import { doc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
  
    const auth = getAuth();
  
    export let onPost: (job: any) => void;
    export let close: () => void;
    export let jobIdToDelete: string | null = null; // To receive the jobId to delete
  
    // Separate job fields
    let name = '';
    let description = '';
    let requirements = '';
    let type = 'Full-time';
    let category = '';
  
    async function handlePost() {
      const user = auth.currentUser;
  
      if (!user) {
        alert('You must be logged in to post a job.');
        return;
      }
  
      try {
        const jobId = crypto.randomUUID();
        const providerDocRef = doc(db, 'job_providers', user.uid);
        await setDoc(providerDocRef, { updatedAt: serverTimestamp() }, { merge: true });
  
        const jobPostRef = doc(db, 'job_providers', user.uid, 'job_posts', jobId);
  
        const jobData = {
          name,
          description,
          requirements,
          type,
          category,
          createdAt: serverTimestamp(),
          jobId
        };
  
        await setDoc(jobPostRef, jobData);
  
        alert('Job posted successfully!');
        if (onPost) onPost(jobData);
        close();
  
      } catch (error) {
        console.error('Error posting job:', error);
        alert('Failed to post job: ' + (error as Error).message);
      }
    }
  
    async function handleDelete() {
      const user = auth.currentUser;
  
      if (!user) {
        alert('You must be logged in to delete a job.');
        return;
      }
  
      if (!jobIdToDelete) {
        console.error('No job ID provided for deletion.');
        alert('Error: No job ID specified for deletion.');
        return;
      }
  
      try {
        const jobPostRef = doc(db, 'job_providers', user.uid, 'job_posts', jobIdToDelete);
        await deleteDoc(jobPostRef);
        alert('Job deleted successfully!');
        close(); // Or you might want to trigger a refresh of the job list
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job: ' + (error as Error).message);
      } finally {
        jobIdToDelete = null; // Reset the jobIdToDelete after attempting deletion
      }
    }
  </script>
  
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">
        {jobIdToDelete ? 'Confirm Delete' : 'Post a Job'}
      </h2>
  
      {#if jobIdToDelete}
        <p class="mb-4">Are you sure you want to delete this job?</p>
        <div class="flex justify-end gap-2 mt-4">
          <button class="bg-gray-300 px-4 py-1 rounded" on:click={() => (jobIdToDelete = null)}>Cancel</button>
          <button class="bg-red-600 text-white px-4 py-1 rounded" on:click={handleDelete}>Delete</button>
        </div>
      {:else}
        <input bind:value={name} placeholder="Job Name" class="input" />
        <textarea bind:value={description} placeholder="Description" class="input mt-2" />
        <textarea bind:value={requirements} placeholder="Requirements" class="input mt-2" />
        <select bind:value={type} class="input mt-2">
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
          <option>Hybrid</option>
        </select>
        <input bind:value={category} placeholder="Category" class="input mt-2" />
        <div class="flex justify-end gap-2 mt-4">
          <button class="bg-gray-300 px-4 py-1 rounded" on:click={close}>Cancel</button>
          <button class="bg-blue-600 text-white px-4 py-1 rounded" on:click={handlePost}>Post</button>
        </div>
      {/if}
    </div>
  </div>
  
  <style>
    .input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.375rem;
    }
  </style>