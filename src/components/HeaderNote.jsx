import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useMatches, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import ToggleThemeAndLanguage from "./ToggleThemeAndLanguage";
import { translatedNames } from "../utils/lang";

const HeaderNote = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { language } = useContext(AppContext);

  const namePage = matches.find((match) => match.handle?.name)?.handle?.name;
  const translatedPageName =
    translatedNames[language][namePage] ||
    translatedNames[language]["Halaman Tidak Ditemukan"];

  const back = () => {
    navigate(-1);
  };

  return (
    <header className="header-note">
      <div className="title-page">
        {namePage === "Pencarian" || namePage === "Detail Catatan" ? (
          <FaArrowLeft onClick={back} className="icon cursor-pointer" />
        ) : null}
        <h3>{translatedPageName}</h3>{" "}
      </div>
      <ToggleThemeAndLanguage />
    </header>
  );
};

export default HeaderNote;
