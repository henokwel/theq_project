import {
    Container, CssBaseline, Box, TextField, InputAdornment,
    Radio, FormControl, FormLabel, FormControlLabel, RadioGroup, Stack,
    useMediaQuery, useTheme, Fab,
    ToggleButton, ToggleButtonGroup, Button

} from '@mui/material'

import { Add } from '@mui/icons-material';

import React from 'react'

const Quizbuilder = () => {

    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">

                <Box sx={{ m: 2 }}>
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="left" aria-label="left aligned">
                            <h3>Q1</h3>
                        </ToggleButton>yarn add @mui/icons-material
                        <ToggleButton value="center" aria-label="centered">
                            <h3>Q1</h3>
                        </ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned">
                            <h3>Q1</h3>
                        </ToggleButton>
                        <ToggleButton value="justify" aria-label="justified" disabled>
                            <h3>Q1</h3>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box sx={{ m: 2 }} >
                    <TextField
                        id="outlined-multiline-flexible"
                        placeholder="Enter your question"
                        multiline
                        fullWidth
                        maxRows={4}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Q :</InputAdornment>
                        }}

                    // value={value}
                    // onChange={handleChange}
                    />

                    <Box sx={{ display: "flex", marginTop: 5 }}>



                        {/* Multiple choice */}
                        <Stack spacing={1} sx={{ minWidth: "80%" }}>

                            <TextField
                                id="outlined-multiline-flexible"
                                placeholder="Enter choose A "
                                fullWidth

                            />
                            <TextField
                                id="outlined"
                                placeholder="Enter choose B "
                            />

                            <TextField
                                id="outlined"
                                placeholder="Enter choose C "
                            />

                        </Stack>

                        <FormControl component="fieldset">
                            {/* <FormLabel component="legend">Answer</FormLabel> */}
                            <RadioGroup
                                aria-label="select correct answer"
                                // defaultValue="female"
                                name="answer"
                                sx={{
                                    display: "flex", minHeight: "100%", justifyContent: "space-around", marginLeft: 2,




                                }}

                            >
                                <FormControlLabel value="A" control={<Radio
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "green",
                                        },
                                    }}
                                />} label="A" />
                                <FormControlLabel value="B" control={<Radio
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "green",
                                        },
                                    }}


                                />} label="B" />
                                <FormControlLabel value="C" control={<Radio
                                    sx={{
                                        '&.Mui-checked': {
                                            color: "green",
                                        },
                                    }}
                                />} label="C" />
                            </RadioGroup>
                        </FormControl>
                    </Box>


                    <Stack sx={{ marginTop: 6 }} direction="row" spacing={4} justifyContent="space-between" >
                        <Fab color="primary" aria-label="add" onClick={() => console.log("Add")} >
                            <Add />
                        </Fab>

                        <Fab aria-label="add" variant='extended' onClick={() => console.log("Add")} >
                            Finish
                        </Fab>
                    </Stack>

                </Box>


            </Container>
        </>
    )
}

export default Quizbuilder
