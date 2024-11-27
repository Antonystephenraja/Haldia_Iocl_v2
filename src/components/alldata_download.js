import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Alldata_download = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://3.111.136.104:4000/backend/fetchAllData');
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    const handleDownload = () => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
      XLSX.writeFile(workbook, 'data.xlsx');
    };
  return (
    <div>
      
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={handleDownload} disabled={data.length === 0}>
        Download Excel
      </button>
    </div>
    </div>
  )
}

export default Alldata_download
