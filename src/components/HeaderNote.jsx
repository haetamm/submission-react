import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useMatches, useNavigate } from "react-router-dom";

const HeaderNote = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const namePage = matches.find((match) => match.handle?.name)?.handle?.name;

  const back = () => {
    navigate(-1);
  };
  return (
    <header className="nav-note">
      {namePage === "Pencarian" || namePage === "Detail Catatan" ? (
        <FaArrowLeft onClick={back} className="icon cursor-pointer" />
      ) : null}
      <h3>{namePage || "Halaman Tidak Ditemukan"}</h3>
    </header>
  );
};

export default HeaderNote;
