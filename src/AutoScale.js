import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ere from 'element-resize-event'

export default class AutoScale extends Component {
  static propTypes = {
    children: PropTypes.node,
    wrapperClass: PropTypes.string,
    containerClass: PropTypes.string,
    contentClass: PropTypes.string,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxScale: PropTypes.number,
  }

  static defaultProps = {
    wrapperClass: '',
    containerClass: '',
    contentClass: '',
  }

  constructor() {
    super()

    this.state = {
      wrapperSize: { width: 0, height: 0 },
      contentSize: { width: 0, height: 0 },
      scale: 1,
    }
  }

  componentDidMount() {
    const { wrapper, content } = this.refs
    const actualContent = this.contentNode

    this.updateState({
      ...this.state,
      contentSize: {
        width: actualContent.offsetWidth,
        height: actualContent.offsetHeight,
      },
      wrapperSize: {
        width: wrapper.offsetWidth,
        height: wrapper.offsetHeight,
      },
    })

    ere(actualContent, () => {
      this.updateState({
        ...this.state,
        contentSize: {
          width: actualContent.offsetWidth,
          height: actualContent.offsetHeight,
        },
      })
    })

    ere(wrapper, () => {
      this.updateState({
        ...this.state,
        wrapperSize: {
          width: wrapper.offsetWidth,
          height: wrapper.offsetHeight,
        },
      })
    })
  }

  updateState(newState) {
    const { maxHeight, maxWidth, maxScale } = this.props
    const { wrapperSize, contentSize } = newState

    let scale = wrapperSize.width / contentSize.width

    if (maxHeight) {
      scale = Math.min(
        scale,
        maxHeight / contentSize.height
      )
    }
    if (maxWidth) {
      scale = Math.min(scale, maxWidth / contentSize.width)
    }
    if (maxScale) {
      scale = Math.min(scale, maxScale)
    }

    this.setState({
      ...newState,
      scale,
    })
  }

  getRef = node => (this.contentNode = node)

  render() {
    const { scale, contentSize } = this.state
    const {
      children,
      wrapperClass,
      containerClass,
      contentClass,
    } = this.props
    const containerHeight = scale * contentSize.height
    const containerWidth = scale * contentSize.width

    return (
      <div
        ref="wrapper"
        className={wrapperClass}
        style={{
          ...this.props.style,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            height: containerHeight,
            width: containerWidth,
          }}
        >
          {children({ getRef: this.getRef, scale })}
        </div>
      </div>
    )
  }
}
