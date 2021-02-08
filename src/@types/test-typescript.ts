type Fish = {
  swim: () => void;
};
type Bird = {
  fly: () => void;
};

const isFish = (pet: Fish | Bird): pet is Fish => {
  return (pet as Fish).swim !== undefined;
};

export {};
