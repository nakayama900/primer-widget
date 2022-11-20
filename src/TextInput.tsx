import {ForwardRefComponent as PolymorphicForwardRefComponent} from './utils/polymorphic'
import classnames from 'classnames'

import TextInputInnerVisualSlot from './_TextInputInnerVisualSlot'
import {useProvidedRefOrCreate} from './hooks'
import {Merge} from './utils/types'
import TextInputWrapper, {StyledWrapperProps} from './_TextInputWrapper'
import UnstyledTextInput from './_UnstyledTextInput'
import TextInputAction from './_TextInputInnerAction'
import {ComponentProps, createSignal, JSX} from "solid-js";

export type TextInputNonPassthroughProps = {
  /** @deprecated Use `leadingVisual` or `trailingVisual` prop instead */
  icon?: React.ComponentType<React.PropsWithChildren<{className?: string}>>
  /** Whether the to show a loading indicator in the input */
  loading?: boolean
  /**
   * Which position to render the loading indicator
   * 'auto' (default): at the end of the input, unless a `leadingVisual` is passed. Then, it will render at the beginning
   * 'leading': at the beginning of the input
   * 'trailing': at the end of the input
   **/
  loaderPosition?: 'auto' | 'leading' | 'trailing'
  /**
   * A visual that renders inside the input before the typing area
   */
  leadingVisual?: string | React.ComponentType<React.PropsWithChildren<{className?: string}>>
  /**
   * A visual that renders inside the input after the typing area
   */
  trailingVisual?: string | React.ComponentType<React.PropsWithChildren<{className?: string}>>
  /**
   * A visual that renders inside the input after the typing area
   */
  trailingAction?: React.ReactElement<React.HTMLProps<HTMLButtonElement>>
} & Pick<
  StyledWrapperProps,
  | 'block'
  | 'contrast'
  | 'disabled'
  | 'monospace'
  | 'sx'
  | 'width'
  | 'maxWidth'
  | 'minWidth'
  | 'variant'
  | 'size'
  | 'validationStatus'
>

// export type TextInputProps = Merge<React.ComponentPropsWithoutRef<'input'>, TextInputNonPassthroughProps>
export type TextInputProps= Omit<ComponentProps<'input'>, keyof TextInputNonPassthroughProps>&TextInputNonPassthroughProps
// using forwardRef is important so that other components (ex. SelectMenu) can autofocus the input
// const TextInput = HTMLInputElement, TextInputProps(
let TextInput
TextInput = (
  (
    {
      icon: IconComponent,
      leadingVisual: LeadingVisual,
      trailingVisual: TrailingVisual,
      trailingAction,
      block,
      className,
      contrast,
      disabled,
      loading,
      loaderPosition,
      monospace,
      validationStatus,
      sx: sxProp,
      size: sizeProp,
      onFocus,
      onBlur,
      // start deprecated props
      width: widthProp,
      minWidth: minWidthProp,
      maxWidth: maxWidthProp,
      variant: variantProp,
      // end deprecated props
      ...inputProps
    },
    ref
  ) => {
    const [isInputFocused, setIsInputFocused] = createSignal(false)
    // const inputRef = useProvidedRefOrCreate(ref as HTMLInputElement)
    let inputRef : HTMLInputElement|undefined = ref ?? undefined
    // this class is necessary to style FilterSearch, plz no touchy!
    // const wrapperClasses = classnames(className, 'TextInput-wrapper')
    const wrapperClasses = className.map( (value)=>'TextInput-wrapper'+value)
    const showLeadingLoadingIndicator =
      loading && (loaderPosition === 'leading' || Boolean(LeadingVisual && loaderPosition !== 'trailing'))
    const showTrailingLoadingIndicator =
      loading && (loaderPosition === 'trailing' || Boolean(loaderPosition === 'auto' && !LeadingVisual))
    const focusInput: JSX.EventHandler<HTMLInputElement, MouseEvent> = () => {
      // inputRef.current?.focus()
        inputRef?.focus()
    }
    const handleInputFocus =
      e => {
        setIsInputFocused(true)
        onFocus && onFocus(e)
      }
    const handleInputBlur =
      e => {
        setIsInputFocused(false)
        onBlur && onBlur(e)
      }

    return (
      <TextInputWrapper
        block={block}
        classList={wrapperClasses}
        validationStatus={validationStatus}
        contrast={contrast}
        disabled={disabled}
        monospace={monospace}
        sx={sxProp}
        size={sizeProp}
        width={widthProp}
        minWidth={minWidthProp}
        maxWidth={maxWidthProp}
        variant={variantProp}
        hasLeadingVisual={Boolean(LeadingVisual || showLeadingLoadingIndicator)}
        hasTrailingVisual={Boolean(TrailingVisual || showTrailingLoadingIndicator)}
        hasTrailingAction={Boolean(trailingAction)}
        isInputFocused={isInputFocused()}
        onClick={focusInput}
        aria-live="polite"
        aria-busy={Boolean(loading)}
      >
        {IconComponent && <IconComponent className="TextInput-icon" />}
        <TextInputInnerVisualSlot
          visualPosition="leading"
          showLoadingIndicator={showLeadingLoadingIndicator}
          hasLoadingIndicator={typeof loading === 'boolean'}
        >
          {typeof LeadingVisual === 'function' ? <LeadingVisual /> : LeadingVisual}
        </TextInputInnerVisualSlot>
        <UnstyledTextInput
          ref={inputRef}
          disabled={disabled}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...inputProps}
          data-component="input"
        />
        <TextInputInnerVisualSlot
          visualPosition="trailing"
          showLoadingIndicator={showTrailingLoadingIndicator}
          hasLoadingIndicator={typeof loading === 'boolean'}
        >
          {typeof TrailingVisual === 'function' ? <TrailingVisual /> : TrailingVisual}
        </TextInputInnerVisualSlot>
        {trailingAction}
      </TextInputWrapper>
    )
  }
) as any
// ) as Merge<React.ComponentPropsWithoutRef<'input'>, TextInputNonPassthroughProps>t<'input', TextInputProps>
// ) as Omit<ParentProps<HTMLInputElement>, keyof TextInputNonPassthroughProps> & TextInputNonPassthroughProps , t<'input',TextInputProps>
// TextInput.defaultProps = {
//   type: 'text',
//   loaderPosition: 'auto'
// }

// TextInput.displayName = 'TextInput'

export default Object.assign(TextInput, {
  Action: TextInputAction
})
