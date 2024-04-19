interface ChangeScreenEventDetail {
  set: string;
  params: any;
  origin: string;
  emit: string;
  scope: string;
}

interface ChangeScreenEvent extends CustomEvent {
  detail: ChangeScreenEventDetail;
}