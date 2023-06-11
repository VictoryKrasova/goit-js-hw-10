import { refs }  from '../cmn/refs.js'

export default function showMsg() {
    refs.loadingMsg.classList.remove('visually-hidden');
}