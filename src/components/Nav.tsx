"use client"
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from "@mui/material"
import React, { Fragment } from "react"
import Link from "next/link"
import Image from "next/image"
import homeLogo from "../../public/assets/images/logo.webp"
import MenuIcon from "@mui/icons-material/Menu"

const Nav = () => {
  const drawerWidth = 240
  const navItems = ["About", "Skills", "Projects", "Contact"]

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", py: 4 }}>
      <Link href={"/"}>
        <Image src={homeLogo} alt="Home Image" width={40} height={40} />
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item} href={`/#${item}`}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  return (
    <Fragment>
      <AppBar component="nav" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link style={{ textDecoration: "none", color: "#000" }} href={"/"}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image src={homeLogo} alt="Home Image" width={40} height={40} />
                <Typography variant="h6">Vers le Canada</Typography>
              </Container>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link key={item} href={`/#${item}`}>
                <Button sx={{ color: "#000" }}>{item}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav style={{ marginBottom: 50 }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Fragment>
  )
}

export default Nav
