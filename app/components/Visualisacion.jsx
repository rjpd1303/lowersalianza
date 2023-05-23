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
    <div className={`pt-3 transition-all duration-1000 ease-in-out transform ${data.show ? 'translate-x-0' : '-translate-x-full'} flex items-center `}>
    <div className={`mr-5 ml-10 bg-blue-950 rounded-full p-3 shadow-xl shadow-black transition-all duration-500 delay-1000 ease-in-out transform ${data.show ? 'w-28 h-28' : 'w-0 h-0'} flex items-center justify-center content-center `}>
          <Image
          className={`p-1 transition-all duration-500 delay-1000 ease-in-out transform ${data.show ? 'w-28' : 'w-0'} flex `}
              src={data.logo ? data.logo : logo} // Usar el logo si está disponible, si no usar la imagen por defecto
              alt="logo"
              width={100}
              height={100}
              />
      </div>
      <div>
        <div className='flex'>
      <div className={`overflow-hidden flex transition-all duration-500 ease-in-out transform ${data.show ? 'translate-x-0' : '-translate-x-full'} flex items-center bg-gradient-to-r from-gray-100 to-gray-100/50 p-4 shadow-black shadow-xl`}>
      <h1 style={{ fontFamily: data.font, fontSize: data.titleSize + "px", color: data.titleColor }} className={`${data.titleFontStyle} ${data.titleCase}`}>
          {data.title}
      </h1>
      </div>
      <div className={`flextransition-all duration-700 delay-500 ease-in-out transform ${data.show ? 'h-20' : 'h-0'} flex items-center bg-blue-950 w-3`}></div>
      </div>
      <div className={`h-5 w-max transition-all duration-1000 delay-700 ease-in-out transform ${data.show ? 'translate-x-0' : '-translate-x-full'} flex items-center bg-gradient-to-r from-cyan-500/90 to-blue-500/90 p-4`}>
      <h2 style={{ fontFamily: data.font, fontSize: data.subtitleSize + "px", color: data.subtitleColor }} className={`${data.subtitleFontStyle} ${data.subtitleCase}`}>
          {data.subtitle}
      </h2>
  </div>
      </div>
  </div>
);

}
