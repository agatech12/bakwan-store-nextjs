import { decrypt } from "@/components/cryptos";

async function sendServerCommand(serverUrl, apiKey, command) {
  const url = `${serverUrl}/v1/server/exec`;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    key: apiKey,
  };
  const body = new URLSearchParams({ command: command });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error sending command:", error);
    throw error;
  }
}


const serverUrl = "http://194.233.75.221:4567"; 

const apiKey = "bogor123"; 

function decryptKey(merchant_ref) {
  // return encrypt(`aga-${username}-${crypto.randomBytes(10).toString("hex")}`);
  console.log('key : ', merchant_ref)
  console.log('key decrypt : ', decrypt(merchant_ref))
  const [keyWord, username, _] = decrypt(merchant_ref).split('-');
  console.log('key decrypt : ', keyWord)

  if (keyWord != "aga") throw Error("Penyusup cuk");

  return { username };
}

export default function handler(req, res) {
  console.log(req.body.merchant_ref)
  const { merchant_ref, total_amount } = req.body;

  const { username } = decryptKey(merchant_ref);

  let command = ``

  switch (total_amount) {
    case 10_000:
      command = `give ${username} minecraft:coal 10`;
      break;
  
    default:
      break;
  }

  sendServerCommand(serverUrl, apiKey, command)
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

  res.status(200).json({ success: "true" });
}
