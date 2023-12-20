import React, { useEffect, useState } from 'react';
import { yahooOptions, fetchData } from '../Utils/FetchData';
import './News.css';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const fetchYahooData = async () => {
      const region = 'US';
      const symbols = 'AMD,IBM,AAPL';
      const category = 'generalnews';

      try {
        const data = await fetchData(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list?region=${region}&category=${category}`, yahooOptions);
        if (data && data.items && data.items.result) {
          setNewsData(data.items.result);
        } else {
          setError('Invalid data format received from the API.');
        }
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchYahooData();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  };

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

   // Logic to get current items based on pagination
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);
 
   const paginate = (pageNumber) => {
     setCurrentPage(pageNumber);
   };
  
  return (
    <div className="my-20 px-4 lg:px-24">
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Waiting For Data...</p>
        </div>
      )}
      {error && <div>Error: {error}</div>}
      {newsData.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {currentItems.map((newsItem) => (
            <div key={newsItem.uuid} onClick={() => openModal(newsItem)} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg mt-5'>
              <img className='w-full h-40 object-cover object-center' src={newsItem.main_image?.original_url || ''} alt={newsItem.title || 'News Image'}  />
              <div className='p-4'>
                <span className='text-xs font-semibold text-gray-500 uppercase'>{newsItem.type}</span>
                <h2 className='mt-2 text-xl font-semibold'>{newsItem.title}</h2>
                <p className='mt-2 text-gray-600 summary-text'>{newsItem.summary}</p>
                <div className='flex items-center mt-4'>
                  <p className='text-sm text-gray-500'>{formatDate(newsItem.published_at)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        {newsData.length > itemsPerPage && (
          <ul className="pagination-list">
            {Array(Math.ceil(newsData.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li key={index} className="pagination-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`pagination-button ${
                      currentPage === index + 1 ? 'active' : ''
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Modal */}

      {selectedNews && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <img className='w-full h-40 object-cover object-center' src={selectedNews.main_image?.original_url || ''} alt={selectedNews.title || 'News Image'}  />
            <h2 className='mt-2 text-xl font-semibold'>{selectedNews.title}</h2>
            <p>{selectedNews.summary}</p>
            <p>Publisher : {selectedNews.publisher}</p>
            <p>Author : {selectedNews.author}</p>
            <p>Publish Date: {formatDate(selectedNews.published_at)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
