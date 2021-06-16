import { Box, Slider, Text, SliderThumb, SliderTrack, SliderFilledTrack } from '@chakra-ui/react'

const ZoomSlider = ({ handleScale, allowZoomOut}) => {
    return ( 
        <Box pt={3}>
            <Text>Zoom:</Text>
            <Slider
                aria-label="slider-ex-1"
                name='scale'
                onChange={(v) => handleScale(v)}
                min={allowZoomOut ? 0.1 : 1}
                max={2}
                step={0.01}
                defaultValue={1}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb bg='blue.500' />
            </Slider>
        </Box>
     );
}
 
export default ZoomSlider;