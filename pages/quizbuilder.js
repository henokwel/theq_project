import React, { useState } from 'react'
import {
    Container, CssBaseline, Box, TextField, InputAdornment,
    Radio, FormControl, FormControlLabel, RadioGroup, Stack,
    Fab,
    ToggleButton, ToggleButtonGroup

} from '@mui/material'

import { Add, Delete } from '@mui/icons-material';

const uniqid = require("uniqid");


const Quizbuilder = () => {
    const [alignment, setAlignment] = useState('left');
    const [qArr, setQArr] = useState([
        {
            id: uniqid(),
            q: "",
            answer: null,
            altA: "",
            altB: "",
            altC: "",
        },
    ]);
    const [inputError, setInputError] = useState({
        id: null,
        q: false,
        alt: false,
        answer: false,
    });

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };


    const handleInputChange = (
        index,
        event
    ) => {
        const values = [...qArr];
        const target = event.target

        // change to Switch

        if (target.name === "q_" && target.value !== " ") {
            values[index].q = target.value;
        } else if (target.name === "altA" && target.value !== " ") {
            values[index].altA = target.value;
        } else if (target.name === "altB" && target.value !== " ") {
            values[index].altB = target.value;
        } else if (target.name === "altC" && target.value !== " ") {
            values[index].altC = target.value;

        }
        else if (target.name === "answer") {
            values[index].answer = target.value;
        }
        // else {
        //     values[index].answer = target.value;
        // }


        setQArr(values);
    };

    const handleAddFields = () => {
        const values = [...qArr];

        // Add workingOnCurrently to make sure user don't go back and changeSometing!
        // With better UI you can toggle between Q and make sure to check that everything is Filled!

        // A better way to handle nested Logic
        // => https://www.freecodecamp.org/news/so-youre-in-if-else-hell-here-s-how-to-get-out-of-it-fc6407fec0e/

        // start with finding the last Q in the array

        let lastQ =
            values[values.length - 1] === undefined
                ? values[0]
                : values[values.length - 1];

        // Q Check
        if (lastQ.q === "") {
            console.error("No Q give");
            setInputError({ id: lastQ.id, q: true, alt: false, answer: false });
            // check for  alternative, all must be given
        } else if (!lastQ.altA || !lastQ.altB || !lastQ.altC) {
            console.error("NO Alts given");
            // console.log("Error ALt");
            setInputError({ id: lastQ.id, q: false, alt: true, answer: false });
        }

        else {
            console.log("Last Else");

            if (lastQ.answer) {
                values.push({
                    id: uniqid(),
                    q: "",
                    answer: null,
                    altA: "",
                    altB: "",
                    altC: "",
                });
                setInputError({ id: lastQ.id, q: false, alt: false, answer: false });
                setQArr(values);
                // return
            } else {
                setInputError({ id: lastQ.id, q: false, alt: false, answer: true });
            }
        }
        console.log(qArr);

    };



    const handelFinish = () => {

        // Make sure the last Q in array isn't empty. 
        // If it's remove it!


    }


    const handleRemoveFields = (index) => {
        const values = [...qArr];
        values.splice(index, 1);
        setQArr(values);
    };


    // console.log(qArr);

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
                        console.log(index);
                        return (

                            <Box sx={{ m: 2 }} key={`${q}~${index}`} >

                                {/* Question Input */}
                                <div style={{ display: "flex" }}>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        name="q_"
                                        value={q.q}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="Enter your question"
                                        multiline
                                        fullWidth
                                        error={q.id === inputError.id ? inputError.q : false}
                                        maxRows={4}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Q :</InputAdornment>
                                        }}
                                    />


                                    {/* <ToggleButton sx={bgcolor} value="left" aria-label="left aligned">
                                        <h3 style={{ margin: 0}}>X</h3>
                                    </ToggleButton> */}
                                    <Fab sx={{ bgcolor: "#f77", display: qArr.length === 1 ? "none" : "inline" }} variant='extended' aria-label="add" onClick={() => handleRemoveFields(index)} >
                                        <Delete />
                                    </Fab>
                                </div>


                                <Box sx={{ display: "flex", marginTop: 5 }}>


                                    {/* Multiple choice */}

                                    <Stack spacing={1} sx={{ minWidth: "80%" }}>

                                        <TextField
                                            id="outlined-multiline-flexible"
                                            placeholder="Enter choose A"
                                            name="altA"
                                            error={q.id === inputError.id ? inputError.alt : false}
                                            value={q.altA}
                                            onChange={e => handleInputChange(index, e)}
                                        />
                                        <TextField
                                            id="outlined"
                                            placeholder="Enter choose B "
                                            name="altB"
                                            error={q.id === inputError.id ? inputError.alt : false}
                                            value={q.altB}
                                            onChange={e => handleInputChange(index, e)}
                                        />

                                        <TextField
                                            id="outlined"
                                            placeholder="Enter choose C "
                                            name="altC"
                                            error={q.id === inputError.id ? inputError.alt : false}
                                            value={q.altC}
                                            onChange={e => handleInputChange(index, e)}
                                        />
                                    </Stack>



                                    {/* Answer */}
                                    <FormControl component="fieldset" error={true}>
                                        <RadioGroup
                                            aria-label="select correct answer"
                                            name="answer"
                                            value={q.answer ?? null}
                                            onChange={e => handleInputChange(index, e)}
                                            sx={{ display: "flex", minHeight: "100%", justifyContent: "space-around", marginLeft: 2 }}>

                                            <FormControlLabel value="A" control={<Radio
                                                sx={{ color: `${q.id === inputError.id ? inputError.answer ? 'red' : '' : ''}`, '&.Mui-checked': { color: "green" }, }} />}
                                                label="A" />


                                            <FormControlLabel value="B" control={<Radio
                                                sx={{ color: `${q.id === inputError.id ? inputError.answer ? 'red' : '' : ''}`, '&.Mui-checked': { color: "green" }, }} />}
                                                label="B" />

                                            <FormControlLabel value="C" control={<Radio
                                                sx={{ color: `${q.id === inputError.id ? inputError.answer ? 'red' : '' : ''}`, '&.Mui-checked': { color: "green" }, }} />}
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
                    <Fab color="primary" aria-label="add" onClick={handleAddFields} >
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
