import React from 'react';
import ReactDOM from 'react-dom';
// importing components
import { ReactComponent as Close } from '../assets/images/cancel.svg';
// importing utils
import { setRef } from '../utils/generalFunctions';
// importing styles 
import './styles/Modal.css';

const isIos = /iP(hone|od|ad)/i.test(window.navigator.platform);

class Modal extends React.Component {
    static isContentBiggerThanWindow(contentRef) {
        return contentRef.offsetHeight >= window.innerHeight  - (Math.ceil(parseFloat(getComputedStyle(contentRef).marginTop) * 2));
    }

    constructor(props) {
        super(props);
        this.closeIconClickHandler = this.closeIconClickHandler.bind(this);
        this.closeModalTimeoutHandler = this.closeModalTimeoutHandler.bind(this);
        this.scapeKeyHandler = this.scapeKeyHandler.bind(this);
        this.setInitialTargetOnClickOrTap = this.setInitialTargetOnClickOrTap.bind(this);
        this.avoidIosOverflowScroll = this.avoidIosOverflowScroll.bind(this);
        this.setMutationObserver = this.setMutationObserver.bind(this);
        this.mutationObserverCallback = this.mutationObserverCallback.bind(this);
        this.setCenteredModal = this.setCenteredModal.bind(this);
        this.centerModalOnResize = this.centerModalOnResize.bind(this);
        this.searchForElementsWithOverflow = this.searchForElementsWithOverflow.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setRef = setRef.bind(this);
        this.zIndex = 200;
        this.elementsWithInternalScroll =[];
        this.isOverlayTarget = false;
        this.setGlobalCloseModal();
    }
    componentDidMount() {
        this.setCenteredModal();
        this.searchForElementsWithOverflow();
        document.body.classList.add('modal-opened');
        document.addEventListener('keydown', this.scapeKeyHandler);
        window.addEventListener('resize', this.centerModalOnResize);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.scapeKeyHandler);
        document.removeEventListener('resize', this.centerModalOnResize);
        document.documentElement.style.setProperty('--modal-display', 'flex');
        this.modalRef.removeEventListener('touchmove', this.avoidIosOverflowScroll);
        this.modalRef.removeEventListener('touchstart', this.avoidIosOverflowScroll);
        if (document.body.classList.contains('modal-opened')) document.body.classList.remove('modal-opened');
        if (this.closeModalTimeout) clearTimeout(this.closeModalTimeout);

