class Modal{
    constructor(selector){
        this.modal = document.querySelector(selector);
        this.overlay = document.querySelector('.overlay')
    }
    show(){
        this.modal.classList.add('show');
        this.overlay.classList.add('show')
    }
    hide(){
        this.modal.classList.remove('show');
        this.overlay.classList.remove('show')
    }
}