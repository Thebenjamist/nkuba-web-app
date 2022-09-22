import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_URL;

export const signIn = async ({ data }) => {
  const res = await axios
    .post(`${base_url}/sign-in-user`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.message);
    });

  return res;
};

export const checkSession = async ({ data }) => {
  const res = await axios
    .post(`${base_url}/check-session`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.message);
    });

  return res;
};

export const createUser = async ({ data }) => {
  const res = await axios
    .post(`${base_url}/create-user`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.err);
    });

  return res;
};

export const signOut = async ({ data }) => {
  const res = await axios
    .post(`${base_url}/sign-out-user`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.message);
    });

  return res;
};

const getUser = async ({ id }) => {
  const res = await axios
    .get(`${base_url}/get-order/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return res;
};
