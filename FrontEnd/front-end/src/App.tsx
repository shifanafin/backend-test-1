// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';

// interface BlogPost {
//   reference: string;
//   title: string;
// }

// interface FormData {
//   title: string;
//   description: string;
//   main_image: string;
//   additional_images: string;
//   date_time: string;
// }

// const App: React.FC = () => {
//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   const [formData, setFormData] = useState<FormData>({
//     title: '',
//     description: '',
//     main_image: '',
//     additional_images: '',
//     date_time: '',
//   });

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post<BlogPost>('http://localhost:5000/api/v1/blogs', formData);
//       setBlogs([...blogs, response.data]);
//       setFormData({
//         title: '',
//         description: '',
//         main_image: '',
//         additional_images: '',
//         date_time: '',
//       });
//     } catch (error) {
//       console.error('Error adding blog post:', error);
//     }
//   };

//   useEffect(() => {
//     axios.get<BlogPost[]>('http://localhost:5000/api/v1/blogs')
//       .then(response => setBlogs(response.data))
//       .catch(error => console.error('Error fetching blogs:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Blog List</h1>
//       <ul>
//         {blogs.map(blog => (
//           <li key={blog.reference}>{blog.title}</li>
//         ))}
//       </ul>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           placeholder="Title"
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           placeholder="Description"
//           required
//         />
//         <input
//           type="text"
//           name="main_image"
//           value={formData.main_image}
//           onChange={handleInputChange}
//           placeholder="Main Image URL"
//           required
//         />
//         <input
//           type="text"
//           name="additional_images"
//           value={formData.additional_images}
//           onChange={handleInputChange}
//           placeholder="Additional Images (comma-separated URLs)"
//         />
//         <input
//           type="text"
//           name="date_time"
//           value={formData.date_time}
//           onChange={handleInputChange}
//           placeholder="Date Time (Unix timestamp)"
//           required
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default App;



// import axios from 'axios';
// import React, { useState, ChangeEvent, FormEvent,useEffect} from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';




// const App: React.FC = () => {
//   interface BlogPost {
//   reference: string;
//   title: string;
// }

// interface formData {
//   title: string;
//   description: string;
//   main_image: File | null;
//   additional_images: File | null;
//   date_time: Date | null;
// }

//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     main_image: null as File | null,
//     additional_images: null as File | null,
//     date_time: null as Date | null,
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setFormData({ ...formData, main_image: file || null });
//   };

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post<BlogPost>('http://localhost:3000/api/v1/blogs', formData);
//       setBlogs([...blogs, response.data]);
//       setFormData({
//        title: '',
//     description: '',
//     main_image: null as File | null,
//     additional_images: null as File | null,
//     date_time: null as Date | null,
//       });
//     } catch (error) {
//       console.error('Error adding blog post:', error);
//     }
//   };

//   useEffect(() => {
//     axios.get<BlogPost[]>('http://localhost:3000/api/v1/blogs/all')
//       .then(response => setBlogs(response.data))
//       .catch(error => console.error('Error fetching blogs:', error));
//   }, []);
//   const handleDateChange = (date: Date | null) => {
//     setFormData({ ...formData, date_time: date });
//   };

//   return (
//     <div className='grid items-center justify-items-center '>
//     <form onSubmit={handleSubmit} className='  justify-items-center h-screen w-[900px] mt-20'>
      


     
//       <div className='flex gap-8 mb-8'>
//         <label htmlFor="title" className=''>Title:</label>
//         <input
//              type="text"
//              name="title"
//              value={formData.title}
//              onChange={handleChange}
//              placeholder="Title"
//              required
//           className='block  p-4   bg-slate-100 rounded-2xl w-full'
//         />
//       </div>
//       <div className='flex gap-8 mb-8'>
//         <label htmlFor="description">Description:</label>
//         <textarea
            
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             required
//           className='block w-full p-4   bg-slate-100 rounded-2xl'
//         />
//       </div>
      


//       <div className='flex gap-8 mb-8'>
//         <label htmlFor="main_image">Main Image:</label>
//         <input
//           type="file"
//           name="main_image"
//           value={formData.main_image}
//           onChange={handleFileChange}
//           accept="image/jpeg"
//           aria-describedby="file_input_help" 
       
//           className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
//         />
//         <p className="mt-1 text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
//       </div>
//       <div className='flex gap-8 mb-8'>
//         <label htmlFor="main_image">Additional Image:</label>
//         <input
//           type="file"
//           name="additional_images"
//           value={formData.additional_images || ''}
//           onChange={handleFileChange}
//           placeholder="Additional Images (comma-separated URLs)"
//           accept="image/jpeg"
//           aria-describedby="file_input_help_additional" 
          
       
//           className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
//         />
//         <p className="mt-1 text-sm text-gray-500 " id="file_input_help_additional">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
//       </div>
//       <div className='flex gap-8 mb-8'>
//         <label htmlFor="">Date and Time</label>
//       <div >

//       <DatePicker
      
//   selected={formData.date_time}
//   name="date_time"
//   onChange={handleDateChange}
//   showTimeSelect
//   timeFormat="HH:mm"
//   timeIntervals={15}
//   dateFormat="MMMM d, yyyy h:mm aa"
//   nextMonthButtonLabel=">"
//   previousMonthButtonLabel="<"
//   popperClassName="react-datepicker__input-container input"
// />
// </div>
// </div>
//     <div className=' '>

//       <button type="submit" className='bg-black text-white cursor-pointer rounded w-full h-10 active:scale-90'>Submit</button>
//       </div>
      
//     </form>
//     </div>
//   );
// };

// export default App;


import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BlogPost {
  reference: string;
  title: string;
  description: string;
  main_image: File | null;
  additional_images: File | null;
  date_time: Date | null;
}

interface FormData {
  title: string;
  description: string;
  main_image: File | null;
  additional_images: File | null;
  date_time: Date | null;
}

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    main_image: null,
    additional_images: null,
    date_time: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, [e.target.name]: file || null });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post<BlogPost>('http://localhost:3000/api/blogs/add', formData);
      setBlogs([...blogs, response.data]);
      setFormData({
        title: '',
        description: '',
        main_image: null,
        additional_images: null,
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
            onChange={handleFileChange}
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

