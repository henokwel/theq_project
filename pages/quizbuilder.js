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
            console.log(target.name);

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

        // check if the prev has a Q and >=1 answer
        // else display error In Q or Answers
        // Trim() before save and create a new Q

        // start with finding the last Q in the array

        let lastQ =
            values[values.length - 1] === undefined
                ? values[0]
                : values[values.length - 1];

        // check for Q and Answers are not empty

        // console.error("No Q give");
        // =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        // if (
        //   lastQ.q !== "" &&
        //   lastQ.altA_q !== "" &&
        //   lastQ.altB_q !== "" &&
        //   lastQ.altC_q !== ""
        // ) {
        //   console.log("Q here");

        // setInputError({ id: lastQ.id, q: });
        // check for  >=1 Answers are selected

        // if (lastQ.alt_A || lastQ.alt_B || lastQ.alt_C) {
        //   values.push({
        //     id: uniqid(),
        //     q: "",
        //     alt_A: false,
        //     alt_B: false,
        //     alt_C: false,
        //     altA_q: "",
        //     altB_q: "",
        //     altC_q: "",
        //   });
        //   setQArr(values);
        // }

        // console.error("No Alt give");
        // }
        // =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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
        // else if (lastQ.altA_q === "") {
        //   console.error("NO Alts given");
        //   console.log("Error ALt");
        //   return;
        // } else if (lastQ.altB_q === "") {
        //   console.error("NO Alts given");
        //   console.log("Error ALt");
        //   return;
        // } else if (lastQ.altC_q === "") {
        //   console.error("NO Alts given");
        //   console.log("Error ALt");
        //   return;
        // }
        else {
            console.log("Last Else");

            if (lastQ.answer) {
                values.push({
                    id: uniqid(),
                    q: "",
                    alt_A: false,
                    alt_B: false,
                    alt_C: false,
                    altA_q: "",
                    altB_q: "",
                    altC_q: "",
                });
                setInputError({ id: lastQ.id, q: false, alt: false, answer: false });
                setQArr(values);
                return
            } else {
                setInputError({ id: lastQ.id, q: false, alt: false, answer: true });

            }



        }
    };




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
                                    id="outlined-multiline-flexible"
                                    name="q_"
                                    value={q.q}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder="Enter your question"
                                    multiline
                                    fullWidth
                                    error={inputError.q}
                                    maxRows={4}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Q :</InputAdornment>
                                    }}
                                />

                                <Box sx={{ display: "flex", marginTop: 5 }}>


                                    {/* Multiple choice */}

                                    <Stack spacing={1} sx={{ minWidth: "80%" }}>

                                        <TextField
                                            id="outlined-multiline-flexible"
                                            placeholder="Enter choose A"
                                            name="altA"
                                            error={inputError.alt}
                                            value={q.altA}
                                            onChange={e => handleInputChange(index, e)}
                                        />
                                        <TextField
                                            id="outlined"
                                            placeholder="Enter choose B "
                                            name="altB"
                                            error={inputError.alt}
                                            value={q.altB}
                                            onChange={e => handleInputChange(index, e)}
                                        />

                                        <TextField
                                            id="outlined"
                                            placeholder="Enter choose C "
                                            name="altC"
                                            error={inputError.alt}
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
