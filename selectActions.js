class SmartSelects {

  constructor() {
   this.arrOfChanges = {};
  }

  setSelector(selector) {
    this.selector = selector;
  }

  setOptions(options) {
    this.options = options;
  }

  setDefaultValue(value) {
    this.devaultValue = value;
  }

  setPartOfSet(elementList){
    let i = 1;
    elementList.forEach((element) => {
      element.setAttribute('data-item', i)
      i++;
    });
  }

  init() {
    let elementList = document.querySelectorAll(this.selector);
    this.setPartOfSet(elementList);
    elementList.forEach((element) => {
      element.insertAdjacentHTML('afterbegin', `<option value="">${this.devaultValue}</option>`);
      for (let key in this.options) {
        element.insertAdjacentHTML('beforeend', `<option value="${key}">${this.options[key]}</option>`);
      }
    });

    this.ifOnChange();

  }

  changeSelect(value, NumberOfSelect) {
    if (value == '') {
      let elementList = document.querySelectorAll(`option[value="${this.arrOfChanges[NumberOfSelect]}"]`);
      elementList.forEach((element) => {
        element.style.display = "block";
      });
      delete this.arrOfChanges[NumberOfSelect];

    } else {
      let elementList = document.querySelectorAll(`option[value="${value}"]`);     
      
      elementList.forEach((element) => {
        element.style.display = "none";
      });
    };   
    }

  ifOnChange() {
    let list = document.querySelectorAll(this.selector);
    list.forEach((element) => {
      let self = this;

      element.onchange = function() { 
        let NumberOfSelect = this.getAttribute('data-item');
      
        if (this.value != '') {   
          self.arrOfChanges[NumberOfSelect] = this.value;  
        }

        select.changeSelect(this.value, NumberOfSelect);
      };
    });
  }
    
}


const select = new SmartSelects();

select.setSelector('.vegetables');

select.setOptions({
  tomato: "Cerry",
  corn: "Waxy corn",
  potato: "Potato",
  kabbage: "Kabbage",
  cucamber: "Cucamber"
});

select.setDefaultValue("Nothing");

select.init();


