
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    ToggleButton, ToggleButtonGroup, Breadcrumbs, Link as M_Link, Typography, Divider
} from '@mui/material'


import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Fab from '@mui/material/Fab'

import { useRouter } from 'next/router'

import { QuizStateContext, QuizUpdateContext } from '../../src/context'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import QuizResults from '../../Components/QuizResults'
import { DialogPrompt } from '../../Components/DialogPrompt'
import QuizArenaCard from '../../Components/QuizArenaCard'
import QuizArenaList from '../../Components/QuizArenaList'


async function fetchQuizData(res, handleAlignment, setQArr) {

    // const res = await useContext(QuizStateContext)

    const filterQuiz = await res.filter(item => item.id === id)[0]
    console.log(filterQuiz.quiz);


    handleAlignment(null, filterQuiz.quiz[0].id)

    setQArr(filterQuiz.quiz)

}

const QuizArena = () => {


    const [hideQ_Arena, setHideQ_Arena] = useState(false)
    const [currentQ, setCurrentQ] = useState("title") // Toggle whick quiz Question you are working on
    const [openDialogPrompt, setDialogPrompt] = React.useState(false); // Toggle Dialog propmt, when pressed breadcrum
    const [qArr, setQArr] = useState([]);

    const [userAnswer, setUserAnswer] = useState([])

    const [inputError, setInputError] = useState({
        id: null,
        q: false,
        alt: false,
        answer: false,
    });


    const route = useRouter()

    const { id } = route.query

    const res = useContext(QuizStateContext)

    const router = useRouter()

    const _quizContextUpdate = useContext(QuizUpdateContext)




    useEffect(() => {
        (async () => {
            const filterQuiz = await res.filter(item => item.id === id)[0]

            if (filterQuiz) {

                handleAlignment(null, filterQuiz.quiz[0].id)

                _quizContextUpdate({ type: "POPULATE", payload: filterQuiz.quiz })
                console.log("Populate");
                setQArr(filterQuiz.quiz)
            }
            /// Save data to Local, to avoid error
        })()
    }, [])



    // ================= Navigation handler, Breadcrum & Questions Toggler ==================== //


    // Handle Toggle of  available quiz questions

    const handleAlignment = (event, newAlignment) => {

        if (newAlignment === null) return

        setCurrentQ(newAlignment)

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

                _quizId.answer = target.value

                return setUserAnswer(values)
            }
        }
    };



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

                {/* // ===== Quiz Arean  ========= // */}

                {
                    !hideQ_Arena ?

                        <QuizArenaList

                            inputError={inputError}
                            handleUserAnswer={handleUserAnswer}
                            currentQ={currentQ}
                        />

                        :

                        <QuizResults
                            qArr={qArr}
                            getCorrectAnswer={getCorrectAnswer}
                            getResults={getResults}

                        />

                }


                {/* Action buttons for Add & Finish */}

                < Stack sx={{ marginTop: 6, height: 50 }} direction="row" spacing={4} justifyContent="flex-end" >

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
