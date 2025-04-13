import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";

function Club({ clubs }) {
  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Clubs
      </Typography>
      <Grid container spacing={2}>
        {clubs.map((club, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                padding: "0px",
                overflow: "visible",
                cursor: "pointer",
                height: "100%", // Make the card fill the grid cell
                display: "flex",
                flexDirection: "column", // Ensure content stacks vertically
              }}
            >
              {/* Wrapper for Avatar with Background */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "80px",
                  backgroundColor: "#b70924",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  marginBottom: "0px", // Pull the Avatar halfway out
                }}
              >
                <Avatar
                  src={club.image}
                  alt={club.name}
                  sx={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "2px solid #b70924",
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ color: "#b70924" }}
                  gutterBottom
                >
                  {club.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {club.role}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Accolades:
                </Typography>

                {club.accolades.map((accolade, idx) => (
                  <Typography variant="body2" color="text.primary">
                    {accolade}
                  </Typography>
                ))}

                <Typography variant="body1" color="text.primary">
                  Achievements:
                </Typography>

                {club.achievements.map((achievement, idx) => (
                  <Typography variant="body2" color="text.primary">
                    {achievement}
                  </Typography>
                ))}

              </CardContent>
              <Box sx={{ padding: "16px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ color: "#b70924", borderColor: "#b70924" }}
                  onClick={() => alert(`Viewing certificate for ${club.name}`)}
                >
                  View Certificate
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Club;
