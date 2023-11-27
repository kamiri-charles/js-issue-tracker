import { useEffect, useState } from "react";
import Header from "../Header";
import './styles.scss';

const PackageInfo = () => {

    const [packageData, setPackageData] = useState(
      JSON.parse(localStorage.getItem("jit_package_data"))
    );
    const [issues, setIssues] = useState([]);
    const [formHidden, setFormHidden] = useState(true);


    useEffect(() => {
        setPackageData(JSON.parse(localStorage.getItem('jit_package_data')));

        const fetch_package_issues = () => {
            fetch(`https://jit-api-a6d0d55add94.herokuapp.com/api/issues/${packageData.package.name}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIssues(data.issues);
            });
        };

        fetch_package_issues();
    }, [packageData.package.name]);

    return (
        <div className="package-info">
            <Header />
            <div className="meta">
                <div className="name">{packageData?.package.name}</div>
                <div className="description">{packageData?.package.description}</div>
                <div className="version">{packageData?.package.version}</div>
                <div className="author"></div>
            </div>

            <div className="issues">
                {
                !issues || issues.length === 0 ? (
                    <div className="no-issues">No issues found</div>
                ) : (
                    // Map issues here
                    <div></div>
                )}

                <button className="create-issue-btn" onClick={() => setFormHidden(!formHidden)}>New Issue</button>
            </div>

            <div className={`new-issue-form ${formHidden ? 'hidden' : ''}`}>
                <div className="title">Create New Issue</div>
                <input type="text" placeholder="Issue Title" />
                <textarea placeholder="Issue Description"></textarea>

                <button className="submit-btn">Create Issue</button>

                <div className="close-form" onClick={() => setFormHidden(true)}>
                    <i className="bx bx-x"></i>
                </div>
            </div>
        </div>
    );
};

export default PackageInfo;