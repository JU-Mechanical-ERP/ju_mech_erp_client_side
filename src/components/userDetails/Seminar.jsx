import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function Seminar({ seminars }) {
  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Seminars
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Venue</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Role</b></TableCell>
              <TableCell><b>Organizer</b></TableCell>
              <TableCell><b>Certificate</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seminars.map((seminar, index) => (
              <TableRow key={index}>
                <TableCell>{seminar.name}</TableCell>
                <TableCell>{seminar.venue}</TableCell>
                <TableCell>{seminar.date}</TableCell>
                <TableCell>{seminar.role}</TableCell>
                <TableCell>{seminar.organizer}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => alert(`Viewing certificate for ${seminar.name}`)}
                  >
                    View Certificate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Seminar;