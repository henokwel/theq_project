import {
    Container, CssBaseline, Box, TextField, InputAdornment,
    Radio, FormControl, FormLabel, FormControlLabel, RadioGroup, Stack,
    useMediaQuery, useTheme

} from '@mui/material'

import React from 'react'

const Quizbuilder = () => {


    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ m: 2, bgcolor: "yellow" }} >
                    <TextField
                        id="outlined-multiline-flexible"
                        // label="Multiline"
                        multiline
                        fullWidth
                        maxRows={4}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Q :</InputAdornment>
                        }}

                    // value={value}
                    // onChange={handleChange}
                    />

                    <Box sx={{ display: "flex", bgcolor: "brown", marginTop: 5 }}>

                        <Stack spacing={2} sx={{ bgcolor: "green", minWidth: "80%" }}>

                            <TextField
                                id="outlined-multiline-flexible"
                            // label="Multiline"
                            />
                            <TextField
                                id="outlined"
                            // label="Multiline"
                            />

                            <TextField
                                id="outlined"
                            // label="Multiline"
                            />

                        </Stack>

                        <FormControl component="fieldset">
                            {/* <FormLabel component="legend">Answer</FormLabel> */}
                            <RadioGroup
                                aria-label="select correct answer"
                                // defaultValue="female"
                                name="answer"
                                sx={{ display: "flex", minHeight: "100%", justifyContent: "space-around", marginLeft: 2 }}

                            >
                                <FormControlLabel value="A" control={<Radio />} label="A" />
                                <FormControlLabel value="B" control={<Radio />} label="B" />
                                <FormControlLabel value="C" control={<Radio />} label="C" />
                            </RadioGroup>
                        </FormControl>

                    </Box>


                </Box>
            </Container>
        </>
    )
}

export default Quizbuilder
