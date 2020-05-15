import React from "react";
import DeleteOutlinedIcon from '@material-ui/icons/Delete';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 10,
        backgroundColor: '#f2f3ea7d'
    },
    textField: {

    },
}));

function ProduktList (props){
    const classes = useStyles();

        const tempProdukts = props.prodList;
        const resList = tempProdukts.map(elem => {

            return(
                <div key = {elem.tempKey} className={classes.root}>
                    <TextField
                        type="text"
                        value={elem.tempText}
                        id ={elem.tempKey}
                        onChange ={(e)=>props.handleChangeText(elem.tempKey,e.target.value)}
                        size="small"
                        variant="outlined"
                        style={{ margin: 2 }}
                    />
                    <TextField
                        type="number"
                        value={elem.tempNumber}
                        id={elem.tempKey}
                        onChange ={(e)=>props.handleChangeNumber(elem.tempKey,e.target.value)}
                        size="small"
                        variant="outlined"
                        style={{ margin: 2 }}
                    />

                    <TextField
                        type="date"
                        value={elem.tempDate}
                        id ={elem.tempKey}
                        onChange ={(e)=>props.handleChangeDate(elem.tempKey,e.target.value)}
                        size="small"
                        variant="outlined"
                        style={{ margin: 2 }}
                    />

                    <FormControlLabel
                        label={elem.tempCheck===true?'Erledigt': 'Unerledigt'}

                        control={
                            <Checkbox
                                value={elem.tempCheck}
                                id={elem.tempKey}
                                checked={elem.tempCheck}
                                onChange ={(e)=>props.handleChangeStatus(elem.tempKey,e.target.value)}
                                color="primary"
                                style={{ margin: 2 }}
                            />
                        }

                    />

                    <DeleteOutlinedIcon
                        color="secondary"
                        style={{ margin: 10}}
                        onClick={()=>props.deleteElem(elem.tempKey)} />
                </div>
            )

            }

        )
        return(
            <div>{resList} </div>
        )

}

export default ProduktList;