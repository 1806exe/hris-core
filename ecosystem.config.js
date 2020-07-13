module.exports = {
  apps : [{
    name: 'hr',
    script: './src/main.ts',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '8G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}