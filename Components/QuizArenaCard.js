import React from 'react'
import { Box, Typography, Stack, Divider, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'




const QuizArenaCard = ({ q, handleUserAnswer, currentQ, index, inputError }) => {

    console.log(handleUserAnswer);
    return (
        <Box sx={{ m: 2, display: q.id === currentQ ? "block" : "none" }} key={`${q}~${index}`}  >

            {/* Question */}
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
}

export default QuizArenaCard
