import React, { Component } from "react";
import PropTypes from "prop-types";
import style from './Modal.module.css';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  static propTypes = {
    showModal: PropTypes.func.isRequired
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyUp, false);
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyUp, false);
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { showModal } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        showModal();
        window.removeEventListener("keyup", this.handleKeyUp, false);
      }
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }

  handleOutsideClick(e) {
    const { showModal } = this.props;

    if (this.modal !== undefined && this.modal !== null) {
      if (!this.modal.contains(e.target)) {
        showModal();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  }

  render() {
    const { showModal, children } = this.props;
    return (
      <div className={style.modalOverlay}>
        <div className={style.modal} ref={node => (this.modal = node)}>
          <div className={style.modalContent}>{children}</div>
        </div>

        <button type="button" className={style.modal_closeButton} onClick={showModal} />
      </div>
    );
  }
}

export default Modal;
