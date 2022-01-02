import React, { useContext, useState } from 'react'
import {
    ToggleButton, ToggleButtonGroup, Breadcrumbs, Link as M_Link, Typography
} from '@mui/material'


import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import Fab from '@mui/material/Fab'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRouter } from 'next/router'


import { Add, Delete, Title } from '@mui/icons-material';
import NextLink from 'next/link';
import { QuizUpdateContext } from '../src/context';

const uniqid = require("uniqid");


const Quizbuilder = () => {
    const [currentQ, setCurrentQ] = useState("title")

    const [qInfo, setQInfo] = useState({
        id: uniqid(),
        title: "",
        desc: "",
        createdDate: "",
        deadline: "",
        participants: { goal: 100, current: "" }
    })
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

    const router = useRouter()

    const _quizContextUpdate = useContext(QuizUpdateContext)

    const handleAlignment = (event, newAlignment) => {
        console.log(newAlignment);
        setCurrentQ(newAlignment)
        // setAlignment(newAlignment);
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


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handelFinish = async () => {

        // Make sure the last Q in array isn't empty. 
        // If it's remove it!

        // dispatch quiz arr 
        _quizContextUpdate({ type: "add", payload: qArr })
        // redirect to dashbord



    }


    const handleRemoveFields = (index) => {
        const values = [...qArr];
        values.splice(index, 1);
        setQArr(values);
    };

    const handleClick = (event) => {
        event.preventDefault();
        router.push("/")
        console.log(qArr);
        // Check for unfinished quiz and prompt if the user want to discard or draft it,
        // before redirect to dashbord

        // if (qArr.length >= 2) {

        // handleClickOpen()
        // }

        console.info('You clicked a breadcrumb.');
    }


 
    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">


                <div role="presentation" onClick={handleClick} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <NextLink href="" passHref>

                            <M_Link underline="hover" color="inherit" >
                                Dashbord
                            </M_Link>
                        </NextLink>

                        <Typography color="text.primary">Breadcrumbs</Typography>

                    </Breadcrumbs>
                </div>
                {/* Quiz Array*/}
                <Box sx={{ m: 2, }}>

                    <ToggleButtonGroup
                        value={currentQ}

                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        size="large"
                    >
                        <ToggleButton value="title" aria-label="left aligned">
                            {/* <h3 style={{ margin: 0 }}> */}
                            <Title />
                            {/* </h3> */}
                        </ToggleButton>

                        {
                            qArr.map(item => <ToggleButton disabled={qInfo.title === ""} key={item.id} value={item.id} aria-label="centered">
                                <h3 style={{ margin: 0 }}>Q1</h3>
                            </ToggleButton>

                            )
                        }


                    </ToggleButtonGroup>
                </Box>




                {/* Alert before exit without save */}
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open alert dialog
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {" If you leave now, your quiz will not be saved!"}
                        </DialogTitle>
                        {/* <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                If you leave now, your quiz will not be saved!
                            </DialogContentText>
                        </DialogContent> */}
                        <DialogActions>
                            <Button onClick={handleClose}>Stay</Button>
                            <Button onClick={handleClose} autoFocus>
                                Leave
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>




                {/* 
                id: uniqid(),
        title: "",
        desc: "",
        createdDate: "",
        deadline: "",
        participants: { goal: 100, current: "" }
                { */}

                {

                    <Box sx={{ m: 2, display: currentQ === "title" ? "block" : "none" }} key={`${qInfo.id}`}  >

                        {/* Quiz Title */}
                        <div style={{ display: "flex" }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                name="title"
                                value={qInfo.title}
                                // onChange={(e) => handleInputChange(null, e)}
                                placeholder="Quiz Title"
                                multiline
                                fullWidth
                                required
                                // error={qInfo.id === inputError.id ? inputError.q : false}
                                maxRows={4}

                            />
                        </div>


                        <Box sx={{ display: "flex", flexDirection: "column", marginTop: 5 }}>

                            <TextField
                                id="outlined-multiline-flexible"
                                name="title"
                                value={qInfo.title}
                                // onChange={(e) => handleInputChange(index, e)}
                                placeholder="Short description"
                                multiline
                                fullWidth
                                // error={qInfo.id === inputError.id ? inputError.q : false}
                                minRows={5}
                            />

                            <TextField
                                id="date"
                                label="Deadline"
                                type="date"
                                defaultValue={`${new Date().toISOString().substring(0, 10).toString()}`}
                                sx={{ width: 220, mt: 4 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />


                            {/* Multiple choice */}

                            {/* <TextField
                                id="outlined-multiline-flexible"
                                placeholder="Enter choose A"
                                name="altA"
                                // error={q.id === inputError.id ? inputError.alt : false}
                                value={q.altA}
                                onChange={e => handleInputChange(index, e)}
                            /> */}
                            {/* <Stack spacing={1} sx={{ minWidth: "80%" }}>

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
                        </Stack> */}



                            {/* Answer */}
                            {/* <FormControl component="fieldset" error={true}>
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
                        </FormControl> */}
                        </Box>

                    </Box>


                }






                {
                    qArr.map((q, index) => {

                        return (

                            <Box sx={{ m: 2, display: q.id === currentQ ? "block" : "none" }} key={`${q}~${index}`}  >

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

                    <Fab aria-label="add" variant='extended' onClick={handelFinish} >
                        Finish
                    </Fab>
                </Stack>


            </Container>
        </>
    )
}

export default Quizbuilder
