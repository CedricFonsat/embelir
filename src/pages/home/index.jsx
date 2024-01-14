import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { supabase } from "../../../supabase/client";
import Card from "../../components/Card";
import { fakeImageUrl } from "../../constants/FakeData";

const index = () => {
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerateClick = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("image", imageFile);

      const response = await fetch("http://localhost:3000", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setOutput(data.output);
      setError(null);
      handleSubmit();
    } catch (error) {
      setError("An error occurred during the API request");
    } finally {
      setLoading(false);
    }
  };


 async function postCountries(output) {
   const { data, error } = await supabase
   .from('historics')
   .upsert([
      { url: output[0]},
      { url: output[1]},
      { url: output[2]},
      { url: output[3]},
      { url: output[4]}
   ])
 }

 if (!loading && output) {
   postCountries(output)
 }

  return (
    <div>
      <Sidebar
        children={
          <div>
            <div class="flex flex-col items-center justify-start w-full h-screen">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={handleImageChange}
                />
                {imageFile && (
                  <img
                    style={{ width: "100px", opacity: 1 }}
                    src={URL.createObjectURL(imageFile)}
                    alt="selected"
                  />
                )}
              </label>

              <textarea
                style={{ resize: "none" }}
                id="message"
                rows="4"
                class=" mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your prompt in english..."
                value={prompt}
                onChange={handlePromptChange}
              ></textarea>
              <div className="w-full flex justify-end mt-2">
                <button
                  onClick={handleGenerateClick}
                  type="button"
                  class="py-2.5 px-10 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Generate
                </button>
                <button onClick={() => postCountries()}>hhh</button>
              </div>
              {loading && <Card data={fakeImageUrl} isLoading={true}/>}
              {output && <Card data={output} isLoading={false}/>}
              {error && <p>Error: {error}</p>}
             
            </div>
          </div>
        }
      />
    </div>
  );
};

export default index;
