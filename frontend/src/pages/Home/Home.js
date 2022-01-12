import React, { useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomNav from "../../components/CustomNav/CustomNav";
import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";

const { backendEndpoint, backendImageFolder }  = require( "../../setting");

const Home = () => {
  // state
  const [error] = useState("");

 
  // get current user
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();


  let imageLink = (user.photo!=="undefined" && user.photo!=='')?
  (backendEndpoint + backendImageFolder + user.photo) : 'images/avatar.png'

  return (
    <>
      <CustomNav />
      <Container className="app_wrap">
        <div className="home-title">
          <h2 className="text-center md-4">Personal info</h2>
          <p>Basic info, like your name and photo</p>
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <div className="w-100 signup_wrap">
          <Card className="home-card">
            {/* <Card.Body> */}
            <div className="profile_header">
              <div className="profile_title">
                <h2>Profile</h2>
                <p>Some info may be visible to other people</p>
              </div>
              <Link to="update-profile" className="ui basic button">
                Edit
              </Link>
            </div>
            <div className="profile_content">
              <div className="profile_label">
                <p>PHOTO</p>
              </div>
              <div className="profile_info">
                <img src={imageLink} alt="thumbnail of the user" />
              </div>
            </div>
            <div className="profile_content">
              <div className="profile_label">
                <p>name</p>
              </div>
              <div className="profile_info">
                <p>{user.name || 'None'}</p>
              </div>
            </div>
            <div className="profile_content">
              <div className="profile_label">
                <p>bio</p>
              </div>
              <div className="profile_info">
                <p>{user.bio || 'None'}</p>
              </div>
            </div>
            <div className="profile_content">
              <div className="profile_label">
                <p>phone</p>
              </div>
              <div className="profile_info">
                <p>{user.phone || 'None'}</p>
              </div>
            </div>
            <div className="profile_content">
              <div className="profile_label">
                <p>email</p>
              </div>
              <div className="profile_info">
                <p>{user.email  || 'None'}</p>
              </div>
            </div>
            <div className="profile_content last">
              <div className="profile_label">
                <p>password</p>
              </div>
              <div className="profile_info">
                <p>***********</p>
              </div>
            </div>
            {/* </Card.Body> */}
          </Card>
          <div className="w-100 text-center mt-2 createdby">
            <p>
              created by <Link to="/signup">username</Link>
            </p>
            <p>devChallenges.io</p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
