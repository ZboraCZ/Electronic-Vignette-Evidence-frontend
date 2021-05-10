import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Card, Grid, Typography, CardContent, CardActions, Collapse, Button, Chip, IconButton, Menu, MenuItem,  } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import { getVignettes } from 'store/user';
import clsx from 'clsx';

const HistoryVignette = ({ vignette }) => {

    const vignettesState = useSelector(getVignettes)
    const { types } = vignettesState;
    const vignetteType = types.find(type => type.id == vignette.vignette_type_id);

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getEndDateText = (valid, duration) => {
        const validFrom = new Date(valid);
        const duration_split = parseInt(duration.split(' ')[0])
        const validTo = validFrom
        validTo.setDate(validFrom.getDate() + duration_split)
        return validTo
    }

    const dateFormat = (date) => {
        const d = new Date(date);
        return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Typography variant="h4">
                        {vignette.license_plate}
                    </Typography>
                    <IconButton aria-label='settings' edge='end' onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleExpandClick}>{'ZOBRAZIT '}{!expanded ?  `VÍCE` : 'MÉNĚ'}</MenuItem>
                    </Menu>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            VARIANTA
                        </Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                        <Typography variant="body1" className={classes.rightPadding}>
                            {vignetteType.display_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            ŽAČÁTEK
                        </Typography>
                    </Grid>
                    <Grid item xs={6} align="right">
                        <Typography variant="body1" className={classes.rightPadding}>
                            {dateFormat(vignette.valid_from)}
                        </Typography>
                    </Grid>
                </Grid>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                KONEC
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <Typography variant="body1" className={classes.rightPadding}>
                                {dateFormat(getEndDateText(vignette.valid_from, vignetteType.duration))}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                DATUM ZAKOUPENÍ
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <Typography variant="body1" className={classes.rightPadding}>
                                {dateFormat(vignette.created)}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                CENA
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="right">
                            <Typography variant="body1" className={classes.rightPadding}>
                                {vignetteType.price} Kč
                            </Typography>
                        </Grid>
                    </Grid>
                    <CardActions>
                        <Button
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            color='primary'
                        >
                            {'ZOBRAZIT '}{!expanded ?  `VÍCE` : 'MÉNĚ'}
                        </Button>
                    </CardActions>
                </Collapse>
            </CardContent>
      </Card>
    )
}
export default HistoryVignette;

const useStyles = makeStyles((theme) => ({
        iconButton: {
            margin: '0px'
        },
        expand: {
        marginLeft: 'auto',
        },
        active: {
            background: theme.palette.success.main,
            color: '#FFF',
            marginLeft: 'auto'
        },
        inactive: {
            background: theme.palette.error.main,
            color: '#FFF'
        },
        rightPadding: {
            paddingRight: '10px',
        },
}));
