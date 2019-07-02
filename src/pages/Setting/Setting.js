import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './Setting.less'
/*actions*/
import { getAsync, sync } from 'actions/home'

import Intl from '@intl';
const { FormattedMessage, 
} = Intl
const prefixIntl = 'app.Setting'


@connect(
  state => state.getIn(['home']),
  dispatch => bindActionCreators({ getAsync, sync }, dispatch)
)
class Setting extends React.Component {
  state = {

  }
  componentDidMount() {
    this.props.getAsync()
  }
  render() {
    return (
        <div>
            <FormattedMessage 
                id={`${prefixIntl}.title`}
            />
        </div>
    )
  }
}
Setting.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}
export default Setting
