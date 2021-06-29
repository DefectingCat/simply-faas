import process from 'process';
import { VM } from 'vm2';

type fnData = {
  action: 'run';
  fn: () => unknown;
};

// Listen function form master process
process.on('message', (data: fnData) => {
  // Convert user function to IIFE
  const fnIIFE = `(${data.fn.toString()})()`;
  const result = new VM().run(fnIIFE);
  // Sent result to master process
  process.send?.({ result });
  process.exit();
});
