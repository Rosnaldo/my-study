import { StackContext, StaticSite } from 'sst/constructs';

export default function Stack({ stack, app }: StackContext) {
  stack.tags.setTag('application', '211-west');

  const staticSite = new StaticSite(stack, 'TwoHundredElevenWest', {
    path: '.',
    buildOutput: 'build',
    buildCommand: 'craco build',
    errorPage: 'redirect_to_index_page'
  });

  // Show the endpoint in the output
  stack.addOutputs({
    '211West': staticSite.url
  });
}
