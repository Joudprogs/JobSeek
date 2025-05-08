<script lang="ts">
    let hasExperience: boolean = false;
  
    let jobName = '';
    let facultyName = '';
    let roleDetails = '';
    let fromDate = '';
    let toDate = '';
  </script>
  
  <section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 ">Experience</h2>


  <div class="space-y-6">
    <div>
      <p class="text-sm font-medium text-gray-900 mb-2">Do you have experience?</p>
      <div class="flex space-x-4">
        <button type="button"
          on:click={() => hasExperience = true}
          class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 "
          class:selected={hasExperience}>
          Yes
        </button>
        <button type="button"
          on:click={() => hasExperience = false}
          class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 "
          class:selected={!hasExperience}>
          No
        </button>
      </div>
    </div>
  
    {#if hasExperience}
      <!-- Job Name -->
      <div class="relative z-0 w-full group">
        <input type="text" name="job_name" placeholder=" " required bind:value={jobName}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                 peer-focus:scale-75 peer-focus:-translate-y-6">
          Job Name
        </label>
      </div>
  
      <!-- Faculty Name -->
      <div class="relative z-0 w-full group">
        <input type="text" name="faculty_name" placeholder=" " required bind:value={facultyName}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                 peer-focus:scale-75 peer-focus:-translate-y-6">
          Faculty Name
        </label>
      </div>
  
      <!-- Role Details -->
      <div class="relative z-0 w-full group">
        <textarea name="role_details" rows="4" placeholder=" " required bind:value={roleDetails}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none"></textarea>
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                 peer-focus:scale-75 peer-focus:-translate-y-6">
          Role Details
        </label>
      </div>
  
      <!-- From Date -->
      <div class="relative z-0 w-full group">
        <input type="date" name="from_date" placeholder=" " required bind:value={fromDate}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                 peer-focus:scale-75 peer-focus:-translate-y-6">
          Start Date
        </label>
      </div>
  
      <!-- To Date -->
      <div class="relative z-0 w-full group">
        <input type="date" name="to_date" placeholder=" " required bind:value={toDate}
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
        <label
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                 peer-focus:scale-75 peer-focus:-translate-y-6">
          End Date
        </label>
      </div>
    {/if}
  </div>
</div>
</section>