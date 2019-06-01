import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import TextField from "@material-ui/core/TextField";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import Service from "../../services/accommodations";

import constants from "../../services/constants";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  fabButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px"
  },
  rootList: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: "white",
    position: "relative",
    overflow: "auto",
    maxHeight: 300
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  }
};

class Accommodations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accommodations: [],
      listStates: [],
      name: "",
      img: "",
      type: "",
      vacancies: 0,
      location: "",
      structure: "",
      extras: "",
      contact: "",
      price: 0.0,
      promoters: [
        {
          name: "",
          img: "",
          wpp: "",
          email: "@email.com",
          face_link: "fb.me"
        }
      ],

      action: 0, //0- listagem, 1- insert estado, 2- insert cidade, 3- insert promoter
      indexState: null,

      notification: "",
      color: "info",
      tc: false,
      edit: false
    };
  }

  componentDidMount() {
    this._load();
  }

  handleAddPromoter = () => {
    let promoters = this.state.promoters;

    promoters.push({ name: "", img: "", wpp: "", email: "", face_link: "" });

    this.setState(
      { promoters },
      // eslint-disable-next-line no-console
      console.log(this.state)
    );
  };

  handleRemovePromoter = () => {
    if (this.state.promoters.length > 1) {
      let promoters = this.state.promoters;

      promoters.pop();

      this.setState({
        promoters
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangePromoter = (index, input, value) => {
    // eslint-disable-next-line no-console
    console.log(index, input, value);

    let promoters = this.state.promoters;

    promoters[index][input] = value.target.value;

    this.setState({ promoters });
  };

  handleListSelect = (statePosition, cityPosition) => {
    const state = this.state.listStates[statePosition];

    const { city, promoters } = this.state.listStates[statePosition].cities[
      cityPosition
    ];

    this.setState({ city, promoters, action: 2 });
  };

  handleClearFields = () => {
    const state = "",
      city = "",
      action = 0,
      indexState = null,
      promoters = [{ name: "", img: "", wpp: "", email: "", face_link: "" }];

    this.setState({ state, city, promoters, indexState, action });
  };

  showNotification(place, notification, color) {
    console.log("MOSTRANDO NOTIFICAÇÂO");
    var x = [];
    x[place] = true;
    this.setState(x);
    this.setState({ notification, color });
    this.alertTimeout = setTimeout(
      function () {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  _save = async () => {
    const { accommodations, name, img, type, vacancies, location, structure, extras, contact, price } = this.state;

    const data = {
      name: name,
      img: img,
      type: type,
      vacancies: vacancies,
      location: location,
      structure: structure,
      extras: extras,
      contact: contact,
      price: price
    };

    const response = await Service.post(data);

    let msg = "",
      types = "";
    if (response.data.code != 201) {
      console.log(response.data.errors);
      for (let x in response.data.errors) {
        msg += response.data.errors[x].msg + ", ";
      }
      types = "danger";
    } else {
      msg = "Cadastrado com sucesso!";
      types = "success";
      accommodations.push(response.data.accommodation);
      this.setState({ accommodations });
    }
    this.setState({ action: 1 });
    this.showNotification("tc", msg, types);
  };

  //   _update = async () => {
  //     const { indexState, city, listStates, promoters } = this.state;
  //     const state = listStates[indexState];
  //     const newCity = { city, promoters };
  //     state.cities.push(newCity);

  //     const data = {
  //       _id: state._id,
  //       name: state.name,
  //       state: state.name,
  //       cities: state.cities
  //     };

  //     console.log(data);

  //     const response = await Service.update(data);

  //     let msg = "",
  //       type = "";
  //     if (response.code != 201) {
  //       for (let x in response.errors) {
  //         msg += response.errors[x].msg + ", ";
  //       }
  //       type = "danger";
  //     } else {
  //       msg = "Alterado com sucesso!";
  //       type = "success";

  //       listStates.push(state);

  //       this.setState({ listStates });
  //     }

  //     this.setState({ action: 0 });
  //     this.showNotification("tc", msg, type);
  //   };

  _load = async () => {
    // eslint-disable-next-line no-console
    const response = await Service.get();
    console.log(response);
    if (response.data.code === 200) {
      this.setState({ accommodations: response.data.accommodations });
    } else {
      alert("Um erro ocorreu");
    }
  };

  renderFormAccommodation() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    return (
      <GridContainer>
        {this.renderSnackbar()}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{`Novo Alojamento`}</h4>
              <p className={classes.cardCategoryWhite}>
                {`Você está liberando um novo estado. Caso queira adicionar uma accommodationa a um estado já existente, clique no botão + que está na frente do nome do estado na lista inicial. `}
              </p>
            </CardHeader>
            <CardBody>
              <GridItem xs={12} sm={12} md={12} style={{ marginTop: "23px" }}>
                <TextField
                  label="Nome do Alojamento"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                  fullWidth
                />
                <TextField
                  label="Quantidade de Vagas"
                  id="vacancies"
                  value={this.state.vacancies}
                  type="number"
                  onChange={this.handleChange("vacancies")}
                  fullWidth
                />
                <TextField
                  label="Localização"
                  id="location"
                  value={this.state.location}
                  onChange={this.handleChange("location")}
                  fullWidth
                />
                <TextField
                  label="Estrutura"
                  id="structure"
                  value={this.state.structure}
                  onChange={this.handleChange("structure")}
                  fullWidth
                />
                <TextField
                  label="Extras"
                  id="extras"
                  value={this.state.extras}
                  onChange={this.handleChange("extras")}
                  fullWidth
                />
                <TextField
                  label="Contato"
                  id="contact"
                  value={this.state.contact}
                  onChange={this.handleChange("contact")}
                  fullWidth
                />
                <TextField
                  label="Preço"
                  id="price"
                  value={this.state.price}
                  type="number"
                  onChange={this.handleChange("price")}
                  fullWidth
                />
                <Button
                  size="small"
                  color="secondary"
                  aria-label="Add"
                  className={classes.button}
                  onClick={() => {
                    this.handleClearFields();
                  }}
                >
                  Voltar
                </Button>
                <Button
                  size="small"
                  color="primary"
                  aria-label="Add"
                  className={classes.button}
                  onClick={() => {
                    this._save()
                  }
                  }
                >
                  Salvar
                  </Button>

                {/* <TextField
                  id="state"
                  select
                  label="Estado"
                  // className={classes.textField}
                  value={this.state.state}
                  onChange={this.handleChange("state")}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  fullWidth
                  helperText="Selecione o estado"
                  margin="normal"
                >
                  {this.state.states.map((option, index) => (
                    <option key={index} value={option.Nome}>
                      {option.Nome}
                    </option>
                  ))}
                </TextField> */}
              </GridItem>
            </CardBody>
            <CardFooter>
              <GridItem xs={12} sm={12} md={12}>
                <p>Estados já cadastrados:</p>
                <ul>
                  {/* {this.state.listStates.map(state => (
                    // eslint-disable-next-line react/jsx-key
                    <li>{`${state.name}`}</li>
                  ))} */}
                </ul>
              </GridItem>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }

  //   renderFormCity() {
  //     // eslint-disable-next-line react/prop-types
  //     const { classes } = this.props;
  //     const { indexState, listStates } = this.state;

  //     return (
  //       <GridContainer>
  //         <GridItem xs={12} sm={12} md={12}>
  //           <Card>
  //             <CardHeader color="primary">
  //               <h4 className={classes.cardTitleWhite}>{`Cadastrar cidade`}</h4>
  //               <p className={classes.cardCategoryWhite}>
  //                 {`Você está inserindo uma cidade ao estado ${
  //                   indexState != null ? listStates[indexState].name : "criado"
  //                 }`}
  //               </p>
  //             </CardHeader>
  //             <CardBody>
  //               <GridItem xs={12} sm={12} md={12} style={{ marginTop: "23px" }}>
  //                 <TextField
  //                   label="Nome da cidade"
  //                   id="city"
  //                   value={this.state.city}
  //                   onChange={this.handleChange("city")}
  //                   fullWidth
  //                 />

  //                 <Button
  //                   size="small"
  //                   color="secondary"
  //                   aria-label="Add"
  //                   className={classes.button}
  //                   onClick={() => {
  //                     this.state.state == ""
  //                       ? this.setState({ action: 0 })
  //                       : this.setState({ action: 1 });
  //                   }}
  //                 >
  //                   Voltar
  //                 </Button>
  //                 <Button
  //                   size="small"
  //                   color="primary"
  //                   aria-label="Add"
  //                   className={classes.button}
  //                   onClick={() => {
  //                     this.setState({ action: 3 });
  //                   }}
  //                 >
  //                   Adicionar promoter(s)
  //                 </Button>

  //                 {/* <TextField
  //                   id="state"
  //                   select
  //                   label="Estado"
  //                   // className={classes.textField}
  //                   value={this.state.state}
  //                   onChange={this.handleChange("state")}
  //                   SelectProps={{
  //                     native: true,
  //                     MenuProps: {
  //                       className: classes.menu
  //                     }
  //                   }}
  //                   fullWidth
  //                   helperText="Selecione o estado"
  //                   margin="normal"
  //                 >
  //                   {this.state.states.map((option, index) => (
  //                     <option key={index} value={option.Nome}>
  //                       {option.Nome}
  //                     </option>
  //                   ))}
  //                 </TextField> */}
  //               </GridItem>
  //             </CardBody>
  //           </Card>
  //         </GridItem>
  //       </GridContainer>
  //     );
  //   }

  //   renderResponsForm() {
  //     const { classes } = this.props;
  //     return (
  //       <GridContainer>
  //         <GridItem xs={12} sm={12} md={12}>
  //           <Card>
  //             <CardHeader color="primary">
  //               <h4
  //                 className={classes.cardTitleWhite}
  //               >{`Nova Caravana: Promoters`}</h4>
  //               <p className={classes.cardCategoryWhite}>
  //                 {`Preencha os campos abaixo adicionar um ou mais responsáveis pela accommodationa`}
  //               </p>
  //             </CardHeader>
  //             <CardBody>
  //               {this.renderRespons()}

  //               <Button
  //                 size="small"
  //                 color="secondary"
  //                 aria-label="Remove"
  //                 className={classes.button}
  //                 onClick={this.handleRemovePromoter}
  //               >
  //                 <DeleteIcon />
  //               </Button>

  //               <Button
  //                 size="small"
  //                 color="primary"
  //                 aria-label="Add"
  //                 className={classes.button}
  //                 onClick={this.handleAddPromoter}
  //               >
  //                 <AddIcon />
  //               </Button>
  //               <GridItem xs={12} sm={12} md={12}>
  //                 <Button
  //                   size="small"
  //                   color="secondary"
  //                   aria-label="Add"
  //                   className={classes.button}
  //                   onClick={() => {
  //                     this.setState({ action: 2 });
  //                   }}
  //                 >
  //                   Voltar
  //                 </Button>
  //                 <Button
  //                   size="small"
  //                   color="primary"
  //                   aria-label="Add"
  //                   className={classes.button}
  //                   onClick={() => {
  //                     this.state.indexState == null
  //                       ? this._save()
  //                       : this._update();
  //                   }}
  //                 >
  //                   Salvar
  //                 </Button>
  //               </GridItem>
  //             </CardBody>
  //           </Card>
  //         </GridItem>
  //       </GridContainer>
  //     );
  //   }

  //   renderRespons() {
  //     const { classes } = this.props;

  //     let html = [];

  //     for (let x = 0; x < this.state.promoters.length; x++) {
  //       html.push(
  //         <div>
  //           <h4>Responsável {x + 1}</h4>
  //           <GridItem xs={12} sm={12} md={4}>
  //             <TextField
  //               label="Nome do promoter"
  //               id="name"
  //               value={this.state.promoters[x].name}
  //               onChange={value => this.handleChangePromoter(x, "name", value)}
  //               fullWidth
  //             />
  //           </GridItem>
  //           <GridItem xs={12} sm={12} md={4}>
  //             <TextField
  //               label="WhatsApp"
  //               id="wpp"
  //               value={this.state.promoters[x].wpp}
  //               onChange={value => this.handleChangePromoter(x, "wpp", value)}
  //               fullWidth
  //             />
  //           </GridItem>
  //           <GridItem xs={12} sm={12} md={4}>
  //             <TextField
  //               label="E-mail"
  //               id="email"
  //               value={this.state.promoters[x].email}
  //               onChange={value => this.handleChangePromoter(x, "email", value)}
  //               fullWidth
  //             />
  //           </GridItem>
  //           <GridItem xs={12} sm={12} md={6}>
  //             <TextField
  //               label="Link do Facebook"
  //               id="face_link"
  //               value={this.state.promoters[x].face_link}
  //               onChange={value =>
  //                 this.handleChangePromoter(x, "face_link", value)
  //               }
  //               formControlProps={{
  //                 fullWidth: true
  //               }}
  //             />
  //           </GridItem>
  //           <GridItem
  //             xs={12}
  //             sm={12}
  //             md={6}
  //             container
  //             direction="row"
  //             justify="center"
  //             alignItems="center"
  //           >
  //             <input
  //               accept="image/*"
  //               className={classes.input}
  //               id="outlined-button-file"
  //               type="file"
  //               style={{ display: "none" }}
  //             />
  //             <label htmlFor="outlined-button-file">
  //               <Button
  //                 variant="outlined"
  //                 component="span"
  //                 className={classes.button}
  //               >
  //                 Adicionar Imagem
  //               </Button>
  //             </label>
  //           </GridItem>
  //           <Divider />
  //         </div>
  //       );
  //     }
  //     return html;
  //   }

  //   renderConfirm() {
  //     const { classes } = this.props;
  //     return (
  //       <GridContainer>
  //         <GridItem xs={12} sm={12} md={12}>
  //           <Card>
  //             <CardHeader color="primary">
  //               <h4
  //                 className={classes.cardTitleWhite}
  //               >{`Nova Caravana: Confirmar`}</h4>
  //               <p className={classes.cardCategoryWhite}>
  //                 {`Confirme as informações abaixo para registrar a nova accommodationa`}
  //               </p>
  //             </CardHeader>
  //             <CardBody />
  //             <CardFooter />
  //           </Card>
  //         </GridItem>
  //       </GridContainer>
  //     );
  //   }

  renderSnackbar() {
    return (
      <GridItem xs={12} sm={12} md={4}>
        <Snackbar
          place="tc"
          color={this.state.color}
          icon={InfoIcon}
          message={this.state.notification}
          open={this.state.tc}
          closeNotification={() => this.setState({ tc: false })}
          close
        />
      </GridItem>
    );
  }

  renderList() {
    const { classes } = this.props;
    return (
      <List className={classes.root} subheader={<li />}>
        {this.state.accommodations.map((accommodation, index) => (
          <li key={`section-${index}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>
                <h4
                  style={{
                    backgroundColor: "rgba(49,20,149,.8)",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px"
                  }}
                >
                  {`${accommodation.name}`}
                  <AddIcon
                    style={{
                      float: "right",
                      borderRadius: "100%",
                      border: "1px solid #FFF",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      //   this.setStat, action: 2 });
                    }}
                  />
                </h4>
              </ListSubheader>
            </ul>
          </li>
        ))}
      </List>
    );
  }

  render() {
    const { classes } = this.props;

    switch (this.state.action) {
      case 0:
        return (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              {this.renderSnackbar()}
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Alojamentos Cadastrados
                </h4>
                <p>
                  Área de gerenciamento das alojamentos do site. Você pode inserir
                  uma novo alojamento e editar as os alojamentos já existentes.
                </p>
                <Button
                  onClick={() => this.setState({ action: 1 })}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  round
                  color="success"
                  className={classes.fabButton}
                >
                  <AddIcon /> Novo Alojamento
                </Button>
              </CardHeader>
              <CardBody>
                {/* <Table
                  tableHeaderColor="primary"
                  tableHead={["Estado", "Quantidade", "Ação"]}
                  tableData={this.state.table}
                /> */}
                {this.renderList()}
              </CardBody>
            </Card>
          </GridItem>
        );
      case 1:
        return this.renderFormAccommodation();
      case 2:
      // return this.renderFormCity();
      case 3:
      // return this.renderResponsForm();
    }
  }
}

export default withStyles(styles)(Accommodations);
