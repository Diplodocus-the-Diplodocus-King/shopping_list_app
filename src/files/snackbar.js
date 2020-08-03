class Snackbar {
    constructor(){
        this.snackbar = document.createElement('div');
    }
    init(){
        this.snackbar.classList.add('snackbar');
        document.querySelector('body').appendChild(this.snackbar);
    }
    show(){
        this.snackbar.textContent = 'scroll down for shopping list';
        this.snackbar.classList.add('active');
        setTimeout(() => {
            this.snackbar.classList.remove('active');
        }, 4000);
    }
}

export {Snackbar as default};