import React from "react";
import Auth from "../../services/auth.js";
import  { Redirect } from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import AddAlert from "@material-ui/icons/AddAlert";
import CircularProgress from '@material-ui/core/CircularProgress';
//core components
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Background from '../../assets/img/bg-01.jpg';
import Logo from '../../assets/img/logo.png';

const styles = {
    cardTitle: {
        fontWeight: "bold",
        marginTop: "5px",
        marginBottom: "4px",
        alignItems: "center"
    }
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            enablebutton: true,
            button: "warning",
            open: false,
            message: "",
            place: "tl"
        }
    }

    validateForm() {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            this.setState({ enablebutton: false, })
        }
    }

    handleChange = event => {
        this.validateForm()
        this.setState({
            [event.target.id]: event.target.value
        })
    }


    submitForm = () => {
        this.setState({ open: true, place: "tc", message: `Carregando`, button: "info" })
        Auth.data = {
            client_id: "carnailhaWeb",
            client_secret: "carnaweb",
            grant_type: "password",
            username: `${this.state.username}`,
            password: `${this.state.password}`
        }
        let response = Auth.post(Auth.data);
        response.then((result) => {
            if (result.statusCode == 400) {
                this.setState({ open: true, place: "tc", message: "Credênciais Inválidas", button: "danger" })
            }else{
                this.setState({ open: true, place: "tc", message: `Sucesso`, button: "success" })
                this.props.history.push('/dashboard')
                document.body.style = `background-color: "white"`;
        
                return <Redirect to='/dashboard'/>
            }
        });

    }

    render() {
        document.body.style = `height: 100vh; width: 100vw; background-image: url(${Background}); background-size: cover; background-repeat: no-repeat; overflow-x: hidden; maxWidth: 100vw !important`;
        return (
            <div>
                <GridContainer
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '95vh' }}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="warning">
                                <GridContainer style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <img style={{ maxHeight: '08rem' }} src={Logo} alt="Logo" />

                                    <GridItem xs={12} sm={12} md={12}>
                                        <h3 style={styles.cardTitle}>LOGIN</h3>
                                    </GridItem>
                                </GridContainer>
                            </CardHeader>
                            <CardBody>
                                <Snackbar
                                    place={this.state.place}
                                    color={this.state.button}
                                    message={this.state.message}
                                    open={this.state.open}
                                    closeNotification={() => this.setState({ open: false })}
                                    close
                                />
                                <p style={{ margin: "0px" }} >Digite suas credenciais.</p>
                                <FormControl component="fieldset" onSubmit={this.test}>
                                    <FormGroup style={{ marginTop: "-30px" }}>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Usuário"
                                                id="username"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    onChange: this.handleChange
                                                }}
                                            />
                                            <CustomInput
                                                labelText="Senha"
                                                id="password"
                                                formControlProps={{
                                                    fullWidth: true,
                                                    style: { marginTop: "-8px" }
                                                }}
                                                inputProps={{
                                                    type: "password",
                                                    onChange: this.handleChange,
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Button disabled={this.state.enablebutton} color="warning" round onClick={this.submitForm}
                                            >Login</Button>
                                        </GridItem>
                                    </FormGroup>
                                </FormControl>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }

}

export default withStyles(styles)(Login);
