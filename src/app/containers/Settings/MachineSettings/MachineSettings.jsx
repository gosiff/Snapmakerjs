import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import isEqual from 'lodash/isEqual';
import { NumberInput } from '../../../components/Input';
import i18n from '../../../lib/i18n';
import { actions } from '../../../flux/machine';
import styles from '../form.styl';
import { MACHINE_SERIES } from '../../../constants';


const customOption = {
    value: 'custom',
    label: 'Custom',
    setting: {
        size: {
            x: 125,
            y: 125,
            z: 125
        }
    }
};
const machineSeriesOptions = [
    {
        ...MACHINE_SERIES.ORIGINAL
    },
    {
        ...MACHINE_SERIES.A150
    },
    {
        ...MACHINE_SERIES.A250
    },
    {
        ...MACHINE_SERIES.A350
    },
    customOption
];

class MachineSettings extends PureComponent {
    static propTypes = {
        series: PropTypes.string.isRequired,
        isConnected: PropTypes.bool.isRequired,
        updateMachineSeries: PropTypes.func.isRequired,

        size: PropTypes.object.isRequired,
        updateMachineSize: PropTypes.func.isRequired,

        enclosure: PropTypes.bool.isRequired,
        getEnclosureState: PropTypes.func.isRequired,
        setEnclosureState: PropTypes.func.isRequired
    };

    state = {
        series: '',
        size: {
            x: 0,
            y: 0,
            z: 0
        },
        enclosure: false
    };


    actions = {
        // Machine Model
        onChangeMachineSeries: (option) => {
            this.setState({
                series: option.value,
                size: option.setting.size
            });
        },
        onChangeSizeX: (value) => {
            customOption.setting.size.x = value;

            this.setState(state => ({
                size: {
                    ...state.size,
                    x: value
                }
            }));
        },
        onChangeSizeY: (value) => {
            customOption.setting.size.y = value;

            this.setState(state => ({
                size: {
                    ...state.size,
                    y: value
                }
            }));
        },
        onChangeSizeZ: (value) => {
            customOption.setting.size.z = value;
            this.setState(state => ({
                size: {
                    ...state.size,
                    z: value
                }
            }));
        },

        // Enclosure
        onChangeEnclosureState: (option) => {
            this.setState({
                enclosure: option.value
            });
        },

        // Save & Cancel
        onCancel: () => {
            this.setState({
                series: this.props.series,
                size: this.props.size,
                enclosure: this.props.enclosure
            });
        },
        onSave: () => {
            this.props.updateMachineSeries(this.state.series);
            this.props.updateMachineSize(this.state.size);
            this.props.setEnclosureState(this.state.enclosure);
        }
    };

    constructor(props) {
        super(props);

        this.state.series = props.series;
        this.state.size = props.size;
        this.state.enclosure = props.enclosure;
    }

    componentDidMount() {
        this.props.getEnclosureState();
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.series, this.state.series)) {
            this.setState({ series: nextProps.series });
        }

        if (!isEqual(nextProps.size, this.state.size)) {
            this.setState({ size: nextProps.size });
        }

        if (!isEqual(nextProps.enclosure, this.state.enclosure)) {
            this.setState({ enclosure: nextProps.enclosure });
        }
    }

    render() {
        const options = [
            {
                value: true,
                label: i18n._('On')
            },
            {
                value: false,
                label: i18n._('Off')
            }
        ];

        const stateChanged = (this.state.series !== this.props.series)
            || !isEqual(this.props.size, this.state.size)
            || !isEqual(this.props.enclosure, this.state.enclosure);

        const { series, size, enclosure } = this.state;
        const editable = (this.state.series === 'custom');
        const isConnected = this.props.isConnected;

        return (
            <div className={styles['form-container']} style={{ marginBottom: '55px' }}>
                <p className={styles['form-title']}>{i18n._('Machine')}</p>
                <div className={styles['form-group']}>
                    <div className={classNames(styles['form-control'], styles.short)}>
                        <Select
                            clearable={false}
                            searchable={false}
                            disabled={isConnected}
                            name={i18n._('- Please Select -')}
                            options={machineSeriesOptions}
                            value={series}
                            onChange={this.actions.onChangeMachineSeries}
                        />
                    </div>
                </div>
                <div className={styles['form-group']}>
                    <span>{i18n._('X (Width)')}</span>
                    <div className={classNames(styles['form-control'], styles.short)}>
                        <NumberInput
                            value={size.x}
                            disabled={!editable}
                            onChange={this.actions.onChangeSizeX}
                        />
                        <span className={styles.unit}>mm</span>
                    </div>
                </div>
                <div className={styles['form-group']}>
                    <span>{i18n._('Y (Depth)')}</span>
                    <div className={classNames(styles['form-control'], styles.short)}>
                        <NumberInput
                            value={size.y}
                            disabled={!editable}
                            onChange={this.actions.onChangeSizeY}
                        />
                        <span className={styles.unit}>mm</span>
                    </div>
                </div>
                <div className={styles['form-group']}>
                    <span>{i18n._('Z (Height)')}</span>
                    <div className={classNames(styles['form-control'], styles.short)}>
                        <NumberInput
                            value={size.z}
                            disabled={!editable}
                            onChange={this.actions.onChangeSizeZ}
                        />
                        <span className={styles.unit}>mm</span>
                    </div>
                </div>
                <p className={styles['form-title']}>{i18n._('Enclosure')}</p>
                <div className={styles['form-group']}>
                    <span>{i18n._('Door detection')}</span>
                    <div className={classNames(styles['form-control'], styles.short)}>
                        <Select
                            clearable={false}
                            searchable={false}
                            name={i18n._('Door detection')}
                            options={options}
                            value={enclosure}
                            onChange={this.actions.onChangeEnclosureState}
                        />
                    </div>
                </div>
                <div className={styles['form-actions']}>
                    <div className="row">
                        <div className="col-md-12">
                            <button
                                type="button"
                                className="btn btn-default"
                                onClick={this.actions.onCancel}
                            >
                                {i18n._('Cancel')}
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={!stateChanged}
                                onClick={this.actions.onSave}
                            >
                                <i className="fa fa-save" />
                                <span className="space" />
                                {i18n._('Save Changes')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const machine = state.machine;

    const { series, size, enclosure, isConnected } = machine;

    return {
        series,
        isConnected,
        size,
        enclosure
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateMachineSeries: (series) => dispatch(actions.updateMachineSeries(series)),
        updateMachineSize: (size) => dispatch(actions.updateMachineSize(size)),
        getEnclosureState: () => dispatch(actions.getEnclosureState()),
        setEnclosureState: (on) => dispatch(actions.setEnclosureState(on))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MachineSettings);
