import React, { useState, useEffect } from 'react';
import './Slideshow.css';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: banner1, alt: 'Slide 1' },
    { image: banner2, alt: 'Slide 2' },
    { image: banner3, alt: 'Slide 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div className={`mySlides fade ${index === currentSlide ? 'show' : ''}`} key={index}>
          <img src={slide.image} style={{ width: '100%' }} alt={slide.alt} />
        </div>
      ))}
      <a className="prev" onClick={prevSlide}>&#10094;</a>
      <a className="next" onClick={nextSlide}>&#10095;</a>
      <div style={{ textAlign: 'center' }}>
        {slides.map((_, index) => (
          <span
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            key={index}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
