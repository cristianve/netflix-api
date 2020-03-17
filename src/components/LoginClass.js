import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import LinkMaterialUI from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListIcon from "@material-ui/icons/List";
import Button from "@material-ui/core/Button";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import MainFeaturedResponse from "./MainFeaturedResponse";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <LinkMaterialUI color="inherit" href="https://material-ui.com/">
        Your Website
      </LinkMaterialUI>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const mainFeaturedPost = {
  title: "Usuario Logeado",
  description: "Welcome, tú nombre de usuario es :",
  image: "https://source.unsplash.com/random",
  imgText: "Main Banner Image Description"
};

const mainFeaturedPostJSON = {
  title: "Respuesta JSON:",
  description: "",
  image: "https://source.unsplash.com/random",
  imgText: "Main Banner Image Description"
};
const styles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  heroContent: {
    backgroundColor: "#002884",
    padding: theme.spacing(8, 2, 6)
  }
}));

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.location.state === undefined) {
      this.state = {
        isLoading: true,
        username: "",
        response: [],
        backgroundColor: ""
      };
    } else {
      this.state = {
        isLoading: true,
        username: this.props.location.state.username,
        response: [],
        backgroundColor: ""
      };
    }
  }
  componentDidMount() {
    fetch("http://35.233.0.78/netflix/v1/category")
      .then(response => response.json())
      .then(response => {
        this.setState({
          response: response.data,
          backgroundColor: response.data[0].color
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { classes } = this.props;
    const { username } = this.state.username;

    const everis = "Everis";
    if (this.state.isLoading === false) {
      return (
        <div>
          <Header title={everis} />
          <h1>Usuario: {username} </h1>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Error: No se ha podido cargar correctamente el JSON!
          </Typography>
        </div>
      );
    } else {
      return (
        //JSON CARGADO CORRECTAMENTE
        <div className={classes.heroContent}>
          <CssBaseline />
          <Header title={everis} />
          <MainFeaturedPost post={mainFeaturedPost} />
          <Container component="main" maxWidth="xs">
            <Grid container justify="center" alignItems="center" spacing={4}>
              <Grid item xs={12}>
                <Paper>
                  <Typography
                    style={{ marginBottom: 24 }}
                    variant="h3"
                    align="center"
                  >
                    {username}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <MainFeaturedResponse
            post={mainFeaturedPostJSON}
            backgroundColor={this.state.backgroundColor}
          />

          <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item xs={12}>
              <Paper>
                <Grid container justify="center">
                  {this.state.response.map((array, index) => (
                    <List
                      key={index}
                      subheader={
                        <ListSubheader>
                          Listado Tipo -- Available:
                        </ListSubheader>
                      }
                      component="nav"
                      aria-label="main mailbox folders"
                    >
                      <ListItem   button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.button}
                          startIcon={<ListIcon />}
                        >
                          <ListItemText
                          
                            align="center"
                            id={array.id}
                            primary={array.name + "  " + array.available}
                          />
                        </Button>
                      </ListItem>
                      <ArrowDownwardIcon />
                    </List>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      );
    }
  }
}

export default withStyles(styles)(SignIn);
