import './styles.scss';

const Header = () => {
    return (
        <div className='header'>
            <div className='left'>
                <div className="name">JS Issue Tracker</div>
                <div className="group">Group D Project</div>
            </div>

            <div className='right'>
                <div className="notifications icon">
                    <i className="bx bx-bell"></i>
                </div>

                <div className="user icon">
                    <i className="bx bx-user"></i>
                </div>

                <div className="more icon">
                    <i className="bx bx-dots-vertical-rounded"></i>
                </div>
            </div>
        </div>
    )
};

export default Header;