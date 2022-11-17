/**
 * Extract a component's props
 *
 * Source: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#wrappingmirroring-a-component
 *
 * @example ComponentProps<typeof MyComponent>
 */
import type {Component, ParentProps} from 'solid-js';
// export type ComponentProps<T> = T extends React.ComponentType<React.PropsWithChildren<infer Props>>
export type ComponentProps<T={}> = T extends Component<ParentProps<infer Props>>
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    Props extends object
    ? Props
    : never
  : never
