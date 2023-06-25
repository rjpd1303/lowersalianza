// Visualizacion.js
'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../images/logoplata.png';

export function Visualizacion() {
    const [data, setData] = useState({});

    useEffect(() => {
      const interval = setInterval(() => {
          const storedData = localStorage.getItem("lowerThirdsData");
          if (storedData) {
              const parsedData = JSON.parse(storedData);
              if (parsedData !== data) {
                  setData(parsedData);
              }
          }
      }, 1000);
  
      return () => clearInterval(interval);
  }, [data]);

return (
    <div className={`pt-3 transition-all duration-1000 ease-in-out transform ${data.show ? 'translate-x-0' : '-translate-x-full'} flex items-center w-full`}>
        <div className={`mr-5 ml-10 bg-blue-950 rounded-full p-3 shadow-xl shadow-black transition-all duration-500 delay-1000 ease-in-out transform ${data.show ? 'w-28 h-28' : 'w-0 h-0'} flex items-center justify-center content-center flex-shrink-0`}>
          <Image
          className={`p-1 transition-all duration-500 delay-1000 ease-in-out transform ${data.show ? 'w-28' : 'w-0'} flex `}
              src={data.logo ? data.logo : logo} // Usar el logo si está disponible, si no usar la imagen por defecto
              alt="logo"
              width={100}
              height={100}
              />
      </div>
      <div className='w-full'>
    <div className='flex w-full'>
        <div id='title' className={`w-[90%] overflow-hidden transition-all duration-500 ease-in-out transform ${data.show ? 'translate-x-0' : '-translate-x-full delay-500'} items-center bg-gradient-to-r from-gray-100 to-gray-100/50 p-4 shadow-black shadow-xl flex-grow`}>
            <h1  style={{ fontSize: data.titleSize + "px", color: data.titleColor }} className={`${data.titleFontStyle} font-${data.font} ${data.titleCase === "uppercase" ? "uppercase" : ""}`}>
                {data.title}
            </h1>
        </div>
        <div className={`flextransition-all   ease-in-out transform ${data.show ? 'h-20 delay-500 duration-700' : 'h-0 duration-200'} flex items-center bg-blue-950 w-3`}></div>
    </div>
    {data.subtitle && 
        <div id='subtitle' className={`h-5 w-max transition-all duration-1000 delay-700 ease-in-out transform ${data.show ? 'translate-x-0' : '-translate-x-full'} flex items-center bg-gradient-to-r from-cyan-500/90 to-blue-500/90 p-4`}>
            <h2 style={{ fontSize: data.subtitleSize + "px", color: data.subtitleColor }} className={`${data.subtitleFontStyle} font-${data.font} ${data.subtitleCase === "uppercase" ? "uppercase" : ""}`}>
                {data.subtitle}
            </h2>
        </div>
    }
</div>

  </div>
);

}
