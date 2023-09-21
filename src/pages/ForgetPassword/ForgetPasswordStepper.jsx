import { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import ForgotPassword from '../../Components/AuthComponents/ForgetPasswordComponents/ForgotPassword';
import VerifyPassword from '../../Components/AuthComponents/ForgetPasswordComponents/VerifyPassword';
import ResetPassword from '../../Components/AuthComponents/ForgetPasswordComponents/ResetPassword';

const steps = ['Forgot Password', 'Verify Password', 'Reset Password'];

export default function ForgetPasswordStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) };

  return (
    <Box sx={{
      mt: 7,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}>
      <Box maxWidth="sm" >
        <Stepper activeStep={activeStep} >
          {steps.map((label) => {
            const labelProps = {};
            return (
              <Step key={label}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 ? <ForgotPassword onSubmit={handleNext} /> : activeStep === 1 ? <VerifyPassword onSubmit={handleNext} /> : <ResetPassword />}
      </Box>
    </Box>
  );
}
