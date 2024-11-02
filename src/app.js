let config, express, axios, fs, app, port, server;

// Node Modoule 로딩
config = require('./conf/config');
express = require('express');
axios = require('axios');
fs = require('fs');

// Framework 생성
app = express();

// Request 정의
app.get('/radio', (req, res) => {
    let actCd, statNm, chnlNm, useCdn;

    actCd = req.query.action.toUpperCase();         // 액션명
    statNm = req.query.station.toUpperCase();       // 방송국명
    chnlNm = req.query.channel.toUpperCase();       // 채널명
    
    console.log('\nRequest data - Action: [%s] Station: [%s] Channel: [%s]', actCd, statNm, chnlNm);

    /**
     * CDN을 사용하지 않는 CBS인 경우에는 환경설정에 저장되어 있는 M3U8주소를 사용하고
     * 그외 방송국(KBS, MBC, SBS)인 경우 API를 호출하여 CDN의 Stream URL를 얻어낸다
     */
    useCdn = config[statNm].useCdn;
    if (!useCdn) {
        sendHTML(actCd, res, statNm, chnlNm, config[statNm].url[chnlNm]);
    } else {
        let apiUrl;

        apiUrl = config[statNm].url;
        switch (statNm) {
            case 'SBS':
                apiUrl = apiUrl.replace('${path}', config[statNm].channel[chnlNm][0]);
                apiUrl = apiUrl.replace('${code}', config[statNm].channel[chnlNm][1]);
                break;
            default:
                apiUrl = apiUrl.replaceAll('${code}', config[statNm].channel[chnlNm]);
        }
        console.log('Api URL: %s', apiUrl);
        
        // CDN Server에서 Streaming URL을 얻어내기 위해 Api를 호출한다
        axios
        .get(apiUrl)
        .then(function(resp) {
            /**
             * 방송사별로 응답객체 구조가 다르므로 분기하여 추출한다
             */
            switch (statNm) {
                case 'KBS':
                    sendHTML(actCd, res, statNm, chnlNm, resp.data.channel_item[0].service_url);
                    break;
                default: 
                    sendHTML(actCd, res, statNm, chnlNm, resp.data);
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }    
});

/**
 * 방송사의 채널별 Streaming URL이 추가된 HTML 반환
 * 
 * @param {*} actCd 작업구분
 * @param {*} res 응답객체
 * @param {*} statNm 방송국명
 * @param {*} chnlNm 채널명
 * @param {*} strmUrl 스트리밍주소
 */
function sendHTML(actCd, res, statNm, chnlNm, strmUrl) {
    console.log('Streaming URL: %s', strmUrl);

    // HTML 전송
    fs.readFile(__dirname + '/views/' +  (actCd === 'I' ? 'information': 'player') + '.html', 'utf8', (err, html) => {
        html = html.replace('${stationName}', statNm)
        html = html.replace('${channelName}', config.channelName[statNm + '-' + chnlNm])
        html = html.replace('${streamingUrl}', strmUrl);
        res.status(200);
        res.write(html);
        res.end();
    });
}

// 서버 실행
port = config.listen.port;
server = app.listen(port);
console.log('Server listenning on Port %s', port);