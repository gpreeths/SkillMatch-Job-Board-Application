import React from 'react';
import { Link } from 'react-router-dom';
import { Menu1 } from '../components/Menu';

function Home() {
  return (
    <div>
      <Menu1 />

      <div className="homeContent">
        <h1>Welcome to <span style={{ color: '#2e86de' }}>SkillMatch</span></h1>
        <p>Your gateway to top jobs and talented professionals.</p>

        <div className="buttonGroup">
          <Link to="/login">
            <button className="homeButton">Login</button>
          </Link>
          <Link to="/signup">
            <button className="homeButton">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
