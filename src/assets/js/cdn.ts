((window: Window & typeof globalThis, document: Document) => {
  class CreateContainer {
    public src: any;
    public path: String = 'http://127.0.0.1:5500/dist/';
    // public path: String = 'https://laura-cdn.azurewebsites.net/dist/';
    private arrMenu: Array<string> = [
      '¿Cómo conocer mi deuda con Movistar?',
      '¿Cuándo se reinicia mi plan?',
      '¿Cómo obtener mi boleta?',
      '¿Cómo saber cuál es el número asociado a mi servicio?',
      '¿Cuáles son los lugares y medios de pago de Movistar?'
    ];

    constructor() { }

    public init(src: any) {
      this.src = src;
      this.createContainer();
      this.getPostMessage();
    }
    
    private openWidget() {
      const geButton = document.querySelector('.button-floating');
      const getContainer = document.querySelector('.widget-container');
      if (geButton.classList.contains('open-widget')) {
        getContainer.setAttribute('style', 'transform-origin: right bottom');
        if (getContainer.classList.contains('turn')) {
          getContainer.classList.remove('turn');
          setTimeout(() => {
            getContainer.classList.remove('open-container');
            geButton.classList.remove('open-widget');
          }, 500)
        } else {
          getContainer.classList.remove('open-container');
          geButton.classList.remove('open-widget');
        }
    
      } else {
        geButton.classList.add('open-widget');
        getContainer.classList.add('open-container');
        getContainer.setAttribute('style', 'transform-origin: right bottom');
      }
    }

    private closeHelp() {
      const widgetCont = document.querySelector('.widget-container'),
            buttonHelp = document.querySelector('.widget-container_header_buttons button');

      if (widgetCont.classList.contains('turn')) {
        widgetCont.classList.remove('turn');
        buttonHelp.classList.remove('active');
      }
    }

    private createContainerHelp(helpCont: any) {
      const contHelp = document.createElement('div'),
        contElements = document.createElement('div'),
        contHeader = document.createElement('h3'),
        createButtonClose = document.createElement('button'),
        createImgButton = document.createElement('img');
      
      createButtonClose.addEventListener('click', this.closeHelp);
      createImgButton.setAttribute('src', `${this.path}assets/img/img-button-close.svg`)
      createButtonClose.appendChild(createImgButton);
      contHelp.classList.add('widget-container-help');
      contHeader.innerText = 'Quizás buscas lo siguiente';
      contElements.appendChild(createButtonClose);
      contElements.appendChild(contHeader);
      contHelp.appendChild(contElements);
      helpCont.appendChild(contHelp);
      this.createMenuHelp(contElements, this.arrMenu);
    }

    private createMenuHelp(menuCont: any, listArray: Array<string>) {
      const contMenu = document.createElement('ul');
      for (let item of listArray) {
        const listItem = document.createElement('li'),
              divItem = document.createElement('div');
        divItem.innerText = item;
        divItem.addEventListener('click', () => {
          this.closeHelp();
          this.sendKGB(item);
        });
        listItem.appendChild(divItem);
        contMenu.appendChild(listItem);
      }
      menuCont.appendChild(contMenu);
    }

    private sendKGB(kgb: any) {
      const getIframe = document.querySelector('iframe.laura-widget-iframe');
      this.sendPostMessage(getIframe.contentWindow, { kgb: kgb });
    }

    private createContainerButtons(buttonsConst: any, arrButtons: Array<String>) {
      const createUl = document.createElement('ul');
      for (let item of arrButtons) {
        const list = document.createElement('li');
        this.createHeadersButtons(list, item);
        createUl.appendChild(list);
      }
      buttonsConst.appendChild(createUl);
    }

    private createHeadersButtons(buttonCont: any, icon: String) {
      const createButton = document.createElement('button'),
            iconButton = document.createElement('img');
      createButton.addEventListener('click', () => {
        const event = `window.LauraWidget.${icon}(this)`;
        eval(event);
      })
      iconButton.setAttribute('src', `${this.path}assets/img/img-${icon}.svg`);
      createButton.appendChild(iconButton);
      buttonCont.appendChild(createButton);
    }

    private createHeader(headerCont: any) {
      const widgetContainerHeader = document.createElement('div'),
            widgetContainerLogo = document.createElement('div'),
            widgetContainerLogoImg = document.createElement('img'),
            widgetContainerTitle = document.createElement('div'),
            widgetContainerButtons = document.createElement('div');
      widgetContainerHeader.classList.add('widget-container_header');
      widgetContainerTitle.innerHTML = '<strong>Asistente Digital</strong> Movistar';
      widgetContainerTitle.classList.add('widget-container_header_title');
      widgetContainerButtons.classList.add('widget-container_header_buttons');
      widgetContainerLogoImg.setAttribute('src', `${this.path}assets/img/img-movistar-header.png`);
      widgetContainerLogo.classList.add('widget-container_header_logo');
      widgetContainerLogo.appendChild(widgetContainerLogoImg);
      widgetContainerHeader.appendChild(widgetContainerLogo);
      widgetContainerHeader.appendChild(widgetContainerTitle);
      widgetContainerHeader.appendChild(widgetContainerButtons);
      this.createContainerButtons(widgetContainerButtons, ['buttonHelp']);
      headerCont.appendChild(widgetContainerHeader);
    }

    public buttonHelp(el: any) {

      const getContainer = document.querySelector('.widget-container');

      if (el.classList.contains('active')) {
        el.classList.remove('active');
      } else {
        el.classList.add('active');
        getContainer.removeAttribute('style');
        getContainer.classList.add('turn');
      }
    }

    public getPostMessage() {
      const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      const eventer = window[eventMethod];
      const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

      eventer(messageEvent, function (e: any) {
        const getButtonHelp = document.querySelector('.widget-container_header_buttons button');
        if (e.data === "blockHelp" || e.message === "blockHelp") {
          getButtonHelp.setAttribute('disabled', 'disaled');
        }
        if (e.data === "enabledHelp" || e.message === "enabledHelp") {
          getButtonHelp.removeAttribute("disabled");
        }
        if (e.data.action === "CLOSE_CHATBOT") {
          window.LauraWidget.openWidget();
        }
      });
    }

    private sendPostMessage(iframe: any, message: any) {
      iframe.postMessage(message, "*");
      return false;
    }

    private createToggleButton(divCont: any) {
      const button = document.createElement('button'),
            spanImgs = document.createElement('span'),
            imgFloating = document.createElement('img'),
            imgButton = document.createElement('img'),
            spanText = document.createElement('span');
      
      button.classList.add('button-floating');
      imgFloating.setAttribute('src', `${this.path}assets/img/img-button-floating.svg`);
      imgButton.setAttribute('src', `${this.path}assets/img/img-button-close.svg`);
      spanImgs.appendChild(imgFloating);
      spanImgs.appendChild(imgButton);
      spanText.innerHTML = 'Te podemos <strong>ayudar</strong>';
      button.appendChild(spanImgs);
      button.appendChild(spanText);
      divCont.appendChild(button);

      button.addEventListener('click', this.openWidget);
    }

    private createContainer() {
      const containerDiv = document.createElement('div'),
        widgetContainer = document.createElement('div'),
        infoContainer = document.createElement('div');
      
      infoContainer.classList.add('widget-container-front');
      
      containerDiv.setAttribute('id', 'laura-widget-wrapper');
      widgetContainer.classList.add('widget-container');
      widgetContainer.appendChild(infoContainer);
      containerDiv.appendChild(widgetContainer);

      this.createHeader(infoContainer);
      this.createIframe(infoContainer);
      this.createToggleButton(containerDiv);
      this.createContainerHelp(widgetContainer);
      this.setUp();

      document.body.appendChild(containerDiv);
    }

    private createIframe(iframeCont: any) {
      const widgetBody = document.createElement('div'),
            ifrm = document.createElement('iframe');
      widgetBody.classList.add('widget-body');
      ifrm.classList.add('laura-widget-iframe');
      ifrm.setAttribute('allow', 'geolocation *;');
      ifrm.setAttribute('src', this.src);
      widgetBody.appendChild(ifrm);
      iframeCont.appendChild(widgetBody);
    }

    private setUp() {
      const getHead:any = document.head;
      const link = document.createElement("link");
      link.href = `${this.path}assets/css/laura-widget-cdn-style.css`;
      link.type = "text/css";
      link.rel = "stylesheet";
      link.media = "screen, print";
      getHead.appendChild(link);
    }
  }

  window.LauraWidget = new CreateContainer();
})(window, document);

window.addEventListener('load', async () => {
  await window.LauraWidget.init('https://canales-dig-dev-widget.azurewebsites.net/');
});


interface Window {
  LauraWidget: any;
}
