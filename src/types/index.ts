export type Card = {
  isOpen?: boolean;
  name: string;
  link: string;
  _id: string;
  likes?: [
    {
      _id: string;
    }
  ];
  owner?: {
    _id: string;
  };
};

export type User = {
  name: string;
  about: string;
  avatar: string;
  _id: string;
};
