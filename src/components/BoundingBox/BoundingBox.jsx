import { useState, useEffect } from 'react';
import { getBoundingBox } from '../../utils/utils';

const BoundingBox = ({ faceObj }) => {
    const [box, setBox] = useState({});

    useEffect(() => {
        const dimensions = getBoundingBox(faceObj);
        setBox(dimensions);
    }, [faceObj]);

    return ( 
        <div
            style={{
                ...bounding_box,
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
            }}
        /> 
     );
}

const bounding_box = {
    position: "absolute",
    boxShadow: "0 0 0 3px #149df2 inset",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    cursor: "pointer"
}
 
export default BoundingBox;