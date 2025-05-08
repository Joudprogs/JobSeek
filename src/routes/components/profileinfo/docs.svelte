<script lang="ts">
let documents: { name: string; file: File | null }[] = [{ name: '', file: null }];    let links = [{ name: '', url: '' }];
  
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
  </script>
  <section class="bg-white">
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
</div>
</section>