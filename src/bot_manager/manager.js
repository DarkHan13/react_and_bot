const token = '5561256297:AAHBXMkdd-TkzRUfDJmbm1jl8zI9eGV9XzU';
const chat_id = '934977850';

let bot = {
    sendMessage : (message) => {
        return 'https://api.telegram.org/bot' + token +'/sendMessage?chat_id=' +
            '' + chat_id + '&text='
            + message;
    }
}



export default bot;