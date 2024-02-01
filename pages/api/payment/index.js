const { encrypt, decrypt } = require("@/components/cryptos");
import crypto from "crypto";
import axios from "axios";

function generateKey(username) {
  return encrypt(`aga-${username}-${crypto.randomBytes(10).toString("hex")}`);
}

const apiKey = "DEV-A4salsZ6xYmiOAofNvjRDnDnyjGbFmUI2fyjxSFB";
const privateKey = "Vf79s-H1Y7d-judQe-rTcqt-GaL4P";

const method = "QRIS";

export default function handler(req, res) {
  const { username, amount } = req.body;

  const merchant_code = "T5476";
  const key_ref = generateKey(username);
  const merchant_ref = `${key_ref.iv}-${key_ref.encryptedData}`;

  const signature = crypto
    .createHmac("sha256", privateKey)
    .update(merchant_code + merchant_ref + amount)
    .digest("hex");
  const payload = {
    method: method,
    merchant_ref: merchant_ref,
    customer_name: username,
    customer_email: "aga@gmail.com",
    customer_phone: "081234567890",
    signature: signature,
    callback_url: "https://store.bakwansmp.xyz/api/process",
    amount: amount,

    order_items: [
      {
        sku: "BAKWAN-1",
        name: "Nama Produk 1",
        price: amount,
        quantity: 1,
        product_url: "https://tokokamu.com/product/nama-produk-1",
        image_url: "https://tokokamu.com/product/nama-produk-1.jpg",
      },
    ],
  };

  console.log(payload);

  axios
    .post("https://tripay.co.id/api-sandbox/transaction/create", payload, {
      headers: { Authorization: "Bearer " + apiKey },
      validateStatus: function (status) {
        console.log(status)
        return status == 200; // ignore http error
      },
    })
    .then((response) => {
      console.log(response.data);

      //   res.status(200).json(response.data);

      res.end(`<script>window.location.href = '${response.data.data.checkout_url}'</script>`)
    })
    .catch((error) => {
        console.log(error)
      res.status(500).json(error);
    });
}
