import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import LinkMaterialUI from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";

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
  }
}));

const numbers = [
  {
    id:1,
    name: "Item 1",
  },
  {
    id:2,
    name: "Item 2",
  },
  {
    id:3,
    name: "Item 3",
  },
  {
    id:4,
    name: "Item 4",
  }
 
];

class SignIn extends React.Component {
  constructor(props) {
    super(props);


    if(this.props.location.state === undefined){
      this.state = {
        isLoading: true,
        username: "",
        response: null
      };
    }else{
      this.state = {
        isLoading: true,
        username: this.props.location.state.username,
        response: null
      };
    }

  }
  componentDidMount() {
    fetch("http://35.233.0.78/netflix/v1/category")
      .then(response => response.json())
      .then(response => {
        this.setState({
          response: response
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    
    //const { classes } = this.props;
    const { username } = this.state.username;
    console.log(this.state);

    if ((this.state.isLoading === false)) {
      return (
        <div>
        <h1>Usuario: {username} </h1>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Error: No se ha podido cargar correctamente el JSON!
        </Typography>
        </div>
      );
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <br />
          <br />
          <h1>Usuario: {username} </h1>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Respuesta JSON:
          </Typography>
         

          {numbers.map(array => (
            
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText id={array.id} primary={array.name} />
              </ListItem>
            </List>
          ))}

          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      );
    }
  }
}

export default withStyles(styles)(SignIn);
