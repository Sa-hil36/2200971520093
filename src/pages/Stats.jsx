import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Divider,
} from "@mui/material";

function Stats() {
  const [data, setData] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("urlData") || "{}");
    setData(savedData);
  }, []);

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" gutterBottom align="center">
          📊 URL Analytics
        </Typography>

        {Object.keys(data).length === 0 && (
          <Typography align="center">No shortened URLs found.</Typography>
        )}

        {Object.entries(data).map(([code, info]) => (
          <Card key={code} elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              🔗 Short URL:{" "}
              <a href={`/${code}`} target="_blank" rel="noreferrer">
                {`http://localhost:3000/${code}`}
              </a>
            </Typography>
            <Typography>
              <strong>Original URL:</strong> {info.longURL}
            </Typography>
            <Typography>
              <strong>Created At:</strong>{" "}
              {new Date(info.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Expires At:</strong>{" "}
              {new Date(info.expiry).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Total Clicks:</strong> {info.clicks.length}
            </Typography>

            {info.clicks.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  📈 Click Details:
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Timestamp</strong></TableCell>
                      <TableCell><strong>Referrer</strong></TableCell>
                      <TableCell><strong>Location</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {info.clicks.map((click, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          {new Date(click.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>{click.referrer}</TableCell>
                        <TableCell>{click.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default Stats;



