import LanguageSelect from "./LanguageSelect";
import MaxWidthWrapper from "@/shared/MaxWidthWrapper";
import "../../styles/layout.scss"
import logo from "../../../../public/logo.svg"
import Image from "next/image";


const Header = () => {

  return (
    <header className="my-4">
        <MaxWidthWrapper>
            <div className="header-box">
                <Image src={logo} alt="logo" width={100} height={20} />
                <LanguageSelect/>
            </div>
        </MaxWidthWrapper>
    </header>
  );
}
export default Header;
