interface Config {
  env: 'development' | 'production';
  sentry: {
    dsn: string;
  };
}

interface Window {
  __CONFIG__: Config;
  __SERVER_STATE__: unknown;
  cancelClick: boolean;
  draggableTarget: any;
  cylindo: any;
  dataLayer: any;
  ymaps?: any;
  directCrm?: any;
  ctSendCallbackRequest?: any;
  ctGetCallbackRequestStatus?: any;
  ctCheckCallbackShouldBeProcessed?: any;
  /**
   * Какое-то специфичное нестандартное свойство для определения платформы пользователя
   *
   * @see https://codengineering.ru/q/detect-if-device-is-ios-25101
   */
  MSStream: any;
}
