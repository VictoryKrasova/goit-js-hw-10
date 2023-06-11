import { refs }  from '../cmn/refs.js'

export default function hideMsg() {
    refs.loadingMsg.classList.add('visually-hidden');
}

