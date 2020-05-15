import React from "react";
import TextField from "@material-ui/core/TextField";

function ExpireList (props) {

    const expArr=JSON.parse(localStorage.getItem('expArr'));
            const List= expArr.map(elem=>{
            return(
                <React.Fragment>

                <TextField
                    value={elem.tempText}
                    size="small"
                    variant="filled"
                    disabled
                    style={{margin: 2}}

                /><br/>
                </React.Fragment>
            )
            }
          )

        return (
            <React.Fragment>
                <h1>Expire List</h1>
                <div>{List}</div>
            </React.Fragment>
        )
}

export default ExpireList;