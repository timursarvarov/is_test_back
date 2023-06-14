export class CreateUserDTO {
  name: {
    title: string;
    first: string;
    last: string;
  };
  gender: string;
  location: {
    country: string;
  };
  email: string;
  phone: string;
  picture: {
    thumbnail: string;
  };
  login: {
    uuid: string;
  };

  constructor(
    name: {
      title: string;
      first: string;
      last: string;
    },
    gender: string,
    location: {
      country: string;
    },
    email: string,
    phone: string,
    picture: {
      thumbnail: string;
    },
    login: {
      uuid: string;
    },
  ) {
    this.name = name;
    this.gender = gender;
    this.location = location;
    this.email = email;
    this.phone = phone;
    this.picture = picture;
    this.login = login;
  }
}
