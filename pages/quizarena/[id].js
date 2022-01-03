import React from 'react'

const QuizArena = () => {
    return (
        <div>
            <h1>Welcome to quiz Arena</h1>
        </div>
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
