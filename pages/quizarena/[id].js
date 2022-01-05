
import React, { useContext, useEffect, useState } from 'react'
import {
    ToggleButton, ToggleButtonGroup, Breadcrumbs, Link as M_Link, Typography, Divider
} from '@mui/material'


import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'


import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import Fab from '@mui/material/Fab'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';

import { useRouter } from 'next/router'


import { QuizStateContext, QuizUpdateContext } from '../../src/context'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import QuizResults from '../../Components/QuizResults'
import { DialogPrompt } from '../../Components/DialogPrompt'
const QuizArena = () => {



    const [hideQ_Arena, setHideQ_Arena] = useState(false)

    const [currentQ, setCurrentQ] = useState("title") // Toggle whick quiz Question you are working on
    const [openDialogPrompt, setDialogPrompt] = React.useState(false); // Toggle Dialog propmt, when pressed breadcrum


    const route = useRouter()
    const { id } = route.query

    const res = useContext(QuizStateContext)



    const [qArr, setQArr] = useState([]);

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
        // console.log("new", newAlignment);
        // console.log("current", currentQ);
        if (newAlignment === null) return

        setCurrentQ(newAlignment)
        // console.log(qArr);
        // setAlignment(newAlignment);
    };





    // save data to local 
    // then fetch it if cache is d


    useEffect(() => {
        (async () => {

            const filterQuiz = await res.filter(item => item.id === id)[0]
            console.log(filterQuiz.quiz);


            handleAlignment(null, filterQuiz.quiz[0].id)

            setQArr(filterQuiz.quiz)


            /// Save data to Local, to avoid error
        })()
    }, [])










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









    // ================= QUIZ  Answer handler ==================== //

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

                // console.log(_quizId.answer)
                // console.log("value exist");
                _quizId.answer = target.value

                return setUserAnswer(values)
            }
        }

    };

    // console.log(userAnswer);


    // ================= Quiz FInish handler ==================== //





    const quizArenaBtn_handler = async (type) => {



        switch (type) {
            case "finish": {
                if (userAnswer.length !== qArr.length) {
                    setunfinished_error(true);
                    return
                }

                setHideQ_Arena(true)
            }
                break;
            case "again": {
                setUserAnswer([])
                // handleAlignment(null, qArr[0].id)
                setHideQ_Arena(false)
            }

                break;

            default:
                break;
        }
    }




    const getCorrectAnswer = (id) => {
        const res = userAnswer.filter(item => item.id === id)[0]

        if (!res) return "Unknown"

        const correctAnswer = getResults().find(item => item.id === id)

        return { a: res.answer, correct: correctAnswer }
    }

    const getResults = () => {
        // loop user answer and see if answer match with qArr


        if (qArr.length === 0) return

        const res = qArr.map(item => {

            const resz = userAnswer.filter(ans => ans.id === item.id)[0]


            if (resz.answer === item.answer) {

                return item

            } else return null




        })

        return res.filter(item => item !== null)

    }




    //==>>> Handle Snackbar Error


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
    });


    const [unfinished_error, setunfinished_error] = useState(false);

    const handleClick = () => {
        setunfinished_error(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setunfinished_error(false);
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" >


                <div role="presentation" onClick={handleBreadCrumb} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <M_Link underline="hover" color="inherit" id="breadcrum-dashbord-a">
                            Dashbord
                        </M_Link>

                        <Typography color="text.primary">Quiz Arena</Typography>
                    </Breadcrumbs>
                </div>


                {/* Quiz Toggle*/}


                <Box sx={{ m: 2, visibility: !hideQ_Arena ? "visible" : "hidden" }}>

                    <ToggleButtonGroup
                        value={currentQ}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        size="large"
                    >

                        {
                            qArr.map((item, index) => <ToggleButton key={item.id} value={item.id} aria-label="centered">
                                <h3 style={{ margin: 0 }}>{`Q${index + 1}`}</h3>
                            </ToggleButton>
                            )
                        }
                    </ToggleButtonGroup>
                </Box>




                {/* Alert before exit without save */}
                <DialogPrompt
                    openDialogPrompt={openDialogPrompt}
                    handleDialogPrompt={handleDialogPrompt}

                />
                {/* <div>
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
                </div> */}



                {/* // ===== Quiz Arean  ========= // */}

                {

                    !hideQ_Arena ?
                        qArr.map((q, index) => {

                            return (

                                <Box sx={{ m: 2, display: q.id === currentQ ? "block" : "none" }} key={`${q}~${index}`}  >

                                    {/* Question Input */}
                                    <div>
                                        <Typography variant='h4' sx={{ mt: 5 }}>
                                            {q.q}
                                        </Typography>
                                    </div>

                                    <Box sx={{ display: "flex", marginTop: 5 }}>

                                        {/* Multiple choice */}

                                        <Stack spacing={3} sx={{ minWidth: "40%" }}>

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
                        :

                        <QuizResults
                            qArr={qArr}
                            getCorrectAnswer={getCorrectAnswer}
                            getResults={getResults}

                        />

                }


                {/* Action buttons for Add & Finish */}

                < Stack sx={{ marginTop: 6, height: 50 }} direction="row" spacing={4} justifyContent="flex-end" >
                    {/* <Fab color="primary" aria-label="add" onClick={handleAddFields} sx={{ visibility: currentQ === "title" ? "hidden" : "visible" }}>
                        <Add />
                    </Fab> */}

                    <Fab aria-label="Try again" variant='extended' onClick={() => quizArenaBtn_handler("again")}
                        sx={{ visibility: !hideQ_Arena ? "hidden" : "visible" }}
                    >
                        <Typography>Try Again</Typography>
                    </Fab>

                    <Fab aria-label="Finish" variant='extended' onClick={() => quizArenaBtn_handler("finish")}
                        sx={{ visibility: hideQ_Arena ? "hidden" : "visible" }}
                    >
                        <Typography>
                            Finish
                        </Typography>
                    </Fab>


                </Stack>


                <Snackbar open={unfinished_error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%', color: "black" }}>
                        <Typography>
                            PLEASE, ANSWER ALL THE QUESTIONS !
                        </Typography>

                    </Alert>

                </Snackbar>


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
