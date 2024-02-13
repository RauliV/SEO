Purpose of this demo is to automate Google Trends searches. 
To do this, it uses g-trends -module. (MIT License)

Due to some failed requests, app will 

- read words from INPUT_FILE (default = 'wordlist.txt')
- make requests
- if request is succesfull, appends results to RESULTS_FILE (default = 'results.txt')
- if request is failed, appends failed words to FAILED_FILE (default = 'failed.txt')
- and remove requested words from original INPUT_FILE

Searches are now considering possible rate limits limiting searches to 5 sets, 5 words/set = 25 words/run.

Example request (past 3 months, broad search):

"request": {
        "url": "https://trends.google.com/trends/api/widgetdata/multiline/csv",
        "method": "GET",
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.8,he;q=0.6,ru;q=0.4,es;q=0.2,de;q=0.2,la;q=0.2",
            "cache-control": "no-cache",
            "cookie": "",
            "pragma": "no-cache",
            "referer": "https://trends.google.com/trends/explore",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36"
        },
        "qs": {
            "hl": "en-US",
            "tz": "-180",
            "req": "{\"time\":\"2023-11-13 2024-02-13\",\"resolution\":\"DAY\",\"locale\":\"en-US\",\"comparisonItem\":[{\"geo\":{},\"complexKeywordsRestriction\":{\"keyword\":[{\"type\":\"BROAD\",\"value\":\"Metsä\"}]}},{\"geo\":{},\"complexKeywordsRestriction\":{\"keyword\":[{\"type\":\"BROAD\",\"value\":\"Kuu\"}]}},{\"geo\":{},\"complexKeywordsRestriction\":{\"keyword\":[{\"type\":\"BROAD\",\"value\":\"Sportti\"}]}},{\"geo\":{},\"complexKeywordsRestriction\":{\"keyword\":[{\"type\":\"BROAD\",\"value\":\"Silmä\"}]}},{\"geo\":{},\"complexKeywordsRestriction\":{\"keyword\":[{\"type\":\"BROAD\",\"value\":\"Suru\"}]}}],\"requestOptions\":{\"property\":\"\",\"backend\":\"IZG\",\"category\":0},\"userConfig\":{\"userType\":\"USER_TYPE_SCRAPER\"}}",
            "token": "APP6_UEAAAAAZcx_rEmi_tIDsX_sEn2uUHIoOTGi185z"
        }
    }
