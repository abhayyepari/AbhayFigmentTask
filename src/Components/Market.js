import React, { useState, useEffect } from "react";
import { yahooOptions, fetchData } from "../Utils/FetchData";
import './News.css';

const Market = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMarketData = async () => {
      const region = "US";
      const symbols = "AMD,IBM,AAPL";

      try {
        const data = await fetchData(
          `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=${region}&symbols=${symbols}`,
          yahooOptions
        );
        if (data && data.quoteResponse && data.quoteResponse.result) {
          setMarketData(data.quoteResponse.result);
        } else {
          setError('Invalid data format received from the API.');
        }
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMarketData();
  }, []);

  // console.log("All Data : ", marketData);

  return (
    <div className="my-20 px-4 lg:px-24">
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Waiting For Data...</p>
        </div>
      )}
      {error && <div>Error: {error}</div>}
      {
        marketData.map((marketd)=>(
          <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4 text-blue-500">{marketd.shortName}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">General Infomation</h2>
                <p style={{ marginBottom: '10px' }}><strong>Symbol : </strong>{marketd.symbol}</p>
                <p style={{ marginBottom: '10px' }}><strong>Market Cap : </strong>{marketd.marketCap}</p>
                <p style={{ marginBottom: '10px' }}><strong>Exchange : </strong>{marketd.exchange}</p>
                <p style={{ marginBottom: '10px' }}><strong>Type Disp : </strong>{marketd.typeDisp}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">Financials</h2>
                <p style={{ marginBottom: '10px' }}><strong>Custom Price Alert Confidence : </strong>{marketd.customPriceAlertConfidence}</p>
                <p style={{ marginBottom: '10px' }}><strong>Revenue : </strong>{marketd.revenue}</p>
                <p style={{ marginBottom: '10px' }}><strong>EBITDA : </strong>{marketd.ebitda}</p>
                <p style={{ marginBottom: '10px' }}><strong>EPS Trailing Twelve Months : </strong>{marketd.epsTrailingTwelveMonths}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
  
  
};

export default Market;
