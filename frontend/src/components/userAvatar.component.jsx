import './userAvatar.styles.scss'
import React from 'react'

class UserAvatar extends React.Component {
    render() {
        return (
            <div className='user-avatar'>
                <span className='avatar-initial'>
                    {this.props.avatarInitial}
                </span>
            </div>
        )
    }
}

export default UserAvatar
