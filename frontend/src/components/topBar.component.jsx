import './topBar.styles.scss'
import React from 'react'
import Button from './button.component'
import { Link } from 'react-router-dom'
import UserAvatar from './userAvatar.component'

export default function TopBar(props) {
    const { user } = props;

    console.log(user)

    return (
        <div id="top-bar" {...props}>
            { user &&
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
                                <span className='bold'>{user.firstName} {user.lastName}</span>
                            </div>
                            <div id='gpa-preview'>
                                <span className='bold'>GPA: </span>
                                <span>{user.gpa.toFixed(2)}</span>
                            </div>
                        </div>
                        <div id='user-avatar-dropdown-wrapper'>
                            <UserAvatar avatarInitial={user.firstName[0]} style={{'marginRight': 0}}/>
                            <div id="avatar-dropdown">
                                <div className="user-avatar-row">
                                    <UserAvatar avatarInitial={user.firstName[0]} className="dropdown-menu-avatar"/>
                                    <div className='student-full-name bold'>
                                        {user.firstName}
                                        <br/>
                                        {user.lastName}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        GTID
                                    </div>
                                    <div className="info-value">
                                        {user._id}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        Major
                                    </div>
                                    <div className="info-value">
                                        {user.major.join(<br/>)}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        Minor
                                    </div>
                                    <div className="info-value">
                                        {user.minor && user.minor.length ? user.minor.join(<br/>) : 'N/A'}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        Classif.
                                    </div>
                                    <div className="info-value">
                                        {user.classification}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-name bold">
                                        GPA
                                    </div>
                                    <div className="info-value">
                                        {user.gpa}
                                    </div>
                                </div>
                                <Button className="more-info-button" to="/user">
                                    More Info
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
    )
}

// class TopBar extends React.Component {
//     constructor(props) {
//         super(props)
//         this.user = this.props.user
//     }

//     render() {
//         return (
//             <div id="top-bar" {...this.props}>
//             { this.user &&
            
//                 <div id="top-bar-wrapper">
//                     <div id="top-bar-left">
//                         <Link to='/'>
//                             <span className="text-logo">Degree</span>
//                             <span className="text-logo bold">Actually</span>
//                             <span className="text-logo">Works!</span>
//                         </Link>
//                     </div>
//                     <div id="top-bar-right">
//                         <div id="user-info-wrapper">
//                             <div id='welcome-message'>
//                                 <span>Welcome, </span>
//                                 <span className='bold'>{this.user.firstName} {this.user.lastName}</span>
//                             </div>
//                             <div id='gpa-preview'>
//                                 <span className='bold'>GPA: </span>
//                                 <span>{this.user.gpa}</span>
//                             </div>
//                         </div>
//                         <div id='user-avatar-dropdown-wrapper'>
//                             <UserAvatar avatarInitial={this.user.firstName.charAt(0)} style={{'marginRight': 0}}/>
//                             <div id="avatar-dropdown">
//                                 <div className="user-avatar-row">
//                                     <UserAvatar avatarInitial={this.user.firstName[0]} className="dropdown-menu-avatar"/>
//                                     <div className='student-full-name bold'>
//                                         {this.user.firstName}
//                                         <br/>
//                                         {this.user.lastName}
//                                     </div>
//                                 </div>
//                                 <div className="info-row">
//                                     <div className="info-name bold">
//                                         GTID
//                                     </div>
//                                     <div className="info-value">
//                                         {this.user.id}
//                                     </div>
//                                 </div>
//                                 <div className="info-row">
//                                     <div className="info-name bold">
//                                         Major
//                                     </div>
//                                     <div className="info-value">
//                                         {this.user.major}
//                                     </div>
//                                 </div>
//                                 <div className="info-row">
//                                     <div className="info-name bold">
//                                         Minor
//                                     </div>
//                                     <div className="info-value">
//                                         {this.user && this.user.minor && this.user.minor.length ? this.user.minor : 'N/A'}
//                                     </div>
//                                 </div>
//                                 <div className="info-row">
//                                     <div className="info-name bold">
//                                         Classif.
//                                     </div>
//                                     <div className="info-value">
//                                         {this.user.classification}
//                                     </div>
//                                 </div>
//                                 <div className="info-row">
//                                     <div className="info-name bold">
//                                         GPA
//                                     </div>
//                                     <div className="info-value">
//                                         {this.user && this.user.gpa}
//                                     </div>
//                                 </div>
//                                 <Button className="more-info-button" to="/user">
//                                     More Info
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             }
//             </div>
//         )
//     }
// }

// export default TopBar
