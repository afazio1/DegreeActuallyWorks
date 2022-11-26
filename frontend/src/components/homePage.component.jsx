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
                <h1 ref={this.state.testRef}>TestH1</h1>
            </>
        )
    }
}

export default HomePage
