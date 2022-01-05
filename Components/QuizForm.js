import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import Fab from '@mui/material/Fab'

import {  Delete } from '@mui/icons-material';

const QuizForm = ({ q, index, inputError, currentQ, qArr, handleInputChange, handleRemoveFields }) => {
    return (
        <Box sx={{ m: 2, display: q.id === currentQ ? "block" : "none" }} key={`${q}~${index}`} component="form" onSubmit={(e) => e.preventDefault()}  >

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
}

export default QuizForm
