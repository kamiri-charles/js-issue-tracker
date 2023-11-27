import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../Header";
import { MetroSpinner } from "react-spinners-kit";
import "./styles.scss";

const Packages = () => {
  
  let [packagesData, setPackagesData] = useState([]);
  let [loading, setLoading] = useState(false);
  let nav = useNavigate();

  const star_package = ({name, description, version, author, user_id, github_url, website_url}) => {
    fetch(
      "https://jit-api-a6d0d55add94.herokuapp.com/api/packages/star", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, description, version, author, user_id, github_url, website_url}
      )}
    )
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  }

  
  
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
                  onClick={() => {
                    localStorage.setItem('jit_package_data', JSON.stringify(pkg));
                    nav(`/package`)
                  }}
                >
                  <div className="name">{pkg.package.name}</div>
                  <div className="description">{pkg.package.description}</div>
                  <div className="version">{pkg.package.version}</div>
                  <div className="links">

                    <div onClick={() => star_package({
                      name: pkg.package.name,
                      description: pkg.package.description,
                      version: pkg.package.version,
                      author: pkg.package.author,
                      user_id: JSON.parse(localStorage.getItem('jit_user_data')).id,
                      github_url: pkg.package.links.repository,
                      website_url: pkg.package.links.homepage
                    })}>
                      <i className="bx bx-star"></i>
                    </div>

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