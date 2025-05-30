import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";

export default function CoCurricularForm({ formData, handleChange }) {
  
  //* state value to check if the screen is mobile or not
  const isMobile = useMediaQuery("(max-width:900px)");

  //* Default row structures for each section
  const defaultRows = {
    clubs: {
      name: "",
      role: "",
      accolades: "",
      achievements: "",
      certificate: null,
    },
    techFests: {
      name: "",
      organizer: "",
      eventType: "",
      year: "",
      role: "",
      teammates: "",
      outcome: "",
      certificate: null,
    },
    leadership: { role: "", details: "", certificate: null },
    sports: {
      name: "",
      level: "",
      venue: "",
      year: "",
      result: "",
      accolades: "",
      certificate: null,
    },
    skills: {
      name: "",
      offeredby: "",
      mode: "",
      duration: "",
      fee: "",
      certificate: null,
    },
    socialActivities: {
      name: "",
      details: "",
      date: "",
      location: "",
      certificate: null,
    },
    seminars: {
      name: "",
      venue: "",
      date: "",
      organizer: "",
      certificate: null,
    },
  };

  //& functions regarding row operations
  //? Function to add a new row
  const handleAddRow = (section) => {
    const updatedSection = [...(formData[section] || []), defaultRows[section]];
    handleChange({ target: { name: section, value: updatedSection } });
  };

  //? Function to handle changes in a row
  const handleChangeRow = (index, field, value, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    handleChange({ target: { name: section, value: updatedSection } });
  };

  //? Function to delete a row
  const handleRemoveRow = (index, section) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    handleChange({ target: { name: section, value: updatedSection } });
  };

  return (
    <Box
      sx={{
        padding: "20px",
        width: "100%",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
      }}
    >
      {/* Selection Panel */}
      {Object.keys(defaultRows).map((section) => (
        <FormControlLabel
          key={section}
          control={
            <Checkbox
              checked={formData[section]?.length > 0}
              onChange={() =>
                handleChange({
                  target: {
                    name: section,
                    value: formData[section]?.length > 0 ? [] : [defaultRows[section]],
                  },
                })
              }
            />
          }
          label={section
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        />
      ))}

      {/* Dynamic Sections */}
      {Object.keys(defaultRows).map((section) =>
        formData[section]?.length > 0 ? (
          <Section
            key={section}
            title={section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            rows={formData[section]}
            section={section}
            fields={Object.keys(defaultRows[section])
              .filter((key) => key !== "certificate")
              .map((key) => ({
                label: key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase()),
                key,
              }))}
            isMobile={isMobile}
            handleAddRow={handleAddRow}
            handleChangeRow={handleChangeRow}
            handleRemoveRow={handleRemoveRow}
          />
        ) : null
      )}
    </Box>
  );
}

//? defined reusable function
function Section({
  title,
  rows,
  section,
  fields,
  isMobile,
  handleAddRow,
  handleChangeRow,
  handleRemoveRow,
}) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {isMobile ? (
        rows.map((row, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>{row.name || `Entry ${index + 1}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {fields.map((field) => (
                  <TextField
                    key={field.key}
                    label={field.label}
                    value={row[field.key]}
                    onChange={(e) =>
                      handleChangeRow(index, field.key, e.target.value, section)
                    }
                  />
                ))}
                <Button variant="contained" component="label">
                  Upload Certificate
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleChangeRow(index, "certificate", e.target.files[0], section)
                    }
                  />
                </Button>
                <IconButton onClick={() => handleRemoveRow(index, section)}>
                  <Delete />
                </IconButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell key={field.key}>{field.label}</TableCell>
                ))}
                <TableCell>Certificate</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {fields.map((field) => (
                    <TableCell key={field.key}>
                      <TextField
                        value={row[field.key]}
                        onChange={(e) =>
                          handleChangeRow(index, field.key, e.target.value, section)
                        }
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="contained" component="label">
                      Upload
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleChangeRow(index, "certificate", e.target.files[0], section)
                        }
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleRemoveRow(index, section)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button
        startIcon={<Add />}
        onClick={() => handleAddRow(section)}
        sx={{ mt: 2 }}
      >
        Add Entry
      </Button>
    </Box>
  );
}