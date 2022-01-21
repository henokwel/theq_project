import React, { useContext, useEffect, useState } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/Layers';
import ConstructionIcon from '@mui/icons-material/Construction';
import NextLink from 'next/link';
import { QuizStateContext } from '../src/context';
import QuizCard from '../Components/QuizCard';
// import LinearProgressWithLabel from '../Components/ProgressWithLabel';
// import { Card, CardActionArea, CardContent } from '@mui/material';
// import Link from 'next/link';




const drawerWidth = 240;

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();


function Dashboard() {
    const [open, setOpen] = useState(false);
    const [quizState, setquizState] = useState([]);

    const _quizState = useContext(QuizStateContext)

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // console.log("Dashbord", _quizState);



    useEffect(() => {

        console.log("Dashbord useEffect");
        // check for local
        const localData = localStorage.getItem('myQuizData')

        if (localData === null) return
        else {
            const res = JSON.parse(localData)
            setquizState(res)

        }

        setquizState(_quizState)

        // check for context


    }, []);



    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} color='default'>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}>

                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"

                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}

                    >
                        <IconButton onClick={toggleDrawer} >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        <div>
                            <NextLink href="/" passHref>
                                <ListItemButton button>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItemButton >
                            </NextLink>

                            <NextLink href="/quizbuilder" passHref>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ConstructionIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Builder" />
                                </ListItemButton >
                            </NextLink>

                            <NextLink href="/" passHref>
                                <ListItemButton button>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Customers" />
                                </ListItemButton >
                            </NextLink>

                        </div>
                    </List>
                    {/* <Divider /> */}

                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container fixed sx={{ mt: 4, ml: 2 }}>

                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                // justifyContent:"space-evenly",
                                alignItems: "center",
                                height: 540,
                                bgcolor: "transparent",
                                flexWrap: "wrap",
                                height: "100%",
                            }}
                            elevation={0}
                        >

                            {
                                _quizState.length === 0 ?
                                    <h1 style={{ mt: 4, }}> Create Quiz  <ConstructionIcon /></h1>
                                    :
                                    _quizState.map((item, index) => {
                                        return <QuizCard key={index} {...item} index={index} />
                                    })
                            }

                        </Paper>

                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}


// => For later use
// export const getStaticProps = async () => {
//     const res = await fetch(
//       `https://domain.com/`
//     );
//     const quizs = await res.json();
//     return {
//       props: {
//         quizs,
//       },
//     };
//   };


export default Dashboard;


{/* <Link href="/article/[id]" as={`/article/${item.id}`}>
<a>
  <h3>{item.title} &rarr;</h3>
  <p>{item.body}</p>
</a>
</Link> */}