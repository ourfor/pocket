import { connect } from '../../../store/connect'

function Device({global, dispatch}) {
    return (
        <div className="devices">
            在线设备
        </div>
    )
}

export default connect(Device)