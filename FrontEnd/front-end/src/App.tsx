

import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BlogPost {
  reference: string;
  title: string;
  description: string;
  main_image: string;
  additional_images: string;
  date_time: string;
}

interface FormData {
  title: string;
  description: string;
  main_image: string;
  additional_images:[];
  date_time: Date | null;
}

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    main_image: "",
    additional_images:[],
    date_time: Date | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (file) {
      const formattedName = `images/${file.name.replace(/\s/g, '_').toLowerCase().split('.').join('-')}.${file.name.split('.').pop()}`;
      console.log(formattedName,"helloooooooooooooo")
      setFormData({ ...formData, [e.target.name]: formattedName });
    } else {
      setFormData({ ...formData, [e.target.name]: null });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = e.target.name as keyof FormData;
  
    if (file) {
      const formattedName = `images/${file.name.replace(/\s/g, '_').toLowerCase().split('.').join('-')}.${file.name.split('.').pop()}`;
      console.log(formattedName, "helloooooooooooooo");
      setFormData(prevFormData => ({ 
        ...prevFormData, 
        [name]: [...(prevFormData[name] || []), formattedName]
      }));
    } else {
      setFormData(prevFormData => ({ ...prevFormData, [name]: [] }));
    }
  };


  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post<BlogPost>('http://localhost:3000/api/blogs/add', formData);
      setBlogs([...blogs, response.data]);
      setFormData({
        title: '',
        description: '',
        main_image: "",
        additional_images: [],
        date_time: null,
      });
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };

  useEffect(() => {
    axios.get<BlogPost[]>('http://localhost:3000/api/blogs/all')

      .then(response => setBlogs(response.data))
     
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, date_time: date });
  };

  return (
    <div className='grid items-center justify-items-center '>
         <h1>Blog List</h1>
                <ul>
        {blogs.map(blog => (
          <div>
          <li key={blog.reference}>{blog.title}</li>
           <li>{blog.description}</li>
           <li>{blog.main_image}</li>
           <li>{blog.additional_images}</li>
           <li>{blog.date_time}</li>
           </div>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className='justify-items-center h-screen w-[900px] mt-20'>

        <div className='flex gap-8 mb-8'>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className='block p-4 bg-slate-100 rounded-2xl w-full'
          />
        </div>

        <div className='flex gap-8 mb-8'>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className='block w-full p-4 bg-slate-100 rounded-2xl'
          />
        </div>

        <div className='flex gap-8 mb-8'>
          <label htmlFor="main_image">Main Image:</label>
          <input
            type="file"
            name="main_image"
            onChange={handleFileChange}
            accept="image/jpeg"
            aria-describedby="file_input_help"
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
          />
          <p className="mt-1 text-sm text-gray-500" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>

        <div className='flex gap-8 mb-8'>
          <label htmlFor="additional_images">Additional Image:</label>
          <input
            type="file"
            name="additional_images"
            onChange={handleImageChange}
            accept="image/jpeg"
            aria-describedby="file_input_help_additional"
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
          />
          <p className="mt-1 text-sm text-gray-500" id="file_input_help_additional">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>

        <div className='flex gap-8 mb-8'>
          <label htmlFor="">Date and Time</label>
          <div>
            <DatePicker
              selected={formData.date_time}
              name="date_time"
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              nextMonthButtonLabel=">"
              previousMonthButtonLabel="<"
              popperClassName="react-datepicker__input-container input"
            />
          </div>
        </div>

        <div>
          <button type="submit" className='bg-black text-white cursor-pointer rounded w-full h-10 active:scale-90'>Submit</button>
        </div>

      </form>
    </div>
  );
};

export default App;

