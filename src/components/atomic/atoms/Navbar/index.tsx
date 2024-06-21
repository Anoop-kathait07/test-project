import React, { memo } from "react";
import { Toolbar, AppBar, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { dummyMenuData } from "@/utils/menu-items";
import TemporaryDrawer from "@/components/atomic/atoms/drawer";
import { useRouter } from "next/navigation";
import { useMetaMask } from "@/custom-hooks/use-metamask";
import { useDispatch, useSelector } from "react-redux";
import { rootReducersState } from "@/store/reducers";
import { getWalletAddress } from "@/store/slices/metamask";

const PopNavbar = () => {
  const { connectMetamask } = useMetaMask();
  const dispatch = useDispatch();
  const account = useSelector(
    (state: rootReducersState) => state.metaMask.account
  );

  const renderOptions = (): any => {
    return dummyMenuData.map((item: any, index: number) => (
      <Box key={index} className="drawer-link-menu">
        <Box className="menu-main-heading-links">
          <Link href={item.path}>
            <Typography className="mui-header-menu-nromal-links">
              {item.btnLabel}
            </Typography>
          </Link>
        </Box>
      </Box>
    ));
  };

  const router = useRouter();

  return (
    <AppBar position="sticky" className="nav_grid">
      <Toolbar disableGutters>
        <Box
          sx={{ flexGrow: 1, display: { xs: "block", md: "block" } }}
          className="logo-section"
        >
          <Link href="/" onClick={() => router.push("/")}>
            <Typography variant="h4" className="gradient-text gradient-text-banner">
              D-Swap
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: "end",
          }}
        >
          <TemporaryDrawer />
        </Box>
        <Box
          className="nav-wrapper"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {renderOptions()}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {account !== "" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  flexGrow: 1,
                  margin: "20px",
                  display: { xs: "none", md: "block" },
                }}
                className="helper-card-button"
                size="medium"
                variant="outlined"
                onClick={connectMetamask}
              >
                {account.slice(0, 4) + "......" + account.slice(38, 42)}
              </Button>
              <Button
                sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
                className="helper-card-button"
                size="medium"
                variant="contained"
                onClick={() => dispatch(getWalletAddress(""))}
              >
                Disconnect MetaMask
              </Button>
            </Box>
          ) : (
            <Button
              sx={{ flexGrow: 1, margin: "20px", display: { xs: "none", md: "block" } }}
              className="helper-card-button"
              size="medium"
              variant="contained"
              onClick={connectMetamask}
            >
              Connect MetaMask
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(PopNavbar);
