import './userAvatar.styles.scss'
import React from 'react'

class UserAvatar extends React.Component {
    render() {
        return (
            <div {...this.props} className={this.props.className ? this.props.className.split().concat('user-avatar').join(' ') : 'user-avatar'}>
                <span className='avatar-initial'>
                    {this.props.avatarInitial}
                </span>
            </div>
        )
    }
}

export default UserAvatar
