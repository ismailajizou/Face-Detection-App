import { ModalBody} from '@chakra-ui/react';
import React from 'react';
import AvatarEditor from "react-avatar-editor";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors'
import { setCurrentUser } from "../../redux/user/user-actions";
import { apiURL } from "../../utils/utils"
import ZoomSlider from './ZoomSlider';
import UploadButton from './UploadInput';
import ModalFtr from './ModalFtr';
import Toast from "../Toast/Toast";
import axios from 'axios';

class AvatarChanger extends React.Component {

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
    }
    handleNewImage = e => this.setState({ image: e.target.files[0] });
    
    handleScale = value => this.setState({ scale: parseFloat(value) });
    
    handlePositionChange = position => this.setState({ position });

    setEditorRef = (editor) => (this.editor = editor);

    onClickSave = async () => {
        const { id } = this.props.currentUser;
        const {dispatch, currentUser, onClose} = this.props;
        if (this.editor) {
            const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL();
            try{
                const canvas = await fetch(canvasScaled);
                const blob = await canvas.blob();
                const fd = new FormData();
                fd.append('image', blob);
                try {
                    const { data } = await axios.post(`${apiURL}/changeProfilePic/${id}`, fd);

                    dispatch(setCurrentUser({...currentUser, avatar: data.avatar }));
                    Toast('Success', 'success', 'Profile Changed successfully');
                    onClose();
                } catch (err) {
                    Toast('Error', 'error', err.response.data.msg);
                }
            } catch (err) {
                Toast('Error', 'error', 'error while getting image');
            }

        } else {
            Toast('Warning', 'warning','no file to upload !!!');
        }
    }

    render() { 
        const { scale, width, height, position, rotate, borderRadius, image, allowZoomOut } = this.state;
        return ( 
            <>
                <ModalBody display='flex' flexDirection='column'>
                    {
                        image ?
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
                        :
                        null
                    }
                    <UploadButton handleNewImage={this.handleNewImage} />
                </ModalBody>
                <ModalFtr onClickSave={this.onClickSave} />
            </>
         );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
 
export default connect(mapStateToProps)(AvatarChanger);


// fetch(canvasScaled)
            // .then(res => res.blob())
            // .then(async blob => {
            //     const fd = new FormData();
            //     fd.append('image', blob, 'avatar');
            //     try {
            //         const { avatar } = await axios.post(`${apiURL}/changeProfilePic/${id}`, fd);
            //         dispatch(setCurrentUser({...currentUser, avatar}));
            //         Toast('Success', 'success', 'Profile Changed successfully');
            //         onClose();
            //     } catch (err) {
            //         Toast('Error', 'error', err.response.data.msg)
            //     }
            // })
            // .catch(err => Toast('Error', 'error', 'error while getting image'));