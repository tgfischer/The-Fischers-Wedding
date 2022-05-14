export type GiftGuestSelectOptions = {
  label: string;
  value: string;
};

export type AddGiftFormData = {
  description: string;
  guests: GiftGuestSelectOptions[];
};

export type AddGiftModalOptions = {
  onHide: () => void;
};

export type AddGiftMutationOptions = {
  onSuccess: () => void;
};
