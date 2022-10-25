import './topBar.styles.scss'
import React from 'react'
import UserAvatar from './userAvatar.component'
import AvatarDropdown from './avatarDropdown.component'

class TopBar extends React.Component {
    state = {
        dropdownHidden: true
    }

    constructor(props) {
        super(props)
        this.user = props.user
    }

    render() {
        return (
            <div id="top-bar">
                <div id="top-bar-left">
                    <span className="text-logo">Degree</span>
                    <span className="text-logo-bold">Actually</span>
                    <span className="text-logo">Works!</span>
                </div>
                <div id="top-bar-right">
                    <div id='welcome-message'>
                        <span>Welcome, </span>
                        <span className='bold'>{this.user.firstName} {this.user.lastName}</span>
                    </div>
                    <div id='gpa-preview'>
                        <span className='bold'>GPA: </span>
                        <span>{this.user.gpa}</span>
                    </div>
                    <div id='user-avatar-dropdown-wrapper'>
                        <UserAvatar user={this.user}/>
                        <AvatarDropdown user={this.user} hidden={this.state.dropdownHidden}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBar
