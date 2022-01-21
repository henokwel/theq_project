import React from 'react'
import { MenuItem, FormControl, TextField, Box, Select, InputLabel, FormHelperText } from '@mui/material'

const IntroForm = ({ handleIntroInputChange, qInfo , currentQ, infoError }) => {
    return (
        <>
            <Box sx={{ m: 2, display: currentQ === "title" ? "block" : "none" }} key={`${qInfo.id}`}  >
                {/* Quiz Title */}
                <div style={{ display: "flex" }}>
                    <TextField
                        id="outlined-multiline-flexible"
                        name="title"
                        value={qInfo.title}
                        onChange={(e) => handleIntroInputChange(e)}
                        placeholder="Quiz Title"
                        multiline
                        fullWidth
                        error={infoError}
                        maxRows={4}

                    />
                </div>


                <Box sx={{ display: "flex", flexDirection: "column", marginTop: 5 }}>

                    <TextField
                        id="outlined-multiline-flexible"
                        name="description"
                        value={qInfo.desc}
                        onChange={(e) => handleIntroInputChange(e)}
                        placeholder="Short description"
                        multiline
                        fullWidth
                        // error={qInfo.id === inputError.id ? inputError.q : false}
                        minRows={5}

                    />
                    <div>


                        <TextField
                            id="date"
                            label="Deadline"
                            type="date"
                            name='deadline'
                            onChange={(e) => handleIntroInputChange(e)}
                            value={qInfo.deadline === "" ?
                                new Date().toISOString().substring(0, 10).toString()
                                :
                                qInfo.deadline
                            }
                            // defaultValue={`${new Date().toISOString().substring(0, 10).toString()}`}
                            sx={{ width: 220, mt: 4 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />


                        <FormControl sx={{ mt: 4, ml: 5, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Participants</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={qInfo.participants}
                                label="participants"
                                name="participants"
                                onChange={(e) => handleIntroInputChange(e)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={200}>200</MenuItem>
                                <MenuItem value={300}>&gt;300</MenuItem>
                            </Select>
                            <FormHelperText>Estimate participants </FormHelperText>
                        </FormControl>


                    </div>

                </Box>

            </Box>
        </>
    )
}

export default IntroForm
