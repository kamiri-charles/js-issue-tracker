import './styles.scss';



const PackageIssue = () => {
  return (
    <div className='package-meta'>
        <div className="package-info">
            <div className="name">Package Name + Issue title</div>
            <div className="description">Package Description</div>
            <div className="version">Package Version</div>
            <div className="links">
                <div>
                    <i className="bx bx-star"></i>
                </div>

                <a href="/create-issue">
                    <i className="bx bx-bug"></i>
                </a>

                
            </div>
        </div>
        <div className="discussion"></div>
    </div>
  )
};

export default PackageIssue;