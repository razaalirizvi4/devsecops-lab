// Deliberately insecure lab code. Never use it in a real project.
const { exec } = require('child_process');
const express = require('express');
const _ = require('lodash');
const config = require('./config');

function createApp() {
  const app = express();
  app.use(express.json());

  const settings = { theme: 'light', language: 'en' };

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/info', (req, res) => {
    res.json({ service: 'task-api', paymentKeyConfigured: Boolean(config.paymentApiKey) });
  });

  // Looks up a host name, for example /resolve?host=localhost
  app.get('/resolve', (req, res) => {
    const host = req.query.host;
    exec(`nslookup ${host}`, (err, stdout) => {
      res.json({ output: stdout });
    });
  });

  // Evaluates an expression, for example /calc?expr=2+3
  app.get('/calc', (req, res) => {
    const result = eval(req.query.expr);
    res.json({ result });
  });

  // Updates the settings with the JSON body.
  app.post('/settings', (req, res) => {
    const patch = eval('(' + JSON.stringify(req.body) + ')');
    _.merge(settings, patch);
    res.json(settings);
  });

  return app;
}

module.exports = { createApp };
