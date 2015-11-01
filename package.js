Package.describe({
  name: 'kadira:reaktor',
  summary: 'Easy to use React Frontend for FlowRouter',
  version: '1.0.1',
  git: 'https://github.com/kadirahq/meteor-reaktor.git'
});

Package.onUse(function(api) {
  configure(api);
  api.export('Reaktor');
  api.export('Router');
  api.export('Route');
});

Package.onTest(function(api) {

});

function configure(api) {
  api.versionsFrom('1.0');
  api.use('underscore');
  api.use('react@0.14.1_1');
  api.use('kadira:flow-router@2.0.0', ['client', 'server'], {weak: true});
  api.use('kadira:flow-router-ssr@3.0.0', ['client', 'server'], {weak: true});
  api.use('kadira:react-layout@1.5.1', ['client', 'server']);
  api.imply('kadira:react-layout@1.5.1', ['client', 'server']);

  api.addFiles('lib/both.jsx', ['client', 'server']);
}
