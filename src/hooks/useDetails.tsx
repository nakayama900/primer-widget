import {createEffect, createSignal} from "solid-js";

type UseDetailsParameters = {
  ref?: HTMLDetailsElement
  closeOnOutsideClick?: boolean
  defaultOpen?: boolean
  onClickOutside?: (event: MouseEvent) => void
}

function useDetails({ref, closeOnOutsideClick, defaultOpen, onClickOutside}: UseDetailsParameters) {
  const [open, setOpen] = createSignal(defaultOpen)
  // const backupRef = Ref(null)
  // const customRef = ref ?? backupRef
const customRef = ref
  const onClickOutsideInternal =
    (event: MouseEvent) => {
      const {ariaCurrent} = customRef
      const eventTarget = event.target as HTMLElement
      const closest = eventTarget.closest('details') as HTMLDetailsElement
      if (closest !== customRef) {
        onClickOutside && onClickOutside(event)
        if (!event.defaultPrevented) {
          setOpen(false)
        }
      }
    }

  // handles the overlay behavior - closing the menu when clicking outside of it
  createEffect(() => {
    if (open && closeOnOutsideClick) {
      document.addEventListener('click', onClickOutsideInternal)
      return () => {
        document.removeEventListener('click', onClickOutsideInternal)
      }
    }
  }, [open, closeOnOutsideClick, onClickOutsideInternal])

  const handleToggle = (e: React.SyntheticEvent<HTMLElement, Event>) => {
    if (!e.defaultPrevented) {
      const eventTarget = e.target as HTMLDetailsElement
      setOpen(eventTarget.open)
    }
  }

  const getDetailsProps = () => {
    return {onToggle: handleToggle, open, ref: customRef}
  }

  return {open, setOpen, getDetailsProps}
}

export default useDetails
