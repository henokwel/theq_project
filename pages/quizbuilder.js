import React, { useState } from 'react'
import {
    Container, CssBaseline, Box, TextField, InputAdornment,
    Radio, FormControl, FormLabel, FormControlLabel, RadioGroup, Stack,
    useMediaQuery, useTheme, Fab,
    ToggleButton, ToggleButtonGroup, Button

} from '@mui/material'

import { Add } from '@mui/icons-material';
const uniqid = require("uniqid");


const Quizbuilder = () => {
    const [alignment, setAlignment] = useState('left');
    const [qArr, setQArr] = useState([
        {
            id: uniqid(),
            q: "A",
            answer: null,
            altA_q: "",
            altB_q: "",
            altC_q: "",
        },
    ]);


    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    const handleInputChange = (
        index,
        event
    ) => {
        const values = [...qArr];
        const target = event.target


        // change to Switch

        if (target.name === "q_" && target.value !== " ") {
            console.log(target.name);

            values[index].q = target.value;
        } else if (target.name === "altA_q" && target.value !== " ") {
            values[index].altA_q = target.value;
        } else if (target.name === "altB_q" && target.value !== " ") {
            values[index].altB_q = target.value;
        } else if (target.name === "altC_q" && target.value !== " ") {
            values[index].altC_q = target.value;

        }
        else if (target.name === "answer") {
            values[index].answer = target.value;
        }
        // else {
        //     values[index].answer = target.value;
        // }


        setQArr(values);
    };

    console.log(qArr);



    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">

                {/* Quiz Array*/}
                <Box sx={{ m: 2, }}>

                    <ToggleButtonGroup
                        value={alignment}

                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        size="large"
                    >
                        <ToggleButton value="left" aria-label="left aligned">
                            <h3 style={{ margin: 0 }}>Q1</h3>
                        </ToggleButton>yarn add @mui/icons-material
                        <ToggleButton value="center" aria-label="centered">
                            <h3 style={{ margin: 0 }}>Q1</h3>
                        </ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned">
                            <h3 style={{ margin: 0 }}>Q1</h3>
                        </ToggleButton>
                        <ToggleButton value="justify" aria-label="justified" disabled>
                            <h3 style={{ margin: 0 }}>Q1</h3>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>



                {
                    qArr.map((q, index) => {

                        return (

                            <Box sx={{ m: 2 }} key={`${q}~${index}`} >

                                {/* Question Input */}
                                
                                <TextField
                                    id="outlined-multiline-flexible q_"
                                    name="q_"

                                    onChange={(e) => handleInputChange(index, e)}
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



                                    {/* Answer */}
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="select correct answer"
                                            name="answer"
                                            value={q.answer ?? null}
                                            onChange={e => handleInputChange(index, e)}
                                            sx={{ display: "flex", minHeight: "100%", justifyContent: "space-around", marginLeft: 2 }}>

                                            <FormControlLabel value="A" control={<Radio
                                                sx={{ '&.Mui-checked': { color: "green" }, }} />}
                                                label="A" />


                                            <FormControlLabel value="B" control={<Radio
                                                sx={{ '&.Mui-checked': { color: "green" }, }} />}
                                                label="B" />

                                            <FormControlLabel value="C" control={<Radio
                                                sx={{ '&.Mui-checked': { color: "green" }, }} />}
                                                label="C" />

                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                            </Box>

                        )
                    })
                }





                {/* Action buttons for Add & Finish */}

                < Stack sx={{ marginTop: 6 }} direction="row" spacing={4} justifyContent="space-between" >
                    <Fab color="primary" aria-label="add" onClick={() => console.log("Add")} >
                        <Add />
                    </Fab>

                    <Fab aria-label="add" variant='extended' onClick={() => console.log("Add")} >
                        Finish
                    </Fab>
                </Stack>


            </Container>
        </>
    )
}

export default Quizbuilder
