import { Card } from '@chakra-ui/react'
import { FC } from 'react'
import { TypeProps } from './interface/card'

export const CardContainer: FC<TypeProps> = ({ items, label, children, ...rest }) => {
  return (
    <Card.Root colorPalette={rest.colorPalette} variant={rest.variant} size={rest.size} {...rest} overflow="hidden" height={rest.height}>
      <Card.Body
        _open={{
          animationName: 'fade-in, scale-in',
          animationDuration: '300ms',
        }}
        p={0}
      >
        {children}
      </Card.Body>
    </Card.Root>
  )
}
