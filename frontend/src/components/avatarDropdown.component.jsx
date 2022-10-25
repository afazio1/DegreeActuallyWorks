import './avatarDropdown.styles.scss'
import React from 'react'
import UserAvatar from './userAvatar.component.jsx'
import Button from './button.component.jsx'

class AvatarDropdown extends React.Component {
    constructor(props) {
        super(props)
        this.user = props.user  // As-is, from /api/user/:userId
    }

    render() {
        if (this.props.hidden) {
            return
        } else {
            return (
                <div id="avatar-dropdown">
                    <div className="user-avatar-row">
                        <UserAvatar avatarInitial={this.user.firstName[0]} className="dropdown-menu-avatar"/>
                        <div className='student-full-name'>
                            {this.user.firstName}
                            <br/>
                            {this.user.lastName}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-name">
                            GTID
                        </div>
                        <div className="info-value">
                            {this.user.id}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-name">
                            Major
                        </div>
                        <div className="info-value">
                            {this.user.major.join(<br/>)}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-name">
                            Minor
                        </div>
                        <div className="info-value">
                            {this.user.minor ? this.user.minor : 'N/A'}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-name">
                            Classif.
                        </div>
                        <div className="info-value">
                            {this.user.classification}
                        </div>
                    </div>
                    <div className="info-row">
                        <div className="info-name">
                            GPA
                        </div>
                        <div className="info-name">
                            {this.user.gpa}
                        </div>
                    </div>
                    <Button className="more-info-button" to="/user">
                        More Info
                    </Button>
                </div>
            )
        }
    }
}

export default AvatarDropdown
