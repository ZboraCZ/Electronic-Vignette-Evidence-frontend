import DialogTitle from '@material-ui/core/DialogTitle';

const ModalRemove = ({ vignette }) => (
    <DialogTitle>
        Opravdu si přejete zakoupenou známku <strong>{vignette?.licensePlate}</strong> odstranit?
    </DialogTitle>
)

export default ModalRemove;
