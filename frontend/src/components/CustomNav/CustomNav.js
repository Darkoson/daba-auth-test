import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import "./CustomNav.css";
import LOGO from "../../assets/logo-auth-lg.PNG";

//
const settings = ["My Profile", "Group Chat", "Logout"];

export default function CustomNav() {
	// get current user
	const { currentUser, logout } = useAuth();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
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
								<button className="ui button drop">
									<Avatar
										alt={currentUser.email}
										src="/static/images/avatar/2.jpg"
										className="userAvatar"
										variant="rounded"
									/>
									<span>Xanthe Neal</span>
									<i className="icon caret down"></i>
								</button>
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
									My Profile
								</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu} className="menuItem">
								<Typography textAlign="center">
									<i className="icon users"></i>
									Group Chat
								</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu} className="menuItem last">
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
