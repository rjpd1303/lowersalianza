'use client'
import { createContext, useState, useContext } from "react";

export const LowerThirdsContext = createContext();

export const LowerThirdsProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [show, setShow] = useState(false);
  const [font, setFont] = useState("Roboto");
  const [titleSize, setTitleSize] = useState("16");
  const [subtitleSize, setSubtitleSize] = useState("12");
  const [titleColor, setTitleColor] = useState("#000000");
  const [subtitleColor, setSubtitleColor] = useState("#000000");
  const [logo, setLogo] = useState(null);

  return (
    <LowerThirdsContext.Provider
      value={{
        title,
        setTitle,
        subtitle,
        setSubtitle,
        show,
        setShow,
        font,
        setFont,
        titleSize,
        setTitleSize,
        subtitleSize,
        setSubtitleSize,
        titleColor,
        setTitleColor,
        subtitleColor,
        setSubtitleColor,
        logo: "../images/aniversario.png",
        setLogo
      }}
    >
      {children}
    </LowerThirdsContext.Provider>
  );
};

export const useLowerThirdsContext = () => useContext(LowerThirdsContext);