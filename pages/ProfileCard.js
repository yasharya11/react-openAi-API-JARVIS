// v1
// function ProfileCard(props) {
//     return (
//         <div>
//             <p>Image: {props.imageUrl}</p>
//             <p>Assistant Name: {props.assistantName}</p>
//         </div>
//     );
// }

// export default ProfileCard;




// v2
// function ProfileCard(props) {
//     const {assistantName, imageUrl} = props;

//     return (
//         <div>
//             <p>Image: {imageUrl}</p>
//             <p>Assistant Name: {assistantName}</p>
//         </div>
//     );
// }

// export default ProfileCard;




// v3
// function ProfileCard({assistantName, imageUrl}) {
//     return (
//         <div>
//             <p>Image: {imageUrl}</p>
//             <p>Assistant Name: {assistantName}</p>
//         </div>
//     );
// }

// export default ProfileCard;




//latest and greatest
function ProfileCard({image, title, handle}) {
    return (
        <div className="col-4">
            <img src={image} alt={title}/>
            <p className="mt-4">Assistant Name: {title}</p>
            <p>Handle: {handle}</p>
        </div>
    );
}

export default ProfileCard;