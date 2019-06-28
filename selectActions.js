class SmartSelects {

  constructor() {
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

  init() {
    let elementList = document.querySelectorAll(this.selector);
    elementList.forEach((element) => {
      element.insertAdjacentHTML('afterbegin', `<option>${this.devaultValue}</option>`);
      for (let key in this.options) {
        element.insertAdjacentHTML('beforeend', `<option value="${key}">${this.options[key]}</option>`);
      }
    });
  }

  changeSelect(value) {
    console.log(document.querySelector(`option[value="${value}"]`));
    let elementList = document.querySelectorAll(`option[value="${value}"]`);
    elementList.forEach((element) => {
      element.style.display = "none";
    });
  };  
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

let list = document.querySelectorAll(select.selector);
list.forEach((element) => {
  element.onchange = function() { 
    select.changeSelect(this.value);
  };
});