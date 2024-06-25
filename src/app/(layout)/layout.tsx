"use client";

import "../globals.css";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "@/components/atomic/atoms/Navbar";
import 'chart.js/auto';
import 'chartjs-adapter-moment';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        backgroundColor: "#17161b",
      }}
    >
      <Box className="layout-pop-nav-wrapper">
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Navbar />
          </Container>
        </Grid>
      </Box>
      {children}
    </Box>
  );
}
