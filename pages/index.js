import React, {useEffect, useState} from 'react'
import CleanupButton from './components/cleanupbtn';
import SubtitleEditor from './components/subtitileseeditor';


function Index() {

  const [message, setMessage] = useState("Loading");
  const [selectedFile, setSelectedFile] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [vttFile, setVttFile] = useState();

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:8080/api/convert', {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      return blob.text();
    })
    .then(text => {
      setVttFile(text);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  useEffect(()=>{
    fetch("http://localhost:8080/api/home")
      .then((response) => response.json())
      .then((data)=>{
        setMessage(data.message);
      })
  }, [])

  return (
    <div className='w-[100%] h-screen bg-white flex items-center justify-center'>
      <div className='w-[50vw] h-[45vw] bg-white rounded-3xl drop-shadow-2xl flex items-center justify-center flex-col'>
        <div className='w-[90%] h-[90%] justify-between flex flex-row items-center '>
          <div className='w-[50%] h-full flex flex-col items-center justify-center  '>
            {/* <div className='w-full h-[30%] bg-red-500'>
              Editing Stuff
            </div> */}
            <div className='w-[80%] flex flex-col justify-center '>
              <input className='bg-[#006BFF] text-white rounded-xl' type="file" onChange={event => setSelectedFile(event.target.files[0])} />
              <button className='bg-[#006BFF] text-white p-4 mt-5 rounded-xl' onClick={handleFileUpload}>Generate</button>
              <CleanupButton/>
            </div>
            {vttFile && <SubtitleEditor vttFile={vttFile} />}
          </div>
          <div className='bg-gray-200 w-[50%] h-full rounded-3xl flex items-center justify-center'>{videoUrl && <video className='rounded-3xl' src={videoUrl} controls />}</div>
        </div>  
      </div>
    </div>
  )
}

export default Index;
