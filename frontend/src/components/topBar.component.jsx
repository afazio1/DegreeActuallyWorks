import './topBar.styles.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from './button.component'
import UserAvatar from './userAvatar.component'

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.user = props.user
    }

    render() {
        return (
            <div id="top-bar" {...this.props}>
                <div id="top-bar-wrapper">
                    <div id="top-bar-left">
                        <Link to='/'>
                            <span className="text-logo">Degree</span>
                            <span className="text-logo bold">Actually</span>
                            <span className="text-logo">Works!</span>
                        </Link>
                    </div>
                    <div id="top-bar-right">
                        <div id="user-info-wrapper">
                            <div id='welcome-message'>
                                <span>Welcome, </span>
                                <span className='bold'>{this.user.firstName} {this.user.lastName}</span>
                            </div>
                            <div id='gpa-preview'>
                                <span className='bold'>GPA: </span>
                                <span>{this.user.gpa}</span>
                            </div>
                        </div>
                        <div id='user-avatar-dropdown-wrapper'>
                            <UserAvatar avatarInitial={this.user.firstName[0]} style={{'margin-right': 0}}/>
                            <div id="avatar-dropdown">
                                <div className="user-avatar-row">
                                    <UserAvatar avatarInitial={this.user.firstName[0]} className="dropdown-menu-avatar"/>
                                    <div className='student-full-name bold'>
                                        {this.user.firstName}
                                        <br/>
                                        {this.user.lastName}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        GTID
                                    </div>
                                    <div className="info-value">
                                        {this.user.id}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        Major
                                    </div>
                                    <div className="info-value">
                                        {this.user.major.join(<br/>)}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        Minor
                                    </div>
                                    <div className="info-value">
                                        {this.user.minor.length ? this.user.minor.join(<br/>) : 'N/A'}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        Classif.
                                    </div>
                                    <div className="info-value">
                                        {this.user.classification}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        GPA
                                    </div>
                                    <div className="info-value">
                                        {this.user.gpa}
                                    </div>
                                </div>
                                <Button className="more-info-button" to="/user">
                                    More Info
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBar