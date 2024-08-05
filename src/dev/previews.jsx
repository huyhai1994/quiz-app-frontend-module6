import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import RegisterhtmlForm from "../pages/register/Register";
import Register from "../pages/register/Register";

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
