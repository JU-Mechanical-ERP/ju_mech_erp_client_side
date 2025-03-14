"use client";

import React from "react";

import { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import FileUploadField from "../ui/file-upload-field";

// Props: TabPanel expects children (ReactNode), index (number), and value (number)
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`progression-tabpanel-${index}`}
      aria-labelledby={`progression-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Props: onChange is a function that receives progression data
export default function ProgressionForm({ onChange }) {
  const [tabValue, setTabValue] = useState(0);
  const [placement, setPlacement] = useState({
    isPlaced: false,
    offers: [
      {
        company: "",
        position: "",
        employmentType: "",
        recruitmentType: "",
        year: "",
        package: "",
        offerLetter: null,
      },
    ],
    choiceDetails: "",
  });
  const [exams, setExams] = useState([
    {
      name: "",
      year: "",
      score: "",
      hasTraining: false,
      trainingType: "",
      trainingMode: "",
      resultCard: null,
    },
  ]);
  const [higherStudy, setHigherStudy] = useState({
    programme: "",
    duration: "",
    institute: "",
    country: "",
  });
  const [startup, setStartup] = useState({
    hasStartup: false,
    startupDetails: "",
    interestedInStartup: false,
    universitySupport: "",
    externalSupport: "",
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Placement handlers
  const handlePlacementChange = (field, value) => {
    const newPlacement = { ...placement, [field]: value };
    setPlacement(newPlacement);

    onChange({
      progression: {
        placement: newPlacement,
        exams,
        higherStudy,
        startup,
      },
    });
  };

  const addOffer = () => {
    const newOffers = [
      ...placement.offers,
      {
        company: "",
        position: "",
        employmentType: "",
        recruitmentType: "",
        year: "",
        package: "",
        offerLetter: null,
      },
    ];
    const newPlacement = { ...placement, offers: newOffers };
    setPlacement(newPlacement);

    onChange({
      progression: {
        placement: newPlacement,
        exams,
        higherStudy,
        startup,
      },
    });
  };

  const removeOffer = (index) => {
    const newOffers = [...placement.offers];
    newOffers.splice(index, 1);
    const newPlacement = { ...placement, offers: newOffers };
    setPlacement(newPlacement);

    onChange({
      progression: {
        placement: newPlacement,
        exams,
        higherStudy,
        startup,
      },
    });
  };

  const handleOfferChange = (index, field, value) => {
    const newOffers = [...placement.offers];
    newOffers[index] = { ...newOffers[index], [field]: value };
    const newPlacement = { ...placement, offers: newOffers };
    setPlacement(newPlacement);

    onChange({
      progression: {
        placement: newPlacement,
        exams,
        higherStudy,
        startup,
      },
    });
  };

  // Exams handlers
  const addExam = () => {
    setExams([
      ...exams,
      {
        name: "",
        year: "",
        score: "",
        hasTraining: false,
        trainingType: "",
        trainingMode: "",
        resultCard: null,
      },
    ]);
  };

  const removeExam = (index) => {
    const newExams = [...exams];
    newExams.splice(index, 1);
    setExams(newExams);

    onChange({
      progression: {
        placement,
        exams: newExams,
        higherStudy,
        startup,
      },
    });
  };

  const handleExamChange = (index, field, value) => {
    const newExams = [...exams];
    newExams[index] = { ...newExams[index], [field]: value };
    setExams(newExams);

    onChange({
      progression: {
        placement,
        exams: newExams,
        higherStudy,
        startup,
      },
    });
  };

  // Higher Study handlers
  const handleHigherStudyChange = (field, value) => {
    const newHigherStudy = { ...higherStudy, [field]: value };
    setHigherStudy(newHigherStudy);

    onChange({
      progression: {
        placement,
        exams,
        higherStudy: newHigherStudy,
        startup,
      },
    });
  };

  // Startup handlers
  const handleStartupChange = (field, value) => {
    const newStartup = { ...startup, [field]: value };
    setStartup(newStartup);

    onChange({
      progression: {
        placement,
        exams,
        higherStudy,
        startup: newStartup,
      },
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Progression/Placement/Competitive Examinations
      </Typography>
      <Divider className="mb-4" />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="progression tabs">
          <Tab label="Placement" />
          <Tab label="Competitive Exams" />
          <Tab label="Higher Study" />
          <Tab label="Startups" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          Placement Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={placement.isPlaced}
                  onChange={(e) => handlePlacementChange("isPlaced", e.target.checked)}
                />
              }
              label="Whether Placed"
            />
          </Grid>
        </Grid>

        {placement.isPlaced && (
          <>
            {placement.offers.map((offer, index) => (
              <Paper key={index} className="p-4 mb-4">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      value={offer.company}
                      onChange={(e) => handleOfferChange(index, "company", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Position Offered"
                      value={offer.position}
                      onChange={(e) => handleOfferChange(index, "position", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Employment Type</InputLabel>
                      <Select
                        value={offer.employmentType}
                        onChange={(e) => handleOfferChange(index, "employmentType", e.target.value)}
                        label="Employment Type"
                      >
                        <MenuItem value="contractual">Contractual</MenuItem>
                        <MenuItem value="permanent">Permanent</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Recruitment Type</InputLabel>
                      <Select
                        value={offer.recruitmentType}
                        onChange={(e) => handleOfferChange(index, "recruitmentType", e.target.value)}
                        label="Recruitment Type"
                      >
                        <MenuItem value="inCampus">In-Campus</MenuItem>
                        <MenuItem value="offCampus">Off-Campus</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Year of Offer"
                      value={offer.year}
                      onChange={(e) => handleOfferChange(index, "year", e.target.value)}
                      type="number"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Package (LPA)"
                      value={offer.package}
                      onChange={(e) => handleOfferChange(index, "package", e.target.value)}
                      type="number"
                      inputProps={{ step: 0.01 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FileUploadField
                      label="Upload Offer Letter (if any)"
                      onChange={(files) => handleOfferChange(index, "offerLetter", files[0])}
                    />
                  </Grid>

                  <Grid item xs={12} className="flex justify-end">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => removeOffer(index)}
                      disabled={placement.offers.length === 1}
                    >
                      Remove Offer
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))}

            <Button variant="contained" startIcon={<Add />} onClick={addOffer} className="mb-4">
              Add Offer
            </Button>

            {placement.offers.length > 1 && (
              <Grid container spacing={3} className="mt-2">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Choice of offer (if there are multiple offers): Intended choice and reason for choice"
                    value={placement.choiceDetails}
                    onChange={(e) => handlePlacementChange("choiceDetails", e.target.value)}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            )}
          </>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Competitive Examinations
        </Typography>

        {exams.map((exam, index) => (
          <Paper key={index} className="p-4 mb-4">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Examination Name"
                  value={exam.name}
                  onChange={(e) => handleExamChange(index, "name", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Year"
                  value={exam.year}
                  onChange={(e) => handleExamChange(index, "year", e.target.value)}
                  type="number"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Score/Rank/Percentile"
                  value={exam.score}
                  onChange={(e) => handleExamChange(index, "score", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exam.hasTraining}
                      onChange={(e) => handleExamChange(index, "hasTraining", e.target.checked)}
                    />
                  }
                  label="Specific training/Guidance for the examination"
                />
              </Grid>

              {exam.hasTraining && (
                <>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Training Type</InputLabel>
                      <Select
                        value={exam.trainingType}
                        onChange={(e) => handleExamChange(index, "trainingType", e.target.value)}
                        label="Training Type"
                      >
                        <MenuItem value="inHouse">In-house</MenuItem>
                        <MenuItem value="outside">Outside/Online</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Training Mode</InputLabel>
                      <Select
                        value={exam.trainingMode}
                        onChange={(e) => handleExamChange(index, "trainingMode", e.target.value)}
                        label="Training Mode"
                      >
                        <MenuItem value="paid">Payment basis</MenuItem>
                        <MenuItem value="unpaid">Unpaid (from tutorials/resources)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <FileUploadField
                  label="Upload Rank Card/Result (if any)"
                  onChange={(files) => handleExamChange(index, "resultCard", files[0])}
                />
              </Grid>

              <Grid item xs={12} className="flex justify-end">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => removeExam(index)}
                  disabled={exams.length === 1}
                >
                  Remove Exam
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Button variant="contained" startIcon={<Add />} onClick={addExam} className="mb-4">
          Add Exam
        </Button>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Higher Study
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Programme</InputLabel>
              <Select
                value={higherStudy.programme}
                onChange={(e) => handleHigherStudyChange("programme", e.target.value)}
                label="Programme"
              >
                <MenuItem value="mtech">M.Tech</MenuItem>
                <MenuItem value="ms">MS</MenuItem>
                <MenuItem value="phd">Ph.D</MenuItem>
                <MenuItem value="mba">MBA</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tenure/duration of the programme"
              value={higherStudy.duration}
              onChange={(e) => handleHigherStudyChange("duration", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Institute/University"
              value={higherStudy.institute}
              onChange={(e) => handleHigherStudyChange("institute", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country"
              value={higherStudy.country}
              onChange={(e) => handleHigherStudyChange("country", e.target.value)}
            />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>
          Startups/Entrepreneurship Initiatives
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={startup.hasStartup}
                  onChange={(e) => handleStartupChange("hasStartup", e.target.checked)}
                />
              }
              label="Associated with/developed any startups/entrepreneurship initiative"
            />
          </Grid>

          {startup.hasStartup && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Details of the startup/entrepreneurship initiative: Name, objective, investment etc."
                value={startup.startupDetails}
                onChange={(e) => handleStartupChange("startupDetails", e.target.value)}
                multiline
                rows={3}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={startup.interestedInStartup}
                  onChange={(e) => handleStartupChange("interestedInStartup", e.target.checked)}
                />
              }
              label="Whether interested to form startups/entrepreneurship initiative in future"
            />
          </Grid>

          {startup.interestedInStartup && (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Is there any support from the University"
                  value={startup.universitySupport}
                  onChange={(e) => handleStartupChange("universitySupport", e.target.value)}
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Is there any external support"
                  value={startup.externalSupport}
                  onChange={(e) => handleStartupChange("externalSupport", e.target.value)}
                  multiline
                  rows={2}
                />
              </Grid>
            </>
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
}

