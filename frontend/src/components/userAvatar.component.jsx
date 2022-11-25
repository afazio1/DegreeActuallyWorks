import './userAvatar.styles.scss'
import React from 'react'

class UserAvatar extends React.Component {
    render() {
        var cleanProps = {
            ...this.props
        }
        delete cleanProps.avatarInitial
        return (
            <div {...cleanProps} className={this.props.className ? this.props.className.split().concat('user-avatar').join(' ') : 'user-avatar'}>
                <span className='avatar-initial'>
                    {this.props.avatarInitial}
                </span>
            </div>
        )
    }
}

export default UserAvatar
