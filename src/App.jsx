import React, { useState } from 'react';

const MyApp = () => {
  const [jsonText, setJsonText] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [apiData, setApiData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const submitJsonData = async () => {
    try {
      const parsedJson = JSON.parse(jsonText);

      const response = await fetch('https://api-testbajaj.evanke.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });

      const result = await response.json();

      if (response.ok) {
        setApiData(result);
        setIsDropdownVisible(true);
        setAlertMessage('');
      } else {
        setAlertMessage('An error occurred during the request.');
        setIsDropdownVisible(false);
      }
    } catch (error) {
      setAlertMessage('Invalid JSON input. Please check the format and try again.');
      setIsDropdownVisible(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const dismissAlert = () => {
    setAlertMessage('');
  };

  const displayFilteredData = () => {
    if (!apiData) return null;

    switch (selectedOption) {
      case 'Numbers':
        return <p className="text-blue-700">Numbers: {apiData.numbers.join(', ')}</p>;
      case 'Alphabets':
        return <p className="text-green-700">Alphabets: {apiData.alphabets.join(', ')}</p>;
      case 'Highest Lowercase Alphabet':
        return <p className="text-indigo-700">Highest Lowercase Alphabet: {apiData.highest_lowercase_alphabet.join(', ')}</p>;
      default:
        return <p className="text-gray-700">Please select an option to view the filtered data.</p>;
    }
  };

  return (
    <div className='bg-white w-full h-full flex flex-col justify-center items-center p-10'>
      <div className='flex flex-col justify-center items-center gap-4 w-96'>
        <div className='w-full'>
          <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Enter JSON Data</h1>
          <input
            type="text"
            className='border border-gray-300 p-2 rounded-lg text-md w-full focus:outline-none focus:border-indigo-500'
            placeholder='Enter your JSON data here...'
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
          />
        </div>
        <button
          className='bg-indigo-600 text-white py-3 w-full rounded-lg font-semibold hover:bg-indigo-700 transition ease-in-out duration-200'
          onClick={submitJsonData}
        >
          Submit
        </button>

        {alertMessage && (
          <div className='bg-red-200 border border-red-400 text-red-800 px-4 py-3 rounded w-full mt-4 relative' role="alert">
            <span className='block'>{alertMessage}</span>
            <span
              className='absolute top-0 bottom-0 right-0 px-4 py-3'
              onClick={dismissAlert}
            >
              <svg className='fill-current h-6 w-6 text-red-800' role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </span>
          </div>
        )}

        {isDropdownVisible && (
          <div className='mt-6 w-full'>
            <select
              className='border border-gray-400 p-3 rounded-lg text-md w-full focus:outline-none focus:border-indigo-500'
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="">Choose a Filter</option>
              <option value="Numbers">Numbers</option>
              <option value="Alphabets">Alphabets</option>
              <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
            </select>
          </div>
        )}

        <div className="mt-6 w-full">
          {displayFilteredData()}
        </div>
      </div>
    </div>
  );
}

export default MyApp;
