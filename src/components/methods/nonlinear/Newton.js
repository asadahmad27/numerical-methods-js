import {isValidMath, mathjsToLatex, formatLatex} from "../../utils";
import React, {useState, useEffect} from "react";
import Header from "../../header/Header";
import NewtonDesmos from "./NewtonDesmos";

import { addStyles, EditableMathField } from 'react-mathquill';
import {
    parse, derivative, evaluate, round
  } from 'mathjs';
import { MathComponent } from 'mathjax-react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import HelpIcon from '@material-ui/icons/Help';
import Joyride, { Step as JoyrideStep, CallBackProps as JoyrideCallBackProps} from "react-joyride";
import Collapse from '@material-ui/core/Collapse';
import { Fade, Zoom, Slide, JackInTheBox } from "react-awesome-reveal";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const TOUR_STEPS: JoyrideStep[] = [
    {
        target: ".function-input",
        title: "Function",
        content:
        "Type a math function which only has the variable x.",
        disableBeacon: true,
    },
    {
        target: ".derivative-input",
        title: "Derivative",
        content:
            "The function's derivative will be shown here.",
    },
    {
        target: ".iteration-input",
        title: "Iterations",
        content:
            "Specify the number of iterations to apply Newton's method.",
    },
    {
        target: ".initialX-input",
        title: "Initial x value",
        content:
            "Specify the initial/starting value of x.",
    },
    {
        target: ".results",
        title: "Results",
        content:
            "The results are shown here.",
    },
    {
        target: ".iteration-slider",
        title: "Iteration slider",
        content:
            "Change the slider to view the result of any iteration.",
    },
    {
        target: ".step-math",
        title: "Steps",
        content:
            "The steps for each iteration are shown here.",
    },
    {
        target: ".graph-button",
        title: "View graph",
        content:
            "Click this to visualise the results.",
    },
];

// Styles
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
  container: {
    "& > *": {
        margin: theme.spacing(1)
    }
  },
  card: {
    margin: theme.spacing(0.5),
  },
  cardContent: {
    overflow: 'auto',
    "& > *": {
        margin: theme.spacing(0.5)
    }
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(2),
  },
}));

addStyles(); // inserts the required css to the <head> block for mathquill

