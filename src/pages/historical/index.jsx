import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { supabase } from "../../../supabase/client";

const index = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("historics").select();
    console.log(data[0].url, "fffffff");
    setCountries(data);
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-800">
      <Sidebar
        children={
          <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
            {countries.map((country) => (
              <div key={country.id}>
                <img
                  class="h-auto max-w-full rounded-lg"
                  src={country.url}
                  alt="photo generer"
                />
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};

export default index;
