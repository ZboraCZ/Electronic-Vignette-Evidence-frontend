import { useState } from 'react';
import { Card, Grid, Typography, CardContent, CardHeader, IconButton, CardActions, Collapse, Button, Chip } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


const Overview = () => {

    const vignette = {
        vignetteId: 0,
        licensePlate: '4A2 3000',
        serialNumber: 'XXX',
        vignetteType: {
            id: 1,
            name: '10denni',
            display_name: '10ti denní',
            price: 310,
            duration: '10 00:00:00'
        },
        usedId: 0,
        validFrom: '2021-03-27'
    }
    
    return (
        <div>
            <Grid container spacing={1}>
                {[1, 2, 3, 4, 5].map((v, i) => (
                    <Grid item xs={6} sm={4} key={i}>
                        <Vignette vignette={vignette} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Overview;

const Vignette = ({ vignette }) => {
    
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => setExpanded(!expanded);

    const isActive = Boolean(Math.random() < 0.5);
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                >
                    <Typography variant="h5">
                        {vignette.licensePlate}
                    </Typography>
                
                    <Chip 
                        label={isActive ? 'Platná' : 'Neplatná'} 
                        className={isActive ? classes.active : classes.inactive} 
                    />
                </Grid>

                <Typography variant="subtitle1">
                    {vignette.vignetteType.display_name}
                </Typography>
                <Typography variant="h5">
                    Zbývá: 6 dní
                </Typography>
            </CardContent>

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
                    {'zobrazit '}{!expanded ?  `více` : 'méně'}
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Podrobnosti:</Typography>
                    <Typography paragraph>
                        {vignette.validFrom}
                    </Typography>
                </CardContent>
            </Collapse>
      </Card>
    )
}


const useStyles = makeStyles((theme) => {
    console.log(theme)
    return {
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

        }
    }
});
