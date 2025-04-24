import { RadioCardRootProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface IRadioCardProps extends RadioCardRootProps {
  items: {
    label: string
    icon?: ReactNode
    content?: ReactNode
    desc?: string
  }[]
  colorPalette?:
    | string
    | 'transparent'
    | 'current'
    | 'black'
    | 'white'
    | 'whiteAlpha'
    | 'blackAlpha'
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink'
    | 'bg'
    | 'fg'
    | 'border'
  labelTitle?: string
  stepButton?: ReactNode
  orientation?: 'vertical' | 'horizontal'
  onValueChange?: (details: { value: string }) => void
}

export type { IRadioCardProps }
