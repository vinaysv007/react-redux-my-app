require('babel-register')({
    presets: ['env']
});

require('./server');
require('./chat/chat');