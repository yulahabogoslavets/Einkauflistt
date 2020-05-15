import React from "react";

import ProduktList from "./Components/ProduktsList";
import ExpireList from "./Components/ExpireList";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


export default class App extends React.Component{
    constructor(props) {
        super(props);
        let tempvar=[];
        if(localStorage.getItem('LocalData')!==null)
            tempvar=JSON.parse(localStorage.getItem('LocalData'));
        this.state= {
            produkts: tempvar,
            aktProdukt:{
                tempText: '',
                tempKey: '',
                tempNumber: '',
                tempDate: '',
                tempCheck: false,
                tempInterval: ''
            }
        }
    }

    componentDidMount() {
        const handle =setInterval(this.checkDates, 1000)
       this.setState(
       {
           tempInterval: handle

       })

    }

    componentWillUnmount()
    {

        clearInterval(this.state.tempInterval)
    }
    checkDates=()=>{
        const tempVar=JSON.parse(localStorage.getItem('LocalData'));
        const expArr = tempVar.filter(elem =>
        {
            let dateConvert = Date.parse(elem.tempDate);
            return ( dateConvert < Date.now()&& elem.tempCheck===false)
        })
       localStorage.setItem('expArr', JSON.stringify(expArr));
        this.setState(this.state)
    }




    addMemory=(newEinkaufList)=>{
        localStorage.setItem('LocalData', JSON.stringify(newEinkaufList));
        console.log(localStorage);
    }

    addElement=(event)=>{
        const newItem = this.state.aktProdukt;
        if(newItem.tempText!==""){
            const newProdukts = [...this.state.produkts, newItem];

            this.addMemory(newProdukts);

            this.setState({
                produkts: newProdukts,
                aktProdukt:{
                    tempText: '',
                    tempKey: '',
                    tempNumber: '',
                    tempDate: ''
                }
            })
        }
    }
    handleInput = (event) =>{
        this.setState({
            aktProdukt: {
                tempText: event.target.value,
                tempKey: Date.now(),
                tempNumber: this.state.aktProdukt.tempNumber,
                tempDate: this.state.aktProdukt.tempDate,
                tempCheck: this.state.aktProdukt.tempCheck
            }
        })
    }
    handleNumber = (event) => {
        this.setState({
            aktProdukt: {
                tempNumber: event.target.value,
                tempText: this.state.aktProdukt.tempText,
                tempKey: this.state.aktProdukt.tempKey,
                tempDate: this.state.aktProdukt.tempDate,
                tempCheck: this.state.aktProdukt.tempCheck
            }
        })
    }
    handleDate = (event) => {
        this.setState({
            aktProdukt: {
                tempDate: event.target.value,
                tempText: this.state.aktProdukt.tempText,
                tempNumber: this.state.aktProdukt.tempNumber,
                tempKey: this.state.aktProdukt.tempKey,
                tempCheck: this.state.aktProdukt.tempCheck
            }
        })
    }

    deleteElem = (key) => {
        const removeEl = this.state.produkts.filter(elem => elem.tempKey !== key);

        this.addMemory(removeEl);

        this.setState({
            produkts: removeEl
        })
    }

    changeText = (id, newText) => {
        const tempArr= this.state.produkts;
        tempArr.map(item => {
            if(item.tempKey === id) {
                item.tempText = newText;
            }
        })

        this.addMemory(tempArr);

        this.setState({
            produkts: tempArr
        })
    }
    changeNumber = (id, newNum) => {
        const tempArr = this.state.produkts;
        tempArr.map(item => {
            if (item.tempKey === id) {
                item.tempNumber = newNum ;
            }
        })

        this.addMemory(tempArr);

        this.setState({
            produkts: tempArr
        })
    }
    changeDate = (id, newDate) => {
        const tempArr = this.state.produkts;
        tempArr.map(item => {
            if (item.tempKey === id) {
                item.tempDate = newDate ;
            }
        })

        this.addMemory(tempArr);

        this.setState({
            produkts: tempArr
        })
    }
    changeStatus= (id) => {
        const tempArr = this.state.produkts;
        tempArr.map(item => {
            if (item.tempKey === id) {
                item.tempCheck = !item.tempCheck ;
            }
        })

        this.addMemory(tempArr);

        this.setState({
            produkts: tempArr
        })
    }


    render(){
        return(
            <React.Fragment>
                <Typography variant="h3"
                            color="primary"
                            gutterBottom
                            style={{ textAlign: "center" }}
                >
                    Einkaufsplaner
                </Typography>
                <Grid container
                      direction="row"
                >
                    <form>
                        <TextField
                            label="Produkt"
                            type="text"
                            variant="outlined"
                            size="small"
                            value = {this.state.aktProdukt.tempText}
                            onChange={this.handleInput}
                            style={{ margin: 2 }}
                        />

                        <TextField
                            label="Anzahl"
                            type="number"
                            variant="outlined"
                            size="small"
                            style={{ marginLeft: 5 }}
                            value = {this.state.aktProdukt.tempNumber}
                            onChange={this.handleNumber}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            label=""
                            type="date"
                            variant="outlined"
                            size="small"
                            style={{ marginLeft: 5 }}
                            value = {this.state.aktProdukt.tempDate}
                            onChange={this.handleDate}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            size="normal"
                            style={{ marginLeft: 5,
                                marginTop: 2
                            }}
                            onClick={this.addElement}
                        >
                            Add
                        </Button>

                    </form>

                    <ProduktList prodList={this.state.produkts}
                                 deleteElem={this.deleteElem}
                                 handleChangeText = {this.changeText}
                                 handleChangeNumber = {this.changeNumber}
                                 handleChangeDate = {this.changeDate}
                                 handleChangeStatus = {this.changeStatus}
                    />
                </Grid>
                    <ExpireList/>

            </React.Fragment>

        )
    }

}
