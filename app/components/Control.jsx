// Control.js
'use client'
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSave, faEye, faEyeSlash, faPlus, faArchive, faExchangeAlt, faUpload } from '@fortawesome/free-solid-svg-icons'

export function Control() {
  const [savedItems, setSavedItems] = useState([]);
  const fileInputtxt = useRef();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [show, setShow] = useState(true);
  const [font, setFont] = useState("Josefin Sans");
  const [titleSize, setTitleSize] = useState(30);
  const [subtitleSize, setSubtitleSize] = useState(20);
  const [titleColor, setTitleColor] = useState("#000080");
  const [subtitleColor, setSubtitleColor] = useState("#ffffff");
  const [logo, setLogo] = useState("");
  const fileInput = React.createRef();
  const [titleFontStyle, setTitleFontStyle] = useState("font-normal");
  const [subtitleFontStyle, setSubtitleFontStyle] = useState("font-normal");
  const [titleCase, setTitleCase] = useState("lowercase");
  const [subtitleCase, setSubtitleCase] = useState("lowercase");
  const updateDisplayData = useCallback(() => {
    const data = {
        title,
        subtitle,
        show: !show,
        font,
        titleSize,
        subtitleSize,
        titleColor,
        subtitleColor,
        logo,
        titleFontStyle,
        subtitleFontStyle,
        titleCase,
        subtitleCase
    };

    localStorage.setItem("lowerThirdsData", JSON.stringify(data));
}, [title, subtitle, show, font, titleSize, subtitleSize, titleColor, subtitleColor, logo, titleFontStyle, subtitleFontStyle, titleCase, subtitleCase]);

const handleShow = useCallback(() => {
    setShow(!show);
    updateDisplayData();
}, [show, updateDisplayData]);

const handleAdd = useCallback(() => {
  setSavedItems(prevSavedItems => [...prevSavedItems, { title, subtitle }]);
  updateDisplayData();
}, [title, subtitle, updateDisplayData]);

const handleSave = useCallback(() => {
  const textToSave = savedItems.map(item => `Título: ${item.title}\r\nSubtítulo: ${item.subtitle}`).join('\r\n\r\n');
  const blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "savedItems.txt");
}, [savedItems]);


const handleDelete = useCallback((index) => {
    setSavedItems(prevSavedItems => prevSavedItems.filter((_, itemIndex) => itemIndex !== index));
    updateDisplayData();
  }, [updateDisplayData]);


const handleSelect = useCallback((item) => {
    setTitle(item.title);
    setSubtitle(item.subtitle);
    updateDisplayData();
}, [updateDisplayData]);

