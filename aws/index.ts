import * as aws from '@pulumi/aws';

export const provider = new aws.Provider('ckuro-aws', {
  region: 'us-east-2',
});