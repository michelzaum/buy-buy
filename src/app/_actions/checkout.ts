import axios from "axios";

export async function handleCheckout(items: any[]) {
  const { data } = await axios.post('api/checkout', {
    items,
  });

  const { url } = data;

  window.location.href = url;
}
