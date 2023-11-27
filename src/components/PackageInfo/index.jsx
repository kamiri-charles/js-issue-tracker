import { useEffect, useState } from "react";
import './styles.scss';

const PackageInfo = () => {

    const [packageData, setPackageData] = useState({});
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        setPackageData(JSON.parse(localStorage.getItem('jit_package_data')));

        const fetch_package_issues = () => {
            fetch(`https://jit-api-a6d0d55add94.herokuapp.com/api/issues/${packageData.package.name}`)
            .then(res => res.json())
            .then(data => {
                setIssues(data);
            });
        };

        fetch_package_issues();
    }, [packageData.package.name]);
    return (
        <div className="package-info">
            <div className="meta">
                <div className="name">{packageData.package.name}</div>
                <div className="description">{packageData.package.description}</div>
                <div className="version">{packageData.package.version}</div>
                <div className="author">{packageData.package.author}</div>

            </div>

            <div className="issues">
                {
                issues.length === 0 ? (
                    <div className="no-issues">No issues found</div>
                ) : (
                    issues.map(issue => (
                        <div className="issue">
                            <div className="title">{issue.title}</div>
                            <div className="description">{issue.description}</div>
                            <div className="status">{issue.status}</div>
                            <div className="created-at">{issue.created_at}</div>
                        </div>
                    )))}
            </div>
        </div>
    );
};

export default PackageInfo;