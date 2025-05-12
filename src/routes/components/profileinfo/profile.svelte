<script lang="ts">
    import { db } from '$lib/firebase';
    import { auth } from '$lib/firebase';
    import { doc, setDoc } from 'firebase/firestore';
    import { goto } from '$app/navigation'; // If using SvelteKit



    //personal info
    let first_name = '', last_name = '', phone = '';
    let email = '', nationality='', dob='';
    //education
    let degree = 'High School', major = '', university = '';
    let start = '', end='', gpa='', description='';
    //experiance
    let hasExperience: boolean = false;
    let jobName = '';
    let facultyName = '';
    let roleDetails = '';
    let fromDate = '';
    let toDate = '';
    //docs
    let documents: { name: string; file: File | null }[] = [{ name: '', file: null }];
    //links
    let links = [{ name: '', url: '' }];
  
    function addDocument() {
      documents = [...documents, { name: '', file: null }];
    }
  
    function addLink() {
      links = [...links, { name: '', url: '' }];
    }
  
    function handleFileChange(e: Event, index: number) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    documents[index].file = target.files[0];
  }
}

  async function submitProfile() {
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in.');
      return;
    }

    const profileData = {
         //personal info
        first_name,
        last_name,
        phone,
        email,
        nationality,
        dob,
         //education
         degree,
         major,
         university,
         start,
         end,
         gpa,
         description,
           //experiance
      hasExperience,
      jobName,
      facultyName,
      roleDetails,
      fromDate,
      toDate,
      //docs
      documents: documents.map(doc => ({ name: doc.name })), // Files not uploaded yet
      //links
      links
    };

    try {
        const profileRef = doc(db, 'job_seekers', user.uid, 'profile', 'details');
        await setDoc(profileRef, profileData);
      goto('/jobseeker/jobposts/'); // Navigate to job apply page
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  }

  </script>
  




<section class="bg-white">
  <form >
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16 mt-20">
        <h2 class="mb-4 text-xl font-bold text-gray-900 ">Personal Information</h2>
       
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
                        <div class="relative z-0 w-full group">
                            <input type="email" name="email" placeholder=" " required bind:value={email}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>
                        <div class="relative z-0 w-full group">
                            <input type="text" name="nationality" placeholder=" " required bind:value={nationality}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">Nationality</label>
                        </div>
                        <div class="relative z-0 w-full group">
                            <input type="date" name="dob" placeholder=" " required bind:value={dob}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">Date of Birth</label>
                        </div>
                    
                </div>
                <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 ">Education</h2>
                
                        <div class="relative z-0 w-full group">
                            <select name="degree" required bind:value={degree}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                            <option value="" disabled selected hidden></option>
                            <option value="High School">High School</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                            <option value="PhD">PhD</option>
                            <option value="Other">Other</option>
                            </select>
                            <label
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                peer-focus:text-blue-600
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                peer-focus:scale-75 peer-focus:-translate-y-6">
                            Degree
                            </label>
                        </div>

                        <div class="relative z-0 w-full group">
                            <input type="text" name="major" placeholder=" " required  bind:value={major}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">Major</label>
                        </div>
                        <div class="relative z-0 w-full group">
                            <input type="text" name="uniname" placeholder=" " required  bind:value={university}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">University Name</label>
                        </div>
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <!-- Start Date -->
                            <div class="relative z-0 w-full group">
                            <input type="date" name="start_date" placeholder=" " required  bind:value={start}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label
                                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">
                                Start Date
                            </label>
                            </div>
                        
                            <!-- End Date -->
                            <div class="relative z-0 w-full group ">
                            <input type="date" name="end_date" placeholder=" " required  bind:value={end}
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label
                                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">
                                End Date
                            </label>
                            </div>
                        </div>
                        <div class="relative z-0 w-full group">
                            <input type="text" name="gpa" placeholder=" " required  bind:value={gpa}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                            <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">GPA</label>
                        </div>
                        <div class="relative z-0 w-full group">
                            <textarea id="description" name="description" rows="4" placeholder=" " required  bind:value={description}
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none"></textarea>
                            <label for="description"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                            peer-focus:text-blue-600
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6">
                            Description
                            </label>
                        </div>
                        
                
                </div>

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

            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-gray-900 ">Documents & Links</h2>

            <div class="space-y-10">

            <!-- Documents Section -->
            <div>

            {#each documents as doc, i}
                <div class="space-y-4 mb-6">
                <!-- Document Name -->
                <div class="relative z-0 w-full group">
                    <input type="text" placeholder=" " bind:value={doc.name} required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">
                    Document Name
                    </label>
                </div>

                <!-- File Upload -->
                <div class="relative z-0 w-full group">
                    <input type="file" id="file-{i}" on:change={(e) => handleFileChange(e, i)} required
                    class="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2.5 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100" />
                </div>
                </div>
            {/each}
            <button type="button" on:click={addDocument}
                class="text-blue-600 font-semibold text-sm hover:underline">
                + Add Document
            </button>
            </div>

            <!-- Links Section -->
            <div>
            <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Links</h2>
            {#each links as link, i}
                <div class="space-y-4 mb-6">
                <!-- Link Name -->
                <div class="relative z-0 w-full group">
                    <input type="text" placeholder=" " bind:value={link.name} required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">
                    Link Name
                    </label>
                </div>

                <!-- URL -->
                <div class="relative z-0 w-full group">
                    <input type="url" placeholder=" " bind:value={link.url} required
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label class="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">
                    URL
                    </label>
                </div>
                </div>
            {/each}
            <button type="button" on:click={addLink}
                class="text-blue-600 font-semibold text-sm hover:underline">
                + Add Link
            </button>
            </div>
            </div>
            <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            on:click|preventDefault={submitProfile}
            >
            Submit
            </button>
      
</div>
</form>
  </section>