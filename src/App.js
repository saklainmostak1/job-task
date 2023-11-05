
import './App.css';
import img from './images/image-1.webp'
import img1 from './images/image-2.webp'
import img2 from './images/image-3.webp'
import img3 from './images/image-4.webp'
import img4 from './images/image-5.webp'
import img5 from './images/image-6.webp'
import img6 from './images/image-7.webp'
import img7 from './images/image-8.webp'
import img8 from './images/image-9.webp'
import img9 from './images/image-10.jpeg'
import img10 from './images/image-11.jpeg'
import { useState } from 'react';



function App() {
   

  const [datas, setDatas] = useState([


    {
      id:1 ,
      image: img,
    },
    {
      id: 2,
      image: img1,
    },
    {
      id: 3,
      image: img2,
    },
    {
      id: 4,
      image: img3,
    },
    {
      id: 5,
      image: img4,
    },
    {
      id: 6,
      image: img5,
    },
    {
      id: 7,
      image: img6,
    },
    {
      id: 8,
      image: img7,
    },
    {
      id: 9,
      image: img8,
    },
    {
      id: 10,
      image: img9,
    },
    {
      id: 11,
      image: img10,
    },
  ])

 
  
  const [selectedImages, setSelectedImages] = useState([]);
console.log(selectedImages)
  const handleImageUpload = (event) => {
    const uploadedImages = event.target.files;

    // Create an array of objects for the newly uploaded images
    const newImages = Array.from(uploadedImages).map((file, index) => ({
      id: datas.length + index + 1,
      image: URL.createObjectURL(file), // Use a temporary URL for preview
    }));

    // Update the state to include the newly uploaded images
    setDatas([...datas, ...newImages]);
  };

 

  const handleCheckboxChange = (event) => {
    const imageId = event.target.id;
    console.log(imageId)
    if (event.target.checked) {
      // Add the image ID to the selectedImages state
      setSelectedImages([...selectedImages, imageId]);
    } else {
      // Remove the image ID from the selectedImages state
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    }
  };

  const handleDeleteImages = () => {
    // Convert selected image IDs to numbers
    const selectedImageIds = selectedImages.map(Number);
  
    // Filter out the selected images from the datas state
    const updatedDatas = datas.filter((data) => !selectedImageIds.includes(data.id));
    setDatas(updatedDatas);
    // Clear the selectedImages state
    setSelectedImages([]);
  };
  //  // Handle delete images
  //  const handleDeleteClick = () => {
  //   const updatedImages = datas.filter(
  //     (image) => !datas.some((selected) => selected.id === image.id)
  //   );

  //   setDatas(updatedImages);
  //   // Clear the selectedImages state
  //   setSelectedImages([]);
  // };

  return (
<div className="max-w-[1200px] mx-auto mt-48 bg-white p-5 rounded-md">
  
<article className="flex flex-row justify-between items-center mb-5">
{selectedImages.length === 0 ? 
      <h1 className="text-2xl font-bold">Gallery</h1>
    
    
  : 
  <div>
    {selectedImages.length > 0 && (
  <div className="mt-3">
    {selectedImages.length} {selectedImages.length === 1 ? 'file' : 'files'} selected
  </div>
)}
  </div>

}
<button className="text-red-500 font-medium" onClick={handleDeleteImages}>
  Delete files
</button>
</article>
<hr />

<div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6 mt-5">
 {datas.map((data) => (
    <div
      key={data.id}
      className="group relative before:content-[''] before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move col-span-1 hover:before:bg-black/50"
      draggable="true"
    >
      <img
       src={data.image}
       alt={data.id}
       loading="lazy"
       width={data.width} // Set the image width
       height={data.height} // Set the image height
       decoding="async"
       data-nimg="1"
        className="h-full w-full max-w-full rounded-lg object-contain border-2 undefined"
      />
      <input
        type="checkbox"
        name={data.id}
        id={data.id}
        className="absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer opacity-0"
        onChange={handleCheckboxChange}
      />
    </div>
  ))}
 
<div class="relative border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors ease-linear  "><input onChange={handleImageUpload} type="file" multiple="" name="images" id="images" class="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer" title="Try to upload photos..."/><div class="h-full w-full flex flex-col justify-center items-center gap-y-4"><img alt="placeholder" fetchpriority="high" width="20" height="20" decoding="async" data-nimg="1"  srcset="https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg"/><span class="whitespace-nowrap">Add Images</span></div></div>
</div>
</div>
);
}
 

export default App;
