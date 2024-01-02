import React from 'react'
import { Avatar } from 'antd'

const AvatarComponent = () => {
    return (
        <Avatar
            style={{
            backgroundColor: 'red',
            verticalAlign: 'middle',
            }}
            size="large"
            gap={10}
        >
            User
        </Avatar>
    )
}

export default AvatarComponent
