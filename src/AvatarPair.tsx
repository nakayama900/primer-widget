// import React from 'react'
import {styled} from 'solid-styled-components'
import Avatar,{AvatarProps} from './Avatar'
import {get} from './constants'
import Box, {BoxProps} from './Box'
import {Component, For, JSXElement, splitProps,JSX} from "solid-js";

const ChildAvatar = styled(Avatar)`
  position: absolute;
  right: -15%;
  bottom: -9%;
  box-shadow: ${get('shadows.avatar.childShadow')};
`

export type AvatarPairProps = BoxProps

const AvatarPair = (props: AvatarPairProps) => {
    const [{children}, rest] = splitProps(props, ['children'])
    // const avatars = children.map(children, (child, i) => {
    //   if (!React.isValidElement(child)) {
    //     return child
    //   }
    //
    //   if (i === 0) {
    //     return React.cloneElement(child as React.ReactElement<AvatarProps>, {size: 40})
    //   }
    //
    //   return <ChildAvatar bg="canvas.default" {...child.props} size={20} />
    // })
    const avatars = <For each={children()}>{
        (child:JSX.Element[], i) => {
            if (i() === 0) {
                return <Avatar size={40} {...child.props} />
            }
            return <ChildAvatar bg="canvas.default" {...child.props} size={20}/>
        }
    }</For>
    return <Box position={"relative"} display={"inline-flex"} {...rest}>
        {avatars}
    </Box>
}

const test = <svg height="300" width="400">
    <defs>
    <linearGradient id="gr1" x1="0%" y1="60%" x2="100%" y2="0%">
    <stop offset="5%" style="stop-color:rgb(255,255,3);stop-opacity:1" />
    <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
</defs>
<ellipse cx="125" cy="150" rx="100" ry="60" fill="url(#gr1)" />
Sorry but this browser does not support inline SVG.
</svg>

// styled() changes this
// AvatarPair.displayName = 'AvatarPair'

export default AvatarPair
