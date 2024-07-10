import React from 'react';
import './TopBrands.css';

function TopBrands() {
  const brandImages = [
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/a88b9390-5adb-493b-a1b3-702c59ccf53a1598348260502-Nike.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/c9f66558-feab-4d76-aa3c-adc68d81dce21598348260415-Levis.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/178c1e5d-69f2-402f-a2a5-ef44700a0f691596640983793-Roadster---.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/085719b1-c71e-4f47-950c-9a6b7f291fac1598348260370-Jack-_-Jones.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/774f42c4-f459-4514-9b90-cf8a60a5f68c1596644478087-hrx30.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/f6e40444-b1a4-4c91-bb3c-fe213356e7de1598348260541-Only.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/5/a6de806a-b58b-460b-97fd-d78d80eab39b1596641021693-Women-s-Ethnic-Wear_Anouk.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/8d13b55d-a6a0-40ae-b39f-16f43e7911681598348260460-MAC.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/046ab589-87d5-4afa-8ab3-10e06fdbe6a61598348260596-W.jpg",
    "https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/25/f2fdda02-423c-4f11-8f1b-618ba807e5841598348260323-H_M.jpg"
  ];

  return (
    <div>
      <div className="text-banner-container">
        <h4 className="text-banner-title">EXPLORE TOP BRANDS</h4>
      </div>

      <div className="img-link-container">
        {brandImages.map((image, index) => (
          <a key={index} href="">
            <img src={image} alt={`Brand ${index + 1}`} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default TopBrands;
