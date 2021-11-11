function Manager(){
    this.lang = null;
    this.week = null;
    this.count = null;
    this.actions = [];

    this.text = '';
    this.day = -1;


    this.DOM = {
        lang: document.querySelector('select[name="lang"]'),
        week: document.querySelector('select[name="week"]'),
        count: document.querySelector('select[name="count"]'),
        form: document.querySelector('form'),
        text: document.querySelector('input[name="text"]'),
        reset: document.querySelector('.setting__reset'),
        daySelector: document.querySelector('select[name="day"]'),
        list: document.querySelector('.list'),
        submit: document.querySelector('.settings-submit'),
        reset: document.querySelector('.setting-reset')
    };

    if(!!localStorage.getItem('data')){
        let data = JSON.parse(localStorage.getItem('data'));

        this.lang = data.lang;
        this.week = data.week;
        this.count = data.count;
        this.actions = data.actions;

        this.DOM.lang.value = this.lang;
        this.DOM.week.value = this.week;
        this.DOM.count.value = this.count;
    }

    const _updateValue = (forceUpdate) => {
        let prev = {
            lang: this.lang,
            week: this.week,
            count: this.count
        };

        this.lang = this.DOM.lang.value;
        this.week = Math.abs(parseInt(this.DOM.week.value));
        this.count = parseInt(this.DOM.count.value);

        this.text = this.DOM.text.value;
        this.day = parseInt(this.DOM.daySelector.value);

        if(this.lang != prev.lang || this.week != prev.week || this.count != prev.count || forceUpdate){
            this.actions = new Array(this.week).fill(0);
            this.actions.forEach((item, index) => {
                this.actions[index] = new Array();
            });
        }

        _stateSettings(!!this.actions.reduce((prev, cur) => [...prev, ...cur]).length);
        _stateSubmit(!(!!this.text && !(this.actions[this.day - 1].length == this.count)));
        _render(this.week != prev.week);

        _save();
    };

    const _reset = () => {
        document.querySelector('form').reset();
        this.actions = [];
        
        _stateSettings(false);
        _stateSubmit(false);

        _updateValue(true);
        _render(true);
    };

    const _add = (text, day) => {
        if(text == '') return;

        _stateSettings(true);

        day -= 1;
    
        if(day < 0 || day >= this.week) return;
        if(this.actions[day].length == this.count) return;

        this.actions[day].push({name: text});

        _updateValue();
    }

    const _stateSettings = (state) => {
        if(state){
            document.querySelector('.setting-params__settings').classList.add('setting-params__settings--off')
        }else{
            document.querySelector('.setting-params__settings').classList.remove('setting-params__settings--off')
        }

        this.DOM.week.disabled = state;
        this.DOM.lang.disabled = state;
        this.DOM.count.disabled = state;
    }

    const _stateSubmit = (state) => {
        this.DOM.submit.disabled = state;
    }

    const _render = (weekChanged) => {

        if(weekChanged){
            let prevDay = this.DOM.daySelector.value;
            this.DOM.daySelector.innerHTML = new Array(this.week).fill(0).map((item, index) => `<option value="${index + 1}">${index + 1}</option>`);
            this.DOM.daySelector.value = prevDay;

            this.DOM.list.innerHTML = '';
        }

        
        new Array(this.actions.length).fill(0).forEach((_, dayIndex) => {
            
            if(!!!document.querySelector(`[data-day="${dayIndex}"]`)){
                let dayNode = document.createElement('div');

                dayNode.className ='list-day';
                dayNode.dataset.day = dayIndex;

                dayNode.innerHTML = `
                    <h1 class="list-day__name">День ${dayIndex + 1}</h1>
                    <div class="list-day__content">

                    </div>
                `;

                this.DOM.list.append(dayNode);
            }

            this.actions[dayIndex].forEach((action, actionIndex) => {
                if(!!!document.querySelector(`[data-day="${dayIndex}"] [data-action="${actionIndex}"]`)){
                    let actionNode = document.createElement('div');

                    actionNode.className ='list-item';
                    actionNode.dataset.action = actionIndex;

                    actionNode.innerHTML = `
                        <div class="list-item__id">День ${dayIndex + 1} Задание ${actionIndex + 1}</div>
                        <div class="list-item__name">${action.name}</div>
                    `;

                    document.querySelector(`[data-day="${dayIndex}"] > .list-day__content`).append(actionNode);
                }
            });
        });
    }

    const _save = () => {
        localStorage.setItem('data', JSON.stringify({
            ...this,
            DOM: null
        }));
    };

    this.DOM.form.addEventListener('submit', (event) => {
        event.preventDefault();

        _add(this.DOM.text.value, parseInt(this.DOM.daySelector.value));
        _render();
    });

    this.DOM.week.addEventListener('change', () => _updateValue());
    this.DOM.count.addEventListener('change', () => _updateValue());
    this.DOM.lang.addEventListener('change', () => _updateValue());
    this.DOM.daySelector.addEventListener('change', () => _updateValue());
    this.DOM.text.addEventListener('input', () => _updateValue());

    this.DOM.reset.addEventListener('click', (event) => {
        _reset();
    });



    _updateValue();
    _render(true);
}

window.onload = () => {
    var man = new Manager();
    // man.render();
};