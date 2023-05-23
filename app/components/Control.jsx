// Control.js
'use client'
import React, { useState } from 'react';

export function Control() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [show, setShow] = useState(false);
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


      const handleShow = () => {
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
        setShow(!show);
    };

        return (
            <div className="p-4 bg-slate-800 h-screen">
                <h1 className="mb-4 font-black text-slate-200 bg-slate-600 rounded-md px-4 py-2 w-max">Tercios Alianza 1.0</h1>
                <div className='flex gap-4 mb-3'>
                <div className="w-1/12 text-white">
                    Título
                </div>
                    <input className='focus:border-sky-500 focus:ring-sky-500 bg-slate-400 placeholder:text-slate-600 rounded-md border-2 ' type="text" placeholder=" Título..." value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="color" value={titleColor} onChange={(e) => setTitleColor(e.target.value)} />
                    <input className='w-10 bg-slate-400 text-center justify-center' type="number" value={titleSize} onChange={(e) => setTitleSize(e.target.value)} />
                    <button className={`${titleFontStyle === "font-normal" ? 'font-normal' : titleFontStyle === "font-bold" ? 'font-bold' : 'font-black'} bg-slate-300 p-1 rounded-md hover:bg-slate-400`} onClick={() => changeFontStyle(setTitleFontStyle, titleFontStyle)}>
                         {titleFontStyle === "font-normal" ? "N" : titleFontStyle === "font-bold" ? "b" : "B"}
                    </button> 
                    <button className={`${titleCase === "lowercase" ? 'font-normal' : 'font-black'} p-1 bg-slate-200 rounded-md hover:bg-slate-400`} onClick={() => changeCase(setTitleCase, titleCase)}>
                    {titleCase === "lowercase" ? "m" : "M"}
                    </button>
                </div>
                <div className="flex gap-4 mb-3">
                <div className="w-1/12 text-white">
                    Subtítulo
                    </div>
                    <input className='bg-slate-400 placeholder:text-slate-600 rounded-md border-2 border-slate-900' type="text" placeholder=" Título..."value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                    <input type="color" value={subtitleColor} onChange={(e) => setSubtitleColor(e.target.value)} />
                    <input className='w-10 bg-slate-400' type="number" value={subtitleSize} onChange={(e) => setSubtitleSize(e.target.value)} />
                    <button className={`${subtitleFontStyle === "font-normal" ? 'font-normal' : subtitleFontStyle === "font-bold" ? 'font-bold' : 'font-black'} bg-slate-300 p-1 rounded-md hover:bg-slate-400`} onClick={() => changeFontStyle(setSubtitleFontStyle, subtitleFontStyle)}>
                     {subtitleFontStyle === "font-normal" ? "N" : subtitleFontStyle === "font-bold" ? "b" : "B"}
                    </button>
                    <button className={`${subtitleCase === "lowercase" ? 'font-normal' : 'font-black'} p-1 rounded-md bg-slate-200 hover:bg-slate-400`} onClick={() => changeCase(setSubtitleCase, subtitleCase)}>
                      {subtitleCase === "lowercase" ? "m" : "M"}
                    </button>
                </div>
                <div className='flex gap-4 mb-3'>
                <div className="w-1/12 text-white">
                    Fuente:
                    </div>
                    <select className='bg-slate-400 rounded-md' value={font} onChange={(e) => setFont(e.target.value)}>
                        <option style={{fontFamily: "Roboto"}} value="Roboto">Roboto</option>
                        <option style={{fontFamily: "Josefin Sans"}} value="Josefin Sans">Josefin Sans</option>
                        <option style={{fontFamily: "Montserrat"}} value="Montserrat">Montserrat</option>
                        <option style={{fontFamily: "Raleway"}} value="Raleway">Raleway</option>
                    </select>
                    <input type="file" style={{display: 'none'}} ref={fileInput} onChange={(e) => setLogo(URL.createObjectURL(e.target.files[0]))} />
                     <button className='bg-white p-3 rounded-md hover:bg-slate-300' type="button" onClick={() => fileInput.current && fileInput.current.click()}>Cambiar logo</button>
                    </div>
                <button className='bg-white rounded-md p-3 hover:bg-slate-400 w-full' onClick={handleShow}>{show ? 'Ocultar' : 'Mostrar'}</button>
            </div>
        );
}
