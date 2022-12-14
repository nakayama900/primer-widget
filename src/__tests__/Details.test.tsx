import React from 'react'
import {Details, useDetails, Box} from '..'
import {Button, ButtonPrimary} from '../deprecated'
import {ButtonProps} from '../deprecated/Button/Button'
import {mount, behavesAsComponent, checkExports} from '../utils/testing'
import {render as HTMLRender} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Details', () => {
  behavesAsComponent({Component: Details})

  checkExports('Details', {
    default: Details
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<Details />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Toggles when you click outside', () => {
    const Component = () => {
      const {getDetailsProps} = useDetails({closeOnOutsideClick: true})
      return (
        <Details {...getDetailsProps()}>
          <summary>hi</summary>
        </Details>
      )
    }

    const wrapper = mount(<Component />)

    document.body.click()

    const dom = wrapper.getDOMNode()

    expect(dom.hasAttribute('open')).toEqual(false)

    wrapper.unmount()
  })

  it('Accurately passes down open state', () => {
    const Component = () => {
      const {getDetailsProps, open} = useDetails({closeOnOutsideClick: true})
      return (
        <Details {...getDetailsProps()}>
          <Button as="summary">{open ? 'Open' : 'Closed'}</Button>
        </Details>
      )
    }

    const wrapper = mount(<Component />)

    document.body.click()

    const dom = wrapper.getDOMNode()
    const summary = wrapper.find('summary')
    expect(summary.text()).toEqual('Closed')

    expect(dom.hasAttribute('open')).toEqual(false)

    wrapper.unmount()
  })

  it('Can manipulate state with setOpen', () => {
    const CloseButton = (props: ButtonProps) => <Button {...props} />
    const Component = () => {
      const {getDetailsProps, setOpen, open} = useDetails({closeOnOutsideClick: true, defaultOpen: true})
      return (
        <Details {...getDetailsProps()}>
          <Button as="summary">{open ? 'Open' : 'Closed'}</Button>
          <CloseButton onClick={() => setOpen(false)} />
        </Details>
      )
    }

    const wrapper = mount(<Component />)

    wrapper.find(CloseButton).simulate('click')

    const dom = wrapper.getDOMNode()
    const summary = wrapper.find('summary')
    expect(summary.text()).toEqual('Closed')

    expect(dom.hasAttribute('open')).toEqual(false)

    wrapper.unmount()
  })

  it('Does not toggle when you click inside', () => {
    const Component = () => {
      const {getDetailsProps, open} = useDetails({closeOnOutsideClick: true, defaultOpen: true})
      return (
        <Details {...getDetailsProps()}>
          <Button as="summary">{open ? 'Open' : 'Closed'}</Button>
          <Box>
            <ButtonPrimary>hi</ButtonPrimary>
          </Box>
        </Details>
      )
    }

    const wrapper = mount(<Component />)
    const summary = wrapper.find('summary')

    wrapper.find(ButtonPrimary).simulate('click')

    expect(summary.text()).toEqual('Open')

    wrapper.unmount()
  })
})
