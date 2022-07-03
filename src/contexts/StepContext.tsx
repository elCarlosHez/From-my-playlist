import { useState } from "react";

export enum Steps {
  start,
  destiny,
  transfer,
  finish
}

export interface ReturnStepContext {
  step: Steps;
  setStep: React.Dispatch<React.SetStateAction<Steps>>;
}

export const stepContext = (): ReturnStepContext => {
  const [step, setStep] = useState<Steps>(Steps.start);

  return {
    step,
    setStep,
  }
};
