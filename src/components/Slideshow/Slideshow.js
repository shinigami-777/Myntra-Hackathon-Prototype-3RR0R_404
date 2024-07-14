import React, { useState } from 'react';
import './Slideshow.css';

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '../../assets/banner1.jpg',
      alt: 'Slide 1',
    },
    {
      image: '../../assets/banner2.jpg',
      alt: 'Slide 2',
    },
    {
      image: '../../assets/banner3.jpg',
      alt: 'Slide 3',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
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
            onClick={() => goToSlide(index)}
            key={index}
          ></span>
        ))}
      </div>

      {/* Dropdown menus */}
      <div className="dropdown-menu1 dropdown-menu">
        <ul>
          <li><a href="products.html">Shirts</a></li>
          <li><a href="products.html">Tshirts</a></li>
          <li><a href="products.html">Jeans</a></li>
          <li><a href="products.html">Shoes</a></li>
          <li><a href="products.html">Accessories</a></li>
        </ul>
      </div>

      <div className="dropdown-menu2 dropdown-menu">
        <ul>
          <li><a href="products.html">Ethnic</a></li>
          <li><a href="products.html">western wear</a></li>
          <li><a href="products.html">Footwear</a></li>
          <li><a href="products.html">sports wear</a></li>
          <li><a href="products.html">Accessories</a></li>
        </ul>
      </div>

      <div className="dropdown-menu3 dropdown-menu">
        <ul>
          <li><a href="products.html">Boys Clothing</a></li>
          <li><a href="products.html">Girls Clothing</a></li>
          <li><a href="products.html">infants</a></li>
          <li><a href="products.html">boys footwear</a></li>
          <li><a href="products.html">girls footwear</a></li>
        </ul>
      </div>

      <div className="dropdown-menu4 dropdown-menu">
        <ul>
          <li><a href="products.html">Bed Linen</a></li>
          <li><a href="products.html">Flooring</a></li>
          <li><a href="products.html">bath</a></li>
          <li><a href="products.html">home decor</a></li>
          <li><a href="products.html">kitchen</a></li>
        </ul>
      </div>

      <div className="dropdown-menu5 dropdown-menu">
        <ul>
          <li><a href="products.html">make up</a></li>
          <li><a href="products.html">skincare</a></li>
          <li><a href="products.html">haircare</a></li>
          <li><a href="products.html">fragrances</a></li>
          <li><a href="products.html">mens grooming</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Slideshow;