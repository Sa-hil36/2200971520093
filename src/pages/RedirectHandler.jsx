

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Container, Box } from "@mui/material";
import { logger } from "../utils/logger";

function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlData = JSON.parse(localStorage.getItem("urlData") || "{}");
    const record = urlData[shortcode];

    if (!record) {
      alert("Invalid or non-existent short URL.");
      navigate("/");
      return;
    }

    const now = new Date();
    const expiry = new Date(record.expiry);

    if (now > expiry) {
      alert("This link has expired.");
      navigate("/");
      return;
    }

    const click = {
      timestamp: now.toISOString(),
      referrer: document.referrer || "direct",
      location: "Unknown",
    };

    record.clicks.push(click);
    urlData[shortcode] = record;
    localStorage.setItem("urlData", JSON.stringify(urlData));
    logger("REDIRECT_CLICK", { shortcode, click });

    setTimeout(() => {
      window.location.href = record.longURL;
    }, 1500); // delay for smooth UX
  }, [shortcode, navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Redirecting you to the original URL...
        </Typography>
      </Box>
    </Container>
  );
}

export default RedirectHandler;
