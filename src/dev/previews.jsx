import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import RegisterhtmlForm from "../components/auth/RegisterForm";
import Register from "../components/auth/RegisterForm";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SignInhtmlForm">
                <RegisterhtmlForm/>
            </ComponentPreview>
            <ComponentPreview path="/Register">
                <Register/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews
