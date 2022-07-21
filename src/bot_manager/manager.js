const token = '5436942647:AAELD7OQ0goybzWOzDb2oiO9AT9JbsK-lzw';
const chat_id = '1829511432';

let bot = {
    sendMessage : (message) => {
        return 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +
            '' + chat_id + '&text='
            + message + '&parse_mode=html';
    },
    getUpdates : () => {
        return 'https://api.telegram.org/bot' + token + '/getUpdates'
    },
    getUpdatesOffset : (offset) => {
        return 'https://api.telegram.org/bot' + token + '/getUpdates?offset=' + offset
    }
}



export default bot;