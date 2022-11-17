import styled from 'styled-components'
import sx, {SxProp} from './sx'
import {ComponentProps} from './utils/types'

const sizeMap = {
  small: '16px',
  medium: '32px',
  large: '64px'
}

export interface SpinnerInternalProps {
  /** Sets the width and height of the spinner. */
  size?: keyof typeof sizeMap
}

function Spinner({size: sizeKey = 'medium', ...props}: SpinnerInternalProps) {
  const size = sizeMap[sizeKey]

  return (
    <svg height={size} width={size} viewBox="0 0 16 16" fill="none" {...props}>
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke="currentColor"
        stroke-opacity="0.25"
        stroke-width="2"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="M15 8a7.002 7.002 0 00-7-7"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  )
}

const StyledSpinner = styled(Spinner)`
  @keyframes rotate-keyframes {
    100% {
      transform: rotate(360deg);
    }
  }

  animation: rotate-keyframes 1s linear infinite;

  ${sx}
`

StyledSpinner.displayName = 'Spinner'

export type SpinnerProps = ComponentProps<typeof StyledSpinner>
export default StyledSpinner
