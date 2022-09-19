import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_URL;

export const createOrder = async ({ data }) => {
  const res = await axios
    .post(`${base_url}/create-order`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.message);
    });

  return res;
};

const getOrder = async ({ id }) => {
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

export const getOrderByRef = async ({ ref }) => {
  const res = await axios
    .get(`${base_url}/get-order-by-ref/${ref}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err?.response?.data?.message);
    });

  return res;
};

const updateOrder = async ({ data }) => {
  const res = await axios
    .put(`${base_url}/update-order/${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return res;
};

const deleteOrder = async ({ id }) => {
  const res = await axios
    .delete(`${base_url}/delete-order/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return res;
};
const getAllOrders = async () => {
  const res = await axios
    .get(`${base_url}/get-all-orders`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return res;
};
const getActiveOrders = async () => {
  const res = await axios
    .get(`${base_url}/get-active-orders`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return res;
};

const getCustomerOrders = async ({ customerId }) => {
  const res = await axios
    .get(`${base_url}/get-customer-orders`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return res;
};
