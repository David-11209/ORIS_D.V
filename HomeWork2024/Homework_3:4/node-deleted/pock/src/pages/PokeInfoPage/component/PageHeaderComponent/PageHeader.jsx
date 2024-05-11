import "./PageHeaderStyle.css";
import myImage from "../../../../assets/pokeball.png"
import backImage from "../../../../assets/left-arrow.png"

const PageHeader = ()  => {
  return (
    <div className="HeaderContainer2">
        <a className="backButton" href="/">
            <img src={backImage} alt="go back"></img>
        </a>
      <img className = "Pokeball2" src={myImage} alt="pokeball"/>
    </div>
  )
}

export default PageHeader;