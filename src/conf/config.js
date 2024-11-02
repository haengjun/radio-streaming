module.exports = {
    'listen': {
        'port': 3000
    },
    'KBS': {
        'useCdn': true,
        'url': 'https://cfpwwwapi.kbs.co.kr/api/v1/landing/live/channel_code/${code}',
        'channel': {
            '1RADIO': '21',
            'CLASSICFM': '24',
            'COOLFM': '25'
        }
    },
    'MBC': {
        'useCdn': true,
        'url': 'https://sminiplay.imbc.com/aacplay.ashx?channel=${code}&protocol=M3U8&agent=webapp',
        'channel': {
            'FM': 'sfm',
            'FM4U': 'mfm',
            'ALLTHATMUSIC': 'chm'
        }
    },
    'SBS': {
        'useCdn': true,
        'url': 'https://apis.sbs.co.kr/play-api/1.0/livestream/${path}/${code}?protocol=hls&ssl=Y',
        'channel': {
            'POWERFM': [
                'powerpc',
                'powerfm'
            ],
            'LOVEFM': [
                'lovepc',
                'lovefm'
            ],
            'GOLLIRAM': [
                'sbsdmb',
                'sbsdmb'
            ]
        }
    },
    'CBS': {
        'useCdn': false,
        'url': {
            'FM': 'https://m-aac.cbs.co.kr/mweb_cbs981/_definst_/cbs981.stream/chunklist.m3u8',
            'MUSICFM': 'https://m-aac.cbs.co.kr/mweb_cbs939/_definst_/cbs939.stream/chunklist.m3u8',
            'JOY4U': 'https://m-aac.cbs.co.kr/mweb_cbscmc/_definst_/cbscmc.stream/chunklist.m3u8'
        }
    },
    "channelName": {
        'KBS-1RADIO': '1Radio',
        'KBS-CLASSICFM': 'ClassicFM',
        'KBS-COOLFM': 'CoolFM',
        'MBC-FM': '표준FM',
        'MBC-FM4U': 'FM4U',
        'MBC-ALLTHATMUSIC': '올댓뮤직',
        'SBS-POWERFM': '파워FM',
        'SBS-LOVEFM': '러브FM',
        'SBS-GOLLIRAM': '고릴라M',
        'CBS-FM': '표준FM',
        'CBS-MUSICFM': '음악FM',
        'CBS-JOY4U': 'JOY4U'
    }
};