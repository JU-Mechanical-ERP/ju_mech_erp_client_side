"use client";

import { useState } from "react";
import { 
  TextField, 
  Grid, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  Divider,
  Box
} from "@mui/material";

export default function PersonalInfoForm({ onChange }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    category: "",
    isPwd: false,
    mobileNo: "",
    whatsappNo: "",
    email: "",
    alternateEmail: "",
    presentAddress: "",
    presentState: "",
    permanentAddress: "",
    permanentState: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
    nationality: "",
    idType: "",
    idNumber: "",
    familyIncome: ""
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    onChange({
      personalInfo: {
        ...formData,
        [name]: newValue
      }
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>
      <Divider className="mb-4" />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="sc">SC</MenuItem>
              <MenuItem value="st">ST</MenuItem>
              <MenuItem value="obc">OBC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <FormControlLabel
            control={
              <Checkbox
                name="isPwd"
                checked={formData.isPwd}
                onChange={handleChange}
              />
            }
            label="Differently Abled/PWD"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Contact Details
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Mobile Number"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="WhatsApp Number"
            name="whatsappNo"
            value={formData.whatsappNo}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Alternate Email"
            name="alternateEmail"
            type="email"
            value={formData.alternateEmail}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Present Address
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <TextField
            required
            fullWidth
            label="Present Address"
            name="presentAddress"
            multiline
            rows={3}
            value={formData.presentAddress}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="State"
            name="presentState"
            value={formData.presentState}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Permanent Address
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <TextField
            required
            fullWidth
            label="Permanent Address"
            name="permanentAddress"
            multiline
            rows={3}
            value={formData.permanentAddress}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="State"
            name="permanentState"
            value={formData.permanentState}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Emergency Contact
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Name"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Contact Number"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Relation"
            name="emergencyContactRelation"
            value={formData.emergencyContactRelation}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Nationality and Identification
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="Nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <FormControl fullWidth required>
            <InputLabel>ID Type</InputLabel>
            <Select
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              label="ID Type"
            >
              <MenuItem value="aadhaar">Aadhaar</MenuItem>
              <MenuItem value="passport">Passport</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <TextField
            required
            fullWidth
            label="ID Number"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Family Income (LPA)"
            name="familyIncome"
            type="number"
            value={formData.familyIncome}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
