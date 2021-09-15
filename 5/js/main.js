function Manager(){
    this.lang = 'eng';
    this.week = 5;
    this.actions = [];

    if(!!localStorage.getItem('data')){
        let data = JSON.parse(localStorage.getItem('data'));

        this.lang = data.lang;
        this.week = data.week;
        this.actions = data.actions;

        if(!this.actions.length){
            this.disabledSettings(false);
        }else{
            this.disabledSettings(true);
        }
        
    }

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();


        this.disabledSettings(true);

        this.addAction(document.querySelector('textarea').value);
        document.querySelector('textarea').value = '';
        this.render();
        this.save();
    });

    document.querySelector('select[name="week"]').addEventListener('change', (event) => {
        this.week = event.target.value;
        this.render();
        this.save();
    });

    document.querySelector('select[name="lang"]').addEventListener('change', (event) => {
        this.lang = event.target.value;
        this.render();
        this.save();
    });

    document.querySelector('textarea').addEventListener('input', (event) => {
        document.querySelector('input[type="submit"]').disabled = event.target.value == '' || this.actions.length == this.week;
    });

    document.querySelector('button').addEventListener('click', (event) => {
        this.reset();
        this.render();
        this.save();
    });
}

Manager.prototype.disabledSettings = function(state){
    document.querySelector('select[name="week"]').disabled = state;
    document.querySelector('select[name="lang"]').disabled = state;
    document.querySelector('input[type="submit"]').disabled = state;
}

Manager.prototype.reset = function(){
    this.lang = 'eng';
    this.week = 5;
    this.actions = [];

    this.disabledSettings(false);
};

Manager.prototype.save = function(){
    localStorage.setItem('data', JSON.stringify(this));
};

Manager.prototype.addAction = function(text){
    if(this.actions.length < this.week){
        this.actions.push({
            action: text
        });
    }
};

Manager.prototype.getActions = function(){
    let items = [...this.actions];

    for(let i = items.length; i < this.week; i++){
        items.push({action: ''});
    }

    return items;
};

Manager.prototype.render = function(){
    document.querySelector('select[name="lang"]').value = this.lang;
    document.querySelector('select[name="week"]').value = this.week;

    document.querySelector('.list').innerHTML = this.getActions().map((item, index) => {
        return `
            <div class="list-item">
                <div class="list-item__day">${index + 1}</div>
                <div class="list-item__action">${item.action == '' ? 'Свободный день' : item.action}</div>
            </div>
        `;
    }).join('');
};

window.onload = () => {
    var man = new Manager();
    man.render();
};