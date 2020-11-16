# crontab -e
# * * * * * cd /opt/electinth/con-vote; cron/sync.sh >> /tmp/con-vote-cron.log

# First, make .env in the project root.
# Then, prepare URL to download CSV from Google Sheets:
# File > Publish to the Web > Select sheet / CSV
# Finally, paste the published URL in .env file like this:

# CSV_URL=https://docs.google.com/spreadsheets/d/e/xxx

# Prepare
export LANG='C'
export $(grep -v '^#' .env | xargs)
mkdir -p data
export JSON_FILE=data/live_vote.json
export CSV_FILE=data/live_vote_$(date --iso-8601=minutes).csv
export NODE=/root/n/bin/node
# export NODE=node

# Download data from Google Sheets
# Transform CSV to JSON
curl -L --silent \
  -H 'accept-charset: utf-8' \
  $CSV_URL | sed '1d' > $CSV_FILE 2>&1

# Transform CSV to JSON
cp ${JSON_FILE} ${JSON_FILE}.bk
cat $CSV_FILE | $NODE cron/transform.js --compare ${JSON_FILE}.bk > $JSON_FILE 2>&1

# Upload to production
scp $JSON_FILE electinth@real.elect.in.th:/home/electinth/www/con-vote/data
scp $CSV_FILE electinth@real.elect.in.th:/home/electinth/www/con-vote/data
