
<script lang="ts">
  import { auth, db } from '$lib/firebase';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { collection, doc, setDoc } from 'firebase/firestore';
  import { goto } from '$app/navigation';
  export let userType: 'seeker' | 'provider';

  let first_name = '', last_name = '', phone = '', company_name = '', company_phone = '';
  let email = '', password = '', confirm_password = '';

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Prepare user data
      let userData: Record<string, string> = {
        email,
        userType,
      };

      let collectionName = '';

      if (userType === 'seeker') {
      collectionName = 'job_seekers';
      userData = { ...userData, first_name, last_name, phone };
      } else {
        collectionName = 'job_providers';
      userData = { ...userData, company_name, phone: company_phone };
      }

      // Save to Firestore
      await setDoc(doc(collection(db, collectionName), uid), userData);
      alert("Account created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create account: " + (error as Error).message);
    }
    // Redirect based on user type
    if (userType === 'seeker') {
      goto('/jobseeker/profile/'); 
    }else{
      goto('/jobprovider/jobadd/');
    }
  }

</script>



<form class="max-w-md mx-auto my-40 space-y-6" on:submit|preventDefault={handleSubmit}>
  {#if userType === 'seeker'}
    <!-- Job Seeker Fields -->
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full group">
        <input type="text" name="first_name" placeholder=" " required bind:value={first_name}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
        <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:text-blue-600
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
      </div>
      <div class="relative z-0 w-full group">
        <input type="text" name="last_name" placeholder=" " required bind:value={last_name}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
        <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
          peer-focus:text-blue-600
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
      </div>
    </div>
    <div class="relative z-0 w-full group">
      <input type="tel" name="phone" placeholder=" " required bind:value={phone}
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
        peer-focus:text-blue-600
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
    </div>
  {:else if userType === 'provider'}
    <!-- Job Provider Fields -->
    <div class="relative z-0 w-full group">
      <input type="text" name="company_name" placeholder=" " required bind:value={company_name}
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
        peer-focus:text-blue-600
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-6">Company name</label>
    </div>
    <div class="relative z-0 w-full group">
      <input type="tel" name="phone" placeholder=" " required bind:value={company_phone}
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
      <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
        peer-focus:text-blue-600
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-6">Company phone number</label>
    </div>
  {/if}

  <!-- Shared Fields -->
  <div class="relative z-0 w-full group">
    <input type="email" name="email" placeholder=" " required bind:value={email}
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
    <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
      peer-focus:text-blue-600
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
      peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div class="relative z-0 w-full group">
    <input type="password" name="password" placeholder="" required bind:value={password}
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
    <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
      peer-focus:text-blue-600
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
      peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div class="relative z-0 w-full group">
    <input type="password" name="confirm_password" placeholder="" required bind:value={confirm_password}
      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
    <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
      peer-focus:text-blue-600
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
      peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
  </div>

  <button type="submit"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
    Submit
  </button>
</form>
