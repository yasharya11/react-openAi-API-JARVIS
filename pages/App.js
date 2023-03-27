import ProfileCard from "./ProfileCard";
import AlexaImage from "./images/alexa.png";
import CortanaImage from "./images/cortana.png";
import SiriImage from "./images/siri.png";

function App() {
    return (
        <div className="container fluid">
            <div className="row text-center">
                <div className="display-1 mb-5">Digital Personal Assistant</div>
                
                <ProfileCard image={AlexaImage} title='Alexa' handle='@AlexaImage'/>
                <ProfileCard image={CortanaImage} title='Cortana' handle='@CortanaImage'/>
                <ProfileCard image={SiriImage} title='Siri' handle='@SiriImage'/>
            </div>
        </div>
    );
}

export default App;