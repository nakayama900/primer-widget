import {SxProp} from '../sx'
import InputCaption from '../_InputCaption'
import {FormControlContext} from './FormControl'
import {Slot} from './slots'
import {ParentComponent, ParentProps} from "solid-js";

const FormControlCaption: ParentComponent<ParentProps<{id?: string} & SxProp>> = ({children, sx, id}) => (
  <Slot name="Caption">
    {({captionId, disabled}: FormControlContext) => (
      <InputCaption id={id || captionId} disabled={disabled} sx={sx}>
        {children}
      </InputCaption>
    )}
  </Slot>
)

export default FormControlCaption
