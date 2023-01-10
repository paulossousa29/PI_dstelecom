import React from 'react';
import { Fade } from 'react-slideshow-image';

import './Slides.css'

const fadeImages = [
  '../assets/dstelecomlogo.png',
  '../assets/logo-black.png',
  '../assets/logo-white.png'
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true
}

export default function Slideshow () {
  return (
    <Fade {...fadeProperties}>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[0]} />
        </div>
        <h2>First Slide</h2>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[1]} />
        </div>
        <h2>Second Slide</h2>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[2]} />
        </div>
        <h2>Third Slide</h2>
      </div>
    </Fade>
  );
}