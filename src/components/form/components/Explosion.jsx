import React from "react";
import mosc from "../../../style/img/mosc.jpeg";
const Explosion = () => {
  return (
    <>
      <img
        className="explosion_gif"
        src="https://media4.giphy.com/media/oe33xf3B50fsc/giphy.gif"
        alt="img_bomb"
      />

      <img className="explosion_img" src={mosc} alt="explosion" />
    </>
  );
};

export default Explosion;
