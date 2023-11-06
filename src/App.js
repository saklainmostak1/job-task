
import React, { useState, useRef, useEffect } from 'react';

import img10 from './images/image-1.webp';
import img1 from './images/image-2.webp';
import img2 from './images/image-3.webp';
import img3 from './images/image-4.webp';
import img4 from './images/image-5.webp';
import img5 from './images/image-6.webp';
import img6 from './images/image-7.webp';
import img7 from './images/image-8.webp';
import img8 from './images/image-9.webp';
import img9 from './images/image-10.jpeg';
import img from './images/image-11.jpeg';

function App() {
  const [datas, setDatas] = useState([
    {
      id: 101,
      image: img,
    },
    {
      id: 102,
      image: img1,
    },
    {
      id: 103,
      image: img2,
    },
    {
      id: 104,
      image: img3,
    },
    {
      id: 105,
      image: img4,
    },
    {
      id: 106,
      image: img5,
    },
    {
      id: 107,
      image: img6,
    },
    {
      id: 108,
      image: img7,
    },
    {
      id: 109,
      image: img8,
    },
    {
      id: 110,
      image: img9,
    },
    {
      id: 111,
      image: img10,
    },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);

  const galleryRef = useRef(null);

  const handleDragStart = (e, index) => {
    setDraggedImage(datas[index]);
    setDraggedImageIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  useEffect(() => {
    const gallery = galleryRef.current;

    const handleDragEnter = (e) => {
      e.preventDefault();
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
      e.preventDefault();
      if (draggedImageIndex !== null) {
        const newDatas = [...datas];
        newDatas.splice(targetIndex, 0, newDatas.splice(draggedImageIndex, 1)[0]);
        setDatas(newDatas);
        setDraggedImage(null);
        setDraggedImageIndex(null);
      }
    };

    gallery.addEventListener('dragstart', (e) => handleDragStart(e, parseInt(e.target.id)));
    gallery.addEventListener('dragenter', handleDragEnter);
    gallery.addEventListener('dragover', handleDragOver);
    gallery.addEventListener('drop', (e) => handleDrop(e, parseInt(e.target.id)));

    return () => {
      gallery.removeEventListener('dragstart', handleDragStart);
      gallery.removeEventListener('dragenter', handleDragEnter);
      gallery.removeEventListener('dragover', handleDragOver);
      gallery.removeEventListener('drop', handleDrop);
    };
  }, [datas, draggedImageIndex]);

  const handleImageUpload = (event) => {
    const uploadedImages = event.target.files;

    const newImages = Array.from(uploadedImages).map((file, index) => ({
      id: datas.length + index + 1,
      image: URL.createObjectURL(file),
    }));

    setDatas([...datas, ...newImages]);
  };

  const handleCheckboxChange = (event) => {
    const imageId = event.target.id;

    if (event.target.checked) {
      setSelectedImages([...selectedImages, imageId]);
    } else {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    }
  };

  const handleDeleteImages = () => {
    const selectedImageIds = selectedImages.map(Number);

    const updatedDatas = datas.filter((data) => !selectedImageIds.includes(data.id));
    setDatas(updatedDatas);
    setSelectedImages([]);
  };
console.log(datas)
  return (
    <div className="max-w-[800px] mx-auto mt-10 bg-white p-5 rounded-md ">
      <article className="flex flex-row justify-between items-center mb-5 ">
        {selectedImages.length === 0 ? (
          <h1 className="text-xl text-black font-bold">Gallery</h1>
        ) : (
          <div>
            {selectedImages.length > 0 && (
              <div className=" flex">
                <input
                  type="checkbox"
                  checked

                  className="mt-1 mr-4 h-5 w-5 accent-blue-500"

                />
                <h1 className='text-black text-xl'>
                  <strong>
                    {selectedImages.length} {selectedImages.length === 1 ? 'file selected' : 'files selected'}

                    
                  </strong>

                </h1>
              </div>
            )}
          </div>
        )}
        <button className="text-red-500 font-medium" onClick={handleDeleteImages}>
          Delete files
        </button>
      </article>
      <hr />
      {/* "grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6 mt-5" */}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-6 mt-5"    ref={galleryRef}>
        {datas.map((data, index) => (
          <div
            key={data.id}
            className={ ` group relative before:content-[''] before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move col-span-1 hover:before:bg-black/50 ${selectedImages.includes(data.id.toString()) ? ' before:bg-white/50' : ''
                          } ` }
            
           
        
            draggable="true"
            onDragStart={(e) => handleDragStart(e, index)}
            id={index}
          >
            <img
              src={data.image}
              alt={data.id}
              loading="lazy"
              width={data.width}
              height={data.height}
              decoding="async"
              data-nimg="1"
              className="h-full w-full max-w-full rounded-lg object-contain border-2 undefined"
            />
            <input
              type="checkbox"
              name={data.id}
              id={data.id}
              className={` absolute top-4 left-4 h-5 w-5 accent-blue-500 opacity-0 ${selectedImages.includes(data.id.toString()) ? 'opacity-100' : 'absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer opacity-0'}`}
              onChange={handleCheckboxChange}
            />
          </div>
        ))}
        <div class="relative h-[133px] border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors ease-linear ">
          <input
            onChange={handleImageUpload}
            type="file"
            multiple=""
            name="images"
            id="images"
            class="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
            title="Try to upload photos..."
          />
          <div class="h-full w-full flex flex-col justify-center items-center gap-y-4">
            <img
              alt="placeholder"
              fetchpriority="high"
              width="20"
              height="20"
              decoding="async"
              data-nimg="1"
              srcset="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
            />
            <span class="whitespace-nowrap">Add Images</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

