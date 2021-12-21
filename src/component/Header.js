import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Content from './Content';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
    const { onDrawerToggle } = props;
    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, tabValue) => {
        setTab(tabValue);
    }

    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Button
                                sx={{ borderColor: lightColor, mr: 1}}
                                variant="outlined"
                                color="inherit"
                                size="small"
                            >
                                SIGN IN
                            </Button>
                            <Button
                                sx={{ borderColor: lightColor}}
                                variant="outlined"
                                color="inherit"
                                size="small"
                            >
                                SIGN UP
                            </Button>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar
                component="div"
                color="primary"
                position="static"
                elevation={0}
                sx={{ zIndex: 0 }}
            >
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <img width="300" src='https://images.velog.io/images/mjlee0326/post/897f7ad4-fa98-4f18-9306-e2bdb4016708/ReviewZone3.png'/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                <Tabs value={tab} onChange={handleTabChange} textColor="inherit">
                    <Tab label="화장품/미용"/> 
                    <Tab label="전자제품"/>
                    <Tab label="생활/건강"/>
                    <Tab label="식품"/>
                </Tabs>
            </AppBar>
            <Content tab={tab}/>
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;