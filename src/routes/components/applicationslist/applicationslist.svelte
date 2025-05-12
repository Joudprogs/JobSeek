<script lang="ts">
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase';
  import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { goto } from '$app/navigation';

  let applicants: any[] = [];
  let error = '';
  let loading = true;
  let selectedApplicant: any = null; // Stores the profile data of the selected applicant
  let showModal = false; // Flag to control the modal visibility

  onMount(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        error = 'User not authenticated.';
        loading = false;
        return;
      }

      try {
        const providerId = user.uid;

        // Get all job posts
        const jobPostsSnap = await getDocs(collection(db, `job_providers/${providerId}/job_posts`));
        const jobs = jobPostsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (jobs.length === 0) {
          error = 'No job posts found.';
          loading = false;
          return;
        }

        const firstJobId = jobs[0].id;
        const jobPath = `job_providers/${providerId}/job_posts/${firstJobId}/applications`;

        // Get all applicants for the job post
        const applicationsSnap = await getDocs(collection(db, jobPath));

        applicants = await Promise.all(applicationsSnap.docs.map(async (applicationDoc) => {
          const applicantId = applicationDoc.id; // This is the user ID of the applicant

          // Fetch the profile data for each applicant
          const profileDocRef = doc(db, `job_providers/${providerId}/job_posts/${firstJobId}/applications/${applicantId}`);
          const profileSnap = await getDoc(profileDocRef);
          const profileData = profileSnap.exists() ? profileSnap.data() : null;

          return {
            id: applicantId || "unknown",
            first_name: profileData?.first_name || "N/A",
            last_name: profileData?.last_name || "N/A",
            email: profileData?.email || "N/A",
            number: profileData?.number || "N/A",
            nationality: profileData?.nationality || "N/A",
            dob: profileData?.dob || "N/A",
            applied_at: profileData?.appliedAt || "N/A",

            // Education
            degree: profileData?.degree || "N/A",
            major: profileData?.major || "N/A",
            university: profileData?.university || "N/A",
            start: profileData?.start || "N/A",
            end: profileData?.end || "N/A",
            gpa: profileData?.gpa || "N/A",
            description: profileData?.description || "N/A",

            // Experience
            hasExperience: profileData?.hasExperience || false,
            jobName: profileData?.jobName || "",
            facultyName: profileData?.facultyName || "",
            roleDetails: profileData?.roleDetails || "",
            fromDate: profileData?.fromDate || "",
            toDate: profileData?.toDate || "",

            // Documents and Links
            documents: profileData?.documents || [],
            links: profileData?.links || []
          };
        }));

      } catch (err) {
        error = 'Failed to load applicants.';
        console.error(err);
      }

      loading = false;
    });
  });

  // Function to open the modal with the applicant's profile data
  function viewProfile(applicantId: string) {
    selectedApplicant = applicants.find(applicant => applicant.id === applicantId);
    showModal = true;
  }

  // Function to close the modal
  function closeModal() {
    showModal = false;
    selectedApplicant = null;
  }

  function sendEmail(email: string) {
    window.location.href = `mailto:${email}`;
  }
</script>

<div class="mt-50 mb-95 mx-auto max-w-2xl">
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else if applicants.length === 0}
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Job Applications</h1>
    </div>
    <p>No applicants yet.</p>
  {:else}
    <div class="grid gap-4">
      {#each applicants as applicant}
        <div class="border p-4 rounded-lg shadow">
          <h3 class="text-lg font-bold">{applicant.first_name} {applicant.last_name}</h3>
          <p>Email: {applicant.email}</p>
          <div class="mt-2 space-x-2">
            <button
              class="bg-blue-500 text-white px-4 py-1 rounded"
              on:click={() => viewProfile(applicant.id)}
            >
              View Profile
            </button>
            <button
              class="bg-green-500 text-white px-4 py-1 rounded"
              on:click={() => sendEmail(applicant.email)}
            >
              Send Email
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Modal -->
{#if showModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">

      <h2 class="text-2xl font-bold mb-4">Applicant Profile</h2>
      {#if selectedApplicant}
        <!-- Personal Info -->
        <section class="mb-6">
          <h3 class="text-xl font-semibold mb-2 border-b pb-1">Personal Information</h3>
          <p><strong>First Name:</strong> {selectedApplicant.first_name}</p>
          <p><strong>Last Name:</strong> {selectedApplicant.last_name}</p>
          <p><strong>Phone Number:</strong> {selectedApplicant.number}</p>
          <p><strong>Email:</strong> {selectedApplicant.email}</p>
          <p><strong>Nationality:</strong> {selectedApplicant.nationality}</p>
          <p><strong>Date of Birth:</strong> {selectedApplicant.dob}</p>
        </section>

        <!-- Education -->
        <section class="mb-6">
          <h3 class="text-xl font-semibold mb-2 border-b pb-1">Education</h3>
          <p><strong>Degree:</strong> {selectedApplicant.degree}</p>
          <p><strong>Major:</strong> {selectedApplicant.major}</p>
          <p><strong>University:</strong> {selectedApplicant.university}</p>
          <p><strong>Start:</strong> {selectedApplicant.start}</p>
          <p><strong>End:</strong> {selectedApplicant.end}</p>
          <p><strong>GPA:</strong> {selectedApplicant.gpa}</p>
          <p><strong>Description:</strong> {selectedApplicant.description}</p>
        </section>

        <!-- Experience -->
        {#if selectedApplicant.hasExperience}
          <section class="mb-6">
            <h3 class="text-xl font-semibold mb-2 border-b pb-1">Experience</h3>
            <p><strong>Job Name:</strong> {selectedApplicant.jobName}</p>
            <p><strong>Faculty Name:</strong> {selectedApplicant.facultyName}</p>
            <p><strong>Role Details:</strong> {selectedApplicant.roleDetails}</p>
            <p><strong>From:</strong> {selectedApplicant.fromDate}</p>
            <p><strong>To:</strong> {selectedApplicant.toDate}</p>
          </section>
        {/if}

        <!-- Documents -->
        {#if selectedApplicant.documents?.length}
          <section class="mb-6">
            <h3 class="text-xl font-semibold mb-2 border-b pb-1">Documents</h3>
            <ul class="list-disc list-inside">
              {#each selectedApplicant.documents as doc}
                <li>{doc.name}</li>
              {/each}
            </ul>
          </section>
        {/if}

        <!-- Links -->
        {#if selectedApplicant.links?.length}
          <section class="mb-6">
            <h3 class="text-xl font-semibold mb-2 border-b pb-1">Links</h3>
            <ul class="list-disc list-inside">
              {#each selectedApplicant.links as link}
                <li>
                  <strong>{link.name}:</strong>
                  <a href={link.url} class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </li>
              {/each}
            </ul>
          </section>
        {/if}
      {/if}
      <div class="mt-4 text-right">
        <button class="bg-red-500 text-white px-4 py-2 rounded" on:click={closeModal}>Close</button>
      </div>
    </div>
  </div>
{/if}
