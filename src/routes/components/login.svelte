<script lang="ts">
import { getDoc, doc } from 'firebase/firestore';
import { goto } from '$app/navigation';
import { auth, db } from '$lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

let email = '';
let password = '';
let error = '';

const handleLogin = async () => {
  error = '';
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;

    // Check if user is a job seeker
    const seekerRef = doc(db, 'job_seekers', uid);
    const seekerSnap = await getDoc(seekerRef);

    if (seekerSnap.exists()) {
      goto('/jobseeker/jobposts/');
      return;
    }

    // Check if user is a job provider
    const providerRef = doc(db, 'job_providers', uid);
    const providerSnap = await getDoc(providerRef);

    if (providerSnap.exists()) {
      goto('/jobprovider/jobadd/');
      return;
    }

    // User type not found
    error = 'User type not found. Please contact support.';

  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      error = err.message;
    } else {
      console.error("An unknown error occurred:", err);
      error = "An unknown error occurred";
    }
  }
};

</script>


<form class="max-w-md mx-auto my-40 space-y-6" on:submit|preventDefault={handleLogin}>
  <div class="relative z-0 w-full group">
    <input
      type="email"
      name="email"
      placeholder=" "
      required
      bind:value={email}
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    />
    <label
      class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
        peer-focus:text-blue-600
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-6">
      Email address
    </label>
  </div>

  <div class="relative z-0 w-full group">
    <input
      type="password"
      name="password"
      placeholder=" "
      required
      bind:value={password}
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    />
    <label
      class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
        peer-focus:text-blue-600
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Password
    </label>
  </div>

  {#if error}
    <p class="text-red-500">{error}</p>
  {/if}

  <button
    type="submit"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
  >
    Submit
  </button>
</form>
