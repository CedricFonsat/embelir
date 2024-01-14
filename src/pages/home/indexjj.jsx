import React, { useState } from 'react';
import Sidebar from '../../components/Sidebafr';
import { MdAccountCircle, MdHomeFilled, MdOutlineSettings } from "react-icons/md";
import logo from '../../assets/images/logoW.png';
import upload from '../../assets/images/upload.png';
import '../../App.css'
import { supabase } from '../../../supabase/client';

const Home = () => {
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = () => {
    supabase.auth.signOut()
  }

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
      formData.append('prompt', prompt);
      formData.append('image', imageFile);

      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setOutput(data.output);
      setError(null);
    } catch (error) {
      setError('An error occurred during the API request');
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      name: 'Home',
      icon: <MdHomeFilled size={20}/>
    },
    {
      name: 'Settings',
      icon: <MdOutlineSettings size={20}/>
    },
    {
      name: 'Account',
      icon: <MdAccountCircle size={20}/>
    }
  ];

  const handleUpload = () => {
    console.log('upload');
  };

  return (
    <div className='container'>
      <Sidebar menuItems={menuItems} logo={logo} logout={logout}/>
      <section className='playground'>
        <div className='dnd-image'>
          <input type="file" className='file' onChange={handleImageChange} />
          {imageFile && <img style={{width: "100px", opacity: 1}} src={URL.createObjectURL(imageFile)} alt="selected" />}
          <img src={upload} alt="drag and drop" />
          <p>Drag & drop files or <span>Browse</span></p>
          <p>Supported formats: JPEG, PNG</p>
        </div>

        <div className='prompt'>
        <input type="text" placeholder="Prompt" value={prompt} onChange={handlePromptChange} />
          <button onClick={handleGenerateClick}>Generate</button>
        </div>

        {loading && <p>Loading...</p>}
      {output && (
        <div className='result'>
          {output.map((imageUrl, index) => (
            <div key={index} style={{ width: '150px', height: '150px', margin: '5px', overflow: 'hidden' }}>
              <img src={imageUrl} alt={`Generated Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
      {error && <p>Error: {error}</p>}

      </section>
    </div>
  );
}

export default Home;
