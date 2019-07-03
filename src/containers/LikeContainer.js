import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

import LikeVenue from '../components/LikeVenue.js'
import withAuth from '../hocs/withAuth'

class LikeContainer extends React.Component {
  state = {
    likes: this.props.likes
  }

  componentDidMount() {
    if (this.state.likes.length <= 0) {
      setTimeout(() => {
        this.setState({
          likes: this.props.likes
        })
      }, 1500)
    }
  }

  updateStateLikes = (restId, messageObj) => {
    // update the liked venue's updated_at so that it can resort itself to the top when new messages come in
    this.state.likes.find(r => r.id === restId).updated_at = messageObj.updated_at

    // sort the venues
    const sortMessage = this.state.likes.sort((a,b) => {
      return b.updated_at.localeCompare(a.updated_at)
    })

    // update the local state
    this.setState({
      likes: sortMessage
    })
  }

  showLikes = () => {
    const sortByMessage = this.state.likes.sort((a,b) => {
      return b.updated_at.localeCompare(a.updated_at)
    })

    return sortByMessage.map(like => {
      return (
        <LikeVenue
          key={like.id}
          like={like}
          updateStateLikes={this.updateStateLikes}
          updateMessages={this.props.updateMessages}
          selectVenue={this.props.selectVenue} />
      )
    })
  }

  render() {
    console.log("LikeContainer state", this.state)
    return (
      <div>
        {this.state.likes.length <= 0 ? 'See all the venues you have liked here.' : this.showLikes()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    likes: state.currentUser.liked
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectVenue: venue => {
      dispatch({ type: 'SELECT_VENUE', venue: venue })
    },
    updateMessages: messageObj => {
      dispatch({ type: 'SEND_MESSAGE', payload: messageObj })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(LikeContainer))
