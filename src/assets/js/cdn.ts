((window: Window & typeof globalThis, document: Document) => {
  class CreateContainer {
    public src: any;
     // path = hhtp://www.rutaabsoluta.cl/
    public path: String = '';

    constructor() { }

    public init(src: any) {
      this.src = src;
      this.createContainer();
    }

    private openWidget() {
      const geButton = document.querySelector('.button-floating');
      const getContainer = document.querySelector('.widget-container');

      if (geButton.classList.contains('open-widget')) {
        getContainer.classList.remove('open-container');
        geButton.classList.remove('open-widget');
      } else {
        geButton.classList.add('open-widget');
        getContainer.classList.add('open-container')
      }
    }

    private createHeader(headerCont) {
      const widgetContainerHeader = document.createElement('div'),
            widgetContainerLogo = document.createElement('div'),
            widgetContainerLogoImg = document.createElement('img'),
            widgetContainerTitle = document.createElement('div');

      widgetContainerHeader.classList.add('widget-container_header');
      widgetContainerTitle.innerHTML = '<strong>Asistente Digital</strong> Movistar';
      widgetContainerTitle.classList.add('widget-container_header_title');
      widgetContainerLogoImg.setAttribute('src', `${this.path}assets/img/img-movistar-header.png`);
      widgetContainerLogo.classList.add('widget-container_header_logo');
      widgetContainerLogo.appendChild(widgetContainerLogoImg);
      widgetContainerHeader.appendChild(widgetContainerLogo);
      widgetContainerHeader.appendChild(widgetContainerTitle);
      headerCont.appendChild(widgetContainerHeader);
    }

    private createButton(divCont) {
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
            widgetContainer = document.createElement('div');
      
      containerDiv.setAttribute('id', 'laura-widget-wrapper');
      widgetContainer.classList.add('widget-container');
      containerDiv.appendChild(widgetContainer);

      this.createHeader(widgetContainer);
      this.createIframe(widgetContainer);
      this.createButton(containerDiv);
      this.setUp();

      document.body.appendChild(containerDiv);
    }

    private createIframe(iframeCont) {

      const widgetBody = document.createElement('div'),
            ifrm = document.createElement('iframe');

      widgetBody.classList.add('widget-body');
      ifrm.classList.add('laura-widget-iframe');
      ifrm.setAttribute('allow', 'geolocation *;');
      ifrm.setAttribute('src', this.src);
      widgetBody.appendChild(ifrm);
      iframeCont.appendChild(widgetBody);

      window.onmessage = (e: any) => {
        if (e.data.test !== undefined) {
          const message = e.data.test[0].msg;
          // this.classIfrm(message);
        }
      };
    }

    private setUp() {
      const getHead:any = document.head;
      const link = document.createElement("link");
      // href = hhtp://www.rutaabsoluta.cl/
      link.href = "../dist/assets/css/laura-widget-cdn-style.css";
      link.type = "text/css";
      link.rel = "stylesheet";
      link.media = "screen, print";
      getHead.appendChild(link);
    }
  }

  window.LauraWidget = new CreateContainer();
})(window, document);

window.addEventListener('load', async () => {
  await window.LauraWidget.init('http://localhost:3000/');
});

interface Window {
  LauraWidget: any;
}
