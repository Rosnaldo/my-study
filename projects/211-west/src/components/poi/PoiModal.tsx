import { HotspotMap } from '~/api';
import { Modal, makeStyles } from '@evolutionv/vysta-ui';
import HotspotModalView from './hotspot-modal-view';
import { parseTags } from '.';
import { Close } from '@material-ui/icons';

const useStyle = makeStyles(() => ({
  modalContainer: {
    height: '80vh',
    width: '80vw',
    margin: 'auto',
    position: 'relative'
  },
  close: {
    position: 'absolute',
    right: '0.5em',
    top: '0.5em',
    fill: 'white'
  }
}));

export const PoiModal: React.FC<{
  open: boolean;
  area: HotspotMap;
  onClose: () => void;
  mediaSrc?: string;
}> = ({ open, onClose, mediaSrc, area }) => {
  const classes = useStyle();

  const tags = parseTags(area.tag || '');

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={area.name}
      className={classes.modalContainer}
    >
      <>
        <Close onClick={onClose} className={classes.close} />
        <HotspotModalView
          areaName={area.name}
          description={area.descriptionPopUp || ''}
          mediaSrc={mediaSrc || ''}
          {...tags}
        />
      </>
    </Modal>
  );
};
