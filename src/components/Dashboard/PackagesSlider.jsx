// import required modules
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { MetroSpinner } from 'react-spinners-kit';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export const PackagesSlider = () => {

  const [trendingPackages, setTrendingPackages] = useState([]);

  const fetchTrendingPackages = () => {
    fetch("https://api.npms.io/v2/search?q=keywords:popular")
      .then((res) => res.json())
      .then((data) => setTrendingPackages(data.results))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTrendingPackages();
  }, []);


  return (
      <Swiper
        spaceBetween={30}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}

        className="mySwiper packages-slider"
      >
        {trendingPackages.length > 0 ? (
          trendingPackages.map((pkg) => (
            <SwiperSlide key={pkg.package.name}>
              <div className="package">
                <div className="package-name">{pkg.package.name}</div>
                <div className="package-description">{pkg.package.description}</div>


                {/* <div className="package-meta">
                  <div className="package-meta-item">
                    <i className="bx bx-star"></i>
                    <span>{pkg.package.links.npm}</span>
                  </div>
                  <div className="package-meta-item">
                    <i className="bx bx-git-branch"></i>
                    <span>{pkg.package.links.repository}</span>
                  </div>
                  <div className="package-meta-item">
                    <i className="bx bx-download"></i>
                    <span>{pkg.package.links.npm}</span>
                  </div>
                </div> */}

                <div className="actions">

                  {/* Star package */}
                  <div className='action'>
                    <i className="bx bx-star"></i>
                  </div>

                  {/* Create issue */}
                  <div className='action'>
                    <i className="bx bx-message-square-add"></i>
                  </div>

                  {/* Discussion */}
                  <div className='action'>
                    <i className="bx bx-message-square-detail"></i>
                  </div>

                  {/* View package */}
                  <div className='action'>
                    <i className="bx bx-link-external"></i>
                  </div>

                  {/* GitHub */}
                  <div className='action'>
                    <i className="bx bxl-github"></i>
                  </div>
                </div>


              </div>
            </SwiperSlide>
          ))
        ) : (
          <MetroSpinner />
        )}
        
      </Swiper>
  );
};