import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './Home.less'
/*actions*/
import { getAsync, sync } from 'actions/home'

import Intl from '@intl';
const { FormattedMessage, 
  FormattedDate, 
  FormattedTime, 
  FormattedNumber, 
  FormattedRelative,
  FormattedPlural,
  formatMessage,
  formatDate,
  formatTime,
  formatRelative,
  formatNumber,
  formatPlural,
  // now
} = Intl
const prefixIntl = 'app.home'


@connect(
  state => state.getIn(['home']),
  dispatch => bindActionCreators({ getAsync, sync }, dispatch)
)
class Home extends React.Component {
  state = {

  }
  componentDidMount() {
    this.props.getAsync()
  }
  render() {
    return (
        <div>
          <h2>FormattedMessage:</h2>
          <FormattedMessage 
            id={`${prefixIntl}.title`}
            values={{
              world: 'world'
            }}
          />
          <br/>
          <h2>FormattedDate:</h2>
          <FormattedDate
            value={new Date()}
            year='numeric'
            month='long'
            day='numeric'
            weekday='long'
          />
          <br/>
          <h2>FormattedNumber:</h2>
          <FormattedNumber value={2000 * 1000}/>
          <br/>
          <h2>FormattedRelative:</h2>
          <FormattedRelative value={+new Date() - (1000 * 60)}/>
          <br/>
          <h2>FormattedTime:</h2>
          <FormattedTime value={+new Date() - (1000 * 60)}/>
          <br/>
          <h2>FormattedPlural:</h2>
          <FormattedPlural 
            value={1000}
            zero="none"
            one="message"
            other="messages"
          />
          <br/>
          <FormattedPlural value={1} zero="none" one="message" other="messages" />
          <br/>
          语言复数规则点击查看：<a rel="noopener noreferrer" target="_blank" href="http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html">http://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html</a>
          <br/>
          <h2>formatMessage:</h2>
          {
            formatMessage({id: `${prefixIntl}.title`}, { world: 'world'})
          }
          <br/>
          <h2>formatDate:</h2>
          {
            formatDate(new Date())
          }
          <br/>
          <h2>formatTime:</h2>
          {
            formatTime(+new Date() - (1000 * 60))
          }
          <br/>
          <h2>formatRelative:</h2>
          {
            formatRelative(+new Date() - (1000 * 60))
          }
          <br/>
          <h2>formatNumber:</h2>
          {
            formatNumber(2000*1000)
          }
          <br/>
          <h2>formatPlural:</h2>
          {
            formatPlural(2, {style: 'ordinal'})
          }
        </div>
    )
  }
}
Home.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}
export default Home
