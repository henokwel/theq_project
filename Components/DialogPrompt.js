import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material'

export const DialogPrompt = ({ openDialogPrompt, handleDialogPrompt }) => {
    return (

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

    )
}
