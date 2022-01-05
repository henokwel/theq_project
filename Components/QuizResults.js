import React from 'react'
import {
    Typography, TableContainer, Table, TableHead, TableCell,
    TableBody, TableRow, Paper
} from '@mui/material'

import LightbulbIcon from '@mui/icons-material/Lightbulb';




const QuizResults = ({ qArr, getCorrectAnswer, getResults }) => {
    return (
        <>
            <Typography variant='h2'>
                Results
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Questions</TableCell>
                            <TableCell align="right">Right Answer</TableCell>
                            <TableCell align="right">Your Answer</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {qArr.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.q}
                                </TableCell>
                                <TableCell align="right">{row.answer}</TableCell>
                                <TableCell sx={{ color: getCorrectAnswer(row.id).correct ? "black" : "red" }} align="right">{getCorrectAnswer(row.id).a}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Paper elevation={0} sx={{ mt: 3, p: 3, pl: 0 }}>


                <Typography variant='h6' >
                    <LightbulbIcon />   {` \u00A0 You got ${getResults().length} answer right out of ${qArr.length}`}

                </Typography>
            </Paper>
        </>
    )
}

export default QuizResults
