import React, { useState, useEffect } from "react";
import { yahooOptions, fetchData } from "../Utils/FetchData";

const Screener = () => {
  const [screenerData, setScreenerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScreenerData = async () => {
      const ticker = "AMRN";

      try {
        const data = await fetchData(
          `https://apidojo-yahoo-finance-v1.p.rapidapi.com/screeners/list-by-ticker?ticker=${ticker}`,
          yahooOptions
        );
        if (data && data.finance && data.finance.result) {
          setScreenerData(data.finance.result);
        } else {
          setError("Invalid data format received from the API.");
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchScreenerData();
  }, []);
  console.log(screenerData);
  return (
    <div>
      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Waiting For Data...</p>
        </div>
      )}
      <div className="my-20 px-4 lg:px-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenerData.map((sdata, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition duration-300 transform hover:scale-105"
          >
            <img
              src={sdata.iconUrl}
              alt={sdata.name}
              className="w-12 h-12 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{sdata.name}</h2>
            <p>
              <strong>Canonical Name:</strong> {sdata.canonicalName}
            </p>
            <p>
              <strong>Is Premium Screener:</strong>{" "}
              {sdata.isPremiumScreener ? "Yes" : "No"}
            </p>
            <p>
              <strong>Type:</strong> {sdata.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screener;