function NonlinearNewton({methodName}) {
    const styleClasses = useStyles();

    // Joyride Tour
    const [runTour, setRunTour] = React.useState(false);

    const joyrideCallback = (state: JoyrideCallBackProps) => {
        if (state.action === "reset" || state.action === "close") {
            setRunTour(false);
        }
    };

    // Derivative
    const [functionLatex, setFunctionLatex] = useState('3x^2+2x-8');
    const [functionText, setFunctionText] = useState('');

    let functionValue, derivValue, derivLatex;
    let functionError = false;
    let functionErrorText = "";
    try {
        functionValue = parse(functionText);
        derivValue = derivative(functionText, 'x');
        derivLatex = derivValue.toTex({parenthesis: "keep", implicit: "hide"});
    }
    catch {
        functionError = true;
        functionErrorText = "Invalid equation!";
    }

    // Iterations
    const [iterations, setIterations] = useState(10);
    let iterError = false;
    let iterErrorText = "";
    if (!Number.isInteger(iterations) || iterations <= 0) {
        iterError = true;
        iterErrorText = "Iterations must be a positive integer";
    }

    let hasError = functionError || iterError;

    // Solve
    const [solving, setSolving] = useState(false);
    const [initialX, setInitialX] = useState(0);

    let solve = false;
    let results = [];
    if (isValidMath(functionValue) && !hasError) {
        solve = true;
        for (let i = 0; i < iterations; i++) {
            let previousX = (i === 0) ? initialX: results[i - 1].newX;
            let funcResult, derivResult;
            try {
                funcResult = functionValue.evaluate({x : previousX});
                derivResult = derivValue.evaluate({x : previousX});
            }
            catch {
                hasError = true;
                functionError = true;
                functionErrorText = "Only variable x is allowed!";
                solve = false;
                break;
            }
            
            let newX = previousX - funcResult / derivResult;
            let errorX = Math.abs(newX - previousX);
            results.push({
                previousX,
                funcResult,
                derivResult,
                newX,
                errorX,
            });
        }
    }
    else {
        solve = false;
    }

    let params = {functionValue, derivValue, iterations, results};
    
    return (
        <>
            <Header methodName = {methodName} />
            <Paper className={styleClasses.paper}>
                <Container className={styleClasses.container}>
                <Zoom duration={500} triggerOnce cascade>
                    <Grid container spacing={1} direction="row" alignItems="center" justify="center">
                        <Grid xs item className="function-input">
                            <Card className={styleClasses.card}>
                                <CardContent className={styleClasses.cardContent}>
                                    <Typography variant="h6">
                                        Function:
                                    </Typography>
                                    <EditableMathField
                                        disabled={solving}
                                        latex={functionLatex}
                                        onChange={(mathField) => {
                                            setFunctionText(mathField.text());
                                            setFunctionLatex(mathField.latex());
                                        }}
                                        mathquillDidMount={(mathField) => {
                                            setFunctionText(mathField.text())
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs item className="derivative-input">
                            <Card className={styleClasses.card}>
                                <CardContent className={styleClasses.cardContent}>
                                    <Typography variant="h6">
                                        Derivative:
                                    </Typography>
                                    <Collapse in={functionError}>
                                        <Alert severity="error">
                                            {functionErrorText}
                                        </Alert>
                                    </Collapse>
                                    <Collapse in={!functionError}>
                                        {!functionError && <Fade  triggerOnce><MathComponent tex={derivLatex}/></Fade>}
                                    </Collapse>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>


                    <Grid container spacing={1} direction="row" alignItems="center" justify="center">
                        <Grid xs item className="iteration-input">
                            <Card className={styleClasses.card}>
                                <CardContent className={styleClasses.cardContent}>
                                    <Typography variant="h6">
                                        Iterations:
                                    </Typography>
                                    <TextField
                                    disabled={solving}
                                    type="number"
                                    onChange={(event)=>setIterations(parseInt(event.target.value))}
                                    error={iterError}
                                    label={iterError?"Error":""}
                                    defaultValue={iterations}
                                    helperText={iterErrorText}
                                    variant="outlined"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs item className="initialX-input">
                            <Card className={styleClasses.card}>
                                <CardContent className={styleClasses.cardContent}>
                                    <Typography variant="h6">
                                        Initial x value:
                                    </Typography>
                                    <TextField
                                    disabled={solving}
                                    type="number"
                                    onChange={(event)=>setInitialX(parseFloat(event.target.value))}
                                    label={""}
                                    defaultValue={0.0}
                                    variant="outlined"
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Zoom>
                </Container>
                <Divider  />

            </Paper>
            
            <Collapse in={solve}>
                <Fade>
                    <Paper className={styleClasses.paper}>
                        {solve && <Steps params={params}/>}
                    </Paper>
                </Fade>
            </Collapse>
            <Tooltip arrow title="Help" placement="top">
                <Fab color="secondary" aria-label="help" className={styleClasses.fab} onClick={()=>{setRunTour(true)}}>
                    <HelpIcon />
                </Fab>
            </Tooltip>
            <Joyride
                scrollToFirstStep 
                run={runTour}
                steps={TOUR_STEPS}
                continuous={true}
                showSkipButton={true}
                    locale={{
                    last: "End tour",
                }}
                callback={joyrideCallback}
            />
        </>
    );
}
//  derivValue={derivValue} iterations={iterations} initialValue={initialValue} 

/*
    <Collapse in={!hasError}>
        <Button disabled={solving} variant="contained" color="primary" onClick={startSolve}>
            Solve!
        </Button>
    </Collapse>
*/

function Steps({params}) {

    const styleClasses = useStyles();

    const [currentIteration, setCurrentIteration] = useState(1);
    let hasError = false;
    let errorText = "";

    let results = params.results;
    let currentResult = results[currentIteration - 1];
    //console.log(currentResult);

    let previousXLatex = String.raw`x_{${currentIteration - 1}}`;
    let newXLatex = String.raw`x_{${currentIteration}}`;

    const latexContent =
    String.raw`
    \displaystyle
    \begin{array}{lll}
    \\ ${previousXLatex} &=& ${formatLatex(currentResult.previousX)}
    \\ f(${previousXLatex}) &=& ${formatLatex(currentResult.funcResult)}
    \\ f'(${previousXLatex}) &=& ${formatLatex(currentResult.derivResult)}
    \\ ${newXLatex} &=& x_${currentIteration - 1} - \frac{f(${previousXLatex})}{f'(${previousXLatex})}
    \\                       &=& ${formatLatex(currentResult.newX)}
    \\ Error &=& |${newXLatex} - ${previousXLatex}|
    \\       &=& |${formatLatex(currentResult.errorX)}|
    \end{array}
    `;

    const smallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    useEffect(() => {
        //setSolving(false)
    });
    
    return (
        <Container className={styleClasses.container}>

            <Collapse in={hasError}>
                <Alert severity="error">
                    {errorText}
                </Alert>
            </Collapse>
            <Collapse in={!hasError}>

                <Grid className="results" container direction={smallScreen?"column":"row"} alignItems="center" justify="space-evenly">
                    <Grid xs item className="iteration-slider">
                        <Slide direction="left" triggerOnce>
                        <Box id="iteration-slider" height={smallScreen?null:"20rem"} width={smallScreen?"70vw":null}>
                            
                            <Slider
                                orientation={smallScreen?"horizontal":"vertical"}
                                onChange={(event, value) => setCurrentIteration(value)}
                                defaultValue={1}
                                aria-labelledby="discrete-slider-small-steps"
                                step={1}
                                marks
                                min={1}
                                max={params.iterations}
                                valueLabelDisplay="on"
                            />
                            
                        </Box>
                        </Slide>
                    </Grid>
                    <Grid xs item container spacing={1} direction="column" alignItems="center" justify="center">
                        <Grid xs item className="step-math">
                            <JackInTheBox triggerOnce>
                            <Card className={styleClasses.card}>
                                <CardContent className={styleClasses.cardContent}>
                                    <Typography variant="h6">
                                        Iteration {currentIteration}:
                                    </Typography>
                                    <MathComponent tex={latexContent}/>
                                </CardContent>
                            </Card>
                            </JackInTheBox>
                        </Grid>
                    </Grid>
                    <Grid xs item className="graph-button">
                        <Slide direction="right" triggerOnce>
                        <NewtonDesmos params={{currentIteration, smallScreen, ...params}} />
                        </Slide>
                    </Grid>
                </Grid>

            </Collapse>

        </Container>
    )
}

export default NonlinearNewton;

/*
                            <Grid container spacing={1} alignItems="center" justify="center">
                                <Grid key={0} item xs={12} sm={6} md={4} lg={4} xl={4}>
                                    
                                </Grid>
                            </Grid>
*/
/*
                    <Card className={styleClasses.card}>
                        <CardContent className={styleClasses.cardContent}>
                            <Typography variant="h6">
                                Iteration {currentIteration}
                            </Typography>
                            <Box mx={"2rem"}>
                                <Slider
                                    className={styleClasses.slider}
                                    orientation="vertical"
                                    onChangeCommitted={(event, value) => setCurrentIteration(value)}
                                    defaultValue={1}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={1}
                                    marks
                                    min={1}
                                    max={params.iterations}
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                    */