        if (window.__modals && window.__modals.length === 1) {
            delete window.__modals;
            delete window.__modalZIndex;
        } else {
            this.removeModalFromWindowObject();
        }
        this.removeGLobalCloseModal();
    }
    setGlobalCloseModal() {
        if (this.props.identifier) {
            if (!window.__mountedModals) window.__mountedModals = {};
            window.__mountedModals[this.props.identifier] = this.closeModalTimeoutHandler;
        }
    }
    removeGLobalCloseModal() {
        if (this.props.identifier && window.__mountedModals && window.__mountedModals[this.props.identifier]) 
            delete window.__mountedModals[this.props.identifier];
    }
    centerModalOnResize() {
        if (this.didMutationsLoad) window.clearTimeout(this.didMutationsLoad);
        this.didMutationsLoad = window.setTimeout(this.setCenteredModal, 500);
    }
    setMutationObserver() {
        this.mutationObserver = new MutationObserver(this.mutationObserverCallback);
        this.mutationObserver.observe(this.modalContentRef, {childList: true, subtree: true});
    }
    mutationObserverCallback(mutationList) {
        mutationList.forEach(() => {
            this.setCenteredModal('mutations');
        });
    }
    setCenteredModal(type = null) {
        this.isContentBiggerThanViewportHeight = Modal.isContentBiggerThanWindow(this.modalContentRef);
        if (this.isContentBiggerThanViewportHeight) {
            document.documentElement.style.setProperty('--modal-display', 'block');
            if (!type) this.mutationObserver.disconnect();
        }
        if (type && this.props.haveSecondaryScroll) {
            if (this.didAllMutationsLoad) window.clearTimeout(this.didAllMutationsLoad);
            this.didAllMutationsLoad = window.setTimeout(() => {
                this.searchForElementsWithOverflow();
                this.mutationObserver.disconnect();
            }, 10);
        }
    }
    searchForElementsWithOverflow() {
        if (isIos) {
            Array.prototype.slice.call(this.modalContentRef.getElementsByTagName('*')).forEach(el => {
                if (getComputedStyle(el).overflow === 'auto') {
                    this.elementsWithInternalScroll.push(el);
                }
            });
        }
    }
    closeIconClickHandler() {
        this.closeModalTimeoutHandler();
    }
    setInitialTargetOnClickOrTap(e) {
        this.isOverlayTarget = e.target === this.modalRef && e.nativeEvent.offsetX < this.modalRef.clientWidth;
    }
    closeModal(e) {
        if (this.isOverlayTarget && e.target === this.modalRef && e.nativeEvent.offsetX < this.modalRef.clientWidth) 
            this.closeModalTimeoutHandler();
    }
    scapeKeyHandler(e) {
        if (this.modalContentRef && e.keyCode === 27) this.closeModalTimeoutHandler();
    }
    async closeModalTimeoutHandler() {
        return new Promise(resolve => {
            if (typeof this.props.closeModal === 'function' && this.zIndex === window.__firstModal) {
                if (this.modalContentRef) this.modalContentRef.classList.add('hide');
                if (this.closeModalTimeout) clearTimeout(this.closeModalTimeout);
                this.closeModalTimeout = window.setTimeout(() => {
                    // window.__firstModal -= 1;
                    clearTimeout(this.closeModalTimeout);
                    // this.removeModalFromWindowObject();
                    this.props.closeModal();
                    resolve(true);
                }, 100);
            }
        });
    }
    removeModalFromWindowObject() {
        if (window.__modals) {
            window.__modals.pop();
            window.__firstModal -= 1;
            window.__modalZIndex -= 1;
            if (window.__modals.length === 0) window.__modals = null;
        }
    }
    addModalToWindowObject() {
        if (window.__modals) {
            if (this.modalRef && window.__modals.indexOf(this.modalRef) === -1) {
                window.__modalZIndex += 1;
                window.__firstModal += 1;
                this.zIndex += 1;
                this.modalRef.style.zIndex = window.__modalZIndex;
                window.__modals.push(this.modalRef);
            }
        } else if (this.modalRef) {
            this.modalRef.style.zIndex = this.zIndex;
            window.__modalZIndex = (new Number(this.zIndex)).valueOf();
            window.__firstModal = (new Number(this.zIndex)).valueOf();
            window.__modals = [this.modalRef];
        }
    }
    avoidIosOverflowScroll(e) {
        if (e.type === 'touchstart') {
            this.initialPoint = e.changedTouches[0].clientY;
            if (this.props.haveSecondaryScroll && isIos) {
                for (const el of this.elementsWithInternalScroll) {
                    if (el.outerHTML.includes(e.target.outerHTML)) {
                        this.secondaryBox = el;
                        return;
                    }
                }
                this.secondaryBox = false;
            }
            return;
        }
        if (e.type === 'touchmove') {
            let currentPosition = this.initialPoint - e.changedTouches[0].clientY;
            if (!this.isContentBiggerThanViewportHeight || this.disableModalScroll(currentPosition) || currentPosition >= 0 && this.didModalContainerScroll(currentPosition)) {
                if (!this.isContentBiggerThanViewportHeight || this.shouldPreventModalScroll(currentPosition) || this.shouldPreventSecondaryBoxScroll(currentPosition)) {
                    e.preventDefault();
                }
                return;
            }
            return;
        }
    }
    shouldPreventModalScroll(currentPosition) {
        return (!this.secondaryBox && (currentPosition >= 0 && this.didModalContainerScroll(currentPosition)) || !this.secondaryBox && this.disableModalScroll(currentPosition));
    }
    shouldPreventSecondaryBoxScroll(currentPosition) {
        return this.secondaryBox && (this.disableBoxScroll(currentPosition) || this.didSecondaryBoxScroll() && this.didModalContainerScroll());
    }
    disableModalScroll(currentPosition) {
        return (this.modalRef.scrollTop <= 0 && currentPosition <= 0);
    }
    didModalContainerScroll() {
        return (this.modalContentRef.offsetHeight - this.modalRef.scrollTop) === this.modalRef.offsetHeight;
    }
    disableBoxScroll(currentPosition) {
        return (this.secondaryBox.scrollTop <= 0 && currentPosition <= 0);
    }
    didSecondaryBoxScroll() {
        const childToScroll = this.secondaryBox && this.secondaryBox.firstElementChild;
        if (!childToScroll) return false;
        return (childToScroll.offsetHeight - this.secondaryBox.scrollTop) === this.secondaryBox.offsetHeight;
    }
    renderModal() {
        const { contentClassName, withCloseIcon } = this.props;
        return (
            <div 
                ref={this.setRef.bind(this, 'modalRef', () => {
                    this.addModalToWindowObject();
                    if (isIos) {
                        this.modalRef.addEventListener('touchstart', this.avoidIosOverflowScroll);
                        this.modalRef.addEventListener('touchmove', this.avoidIosOverflowScroll);
                    }
                })}
                {...Object.assign({}, isIos ? {onTouchStart: this.setInitialTargetOnClickOrTap} : {onMouseDown: this.setInitialTargetOnClickOrTap})}
                {...Object.assign({}, isIos ? {onTouchEnd: this.closeModal} : {onMouseUp: this.closeModal})}
                className="modal-overlay modal-position">
                <div 
                    ref={this.setRef.bind(this, 'modalContentRef', () => {
                        this.modalContentRef.classList.add('active');
                        this.setMutationObserver();
                    })} 
                    className={`modal-content-container ${contentClassName}`}>
                    {
                        withCloseIcon && (
                            <div onClick={this.closeIconClickHandler} className="modal-close-icon flex-c-v-center">                
                                <Close />
                            </div>
                        )
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
    render() {
        return ReactDOM.createPortal(
            this.renderModal(),
            document.body
        );
    }
}
Modal.defaultProps = {
    contentClassName: '',
    withCloseIcon: true
}
export default Modal;
