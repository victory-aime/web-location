import React, { ReactNode } from 'react'

interface StepperProps {
  stepTitle?: string
  steps: {
    icon: ReactNode
    content: (props: {
      NextTrigger: React.FC<{ children: ReactNode }>
      PrevTrigger: React.FC<{ children: ReactNode }>
    }) => ReactNode
    label: string
    stepNumber: number
  }[]
  goNextSteps: (step: number) => void
}

export type { StepperProps }
