import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { NumberInput } from '../../components/Input';
import i18n from '../../lib/i18n';
import styles from './index.styl';

class Cnccom extends PureComponent {
    static propTypes = {
        laserState: PropTypes.object,
        controllerState: PropTypes.object,
        onchangeFocusHeight: PropTypes.func,
        onchangeLaserPrecent: PropTypes.func,
        onchangeLaserState: PropTypes.func,
        executeGcode: PropTypes.func
        // focusHeight: PropTypes.number,
        // laserPercent: PropTypes.number
    };

    state = {
    };

    actions = {
    }

    render() {
        const { laserState, controllerState } = this.props;
        const { onchangeLaserPrecent, onchangeFocusHeight, onchangeLaserState } = this.props;
        const { laserPercent, focusHeight, txtFocusX, txtFocusY, txtFocusZ, txtMovementX, txtMovementY, txtMovementZ, relativeMode } = laserState;
        return (
            <div>
                <div>
                    <p>{i18n._('Laser')}</p>
                    <ul style={{ listStyle: 'none' }}>
                        <li>
                            <p className={styles['title-row']}>current percent</p>
                            <p className={styles['title-row']}>{controllerState.headPower}</p>
                            <p className={styles['title-row']}>{controllerState.spindleSpeed}</p>

                        </li>
                        <li>
                            <NumberInput
                                className={styles['input-setting']}
                                value={laserPercent}
                                onChange={onchangeLaserPrecent}
                            />
                            <button className={styles['btn-func']} type="button" onClick={() => this.props.executeGcode(`M3 P${laserPercent}`)}>
                                Set Percent
                            </button>
                        </li>

                        <li>
                            <NumberInput
                                className={styles['input-setting']}
                                value={focusHeight}
                                onChange={onchangeFocusHeight}
                            />
                            <button className={styles['btn-func']} type="button" onClick={() => this.props.executeGcode('get laser focus')}>
                                Get Focus High
                            </button>
                            <button className={styles['btn-func']} type="button" onClick={() => this.props.executeGcode('set laser focus', { focusHeight })}>
                                Set Focus High
                            </button>
                        </li>
                        <li>
                            <button className={styles['btn-func']} type="button" onClick={() => this.props.executeGcode('draw calibration')}>
                                Rraw Calibration
                            </button>
                            <button className={styles['btn-func']} type="button" onClick={() => this.props.executeGcode('draw ruler')}>
                                Rraw Ruler
                            </button>
                        </li>
                        <li>
                            <NumberInput
                                className={styles['input-setting']}
                                value={txtFocusX}
                                onChange={(value) => { onchangeLaserState({ txtFocusX: value }); }}
                            />
                            <NumberInput
                                className={styles['input-setting']}
                                value={txtFocusY}
                                onChange={(value) => { onchangeLaserState({ txtFocusY: value }); }}
                            />
                            <NumberInput
                                className={styles['input-setting']}
                                value={txtFocusZ}
                                onChange={(value) => { onchangeLaserState({ txtFocusZ: value }); }}
                            />
                            <button className={styles['btn-func']} type="button" onClick={() => this.props.executeGcode('enter set focus', { laserState })}>
                                Enter Set Focus
                            </button>
                            <button className={styles['btn-func']} type="button" onClick={() => this.props.executeGcode('G92 X0 Y0')}>
                                Set Original
                            </button>
                        </li>
                        <li>
                            <NumberInput
                                className={styles['input-setting']}
                                value={txtMovementX}
                                onChange={(value) => { onchangeLaserState({ txtMovementX: value }); }}
                            />
                            <NumberInput
                                className={styles['input-setting']}
                                value={txtMovementY}
                                onChange={(value) => { onchangeLaserState({ txtMovementY: value }); }}
                            />
                            <NumberInput
                                className={styles['input-setting']}
                                value={txtMovementZ}
                                onChange={(value) => { onchangeLaserState({ txtMovementZ: value }); }}
                            />
                            <button className={styles['btn-func']} type="button" onClick={() => { onchangeLaserState({ relativeMode: !relativeMode }); }}>
                                {relativeMode ? i18n._('Relative coordinates') : i18n._('Absolute coordinates')}
                            </button>
                            <button className={styles['btn-func']} type="button" onClick={() => this.props.executeGcode('laser move require', { laserState })}>
                                Move Require
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Cnccom;