useEffect(() => {
    updateDisplayData();
}, [title, subtitle, updateDisplayData]);


    const changeCase = (setCase, currentCase) => {
        let nextCase;
        switch(currentCase) {
          case "lowercase":
            nextCase = "uppercase";
            break;
          case "uppercase":
            nextCase = "lowercase";
            break;
        }
        setCase(nextCase);
    };

    const changeFontStyle = (setFontStyle, currentStyle) => {
        let nextStyle;
        switch(currentStyle) {
          case "font-normal":
            nextStyle = "font-bold";
            break;
          case "font-bold":
            nextStyle = "font-black";
            break;
          case "font-black":
            nextStyle = "font-normal";
            break;
        }
        setFontStyle(nextStyle);
        
      };      

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(evt) {
          // Parse the file contents
          let lines;
          if(evt.target.result.includes('\r\n\r\n')){
              lines = evt.target.result.split('\r\n\r\n');
          } else {
              lines = evt.target.result.split('\n\n');
          }
          const newItems = lines.map(line => {
              const [titleLine, subtitleLine] = line.includes('\r\n') ? line.split('\r\n') : line.split('\n');
              const title = titleLine.split(': ')[1];
              const subtitle = subtitleLine.split(': ')[1];
              return { title, subtitle };
          });
          // Add the new items to the saved items
          setSavedItems([...savedItems, ...newItems]);
      };
      reader.readAsText(file);
  };
  

        return (
            <div className="p-4 bg-slate-800 h-screen">
                <h1 className="mb-4 font-josefin_sans font-black text-slate-200 bg-slate-600 rounded-md px-4 py-2 w-max">Tercios Alianza 1.2</h1>
                <div className='text-xs text-white'>Título</div>
                <div className='flex gap-4 mb-1'>
                    <input className='focus:border-sky-500 focus:ring-sky-500 bg-slate-400 placeholder:text-slate-600 px-2 rounded-md border-2 ' type="text" placeholder=" Título..." value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="color" value={titleColor} onChange={(e) => setTitleColor(e.target.value)} />
                    <input className='w-10 bg-slate-400 rounded-md' type="number" value={titleSize} onChange={(e) => setTitleSize(e.target.value)} />
                    <button className={`${titleFontStyle === "font-normal" ? 'font-normal' : titleFontStyle === "font-bold" ? 'font-bold' : 'font-black'} bg-slate-300 p-1 rounded-md hover:bg-slate-400`} onClick={() => changeFontStyle(setTitleFontStyle, titleFontStyle)}>
                         {titleFontStyle === "font-normal" ? "N" : titleFontStyle === "font-bold" ? "b" : "B"}
                    </button> 
                    <button className={`${titleCase === "lowercase" ? 'font-normal' : 'font-black'} p-1 bg-slate-200 rounded-md hover:bg-slate-400`} onClick={() => changeCase(setTitleCase, titleCase)}>
                    {titleCase === "lowercase" ? "m" : "M"}
                    </button>
                </div>
                <div className='text-xs text-white'>Subtítulo</div>
                <div className="flex gap-4 mb-1">
                    <input className='bg-slate-400 placeholder:text-slate-600 px-2 rounded-md border-2 border-slate-900' type="text" placeholder=" Subtítulo..."value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                    <input type="color" value={subtitleColor} onChange={(e) => setSubtitleColor(e.target.value)} />
                    <input className='w-10 bg-slate-400 rounded-md' type="number" value={subtitleSize} onChange={(e) => setSubtitleSize(e.target.value)} />
                    <button className={`${subtitleFontStyle === "font-normal" ? 'font-normal' : subtitleFontStyle === "font-bold" ? 'font-bold' : 'font-black'} bg-slate-300 p-1 rounded-md hover:bg-slate-400`} onClick={() => changeFontStyle(setSubtitleFontStyle, subtitleFontStyle)}>
                     {subtitleFontStyle === "font-normal" ? "N" : subtitleFontStyle === "font-bold" ? "b" : "B"}
                    </button>
                    <button className={`${subtitleCase === "lowercase" ? 'font-normal' : 'font-black'} p-1 rounded-md bg-slate-200 hover:bg-slate-400`} onClick={() => changeCase(setSubtitleCase, subtitleCase)}>
                      {subtitleCase === "lowercase" ? "m" : "M"}
                    </button>
                </div>
                <div className='text-xs text-white mt-0 pt-0'>Fuente:</div>
                <div className='flex gap-4 mb-3'>
                    <select className='bg-slate-400 rounded-md' value={font} onChange={(e) => setFont(e.target.value)}>
                        <option className='font-roboto' value="roboto">Roboto</option>
                        <option className='font-josefin_sans' value="josefin_sans">Josefin</option>
                        <option className='font-montserrat' value="montserrat">Montserrat</option>
                        <option className='font-raleway' value="raleway">Raleway</option>
                        <option className='font-aBeeZee' value="aBeeZee">ABeeZee</option>
                        <option className='font-alice' value="alice">Alice</option>
                    </select>
                    <input type="file" style={{display: 'none'}} ref={fileInput} onChange={(e) => setLogo(URL.createObjectURL(e.target.files[0]))} />
                    <button className='bg-white p-3 rounded-md hover:bg-slate-300' type="button" onClick={() => fileInput.current && fileInput.current.click()}>
  <FontAwesomeIcon className='text-indigo-700' icon={faExchangeAlt} />
  {" "}Cambiar logo
</button>                    </div>
                    <button className='bg-white rounded-md p-3 mb-2 hover:bg-slate-400 w-full' onClick={handleShow}>
  <FontAwesomeIcon className='text-indigo-600' icon={show ? faEye : faEyeSlash} />
  {show ? ' Mostrar' : ' Ocultar'}
</button>
                <div className='flex gap-2'>
                <button className=' rounded-md p-3  flex font-black text-indigo-700 hover:text-indigo-400 text-3xl px-1' onClick={handleAdd}>
  <FontAwesomeIcon icon={faPlus} />
</button>
<button className=' rounded-md p-3 text-indigo-700 hover:text-indigo-400 flex text-3xl pl-1 pr-2' onClick={handleSave}>
                <FontAwesomeIcon icon={faSave} />
                </button> 
                <input type='file' ref={fileInputtxt} onChange={handleFileUpload} style={{display: 'none'}} />
                <button className='bg-indigo-700 p-3 rounded-lg hover:bg-indigo-500 text-white' onClick={() => fileInputtxt.current.click()}>
  <FontAwesomeIcon icon={faUpload} />
  {" "}Cargar tercios txt
</button>                </div>

                <div className='mt-4'>
                    {
                    console.log(savedItems.length)}
                    {savedItems.length > 0 && <h2 className="mb-2 font-black text-indigo-500 rounded-md px-4 w-max">
                <FontAwesomeIcon icon={faArchive} />
                {" "}Elementos Guardados
                </h2>}
                
<ul className='text-white'>
          {savedItems.map((item, index) => (
    <div key={index} className='flex justify-stretch items-center'>
    <li className='bg-gray-600 w-[95%] m-2 rounded-md px-3 cursor-pointer hover:bg-gray-200 hover:text-indigo-900' key={index} onClick={() => handleSelect(item)}>
              <span className='font-black text-indigo-400'>Título:</span> {item.title}, <span className='font-black text-indigo-400'>Subtítulo:</span> {item.subtitle}
            </li>
            <button className='w-[5%]   hover:text-indigo-700' onClick={(e) => {e.stopPropagation(); handleDelete(index);}}>
  <FontAwesomeIcon icon={faTrash} />
</button>            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
