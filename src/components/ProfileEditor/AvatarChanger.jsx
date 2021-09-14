import { ModalBody} from '@chakra-ui/react';
import React from 'react';
import AvatarEditor from "react-avatar-editor";
import { apiURL } from "../../utils/utils"
import ZoomSlider from './ZoomSlider';
import UploadButton from './UploadInput';
import ModalFtr from './ModalFtr';
import Toast from "../Toast/Toast";
import axios from 'axios';
import { setItem, UserContext } from '../../context/userContext';

class AvatarChanger extends React.Component {
    static contextType = UserContext;
    state = {
        image: "",
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 200,
        height: 200,
        loading: false
    }
    handleNewImage = e => this.setState({ image: e.target.files[0] });
    
    handleScale = value => this.setState({ scale: parseFloat(value) });
    
    handlePositionChange = position => this.setState({ position });

    setEditorRef = (editor) => (this.editor = editor);

    onClickSave = async () => {
        const { onClose } = this.props;
        const {currentUser, setCurrentUser} = this.context;
        if (this.editor) {
            this.setState({loading: true});
            const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL();
            try{
                const canvas = await fetch(canvasScaled);
                const blob = await canvas.blob();
                const fd = new FormData();
                fd.append('image', blob);
                try {
                    const { data } = await axios.post(`${apiURL}/changeProfilePic/${currentUser.id}`, fd);
                    const user = {...currentUser, avatar: data.avatar};
                    setCurrentUser(user);
                    setItem('user', user);
                    Toast('Success', 'success', 'Profile Changed successfully');
                    onClose(); 
                } catch (err) {
                    Toast('Error', 'error', err.response.data.msg);
                }
            } catch (err) {
                Toast('Error', 'error', 'error while getting image');
            }
            this.setState({loading: false});
        } else {
            Toast('Warning', 'warning','no file to upload !!!');
        }
    }

    render() { 
        const { scale, width, height, position, rotate, borderRadius, image, allowZoomOut, loading } = this.state;
        return ( 
            <>
                <ModalBody display='flex' flexDirection='column'>
                    {
                        image &&
                        <>
                            <AvatarEditor
                                ref={this.setEditorRef}
                                scale={parseFloat(scale)}
                                width={width}
                                height={height}
                                position={position}
                                onPositionChange={this.handlePositionChange}
                                rotate={parseFloat(rotate)}
                                borderRadius={width / (100 / borderRadius)}
                                image={image}
                            />
                            <ZoomSlider allowZoomOut={allowZoomOut} handleScale={this.handleScale} />
                        </>
                    }
                    <UploadButton handleNewImage={this.handleNewImage} />
                </ModalBody>
                <ModalFtr onClickSave={this.onClickSave} loading={loading} />
            </>
         );
    }
}

 
export default AvatarChanger;