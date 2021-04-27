import { useState } from 'react';
import { Card, Grid, Typography, CardContent, CardActions, Collapse, Button, Chip, IconButton, Menu, MenuItem,  } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const Vignette = ({ vignette, handleMenuAction }) => {
    
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const isActive = Boolean(Math.random() < 0.5);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (action) => handleMenuAction(action, vignette.id)
    
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
                        {vignette.licensePlate}
                    </Typography>
                    <IconButton aria-label='settings' edge='end' onClick={handleClick}>  
                        <MoreVertIcon />
                    </IconButton>
                    
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                    >
                        <MenuItem onClick={handleExpandClick}>{'ZOBRAZIT '}{!expanded ?  `VÍCE` : 'MÉNĚ'}</MenuItem>
                        <MenuItem onClick={() => handleAction('extend')}>PRODLOUŽIT PLATNOST</MenuItem>
                        <MenuItem onClick={() => handleAction('delay')}>ODLOŽIT PLATNOST</MenuItem>
                        <MenuItem onClick={() => handleAction('remove')}>ODSTRANIT</MenuItem>
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
                            {vignette.vignetteType.display_name}     
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            ZBÝVÁ
                        </Typography>
                    </Grid>
                    <Grid item xs={6} align="right"> 
                        <Typography variant="body1" className={classes.rightPadding}>
                            6 dní
                        </Typography>
                    </Grid>
                </Grid>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                DATUM ZAKOUPENÍ
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="right"> 
                            <Typography variant="body1" className={classes.rightPadding}>
                                {vignette.validFrom}     
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                CENA
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="right"> 
                            <Typography variant="body1" className={classes.rightPadding}>
                                {vignette.vignetteType.price} 
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle1">
                                SLEVA
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="right"> 
                            <Typography variant="body1" className={classes.rightPadding}>
                                50%
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
export default Vignette;

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
