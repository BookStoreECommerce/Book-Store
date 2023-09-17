import { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import VerifyPassword from './VerifyPassword';
import ResetPassword from './ResetPassword';

const steps = ['Forgot Password', 'Verify Password', 'Reset Password'];

export default function ForgetPasswordStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) };

  return (
    <div className='container mt-5 '>
      <Stepper activeStep={activeStep}>
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
    </div>
  );
}
