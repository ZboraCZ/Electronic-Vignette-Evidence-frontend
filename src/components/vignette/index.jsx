import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Card, Grid, Typography, CardContent, CardActions, Collapse, Button, Chip, IconButton, Menu, MenuItem,  } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { fetchVignetteByLicencePlate } from 'api/vignettes'
import Loader from 'components/shared/loader';

const Vignette = ({ licensePlate, handleMenuAction, types }) => {
    
    const classes = useStyles();
    
    const [vignette, setVignette] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [vignettes, setVignettes] = useState([]);
    const [v, setV] = useState(null);
    
    const open = Boolean(anchorEl);

    const handleExpandClick = () => setExpanded(!expanded);

    useEffect(() => {
    
        fetchVignetteByLicencePlate(licensePlate).then(res => {

            setVignette(res.data)
        })
    }, [licensePlate]);


    useEffect(() => {
        
        if (!!Object.keys(types).length && !!Object.keys(vignette).length) {

            const vignettes = vignette.map(v => ({ 
                ...v, 
                vignetteType: types.find(type => type.id == v.vignette_type_id),
                hasStarted: () => {
                    const today = new Date().getTime();
                    const date = new Date(v.valid_from).getTime()
                    return (today >= date)
                } 
            }))
            setVignettes(vignettes);
        }
       
    }, [types, vignette])



    const handleClick = (event, v) => {
        setV(v);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (action) => {
        handleMenuAction(action, v)
    }

    const getDaysDiff = (valid, duration) => {
        const validFrom = new Date(valid)
        const today = new Date();
        const diff = today.getTime() - validFrom.getTime();
        const diffDays = duration.split(' ')[0] - Math.floor(diff / (1000 * 3600 * 24));

        if (diffDays === 1) 
            return `${diffDays} den`;
            
        return `${diffDays} dní`;
    }

    const dateFormat = (date) => {
        const d = new Date(date);
        return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
    }   

    const lpFormat = (lp) => `${lp.substring(0, 3)} ${lp.substring(3 , lp.length)}`

    return vignettes.map((v, i) => (
        <Grid item xs={6} sm={6} key={i}>
            <Card className={classes.root}>
                <CardContent>
                    <Grid 
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                    
                        <Typography variant="h4">
                            {lpFormat(licensePlate)}     
                        </Typography>
                        <IconButton aria-label='settings' edge='end' onClick={e => handleClick(e, v)}>  
                            <MoreVertIcon />
                        </IconButton>


                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                        >
                            <MenuItem onClick={handleExpandClick}>{'ZOBRAZIT '}{!expanded ? `VÍCE` : 'MÉNĚ'}</MenuItem>
                            <MenuItem onClick={() => handleAction('extend')}>PRODLOUŽIT PLATNOST</MenuItem>
                            <MenuItem onClick={() => handleAction('delay')}>ODLOŽIT PLATNOST</MenuItem>
                            <MenuItem onClick={() => handleAction('remove')}>ODSTRANIT</MenuItem>
                        </Menu>
                    </Grid>
                    <>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">
                                {v.hasStarted() ? 'VARIANTA' : (
                                    <Chip 
                                        size="small"
                                        label="NEAKTIVNÍ"
                                    />
                                )}
                                </Typography>
                            </Grid>

                            <Grid item xs={6} align="right"> 
                                <Typography variant="body1" className={classes.rightPadding}>
                                    {v.vignetteType?.display_name}     
                                </Typography>
                            </Grid>
                            
                            {v.hasStarted ? (
                            <>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">
                                        ZBÝVÁ
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} align="right"> 
                                    <Typography variant="body1" className={classes.rightPadding}>
                                        {getDaysDiff(v.valid_from, v.vignetteType.duration)}
                                    </Typography>
                                </Grid>   
                            </>
                            ) : (
                            <>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle1">
                                        ZAČÍNÁ
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} align="right"> 
                                    <Typography variant="body1" className={classes.rightPadding}>
                                        {dateFormat(v.valid_from)}
                                    </Typography>
                                </Grid>   
                            </>
                            )}
                            
                        </Grid>

                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">
                                    ZAKOUPENO
                                </Typography>
                            </Grid>
                            <Grid item xs={6} align="right"> 
                                <Typography variant="body1" className={classes.rightPadding}>
                                    {dateFormat(v.created)}     
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">
                                    AKTIVNÍ OD
                                </Typography>
                            </Grid>
                            <Grid item xs={6} align="right"> 
                                <Typography variant="body1" className={classes.rightPadding}>
                                    {dateFormat(v.valid_from)}     
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1">
                                    CENA
                                </Typography>
                            </Grid>
                            <Grid item xs={6} align="right"> 
                                <Typography variant="body1" className={classes.rightPadding}>
                                    {v.vignetteType?.price} Kč
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
                    </>     
                </CardContent>
            </Card>
        </Grid>
    ))
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
        notActiveChip: {
            float: 'right'
        }
}));
