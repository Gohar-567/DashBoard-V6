import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useCallback } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import './MainLayout.css';

const sideBarLinks = [
  {
    label: 'Dashboard',
    path: '/',
    icon: DashboardIcon,
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: PeopleIcon,
  },
  {
    label: 'Estimates',
    path: '/estimates',
    icon: BarChartIcon,
  },
  {
    label: 'Jobs',
    path: '/jobs',
    icon: LayersIcon,
  },
];

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  paddingTop: 50,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '0',
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="inherit"
            sx={{ flexGrow: 1 }}
          >
            DASHBOARD
          </Typography>
          <a href="/log-in">
            Log Out
            <IconButton color="inherit">
              <LogoutIcon />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="drawerHeader">
          <img
            width="50"
            height="50"
            src="https://media-exp1.licdn.com/dms/image/C4E0BAQF6Q2ARgLlTQg/company-logo_200_200/0/1623773209914?e=2159024400&v=beta&t=XNz3Pjl2jKre67TlySWg73ScGMOiR-Kjtpt545veidE"
            alt="HMS"
          />
          <Typography sx={{ mx: 3 }} variant="h4">
            HMS
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ mx: 2 }}>
          {sideBarLinks.map((link) => (
            <ActiveLink key={0} to={link.path}>
              <link.icon
                // className="mx-2"
                style={{ minWidth: 25, minHeight: 25 }}
              />
              <Typography sx={{ mx: 5 }} className="sidenav-non-slim">
                {link.label}
              </Typography>
            </ActiveLink>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DashboardLayoutRoot>
          <Outlet />
        </DashboardLayoutRoot>
      </Box>
    </Box>
  );
}
const ActiveLink = ({ to, children }) => {
  const active = useLocation().pathname == to;
  const navigate = useNavigate();

  const route = useCallback(
    (e) => {
      e.preventDefault();
      navigate(to);
    },
    [to, navigate],
  );

  return (
    <a
      className={`py-2 m-1 p-1 w-100 d-flex align-items-center d-block ${
        active ? 'active' : ''
      }`}
      onClick={route}
    >
      {children}
    </a>
  );
};

// import { useState, useCallback } from 'react';
// import { useLocation, useNavigate, Outlet } from 'react-router-dom';
// import {
//   MDBSideNav,
//   MDBSideNavMenu,
//   MDBSideNavItem,
//   //MDBSideNavLink,
//   MDBNavbar,
//   MDBBtn,
//   MDBScrollbar,
//   MDBContainer,
//   //MDBSideNavCollapse,
// } from 'mdb-react-ui-kit';

// import { ReactComponent as SvgMenuClose } from '../assets/menu-close.svg';
// import { ReactComponent as SvgMenuOpen } from '../assets/menu-open.svg';
// import { ReactComponent as SvgDashboard } from '../assets/dashboard.svg';
// import { ReactComponent as SvgPeople } from '../assets/people.svg';
// import { ReactComponent as SvgBriefcase } from '../assets/briefcase.svg';
// import { ReactComponent as SvgCoin } from '../assets/coin.svg';

// const sideBarLinks = [
//   {
//     label: 'Dashboard',
//     path: '/',
//     icon: SvgDashboard,
//   },
//   {
//     label: 'Customers',
//     path: '/customers',
//     icon: SvgPeople,
//   },
//   {
//     label: 'Estimates',
//     path: '/estimates',
//     icon: SvgCoin,
//   },
//   {
//     label: 'Jobs',
//     path: '/jobs',
//     icon: SvgBriefcase,
//   },
// ];

// const MainLayout = () => {
//   const [slimOpen, setSlimOpen] = useState(true);
//   const [slimMode, setSlimMode] = useState(false);
//   return (
//     <>
//       <MDBNavbar
//         fixed="top"
//         style={{
//           height: 66,
//         }}
//       >
//         <div className="text-center">
//           <MDBBtn
//             rippleCentered
//             tag="a"
//             color="none"
//             className="p-2 d-flex align-items-center justify-content-center"
//             style={{ minWidth: 42, minHeight: 50 }}
//             onClick={() => setSlimMode(!slimMode)}
//           >
//             {slimMode ? <SvgMenuClose /> : <SvgMenuOpen />}
//           </MDBBtn>
//         </div>
//       </MDBNavbar>
//       <div
//         style={{ marginTop: 67, height: 'calc(100vh - 67px)' }}
//         className="d-flex position-relative"
//       >
//         <MDBSideNav
//           backdrop={false}
//           mode="side"
//           isOpen={slimOpen}
//           relative
//           slim={slimMode}
//           getOpenState={(e) => setSlimOpen(e)}
//         >
//           <MDBScrollbar sidenav tag="ul" suppressScrollX>
//             <MDBSideNavMenu>
//               {sideBarLinks.map((link) => (
//                 <MDBSideNavItem key={link.label}>
//                   <ActiveLink to={link.path}>
//                     <link.icon style={{ minWidth: 25, minHeight: 25 }} />
//                     <span className="sidenav-non-slim">{link.label}</span>
//                   </ActiveLink>
//                 </MDBSideNavItem>
//               ))}
//             </MDBSideNavMenu>
//           </MDBScrollbar>
//         </MDBSideNav>
//         <MDBContainer fluid className="main-content flex-grow">
//           <Outlet />
//         </MDBContainer>
//       </div>
//     </>
//   );
// };

// const ActiveLink = ({ to, children }) => {
//   const active = useLocation().pathname == to;
//   const navigate = useNavigate();

//   const route = useCallback(
//     (e) => {
//       e.preventDefault();
//       navigate(to);
//     },
//     [to, navigate],
//   );

//   return (
//     <MDBBtn
//       href={to}
//       color="none"
//       className={`py-2 m-1 p-1 w-100 d-flex align-items-center d-block ${
//         active ? 'active' : ''
//       }`}
//       style={{ height: 40 }}
//       onClick={route}
//     >
//       {children}
//     </MDBBtn>
//   );
// };

// export default MainLayout;
