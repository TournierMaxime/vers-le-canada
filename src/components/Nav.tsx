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

interface Item {
  name: string
  link: string
}

const Nav = () => {
  const drawerWidth = 240
  const navItems: Item[] = [
    {
      name: "Discord",
      link: "https://discord.gg/fYckuMzswS",
    },
  ]

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
        {navItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  return (
    <Fragment>
      <AppBar sx={{ backgroundColor: "#fff" }}>
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
            <Link href={"/"}>
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
            {navItems.map((item, index) => (
              <Link key={index} href={item.link}>
                <Button sx={{ color: "#000" }}>{item.name}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          marginBottom: 50,
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Fragment>
  )
}

export default Nav
