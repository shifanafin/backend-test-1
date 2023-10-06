import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




const App: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    main_image: null as File | null,
    date_time: null as Date | null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, main_image: file || null });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('main_image', formData.main_image as File);

    const response = await fetch('http://localhost:3000/api/addBlogPost', {
      method: 'POST',
      body: formDataToSend,
    });

    const data = await response.json();
    if (!formData.date_time) {
      alert('Please select a date and time');
      return;
    }
  
    console.log(data);
  };
  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, date_time: date });
  };

  return (
    <div className='grid items-center justify-items-center '>
    <form onSubmit={handleSubmit} className='  justify-items-center h-screen w-[900px] mt-20'>
      


     
      <div className='flex gap-8 mb-8'>
        <label htmlFor="title" className=''>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className='block  p-4   bg-slate-100 rounded-2xl w-full'
        />
      </div>
      <div className='flex gap-8 mb-8'>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className='block w-full p-4   bg-slate-100 rounded-2xl'
        />
      </div>
      


      <div className='flex gap-8 mb-8'>
        <label htmlFor="main_image">Main Image:</label>
        <input
          type="file"
          id="main_image"
          name="main_image"
          accept="image/jpeg"
          onChange={handleFileChange}
          aria-describedby="file_input_help" 
       
          className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
        />
        <p className="mt-1 text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
      </div>
      <div className='flex gap-8 mb-8'>
        <label htmlFor="main_image">Additional Image:</label>
        <input
          type="file"
          id="additional_image"
          name="additional_image"
          accept="image/jpeg"
          onChange={handleFileChange}
          aria-describedby="file_input_help_additional" 
          
       
          className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
        />
        <p className="mt-1 text-sm text-gray-500 " id="file_input_help_additional">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
      </div>
      <div className='flex gap-8 mb-8'>
        <label htmlFor="">Date and Time</label>
      <div >

      <DatePicker
      
  selected={formData.date_time}
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
    <div className=' '>

      <button type="submit" className='bg-black text-white cursor-pointer rounded w-full h-10 active:scale-90'>Submit</button>
      </div>
      
    </form>
    </div>
  );
};

export default App;
