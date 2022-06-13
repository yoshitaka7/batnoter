import { Login as LoginIcon } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Box, Button, CircularProgress, Link, LinkProps, LinkTypeMap, Menu, MenuItem, SvgIconTypeMap, Toolbar } from '@mui/material';
import AppBarComponent from '@mui/material/AppBar';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Ladybug, MessageQuestion, PlusBox } from 'mdi-material-ui';
import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { APIStatusType } from '../reducer/common';
import { User } from '../reducer/userSlice';
import { URL_FAQ, URL_GITHUB, URL_ISSUES, URL_TWITTER_HANDLE } from '../util/util';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

interface Props {
  user: User | null
  userAPIStatus: APIStatusType
  handleLogin: () => void
  handleLogout: () => void
}

export type AppBarLinkProps = {
  label: string
  icon: OverridableComponent<SvgIconTypeMap>
  iconColor?: string
}

const AppBarLink = <D extends React.ElementType = LinkTypeMap["defaultComponent"], P = AppBarLinkProps>
  ({ label, icon: Icon, iconColor, children, ...rest }: LinkProps<D, P> & AppBarLinkProps) =>
  <Link {...rest} sx={{
    p: 0.2, mx: 0.5, borderRadius: '50%', color: 'inherit', display: 'flex',
    bgcolor: { xs: 'action.disabled', lg: 'unset' }
  }} {...(rest.href ? { target: "_blank", rel: "noopener" } : {})}>
    <Icon sx={{ m: 0.5, verticalAlign: 'middle', color: iconColor }} fontSize="inherit" />
    <Box sx={{ display: { xs: 'none', lg: 'block' } }}>{label}</Box>
    {children}
  </Link>

const isLoading = (apiStatus: APIStatusType): boolean => {
  return apiStatus === APIStatusType.LOADING;
}

const AppBar: React.FC<Props> = ({ user, userAPIStatus, handleLogin, handleLogout }): ReactElement => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e: any) => {
    const btn = e.target
    const body = document.body

    if(btn.checked === true) {
      body.classList.add("dark-theme")
    }else{
      body.classList.remove("dark-theme")
    }
  }

  return (
    <AppBarComponent position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} className="header">
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Link variant="h6" noWrap component={NavLink} to={"/"} sx={{ flexGrow: 1, display: "flex", color: 'inherit' }}>BATNOTER</Link>
        <MaterialUISwitch sx={{ m: 1 }} defaultChecked={false} onChange={(e) => handleChange(e)}/>
        <AppBarLink href={URL_TWITTER_HANDLE} label="@batnoter" icon={TwitterIcon} iconColor="#b1d5ff" />
        <AppBarLink href={URL_FAQ} label="faq" icon={MessageQuestion} iconColor="#c7d097" />
        <AppBarLink href={URL_ISSUES} label="bug report" icon={Ladybug} iconColor="#eeb082" />
        <AppBarLink href={URL_GITHUB} label="github" icon={GitHubIcon} iconColor="#dadada" />
        {user && <AppBarLink component={NavLink} to="/new" label="create note" icon={PlusBox} iconColor="#c1f497" />}

        <Box sx={{ ml: 1 }}>
          {user == null ?
            (isLoading(userAPIStatus) ? <CircularProgress color="inherit" /> :
              <Button color="inherit" endIcon={<LoginIcon />} onClick={() => handleLogin()}>Login</Button>)
            :
            <>
              <Avatar onClick={handleMenu} alt={user.name} src={user.avatar_url} sx={{ cursor: "pointer" }} />
              <Menu autoFocus={false} sx={{ mt: '5px' }} id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{
                vertical: 'bottom', horizontal: 'right'
              }} transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem component={NavLink} to="/settings" onClick={handleClose}>Setting</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          }
        </Box>
      </Toolbar>
    </AppBarComponent>
  )
}

export default AppBar;
