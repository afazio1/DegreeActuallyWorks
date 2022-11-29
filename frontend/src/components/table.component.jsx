import './table.styles.scss'
import React from 'react'

const CourseTable = props => {
    /* 
        keys        [String]    Required. Array of keys to retrieve column data from, 
                                listed in the order of appearance as in `columnNames`.
        data        [Object]    Required. Array of objects from which rows will retrieve
                                values from.
        rowStatus   [String]    Optional. Array of the same length as `data` with values of 'IP' (In-Progress),
                                'Satisfied', 'Still Needed', or an empty string. This will change the background
                                of corresponding rows. If no status is given, the background will be white.
        keyNameData [Any]       Optional. Data for any key may be also passed separately
                                with the name <keyName>Data. E.g., `semesterData` for key `semester`.
                                If a key is found in both `data` and <keyName>Data, the one in `data` will be used.
                                The order and length of data in this prop must be the same with `data`.
                                This is implemented so that we can keep transferred data at its "rawest" in frontend.
        columnNames [String]    Optional. Names that will be displayed as column headings. 
                                If not given, `keys` will be used as column headings.
    */
    const classNameOf = {
        'IP': 'row-in-progress',
        'Satisfied': 'row-satisfied',
        'Still Needed': 'row-needed',
        '': ''
    }  // Syntax sugar
    let { keys, rowStatus, data, columnNames } = props
    if (!columnNames) columnNames = keys

    return (
        <table cellSpacing={0}>
            <tr>
                {columnNames.map(colName => <th>{colName}</th>)}
            </tr>
            {data.map((obj, index) => {
                let className = rowStatus ? classNameOf[rowStatus[index]] : ''
                return (
                    <tr className={className}>
                        { keys.map(key => {
                            let value = null
                            if (!obj[key]) {
                                if (props[key+'Data']) {
                                    value = props[key+'Data'][index]
                                }
                            } else value = obj[key]
                            return <td>{value}</td>
                        }) }
                    </tr>
                )
            })}
        </table>
    )
}

export default CourseTable