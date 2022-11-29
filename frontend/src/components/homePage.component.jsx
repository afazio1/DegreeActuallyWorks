import TableOfContents from './toc.component'
import './homePage.styles.scss'

import React, { createRef } from 'react'

class HomePage extends React.Component {
    state = {
        testRef: createRef()
    }
    render() {
        return (
            <>
                <TableOfContents title="Table of Contents">
                    <p toRef={this.state.testRef}>Click me</p>
                </TableOfContents>
                <h1 className="main-title" ref={this.state.testRef}>Degree<em>Actually</em>Works!</h1>
                <p>Where Georgia Tech students gather to view their classes and degree requirements!</p>

            </>
        )
    }
}

export default HomePage
