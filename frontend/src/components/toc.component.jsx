import './toc.styles.scss'
import React from 'react'

export default class TableOfContents extends React.Component {
    /*
        ToC items are passed in as children. 
        Their element types will be ignored while class/id/custom styles retained.
        A `toRef` attribute must be present in every item;
        It is a Ref to the element that clicking this link will scroll the page to.

        Example code:
        ```
        <TableOfContents title="Table of Contents">
            <p toRef={someRef}>Go to first element</p>
            <li toRef={someOtherRef}>Go to second element</p>
            <span toRef={topRef}>Go to top</p>
        </TableOfContents>
        ```
    */
    constructor(props) {
        super(props)

        // Normalize cases where theres: 1) No children, 2) One child, or 3) Many children
        var childrenToWorkWith = !props.children ? [] : (props.children instanceof Object ? [props.children] : props.children)
        
        this.state = {
            children: childrenToWorkWith.map((element, index) => {
                let elementRef = element.props.toRef
                let elementProps = {...element.props}
                delete elementProps.toRef
                return <li key={index} onClick={() => elementRef.current.scrollIntoView()} {...elementProps}>{element.props.children}</li>
            })
        }
    }

    render() {
        return (
            <div id="table-of-contents-wrapper">
                <div id="table-of-contents">
                    <p id="table-of-contents-title">{this.props.title}</p>
                    <ul>
                        {this.state.children}
                    </ul>
                </div>
            </div>
        )
    }
}