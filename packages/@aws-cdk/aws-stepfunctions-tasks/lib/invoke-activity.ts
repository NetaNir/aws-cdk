import sfn = require('@aws-cdk/aws-stepfunctions');
import { Duration } from '@aws-cdk/core';

/**
 * Properties for FunctionTask
 */
export interface InvokeActivityProps {
  /**
   * Maximum time between heart beats
   *
   * If the time between heart beats takes longer than this, a 'Timeout' error is raised.
   *
   * @default No heart beat timeout
   */
  readonly heartbeat?: Duration;
}

/**
 * A StepFunctions Task to invoke a Lambda function.
 *
 * A Function can be used directly as a Resource, but this class mirrors
 * integration with other AWS services via a specific class instance.
 */
export class InvokeActivity implements sfn.IStepFunctionsTask {
  constructor(private readonly activity: sfn.IActivity, private readonly props: InvokeActivityProps = {}) {
  }

  public bind(_task: sfn.Task): sfn.StepFunctionsTaskConfig {
    return {
      resourceArn: this.activity.activityArn,
      metricDimensions: { ActivityArn: this.activity.activityArn },
      heartbeat: this.props.heartbeat,
      // No IAM permissions necessary, execution role implicitly has Activity permissions.
      metricPrefixSingular: 'Activity',
      metricPrefixPlural: 'Activities',
    };
  }
}
