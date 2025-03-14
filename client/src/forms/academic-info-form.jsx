"use client";

import { useState } from "react";
import { 
  TextField, 
  Grid, 
  Typography, 
  Button, 
  Divider,
  Box,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

// Removed unavailable `FileUploadField` component and related code

export default function AcademicInfoForm({ onChange }) {
  const [tabValue, setTabValue] = useState(0);
  const [grades, setGrades] = useState([
    { semester: 1, sgpa: "", cgpa: "" }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const addGrade = () => {
    setGrades([...grades, { semester: grades.length + 1, sgpa: "", cgpa: "" }]);
  };

  const removeGrade = (index) => {
    const newGrades = [...grades];
    newGrades.splice(index, 1);
    setGrades(newGrades);
  };

  const handleGradeChange = (index, field, value) => {
    const newGrades = [...grades];
    newGrades[index] = { ...newGrades[index], [field]: value };
    setGrades(newGrades);
    onChange({ academicInfo: { grades: newGrades } });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Academic Information
      </Typography>
      <Divider className="mb-4" />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="academic information tabs">
          <Tab label="Grades" />
        </Tabs>
      </Box>
      
      {tabValue === 0 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Semester-wise Grades
          </Typography>
          
          <TableContainer component={Paper} className="mb-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Semester</TableCell>
                  <TableCell>SGPA</TableCell>
                  <TableCell>CGPA</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell>{grade.semester}</TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={grade.sgpa}
                        onChange={(e) => handleGradeChange(index, 'sgpa', e.target.value)}
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 0.01 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        value={grade.cgpa}
                        onChange={(e) => handleGradeChange(index, 'cgpa', e.target.value)}
                        type="number"
                        inputProps={{ min: 0, max: 10, step: 0.01 }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => removeGrade(index)} disabled={grades.length === 1}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={addGrade}
            className="mb-4"
          >
            Add Semester
          </Button>
        </Box>
      )}
    </Box>
  );
}
