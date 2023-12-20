import React, { useEffect, useState } from "react";
import { yahooOptions, fetchData } from "../Utils/FetchData";
import "./News.css";

const Stocks = () => {
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStocks, setSelectedStocks] = useState(null);

  useEffect(() => {
    const fetchYahooData = async () => {
      const symbols = "INTC";

      try {
        const data = await fetchData(
          `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-recommendations?symbol=${symbols}`,
          yahooOptions
        );
        setStocksData(data.finance.result[0].quotes);
        // if (data && data.finance && data.finance.result) {
        //   setStocksData(data.finance.result);
        // } else {
        //   setError("Invalid data format received from the API.");
        // }
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchYahooData();
  }, []);

  console.log(stocksData);
  const openModal = (newsItem) => {
    setSelectedStocks(newsItem);
  };

  const closeModal = () => {
    setSelectedStocks(null);
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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {stocksData.map((stockItem, index) => (
            <div key={index} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg mt-5'>
              <div className='p-4'>
                <span className='text-xs font-semibold text-gray-500 uppercase'>{stockItem.shortName}</span>
                <h2 className='mt-2 text-xl font-semibold'>{stockItem.fullExchangeName}</h2>
                <p className='mt-2 text-gray-600 summary-text'>{stockItem.market}</p>
                <div className="flex flex-row justify-between">
                  <p className='mt-2 text-gray-600 summary-text font-bold'>{stockItem.exchange}</p>
                  <p className='mt-2 text-gray-600 summary-text font-bold'>{stockItem.exchangeTimezoneName}</p>
                  <p className='mt-2 text-gray-600 summary-text font-bold'>{stockItem.exchangeTimezoneShortName}</p>
                </div>
                <p className="mt-3"><span className="font-bold">Pre Market Price : </span>{stockItem.preMarketPrice}</p>
              </div>
              
            </div>
          ))}
        </div>

    </div>
  );
};

export default Stocks;
