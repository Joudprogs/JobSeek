<section class="bg-white">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 ">Education</h2>
        <form action="#">
            <div class="relative z-0 w-full group">
                <select name="degree" required
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
                <input type="text" name="major" placeholder=" " required 
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                  peer-focus:text-blue-600
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6">Major</label>
              </div>
              <div class="relative z-0 w-full group">
                <input type="text" name="uniname" placeholder=" " required 
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                  peer-focus:text-blue-600
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6">University Name</label>
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <!-- Start Date -->
                <div class="relative z-0 w-full group">
                  <input type="date" name="start_date" placeholder=" " required
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
                  <input type="date" name="end_date" placeholder=" " required
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
                <input type="text" name="gpa" placeholder=" " required 
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                  peer-focus:text-blue-600
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6">GPA</label>
              </div>
              <div class="relative z-0 w-full group">
                <textarea id="description" name="description" rows="4" placeholder=" " required
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none"></textarea>
                <label for="description"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                  peer-focus:text-blue-600
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6">
                  Description
                </label>
              </div>
              
        </form>
    </div>
  </section>