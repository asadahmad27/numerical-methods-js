import styles from './Header.module.css';
import { generatePath } from "../utils";
import categories from "../../constants/categories";
import MethodInfo from '../MethodInfo';
import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    homeButton: {
        marginRight: theme.spacing(0),
    },
    githubButton: {
        marginRight: theme.spacing(0),
    },
    infoButton: {
        marginLeft: theme.spacing(0),
    },
    dropDownButton: {
        color: 'white',
    },
    inputRoot: {
        color: 'white',
        '&$notchedOutline': {
            borderColor: `white !important`,
        },
    },
    inputLabel: {
        color: 'white'
    },
    notchedOutline: {
        borderWidth: '2px',
        borderColor: 'white !important'
    },
    listItem: {
        transition: 'transform 0.2s',
        "&:hover": {
            '-ms-transform': 'scale(1.1)', /* IE 9 */
            '-webkit-transform': 'scale(1.1)', /* Safari 3-8 */
            'transform': 'scale(1.1)',
        },
    },
}));

const dialogStyles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DialogTitle = withStyles(dialogStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        overflow: 'visible',
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const searchOptions = categories.map((category, i) => (
    category.methods.map((method, j) => {
        return { category: category.name, categoryPath: category.path, methodName: method.name, methodPath: method.path };
    })
)).reduce((previous, next) => previous.concat(next), []);

function Header({ methodName, markdown }) {
    const styleClasses = useStyles();
    const smallScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    let title = methodName ? methodName : "Numerical Methods";


    return (
        <div className={styleClasses.root}>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Tooltip arrow title="GitHub" placement="bottom">
                            <IconButton rel="noopener noreferrer" href="" target="_blank" edge="start" className={styleClasses.githubButton} color="inherit" aria-label="GitHub">
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title="Home" placement="bottom">
                            <IconButton component={Link} to={'/'} edge="start" className={styleClasses.homeButton} color="inherit" aria-label="Home">
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                        <Fade>
                            <Typography variant={smallScreen ? "subtitle1" : "h6"} className={styleClasses.title} noWrap={!smallScreen}>
                                {title}
                            </Typography>
                        </Fade>


                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </div>
    );
}
export default Header;