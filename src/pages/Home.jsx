import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  Container,
  Box,
  Grid,
  Tooltip,
} from "@mui/material";

import { isValidURL, generateShortcode } from "../utils/helpers";
import { logger } from "../utils/logger";

function Home() {
  const [urlList, setUrlList] = useState([{ url: "", customCode: "", time: "" }]);
  const [shortLinks, setShortLinks] = useState([]);

  const updateInput = (index, key, value) => {
    const updatedList = [...urlList];
    updatedList[index][key] = value;
    setUrlList(updatedList);
  };

  const addNewField = () => {
    if (urlList.length < 5) {
      setUrlList([...urlList, { url: "", customCode: "", time: "" }]);
    }
  };

  const handleShorten = () => {
    const allLinks = [];
    const storedData = JSON.parse(localStorage.getItem("urlData") || "{}");

    for (let item of urlList) {
      // Basic checks
      if (!isValidURL(item.url)) {
        alert("Invalid URL format.");
        return;
      }

      let code = item.customCode?.trim() || generateShortcode();
      if (storedData[code]) {
        alert("This shortcode is already taken. Try something else.");
        return;
      }

      const mins = parseInt(item.time) || 30;
      const expiryTime = new Date(Date.now() + mins * 60000);

      const newEntry = {
        longURL: item.url,
        code,
        shortURL: `http://localhost:3000/${code}`,
        createdAt: new Date().toISOString(),
        expiry: expiryTime.toISOString(),
        clicks: [],
      };

      storedData[code] = newEntry;
      logger("SHORTEN_URL", newEntry);
      allLinks.push(newEntry);
    }

    localStorage.setItem("urlData", JSON.stringify(storedData));
    setShortLinks(allLinks);
  };

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          URL Shortener Tool
        </Typography>

        {urlList.map((item, index) => (
          <Card
            key={index}
            sx={{
              background: "#e3f2fd",
              p: 3,
              mb: 3,
              borderLeft: "5px solid #1976d2",
            }}
            elevation={2}
          >
            <Typography variant="subtitle1" mb={2}>
              URL #{index + 1}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Enter URL"
                  value={item.url}
                  onChange={(e) => updateInput(index, "url", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Custom Code (optional)"
                  value={item.customCode}
                  onChange={(e) => updateInput(index, "customCode", e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Validity in Minutes"
                  value={item.time}
                  onChange={(e) => updateInput(index, "time", e.target.value)}
                  placeholder="Default: 30"
                  type="number"
                />
              </Grid>
            </Grid>
          </Card>
        ))}

        <Box textAlign="center" mt={2}>
          <Tooltip title="You can add up to 5 URLs">
            <span>
              <Button
                onClick={addNewField}
                variant="outlined"
                disabled={urlList.length >= 5}
                sx={{ mr: 2 }}
              >
                Add Another
              </Button>
            </span>
          </Tooltip>

          <Button
            onClick={handleShorten}
            variant="contained"
            sx={{ backgroundColor: "#1976d2", color: "#fff" }}
          >
            Shorten Links
          </Button>
        </Box>

        {/* Shortened Links */}
        {shortLinks.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom color="success.main">
              Your Shortened Links:
            </Typography>

            {shortLinks.map((link, i) => (
              <Card
                key={i}
                sx={{
                  background: "#e8f5e9",
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography>
                  <strong>Short URL:</strong>{" "}
                  <a
                    href={`/${link.code}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontWeight: "bold", color: "#2e7d32" }}
                  >
                    {link.shortURL}
                  </a>
                </Typography>
                <Typography>
                  <strong>Expires At:</strong>{" "}
                  {new Date(link.expiry).toLocaleString()}
                </Typography>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Home;
