export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Team {
  name: string;
  logo: string;
  plan: string;
}

export async function getUserData(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name: "Chaitanya",
    email: "chaitanya@10xu.io",
    avatar: "/avatars/chaitanya.jpg",
  };
}

export async function getTeamsData(): Promise<Team> {
  await new Promise((resolve) => setTimeout(resolve, 1050));

  return {
    name: "10XU Inc.",
    logo: "tesla.com",
    plan: "Enterprise",
  };
}
