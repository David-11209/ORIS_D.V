import "./PageHeaderStyle.css";
import InputComponent from "../InputComponent/Input";
import myImage from "../../../../assets/pokeball.png"

const PageHeader = ({title, searchValue, onChangeSearch, onSearch})  => {
  return (
    <div className="HeaderContainer">
      {title && <p className="Title">{title}</p>}
      <InputComponent
        value={searchValue}
        onChangeValue={onChangeSearch}
        onSubmit={onSearch}
      />
      <img className = "Pokeball" src={myImage} alt="pokeball"/>
    </div>
  )
}

export default PageHeader;