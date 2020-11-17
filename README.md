# Live Consitution Vote

This is a live web app to real-time reporting of votes of contitutional amendment bills. The project is a light-weight and real-time with minimum resources and efforts. [Visit website](https://elect.in.th/con-vote).

- Real-time vote result data is managed on Google Sheets
- Cron job to transform the above data to JSON and upload as a static file
- Web app to display vote results with auto live refresh

Technologies we used:

- Nuxt.js
- Google Sheets
- Cron job, curl, Node.js, scp

On page load, it'll read config and keep polling vote data every a few minutes.

| File | URL |
|--|--|
| Config | https://elect.in.th/con-vote/data/config.json |
| Live Data (Test) | https://elect.in.th/con-vote/data/live_vote_dev.json |
| Live Data (Production) | https://elect.in.th/con-vote/data/live_vote.json |

## Config

We can easily update config file with following parameters:

```js
{
  // Production or test environment. Default to true (Test)
  "test": true,
  // Data source for production environment
  "live_vote_url": "https://elect.in.th/con-vote/data/live_vote.json",
  // Data source for test environment
  "test_live_vote_url": "https://elect.in.th/con-vote/data/live_vote_dev.json",
  // Time range to show "Live" marker
  "start_live": "2020-11-19T12:00:00+0700",
  "end_live": "2020-11-19T14:10:00+0700"
}
```

## Environments
### Development

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

Because it'll fetch config and data from `https://elect.in.th`, it'll fail because CORS violation. You can bypass this security restriction for development purpose by using browser utilities such as [this Chrome extension](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related).

### Production

Generate static website, then deploy `dist/` directory to web server.

```bash
# generate static project
$ npm run generate
```

