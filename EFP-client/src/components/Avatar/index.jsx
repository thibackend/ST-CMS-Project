import React from 'react'
import { Avatar } from 'antd'

const AvatarComponent = ({imageUrl}) => {
    return (
        <Avatar
            src={imageUrl}
            style={{
            verticalAlign: 'middle',
            }}
            size="large"
            gap={10}
        />
        
    )
}

export default AvatarComponent;
