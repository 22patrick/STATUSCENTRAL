
// // var Service = require('node-windows').Service;
// import { Service, EventLogger } from 'node-windows';

// // Create a new service object
// var svc = new Service({
//     name: 'onestatus',
//     description: 'Status central Ip.',
//     script: 'C:\\CENTRAL_IP\\server backend\\src\\server.js'
// });

// var log = new EventLogger('One Status');

// log.info('Basic information.');
// log.warn('Watch out!');
// log.error('Something went wrong.');
// // Listen for the "install" event, which indicates the
// // process is available as a service.
// svc.on('install', function () {
//     svc.start();
// });

// svc.install();

import { Service } from 'node-windows';

// Create a new service object
var svc = new Service({
  name:'One Status',
  description: 'Serviço One central Ip.',
  script: 'C:\\CENTRAL_IP\\server backend\\src\\server.js',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();