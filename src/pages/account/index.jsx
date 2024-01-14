import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { supabase } from '../../../supabase/client';

const AccountPage = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
      getCountries();
    }, []);

    async function getCountries() {
      const { data } = await supabase.from("users").select();
      console.log(data);
      setCountries(data);
    }

    return (
        <Sidebar children={<div className='h-screen text-black dark:text-white'>
            <h1>fgvjh</h1>
            <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
        </div>} />
    );
};

export default AccountPage;