
import React, { useContext, useEffect, useState } from 'react'
import {
    ToggleButton, ToggleButtonGroup, Breadcrumbs, Link as M_Link, Typography, InputLabel, Select, MenuItem, FormHelperText, Divider
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
import { QuizUpdateContext, QuizStateContext } from '../../src/context'

const uniqid = require("uniqid");

const QuizArena = () => {

    const route = useRouter()
    const { id } = route.query

    const res = useContext(QuizStateContext)
    useEffect(() => {
        const filterQuiz = res.filter(item => item.id === id)[0]
        console.log(filterQuiz.quiz);

        setQArr(filterQuiz.quiz)
    }, [])


    const [currentQ, setCurrentQ] = useState("title") // Toggle whick quiz Question you are working on
    const [started, setStarted] = useState(true) // Toggle Display from Title form to quiz form
    const [openDialogPrompt, setDialogPrompt] = React.useState(false); // Toggle Dialog propmt, when pressed breadcrum


    const [qInfo, setQInfo] = useState({
        id: uniqid(),
        title: "",
        desc: "",
        createdDate: new Date().toISOString().substring(0, 10),
        deadline: "",
        participants: ""
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

    const [userAnswer, setUserAnswer] = useState([])

    const [inputError, setInputError] = useState({
        id: null,
        q: false,
        alt: false,
        answer: false,
    });





    const router = useRouter()

    const _quizContextUpdate = useContext(QuizUpdateContext)



    // ================= Navigation handler, Breadcrum & Questions Toggler ==================== //


    // Handle Toggle of  available quiz questions

    const handleAlignment = (event, newAlignment) => {
        console.log("new", newAlignment);
        console.log("current", currentQ);
        if (newAlignment === null) return

        setCurrentQ(newAlignment)
        console.log(qArr);
        // setAlignment(newAlignment);
    };



    const handleDialogPrompt = (e, reason) => {

        // User can Choose btn (Stay) 
        // Else if  user choose to leave,  redirect to Dashbord. 

        if (reason === "stay") {
            setDialogPrompt(false);
        } else {
            router.push("/")
        }
    };

    const handleBreadCrumb = (event) => {
        event.preventDefault();
        setDialogPrompt(true)
    }









    // ================= QUIZ  Form handler ==================== //

    const handleUserAnswer = (
        index,
        event
    ) => {
        const values = [...userAnswer];
        const target = event.target



        // handle Answer


        if (target.name === "answer") {
            // id and user answer


            const _quizId = values.filter(item => item.id === index)[0]

            if (!_quizId) {
                return setUserAnswer([...values, { id: index, answer: target.value }])
            } else {

                console.log(_quizId.answer)
                console.log("value exist");
                _quizId.answer = target.value

                return setUserAnswer(values)
            }
        }

    };

    console.log(userAnswer);


    // ================= Add & Remove & Finish  handler ==================== //


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


            // Get the current ID  
            // For toggle purposes
            let newId = uniqid()


            if (lastQ.answer) {
                values.push({
                    id: newId,
                    q: "",
                    answer: null,
                    altA: "",
                    altB: "",
                    altC: "",
                });
                setInputError({ id: lastQ.id, q: false, alt: false, answer: false });
                handleAlignment(null, newId)
                setQArr(values);
                return true
            } else {
                setInputError({ id: lastQ.id, q: false, alt: false, answer: true });
            }
        }
    };



    const handleRemoveFields = (index) => {
        const values = [...qArr];
        values.splice(index, 1);

        // Find the removed item, Pick the next item and set that as currentQ
        handleAlignment(null, values[values.length - 1].id)

        // console.log();
        setQArr(values);
    };



    const handelFinish = async () => {

        // Handle Started state ON start &  ? On Finish ?


        if (qInfo.title === "") {

            return setInfoError(true)

        } else if (!started) {
            console.log("Run handleFinsih");
            setStarted(true)
            setInfoError(false) // title is given
            handleAlignment(null, qArr[0].id)
        } else {

            // !!! This is a hack. I need to find a better way of doing this part

            const checkFinish = handleAddFields()

            if (checkFinish) {

                // run Add Function and check for error. 
                // if no error, remove the last obj

                // Filter the last Empty Quiz out
                const finishedQuizz_arr = qArr.filter(item => item.id !== currentQ)

                // if (qInfo.title === "") {
                //     qInfo.title = `Quiz _${qInfo.id}`
                // }

                _quizContextUpdate({
                    type: "add_quiz",
                    payload: {
                        ...qInfo,
                        quiz: qArr.length > 1 ? finishedQuizz_arr : qArr
                    }
                })

                router.push("/")
            }
        }
    }



    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">


                <div role="presentation" onClick={handleBreadCrumb} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        {/* <NextLink href="" passHref> */}

                        <M_Link underline="hover" color="inherit" >
                            Dashbord
                        </M_Link>
                        {/* </NextLink> */}

                        <Typography color="text.primary">Quiz Builder</Typography>

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
                        {/* <ToggleButton value="title" aria-label="left aligned"

                            sx={{ bgcolor: infoError ? "red" : "inherit" }}
                        >
                             <Title />
                         </ToggleButton> */}

                        {
                            qArr.map((item, index) => <ToggleButton sx={{ visibility: started ? "visible" : "hidden" }} key={item.id} value={item.id} aria-label="centered">
                                <h3 style={{ margin: 0 }}>{`Q${index + 1}`}</h3>
                            </ToggleButton>
                            )
                        }
                    </ToggleButtonGroup>
                </Box>




                {/* Alert before exit without save */}
                <div>
                    <Dialog
                        open={openDialogPrompt}
                        onClose={(e) => handleDialogPrompt(e, "stay")}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {" If you leave now, your quiz will not be saved!"}
                        </DialogTitle>

                        <DialogActions>
                            <Button onClick={(e) => handleDialogPrompt(e, "stay")}>Stay</Button>
                            <Button onClick={(e) => handleDialogPrompt(e, "leave")} autoFocus>
                                Leave
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>







                {/* // ===== Quiz Form  ========= // */}

                {
                    qArr.map((q, index) => {

                        return (

                            <Box sx={{ m: 2, display: q.id === currentQ ? "block" : "none" }} key={`${q}~${index}`}  >

                                {/* Question Input */}
                                <div style={{ display: "flex" }}>
                                    {/* <TextField
                                        id="standard-multiline-flexible"
                                        name="q_"
                                        value={q.q}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="Enter your question"
                                        variant="standard"
                                        disabled
                                        multiline
                                        fullWidth
                                        error={q.id === inputError.id ? inputError.q : false}
                                        maxRows={4}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Q :</InputAdornment>
                                        }}
                                    /> */}


                                    <Typography variant='h3'>
                                        {q.q}
                                    </Typography>




                                    {/* <Fab sx={{ bgcolor: "#f77", display: qArr.length === 1 ? "none" : "inline" }} variant='extended' aria-label="add" onClick={() => handleRemoveFields(index)} >
                                        <Delete />
                                    </Fab> */}
                                </div>

                                <Box sx={{ display: "flex", marginTop: 5 }}>

                                    {/* Multiple choice */}

                                    <Stack spacing={3} sx={{ minWidth: "40%" }}>
                                        {/* <TextField
                                            id="standard-multiline-flexible"
                                            placeholder="Enter choose A"
                                            name="altA"
                                            // error={q.id === inputError.id ? inputError.alt : false}
                                            value={q.altA}
                                            variant="standard"
                                            disabled
                                        // onChange={e => handleInputChange(index, e)}
                                        /> */}
                                        <Typography variant='p' si>
                                            {q.altA}
                                        </Typography>
                                        <Divider />

                                        <Typography variant='p'>
                                            {q.altB}
                                        </Typography>
                                        <Divider />
                                        <Typography variant='p'>
                                            {q.altC}
                                        </Typography>
                                        <Divider />
                                        {/* <TextField
                                            id="standard"
                                            placeholder="Enter choose B "
                                            name="altB"
                                            // error={q.id === inputError.id ? inputError.alt : false}
                                            value={q.altB}
                                            variant="standard"
                                            disabled
                                        // onChange={e => handleInputChange(index, e)}
                                        />

                                        <TextField
                                            id="standard"
                                            placeholder="Enter choose C "
                                            name="altC"
                                            // error={q.id === inputError.id ? inputError.alt : false}
                                            value={q.altC}
                                            // onChange={e => handleInputChange(index, e)}
                                            variant="standard"
                                            disabled
                                        /> */}
                                    </Stack>

                                    {/* Answer */}

                                    <FormControl component="fieldset" error={true}>
                                        <RadioGroup
                                            aria-label="select correct answer"
                                            name="answer"
                                            defaultChecked={false}

                                            onChange={e => handleUserAnswer(q.id, e)}
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

                < Stack sx={{ marginTop: 6, height: 50 }} direction="row" spacing={4} justifyContent="flex-end" >
                    {/* <Fab color="primary" aria-label="add" onClick={handleAddFields} sx={{ visibility: currentQ === "title" ? "hidden" : "visible" }}>
                        <Add />
                    </Fab> */}

                    <Fab aria-label={!started ? "Next" : "Finish"} variant='extended' onClick={handelFinish}
                        sx={{ visibility: !started ? "visible" : currentQ === "title" && started ? "hidden" : "visible" }}
                    >
                        {!started ? "Next" : "Finish"}
                    </Fab>
                </Stack>


            </Container>
        </>
    )
}







// => For later use

// export const getServerSideProps = async (context) => {
//     const res = await fetch(
//         `https://domain.com/quizarena/${context.params.id}`
//     );

//     const quizs = await res.json();
//     return {
//         props: {
//             quizs,
//         },
//     };
// };

export default QuizArena
