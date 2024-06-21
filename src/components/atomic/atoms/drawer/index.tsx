import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { dummyMenuData } from "@/utils/menu-items";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: "100%" }} onClick={toggleDrawer(false)}>
      <Grid container spacing={{ xs: 0, sm: 1, md: 3 }} rowGap={3}>
        <Grid item xs={12}>
          <Box className="mobile-header">
            <Box className="debut-logo">
              <Link href="/" onClick={toggleDrawer(false)}>
                <Typography variant="h4" className="gradient-text gradient-text-banner">
                  D-Swap
                </Typography>
              </Link>
            </Box>
            <Box className="cross-icon">
              <IconButton
                onClick={toggleDrawer(false)}
                className="close-icon-button"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {dummyMenuData.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <Grid item xs={12}>
              <Box className="drawer-link-menu">
                <Box className="menu-main-heading-links">
                  <Link href={item.path} prefetch={false}>
                    <Typography
                      className="mui-header-menu-drawer-links"
                      onClick={toggleDrawer(false)}
                      variant="h6"
                    >
                      {item.btnLabel}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              sx={{
                flexGrow: 1,
                display: { xs: "block", md: "none" },
              }}
              className="helper-card-button"
              variant="contained"
              onClick={toggleDrawer(false)}
            >
              Connect MetaMask
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
        className="menu-bars-icon close-icon-button "
      >
        <MenuIcon
          sx={{
            color: "#a2a4b9",
          }}
        />
      </IconButton>
      <Drawer
        sx={{
          backgroundColor: "#17161b",
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
