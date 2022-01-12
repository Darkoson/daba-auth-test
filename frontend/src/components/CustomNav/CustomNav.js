import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LOGO from "../../assets/logo-auth-lg.PNG";
import "./CustomNav.css";

import { backendEndpoint, backendImageFolder } from "../../setting"




export default  function  CustomNav() {

	const history = useHistory();
	// get current user
	const { getCurrentUser, signout } = useAuth();
	const [ anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const user =  getCurrentUser()

	let imageLink = (user.photo!=="undefined" && user.photo!=='')?
	(backendEndpoint + backendImageFolder+ user.photo) : 'images/avatar.png'
  
	
	// handling log out
	const logoutHandler = async () => {
		signout();
		history.push("/login");
	};


	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" color="transparent" style={{ boxShadow: "none" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters className="appToolbar">
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<img src={LOGO} alt="Logo" width="200px" />
					</Typography>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
						<img src={LOGO} alt="Logo" width="200px" />
					</Typography>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								style={{
									border: "none",
									borderRadius: "0px",
								}}
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}>
								<div id="profile" className="ui button drop">
									<Avatar
										alt={user.name}
										src={imageLink}
										className="userAvatar"
										variant="rounded"
									/>
									<span className="profile-name"> { user.name || 'No name'} <i className="icon caret down"></i> </span>
									
								</div>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							<MenuItem onClick={handleCloseNavMenu} className="menuItem">
								<Typography textAlign="center">
									<i className="icon user circle"></i>
									<Link to="/">My Profile</Link>
									
								</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu} className="menuItem">
								<Typography textAlign="center">
									<i className="icon users"></i>
									Group Chat
								</Typography>
							</MenuItem>
							<MenuItem onClick={logoutHandler} className="menuItem last">
								<Typography textAlign="center">
									<i className="icon sign-out"></i>
									Logout
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
