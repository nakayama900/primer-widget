import { styled } from 'solid-styled-components'
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from 'styled-system'
import sx, {SxProp} from './sx'
import {ComponentProps} from './utils/types'
import {ParentComponent, ParentProps} from "solid-js";

type StyledBoxProps = SpaceProps &
  ColorProps &
  TypographyProps &
  LayoutProps &
  FlexboxProps &
  GridProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps &
  SxProp

const Box =
  styled('div')`
  ${space};
  ${color};
  ${typography};
  ${layout};
  ${flexbox};
  ${grid};
  ${background};
  ${border};
  ${position};
  ${shadow};
  ${sx};`


export type BoxProps = ComponentProps<typeof Box>
export default Box
