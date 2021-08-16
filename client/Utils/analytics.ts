function directCrm(...attrs: unknown[]): void {
  if (!window.directCrm) return;

  window.directCrm(...attrs);
}

function pushDataLayer(data: unknown): void {
  (window.dataLayer = window.dataLayer || []).push(data);
}

// Отправка формы «Подписка по email»
function formEmailSubscriptionSend(email: string): void {
  directCrm('identify', {
    operation: 'SubscribeFour',
    identificator: {
      provider: 'email',
      identity: email,
    },
    data: {},
  });
}

export default {
  directCrm,
  pushDataLayer,
  formEmailSubscriptionSend,
};
