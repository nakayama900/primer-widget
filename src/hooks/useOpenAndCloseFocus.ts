// import React, {useEffect} from 'react'
import {iterateFocusableElements} from '@primer/behaviors/utils'
import {createEffect, onCleanup} from "solid-js";

export type UseOpenAndCloseFocusSettings = {
  initialFocusRef?: React.RefObject<HTMLElement>
  containerRef: React.RefObject<HTMLElement>
  returnFocusRef: React.RefObject<HTMLElement>
  preventFocusOnOpen?: boolean
}

export function useOpenAndCloseFocus({
  initialFocusRef,
  returnFocusRef,
  containerRef,
  preventFocusOnOpen
}: UseOpenAndCloseFocusSettings): void {
  createEffect(() => {
    if (preventFocusOnOpen) {
      return
    }
    const returnRef = returnFocusRef.current
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus()
    } else if (containerRef.current) {
      const firstItem = iterateFocusableElements(containerRef.current).next().value
      firstItem?.focus()
    }
    onCleanup( function () {
      returnRef?.focus()
    })
  }, [initialFocusRef, returnFocusRef, containerRef, preventFocusOnOpen])
}
