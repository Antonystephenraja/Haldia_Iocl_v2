import React ,{useState}from 'react'
import ReactApexChart from 'react-apexcharts';
import Select from 'react-select';
const Demo_chart = () => {
    const [device ,setDropdownDays]=useState([])

    const dropdown_datas =[
        { label: 'Reformer-1', value: '01' },
        { label: 'Reformer-2', value: '02' },
        { label: 'Reformer-3', value: '03' },
        { label: 'Reformer-4', value: '04' },
        { label: 'Reformer-5', value: '05' },
        { label: 'Reformer-6', value: '06' },
        { label: 'Reformer-7', value: '07' },
        { label: 'Reformer-8', value: '08' },
        { label: 'Reformer-9', value: '09' },
        { label: 'Reformer-10', value: '10' },
      ]
      const handleDaysDropdown = (selectedOption) => {
        setDropdownDays(selectedOption.value);
    };
    const chartOptions = {
     
        series: [
            {
              name: "High - 2013",
            
              data: [28, 29, 33, 36, 32, 32, 33],
               
            },
            {
              name: "Low - 2013",
              data: [12, 11, 14, 18, 17, 13, 13]
            }
          ],
          options: {
            chart: {
              height: 350,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Average High & Low Temperature',
              align: 'left'
            },
      
         
            dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: 'smooth',
              },
              xaxis: {
                categories:[5,97,5,4],
                labels: {
                  style: {
                    colors: '#ffffff', 
                  },
                },
              },
              yaxis:{
                labels:{
                  style:{
                    colors:'#ffffff'
                  }
                }
              },
              legend: {
                labels: {
                  colors: ['#27B8F3', '#16F05E','#F3D818','#F35718','#B110F3'], // Set colors for series names
                },
              },
          },

    }
 
      

  return (
    <div className='bg-dark_color height'>
        <h1 className='text-white font-bold text-2xl text-center'>Analytics a Temperature Datas</h1>
        <div className="flex flex-col md:flex-row justify-end bg-dark_color rounded-lg p-4 md:ml-5 md:mr-5">
            <div>
            <h1 className="text-white mb-4 md:mb-0 font-bold mr-2 mt-1">Select the Reformer Tube:</h1>
            </div>
            <Select options={dropdown_datas} className="text-black w-32" isSearchable={true} onChange={handleDaysDropdown} />
        </div>
        <div id="chart" className='bg-[#2e304a] m-4 rounded-lg'>
            <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={450} />
        </div>


      
    </div>
  )
}

export default Demo_chart
