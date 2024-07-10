import React, { useState } from 'react';
import './Slideshow.css';

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/7/19/bc0bb077-6ca5-414f-a30a-b7f8e4e2e8c11626700392540-H-N_Desk_Banner--1-.jpg',
      alt: 'Slide 1',
    },
    {
      image: 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/7/19/0561c26e-e90f-49e4-ba4f-3158a97179f21626700545599-Occasion_wear_Desk.jpg',
      alt: 'Slide 2',
    },
    {
      image: 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/7/19/53a9d49b-85d7-40d4-a393-98435d3d04e31626700661018-cat-fest-dk-april.jpg',
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
