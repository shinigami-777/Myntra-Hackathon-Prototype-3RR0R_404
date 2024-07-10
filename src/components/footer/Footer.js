import React from 'react';
import './Footer.css';

function Footer() {
  const socialIcons = [
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/a88b9390-5adb-493b-a1b3-702c59ccf53a1598348260502-Nike.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/c9f66558-feab-4d76-aa3c-adc68d81dce21598348260415-Levis.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/178c1e5d-69f2-402f-a2a5-ef44700a0f691596640983793-Roadster---.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/085719b1-c71e-4f47-950c-9a6b7f291fac1598348260370-Jack-_-Jones.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/774f42c4-f459-4514-9b90-cf8a60a5f68c1596644478087-hrx30.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/f6e40444-b1a4-4c91-bb3c-fe213356e7de1598348260541-Only.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/a6de806a-b58b-460b-97fd-d78d80eab39b1596641021693-Women-s-Ethnic-Wear_Anouk.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/8d13b55d-a6a0-40ae-b39f-16f43e7911681598348260460-MAC.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/046ab589-87d5-4afa-8ab3-10e06fdbe6a61598348260596-W.jpg',
    'https://assets.myntassets.com/f_webp,w_40,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/f2fdda02-423c-4f11-8f1b-618ba807e5841598348260323-H_M.jpg'
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>online shopping</h4>
            <ul>
              <li><a href="#">men</a></li>
              <li><a href="#">women</a></li>
              <li><a href="#">Kids</a></li>
              <li><a href="#">Home & living</a></li>
              <li><a href="#">Beauty</a></li>
              <li><a href="#">gift cards</a></li>
              <li>
                <a href="#">myntra insider <span>New</span></a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>useful links</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">contact us</a></li>
              <li><a href="#">returns</a></li>
              <li><a href="#">track order</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>experience myntra app on mobile</h4>
            <a href="#">
              <img src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png" alt="Google Play" />
            </a>
            <a href="#">
              <img src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png" alt="Apple Store" />
            </a>
            <h4>keep in touch</h4>
            <div className="social-links">
              {socialIcons.map((icon, index) => (
                <a key={index} href="#">
                  <img src={icon} alt={`Social Icon ${index + 1}`} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-promise">
              <img src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png" alt="100% ORIGINAL" />
              <div>
                <strong>100% ORIGINAL</strong>
                <span>guarantee for all products at myntra.com</span>
              </div>
            </div>

            <div className="footer-promise">
              <img src="https://constant.myntassets.com/web/assets/img/ef05d6ec-950a-4d01-bbfa-e8e5af80ffe31574602902427-30days.png" alt="Return within 30days" />
              <div>
                <strong>Return within 30days</strong>
                <span>of receiving your order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
