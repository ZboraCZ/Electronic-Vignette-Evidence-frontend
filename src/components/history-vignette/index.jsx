import { useState } from 'react';
import { Card, Grid, Typography, CardContent, CardActions, Collapse, Button, Chip, IconButton, Menu, MenuItem,  } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const HistoryVignette = ({ vignette }) => {
    
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

    const getRemainingText = (valid, duration) => {
        const validFrom = new Date(valid);
        const today = new Date();
        const diff = today.getTime() - validFrom.getTime();
        const diffDays = duration.split(' ')[0] - Math.floor(diff / (1000 * 3600 * 24));
        
        if (diffDays <= 0)
            return '0 dní';
        else if (diffDays === 1) 
            return `${diffDays} den`;
        else
            return `${diffDays} dní`;
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
                        {vignette.licensePlate}
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
                            {getRemainingText(vignette.valid_from, vignette.vignetteType.duration)}
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
                                {vignette.vignetteType.price} Kč
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
