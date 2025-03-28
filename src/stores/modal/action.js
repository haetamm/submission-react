const ActionType = {
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL'
};

const openModal = (type, id) => ({
  type: ActionType.OPEN_MODAL,
  payload: { type, id },
});

const closeModal = () => ({
  type: ActionType.CLOSE_MODAL,
});

export {
  ActionType, openModal, closeModal
};