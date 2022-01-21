import { Card, CardActionArea, Typography, CardContent, Paper } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import LinearProgressWithLabel from './ProgressWithLabel';

const QuizCard = ({ index, id, title, desc, deadline }) => {
    return (
        <Card key={index} sx={{ width: 250, minHeight: 241, m: 2 }}>
            <CardActionArea sx={{ minHeight: 241 }} >
                <Link href={`/quizarena/${id}`} passHref >
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {!title ? "Quiz Title" : title}
                        </Typography>
                        <Typography color="text.secondary" component="p" variant="p" sx={{ mb: 8 }} >
                            {desc ? desc : "Description of the quiz, with few words"}
                        </Typography>

                        <Typography color="text.secondary"  >
                            {`End: ${deadline ? deadline : "X Date"}`}
                        </Typography>
                        <Paper sx={{ p: 1, paddingLeft: 0 }} elevation={0}>
                            <LinearProgressWithLabel value={20} />
                        </Paper>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    )
}

export default QuizCard
