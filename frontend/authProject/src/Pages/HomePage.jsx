import { Link } from 'react-router-dom';

const HomePage = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    const headingStyle = {
        fontSize: '2em',
        marginBottom: '20px',
        color: '#fffff'
    };
    const buttonStyle = {
        backgroundColor: 'yellow',
        color: 'black',
        border: 'none',
        padding: '10px 20px',
        margin: '10px',
        cursor: 'pointer',
        fontSize: '1em',
        borderRadius: '5px',
        textDecoration: 'none',
        display: 'inline-block',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Welcome Shera 🦁</h1>
            <div>
                <Link to="/login" style={buttonStyle}>Login</Link>
                <Link to="/register" style={buttonStyle}>Register</Link>
            </div>
        </div>
    );
}

export default HomePage;
