import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CustomNav from "../../components/CustomNav/CustomNav";
import "./UpdateProfile.css";
import { backendEndpoint, backendImageFolder } from "../../setting";

const UpdateProfile = (props) => {
  // making use of authentication values
  const { getCurrentUser, updateProfile, updateProfilePicture } = useAuth();
  const user = getCurrentUser();
  // getting inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const imageRef = useRef();
  const nameRef = useRef();
  const bioRef = useRef();
  const phoneRef = useRef();

  // redirect with useHistory
  const history = useHistory();

  // state
  let defaultLink =
    user.photo !== "undefined" && user.photo !== ""
      ? backendEndpoint + backendImageFolder + user.photo
      : "images/avatar.png";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      name: nameRef.current.value.trim(),
      bio: bioRef.current.value.trim(),
      phone: phoneRef.current.value.trim(),
      token: user.token, //the authorization token that will be used to send the request
    };

    setLoading(true);
    const result = await updateProfile(formData);
    console.log("result in updateprofile:", result);
    if (result.success) {
      history.push("/");
    } else {
      setError(result.data);
      setLoading(false);
    }
  };

  const changeImage = (e) => {
    imageRef.current.click();
  };

  const handleProfilePictureChange = async (e) => {
    const image = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    let formData = new FormData();
    formData.append("file", image.data);
    formData.append("token", user.token);

    const result = await updateProfilePicture(formData);
    if (!result.success) {
      setError(result.data);
      setLoading(false);
    }
  };

  // Component return
  return (
    <>
      <CustomNav />
      <Container className="app_wrap">
        <div className="home-title">
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <div className="w-100 signup_wrap">
          <div className="back">
            <i className="chevron left icon"></i>
            Back
          </div>
          <Card className="home-card">
            {/* <Card.Body> */}
            <div className="profile_header">
              <div className="profile_title">
                <h2>Change Info</h2>
                <p>Changes will be reflected to every services</p>
                <div className="profile-picture">
                  <div className="profile-picture-image">
                    {
                      <img
                        src={defaultLink}
                        alt="User"
                        width="72"
                        height="72"
                        onClick={changeImage}
                      />
                    }
                    <i className="camera icon"></i>
                  </div>
                  <span className="profile-picture-text">CHANGE PHOTO</span>
                </div>

                <Form id="imageConfirm" className="w-100 mt-3 d-none">
                  <Form.Control
                    type="file"
                    ref={imageRef}
                    onChange={handleProfilePictureChange}
                    className="imageConfirm "
                  />
                </Form>

                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Group id="nameConfirm" className="w-100 mt-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={user.name}
                        ref={nameRef}
                        placeholder="Enter your name..."
                      />
                    </Form.Group>
                    <Form.Group id="bioConfirm" className="w-100 mt-3">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        defaultValue={user.bio}
                        aria-label="With textarea"
                        ref={bioRef}
                        placeholder="Enter your bio..."
                      />
                    </Form.Group>
                    <Form.Group id="phoneConfirm" className="w-100 mt-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={user.phone}
                        ref={phoneRef}
                        placeholder="Enter your phone..."
                      />
                    </Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      defaultValue={user.email}
                    />
                  </Form.Group>
                  <Form.Group id="password" className="w-100 mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      defaultValue={user.password}
                      ref={passwordRef}
                      placeholder="Keep current password? Leave blank!"
                    />
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className="update_btn mt-5"
                    type="submit"
                  >
                    Save
                  </Button>
                </Form>
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

export default UpdateProfile;
