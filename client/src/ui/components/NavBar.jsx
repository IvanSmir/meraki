import { MenuOutlined, SearchOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Container, Divider, IconButton, InputBase, Menu, MenuItem, Toolbar, Tooltip, Typography, alpha, styled } from "@mui/material";
import { useContext, useState } from "react";
import { MerakiIcon } from "./MerakiIcon";
import { AuthContext } from "../../Auth/context";
import { HttpActions } from "../../Auth/utils//HttpActions";
import { useNavigate } from "react-router-dom";


const pages = ['Inicio', 'Productos', 'Sobre Nosotros', 'Contacto'];

const settings = ['Clientes', 'Productos'];
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '25ch',
            '&:focus': {
                width: '30ch',

            },
            '&:hover': {
                width: '30ch',
            }
        },
    },
}));



export const NavBar = () => {
    const { authState, logout } = useContext(AuthContext)
    const { isAuthenticated, user } = authState
    const { logoutAuth } = HttpActions()
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [search, setSearch] = useState('')

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        if (e.target.textContent === 'Inicio') navigate('/')
        if (e.target.textContent === 'Productos') navigate('/products')
        if (e.target.textContent === 'Sobre Nosotros') navigate('/about')
        if (e.target.textContent === 'Contacto') navigate('/contact')
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e) => {
        if (e.target.textContent === 'Logout') handleLogout()
        if (e.target.textContent === 'Clientes') navigate('/clients')
        if (e.target.textContent === 'Productos') navigate('/products')
        setAnchorElUser(null);
    };
    const handleLogout = async () => {
        try {
             await logoutAuth()
            logout()
            localStorage.setItem('lastPath', '/');

        } catch (error) {
            console.error(error)
        }
        finally {
            navigate('/')
        }

    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(search)
        }
    }

    const handleSearch = (search) => {
        if (!search.trim()) {
            console.error("La búsqueda no puede estar vacía.");
            return;
        }
        if (search.includes('09')) {
            const encodedSearch = encodeURIComponent(search.trim());
            navigate(`/products/client?search=${encodedSearch}`);

        } else {
            const encodedSearch = encodeURIComponent(search.trim());
            navigate(`/products?search=${encodedSearch}`);
        }
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MerakiIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            ":hover": {
                                cursor: 'pointer',
                            }
                        }}
                    >
                        Meraki
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuOutlined />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <MerakiIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', sm: 'flex', md: 'none', },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',

                        }}
                    >
                        Meraki
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Search >
                        <SearchIconWrapper>
                            <SearchOutlined />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Ingrese su numero de telefono"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {isAuthenticated ? <Avatar alt={user.firstName} src="/static/images/avatar/2.jpg" /> : <Avatar />}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isAuthenticated ? <div>
                                <MenuItem sx={{}}>
                                    <Typography textAlign="center">{`${user.firstName} ${user.lastName}`}</Typography>
                                </MenuItem>
                                <Divider />
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu} >
                                        <Typography textAlign="center" >{setting}</Typography>
                                    </MenuItem>
                                ))}
                                <Divider />
                                <MenuItem key='Logout' onClick={handleCloseUserMenu} >
                                    <Typography textAlign="center" >Logout</Typography>
                                </MenuItem>
                            </div> : <MenuItem onClick={() => navigate('/auth/login')} >
                                <Typography textAlign="center">Login</Typography>
                            </MenuItem>}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
