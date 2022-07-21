const token = '5493987788:AAFvS1o2JrZTacPfSe-kzIqQx_SICevYgAk';
const chat_id = '5349818305';

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