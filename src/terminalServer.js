import rdp from 'node-rdp';
 
rdp({
  address: '192.168.235.50',
  username: 'patrick',
  password: '22041951'
}).then(function() {
  console.log('Conexão encerrada.');
});