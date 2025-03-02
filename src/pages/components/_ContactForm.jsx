import React, { useState } from 'react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ submitted: false, submitting: true, info: { error: false, msg: null } });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      const data = await response.json();

      if (response.status === 200) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Message sent successfully!' }
        });
        setFormState({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: data.error || 'Something went wrong. Please try again.' }
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Something went wrong. Please try again.' }
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="rounded-lg bg-neutral-900 shadow-lg p-6">
        <div className="container my-14 mx-auto p-4 text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Contact Us</h1>
          <form className="text-gray-400 max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="text-black mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md text-black border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                className="text-black mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={status.submitting}
              className="px-4 py-2 bg-white text-black rounded-full hover:bg-zinc-800 hover:text-white duration-300 focus:outline-none focus:ring focus:ring-indigo-200 disabled:opacity-50"
            >
              {status.submitting ? 'Sending...' : 'Submit'}
            </button>
            
            {status.info.error && (
              <div className="mt-4 text-red-400">{status.info.msg}</div>
            )}
            {status.submitted && (
              <div className="mt-4 text-green-400">{status.info.msg}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;