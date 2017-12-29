import * as React from 'react';

import * as Modal from 'react-modal';
import { connect } from 'react-redux';
import './modal.css';
import { changeColor } from '../../actions/game';
import { toggleModal } from '../../actions';

type Props = {
    open: boolean,
    colorify: (color: string) => void;
};

class UnoModal extends React.Component<Props> {
    render () {
        let { open, colorify } = this.props;
        return (
            <Modal 
                isOpen={open}
                contentLabel="Pick the next color!"
                ariaHideApp={false}
            >
                <div className="grid">
                    <div className="box red" onClick={() => colorify('red')} />
                    <div className="box green" onClick={() => colorify('green')} />
                    <div className="box blue" onClick={() => colorify('blue')} />
                    <div className="box yellow"onClick={() => colorify('yellow')}  />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        open: state.modal.open
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        colorify: (color: string) => {
            dispatch(changeColor(color));
            dispatch(toggleModal());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnoModal);