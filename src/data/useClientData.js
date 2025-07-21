// src/data/useClientData.js
import { useState, useEffect } from "react";
import Papa from "papaparse";

const useClientData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/data/churn_predictions.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  return data;
};

export default useClientData;
