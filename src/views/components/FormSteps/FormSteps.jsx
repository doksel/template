import React, { Component } from "react";
import { Steps, Form } from "antd";
import { connect } from "react-redux";

import FormBottomNavPanel from "../FormBottomNavPanel/FormBottomNavPanel";
import FormLoader from "../FormLoader/FormLoader";

import {
  resetSteps,
  setCurrentStep
} from "../../../state/ducks/formSteps/actions";

import "./FormSteps.module.less";

const { Step } = Steps;

class FormSteps extends Component {
  state = {
    windowInnerWidth: window.innerWidth,
    inTop: true
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    document
      .getElementsByClassName("content-wrap")[0]
      .addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    document
      .getElementsByClassName("content-wrap")[0]
      .addEventListener("scroll", this.onScroll);

    this.props.resetSteps();
  }

  onResize = () => {
    this.setState({ windowInnerWidth: window.innerWidth });
  };

  onNext = () => {
    const { handleSubmit } = this.props;

    handleSubmit(() => {
      this.props.setCurrentStep(this.props.current + 1);
    })();

    this.scrollToTop();
  };

  onBack = () => {
    this.props.setCurrentStep(this.props.current - 1);
    this.scrollToTop();
  };

  onChange = current => {
    this.props.setCurrentStep(current);
    this.scrollToTop();
  };

  onScroll = e => {
    if (e.currentTarget.scrollTop > 50) {
      this.setState({ inTop: false });
    } else {
      this.setState({ inTop: true });
    }
  };

  scrollToTop = () => {
    document.getElementsByClassName("content-wrap")[0].scrollTop = 0;
  };

  nextStepIsWait = () => {
    const { setWaitSteps, current } = this.props;
    const isNextWaitStep = setWaitSteps();

    return isNextWaitStep.includes(current + 2);
  };

  render() {
    const {
      reference,
      leftButtons,
      rightButtons,
      steps,
      current,
      onNext,
      onBack,
      onFinishWork,
      onChange,
      freeBottomSpace,
      isLoading
    } = this.props;

    const { windowInnerWidth, inTop } = this.state;

    return (
      <div className="wrap-steps-form">
        {isLoading && <FormLoader />}

        {steps[0] && (
          <Form
            className={`
              paper
              small-padding-paper
              small-shadow
              ${freeBottomSpace ? "free-bottom-space" : ""}
             `}
            autoComplete="off"
          >
            <Steps
              className={`
                ${!inTop ? "ant-steps-fixed-header" : ""}
                ${isLoading ? "without-scroll" : ""}
              `}
              current={current}
              initial={windowInnerWidth > 810 ? 0 : current}
              size="small"
              onChange={current => {
                this.onChange(current);
                onChange && onChange(current);
              }}
              type="navigation"
            >
              {windowInnerWidth > 810 ? (
                steps.map((item, i) => (
                  <Step
                    key={i}
                    title={item.title}
                    status={item.status}
                    disabled={item.status === "wait"}
                  />
                ))
              ) : (
                <Step
                  key={steps[current].title}
                  title={steps[current].title}
                  status={steps[current].status}
                  disabled={steps[current].status === "wait"}
                />
              )}
            </Steps>

            <div className="steps-content">
              {steps.length && steps[current].content}
            </div>

            <FormBottomNavPanel
              reference={reference}
              steps={steps}
              onFinishWork={onFinishWork}
              activeKey={current}
              leftButtons={leftButtons}
              rightButtons={rightButtons}
              showSubmitButton={current === steps.length - 1}
              disabledNextButton={this.nextStepIsWait()}
              onBack={() => {
                this.onBack();
                onBack && onBack();
              }}
              onNext={e => {
                this.onNext();
                onNext && onNext();
              }}
            />
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ formSteps }) => ({
  steps: formSteps.list,
  current: formSteps.current,
  isLoading: formSteps.isLoading,
  currentStep: formSteps.currentStep
});

const mapDispatchToProps = { resetSteps, setCurrentStep };

export default connect(mapStateToProps, mapDispatchToProps)(FormSteps);
