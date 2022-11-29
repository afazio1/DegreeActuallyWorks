import './userPage.styles.scss'

function UserPage(props) {

    if (props.user) {props.user.coursesTaken.map( (element) => console.log("A course " + element));}

    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <>
        <h1>Courses</h1>
        <div className="courses-list">
        {props.user &&
        <table>
        <tbody>
        {props.user.coursesTaken.map( (element, i) => (
        <tr>
            <td key={i + 1}>{i + 1}.</td>
            <td key={-i - 1}>{arr.map( (letter) => <>{element[letter]}</>)}
            </td>
        </tr>
        ))}
        </tbody>
        </table>
        }
        </div> {/*end courses*/}
        </>
    );
}
export default UserPage;
