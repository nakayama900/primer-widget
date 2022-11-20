import  {SystemCssProperties, SystemStyleObject} from '@styled-system/css'
import {css} from "solid-styled-components";
import {ThemeColorPaths, ThemeShadowPaths} from './theme'
import {ColorProps, ShadowProps} from 'styled-system'
import merge from 'deepmerge'

export type BetterCssProperties = {
  [K in keyof SystemCssProperties]: K extends keyof ColorProps
    ? ThemeColorPaths | SystemCssProperties[K]
    : K extends keyof ShadowProps
    ? ThemeShadowPaths | SystemCssProperties[K]
    : SystemCssProperties[K]
}

// Support CSS custom properties in the `sx` prop
type CSSCustomProperties = {
  [key: `--${string}`]: string | number
}

type CSSSelectorObject = {
  [cssSelector: string]: SystemStyleObject | CSSCustomProperties
}

export type BetterSystemStyleObject = BetterCssProperties | SystemStyleObject | CSSCustomProperties | CSSSelectorObject

export interface SxProp {
  // sx?: BetterSystemStyleObject
  sx?:string|object|Function
}


const sx = (props) => {
  return css(props.sx);
}

export default sx

export {merge}
