import Header from "../header/Header";
import Category from "./Category";
import categories from "../../constants/categories";
import { React, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { Zoom } from "react-awesome-reveal";

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  '@global': {
    "@keyframes gradient": {
      '0%': {
        'background-position': '0% 50%'
      },
      '50%': {
        'background-position': '100% 50%'
      },
      '100%': {
        'background-position': '0% 50%'
      }
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
    cursor: 'pointer'

  },
}));
// 'linear-gradient(45deg, #c9c6ff, #bbffe0, #bff4ff, #ffefd0)'

function Menu() {
  useEffect(() => {
    // Set webpage title
    document.title = "Numerical Methods Web Demo";
  });

  const styleClasses = useStyles();

  return (
    <>
      <Header methodName={""} />
      <Box mt={"1em"}>

        <Zoom duration={500} triggerOnce>
          <Grid container spacing={1} style={{ justifyContent: "center" }}>
            {
              categories.map((category, i) => (
                <Grid key={i} item xs={8} sm={8} md={8} lg={8} xl={8}>
                  <Paper className={styleClasses.paper}>
                    <Category category={category} methods={category.methods} />
                  </Paper>
                </Grid>
              ))
            }
          </Grid>
        </Zoom>
      </Box>
    </>

  );
}

export default Menu;