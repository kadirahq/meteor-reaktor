Package.describe({
  name: 'kadira:reaktor',
  summary: 'Easy to use React Frontend for FlowRouter',
  version: '1.0.0',
  git: 'https://github.com/kadirahq/meteor-reaktor.git'
});

Package.onUse(function(api) {
  configure(api);
  api.export('Reaktor');
  api.export('Router');
  api.export('Route');
});

Package.onTest(function(api) {
  api.addFiles('test/init.jsx', 'server');
  configure(api);
  api.use('react');
  api.use('tinytest');
  api.use('random');

  api.addFiles('test/fakescript.js', 'client', {isAsset: true});
  api.addFiles('test/client.jsx', 'client');
  api.addFiles('test/server.jsx', 'server');
});


function configure(api) {
  api.use('react@0.1.4');
  api.use('kadira:flow-router@2.0.0', ['client', 'server'], {weak: true});
  api.use('kadira:flow-router-ssr@3.0.0', ['client', 'server'], {weak: true});
  api.use('kadira:react-layout@1.2.0', ['client', 'server']);
  api.imply('kadira:react-layout@1.2.0', ['client', 'server']);

  api.addFiles('lib/both.jsx', ['client', 'server']);
}