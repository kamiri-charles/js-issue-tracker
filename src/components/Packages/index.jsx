import { useEffect, useState } from "react";
import Header from "../Header";
import { MetroSpinner } from "react-spinners-kit";
import "./styles.scss";

const Packages = () => {
  
  let [packagesData, setPackagesData] = useState([]);
  let [loading, setLoading] = useState(false);
  
  
  useEffect(() => {
    let search_text = localStorage.getItem('jit_search_text') || '';
    
    const fetch_packages = () => {
      // If search text is empty, don't fetch packages
      if (search_text === '') return;
      else {
        // Fetch packages from npmjs api
        setLoading(true);
        fetch(`https://api.npms.io/v2/search?q=${search_text}`)
        .then(res => res.json())
        .then(data => {
          setPackagesData(data.results);
          setLoading(false);
        })
        .catch(err =>{
          console.log(err);
          setLoading(false);
        });
      }
    };
    
    // Update search text in local storage
    document.addEventListener('search_text_change', () => {
      search_text = localStorage.getItem('jit_search_text');
      fetch_packages();
    });
    
    fetch_packages();
    
    
  }, []);

   const getRandomWidth = () => {
     const minWidth = 350;
     const maxWidth = 600;
     return `${
       Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth
     }px`;
   };
  
  
  return (
    <div className="packages">
      <Header />

      {loading ? (
        <MetroSpinner />
      ) : (
        <div className="content">
          {packagesData.length === 0
            ? "Type something to search for packages"
            : packagesData.map((pkg, index) => (
                <div
                  className="package"
                  key={index}
                  style={{ width: getRandomWidth() }}
                >
                  <div className="name">{pkg.package.name}</div>
                  <div className="description">{pkg.package.description}</div>
                  <div className="version">{pkg.package.version}</div>
                  <div className="links">

                    <a href="/starred">
                      <i className="bx bx-star"></i>
                    </a>

                    <a href="/create-issue">
                      <i className="bx bx-bug"></i>
                    </a>

                    <a href="/discussion">
                      <i className="bx bx-message-square-detail"></i>
                    </a>

                    <a
                      href={pkg.package.links.repository}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bx bxl-github"></i>
                    </a>

                    <a
                      href={pkg.package.links.homepage}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="bx bx-link-external"></i>
                    </a>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
    }
    
    export default Packages;